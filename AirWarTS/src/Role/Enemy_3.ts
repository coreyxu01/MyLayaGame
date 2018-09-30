import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";
import GameConst from "../GameConst";
import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";
import Enemy from "./Enemy";
import BulletUtls from "./BulletUtls";

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
                BulletUtls.Shoot_3(this.camp,this,0,80);
                Laya.timer.once(500,this,
                    ()=>{
                        BulletUtls.Shoot_3(this.camp,this,0,80);
                    });
            }
            else
            {
                BulletUtls.Shoot_4(this.camp,this,0,80);
            }
        }
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