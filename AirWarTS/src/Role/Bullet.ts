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
    /**
     * 角色更新,边界检查
     */		
    public update():void
    {
         //如果角色隐藏，角色消亡并回收
         if(!this.visible)
         {
             this.die();
             return;
         }
         
         let xRotation = Math.sin( Laya.Utils.toRadian(this.rotation));
         let yRotation = Math.cos( Laya.Utils.toRadian(this.rotation));
         //角色根据速度飞行
         this.x -= this.speed *  xRotation ;
         this.y += this.speed  *  yRotation ;
 
         //如果移动到显示区域以外，则移除
         if (this.y > 1280+100||this.y<-150)
         {
             this.visible=false;
         }
    }
    

}