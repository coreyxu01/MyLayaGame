package
{
	import laya.events.Event;
	import laya.utils.Ease;
	import laya.utils.Handler;
	import laya.utils.Tween;
	
	import ui.GameOverUI;
	/**
	 * 游戏结束界面
	 * @author CHENZHENG
	 * 
	 */
	public class GameOver extends GameOverUI
	{
		/**
		 * 游戏结束界面
		 */
		public function GameOver()
		{
			//"重新开始"按钮鼠标事件
			this.btn_restart.on(Event.MOUSE_DOWN,this,onRestart);
		}
		/**
		游戏重新开始
		 */		
		private function onRestart():void
		{
			//播放IDE中编辑的按钮动画
			this.ani_restart.play(0,false);
			//监听动画完成事件，注意用once
			this.ani_restart.once(Event.COMPLETE,this,AniComplete);
		}
		/**
		 按钮动画播放完成
		 */
		private function AniComplete():void
		{
			//发送重新开始事件，在Main类中监听
			this.event("reStart")
			//缓动动画关闭效果。IDE中页面为Dialog才可用
			this.close();
		}
	}
}