var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./ui/layaMaxUI");
/***游戏背景界面***/
var GameMap = /** @class */ (function (_super) {
    __extends(GameMap, _super);
    function GameMap() {
        return _super.call(this) || this;
    }
    /**
     游戏背景移动更新
        */
    GameMap.prototype.updateMap = function () {
        this.y += 1;
        //如果背景图到了下面不可见，立即调整位置到上面循环显示
        //游戏舞台高为1280
        if (this.bg1.y + this.y >= 1280) {
            this.bg1.y -= 1280 * 2;
        }
        if (this.bg2.y + this.y >= 1280) {
            this.bg2.y -= 1280 * 2;
        }
    };
    return GameMap;
}(layaMaxUI_1.ui.GameBgUI));
exports.default = GameMap;
},{"./ui/layaMaxUI":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./ui/layaMaxUI");
/***游戏界面***/
var GameOver = /** @class */ (function (_super) {
    __extends(GameOver, _super);
    function GameOver() {
        var _this = _super.call(this) || this;
        //"重新开始"按钮鼠标事件
        _this.btn_restart.on(Laya.Event.MOUSE_DOWN, _this, _this.onRestart);
        return _this;
    }
    /**
        游戏重新开始
         */
    GameOver.prototype.onRestart = function () {
        //播放IDE中编辑的按钮动画
        this.ani_restart.play(0, false);
        //监听动画完成事件，注意用once
        this.ani_restart.once(Laya.Event.COMPLETE, this, this.AniComplete);
    };
    /**
     按钮动画播放完成
     */
    GameOver.prototype.AniComplete = function () {
        //发送重新开始事件，在Main类中监听
        this.event("reStart");
        //缓动动画关闭效果。IDE中页面为Dialog才可用
        this.close();
    };
    return GameOver;
}(layaMaxUI_1.ui.GameOverUI));
exports.default = GameOver;
},{"./ui/layaMaxUI":10}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./ui/layaMaxUI");
/***游戏界面***/
var GamePlay = /** @class */ (function (_super) {
    __extends(GamePlay, _super);
    function GamePlay() {
        var _this = _super.call(this) || this;
        //监听暂停按钮事件
        _this.btn_pause.on(Laya.Event.MOUSE_DOWN, _this, _this.onPause);
        return _this;
    }
    /**
         游戏暂停
         */
    GamePlay.prototype.onPause = function () {
        //显示IDE中隐藏的暂停界面
        this.gamePause.visible = true;
        //暂停界面加点击监听（一次）
        this.gamePause.once(Laya.Event.MOUSE_DOWN, this, this.onContinue);
        //时间对象缩放为0就是停止
        Laya.timer.scale = 0;
    };
    /**
     游戏继续
     */
    GamePlay.prototype.onContinue = function () {
        //时间对象缩放为1就是正常速度播放
        Laya.timer.scale = 1;
        //隐藏暂停界面
        this.gamePause.visible = false;
    };
    /****本局游戏数据UI更新***/
    GamePlay.prototype.update = function (hp, level, score) {
        //角色血量更新
        this.txt_hp.text = "HP:" + hp;
        //关卡等级更新
        this.txt_level.text = "LEVEL:" + level;
        //游戏分数更新
        this.txt_score.text = "SCORE:" + score;
    };
    return GamePlay;
}(layaMaxUI_1.ui.GamePlayUI));
exports.default = GamePlay;
},{"./ui/layaMaxUI":10}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./ui/layaMaxUI");
/***游戏开始界面***/
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        /***游戏资源地址数组***/
        _this.assetArr = [{ url: "res/atlas/gameRole.atlas" } //,
            // {url:"sound/achievement.mp3", type:Laya.Loader.SOUND}, 
            // {url:"sound/bullet.mp3", type:Laya.Loader.SOUND},
            // {url:"sound/game_over.mp3", type:Laya.Loader.SOUND},
            // {url:"sound/enemy1_die.mp3", type:Laya.Loader.SOUND},
            // {url:"sound/enemy3_out.mp3", type:Laya.Loader.SOUND}
        ];
        //游戏加载未完成暂时不显示，防止点击出错
        _this.btn_start.visible = false;
        //监听界面是否关闭
        _this.once(laya.events.Event.CLOSE, _this, _this.onClose);
        //加载剩余游戏资源、音乐，加载完成与加载进度回调方法
        Laya.loader.load(_this.assetArr, Laya.Handler.create(_this, _this.onComplete), Laya.Handler.create(_this, _this.onProgress));
        return _this;
    }
    /**
     * 游戏资源加载完成
     */
    GameStart.prototype.onComplete = function () {
        //加载完成
        this.txt_load.text = "资源加载完成,开始游戏吧...";
        //游戏开始按钮显示并弹出
        this.btn_start.visible = true;
        //缓动类弹出动画
        Laya.Tween.from(this.btn_start, { y: this.btn_start.y + 20 }, 1000, Laya.Ease.elasticOut);
    };
    /**
     * 游戏资源加载进度
     * @param loadNum  进度
     */
    GameStart.prototype.onProgress = function (loadNum) {
        //显示加载进度
        this.txt_load.text = "资源加载中，当前进度：" + loadNum * 100 + "%";
    };
    /**
     * 界面关闭
     */
    GameStart.prototype.onClose = function () {
        //从舞台移除自己
        this.removeSelf();
        //只加载一次，因此直接消毁自己
        this.destroy();
    };
    return GameStart;
}(layaMaxUI_1.ui.GameStartUI));
exports.default = GameStart;
},{"./ui/layaMaxUI":10}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebGL = Laya.WebGL;
var Stage = Laya.Stage;
var Event = laya.events.Event;
var GameStart_1 = require("./GameStart");
var GameMap_1 = require("./GameMap");
var GamePlay_1 = require("./GamePlay");
var GameOver_1 = require("./GameOver");
var Hero_1 = require("./Role/Hero");
var Enemy_1 = require("./Role/Enemy");
var Main = /** @class */ (function () {
    function Main() {
        /****敌机血量表****/
        this.hps = [1, 7, 15];
        /***敌机生成数量表**/
        this.nums = [2, 1, 1];
        /***敌机速度表***/
        this.speeds = [3, 2, 1];
        /***敌机被击半径表***/
        this.radius = [20, 35, 80];
        /****主角死亡后游戏结束时间***/
        this.deathTime = 0;
        //游戏关卡提升属性
        /***敌人刷新加速****/
        this.createTime = 0;
        /***敌人速度提升***/
        this.speedUp = 0;
        /***敌人血量提升	***/
        this.hpUp = 0;
        /***敌人数量提升	***/
        this.numUp = 0;
        /****升级等级所需的成绩数量***/
        this.levelUpScore = 10;
        //初始化引擎，建议增加WebGl模式
        Laya.init(720, 1280, WebGL);
        //全屏不等比缩放模式
        Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
        Laya.loader.load("res/atlas/gameUI.atlas", laya.utils.Handler.create(this, this.GameStart));
    }
    Main.prototype.GameStart = function () {
        //实例化开始页面
        this.start = new GameStart_1.default();
        this.start.popup();
        //监听开始游戏开始按钮事件,点击后进入游戏中
        this.start.btn_start.on(Event.MOUSE_UP, this, this.gameInit);
    };
    /**
     游戏中，游戏初始化
        */
    Main.prototype.gameInit = function () {
        //缓动动画关闭效果。IDE中页面为Dialog才可用
        this.start.close();
        //重置关卡数据
        //游戏关卡数
        Main.level = 1;
        //玩家得分
        Main.score = 0;
        //敌人刷新加速
        this.createTime = 0;
        //敌人速度提升
        this.speedUp = 0;
        //敌人血量提升	
        this.hpUp = 0;
        //敌人数量提升				
        this.numUp = 0;
        //升级等级所需的成绩数量
        this.levelUpScore = 10;
        //实例化地图背景页面(如果已实例化，不需要重新new)
        if (this.map == null)
            this.map = new GameMap_1.default();
        //加载到舞台
        Laya.stage.addChild(this.map);
        //实例化角色层并加载到舞台(如果已实例化，不需要重新new)
        if (this.roleLayer == null)
            this.roleLayer = new Laya.Sprite();
        Laya.stage.addChild(this.roleLayer);
        //实例化游戏中UI页面(如果已实例化，不需要重新new)
        if (this.play == null)
            this.play = new GamePlay_1.default();
        //加载到舞台
        Laya.stage.addChild(this.play);
        //实例化主角(如果已实例化，不需要重新new)
        if (this.hero == null)
            this.hero = new Hero_1.default();
        //初始化角色类型、血量，注：速度speed为0，因为主角是通过操控改变位置,阵营为0
        this.hero.init("hero", 10, 0, 30, 0);
        //死亡后会隐藏，重新开始后需显示
        this.hero.visible = true;
        //主角位置修改
        this.hero.pos(360, 800);
        //角色加载到角色层中
        this.roleLayer.addChild(this.hero);
        //鼠标按下监听
        Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
        //鼠标抬起监听
        Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
        //游戏主循环
        Laya.timer.frameLoop(1, this, this.loop);
    };
    /**
     点击开始触发移动
        */
    Main.prototype.onMouseDown = function () {
        //记录鼠标按下时的位置，用于计算鼠标移动量
        this.moveX = Laya.stage.mouseX;
        this.moveY = Laya.stage.mouseY;
        //
        Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    /**
     主角跟随鼠标移动
        */
    Main.prototype.onMouseMove = function () {
        //计算角色移动量
        var xx = this.moveX - Laya.stage.mouseX;
        var yy = this.moveY - Laya.stage.mouseY;
        //更新移动位置
        this.hero.x -= xx;
        this.hero.y -= yy;
        //更新本帧的移动座标
        this.moveX = Laya.stage.mouseX;
        this.moveY = Laya.stage.mouseY;
    };
    /**
     鼠标抬起、关闭移动监听
        */
    Main.prototype.onMouseUp = function () {
        Laya.stage.off(Event.MOUSE_MOVE, this, this.onMouseMove);
    };
    /**
     游戏主循环
     */
    Main.prototype.loop = function () {
        //本局游戏数据更新
        this.play.update(this.hero.hp, Main.level, Main.score);
        //如果主角死亡
        if (this.hero.hp <= 0) {
            //玩家飞机死亡后延迟时间，100帧后弹出游戏结束界面
            this.deathTime++;
            if (this.deathTime >= 100) {
                this.deathTime = 0;
                //游戏结束
                this.gameOver();
                //本方法内后续逻辑不执行
                return;
            }
        }
        else //主角未死亡
         {
            //主角射击
            this.hero.shoot();
            //游戏升级计算
            this.levelUp();
        }
        //地图滚动更新
        this.map.updateMap();
        //游戏碰撞逻辑
        //遍历所有飞机，更改飞机状态
        for (var i = this.roleLayer.numChildren - 1; i > -1; i--) {
            //获取第一个角色
            var role = this.roleLayer.getChildAt(i);
            //角色自身更新
            role.update();
            //如果角色死亡，下一循环
            if (role.hp <= 0)
                continue;
            //碰撞检测
            for (var j = i - 1; j > -1; j--) { //获取第二个角色
                var role1 = this.roleLayer.getChildAt(j);
                //如果role1未死亡且不同阵营
                if (role1.hp > 0 && role1.camp != role.camp) {
                    //获取碰撞半径
                    var hitRadius = role.hitRadius + role1.hitRadius;
                    //碰撞检测
                    if (Math.abs(role.x - role1.x) < hitRadius && Math.abs(role.y - role1.y) < hitRadius) {
                        //如果某一个碰撞体是道具，则吃道具，否则掉血
                        if (role.propType != 0 || role1.propType != 0) {
                            //无法判断哪个是道具，因此都相互吃试试
                            role.eatProp(role1);
                            role1.eatProp(role);
                        }
                        else {
                            //角色相互掉血
                            role.lostHp(1);
                            role1.lostHp(1);
                        }
                    }
                }
            }
        }
        //创建敌机，加入关卡升级数据，提高难度
        //生成小飞机
        if (Laya.timer.currFrame % (80 - this.createTime) == 0) {
            this.createEnemy(0, this.hps[0], this.speeds[0] + this.speedUp, this.nums[0] + this.numUp);
        }
        //生成中型飞机
        if (Laya.timer.currFrame % (170 - this.createTime * 2) == 0) {
            this.createEnemy(1, this.hps[1] + this.hpUp * 2, this.speeds[1] + this.speedUp, this.nums[1] + this.numUp);
        }
        //生成boss
        if (Laya.timer.currFrame % (1000 - this.createTime * 3) == 0) {
            this.createEnemy(2, this.hps[2] + this.hpUp * 6, this.speeds[2], this.nums[2]);
        }
    };
    /**
     游戏升级计算
     */
    Main.prototype.levelUp = function () {
        if (Main.score > this.levelUpScore) {
            //关卡等级提升
            Main.level++;
            //角色血量增加，最大30
            this.hero.hp = Math.min(this.hero.hp + Main.level * 1, 30);
            //关卡越高，创建敌机间隔越短
            this.createTime = Main.level < 30 ? Main.level * 2 : 60;
            //关卡越高，敌机飞行速度越高
            this.speedUp = Math.floor(Main.level / 6);
            //关卡越高，敌机血量越高
            this.hpUp = Math.floor(Main.level / 8);
            //关卡越高，敌机数量越多
            this.numUp = Math.floor(Main.level / 10);
            //提高下一级的升级分数
            this.levelUpScore += Main.level * 10;
        }
    };
    /**
     *  创建敌人
     * @param index 	敌人编号
     * @param hp   		 敌人血量
     * @param speed		敌人速度
     * @param num		敌人数量
     */
    Main.prototype.createEnemy = function (index, hp, speed, num) {
        for (var i = 0; i < num; i++) {
            //创建敌人，从对象池创建
            var enemy = Laya.Pool.getItemByClass("Enemy", Enemy_1.default);
            //初始化敌人
            enemy.init("enemy" + (index + 1), hp, speed, this.radius[index], 1);
            //从对象池中创建的对象死亡前被隐藏了，因此要重新初始化显示，否则新创建角色不会显示出来
            enemy.visible = true;
            //随机位置
            enemy.pos(Math.random() * (720 - 80) + 50, -Math.random() * 100);
            //添加到舞台上
            this.roleLayer.addChild(enemy);
        }
    };
    /**
     游戏结束
     */
    Main.prototype.gameOver = function () {
        //移除所有舞台事件，鼠标操控
        Laya.stage.offAll();
        //移除地图背景
        this.map.removeSelf();
        //移除游戏中UI
        this.play.removeSelf();
        //清空角色层子对象
        this.roleLayer.removeChildren(0, this.roleLayer.numChildren - 1);
        //移除角色层
        this.roleLayer.removeSelf();
        //去除游戏主循环
        Laya.timer.clear(this, this.loop);
        //实例化游戏结束页面
        if (this.over == null)
            this.over = new GameOver_1.default();
        //游戏积分显示
        this.over.txt_score.text = Main.score.toString();
        //以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
        this.over.popup();
        //重新开始事件监听,点击后进入游戏中
        this.over.on("reStart", this, this.gameInit);
    };
    /**游戏关卡数***/
    Main.level = 1;
    /**玩家得分***/
    Main.score = 0;
    return Main;
}());
exports.default = Main;
//激活启动类
new Main();
},{"./GameMap":1,"./GameOver":2,"./GamePlay":3,"./GameStart":4,"./Role/Enemy":6,"./Role/Hero":7}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var Main_1 = require("../Main");
var ufo_1 = require("./ufo");
//角色
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * 角色失血
    */
    Enemy.prototype.lostHp = function (lostHp) {
        //减血
        this.hp -= lostHp;
        //根据血量判断
        if (this.hp > 0) {
            //如果未死亡，则播放受击动画
            this.playAction("hit");
        }
        else {
            //添加死亡动画
            this.playAction("die");
            //添加死亡音效
            // Laya.SoundManager.playSound("sound/game_over.mp3");
            Main_1.default.score++;
        }
    };
    /***动画完成后回调方法***/
    Enemy.prototype.onComplete = function () {
        _super.prototype.onComplete.call(this);
        //如果死亡动画播放完成
        if (this.action == "die") {
            //update()方法中，隐藏后进行回收
            this.visible = false;
            this.lostProp();
        }
        else if (this.action == "hit") //如果是受伤动画，下一帧播放飞行动画
         {
            this.playAction("fly");
        }
    };
    /**角色死亡掉落物品**/
    Enemy.prototype.lostProp = function () {
        if (this.type != "enemy3")
            return;
        //从对象池里面创建一个道具
        var prop = Laya.Pool.getItemByClass("ufo", ufo_1.default);
        //生成随机道具类型
        var r = Math.random();
        var num = (r < 0.7) ? 1 : 2;
        //重新初始化道具属性,阵营为敌方（只与主角发生碰撞）
        prop.init("ufo" + num, 1, 2, 30, 1);
        //道具类型
        prop.propType = num;
        //强制显示
        prop.visible = true;
        //生成的位置为死亡者位置
        prop.pos(this.x, this.y);
        //加载到父容器 
        this.parent.addChild(prop);
    };
    /**角色死亡并回收到对象池**/
    Enemy.prototype.die = function () {
        _super.prototype.die.call(this);
        //回收到对象池
        Laya.Pool.recover("Enemy", this);
    };
    return Enemy;
}(Role_1.default));
exports.default = Enemy;
},{"../Main":5,"./Role":8,"./ufo":9}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var Main_1 = require("../Main");
//角色
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * 角色失血
    */
    Hero.prototype.lostHp = function (lostHp) {
        console.log("Hero lostHp!!!!!!");
        //减血
        this.hp -= lostHp;
        //根据血量判断
        if (this.hp > 0) {
            //如果未死亡，则播放受击动画
            this.playAction("hit");
        }
        else {
            //添加死亡动画
            this.playAction("die");
            //添加死亡音效
            Laya.SoundManager.playSound("sound/game_over.mp3");
        }
    };
    /**
 * 角色吃到道具，加血或子弹级别
 */
    Hero.prototype.eatProp = function (prop) {
        //如果调用者是主角或prop不是道具，则返回
        if (prop.propType == 0)
            return;
        //添加吃强化道具音效					
        Laya.SoundManager.playSound("sound/achievement.mp3");
        //吃子弹箱
        if (prop.propType == 1) {
            //积分增加
            Main_1.default.score++;
            //子弹级别增加
            this.bulletLevel++;
            //子弹每升2级，子弹数量增加1，最大数量限制在4个
            this.shootNum = Math.min(Math.floor(this.bulletLevel / 2) + 1, 4);
            //子弹级别越高，发射频率越快
            this.shootInterval = 300 - 8 * (this.bulletLevel > 8 ? 8 : this.bulletLevel);
        }
        else if (prop.propType == 2) //吃血
         {
            //血量增加
            this.hp += 2;
            //积分增加
            Main_1.default.score += 1;
        }
        //道具死亡
        prop.hp = 0;
        //道具吃完后消失，下一帧回收
        prop.visible = false;
    };
    return Hero;
}(Role_1.default));
exports.default = Hero;
},{"../Main":5,"./Role":8}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = Laya.Animation;
var Event = laya.events.Event;
//角色
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        var _this = _super.call(this) || this;
        /***飞机的血量***/
        _this.hp = 0;
        /***飞机的速度***/
        _this.speed = 0;
        /***射击间隔***/
        _this.shootInterval = 300;
        /***下次射击时间***/
        _this.shootTime = 300;
        /****道具类型 0:飞机或子弹，1:子弹箱，2:血瓶***/
        _this.propType = 0;
        /***子弹级别（吃子弹道具后升级）***/
        _this.bulletLevel = 0;
        /***同时射击子弹数量***/
        _this.shootNum = 1;
        /***子弹偏移的位置***/
        _this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        //实例化动画
        _this.roleAni = new Animation();
        //加载IDE编辑的动画文件
        _this.roleAni.loadAnimation("GameRole.ani");
        return _this;
    }
    /**
     * 角色初始化
     * @param type  角色类型 ---“hero”:玩家飞机，“enemy1-3”：敌人飞机、“bulle:1-2”：子弹、"ufo1-2":道具
     * @param hp      血量
     * @param speed   速度
     * @param hitRadius   碰撞半径
     * @param camp    阵营
     */
    Role.prototype.init = function (type, hp, speed, hitRadius, camp) {
        //角色初始化属性
        this.type = type;
        this.hp = hp;
        this.speed = speed;
        this.hitRadius = hitRadius;
        this.camp = camp;
        //道具属性初始为0
        this.propType = 0;
        //加载动画对象
        this.addChild(this.roleAni);
        //监听动画完成事件
        this.roleAni.on(Event.COMPLETE, this, this.onComplete);
        //播放默认飞行动画
        this.playAction("fly");
    };
    /***动画完成后回调方法***/
    Role.prototype.onComplete = function () {
        //如果角色还未有宽，获得角色宽高	
        if (this.roleAni.width == 0) {
            //获得动画矩形边界
            var bounds = this.roleAni.getBounds();
            //角色 宽高赋值
            this.roleAni.size(bounds.width, bounds.height);
        }
        // //如果死亡动画播放完成
        // if(this.action=="die")
        // {
        //     //update()方法中，隐藏后进行回收
        //     this.visible=false;
        //     this.lostProp();
        // }
        // else if(this.action=="hit")//如果是受伤动画，下一帧播放飞行动画
        // {
        //     this.playAction("fly");
        // }
    };
    /**
     * 角色失血
     */
    Role.prototype.lostHp = function (lostHp) {
    };
    /**
     * 角色吃到道具，加血或子弹级别
     */
    Role.prototype.eatProp = function (prop) {
    };
    /**
     * 播放动画
     * @param action 动画状态   "fly"、"hit"、"die"
     */
    Role.prototype.playAction = function (action) {
        this.action = action;
        //播放角色动画,name=角色类型_动画状态，如：hero_fly
        this.roleAni.play(0, true, this.type + "_" + action);
    };
    /**
     * 角色更新,边界检查
     */
    Role.prototype.update = function () {
        //如果角色隐藏，角色消亡并回收
        if (!this.visible) {
            //主角不死亡回收，只隐藏，以免其他对象以主角回对象创建，发生引用修改
            if (this.type != "hero")
                this.die();
            return;
        }
        //角色根据速度飞行
        this.y += this.speed;
        //如果移动到显示区域以外，则移除
        if (this.type != "hero" && (this.y > 1280 + 100 || this.y < -150)) {
            this.visible = false;
        }
        //主角边界检查
        if (this.type == "hero") {
            //需减去角色宽或高的一半，因为在IDE中制作动画时，我们把角色的中心做为了角色对象的原点
            //判断是否左右超出
            if (this.x < this.roleAni.width / 2) {
                this.x = this.roleAni.width / 2;
            }
            else if (this.x > 720 - this.roleAni.width / 2) {
                this.x = 720 - this.roleAni.width / 2;
            }
            //判断是否上下超出
            if (this.y < this.roleAni.height / 2) {
                this.y = this.roleAni.height / 2;
            }
            else if (this.y > 1280 - this.roleAni.height / 2) {
                this.y = 1280 - this.roleAni.height / 2;
            }
        }
    };
    /**
     角色射击，生成子弹
     */
    Role.prototype.shoot = function () {
        //获取当前时间
        var time = Laya.Browser.now();
        //如果当前时间大于下次射击时间
        if (time > this.shootTime) {
            //获得发射子弹的位置数组
            var pos = this.bulletPos[this.shootNum - 1];
            for (var i = 0; i < pos.length; i++) {
                //更新下次子弹射击的时间
                this.shootTime = time + this.shootInterval;
                //从对象池里面创建一个子弹
                var bullet = Laya.Pool.getItemByClass("Bullet", Role);
                //初始化子弹信息
                bullet.init("bullet2", 1, -10, 1, this.camp);
                //子弹消失后会不显示，重新初始化
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(this.x + pos[i], this.y - 80);
                //添加到角色层
                this.parent.addChild(bullet);
                //添加子弹音效					
                //Laya.SoundManager.playSound("sound/bullet.mp3");
            }
        }
    };
    /**角色死亡并回收到对象池**/
    Role.prototype.die = function () {
        //角色动画停止
        this.roleAni.stop();
        //去除所有动画监听
        this.roleAni.offAll();
        //从舞台移除
        this.removeSelf();
    };
    return Role;
}(Laya.Sprite));
exports.default = Role;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
//角色
var ufo = /** @class */ (function (_super) {
    __extends(ufo, _super);
    function ufo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 角色失血
     */
    ufo.prototype.lostHp = function (lostHp) {
        //隐藏，下一帧回收
        this.visible = false;
    };
    /**角色死亡并回收到对象池**/
    ufo.prototype.die = function () {
        _super.prototype.die.call(this);
        //回收到对象池
        Laya.Pool.recover("ufo", this);
    };
    return ufo;
}(Role_1.default));
exports.default = ufo;
},{"./Role":8}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
var View = Laya.View;
var Dialog = Laya.Dialog;
var ui;
(function (ui) {
    var GameBgUI = /** @class */ (function (_super) {
        __extends(GameBgUI, _super);
        function GameBgUI() {
            return _super.call(this) || this;
        }
        GameBgUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(GameBgUI.uiView);
        };
        GameBgUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "var": "bg1", "skin": "background.png" }, "compId": 2 }, { "type": "Image", "props": { "y": -1280, "x": 0, "var": "bg2", "skin": "background.png" }, "compId": 3 }], "loadList": ["background.png"], "loadList3D": [], "components": [] };
        return GameBgUI;
    }(View));
    ui.GameBgUI = GameBgUI;
    var GameOverUI = /** @class */ (function (_super) {
        __extends(GameOverUI, _super);
        function GameOverUI() {
            return _super.call(this) || this;
        }
        GameOverUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(GameOverUI.uiView);
        };
        GameOverUI.uiView = { "type": "Dialog", "props": { "width": 720, "height": 1280 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "skin": "gameUI/bg.jpg", "sizeGrid": "4,4,4,4", "height": 1280 }, "compId": 2 }, { "type": "Image", "props": { "y": 378, "x": 229, "skin": "gameUI/gameOver.png" }, "compId": 3 }, { "type": "Text", "props": { "y": 1200, "x": 19, "width": 681, "text": "LayaAir1.7.3引擎教学演示版", "height": 29, "fontSize": 26, "font": "SimHei", "color": "#7c7979", "bold": true, "align": "center", "runtime": "laya.display.Text" }, "compId": 5 }, { "type": "Text", "props": { "y": 575, "x": 244, "width": 144, "text": "本局积分：", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#7c7979", "bold": true, "align": "center", "runtime": "laya.display.Text" }, "compId": 6 }, { "type": "Text", "props": { "y": 575, "x": 363, "width": 128, "var": "txt_score", "text": "1200", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#7c7979", "bold": true, "align": "center", "runtime": "laya.display.Text" }, "compId": 7 }, { "type": "Box", "props": { "y": 960, "x": 239, "var": "btn_restart" }, "compId": 10, "child": [{ "type": "Button", "props": { "y": 0, "x": 1, "width": 240, "stateNum": 2, "skin": "gameUI/btn_bg.png", "sizeGrid": "10,10,10,10", "height": 80 }, "compId": 11 }, { "type": "Image", "props": { "y": 18, "x": 41, "skin": "gameUI/restart.png" }, "compId": 12 }], "components": [] }], "animations": [{ "nodes": [{ "target": 10, "keyframes": { "y": [{ "value": 970, "tweenMethod": "elasticOut", "tween": true, "target": 10, "key": "y", "index": 0 }, { "value": 960, "tweenMethod": "linearNone", "tween": true, "target": 10, "key": "y", "index": 8 }] } }], "name": "ani_restart", "id": 1, "frameRate": 24, "action": 0 }], "loadList": ["gameUI/bg.jpg", "gameUI/gameOver.png", "gameUI/btn_bg.png", "gameUI/restart.png"], "loadList3D": [], "components": [] };
        return GameOverUI;
    }(Dialog));
    ui.GameOverUI = GameOverUI;
    var GamePlayUI = /** @class */ (function (_super) {
        __extends(GamePlayUI, _super);
        function GamePlayUI() {
            return _super.call(this) || this;
        }
        GamePlayUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(GamePlayUI.uiView);
        };
        GamePlayUI.uiView = { "type": "View", "props": { "width": 720, "height": 1280 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 20, "x": 10, "width": 700, "skin": "gameUI/blank.png", "height": 45 }, "compId": 7 }, { "type": "Button", "props": { "y": 21, "x": 618, "var": "btn_pause", "stateNum": 1, "skin": "gameUI/btn_pause.png" }, "compId": 6 }, { "type": "Text", "props": { "y": 24, "x": 41, "width": 150, "var": "txt_hp", "text": "HP：", "height": 40, "fontSize": 30, "font": "SimHei", "bold": true, "align": "left", "runtime": "laya.display.Text" }, "compId": 8 }, { "type": "Text", "props": { "y": 24, "x": 228, "width": 150, "var": "txt_level", "text": "level：", "height": 40, "fontSize": 30, "font": "SimHei", "bold": true, "align": "left", "runtime": "laya.display.Text" }, "compId": 9 }, { "type": "Text", "props": { "y": 24, "x": 415, "width": 150, "var": "txt_score", "text": "Score:", "height": 40, "fontSize": 30, "font": "SimHei", "bold": true, "align": "left", "runtime": "laya.display.Text" }, "compId": 10 }, { "type": "Box", "props": { "y": 0, "x": 0, "width": 720, "visible": false, "var": "gamePause", "height": 1280, "alpha": 1 }, "compId": 13, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "skin": "gameUI/blank.png", "sizeGrid": "2,2,2,2", "height": 1280 }, "compId": 15 }, { "type": "Image", "props": { "y": 411, "x": 110, "width": 500, "visible": true, "skin": "gameUI/bg.jpg", "sizeGrid": "10,10,10,10", "height": 500 }, "compId": 12 }, { "type": "Text", "props": { "y": 801, "x": 190, "width": 340, "text": "点击任意位置继续游戏", "height": 44, "fontSize": 30, "font": "SimHei", "color": "#232222", "bold": true, "align": "center", "runtime": "laya.display.Text" }, "compId": 14 }, { "type": "Image", "props": { "y": 468, "x": 214, "skin": "gameUI/gamePause.png" }, "compId": 16 }], "components": [] }], "loadList": ["gameUI/blank.png", "gameUI/btn_pause.png", "gameUI/bg.jpg", "gameUI/gamePause.png"], "loadList3D": [], "components": [] };
        return GamePlayUI;
    }(View));
    ui.GamePlayUI = GamePlayUI;
    var GameStartUI = /** @class */ (function (_super) {
        __extends(GameStartUI, _super);
        function GameStartUI() {
            return _super.call(this) || this;
        }
        GameStartUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(GameStartUI.uiView);
        };
        GameStartUI.uiView = { "type": "Dialog", "props": { "width": 720, "height": 1280 }, "compId": 1, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 720, "skin": "gameUI/bg.jpg", "sizeGrid": "4,4,4,4", "height": 1280 }, "compId": 2 }, { "type": "Image", "props": { "y": 378, "x": 179, "skin": "gameUI/logo.png" }, "compId": 3 }, { "type": "Text", "props": { "y": 587, "x": 20, "width": 681, "var": "txt_load", "text": "游戏资源加载进度", "height": 29, "fontSize": 30, "font": "SimHei", "color": "#1c1c1c", "align": "center", "runtime": "laya.display.Text" }, "compId": 4 }, { "type": "Box", "props": { "y": 960, "x": 240, "visible": true, "var": "btn_start" }, "compId": 10, "child": [{ "type": "Button", "props": { "y": 0, "x": 0, "width": 240, "visible": true, "stateNum": 2, "skin": "gameUI/btn_bg.png", "sizeGrid": "20,20,20,20", "height": 80 }, "compId": 6 }, { "type": "Image", "props": { "y": 19, "x": 41, "skin": "gameUI/start.png" }, "compId": 11 }], "components": [] }], "loadList": ["gameUI/bg.jpg", "gameUI/logo.png", "gameUI/btn_bg.png", "gameUI/start.png"], "loadList3D": [], "components": [] };
        return GameStartUI;
    }(Dialog));
    ui.GameStartUI = GameStartUI;
})(ui = exports.ui || (exports.ui = {}));
},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZU1hcC50cyIsInNyYy9HYW1lT3Zlci50cyIsInNyYy9HYW1lUGxheS50cyIsInNyYy9HYW1lU3RhcnQudHMiLCJzcmMvTWFpbi50cyIsInNyYy9Sb2xlL0VuZW15LnRzIiwic3JjL1JvbGUvSGVyby50cyIsInNyYy9Sb2xlL1JvbGUudHMiLCJzcmMvUm9sZS91Zm8udHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBLDRDQUFvQztBQUVwQyxjQUFjO0FBQ2Q7SUFBcUMsMkJBQVc7SUFFNUM7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFFRDs7VUFFTTtJQUNDLDJCQUFTLEdBQWhCO1FBRUksSUFBSSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUM7UUFDViw0QkFBNEI7UUFDNUIsWUFBWTtRQUNaLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQy9CO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQy9CO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0F6QkEsQUF5QkMsQ0F6Qm9DLGNBQUUsQ0FBQyxRQUFRLEdBeUIvQzs7Ozs7QUM1QkQsNENBQW9DO0FBRXBDLFlBQVk7QUFDWjtJQUFzQyw0QkFBYTtJQUUvQztRQUFB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Q3BCLE9BQU87UUFDUCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBRyxDQUFDLEVBQ3JEO1lBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0Y7UUFDRCxRQUFRO1FBQ1IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDM0Q7WUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFFLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxFQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxRztRQUNELFFBQVE7UUFDUixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUM1RDtZQUNDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxD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UUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLHFCQUFxQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMscUJBQXFCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsZUFBZSxFQUFDLHFCQUFxQixFQUFDLG1CQUFtQixFQUFDLG9CQUFvQixDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFNcm9ELGlCQUFDO0tBVkQsQUFVQyxDQVYrQixNQUFNLEdBVXJDO0lBVlksYUFBVSxhQVV0QixDQUFBO0lBQ0Q7UUFBZ0MsOEJBQUk7UUFPaEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBTGMsaUJBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxrQkFBa0IsRUFBQyxzQkFBc0IsRUFBQyxlQUFlLEVBQUMsc0JBQXNCLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztRQU10c0QsaUJBQUM7S0FaRCxBQVlDLENBWitCLElBQUksR0FZbkM7SUFaWSxhQUFVLGFBWXRCLENBQUE7SUFDRDtRQUFpQywrQkFBTTtRQUluQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsb0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFMYyxrQkFBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxtQkFBbUIsRUFBQyxrQkFBa0IsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1FBTS84QixrQkFBQztLQVRELEFBU0MsQ0FUZ0MsTUFBTSxHQVN0QztJQVRZLGNBQVcsY0FTdkIsQ0FBQTtBQUNMLENBQUMsRUE3Q2EsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBNkNmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+iDjOaZr+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1hcCBleHRlbmRzIHVpLkdhbWVCZ1VJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg5ri45oiP6IOM5pmv56e75Yqo5pu05pawXHJcbiAgICAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgdXBkYXRlTWFwKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMueSs9MTtcclxuICAgICAgICAvL+WmguaenOiDjOaZr+WbvuWIsOS6huS4i+mdouS4jeWPr+inge+8jOeri+WNs+iwg+aVtOS9jee9ruWIsOS4iumdouW+queOr+aYvuekulxyXG4gICAgICAgIC8v5ri45oiP6Iie5Y+w6auY5Li6MTI4MFxyXG4gICAgICAgIGlmICh0aGlzLmJnMS55ICsgdGhpcy55ID49IDEyODApIFxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIHRoaXMuYmcxLnkgLT0gMTI4MCAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmJnMi55ICsgdGhpcy55ID49IDEyODApIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iZzIueSAtPSAxMjgwICogMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT3ZlciBleHRlbmRzIHVpLkdhbWVPdmVyVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcdC8vXCLph43mlrDlvIDlp4tcIuaMiemSrum8oOagh+S6i+S7tlxyXG5cdFx0XHR0aGlzLmJ0bl9yZXN0YXJ0Lm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25SZXN0YXJ0KTtcclxuICAgIH1cclxuXHQvKipcclxuXHRcdOa4uOaIj+mHjeaWsOW8gOWni1xyXG5cdFx0ICovXHRcdFxyXG5cdFx0cHJpdmF0ZSBvblJlc3RhcnQoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pKt5pS+SURF5Lit57yW6L6R55qE5oyJ6ZKu5Yqo55S7XHJcblx0XHRcdHRoaXMuYW5pX3Jlc3RhcnQucGxheSgwLGZhbHNlKTtcclxuXHRcdFx0Ly/nm5HlkKzliqjnlLvlrozmiJDkuovku7bvvIzms6jmhI/nlKhvbmNlXHJcblx0XHRcdHRoaXMuYW5pX3Jlc3RhcnQub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5BbmlDb21wbGV0ZSk7XHJcblx0XHR9XHJcblx0XHQvKipcclxuXHRcdCDmjInpkq7liqjnlLvmkq3mlL7lrozmiJBcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBBbmlDb21wbGV0ZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/lj5HpgIHph43mlrDlvIDlp4vkuovku7bvvIzlnKhNYWlu57G75Lit55uR5ZCsXHJcblx0XHRcdHRoaXMuZXZlbnQoXCJyZVN0YXJ0XCIpXHJcblx0XHRcdC8v57yT5Yqo5Yqo55S75YWz6Zet5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdH1cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVQbGF5IGV4dGVuZHMgdWkuR2FtZVBsYXlVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8v55uR5ZCs5pqC5YGc5oyJ6ZKu5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5idG5fcGF1c2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vblBhdXNlKVxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHRcdCDmuLjmiI/mmoLlgZxcclxuXHRcdCAqL1x0XHJcblx0XHRwcml2YXRlIG9uUGF1c2UoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pi+56S6SURF5Lit6ZqQ6JeP55qE5pqC5YGc55WM6Z2iXHJcblx0XHRcdHRoaXMuZ2FtZVBhdXNlLnZpc2libGU9dHJ1ZTtcclxuXHRcdFx0Ly/mmoLlgZznlYzpnaLliqDngrnlh7vnm5HlkKzvvIjkuIDmrKHvvIlcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2Uub25jZShMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uQ29udGludWUpXHJcblx0XHRcdFx0XHJcblx0XHRcdC8v5pe26Ze05a+56LGh57yp5pS+5Li6MOWwseaYr+WBnOatolxyXG5cdFx0XHRMYXlhLnRpbWVyLnNjYWxlPTA7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0IOa4uOaIj+e7p+e7rVxyXG5cdFx0ICovXHRcclxuXHRcdHByaXZhdGUgb25Db250aW51ZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/ml7bpl7Tlr7nosaHnvKnmlL7kuLox5bCx5piv5q2j5bi46YCf5bqm5pKt5pS+XHJcblx0XHRcdExheWEudGltZXIuc2NhbGU9MTtcclxuXHRcdFx0Ly/pmpDol4/mmoLlgZznlYzpnaJcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2UudmlzaWJsZT1mYWxzZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqKirmnKzlsYDmuLjmiI/mlbDmja5VSeabtOaWsCoqKi9cclxuXHRcdHB1YmxpYyB1cGRhdGUoaHA6bnVtYmVyLGxldmVsOm51bWJlcixzY29yZTpudW1iZXIpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/op5LoibLooYDph4/mm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfaHAudGV4dD1cIkhQOlwiK2hwO1xyXG5cdFx0XHQvL+WFs+WNoeetiee6p+abtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9sZXZlbC50ZXh0PVwiTEVWRUw6XCIrbGV2ZWw7XHJcblx0XHRcdC8v5ri45oiP5YiG5pWw5pu05pawXHJcblx0XHRcdHRoaXMudHh0X3Njb3JlLnRleHQ9XCJTQ09SRTpcIitzY29yZTtcclxuXHRcdH1cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+W8gOWni+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXJ0IGV4dGVuZHMgdWkuR2FtZVN0YXJ0VUlcclxue1xyXG4gICAgLyoqKua4uOaIj+i1hOa6kOWcsOWdgOaVsOe7hCoqKi9cclxuICAgICBwcml2YXRlIGFzc2V0QXJyOmFueT1be3VybDpcInJlcy9hdGxhcy9nYW1lUm9sZS5hdGxhc1wifS8vLFxyXG4gICAgLy8ge3VybDpcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfSwgXHJcbiAgICAvLyB7dXJsOlwic291bmQvYnVsbGV0Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfSxcclxuICAgIC8vIHt1cmw6XCJzb3VuZC9nYW1lX292ZXIubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9LFxyXG4gICAgLy8ge3VybDpcInNvdW5kL2VuZW15MV9kaWUubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9LFxyXG4gICAgLy8ge3VybDpcInNvdW5kL2VuZW15M19vdXQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICBdXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL+a4uOaIj+WKoOi9veacquWujOaIkOaaguaXtuS4jeaYvuekuu+8jOmYsuatoueCueWHu+WHuumUmVxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvL+ebkeWQrOeVjOmdouaYr+WQpuWFs+mXrVxyXG4gICAgICAgIHRoaXMub25jZShsYXlhLmV2ZW50cy5FdmVudC5DTE9TRSx0aGlzLHRoaXMub25DbG9zZSk7XHJcbiAgICAgICAgLy/liqDovb3liankvZnmuLjmiI/otYTmupDjgIHpn7PkuZDvvIzliqDovb3lrozmiJDkuI7liqDovb3ov5vluqblm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMuYXNzZXRBcnIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Db21wbGV0ZSksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Qcm9ncmVzcykpXHJcbiAgICB9XHJcblxyXG4gICAgXHQvKipcclxuXHRcdCAqIOa4uOaIj+i1hOa6kOWKoOi9veWujOaIkFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIG9uQ29tcGxldGUoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5Yqg6L295a6M5oiQXHJcblx0XHRcdHRoaXMudHh0X2xvYWQudGV4dD1cIui1hOa6kOWKoOi9veWujOaIkCzlvIDlp4vmuLjmiI/lkKcuLi5cIjtcclxuXHRcdFx0Ly/muLjmiI/lvIDlp4vmjInpkq7mmL7npLrlubblvLnlh7pcclxuXHRcdFx0dGhpcy5idG5fc3RhcnQudmlzaWJsZT10cnVlO1xyXG5cdFx0XHQvL+e8k+WKqOexu+W8ueWHuuWKqOeUu1xyXG5cdFx0XHRMYXlhLlR3ZWVuLmZyb20odGhpcy5idG5fc3RhcnQse3k6dGhpcy5idG5fc3RhcnQueSsyMH0sMTAwMCxMYXlhLkVhc2UuZWxhc3RpY091dCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICog5ri45oiP6LWE5rqQ5Yqg6L296L+b5bqmXHJcblx0XHQgKiBAcGFyYW0gbG9hZE51bSAg6L+b5bqmXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgb25Qcm9ncmVzcyhsb2FkTnVtOm51bWJlcik6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aYvuekuuWKoOi9vei/m+W6plxyXG5cdFx0XHR0aGlzLnR4dF9sb2FkLnRleHQ9XCLotYTmupDliqDovb3kuK3vvIzlvZPliY3ov5vluqbvvJpcIitsb2FkTnVtKjEwMCtcIiVcIjtcclxuXHRcdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouWFs+mXrVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2xvc2UoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ku47oiJ7lj7Dnp7vpmaToh6rlt7FcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAvL+WPquWKoOi9veS4gOasoe+8jOWboOatpOebtOaOpea2iOavgeiHquW3sVxyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBXZWJHTCA9IExheWEuV2ViR0w7XHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2U7XHJcbmltcG9ydCBFdmVudCA9IGxheWEuZXZlbnRzLkV2ZW50O1xyXG5pbXBvcnQgR2FtZVN0YXJ0IGZyb20gXCIuL0dhbWVTdGFydFwiO1xyXG5pbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTWFwXCI7XHJcbmltcG9ydCBHYW1lUGxheSBmcm9tIFwiLi9HYW1lUGxheVwiO1xyXG5pbXBvcnQgR2FtZU92ZXIgZnJvbSBcIi4vR2FtZU92ZXJcIjtcclxuaW1wb3J0IFJvbGVcdGZyb20gXCIuL1JvbGUvUm9sZVwiO1xyXG5pbXBvcnQgSGVyb1x0ZnJvbSBcIi4vUm9sZS9IZXJvXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9Sb2xlL0VuZW15XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vUm9sZS9CdWxsZXRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gXHJcbntcclxuXHQvKirlvIDlp4vpobXpnaIqKiovXHJcblx0cHJpdmF0ZSBzdGFydDpHYW1lU3RhcnQ7XHJcblx0Lyoq5Zyw5Zu+6aG16Z2iKioqL1xyXG5cdHByaXZhdGUgbWFwOkdhbWVNYXA7XHJcblx0Lyoq5ri45oiP5Lit55WM6Z2iKioqL1xyXG5cdHByaXZhdGUgcGxheTpHYW1lUGxheTtcclxuXHQvKirmuLjmiI/nu5PmnZ/pobXpnaIqKiovXHJcblx0cHJpdmF0ZSBvdmVyOkdhbWVPdmVyO1xyXG5cclxuXHQvKirmuLjmiI/lhbPljaHmlbAqKiovXHJcblx0cHVibGljIHN0YXRpYyBsZXZlbDpudW1iZXI9MTtcclxuXHQvKirnjqnlrrblvpfliIYqKiovXHJcblx0cHVibGljIHN0YXRpYyBzY29yZTpudW1iZXI9MDtcclxuXHRcclxuXHQvKirop5LoibLlsYLlrrnlmagqKiovXHJcblx0cHJpdmF0ZSByb2xlTGF5ZXI6TGF5YS5TcHJpdGU7XHJcblx0Lyoq546p5a625Li76KeSKioqL1xyXG5cdHByaXZhdGUgaGVybzpSb2xlO1xyXG5cdFxyXG5cdC8qKum8oOagh+S4iuS4gOW4p3jluqfmoIcqKiAqL1x0XHRcclxuXHRwcml2YXRlIG1vdmVYOm51bWJlcjtcclxuXHQvKirpvKDmoIfkuIrkuIDluKd55bqn5qCHKiogKi9cdFxyXG5cdHByaXZhdGUgbW92ZVk6bnVtYmVyO1xyXG5cdFxyXG5cdC8qKioq5pWM5py66KGA6YeP6KGoKioqKi9cclxuXHRwcml2YXRlIGhwczogbnVtYmVyW10gPSBbMSwgNywgMTVdO1xyXG5cdC8qKirmlYzmnLrnlJ/miJDmlbDph4/ooagqKi9cclxuXHRwcml2YXRlIG51bXM6IG51bWJlcltdID0gWzIsIDEsIDFdO1xyXG5cdC8qKirmlYzmnLrpgJ/luqbooagqKiovXHJcblx0cHJpdmF0ZSBzcGVlZHM6ICBudW1iZXJbXSA9IFszLCAyLCAxXTtcclxuXHQvKioq5pWM5py66KKr5Ye75Y2K5b6E6KGoKioqL1xyXG5cdHByaXZhdGUgcmFkaXVzOiAgbnVtYmVyW10gPSBbMjAsIDM1LCA4MF07XHJcblx0XHJcblx0LyoqKirkuLvop5LmrbvkuqHlkI7muLjmiI/nu5PmnZ/ml7bpl7QqKiovXHJcblx0cHJpdmF0ZSBkZWF0aFRpbWU6bnVtYmVyPTBcclxuXHRcdFxyXG5cdC8v5ri45oiP5YWz5Y2h5o+Q5Y2H5bGe5oCnXHJcblx0LyoqKuaVjOS6uuWIt+aWsOWKoOmAnyoqKiovXHJcblx0cHJpdmF0ZSBjcmVhdGVUaW1lOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uumAn+W6puaPkOWNhyoqKi9cclxuXHRwcml2YXRlIHNwZWVkVXA6bnVtYmVyID0gMDtcclxuXHQvKioq5pWM5Lq66KGA6YeP5o+Q5Y2HXHQqKiovXHRcdFxyXG5cdHByaXZhdGUgaHBVcDpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrmlbDph4/mj5DljYdcdCoqKi9cdFx0XHRcdFx0XHJcblx0cHJpdmF0ZSBudW1VcDpudW1iZXIgPSAwO1xyXG5cdC8qKioq5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePKioqL1xyXG5cdHByaXZhdGUgbGV2ZWxVcFNjb3JlOiBudW1iZXIgPSAxMDtcclxuXHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7XHJcblx0XHQvL+WIneWni+WMluW8leaTju+8jOW7uuiuruWinuWKoFdlYkds5qih5byPXHJcblx0XHRMYXlhLmluaXQoNzIwLDEyODAsV2ViR0wpO1xyXG5cdFx0Ly/lhajlsY/kuI3nrYnmr5TnvKnmlL7mqKHlvI9cclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfRVhBQ1RGSVQ7XHJcblx0XHRcclxuXHRcdExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvZ2FtZVVJLmF0bGFzXCIsbGF5YS51dGlscy5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuR2FtZVN0YXJ0KSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIEdhbWVTdGFydCgpOnZvaWQgXHJcblx0e1xyXG5cdFx0Ly/lrp7kvovljJblvIDlp4vpobXpnaJcclxuXHRcdHRoaXMuc3RhcnQgPSBuZXcgR2FtZVN0YXJ0KCk7XHJcblx0XHR0aGlzLnN0YXJ0LnBvcHVwKCk7XHJcblx0XHQvL+ebkeWQrOW8gOWni+a4uOaIj+W8gOWni+aMiemSruS6i+S7tizngrnlh7vlkI7ov5vlhaXmuLjmiI/kuK1cclxuXHRcdHRoaXMuc3RhcnQuYnRuX3N0YXJ0Lm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5nYW1lSW5pdClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDmuLjmiI/kuK3vvIzmuLjmiI/liJ3lp4vljJZcclxuXHRcdCovXHJcblx0cHJpdmF0ZSBnYW1lSW5pdCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+e8k+WKqOWKqOeUu+WFs+mXreaViOaenOOAgklEReS4remhtemdouS4ukRpYWxvZ+aJjeWPr+eUqFxyXG5cdFx0dGhpcy5zdGFydC5jbG9zZSgpO1xyXG5cdFx0XHJcblx0XHQvL+mHjee9ruWFs+WNoeaVsOaNrlxyXG5cdFx0Ly/muLjmiI/lhbPljaHmlbBcclxuXHRcdE1haW4ubGV2ZWwgPSAxO1xyXG5cdFx0Ly/njqnlrrblvpfliIZcclxuXHRcdE1haW4uc2NvcmUgPSAwO1xyXG5cdFx0Ly/mlYzkurrliLfmlrDliqDpgJ9cclxuXHRcdHRoaXMuY3JlYXRlVGltZSA9IDA7XHJcblx0XHQvL+aVjOS6uumAn+W6puaPkOWNh1xyXG5cdFx0dGhpcy5zcGVlZFVwID0gMDtcclxuXHRcdC8v5pWM5Lq66KGA6YeP5o+Q5Y2HXHRcclxuXHRcdHRoaXMuaHBVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuaVsOmHj+aPkOWNh1x0XHRcdFx0XHJcblx0XHR0aGlzLm51bVVwID0gMDtcclxuXHRcdC8v5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePXHJcblx0XHR0aGlzLmxldmVsVXBTY29yZSA9IDEwO1x0XHRcdFxyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluWcsOWbvuiDjOaZr+mhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLm1hcCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLm1hcCA9IG5ldyBHYW1lTWFwKCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1hcCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW6KeS6Imy5bGC5bm25Yqg6L295Yiw6Iie5Y+wKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMucm9sZUxheWVyID09IG51bGwpXHJcblx0XHRcdHRoaXMucm9sZUxheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMucm9sZUxheWVyKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbmuLjmiI/kuK1VSemhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLnBsYXkgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5wbGF5ID0gbmV3IEdhbWVQbGF5KCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnBsYXkpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluS4u+inkijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLmhlcm8gPT0gbnVsbClcclxuXHRcdHRoaXMuaGVybyA9IG5ldyBIZXJvKCk7XHJcblx0XHQvL+WIneWni+WMluinkuiJsuexu+Wei+OAgeihgOmHj++8jOazqO+8mumAn+W6pnNwZWVk5Li6MO+8jOWboOS4uuS4u+inkuaYr+mAmui/h+aTjeaOp+aUueWPmOS9jee9rizpmLXokKXkuLowXHJcblx0XHR0aGlzLmhlcm8uaW5pdChcImhlcm9cIiwxMCwwLDMwLDApO1xyXG5cdFx0Ly/mrbvkuqHlkI7kvJrpmpDol4/vvIzph43mlrDlvIDlp4vlkI7pnIDmmL7npLpcclxuXHRcdHRoaXMuaGVyby52aXNpYmxlPXRydWU7XHJcblx0XHQvL+S4u+inkuS9jee9ruS/ruaUuVxyXG5cdFx0dGhpcy5oZXJvLnBvcygzNjAsODAwKTtcclxuXHRcdC8v6KeS6Imy5Yqg6L295Yiw6KeS6Imy5bGC5LitXHJcblx0XHR0aGlzLnJvbGVMYXllci5hZGRDaGlsZCh0aGlzLmhlcm8pO1xyXG5cdFx0XHJcblx0XHQvL+m8oOagh+aMieS4i+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHQvL+m8oOagh+aKrOi1t+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMub25Nb3VzZVVwKTtcclxuXHRcdC8v5ri45oiP5Li75b6q546vXHJcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5sb29wKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDngrnlh7vlvIDlp4vop6blj5Hnp7vliqhcclxuXHRcdCovXHRcclxuXHRwcml2YXRlIG9uTW91c2VEb3duKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v6K6w5b2V6byg5qCH5oyJ5LiL5pe255qE5L2N572u77yM55So5LqO6K6h566X6byg5qCH56e75Yqo6YePXHJcblx0XHR0aGlzLm1vdmVYPUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0dGhpcy5tb3ZlWT1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8vXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0IOS4u+inkui3n+maj+m8oOagh+enu+WKqFxyXG5cdFx0Ki9cdFxyXG5cdHByaXZhdGUgb25Nb3VzZU1vdmUoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/orqHnrpfop5LoibLnp7vliqjph49cclxuXHRcdGxldCB4eDpudW1iZXI9dGhpcy5tb3ZlWC1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdGxldCB5eTpudW1iZXI9dGhpcy5tb3ZlWS1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8v5pu05paw56e75Yqo5L2N572uXHJcblx0XHR0aGlzLmhlcm8ueC09eHg7XHJcblx0XHR0aGlzLmhlcm8ueS09eXk7XHJcblx0XHQvL+abtOaWsOacrOW4p+eahOenu+WKqOW6p+agh1xyXG5cdFx0dGhpcy5tb3ZlWD1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdHRoaXMubW92ZVk9TGF5YS5zdGFnZS5tb3VzZVk7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCDpvKDmoIfmiqzotbfjgIHlhbPpl63np7vliqjnm5HlkKxcclxuXHRcdCovXHRcdFxyXG5cdHByaXZhdGUgb25Nb3VzZVVwKCk6dm9pZFxyXG5cdHtcclxuXHRcdExheWEuc3RhZ2Uub2ZmKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKSA7XHJcblx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0IOa4uOaIj+S4u+W+queOr1xyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGxvb3AoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pys5bGA5ri45oiP5pWw5o2u5pu05pawXHJcblx0XHRcdHRoaXMucGxheS51cGRhdGUodGhpcy5oZXJvLmhwLE1haW4ubGV2ZWwsTWFpbi5zY29yZSlcclxuXHRcdFx0Ly/lpoLmnpzkuLvop5LmrbvkuqFcclxuXHRcdFx0aWYodGhpcy5oZXJvLmhwPD0wKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly/njqnlrrbpo57mnLrmrbvkuqHlkI7lu7bov5/ml7bpl7TvvIwxMDDluKflkI7lvLnlh7rmuLjmiI/nu5PmnZ/nlYzpnaJcclxuXHRcdFx0XHR0aGlzLmRlYXRoVGltZSsrXHJcblx0XHRcdFx0aWYgKHRoaXMuZGVhdGhUaW1lPj0xMDApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5kZWF0aFRpbWU9MDtcclxuXHRcdFx0XHRcdC8v5ri45oiP57uT5p2fXHJcblx0XHRcdFx0XHR0aGlzLmdhbWVPdmVyKCk7XHJcblx0XHRcdFx0XHQvL+acrOaWueazleWGheWQjue7remAu+i+keS4jeaJp+ihjFxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2UvL+S4u+inkuacquatu+S6oVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly/kuLvop5LlsITlh7tcclxuXHRcdFx0XHR0aGlzLmhlcm8uc2hvb3QoKTtcclxuXHRcdFx0XHQvL+a4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0XHRcdHRoaXMubGV2ZWxVcCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL+WcsOWbvua7muWKqOabtOaWsFxyXG5cdFx0XHR0aGlzLm1hcC51cGRhdGVNYXAoKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHQvL+a4uOaIj+eisOaSnumAu+i+kVxyXG5cdFx0XHQvL+mBjeWOhuaJgOaciemjnuacuu+8jOabtOaUuemjnuacuueKtuaAgVxyXG5cdFx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSB0aGlzLnJvbGVMYXllci5udW1DaGlsZHJlbiAtIDE7IGkgPiAtMTsgaS0tKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8v6I635Y+W56ys5LiA5Liq6KeS6ImyXHJcblx0XHRcdFx0dmFyIHJvbGU6Um9sZSA9IHRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaSkgYXMgUm9sZTtcclxuXHRcdFx0XHQvL+inkuiJsuiHqui6q+abtOaWsFxyXG5cdFx0XHRcdHJvbGUudXBkYXRlKCk7XHRcdFx0XHRcclxuXHRcdFx0XHQvL+WmguaenOinkuiJsuatu+S6oe+8jOS4i+S4gOW+queOr1xyXG5cdFx0XHRcdGlmKHJvbGUuaHA8PTApIGNvbnRpbnVlO1xyXG5cdFx0XHRcdC8v56Kw5pKe5qOA5rWLXHJcblx0XHRcdFx0Zm9yKHZhciBqOm51bWJlcj1pLTE7aj4tMTtqLS0pXHJcblx0XHRcdFx0e1x0Ly/ojrflj5bnrKzkuozkuKrop5LoibJcclxuXHRcdFx0XHRcdHZhciByb2xlMTpSb2xlPXRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaikgYXMgUm9sZTtcclxuXHRcdFx0XHRcdC8v5aaC5p6ccm9sZTHmnKrmrbvkuqHkuJTkuI3lkIzpmLXokKVcclxuXHRcdFx0XHRcdGlmKHJvbGUxLmhwPjAmJnJvbGUxLmNhbXAhPXJvbGUuY2FtcClcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Ly/ojrflj5bnorDmkp7ljYrlvoRcclxuXHRcdFx0XHRcdFx0dmFyIGhpdFJhZGl1czpudW1iZXI9cm9sZS5oaXRSYWRpdXMrcm9sZTEuaGl0UmFkaXVzO1xyXG5cdFx0XHRcdFx0XHQvL+eisOaSnuajgOa1i1xyXG5cdFx0XHRcdFx0XHRpZihNYXRoLmFicyhyb2xlLngtcm9sZTEueCk8aGl0UmFkaXVzJiZNYXRoLmFicyhyb2xlLnktcm9sZTEueSk8aGl0UmFkaXVzKVxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0Ly/lpoLmnpzmn5DkuIDkuKrnorDmkp7kvZPmmK/pgZPlhbfvvIzliJnlkIPpgZPlhbfvvIzlkKbliJnmjonooYBcclxuXHRcdFx0XHRcdFx0XHRpZihyb2xlLnByb3BUeXBlIT0wfHxyb2xlMS5wcm9wVHlwZSE9MClcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQvL+aXoOazleWIpOaWreWTquS4quaYr+mBk+WFt++8jOWboOatpOmDveebuOS6kuWQg+ivleivlVxyXG5cdFx0XHRcdFx0XHRcdFx0cm9sZS5lYXRQcm9wKHJvbGUxKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJvbGUxLmVhdFByb3Aocm9sZSk7XHJcblx0XHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQvL+inkuiJsuebuOS6kuaOieihgFxyXG5cdFx0XHRcdFx0XHRcdFx0cm9sZS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyb2xlMS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHQvL+WIm+W7uuaVjOacuu+8jOWKoOWFpeWFs+WNoeWNh+e6p+aVsOaNru+8jOaPkOmrmOmavuW6plxyXG5cdFx0XHQvL+eUn+aIkOWwj+mjnuaculxyXG5cdFx0XHRpZiAoTGF5YS50aW1lci5jdXJyRnJhbWUgJSAoODAgLSB0aGlzLmNyZWF0ZVRpbWUpID09MClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMCwgdGhpcy5ocHNbMF0sdGhpcy5zcGVlZHNbMF0gKyB0aGlzLnNwZWVkVXAgLCB0aGlzLm51bXNbMF0gKyB0aGlzLm51bVVwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvL+eUn+aIkOS4reWei+mjnuaculxyXG5cdFx0XHRpZiAoTGF5YS50aW1lci5jdXJyRnJhbWUgJSAoMTcwIC0gdGhpcy5jcmVhdGVUaW1lICogMikgPT0gMCkgXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDEsIHRoaXMuaHBzWzFdICt0aGlzLmhwVXAgKiAyLHRoaXMuc3BlZWRzWzFdICsgdGhpcy5zcGVlZFVwICwgdGhpcy5udW1zWzFdICsgdGhpcy5udW1VcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly/nlJ/miJBib3NzXHJcblx0XHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICgxMDAwIC0gdGhpcy5jcmVhdGVUaW1lICogMykgPT0gMCkgXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDIsIHRoaXMuaHBzWzJdICsgdGhpcy5ocFVwICogNix0aGlzLnNwZWVkc1syXSwgdGhpcy5udW1zWzJdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0IOa4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGxldmVsVXAoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdGlmKE1haW4uc2NvcmU+dGhpcy5sZXZlbFVwU2NvcmUpXHJcblx0XHRcdHtcclxuXHRcdFx0XHQvL+WFs+WNoeetiee6p+aPkOWNh1xyXG5cdFx0XHRcdE1haW4ubGV2ZWwrKztcclxuXHRcdFx0XHQvL+inkuiJsuihgOmHj+WinuWKoO+8jOacgOWkpzMwXHJcblx0XHRcdFx0dGhpcy5oZXJvLmhwPU1hdGgubWluKHRoaXMuaGVyby5ocCtNYWluLmxldmVsKjEsMzApO1xyXG5cdFx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5Yib5bu65pWM5py66Ze06ZqU6LaK55+tXHJcblx0XHRcdFx0dGhpcy5jcmVhdGVUaW1lID0gTWFpbi5sZXZlbCA8IDMwID8gTWFpbi5sZXZlbCAqIDIgOiA2MDtcclxuXHRcdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuumjnuihjOmAn+W6pui2iumrmFxyXG5cdFx0XHRcdHRoaXMuc3BlZWRVcCA9IE1hdGguZmxvb3IoTWFpbi5sZXZlbCAvIDYpO1xyXG5cdFx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py66KGA6YeP6LaK6auYXHJcblx0XHRcdFx0dGhpcy5ocFVwID0gTWF0aC5mbG9vcihNYWluLmxldmVsIC8gOCk7XHJcblx0XHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrmlbDph4/otorlpJpcclxuXHRcdFx0XHR0aGlzLm51bVVwID0gTWF0aC5mbG9vcihNYWluLmxldmVsIC8gMTApO1xyXG5cdFx0XHRcdC8v5o+Q6auY5LiL5LiA57qn55qE5Y2H57qn5YiG5pWwXHJcblx0XHRcdFx0dGhpcy5sZXZlbFVwU2NvcmUgKz0gTWFpbi5sZXZlbCAqIDEwO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICogIOWIm+W7uuaVjOS6ulxyXG5cdFx0ICogQHBhcmFtIGluZGV4IFx05pWM5Lq657yW5Y+3XHJcblx0XHQgKiBAcGFyYW0gaHAgICBcdFx0IOaVjOS6uuihgOmHj1xyXG5cdFx0ICogQHBhcmFtIHNwZWVkXHRcdOaVjOS6uumAn+W6plxyXG5cdFx0ICogQHBhcmFtIG51bVx0XHTmlYzkurrmlbDph49cclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBjcmVhdGVFbmVteShpbmRleDpudW1iZXIsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixudW06bnVtYmVyKTp2b2lkIFxyXG5cdFx0e1xyXG5cdFx0XHRmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbnVtOyBpKyspXHJcblx0XHRcdHtcclxuXHRcdFx0XHQvL+WIm+W7uuaVjOS6uu+8jOS7juWvueixoeaxoOWIm+W7ulxyXG5cdFx0XHRcdGxldCBlbmVteTpFbmVteSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcIkVuZW15XCIsIEVuZW15KTtcclxuXHRcdFx0XHQvL+WIneWni+WMluaVjOS6ulxyXG5cdFx0XHRcdGVuZW15LmluaXQoXCJlbmVteVwiICsgKGluZGV4KzEpLCBocCwgc3BlZWQsdGhpcy5yYWRpdXNbaW5kZXhdLDEpO1xyXG5cdFx0XHRcdC8v5LuO5a+56LGh5rGg5Lit5Yib5bu655qE5a+56LGh5q275Lqh5YmN6KKr6ZqQ6JeP5LqG77yM5Zug5q2k6KaB6YeN5paw5Yid5aeL5YyW5pi+56S677yM5ZCm5YiZ5paw5Yib5bu66KeS6Imy5LiN5Lya5pi+56S65Ye65p2lXHJcblx0XHRcdFx0ZW5lbXkudmlzaWJsZT10cnVlO1xyXG5cdFx0XHRcdC8v6ZqP5py65L2N572uXHJcblx0XHRcdFx0ZW5lbXkucG9zKE1hdGgucmFuZG9tKCkgKig3MjAtODApKzUwLCAtTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcblx0XHRcdFx0Ly/mt7vliqDliLDoiJ7lj7DkuIpcclxuXHRcdFx0XHR0aGlzLnJvbGVMYXllci5hZGRDaGlsZChlbmVteSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQg5ri45oiP57uT5p2fXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgZ2FtZU92ZXIoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v56e76Zmk5omA5pyJ6Iie5Y+w5LqL5Lu277yM6byg5qCH5pON5o6nXHJcblx0XHRcdExheWEuc3RhZ2Uub2ZmQWxsKCk7XHJcblx0XHRcdC8v56e76Zmk5Zyw5Zu+6IOM5pmvXHJcblx0XHRcdHRoaXMubWFwLnJlbW92ZVNlbGYoKTtcclxuXHRcdFx0Ly/np7vpmaTmuLjmiI/kuK1VSVxyXG5cdFx0XHR0aGlzLnBsYXkucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly/muIXnqbrop5LoibLlsYLlrZDlr7nosaFcclxuXHRcdFx0dGhpcy5yb2xlTGF5ZXIucmVtb3ZlQ2hpbGRyZW4oMCx0aGlzLnJvbGVMYXllci5udW1DaGlsZHJlbi0xKTtcclxuXHRcdFx0Ly/np7vpmaTop5LoibLlsYJcclxuXHRcdFx0dGhpcy5yb2xlTGF5ZXIucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly/ljrvpmaTmuLjmiI/kuLvlvqrnjq9cclxuXHRcdFx0TGF5YS50aW1lci5jbGVhcih0aGlzLHRoaXMubG9vcCk7XHJcblx0XHRcdFxyXG5cdFx0XHQvL+WunuS+i+WMlua4uOaIj+e7k+adn+mhtemdolxyXG5cdFx0XHRpZih0aGlzLm92ZXIgPT0gbnVsbClcclxuXHRcdFx0XHR0aGlzLm92ZXIgPSBuZXcgR2FtZU92ZXIoKTtcclxuXHRcdFx0Ly/muLjmiI/np6/liIbmmL7npLpcclxuXHRcdFx0dGhpcy5vdmVyLnR4dF9zY29yZS50ZXh0PU1haW4uc2NvcmUudG9TdHJpbmcoKTtcclxuXHRcdFx0Ly/ku6XlvLnlh7rmlrnlvI/miZPlvIDvvIzmnInnvJPliqjmlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdFx0dGhpcy5vdmVyLnBvcHVwKCk7XHJcblx0XHRcdC8v6YeN5paw5byA5aeL5LqL5Lu255uR5ZCsLOeCueWHu+WQjui/m+WFpea4uOaIj+S4rVxyXG5cdFx0XHR0aGlzLm92ZXIub24oXCJyZVN0YXJ0XCIsdGhpcyx0aGlzLmdhbWVJbml0KTtcclxuXHRcdH1cclxufVxyXG5cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbm5ldyBNYWluKCk7XHJcbiIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15IGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImhpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImRpZVwiKTtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHpn7PmlYhcclxuICAgICAgICAgICAgLy8gTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZ2FtZV9vdmVyLm1wM1wiKTtcclxuICAgICAgICAgICAgTWFpbi5zY29yZSsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25Db21wbGV0ZSgpO1xyXG5cclxuICAgICAgICAvL+WmguaenOatu+S6oeWKqOeUu+aSreaUvuWujOaIkFxyXG4gICAgICAgIGlmKHRoaXMuYWN0aW9uPT1cImRpZVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy91cGRhdGUoKeaWueazleS4re+8jOmakOiXj+WQjui/m+ihjOWbnuaUtlxyXG4gICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9zdFByb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmFjdGlvbj09XCJoaXRcIikvL+WmguaenOaYr+WPl+S8pOWKqOeUu++8jOS4i+S4gOW4p+aSreaUvumjnuihjOWKqOeUu1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKuinkuiJsuatu+S6oeaOieiQveeJqeWTgSoqL1xyXG4gICAgcHJpdmF0ZSBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnR5cGUhPVwiZW5lbXkzXCIpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4qumBk+WFt1xyXG4gICAgICAgIGxldCBwcm9wOnVmbyA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcInVmb1wiLHVmbyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICBsZXQgcjpOdW1iZXI9TWF0aC5yYW5kb20oKTtcclxuICAgICAgICBsZXQgbnVtOm51bWJlcj0ocjwwLjcpPzE6MjtcclxuICAgICAgICBcclxuICAgICAgICAvL+mHjeaWsOWIneWni+WMlumBk+WFt+WxnuaApyzpmLXokKXkuLrmlYzmlrnvvIjlj6rkuI7kuLvop5Llj5HnlJ/norDmkp7vvIlcclxuICAgICAgICBwcm9wLmluaXQoXCJ1Zm9cIitudW0sMSwyLDMwLDEpO1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgcHJvcC5wcm9wVHlwZT1udW07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lvLrliLbmmL7npLpcclxuICAgICAgICBwcm9wLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAvL+eUn+aIkOeahOS9jee9ruS4uuatu+S6oeiAheS9jee9rlxyXG4gICAgICAgIHByb3AucG9zKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgICAgIC8v5Yqg6L295Yiw54i25a655ZmoIFxyXG4gICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kaWUoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOWvueixoeaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwiRW5lbXlcIiwgdGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICBcclxuICAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVybyBsb3N0SHAhISEhISFcIik7XHJcblxyXG4gICAgICAgIC8v5YeP6KGAXHJcbiAgICAgICAgdGhpcy5ocCAtPSBsb3N0SHA7XHJcbiAgICAgICAgLy/moLnmja7ooYDph4/liKTmlq1cclxuICAgICAgICBpZiAodGhpcy5ocCA+IDApIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzmnKrmrbvkuqHvvIzliJnmkq3mlL7lj5flh7vliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiaGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZGllXCIpO1xyXG4gICAgICAgICAgICAvL+a3u+WKoOatu+S6oemfs+aViFxyXG4gICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9nYW1lX292ZXIubXAzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICog6KeS6Imy5ZCD5Yiw6YGT5YW377yM5Yqg6KGA5oiW5a2Q5by557qn5YirXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgZWF0UHJvcChwcm9wOlJvbGUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WmguaenOiwg+eUqOiAheaYr+S4u+inkuaIlnByb3DkuI3mmK/pgZPlhbfvvIzliJnov5Tlm55cclxuICAgICAgICBpZihwcm9wLnByb3BUeXBlPT0wKSByZXR1cm47XHJcbiAgICAgICAgLy/mt7vliqDlkIPlvLrljJbpgZPlhbfpn7PmlYhcdFx0XHRcdFx0XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvYWNoaWV2ZW1lbnQubXAzXCIpO1xyXG4gICAgICAgIC8v5ZCD5a2Q5by5566xXHJcbiAgICAgICAgaWYocHJvcC5wcm9wVHlwZT09MSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+enr+WIhuWinuWKoFxyXG4gICAgICAgICAgICBNYWluLnNjb3JlKys7XHJcbiAgICAgICAgICAgIC8v5a2Q5by557qn5Yir5aKe5YqgXHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0TGV2ZWwrK1xyXG4gICAgICAgICAgICAvL+WtkOW8ueavj+WNhzLnuqfvvIzlrZDlvLnmlbDph4/lop7liqAx77yM5pyA5aSn5pWw6YeP6ZmQ5Yi25ZyoNOS4qlxyXG4gICAgICAgICAgICB0aGlzLnNob290TnVtID0gTWF0aC5taW4oTWF0aC5mbG9vcih0aGlzLmJ1bGxldExldmVsIC8gMikgKyAxLDQpO1xyXG4gICAgICAgICAgICAvL+WtkOW8uee6p+WIq+i2iumrmO+8jOWPkeWwhOmikeeOh+i2iuW/q1xyXG4gICAgICAgICAgICB0aGlzLnNob290SW50ZXJ2YWwgPSAzMDAgLSA4ICogKHRoaXMuYnVsbGV0TGV2ZWwgPiA4ID8gOCA6IHRoaXMuYnVsbGV0TGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHByb3AucHJvcFR5cGU9PTIpLy/lkIPooYBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6KGA6YeP5aKe5YqgXHJcbiAgICAgICAgICAgIHRoaXMuaHArPTI7XHJcbiAgICAgICAgICAgIC8v56ev5YiG5aKe5YqgXHJcbiAgICAgICAgICAgIE1haW4uc2NvcmUrPTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YGT5YW35q275LqhXHJcbiAgICAgICAgcHJvcC5ocD0wO1xyXG4gICAgICAgIC8v6YGT5YW35ZCD5a6M5ZCO5raI5aSx77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgcHJvcC52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBBbmltYXRpb24gPSBMYXlhLkFuaW1hdGlvbjtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdC8qKirpo57mnLrnmoTnsbvlnosgICDigJxoZXJv4oCdOueOqeWutumjnuacuu+8jOKAnGVuZW154oCd77ya5pWM5Lq66aOe5py644CB4oCcYnVsbGXigJ3vvJrlrZDlvLnjgIFcInVmb1wiOumBk+WFtyoqKiovXHJcbiAgICBwdWJsaWMgdHlwZTpTdHJpbmc7XHJcbiAgICAvKioq6aOe5py655qE6KGA6YePKioqL1xyXG4gICAgcHVibGljIGhwOm51bWJlcj0wOyBcclxuICAgIC8qKirpo57mnLrnmoTpgJ/luqYqKiovXHJcbiAgICBwcm90ZWN0ZWQgc3BlZWQ6bnVtYmVyPTA7XHRcclxuICAgIFxyXG4gICAgLyoqKumjnuacuueahOiiq+aUu+WHu+WNiuW+hCoqKi9cclxuICAgIHB1YmxpYyBoaXRSYWRpdXM6bnVtYmVyO1xyXG4gICAgLyoqKumjnuacuueahOmYteiQpe+8iOaVjOaIkeWMuuWIq++8iSoqKi9cclxuICAgIHB1YmxpYyBjYW1wOm51bWJlcjtcclxuICAgIFxyXG4gICAgLyoqKuinkuiJsueahOWKqOeUu+i1hOa6kCoqKi9cclxuICAgIHByb3RlY3RlZCByb2xlQW5pOkFuaW1hdGlvbjtcclxuICAgIC8qKirlvZPliY3liqjnlLvliqjkvZwqKiovXHJcbiAgICBwcm90ZWN0ZWQgYWN0aW9uOlN0cmluZztcclxuICAgIFxyXG4gICAgLyoqKuWwhOWHu+mXtOmalCoqKi9cclxuICAgIHB1YmxpYyBzaG9vdEludGVydmFsOiBudW1iZXI9IDMwMDtcclxuICAgIC8qKirkuIvmrKHlsITlh7vml7bpl7QqKiovXHJcbiAgICBwdWJsaWMgc2hvb3RUaW1lOiBudW1iZXI9IDMwMDtcclxuICAgIFxyXG4gICAgLyoqKirpgZPlhbfnsbvlnosgMDrpo57mnLrmiJblrZDlvLnvvIwxOuWtkOW8ueeuse+8jDI66KGA55O2KioqL1xyXG4gICAgcHVibGljIHByb3BUeXBlOm51bWJlcj0wO1xyXG4gICAgLyoqKuWtkOW8uee6p+WIq++8iOWQg+WtkOW8uemBk+WFt+WQjuWNh+e6p++8iSoqKi9cclxuICAgIHB1YmxpYyBidWxsZXRMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIC8qKirlkIzml7blsITlh7vlrZDlvLnmlbDph48qKiovXHJcbiAgICBwdWJsaWMgc2hvb3ROdW06IG51bWJlcj0gMTtcclxuICAgIC8qKirlrZDlvLnlgY/np7vnmoTkvY3nva4qKiovXHJcbiAgICBwcm90ZWN0ZWQgYnVsbGV0UG9zOiBudW1iZXJbXVtdID0gW1swXSwgWy0xNSwgMTVdLCBbLTMwLCAwLCAzMF0sIFstNDUsIC0xNSwgMTUsIDQ1XV07XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgIC8v5a6e5L6L5YyW5Yqo55S7XHJcbiAgICAgICAgIHRoaXMucm9sZUFuaT1uZXcgQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgIC8v5Yqg6L29SURF57yW6L6R55qE5Yqo55S75paH5Lu2XHJcbiAgICAgICAgIHRoaXMucm9sZUFuaS5sb2FkQW5pbWF0aW9uKFwiR2FtZVJvbGUuYW5pXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAg6KeS6Imy57G75Z6LIC0tLeKAnGhlcm/igJ06546p5a626aOe5py677yM4oCcZW5lbXkxLTPigJ3vvJrmlYzkurrpo57mnLrjgIHigJxidWxsZToxLTLigJ3vvJrlrZDlvLnjgIFcInVmbzEtMlwiOumBk+WFt1xyXG4gICAgICogQHBhcmFtIGhwICAgICAg6KGA6YePXHJcbiAgICAgKiBAcGFyYW0gc3BlZWQgICDpgJ/luqZcclxuICAgICAqIEBwYXJhbSBoaXRSYWRpdXMgICDnorDmkp7ljYrlvoRcclxuICAgICAqIEBwYXJhbSBjYW1wICAgIOmYteiQpVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGluaXQodHlwZTpTdHJpbmcsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixoaXRSYWRpdXM6bnVtYmVyLGNhbXA6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/op5LoibLliJ3lp4vljJblsZ7mgKdcclxuICAgICAgICB0aGlzLnR5cGU9dHlwZTtcclxuICAgICAgICB0aGlzLmhwPWhwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQ9c3BlZWQ7XHJcbiAgICAgICAgdGhpcy5oaXRSYWRpdXM9aGl0UmFkaXVzO1xyXG4gICAgICAgIHRoaXMuY2FtcD1jYW1wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6YGT5YW35bGe5oCn5Yid5aeL5Li6MFxyXG4gICAgICAgIHRoaXMucHJvcFR5cGU9MDtcclxuICAgICAgICBcclxuICAgICAgICAvL+WKoOi9veWKqOeUu+WvueixoVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5yb2xlQW5pKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v55uR5ZCs5Yqo55S75a6M5oiQ5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLm9uKEV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKVxyXG4gICAgICAgIC8v5pKt5pS+6buY6K6k6aOe6KGM5Yqo55S7XHJcbiAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLov5jmnKrmnInlrr3vvIzojrflvpfop5LoibLlrr3pq5hcdFxyXG4gICAgICAgIGlmKHRoaXMucm9sZUFuaS53aWR0aD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Yqo55S755+p5b2i6L6555WMXHJcbiAgICAgICAgICAgIHZhciBib3VuZHM6TGF5YS5SZWN0YW5nbGU9dGhpcy5yb2xlQW5pLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICAvL+inkuiJsiDlrr3pq5jotYvlgLxcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pLnNpemUoYm91bmRzLndpZHRoLGJvdW5kcy5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIC8v5aaC5p6c5q275Lqh5Yqo55S75pKt5pS+5a6M5oiQXHJcbiAgICAgICAgLy8gaWYodGhpcy5hY3Rpb249PVwiZGllXCIpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICAvL3VwZGF0ZSgp5pa55rOV5Lit77yM6ZqQ6JeP5ZCO6L+b6KGM5Zue5pS2XHJcbiAgICAgICAgLy8gICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAvLyAgICAgdGhpcy5sb3N0UHJvcCgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNlIGlmKHRoaXMuYWN0aW9uPT1cImhpdFwiKS8v5aaC5p6c5piv5Y+X5Lyk5Yqo55S777yM5LiL5LiA5bin5pKt5pS+6aOe6KGM5Yqo55S7XHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnBsYXlBY3Rpb24oXCJmbHlcIik7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7liqjnlLsgXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uIOWKqOeUu+eKtuaAgSAgIFwiZmx5XCLjgIFcImhpdFwi44CBXCJkaWVcIlxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBwbGF5QWN0aW9uKGFjdGlvbjpTdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGlvbj1hY3Rpb247XHJcbiAgICAgICAgLy/mkq3mlL7op5LoibLliqjnlLssbmFtZT3op5LoibLnsbvlnotf5Yqo55S754q25oCB77yM5aaC77yaaGVyb19mbHlcclxuICAgICAgICB0aGlzLnJvbGVBbmkucGxheSgwLHRydWUsdGhpcy50eXBlK1wiX1wiK2FjdGlvbik7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLpmpDol4/vvIzop5LoibLmtojkuqHlubblm57mlLZcclxuICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/kuLvop5LkuI3mrbvkuqHlm57mlLbvvIzlj6rpmpDol4/vvIzku6XlhY3lhbbku5blr7nosaHku6XkuLvop5Llm57lr7nosaHliJvlu7rvvIzlj5HnlJ/lvJXnlKjkv67mlLlcclxuICAgICAgICAgICAgaWYodGhpcy50eXBlIT1cImhlcm9cIikgXHR0aGlzLmRpZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6KeS6Imy5qC55o2u6YCf5bqm6aOe6KGMXHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lpoLmnpznp7vliqjliLDmmL7npLrljLrln5/ku6XlpJbvvIzliJnnp7vpmaRcclxuICAgICAgICBpZiAodGhpcy50eXBlIT1cImhlcm9cIiYmKHRoaXMueSA+IDEyODArMTAwfHx0aGlzLnk8LTE1MCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Li76KeS6L6555WM5qOA5p+lXHJcbiAgICAgICAgaWYodGhpcy50eXBlPT1cImhlcm9cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6ZyA5YeP5Y676KeS6Imy5a695oiW6auY55qE5LiA5Y2K77yM5Zug5Li65ZyoSURF5Lit5Yi25L2c5Yqo55S75pe277yM5oiR5Lus5oqK6KeS6Imy55qE5Lit5b+D5YGa5Li65LqG6KeS6Imy5a+56LGh55qE5Y6f54K5XHJcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5bem5Y+z6LaF5Ye6XHJcbiAgICAgICAgICAgIGlmKHRoaXMueDx0aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54PXRoaXMucm9sZUFuaS53aWR0aC8yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy54PjcyMC10aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54PTcyMC10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpuS4iuS4i+i2heWHulxyXG4gICAgICAgICAgICBpZih0aGlzLnk8dGhpcy5yb2xlQW5pLmhlaWdodC8yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnk9dGhpcy5yb2xlQW5pLmhlaWdodC8yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy55PjEyODAtdGhpcy5yb2xlQW5pLmhlaWdodC8yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnk9MTI4MC10aGlzLnJvbGVBbmkuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCkgO1xyXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pe26Ze05aSn5LqO5LiL5qyh5bCE5Ye75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPnRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ojrflvpflj5HlsITlrZDlvLnnmoTkvY3nva7mlbDnu4RcclxuICAgICAgICAgICAgbGV0IHBvczpudW1iZXJbXSA9IHRoaXMuYnVsbGV0UG9zW3RoaXMuc2hvb3ROdW0tMV1cclxuICAgICAgICAgICAgZm9yKGxldCBpOm51bWJlciA9IDAgOyBpPHBvcy5sZW5ndGggOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5pu05paw5LiL5qyh5a2Q5by55bCE5Ye755qE5pe26Ze0XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290VGltZSA9IHRpbWUgKyB0aGlzLnNob290SW50ZXJ2YWwgOyBcclxuICAgICAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJCdWxsZXRcIixSb2xlKSBhcyBCdWxsZXQ7XHJcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQyXCIsMSwtMTAsMSx0aGlzLmNhbXApXHJcbiAgICAgICAgICAgICAgICAvL+WtkOW8uea2iOWkseWQjuS8muS4jeaYvuekuu+8jOmHjeaWsOWIneWni+WMllxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8v6K6+572u5a2Q5by55Y+R5bCE5Yid5aeL5YyW5L2N572uXHJcbiAgICAgICAgICAgICAgICBidWxsZXQucG9zKHRoaXMueCtwb3NbaV0sIHRoaXMueS04MCk7XHJcbiAgICAgICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5a2Q5by56Z+z5pWIXHRcdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgLy9MYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9idWxsZXQubXAzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKirop5LoibLmrbvkuqHlubblm57mlLbliLDlr7nosaHmsaAqKi9cclxuICAgIHB1YmxpYyBkaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/op5LoibLliqjnlLvlgZzmraJcclxuICAgICAgICB0aGlzLnJvbGVBbmkuc3RvcCgpOyBcclxuICAgICAgICAvL+WOu+mZpOaJgOacieWKqOeUu+ebkeWQrFxyXG4gICAgICAgIHRoaXMucm9sZUFuaS5vZmZBbGwoKTtcclxuICAgICAgICAvL+S7juiInuWPsOenu+mZpFxyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHVmbyBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v6ZqQ6JeP77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kaWUoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOWvueixoeaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwidWZvXCIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgICAgICAgIFxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lQmdVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJnMTpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzI6TGF5YS5JbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ2YXJcIjpcImJnMVwiLFwic2tpblwiOlwiYmFja2dyb3VuZC5wbmdcIn0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6LTEyODAsXCJ4XCI6MCxcInZhclwiOlwiYmcyXCIsXCJza2luXCI6XCJiYWNrZ3JvdW5kLnBuZ1wifSxcImNvbXBJZFwiOjN9XSxcImxvYWRMaXN0XCI6W1wiYmFja2dyb3VuZC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVCZ1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVPdmVyVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGFuaV9yZXN0YXJ0OkxheWEuRnJhbWVBbmltYXRpb247XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgYnRuX3Jlc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MjI5LFwic2tpblwiOlwiZ2FtZVVJL2dhbWVPdmVyLnBuZ1wifSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjEyMDAsXCJ4XCI6MTksXCJ3aWR0aFwiOjY4MSxcInRleHRcIjpcIkxheWFBaXIxLjcuM+W8leaTjuaVmeWtpua8lOekuueJiFwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjI2LFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjV9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjoyNDQsXCJ3aWR0aFwiOjE0NCxcInRleHRcIjpcIuacrOWxgOenr+WIhu+8mlwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjozNjMsXCJ3aWR0aFwiOjEyOCxcInZhclwiOlwidHh0X3Njb3JlXCIsXCJ0ZXh0XCI6XCIxMjAwXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjN2M3OTc5XCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjM5LFwidmFyXCI6XCJidG5fcmVzdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjEsXCJ3aWR0aFwiOjI0MCxcInN0YXRlTnVtXCI6MixcInNraW5cIjpcImdhbWVVSS9idG5fYmcucG5nXCIsXCJzaXplR3JpZFwiOlwiMTAsMTAsMTAsMTBcIixcImhlaWdodFwiOjgwfSxcImNvbXBJZFwiOjExfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTgsXCJ4XCI6NDEsXCJza2luXCI6XCJnYW1lVUkvcmVzdGFydC5wbmdcIn0sXCJjb21wSWRcIjoxMn1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjEwLFwia2V5ZnJhbWVzXCI6e1wieVwiOlt7XCJ2YWx1ZVwiOjk3MCxcInR3ZWVuTWV0aG9kXCI6XCJlbGFzdGljT3V0XCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjk2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjo4fV19fV0sXCJuYW1lXCI6XCJhbmlfcmVzdGFydFwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9nYW1lT3Zlci5wbmdcIixcImdhbWVVSS9idG5fYmcucG5nXCIsXCJnYW1lVUkvcmVzdGFydC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVPdmVyVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVBsYXlVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJ0bl9wYXVzZTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgdHh0X2hwOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyB0eHRfbGV2ZWw6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgZ2FtZVBhdXNlOkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3XCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjIwLFwieFwiOjEwLFwid2lkdGhcIjo3MDAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJoZWlnaHRcIjo0NX0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjIxLFwieFwiOjYxOCxcInZhclwiOlwiYnRuX3BhdXNlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxLFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9ocFwiLFwidGV4dFwiOlwiSFDvvJpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo4fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjoyMjgsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X2xldmVsXCIsXCJ0ZXh0XCI6XCJsZXZlbO+8mlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjl9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxNSxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfc2NvcmVcIixcInRleHRcIjpcIlNjb3JlOlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjEwfSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwidmlzaWJsZVwiOmZhbHNlLFwidmFyXCI6XCJnYW1lUGF1c2VcIixcImhlaWdodFwiOjEyODAsXCJhbHBoYVwiOjF9LFwiY29tcElkXCI6MTMsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJzaXplR3JpZFwiOlwiMiwyLDIsMlwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxNX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQxMSxcInhcIjoxMTAsXCJ3aWR0aFwiOjUwMCxcInZpc2libGVcIjp0cnVlLFwic2tpblwiOlwiZ2FtZVVJL2JnLmpwZ1wiLFwic2l6ZUdyaWRcIjpcIjEwLDEwLDEwLDEwXCIsXCJoZWlnaHRcIjo1MDB9LFwiY29tcElkXCI6MTJ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjgwMSxcInhcIjoxOTAsXCJ3aWR0aFwiOjM0MCxcInRleHRcIjpcIueCueWHu+S7u+aEj+S9jee9rue7p+e7rea4uOaIj1wiLFwiaGVpZ2h0XCI6NDQsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzIzMjIyMlwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjE0fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDY4LFwieFwiOjIxNCxcInNraW5cIjpcImdhbWVVSS9nYW1lUGF1c2UucG5nXCJ9LFwiY29tcElkXCI6MTZ9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmxhbmsucG5nXCIsXCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wiLFwiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2dhbWVQYXVzZS5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVQbGF5VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVN0YXJ0VUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIHR4dF9sb2FkOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyBidG5fc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MTc5LFwic2tpblwiOlwiZ2FtZVVJL2xvZ28ucG5nXCJ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6NTg3LFwieFwiOjIwLFwid2lkdGhcIjo2ODEsXCJ2YXJcIjpcInR4dF9sb2FkXCIsXCJ0ZXh0XCI6XCLmuLjmiI/otYTmupDliqDovb3ov5vluqZcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiMxYzFjMWNcIixcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjQwLFwidmlzaWJsZVwiOnRydWUsXCJ2YXJcIjpcImJ0bl9zdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjI0MCxcInZpc2libGVcIjp0cnVlLFwic3RhdGVOdW1cIjoyLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcInNpemVHcmlkXCI6XCIyMCwyMCwyMCwyMFwiLFwiaGVpZ2h0XCI6ODB9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE5LFwieFwiOjQxLFwic2tpblwiOlwiZ2FtZVVJL3N0YXJ0LnBuZ1wifSxcImNvbXBJZFwiOjExfV0sXCJjb21wb25lbnRzXCI6W119XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2xvZ28ucG5nXCIsXCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwiZ2FtZVVJL3N0YXJ0LnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZVN0YXJ0VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
