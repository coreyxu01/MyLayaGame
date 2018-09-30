import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";
import GameConst from "../GameConst";
import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";
import Enemy from "./Enemy";
import BulletUtls from "./BulletUtls";

//角色
export default class Enemy_1 extends Enemy
{
    //是否向左边移动
    private isMoveLeft = true;
    private tickTime = 0;

    private subType:number = 0;

    constructor() 
	{
        super();
    }

    protected InitSelf():void
    {
        this.isMoveLeft = Math.random() < 0.5;
        this.SetSubType();
    }

    private SetSubType()
    {
        this.subType =  Math.random() < 0.5 ? 0 : 1;
        if(this.subType == 0)
        {
            this.m_ColorFilter.color(0,0,0,1);
        }
        else
        {
            this.m_ColorFilter.color(255,0,0,1);
        }
    }

    public update():void
    {
        //获取当前时间
        let time:number = Laya.Browser.now();
        //位移时间
        if (time > this.tickTime)
        {
            this.tickTime = time + 1000; 
            this.isMoveLeft = Math.random() < 0.5;
        }

        //角色根据速度飞行
        if(this.isMoveLeft)
        {
            this.x -= this.speed * 0.5;
        }
        else
        {
            this.x += this.speed * 0.5;
        }

        //判断是否左右超出
        if(this.x < this.roleAni.width/2)
        {
            this.isMoveLeft = false;
        }
        else if(this.x > 720-this.roleAni.width/2)
        {
            this.isMoveLeft = true;
        }
        super.update();
    }

    /**角色死亡**/
    public lostProp():void
    {
        if(this.subType == 1)
            BulletUtls.Shoot_5(this.camp,this,0,10);
    }

}