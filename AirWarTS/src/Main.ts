// import GameConfig from "./GameConfig";
import WebGL = Laya.WebGL;
import Stage = Laya.Stage;
	
class Main 
{
	/**开始页面***/
	// private var start:GameStart;
	/**地图页面***/
	//private var map:GameMap;
	/**游戏中界面***/
	//private var play:GamePlay;
	/**游戏结束页面***/
	//private var over:GameOver;

	constructor() 
	{
		//初始化引擎，建议增加WebGl模式
		Laya.init(720,1280,WebGL);
		//全屏不等比缩放模式
		Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;

		// Laya.Stat.show();

	}

	private GameStart():void 
	{
		
	}
}


//激活启动类
new Main();
