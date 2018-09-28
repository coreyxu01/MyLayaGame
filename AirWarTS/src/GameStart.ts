
import { ui } from "./ui/layaMaxUI";

/***游戏开始界面***/
export default class GameStart extends ui.GameStartUI
{
    /***游戏资源地址数组***/
     private assetArr:any=[{url:"res/atlas/gameRole.atlas"}//,
    // {url:"sound/achievement.mp3", type:Laya.Loader.SOUND}, 
    // {url:"sound/bullet.mp3", type:Laya.Loader.SOUND},
    // {url:"sound/game_over.mp3", type:Laya.Loader.SOUND},
    // {url:"sound/enemy1_die.mp3", type:Laya.Loader.SOUND},
    // {url:"sound/enemy3_out.mp3", type:Laya.Loader.SOUND}
    ]

    constructor() 
	{
        super();
        //游戏加载未完成暂时不显示，防止点击出错
        this.btn_start.visible = false;
        //监听界面是否关闭
        this.once(laya.events.Event.CLOSE,this,this.onClose);
        //加载剩余游戏资源、音乐，加载完成与加载进度回调方法
        Laya.loader.load(this.assetArr,Laya.Handler.create(this,this.onComplete),Laya.Handler.create(this,this.onProgress))
    }

    	/**
		 * 游戏资源加载完成
		 */
		private onComplete():void
		{
			//加载完成
			this.txt_load.text="资源加载完成,开始游戏吧...";
			//游戏开始按钮显示并弹出
			this.btn_start.visible=true;
			//缓动类弹出动画
			Laya.Tween.from(this.btn_start,{y:this.btn_start.y+20},1000,Laya.Ease.elasticOut);
		}
		
		/**
		 * 游戏资源加载进度
		 * @param loadNum  进度
		 */
		private onProgress(loadNum:number):void
		{
			//显示加载进度
			this.txt_load.text="资源加载中，当前进度："+loadNum*100+"%";
		}

    /**
     * 界面关闭
     */
    private onClose():void
    {
        //从舞台移除自己
        this.removeSelf();
        //只加载一次，因此直接消毁自己
        this.destroy();
    }

}