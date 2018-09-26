/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 

	public class GameBgUI extends View {
		public var bg1:Image;
		public var bg2:Image;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":720,"height":1280},"compId":1,"child":[{"type":"Image","props":{"y":0,"x":0,"var":"bg1","skin":"background.png"},"compId":2},{"type":"Image","props":{"y":-1280,"x":0,"var":"bg2","skin":"background.png"},"compId":3}],"loadList":["background.png"],"loadList3D":[],"components":[]};
		override protected function createChildren():void {
			super.createChildren();
			createView(uiView);

		}

	}
}