import Role from "./Role";
import Main from "../Main";

//角色
export default class Bullet extends Role
{
    
    /**
     * 角色失血
     */		
    public lostHp(lostHp:number):void 
    {
        //隐藏，下一帧回收
        this.visible=false;
    }

    /**角色死亡并回收到对象池**/
    public die():void
    {
        super.die();
        //回收到对象池
        Laya.Pool.recover("Bullet", this);
    }
           
}