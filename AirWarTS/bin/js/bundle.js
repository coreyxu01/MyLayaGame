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
var GameConst_1 = require("./GameConst");
var RoleFactory_1 = require("./Role/RoleFactory");
var EnemyManager = /** @class */ (function () {
    function EnemyManager(main) {
        this.Main = main;
    }
    EnemyManager.prototype.ResetInfo = function () {
        //敌人刷新加速
        GameConst_1.default.createTime = 0;
        //敌人速度提升
        GameConst_1.default.speedUp = 0;
        //敌人血量提升	
        GameConst_1.default.hpUp = 0;
        //敌人数量提升				
        GameConst_1.default.numUp = 0;
        //升级等级所需的成绩数量
        GameConst_1.default.levelUpScore = 10;
    };
    //生成敌方飞机
    EnemyManager.prototype.loopCreateEnemy = function () {
        //创建敌机，加入关卡升级数据，提高难度
        //生成小飞机
        if (Laya.timer.currFrame % (80 - GameConst_1.default.createTime) == 0) {
            this.createEnemy(0, GameConst_1.default.hps[0], GameConst_1.default.speeds[0] + GameConst_1.default.speedUp, GameConst_1.default.nums[0] + GameConst_1.default.numUp);
        }
        //生成中型飞机
        if (Laya.timer.currFrame % (500 - GameConst_1.default.createTime * 2) == 0) {
            this.createEnemy(1, GameConst_1.default.hps[1] + GameConst_1.default.hpUp * 2, GameConst_1.default.speeds[1] + GameConst_1.default.speedUp, GameConst_1.default.nums[1] + GameConst_1.default.numUp);
        }
        //生成boss
        if (Laya.timer.currFrame % (500 - GameConst_1.default.createTime * 3) == 0) {
            this.createEnemy(2, GameConst_1.default.hps[2] + GameConst_1.default.hpUp * 6, GameConst_1.default.speeds[2], GameConst_1.default.nums[2]);
        }
    };
    /**
     *  创建敌人
     * @param index 	敌人编号
     * @param hp   		 敌人血量
     * @param speed		敌人速度
     * @param num		敌人数量
     */
    EnemyManager.prototype.createEnemy = function (index, hp, speed, num) {
        for (var i = 0; i < num; i++) {
            var enemyType = "enemy" + (index + 1);
            //创建敌人，从对象池创建
            var enemy = RoleFactory_1.default.GetRole(enemyType);
            //初始化敌人
            enemy.init(enemyType, hp, speed, GameConst_1.default.radius[index], 1);
            //从对象池中创建的对象死亡前被隐藏了，因此要重新初始化显示，否则新创建角色不会显示出来
            enemy.visible = true;
            //随机位置
            enemy.pos(Math.random() * (720 - 80) + 50, -Math.random() * 100);
            //添加到舞台上
            this.Main.roleLayer.addChild(enemy);
        }
    };
    return EnemyManager;
}());
exports.default = EnemyManager;
},{"./GameConst":2,"./Role/RoleFactory":15}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConst = /** @class */ (function () {
    function GameConst() {
    }
    //游戏关卡提升属性
    /***敌人刷新加速****/
    GameConst.createTime = 0;
    /***敌人速度提升***/
    GameConst.speedUp = 0;
    /***敌人血量提升***/
    GameConst.hpUp = 0;
    /***敌人数量提升***/
    GameConst.numUp = 0;
    /****升级等级所需的成绩数量***/
    GameConst.levelUpScore = 10;
    /****敌机血量表****/
    GameConst.hps = [1, 7, 15];
    /***敌机生成数量表**/
    GameConst.nums = [1, 1, 1];
    /***敌机速度表***/
    GameConst.speeds = [2, 1, 0.3];
    /***敌机被击半径表***/
    GameConst.radius = [20, 35, 80];
    /**游戏关卡数***/
    GameConst.level = 1;
    /**玩家得分***/
    GameConst.score = 0;
    return GameConst;
}());
exports.default = GameConst;
},{}],3:[function(require,module,exports){
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
},{"./ui/layaMaxUI":17}],4:[function(require,module,exports){
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
},{"./ui/layaMaxUI":17}],5:[function(require,module,exports){
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
},{"./ui/layaMaxUI":17}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./ui/layaMaxUI");
/***游戏开始界面***/
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        /***游戏资源地址数组***/
        _this.assetArr = [
            { url: "res/atlas/gameRole.atlas" },
            { url: "sound/achievement.mp3", type: Laya.Loader.SOUND },
            { url: "sound/bullet.mp3", type: Laya.Loader.SOUND },
            { url: "sound/game_over.mp3", type: Laya.Loader.SOUND },
            { url: "sound/enemy1_die.mp3", type: Laya.Loader.SOUND },
            { url: "sound/enemy3_out.mp3", type: Laya.Loader.SOUND }
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
},{"./ui/layaMaxUI":17}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebGL = Laya.WebGL;
var Stage = Laya.Stage;
var Event = laya.events.Event;
var GameStart_1 = require("./GameStart");
var GameMap_1 = require("./GameMap");
var GamePlay_1 = require("./GamePlay");
var GameOver_1 = require("./GameOver");
var EnemyManager_1 = require("./EnemyManager");
var GameConst_1 = require("./GameConst");
var RoleFactory_1 = require("./Role/RoleFactory");
var Main = /** @class */ (function () {
    function Main() {
        /****主角死亡后游戏结束时间***/
        this.deathTime = 0;
        //初始化引擎，建议增加WebGl模式
        Laya.init(720, 1280, WebGL);
        //全屏不等比缩放模式
        Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
        //加载初始化UI资源
        Laya.loader.load("res/atlas/gameUI.atlas", laya.utils.Handler.create(this, this.GameStart));
        //初始化角色管理器
        this.enemyManager = new EnemyManager_1.default(this);
    }
    Main.GetInstance = function () {
        if (this.instance == null)
            this.instance = new Main();
        return this.instance;
    };
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
        GameConst_1.default.level = 1;
        //玩家得分
        GameConst_1.default.score = 0;
        this.enemyManager.ResetInfo();
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
            this.hero = RoleFactory_1.default.GetRole("hero");
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
        this.play.update(this.hero.hp, GameConst_1.default.level, GameConst_1.default.score);
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
            //游戏升级计算
            this.levelUp();
        }
        //地图滚动更新
        this.map.updateMap();
        //游戏碰撞逻辑
        this.checkCollect();
        //敌方飞机生成逻辑
        this.enemyManager.loopCreateEnemy();
    };
    //游戏碰撞逻辑
    Main.prototype.checkCollect = function () {
        //遍历所有飞机，更改飞机状态
        for (var i = this.roleLayer.numChildren - 1; i > -1; i--) {
            //获取第一个角色
            var role = this.roleLayer.getChildAt(i);
            //角色自身更新
            role.update();
            //如果角色死亡，下一循环
            if (role.hp <= 0)
                continue;
            //发射子弹
            role.shoot();
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
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     游戏升级计算
        */
    Main.prototype.levelUp = function () {
        if (GameConst_1.default.score > GameConst_1.default.levelUpScore) {
            //关卡等级提升
            GameConst_1.default.level++;
            //角色血量增加，最大30
            this.hero.hp = Math.min(this.hero.hp + GameConst_1.default.level * 1, 30);
            //关卡越高，创建敌机间隔越短
            GameConst_1.default.createTime = GameConst_1.default.level < 30 ? GameConst_1.default.level * 2 : 60;
            //关卡越高，敌机飞行速度越高
            GameConst_1.default.speedUp = Math.floor(GameConst_1.default.level / 6);
            //关卡越高，敌机血量越高
            GameConst_1.default.hpUp = Math.floor(GameConst_1.default.level / 8);
            //关卡越高，敌机数量越多
            GameConst_1.default.numUp = Math.floor(GameConst_1.default.level / 10);
            //提高下一级的升级分数
            GameConst_1.default.levelUpScore += GameConst_1.default.level * 10;
        }
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        this.over.txt_score.text = GameConst_1.default.score.toString();
        //以弹出方式打开，有缓动效果。IDE中页面为Dialog才可用
        this.over.popup();
        //重新开始事件监听,点击后进入游戏中
        this.over.on("reStart", this, this.gameInit);
    };
    return Main;
}());
exports.default = Main;
//激活启动类
Main.GetInstance();
},{"./EnemyManager":1,"./GameConst":2,"./GameMap":3,"./GameOver":4,"./GamePlay":5,"./GameStart":6,"./Role/RoleFactory":15}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
//角色
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 角色失血
     */
    Bullet.prototype.lostHp = function (lostHp) {
        //隐藏，下一帧回收
        this.visible = false;
    };
    /**
     * 角色更新,边界检查
     */
    Bullet.prototype.update = function () {
        //如果角色隐藏，角色消亡并回收
        if (!this.visible) {
            this.die();
            return;
        }
        var xRotation = Math.sin(Laya.Utils.toRadian(this.rotation));
        var yRotation = Math.cos(Laya.Utils.toRadian(this.rotation));
        //角色根据速度飞行
        this.x -= this.speed * xRotation;
        this.y += this.speed * yRotation;
        //如果移动到显示区域以外，则移除
        if (this.y > 1280 + 100 || this.y < -150) {
            this.visible = false;
        }
    };
    return Bullet;
}(Role_1.default));
exports.default = Bullet;
},{"./Role":14}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var GameConst_1 = require("../GameConst");
//角色
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        //增加分数
        _this.addScore = 1;
        _this.shootInterval = 5000; //射击间隔
        _this.shootTime = 5000;
        return _this;
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
            Laya.SoundManager.playSound("sound/game_over.mp3");
            GameConst_1.default.score += this.addScore;
        }
    };
    /***动画完成后回调方法***/
    Enemy.prototype.onComplete = function () {
        _super.prototype.onComplete.call(this);
        //如果死亡动画播放完成
        if (this.action == "die") {
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
    };
    /**
     角色射击，生成子弹
     */
    Enemy.prototype.shoot = function () {
    };
    return Enemy;
}(Role_1.default));
exports.default = Enemy;
},{"../GameConst":2,"./Role":14}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enemy_2 = require("./Enemy");
//角色
var Enemy_1 = /** @class */ (function (_super) {
    __extends(Enemy_1, _super);
    function Enemy_1() {
        var _this = _super.call(this) || this;
        _this.isMoveLeft = true;
        _this.tickTime = 0;
        _this.isMoveLeft = Math.random() < 0.5;
        return _this;
    }
    /**
     * 角色更新,边界检查
     */
    Enemy_1.prototype.update = function () {
        //获取当前时间
        var time = Laya.Browser.now();
        //如果当前时间大于下次射击时间
        if (time > this.tickTime) {
            //更新下次子弹射击的时间
            this.tickTime = time + 1000;
            this.isMoveLeft = Math.random() < 0.5;
        }
        //角色根据速度飞行
        if (this.isMoveLeft) {
            this.x -= this.speed * 0.5;
        }
        else {
            this.x += this.speed * 0.5;
        }
        //判断是否左右超出
        if (this.x < this.roleAni.width / 2) {
            this.isMoveLeft = false;
        }
        else if (this.x > 720 - this.roleAni.width / 2) {
            this.isMoveLeft = true;
        }
        _super.prototype.update.call(this);
    };
    return Enemy_1;
}(Enemy_2.default));
exports.default = Enemy_1;
},{"./Enemy":9}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleFactory_1 = require("./RoleFactory");
var Enemy_1 = require("./Enemy");
//角色
var Enemy_2 = /** @class */ (function (_super) {
    __extends(Enemy_2, _super);
    function Enemy_2() {
        var _this = _super.call(this) || this;
        _this.shootInterval = 3000; //射击间隔
        _this.shootTime = _this.shootInterval; //第一次射击时间
        _this.addScore = 5;
        return _this;
    }
    /**
     角色射击，生成子弹
     */
    Enemy_2.prototype.shoot = function () {
        if (this.hp <= 0)
            return;
        //获取当前时间
        var time = Laya.Browser.now();
        //如果当前时间大于下次射击时间
        if (time > this.shootTime) {
            //更新下次子弹射击的时间
            this.shootTime = time + this.shootInterval;
            //多发子弹
            for (var i = 0; i < 3; i++) {
                //从对象池里面创建一个子弹
                var bullet = RoleFactory_1.default.GetRole("bullet1");
                //初始化子弹信息
                bullet.init("bullet1", 1, 10, 1, this.camp);
                //子弹消失后会不显示，重新初始化
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(this.x, this.y + 30);
                //不同角度
                bullet.rotation = -30 + i * 30;
                //添加到角色层
                if (this.parent != null)
                    this.parent.addChild(bullet);
            }
        }
    };
    return Enemy_2;
}(Enemy_1.default));
exports.default = Enemy_2;
},{"./Enemy":9,"./RoleFactory":15}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ufo_1 = require("./ufo");
var RoleFactory_1 = require("./RoleFactory");
var Enemy_1 = require("./Enemy");
//角色
var Enemy_3 = /** @class */ (function (_super) {
    __extends(Enemy_3, _super);
    function Enemy_3() {
        var _this = _super.call(this) || this;
        _this.shootInterval = 8000; //射击间隔
        _this.shootTime = _this.shootInterval; //第一次射击时间
        _this.addScore = 10;
        return _this;
    }
    /**
     角色射击，生成子弹
     */
    Enemy_3.prototype.shoot = function () {
        if (this.hp <= 0)
            return;
        //获取当前时间
        var time = Laya.Browser.now();
        //如果当前时间大于下次射击时间
        if (time > this.shootTime) {
            //更新下次子弹射击的时间
            this.shootTime = time + this.shootInterval;
            //生成随机道具类型
            if (Math.random() < 0.6) {
                this.shootAct();
            }
            else {
                this.shootAct_2();
            }
        }
    };
    Enemy_3.prototype.shootAct = function () {
        this.shootActDo();
        Laya.timer.once(500, this, this.shootActDo);
    };
    //一组子弹实例
    Enemy_3.prototype.shootActDo = function () {
        //多发子弹
        for (var i = 0; i < 18; i++) {
            //从对象池里面创建一个子弹
            var bullet = RoleFactory_1.default.GetRole("bullet1");
            //初始化子弹信息
            bullet.init("bullet1", 1, 10, 1, this.camp);
            //子弹消失后会不显示，重新初始化
            bullet.visible = true;
            //设置子弹发射初始化位置
            bullet.pos(this.x, this.y + 80);
            //不同角度
            bullet.rotation = -90 + i * 10;
            //添加到角色层
            if (this.parent != null)
                this.parent.addChild(bullet);
        }
    };
    Enemy_3.prototype.shootAct_2 = function () {
        for (var i = 0; i < 36; i++) {
            Laya.timer.once(30 * i, this, this.shootActDo_2, [i], false);
        }
    };
    Enemy_3.prototype.shootActDo_2 = function (index) {
        //从对象池里面创建一个子弹
        var bullet = RoleFactory_1.default.GetRole("bullet1");
        //初始化子弹信息
        bullet.init("bullet1", 1, 10, 1, this.camp);
        //子弹消失后会不显示，重新初始化
        bullet.visible = true;
        //设置子弹发射初始化位置
        bullet.pos(this.x, this.y + 80);
        if (index > 18)
            index = 36 - index;
        //不同角度
        bullet.rotation = -90 + index * 10;
        //添加到角色层
        if (this.parent != null)
            this.parent.addChild(bullet);
    };
    /**角色死亡掉落物品**/
    Enemy_3.prototype.lostProp = function () {
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
    return Enemy_3;
}(Enemy_1.default));
exports.default = Enemy_3;
},{"./Enemy":9,"./RoleFactory":15,"./ufo":16}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var RoleFactory_1 = require("./RoleFactory");
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
        //减血
        this.hp -= lostHp;
        //根据血量判断
        if (this.hp > 0) {
            //如果未死亡，则播放受击动画
            //this.playAction("hit");
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
        }
        //道具死亡
        prop.hp = 0;
        //道具吃完后消失，下一帧回收
        prop.visible = false;
    };
    /**
     更新
     */
    Hero.prototype.update = function () {
        //主角边界检查
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
    };
    /**
     角色射击，生成子弹
     */
    Hero.prototype.shoot = function () {
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
                var bullet = RoleFactory_1.default.GetRole("bullet2");
                //初始化子弹信息
                bullet.init("bullet2", 1, -10, 1, this.camp);
                //子弹消失后会不显示，重新初始化
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(this.x + pos[i], this.y - 80);
                //旋转角度
                bullet.rotation = 0;
                //添加到角色层
                this.parent.addChild(bullet);
                //添加子弹音效					
                Laya.SoundManager.playSound("sound/bullet.mp3");
            }
        }
    };
    return Hero;
}(Role_1.default));
exports.default = Hero;
},{"./Role":14,"./RoleFactory":15}],14:[function(require,module,exports){
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
            this.die();
            return;
        }
        //角色根据速度飞行
        this.y += this.speed;
        //如果移动到显示区域以外，则移除
        if (this.y > 1280 + 100 || this.y < -150) {
            this.visible = false;
        }
        //判断是否左右超出
        if (this.x < this.roleAni.width / 2) {
            this.x = this.roleAni.width / 2;
        }
        else if (this.x > 720 - this.roleAni.width / 2) {
            this.x = 720 - this.roleAni.width / 2;
        }
    };
    /**
     角色射击，生成子弹
     */
    Role.prototype.shoot = function () {
    };
    /**角色死亡并回收到对象池**/
    Role.prototype.die = function () {
        //角色动画停止
        this.roleAni.stop();
        //去除所有动画监听
        this.roleAni.offAll();
        //从舞台移除
        this.removeSelf();
        //回收到池
        Laya.Pool.recover(this.type, this);
    };
    return Role;
}(Laya.Sprite));
exports.default = Role;
},{}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var Hero_1 = require("./Hero");
var Bullet_1 = require("./Bullet");
var ufo_1 = require("./ufo");
var Enemy_1_1 = require("./Enemy_1");
var Enemy_2_1 = require("./Enemy_2");
var Enemy_3_1 = require("./Enemy_3");
var RoleFactory = /** @class */ (function () {
    function RoleFactory() {
    }
    RoleFactory.GetRole = function (type) {
        var role = null;
        switch (type) {
            case "hero":
                role = Laya.Pool.getItemByClass(type, Hero_1.default);
                break;
            case "bullet1":
            case "bullet2":
                role = Laya.Pool.getItemByClass(type, Bullet_1.default);
                break;
            case "ufo":
                role = Laya.Pool.getItemByClass(type, ufo_1.default);
                break;
            case "enemy1":
                role = Laya.Pool.getItemByClass(type, Enemy_1_1.default);
                break;
            case "enemy2":
                role = Laya.Pool.getItemByClass(type, Enemy_2_1.default);
                break;
            case "enemy3":
                role = Laya.Pool.getItemByClass(type, Enemy_3_1.default);
                break;
            default:
                role = Laya.Pool.getItemByClass(type, Role_1.default);
        }
        return role;
    };
    return RoleFactory;
}());
exports.default = RoleFactory;
},{"./Bullet":8,"./Enemy_1":10,"./Enemy_2":11,"./Enemy_3":12,"./Hero":13,"./Role":14,"./ufo":16}],16:[function(require,module,exports){
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
},{"./Role":14}],17:[function(require,module,exports){
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
},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRW5lbXlNYW5hZ2VyLnRzIiwic3JjL0dhbWVDb25zdC50cyIsInNyYy9HYW1lTWFwLnRzIiwic3JjL0dhbWVPdmVyLnRzIiwic3JjL0dhbWVQbGF5LnRzIiwic3JjL0dhbWVTdGFydC50cyIsInNyYy9NYWluLnRzIiwic3JjL1JvbGUvQnVsbGV0LnRzIiwic3JjL1JvbGUvRW5lbXkudHMiLCJzcmMvUm9sZS9FbmVteV8xLnRzIiwic3JjL1JvbGUvRW5lbXlfMi50cyIsInNyYy9Sb2xlL0VuZW15XzMudHMiLCJzcmMvUm9sZS9IZXJvLnRzIiwic3JjL1JvbGUvUm9sZS50cyIsInNyYy9Sb2xlL1JvbGVGYWN0b3J5LnRzIiwic3JjL1JvbGUvdWZvLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNMQSx5Q0FBb0M7QUFDcEMsa0RBQTZDO0FBRTdDO0lBSUksc0JBQVksSUFBUztRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sZ0NBQVMsR0FBaEI7UUFFSSxRQUFRO1FBQ2QsbUJBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLFFBQVE7UUFDUixtQkFBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDdEIsU0FBUztRQUNULG1CQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNuQixZQUFZO1FBQ1osbUJBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLGFBQWE7UUFDYixtQkFBUyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVKLFFBQVE7SUFDRCxzQ0FBZSxHQUF0QjtR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QUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFB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RUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxrQkFBa0IsRUFBQyxzQkFBc0IsRUFBQyxlQUFlLEVBQUMsc0JBQXNCLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztRQU10c0QsaUJBQUM7S0FaRCxBQVlDLENBWitCLElBQUksR0FZbkM7SUFaWSxhQUFVLGFBWXRCLENBQUE7SUFDRDtRQUFpQywrQkFBTTtRQUluQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsb0NBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hDLENBQUM7UUFMYyxrQkFBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsZUFBZSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsVUFBVSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxtQkFBbUIsRUFBQyxrQkFBa0IsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1FBTS84QixrQkFBQztLQVRELEFBU0MsQ0FUZ0MsTUFBTSxHQVN0QztJQVRZLGNBQVcsY0FTdkIsQ0FBQTtBQUNMLENBQUMsRUE3Q2EsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBNkNmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBNYWluIGZyb20gXCIuL01haW5cIjtcclxuaW1wb3J0IFJvbGVcdGZyb20gXCIuL1JvbGUvUm9sZVwiO1xyXG5pbXBvcnQgSGVyb1x0ZnJvbSBcIi4vUm9sZS9IZXJvXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9Sb2xlL0VuZW15XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vUm9sZS9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGUvUm9sZUZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15TWFuYWdlclxyXG57XHJcbiAgICBwcml2YXRlIE1haW46TWFpbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYWluOk1haW4pIFxyXG5cdHtcclxuICAgICAgICB0aGlzLk1haW4gPSBtYWluO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldEluZm8oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/mlYzkurrliLfmlrDliqDpgJ9cclxuXHRcdEdhbWVDb25zdC5jcmVhdGVUaW1lID0gMDtcclxuXHRcdC8v5pWM5Lq66YCf5bqm5o+Q5Y2HXHJcblx0XHRHYW1lQ29uc3Quc3BlZWRVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuihgOmHj+aPkOWNh1x0XHJcblx0XHRHYW1lQ29uc3QuaHBVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuaVsOmHj+aPkOWNh1x0XHRcdFx0XHJcblx0XHRHYW1lQ29uc3QubnVtVXAgPSAwO1xyXG5cdFx0Ly/ljYfnuqfnrYnnuqfmiYDpnIDnmoTmiJDnu6nmlbDph49cclxuXHRcdEdhbWVDb25zdC5sZXZlbFVwU2NvcmUgPSAxMDtcdFx0XHJcbiAgICB9XHJcblxyXG5cdC8v55Sf5oiQ5pWM5pa56aOe5py6XHJcblx0cHVibGljIGxvb3BDcmVhdGVFbmVteSgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+WIm+W7uuaVjOacuu+8jOWKoOWFpeWFs+WNoeWNh+e6p+aVsOaNru+8jOaPkOmrmOmavuW6plxyXG5cdFx0Ly/nlJ/miJDlsI/po57mnLpcclxuXHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICg4MCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lKSA9PTApXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMCwgR2FtZUNvbnN0Lmhwc1swXSxHYW1lQ29uc3Quc3BlZWRzWzBdICsgR2FtZUNvbnN0LnNwZWVkVXAgLCBHYW1lQ29uc3QubnVtc1swXSArIEdhbWVDb25zdC5udW1VcCk7XHJcblx0XHR9XHJcblx0XHQvL+eUn+aIkOS4reWei+mjnuaculxyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDUwMCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lICogMikgPT0gMCkgXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMSwgR2FtZUNvbnN0Lmhwc1sxXSArR2FtZUNvbnN0LmhwVXAgKiAyLEdhbWVDb25zdC5zcGVlZHNbMV0gKyBHYW1lQ29uc3Quc3BlZWRVcCAsIEdhbWVDb25zdC5udW1zWzFdICsgR2FtZUNvbnN0Lm51bVVwKTtcclxuXHRcdH1cclxuXHRcdC8v55Sf5oiQYm9zc1xyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDUwMCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lICogMykgPT0gMCkgXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMiwgR2FtZUNvbnN0Lmhwc1syXSArIEdhbWVDb25zdC5ocFVwICogNixHYW1lQ29uc3Quc3BlZWRzWzJdLCBHYW1lQ29uc3QubnVtc1syXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAg5Yib5bu65pWM5Lq6XHJcblx0ICogQHBhcmFtIGluZGV4IFx05pWM5Lq657yW5Y+3XHJcblx0ICogQHBhcmFtIGhwICAgXHRcdCDmlYzkurrooYDph49cclxuXHQgKiBAcGFyYW0gc3BlZWRcdFx05pWM5Lq66YCf5bqmXHJcblx0ICogQHBhcmFtIG51bVx0XHTmlYzkurrmlbDph49cclxuXHQgKi9cclxuXHRwcml2YXRlIGNyZWF0ZUVuZW15KGluZGV4Om51bWJlcixocDpudW1iZXIsc3BlZWQ6bnVtYmVyLG51bTpudW1iZXIpOnZvaWQgXHJcblx0e1xyXG5cdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IG51bTsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRsZXQgZW5lbXlUeXBlID0gXCJlbmVteVwiICsgKGluZGV4KzEpO1xyXG5cdFx0XHQvL+WIm+W7uuaVjOS6uu+8jOS7juWvueixoeaxoOWIm+W7ulxyXG5cdFx0XHRsZXQgZW5lbXk6RW5lbXkgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKGVuZW15VHlwZSkgYXMgRW5lbXk7XHJcblx0XHRcdC8v5Yid5aeL5YyW5pWM5Lq6XHJcblx0XHRcdGVuZW15LmluaXQoZW5lbXlUeXBlLCBocCwgc3BlZWQsR2FtZUNvbnN0LnJhZGl1c1tpbmRleF0sMSk7XHJcblx0XHRcdC8v5LuO5a+56LGh5rGg5Lit5Yib5bu655qE5a+56LGh5q275Lqh5YmN6KKr6ZqQ6JeP5LqG77yM5Zug5q2k6KaB6YeN5paw5Yid5aeL5YyW5pi+56S677yM5ZCm5YiZ5paw5Yib5bu66KeS6Imy5LiN5Lya5pi+56S65Ye65p2lXHJcblx0XHRcdGVuZW15LnZpc2libGUgPSB0cnVlO1xyXG5cdFx0XHQvL+maj+acuuS9jee9rlxyXG5cdFx0XHRlbmVteS5wb3MoTWF0aC5yYW5kb20oKSAqKDcyMC04MCkrNTAsIC1NYXRoLnJhbmRvbSgpICogMTAwKTtcclxuXHRcdFx0Ly/mt7vliqDliLDoiJ7lj7DkuIpcclxuXHRcdFx0dGhpcy5NYWluLnJvbGVMYXllci5hZGRDaGlsZChlbmVteSk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25zdFxyXG57XHJcbiAgICAvL+a4uOaIj+WFs+WNoeaPkOWNh+WxnuaAp1xyXG5cdC8qKirmlYzkurrliLfmlrDliqDpgJ8qKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlVGltZTpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrpgJ/luqbmj5DljYcqKiovXHJcblx0cHVibGljIHN0YXRpYyBzcGVlZFVwOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uuihgOmHj+aPkOWNhyoqKi9cdFx0XHJcblx0cHVibGljIHN0YXRpYyBocFVwOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uuaVsOmHj+aPkOWNhyoqKi9cdFx0XHRcdFx0XHJcblx0cHVibGljIHN0YXRpYyBudW1VcDpudW1iZXIgPSAwO1xyXG5cdC8qKioq5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePKioqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZXZlbFVwU2NvcmU6IG51bWJlciA9IDEwO1xyXG5cclxuXHQvKioqKuaVjOacuuihgOmHj+ihqCoqKiovXHJcblx0cHVibGljIHN0YXRpYyBocHM6IG51bWJlcltdID0gWzEsIDcsIDE1XTtcclxuXHQvKioq5pWM5py655Sf5oiQ5pWw6YeP6KGoKiovXHJcblx0cHVibGljIHN0YXRpYyBudW1zOiBudW1iZXJbXSA9IFsxLCAxLCAxXTtcclxuXHQvKioq5pWM5py66YCf5bqm6KGoKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgc3BlZWRzOiAgbnVtYmVyW10gPSBbMiwgMSwgMC4zXTtcclxuXHQvKioq5pWM5py66KKr5Ye75Y2K5b6E6KGoKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgcmFkaXVzOiAgbnVtYmVyW10gPSBbMjAsIDM1LCA4MF07XHJcbiAgICBcclxuXHQvKirmuLjmiI/lhbPljaHmlbAqKiovXHJcblx0cHVibGljIHN0YXRpYyBsZXZlbDpudW1iZXIgPSAxO1xyXG5cdC8qKueOqeWutuW+l+WIhioqKi9cclxuXHRwdWJsaWMgc3RhdGljIHNjb3JlOm51bWJlciA9IDA7XHJcblxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP6IOM5pmv55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFwIGV4dGVuZHMgdWkuR2FtZUJnVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDmuLjmiI/og4zmma/np7vliqjmm7TmlrBcclxuICAgICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGVNYXAoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy55Kz0xO1xyXG4gICAgICAgIC8v5aaC5p6c6IOM5pmv5Zu+5Yiw5LqG5LiL6Z2i5LiN5Y+v6KeB77yM56uL5Y2z6LCD5pW05L2N572u5Yiw5LiK6Z2i5b6q546v5pi+56S6XHJcbiAgICAgICAgLy/muLjmiI/oiJ7lj7Dpq5jkuLoxMjgwXHJcbiAgICAgICAgaWYgKHRoaXMuYmcxLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgdGhpcy5iZzEueSAtPSAxMjgwICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYmcyLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJnMi55IC09IDEyODAgKiAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPdmVyIGV4dGVuZHMgdWkuR2FtZU92ZXJVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFx0Ly9cIumHjeaWsOW8gOWni1wi5oyJ6ZKu6byg5qCH5LqL5Lu2XHJcblx0XHRcdHRoaXMuYnRuX3Jlc3RhcnQub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vblJlc3RhcnQpO1xyXG4gICAgfVxyXG5cdC8qKlxyXG5cdFx05ri45oiP6YeN5paw5byA5aeLXHJcblx0XHQgKi9cdFx0XHJcblx0XHRwcml2YXRlIG9uUmVzdGFydCgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mkq3mlL5JREXkuK3nvJbovpHnmoTmjInpkq7liqjnlLtcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5wbGF5KDAsZmFsc2UpO1xyXG5cdFx0XHQvL+ebkeWQrOWKqOeUu+WujOaIkOS6i+S7tu+8jOazqOaEj+eUqG9uY2VcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLkFuaUNvbXBsZXRlKTtcclxuXHRcdH1cclxuXHRcdC8qKlxyXG5cdFx0IOaMiemSruWKqOeUu+aSreaUvuWujOaIkFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIEFuaUNvbXBsZXRlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+WPkemAgemHjeaWsOW8gOWni+S6i+S7tu+8jOWcqE1haW7nsbvkuK3nm5HlkKxcclxuXHRcdFx0dGhpcy5ldmVudChcInJlU3RhcnRcIilcclxuXHRcdFx0Ly/nvJPliqjliqjnlLvlhbPpl63mlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdFx0dGhpcy5jbG9zZSgpO1xyXG5cdFx0fVxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBsYXkgZXh0ZW5kcyB1aS5HYW1lUGxheVVJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy/nm5HlkKzmmoLlgZzmjInpkq7kuovku7ZcclxuICAgICAgICB0aGlzLmJ0bl9wYXVzZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uUGF1c2UpXHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdFx0IOa4uOaIj+aaguWBnFxyXG5cdFx0ICovXHRcclxuXHRcdHByaXZhdGUgb25QYXVzZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mmL7npLpJREXkuK3pmpDol4/nmoTmmoLlgZznlYzpnaJcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2UudmlzaWJsZT10cnVlO1xyXG5cdFx0XHQvL+aaguWBnOeVjOmdouWKoOeCueWHu+ebkeWQrO+8iOS4gOasoe+8iVxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS5vbmNlKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25Db250aW51ZSlcclxuXHRcdFx0XHRcclxuXHRcdFx0Ly/ml7bpl7Tlr7nosaHnvKnmlL7kuLow5bCx5piv5YGc5q2iXHJcblx0XHRcdExheWEudGltZXIuc2NhbGU9MDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQg5ri45oiP57un57utXHJcblx0XHQgKi9cdFxyXG5cdFx0cHJpdmF0ZSBvbkNvbnRpbnVlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aXtumXtOWvueixoee8qeaUvuS4ujHlsLHmmK/mraPluLjpgJ/luqbmkq3mlL5cclxuXHRcdFx0TGF5YS50aW1lci5zY2FsZT0xO1xyXG5cdFx0XHQvL+makOiXj+aaguWBnOeVjOmdolxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS52aXNpYmxlPWZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKioqKuacrOWxgOa4uOaIj+aVsOaNrlVJ5pu05pawKioqL1xyXG5cdFx0cHVibGljIHVwZGF0ZShocDpudW1iZXIsbGV2ZWw6bnVtYmVyLHNjb3JlOm51bWJlcik6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+inkuiJsuihgOmHj+abtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9ocC50ZXh0PVwiSFA6XCIraHA7XHJcblx0XHRcdC8v5YWz5Y2h562J57qn5pu05pawXHJcblx0XHRcdHRoaXMudHh0X2xldmVsLnRleHQ9XCJMRVZFTDpcIitsZXZlbDtcclxuXHRcdFx0Ly/muLjmiI/liIbmlbDmm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfc2NvcmUudGV4dD1cIlNDT1JFOlwiK3Njb3JlO1xyXG5cdFx0fVxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP5byA5aeL55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhcnQgZXh0ZW5kcyB1aS5HYW1lU3RhcnRVSVxyXG57XHJcbiAgICAvKioq5ri45oiP6LWE5rqQ5Zyw5Z2A5pWw57uEKioqL1xyXG4gICAgIHByaXZhdGUgYXNzZXRBcnI6YW55PVtcclxuICAgIHt1cmw6XCJyZXMvYXRsYXMvZ2FtZVJvbGUuYXRsYXNcIn1cclxuICAgICwge3VybDpcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvYnVsbGV0Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvZ2FtZV9vdmVyLm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvZW5lbXkxX2RpZS5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgICwge3VybDpcInNvdW5kL2VuZW15M19vdXQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICBdXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL+a4uOaIj+WKoOi9veacquWujOaIkOaaguaXtuS4jeaYvuekuu+8jOmYsuatoueCueWHu+WHuumUmVxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvL+ebkeWQrOeVjOmdouaYr+WQpuWFs+mXrVxyXG4gICAgICAgIHRoaXMub25jZShsYXlhLmV2ZW50cy5FdmVudC5DTE9TRSx0aGlzLHRoaXMub25DbG9zZSk7XHJcbiAgICAgICAgLy/liqDovb3liankvZnmuLjmiI/otYTmupDjgIHpn7PkuZDvvIzliqDovb3lrozmiJDkuI7liqDovb3ov5vluqblm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMuYXNzZXRBcnIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Db21wbGV0ZSksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Qcm9ncmVzcykpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/otYTmupDliqDovb3lrozmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICAgICAgdGhpcy50eHRfbG9hZC50ZXh0PVwi6LWE5rqQ5Yqg6L295a6M5oiQLOW8gOWni+a4uOaIj+WQpy4uLlwiO1xyXG4gICAgICAgIC8v5ri45oiP5byA5aeL5oyJ6ZKu5pi+56S65bm25by55Ye6XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIC8v57yT5Yqo57G75by55Ye65Yqo55S7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi5mcm9tKHRoaXMuYnRuX3N0YXJ0LHt5OnRoaXMuYnRuX3N0YXJ0LnkrMjB9LDEwMDAsTGF5YS5FYXNlLmVsYXN0aWNPdXQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+i1hOa6kOWKoOi9vei/m+W6plxyXG4gICAgICogQHBhcmFtIGxvYWROdW0gIOi/m+W6plxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUHJvZ3Jlc3MobG9hZE51bTpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+aYvuekuuWKoOi9vei/m+W6plxyXG4gICAgICAgIHRoaXMudHh0X2xvYWQudGV4dD1cIui1hOa6kOWKoOi9veS4re+8jOW9k+WJjei/m+W6pu+8mlwiK2xvYWROdW0qMTAwK1wiJVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6ZetXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DbG9zZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S7juiInuWPsOenu+mZpOiHquW3sVxyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIC8v5Y+q5Yqg6L295LiA5qyh77yM5Zug5q2k55u05o6l5raI5q+B6Ieq5bexXHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFdlYkdMID0gTGF5YS5XZWJHTDtcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZTtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBHYW1lU3RhcnQgZnJvbSBcIi4vR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCBHYW1lTWFwIGZyb20gXCIuL0dhbWVNYXBcIjtcclxuaW1wb3J0IEdhbWVQbGF5IGZyb20gXCIuL0dhbWVQbGF5XCI7XHJcbmltcG9ydCBHYW1lT3ZlciBmcm9tIFwiLi9HYW1lT3ZlclwiO1xyXG5pbXBvcnQgUm9sZVx0ZnJvbSBcIi4vUm9sZS9Sb2xlXCI7XHJcbmltcG9ydCBIZXJvXHRmcm9tIFwiLi9Sb2xlL0hlcm9cIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL1JvbGUvRW5lbXlcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9Sb2xlL0J1bGxldFwiO1xyXG5pbXBvcnQgRW5lbXlNYW5hZ2VyIGZyb20gXCIuL0VuZW15TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgUm9sZUZhY3RvcnkgZnJvbSBcIi4vUm9sZS9Sb2xlRmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBcclxue1xyXG5cdHB1YmxpYyBzdGF0aWMgaW5zdGFuY2U6TWFpbjtcclxuXHRwdWJsaWMgc3RhdGljIEdldEluc3RhbmNlKCk6TWFpblxyXG5cdHtcclxuXHRcdGlmKHRoaXMuaW5zdGFuY2UgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5pbnN0YW5jZSA9IG5ldyBNYWluKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcblx0fVxyXG5cclxuXHQvKirlvIDlp4vpobXpnaIqKiovXHJcblx0cHVibGljIHN0YXJ0OkdhbWVTdGFydDtcclxuXHQvKirlnLDlm77pobXpnaIqKiovXHJcblx0cHVibGljIG1hcDpHYW1lTWFwO1xyXG5cdC8qKua4uOaIj+S4reeVjOmdoioqKi9cclxuXHRwdWJsaWMgcGxheTpHYW1lUGxheTtcclxuXHQvKirmuLjmiI/nu5PmnZ/pobXpnaIqKiovXHJcblx0cHVibGljIG92ZXI6R2FtZU92ZXI7XHJcblxyXG5cdC8v5pWM5pa555Sf5oiQ566h55CGXHJcblx0cHJpdmF0ZSBlbmVteU1hbmFnZXI6RW5lbXlNYW5hZ2VyO1xyXG5cclxuXHQvKirop5LoibLlsYLlrrnlmagqKiovXHJcblx0cHVibGljIHJvbGVMYXllcjpMYXlhLlNwcml0ZTtcclxuXHQvKirnjqnlrrbkuLvop5IqKiovXHJcblx0cHVibGljIGhlcm86SGVybztcclxuXHRcclxuXHQvKirpvKDmoIfkuIrkuIDluKd45bqn5qCHKiogKi9cdFx0XHJcblx0cHJpdmF0ZSBtb3ZlWDpudW1iZXI7XHJcblx0Lyoq6byg5qCH5LiK5LiA5bineeW6p+aghyoqICovXHRcclxuXHRwcml2YXRlIG1vdmVZOm51bWJlcjtcclxuXHJcblx0LyoqKirkuLvop5LmrbvkuqHlkI7muLjmiI/nu5PmnZ/ml7bpl7QqKiovXHJcblx0cHJpdmF0ZSBkZWF0aFRpbWU6bnVtYmVyPTBcclxuXHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7XHJcblx0XHQvL+WIneWni+WMluW8leaTju+8jOW7uuiuruWinuWKoFdlYkds5qih5byPXHJcblx0XHRMYXlhLmluaXQoNzIwLDEyODAsV2ViR0wpO1xyXG5cdFx0Ly/lhajlsY/kuI3nrYnmr5TnvKnmlL7mqKHlvI9cclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfRVhBQ1RGSVQ7XHJcblx0XHQvL+WKoOi9veWIneWni+WMllVJ6LWE5rqQXHJcblx0XHRMYXlhLmxvYWRlci5sb2FkKFwicmVzL2F0bGFzL2dhbWVVSS5hdGxhc1wiLGxheWEudXRpbHMuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLkdhbWVTdGFydCkpO1xyXG5cdFx0XHJcblx0XHQvL+WIneWni+WMluinkuiJsueuoeeQhuWZqFxyXG5cdFx0dGhpcy5lbmVteU1hbmFnZXIgPSBuZXcgRW5lbXlNYW5hZ2VyKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBHYW1lU3RhcnQoKTp2b2lkIFxyXG5cdHtcclxuXHRcdC8v5a6e5L6L5YyW5byA5aeL6aG16Z2iXHJcblx0XHR0aGlzLnN0YXJ0ID0gbmV3IEdhbWVTdGFydCgpO1xyXG5cdFx0dGhpcy5zdGFydC5wb3B1cCgpO1xyXG5cdFx0Ly/nm5HlkKzlvIDlp4vmuLjmiI/lvIDlp4vmjInpkq7kuovku7Ys54K55Ye75ZCO6L+b5YWl5ri45oiP5LitXHJcblx0XHR0aGlzLnN0YXJ0LmJ0bl9zdGFydC5vbihFdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMuZ2FtZUluaXQpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQg5ri45oiP5Lit77yM5ri45oiP5Yid5aeL5YyWXHJcblx0XHQqL1xyXG5cdHByaXZhdGUgZ2FtZUluaXQoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/nvJPliqjliqjnlLvlhbPpl63mlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdHRoaXMuc3RhcnQuY2xvc2UoKTtcclxuXHRcdFxyXG5cdFx0Ly/ph43nva7lhbPljaHmlbDmja5cclxuXHRcdC8v5ri45oiP5YWz5Y2h5pWwXHJcblx0XHRHYW1lQ29uc3QubGV2ZWwgPSAxO1xyXG5cdFx0Ly/njqnlrrblvpfliIZcclxuXHRcdEdhbWVDb25zdC5zY29yZSA9IDA7XHJcblxyXG5cdFx0dGhpcy5lbmVteU1hbmFnZXIuUmVzZXRJbmZvKCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5Zyw5Zu+6IOM5pmv6aG16Z2iKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMubWFwID09IG51bGwpXHJcblx0XHRcdHRoaXMubWFwID0gbmV3IEdhbWVNYXAoKTtcclxuXHRcdC8v5Yqg6L295Yiw6Iie5Y+wXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubWFwKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbop5LoibLlsYLlubbliqDovb3liLDoiJ7lj7Ao5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5yb2xlTGF5ZXIgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5yb2xlTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb2xlTGF5ZXIpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMlua4uOaIj+S4rVVJ6aG16Z2iKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMucGxheSA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLnBsYXkgPSBuZXcgR2FtZVBsYXkoKTtcclxuXHRcdC8v5Yqg6L295Yiw6Iie5Y+wXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMucGxheSk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5Li76KeSKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMuaGVybyA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLmhlcm8gPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiaGVyb1wiKTtcclxuXHRcdC8v5Yid5aeL5YyW6KeS6Imy57G75Z6L44CB6KGA6YeP77yM5rOo77ya6YCf5bqmc3BlZWTkuLow77yM5Zug5Li65Li76KeS5piv6YCa6L+H5pON5o6n5pS55Y+Y5L2N572uLOmYteiQpeS4ujBcclxuXHRcdHRoaXMuaGVyby5pbml0KFwiaGVyb1wiLDEwLDAsMzAsMCk7XHJcblx0XHQvL+atu+S6oeWQjuS8mumakOiXj++8jOmHjeaWsOW8gOWni+WQjumcgOaYvuekulxyXG5cdFx0dGhpcy5oZXJvLnZpc2libGU9dHJ1ZTtcclxuXHRcdC8v5Li76KeS5L2N572u5L+u5pS5XHJcblx0XHR0aGlzLmhlcm8ucG9zKDM2MCw4MDApO1xyXG5cdFx0Ly/op5LoibLliqDovb3liLDop5LoibLlsYLkuK1cclxuXHRcdHRoaXMucm9sZUxheWVyLmFkZENoaWxkKHRoaXMuaGVybyk7XHJcblx0XHRcclxuXHRcdC8v6byg5qCH5oyJ5LiL55uR5ZCsXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uTW91c2VEb3duKTtcclxuXHRcdC8v6byg5qCH5oqs6LW355uR5ZCsXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vbk1vdXNlVXApO1xyXG5cdFx0Ly/muLjmiI/kuLvlvqrnjq9cclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLmxvb3ApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOeCueWHu+W8gOWni+inpuWPkeenu+WKqFxyXG5cdFx0Ki9cdFxyXG5cdHByaXZhdGUgb25Nb3VzZURvd24oKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/orrDlvZXpvKDmoIfmjInkuIvml7bnmoTkvY3nva7vvIznlKjkuo7orqHnrpfpvKDmoIfnp7vliqjph49cclxuXHRcdHRoaXMubW92ZVg9TGF5YS5zdGFnZS5tb3VzZVg7XHJcblx0XHR0aGlzLm1vdmVZPUxheWEuc3RhZ2UubW91c2VZO1xyXG5cdFx0Ly9cclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQg5Li76KeS6Lef6ZqP6byg5qCH56e75YqoXHJcblx0XHQqL1x0XHJcblx0cHJpdmF0ZSBvbk1vdXNlTW92ZSgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+iuoeeul+inkuiJsuenu+WKqOmHj1xyXG5cdFx0bGV0IHh4Om51bWJlcj10aGlzLm1vdmVYLUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0bGV0IHl5Om51bWJlcj10aGlzLm1vdmVZLUxheWEuc3RhZ2UubW91c2VZO1xyXG5cdFx0Ly/mm7TmlrDnp7vliqjkvY3nva5cclxuXHRcdHRoaXMuaGVyby54LT14eDtcclxuXHRcdHRoaXMuaGVyby55LT15eTtcclxuXHRcdC8v5pu05paw5pys5bin55qE56e75Yqo5bqn5qCHXHJcblx0XHR0aGlzLm1vdmVYPUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0dGhpcy5tb3ZlWT1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHR9XHJcblx0LyoqXHJcblx0IOm8oOagh+aKrOi1t+OAgeWFs+mXreenu+WKqOebkeWQrFxyXG5cdFx0Ki9cdFx0XHJcblx0cHJpdmF0ZSBvbk1vdXNlVXAoKTp2b2lkXHJcblx0e1xyXG5cdFx0TGF5YS5zdGFnZS5vZmYoRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOa4uOaIj+S4u+W+queOr1xyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGxvb3AoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/mnKzlsYDmuLjmiI/mlbDmja7mm7TmlrBcclxuXHRcdHRoaXMucGxheS51cGRhdGUodGhpcy5oZXJvLmhwLEdhbWVDb25zdC5sZXZlbCxHYW1lQ29uc3Quc2NvcmUpXHJcblx0XHQvL+WmguaenOS4u+inkuatu+S6oVxyXG5cdFx0aWYodGhpcy5oZXJvLmhwPD0wKVxyXG5cdFx0e1xyXG5cdFx0XHQvL+eOqeWutumjnuacuuatu+S6oeWQjuW7tui/n+aXtumXtO+8jDEwMOW4p+WQjuW8ueWHuua4uOaIj+e7k+adn+eVjOmdolxyXG5cdFx0XHR0aGlzLmRlYXRoVGltZSsrXHJcblx0XHRcdGlmICh0aGlzLmRlYXRoVGltZT49MTAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5kZWF0aFRpbWU9MDtcclxuXHRcdFx0XHQvL+a4uOaIj+e7k+adn1xyXG5cdFx0XHRcdHRoaXMuZ2FtZU92ZXIoKTtcclxuXHRcdFx0XHQvL+acrOaWueazleWGheWQjue7remAu+i+keS4jeaJp+ihjFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZS8v5Li76KeS5pyq5q275LqhXHJcblx0XHR7XHJcblx0XHRcdC8v5ri45oiP5Y2H57qn6K6h566XXHJcblx0XHRcdHRoaXMubGV2ZWxVcCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8v5Zyw5Zu+5rua5Yqo5pu05pawXHJcblx0XHR0aGlzLm1hcC51cGRhdGVNYXAoKVxyXG5cdFx0Ly/muLjmiI/norDmkp7pgLvovpFcclxuXHRcdHRoaXMuY2hlY2tDb2xsZWN0KCk7XHJcblx0XHQvL+aVjOaWuemjnuacuueUn+aIkOmAu+i+kVxyXG5cdFx0dGhpcy5lbmVteU1hbmFnZXIubG9vcENyZWF0ZUVuZW15KCk7XHJcblx0fVxyXG5cclxuXHQvL+a4uOaIj+eisOaSnumAu+i+kVxyXG5cdHByaXZhdGUgY2hlY2tDb2xsZWN0KCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v6YGN5Y6G5omA5pyJ6aOe5py677yM5pu05pS56aOe5py654q25oCBXHJcblx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSB0aGlzLnJvbGVMYXllci5udW1DaGlsZHJlbiAtIDE7IGkgPiAtMTsgaS0tKSBcclxuXHRcdHtcclxuXHRcdFx0Ly/ojrflj5bnrKzkuIDkuKrop5LoibJcclxuXHRcdFx0dmFyIHJvbGU6Um9sZSA9IHRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaSkgYXMgUm9sZTtcclxuXHRcdFx0Ly/op5LoibLoh6rouqvmm7TmlrBcclxuXHRcdFx0cm9sZS51cGRhdGUoKTtcclxuXHJcblx0XHRcdC8v5aaC5p6c6KeS6Imy5q275Lqh77yM5LiL5LiA5b6q546vXHJcblx0XHRcdGlmKHJvbGUuaHA8PTApIGNvbnRpbnVlO1xyXG5cdFx0XHQvL+WPkeWwhOWtkOW8uVxyXG5cdFx0XHRyb2xlLnNob290KCk7XHJcblxyXG5cdFx0XHQvL+eisOaSnuajgOa1i1xyXG5cdFx0XHRmb3IodmFyIGo6bnVtYmVyPWktMTtqPi0xO2otLSlcclxuXHRcdFx0e1x0Ly/ojrflj5bnrKzkuozkuKrop5LoibJcclxuXHRcdFx0XHR2YXIgcm9sZTE6Um9sZT10aGlzLnJvbGVMYXllci5nZXRDaGlsZEF0KGopIGFzIFJvbGU7XHJcblx0XHRcdFx0Ly/lpoLmnpxyb2xlMeacquatu+S6oeS4lOS4jeWQjOmYteiQpVxyXG5cdFx0XHRcdGlmKHJvbGUxLmhwPjAmJnJvbGUxLmNhbXAhPXJvbGUuY2FtcClcclxuXHRcdFx0XHR7XHJcblx0XHRcdFx0XHQvL+iOt+WPlueisOaSnuWNiuW+hFxyXG5cdFx0XHRcdFx0dmFyIGhpdFJhZGl1czpudW1iZXI9cm9sZS5oaXRSYWRpdXMrcm9sZTEuaGl0UmFkaXVzO1xyXG5cdFx0XHRcdFx0Ly/norDmkp7mo4DmtYtcclxuXHRcdFx0XHRcdGlmKE1hdGguYWJzKHJvbGUueC1yb2xlMS54KTxoaXRSYWRpdXMmJk1hdGguYWJzKHJvbGUueS1yb2xlMS55KTxoaXRSYWRpdXMpXHJcblx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdC8v5aaC5p6c5p+Q5LiA5Liq56Kw5pKe5L2T5piv6YGT5YW377yM5YiZ5ZCD6YGT5YW377yM5ZCm5YiZ5o6J6KGAXHJcblx0XHRcdFx0XHRcdGlmKHJvbGUucHJvcFR5cGUhPTB8fHJvbGUxLnByb3BUeXBlIT0wKVxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0Ly/ml6Dms5XliKTmlq3lk6rkuKrmmK/pgZPlhbfvvIzlm6DmraTpg73nm7jkupLlkIPor5Xor5VcclxuXHRcdFx0XHRcdFx0XHRyb2xlLmVhdFByb3Aocm9sZTEpO1xyXG5cdFx0XHRcdFx0XHRcdHJvbGUxLmVhdFByb3Aocm9sZSk7XHJcblx0XHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQvL+inkuiJsuebuOS6kuaOieihgFxyXG5cdFx0XHRcdFx0XHRcdHJvbGUubG9zdEhwKDEpO1xyXG5cdFx0XHRcdFx0XHRcdHJvbGUxLmxvc3RIcCgxKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHQvKipcclxuXHQg5ri45oiP5Y2H57qn6K6h566XXHJcblx0XHQqL1xyXG5cdHByaXZhdGUgbGV2ZWxVcCgpOnZvaWRcclxuXHR7XHJcblx0XHRpZihHYW1lQ29uc3Quc2NvcmU+R2FtZUNvbnN0LmxldmVsVXBTY29yZSlcclxuXHRcdHtcclxuXHRcdFx0Ly/lhbPljaHnrYnnuqfmj5DljYdcclxuXHRcdFx0R2FtZUNvbnN0LmxldmVsKys7XHJcblx0XHRcdC8v6KeS6Imy6KGA6YeP5aKe5Yqg77yM5pyA5aSnMzBcclxuXHRcdFx0dGhpcy5oZXJvLmhwPU1hdGgubWluKHRoaXMuaGVyby5ocCtHYW1lQ29uc3QubGV2ZWwqMSwzMCk7XHJcblx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5Yib5bu65pWM5py66Ze06ZqU6LaK55+tXHJcblx0XHRcdEdhbWVDb25zdC5jcmVhdGVUaW1lID0gR2FtZUNvbnN0LmxldmVsIDwgMzAgPyBHYW1lQ29uc3QubGV2ZWwgKiAyIDogNjA7XHJcblx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py66aOe6KGM6YCf5bqm6LaK6auYXHJcblx0XHRcdEdhbWVDb25zdC5zcGVlZFVwID0gTWF0aC5mbG9vcihHYW1lQ29uc3QubGV2ZWwgLyA2KTtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrooYDph4/otorpq5hcclxuXHRcdFx0R2FtZUNvbnN0LmhwVXAgPSBNYXRoLmZsb29yKEdhbWVDb25zdC5sZXZlbCAvIDgpO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuuaVsOmHj+i2iuWkmlxyXG5cdFx0XHRHYW1lQ29uc3QubnVtVXAgPSBNYXRoLmZsb29yKEdhbWVDb25zdC5sZXZlbCAvIDEwKTtcclxuXHRcdFx0Ly/mj5Dpq5jkuIvkuIDnuqfnmoTljYfnuqfliIbmlbBcclxuXHRcdFx0R2FtZUNvbnN0LmxldmVsVXBTY29yZSArPSBHYW1lQ29uc3QubGV2ZWwgKiAxMDtcclxuXHRcdH1cclxuXHR9XHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0LyoqXHJcblx0IOa4uOaIj+e7k+adn1xyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGdhbWVPdmVyKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v56e76Zmk5omA5pyJ6Iie5Y+w5LqL5Lu277yM6byg5qCH5pON5o6nXHJcblx0XHRMYXlhLnN0YWdlLm9mZkFsbCgpO1xyXG5cdFx0Ly/np7vpmaTlnLDlm77og4zmma9cclxuXHRcdHRoaXMubWFwLnJlbW92ZVNlbGYoKTtcclxuXHRcdC8v56e76Zmk5ri45oiP5LitVUlcclxuXHRcdHRoaXMucGxheS5yZW1vdmVTZWxmKCk7XHJcblx0XHRcclxuXHRcdC8v5riF56m66KeS6Imy5bGC5a2Q5a+56LGhXHJcblx0XHR0aGlzLnJvbGVMYXllci5yZW1vdmVDaGlsZHJlbigwLHRoaXMucm9sZUxheWVyLm51bUNoaWxkcmVuLTEpO1xyXG5cdFx0Ly/np7vpmaTop5LoibLlsYJcclxuXHRcdHRoaXMucm9sZUxheWVyLnJlbW92ZVNlbGYoKTtcclxuXHRcdFxyXG5cdFx0Ly/ljrvpmaTmuLjmiI/kuLvlvqrnjq9cclxuXHRcdExheWEudGltZXIuY2xlYXIodGhpcyx0aGlzLmxvb3ApO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMlua4uOaIj+e7k+adn+mhtemdolxyXG5cdFx0aWYodGhpcy5vdmVyID09IG51bGwpXHJcblx0XHRcdHRoaXMub3ZlciA9IG5ldyBHYW1lT3ZlcigpO1xyXG5cdFx0Ly/muLjmiI/np6/liIbmmL7npLpcclxuXHRcdHRoaXMub3Zlci50eHRfc2NvcmUudGV4dD0gR2FtZUNvbnN0LnNjb3JlLnRvU3RyaW5nKCk7XHJcblx0XHQvL+S7peW8ueWHuuaWueW8j+aJk+W8gO+8jOaciee8k+WKqOaViOaenOOAgklEReS4remhtemdouS4ukRpYWxvZ+aJjeWPr+eUqFxyXG5cdFx0dGhpcy5vdmVyLnBvcHVwKCk7XHJcblx0XHQvL+mHjeaWsOW8gOWni+S6i+S7tuebkeWQrCzngrnlh7vlkI7ov5vlhaXmuLjmiI/kuK1cclxuXHRcdHRoaXMub3Zlci5vbihcInJlU3RhcnRcIix0aGlzLHRoaXMuZ2FtZUluaXQpO1xyXG5cdH1cclxufVxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxuTWFpbi5HZXRJbnN0YW5jZSgpO1xyXG4iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBSb2xlXHJcbntcclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5aSx6KGAXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgbG9zdEhwKGxvc3RIcDpudW1iZXIpOnZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgLy/pmpDol4/vvIzkuIvkuIDluKflm57mlLZcclxuICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgIC8v5aaC5p6c6KeS6Imy6ZqQ6JeP77yM6KeS6Imy5raI5Lqh5bm25Zue5pS2XHJcbiAgICAgICAgIGlmKCF0aGlzLnZpc2libGUpXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMuZGllKCk7XHJcbiAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgIH1cclxuICAgICAgICAgXHJcbiAgICAgICAgIGxldCB4Um90YXRpb24gPSBNYXRoLnNpbiggTGF5YS5VdGlscy50b1JhZGlhbih0aGlzLnJvdGF0aW9uKSk7XHJcbiAgICAgICAgIGxldCB5Um90YXRpb24gPSBNYXRoLmNvcyggTGF5YS5VdGlscy50b1JhZGlhbih0aGlzLnJvdGF0aW9uKSk7XHJcbiAgICAgICAgIC8v6KeS6Imy5qC55o2u6YCf5bqm6aOe6KGMXHJcbiAgICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkICogIHhSb3RhdGlvbiA7XHJcbiAgICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkICAqICB5Um90YXRpb24gO1xyXG4gXHJcbiAgICAgICAgIC8v5aaC5p6c56e75Yqo5Yiw5pi+56S65Yy65Z+f5Lul5aSW77yM5YiZ56e76ZmkXHJcbiAgICAgICAgIGlmICh0aGlzLnkgPiAxMjgwKzEwMHx8dGhpcy55PC0xNTApXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcblxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgdWZvIGZyb20gXCIuL3Vmb1wiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGVGYWN0b3J5XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteSBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgLy/lop7liqDliIbmlbBcclxuICAgIHB1YmxpYyBhZGRTY29yZTpudW1iZXIgPSAxO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gNTAwMDsgIC8v5bCE5Ye76Ze06ZqUXHJcbiAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSA1MDAwO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v5YeP6KGAXHJcbiAgICAgICAgdGhpcy5ocCAtPSBsb3N0SHA7XHJcbiAgICAgICAgLy/moLnmja7ooYDph4/liKTmlq1cclxuICAgICAgICBpZiAodGhpcy5ocCA+IDApIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzmnKrmrbvkuqHvvIzliJnmkq3mlL7lj5flh7vliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiaGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZGllXCIpO1xyXG4gICAgICAgICAgICAvL+a3u+WKoOatu+S6oemfs+aViFxyXG4gICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9nYW1lX292ZXIubXAzXCIpO1xyXG4gICAgICAgICAgICBHYW1lQ29uc3Quc2NvcmUrPSB0aGlzLmFkZFNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25Db21wbGV0ZSgpO1xyXG5cclxuICAgICAgICAvL+WmguaenOatu+S6oeWKqOeUu+aSreaUvuWujOaIkFxyXG4gICAgICAgIGlmKHRoaXMuYWN0aW9uPT1cImRpZVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvc3RQcm9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5hY3Rpb249PVwiaGl0XCIpLy/lpoLmnpzmmK/lj5fkvKTliqjnlLvvvIzkuIvkuIDluKfmkq3mlL7po57ooYzliqjnlLtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImZseVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6KeS6Imy5q275Lqh5o6J6JC954mp5ZOBKiovXHJcbiAgICBwdWJsaWMgbG9zdFByb3AoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgUm9sZUZhY3RvcnkgZnJvbSBcIi4vUm9sZUZhY3RvcnlcIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL0VuZW15XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteV8xIGV4dGVuZHMgRW5lbXlcclxue1xyXG4gICAgcHJpdmF0ZSBpc01vdmVMZWZ0ID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgdGlja1RpbWUgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pc01vdmVMZWZ0ID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCk7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3ml7bpl7TlpKfkuo7kuIvmrKHlsITlh7vml7bpl7RcclxuICAgICAgICBpZiAodGltZSA+IHRoaXMudGlja1RpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+abtOaWsOS4i+asoeWtkOW8ueWwhOWHu+eahOaXtumXtFxyXG4gICAgICAgICAgICB0aGlzLnRpY2tUaW1lID0gdGltZSArIDEwMDA7IFxyXG4gICAgICAgICAgICB0aGlzLmlzTW92ZUxlZnQgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/op5LoibLmoLnmja7pgJ/luqbpo57ooYxcclxuICAgICAgICBpZih0aGlzLmlzTW92ZUxlZnQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZCAqIDAuNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWQgKiAwLjU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuW3puWPs+i2heWHulxyXG4gICAgICAgIGlmKHRoaXMueCA8IHRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pc01vdmVMZWZ0ID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy54ID4gNzIwLXRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5pc01vdmVMZWZ0ID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgdWZvIGZyb20gXCIuL3Vmb1wiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGVGYWN0b3J5XCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9FbmVteVwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlfMiBleHRlbmRzIEVuZW15XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gMzAwMDsgIC8v5bCE5Ye76Ze06ZqUXHJcbiAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aGlzLnNob290SW50ZXJ2YWw7IC8v56ys5LiA5qyh5bCE5Ye75pe26Ze0XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSA1O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApXHJcbiAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICBcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeaXtumXtFxyXG4gICAgICAgIGxldCB0aW1lOm51bWJlciA9IExheWEuQnJvd3Nlci5ub3coKTtcclxuICAgICAgICAvL+WmguaenOW9k+WJjeaXtumXtOWkp+S6juS4i+asoeWwhOWHu+aXtumXtFxyXG4gICAgICAgIGlmICh0aW1lID4gdGhpcy5zaG9vdFRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+abtOaWsOS4i+asoeWtkOW8ueWwhOWHu+eahOaXtumXtFxyXG4gICAgICAgICAgICB0aGlzLnNob290VGltZSA9IHRpbWUgKyB0aGlzLnNob290SW50ZXJ2YWwgOyBcclxuXHJcbiAgICAgICAgICAgIC8v5aSa5Y+R5a2Q5by5XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgMyA7IGkgKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiYnVsbGV0MVwiKTtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDFcIiwxLDEwLDEsdGhpcy5jYW1wKVxyXG4gICAgICAgICAgICAgICAgLy/lrZDlvLnmtojlpLHlkI7kvJrkuI3mmL7npLrvvIzph43mlrDliJ3lp4vljJZcclxuICAgICAgICAgICAgICAgIGJ1bGxldC52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAvL+iuvue9ruWtkOW8ueWPkeWwhOWIneWni+WMluS9jee9rlxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnBvcyh0aGlzLngsIHRoaXMueSArIDMwKTtcclxuICAgICAgICAgICAgICAgIC8v5LiN5ZCM6KeS5bqmXHJcbiAgICAgICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAtMzAgKyBpICogMzA7XHJcblxyXG4gICAgICAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLnBhcmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKGJ1bGxldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15XzMgZXh0ZW5kcyBFbmVteVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2hvb3RJbnRlcnZhbCA9IDgwMDA7ICAvL+WwhOWHu+mXtOmalFxyXG4gICAgICAgIHRoaXMuc2hvb3RUaW1lID0gdGhpcy5zaG9vdEludGVydmFsOyAvL+esrOS4gOasoeWwhOWHu+aXtumXtFxyXG5cclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gMTA7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMClcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgIFxyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gTGF5YS5Ccm93c2VyLm5vdygpO1xyXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pe26Ze05aSn5LqO5LiL5qyh5bCE5Ye75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPiB0aGlzLnNob290VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pu05paw5LiL5qyh5a2Q5by55bCE5Ye755qE5pe26Ze0XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RUaW1lID0gdGltZSArIHRoaXMuc2hvb3RJbnRlcnZhbCA7IFxyXG5cclxuICAgICAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICAgICAgaWYoTWF0aC5yYW5kb20oKSA8IDAuNilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdEFjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdEFjdF8yKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHByaXZhdGUgc2hvb3RBY3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5zaG9vdEFjdERvKCk7XHJcbiAgICAgICAgTGF5YS50aW1lci5vbmNlKDUwMCx0aGlzLHRoaXMuc2hvb3RBY3REbyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy/kuIDnu4TlrZDlvLnlrp7kvotcclxuICAgIHByaXZhdGUgc2hvb3RBY3REbygpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WkmuWPkeWtkOW8uVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgMTggOyBpICsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ku47lr7nosaHmsaDph4zpnaLliJvlu7rkuIDkuKrlrZDlvLlcclxuICAgICAgICAgICAgbGV0IGJ1bGxldDogQnVsbGV0ID0gUm9sZUZhY3RvcnkuR2V0Um9sZShcImJ1bGxldDFcIik7XHJcbiAgICAgICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgIGJ1bGxldC5pbml0KFwiYnVsbGV0MVwiLDEsMTAsMSx0aGlzLmNhbXApO1xyXG4gICAgICAgICAgICAvL+WtkOW8uea2iOWkseWQjuS8muS4jeaYvuekuu+8jOmHjeaWsOWIneWni+WMllxyXG4gICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAvL+iuvue9ruWtkOW8ueWPkeWwhOWIneWni+WMluS9jee9rlxyXG4gICAgICAgICAgICBidWxsZXQucG9zKHRoaXMueCwgdGhpcy55ICsgODApO1xyXG4gICAgICAgICAgICAvL+S4jeWQjOinkuW6plxyXG4gICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAtOTAgKyBpICogMTA7XHJcblxyXG4gICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgICBpZiggdGhpcy5wYXJlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKGJ1bGxldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2hvb3RBY3RfMigpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDM2IDsgaSArKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExheWEudGltZXIub25jZSgzMCAqIGksdGhpcyx0aGlzLnNob290QWN0RG9fMixbaV0sZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG9vdEFjdERvXzIoaW5kZXg6IG51bWJlcik6IGFueSB7XHJcbiAgICAgICAgICAgLy/ku47lr7nosaHmsaDph4zpnaLliJvlu7rkuIDkuKrlrZDlvLlcclxuICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiYnVsbGV0MVwiKTtcclxuICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgIGJ1bGxldC5pbml0KFwiYnVsbGV0MVwiLDEsMTAsMSx0aGlzLmNhbXApO1xyXG4gICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAvL+iuvue9ruWtkOW8ueWPkeWwhOWIneWni+WMluS9jee9rlxyXG4gICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54LCB0aGlzLnkgKyA4MCk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ID4gMTgpXHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDM2IC0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgIC8v5LiN5ZCM6KeS5bqmXHJcbiAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gLTkwICsgaW5kZXggKiAxMDtcclxuXHJcbiAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICBpZiggdGhpcy5wYXJlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKirop5LoibLmrbvkuqHmjonokL3nianlk4EqKi9cclxuICAgIHB1YmxpYyBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4qumBk+WFt1xyXG4gICAgICAgIGxldCBwcm9wOnVmbyA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcInVmb1wiLHVmbyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICBsZXQgcjpOdW1iZXI9TWF0aC5yYW5kb20oKTtcclxuICAgICAgICBsZXQgbnVtOm51bWJlcj0ocjwwLjcpPzE6MjtcclxuICAgICAgICBcclxuICAgICAgICAvL+mHjeaWsOWIneWni+WMlumBk+WFt+WxnuaApyzpmLXokKXkuLrmlYzmlrnvvIjlj6rkuI7kuLvop5Llj5HnlJ/norDmkp7vvIlcclxuICAgICAgICBwcm9wLmluaXQoXCJ1Zm9cIitudW0sMSwyLDMwLDEpO1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgcHJvcC5wcm9wVHlwZT1udW07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lvLrliLbmmL7npLpcclxuICAgICAgICBwcm9wLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAvL+eUn+aIkOeahOS9jee9ruS4uuatu+S6oeiAheS9jee9rlxyXG4gICAgICAgIHByb3AucG9zKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgICAgIC8v5Yqg6L295Yiw54i25a655ZmoIFxyXG4gICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgIC8qKlxyXG4gICAgICog6KeS6Imy5aSx6KGAXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgbG9zdEhwKGxvc3RIcDpudW1iZXIpOnZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgLy/lh4/ooYBcclxuICAgICAgICB0aGlzLmhwIC09IGxvc3RIcDtcclxuICAgICAgICAvL+agueaNruihgOmHj+WIpOaWrVxyXG4gICAgICAgIGlmICh0aGlzLmhwID4gMCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WmguaenOacquatu+S6oe+8jOWImeaSreaUvuWPl+WHu+WKqOeUu1xyXG4gICAgICAgICAgICAvL3RoaXMucGxheUFjdGlvbihcImhpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImRpZVwiKTtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHpn7PmlYhcclxuICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZ2FtZV9vdmVyLm1wM1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgICAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzosIPnlKjogIXmmK/kuLvop5LmiJZwcm9w5LiN5piv6YGT5YW377yM5YiZ6L+U5ZueXHJcbiAgICAgICAgaWYocHJvcC5wcm9wVHlwZT09MCkgcmV0dXJuO1xyXG4gICAgICAgIC8v5re75Yqg5ZCD5by65YyW6YGT5YW36Z+z5pWIXHRcdFx0XHRcdFxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiKTtcclxuICAgICAgICAvL+WQg+WtkOW8ueeusVxyXG4gICAgICAgIGlmKHByb3AucHJvcFR5cGU9PTEpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lrZDlvLnnuqfliKvlop7liqBcclxuICAgICAgICAgICAgdGhpcy5idWxsZXRMZXZlbCsrXHJcbiAgICAgICAgICAgIC8v5a2Q5by55q+P5Y2HMue6p++8jOWtkOW8ueaVsOmHj+WinuWKoDHvvIzmnIDlpKfmlbDph4/pmZDliLblnKg05LiqXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3ROdW0gPSBNYXRoLm1pbihNYXRoLmZsb29yKHRoaXMuYnVsbGV0TGV2ZWwgLyAyKSArIDEsNCk7XHJcbiAgICAgICAgICAgIC8v5a2Q5by557qn5Yir6LaK6auY77yM5Y+R5bCE6aKR546H6LaK5b+rXHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RJbnRlcnZhbCA9IDMwMCAtIDggKiAodGhpcy5idWxsZXRMZXZlbCA+IDggPyA4IDogdGhpcy5idWxsZXRMZXZlbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYocHJvcC5wcm9wVHlwZT09MikvL+WQg+ihgFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ooYDph4/lop7liqBcclxuICAgICAgICAgICAgdGhpcy5ocCs9MjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/pgZPlhbfmrbvkuqFcclxuICAgICAgICBwcm9wLmhwPTA7XHJcbiAgICAgICAgLy/pgZPlhbflkIPlrozlkI7mtojlpLHvvIzkuIvkuIDluKflm57mlLZcclxuICAgICAgICBwcm9wLnZpc2libGU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg5pu05pawXHJcbiAgICAgKi9cdFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S4u+inkui+ueeVjOajgOafpVxyXG4gICAgICAgIC8v6ZyA5YeP5Y676KeS6Imy5a695oiW6auY55qE5LiA5Y2K77yM5Zug5Li65ZyoSURF5Lit5Yi25L2c5Yqo55S75pe277yM5oiR5Lus5oqK6KeS6Imy55qE5Lit5b+D5YGa5Li65LqG6KeS6Imy5a+56LGh55qE5Y6f54K5XHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKblt6blj7PotoXlh7pcclxuICAgICAgICBpZih0aGlzLng8dGhpcy5yb2xlQW5pLndpZHRoLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLng9dGhpcy5yb2xlQW5pLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy54PjcyMC10aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueD03MjAtdGhpcy5yb2xlQW5pLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5LiK5LiL6LaF5Ye6XHJcbiAgICAgICAgaWYodGhpcy55PHRoaXMucm9sZUFuaS5oZWlnaHQvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueT10aGlzLnJvbGVBbmkuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy55PjEyODAtdGhpcy5yb2xlQW5pLmhlaWdodC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy55PTEyODAtdGhpcy5yb2xlQW5pLmhlaWdodC8yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDop5LoibLlsITlh7vvvIznlJ/miJDlrZDlvLlcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBzaG9vdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeaXtumXtFxyXG4gICAgICAgIGxldCB0aW1lOm51bWJlciA9IExheWEuQnJvd3Nlci5ub3coKSA7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3ml7bpl7TlpKfkuo7kuIvmrKHlsITlh7vml7bpl7RcclxuICAgICAgICBpZiAodGltZSA+dGhpcy5zaG9vdFRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+iOt+W+l+WPkeWwhOWtkOW8ueeahOS9jee9ruaVsOe7hFxyXG4gICAgICAgICAgICBsZXQgcG9zOm51bWJlcltdID0gdGhpcy5idWxsZXRQb3NbdGhpcy5zaG9vdE51bS0xXVxyXG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0gMCA7IGk8cG9zLmxlbmd0aCA7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDkuIvmrKHlrZDlvLnlsITlh7vnmoTml7bpl7RcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RUaW1lID0gdGltZSArIHRoaXMuc2hvb3RJbnRlcnZhbCA7IFxyXG4gICAgICAgICAgICAgICAgLy/ku47lr7nosaHmsaDph4zpnaLliJvlu7rkuIDkuKrlrZDlvLlcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXQ6IEJ1bGxldCA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJidWxsZXQyXCIpO1xyXG4gICAgICAgICAgICAgICAgLy/liJ3lp4vljJblrZDlvLnkv6Hmga9cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5pbml0KFwiYnVsbGV0MlwiLDEsLTEwLDEsdGhpcy5jYW1wKVxyXG4gICAgICAgICAgICAgICAgLy/lrZDlvLnmtojlpLHlkI7kvJrkuI3mmL7npLrvvIzph43mlrDliJ3lp4vljJZcclxuICAgICAgICAgICAgICAgIGJ1bGxldC52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAvL+iuvue9ruWtkOW8ueWPkeWwhOWIneWni+WMluS9jee9rlxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnBvcyh0aGlzLngrcG9zW2ldLCB0aGlzLnktODApO1xyXG4gICAgICAgICAgICAgICAgLy/ml4vovazop5LluqZcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5yb3RhdGlvbiA9IDA7XHJcbiAgICAgICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5a2Q5by56Z+z5pWIXHRcdFx0XHRcdFxyXG4gICAgICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvYnVsbGV0Lm1wM1wiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgQW5pbWF0aW9uID0gTGF5YS5BbmltYXRpb247XHJcbmltcG9ydCBFdmVudCA9IGxheWEuZXZlbnRzLkV2ZW50O1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZSBleHRlbmRzIExheWEuU3ByaXRlXHJcbntcclxuXHQvKioq6aOe5py655qE57G75Z6LICAg4oCcaGVyb+KAnTrnjqnlrrbpo57mnLrvvIzigJxlbmVteeKAne+8muaVjOS6uumjnuacuuOAgeKAnGJ1bGxl4oCd77ya5a2Q5by544CBXCJ1Zm9cIjrpgZPlhbcqKioqL1xyXG4gICAgcHVibGljIHR5cGU6c3RyaW5nO1xyXG4gICAgLyoqKumjnuacuueahOihgOmHjyoqKi9cclxuICAgIHB1YmxpYyBocDpudW1iZXI9MDsgXHJcbiAgICAvKioq6aOe5py655qE6YCf5bqmKioqL1xyXG4gICAgcHJvdGVjdGVkIHNwZWVkOm51bWJlcj0wO1x0XHJcbiAgICBcclxuICAgIC8qKirpo57mnLrnmoTooqvmlLvlh7vljYrlvoQqKiovXHJcbiAgICBwdWJsaWMgaGl0UmFkaXVzOm51bWJlcjtcclxuICAgIC8qKirpo57mnLrnmoTpmLXokKXvvIjmlYzmiJHljLrliKvvvIkqKiovXHJcbiAgICBwdWJsaWMgY2FtcDpudW1iZXI7XHJcbiAgICBcclxuICAgIC8qKirop5LoibLnmoTliqjnlLvotYTmupAqKiovXHJcbiAgICBwcm90ZWN0ZWQgcm9sZUFuaTpBbmltYXRpb247XHJcbiAgICAvKioq5b2T5YmN5Yqo55S75Yqo5L2cKioqL1xyXG4gICAgcHJvdGVjdGVkIGFjdGlvbjpzdHJpbmc7XHJcbiAgICBcclxuICAgIC8qKirlsITlh7vpl7TpmpQqKiovXHJcbiAgICBwdWJsaWMgc2hvb3RJbnRlcnZhbDogbnVtYmVyPSAzMDA7XHJcbiAgICAvKioq5LiL5qyh5bCE5Ye75pe26Ze0KioqL1xyXG4gICAgcHVibGljIHNob290VGltZTogbnVtYmVyPSAzMDA7XHJcbiAgICBcclxuICAgIC8qKioq6YGT5YW357G75Z6LIDA66aOe5py65oiW5a2Q5by577yMMTrlrZDlvLnnrrHvvIwyOuihgOeTtioqKi9cclxuICAgIHB1YmxpYyBwcm9wVHlwZTpudW1iZXI9MDtcclxuICAgIC8qKirlrZDlvLnnuqfliKvvvIjlkIPlrZDlvLnpgZPlhbflkI7ljYfnuqfvvIkqKiovXHJcbiAgICBwdWJsaWMgYnVsbGV0TGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICAvKioq5ZCM5pe25bCE5Ye75a2Q5by55pWw6YePKioqL1xyXG4gICAgcHVibGljIHNob290TnVtOiBudW1iZXI9IDE7XHJcbiAgICAvKioq5a2Q5by55YGP56e755qE5L2N572uKioqL1xyXG4gICAgcHJvdGVjdGVkIGJ1bGxldFBvczogbnVtYmVyW11bXSA9IFtbMF0sIFstMTUsIDE1XSwgWy0zMCwgMCwgMzBdLCBbLTQ1LCAtMTUsIDE1LCA0NV1dO1xyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAvL+WunuS+i+WMluWKqOeUu1xyXG4gICAgICAgICB0aGlzLnJvbGVBbmk9bmV3IEFuaW1hdGlvbigpO1xyXG4gICAgICAgICAvL+WKoOi9vUlERee8lui+keeahOWKqOeUu+aWh+S7tlxyXG4gICAgICAgICB0aGlzLnJvbGVBbmkubG9hZEFuaW1hdGlvbihcIkdhbWVSb2xlLmFuaVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWIneWni+WMllxyXG4gICAgICogQHBhcmFtIHR5cGUgIOinkuiJsuexu+WeiyAtLS3igJxoZXJv4oCdOueOqeWutumjnuacuu+8jOKAnGVuZW15MS0z4oCd77ya5pWM5Lq66aOe5py644CB4oCcYnVsbGU6MS0y4oCd77ya5a2Q5by544CBXCJ1Zm8xLTJcIjrpgZPlhbdcclxuICAgICAqIEBwYXJhbSBocCAgICAgIOihgOmHj1xyXG4gICAgICogQHBhcmFtIHNwZWVkICAg6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gaGl0UmFkaXVzICAg56Kw5pKe5Y2K5b6EXHJcbiAgICAgKiBAcGFyYW0gY2FtcCAgICDpmLXokKVcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBpbml0KHR5cGU6c3RyaW5nLGhwOm51bWJlcixzcGVlZDpudW1iZXIsaGl0UmFkaXVzOm51bWJlcixjYW1wOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6KeS6Imy5Yid5aeL5YyW5bGe5oCnXHJcbiAgICAgICAgdGhpcy50eXBlPXR5cGU7XHJcbiAgICAgICAgdGhpcy5ocD1ocDtcclxuICAgICAgICB0aGlzLnNwZWVkPXNwZWVkO1xyXG4gICAgICAgIHRoaXMuaGl0UmFkaXVzPWhpdFJhZGl1cztcclxuICAgICAgICB0aGlzLmNhbXA9Y2FtcDtcclxuICAgICAgICBcclxuICAgICAgICAvL+mBk+WFt+WxnuaAp+WIneWni+S4ujBcclxuICAgICAgICB0aGlzLnByb3BUeXBlPTA7XHJcbiAgICAgICAgLy/liqDovb3liqjnlLvlr7nosaFcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMucm9sZUFuaSlcclxuICAgICAgICAvL+ebkeWQrOWKqOeUu+WujOaIkOS6i+S7tlxyXG4gICAgICAgIHRoaXMucm9sZUFuaS5vbihFdmVudC5DT01QTEVURSx0aGlzLHRoaXMub25Db21wbGV0ZSlcclxuICAgICAgICAvL+aSreaUvum7mOiupOmjnuihjOWKqOeUu1xyXG4gICAgICAgIHRoaXMucGxheUFjdGlvbihcImZseVwiKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqKuWKqOeUu+WujOaIkOWQjuWbnuiwg+aWueazlSoqKi9cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5aaC5p6c6KeS6Imy6L+Y5pyq5pyJ5a6977yM6I635b6X6KeS6Imy5a696auYXHRcclxuICAgICAgICBpZih0aGlzLnJvbGVBbmkud2lkdGg9PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+iOt+W+l+WKqOeUu+efqeW9oui+ueeVjFxyXG4gICAgICAgICAgICB2YXIgYm91bmRzOkxheWEuUmVjdGFuZ2xlPXRoaXMucm9sZUFuaS5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgLy/op5LoibIg5a696auY6LWL5YC8XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaS5zaXplKGJvdW5kcy53aWR0aCxib3VuZHMuaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlkIPliLDpgZPlhbfvvIzliqDooYDmiJblrZDlvLnnuqfliKtcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBlYXRQcm9wKHByb3A6Um9sZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5pKt5pS+5Yqo55S7IFxyXG4gICAgICogQHBhcmFtIGFjdGlvbiDliqjnlLvnirbmgIEgICBcImZseVwi44CBXCJoaXRcIuOAgVwiZGllXCJcclxuICAgICAqL1x0XHJcbiAgICBwdWJsaWMgcGxheUFjdGlvbihhY3Rpb246c3RyaW5nKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy5hY3Rpb249YWN0aW9uO1xyXG4gICAgICAgIC8v5pKt5pS+6KeS6Imy5Yqo55S7LG5hbWU96KeS6Imy57G75Z6LX+WKqOeUu+eKtuaAge+8jOWmgu+8mmhlcm9fZmx5XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLnBsYXkoMCx0cnVlLHRoaXMudHlwZStcIl9cIithY3Rpb24pO1xyXG4gICAgfSBcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLmm7TmlrAs6L6555WM5qOA5p+lXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5aaC5p6c6KeS6Imy6ZqQ6JeP77yM6KeS6Imy5raI5Lqh5bm25Zue5pS2XHJcbiAgICAgICAgaWYoIXRoaXMudmlzaWJsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuZGllKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6KeS6Imy5qC55o2u6YCf5bqm6aOe6KGMXHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgLy/lpoLmnpznp7vliqjliLDmmL7npLrljLrln5/ku6XlpJbvvIzliJnnp7vpmaRcclxuICAgICAgICBpZiAodGhpcy55ID4gMTI4MCsxMDB8fHRoaXMueTwtMTUwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKblt6blj7PotoXlh7pcclxuICAgICAgICBpZih0aGlzLng8dGhpcy5yb2xlQW5pLndpZHRoLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLng9dGhpcy5yb2xlQW5pLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy54PjcyMC10aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueD03MjAtdGhpcy5yb2xlQW5pLndpZHRoLzI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+inkuiJsuWKqOeUu+WBnOatolxyXG4gICAgICAgIHRoaXMucm9sZUFuaS5zdG9wKCk7IFxyXG4gICAgICAgIC8v5Y676Zmk5omA5pyJ5Yqo55S755uR5ZCsXHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLm9mZkFsbCgpO1xyXG4gICAgICAgIC8v5LuO6Iie5Y+w56e76ZmkXHJcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgLy/lm57mlLbliLDmsaBcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3Zlcih0aGlzLnR5cGUsIHRoaXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgSGVybyBmcm9tIFwiLi9IZXJvXCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9FbmVteVwiO1xyXG5pbXBvcnQgdWZvIGZyb20gXCIuL3Vmb1wiO1xyXG5pbXBvcnQgRW5lbXlfMSBmcm9tIFwiLi9FbmVteV8xXCI7XHJcbmltcG9ydCBFbmVteV8yIGZyb20gXCIuL0VuZW15XzJcIjtcclxuaW1wb3J0IEVuZW15XzMgZnJvbSBcIi4vRW5lbXlfM1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9sZUZhY3Rvcnlcclxue1xyXG4gICAgcHVibGljIHN0YXRpYyBHZXRSb2xlKHR5cGU6c3RyaW5nKTpSb2xlXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IHJvbGU6Um9sZSA9IG51bGw7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY2FzZSBcImhlcm9cIjpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSxIZXJvKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiYnVsbGV0MVwiOlxyXG4gICAgICAgICAgICBjYXNlIFwiYnVsbGV0MlwiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLEJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcInVmb1wiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLHVmbyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVuZW15MVwiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLEVuZW15XzEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlbmVteTJcIjpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSxFbmVteV8yKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZW5lbXkzXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsRW5lbXlfMyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSxSb2xlKTtcclxuICAgICAgICB9ICAgXHJcbiAgICAgICByZXR1cm4gcm9sZTtcclxuICAgIH1cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHVmbyBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v6ZqQ6JeP77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kaWUoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOWvueixoeaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwidWZvXCIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgICAgICAgIFxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lQmdVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJnMTpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzI6TGF5YS5JbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ2YXJcIjpcImJnMVwiLFwic2tpblwiOlwiYmFja2dyb3VuZC5wbmdcIn0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6LTEyODAsXCJ4XCI6MCxcInZhclwiOlwiYmcyXCIsXCJza2luXCI6XCJiYWNrZ3JvdW5kLnBuZ1wifSxcImNvbXBJZFwiOjN9XSxcImxvYWRMaXN0XCI6W1wiYmFja2dyb3VuZC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVCZ1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVPdmVyVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGFuaV9yZXN0YXJ0OkxheWEuRnJhbWVBbmltYXRpb247XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgYnRuX3Jlc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MjI5LFwic2tpblwiOlwiZ2FtZVVJL2dhbWVPdmVyLnBuZ1wifSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjEyMDAsXCJ4XCI6MTksXCJ3aWR0aFwiOjY4MSxcInRleHRcIjpcIkxheWFBaXIxLjcuM+W8leaTjuaVmeWtpua8lOekuueJiFwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjI2LFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjV9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjoyNDQsXCJ3aWR0aFwiOjE0NCxcInRleHRcIjpcIuacrOWxgOenr+WIhu+8mlwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjozNjMsXCJ3aWR0aFwiOjEyOCxcInZhclwiOlwidHh0X3Njb3JlXCIsXCJ0ZXh0XCI6XCIxMjAwXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjN2M3OTc5XCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjM5LFwidmFyXCI6XCJidG5fcmVzdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjEsXCJ3aWR0aFwiOjI0MCxcInN0YXRlTnVtXCI6MixcInNraW5cIjpcImdhbWVVSS9idG5fYmcucG5nXCIsXCJzaXplR3JpZFwiOlwiMTAsMTAsMTAsMTBcIixcImhlaWdodFwiOjgwfSxcImNvbXBJZFwiOjExfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTgsXCJ4XCI6NDEsXCJza2luXCI6XCJnYW1lVUkvcmVzdGFydC5wbmdcIn0sXCJjb21wSWRcIjoxMn1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjEwLFwia2V5ZnJhbWVzXCI6e1wieVwiOlt7XCJ2YWx1ZVwiOjk3MCxcInR3ZWVuTWV0aG9kXCI6XCJlbGFzdGljT3V0XCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjk2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjo4fV19fV0sXCJuYW1lXCI6XCJhbmlfcmVzdGFydFwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9nYW1lT3Zlci5wbmdcIixcImdhbWVVSS9idG5fYmcucG5nXCIsXCJnYW1lVUkvcmVzdGFydC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVPdmVyVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVBsYXlVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJ0bl9wYXVzZTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgdHh0X2hwOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyB0eHRfbGV2ZWw6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgZ2FtZVBhdXNlOkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3XCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjIwLFwieFwiOjEwLFwid2lkdGhcIjo3MDAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJoZWlnaHRcIjo0NX0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjIxLFwieFwiOjYxOCxcInZhclwiOlwiYnRuX3BhdXNlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxLFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9ocFwiLFwidGV4dFwiOlwiSFDvvJpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo4fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjoyMjgsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X2xldmVsXCIsXCJ0ZXh0XCI6XCJsZXZlbO+8mlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjl9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxNSxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfc2NvcmVcIixcInRleHRcIjpcIlNjb3JlOlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjEwfSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwidmlzaWJsZVwiOmZhbHNlLFwidmFyXCI6XCJnYW1lUGF1c2VcIixcImhlaWdodFwiOjEyODAsXCJhbHBoYVwiOjF9LFwiY29tcElkXCI6MTMsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJzaXplR3JpZFwiOlwiMiwyLDIsMlwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxNX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQxMSxcInhcIjoxMTAsXCJ3aWR0aFwiOjUwMCxcInZpc2libGVcIjp0cnVlLFwic2tpblwiOlwiZ2FtZVVJL2JnLmpwZ1wiLFwic2l6ZUdyaWRcIjpcIjEwLDEwLDEwLDEwXCIsXCJoZWlnaHRcIjo1MDB9LFwiY29tcElkXCI6MTJ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjgwMSxcInhcIjoxOTAsXCJ3aWR0aFwiOjM0MCxcInRleHRcIjpcIueCueWHu+S7u+aEj+S9jee9rue7p+e7rea4uOaIj1wiLFwiaGVpZ2h0XCI6NDQsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzIzMjIyMlwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjE0fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDY4LFwieFwiOjIxNCxcInNraW5cIjpcImdhbWVVSS9nYW1lUGF1c2UucG5nXCJ9LFwiY29tcElkXCI6MTZ9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmxhbmsucG5nXCIsXCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wiLFwiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2dhbWVQYXVzZS5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVQbGF5VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVN0YXJ0VUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIHR4dF9sb2FkOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyBidG5fc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MTc5LFwic2tpblwiOlwiZ2FtZVVJL2xvZ28ucG5nXCJ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6NTg3LFwieFwiOjIwLFwid2lkdGhcIjo2ODEsXCJ2YXJcIjpcInR4dF9sb2FkXCIsXCJ0ZXh0XCI6XCLmuLjmiI/otYTmupDliqDovb3ov5vluqZcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiMxYzFjMWNcIixcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjQwLFwidmlzaWJsZVwiOnRydWUsXCJ2YXJcIjpcImJ0bl9zdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjI0MCxcInZpc2libGVcIjp0cnVlLFwic3RhdGVOdW1cIjoyLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcInNpemVHcmlkXCI6XCIyMCwyMCwyMCwyMFwiLFwiaGVpZ2h0XCI6ODB9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE5LFwieFwiOjQxLFwic2tpblwiOlwiZ2FtZVVJL3N0YXJ0LnBuZ1wifSxcImNvbXBJZFwiOjExfV0sXCJjb21wb25lbnRzXCI6W119XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2xvZ28ucG5nXCIsXCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwiZ2FtZVVJL3N0YXJ0LnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZVN0YXJ0VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
