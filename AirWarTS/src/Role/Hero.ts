import Role from "./Role";
import Main from "../Main";

//角色
export default class Hero extends Role
{
    
     /**
     * 角色失血
     */		
    public lostHp(lostHp:number):void 
    {
        console.log("Hero lostHp!!!!!!");

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
            Laya.SoundManager.playSound("sound/game_over.mp3");
        }
    }
    
        /**
     * 角色吃到道具，加血或子弹级别
     */		
    public eatProp(prop:Role):void
    {
        //如果调用者是主角或prop不是道具，则返回
        if(prop.propType==0) return;
        //添加吃强化道具音效					
        Laya.SoundManager.playSound("sound/achievement.mp3");
        //吃子弹箱
        if(prop.propType==1) 
        {
            //积分增加
            Main.score++;
            //子弹级别增加
            this.bulletLevel++
            //子弹每升2级，子弹数量增加1，最大数量限制在4个
            this.shootNum = Math.min(Math.floor(this.bulletLevel / 2) + 1,4);
            //子弹级别越高，发射频率越快
            this.shootInterval = 300 - 8 * (this.bulletLevel > 8 ? 8 : this.bulletLevel);
        }
        else if(prop.propType==2)//吃血
        {
            //血量增加
            this.hp+=2;
            //积分增加
            Main.score+=1;
        }
        //道具死亡
        prop.hp=0;
        //道具吃完后消失，下一帧回收
        prop.visible=false;
    }
}