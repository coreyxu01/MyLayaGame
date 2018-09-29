import Role from "./Role";
import Main from "../Main";
import Bullet from "./Bullet";
import GameConst from "../GameConst";

//角色
export default class Hero extends Role
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
            //this.playAction("hit");
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
        }
        //道具死亡
        prop.hp=0;
        //道具吃完后消失，下一帧回收
        prop.visible=false;
    }

    /**
     更新
     */	
    public update():void
    {
        //主角边界检查
        //需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
        //判断是否左右超出
        if(this.x<this.roleAni.width/2)
        {
            this.x=this.roleAni.width/2;
        }
        else if(this.x>720-this.roleAni.width/2)
        {
            this.x=720-this.roleAni.width/2;
        }
        //判断是否上下超出
        if(this.y<this.roleAni.height/2)
        {
            this.y=this.roleAni.height/2;
        }
        else if(this.y>1280-this.roleAni.height/2)
        {
            this.y=1280-this.roleAni.height/2;
        }
    }

    /**
     角色射击，生成子弹
     */		
    public shoot():void
    {
        //获取当前时间
        let time:number = Laya.Browser.now() ;
        //如果当前时间大于下次射击时间
        if (time >this.shootTime)
        {
            //获得发射子弹的位置数组
            let pos:number[] = this.bulletPos[this.shootNum-1]
            for(let i:number = 0 ; i<pos.length ; i++)
            {
                //更新下次子弹射击的时间
                this.shootTime = time + this.shootInterval ; 
                //从对象池里面创建一个子弹
                let bullet: Bullet = Laya.Pool.getItemByClass("Bullet",Bullet) as Bullet;
                //初始化子弹信息
                bullet.init("bullet2",1,-10,1,this.camp)
                //子弹消失后会不显示，重新初始化
                bullet.visible=true;
                //设置子弹发射初始化位置
                bullet.pos(this.x+pos[i], this.y-80);
                //旋转角度
                bullet.rotation = 0;
                //添加到角色层
                this.parent.addChild(bullet);
                //添加子弹音效					
                Laya.SoundManager.playSound("sound/bullet.mp3");
            }
        }
    }
}