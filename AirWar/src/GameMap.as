package
{
	import laya.display.Sprite;
	import ui.GameBgUI;
	
	/**
	 游戏背景
	 */	
	public class GameMap extends GameBgUI
	{
		public function GameMap()
		{
		}
		
		/**
		 游戏背景移动更新
		 */		
		public function updateMap():void
		{
			this.y+=1;
			//如果背景图到了下面不可见，立即调整位置到上面循环显示
			//游戏舞台高为1280
			if (bg1.y + this.y >= 1280) 
			{ 
				bg1.y -= 1280 * 2;
			}
			if (bg2.y + this.y >= 1280) 
			{
				bg2.y -= 1280 * 2;
			}
		}
	}
}