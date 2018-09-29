
export default class GameConst
{
    //游戏关卡提升属性
	/***敌人刷新加速****/
	public static createTime:number = 0;
	/***敌人速度提升***/
	public static speedUp:number = 0;
	/***敌人血量提升***/		
	public static hpUp:number = 0;
	/***敌人数量提升***/					
	public static numUp:number = 0;
	/****升级等级所需的成绩数量***/
    public static levelUpScore: number = 10;

	/****敌机血量表****/
	public static hps: number[] = [1, 7, 15];
	/***敌机生成数量表**/
	public static nums: number[] = [1, 1, 1];
	/***敌机速度表***/
	public static speeds:  number[] = [2, 1, 0.3];
	/***敌机被击半径表***/
	public static radius:  number[] = [20, 35, 80];
    
	/**游戏关卡数***/
	public static level:number = 1;
	/**玩家得分***/
	public static score:number = 0;

}