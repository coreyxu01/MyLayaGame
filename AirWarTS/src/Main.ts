import WebGL = Laya.WebGL;
import Stage = Laya.Stage;
import Event = laya.events.Event;
import GameStart from "./GameStart";
import GameMap from "./GameMap";
import GamePlay from "./GamePlay";
import GameOver from "./GameOver";
import Role	from "./Role/Role";
import Hero	from "./Role/Hero";
import Enemy from "./Role/Enemy";
import Bullet from "./Role/Bullet";

export default class Main 
{
	/**开始页面***/
	private start:GameStart;
	/**地图页面***/
	private map:GameMap;
	/**游戏中界面***/
	private play:GamePlay;
	/**游戏结束页面***/
	private over:GameOver;

	/**游戏关卡数***/
	public static level:number=1;
	/**玩家得分***/
	public static score:number=0;
	
	/**角色层容器***/
	private roleLayer:Laya.Sprite;
	/**玩家主角***/
	private hero:Role;
	
	/**鼠标上一帧x座标** */		
	private moveX:number;
	/**鼠标上一帧y座标** */	
	private moveY:number;

	/****主角死亡后游戏结束时间***/
	private deathTime:number=0

	constructor() 
	{
		//初始化引擎，建议增加WebGl模式
		Laya.init(720,1280,WebGL);
		//全屏不等比缩放模式
		Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
		
		Laya.loader.load("res/atlas/gameUI.atlas",laya.utils.Handler.create(this,this.GameStart));
	}

	private GameStart():void 
	{
		//实例化开始页面
		this.start = new GameStart();
		this.start.popup();
		//监听开始游戏开始按钮事件,点击后进入游戏中
		this.start.btn_start.on(Event.MOUSE_UP,this,this.gameInit)
	}

	/**
	 游戏中，游戏初始化
		*/
	private gameInit():void
	{
		//缓动动画关闭效果。IDE中页面为Dialog才可用
		this.start.close();
		
		//重置关卡数据
		//游戏关卡数
		Main.level = 1;
		//玩家得分
		Main.score = 0;
		//敌人刷新加速
		this.createTime = 0;
		//敌人速度提升
		this.speedUp = 0;
		//敌人血量提升	
		this.hpUp = 0;
		//敌人数量提升				
		this.numUp = 0;
		//升级等级所需的成绩数量
		this.levelUpScore = 10;			
		
		//实例化地图背景页面(如果已实例化，不需要重新new)
		if(this.map == null)
			this.map = new GameMap();
		//加载到舞台
		Laya.stage.addChild(this.map);
		
		//实例化角色层并加载到舞台(如果已实例化，不需要重新new)
		if(this.roleLayer == null)
			this.roleLayer = new Laya.Sprite();
		Laya.stage.addChild(this.roleLayer);
		
		//实例化游戏中UI页面(如果已实例化，不需要重新new)
		if(this.play == null)
			this.play = new GamePlay();
		//加载到舞台
		Laya.stage.addChild(this.play);
		
		//实例化主角(如果已实例化，不需要重新new)
		if(this.hero == null)
		this.hero = new Hero();
		//初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置,阵营为0
		this.hero.init("hero",10,0,30,0);
		//死亡后会隐藏，重新开始后需显示
		this.hero.visible=true;
		//主角位置修改
		this.hero.pos(360,800);
		//角色加载到角色层中
		this.roleLayer.addChild(this.hero);
		
		//鼠标按下监听
		Laya.stage.on(Event.MOUSE_DOWN,this,this.onMouseDown);
		//鼠标抬起监听
		Laya.stage.on(Event.MOUSE_UP,this,this.onMouseUp);
		//游戏主循环
		Laya.timer.frameLoop(1,this,this.loop);
	}

	/**
	 点击开始触发移动
		*/	
	private onMouseDown():void
	{
		//记录鼠标按下时的位置，用于计算鼠标移动量
		this.moveX=Laya.stage.mouseX;
		this.moveY=Laya.stage.mouseY;
		//
		Laya.stage.on(Event.MOUSE_MOVE,this,this.onMouseMove);
	}
	
	/**
	 主角跟随鼠标移动
		*/	
	private onMouseMove():void
	{
		//计算角色移动量
		let xx:number=this.moveX-Laya.stage.mouseX;
		let yy:number=this.moveY-Laya.stage.mouseY;
		//更新移动位置
		this.hero.x-=xx;
		this.hero.y-=yy;
		//更新本帧的移动座标
		this.moveX=Laya.stage.mouseX;
		this.moveY=Laya.stage.mouseY;
	}
	/**
	 鼠标抬起、关闭移动监听
		*/		
	private onMouseUp():void
	{
		Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove) ;
	}

	/**
	 游戏主循环
		*/
	private loop():void
	{
		//本局游戏数据更新
		this.play.update(this.hero.hp,Main.level,Main.score)
		//如果主角死亡
		if(this.hero.hp<=0)
		{
			//玩家飞机死亡后延迟时间，100帧后弹出游戏结束界面
			this.deathTime++
			if (this.deathTime>=100)
			{
				this.deathTime=0;
				//游戏结束
				this.gameOver();
				//本方法内后续逻辑不执行
				return;
			}
		}
		else//主角未死亡
		{
			//主角射击
			this.hero.shoot();
			//游戏升级计算
			this.levelUp();
		}

		//地图滚动更新
		this.map.updateMap()
		//游戏碰撞逻辑
		this.checkCollect();
		//敌方飞机生成逻辑
		this.loopCreateEnemy();
	}

	//游戏碰撞逻辑
	private checkCollect():void
	{
		//遍历所有飞机，更改飞机状态
		for (var i: number = this.roleLayer.numChildren - 1; i > -1; i--) 
		{
			//获取第一个角色
			var role:Role = this.roleLayer.getChildAt(i) as Role;
			//角色自身更新
			role.update();				
			//如果角色死亡，下一循环
			if(role.hp<=0) continue;
			//碰撞检测
			for(var j:number=i-1;j>-1;j--)
			{	//获取第二个角色
				var role1:Role=this.roleLayer.getChildAt(j) as Role;
				//如果role1未死亡且不同阵营
				if(role1.hp>0&&role1.camp!=role.camp)
				{
					//获取碰撞半径
					var hitRadius:number=role.hitRadius+role1.hitRadius;
					//碰撞检测
					if(Math.abs(role.x-role1.x)<hitRadius&&Math.abs(role.y-role1.y)<hitRadius)
					{
						//如果某一个碰撞体是道具，则吃道具，否则掉血
						if(role.propType!=0||role1.propType!=0)
						{
							//无法判断哪个是道具，因此都相互吃试试
							role.eatProp(role1);
							role1.eatProp(role);
						}else
						{
							//角色相互掉血
							role.lostHp(1);
							role1.lostHp(1);
						}
					}
				}
			}
		}
	}

	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//游戏关卡提升属性
	/***敌人刷新加速****/
	private createTime:number = 0;
	/***敌人速度提升***/
	private speedUp:number = 0;
	/***敌人血量提升	***/		
	private hpUp:number = 0;
	/***敌人数量提升	***/					
	private numUp:number = 0;
	/****升级等级所需的成绩数量***/
	private levelUpScore: number = 10;

	/****敌机血量表****/
	private hps: number[] = [1, 7, 15];
	/***敌机生成数量表**/
	private nums: number[] = [2, 1, 1];
	/***敌机速度表***/
	private speeds:  number[] = [3, 2, 1];
	/***敌机被击半径表***/
	private radius:  number[] = [20, 35, 80];

	//生成敌方飞机
	private loopCreateEnemy():void
	{
		//创建敌机，加入关卡升级数据，提高难度
		//生成小飞机
		if (Laya.timer.currFrame % (80 - this.createTime) ==0)
		{
			this.createEnemy(0, this.hps[0],this.speeds[0] + this.speedUp , this.nums[0] + this.numUp);
		}
		//生成中型飞机
		if (Laya.timer.currFrame % (170 - this.createTime * 2) == 0) 
		{
			this.createEnemy(1, this.hps[1] +this.hpUp * 2,this.speeds[1] + this.speedUp , this.nums[1] + this.numUp);
		}
		//生成boss
		if (Laya.timer.currFrame % (1000 - this.createTime * 3) == 0) 
		{
			this.createEnemy(2, this.hps[2] + this.hpUp * 6,this.speeds[2], this.nums[2]);
		}
	}

	/**
	 游戏升级计算
		*/
	private levelUp():void
	{
		if(Main.score>this.levelUpScore)
		{
			//关卡等级提升
			Main.level++;
			//角色血量增加，最大30
			this.hero.hp=Math.min(this.hero.hp+Main.level*1,30);
			//关卡越高，创建敌机间隔越短
			this.createTime = Main.level < 30 ? Main.level * 2 : 60;
			//关卡越高，敌机飞行速度越高
			this.speedUp = Math.floor(Main.level / 6);
			//关卡越高，敌机血量越高
			this.hpUp = Math.floor(Main.level / 8);
			//关卡越高，敌机数量越多
			this.numUp = Math.floor(Main.level / 10);
			//提高下一级的升级分数
			this.levelUpScore += Main.level * 10;
		}
	}
	
	/**
	 *  创建敌人
	 * @param index 	敌人编号
	 * @param hp   		 敌人血量
	 * @param speed		敌人速度
	 * @param num		敌人数量
	 */
	private createEnemy(index:number,hp:number,speed:number,num:number):void 
	{
		for (let i: number = 0; i < num; i++)
		{
			//创建敌人，从对象池创建
			let enemy:Enemy = Laya.Pool.getItemByClass("Enemy", Enemy);
			//初始化敌人
			enemy.init("enemy" + (index+1), hp, speed,this.radius[index],1);
			//从对象池中创建的对象死亡前被隐藏了，因此要重新初始化显示，否则新创建角色不会显示出来
			enemy.visible=true;
			//随机位置
			enemy.pos(Math.random() *(720-80)+50, -Math.random() * 100);
			//添加到舞台上
			this.roleLayer.addChild(enemy);
		}
	}
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	/**
	 游戏结束
		*/
	private gameOver():void
	{
		//移除所有舞台事件，鼠标操控
		Laya.stage.offAll();
		//移除地图背景
		this.map.removeSelf();
		//移除游戏中UI
		this.play.removeSelf();
		
		//清空角色层子对象
		this.roleLayer.removeChildren(0,this.roleLayer.numChildren-1);
		//移除角色层
		this.roleLayer.removeSelf();
		
		//去除游戏主循环
		Laya.timer.clear(this,this.loop);
		
		//实例化游戏结束页面
		if(this.over == null)
			this.over = new GameOver();
		//游戏积分显示
		this.over.txt_score.text=Main.score.toString();
		//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
		this.over.popup();
		//重新开始事件监听,点击后进入游戏中
		this.over.on("reStart",this,this.gameInit);
	}
}


//激活启动类
new Main();
