import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";

//角色
export default class Enemy extends Role
{
     /**
     * 角色失血
     */		
    public lostHp(lostHp:number):void 
    {
        //减血
        this.hp -= lostHp;
        //根据血量判断
        if (this.hp > 0) 
        {
            //如果未死亡，则播放受击动画
            this.playAction("hit");
        }
        else 
        {
            //添加死亡动画
            this.playAction("die");
            //添加死亡音效
            // Laya.SoundManager.playSound("sound/game_over.mp3");
            Main.score++;
        }
    }

    /***动画完成后回调方法***/
    public onComplete():void
    {
        super.onComplete();

        //如果死亡动画播放完成
        if(this.action=="die")
        {
            //update()方法中，隐藏后进行回收
            this.visible=false;
            this.lostProp();
        }
        else if(this.action=="hit")//如果是受伤动画，下一帧播放飞行动画
        {
            this.playAction("fly");
        }
    }

            /**角色死亡掉落物品**/
    private lostProp():void
    {
        if(this.type!="enemy3") return;
        
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

    /**角色死亡并回收到对象池**/
    public die():void
    {
        super.die();
        //回收到对象池
        Laya.Pool.recover("Enemy", this);
    }
}