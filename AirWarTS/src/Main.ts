// import GameConfig from "./GameConfig";
import WebGL = Laya.WebGL;
import Stage = Laya.Stage;
	
class Main 
{
	/**开始页面***/
	private start:GameStart;
	/**地图页面***/
	//private map:GameMap;
	/**游戏中界面***/
	//private play:GamePlay;
	/**游戏结束页面***/
	//private over:GameOver;

	constructor() 
	{
		//初始化引擎，建议增加WebGl模式
		Laya.init(720,1280,WebGL);
		//全屏不等比缩放模式
		Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
		
		 Laya.loader.load("res/atlas/gameUI.atlas",laya.utils.Handler.create(this,this.GameStart));
	}

	private GameStart():void 
	{
		//实例化开始页面
		// this.start = new GameStart();

		let bg:Laya.Sprite = new Laya.Sprite();
		bg.loadImage("background.png");
		Laya.stage.addChild(bg);
		
	}
}


//激活启动类
new Main();
