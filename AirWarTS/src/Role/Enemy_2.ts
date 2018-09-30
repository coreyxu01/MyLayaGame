import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";
import GameConst from "../GameConst";
import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";
import Enemy from "./Enemy";
import BulletUtls from "./BulletUtls";

//角色
export default class Enemy_2 extends Enemy
{
    constructor() 
	{
        super();
        this.shootInterval = 3000;  //射击间隔
        this.shootTime = this.shootInterval; //第一次射击时间

        this.addScore = 5;
    }

    /**
     角色射击，生成子弹
     */		
    public shoot():void
    {
        if (this.hp <= 0)
            return; 
       
        //获取当前时间
        let time:number = Laya.Browser.now();
        //如果当前时间大于下次射击时间
        if (time > this.shootTime)
        {
            //更新下次子弹射击的时间
            this.shootTime = time + this.shootInterval ; 

            //三发子弹
            BulletUtls.Shoot_2(this.camp,this,0,30);
        }

    }

}