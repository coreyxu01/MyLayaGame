/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 
	import laya.display.Text;

	public class GameStartUI extends Dialog {
		public var txt_load:Text;
		public var btn_start:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"Dialog","props":{"width":720,"height":1280},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"gameUI/bg.jpg","sizeGrid":"4,4,4,4","height":1280},"compId":2},{"type":"Image","props":{"y":378,"x":179,"skin":"gameUI/logo.png"},"compId":3},{"type":"Text","props":{"y":587,"x":20,"width":681,"var":"txt_load","text":"游戏资源加载进度","height":29,"fontSize":30,"font":"SimHei","color":"#1c1c1c","align":"center"},"compId":4},{"type":"Text","props":{"y":1200,"x":20,"width":681,"text":"LayaAir1.7.3引擎教学演示版","height":29,"fontSize":26,"font":"SimHei","color":"#7c7979","bold":true,"align":"center"},"compId":8},{"type":"Box","props":{"y":960,"x":240,"visible":true,"var":"btn_start"},"compId":10,"child":[{"type":"Button","props":{"y":0,"x":0,"width":240,"visible":true,"stateNum":2,"skin":"gameUI/btn_bg.png","sizeGrid":"20,20,20,20","height":80},"compId":6},{"type":"Image","props":{"y":19,"x":41,"skin":"gameUI/start.png"},"compId":11}],"components":[]}],"loadList":["gameUI/bg.jpg","gameUI/logo.png","gameUI/btn_bg.png","gameUI/start.png"],"loadList3D":[],"components":[]};
		override protected function createChildren():void {
			View.regComponent("Text",Text);
			super.createChildren();
			createView(uiView);

		}

	}
}