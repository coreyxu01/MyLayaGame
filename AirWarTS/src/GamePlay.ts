
import { ui } from "./ui/layaMaxUI";

/***游戏界面***/
export default class GamePlay extends ui.GamePlayUI
{
    constructor() 
	{
        super();
        //监听暂停按钮事件
        this.btn_pause.on(Laya.Event.MOUSE_DOWN,this,this.onPause)
    }

	/**
		 游戏暂停
		 */	
		private onPause():void
		{
			//显示IDE中隐藏的暂停界面
			this.gamePause.visible=true;
			//暂停界面加点击监听（一次）
			this.gamePause.once(Laya.Event.MOUSE_DOWN,this,this.onContinue)
				
			//时间对象缩放为0就是停止
			Laya.timer.scale=0;
		}
		
		/**
		 游戏继续
		 */	
		private onContinue():void
		{
			//时间对象缩放为1就是正常速度播放
			Laya.timer.scale=1;
			//隐藏暂停界面
			this.gamePause.visible=false;
		}
		
		/****本局游戏数据UI更新***/
		public update(hp:number,level:number,score:number):void
		{
			//角色血量更新
			this.txt_hp.text="HP:"+hp;
			//关卡等级更新
			this.txt_level.text="LEVEL:"+level;
			//游戏分数更新
			this.txt_score.text="SCORE:"+score;
		}
}