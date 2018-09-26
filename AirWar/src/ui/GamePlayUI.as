/**Created by the LayaAirIDE,do not modify.*/
package ui {
	import laya.ui.*;
	import laya.display.*; 
	import laya.display.Text;

	public class GamePlayUI extends View {
		public var btn_pause:Button;
		public var txt_hp:Text;
		public var txt_level:Text;
		public var txt_score:Text;
		public var gamePause:Box;

		public static var uiView:Object =/*[STATIC SAFE]*/{"type":"View","props":{"width":720,"height":1280},"compId":1,"child":[{"type":"Image","props":{"y":20,"x":10,"width":700,"skin":"gameUI/blank.png","height":45},"compId":7},{"type":"Button","props":{"y":21,"x":618,"var":"btn_pause","stateNum":1,"skin":"gameUI/btn_pause.png"},"compId":6},{"type":"Text","props":{"y":24,"x":41,"width":150,"var":"txt_hp","text":"HP：","height":40,"fontSize":30,"font":"SimHei","bold":true,"align":"left"},"compId":8},{"type":"Text","props":{"y":24,"x":228,"width":150,"var":"txt_level","text":"level：","height":40,"fontSize":30,"font":"SimHei","bold":true,"align":"left"},"compId":9},{"type":"Text","props":{"y":24,"x":415,"width":150,"var":"txt_score","text":"Score:","height":40,"fontSize":30,"font":"SimHei","bold":true,"align":"left"},"compId":10},{"type":"Box","props":{"y":0,"x":0,"width":720,"visible":false,"var":"gamePause","height":1280,"alpha":1},"compId":13,"child":[{"type":"Image","props":{"y":0,"x":0,"width":720,"skin":"gameUI/blank.png","sizeGrid":"2,2,2,2","height":1280},"compId":15},{"type":"Image","props":{"y":411,"x":110,"width":500,"visible":true,"skin":"gameUI/bg.jpg","sizeGrid":"10,10,10,10","height":500},"compId":12},{"type":"Text","props":{"y":801,"x":190,"width":340,"text":"点击任意位置继续游戏","height":44,"fontSize":30,"font":"SimHei","color":"#232222","bold":true,"align":"center"},"compId":14},{"type":"Image","props":{"y":468,"x":214,"skin":"gameUI/gamePause.png"},"compId":16}],"components":[]}],"loadList":["gameUI/blank.png","gameUI/btn_pause.png","gameUI/bg.jpg","gameUI/gamePause.png"],"loadList3D":[],"components":[]};
		override protected function createChildren():void {
			View.regComponent("Text",Text);
			super.createChildren();
			createView(uiView);

		}

	}
}