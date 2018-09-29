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
        _this.shootInterval = 5000; //射击间隔
        _this.shootTime = _this.shootInterval; //第一次射击时间
        return _this;
    }
    /**
     角色射击，生成子弹
     */
    Enemy_1.prototype.shoot = function () {
        // if (this.hp <= 0)
        //     return; 
        // //获取当前时间
        // let time:number = Laya.Browser.now();
        // //如果当前时间大于下次射击时间
        // if (time > this.shootTime)
        // {
        //     //更新下次子弹射击的时间
        //     this.shootTime = time + this.shootInterval ; 
        //     //从对象池里面创建一个子弹
        //     let bullet: Bullet = RoleFactory.GetRole("bullet1");
        //     //初始化子弹信息
        //     bullet.init("bullet1",1,10,1,this.camp)
        //     //子弹消失后会不显示，重新初始化
        //     bullet.visible=true;
        //     //设置子弹发射初始化位置
        //     bullet.pos(this.x, this.y + 30);
        //     //添加到角色层
        //     if( this.parent != null)
        //         this.parent.addChild(bullet);
        // }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRW5lbXlNYW5hZ2VyLnRzIiwic3JjL0dhbWVDb25zdC50cyIsInNyYy9HYW1lTWFwLnRzIiwic3JjL0dhbWVPdmVyLnRzIiwic3JjL0dhbWVQbGF5LnRzIiwic3JjL0dhbWVTdGFydC50cyIsInNyYy9NYWluLnRzIiwic3JjL1JvbGUvQnVsbGV0LnRzIiwic3JjL1JvbGUvRW5lbXkudHMiLCJzcmMvUm9sZS9FbmVteV8xLnRzIiwic3JjL1JvbGUvRW5lbXlfMi50cyIsInNyYy9Sb2xlL0VuZW15XzMudHMiLCJzcmMvUm9sZS9IZXJvLnRzIiwic3JjL1JvbGUvUm9sZS50cyIsInNyYy9Sb2xlL1JvbGVGYWN0b3J5LnRzIiwic3JjL1JvbGUvdWZvLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNMQSx5Q0FBb0M7QUFDcEMsa0RBQTZDO0FBRTdDO0lBSUksc0JBQVksSUFBUztRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sZ0NBQVMsR0FBaEI7UUFFSSxRQUFRO1FBQ2QsbUJBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLFFBQVE7UUFDUixtQkFBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDdEIsU0FBUztRQUNULG1CQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNuQixZQUFZO1FBQ1osbUJBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLGFBQWE7UUFDYixtQkFBUyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVKLFFBQVE7SUFDRCxzQ0FBZSxHQUF0QjtR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QixFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGVBQWUsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxvQkFBb0IsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1FBTXJvRCxpQkFBQztLQVZELEFBVUMsQ0FWK0IsTUFBTSxHQVVyQztJQVZZLGFBQVUsYUFVdEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFJO1FBT2hDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUxjLGlCQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFD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dEM7SUFUWSxjQUFXLGNBU3ZCLENBQUE7QUFDTCxDQUFDLEVBN0NhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQTZDZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgTWFpbiBmcm9tIFwiLi9NYWluXCI7XHJcbmltcG9ydCBSb2xlXHRmcm9tIFwiLi9Sb2xlL1JvbGVcIjtcclxuaW1wb3J0IEhlcm9cdGZyb20gXCIuL1JvbGUvSGVyb1wiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vUm9sZS9FbmVteVwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL1JvbGUvQnVsbGV0XCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlL1JvbGVGYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteU1hbmFnZXJcclxue1xyXG4gICAgcHJpdmF0ZSBNYWluOk1haW47XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFpbjpNYWluKSBcclxuXHR7XHJcbiAgICAgICAgdGhpcy5NYWluID0gbWFpbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXRJbmZvKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5pWM5Lq65Yi35paw5Yqg6YCfXHJcblx0XHRHYW1lQ29uc3QuY3JlYXRlVGltZSA9IDA7XHJcblx0XHQvL+aVjOS6uumAn+W6puaPkOWNh1xyXG5cdFx0R2FtZUNvbnN0LnNwZWVkVXAgPSAwO1xyXG5cdFx0Ly/mlYzkurrooYDph4/mj5DljYdcdFxyXG5cdFx0R2FtZUNvbnN0LmhwVXAgPSAwO1xyXG5cdFx0Ly/mlYzkurrmlbDph4/mj5DljYdcdFx0XHRcdFxyXG5cdFx0R2FtZUNvbnN0Lm51bVVwID0gMDtcclxuXHRcdC8v5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePXHJcblx0XHRHYW1lQ29uc3QubGV2ZWxVcFNjb3JlID0gMTA7XHRcdFxyXG4gICAgfVxyXG5cclxuXHQvL+eUn+aIkOaVjOaWuemjnuaculxyXG5cdHB1YmxpYyBsb29wQ3JlYXRlRW5lbXkoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/liJvlu7rmlYzmnLrvvIzliqDlhaXlhbPljaHljYfnuqfmlbDmja7vvIzmj5Dpq5jpmr7luqZcclxuXHRcdC8v55Sf5oiQ5bCP6aOe5py6XHJcblx0XHRpZiAoTGF5YS50aW1lci5jdXJyRnJhbWUgJSAoODAgLSBHYW1lQ29uc3QuY3JlYXRlVGltZSkgPT0wKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDAsIEdhbWVDb25zdC5ocHNbMF0sR2FtZUNvbnN0LnNwZWVkc1swXSArIEdhbWVDb25zdC5zcGVlZFVwICwgR2FtZUNvbnN0Lm51bXNbMF0gKyBHYW1lQ29uc3QubnVtVXApO1xyXG5cdFx0fVxyXG5cdFx0Ly/nlJ/miJDkuK3lnovpo57mnLpcclxuXHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICg1MDAgLSBHYW1lQ29uc3QuY3JlYXRlVGltZSAqIDIpID09IDApIFxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDEsIEdhbWVDb25zdC5ocHNbMV0gK0dhbWVDb25zdC5ocFVwICogMixHYW1lQ29uc3Quc3BlZWRzWzFdICsgR2FtZUNvbnN0LnNwZWVkVXAgLCBHYW1lQ29uc3QubnVtc1sxXSArIEdhbWVDb25zdC5udW1VcCk7XHJcblx0XHR9XHJcblx0XHQvL+eUn+aIkGJvc3NcclxuXHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICg1MDAgLSBHYW1lQ29uc3QuY3JlYXRlVGltZSAqIDMpID09IDApIFxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDIsIEdhbWVDb25zdC5ocHNbMl0gKyBHYW1lQ29uc3QuaHBVcCAqIDYsR2FtZUNvbnN0LnNwZWVkc1syXSwgR2FtZUNvbnN0Lm51bXNbMl0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIOWIm+W7uuaVjOS6ulxyXG5cdCAqIEBwYXJhbSBpbmRleCBcdOaVjOS6uue8luWPt1xyXG5cdCAqIEBwYXJhbSBocCAgIFx0XHQg5pWM5Lq66KGA6YePXHJcblx0ICogQHBhcmFtIHNwZWVkXHRcdOaVjOS6uumAn+W6plxyXG5cdCAqIEBwYXJhbSBudW1cdFx05pWM5Lq65pWw6YePXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjcmVhdGVFbmVteShpbmRleDpudW1iZXIsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixudW06bnVtYmVyKTp2b2lkIFxyXG5cdHtcclxuXHRcdGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBudW07IGkrKylcclxuXHRcdHtcclxuXHRcdFx0bGV0IGVuZW15VHlwZSA9IFwiZW5lbXlcIiArIChpbmRleCsxKTtcclxuXHRcdFx0Ly/liJvlu7rmlYzkurrvvIzku47lr7nosaHmsaDliJvlu7pcclxuXHRcdFx0bGV0IGVuZW15OkVuZW15ID0gUm9sZUZhY3RvcnkuR2V0Um9sZShlbmVteVR5cGUpIGFzIEVuZW15O1xyXG5cdFx0XHQvL+WIneWni+WMluaVjOS6ulxyXG5cdFx0XHRlbmVteS5pbml0KGVuZW15VHlwZSwgaHAsIHNwZWVkLEdhbWVDb25zdC5yYWRpdXNbaW5kZXhdLDEpO1xyXG5cdFx0XHQvL+S7juWvueixoeaxoOS4reWIm+W7uueahOWvueixoeatu+S6oeWJjeiiq+makOiXj+S6hu+8jOWboOatpOimgemHjeaWsOWIneWni+WMluaYvuekuu+8jOWQpuWImeaWsOWIm+W7uuinkuiJsuS4jeS8muaYvuekuuWHuuadpVxyXG5cdFx0XHRlbmVteS52aXNpYmxlID0gdHJ1ZTtcclxuXHRcdFx0Ly/pmo/mnLrkvY3nva5cclxuXHRcdFx0ZW5lbXkucG9zKE1hdGgucmFuZG9tKCkgKig3MjAtODApKzUwLCAtTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcblx0XHRcdC8v5re75Yqg5Yiw6Iie5Y+w5LiKXHJcblx0XHRcdHRoaXMuTWFpbi5yb2xlTGF5ZXIuYWRkQ2hpbGQoZW5lbXkpO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uc3Rcclxue1xyXG4gICAgLy/muLjmiI/lhbPljaHmj5DljYflsZ7mgKdcclxuXHQvKioq5pWM5Lq65Yi35paw5Yqg6YCfKioqKi9cclxuXHRwdWJsaWMgc3RhdGljIGNyZWF0ZVRpbWU6bnVtYmVyID0gMDtcclxuXHQvKioq5pWM5Lq66YCf5bqm5o+Q5Y2HKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgc3BlZWRVcDpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrooYDph4/mj5DljYcqKiovXHRcdFxyXG5cdHB1YmxpYyBzdGF0aWMgaHBVcDpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrmlbDph4/mj5DljYcqKiovXHRcdFx0XHRcdFxyXG5cdHB1YmxpYyBzdGF0aWMgbnVtVXA6bnVtYmVyID0gMDtcclxuXHQvKioqKuWNh+e6p+etiee6p+aJgOmcgOeahOaIkOe7qeaVsOmHjyoqKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGV2ZWxVcFNjb3JlOiBudW1iZXIgPSAxMDtcclxuXHJcblx0LyoqKirmlYzmnLrooYDph4/ooagqKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgaHBzOiBudW1iZXJbXSA9IFsxLCA3LCAxNV07XHJcblx0LyoqKuaVjOacuueUn+aIkOaVsOmHj+ihqCoqL1xyXG5cdHB1YmxpYyBzdGF0aWMgbnVtczogbnVtYmVyW10gPSBbMSwgMSwgMV07XHJcblx0LyoqKuaVjOacuumAn+W6puihqCoqKi9cclxuXHRwdWJsaWMgc3RhdGljIHNwZWVkczogIG51bWJlcltdID0gWzIsIDEsIDAuM107XHJcblx0LyoqKuaVjOacuuiiq+WHu+WNiuW+hOihqCoqKi9cclxuXHRwdWJsaWMgc3RhdGljIHJhZGl1czogIG51bWJlcltdID0gWzIwLCAzNSwgODBdO1xyXG4gICAgXHJcblx0Lyoq5ri45oiP5YWz5Y2h5pWwKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgbGV2ZWw6bnVtYmVyID0gMTtcclxuXHQvKirnjqnlrrblvpfliIYqKiovXHJcblx0cHVibGljIHN0YXRpYyBzY29yZTpudW1iZXIgPSAwO1xyXG5cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+iDjOaZr+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1hcCBleHRlbmRzIHVpLkdhbWVCZ1VJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg5ri45oiP6IOM5pmv56e75Yqo5pu05pawXHJcbiAgICAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgdXBkYXRlTWFwKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMueSs9MTtcclxuICAgICAgICAvL+WmguaenOiDjOaZr+WbvuWIsOS6huS4i+mdouS4jeWPr+inge+8jOeri+WNs+iwg+aVtOS9jee9ruWIsOS4iumdouW+queOr+aYvuekulxyXG4gICAgICAgIC8v5ri45oiP6Iie5Y+w6auY5Li6MTI4MFxyXG4gICAgICAgIGlmICh0aGlzLmJnMS55ICsgdGhpcy55ID49IDEyODApIFxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIHRoaXMuYmcxLnkgLT0gMTI4MCAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmJnMi55ICsgdGhpcy55ID49IDEyODApIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iZzIueSAtPSAxMjgwICogMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT3ZlciBleHRlbmRzIHVpLkdhbWVPdmVyVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcdC8vXCLph43mlrDlvIDlp4tcIuaMiemSrum8oOagh+S6i+S7tlxyXG5cdFx0XHR0aGlzLmJ0bl9yZXN0YXJ0Lm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25SZXN0YXJ0KTtcclxuICAgIH1cclxuXHQvKipcclxuXHRcdOa4uOaIj+mHjeaWsOW8gOWni1xyXG5cdFx0ICovXHRcdFxyXG5cdFx0cHJpdmF0ZSBvblJlc3RhcnQoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pKt5pS+SURF5Lit57yW6L6R55qE5oyJ6ZKu5Yqo55S7XHJcblx0XHRcdHRoaXMuYW5pX3Jlc3RhcnQucGxheSgwLGZhbHNlKTtcclxuXHRcdFx0Ly/nm5HlkKzliqjnlLvlrozmiJDkuovku7bvvIzms6jmhI/nlKhvbmNlXHJcblx0XHRcdHRoaXMuYW5pX3Jlc3RhcnQub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5BbmlDb21wbGV0ZSk7XHJcblx0XHR9XHJcblx0XHQvKipcclxuXHRcdCDmjInpkq7liqjnlLvmkq3mlL7lrozmiJBcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBBbmlDb21wbGV0ZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/lj5HpgIHph43mlrDlvIDlp4vkuovku7bvvIzlnKhNYWlu57G75Lit55uR5ZCsXHJcblx0XHRcdHRoaXMuZXZlbnQoXCJyZVN0YXJ0XCIpXHJcblx0XHRcdC8v57yT5Yqo5Yqo55S75YWz6Zet5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdH1cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVQbGF5IGV4dGVuZHMgdWkuR2FtZVBsYXlVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8v55uR5ZCs5pqC5YGc5oyJ6ZKu5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5idG5fcGF1c2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vblBhdXNlKVxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHRcdCDmuLjmiI/mmoLlgZxcclxuXHRcdCAqL1x0XHJcblx0XHRwcml2YXRlIG9uUGF1c2UoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pi+56S6SURF5Lit6ZqQ6JeP55qE5pqC5YGc55WM6Z2iXHJcblx0XHRcdHRoaXMuZ2FtZVBhdXNlLnZpc2libGU9dHJ1ZTtcclxuXHRcdFx0Ly/mmoLlgZznlYzpnaLliqDngrnlh7vnm5HlkKzvvIjkuIDmrKHvvIlcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2Uub25jZShMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uQ29udGludWUpXHJcblx0XHRcdFx0XHJcblx0XHRcdC8v5pe26Ze05a+56LGh57yp5pS+5Li6MOWwseaYr+WBnOatolxyXG5cdFx0XHRMYXlhLnRpbWVyLnNjYWxlPTA7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0IOa4uOaIj+e7p+e7rVxyXG5cdFx0ICovXHRcclxuXHRcdHByaXZhdGUgb25Db250aW51ZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/ml7bpl7Tlr7nosaHnvKnmlL7kuLox5bCx5piv5q2j5bi46YCf5bqm5pKt5pS+XHJcblx0XHRcdExheWEudGltZXIuc2NhbGU9MTtcclxuXHRcdFx0Ly/pmpDol4/mmoLlgZznlYzpnaJcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2UudmlzaWJsZT1mYWxzZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqKirmnKzlsYDmuLjmiI/mlbDmja5VSeabtOaWsCoqKi9cclxuXHRcdHB1YmxpYyB1cGRhdGUoaHA6bnVtYmVyLGxldmVsOm51bWJlcixzY29yZTpudW1iZXIpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/op5LoibLooYDph4/mm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfaHAudGV4dD1cIkhQOlwiK2hwO1xyXG5cdFx0XHQvL+WFs+WNoeetiee6p+abtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9sZXZlbC50ZXh0PVwiTEVWRUw6XCIrbGV2ZWw7XHJcblx0XHRcdC8v5ri45oiP5YiG5pWw5pu05pawXHJcblx0XHRcdHRoaXMudHh0X3Njb3JlLnRleHQ9XCJTQ09SRTpcIitzY29yZTtcclxuXHRcdH1cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+W8gOWni+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXJ0IGV4dGVuZHMgdWkuR2FtZVN0YXJ0VUlcclxue1xyXG4gICAgLyoqKua4uOaIj+i1hOa6kOWcsOWdgOaVsOe7hCoqKi9cclxuICAgICBwcml2YXRlIGFzc2V0QXJyOmFueT1bXHJcbiAgICB7dXJsOlwicmVzL2F0bGFzL2dhbWVSb2xlLmF0bGFzXCJ9XHJcbiAgICAsIHt1cmw6XCJzb3VuZC9hY2hpZXZlbWVudC5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgICwge3VybDpcInNvdW5kL2J1bGxldC5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgICwge3VybDpcInNvdW5kL2dhbWVfb3Zlci5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgICwge3VybDpcInNvdW5kL2VuZW15MV9kaWUubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICAsIHt1cmw6XCJzb3VuZC9lbmVteTNfb3V0Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgXVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy/muLjmiI/liqDovb3mnKrlrozmiJDmmoLml7bkuI3mmL7npLrvvIzpmLLmraLngrnlh7vlh7rplJlcclxuICAgICAgICB0aGlzLmJ0bl9zdGFydC52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgLy/nm5HlkKznlYzpnaLmmK/lkKblhbPpl61cclxuICAgICAgICB0aGlzLm9uY2UobGF5YS5ldmVudHMuRXZlbnQuQ0xPU0UsdGhpcyx0aGlzLm9uQ2xvc2UpO1xyXG4gICAgICAgIC8v5Yqg6L295Ymp5L2Z5ri45oiP6LWE5rqQ44CB6Z+z5LmQ77yM5Yqg6L295a6M5oiQ5LiO5Yqg6L296L+b5bqm5Zue6LCD5pa55rOVXHJcbiAgICAgICAgTGF5YS5sb2FkZXIubG9hZCh0aGlzLmFzc2V0QXJyLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uQ29tcGxldGUpLExheWEuSGFuZGxlci5jcmVhdGUodGhpcyx0aGlzLm9uUHJvZ3Jlc3MpKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP6LWE5rqQ5Yqg6L295a6M5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Db21wbGV0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WKoOi9veWujOaIkFxyXG4gICAgICAgIHRoaXMudHh0X2xvYWQudGV4dD1cIui1hOa6kOWKoOi9veWujOaIkCzlvIDlp4vmuLjmiI/lkKcuLi5cIjtcclxuICAgICAgICAvL+a4uOaIj+W8gOWni+aMiemSruaYvuekuuW5tuW8ueWHulxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAvL+e8k+WKqOexu+W8ueWHuuWKqOeUu1xyXG4gICAgICAgIExheWEuVHdlZW4uZnJvbSh0aGlzLmJ0bl9zdGFydCx7eTp0aGlzLmJ0bl9zdGFydC55KzIwfSwxMDAwLExheWEuRWFzZS5lbGFzdGljT3V0KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/otYTmupDliqDovb3ov5vluqZcclxuICAgICAqIEBwYXJhbSBsb2FkTnVtICDov5vluqZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblByb2dyZXNzKGxvYWROdW06bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/mmL7npLrliqDovb3ov5vluqZcclxuICAgICAgICB0aGlzLnR4dF9sb2FkLnRleHQ9XCLotYTmupDliqDovb3kuK3vvIzlvZPliY3ov5vluqbvvJpcIitsb2FkTnVtKjEwMCtcIiVcIjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouWFs+mXrVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2xvc2UoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ku47oiJ7lj7Dnp7vpmaToh6rlt7FcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAvL+WPquWKoOi9veS4gOasoe+8jOWboOatpOebtOaOpea2iOavgeiHquW3sVxyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBXZWJHTCA9IExheWEuV2ViR0w7XHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2U7XHJcbmltcG9ydCBFdmVudCA9IGxheWEuZXZlbnRzLkV2ZW50O1xyXG5pbXBvcnQgR2FtZVN0YXJ0IGZyb20gXCIuL0dhbWVTdGFydFwiO1xyXG5pbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTWFwXCI7XHJcbmltcG9ydCBHYW1lUGxheSBmcm9tIFwiLi9HYW1lUGxheVwiO1xyXG5pbXBvcnQgR2FtZU92ZXIgZnJvbSBcIi4vR2FtZU92ZXJcIjtcclxuaW1wb3J0IFJvbGVcdGZyb20gXCIuL1JvbGUvUm9sZVwiO1xyXG5pbXBvcnQgSGVyb1x0ZnJvbSBcIi4vUm9sZS9IZXJvXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9Sb2xlL0VuZW15XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vUm9sZS9CdWxsZXRcIjtcclxuaW1wb3J0IEVuZW15TWFuYWdlciBmcm9tIFwiLi9FbmVteU1hbmFnZXJcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGUvUm9sZUZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gXHJcbntcclxuXHRwdWJsaWMgc3RhdGljIGluc3RhbmNlOk1haW47XHJcblx0cHVibGljIHN0YXRpYyBHZXRJbnN0YW5jZSgpOk1haW5cclxuXHR7XHJcblx0XHRpZih0aGlzLmluc3RhbmNlID09IG51bGwpXHJcblx0XHRcdHRoaXMuaW5zdGFuY2UgPSBuZXcgTWFpbigpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0Lyoq5byA5aeL6aG16Z2iKioqL1xyXG5cdHB1YmxpYyBzdGFydDpHYW1lU3RhcnQ7XHJcblx0Lyoq5Zyw5Zu+6aG16Z2iKioqL1xyXG5cdHB1YmxpYyBtYXA6R2FtZU1hcDtcclxuXHQvKirmuLjmiI/kuK3nlYzpnaIqKiovXHJcblx0cHVibGljIHBsYXk6R2FtZVBsYXk7XHJcblx0Lyoq5ri45oiP57uT5p2f6aG16Z2iKioqL1xyXG5cdHB1YmxpYyBvdmVyOkdhbWVPdmVyO1xyXG5cclxuXHQvL+aVjOaWueeUn+aIkOeuoeeQhlxyXG5cdHByaXZhdGUgZW5lbXlNYW5hZ2VyOkVuZW15TWFuYWdlcjtcclxuXHJcblx0Lyoq6KeS6Imy5bGC5a655ZmoKioqL1xyXG5cdHB1YmxpYyByb2xlTGF5ZXI6TGF5YS5TcHJpdGU7XHJcblx0Lyoq546p5a625Li76KeSKioqL1xyXG5cdHB1YmxpYyBoZXJvOkhlcm87XHJcblx0XHJcblx0Lyoq6byg5qCH5LiK5LiA5bineOW6p+aghyoqICovXHRcdFxyXG5cdHByaXZhdGUgbW92ZVg6bnVtYmVyO1xyXG5cdC8qKum8oOagh+S4iuS4gOW4p3nluqfmoIcqKiAqL1x0XHJcblx0cHJpdmF0ZSBtb3ZlWTpudW1iZXI7XHJcblxyXG5cdC8qKioq5Li76KeS5q275Lqh5ZCO5ri45oiP57uT5p2f5pe26Ze0KioqL1xyXG5cdHByaXZhdGUgZGVhdGhUaW1lOm51bWJlcj0wXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG5cdFx0Ly/liJ3lp4vljJblvJXmk47vvIzlu7rorq7lop7liqBXZWJHbOaooeW8j1xyXG5cdFx0TGF5YS5pbml0KDcyMCwxMjgwLFdlYkdMKTtcclxuXHRcdC8v5YWo5bGP5LiN562J5q+U57yp5pS+5qih5byPXHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX0VYQUNURklUO1xyXG5cdFx0Ly/liqDovb3liJ3lp4vljJZVSei1hOa6kFxyXG5cdFx0TGF5YS5sb2FkZXIubG9hZChcInJlcy9hdGxhcy9nYW1lVUkuYXRsYXNcIixsYXlhLnV0aWxzLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5HYW1lU3RhcnQpKTtcclxuXHRcdFxyXG5cdFx0Ly/liJ3lp4vljJbop5LoibLnrqHnkIblmahcclxuXHRcdHRoaXMuZW5lbXlNYW5hZ2VyID0gbmV3IEVuZW15TWFuYWdlcih0aGlzKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgR2FtZVN0YXJ0KCk6dm9pZCBcclxuXHR7XHJcblx0XHQvL+WunuS+i+WMluW8gOWni+mhtemdolxyXG5cdFx0dGhpcy5zdGFydCA9IG5ldyBHYW1lU3RhcnQoKTtcclxuXHRcdHRoaXMuc3RhcnQucG9wdXAoKTtcclxuXHRcdC8v55uR5ZCs5byA5aeL5ri45oiP5byA5aeL5oyJ6ZKu5LqL5Lu2LOeCueWHu+WQjui/m+WFpea4uOaIj+S4rVxyXG5cdFx0dGhpcy5zdGFydC5idG5fc3RhcnQub24oRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLmdhbWVJbml0KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOa4uOaIj+S4re+8jOa4uOaIj+WIneWni+WMllxyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGdhbWVJbml0KCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v57yT5Yqo5Yqo55S75YWz6Zet5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHR0aGlzLnN0YXJ0LmNsb3NlKCk7XHJcblx0XHRcclxuXHRcdC8v6YeN572u5YWz5Y2h5pWw5o2uXHJcblx0XHQvL+a4uOaIj+WFs+WNoeaVsFxyXG5cdFx0R2FtZUNvbnN0LmxldmVsID0gMTtcclxuXHRcdC8v546p5a625b6X5YiGXHJcblx0XHRHYW1lQ29uc3Quc2NvcmUgPSAwO1xyXG5cclxuXHRcdHRoaXMuZW5lbXlNYW5hZ2VyLlJlc2V0SW5mbygpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluWcsOWbvuiDjOaZr+mhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLm1hcCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLm1hcCA9IG5ldyBHYW1lTWFwKCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1hcCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW6KeS6Imy5bGC5bm25Yqg6L295Yiw6Iie5Y+wKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMucm9sZUxheWVyID09IG51bGwpXHJcblx0XHRcdHRoaXMucm9sZUxheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMucm9sZUxheWVyKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbmuLjmiI/kuK1VSemhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLnBsYXkgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5wbGF5ID0gbmV3IEdhbWVQbGF5KCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnBsYXkpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluS4u+inkijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLmhlcm8gPT0gbnVsbClcclxuXHRcdFx0dGhpcy5oZXJvID0gUm9sZUZhY3RvcnkuR2V0Um9sZShcImhlcm9cIik7XHJcblx0XHQvL+WIneWni+WMluinkuiJsuexu+Wei+OAgeihgOmHj++8jOazqO+8mumAn+W6pnNwZWVk5Li6MO+8jOWboOS4uuS4u+inkuaYr+mAmui/h+aTjeaOp+aUueWPmOS9jee9rizpmLXokKXkuLowXHJcblx0XHR0aGlzLmhlcm8uaW5pdChcImhlcm9cIiwxMCwwLDMwLDApO1xyXG5cdFx0Ly/mrbvkuqHlkI7kvJrpmpDol4/vvIzph43mlrDlvIDlp4vlkI7pnIDmmL7npLpcclxuXHRcdHRoaXMuaGVyby52aXNpYmxlPXRydWU7XHJcblx0XHQvL+S4u+inkuS9jee9ruS/ruaUuVxyXG5cdFx0dGhpcy5oZXJvLnBvcygzNjAsODAwKTtcclxuXHRcdC8v6KeS6Imy5Yqg6L295Yiw6KeS6Imy5bGC5LitXHJcblx0XHR0aGlzLnJvbGVMYXllci5hZGRDaGlsZCh0aGlzLmhlcm8pO1xyXG5cdFx0XHJcblx0XHQvL+m8oOagh+aMieS4i+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHQvL+m8oOagh+aKrOi1t+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMub25Nb3VzZVVwKTtcclxuXHRcdC8v5ri45oiP5Li75b6q546vXHJcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5sb29wKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDngrnlh7vlvIDlp4vop6blj5Hnp7vliqhcclxuXHRcdCovXHRcclxuXHRwcml2YXRlIG9uTW91c2VEb3duKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v6K6w5b2V6byg5qCH5oyJ5LiL5pe255qE5L2N572u77yM55So5LqO6K6h566X6byg5qCH56e75Yqo6YePXHJcblx0XHR0aGlzLm1vdmVYPUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0dGhpcy5tb3ZlWT1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8vXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0IOS4u+inkui3n+maj+m8oOagh+enu+WKqFxyXG5cdFx0Ki9cdFxyXG5cdHByaXZhdGUgb25Nb3VzZU1vdmUoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/orqHnrpfop5LoibLnp7vliqjph49cclxuXHRcdGxldCB4eDpudW1iZXI9dGhpcy5tb3ZlWC1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdGxldCB5eTpudW1iZXI9dGhpcy5tb3ZlWS1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8v5pu05paw56e75Yqo5L2N572uXHJcblx0XHR0aGlzLmhlcm8ueC09eHg7XHJcblx0XHR0aGlzLmhlcm8ueS09eXk7XHJcblx0XHQvL+abtOaWsOacrOW4p+eahOenu+WKqOW6p+agh1xyXG5cdFx0dGhpcy5tb3ZlWD1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdHRoaXMubW92ZVk9TGF5YS5zdGFnZS5tb3VzZVk7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCDpvKDmoIfmiqzotbfjgIHlhbPpl63np7vliqjnm5HlkKxcclxuXHRcdCovXHRcdFxyXG5cdHByaXZhdGUgb25Nb3VzZVVwKCk6dm9pZFxyXG5cdHtcclxuXHRcdExheWEuc3RhZ2Uub2ZmKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDmuLjmiI/kuLvlvqrnjq9cclxuXHRcdCovXHJcblx0cHJpdmF0ZSBsb29wKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v5pys5bGA5ri45oiP5pWw5o2u5pu05pawXHJcblx0XHR0aGlzLnBsYXkudXBkYXRlKHRoaXMuaGVyby5ocCxHYW1lQ29uc3QubGV2ZWwsR2FtZUNvbnN0LnNjb3JlKVxyXG5cdFx0Ly/lpoLmnpzkuLvop5LmrbvkuqFcclxuXHRcdGlmKHRoaXMuaGVyby5ocDw9MClcclxuXHRcdHtcclxuXHRcdFx0Ly/njqnlrrbpo57mnLrmrbvkuqHlkI7lu7bov5/ml7bpl7TvvIwxMDDluKflkI7lvLnlh7rmuLjmiI/nu5PmnZ/nlYzpnaJcclxuXHRcdFx0dGhpcy5kZWF0aFRpbWUrK1xyXG5cdFx0XHRpZiAodGhpcy5kZWF0aFRpbWU+PTEwMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuZGVhdGhUaW1lPTA7XHJcblx0XHRcdFx0Ly/muLjmiI/nu5PmnZ9cclxuXHRcdFx0XHR0aGlzLmdhbWVPdmVyKCk7XHJcblx0XHRcdFx0Ly/mnKzmlrnms5XlhoXlkI7nu63pgLvovpHkuI3miafooYxcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UvL+S4u+inkuacquatu+S6oVxyXG5cdFx0e1xyXG5cdFx0XHQvL+a4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0XHR0aGlzLmxldmVsVXAoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL+WcsOWbvua7muWKqOabtOaWsFxyXG5cdFx0dGhpcy5tYXAudXBkYXRlTWFwKClcclxuXHRcdC8v5ri45oiP56Kw5pKe6YC76L6RXHJcblx0XHR0aGlzLmNoZWNrQ29sbGVjdCgpO1xyXG5cdFx0Ly/mlYzmlrnpo57mnLrnlJ/miJDpgLvovpFcclxuXHRcdHRoaXMuZW5lbXlNYW5hZ2VyLmxvb3BDcmVhdGVFbmVteSgpO1xyXG5cdH1cclxuXHJcblx0Ly/muLjmiI/norDmkp7pgLvovpFcclxuXHRwcml2YXRlIGNoZWNrQ29sbGVjdCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+mBjeWOhuaJgOaciemjnuacuu+8jOabtOaUuemjnuacuueKtuaAgVxyXG5cdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gdGhpcy5yb2xlTGF5ZXIubnVtQ2hpbGRyZW4gLSAxOyBpID4gLTE7IGktLSkgXHJcblx0XHR7XHJcblx0XHRcdC8v6I635Y+W56ys5LiA5Liq6KeS6ImyXHJcblx0XHRcdHZhciByb2xlOlJvbGUgPSB0aGlzLnJvbGVMYXllci5nZXRDaGlsZEF0KGkpIGFzIFJvbGU7XHJcblx0XHRcdC8v6KeS6Imy6Ieq6Lqr5pu05pawXHJcblx0XHRcdHJvbGUudXBkYXRlKCk7XHJcblxyXG5cdFx0XHQvL+WmguaenOinkuiJsuatu+S6oe+8jOS4i+S4gOW+queOr1xyXG5cdFx0XHRpZihyb2xlLmhwPD0wKSBjb250aW51ZTtcclxuXHRcdFx0Ly/lj5HlsITlrZDlvLlcclxuXHRcdFx0cm9sZS5zaG9vdCgpO1xyXG5cclxuXHRcdFx0Ly/norDmkp7mo4DmtYtcclxuXHRcdFx0Zm9yKHZhciBqOm51bWJlcj1pLTE7aj4tMTtqLS0pXHJcblx0XHRcdHtcdC8v6I635Y+W56ys5LqM5Liq6KeS6ImyXHJcblx0XHRcdFx0dmFyIHJvbGUxOlJvbGU9dGhpcy5yb2xlTGF5ZXIuZ2V0Q2hpbGRBdChqKSBhcyBSb2xlO1xyXG5cdFx0XHRcdC8v5aaC5p6ccm9sZTHmnKrmrbvkuqHkuJTkuI3lkIzpmLXokKVcclxuXHRcdFx0XHRpZihyb2xlMS5ocD4wJiZyb2xlMS5jYW1wIT1yb2xlLmNhbXApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Ly/ojrflj5bnorDmkp7ljYrlvoRcclxuXHRcdFx0XHRcdHZhciBoaXRSYWRpdXM6bnVtYmVyPXJvbGUuaGl0UmFkaXVzK3JvbGUxLmhpdFJhZGl1cztcclxuXHRcdFx0XHRcdC8v56Kw5pKe5qOA5rWLXHJcblx0XHRcdFx0XHRpZihNYXRoLmFicyhyb2xlLngtcm9sZTEueCk8aGl0UmFkaXVzJiZNYXRoLmFicyhyb2xlLnktcm9sZTEueSk8aGl0UmFkaXVzKVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHQvL+WmguaenOafkOS4gOS4queisOaSnuS9k+aYr+mBk+WFt++8jOWImeWQg+mBk+WFt++8jOWQpuWImeaOieihgFxyXG5cdFx0XHRcdFx0XHRpZihyb2xlLnByb3BUeXBlIT0wfHxyb2xlMS5wcm9wVHlwZSE9MClcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdC8v5peg5rOV5Yik5pat5ZOq5Liq5piv6YGT5YW377yM5Zug5q2k6YO955u45LqS5ZCD6K+V6K+VXHJcblx0XHRcdFx0XHRcdFx0cm9sZS5lYXRQcm9wKHJvbGUxKTtcclxuXHRcdFx0XHRcdFx0XHRyb2xlMS5lYXRQcm9wKHJvbGUpO1xyXG5cdFx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0Ly/op5LoibLnm7jkupLmjonooYBcclxuXHRcdFx0XHRcdFx0XHRyb2xlLmxvc3RIcCgxKTtcclxuXHRcdFx0XHRcdFx0XHRyb2xlMS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0LyoqXHJcblx0IOa4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGxldmVsVXAoKTp2b2lkXHJcblx0e1xyXG5cdFx0aWYoR2FtZUNvbnN0LnNjb3JlPkdhbWVDb25zdC5sZXZlbFVwU2NvcmUpXHJcblx0XHR7XHJcblx0XHRcdC8v5YWz5Y2h562J57qn5o+Q5Y2HXHJcblx0XHRcdEdhbWVDb25zdC5sZXZlbCsrO1xyXG5cdFx0XHQvL+inkuiJsuihgOmHj+WinuWKoO+8jOacgOWkpzMwXHJcblx0XHRcdHRoaXMuaGVyby5ocD1NYXRoLm1pbih0aGlzLmhlcm8uaHArR2FtZUNvbnN0LmxldmVsKjEsMzApO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOWIm+W7uuaVjOacuumXtOmalOi2iuefrVxyXG5cdFx0XHRHYW1lQ29uc3QuY3JlYXRlVGltZSA9IEdhbWVDb25zdC5sZXZlbCA8IDMwID8gR2FtZUNvbnN0LmxldmVsICogMiA6IDYwO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuumjnuihjOmAn+W6pui2iumrmFxyXG5cdFx0XHRHYW1lQ29uc3Quc3BlZWRVcCA9IE1hdGguZmxvb3IoR2FtZUNvbnN0LmxldmVsIC8gNik7XHJcblx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py66KGA6YeP6LaK6auYXHJcblx0XHRcdEdhbWVDb25zdC5ocFVwID0gTWF0aC5mbG9vcihHYW1lQ29uc3QubGV2ZWwgLyA4KTtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrmlbDph4/otorlpJpcclxuXHRcdFx0R2FtZUNvbnN0Lm51bVVwID0gTWF0aC5mbG9vcihHYW1lQ29uc3QubGV2ZWwgLyAxMCk7XHJcblx0XHRcdC8v5o+Q6auY5LiL5LiA57qn55qE5Y2H57qn5YiG5pWwXHJcblx0XHRcdEdhbWVDb25zdC5sZXZlbFVwU2NvcmUgKz0gR2FtZUNvbnN0LmxldmVsICogMTA7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdC8qKlxyXG5cdCDmuLjmiI/nu5PmnZ9cclxuXHRcdCovXHJcblx0cHJpdmF0ZSBnYW1lT3ZlcigpOnZvaWRcclxuXHR7XHJcblx0XHQvL+enu+mZpOaJgOacieiInuWPsOS6i+S7tu+8jOm8oOagh+aTjeaOp1xyXG5cdFx0TGF5YS5zdGFnZS5vZmZBbGwoKTtcclxuXHRcdC8v56e76Zmk5Zyw5Zu+6IOM5pmvXHJcblx0XHR0aGlzLm1hcC5yZW1vdmVTZWxmKCk7XHJcblx0XHQvL+enu+mZpOa4uOaIj+S4rVVJXHJcblx0XHR0aGlzLnBsYXkucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHJcblx0XHQvL+a4heepuuinkuiJsuWxguWtkOWvueixoVxyXG5cdFx0dGhpcy5yb2xlTGF5ZXIucmVtb3ZlQ2hpbGRyZW4oMCx0aGlzLnJvbGVMYXllci5udW1DaGlsZHJlbi0xKTtcclxuXHRcdC8v56e76Zmk6KeS6Imy5bGCXHJcblx0XHR0aGlzLnJvbGVMYXllci5yZW1vdmVTZWxmKCk7XHJcblx0XHRcclxuXHRcdC8v5Y676Zmk5ri45oiP5Li75b6q546vXHJcblx0XHRMYXlhLnRpbWVyLmNsZWFyKHRoaXMsdGhpcy5sb29wKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbmuLjmiI/nu5PmnZ/pobXpnaJcclxuXHRcdGlmKHRoaXMub3ZlciA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLm92ZXIgPSBuZXcgR2FtZU92ZXIoKTtcclxuXHRcdC8v5ri45oiP56ev5YiG5pi+56S6XHJcblx0XHR0aGlzLm92ZXIudHh0X3Njb3JlLnRleHQ9IEdhbWVDb25zdC5zY29yZS50b1N0cmluZygpO1xyXG5cdFx0Ly/ku6XlvLnlh7rmlrnlvI/miZPlvIDvvIzmnInnvJPliqjmlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdHRoaXMub3Zlci5wb3B1cCgpO1xyXG5cdFx0Ly/ph43mlrDlvIDlp4vkuovku7bnm5HlkKws54K55Ye75ZCO6L+b5YWl5ri45oiP5LitXHJcblx0XHR0aGlzLm92ZXIub24oXCJyZVN0YXJ0XCIsdGhpcyx0aGlzLmdhbWVJbml0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbk1haW4uR2V0SW5zdGFuY2UoKTtcclxuIiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v6ZqQ6JeP77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLmm7TmlrAs6L6555WM5qOA5p+lXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgICAvL+WmguaenOinkuiJsumakOiXj++8jOinkuiJsua2iOS6oeW5tuWbnuaUtlxyXG4gICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLmRpZSgpO1xyXG4gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBsZXQgeFJvdGF0aW9uID0gTWF0aC5zaW4oIExheWEuVXRpbHMudG9SYWRpYW4odGhpcy5yb3RhdGlvbikpO1xyXG4gICAgICAgICBsZXQgeVJvdGF0aW9uID0gTWF0aC5jb3MoIExheWEuVXRpbHMudG9SYWRpYW4odGhpcy5yb3RhdGlvbikpO1xyXG4gICAgICAgICAvL+inkuiJsuagueaNrumAn+W6pumjnuihjFxyXG4gICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZCAqICB4Um90YXRpb24gO1xyXG4gICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZCAgKiAgeVJvdGF0aW9uIDtcclxuIFxyXG4gICAgICAgICAvL+WmguaenOenu+WKqOWIsOaYvuekuuWMuuWfn+S7peWklu+8jOWImeenu+mZpFxyXG4gICAgICAgICBpZiAodGhpcy55ID4gMTI4MCsxMDB8fHRoaXMueTwtMTUwKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXkgZXh0ZW5kcyBSb2xlXHJcbntcclxuICAgIC8v5aKe5Yqg5YiG5pWwXHJcbiAgICBwdWJsaWMgYWRkU2NvcmU6bnVtYmVyID0gMTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2hvb3RJbnRlcnZhbCA9IDUwMDA7ICAvL+WwhOWHu+mXtOmalFxyXG4gICAgICAgIHRoaXMuc2hvb3RUaW1lID0gNTAwMDtcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImhpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImRpZVwiKTtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHpn7PmlYhcclxuICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZ2FtZV9vdmVyLm1wM1wiKTtcclxuICAgICAgICAgICAgR2FtZUNvbnN0LnNjb3JlKz0gdGhpcy5hZGRTY29yZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKuWKqOeUu+WujOaIkOWQjuWbnuiwg+aWueazlSoqKi9cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzmrbvkuqHliqjnlLvmkq3mlL7lrozmiJBcclxuICAgICAgICBpZih0aGlzLmFjdGlvbj09XCJkaWVcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb3N0UHJvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuYWN0aW9uPT1cImhpdFwiKS8v5aaC5p6c5piv5Y+X5Lyk5Yqo55S777yM5LiL5LiA5bin5pKt5pS+6aOe6KGM5Yqo55S7XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJmbHlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeaOieiQveeJqeWTgSoqL1xyXG4gICAgcHVibGljIGxvc3RQcm9wKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDop5LoibLlsITlh7vvvIznlJ/miJDlrZDlvLlcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBzaG9vdCgpOnZvaWRcclxuICAgIHtcclxuICAgIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgdWZvIGZyb20gXCIuL3Vmb1wiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGVGYWN0b3J5XCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9FbmVteVwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlfMSBleHRlbmRzIEVuZW15XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gNTAwMDsgIC8v5bCE5Ye76Ze06ZqUXHJcbiAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aGlzLnNob290SW50ZXJ2YWw7IC8v56ys5LiA5qyh5bCE5Ye75pe26Ze0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuaHAgPD0gMClcclxuICAgICAgICAvLyAgICAgcmV0dXJuOyBcclxuXHJcbiAgICAgICAgLy8gLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICAvLyBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCk7XHJcbiAgICAgICAgLy8gLy/lpoLmnpzlvZPliY3ml7bpl7TlpKfkuo7kuIvmrKHlsITlh7vml7bpl7RcclxuICAgICAgICAvLyBpZiAodGltZSA+IHRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgLy/mm7TmlrDkuIvmrKHlrZDlvLnlsITlh7vnmoTml7bpl7RcclxuICAgICAgICAvLyAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aW1lICsgdGhpcy5zaG9vdEludGVydmFsIDsgXHJcbiAgICAgICAgLy8gICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgLy8gICAgIGxldCBidWxsZXQ6IEJ1bGxldCA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJidWxsZXQxXCIpO1xyXG4gICAgICAgIC8vICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgIC8vICAgICBidWxsZXQuaW5pdChcImJ1bGxldDFcIiwxLDEwLDEsdGhpcy5jYW1wKVxyXG4gICAgICAgIC8vICAgICAvL+WtkOW8uea2iOWkseWQjuS8muS4jeaYvuekuu+8jOmHjeaWsOWIneWni+WMllxyXG4gICAgICAgIC8vICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIC8vICAgICAvL+iuvue9ruWtkOW8ueWPkeWwhOWIneWni+WMluS9jee9rlxyXG4gICAgICAgIC8vICAgICBidWxsZXQucG9zKHRoaXMueCwgdGhpcy55ICsgMzApO1xyXG5cclxuICAgICAgICAvLyAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAvLyAgICAgaWYoIHRoaXMucGFyZW50ICE9IG51bGwpXHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgIC8vIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgUm9sZUZhY3RvcnkgZnJvbSBcIi4vUm9sZUZhY3RvcnlcIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL0VuZW15XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteV8yIGV4dGVuZHMgRW5lbXlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNob290SW50ZXJ2YWwgPSAzMDAwOyAgLy/lsITlh7vpl7TpmpRcclxuICAgICAgICB0aGlzLnNob290VGltZSA9IHRoaXMuc2hvb3RJbnRlcnZhbDsgLy/nrKzkuIDmrKHlsITlh7vml7bpl7RcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IDU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMClcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgIFxyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gTGF5YS5Ccm93c2VyLm5vdygpO1xyXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pe26Ze05aSn5LqO5LiL5qyh5bCE5Ye75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPiB0aGlzLnNob290VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pu05paw5LiL5qyh5a2Q5by55bCE5Ye755qE5pe26Ze0XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RUaW1lID0gdGltZSArIHRoaXMuc2hvb3RJbnRlcnZhbCA7IFxyXG5cclxuICAgICAgICAgICAgLy/lpJrlj5HlrZDlvLlcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCAzIDsgaSArKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/ku47lr7nosaHmsaDph4zpnaLliJvlu7rkuIDkuKrlrZDlvLlcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXQ6IEJ1bGxldCA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJidWxsZXQxXCIpO1xyXG4gICAgICAgICAgICAgICAgLy/liJ3lp4vljJblrZDlvLnkv6Hmga9cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5pbml0KFwiYnVsbGV0MVwiLDEsMTAsMSx0aGlzLmNhbXApXHJcbiAgICAgICAgICAgICAgICAvL+WtkOW8uea2iOWkseWQjuS8muS4jeaYvuekuu+8jOmHjeaWsOWIneWni+WMllxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8v6K6+572u5a2Q5by55Y+R5bCE5Yid5aeL5YyW5L2N572uXHJcbiAgICAgICAgICAgICAgICBidWxsZXQucG9zKHRoaXMueCwgdGhpcy55ICsgMzApO1xyXG4gICAgICAgICAgICAgICAgLy/kuI3lkIzop5LluqZcclxuICAgICAgICAgICAgICAgIGJ1bGxldC5yb3RhdGlvbiA9IC0zMCArIGkgKiAzMDtcclxuXHJcbiAgICAgICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgICAgICAgaWYoIHRoaXMucGFyZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgdWZvIGZyb20gXCIuL3Vmb1wiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGVGYWN0b3J5XCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9FbmVteVwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlfMyBleHRlbmRzIEVuZW15XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gODAwMDsgIC8v5bCE5Ye76Ze06ZqUXHJcbiAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aGlzLnNob290SW50ZXJ2YWw7IC8v56ys5LiA5qyh5bCE5Ye75pe26Ze0XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDop5LoibLlsITlh7vvvIznlJ/miJDlrZDlvLlcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBzaG9vdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgXHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCk7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3ml7bpl7TlpKfkuo7kuIvmrKHlsITlh7vml7bpl7RcclxuICAgICAgICBpZiAodGltZSA+IHRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mm7TmlrDkuIvmrKHlrZDlvLnlsITlh7vnmoTml7bpl7RcclxuICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aW1lICsgdGhpcy5zaG9vdEludGVydmFsIDsgXHJcblxyXG4gICAgICAgICAgICAvL+eUn+aIkOmaj+acuumBk+WFt+exu+Wei1xyXG4gICAgICAgICAgICBpZihNYXRoLnJhbmRvbSgpIDwgMC42KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290QWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290QWN0XzIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzaG9vdEFjdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNob290QWN0RG8oKTtcclxuICAgICAgICBMYXlhLnRpbWVyLm9uY2UoNTAwLHRoaXMsdGhpcy5zaG9vdEFjdERvKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S4gOe7hOWtkOW8ueWunuS+i1xyXG4gICAgcHJpdmF0ZSBzaG9vdEFjdERvKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5aSa5Y+R5a2Q5by5XHJcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCAxOCA7IGkgKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiYnVsbGV0MVwiKTtcclxuICAgICAgICAgICAgLy/liJ3lp4vljJblrZDlvLnkv6Hmga9cclxuICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQxXCIsMSwxMCwxLHRoaXMuY2FtcCk7XHJcbiAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgIGJ1bGxldC52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgIC8v6K6+572u5a2Q5by55Y+R5bCE5Yid5aeL5YyW5L2N572uXHJcbiAgICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54LCB0aGlzLnkgKyA4MCk7XHJcbiAgICAgICAgICAgIC8v5LiN5ZCM6KeS5bqmXHJcbiAgICAgICAgICAgIGJ1bGxldC5yb3RhdGlvbiA9IC05MCArIGkgKiAxMDtcclxuXHJcbiAgICAgICAgICAgIC8v5re75Yqg5Yiw6KeS6Imy5bGCXHJcbiAgICAgICAgICAgIGlmKCB0aGlzLnBhcmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzaG9vdEFjdF8yKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgMzYgOyBpICsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGF5YS50aW1lci5vbmNlKDMwICogaSx0aGlzLHRoaXMuc2hvb3RBY3REb18yLFtpXSxmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob290QWN0RG9fMihpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgICAgIGxldCBidWxsZXQ6IEJ1bGxldCA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJidWxsZXQxXCIpO1xyXG4gICAgICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQxXCIsMSwxMCwxLHRoaXMuY2FtcCk7XHJcbiAgICAgICAgICAgLy/lrZDlvLnmtojlpLHlkI7kvJrkuI3mmL7npLrvvIzph43mlrDliJ3lp4vljJZcclxuICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgIC8v6K6+572u5a2Q5by55Y+R5bCE5Yid5aeL5YyW5L2N572uXHJcbiAgICAgICAgICAgYnVsbGV0LnBvcyh0aGlzLngsIHRoaXMueSArIDgwKTtcclxuICAgICAgICAgICAgaWYoaW5kZXggPiAxOClcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMzYgLSBpbmRleDtcclxuXHJcbiAgICAgICAgICAgLy/kuI3lkIzop5LluqZcclxuICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAtOTAgKyBpbmRleCAqIDEwO1xyXG5cclxuICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgIGlmKCB0aGlzLnBhcmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgfVxyXG4gICBcclxuICAgIC8qKuinkuiJsuatu+S6oeaOieiQveeJqeWTgSoqL1xyXG4gICAgcHVibGljIGxvc3RQcm9wKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq6YGT5YW3XHJcbiAgICAgICAgbGV0IHByb3A6dWZvID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwidWZvXCIsdWZvKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+eUn+aIkOmaj+acuumBk+WFt+exu+Wei1xyXG4gICAgICAgIGxldCByOk51bWJlcj1NYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgIGxldCBudW06bnVtYmVyPShyPDAuNyk/MToyO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6YeN5paw5Yid5aeL5YyW6YGT5YW35bGe5oCnLOmYteiQpeS4uuaVjOaWue+8iOWPquS4juS4u+inkuWPkeeUn+eisOaSnu+8iVxyXG4gICAgICAgIHByb3AuaW5pdChcInVmb1wiK251bSwxLDIsMzAsMSk7XHJcbiAgICAgICAgLy/pgZPlhbfnsbvlnotcclxuICAgICAgICBwcm9wLnByb3BUeXBlPW51bTtcclxuICAgICAgICBcclxuICAgICAgICAvL+W8uuWItuaYvuekulxyXG4gICAgICAgIHByb3AudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIC8v55Sf5oiQ55qE5L2N572u5Li65q275Lqh6ICF5L2N572uXHJcbiAgICAgICAgcHJvcC5wb3ModGhpcy54LHRoaXMueSk7XHJcbiAgICAgICAgLy/liqDovb3liLDniLblrrnlmaggXHJcbiAgICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGQocHJvcCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGVGYWN0b3J5XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wbGF5QWN0aW9uKFwiaGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZGllXCIpO1xyXG4gICAgICAgICAgICAvL+a3u+WKoOatu+S6oemfs+aViFxyXG4gICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9nYW1lX292ZXIubXAzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICog6KeS6Imy5ZCD5Yiw6YGT5YW377yM5Yqg6KGA5oiW5a2Q5by557qn5YirXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgZWF0UHJvcChwcm9wOlJvbGUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WmguaenOiwg+eUqOiAheaYr+S4u+inkuaIlnByb3DkuI3mmK/pgZPlhbfvvIzliJnov5Tlm55cclxuICAgICAgICBpZihwcm9wLnByb3BUeXBlPT0wKSByZXR1cm47XHJcbiAgICAgICAgLy/mt7vliqDlkIPlvLrljJbpgZPlhbfpn7PmlYhcdFx0XHRcdFx0XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvYWNoaWV2ZW1lbnQubXAzXCIpO1xyXG4gICAgICAgIC8v5ZCD5a2Q5by5566xXHJcbiAgICAgICAgaWYocHJvcC5wcm9wVHlwZT09MSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WtkOW8uee6p+WIq+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldExldmVsKytcclxuICAgICAgICAgICAgLy/lrZDlvLnmr4/ljYcy57qn77yM5a2Q5by55pWw6YeP5aKe5YqgMe+8jOacgOWkp+aVsOmHj+mZkOWItuWcqDTkuKpcclxuICAgICAgICAgICAgdGhpcy5zaG9vdE51bSA9IE1hdGgubWluKE1hdGguZmxvb3IodGhpcy5idWxsZXRMZXZlbCAvIDIpICsgMSw0KTtcclxuICAgICAgICAgICAgLy/lrZDlvLnnuqfliKvotorpq5jvvIzlj5HlsITpopHnjofotorlv6tcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gMzAwIC0gOCAqICh0aGlzLmJ1bGxldExldmVsID4gOCA/IDggOiB0aGlzLmJ1bGxldExldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwcm9wLnByb3BUeXBlPT0yKS8v5ZCD6KGAXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+ihgOmHj+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmhwKz0yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mBk+WFt+atu+S6oVxyXG4gICAgICAgIHByb3AuaHA9MDtcclxuICAgICAgICAvL+mBk+WFt+WQg+WujOWQjua2iOWkse+8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHByb3AudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDmm7TmlrBcclxuICAgICAqL1x0XHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Li76KeS6L6555WM5qOA5p+lXHJcbiAgICAgICAgLy/pnIDlh4/ljrvop5LoibLlrr3miJbpq5jnmoTkuIDljYrvvIzlm6DkuLrlnKhJREXkuK3liLbkvZzliqjnlLvml7bvvIzmiJHku6zmiorop5LoibLnmoTkuK3lv4PlgZrkuLrkuobop5LoibLlr7nosaHnmoTljp/ngrlcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuW3puWPs+i2heWHulxyXG4gICAgICAgIGlmKHRoaXMueDx0aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueD10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLng+NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54PTcyMC10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbkuIrkuIvotoXlh7pcclxuICAgICAgICBpZih0aGlzLnk8dGhpcy5yb2xlQW5pLmhlaWdodC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy55PXRoaXMucm9sZUFuaS5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnk+MTI4MC10aGlzLnJvbGVBbmkuaGVpZ2h0LzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnk9MTI4MC10aGlzLnJvbGVBbmkuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gTGF5YS5Ccm93c2VyLm5vdygpIDtcclxuICAgICAgICAvL+WmguaenOW9k+WJjeaXtumXtOWkp+S6juS4i+asoeWwhOWHu+aXtumXtFxyXG4gICAgICAgIGlmICh0aW1lID50aGlzLnNob290VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Y+R5bCE5a2Q5by555qE5L2N572u5pWw57uEXHJcbiAgICAgICAgICAgIGxldCBwb3M6bnVtYmVyW10gPSB0aGlzLmJ1bGxldFBvc1t0aGlzLnNob290TnVtLTFdXHJcbiAgICAgICAgICAgIGZvcihsZXQgaTpudW1iZXIgPSAwIDsgaTxwb3MubGVuZ3RoIDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+abtOaWsOS4i+asoeWtkOW8ueWwhOWHu+eahOaXtumXtFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aW1lICsgdGhpcy5zaG9vdEludGVydmFsIDsgXHJcbiAgICAgICAgICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldDogQnVsbGV0ID0gUm9sZUZhY3RvcnkuR2V0Um9sZShcImJ1bGxldDJcIik7XHJcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQyXCIsMSwtMTAsMSx0aGlzLmNhbXApXHJcbiAgICAgICAgICAgICAgICAvL+WtkOW8uea2iOWkseWQjuS8muS4jeaYvuekuu+8jOmHjeaWsOWIneWni+WMllxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8v6K6+572u5a2Q5by55Y+R5bCE5Yid5aeL5YyW5L2N572uXHJcbiAgICAgICAgICAgICAgICBidWxsZXQucG9zKHRoaXMueCtwb3NbaV0sIHRoaXMueS04MCk7XHJcbiAgICAgICAgICAgICAgICAvL+aXi+i9rOinkuW6plxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5Yiw6KeS6Imy5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgLy/mt7vliqDlrZDlvLnpn7PmlYhcdFx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9idWxsZXQubXAzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBBbmltYXRpb24gPSBMYXlhLkFuaW1hdGlvbjtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdC8qKirpo57mnLrnmoTnsbvlnosgICDigJxoZXJv4oCdOueOqeWutumjnuacuu+8jOKAnGVuZW154oCd77ya5pWM5Lq66aOe5py644CB4oCcYnVsbGXigJ3vvJrlrZDlvLnjgIFcInVmb1wiOumBk+WFtyoqKiovXHJcbiAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XHJcbiAgICAvKioq6aOe5py655qE6KGA6YePKioqL1xyXG4gICAgcHVibGljIGhwOm51bWJlcj0wOyBcclxuICAgIC8qKirpo57mnLrnmoTpgJ/luqYqKiovXHJcbiAgICBwcm90ZWN0ZWQgc3BlZWQ6bnVtYmVyPTA7XHRcclxuICAgIFxyXG4gICAgLyoqKumjnuacuueahOiiq+aUu+WHu+WNiuW+hCoqKi9cclxuICAgIHB1YmxpYyBoaXRSYWRpdXM6bnVtYmVyO1xyXG4gICAgLyoqKumjnuacuueahOmYteiQpe+8iOaVjOaIkeWMuuWIq++8iSoqKi9cclxuICAgIHB1YmxpYyBjYW1wOm51bWJlcjtcclxuICAgIFxyXG4gICAgLyoqKuinkuiJsueahOWKqOeUu+i1hOa6kCoqKi9cclxuICAgIHByb3RlY3RlZCByb2xlQW5pOkFuaW1hdGlvbjtcclxuICAgIC8qKirlvZPliY3liqjnlLvliqjkvZwqKiovXHJcbiAgICBwcm90ZWN0ZWQgYWN0aW9uOnN0cmluZztcclxuICAgIFxyXG4gICAgLyoqKuWwhOWHu+mXtOmalCoqKi9cclxuICAgIHB1YmxpYyBzaG9vdEludGVydmFsOiBudW1iZXI9IDMwMDtcclxuICAgIC8qKirkuIvmrKHlsITlh7vml7bpl7QqKiovXHJcbiAgICBwdWJsaWMgc2hvb3RUaW1lOiBudW1iZXI9IDMwMDtcclxuICAgIFxyXG4gICAgLyoqKirpgZPlhbfnsbvlnosgMDrpo57mnLrmiJblrZDlvLnvvIwxOuWtkOW8ueeuse+8jDI66KGA55O2KioqL1xyXG4gICAgcHVibGljIHByb3BUeXBlOm51bWJlcj0wO1xyXG4gICAgLyoqKuWtkOW8uee6p+WIq++8iOWQg+WtkOW8uemBk+WFt+WQjuWNh+e6p++8iSoqKi9cclxuICAgIHB1YmxpYyBidWxsZXRMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIC8qKirlkIzml7blsITlh7vlrZDlvLnmlbDph48qKiovXHJcbiAgICBwdWJsaWMgc2hvb3ROdW06IG51bWJlcj0gMTtcclxuICAgIC8qKirlrZDlvLnlgY/np7vnmoTkvY3nva4qKiovXHJcbiAgICBwcm90ZWN0ZWQgYnVsbGV0UG9zOiBudW1iZXJbXVtdID0gW1swXSwgWy0xNSwgMTVdLCBbLTMwLCAwLCAzMF0sIFstNDUsIC0xNSwgMTUsIDQ1XV07XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgIC8v5a6e5L6L5YyW5Yqo55S7XHJcbiAgICAgICAgIHRoaXMucm9sZUFuaT1uZXcgQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgIC8v5Yqg6L29SURF57yW6L6R55qE5Yqo55S75paH5Lu2XHJcbiAgICAgICAgIHRoaXMucm9sZUFuaS5sb2FkQW5pbWF0aW9uKFwiR2FtZVJvbGUuYW5pXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAg6KeS6Imy57G75Z6LIC0tLeKAnGhlcm/igJ06546p5a626aOe5py677yM4oCcZW5lbXkxLTPigJ3vvJrmlYzkurrpo57mnLrjgIHigJxidWxsZToxLTLigJ3vvJrlrZDlvLnjgIFcInVmbzEtMlwiOumBk+WFt1xyXG4gICAgICogQHBhcmFtIGhwICAgICAg6KGA6YePXHJcbiAgICAgKiBAcGFyYW0gc3BlZWQgICDpgJ/luqZcclxuICAgICAqIEBwYXJhbSBoaXRSYWRpdXMgICDnorDmkp7ljYrlvoRcclxuICAgICAqIEBwYXJhbSBjYW1wICAgIOmYteiQpVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGluaXQodHlwZTpzdHJpbmcsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixoaXRSYWRpdXM6bnVtYmVyLGNhbXA6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/op5LoibLliJ3lp4vljJblsZ7mgKdcclxuICAgICAgICB0aGlzLnR5cGU9dHlwZTtcclxuICAgICAgICB0aGlzLmhwPWhwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQ9c3BlZWQ7XHJcbiAgICAgICAgdGhpcy5oaXRSYWRpdXM9aGl0UmFkaXVzO1xyXG4gICAgICAgIHRoaXMuY2FtcD1jYW1wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6YGT5YW35bGe5oCn5Yid5aeL5Li6MFxyXG4gICAgICAgIHRoaXMucHJvcFR5cGU9MDtcclxuICAgICAgICAvL+WKoOi9veWKqOeUu+WvueixoVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5yb2xlQW5pKVxyXG4gICAgICAgIC8v55uR5ZCs5Yqo55S75a6M5oiQ5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLm9uKEV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKVxyXG4gICAgICAgIC8v5pKt5pS+6buY6K6k6aOe6KGM5Yqo55S7XHJcbiAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLov5jmnKrmnInlrr3vvIzojrflvpfop5LoibLlrr3pq5hcdFxyXG4gICAgICAgIGlmKHRoaXMucm9sZUFuaS53aWR0aD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Yqo55S755+p5b2i6L6555WMXHJcbiAgICAgICAgICAgIHZhciBib3VuZHM6TGF5YS5SZWN0YW5nbGU9dGhpcy5yb2xlQW5pLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICAvL+inkuiJsiDlrr3pq5jotYvlgLxcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pLnNpemUoYm91bmRzLndpZHRoLGJvdW5kcy5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7liqjnlLsgXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uIOWKqOeUu+eKtuaAgSAgIFwiZmx5XCLjgIFcImhpdFwi44CBXCJkaWVcIlxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBwbGF5QWN0aW9uKGFjdGlvbjpzdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGlvbj1hY3Rpb247XHJcbiAgICAgICAgLy/mkq3mlL7op5LoibLliqjnlLssbmFtZT3op5LoibLnsbvlnotf5Yqo55S754q25oCB77yM5aaC77yaaGVyb19mbHlcclxuICAgICAgICB0aGlzLnJvbGVBbmkucGxheSgwLHRydWUsdGhpcy50eXBlK1wiX1wiK2FjdGlvbik7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLpmpDol4/vvIzop5LoibLmtojkuqHlubblm57mlLZcclxuICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kaWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/op5LoibLmoLnmja7pgJ/luqbpo57ooYxcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgLy/lpoLmnpznp7vliqjliLDmmL7npLrljLrln5/ku6XlpJbvvIzliJnnp7vpmaRcclxuICAgICAgICBpZiAodGhpcy55ID4gMTI4MCsxMDB8fHRoaXMueTwtMTUwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDop5LoibLlsITlh7vvvIznlJ/miJDlrZDlvLlcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBzaG9vdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKirop5LoibLmrbvkuqHlubblm57mlLbliLDlr7nosaHmsaAqKi9cclxuICAgIHB1YmxpYyBkaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/op5LoibLliqjnlLvlgZzmraJcclxuICAgICAgICB0aGlzLnJvbGVBbmkuc3RvcCgpOyBcclxuICAgICAgICAvL+WOu+mZpOaJgOacieWKqOeUu+ebkeWQrFxyXG4gICAgICAgIHRoaXMucm9sZUFuaS5vZmZBbGwoKTtcclxuICAgICAgICAvL+S7juiInuWPsOenu+mZpFxyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIC8v5Zue5pS25Yiw5rGgXHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIodGhpcy50eXBlLCB0aGlzKTtcclxuICAgIH1cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IEhlcm8gZnJvbSBcIi4vSGVyb1wiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEVuZW15XzEgZnJvbSBcIi4vRW5lbXlfMVwiO1xyXG5pbXBvcnQgRW5lbXlfMiBmcm9tIFwiLi9FbmVteV8yXCI7XHJcbmltcG9ydCBFbmVteV8zIGZyb20gXCIuL0VuZW15XzNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGVGYWN0b3J5XHJcbntcclxuICAgIHB1YmxpYyBzdGF0aWMgR2V0Um9sZSh0eXBlOnN0cmluZyk6Um9sZVxyXG4gICAge1xyXG4gICAgICAgIGxldCByb2xlOlJvbGUgPSBudWxsO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJoZXJvXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsSGVybyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImJ1bGxldDFcIjpcclxuICAgICAgICAgICAgY2FzZSBcImJ1bGxldDJcIjpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSxCdWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1Zm9cIjpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSx1Zm8pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlbmVteTFcIjpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSxFbmVteV8xKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZW5lbXkyXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsRW5lbXlfMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVuZW15M1wiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLEVuZW15XzMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsUm9sZSk7XHJcbiAgICAgICAgfSAgIFxyXG4gICAgICAgcmV0dXJuIHJvbGU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB1Zm8gZXh0ZW5kcyBSb2xlXHJcbntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+makOiXj++8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirop5LoibLmrbvkuqHlubblm57mlLbliLDlr7nosaHmsaAqKi9cclxuICAgIHB1YmxpYyBkaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuZGllKCk7XHJcbiAgICAgICAgLy/lm57mlLbliLDlr7nosaHmsaBcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcInVmb1wiLCB0aGlzKTtcclxuICAgIH1cclxuICAgICAgICAgICBcclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZUJnVUkgZXh0ZW5kcyBWaWV3IHtcclxuXHRcdHB1YmxpYyBiZzE6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgYmcyOkxheWEuSW1hZ2U7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdcIixcInByb3BzXCI6e1wid2lkdGhcIjo3MjAsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjEsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwidmFyXCI6XCJiZzFcIixcInNraW5cIjpcImJhY2tncm91bmQucG5nXCJ9LFwiY29tcElkXCI6Mn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOi0xMjgwLFwieFwiOjAsXCJ2YXJcIjpcImJnMlwiLFwic2tpblwiOlwiYmFja2dyb3VuZC5wbmdcIn0sXCJjb21wSWRcIjozfV0sXCJsb2FkTGlzdFwiOltcImJhY2tncm91bmQucG5nXCJdLFwibG9hZExpc3QzRFwiOltdLFwiY29tcG9uZW50c1wiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhHYW1lQmdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lT3ZlclVJIGV4dGVuZHMgRGlhbG9nIHtcclxuXHRcdHB1YmxpYyBhbmlfcmVzdGFydDpMYXlhLkZyYW1lQW5pbWF0aW9uO1xuXHRcdHB1YmxpYyB0eHRfc2NvcmU6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIGJ0bl9yZXN0YXJ0OkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dcIixcInByb3BzXCI6e1wid2lkdGhcIjo3MjAsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjEsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmcuanBnXCIsXCJzaXplR3JpZFwiOlwiNCw0LDQsNFwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6Mzc4LFwieFwiOjIyOSxcInNraW5cIjpcImdhbWVVSS9nYW1lT3Zlci5wbmdcIn0sXCJjb21wSWRcIjozfSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoxMjAwLFwieFwiOjE5LFwid2lkdGhcIjo2ODEsXCJ0ZXh0XCI6XCJMYXlhQWlyMS43LjPlvJXmk47mlZnlrabmvJTnpLrniYhcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjoyNixcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiM3Yzc5NzlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo1fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjo1NzUsXCJ4XCI6MjQ0LFwid2lkdGhcIjoxNDQsXCJ0ZXh0XCI6XCLmnKzlsYDnp6/liIbvvJpcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiM3Yzc5NzlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo2fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjo1NzUsXCJ4XCI6MzYzLFwid2lkdGhcIjoxMjgsXCJ2YXJcIjpcInR4dF9zY29yZVwiLFwidGV4dFwiOlwiMTIwMFwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjd9LHtcInR5cGVcIjpcIkJveFwiLFwicHJvcHNcIjp7XCJ5XCI6OTYwLFwieFwiOjIzOSxcInZhclwiOlwiYnRuX3Jlc3RhcnRcIn0sXCJjb21wSWRcIjoxMCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjoxLFwid2lkdGhcIjoyNDAsXCJzdGF0ZU51bVwiOjIsXCJza2luXCI6XCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwic2l6ZUdyaWRcIjpcIjEwLDEwLDEwLDEwXCIsXCJoZWlnaHRcIjo4MH0sXCJjb21wSWRcIjoxMX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE4LFwieFwiOjQxLFwic2tpblwiOlwiZ2FtZVVJL3Jlc3RhcnQucG5nXCJ9LFwiY29tcElkXCI6MTJ9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwiYW5pbWF0aW9uc1wiOlt7XCJub2Rlc1wiOlt7XCJ0YXJnZXRcIjoxMCxcImtleWZyYW1lc1wiOntcInlcIjpbe1widmFsdWVcIjo5NzAsXCJ0d2Vlbk1ldGhvZFwiOlwiZWxhc3RpY091dFwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MTAsXCJrZXlcIjpcInlcIixcImluZGV4XCI6MH0se1widmFsdWVcIjo5NjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MTAsXCJrZXlcIjpcInlcIixcImluZGV4XCI6OH1dfX1dLFwibmFtZVwiOlwiYW5pX3Jlc3RhcnRcIixcImlkXCI6MSxcImZyYW1lUmF0ZVwiOjI0LFwiYWN0aW9uXCI6MH1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmcuanBnXCIsXCJnYW1lVUkvZ2FtZU92ZXIucG5nXCIsXCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwiZ2FtZVVJL3Jlc3RhcnQucG5nXCJdLFwibG9hZExpc3QzRFwiOltdLFwiY29tcG9uZW50c1wiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhHYW1lT3ZlclVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVQbGF5VUkgZXh0ZW5kcyBWaWV3IHtcclxuXHRcdHB1YmxpYyBidG5fcGF1c2U6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIHR4dF9ocDpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgdHh0X2xldmVsOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyB0eHRfc2NvcmU6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIGdhbWVQYXVzZTpMYXlhLkJveDtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoyMCxcInhcIjoxMCxcIndpZHRoXCI6NzAwLFwic2tpblwiOlwiZ2FtZVVJL2JsYW5rLnBuZ1wiLFwiaGVpZ2h0XCI6NDV9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjoyMSxcInhcIjo2MTgsXCJ2YXJcIjpcImJ0bl9wYXVzZVwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9wYXVzZS5wbmdcIn0sXCJjb21wSWRcIjo2fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjo0MSxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfaHBcIixcInRleHRcIjpcIkhQ77yaXCIsXCJoZWlnaHRcIjo0MCxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImxlZnRcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6OH0se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6MjQsXCJ4XCI6MjI4LFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9sZXZlbFwiLFwidGV4dFwiOlwibGV2ZWzvvJpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo5fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjo0MTUsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X3Njb3JlXCIsXCJ0ZXh0XCI6XCJTY29yZTpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjoxMH0se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInZpc2libGVcIjpmYWxzZSxcInZhclwiOlwiZ2FtZVBhdXNlXCIsXCJoZWlnaHRcIjoxMjgwLFwiYWxwaGFcIjoxfSxcImNvbXBJZFwiOjEzLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwic2tpblwiOlwiZ2FtZVVJL2JsYW5rLnBuZ1wiLFwic2l6ZUdyaWRcIjpcIjIsMiwyLDJcIixcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MTV9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo0MTEsXCJ4XCI6MTEwLFwid2lkdGhcIjo1MDAsXCJ2aXNpYmxlXCI6dHJ1ZSxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCIxMCwxMCwxMCwxMFwiLFwiaGVpZ2h0XCI6NTAwfSxcImNvbXBJZFwiOjEyfSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjo4MDEsXCJ4XCI6MTkwLFwid2lkdGhcIjozNDAsXCJ0ZXh0XCI6XCLngrnlh7vku7vmhI/kvY3nva7nu6fnu63muLjmiI9cIixcImhlaWdodFwiOjQ0LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiMyMzIyMjJcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjoxNH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQ2OCxcInhcIjoyMTQsXCJza2luXCI6XCJnYW1lVUkvZ2FtZVBhdXNlLnBuZ1wifSxcImNvbXBJZFwiOjE2fV0sXCJjb21wb25lbnRzXCI6W119XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JsYW5rLnBuZ1wiLFwiZ2FtZVVJL2J0bl9wYXVzZS5wbmdcIixcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9nYW1lUGF1c2UucG5nXCJdLFwibG9hZExpc3QzRFwiOltdLFwiY29tcG9uZW50c1wiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhHYW1lUGxheVVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVTdGFydFVJIGV4dGVuZHMgRGlhbG9nIHtcclxuXHRcdHB1YmxpYyB0eHRfbG9hZDpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgYnRuX3N0YXJ0OkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dcIixcInByb3BzXCI6e1wid2lkdGhcIjo3MjAsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjEsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmcuanBnXCIsXCJzaXplR3JpZFwiOlwiNCw0LDQsNFwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6Mzc4LFwieFwiOjE3OSxcInNraW5cIjpcImdhbWVVSS9sb2dvLnBuZ1wifSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU4NyxcInhcIjoyMCxcIndpZHRoXCI6NjgxLFwidmFyXCI6XCJ0eHRfbG9hZFwiLFwidGV4dFwiOlwi5ri45oiP6LWE5rqQ5Yqg6L296L+b5bqmXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjMWMxYzFjXCIsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjR9LHtcInR5cGVcIjpcIkJveFwiLFwicHJvcHNcIjp7XCJ5XCI6OTYwLFwieFwiOjI0MCxcInZpc2libGVcIjp0cnVlLFwidmFyXCI6XCJidG5fc3RhcnRcIn0sXCJjb21wSWRcIjoxMCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjoyNDAsXCJ2aXNpYmxlXCI6dHJ1ZSxcInN0YXRlTnVtXCI6MixcInNraW5cIjpcImdhbWVVSS9idG5fYmcucG5nXCIsXCJzaXplR3JpZFwiOlwiMjAsMjAsMjAsMjBcIixcImhlaWdodFwiOjgwfSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxOSxcInhcIjo0MSxcInNraW5cIjpcImdhbWVVSS9zdGFydC5wbmdcIn0sXCJjb21wSWRcIjoxMX1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9sb2dvLnBuZ1wiLFwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcImdhbWVVSS9zdGFydC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVTdGFydFVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHIiXX0=
