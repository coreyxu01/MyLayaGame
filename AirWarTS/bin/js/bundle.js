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
},{"./GameConst":2,"./Role/RoleFactory":16}],2:[function(require,module,exports){
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
},{"./ui/layaMaxUI":18}],4:[function(require,module,exports){
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
},{"./ui/layaMaxUI":18}],5:[function(require,module,exports){
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
},{"./ui/layaMaxUI":18}],6:[function(require,module,exports){
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
},{"./ui/layaMaxUI":18}],7:[function(require,module,exports){
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
            GameConst_1.default.hpUp = Math.floor(GameConst_1.default.level / 2);
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
},{"./EnemyManager":1,"./GameConst":2,"./GameMap":3,"./GameOver":4,"./GamePlay":5,"./GameStart":6,"./Role/RoleFactory":16}],8:[function(require,module,exports){
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
},{"./Role":15}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RoleFactory_1 = require("./RoleFactory");
var BulletUtls = /** @class */ (function () {
    function BulletUtls() {
    }
    /**
    单颗子弹
     */
    BulletUtls.Shoot_1 = function (camp, role, xDiff, yDiff) {
        //从对象池里面创建一个子弹
        var bullet = RoleFactory_1.default.GetRole("bullet1");
        //初始化子弹信息
        bullet.init("bullet1", 1, 10, 1, camp);
        //子弹消失后会不显示，重新初始化
        bullet.visible = true;
        //设置子弹发射初始化位置
        bullet.pos(role.x + xDiff, role.y + yDiff);
        //添加到角色层
        if (role.parent != null)
            role.parent.addChild(bullet);
    };
    /**
     散弹 3发
     */
    BulletUtls.Shoot_2 = function (camp, role, xDiff, yDiff) {
        for (var i = 0; i < 3; i++) {
            //从对象池里面创建一个子弹
            var bullet = RoleFactory_1.default.GetRole("bullet1");
            //初始化子弹信息
            bullet.init("bullet1", 1, 10, 1, camp);
            //子弹消失后会不显示，重新初始化
            bullet.visible = true;
            //设置子弹发射初始化位置
            bullet.pos(role.x + xDiff, role.y + yDiff);
            //不同角度
            bullet.rotation = -30 + i * 30;
            //添加到角色层
            if (role.parent != null)
                role.parent.addChild(bullet);
        }
    };
    /**
     半弧形子弹
     */
    BulletUtls.Shoot_3 = function (camp, role, xDiff, yDiff) {
        //多发子弹
        for (var i = 0; i < 18; i++) {
            //从对象池里面创建一个子弹
            var bullet = RoleFactory_1.default.GetRole("bullet1");
            //初始化子弹信息
            bullet.init("bullet1", 1, 10, 1, camp);
            //子弹消失后会不显示，重新初始化
            bullet.visible = true;
            //设置子弹发射初始化位置
            bullet.pos(role.x + xDiff, role.y + yDiff);
            //不同角度
            bullet.rotation = -90 + i * 10;
            //添加到角色层
            if (role.parent != null)
                role.parent.addChild(bullet);
        }
    };
    /**
     来回扫射
     */
    BulletUtls.Shoot_4 = function (camp, role, xDiff, yDiff) {
        for (var i = 0; i < 36; i++) {
            Laya.timer.once(30 * i, this, function (index) {
                //从对象池里面创建一个子弹
                var bullet = RoleFactory_1.default.GetRole("bullet1");
                //初始化子弹信息
                bullet.init("bullet1", 1, 10, 1, camp);
                //子弹消失后会不显示，重新初始化
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(role.x + xDiff, role.y + yDiff);
                if (index > 18)
                    index = 36 - index;
                //不同角度
                bullet.rotation = -90 + index * 10;
                //添加到角色层
                if (role.parent != null)
                    role.parent.addChild(bullet);
            }, [i], false);
        }
    };
    /**
     圆形子弹
     */
    BulletUtls.Shoot_5 = function (camp, role, xDiff, yDiff) {
        //多发子弹
        for (var i = 0; i < 36; i++) {
            //从对象池里面创建一个子弹
            var bullet = RoleFactory_1.default.GetRole("bullet1");
            //初始化子弹信息
            bullet.init("bullet1", 1, 10, 1, camp);
            //子弹消失后会不显示，重新初始化
            bullet.visible = true;
            //设置子弹发射初始化位置
            bullet.pos(role.x + xDiff, role.y + yDiff);
            //不同角度
            bullet.rotation = -180 + i * 10;
            //添加到角色层
            if (role.parent != null)
                role.parent.addChild(bullet);
        }
    };
    return BulletUtls;
}());
exports.default = BulletUtls;
},{"./RoleFactory":16}],10:[function(require,module,exports){
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
},{"../GameConst":2,"./Role":15}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enemy_2 = require("./Enemy");
var BulletUtls_1 = require("./BulletUtls");
//角色
var Enemy_1 = /** @class */ (function (_super) {
    __extends(Enemy_1, _super);
    function Enemy_1() {
        var _this = _super.call(this) || this;
        //是否向左边移动
        _this.isMoveLeft = true;
        _this.tickTime = 0;
        _this.subType = 0;
        return _this;
    }
    Enemy_1.prototype.InitSelf = function () {
        this.isMoveLeft = Math.random() < 0.5;
        this.SetSubType();
    };
    Enemy_1.prototype.SetSubType = function () {
        this.subType = Math.random() < 0.6 ? 0 : 1;
        if (this.subType == 0) {
            this.m_ColorFilter.color(0, 0, 0, 1);
        }
        else {
            this.m_ColorFilter.color(255, 0, 0, 1);
        }
    };
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
    /**角色死亡**/
    Enemy_1.prototype.lostProp = function () {
        if (this.subType == 1)
            BulletUtls_1.default.Shoot_5(this.camp, this, 0, 10);
    };
    return Enemy_1;
}(Enemy_2.default));
exports.default = Enemy_1;
},{"./BulletUtls":9,"./Enemy":10}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enemy_1 = require("./Enemy");
var BulletUtls_1 = require("./BulletUtls");
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
            //三发子弹
            BulletUtls_1.default.Shoot_2(this.camp, this, 0, 30);
        }
    };
    return Enemy_2;
}(Enemy_1.default));
exports.default = Enemy_2;
},{"./BulletUtls":9,"./Enemy":10}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ufo_1 = require("./ufo");
var Enemy_1 = require("./Enemy");
var BulletUtls_1 = require("./BulletUtls");
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
        var _this = this;
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
                BulletUtls_1.default.Shoot_3(this.camp, this, 0, 80);
                Laya.timer.once(500, this, function () {
                    BulletUtls_1.default.Shoot_3(_this.camp, _this, 0, 80);
                });
            }
            else {
                BulletUtls_1.default.Shoot_4(this.camp, this, 0, 80);
            }
        }
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
},{"./BulletUtls":9,"./Enemy":10,"./ufo":17}],14:[function(require,module,exports){
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
},{"../GameConst":2,"./Role":15,"./RoleFactory":16}],15:[function(require,module,exports){
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
        //允许染色
        _this.m_ColorFilter = new Laya.ColorFilter();
        _this.filters = [_this.m_ColorFilter];
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
        this.InitSelf();
    };
    //用了池 构造函数不会每次调用 初始化放在这
    Role.prototype.InitSelf = function () {
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
},{"../GameConst":2}],16:[function(require,module,exports){
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
},{"./Bullet":8,"./Enemy_1":11,"./Enemy_2":12,"./Enemy_3":13,"./Hero":14,"./Role":15,"./ufo":17}],17:[function(require,module,exports){
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
},{"./Role":15}],18:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRW5lbXlNYW5hZ2VyLnRzIiwic3JjL0dhbWVDb25zdC50cyIsInNyYy9HYW1lTWFwLnRzIiwic3JjL0dhbWVPdmVyLnRzIiwic3JjL0dhbWVQbGF5LnRzIiwic3JjL0dhbWVTdGFydC50cyIsInNyYy9NYWluLnRzIiwic3JjL1JvbGUvQnVsbGV0LnRzIiwic3JjL1JvbGUvQnVsbGV0VXRscy50cyIsInNyYy9Sb2xlL0VuZW15LnRzIiwic3JjL1JvbGUvRW5lbXlfMS50cyIsInNyYy9Sb2xlL0VuZW15XzIudHMiLCJzcmMvUm9sZS9FbmVteV8zLnRzIiwic3JjL1JvbGUvSGVyby50cyIsInNyYy9Sb2xlL1JvbGUudHMiLCJzcmMvUm9sZS9Sb2xlRmFjdG9yeS50cyIsInNyYy9Sb2xlL3Vmby50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDTEEseUNBQW9DO0FBQ3BDLGtEQUE2QztBQUU3QztJQUlJLHNCQUFZLElBQVM7UUFFakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLGdDQUFTLEdBQWhCO1FBRUksUUFBUTtRQUNkLG1CQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUN6QixRQUFRO1FBQ1IsbUJBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFNBQVM7UUFDVCxtQkFBUyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDbkIsWUFBWTtRQUNaLG1CQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixhQUFhO1FBQ2IsbUJBQVMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFSixRQUFRO0lBQ0Qsc0NBQWUsR0FBdEI7UUFFQyxvQkFBb0I7UUFDcEIsT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEdBQUcsbUJBQVMsQ0FBQyxVQUFVLENBQUMsSUFBRyxDQUFDLEVBQzFEO1lBQ0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsbUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsbUJBQVMsQ0FBQyxPQUFPLEVBQUcsbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsbUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwSDtRQUNELFFBQVE7UUFDUixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLG1CQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDaEU7WUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRSxtQkFBUyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUMsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsbUJBQVMsQ0FBQyxPQUFPLEVBQUcsbUJBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsbUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN4STtRQUNELFFBQVE7UUFDUixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxHQUFHLG1CQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFDaEU7WUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxtQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFBUyxDQUFDLElBQUksR0FBRyxDQUFDLEVBQUMsbUJBQVMsQ0FBQyxN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QyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdB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QUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMs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YXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBNYWluIGZyb20gXCIuL01haW5cIjtcclxuaW1wb3J0IFJvbGVcdGZyb20gXCIuL1JvbGUvUm9sZVwiO1xyXG5pbXBvcnQgSGVyb1x0ZnJvbSBcIi4vUm9sZS9IZXJvXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9Sb2xlL0VuZW15XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vUm9sZS9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGUvUm9sZUZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15TWFuYWdlclxyXG57XHJcbiAgICBwcml2YXRlIE1haW46TWFpbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYWluOk1haW4pIFxyXG5cdHtcclxuICAgICAgICB0aGlzLk1haW4gPSBtYWluO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldEluZm8oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/mlYzkurrliLfmlrDliqDpgJ9cclxuXHRcdEdhbWVDb25zdC5jcmVhdGVUaW1lID0gMDtcclxuXHRcdC8v5pWM5Lq66YCf5bqm5o+Q5Y2HXHJcblx0XHRHYW1lQ29uc3Quc3BlZWRVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuihgOmHj+aPkOWNh1x0XHJcblx0XHRHYW1lQ29uc3QuaHBVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuaVsOmHj+aPkOWNh1x0XHRcdFx0XHJcblx0XHRHYW1lQ29uc3QubnVtVXAgPSAwO1xyXG5cdFx0Ly/ljYfnuqfnrYnnuqfmiYDpnIDnmoTmiJDnu6nmlbDph49cclxuXHRcdEdhbWVDb25zdC5sZXZlbFVwU2NvcmUgPSAxMDtcdFx0XHJcbiAgICB9XHJcblxyXG5cdC8v55Sf5oiQ5pWM5pa56aOe5py6XHJcblx0cHVibGljIGxvb3BDcmVhdGVFbmVteSgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+WIm+W7uuaVjOacuu+8jOWKoOWFpeWFs+WNoeWNh+e6p+aVsOaNru+8jOaPkOmrmOmavuW6plxyXG5cdFx0Ly/nlJ/miJDlsI/po57mnLpcclxuXHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICg4MCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lKSA9PTApXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMCwgR2FtZUNvbnN0Lmhwc1swXSxHYW1lQ29uc3Quc3BlZWRzWzBdICsgR2FtZUNvbnN0LnNwZWVkVXAgLCBHYW1lQ29uc3QubnVtc1swXSArIEdhbWVDb25zdC5udW1VcCk7XHJcblx0XHR9XHJcblx0XHQvL+eUn+aIkOS4reWei+mjnuaculxyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDUwMCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lICogMikgPT0gMCkgXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMSwgR2FtZUNvbnN0Lmhwc1sxXSArR2FtZUNvbnN0LmhwVXAgKiAyLEdhbWVDb25zdC5zcGVlZHNbMV0gKyBHYW1lQ29uc3Quc3BlZWRVcCAsIEdhbWVDb25zdC5udW1zWzFdICsgR2FtZUNvbnN0Lm51bVVwKTtcclxuXHRcdH1cclxuXHRcdC8v55Sf5oiQYm9zc1xyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDUwMCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lICogMykgPT0gMCkgXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMiwgR2FtZUNvbnN0Lmhwc1syXSArIEdhbWVDb25zdC5ocFVwICogNixHYW1lQ29uc3Quc3BlZWRzWzJdLCBHYW1lQ29uc3QubnVtc1syXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAg5Yib5bu65pWM5Lq6XHJcblx0ICogQHBhcmFtIGluZGV4IFx05pWM5Lq657yW5Y+3XHJcblx0ICogQHBhcmFtIGhwICAgXHRcdCDmlYzkurrooYDph49cclxuXHQgKiBAcGFyYW0gc3BlZWRcdFx05pWM5Lq66YCf5bqmXHJcblx0ICogQHBhcmFtIG51bVx0XHTmlYzkurrmlbDph49cclxuXHQgKi9cclxuXHRwcml2YXRlIGNyZWF0ZUVuZW15KGluZGV4Om51bWJlcixocDpudW1iZXIsc3BlZWQ6bnVtYmVyLG51bTpudW1iZXIpOnZvaWQgXHJcblx0e1xyXG5cdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IG51bTsgaSsrKVxyXG5cdFx0e1xyXG5cdFx0XHRsZXQgZW5lbXlUeXBlID0gXCJlbmVteVwiICsgKGluZGV4KzEpO1xyXG5cdFx0XHQvL+WIm+W7uuaVjOS6uu+8jOS7juWvueixoeaxoOWIm+W7ulxyXG5cdFx0XHRsZXQgZW5lbXk6RW5lbXkgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKGVuZW15VHlwZSkgYXMgRW5lbXk7XHJcblx0XHRcdC8v5Yid5aeL5YyW5pWM5Lq6XHJcblx0XHRcdGVuZW15LmluaXQoZW5lbXlUeXBlLCBocCwgc3BlZWQsR2FtZUNvbnN0LnJhZGl1c1tpbmRleF0sMSk7XHJcblx0XHRcdC8v5LuO5a+56LGh5rGg5Lit5Yib5bu655qE5a+56LGh5q275Lqh5YmN6KKr6ZqQ6JeP5LqG77yM5Zug5q2k6KaB6YeN5paw5Yid5aeL5YyW5pi+56S677yM5ZCm5YiZ5paw5Yib5bu66KeS6Imy5LiN5Lya5pi+56S65Ye65p2lXHJcblx0XHRcdGVuZW15LnZpc2libGUgPSB0cnVlO1xyXG5cdFx0XHQvL+maj+acuuS9jee9rlxyXG5cdFx0XHRlbmVteS5wb3MoTWF0aC5yYW5kb20oKSAqKDcyMC04MCkrNTAsIC1NYXRoLnJhbmRvbSgpICogMTAwKTtcclxuXHRcdFx0Ly/mt7vliqDliLDoiJ7lj7DkuIpcclxuXHRcdFx0dGhpcy5NYWluLnJvbGVMYXllci5hZGRDaGlsZChlbmVteSk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25zdFxyXG57XHJcbiAgICAvL+a4uOaIj+WFs+WNoeaPkOWNh+WxnuaAp1xyXG5cdC8qKirmlYzkurrliLfmlrDliqDpgJ8qKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlVGltZTpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrpgJ/luqbmj5DljYcqKiovXHJcblx0cHVibGljIHN0YXRpYyBzcGVlZFVwOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uuihgOmHj+aPkOWNhyoqKi9cdFx0XHJcblx0cHVibGljIHN0YXRpYyBocFVwOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uuaVsOmHj+aPkOWNhyoqKi9cdFx0XHRcdFx0XHJcblx0cHVibGljIHN0YXRpYyBudW1VcDpudW1iZXIgPSAwO1xyXG5cdC8qKioq5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePKioqL1xyXG4gICAgcHVibGljIHN0YXRpYyBsZXZlbFVwU2NvcmU6IG51bWJlciA9IDEwO1xyXG5cclxuXHQvKioqKuaVjOacuuihgOmHj+ihqCoqKiovXHJcblx0cHVibGljIHN0YXRpYyBocHM6IG51bWJlcltdID0gWzEsIDcsIDE1XTtcclxuXHQvKioq5pWM5py655Sf5oiQ5pWw6YeP6KGoKiovXHJcblx0cHVibGljIHN0YXRpYyBudW1zOiBudW1iZXJbXSA9IFsxLCAxLCAxXTtcclxuXHQvKioq5pWM5py66YCf5bqm6KGoKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgc3BlZWRzOiAgbnVtYmVyW10gPSBbMiwgMSwgMC4zXTtcclxuXHQvKioq5pWM5py66KKr5Ye75Y2K5b6E6KGoKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgcmFkaXVzOiAgbnVtYmVyW10gPSBbMjAsIDM1LCA4MF07XHJcbiAgICBcclxuXHQvKirmuLjmiI/lhbPljaHmlbAqKiovXHJcblx0cHVibGljIHN0YXRpYyBsZXZlbDpudW1iZXIgPSAxO1xyXG5cdC8qKueOqeWutuW+l+WIhioqKi9cclxuXHRwdWJsaWMgc3RhdGljIHNjb3JlOm51bWJlciA9IDA7XHJcbn1cclxuXHJcbmV4cG9ydCBlbnVtIFJvbGVTdGF0ZVxyXG57XHJcbiAgICBGbHksICAgICAgICAvL+mjnuihjOeKtuaAgVxyXG4gICAgSW52aW5jaWJsZSAgLy/ml6DmlYxcclxufVxyXG4iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/og4zmma/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVNYXAgZXh0ZW5kcyB1aS5HYW1lQmdVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOa4uOaIj+iDjOaZr+enu+WKqOabtOaWsFxyXG4gICAgICAgICovXHRcdFxyXG4gICAgcHVibGljIHVwZGF0ZU1hcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLnkrPTE7XHJcbiAgICAgICAgLy/lpoLmnpzog4zmma/lm77liLDkuobkuIvpnaLkuI3lj6/op4HvvIznq4vljbPosIPmlbTkvY3nva7liLDkuIrpnaLlvqrnjq/mmL7npLpcclxuICAgICAgICAvL+a4uOaIj+iInuWPsOmrmOS4ujEyODBcclxuICAgICAgICBpZiAodGhpcy5iZzEueSArIHRoaXMueSA+PSAxMjgwKSBcclxuICAgICAgICB7IFxyXG4gICAgICAgICAgICB0aGlzLmJnMS55IC09IDEyODAgKiAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5iZzIueSArIHRoaXMueSA+PSAxMjgwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuYmcyLnkgLT0gMTI4MCAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU92ZXIgZXh0ZW5kcyB1aS5HYW1lT3ZlclVJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgXHQvL1wi6YeN5paw5byA5aeLXCLmjInpkq7pvKDmoIfkuovku7ZcclxuXHRcdFx0dGhpcy5idG5fcmVzdGFydC5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uUmVzdGFydCk7XHJcbiAgICB9XHJcblx0LyoqXHJcblx0XHTmuLjmiI/ph43mlrDlvIDlp4tcclxuXHRcdCAqL1x0XHRcclxuXHRcdHByaXZhdGUgb25SZXN0YXJ0KCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aSreaUvklEReS4ree8lui+keeahOaMiemSruWKqOeUu1xyXG5cdFx0XHR0aGlzLmFuaV9yZXN0YXJ0LnBsYXkoMCxmYWxzZSk7XHJcblx0XHRcdC8v55uR5ZCs5Yqo55S75a6M5oiQ5LqL5Lu277yM5rOo5oSP55Sob25jZVxyXG5cdFx0XHR0aGlzLmFuaV9yZXN0YXJ0Lm9uY2UoTGF5YS5FdmVudC5DT01QTEVURSx0aGlzLHRoaXMuQW5pQ29tcGxldGUpO1xyXG5cdFx0fVxyXG5cdFx0LyoqXHJcblx0XHQg5oyJ6ZKu5Yqo55S75pKt5pS+5a6M5oiQXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgQW5pQ29tcGxldGUoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5Y+R6YCB6YeN5paw5byA5aeL5LqL5Lu277yM5ZyoTWFpbuexu+S4reebkeWQrFxyXG5cdFx0XHR0aGlzLmV2ZW50KFwicmVTdGFydFwiKVxyXG5cdFx0XHQvL+e8k+WKqOWKqOeUu+WFs+mXreaViOaenOOAgklEReS4remhtemdouS4ukRpYWxvZ+aJjeWPr+eUqFxyXG5cdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHR9XHJcblxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lUGxheSBleHRlbmRzIHVpLkdhbWVQbGF5VUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL+ebkeWQrOaaguWBnOaMiemSruS6i+S7tlxyXG4gICAgICAgIHRoaXMuYnRuX3BhdXNlLm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25QYXVzZSlcclxuICAgIH1cclxuXHJcblx0LyoqXHJcblx0XHQg5ri45oiP5pqC5YGcXHJcblx0XHQgKi9cdFxyXG5cdFx0cHJpdmF0ZSBvblBhdXNlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aYvuekuklEReS4remakOiXj+eahOaaguWBnOeVjOmdolxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS52aXNpYmxlPXRydWU7XHJcblx0XHRcdC8v5pqC5YGc55WM6Z2i5Yqg54K55Ye755uR5ZCs77yI5LiA5qyh77yJXHJcblx0XHRcdHRoaXMuZ2FtZVBhdXNlLm9uY2UoTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbkNvbnRpbnVlKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHQvL+aXtumXtOWvueixoee8qeaUvuS4ujDlsLHmmK/lgZzmraJcclxuXHRcdFx0TGF5YS50aW1lci5zY2FsZT0wO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCDmuLjmiI/nu6fnu61cclxuXHRcdCAqL1x0XHJcblx0XHRwcml2YXRlIG9uQ29udGludWUoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pe26Ze05a+56LGh57yp5pS+5Li6MeWwseaYr+ato+W4uOmAn+W6puaSreaUvlxyXG5cdFx0XHRMYXlhLnRpbWVyLnNjYWxlPTE7XHJcblx0XHRcdC8v6ZqQ6JeP5pqC5YGc55WM6Z2iXHJcblx0XHRcdHRoaXMuZ2FtZVBhdXNlLnZpc2libGU9ZmFsc2U7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKioq5pys5bGA5ri45oiP5pWw5o2uVUnmm7TmlrAqKiovXHJcblx0XHRwdWJsaWMgdXBkYXRlKGhwOm51bWJlcixsZXZlbDpudW1iZXIsc2NvcmU6bnVtYmVyKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v6KeS6Imy6KGA6YeP5pu05pawXHJcblx0XHRcdHRoaXMudHh0X2hwLnRleHQ9XCJIUDpcIitocDtcclxuXHRcdFx0Ly/lhbPljaHnrYnnuqfmm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfbGV2ZWwudGV4dD1cIkxFVkVMOlwiK2xldmVsO1xyXG5cdFx0XHQvL+a4uOaIj+WIhuaVsOabtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9zY29yZS50ZXh0PVwiU0NPUkU6XCIrc2NvcmU7XHJcblx0XHR9XHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/lvIDlp4vnlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVTdGFydCBleHRlbmRzIHVpLkdhbWVTdGFydFVJXHJcbntcclxuICAgIC8qKirmuLjmiI/otYTmupDlnLDlnYDmlbDnu4QqKiovXHJcbiAgICAgcHJpdmF0ZSBhc3NldEFycjphbnk9W1xyXG4gICAge3VybDpcInJlcy9hdGxhcy9nYW1lUm9sZS5hdGxhc1wifVxyXG4gICAgLCB7dXJsOlwic291bmQvYWNoaWV2ZW1lbnQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICAsIHt1cmw6XCJzb3VuZC9idWxsZXQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICAsIHt1cmw6XCJzb3VuZC9nYW1lX292ZXIubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICAsIHt1cmw6XCJzb3VuZC9lbmVteTFfZGllLm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvZW5lbXkzX291dC5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgIF1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8v5ri45oiP5Yqg6L295pyq5a6M5oiQ5pqC5pe25LiN5pi+56S677yM6Ziy5q2i54K55Ye75Ye66ZSZXHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8v55uR5ZCs55WM6Z2i5piv5ZCm5YWz6ZetXHJcbiAgICAgICAgdGhpcy5vbmNlKGxheWEuZXZlbnRzLkV2ZW50LkNMT1NFLHRoaXMsdGhpcy5vbkNsb3NlKTtcclxuICAgICAgICAvL+WKoOi9veWJqeS9mea4uOaIj+i1hOa6kOOAgemfs+S5kO+8jOWKoOi9veWujOaIkOS4juWKoOi9vei/m+W6puWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5hc3NldEFycixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkNvbXBsZXRlKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vblByb2dyZXNzKSlcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+i1hOa6kOWKoOi9veWujOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/liqDovb3lrozmiJBcclxuICAgICAgICB0aGlzLnR4dF9sb2FkLnRleHQ9XCLotYTmupDliqDovb3lrozmiJAs5byA5aeL5ri45oiP5ZCnLi4uXCI7XHJcbiAgICAgICAgLy/muLjmiI/lvIDlp4vmjInpkq7mmL7npLrlubblvLnlh7pcclxuICAgICAgICB0aGlzLmJ0bl9zdGFydC52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgLy/nvJPliqjnsbvlvLnlh7rliqjnlLtcclxuICAgICAgICBMYXlhLlR3ZWVuLmZyb20odGhpcy5idG5fc3RhcnQse3k6dGhpcy5idG5fc3RhcnQueSsyMH0sMTAwMCxMYXlhLkVhc2UuZWxhc3RpY091dCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog5ri45oiP6LWE5rqQ5Yqg6L296L+b5bqmXHJcbiAgICAgKiBAcGFyYW0gbG9hZE51bSAg6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25Qcm9ncmVzcyhsb2FkTnVtOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5pi+56S65Yqg6L296L+b5bqmXHJcbiAgICAgICAgdGhpcy50eHRfbG9hZC50ZXh0PVwi6LWE5rqQ5Yqg6L295Lit77yM5b2T5YmN6L+b5bqm77yaXCIrbG9hZE51bSoxMDArXCIlXCI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnlYzpnaLlhbPpl61cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNsb3NlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5LuO6Iie5Y+w56e76Zmk6Ieq5bexXHJcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgLy/lj6rliqDovb3kuIDmrKHvvIzlm6DmraTnm7TmjqXmtojmr4Hoh6rlt7FcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgV2ViR0wgPSBMYXlhLldlYkdMO1xyXG5pbXBvcnQgU3RhZ2UgPSBMYXlhLlN0YWdlO1xyXG5pbXBvcnQgRXZlbnQgPSBsYXlhLmV2ZW50cy5FdmVudDtcclxuaW1wb3J0IEdhbWVTdGFydCBmcm9tIFwiLi9HYW1lU3RhcnRcIjtcclxuaW1wb3J0IEdhbWVNYXAgZnJvbSBcIi4vR2FtZU1hcFwiO1xyXG5pbXBvcnQgR2FtZVBsYXkgZnJvbSBcIi4vR2FtZVBsYXlcIjtcclxuaW1wb3J0IEdhbWVPdmVyIGZyb20gXCIuL0dhbWVPdmVyXCI7XHJcbmltcG9ydCBSb2xlXHRmcm9tIFwiLi9Sb2xlL1JvbGVcIjtcclxuaW1wb3J0IEhlcm9cdGZyb20gXCIuL1JvbGUvSGVyb1wiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vUm9sZS9FbmVteVwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL1JvbGUvQnVsbGV0XCI7XHJcbmltcG9ydCBFbmVteU1hbmFnZXIgZnJvbSBcIi4vRW5lbXlNYW5hZ2VyXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlL1JvbGVGYWN0b3J5XCI7XHJcblxyXG5pbXBvcnQgKiBhcyBHYW1lQ29uc3RUcyBmcm9tIFwiLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IFJvbGVTdGF0ZSA9IEdhbWVDb25zdFRzLlJvbGVTdGF0ZTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gXHJcbntcclxuXHRwdWJsaWMgc3RhdGljIGluc3RhbmNlOk1haW47XHJcblx0cHVibGljIHN0YXRpYyBHZXRJbnN0YW5jZSgpOk1haW5cclxuXHR7XHJcblx0XHRpZih0aGlzLmluc3RhbmNlID09IG51bGwpXHJcblx0XHRcdHRoaXMuaW5zdGFuY2UgPSBuZXcgTWFpbigpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzLmluc3RhbmNlO1xyXG5cdH1cclxuXHJcblx0Lyoq5byA5aeL6aG16Z2iKioqL1xyXG5cdHB1YmxpYyBzdGFydDpHYW1lU3RhcnQ7XHJcblx0Lyoq5Zyw5Zu+6aG16Z2iKioqL1xyXG5cdHB1YmxpYyBtYXA6R2FtZU1hcDtcclxuXHQvKirmuLjmiI/kuK3nlYzpnaIqKiovXHJcblx0cHVibGljIHBsYXk6R2FtZVBsYXk7XHJcblx0Lyoq5ri45oiP57uT5p2f6aG16Z2iKioqL1xyXG5cdHB1YmxpYyBvdmVyOkdhbWVPdmVyO1xyXG5cclxuXHQvL+aVjOaWueeUn+aIkOeuoeeQhlxyXG5cdHByaXZhdGUgZW5lbXlNYW5hZ2VyOkVuZW15TWFuYWdlcjtcclxuXHJcblx0Lyoq6KeS6Imy5bGC5a655ZmoKioqL1xyXG5cdHB1YmxpYyByb2xlTGF5ZXI6TGF5YS5TcHJpdGU7XHJcblx0Lyoq546p5a625Li76KeSKioqL1xyXG5cdHB1YmxpYyBoZXJvOkhlcm87XHJcblx0XHJcblx0Lyoq6byg5qCH5LiK5LiA5bineOW6p+aghyoqICovXHRcdFxyXG5cdHByaXZhdGUgbW92ZVg6bnVtYmVyO1xyXG5cdC8qKum8oOagh+S4iuS4gOW4p3nluqfmoIcqKiAqL1x0XHJcblx0cHJpdmF0ZSBtb3ZlWTpudW1iZXI7XHJcblxyXG5cdC8qKioq5Li76KeS5q275Lqh5ZCO5ri45oiP57uT5p2f5pe26Ze0KioqL1xyXG5cdHByaXZhdGUgZGVhdGhUaW1lOm51bWJlcj0wXHJcblxyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG5cdFx0Ly/liJ3lp4vljJblvJXmk47vvIzlu7rorq7lop7liqBXZWJHbOaooeW8j1xyXG5cdFx0TGF5YS5pbml0KDcyMCwxMjgwLFdlYkdMKTtcclxuXHRcdC8v5YWo5bGP5LiN562J5q+U57yp5pS+5qih5byPXHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX0VYQUNURklUO1xyXG5cdFx0Ly/liqDovb3liJ3lp4vljJZVSei1hOa6kFxyXG5cdFx0TGF5YS5sb2FkZXIubG9hZChcInJlcy9hdGxhcy9nYW1lVUkuYXRsYXNcIixsYXlhLnV0aWxzLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5HYW1lU3RhcnQpKTtcclxuXHRcdFxyXG5cdFx0Ly/liJ3lp4vljJbop5LoibLnrqHnkIblmahcclxuXHRcdHRoaXMuZW5lbXlNYW5hZ2VyID0gbmV3IEVuZW15TWFuYWdlcih0aGlzKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgR2FtZVN0YXJ0KCk6dm9pZCBcclxuXHR7XHJcblx0XHQvL+WunuS+i+WMluW8gOWni+mhtemdolxyXG5cdFx0dGhpcy5zdGFydCA9IG5ldyBHYW1lU3RhcnQoKTtcclxuXHRcdHRoaXMuc3RhcnQucG9wdXAoKTtcclxuXHRcdC8v55uR5ZCs5byA5aeL5ri45oiP5byA5aeL5oyJ6ZKu5LqL5Lu2LOeCueWHu+WQjui/m+WFpea4uOaIj+S4rVxyXG5cdFx0dGhpcy5zdGFydC5idG5fc3RhcnQub24oRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLmdhbWVJbml0KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOa4uOaIj+S4re+8jOa4uOaIj+WIneWni+WMllxyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGdhbWVJbml0KCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v57yT5Yqo5Yqo55S75YWz6Zet5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHR0aGlzLnN0YXJ0LmNsb3NlKCk7XHJcblx0XHRcclxuXHRcdC8v6YeN572u5YWz5Y2h5pWw5o2uXHJcblx0XHQvL+a4uOaIj+WFs+WNoeaVsFxyXG5cdFx0R2FtZUNvbnN0LmxldmVsID0gMTtcclxuXHRcdC8v546p5a625b6X5YiGXHJcblx0XHRHYW1lQ29uc3Quc2NvcmUgPSAwO1xyXG5cclxuXHRcdHRoaXMuZW5lbXlNYW5hZ2VyLlJlc2V0SW5mbygpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluWcsOWbvuiDjOaZr+mhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLm1hcCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLm1hcCA9IG5ldyBHYW1lTWFwKCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1hcCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW6KeS6Imy5bGC5bm25Yqg6L295Yiw6Iie5Y+wKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMucm9sZUxheWVyID09IG51bGwpXHJcblx0XHRcdHRoaXMucm9sZUxheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMucm9sZUxheWVyKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbmuLjmiI/kuK1VSemhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLnBsYXkgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5wbGF5ID0gbmV3IEdhbWVQbGF5KCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnBsYXkpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluS4u+inkijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLmhlcm8gPT0gbnVsbClcclxuXHRcdFx0dGhpcy5oZXJvID0gUm9sZUZhY3RvcnkuR2V0Um9sZShcImhlcm9cIikgYXMgSGVybztcclxuXHRcdC8v5Yid5aeL5YyW6KeS6Imy57G75Z6L44CB6KGA6YeP77yM5rOo77ya6YCf5bqmc3BlZWTkuLow77yM5Zug5Li65Li76KeS5piv6YCa6L+H5pON5o6n5pS55Y+Y5L2N572uLOmYteiQpeS4ujBcclxuXHRcdHRoaXMuaGVyby5pbml0KFwiaGVyb1wiLDEwLDAsMzAsMCk7XHJcblx0XHQvL+atu+S6oeWQjuS8mumakOiXj++8jOmHjeaWsOW8gOWni+WQjumcgOaYvuekulxyXG5cdFx0dGhpcy5oZXJvLnZpc2libGU9dHJ1ZTtcclxuXHRcdC8v5Li76KeS5L2N572u5L+u5pS5XHJcblx0XHR0aGlzLmhlcm8ucG9zKDM2MCw4MDApO1xyXG5cdFx0Ly/op5LoibLliqDovb3liLDop5LoibLlsYLkuK1cclxuXHRcdHRoaXMucm9sZUxheWVyLmFkZENoaWxkKHRoaXMuaGVybyk7XHJcblx0XHRcclxuXHRcdC8v6byg5qCH5oyJ5LiL55uR5ZCsXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uTW91c2VEb3duKTtcclxuXHRcdC8v6byg5qCH5oqs6LW355uR5ZCsXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vbk1vdXNlVXApO1xyXG5cdFx0Ly/muLjmiI/kuLvlvqrnjq9cclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLmxvb3ApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOeCueWHu+W8gOWni+inpuWPkeenu+WKqFxyXG5cdFx0Ki9cdFxyXG5cdHByaXZhdGUgb25Nb3VzZURvd24oKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/orrDlvZXpvKDmoIfmjInkuIvml7bnmoTkvY3nva7vvIznlKjkuo7orqHnrpfpvKDmoIfnp7vliqjph49cclxuXHRcdHRoaXMubW92ZVg9TGF5YS5zdGFnZS5tb3VzZVg7XHJcblx0XHR0aGlzLm1vdmVZPUxheWEuc3RhZ2UubW91c2VZO1xyXG5cdFx0Ly9cclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQg5Li76KeS6Lef6ZqP6byg5qCH56e75YqoXHJcblx0XHQqL1x0XHJcblx0cHJpdmF0ZSBvbk1vdXNlTW92ZSgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+iuoeeul+inkuiJsuenu+WKqOmHj1xyXG5cdFx0bGV0IHh4Om51bWJlcj10aGlzLm1vdmVYLUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0bGV0IHl5Om51bWJlcj10aGlzLm1vdmVZLUxheWEuc3RhZ2UubW91c2VZO1xyXG5cdFx0Ly/mm7TmlrDnp7vliqjkvY3nva5cclxuXHRcdHRoaXMuaGVyby54LT14eDtcclxuXHRcdHRoaXMuaGVyby55LT15eTtcclxuXHRcdC8v5pu05paw5pys5bin55qE56e75Yqo5bqn5qCHXHJcblx0XHR0aGlzLm1vdmVYPUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0dGhpcy5tb3ZlWT1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHR9XHJcblx0LyoqXHJcblx0IOm8oOagh+aKrOi1t+OAgeWFs+mXreenu+WKqOebkeWQrFxyXG5cdFx0Ki9cdFx0XHJcblx0cHJpdmF0ZSBvbk1vdXNlVXAoKTp2b2lkXHJcblx0e1xyXG5cdFx0TGF5YS5zdGFnZS5vZmYoRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOa4uOaIj+S4u+W+queOr1xyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGxvb3AoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/mnKzlsYDmuLjmiI/mlbDmja7mm7TmlrBcclxuXHRcdHRoaXMucGxheS51cGRhdGUodGhpcy5oZXJvLmhwLEdhbWVDb25zdC5sZXZlbCxHYW1lQ29uc3Quc2NvcmUpXHJcblx0XHQvL+WmguaenOS4u+inkuatu+S6oVxyXG5cdFx0aWYodGhpcy5oZXJvLmhwPD0wKVxyXG5cdFx0e1xyXG5cdFx0XHQvL+eOqeWutumjnuacuuatu+S6oeWQjuW7tui/n+aXtumXtO+8jDEwMOW4p+WQjuW8ueWHuua4uOaIj+e7k+adn+eVjOmdolxyXG5cdFx0XHR0aGlzLmRlYXRoVGltZSsrXHJcblx0XHRcdGlmICh0aGlzLmRlYXRoVGltZT49MTAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5kZWF0aFRpbWU9MDtcclxuXHRcdFx0XHQvL+a4uOaIj+e7k+adn1xyXG5cdFx0XHRcdHRoaXMuZ2FtZU92ZXIoKTtcclxuXHRcdFx0XHQvL+acrOaWueazleWGheWQjue7remAu+i+keS4jeaJp+ihjFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZS8v5Li76KeS5pyq5q275LqhXHJcblx0XHR7XHJcblx0XHRcdC8v5ri45oiP5Y2H57qn6K6h566XXHJcblx0XHRcdHRoaXMubGV2ZWxVcCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8v5Zyw5Zu+5rua5Yqo5pu05pawXHJcblx0XHR0aGlzLm1hcC51cGRhdGVNYXAoKVxyXG5cdFx0Ly/muLjmiI/norDmkp7pgLvovpFcclxuXHRcdHRoaXMuY2hlY2tDb2xsZWN0KCk7XHJcblx0XHQvL+aVjOaWuemjnuacuueUn+aIkOmAu+i+kVxyXG5cdFx0dGhpcy5lbmVteU1hbmFnZXIubG9vcENyZWF0ZUVuZW15KCk7XHJcblx0fVxyXG5cclxuXHQvL+a4uOaIj+eisOaSnumAu+i+kVxyXG5cdHByaXZhdGUgY2hlY2tDb2xsZWN0KCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v6YGN5Y6G5omA5pyJ6aOe5py677yM5pu05pS56aOe5py654q25oCBXHJcblx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSB0aGlzLnJvbGVMYXllci5udW1DaGlsZHJlbiAtIDE7IGkgPiAtMTsgaS0tKSBcclxuXHRcdHtcclxuXHRcdFx0Ly/ojrflj5bnrKzkuIDkuKrop5LoibJcclxuXHRcdFx0dmFyIHJvbGU6Um9sZSA9IHRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaSkgYXMgUm9sZTtcclxuXHRcdFx0Ly/op5LoibLoh6rouqvmm7TmlrBcclxuXHRcdFx0cm9sZS51cGRhdGUoKTtcclxuXHJcblx0XHRcdC8v5aaC5p6c6KeS6Imy5q275Lqh77yM5LiL5LiA5b6q546vXHJcblx0XHRcdGlmKHJvbGUuaHA8PTApIGNvbnRpbnVlO1xyXG5cdFx0XHQvL+WPkeWwhOWtkOW8uVxyXG5cdFx0XHRyb2xlLnNob290KCk7XHJcblxyXG5cdFx0XHQvL+aXoOaVjOeKtuaAgVxyXG5cdFx0XHRpZihyb2xlLnN0YXRlID09IFJvbGVTdGF0ZS5JbnZpbmNpYmxlKSAgY29udGludWU7XHJcblxyXG5cdFx0XHQvL+eisOaSnuajgOa1i1xyXG5cdFx0XHRmb3IodmFyIGo6bnVtYmVyPWktMTtqPi0xO2otLSlcclxuXHRcdFx0e1x0Ly/ojrflj5bnrKzkuozkuKrop5LoibJcclxuXHRcdFx0XHR2YXIgcm9sZTE6Um9sZT10aGlzLnJvbGVMYXllci5nZXRDaGlsZEF0KGopIGFzIFJvbGU7XHJcblx0XHRcdFx0Ly/ml6DmlYznirbmgIFcclxuXHRcdFx0XHRpZihyb2xlMS5zdGF0ZSA9PSBSb2xlU3RhdGUuSW52aW5jaWJsZSkgIGNvbnRpbnVlO1xyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdC8v5aaC5p6ccm9sZTHmnKrmrbvkuqHkuJTkuI3lkIzpmLXokKVcclxuXHRcdFx0XHRpZihyb2xlMS5ocD4wJiZyb2xlMS5jYW1wIT1yb2xlLmNhbXApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0Ly/ojrflj5bnorDmkp7ljYrlvoRcclxuXHRcdFx0XHRcdHZhciBoaXRSYWRpdXM6bnVtYmVyPXJvbGUuaGl0UmFkaXVzK3JvbGUxLmhpdFJhZGl1cztcclxuXHRcdFx0XHRcdC8v56Kw5pKe5qOA5rWLXHJcblx0XHRcdFx0XHRpZihNYXRoLmFicyhyb2xlLngtcm9sZTEueCk8aGl0UmFkaXVzJiZNYXRoLmFicyhyb2xlLnktcm9sZTEueSk8aGl0UmFkaXVzKVxyXG5cdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHQvL+WmguaenOafkOS4gOS4queisOaSnuS9k+aYr+mBk+WFt++8jOWImeWQg+mBk+WFt++8jOWQpuWImeaOieihgFxyXG5cdFx0XHRcdFx0XHRpZihyb2xlLnByb3BUeXBlIT0wfHxyb2xlMS5wcm9wVHlwZSE9MClcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdC8v5peg5rOV5Yik5pat5ZOq5Liq5piv6YGT5YW377yM5Zug5q2k6YO955u45LqS5ZCD6K+V6K+VXHJcblx0XHRcdFx0XHRcdFx0cm9sZS5lYXRQcm9wKHJvbGUxKTtcclxuXHRcdFx0XHRcdFx0XHRyb2xlMS5lYXRQcm9wKHJvbGUpO1xyXG5cdFx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0Ly/op5LoibLnm7jkupLmjonooYBcclxuXHRcdFx0XHRcdFx0XHRyb2xlLmxvc3RIcCgxKTtcclxuXHRcdFx0XHRcdFx0XHRyb2xlMS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcblx0LyoqXHJcblx0IOa4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGxldmVsVXAoKTp2b2lkXHJcblx0e1xyXG5cdFx0aWYoR2FtZUNvbnN0LnNjb3JlPkdhbWVDb25zdC5sZXZlbFVwU2NvcmUpXHJcblx0XHR7XHJcblx0XHRcdC8v5YWz5Y2h562J57qn5o+Q5Y2HXHJcblx0XHRcdEdhbWVDb25zdC5sZXZlbCsrO1xyXG5cdFx0XHQvL+inkuiJsuihgOmHj+WinuWKoO+8jOacgOWkpzMwXHJcblx0XHRcdHRoaXMuaGVyby5ocD1NYXRoLm1pbih0aGlzLmhlcm8uaHArR2FtZUNvbnN0LmxldmVsKjEsMzApO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOWIm+W7uuaVjOacuumXtOmalOi2iuefrVxyXG5cdFx0XHRHYW1lQ29uc3QuY3JlYXRlVGltZSA9IEdhbWVDb25zdC5sZXZlbCA8IDMwID8gR2FtZUNvbnN0LmxldmVsICogMiA6IDYwO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuumjnuihjOmAn+W6pui2iumrmFxyXG5cdFx0XHRHYW1lQ29uc3Quc3BlZWRVcCA9IE1hdGguZmxvb3IoR2FtZUNvbnN0LmxldmVsIC8gNik7XHJcblx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py66KGA6YeP6LaK6auYXHJcblx0XHRcdEdhbWVDb25zdC5ocFVwID0gTWF0aC5mbG9vcihHYW1lQ29uc3QubGV2ZWwgLyAyKTtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrmlbDph4/otorlpJpcclxuXHRcdFx0R2FtZUNvbnN0Lm51bVVwID0gTWF0aC5mbG9vcihHYW1lQ29uc3QubGV2ZWwgLyAxMCk7XHJcblx0XHRcdC8v5o+Q6auY5LiL5LiA57qn55qE5Y2H57qn5YiG5pWwXHJcblx0XHRcdEdhbWVDb25zdC5sZXZlbFVwU2NvcmUgKz0gR2FtZUNvbnN0LmxldmVsICogMTA7XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdC8qKlxyXG5cdCDmuLjmiI/nu5PmnZ9cclxuXHRcdCovXHJcblx0cHJpdmF0ZSBnYW1lT3ZlcigpOnZvaWRcclxuXHR7XHJcblx0XHQvL+enu+mZpOaJgOacieiInuWPsOS6i+S7tu+8jOm8oOagh+aTjeaOp1xyXG5cdFx0TGF5YS5zdGFnZS5vZmZBbGwoKTtcclxuXHRcdC8v56e76Zmk5Zyw5Zu+6IOM5pmvXHJcblx0XHR0aGlzLm1hcC5yZW1vdmVTZWxmKCk7XHJcblx0XHQvL+enu+mZpOa4uOaIj+S4rVVJXHJcblx0XHR0aGlzLnBsYXkucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHJcblx0XHQvL+a4heepuuinkuiJsuWxguWtkOWvueixoVxyXG5cdFx0dGhpcy5yb2xlTGF5ZXIucmVtb3ZlQ2hpbGRyZW4oMCx0aGlzLnJvbGVMYXllci5udW1DaGlsZHJlbi0xKTtcclxuXHRcdC8v56e76Zmk6KeS6Imy5bGCXHJcblx0XHR0aGlzLnJvbGVMYXllci5yZW1vdmVTZWxmKCk7XHJcblx0XHRcclxuXHRcdC8v5Y676Zmk5ri45oiP5Li75b6q546vXHJcblx0XHRMYXlhLnRpbWVyLmNsZWFyKHRoaXMsdGhpcy5sb29wKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbmuLjmiI/nu5PmnZ/pobXpnaJcclxuXHRcdGlmKHRoaXMub3ZlciA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLm92ZXIgPSBuZXcgR2FtZU92ZXIoKTtcclxuXHRcdC8v5ri45oiP56ev5YiG5pi+56S6XHJcblx0XHR0aGlzLm92ZXIudHh0X3Njb3JlLnRleHQ9IEdhbWVDb25zdC5zY29yZS50b1N0cmluZygpO1xyXG5cdFx0Ly/ku6XlvLnlh7rmlrnlvI/miZPlvIDvvIzmnInnvJPliqjmlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdHRoaXMub3Zlci5wb3B1cCgpO1xyXG5cdFx0Ly/ph43mlrDlvIDlp4vkuovku7bnm5HlkKws54K55Ye75ZCO6L+b5YWl5ri45oiP5LitXHJcblx0XHR0aGlzLm92ZXIub24oXCJyZVN0YXJ0XCIsdGhpcyx0aGlzLmdhbWVJbml0KTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5r+A5rS75ZCv5Yqo57G7XHJcbk1haW4uR2V0SW5zdGFuY2UoKTtcclxuIiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v6ZqQ6JeP77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLmm7TmlrAs6L6555WM5qOA5p+lXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgICAvL+WmguaenOinkuiJsumakOiXj++8jOinkuiJsua2iOS6oeW5tuWbnuaUtlxyXG4gICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLmRpZSgpO1xyXG4gICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICB9XHJcbiAgICAgICAgIFxyXG4gICAgICAgICBsZXQgeFJvdGF0aW9uID0gTWF0aC5zaW4oIExheWEuVXRpbHMudG9SYWRpYW4odGhpcy5yb3RhdGlvbikpO1xyXG4gICAgICAgICBsZXQgeVJvdGF0aW9uID0gTWF0aC5jb3MoIExheWEuVXRpbHMudG9SYWRpYW4odGhpcy5yb3RhdGlvbikpO1xyXG4gICAgICAgICAvL+inkuiJsuagueaNrumAn+W6pumjnuihjFxyXG4gICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZCAqICB4Um90YXRpb24gO1xyXG4gICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZCAgKiAgeVJvdGF0aW9uIDtcclxuIFxyXG4gICAgICAgICAvL+WmguaenOenu+WKqOWIsOaYvuekuuWMuuWfn+S7peWklu+8jOWImeenu+mZpFxyXG4gICAgICAgICBpZiAodGhpcy55ID4gMTI4MCsxMDB8fHRoaXMueTwtMTUwKVxyXG4gICAgICAgICB7XHJcbiAgICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxufSIsImltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5pbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0VXRsc1xyXG57XHJcbiAgICAvKipcclxuICAgIOWNlemil+WtkOW8uVxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBzdGF0aWMgU2hvb3RfMShjYW1wOm51bWJlcixyb2xlOlJvbGUseERpZmY6bnVtYmVyLHlEaWZmOm51bWJlcilcclxuICAgIHtcclxuICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgIGxldCBidWxsZXQ6IEJ1bGxldCA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJidWxsZXQxXCIpO1xyXG4gICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQxXCIsMSwxMCwxLGNhbXApXHJcbiAgICAgICAgLy/lrZDlvLnmtojlpLHlkI7kvJrkuI3mmL7npLrvvIzph43mlrDliJ3lp4vljJZcclxuICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIC8v6K6+572u5a2Q5by55Y+R5bCE5Yid5aeL5YyW5L2N572uXHJcbiAgICAgICAgYnVsbGV0LnBvcyhyb2xlLnggKyB4RGlmZiwgcm9sZS55ICsgeURpZmYpO1xyXG4gICAgICAgIC8v5re75Yqg5Yiw6KeS6Imy5bGCXHJcbiAgICAgICAgaWYoIHJvbGUucGFyZW50ICE9IG51bGwpXHJcbiAgICAgICAgICAgIHJvbGUucGFyZW50LmFkZENoaWxkKGJ1bGxldCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg5pWj5by5IDPlj5FcclxuICAgICAqL1x0XHJcbiAgICBwdWJsaWMgc3RhdGljIFNob290XzIoY2FtcDpudW1iZXIscm9sZTpSb2xlLHhEaWZmOm51bWJlcix5RGlmZjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgMyA7IGkgKyspXHJcbiAgICAgICAgIHtcclxuICAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiYnVsbGV0MVwiKTtcclxuICAgICAgICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDFcIiwxLDEwLDEsY2FtcClcclxuICAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgIGJ1bGxldC5wb3Mocm9sZS54ICsgeERpZmYsIHJvbGUueSArIHlEaWZmKTtcclxuICAgICAgICAgICAgIC8v5LiN5ZCM6KeS5bqmXHJcbiAgICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAtMzAgKyBpICogMzA7XHJcbiAgICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgICAgaWYocm9sZS5wYXJlbnQgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHJvbGUucGFyZW50LmFkZENoaWxkKGJ1bGxldCk7XHJcbiAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDljYrlvKflvaLlrZDlvLlcclxuICAgICAqL1x0XHJcbiAgICBwdWJsaWMgc3RhdGljIFNob290XzMoY2FtcDpudW1iZXIscm9sZTpSb2xlLHhEaWZmOm51bWJlcix5RGlmZjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpJrlj5HlrZDlvLlcclxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDE4IDsgaSArKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgIGxldCBidWxsZXQ6IEJ1bGxldCA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJidWxsZXQxXCIpO1xyXG4gICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDFcIiwxLDEwLDEsY2FtcClcclxuICAgICAgICAgICAgLy/lrZDlvLnmtojlpLHlkI7kvJrkuI3mmL7npLrvvIzph43mlrDliJ3lp4vljJZcclxuICAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgYnVsbGV0LnBvcyhyb2xlLnggKyB4RGlmZiwgcm9sZS55ICsgeURpZmYpO1xyXG4gICAgICAgICAgICAvL+S4jeWQjOinkuW6plxyXG4gICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAtOTAgKyBpICogMTA7XHJcblxyXG4gICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgICBpZihyb2xlLnBhcmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcm9sZS5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg5p2l5Zue5omr5bCEXHJcbiAgICAgKi9cdFxyXG4gICAgIHB1YmxpYyBzdGF0aWMgU2hvb3RfNChjYW1wOm51bWJlcixyb2xlOlJvbGUseERpZmY6bnVtYmVyLHlEaWZmOm51bWJlcilcclxuICAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMCA7IGkgPCAzNiA7IGkgKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMYXlhLnRpbWVyLm9uY2UoMzAgKiBpLHRoaXNcclxuICAgICAgICAgICAgICAgICwoaW5kZXg6bnVtYmVyKT0+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJ1bGxldDogQnVsbGV0ID0gUm9sZUZhY3RvcnkuR2V0Um9sZShcImJ1bGxldDFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/liJ3lp4vljJblrZDlvLnkv6Hmga9cclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDFcIiwxLDEwLDEsY2FtcClcclxuICAgICAgICAgICAgICAgICAgICAvL+WtkOW8uea2iOWkseWQjuS8muS4jeaYvuekuu+8jOmHjeaWsOWIneWni+WMllxyXG4gICAgICAgICAgICAgICAgICAgIGJ1bGxldC52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgICAgICAgICBidWxsZXQucG9zKHJvbGUueCArIHhEaWZmLCByb2xlLnkgKyB5RGlmZik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ID4gMTgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDM2IC0gaW5kZXg7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8v5LiN5ZCM6KeS5bqmXHJcbiAgICAgICAgICAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gLTkwICsgaW5kZXggKiAxMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICAgICAgICAgICBpZihyb2xlLnBhcmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByb2xlLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLFtpXSxmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDlnIblvaLlrZDlvLlcclxuICAgICAqL1x0XHJcbiAgICBwdWJsaWMgc3RhdGljIFNob290XzUoY2FtcDpudW1iZXIscm9sZTpSb2xlLHhEaWZmOm51bWJlcix5RGlmZjpudW1iZXIpXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpJrlj5HlrZDlvLlcclxuICAgICAgICBmb3IobGV0IGkgPSAwIDsgaSA8IDM2IDsgaSArKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgIGxldCBidWxsZXQ6IEJ1bGxldCA9IFJvbGVGYWN0b3J5LkdldFJvbGUoXCJidWxsZXQxXCIpO1xyXG4gICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDFcIiwxLDEwLDEsY2FtcClcclxuICAgICAgICAgICAgLy/lrZDlvLnmtojlpLHlkI7kvJrkuI3mmL7npLrvvIzph43mlrDliJ3lp4vljJZcclxuICAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgYnVsbGV0LnBvcyhyb2xlLnggKyB4RGlmZiwgcm9sZS55ICsgeURpZmYpO1xyXG4gICAgICAgICAgICAvL+S4jeWQjOinkuW6plxyXG4gICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAtMTgwICsgaSAqIDEwO1xyXG4gICAgICAgICAgICAvL+a3u+WKoOWIsOinkuiJsuWxglxyXG4gICAgICAgICAgICBpZihyb2xlLnBhcmVudCAhPSBudWxsKVxyXG4gICAgICAgICAgICAgICAgcm9sZS5wYXJlbnQuYWRkQ2hpbGQoYnVsbGV0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgdWZvIGZyb20gXCIuL3Vmb1wiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuLi9HYW1lQ29uc3RcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IFJvbGVGYWN0b3J5IGZyb20gXCIuL1JvbGVGYWN0b3J5XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteSBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgLy/lop7liqDliIbmlbBcclxuICAgIHB1YmxpYyBhZGRTY29yZTpudW1iZXIgPSAxO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gNTAwMDsgIC8v5bCE5Ye76Ze06ZqUXHJcbiAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSA1MDAwO1xyXG4gICAgfVxyXG5cclxuICAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v5YeP6KGAXHJcbiAgICAgICAgdGhpcy5ocCAtPSBsb3N0SHA7XHJcbiAgICAgICAgLy/moLnmja7ooYDph4/liKTmlq1cclxuICAgICAgICBpZiAodGhpcy5ocCA+IDApIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/lpoLmnpzmnKrmrbvkuqHvvIzliJnmkq3mlL7lj5flh7vliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiaGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZGllXCIpO1xyXG4gICAgICAgICAgICAvL+a3u+WKoOatu+S6oemfs+aViFxyXG4gICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9nYW1lX292ZXIubXAzXCIpO1xyXG4gICAgICAgICAgICBHYW1lQ29uc3Quc2NvcmUrPSB0aGlzLmFkZFNjb3JlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIub25Db21wbGV0ZSgpO1xyXG5cclxuICAgICAgICAvL+WmguaenOatu+S6oeWKqOeUu+aSreaUvuWujOaIkFxyXG4gICAgICAgIGlmKHRoaXMuYWN0aW9uPT1cImRpZVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvc3RQcm9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5hY3Rpb249PVwiaGl0XCIpLy/lpoLmnpzmmK/lj5fkvKTliqjnlLvvvIzkuIvkuIDluKfmkq3mlL7po57ooYzliqjnlLtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImZseVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6KeS6Imy5q275Lqh5o6J6JC954mp5ZOBKiovXHJcbiAgICBwdWJsaWMgbG9zdFByb3AoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcbmltcG9ydCBHYW1lQ29uc3QgZnJvbSBcIi4uL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5pbXBvcnQgUm9sZUZhY3RvcnkgZnJvbSBcIi4vUm9sZUZhY3RvcnlcIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL0VuZW15XCI7XHJcbmltcG9ydCBCdWxsZXRVdGxzIGZyb20gXCIuL0J1bGxldFV0bHNcIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15XzEgZXh0ZW5kcyBFbmVteVxyXG57XHJcbiAgICAvL+aYr+WQpuWQkeW3pui+ueenu+WKqFxyXG4gICAgcHJpdmF0ZSBpc01vdmVMZWZ0ID0gdHJ1ZTtcclxuICAgIHByaXZhdGUgdGlja1RpbWUgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgc3ViVHlwZTpudW1iZXIgPSAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIEluaXRTZWxmKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuaXNNb3ZlTGVmdCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcbiAgICAgICAgdGhpcy5TZXRTdWJUeXBlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBTZXRTdWJUeXBlKClcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN1YlR5cGUgPSAgTWF0aC5yYW5kb20oKSA8IDAuNiA/IDAgOiAxO1xyXG4gICAgICAgIGlmKHRoaXMuc3ViVHlwZSA9PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5tX0NvbG9yRmlsdGVyLmNvbG9yKDAsMCwwLDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLm1fQ29sb3JGaWx0ZXIuY29sb3IoMjU1LDAsMCwxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeaXtumXtFxyXG4gICAgICAgIGxldCB0aW1lOm51bWJlciA9IExheWEuQnJvd3Nlci5ub3coKTtcclxuICAgICAgICAvL+S9jeenu+aXtumXtFxyXG4gICAgICAgIGlmICh0aW1lID4gdGhpcy50aWNrVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudGlja1RpbWUgPSB0aW1lICsgMTAwMDsgXHJcbiAgICAgICAgICAgIHRoaXMuaXNNb3ZlTGVmdCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+inkuiJsuagueaNrumAn+W6pumjnuihjFxyXG4gICAgICAgIGlmKHRoaXMuaXNNb3ZlTGVmdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkICogMC41O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZCAqIDAuNTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5bem5Y+z6LaF5Ye6XHJcbiAgICAgICAgaWYodGhpcy54IDwgdGhpcy5yb2xlQW5pLndpZHRoLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlzTW92ZUxlZnQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnggPiA3MjAtdGhpcy5yb2xlQW5pLndpZHRoLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmlzTW92ZUxlZnQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirop5LoibLmrbvkuqEqKi9cclxuICAgIHB1YmxpYyBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnN1YlR5cGUgPT0gMSlcclxuICAgICAgICAgICAgQnVsbGV0VXRscy5TaG9vdF81KHRoaXMuY2FtcCx0aGlzLDAsMTApO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuaW1wb3J0IEJ1bGxldFV0bHMgZnJvbSBcIi4vQnVsbGV0VXRsc1wiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlfMiBleHRlbmRzIEVuZW15XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gMzAwMDsgIC8v5bCE5Ye76Ze06ZqUXHJcbiAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aGlzLnNob290SW50ZXJ2YWw7IC8v56ys5LiA5qyh5bCE5Ye75pe26Ze0XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSA1O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApXHJcbiAgICAgICAgICAgIHJldHVybjsgXHJcbiAgICAgICBcclxuICAgICAgICAvL+iOt+WPluW9k+WJjeaXtumXtFxyXG4gICAgICAgIGxldCB0aW1lOm51bWJlciA9IExheWEuQnJvd3Nlci5ub3coKTtcclxuICAgICAgICAvL+WmguaenOW9k+WJjeaXtumXtOWkp+S6juS4i+asoeWwhOWHu+aXtumXtFxyXG4gICAgICAgIGlmICh0aW1lID4gdGhpcy5zaG9vdFRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+abtOaWsOS4i+asoeWtkOW8ueWwhOWHu+eahOaXtumXtFxyXG4gICAgICAgICAgICB0aGlzLnNob290VGltZSA9IHRpbWUgKyB0aGlzLnNob290SW50ZXJ2YWwgOyBcclxuXHJcbiAgICAgICAgICAgIC8v5LiJ5Y+R5a2Q5by5XHJcbiAgICAgICAgICAgIEJ1bGxldFV0bHMuU2hvb3RfMih0aGlzLmNhbXAsdGhpcywwLDMwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5pbXBvcnQgRW5lbXkgZnJvbSBcIi4vRW5lbXlcIjtcclxuaW1wb3J0IEJ1bGxldFV0bHMgZnJvbSBcIi4vQnVsbGV0VXRsc1wiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW5lbXlfMyBleHRlbmRzIEVuZW15XHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gODAwMDsgIC8v5bCE5Ye76Ze06ZqUXHJcbiAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aGlzLnNob290SW50ZXJ2YWw7IC8v56ys5LiA5qyh5bCE5Ye75pe26Ze0XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU2NvcmUgPSAxMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDop5LoibLlsITlh7vvvIznlJ/miJDlrZDlvLlcclxuICAgICAqL1x0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPD0gMClcclxuICAgICAgICAgICAgcmV0dXJuOyBcclxuICAgICAgIFxyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gTGF5YS5Ccm93c2VyLm5vdygpO1xyXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pe26Ze05aSn5LqO5LiL5qyh5bCE5Ye75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPiB0aGlzLnNob290VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5pu05paw5LiL5qyh5a2Q5by55bCE5Ye755qE5pe26Ze0XHJcbiAgICAgICAgICAgIHRoaXMuc2hvb3RUaW1lID0gdGltZSArIHRoaXMuc2hvb3RJbnRlcnZhbCA7IFxyXG5cclxuICAgICAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICAgICAgaWYoTWF0aC5yYW5kb20oKSA8IDAuNilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQnVsbGV0VXRscy5TaG9vdF8zKHRoaXMuY2FtcCx0aGlzLDAsODApO1xyXG4gICAgICAgICAgICAgICAgTGF5YS50aW1lci5vbmNlKDUwMCx0aGlzLFxyXG4gICAgICAgICAgICAgICAgICAgICgpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEJ1bGxldFV0bHMuU2hvb3RfMyh0aGlzLmNhbXAsdGhpcywwLDgwKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEJ1bGxldFV0bHMuU2hvb3RfNCh0aGlzLmNhbXAsdGhpcywwLDgwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgXHJcbiAgICAvKirop5LoibLmrbvkuqHmjonokL3nianlk4EqKi9cclxuICAgIHB1YmxpYyBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4qumBk+WFt1xyXG4gICAgICAgIGxldCBwcm9wOnVmbyA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcInVmb1wiLHVmbyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICBsZXQgcjpOdW1iZXI9TWF0aC5yYW5kb20oKTtcclxuICAgICAgICBsZXQgbnVtOm51bWJlcj0ocjwwLjcpPzE6MjtcclxuICAgICAgICBcclxuICAgICAgICAvL+mHjeaWsOWIneWni+WMlumBk+WFt+WxnuaApyzpmLXokKXkuLrmlYzmlrnvvIjlj6rkuI7kuLvop5Llj5HnlJ/norDmkp7vvIlcclxuICAgICAgICBwcm9wLmluaXQoXCJ1Zm9cIitudW0sMSwyLDMwLDEpO1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgcHJvcC5wcm9wVHlwZT1udW07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lvLrliLbmmL7npLpcclxuICAgICAgICBwcm9wLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAvL+eUn+aIkOeahOS9jee9ruS4uuatu+S6oeiAheS9jee9rlxyXG4gICAgICAgIHByb3AucG9zKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgICAgIC8v5Yqg6L295Yiw54i25a655ZmoIFxyXG4gICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlRmFjdG9yeSBmcm9tIFwiLi9Sb2xlRmFjdG9yeVwiO1xyXG5cclxuaW1wb3J0ICogYXMgR2FtZUNvbnN0VHMgZnJvbSBcIi4uL0dhbWVDb25zdFwiO1xyXG5pbXBvcnQgUm9sZVN0YXRlID0gR2FtZUNvbnN0VHMuUm9sZVN0YXRlO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIFJvbGVcclxue1xyXG5cclxuICAgIC8qKirlrZDlvLnlgY/np7vnmoTkvY3nva4qKiovXHJcbiAgICBwcm90ZWN0ZWQgYnVsbGV0UG9zOiBudW1iZXJbXVtdID0gW1swXSwgWy0xNSwgMTVdLCBbLTMwLCAwLCAzMF0sIFstNDUsIC0xNSwgMTUsIDQ1XV07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wbGF5QWN0aW9uKFwiaGl0XCIpO1xyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKFJvbGVTdGF0ZS5JbnZpbmNpYmxlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImRpZVwiKTtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHpn7PmlYhcclxuICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZ2FtZV9vdmVyLm1wM1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAg54q25oCB5pS55Y+YXHJcbiAgICAgKi9cdFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VTdGF0ZShzdGF0ZTpSb2xlU3RhdGUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XHJcbiAgICAgICAgLy/ml6DmlYznirbmgIFcclxuICAgICAgICBpZih0aGlzLnN0YXRlID09IFJvbGVTdGF0ZS5JbnZpbmNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Q291bnQgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBbHBoYVR3ZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcGxheUNvdW50ID0gMDtcclxuICAgIHByaXZhdGUgcGxheUFscGhhVHdlZW4oKVxyXG4gICAge1xyXG4gICAgICAgIC8v57yT5Yqo57G7XHJcbiAgICAgICAgbGV0IHR3ZWVuID0gTGF5YS5Ud2Vlbi50byh0aGlzLHthbHBoYTowLjN9LDMwMCxMYXlhLkVhc2UuYmFja0luT3V0LFxyXG4gICAgICAgICAgICBMYXlhLkhhbmRsZXIuY3JlYXRlKFxyXG4gICAgICAgICAgICAgICAgdGhpcywoKT0+e1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbHBoYSA9IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKCB0aGlzLnBsYXlDb3VudCA+PSAzKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUFscGhhVHdlZW4oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIClcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5oGi5aSN54q25oCBXHJcbiAgICBwcml2YXRlIHJlc2V0U3RhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShSb2xlU3RhdGUuRmx5KTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlkIPliLDpgZPlhbfvvIzliqDooYDmiJblrZDlvLnnuqfliKtcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBlYXRQcm9wKHByb3A6Um9sZSk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5aaC5p6c6LCD55So6ICF5piv5Li76KeS5oiWcHJvcOS4jeaYr+mBk+WFt++8jOWImei/lOWbnlxyXG4gICAgICAgIGlmKHByb3AucHJvcFR5cGU9PTApIHJldHVybjtcclxuICAgICAgICAvL+a3u+WKoOWQg+W8uuWMlumBk+WFt+mfs+aViFx0XHRcdFx0XHRcclxuICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9hY2hpZXZlbWVudC5tcDNcIik7XHJcbiAgICAgICAgLy/lkIPlrZDlvLnnrrFcclxuICAgICAgICBpZihwcm9wLnByb3BUeXBlPT0xKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5a2Q5by557qn5Yir5aKe5YqgXHJcbiAgICAgICAgICAgIHRoaXMuYnVsbGV0TGV2ZWwrK1xyXG4gICAgICAgICAgICAvL+WtkOW8ueavj+WNhzLnuqfvvIzlrZDlvLnmlbDph4/lop7liqAx77yM5pyA5aSn5pWw6YeP6ZmQ5Yi25ZyoNOS4qlxyXG4gICAgICAgICAgICB0aGlzLnNob290TnVtID0gTWF0aC5taW4oTWF0aC5mbG9vcih0aGlzLmJ1bGxldExldmVsIC8gMikgKyAxLDQpO1xyXG4gICAgICAgICAgICAvL+WtkOW8uee6p+WIq+i2iumrmO+8jOWPkeWwhOmikeeOh+i2iuW/q1xyXG4gICAgICAgICAgICB0aGlzLnNob290SW50ZXJ2YWwgPSAzMDAgLSA4ICogKHRoaXMuYnVsbGV0TGV2ZWwgPiA4ID8gOCA6IHRoaXMuYnVsbGV0TGV2ZWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHByb3AucHJvcFR5cGU9PTIpLy/lkIPooYBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6KGA6YeP5aKe5YqgXHJcbiAgICAgICAgICAgIHRoaXMuaHArPTI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6YGT5YW35q275LqhXHJcbiAgICAgICAgcHJvcC5ocD0wO1xyXG4gICAgICAgIC8v6YGT5YW35ZCD5a6M5ZCO5raI5aSx77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgcHJvcC52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOabtOaWsFxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/kuLvop5LovrnnlYzmo4Dmn6VcclxuICAgICAgICAvL+mcgOWHj+WOu+inkuiJsuWuveaIlumrmOeahOS4gOWNiu+8jOWboOS4uuWcqElEReS4reWItuS9nOWKqOeUu+aXtu+8jOaIkeS7rOaKiuinkuiJsueahOS4reW/g+WBmuS4uuS6huinkuiJsuWvueixoeeahOWOn+eCuVxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5bem5Y+z6LaF5Ye6XHJcbiAgICAgICAgaWYodGhpcy54PHRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54PXRoaXMucm9sZUFuaS53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMueD43MjAtdGhpcy5yb2xlQW5pLndpZHRoLzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLng9NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuS4iuS4i+i2heWHulxyXG4gICAgICAgIGlmKHRoaXMueTx0aGlzLnJvbGVBbmkuaGVpZ2h0LzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnk9dGhpcy5yb2xlQW5pLmhlaWdodC8yO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMueT4xMjgwLXRoaXMucm9sZUFuaS5oZWlnaHQvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueT0xMjgwLXRoaXMucm9sZUFuaS5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCkgO1xyXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pe26Ze05aSn5LqO5LiL5qyh5bCE5Ye75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPnRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ojrflvpflj5HlsITlrZDlvLnnmoTkvY3nva7mlbDnu4RcclxuICAgICAgICAgICAgbGV0IHBvczpudW1iZXJbXSA9IHRoaXMuYnVsbGV0UG9zW3RoaXMuc2hvb3ROdW0tMV1cclxuICAgICAgICAgICAgZm9yKGxldCBpOm51bWJlciA9IDAgOyBpPHBvcy5sZW5ndGggOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5pu05paw5LiL5qyh5a2Q5by55bCE5Ye755qE5pe26Ze0XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290VGltZSA9IHRpbWUgKyB0aGlzLnNob290SW50ZXJ2YWwgOyBcclxuICAgICAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBSb2xlRmFjdG9yeS5HZXRSb2xlKFwiYnVsbGV0MlwiKTtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDJcIiwxLC0xMCwxLHRoaXMuY2FtcClcclxuICAgICAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54K3Bvc1tpXSwgdGhpcy55LTgwKTtcclxuICAgICAgICAgICAgICAgIC8v5peL6L2s6KeS5bqmXHJcbiAgICAgICAgICAgICAgICBidWxsZXQucm90YXRpb24gPSAwO1xyXG4gICAgICAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKGJ1bGxldCk7XHJcbiAgICAgICAgICAgICAgICAvL+a3u+WKoOWtkOW8uemfs+aViFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2J1bGxldC5tcDNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxufSIsIlxyXG5pbXBvcnQgQW5pbWF0aW9uID0gTGF5YS5BbmltYXRpb247XHJcbmltcG9ydCBFdmVudCA9IGxheWEuZXZlbnRzLkV2ZW50O1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgKiBhcyBHYW1lQ29uc3RUcyBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBSb2xlU3RhdGUgPSBHYW1lQ29uc3RUcy5Sb2xlU3RhdGU7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdC8qKirpo57mnLrnmoTnsbvlnosgICDigJxoZXJv4oCdOueOqeWutumjnuacuu+8jOKAnGVuZW154oCd77ya5pWM5Lq66aOe5py644CB4oCcYnVsbGXigJ3vvJrlrZDlvLnjgIFcInVmb1wiOumBk+WFtyoqKiovXHJcbiAgICBwdWJsaWMgdHlwZTpzdHJpbmc7XHJcbiAgICAvKioq6aOe5py655qE6KGA6YePKioqL1xyXG4gICAgcHVibGljIGhwOm51bWJlcj0wOyBcclxuICAgIC8qKirpo57mnLrnmoTpgJ/luqYqKiovXHJcbiAgICBwcm90ZWN0ZWQgc3BlZWQ6bnVtYmVyPTA7XHRcclxuICAgIFxyXG4gICAgLyoqKumjnuacuueahOiiq+aUu+WHu+WNiuW+hCoqKi9cclxuICAgIHB1YmxpYyBoaXRSYWRpdXM6bnVtYmVyO1xyXG4gICAgLyoqKumjnuacuueahOmYteiQpe+8iOaVjOaIkeWMuuWIq++8iSoqKi9cclxuICAgIHB1YmxpYyBjYW1wOm51bWJlcjtcclxuICAgIFxyXG4gICAgLyoqKuinkuiJsueahOWKqOeUu+i1hOa6kCoqKi9cclxuICAgIHByb3RlY3RlZCByb2xlQW5pOkFuaW1hdGlvbjtcclxuICAgIC8qKirlvZPliY3liqjnlLvliqjkvZwqKiovXHJcbiAgICBwcm90ZWN0ZWQgYWN0aW9uOnN0cmluZztcclxuICAgIFxyXG4gICAgLyoqKuWwhOWHu+mXtOmalCoqKi9cclxuICAgIHB1YmxpYyBzaG9vdEludGVydmFsOiBudW1iZXI9IDMwMDtcclxuICAgIC8qKirkuIvmrKHlsITlh7vml7bpl7QqKiovXHJcbiAgICBwdWJsaWMgc2hvb3RUaW1lOiBudW1iZXI9IDMwMDtcclxuICAgIFxyXG4gICAgLyoqKirpgZPlhbfnsbvlnosgMDrpo57mnLrmiJblrZDlvLnvvIwxOuWtkOW8ueeuse+8jDI66KGA55O2KioqL1xyXG4gICAgcHVibGljIHByb3BUeXBlOm51bWJlcj0wO1xyXG4gICAgLyoqKuWtkOW8uee6p+WIq++8iOWQg+WtkOW8uemBk+WFt+WQjuWNh+e6p++8iSoqKi9cclxuICAgIHB1YmxpYyBidWxsZXRMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIC8qKirlkIzml7blsITlh7vlrZDlvLnmlbDph48qKiovXHJcbiAgICBwdWJsaWMgc2hvb3ROdW06IG51bWJlcj0gMTtcclxuXHJcbiAgICAvL+minOiJsua4suafk1xyXG4gICAgcHVibGljIG1fQ29sb3JGaWx0ZXI6TGF5YS5Db2xvckZpbHRlcjtcclxuXHJcbiAgICAvL+mjnuacuuW9k+WJjeeKtuaAgVxyXG4gICAgcHVibGljIHN0YXRlOlJvbGVTdGF0ZSA9IFJvbGVTdGF0ZS5GbHk7ICBcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgLy/lrp7kvovljJbliqjnlLtcclxuICAgICAgICAgdGhpcy5yb2xlQW5pPW5ldyBBbmltYXRpb24oKTtcclxuICAgICAgICAgLy/liqDovb1JREXnvJbovpHnmoTliqjnlLvmlofku7ZcclxuICAgICAgICAgdGhpcy5yb2xlQW5pLmxvYWRBbmltYXRpb24oXCJHYW1lUm9sZS5hbmlcIik7XHJcbiAgICAgICAgIC8v5YWB6K645p+T6ImyXHJcbiAgICAgICAgIHRoaXMubV9Db2xvckZpbHRlciA9IG5ldyBMYXlhLkNvbG9yRmlsdGVyKCk7XHJcbiAgICAgICAgIHRoaXMuZmlsdGVycyA9IFsgdGhpcy5tX0NvbG9yRmlsdGVyXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWIneWni+WMllxyXG4gICAgICogQHBhcmFtIHR5cGUgIOinkuiJsuexu+WeiyAtLS3igJxoZXJv4oCdOueOqeWutumjnuacuu+8jOKAnGVuZW15MS0z4oCd77ya5pWM5Lq66aOe5py644CB4oCcYnVsbGU6MS0y4oCd77ya5a2Q5by544CBXCJ1Zm8xLTJcIjrpgZPlhbdcclxuICAgICAqIEBwYXJhbSBocCAgICAgIOihgOmHj1xyXG4gICAgICogQHBhcmFtIHNwZWVkICAg6YCf5bqmXHJcbiAgICAgKiBAcGFyYW0gaGl0UmFkaXVzICAg56Kw5pKe5Y2K5b6EXHJcbiAgICAgKiBAcGFyYW0gY2FtcCAgICDpmLXokKVcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBpbml0KHR5cGU6c3RyaW5nLGhwOm51bWJlcixzcGVlZDpudW1iZXIsaGl0UmFkaXVzOm51bWJlcixjYW1wOm51bWJlcik6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6KeS6Imy5Yid5aeL5YyW5bGe5oCnXHJcbiAgICAgICAgdGhpcy50eXBlPXR5cGU7XHJcbiAgICAgICAgdGhpcy5ocD1ocDtcclxuICAgICAgICB0aGlzLnNwZWVkPXNwZWVkO1xyXG4gICAgICAgIHRoaXMuaGl0UmFkaXVzPWhpdFJhZGl1cztcclxuICAgICAgICB0aGlzLmNhbXA9Y2FtcDtcclxuXHJcbiAgICAgICAgLy/pgZPlhbflsZ7mgKfliJ3lp4vkuLowXHJcbiAgICAgICAgdGhpcy5wcm9wVHlwZT0wO1xyXG4gICAgICAgIC8v5Yqg6L295Yqo55S75a+56LGhXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnJvbGVBbmkpXHJcbiAgICAgICAgLy/nm5HlkKzliqjnlLvlrozmiJDkuovku7ZcclxuICAgICAgICB0aGlzLnJvbGVBbmkub24oRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLm9uQ29tcGxldGUpXHJcbiAgICAgICAgLy/mkq3mlL7pu5jorqTpo57ooYzliqjnlLtcclxuICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJmbHlcIik7XHJcblxyXG4gICAgICAgIHRoaXMuSW5pdFNlbGYoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eUqOS6huaxoCDmnoTpgKDlh73mlbDkuI3kvJrmr4/mrKHosIPnlKgg5Yid5aeL5YyW5pS+5Zyo6L+ZXHJcbiAgICBwcm90ZWN0ZWQgSW5pdFNlbGYoKTp2b2lkXHJcbiAgICB7XHJcblxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLov5jmnKrmnInlrr3vvIzojrflvpfop5LoibLlrr3pq5hcdFxyXG4gICAgICAgIGlmKHRoaXMucm9sZUFuaS53aWR0aD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Yqo55S755+p5b2i6L6555WMXHJcbiAgICAgICAgICAgIHZhciBib3VuZHM6TGF5YS5SZWN0YW5nbGU9dGhpcy5yb2xlQW5pLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICAvL+inkuiJsiDlrr3pq5jotYvlgLxcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pLnNpemUoYm91bmRzLndpZHRoLGJvdW5kcy5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7liqjnlLsgXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uIOWKqOeUu+eKtuaAgSAgIFwiZmx5XCLjgIFcImhpdFwi44CBXCJkaWVcIlxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBwbGF5QWN0aW9uKGFjdGlvbjpzdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGlvbj1hY3Rpb247XHJcbiAgICAgICAgLy/mkq3mlL7op5LoibLliqjnlLssbmFtZT3op5LoibLnsbvlnotf5Yqo55S754q25oCB77yM5aaC77yaaGVyb19mbHlcclxuICAgICAgICB0aGlzLnJvbGVBbmkucGxheSgwLHRydWUsdGhpcy50eXBlK1wiX1wiK2FjdGlvbik7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLpmpDol4/vvIzop5LoibLmtojkuqHlubblm57mlLZcclxuICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kaWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy/op5LoibLmoLnmja7pgJ/luqbpo57ooYxcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICAvL+WmguaenOenu+WKqOWIsOaYvuekuuWMuuWfn+S7peWklu+8jOWImeenu+mZpFxyXG4gICAgICAgIGlmICh0aGlzLnkgPiAxMjgwKzEwMHx8dGhpcy55PC0xNTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuW3puWPs+i2heWHulxyXG4gICAgICAgIGlmKHRoaXMueDx0aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueD10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLng+NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54PTcyMC10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoq6KeS6Imy5q275Lqh5bm25Zue5pS25Yiw5a+56LGh5rGgKiovXHJcbiAgICBwdWJsaWMgZGllKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6KeS6Imy5Yqo55S75YGc5q2iXHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLnN0b3AoKTsgXHJcbiAgICAgICAgLy/ljrvpmaTmiYDmnInliqjnlLvnm5HlkKxcclxuICAgICAgICB0aGlzLnJvbGVBbmkub2ZmQWxsKCk7XHJcbiAgICAgICAgLy/ku47oiJ7lj7Dnp7vpmaRcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKHRoaXMudHlwZSwgdGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBIZXJvIGZyb20gXCIuL0hlcm9cIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL0VuZW15XCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcbmltcG9ydCBFbmVteV8xIGZyb20gXCIuL0VuZW15XzFcIjtcclxuaW1wb3J0IEVuZW15XzIgZnJvbSBcIi4vRW5lbXlfMlwiO1xyXG5pbXBvcnQgRW5lbXlfMyBmcm9tIFwiLi9FbmVteV8zXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlRmFjdG9yeVxyXG57XHJcbiAgICBwdWJsaWMgc3RhdGljIEdldFJvbGUodHlwZTpzdHJpbmcpOlJvbGVcclxuICAgIHtcclxuICAgICAgICBsZXQgcm9sZTpSb2xlID0gbnVsbDtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBjYXNlIFwiaGVyb1wiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLEhlcm8pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJidWxsZXQxXCI6XHJcbiAgICAgICAgICAgIGNhc2UgXCJidWxsZXQyXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsQnVsbGV0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwidWZvXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsdWZvKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiZW5lbXkxXCI6XHJcbiAgICAgICAgICAgICAgICByb2xlID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKHR5cGUsRW5lbXlfMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcImVuZW15MlwiOlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLEVuZW15XzIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJlbmVteTNcIjpcclxuICAgICAgICAgICAgICAgIHJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3ModHlwZSxFbmVteV8zKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcm9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyh0eXBlLFJvbGUpO1xyXG4gICAgICAgIH0gICBcclxuICAgICAgIHJldHVybiByb2xlO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgdWZvIGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v6ZqQ6JeP77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kaWUoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOWvueixoeaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwidWZvXCIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgICAgICAgIFxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lQmdVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJnMTpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzI6TGF5YS5JbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ2YXJcIjpcImJnMVwiLFwic2tpblwiOlwiYmFja2dyb3VuZC5wbmdcIn0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6LTEyODAsXCJ4XCI6MCxcInZhclwiOlwiYmcyXCIsXCJza2luXCI6XCJiYWNrZ3JvdW5kLnBuZ1wifSxcImNvbXBJZFwiOjN9XSxcImxvYWRMaXN0XCI6W1wiYmFja2dyb3VuZC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVCZ1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVPdmVyVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGFuaV9yZXN0YXJ0OkxheWEuRnJhbWVBbmltYXRpb247XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgYnRuX3Jlc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MjI5LFwic2tpblwiOlwiZ2FtZVVJL2dhbWVPdmVyLnBuZ1wifSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjEyMDAsXCJ4XCI6MTksXCJ3aWR0aFwiOjY4MSxcInRleHRcIjpcIkxheWFBaXIxLjcuM+W8leaTjuaVmeWtpua8lOekuueJiFwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjI2LFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjV9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjoyNDQsXCJ3aWR0aFwiOjE0NCxcInRleHRcIjpcIuacrOWxgOenr+WIhu+8mlwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjozNjMsXCJ3aWR0aFwiOjEyOCxcInZhclwiOlwidHh0X3Njb3JlXCIsXCJ0ZXh0XCI6XCIxMjAwXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjN2M3OTc5XCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjM5LFwidmFyXCI6XCJidG5fcmVzdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjEsXCJ3aWR0aFwiOjI0MCxcInN0YXRlTnVtXCI6MixcInNraW5cIjpcImdhbWVVSS9idG5fYmcucG5nXCIsXCJzaXplR3JpZFwiOlwiMTAsMTAsMTAsMTBcIixcImhlaWdodFwiOjgwfSxcImNvbXBJZFwiOjExfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTgsXCJ4XCI6NDEsXCJza2luXCI6XCJnYW1lVUkvcmVzdGFydC5wbmdcIn0sXCJjb21wSWRcIjoxMn1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjEwLFwia2V5ZnJhbWVzXCI6e1wieVwiOlt7XCJ2YWx1ZVwiOjk3MCxcInR3ZWVuTWV0aG9kXCI6XCJlbGFzdGljT3V0XCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjk2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjo4fV19fV0sXCJuYW1lXCI6XCJhbmlfcmVzdGFydFwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9nYW1lT3Zlci5wbmdcIixcImdhbWVVSS9idG5fYmcucG5nXCIsXCJnYW1lVUkvcmVzdGFydC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVPdmVyVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVBsYXlVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJ0bl9wYXVzZTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgdHh0X2hwOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyB0eHRfbGV2ZWw6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgZ2FtZVBhdXNlOkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3XCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjIwLFwieFwiOjEwLFwid2lkdGhcIjo3MDAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJoZWlnaHRcIjo0NX0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjIxLFwieFwiOjYxOCxcInZhclwiOlwiYnRuX3BhdXNlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxLFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9ocFwiLFwidGV4dFwiOlwiSFDvvJpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo4fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjoyMjgsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X2xldmVsXCIsXCJ0ZXh0XCI6XCJsZXZlbO+8mlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjl9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxNSxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfc2NvcmVcIixcInRleHRcIjpcIlNjb3JlOlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjEwfSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwidmlzaWJsZVwiOmZhbHNlLFwidmFyXCI6XCJnYW1lUGF1c2VcIixcImhlaWdodFwiOjEyODAsXCJhbHBoYVwiOjF9LFwiY29tcElkXCI6MTMsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJzaXplR3JpZFwiOlwiMiwyLDIsMlwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxNX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQxMSxcInhcIjoxMTAsXCJ3aWR0aFwiOjUwMCxcInZpc2libGVcIjp0cnVlLFwic2tpblwiOlwiZ2FtZVVJL2JnLmpwZ1wiLFwic2l6ZUdyaWRcIjpcIjEwLDEwLDEwLDEwXCIsXCJoZWlnaHRcIjo1MDB9LFwiY29tcElkXCI6MTJ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjgwMSxcInhcIjoxOTAsXCJ3aWR0aFwiOjM0MCxcInRleHRcIjpcIueCueWHu+S7u+aEj+S9jee9rue7p+e7rea4uOaIj1wiLFwiaGVpZ2h0XCI6NDQsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzIzMjIyMlwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjE0fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDY4LFwieFwiOjIxNCxcInNraW5cIjpcImdhbWVVSS9nYW1lUGF1c2UucG5nXCJ9LFwiY29tcElkXCI6MTZ9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmxhbmsucG5nXCIsXCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wiLFwiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2dhbWVQYXVzZS5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVQbGF5VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVN0YXJ0VUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIHR4dF9sb2FkOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyBidG5fc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MTc5LFwic2tpblwiOlwiZ2FtZVVJL2xvZ28ucG5nXCJ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6NTg3LFwieFwiOjIwLFwid2lkdGhcIjo2ODEsXCJ2YXJcIjpcInR4dF9sb2FkXCIsXCJ0ZXh0XCI6XCLmuLjmiI/otYTmupDliqDovb3ov5vluqZcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiMxYzFjMWNcIixcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjQwLFwidmlzaWJsZVwiOnRydWUsXCJ2YXJcIjpcImJ0bl9zdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjI0MCxcInZpc2libGVcIjp0cnVlLFwic3RhdGVOdW1cIjoyLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcInNpemVHcmlkXCI6XCIyMCwyMCwyMCwyMFwiLFwiaGVpZ2h0XCI6ODB9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE5LFwieFwiOjQxLFwic2tpblwiOlwiZ2FtZVVJL3N0YXJ0LnBuZ1wifSxcImNvbXBJZFwiOjExfV0sXCJjb21wb25lbnRzXCI6W119XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2xvZ28ucG5nXCIsXCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwiZ2FtZVVJL3N0YXJ0LnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZVN0YXJ0VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
