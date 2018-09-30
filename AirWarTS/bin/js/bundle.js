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
var RoleState;
(function (RoleState) {
    RoleState[RoleState["Fly"] = 0] = "Fly";
    RoleState[RoleState["Invincible"] = 1] = "Invincible"; //无敌
})(RoleState = exports.RoleState || (exports.RoleState = {}));
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
var GameConstTs = require("./GameConst");
var RoleState = GameConstTs.RoleState;
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
            //无敌状态
            if (role.state == RoleState.Invincible)
                continue;
            //碰撞检测
            for (var j = i - 1; j > -1; j--) { //获取第二个角色
                var role1 = this.roleLayer.getChildAt(j);
                //无敌状态
                if (role1.state == RoleState.Invincible)
                    continue;
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
        //是否向左边移动
        _this.isMoveLeft = true;
        _this.tickTime = 0;
        _this.isMoveLeft = Math.random() < 0.5;
        return _this;
    }
    Enemy_1.prototype.update = function () {
        //获取当前时间
        var time = Laya.Browser.now();
        //位移时间
        if (time > this.tickTime) {
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
var GameConstTs = require("../GameConst");
var RoleState = GameConstTs.RoleState;
//角色
var Hero = /** @class */ (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /***子弹偏移的位置***/
        _this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
        _this.playCount = 0;
        return _this;
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
            this.changeState(RoleState.Invincible);
        }
        else {
            //添加死亡动画
            this.playAction("die");
            //添加死亡音效
            Laya.SoundManager.playSound("sound/game_over.mp3");
        }
    };
    /**
     *  状态改变
     */
    Hero.prototype.changeState = function (state) {
        this.state = state;
        //无敌状态
        if (this.state == RoleState.Invincible) {
            this.playCount = 0;
            this.playAlphaTween();
        }
    };
    Hero.prototype.playAlphaTween = function () {
        var _this = this;
        //缓动类
        var tween = Laya.Tween.to(this, { alpha: 0.3 }, 300, Laya.Ease.backInOut, Laya.Handler.create(this, function () {
            _this.playCount++;
            _this.alpha = 1;
            if (_this.playCount >= 3) {
                _this.resetState();
            }
            else {
                _this.playAlphaTween();
            }
        }));
    };
    //恢复状态
    Hero.prototype.resetState = function () {
        this.changeState(RoleState.Fly);
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
},{"../GameConst":2,"./Role":14,"./RoleFactory":15}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = Laya.Animation;
var Event = laya.events.Event;
var GameConstTs = require("../GameConst");
var RoleState = GameConstTs.RoleState;
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
        //飞机当前状态
        _this.state = RoleState.Fly;
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
},{"../GameConst":2}],15:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRW5lbXlNYW5hZ2VyLnRzIiwic3JjL0dhbWVDb25zdC50cyIsInNyYy9HYW1lTWFwLnRzIiwic3JjL0dhbWVPdmVyLnRzIiwic3JjL0dhbWVQbGF5LnRzIiwic3JjL0dhbWVTdGFydC50cyIsInNyYy9NYWluLnRzIiwic3JjL1JvbGUvQnVsbGV0LnRzIiwic3JjL1JvbGUvRW5lbXkudHMiLCJzcmMvUm9sZS9FbmVteV8xLnRzIiwic3JjL1JvbGUvRW5lbXlfMi50cyIsInNyYy9Sb2xlL0VuZW15XzMudHMiLCJzcmMvUm9sZS9IZXJvLnRzIiwic3JjL1JvbGUvUm9sZS50cyIsInNyYy9Sb2xlL1JvbGVGYWN0b3J5LnRzIiwic3JjL1JvbGUvdWZvLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNMQSx5Q0FBb0M7QUFDcEMsa0RBQTZDO0FBRTdDO0lBSUksc0JBQVksSUFBUztRQUVqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU0sZ0NBQVMsR0FBaEI7UUFFSSxRQUFRO1FBQ2QsbUJBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLFFBQVE7UUFDUixtQkFBUyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDdEIsU0FBUztRQUNULG1CQUFTLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNuQixZQUFZO1FBQ1osbUJBQVMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLGFBQWE7UUFDYixtQkFBUyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVKLFFBQVE7SUFDRCxzQ0FBZSxHQUF0QjtR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QyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxxQkFBcUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLHFCQUFxQixFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsYUFBYSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsbUJBQW1CLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLG9CQUFvQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsV0FBVyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxhQUFhLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxXQUFXLEVBQUMsRUFBRSxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGVBQWUsRUFBQyxxQkFBcUIsRUFBQyxtQkFBbUIsRUFBQyxvQkFBb0IsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1FBTXJvRCxpQkFBQztLQVZELEFBVUMsQ0FWK0IsTUFBTSxHQVVyQztJQVZZLGFBQVUsYUFVdEIsQ0FBQTtJQUNEO1FBQWdDLDhCQUFJO1FBT2hDO21CQUFlLGlCQUFPO1FBQUEsQ0FBQztRQUN2QixtQ0FBYyxHQUFkO1lBQ0ksaUJBQU0sY0FBYyxXQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUxjLGlCQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxHQUFHLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsa0JBQWtCLEVBQUMsc0JBQXNCLEVBQUMsZUFBZSxFQUFDLHNCQUFzQixDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFNdHNELGlCQUFDO0tBWkQsQUFZQyxDQVorQixJQUFJLEdBWW5DO0lBWlksYUFBVSxhQVl0QixDQUFBO0lBQ0Q7UUFBaUMsK0JBQU07UUFJbkM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG9DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QyxDQUFDO1FBTGMsa0JBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxlQUFlLEVBQUMsaUJBQWlCLEVBQUMsbUJBQW1CLEVBQUMsa0JBQWtCLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztRQU0vOEIsa0JBQUM7S0FURCxBQVNDLENBVGdDLE1BQU0sR0FTdEM7SUFUWSxjQUFXLGNBU3ZCLENBQUE7QUFDTCxDQUFDLEVBN0NhLEVBQUUsR0FBRixVQUFFLEtBQUYsVUFBRSxRQTZDZiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcclxuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcbihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgTWFpbiBmcm9tIFwiLi9NYWluXCI7XHJcbmltcG9ydCBSb2xlXHRmcm9tIFwiLi9Sb2xlL1JvbGVcIjtcclxuaW1wb3J0IEhlcm9cdGZyb20gXCIuL1JvbGUvSGVyb1wiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vUm9sZS9FbmVteVwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL1JvbGUvQnVsbGV0XCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlL1JvbGVGYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteU1hbmFnZXJcclxue1xyXG4gICAgcHJpdmF0ZSBNYWluOk1haW47XHJcblxyXG4gICAgY29uc3RydWN0b3IobWFpbjpNYWluKSBcclxuXHR7XHJcbiAgICAgICAgdGhpcy5NYWluID0gbWFpbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgUmVzZXRJbmZvKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5pWM5Lq65Yi35paw5Yqg6YCfXHJcblx0XHRHYW1lQ29uc3QuY3JlYXRlVGltZSA9IDA7XHJcblx0XHQvL+aVjOS6uumAn+W6puaPkOWNh1xyXG5cdFx0R2FtZUNvbnN0LnNwZWVkVXAgPSAwO1xyXG5cdFx0Ly/mlYzkurrooYDph4/mj5DljYdcdFxyXG5cdFx0R2FtZUNvbnN0LmhwVXAgPSAwO1xyXG5cdFx0Ly/mlYzkurrmlbDph4/mj5DljYdcdFx0XHRcdFxyXG5cdFx0R2FtZUNvbnN0Lm51bVVwID0gMDtcclxuXHRcdC8v5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePXHJcblx0XHRHYW1lQ29uc3QubGV2ZWxVcFNjb3JlID0gMTA7XHRcdFxyXG4gICAgfVxyXG5cclxuXHQvL+eUn+aIkOaVjOaWuemjnuaculxyXG5cdHB1YmxpYyBsb29wQ3JlYXRlRW5lbXkoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/liJvlu7rmlYzmnLrvvIzliqDlhaXlhbPljaHljYfnuqfmlbDmja7vvIzmj5Dpq5jpmr7luqZcclxuXHRcdC8v55Sf5oiQ5bCP6aOe5py6XHJcblx0XHRpZiAoTGF5YS50aW1lci5jdXJyRnJhbWUgJSAoODAgLSBHYW1lQ29uc3QuY3JlYXRlVGltZSkgPT0wKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDAsIEdhbWVDb25zdC5ocHNbMF0sR2FtZUNvbnN0LnNwZWVkc1swXSArIEdhbWVDb25zdC5zcGVlZFVwICwgR2FtZUNvbnN0Lm51bXNbMF0gKyBHYW1lQ29uc3QubnVtVXApO1xyXG5cdFx0fVxyXG5cdFx0Ly/nlJ/miJDkuK3lnovpo57mnLpcclxuXHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICg1MDAgLSBHYW1lQ29uc3QuY3JlYXRlVGltZSAqIDIpID09IDApIFxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDEsIEdhbWVDb25zdC5ocHNbMV0gK0dhbWVDb25zdC5ocFVwICogMixHYW1lQ29uc3Quc3BlZWRzWzFdICsgR2FtZUNvbnN0LnNwZWVkVXAgLCBHYW1lQ29uc3QubnVtc1sxXSArIEdhbWVDb25zdC5udW1VcCk7XHJcblx0XHR9XHJcblx0XHQvL+eUn+aIkGJvc3NcclxuXHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICg1MDAgLSBHYW1lQ29uc3QuY3JlYXRlVGltZSAqIDMpID09IDApIFxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDIsIEdhbWVDb25zdC5ocHNbMl0gKyBHYW1lQ29uc3QuaHBVcCAqIDYsR2FtZUNvbnN0LnNwZWVkc1syXSwgR2FtZUNvbnN0Lm51bXNbMl0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIOWIm+W7uuaVjOS6ulxyXG5cdCAqIEBwYXJhbSBpbmRleCBcdOaVjOS6uue8luWPt1xyXG5cdCAqIEBwYXJhbSBocCAgIFx0XHQg5pWM5Lq66KGA6YePXHJcblx0ICogQHBhcmFtIHNwZWVkXHRcdOaVjOS6uumAn+W6plxyXG5cdCAqIEBwYXJhbSBudW1cdFx05pWM5Lq65pWw6YePXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjcmVhdGVFbmVteShpbmRleDpudW1iZXIsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixudW06bnVtYmVyKTp2b2lkIFxyXG5cdHtcclxuXHRcdGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBudW07IGkrKylcclxuXHRcdHtcclxuXHRcdFx0bGV0IGVuZW15VHlwZSA9IFwiZW5lbXlcIiArIChpbmRleCsxKTtcclxuXHRcdFx0Ly/liJvlu7rmlYzkurrvvIzku47lr7nosaHmsaDliJvlu7pcclxuXHRcdFx0bGV0IGVuZW15OkVuZW15ID0gUm9sZUZhY3RvcnkuR2V0Um9sZShlbmVteVR5cGUpIGFzIEVuZW15O1xyXG5cdFx0XHQvL+WIneWni+WMluaVjOS6ulxyXG5cdFx0XHRlbmVteS5pbml0KGVuZW15VHlwZSwgaHAsIHNwZWVkLEdhbWVDb25zdC5yYWRpdXNbaW5kZXhdLDEpO1xyXG5cdFx0XHQvL+S7juWvueixoeaxoOS4reWIm+W7uueahOWvueixoeatu+S6oeWJjeiiq+makOiXj+S6hu+8jOWboOatpOimgemHjeaWsOWIneWni+WMluaYvuekuu+8jOWQpuWImeaWsOWIm+W7uuinkuiJsuS4jeS8muaYvuekuuWHuuadpVxyXG5cdFx0XHRlbmVteS52aXNpYmxlID0gdHJ1ZTtcclxuXHRcdFx0Ly/pmo/mnLrkvY3nva5cclxuXHRcdFx0ZW5lbXkucG9zKE1hdGgucmFuZG9tKCkgKig3MjAtODApKzUwLCAtTWF0aC5yYW5kb20oKSAqIDEwMCk7XHJcblx0XHRcdC8v5re75Yqg5Yiw6Iie5Y+w5LiKXHJcblx0XHRcdHRoaXMuTWFpbi5yb2xlTGF5ZXIuYWRkQ2hpbGQoZW5lbXkpO1xyXG5cdFx0fVxyXG5cdH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lQ29uc3Rcclxue1xyXG4gICAgLy/muLjmiI/lhbPljaHmj5DljYflsZ7mgKdcclxuXHQvKioq5pWM5Lq65Yi35paw5Yqg6YCfKioqKi9cclxuXHRwdWJsaWMgc3RhdGljIGNyZWF0ZVRpbWU6bnVtYmVyID0gMDtcclxuXHQvKioq5pWM5Lq66YCf5bqm5o+Q5Y2HKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgc3BlZWRVcDpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrooYDph4/mj5DljYcqKiovXHRcdFxyXG5cdHB1YmxpYyBzdGF0aWMgaHBVcDpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrmlbDph4/mj5DljYcqKiovXHRcdFx0XHRcdFxyXG5cdHB1YmxpYyBzdGF0aWMgbnVtVXA6bnVtYmVyID0gMDtcclxuXHQvKioqKuWNh+e6p+etiee6p+aJgOmcgOeahOaIkOe7qeaVsOmHjyoqKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGV2ZWxVcFNjb3JlOiBudW1iZXIgPSAxMDtcclxuXHJcblx0LyoqKirmlYzmnLrooYDph4/ooagqKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgaHBzOiBudW1iZXJbXSA9IFsxLCA3LCAxNV07XHJcblx0LyoqKuaVjOacuueUn+aIkOaVsOmHj+ihqCoqL1xyXG5cdHB1YmxpYyBzdGF0aWMgbnVtczogbnVtYmVyW10gPSBbMSwgMSwgMV07XHJcblx0LyoqKuaVjOacuumAn+W6puihqCoqKi9cclxuXHRwdWJsaWMgc3RhdGljIHNwZWVkczogIG51bWJlcltdID0gWzIsIDEsIDAuM107XHJcblx0LyoqKuaVjOacuuiiq+WHu+WNiuW+hOihqCoqKi9cclxuXHRwdWJsaWMgc3RhdGljIHJhZGl1czogIG51bWJlcltdID0gWzIwLCAzNSwgODBdO1xyXG4gICAgXHJcblx0Lyoq5ri45oiP5YWz5Y2h5pWwKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgbGV2ZWw6bnVtYmVyID0gMTtcclxuXHQvKirnjqnlrrblvpfliIYqKiovXHJcblx0cHVibGljIHN0YXRpYyBzY29yZTpudW1iZXIgPSAwO1xyXG59XHJcblxyXG5leHBvcnQgZW51bSBSb2xlU3RhdGVcclxue1xyXG4gICAgRmx5LCAgICAgICAgLy/po57ooYznirbmgIFcclxuICAgIEludmluY2libGUgIC8v5peg5pWMXHJcbn1cclxuIiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP6IOM5pmv55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFwIGV4dGVuZHMgdWkuR2FtZUJnVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDmuLjmiI/og4zmma/np7vliqjmm7TmlrBcclxuICAgICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGVNYXAoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy55Kz0xO1xyXG4gICAgICAgIC8v5aaC5p6c6IOM5pmv5Zu+5Yiw5LqG5LiL6Z2i5LiN5Y+v6KeB77yM56uL5Y2z6LCD5pW05L2N572u5Yiw5LiK6Z2i5b6q546v5pi+56S6XHJcbiAgICAgICAgLy/muLjmiI/oiJ7lj7Dpq5jkuLoxMjgwXHJcbiAgICAgICAgaWYgKHRoaXMuYmcxLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgdGhpcy5iZzEueSAtPSAxMjgwICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYmcyLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJnMi55IC09IDEyODAgKiAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPdmVyIGV4dGVuZHMgdWkuR2FtZU92ZXJVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFx0Ly9cIumHjeaWsOW8gOWni1wi5oyJ6ZKu6byg5qCH5LqL5Lu2XHJcblx0XHRcdHRoaXMuYnRuX3Jlc3RhcnQub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vblJlc3RhcnQpO1xyXG4gICAgfVxyXG5cdC8qKlxyXG5cdFx05ri45oiP6YeN5paw5byA5aeLXHJcblx0XHQgKi9cdFx0XHJcblx0XHRwcml2YXRlIG9uUmVzdGFydCgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mkq3mlL5JREXkuK3nvJbovpHnmoTmjInpkq7liqjnlLtcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5wbGF5KDAsZmFsc2UpO1xyXG5cdFx0XHQvL+ebkeWQrOWKqOeUu+WujOaIkOS6i+S7tu+8jOazqOaEj+eUqG9uY2VcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLkFuaUNvbXBsZXRlKTtcclxuXHRcdH1cclxuXHRcdC8qKlxyXG5cdFx0IOaMiemSruWKqOeUu+aSreaUvuWujOaIkFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIEFuaUNvbXBsZXRlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+WPkemAgemHjeaWsOW8gOWni+S6i+S7tu+8jOWcqE1haW7nsbvkuK3nm5HlkKxcclxuXHRcdFx0dGhpcy5ldmVudChcInJlU3RhcnRcIilcclxuXHRcdFx0Ly/nvJPliqjliqjnlLvlhbPpl63mlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdFx0dGhpcy5jbG9zZSgpO1xyXG5cdFx0fVxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBsYXkgZXh0ZW5kcyB1aS5HYW1lUGxheVVJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy/nm5HlkKzmmoLlgZzmjInpkq7kuovku7ZcclxuICAgICAgICB0aGlzLmJ0bl9wYXVzZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uUGF1c2UpXHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdFx0IOa4uOaIj+aaguWBnFxyXG5cdFx0ICovXHRcclxuXHRcdHByaXZhdGUgb25QYXVzZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mmL7npLpJREXkuK3pmpDol4/nmoTmmoLlgZznlYzpnaJcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2UudmlzaWJsZT10cnVlO1xyXG5cdFx0XHQvL+aaguWBnOeVjOmdouWKoOeCueWHu+ebkeWQrO+8iOS4gOasoe+8iVxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS5vbmNlKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25Db250aW51ZSlcclxuXHRcdFx0XHRcclxuXHRcdFx0Ly/ml7bpl7Tlr7nosaHnvKnmlL7kuLow5bCx5piv5YGc5q2iXHJcblx0XHRcdExheWEudGltZXIuc2NhbGU9MDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQg5ri45oiP57un57utXHJcblx0XHQgKi9cdFxyXG5cdFx0cHJpdmF0ZSBvbkNvbnRpbnVlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aXtumXtOWvueixoee8qeaUvuS4ujHlsLHmmK/mraPluLjpgJ/luqbmkq3mlL5cclxuXHRcdFx0TGF5YS50aW1lci5zY2FsZT0xO1xyXG5cdFx0XHQvL+makOiXj+aaguWBnOeVjOmdolxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS52aXNpYmxlPWZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKioqKuacrOWxgOa4uOaIj+aVsOaNrlVJ5pu05pawKioqL1xyXG5cdFx0cHVibGljIHVwZGF0ZShocDpudW1iZXIsbGV2ZWw6bnVtYmVyLHNjb3JlOm51bWJlcik6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+inkuiJsuihgOmHj+abtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9ocC50ZXh0PVwiSFA6XCIraHA7XHJcblx0XHRcdC8v5YWz5Y2h562J57qn5pu05pawXHJcblx0XHRcdHRoaXMudHh0X2xldmVsLnRleHQ9XCJMRVZFTDpcIitsZXZlbDtcclxuXHRcdFx0Ly/muLjmiI/liIbmlbDmm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfc2NvcmUudGV4dD1cIlNDT1JFOlwiK3Njb3JlO1xyXG5cdFx0fVxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP5byA5aeL55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhcnQgZXh0ZW5kcyB1aS5HYW1lU3RhcnRVSVxyXG57XHJcbiAgICAvKioq5ri45oiP6LWE5rqQ5Zyw5Z2A5pWw57uEKioqL1xyXG4gICAgIHByaXZhdGUgYXNzZXRBcnI6YW55PVtcclxuICAgIHt1cmw6XCJyZXMvYXRsYXMvZ2FtZVJvbGUuYXRsYXNcIn1cclxuICAgICwge3VybDpcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvYnVsbGV0Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvZ2FtZV9vdmVyLm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvZW5lbXkxX2RpZS5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgICwge3VybDpcInNvdW5kL2VuZW15M19vdXQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICBdXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL+a4uOaIj+WKoOi9veacquWujOaIkOaaguaXtuS4jeaYvuekuu+8jOmYsuatoueCueWHu+WHuumUmVxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvL+ebkeWQrOeVjOmdouaYr+WQpuWFs+mXrVxyXG4gICAgICAgIHRoaXMub25jZShsYXlhLmV2ZW50cy5FdmVudC5DTE9TRSx0aGlzLHRoaXMub25DbG9zZSk7XHJcbiAgICAgICAgLy/liqDovb3liankvZnmuLjmiI/otYTmupDjgIHpn7PkuZDvvIzliqDovb3lrozmiJDkuI7liqDovb3ov5vluqblm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMuYXNzZXRBcnIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Db21wbGV0ZSksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Qcm9ncmVzcykpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/otYTmupDliqDovb3lrozmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICAgICAgdGhpcy50eHRfbG9hZC50ZXh0PVwi6LWE5rqQ5Yqg6L295a6M5oiQLOW8gOWni+a4uOaIj+WQpy4uLlwiO1xyXG4gICAgICAgIC8v5ri45oiP5byA5aeL5oyJ6ZKu5pi+56S65bm25by55Ye6XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIC8v57yT5Yqo57G75by55Ye65Yqo55S7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi5mcm9tKHRoaXMuYnRuX3N0YXJ0LHt5OnRoaXMuYnRuX3N0YXJ0LnkrMjB9LDEwMDAsTGF5YS5FYXNlLmVsYXN0aWNPdXQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+i1hOa6kOWKoOi9vei/m+W6plxyXG4gICAgICogQHBhcmFtIGxvYWROdW0gIOi/m+W6plxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUHJvZ3Jlc3MobG9hZE51bTpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+aYvuekuuWKoOi9vei/m+W6plxyXG4gICAgICAgIHRoaXMudHh0X2xvYWQudGV4dD1cIui1hOa6kOWKoOi9veS4re+8jOW9k+WJjei/m+W6pu+8mlwiK2xvYWROdW0qMTAwK1wiJVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6ZetXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DbG9zZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S7juiInuWPsOenu+mZpOiHquW3sVxyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIC8v5Y+q5Yqg6L295LiA5qyh77yM5Zug5q2k55u05o6l5raI5q+B6Ieq5bexXHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFdlYkdMID0gTGF5YS5XZWJHTDtcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZTtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBHYW1lU3RhcnQgZnJvbSBcIi4vR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCBHYW1lTWFwIGZyb20gXCIuL0dhbWVNYXBcIjtcclxuaW1wb3J0IEdhbWVQbGF5IGZyb20gXCIuL0dhbWVQbGF5XCI7XHJcbmltcG9ydCBHYW1lT3ZlciBmcm9tIFwiLi9HYW1lT3ZlclwiO1xyXG5pbXBvcnQgUm9sZVx0ZnJvbSBcIi4vUm9sZS9Sb2xlXCI7XHJcbmltcG9ydCBIZXJvXHRmcm9tIFwiLi9Sb2xlL0hlcm9cIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL1JvbGUvRW5lbXlcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9Sb2xlL0J1bGxldFwiO1xyXG5pbXBvcnQgRW5lbXlNYW5hZ2VyIGZyb20gXCIuL0VuZW15TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgUm9sZUZhY3RvcnkgZnJvbSBcIi4vUm9sZS9Sb2xlRmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0ICogYXMgR2FtZUNvbnN0VHMgZnJvbSBcIi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlU3RhdGUgPSBHYW1lQ29uc3RUcy5Sb2xlU3RhdGU7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYWluIFxyXG57XHJcblx0cHVibGljIHN0YXRpYyBpbnN0YW5jZTpNYWluO1xyXG5cdHB1YmxpYyBzdGF0aWMgR2V0SW5zdGFuY2UoKTpNYWluXHJcblx0e1xyXG5cdFx0aWYodGhpcy5pbnN0YW5jZSA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLmluc3RhbmNlID0gbmV3IE1haW4oKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuXHR9XHJcblxyXG5cdC8qKuW8gOWni+mhtemdoioqKi9cclxuXHRwdWJsaWMgc3RhcnQ6R2FtZVN0YXJ0O1xyXG5cdC8qKuWcsOWbvumhtemdoioqKi9cclxuXHRwdWJsaWMgbWFwOkdhbWVNYXA7XHJcblx0Lyoq5ri45oiP5Lit55WM6Z2iKioqL1xyXG5cdHB1YmxpYyBwbGF5OkdhbWVQbGF5O1xyXG5cdC8qKua4uOaIj+e7k+adn+mhtemdoioqKi9cclxuXHRwdWJsaWMgb3ZlcjpHYW1lT3ZlcjtcclxuXHJcblx0Ly/mlYzmlrnnlJ/miJDnrqHnkIZcclxuXHRwcml2YXRlIGVuZW15TWFuYWdlcjpFbmVteU1hbmFnZXI7XHJcblxyXG5cdC8qKuinkuiJsuWxguWuueWZqCoqKi9cclxuXHRwdWJsaWMgcm9sZUxheWVyOkxheWEuU3ByaXRlO1xyXG5cdC8qKueOqeWutuS4u+inkioqKi9cclxuXHRwdWJsaWMgaGVybzpIZXJvO1xyXG5cdFxyXG5cdC8qKum8oOagh+S4iuS4gOW4p3jluqfmoIcqKiAqL1x0XHRcclxuXHRwcml2YXRlIG1vdmVYOm51bWJlcjtcclxuXHQvKirpvKDmoIfkuIrkuIDluKd55bqn5qCHKiogKi9cdFxyXG5cdHByaXZhdGUgbW92ZVk6bnVtYmVyO1xyXG5cclxuXHQvKioqKuS4u+inkuatu+S6oeWQjua4uOaIj+e7k+adn+aXtumXtCoqKi9cclxuXHRwcml2YXRlIGRlYXRoVGltZTpudW1iZXI9MFxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuXHRcdC8v5Yid5aeL5YyW5byV5pOO77yM5bu66K6u5aKe5YqgV2ViR2zmqKHlvI9cclxuXHRcdExheWEuaW5pdCg3MjAsMTI4MCxXZWJHTCk7XHJcblx0XHQvL+WFqOWxj+S4jeetieavlOe8qeaUvuaooeW8j1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBTdGFnZS5TQ0FMRV9FWEFDVEZJVDtcclxuXHRcdC8v5Yqg6L295Yid5aeL5YyWVUnotYTmupBcclxuXHRcdExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvZ2FtZVVJLmF0bGFzXCIsbGF5YS51dGlscy5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuR2FtZVN0YXJ0KSk7XHJcblx0XHRcclxuXHRcdC8v5Yid5aeL5YyW6KeS6Imy566h55CG5ZmoXHJcblx0XHR0aGlzLmVuZW15TWFuYWdlciA9IG5ldyBFbmVteU1hbmFnZXIodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIEdhbWVTdGFydCgpOnZvaWQgXHJcblx0e1xyXG5cdFx0Ly/lrp7kvovljJblvIDlp4vpobXpnaJcclxuXHRcdHRoaXMuc3RhcnQgPSBuZXcgR2FtZVN0YXJ0KCk7XHJcblx0XHR0aGlzLnN0YXJ0LnBvcHVwKCk7XHJcblx0XHQvL+ebkeWQrOW8gOWni+a4uOaIj+W8gOWni+aMiemSruS6i+S7tizngrnlh7vlkI7ov5vlhaXmuLjmiI/kuK1cclxuXHRcdHRoaXMuc3RhcnQuYnRuX3N0YXJ0Lm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5nYW1lSW5pdClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDmuLjmiI/kuK3vvIzmuLjmiI/liJ3lp4vljJZcclxuXHRcdCovXHJcblx0cHJpdmF0ZSBnYW1lSW5pdCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+e8k+WKqOWKqOeUu+WFs+mXreaViOaenOOAgklEReS4remhtemdouS4ukRpYWxvZ+aJjeWPr+eUqFxyXG5cdFx0dGhpcy5zdGFydC5jbG9zZSgpO1xyXG5cdFx0XHJcblx0XHQvL+mHjee9ruWFs+WNoeaVsOaNrlxyXG5cdFx0Ly/muLjmiI/lhbPljaHmlbBcclxuXHRcdEdhbWVDb25zdC5sZXZlbCA9IDE7XHJcblx0XHQvL+eOqeWutuW+l+WIhlxyXG5cdFx0R2FtZUNvbnN0LnNjb3JlID0gMDtcclxuXHJcblx0XHR0aGlzLmVuZW15TWFuYWdlci5SZXNldEluZm8oKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJblnLDlm77og4zmma/pobXpnaIo5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5tYXAgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5tYXAgPSBuZXcgR2FtZU1hcCgpO1xyXG5cdFx0Ly/liqDovb3liLDoiJ7lj7BcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5tYXApO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluinkuiJsuWxguW5tuWKoOi9veWIsOiInuWPsCjlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLnJvbGVMYXllciA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLnJvbGVMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvbGVMYXllcik7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5ri45oiP5LitVUnpobXpnaIo5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5wbGF5ID09IG51bGwpXHJcblx0XHRcdHRoaXMucGxheSA9IG5ldyBHYW1lUGxheSgpO1xyXG5cdFx0Ly/liqDovb3liLDoiJ7lj7BcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5wbGF5KTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbkuLvop5Io5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5oZXJvID09IG51bGwpXHJcblx0XHRcdHRoaXMuaGVybyA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJoZXJvXCIpIGFzIEhlcm87XHJcblx0XHQvL+WIneWni+WMluinkuiJsuexu+Wei+OAgeihgOmHj++8jOazqO+8mumAn+W6pnNwZWVk5Li6MO+8jOWboOS4uuS4u+inkuaYr+mAmui/h+aTjeaOp+aUueWPmOS9jee9rizpmLXokKXkuLowXHJcblx0XHR0aGlzLmhlcm8uaW5pdChcImhlcm9cIiwxMCwwLDMwLDApO1xyXG5cdFx0Ly/mrbvkuqHlkI7kvJrpmpDol4/vvIzph43mlrDlvIDlp4vlkI7pnIDmmL7npLpcclxuXHRcdHRoaXMuaGVyby52aXNpYmxlPXRydWU7XHJcblx0XHQvL+S4u+inkuS9jee9ruS/ruaUuVxyXG5cdFx0dGhpcy5oZXJvLnBvcygzNjAsODAwKTtcclxuXHRcdC8v6KeS6Imy5Yqg6L295Yiw6KeS6Imy5bGC5LitXHJcblx0XHR0aGlzLnJvbGVMYXllci5hZGRDaGlsZCh0aGlzLmhlcm8pO1xyXG5cdFx0XHJcblx0XHQvL+m8oOagh+aMieS4i+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHQvL+m8oOagh+aKrOi1t+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMub25Nb3VzZVVwKTtcclxuXHRcdC8v5ri45oiP5Li75b6q546vXHJcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5sb29wKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDngrnlh7vlvIDlp4vop6blj5Hnp7vliqhcclxuXHRcdCovXHRcclxuXHRwcml2YXRlIG9uTW91c2VEb3duKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v6K6w5b2V6byg5qCH5oyJ5LiL5pe255qE5L2N572u77yM55So5LqO6K6h566X6byg5qCH56e75Yqo6YePXHJcblx0XHR0aGlzLm1vdmVYPUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0dGhpcy5tb3ZlWT1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8vXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0IOS4u+inkui3n+maj+m8oOagh+enu+WKqFxyXG5cdFx0Ki9cdFxyXG5cdHByaXZhdGUgb25Nb3VzZU1vdmUoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/orqHnrpfop5LoibLnp7vliqjph49cclxuXHRcdGxldCB4eDpudW1iZXI9dGhpcy5tb3ZlWC1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdGxldCB5eTpudW1iZXI9dGhpcy5tb3ZlWS1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8v5pu05paw56e75Yqo5L2N572uXHJcblx0XHR0aGlzLmhlcm8ueC09eHg7XHJcblx0XHR0aGlzLmhlcm8ueS09eXk7XHJcblx0XHQvL+abtOaWsOacrOW4p+eahOenu+WKqOW6p+agh1xyXG5cdFx0dGhpcy5tb3ZlWD1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdHRoaXMubW92ZVk9TGF5YS5zdGFnZS5tb3VzZVk7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCDpvKDmoIfmiqzotbfjgIHlhbPpl63np7vliqjnm5HlkKxcclxuXHRcdCovXHRcdFxyXG5cdHByaXZhdGUgb25Nb3VzZVVwKCk6dm9pZFxyXG5cdHtcclxuXHRcdExheWEuc3RhZ2Uub2ZmKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDmuLjmiI/kuLvlvqrnjq9cclxuXHRcdCovXHJcblx0cHJpdmF0ZSBsb29wKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v5pys5bGA5ri45oiP5pWw5o2u5pu05pawXHJcblx0XHR0aGlzLnBsYXkudXBkYXRlKHRoaXMuaGVyby5ocCxHYW1lQ29uc3QubGV2ZWwsR2FtZUNvbnN0LnNjb3JlKVxyXG5cdFx0Ly/lpoLmnpzkuLvop5LmrbvkuqFcclxuXHRcdGlmKHRoaXMuaGVyby5ocDw9MClcclxuXHRcdHtcclxuXHRcdFx0Ly/njqnlrrbpo57mnLrmrbvkuqHlkI7lu7bov5/ml7bpl7TvvIwxMDDluKflkI7lvLnlh7rmuLjmiI/nu5PmnZ/nlYzpnaJcclxuXHRcdFx0dGhpcy5kZWF0aFRpbWUrK1xyXG5cdFx0XHRpZiAodGhpcy5kZWF0aFRpbWU+PTEwMClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuZGVhdGhUaW1lPTA7XHJcblx0XHRcdFx0Ly/muLjmiI/nu5PmnZ9cclxuXHRcdFx0XHR0aGlzLmdhbWVPdmVyKCk7XHJcblx0XHRcdFx0Ly/mnKzmlrnms5XlhoXlkI7nu63pgLvovpHkuI3miafooYxcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UvL+S4u+inkuacquatu+S6oVxyXG5cdFx0e1xyXG5cdFx0XHQvL+a4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0XHR0aGlzLmxldmVsVXAoKTtcclxuXHRcdH1cclxuXHJcblx0XHQvL+WcsOWbvua7muWKqOabtOaWsFxyXG5cdFx0dGhpcy5tYXAudXBkYXRlTWFwKClcclxuXHRcdC8v5ri45oiP56Kw5pKe6YC76L6RXHJcblx0XHR0aGlzLmNoZWNrQ29sbGVjdCgpO1xyXG5cdFx0Ly/mlYzmlrnpo57mnLrnlJ/miJDpgLvovpFcclxuXHRcdHRoaXMuZW5lbXlNYW5hZ2VyLmxvb3BDcmVhdGVFbmVteSgpO1xyXG5cdH1cclxuXHJcblx0Ly/muLjmiI/norDmkp7pgLvovpFcclxuXHRwcml2YXRlIGNoZWNrQ29sbGVjdCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+mBjeWOhuaJgOaciemjnuacuu+8jOabtOaUuemjnuacuueKtuaAgVxyXG5cdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gdGhpcy5yb2xlTGF5ZXIubnVtQ2hpbGRyZW4gLSAxOyBpID4gLTE7IGktLSkgXHJcblx0XHR7XHJcblx0XHRcdC8v6I635Y+W56ys5LiA5Liq6KeS6ImyXHJcblx0XHRcdHZhciByb2xlOlJvbGUgPSB0aGlzLnJvbGVMYXllci5nZXRDaGlsZEF0KGkpIGFzIFJvbGU7XHJcblx0XHRcdC8v6KeS6Imy6Ieq6Lqr5pu05pawXHJcblx0XHRcdHJvbGUudXBkYXRlKCk7XHJcblxyXG5cdFx0XHQvL+WmguaenOinkuiJsuatu+S6oe+8jOS4i+S4gOW+queOr1xyXG5cdFx0XHRpZihyb2xlLmhwPD0wKSBjb250aW51ZTtcclxuXHRcdFx0Ly/lj5HlsITlrZDlvLlcclxuXHRcdFx0cm9sZS5zaG9vdCgpO1xyXG5cclxuXHRcdFx0Ly/ml6DmlYznirbmgIFcclxuXHRcdFx0aWYocm9sZS5zdGF0ZSA9PSBSb2xlU3RhdGUuSW52aW5jaWJsZSkgIGNvbnRpbnVlO1xyXG5cclxuXHRcdFx0Ly/norDmkp7mo4DmtYtcclxuXHRcdFx0Zm9yKHZhciBqOm51bWJlcj1pLTE7aj4tMTtqLS0pXHJcblx0XHRcdHtcdC8v6I635Y+W56ys5LqM5Liq6KeS6ImyXHJcblx0XHRcdFx0dmFyIHJvbGUxOlJvbGU9dGhpcy5yb2xlTGF5ZXIuZ2V0Q2hpbGRBdChqKSBhcyBSb2xlO1xyXG5cdFx0XHRcdC8v5peg5pWM54q25oCBXHJcblx0XHRcdFx0aWYocm9sZTEuc3RhdGUgPT0gUm9sZVN0YXRlLkludmluY2libGUpICBjb250aW51ZTtcclxuXHRcdFx0XHRcclxuXHRcdFx0XHQvL+WmguaenHJvbGUx5pyq5q275Lqh5LiU5LiN5ZCM6Zi16JClXHJcblx0XHRcdFx0aWYocm9sZTEuaHA+MCYmcm9sZTEuY2FtcCE9cm9sZS5jYW1wKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC8v6I635Y+W56Kw5pKe5Y2K5b6EXHJcblx0XHRcdFx0XHR2YXIgaGl0UmFkaXVzOm51bWJlcj1yb2xlLmhpdFJhZGl1cytyb2xlMS5oaXRSYWRpdXM7XHJcblx0XHRcdFx0XHQvL+eisOaSnuajgOa1i1xyXG5cdFx0XHRcdFx0aWYoTWF0aC5hYnMocm9sZS54LXJvbGUxLngpPGhpdFJhZGl1cyYmTWF0aC5hYnMocm9sZS55LXJvbGUxLnkpPGhpdFJhZGl1cylcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Ly/lpoLmnpzmn5DkuIDkuKrnorDmkp7kvZPmmK/pgZPlhbfvvIzliJnlkIPpgZPlhbfvvIzlkKbliJnmjonooYBcclxuXHRcdFx0XHRcdFx0aWYocm9sZS5wcm9wVHlwZSE9MHx8cm9sZTEucHJvcFR5cGUhPTApXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQvL+aXoOazleWIpOaWreWTquS4quaYr+mBk+WFt++8jOWboOatpOmDveebuOS6kuWQg+ivleivlVxyXG5cdFx0XHRcdFx0XHRcdHJvbGUuZWF0UHJvcChyb2xlMSk7XHJcblx0XHRcdFx0XHRcdFx0cm9sZTEuZWF0UHJvcChyb2xlKTtcclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdC8v6KeS6Imy55u45LqS5o6J6KGAXHJcblx0XHRcdFx0XHRcdFx0cm9sZS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdFx0cm9sZTEubG9zdEhwKDEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdC8qKlxyXG5cdCDmuLjmiI/ljYfnuqforqHnrpdcclxuXHRcdCovXHJcblx0cHJpdmF0ZSBsZXZlbFVwKCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmKEdhbWVDb25zdC5zY29yZT5HYW1lQ29uc3QubGV2ZWxVcFNjb3JlKVxyXG5cdFx0e1xyXG5cdFx0XHQvL+WFs+WNoeetiee6p+aPkOWNh1xyXG5cdFx0XHRHYW1lQ29uc3QubGV2ZWwrKztcclxuXHRcdFx0Ly/op5LoibLooYDph4/lop7liqDvvIzmnIDlpKczMFxyXG5cdFx0XHR0aGlzLmhlcm8uaHA9TWF0aC5taW4odGhpcy5oZXJvLmhwK0dhbWVDb25zdC5sZXZlbCoxLDMwKTtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzliJvlu7rmlYzmnLrpl7TpmpTotornn61cclxuXHRcdFx0R2FtZUNvbnN0LmNyZWF0ZVRpbWUgPSBHYW1lQ29uc3QubGV2ZWwgPCAzMCA/IEdhbWVDb25zdC5sZXZlbCAqIDIgOiA2MDtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrpo57ooYzpgJ/luqbotorpq5hcclxuXHRcdFx0R2FtZUNvbnN0LnNwZWVkVXAgPSBNYXRoLmZsb29yKEdhbWVDb25zdC5sZXZlbCAvIDYpO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuuihgOmHj+i2iumrmFxyXG5cdFx0XHRHYW1lQ29uc3QuaHBVcCA9IE1hdGguZmxvb3IoR2FtZUNvbnN0LmxldmVsIC8gOCk7XHJcblx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py65pWw6YeP6LaK5aSaXHJcblx0XHRcdEdhbWVDb25zdC5udW1VcCA9IE1hdGguZmxvb3IoR2FtZUNvbnN0LmxldmVsIC8gMTApO1xyXG5cdFx0XHQvL+aPkOmrmOS4i+S4gOe6p+eahOWNh+e6p+WIhuaVsFxyXG5cdFx0XHRHYW1lQ29uc3QubGV2ZWxVcFNjb3JlICs9IEdhbWVDb25zdC5sZXZlbCAqIDEwO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHQvKipcclxuXHQg5ri45oiP57uT5p2fXHJcblx0XHQqL1xyXG5cdHByaXZhdGUgZ2FtZU92ZXIoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/np7vpmaTmiYDmnInoiJ7lj7Dkuovku7bvvIzpvKDmoIfmk43mjqdcclxuXHRcdExheWEuc3RhZ2Uub2ZmQWxsKCk7XHJcblx0XHQvL+enu+mZpOWcsOWbvuiDjOaZr1xyXG5cdFx0dGhpcy5tYXAucmVtb3ZlU2VsZigpO1xyXG5cdFx0Ly/np7vpmaTmuLjmiI/kuK1VSVxyXG5cdFx0dGhpcy5wbGF5LnJlbW92ZVNlbGYoKTtcclxuXHRcdFxyXG5cdFx0Ly/muIXnqbrop5LoibLlsYLlrZDlr7nosaFcclxuXHRcdHRoaXMucm9sZUxheWVyLnJlbW92ZUNoaWxkcmVuKDAsdGhpcy5yb2xlTGF5ZXIubnVtQ2hpbGRyZW4tMSk7XHJcblx0XHQvL+enu+mZpOinkuiJsuWxglxyXG5cdFx0dGhpcy5yb2xlTGF5ZXIucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHJcblx0XHQvL+WOu+mZpOa4uOaIj+S4u+W+queOr1xyXG5cdFx0TGF5YS50aW1lci5jbGVhcih0aGlzLHRoaXMubG9vcCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5ri45oiP57uT5p2f6aG16Z2iXHJcblx0XHRpZih0aGlzLm92ZXIgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5vdmVyID0gbmV3IEdhbWVPdmVyKCk7XHJcblx0XHQvL+a4uOaIj+enr+WIhuaYvuekulxyXG5cdFx0dGhpcy5vdmVyLnR4dF9zY29yZS50ZXh0PSBHYW1lQ29uc3Quc2NvcmUudG9TdHJpbmcoKTtcclxuXHRcdC8v5Lul5by55Ye65pa55byP5omT5byA77yM5pyJ57yT5Yqo5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHR0aGlzLm92ZXIucG9wdXAoKTtcclxuXHRcdC8v6YeN5paw5byA5aeL5LqL5Lu255uR5ZCsLOeCueWHu+WQjui/m+WFpea4uOaIj+S4rVxyXG5cdFx0dGhpcy5vdmVyLm9uKFwicmVTdGFydFwiLHRoaXMsdGhpcy5nYW1lSW5pdCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5NYWluLkdldEluc3RhbmNlKCk7XHJcbiIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJ1bGxldCBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+makOiXj++8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5pu05pawLOi+ueeVjOajgOafpVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAgLy/lpoLmnpzop5LoibLpmpDol4/vvIzop5LoibLmtojkuqHlubblm57mlLZcclxuICAgICAgICAgaWYoIXRoaXMudmlzaWJsZSlcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy5kaWUoKTtcclxuICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgfVxyXG4gICAgICAgICBcclxuICAgICAgICAgbGV0IHhSb3RhdGlvbiA9IE1hdGguc2luKCBMYXlhLlV0aWxzLnRvUmFkaWFuKHRoaXMucm90YXRpb24pKTtcclxuICAgICAgICAgbGV0IHlSb3RhdGlvbiA9IE1hdGguY29zKCBMYXlhLlV0aWxzLnRvUmFkaWFuKHRoaXMucm90YXRpb24pKTtcclxuICAgICAgICAgLy/op5LoibLmoLnmja7pgJ/luqbpo57ooYxcclxuICAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQgKiAgeFJvdGF0aW9uIDtcclxuICAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQgICogIHlSb3RhdGlvbiA7XHJcbiBcclxuICAgICAgICAgLy/lpoLmnpznp7vliqjliLDmmL7npLrljLrln5/ku6XlpJbvvIzliJnnp7vpmaRcclxuICAgICAgICAgaWYgKHRoaXMueSA+IDEyODArMTAwfHx0aGlzLnk8LTE1MClcclxuICAgICAgICAge1xyXG4gICAgICAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgUm9sZUZhY3RvcnkgZnJvbSBcIi4vUm9sZUZhY3RvcnlcIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15IGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAvL+WinuWKoOWIhuaVsFxyXG4gICAgcHVibGljIGFkZFNjb3JlOm51bWJlciA9IDE7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNob290SW50ZXJ2YWwgPSA1MDAwOyAgLy/lsITlh7vpl7TpmpRcclxuICAgICAgICB0aGlzLnNob290VGltZSA9IDUwMDA7XHJcbiAgICB9XHJcblxyXG4gICAgIC8qKlxyXG4gICAgICog6KeS6Imy5aSx6KGAXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgbG9zdEhwKGxvc3RIcDpudW1iZXIpOnZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgLy/lh4/ooYBcclxuICAgICAgICB0aGlzLmhwIC09IGxvc3RIcDtcclxuICAgICAgICAvL+agueaNruihgOmHj+WIpOaWrVxyXG4gICAgICAgIGlmICh0aGlzLmhwID4gMCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WmguaenOacquatu+S6oe+8jOWImeaSreaUvuWPl+WHu+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+a3u+WKoOatu+S6oeWKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJkaWVcIik7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh6Z+z5pWIXHJcbiAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2dhbWVfb3Zlci5tcDNcIik7XHJcbiAgICAgICAgICAgIEdhbWVDb25zdC5zY29yZSs9IHRoaXMuYWRkU2NvcmU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKirliqjnlLvlrozmiJDlkI7lm57osIPmlrnms5UqKiovXHJcbiAgICBwdWJsaWMgb25Db21wbGV0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIC8v5aaC5p6c5q275Lqh5Yqo55S75pKt5pS+5a6M5oiQXHJcbiAgICAgICAgaWYodGhpcy5hY3Rpb249PVwiZGllXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9zdFByb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmFjdGlvbj09XCJoaXRcIikvL+WmguaenOaYr+WPl+S8pOWKqOeUu++8jOS4i+S4gOW4p+aSreaUvumjnuihjOWKqOeUu1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKirop5LoibLmrbvkuqHmjonokL3nianlk4EqKi9cclxuICAgIHB1YmxpYyBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICBcclxuICAgIH1cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15XzEgZXh0ZW5kcyBFbmVteVxyXG57XHJcbiAgICAvL+aYr+WQpuWQkeW3pui+ueenu+WKqFxyXG4gICAgcHJpdmF0ZSBpc01vdmVMZWZ0ID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgdGlja1RpbWUgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pc01vdmVMZWZ0ID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gTGF5YS5Ccm93c2VyLm5vdygpO1xyXG4gICAgICAgIC8v5L2N56e75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPiB0aGlzLnRpY2tUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy50aWNrVGltZSA9IHRpbWUgKyAxMDAwOyBcclxuICAgICAgICAgICAgdGhpcy5pc01vdmVMZWZ0ID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v6KeS6Imy5qC55o2u6YCf5bqm6aOe6KGMXHJcbiAgICAgICAgaWYodGhpcy5pc01vdmVMZWZ0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWQgKiAwLjU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkICogMC41O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKblt6blj7PotoXlh7pcclxuICAgICAgICBpZih0aGlzLnggPCB0aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb3ZlTGVmdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMueCA+IDcyMC10aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNNb3ZlTGVmdCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15XzIgZXh0ZW5kcyBFbmVteVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc2hvb3RJbnRlcnZhbCA9IDMwMDA7ICAvL+WwhOWHu+mXtOmalFxyXG4gICAgICAgIHRoaXMuc2hvb3RUaW1lID0gdGhpcy5zaG9vdEludGVydmFsOyAvL+esrOS4gOasoeWwhOWHu+aXtumXtFxyXG5cclxuICAgICAgICB0aGlzLmFkZFNjb3JlID0gNTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDop5LoibLlsITlh7vvvIznlJ/miJDlrZDlvLlcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBzaG9vdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgXHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCk7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3ml7bpl7TlpKfkuo7kuIvmrKHlsITlh7vml7bpl7RcclxuICAgICAgICBpZiAodGltZSA+IHRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mm7TmlrDkuIvmrKHlrZDlvLnlsITlh7vnmoTml7bpl7RcclxuICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aW1lICsgdGhpcy5zaG9vdEludGVydmFsIDsgXHJcblxyXG4gICAgICAgICAgICAvL+WkmuWPkeWtkOW8uVxyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDMgOyBpICsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldDogQnVsbGV0ID0gUm9sZUZhY3RvcnkuR2V0Um9sZShcImJ1bGxldDFcIik7XHJcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQxXCIsMSwxMCwxLHRoaXMuY2FtcClcclxuICAgICAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54LCB0aGlzLnkgKyAzMCk7XHJcbiAgICAgICAgICAgICAgICAvL+S4jeWQjOinkuW6plxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gLTMwICsgaSAqIDMwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5Yiw6KeS6Imy5bGCXHJcbiAgICAgICAgICAgICAgICBpZiggdGhpcy5wYXJlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgUm9sZUZhY3RvcnkgZnJvbSBcIi4vUm9sZUZhY3RvcnlcIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL0VuZW15XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteV8zIGV4dGVuZHMgRW5lbXlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNob290SW50ZXJ2YWwgPSA4MDAwOyAgLy/lsITlh7vpl7TpmpRcclxuICAgICAgICB0aGlzLnNob290VGltZSA9IHRoaXMuc2hvb3RJbnRlcnZhbDsgLy/nrKzkuIDmrKHlsITlh7vml7bpl7RcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTY29yZSA9IDEwO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBzaG9vdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47IFxyXG4gICAgICAgXHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCk7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3ml7bpl7TlpKfkuo7kuIvmrKHlsITlh7vml7bpl7RcclxuICAgICAgICBpZiAodGltZSA+IHRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mm7TmlrDkuIvmrKHlrZDlvLnlsITlh7vnmoTml7bpl7RcclxuICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aW1lICsgdGhpcy5zaG9vdEludGVydmFsIDsgXHJcblxyXG4gICAgICAgICAgICAvL+eUn+aIkOmaj+acuumBk+WFt+exu+Wei1xyXG4gICAgICAgICAgICBpZihNYXRoLnJhbmRvbSgpIDwgMC42KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290QWN0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290QWN0XzIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHJpdmF0ZSBzaG9vdEFjdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLnNob290QWN0RG8oKTtcclxuICAgICAgICBMYXlhLnRpbWVyLm9uY2UoNTAwLHRoaXMsdGhpcy5zaG9vdEFjdERvKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+S4gOe7hOWtkOW8ueWunuS+i1xyXG4gICAgcHJpdmF0ZSBzaG9vdEFjdERvKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5aSa5Y+R5a2Q5by5XHJcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCAxOCA7IGkgKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiYnVsbGV0MVwiKTtcclxuICAgICAgICAgICAgLy/liJ3lp4vljJblrZDlvLnkv6Hmga9cclxuICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQxXCIsMSwxMCwxLHRoaXMuY2FtcClcclxuICAgICAgICAgICAgLy/lrZDlvLnmtojlpLHlkI7kvJrkuI3mmL7npLrvvIzph43mlrDliJ3lp4vljJZcclxuICAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgYnVsbGV0LnBvcyh0aGlzLngsIHRoaXMueSArIDgwKTtcclxuICAgICAgICAgICAgLy/kuI3lkIzop5LluqZcclxuICAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gLTkwICsgaSAqIDEwO1xyXG5cclxuICAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICAgaWYoIHRoaXMucGFyZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNob290QWN0XzIoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCAzNiA7IGkgKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLm9uY2UoMzAgKiBpLHRoaXMsdGhpcy5zaG9vdEFjdERvXzIsW2ldLGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvb3RBY3REb18yKGluZGV4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgbGV0IGJ1bGxldDogQnVsbGV0ID0gUm9sZUZhY3RvcnkuR2V0Um9sZShcImJ1bGxldDFcIik7XHJcbiAgICAgICAgICAgLy/liJ3lp4vljJblrZDlvLnkv6Hmga9cclxuICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDFcIiwxLDEwLDEsdGhpcy5jYW1wKVxyXG4gICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAvL+iuvue9ruWtkOW8ueWPkeWwhOWIneWni+WMluS9jee9rlxyXG4gICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54LCB0aGlzLnkgKyA4MCk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ID4gMTgpXHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IDM2IC0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgIC8v5LiN5ZCM6KeS5bqmXHJcbiAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gLTkwICsgaW5kZXggKiAxMDtcclxuXHJcbiAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICBpZiggdGhpcy5wYXJlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgIH1cclxuICAgXHJcbiAgICAvKirop5LoibLmrbvkuqHmjonokL3nianlk4EqKi9cclxuICAgIHB1YmxpYyBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4qumBk+WFt1xyXG4gICAgICAgIGxldCBwcm9wOnVmbyA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcInVmb1wiLHVmbyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICBsZXQgcjpOdW1iZXI9TWF0aC5yYW5kb20oKTtcclxuICAgICAgICBsZXQgbnVtOm51bWJlcj0ocjwwLjcpPzE6MjtcclxuICAgICAgICBcclxuICAgICAgICAvL+mHjeaWsOWIneWni+WMlumBk+WFt+WxnuaApyzpmLXokKXkuLrmlYzmlrnvvIjlj6rkuI7kuLvop5Llj5HnlJ/norDmkp7vvIlcclxuICAgICAgICBwcm9wLmluaXQoXCJ1Zm9cIitudW0sMSwyLDMwLDEpO1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgcHJvcC5wcm9wVHlwZT1udW07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lvLrliLbmmL7npLpcclxuICAgICAgICBwcm9wLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAvL+eUn+aIkOeahOS9jee9ruS4uuatu+S6oeiAheS9jee9rlxyXG4gICAgICAgIHByb3AucG9zKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgICAgIC8v5Yqg6L295Yiw54i25a655ZmoIFxyXG4gICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0ICogYXMgR2FtZUNvbnN0VHMgZnJvbSBcIi4uL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgUm9sZVN0YXRlID0gR2FtZUNvbnN0VHMuUm9sZVN0YXRlO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIFJvbGVcclxue1xyXG5cclxuICAgIC8qKirlrZDlvLnlgY/np7vnmoTkvY3nva4qKiovXHJcbiAgICBwcm90ZWN0ZWQgYnVsbGV0UG9zOiBudW1iZXJbXVtdID0gW1swXSwgWy0xNSwgMTVdLCBbLTMwLCAwLCAzMF0sIFstNDUsIC0xNSwgMTUsIDQ1XV07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wbGF5QWN0aW9uKFwiaGl0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKFJvbGVTdGF0ZS5JbnZpbmNpYmxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImRpZVwiKTtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHpn7PmlYhcclxuICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZ2FtZV9vdmVyLm1wM1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAg54q25oCB5pS55Y+YXHJcbiAgICAgKi9cdFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VTdGF0ZShzdGF0ZTpSb2xlU3RhdGUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgLy/ml6DmlYznirbmgIFcclxuICAgICAgICBpZih0aGlzLnN0YXRlID09IFJvbGVTdGF0ZS5JbnZpbmNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBbHBoYVR3ZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheUNvdW50ID0gMDtcclxuICAgIHByaXZhdGUgcGxheUFscGhhVHdlZW4oKVxyXG4gICAge1xyXG4gICAgICAgIC8v57yT5Yqo57G7XHJcbiAgICAgICAgbGV0IHR3ZWVuID0gTGF5YS5Ud2Vlbi50byh0aGlzLHthbHBoYTowLjN9LDMwMCxMYXlhLkVhc2UuYmFja0luT3V0LFxyXG4gICAgICAgICAgICBMYXlhLkhhbmRsZXIuY3JlYXRlKFxyXG4gICAgICAgICAgICAgICAgdGhpcywoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbHBoYSA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLnBsYXlDb3VudCA+PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUFscGhhVHdlZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oGi5aSN54q25oCBXHJcbiAgICBwcml2YXRlIHJlc2V0U3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShSb2xlU3RhdGUuRmx5KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlkIPliLDpgZPlhbfvvIzliqDooYDmiJblrZDlvLnnuqfliKtcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBlYXRQcm9wKHByb3A6Um9sZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5aaC5p6c6LCD55So6ICF5piv5Li76KeS5oiWcHJvcOS4jeaYr+mBk+WFt++8jOWImei/lOWbnlxyXG4gICAgICAgIGlmKHByb3AucHJvcFR5cGU9PTApIHJldHVybjtcclxuICAgICAgICAvL+a3u+WKoOWQg+W8uuWMlumBk+WFt+mfs+aViFx0XHRcdFx0XHRcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9hY2hpZXZlbWVudC5tcDNcIik7XHJcbiAgICAgICAgLy/lkIPlrZDlvLnnrrFcclxuICAgICAgICBpZihwcm9wLnByb3BUeXBlPT0xKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5a2Q5by557qn5Yir5aKe5YqgXHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0TGV2ZWwrK1xyXG4gICAgICAgICAgICAvL+WtkOW8ueavj+WNhzLnuqfvvIzlrZDlvLnmlbDph4/lop7liqAx77yM5pyA5aSn5pWw6YeP6ZmQ5Yi25ZyoNOS4qlxyXG4gICAgICAgICAgICB0aGlzLnNob290TnVtID0gTWF0aC5taW4oTWF0aC5mbG9vcih0aGlzLmJ1bGxldExldmVsIC8gMikgKyAxLDQpO1xyXG4gICAgICAgICAgICAvL+WtkOW8uee6p+WIq+i2iumrmO+8jOWPkeWwhOmikeeOh+i2iuW/q1xyXG4gICAgICAgICAgICB0aGlzLnNob290SW50ZXJ2YWwgPSAzMDAgLSA4ICogKHRoaXMuYnVsbGV0TGV2ZWwgPiA4ID8gOCA6IHRoaXMuYnVsbGV0TGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHByb3AucHJvcFR5cGU9PTIpLy/lkIPooYBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6KGA6YeP5aKe5YqgXHJcbiAgICAgICAgICAgIHRoaXMuaHArPTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YGT5YW35q275LqhXHJcbiAgICAgICAgcHJvcC5ocD0wO1xyXG4gICAgICAgIC8v6YGT5YW35ZCD5a6M5ZCO5raI5aSx77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgcHJvcC52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOabtOaWsFxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/kuLvop5LovrnnlYzmo4Dmn6VcclxuICAgICAgICAvL+mcgOWHj+WOu+inkuiJsuWuveaIlumrmOeahOS4gOWNiu+8jOWboOS4uuWcqElEReS4reWItuS9nOWKqOeUu+aXtu+8jOaIkeS7rOaKiuinkuiJsueahOS4reW/g+WBmuS4uuS6huinkuiJsuWvueixoeeahOWOn+eCuVxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5bem5Y+z6LaF5Ye6XHJcbiAgICAgICAgaWYodGhpcy54PHRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54PXRoaXMucm9sZUFuaS53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMueD43MjAtdGhpcy5yb2xlQW5pLndpZHRoLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLng9NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuS4iuS4i+i2heWHulxyXG4gICAgICAgIGlmKHRoaXMueTx0aGlzLnJvbGVBbmkuaGVpZ2h0LzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnk9dGhpcy5yb2xlQW5pLmhlaWdodC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMueT4xMjgwLXRoaXMucm9sZUFuaS5oZWlnaHQvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueT0xMjgwLXRoaXMucm9sZUFuaS5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCkgO1xyXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pe26Ze05aSn5LqO5LiL5qyh5bCE5Ye75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPnRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ojrflvpflj5HlsITlrZDlvLnnmoTkvY3nva7mlbDnu4RcclxuICAgICAgICAgICAgbGV0IHBvczpudW1iZXJbXSA9IHRoaXMuYnVsbGV0UG9zW3RoaXMuc2hvb3ROdW0tMV1cclxuICAgICAgICAgICAgZm9yKGxldCBpOm51bWJlciA9IDAgOyBpPHBvcy5sZW5ndGggOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5pu05paw5LiL5qyh5a2Q5by55bCE5Ye755qE5pe26Ze0XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290VGltZSA9IHRpbWUgKyB0aGlzLnNob290SW50ZXJ2YWwgOyBcclxuICAgICAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiYnVsbGV0MlwiKTtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDJcIiwxLC0xMCwxLHRoaXMuY2FtcClcclxuICAgICAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54K3Bvc1tpXSwgdGhpcy55LTgwKTtcclxuICAgICAgICAgICAgICAgIC8v5peL6L2s6KeS5bqmXHJcbiAgICAgICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKGJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICAvL+a3u+WKoOWtkOW8uemfs+aViFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2J1bGxldC5tcDNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5pbXBvcnQgQW5pbWF0aW9uID0gTGF5YS5BbmltYXRpb247XHJcbmltcG9ydCBFdmVudCA9IGxheWEuZXZlbnRzLkV2ZW50O1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgKiBhcyBHYW1lQ29uc3RUcyBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlU3RhdGUgPSBHYW1lQ29uc3RUcy5Sb2xlU3RhdGU7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdC8qKirpo57mnLrnmoTnsbvlnosgICDigJxoZXJv4oCdOueOqeWutumjnuacuu+8jOKAnGVuZW154oCd77ya5pWM5Lq66aOe5py644CB4oCcYnVsbGXigJ3vvJrlrZDlvLnjgIFcInVmb1wiOumBk+WFtyoqKiovXHJcbiAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XHJcbiAgICAvKioq6aOe5py655qE6KGA6YePKioqL1xyXG4gICAgcHVibGljIGhwOm51bWJlcj0wOyBcclxuICAgIC8qKirpo57mnLrnmoTpgJ/luqYqKiovXHJcbiAgICBwcm90ZWN0ZWQgc3BlZWQ6bnVtYmVyPTA7XHRcclxuICAgIFxyXG4gICAgLyoqKumjnuacuueahOiiq+aUu+WHu+WNiuW+hCoqKi9cclxuICAgIHB1YmxpYyBoaXRSYWRpdXM6bnVtYmVyO1xyXG4gICAgLyoqKumjnuacuueahOmYteiQpe+8iOaVjOaIkeWMuuWIq++8iSoqKi9cclxuICAgIHB1YmxpYyBjYW1wOm51bWJlcjtcclxuICAgIFxyXG4gICAgLyoqKuinkuiJsueahOWKqOeUu+i1hOa6kCoqKi9cclxuICAgIHByb3RlY3RlZCByb2xlQW5pOkFuaW1hdGlvbjtcclxuICAgIC8qKirlvZPliY3liqjnlLvliqjkvZwqKiovXHJcbiAgICBwcm90ZWN0ZWQgYWN0aW9uOnN0cmluZztcclxuICAgIFxyXG4gICAgLyoqKuWwhOWHu+mXtOmalCoqKi9cclxuICAgIHB1YmxpYyBzaG9vdEludGVydmFsOiBudW1iZXI9IDMwMDtcclxuICAgIC8qKirkuIvmrKHlsITlh7vml7bpl7QqKiovXHJcbiAgICBwdWJsaWMgc2hvb3RUaW1lOiBudW1iZXI9IDMwMDtcclxuICAgIFxyXG4gICAgLyoqKirpgZPlhbfnsbvlnosgMDrpo57mnLrmiJblrZDlvLnvvIwxOuWtkOW8ueeuse+8jDI66KGA55O2KioqL1xyXG4gICAgcHVibGljIHByb3BUeXBlOm51bWJlcj0wO1xyXG4gICAgLyoqKuWtkOW8uee6p+WIq++8iOWQg+WtkOW8uemBk+WFt+WQjuWNh+e6p++8iSoqKi9cclxuICAgIHB1YmxpYyBidWxsZXRMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIC8qKirlkIzml7blsITlh7vlrZDlvLnmlbDph48qKiovXHJcbiAgICBwdWJsaWMgc2hvb3ROdW06IG51bWJlcj0gMTtcclxuXHJcbiAgICAvL+mjnuacuuW9k+WJjeeKtuaAgVxyXG4gICAgcHVibGljIHN0YXRlOlJvbGVTdGF0ZSA9IFJvbGVTdGF0ZS5GbHk7ICBcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgLy/lrp7kvovljJbliqjnlLtcclxuICAgICAgICAgdGhpcy5yb2xlQW5pPW5ldyBBbmltYXRpb24oKTtcclxuICAgICAgICAgLy/liqDovb1JREXnvJbovpHnmoTliqjnlLvmlofku7ZcclxuICAgICAgICAgdGhpcy5yb2xlQW5pLmxvYWRBbmltYXRpb24oXCJHYW1lUm9sZS5hbmlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLliJ3lp4vljJZcclxuICAgICAqIEBwYXJhbSB0eXBlICDop5LoibLnsbvlnosgLS0t4oCcaGVyb+KAnTrnjqnlrrbpo57mnLrvvIzigJxlbmVteTEtM+KAne+8muaVjOS6uumjnuacuuOAgeKAnGJ1bGxlOjEtMuKAne+8muWtkOW8ueOAgVwidWZvMS0yXCI66YGT5YW3XHJcbiAgICAgKiBAcGFyYW0gaHAgICAgICDooYDph49cclxuICAgICAqIEBwYXJhbSBzcGVlZCAgIOmAn+W6plxyXG4gICAgICogQHBhcmFtIGhpdFJhZGl1cyAgIOeisOaSnuWNiuW+hFxyXG4gICAgICogQHBhcmFtIGNhbXAgICAg6Zi16JClXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgaW5pdCh0eXBlOnN0cmluZyxocDpudW1iZXIsc3BlZWQ6bnVtYmVyLGhpdFJhZGl1czpudW1iZXIsY2FtcDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+inkuiJsuWIneWni+WMluWxnuaAp1xyXG4gICAgICAgIHRoaXMudHlwZT10eXBlO1xyXG4gICAgICAgIHRoaXMuaHA9aHA7XHJcbiAgICAgICAgdGhpcy5zcGVlZD1zcGVlZDtcclxuICAgICAgICB0aGlzLmhpdFJhZGl1cz1oaXRSYWRpdXM7XHJcbiAgICAgICAgdGhpcy5jYW1wPWNhbXA7XHJcblxyXG4gICAgICAgIC8v6YGT5YW35bGe5oCn5Yid5aeL5Li6MFxyXG4gICAgICAgIHRoaXMucHJvcFR5cGU9MDtcclxuICAgICAgICAvL+WKoOi9veWKqOeUu+WvueixoVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5yb2xlQW5pKVxyXG4gICAgICAgIC8v55uR5ZCs5Yqo55S75a6M5oiQ5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLm9uKEV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKVxyXG4gICAgICAgIC8v5pKt5pS+6buY6K6k6aOe6KGM5Yqo55S7XHJcbiAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLov5jmnKrmnInlrr3vvIzojrflvpfop5LoibLlrr3pq5hcdFxyXG4gICAgICAgIGlmKHRoaXMucm9sZUFuaS53aWR0aD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Yqo55S755+p5b2i6L6555WMXHJcbiAgICAgICAgICAgIHZhciBib3VuZHM6TGF5YS5SZWN0YW5nbGU9dGhpcy5yb2xlQW5pLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICAvL+inkuiJsiDlrr3pq5jotYvlgLxcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pLnNpemUoYm91bmRzLndpZHRoLGJvdW5kcy5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7liqjnlLsgXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uIOWKqOeUu+eKtuaAgSAgIFwiZmx5XCLjgIFcImhpdFwi44CBXCJkaWVcIlxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBwbGF5QWN0aW9uKGFjdGlvbjpzdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGlvbj1hY3Rpb247XHJcbiAgICAgICAgLy/mkq3mlL7op5LoibLliqjnlLssbmFtZT3op5LoibLnsbvlnotf5Yqo55S754q25oCB77yM5aaC77yaaGVyb19mbHlcclxuICAgICAgICB0aGlzLnJvbGVBbmkucGxheSgwLHRydWUsdGhpcy50eXBlK1wiX1wiK2FjdGlvbik7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLpmpDol4/vvIzop5LoibLmtojkuqHlubblm57mlLZcclxuICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kaWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/op5LoibLmoLnmja7pgJ/luqbpo57ooYxcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICAvL+WmguaenOenu+WKqOWIsOaYvuekuuWMuuWfn+S7peWklu+8jOWImeenu+mZpFxyXG4gICAgICAgIGlmICh0aGlzLnkgPiAxMjgwKzEwMHx8dGhpcy55PC0xNTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuW3puWPs+i2heWHulxyXG4gICAgICAgIGlmKHRoaXMueDx0aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueD10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLng+NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54PTcyMC10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoq6KeS6Imy5q275Lqh5bm25Zue5pS25Yiw5a+56LGh5rGgKiovXHJcbiAgICBwdWJsaWMgZGllKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6KeS6Imy5Yqo55S75YGc5q2iXHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLnN0b3AoKTsgXHJcbiAgICAgICAgLy/ljrvpmaTmiYDmnInliqjnlLvnm5HlkKxcclxuICAgICAgICB0aGlzLnJvbGVBbmkub2ZmQWxsKCk7XHJcbiAgICAgICAgLy/ku47oiJ7lj7Dnp7vpmaRcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMudHlwZSwgdGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL0hlcm9cIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL0VuZW15XCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcbmltcG9ydCBFbmVteV8xIGZyb20gXCIuL0VuZW15XzFcIjtcclxuaW1wb3J0IEVuZW15XzIgZnJvbSBcIi4vRW5lbXlfMlwiO1xyXG5pbXBvcnQgRW5lbXlfMyBmcm9tIFwiLi9FbmVteV8zXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRmFjdG9yeVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFJvbGUodHlwZTpzdHJpbmcpOlJvbGVcclxuICAgIHtcclxuICAgICAgICBsZXQgcm9sZTpSb2xlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVyb1wiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidWxsZXQxXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJidWxsZXQyXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsQnVsbGV0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidWZvXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsdWZvKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZW5lbXkxXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsRW5lbXlfMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVuZW15MlwiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLEVuZW15XzIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlbmVteTNcIjpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSxFbmVteV8zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLFJvbGUpO1xyXG4gICAgICAgIH0gICBcclxuICAgICAgIHJldHVybiByb2xlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdWZvIGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v6ZqQ6JeP77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kaWUoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOWvueixoeaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwidWZvXCIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgICAgICAgIFxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lQmdVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJnMTpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzI6TGF5YS5JbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ2YXJcIjpcImJnMVwiLFwic2tpblwiOlwiYmFja2dyb3VuZC5wbmdcIn0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6LTEyODAsXCJ4XCI6MCxcInZhclwiOlwiYmcyXCIsXCJza2luXCI6XCJiYWNrZ3JvdW5kLnBuZ1wifSxcImNvbXBJZFwiOjN9XSxcImxvYWRMaXN0XCI6W1wiYmFja2dyb3VuZC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVCZ1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVPdmVyVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGFuaV9yZXN0YXJ0OkxheWEuRnJhbWVBbmltYXRpb247XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgYnRuX3Jlc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MjI5LFwic2tpblwiOlwiZ2FtZVVJL2dhbWVPdmVyLnBuZ1wifSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjEyMDAsXCJ4XCI6MTksXCJ3aWR0aFwiOjY4MSxcInRleHRcIjpcIkxheWFBaXIxLjcuM+W8leaTjuaVmeWtpua8lOekuueJiFwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjI2LFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjV9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjoyNDQsXCJ3aWR0aFwiOjE0NCxcInRleHRcIjpcIuacrOWxgOenr+WIhu+8mlwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjozNjMsXCJ3aWR0aFwiOjEyOCxcInZhclwiOlwidHh0X3Njb3JlXCIsXCJ0ZXh0XCI6XCIxMjAwXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjN2M3OTc5XCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjM5LFwidmFyXCI6XCJidG5fcmVzdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjEsXCJ3aWR0aFwiOjI0MCxcInN0YXRlTnVtXCI6MixcInNraW5cIjpcImdhbWVVSS9idG5fYmcucG5nXCIsXCJzaXplR3JpZFwiOlwiMTAsMTAsMTAsMTBcIixcImhlaWdodFwiOjgwfSxcImNvbXBJZFwiOjExfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTgsXCJ4XCI6NDEsXCJza2luXCI6XCJnYW1lVUkvcmVzdGFydC5wbmdcIn0sXCJjb21wSWRcIjoxMn1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjEwLFwia2V5ZnJhbWVzXCI6e1wieVwiOlt7XCJ2YWx1ZVwiOjk3MCxcInR3ZWVuTWV0aG9kXCI6XCJlbGFzdGljT3V0XCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjk2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjo4fV19fV0sXCJuYW1lXCI6XCJhbmlfcmVzdGFydFwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9nYW1lT3Zlci5wbmdcIixcImdhbWVVSS9idG5fYmcucG5nXCIsXCJnYW1lVUkvcmVzdGFydC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVPdmVyVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVBsYXlVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJ0bl9wYXVzZTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgdHh0X2hwOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyB0eHRfbGV2ZWw6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgZ2FtZVBhdXNlOkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3XCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjIwLFwieFwiOjEwLFwid2lkdGhcIjo3MDAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJoZWlnaHRcIjo0NX0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjIxLFwieFwiOjYxOCxcInZhclwiOlwiYnRuX3BhdXNlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxLFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9ocFwiLFwidGV4dFwiOlwiSFDvvJpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo4fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjoyMjgsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X2xldmVsXCIsXCJ0ZXh0XCI6XCJsZXZlbO+8mlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjl9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxNSxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfc2NvcmVcIixcInRleHRcIjpcIlNjb3JlOlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjEwfSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwidmlzaWJsZVwiOmZhbHNlLFwidmFyXCI6XCJnYW1lUGF1c2VcIixcImhlaWdodFwiOjEyODAsXCJhbHBoYVwiOjF9LFwiY29tcElkXCI6MTMsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJzaXplR3JpZFwiOlwiMiwyLDIsMlwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxNX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQxMSxcInhcIjoxMTAsXCJ3aWR0aFwiOjUwMCxcInZpc2libGVcIjp0cnVlLFwic2tpblwiOlwiZ2FtZVVJL2JnLmpwZ1wiLFwic2l6ZUdyaWRcIjpcIjEwLDEwLDEwLDEwXCIsXCJoZWlnaHRcIjo1MDB9LFwiY29tcElkXCI6MTJ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjgwMSxcInhcIjoxOTAsXCJ3aWR0aFwiOjM0MCxcInRleHRcIjpcIueCueWHu+S7u+aEj+S9jee9rue7p+e7rea4uOaIj1wiLFwiaGVpZ2h0XCI6NDQsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzIzMjIyMlwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjE0fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDY4LFwieFwiOjIxNCxcInNraW5cIjpcImdhbWVVSS9nYW1lUGF1c2UucG5nXCJ9LFwiY29tcElkXCI6MTZ9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmxhbmsucG5nXCIsXCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wiLFwiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2dhbWVQYXVzZS5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVQbGF5VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVN0YXJ0VUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIHR4dF9sb2FkOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyBidG5fc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MTc5LFwic2tpblwiOlwiZ2FtZVVJL2xvZ28ucG5nXCJ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6NTg3LFwieFwiOjIwLFwid2lkdGhcIjo2ODEsXCJ2YXJcIjpcInR4dF9sb2FkXCIsXCJ0ZXh0XCI6XCLmuLjmiI/otYTmupDliqDovb3ov5vluqZcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiMxYzFjMWNcIixcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjQwLFwidmlzaWJsZVwiOnRydWUsXCJ2YXJcIjpcImJ0bl9zdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjI0MCxcInZpc2libGVcIjp0cnVlLFwic3RhdGVOdW1cIjoyLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcInNpemVHcmlkXCI6XCIyMCwyMCwyMCwyMFwiLFwiaGVpZ2h0XCI6ODB9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE5LFwieFwiOjQxLFwic2tpblwiOlwiZ2FtZVVJL3N0YXJ0LnBuZ1wifSxcImNvbXBJZFwiOjExfV0sXCJjb21wb25lbnRzXCI6W119XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2xvZ28ucG5nXCIsXCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwiZ2FtZVVJL3N0YXJ0LnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZVN0YXJ0VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
