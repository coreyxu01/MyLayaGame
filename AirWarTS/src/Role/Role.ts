
import Animation = Laya.Animation;
import Event = laya.events.Event;
import Main from "../Main";

//角色
export default class Role extends Laya.Sprite
{
	/***飞机的类型   “hero”:玩家飞机，“enemy”：敌人飞机、“bulle”：子弹、"ufo":道具****/
    public type:string;
    /***飞机的血量***/
    public hp:number=0; 
    /***飞机的速度***/
    protected speed:number=0;	
    
    /***飞机的被攻击半径***/
    public hitRadius:number;
    /***飞机的阵营（敌我区别）***/
    public camp:number;
    
    /***角色的动画资源***/
    protected roleAni:Animation;
    /***当前动画动作***/
    protected action:string;
    
    /***射击间隔***/
    public shootInterval: number= 300;
    /***下次射击时间***/
    public shootTime: number= 300;
    
    /****道具类型 0:飞机或子弹，1:子弹箱，2:血瓶***/
    public propType:number=0;
    /***子弹级别（吃子弹道具后升级）***/
    public bulletLevel: number = 0;
    /***同时射击子弹数量***/
    public shootNum: number= 1;
    /***子弹偏移的位置***/
    protected bulletPos: number[][] = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
    
    constructor() 
	{
        super();
         //实例化动画
         this.roleAni=new Animation();
         //加载IDE编辑的动画文件
         this.roleAni.loadAnimation("GameRole.ani");
    }

    /**
     * 角色初始化
     * @param type  角色类型 ---“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
     * @param hp      血量
     * @param speed   速度
     * @param hitRadius   碰撞半径
     * @param camp    阵营
     */		
    public init(type:string,hp:number,speed:number,hitRadius:number,camp:number):void
    {
        //角色初始化属性
        this.type=type;
        this.hp=hp;
        this.speed=speed;
        this.hitRadius=hitRadius;
        this.camp=camp;
        
        //道具属性初始为0
        this.propType=0;
        //加载动画对象
        this.addChild(this.roleAni)
        //监听动画完成事件
        this.roleAni.on(Event.COMPLETE,this,this.onComplete)
        //播放默认飞行动画
        this.playAction("fly");
    }
    
    /***动画完成后回调方法***/
    public onComplete():void
    {
        //如果角色还未有宽，获得角色宽高	
        if(this.roleAni.width==0)
        {
            //获得动画矩形边界
            var bounds:Laya.Rectangle=this.roleAni.getBounds();
            //角色 宽高赋值
            this.roleAni.size(bounds.width,bounds.height)
        }
    }
    
    /**
     * 角色失血
     */		
    public lostHp(lostHp:number):void 
    {
        
    }
    
    /**
     * 角色吃到道具，加血或子弹级别
     */		
    public eatProp(prop:Role):void
    {
       
    }
    
    /**
     * 播放动画 
     * @param action 动画状态   "fly"、"hit"、"die"
     */	
    public playAction(action:string):void
    {
        this.action=action;
        //播放角色动画,name=角色类型_动画状态，如：hero_fly
        this.roleAni.play(0,true,this.type+"_"+action);
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

        //角色根据速度飞行
        this.y += this.speed;

        //如果移动到显示区域以外，则移除
        if (this.y > 1280+100||this.y<-150)
        {
            this.visible=false;
        }
    }

    /**
     角色射击，生成子弹
     */		
    public shoot():void
    {
       
    }
    
    /**角色死亡并回收到对象池**/
    public die():void
    {
        //角色动画停止
        this.roleAni.stop(); 
        //去除所有动画监听
        this.roleAni.offAll();
        //从舞台移除
        this.removeSelf();
        //回收到池
        Laya.Pool.recover(this.type, this);
    }
}