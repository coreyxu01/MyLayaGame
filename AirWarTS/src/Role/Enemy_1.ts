import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";
import GameConst from "../GameConst";
import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";
import Enemy from "./Enemy";

//角色
export default class Enemy_1 extends Enemy
{
    private isMoveLeft = true;
    private tickTime = 0;

    constructor() 
	{
        super();
        this.isMoveLeft = Math.random() < 0.5;
    }

    /**
     * 角色更新,边界检查
     */		
    public update():void
    {
        //获取当前时间
        let time:number = Laya.Browser.now();
        //如果当前时间大于下次射击时间
        if (time > this.tickTime)
        {
            //更新下次子弹射击的时间
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

}