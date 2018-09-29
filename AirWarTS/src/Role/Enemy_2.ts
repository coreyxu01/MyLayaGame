import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";
import GameConst from "../GameConst";
import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";
import Enemy from "./Enemy";

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

            //多发子弹
            for(let i = 0 ; i < 3 ; i ++)
            {
                //从对象池里面创建一个子弹
                let bullet: Bullet = RoleFactory.GetRole("bullet1");
                //初始化子弹信息
                bullet.init("bullet1",1,10,1,this.camp)
                //子弹消失后会不显示，重新初始化
                bullet.visible=true;
                //设置子弹发射初始化位置
                bullet.pos(this.x, this.y + 30);
                //不同角度
                bullet.rotation = -30 + i * 30;

                //添加到角色层
                if( this.parent != null)
                    this.parent.addChild(bullet);
            }
        }

    }

}