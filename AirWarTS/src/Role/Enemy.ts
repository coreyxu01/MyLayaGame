import Role from "./Role";
import Main from "../Main";
import ufo from "./ufo";
import GameConst from "../GameConst";
import Bullet from "./Bullet";
import RoleFactory from "./RoleFactory";

//角色
export default class Enemy extends Role
{
    //增加分数
    public addScore:number = 1;

    constructor() 
	{
        super();
        this.shootInterval = 5000;  //射击间隔
        this.shootTime = 5000;
    }

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
            Laya.SoundManager.playSound("sound/game_over.mp3");
            GameConst.score+= this.addScore;
        }
    }

    /***动画完成后回调方法***/
    public onComplete():void
    {
        super.onComplete();

        //如果死亡动画播放完成
        if(this.action=="die")
        {
            this.visible=false;
            this.lostProp();
        }
        else if(this.action=="hit")//如果是受伤动画，下一帧播放飞行动画
        {
            this.playAction("fly");
        }
    }

    /**角色死亡掉落物品**/
    public lostProp():void
    {
      
    }

    /**
     角色射击，生成子弹
     */		
    public shoot():void
    {
    
    }
}