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
import EnemyManager from "./EnemyManager";
import GameConst from "./GameConst";
import RoleFactory from "./Role/RoleFactory";

import * as GameConstTs from "./GameConst";
import RoleState = GameConstTs.RoleState;

export default class Main 
{
	public static instance:Main;
	public static GetInstance():Main
	{
		if(this.instance == null)
			this.instance = new Main();

		return this.instance;
	}

	/**开始页面***/
	public start:GameStart;
	/**地图页面***/
	public map:GameMap;
	/**游戏中界面***/
	public play:GamePlay;
	/**游戏结束页面***/
	public over:GameOver;

	//敌方生成管理
	private enemyManager:EnemyManager;

	/**角色层容器***/
	public roleLayer:Laya.Sprite;
	/**玩家主角***/
	public hero:Hero;
	
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
		//加载初始化UI资源
		Laya.loader.load("res/atlas/gameUI.atlas",laya.utils.Handler.create(this,this.GameStart));
		
		//初始化角色管理器
		this.enemyManager = new EnemyManager(this);
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
		GameConst.level = 1;
		//玩家得分
		GameConst.score = 0;

		this.enemyManager.ResetInfo();
		
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
			this.hero = RoleFactory.GetRole("hero") as Hero;
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
		Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove);
	}

	/**
	 游戏主循环
		*/
	private loop():void
	{
		//本局游戏数据更新
		this.play.update(this.hero.hp,GameConst.level,GameConst.score)
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
			//游戏升级计算
			this.levelUp();
		}

		//地图滚动更新
		this.map.updateMap()
		//游戏碰撞逻辑
		this.checkCollect();
		//敌方飞机生成逻辑
		this.enemyManager.loopCreateEnemy();
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
			//发射子弹
			role.shoot();

			//无敌状态
			if(role.state == RoleState.Invincible)  continue;

			//碰撞检测
			for(var j:number=i-1;j>-1;j--)
			{	//获取第二个角色
				var role1:Role=this.roleLayer.getChildAt(j) as Role;
				//无敌状态
				if(role1.state == RoleState.Invincible)  continue;
				
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
	/**
	 游戏升级计算
		*/
	private levelUp():void
	{
		if(GameConst.score>GameConst.levelUpScore)
		{
			//关卡等级提升
			GameConst.level++;
			//角色血量增加，最大30
			this.hero.hp=Math.min(this.hero.hp+GameConst.level*1,30);
			//关卡越高，创建敌机间隔越短
			GameConst.createTime = GameConst.level < 30 ? GameConst.level * 2 : 60;
			//关卡越高，敌机飞行速度越高
			GameConst.speedUp = Math.floor(GameConst.level / 6);
			//关卡越高，敌机血量越高
			GameConst.hpUp = Math.floor(GameConst.level / 8);
			//关卡越高，敌机数量越多
			GameConst.numUp = Math.floor(GameConst.level / 10);
			//提高下一级的升级分数
			GameConst.levelUpScore += GameConst.level * 10;
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
		this.over.txt_score.text= GameConst.score.toString();
		//以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
		this.over.popup();
		//重新开始事件监听,点击后进入游戏中
		this.over.on("reStart",this,this.gameInit);
	}
}

//激活启动类
Main.GetInstance();
