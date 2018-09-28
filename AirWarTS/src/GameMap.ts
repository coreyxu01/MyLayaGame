
import { ui } from "./ui/layaMaxUI";

/***游戏背景界面***/
export default class GameMap extends ui.GameBgUI
{
    constructor() 
	{
        super();
    }

    /**
     游戏背景移动更新
        */		
    public updateMap():void
    {
        this.y+=1;
        //如果背景图到了下面不可见，立即调整位置到上面循环显示
        //游戏舞台高为1280
        if (this.bg1.y + this.y >= 1280) 
        { 
            this.bg1.y -= 1280 * 2;
        }
        if (this.bg2.y + this.y >= 1280) 
        {
            this.bg2.y -= 1280 * 2;
        }
    }

}