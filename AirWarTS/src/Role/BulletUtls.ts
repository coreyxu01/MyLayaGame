import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";
import Role from "./Role";


export default class BulletUtls
{
    /**
    单颗子弹
     */	
    public static Shoot_1(camp:number,role:Role,xDiff:number,yDiff:number)
    {
        //从对象池里面创建一个子弹
        let bullet: Bullet = RoleFactory.GetRole("bullet1");
        //初始化子弹信息
        bullet.init("bullet1",1,10,1,camp)
        //子弹消失后会不显示，重新初始化
        bullet.visible=true;
        //设置子弹发射初始化位置
        bullet.pos(role.x + xDiff, role.y + yDiff);
        //添加到角色层
        if( role.parent != null)
            role.parent.addChild(bullet);
    }

    /**
     散弹 3发
     */	
    public static Shoot_2(camp:number,role:Role,xDiff:number,yDiff:number)
    {
         for(let i = 0 ; i < 3 ; i ++)
         {
             //从对象池里面创建一个子弹
             let bullet: Bullet = RoleFactory.GetRole("bullet1");
             //初始化子弹信息
             bullet.init("bullet1",1,10,1,camp)
             //子弹消失后会不显示，重新初始化
             bullet.visible=true;
             //设置子弹发射初始化位置
             bullet.pos(role.x + xDiff, role.y + yDiff);
             //不同角度
             bullet.rotation = -30 + i * 30;
             //添加到角色层
             if(role.parent != null)
                role.parent.addChild(bullet);
         }
    }

    /**
     半弧形子弹
     */	
    public static Shoot_3(camp:number,role:Role,xDiff:number,yDiff:number)
    {
        //多发子弹
        for(let i = 0 ; i < 18 ; i ++)
        {
            //从对象池里面创建一个子弹
            let bullet: Bullet = RoleFactory.GetRole("bullet1");
            //初始化子弹信息
            bullet.init("bullet1",1,10,1,camp)
            //子弹消失后会不显示，重新初始化
            bullet.visible=true;
            //设置子弹发射初始化位置
            bullet.pos(role.x + xDiff, role.y + yDiff);
            //不同角度
            bullet.rotation = -90 + i * 10;

            //添加到角色层
            if(role.parent != null)
                role.parent.addChild(bullet);
        }
    }

    /**
     来回扫射
     */	
     public static Shoot_4(camp:number,role:Role,xDiff:number,yDiff:number)
     {
        for(let i = 0 ; i < 36 ; i ++)
        {
            Laya.timer.once(30 * i,this
                ,(index:number)=>
                {
                     //从对象池里面创建一个子弹
                    let bullet: Bullet = RoleFactory.GetRole("bullet1");
                    //初始化子弹信息
                    bullet.init("bullet1",1,10,1,camp)
                    //子弹消失后会不显示，重新初始化
                    bullet.visible=true;
                    //设置子弹发射初始化位置
                    bullet.pos(role.x + xDiff, role.y + yDiff);
                        if(index > 18)
                            index = 36 - index;

                    //不同角度
                    bullet.rotation = -90 + index * 10;

                    //添加到角色层
                    if(role.parent != null)
                        role.parent.addChild(bullet);
                }
                ,[i],false);
        }
     }

    /**
     圆形子弹
     */	
    public static Shoot_5(camp:number,role:Role,xDiff:number,yDiff:number)
    {
        //多发子弹
        for(let i = 0 ; i < 36 ; i ++)
        {
            //从对象池里面创建一个子弹
            let bullet: Bullet = RoleFactory.GetRole("bullet1");
            //初始化子弹信息
            bullet.init("bullet1",1,10,1,camp)
            //子弹消失后会不显示，重新初始化
            bullet.visible=true;
            //设置子弹发射初始化位置
            bullet.pos(role.x + xDiff, role.y + yDiff);
            //不同角度
            bullet.rotation = -180 + i * 10;
            //添加到角色层
            if(role.parent != null)
                role.parent.addChild(bullet);
        }
    }

}