import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";
import GameConst from "../GameConst";
import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";
import Enemy from "./Enemy";

//角色
export default class Enemy_3 extends Enemy
{
    constructor() 
	{
        super();
        this.shootInterval = 8000;  //射击间隔
        this.shootTime = this.shootInterval; //第一次射击时间

        this.addScore = 10;
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

            //生成随机道具类型
            if(Math.random() < 0.6)
            {
                this.shootAct();
            }
            else
            {
                this.shootAct_2();
            }
        }
    }


    private shootAct():void
    {
        this.shootActDo();
        Laya.timer.once(500,this,this.shootActDo);
    }

    //一组子弹实例
    private shootActDo():void
    {
        //多发子弹
        for(let i = 0 ; i < 18 ; i ++)
        {
            //从对象池里面创建一个子弹
            let bullet: Bullet = RoleFactory.GetRole("bullet1");
            //初始化子弹信息
            bullet.init("bullet1",1,10,1,this.camp);
            //子弹消失后会不显示，重新初始化
            bullet.visible=true;
            //设置子弹发射初始化位置
            bullet.pos(this.x, this.y + 80);
            //不同角度
            bullet.rotation = -90 + i * 10;

            //添加到角色层
            if( this.parent != null)
                this.parent.addChild(bullet);
        }
    }

    private shootAct_2():void
    {
        for(let i = 0 ; i < 36 ; i ++)
        {
            Laya.timer.once(30 * i,this,this.shootActDo_2,[i],false);
        }
    }

    shootActDo_2(index: number): any {
           //从对象池里面创建一个子弹
           let bullet: Bullet = RoleFactory.GetRole("bullet1");
           //初始化子弹信息
           bullet.init("bullet1",1,10,1,this.camp);
           //子弹消失后会不显示，重新初始化
           bullet.visible=true;
           //设置子弹发射初始化位置
           bullet.pos(this.x, this.y + 80);
            if(index > 18)
                index = 36 - index;

           //不同角度
           bullet.rotation = -90 + index * 10;

           //添加到角色层
           if( this.parent != null)
               this.parent.addChild(bullet);
    }
   
    /**角色死亡掉落物品**/
    public lostProp():void
    {
        //从对象池里面创建一个道具
        let prop:ufo = Laya.Pool.getItemByClass("ufo",ufo);
        
        //生成随机道具类型
        let r:Number=Math.random();
        let num:number=(r<0.7)?1:2;
        
        //重新初始化道具属性,阵营为敌方（只与主角发生碰撞）
        prop.init("ufo"+num,1,2,30,1);
        //道具类型
        prop.propType=num;
        
        //强制显示
        prop.visible=true;
        //生成的位置为死亡者位置
        prop.pos(this.x,this.y);
        //加载到父容器 
        this.parent.addChild(prop);
    }

}