import Main from "./Main";
import Role	from "./Role/Role";
import Hero	from "./Role/Hero";
import Enemy from "./Role/Enemy";
import Bullet from "./Role/Bullet";
import GameConst from "./GameConst";
import RoleFactory from "./Role/RoleFactory";

export default class EnemyManager
{
    private Main:Main;

    constructor(main:Main) 
	{
        this.Main = main;
    }

    public ResetInfo():void
    {
        //敌人刷新加速
		GameConst.createTime = 0;
		//敌人速度提升
		GameConst.speedUp = 0;
		//敌人血量提升	
		GameConst.hpUp = 0;
		//敌人数量提升				
		GameConst.numUp = 0;
		//升级等级所需的成绩数量
		GameConst.levelUpScore = 10;		
    }

	//生成敌方飞机
	public loopCreateEnemy():void
	{
		//创建敌机，加入关卡升级数据，提高难度
		//生成小飞机
		if (Laya.timer.currFrame % (80 - GameConst.createTime) ==0)
		{
			this.createEnemy(0, GameConst.hps[0],GameConst.speeds[0] + GameConst.speedUp , GameConst.nums[0] + GameConst.numUp);
		}
		//生成中型飞机
		if (Laya.timer.currFrame % (500 - GameConst.createTime * 2) == 0) 
		{
			this.createEnemy(1, GameConst.hps[1] +GameConst.hpUp * 2,GameConst.speeds[1] + GameConst.speedUp , GameConst.nums[1] + GameConst.numUp);
		}
		//生成boss
		if (Laya.timer.currFrame % (500 - GameConst.createTime * 3) == 0) 
		{
			this.createEnemy(2, GameConst.hps[2] + GameConst.hpUp * 6,GameConst.speeds[2], GameConst.nums[2]);
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
			let enemyType = "enemy" + (index+1);
			//创建敌人，从对象池创建
			let enemy:Enemy = RoleFactory.GetRole(enemyType) as Enemy;
			//初始化敌人
			enemy.init(enemyType, hp, speed,GameConst.radius[index],1);
			//从对象池中创建的对象死亡前被隐藏了，因此要重新初始化显示，否则新创建角色不会显示出来
			enemy.visible = true;
			//随机位置
			enemy.pos(Math.random() *(720-80)+50, -Math.random() * 100);
			//添加到舞台上
			this.Main.roleLayer.addChild(enemy);
		}
	}
}