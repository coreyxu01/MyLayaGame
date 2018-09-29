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
var Enemy_1 = require("./Role/Enemy");
var GameConst_1 = require("./GameConst");
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
        if (Laya.timer.currFrame % (170 - GameConst_1.default.createTime * 2) == 0) {
            this.createEnemy(1, GameConst_1.default.hps[1] + GameConst_1.default.hpUp * 2, GameConst_1.default.speeds[1] + GameConst_1.default.speedUp, GameConst_1.default.nums[1] + GameConst_1.default.numUp);
        }
        //生成boss
        if (Laya.timer.currFrame % (1000 - GameConst_1.default.createTime * 3) == 0) {
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
            //创建敌人，从对象池创建
            var enemy = Laya.Pool.getItemByClass("Enemy", Enemy_1.default);
            //初始化敌人
            enemy.init("enemy" + (index + 1), hp, speed, GameConst_1.default.radius[index], 1);
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
},{"./GameConst":2,"./Role/Enemy":9}],2:[function(require,module,exports){
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
    /***敌人血量提升	***/
    GameConst.hpUp = 0;
    /***敌人数量提升	***/
    GameConst.numUp = 0;
    /****升级等级所需的成绩数量***/
    GameConst.levelUpScore = 10;
    /****敌机血量表****/
    GameConst.hps = [1, 7, 15];
    /***敌机生成数量表**/
    GameConst.nums = [2, 1, 1];
    /***敌机速度表***/
    GameConst.speeds = [3, 2, 1];
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
},{"./ui/layaMaxUI":13}],4:[function(require,module,exports){
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
},{"./ui/layaMaxUI":13}],5:[function(require,module,exports){
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
},{"./ui/layaMaxUI":13}],6:[function(require,module,exports){
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
},{"./ui/layaMaxUI":13}],7:[function(require,module,exports){
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
var EnemyManager_1 = require("./EnemyManager");
var GameConst_1 = require("./GameConst");
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
new Main();
},{"./EnemyManager":1,"./GameConst":2,"./GameMap":3,"./GameOver":4,"./GamePlay":5,"./GameStart":6,"./Role/Hero":10}],8:[function(require,module,exports){
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
    /**角色死亡并回收到对象池**/
    Bullet.prototype.die = function () {
        _super.prototype.die.call(this);
        //回收到对象池
        Laya.Pool.recover("Bullet", this);
    };
    return Bullet;
}(Role_1.default));
exports.default = Bullet;
},{"./Role":11}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var ufo_1 = require("./ufo");
var GameConst_1 = require("../GameConst");
var Bullet_1 = require("./Bullet");
//角色
var Enemy = /** @class */ (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        _this.shootInterval = 1000; //射击间隔
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
            // Laya.SoundManager.playSound("sound/game_over.mp3");
            GameConst_1.default.score++;
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
    /**
     角色射击，生成子弹
     */
    Enemy.prototype.shoot = function () {
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
                var bullet = Laya.Pool.getItemByClass("Bullet", Bullet_1.default);
                //初始化子弹信息
                bullet.init("bullet1", 1, 10, 1, this.camp);
                //子弹消失后会不显示，重新初始化
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(this.x + pos[i], this.y + 80);
                //旋转角度
                //添加到角色层
                this.parent.addChild(bullet);
            }
        }
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
},{"../GameConst":2,"./Bullet":8,"./Role":11,"./ufo":12}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var Bullet_1 = require("./Bullet");
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
                var bullet = Laya.Pool.getItemByClass("Bullet", Bullet_1.default);
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
},{"./Bullet":8,"./Role":11}],11:[function(require,module,exports){
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
    };
    return Role;
}(Laya.Sprite));
exports.default = Role;
},{}],12:[function(require,module,exports){
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
},{"./Role":11}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvRW5lbXlNYW5hZ2VyLnRzIiwic3JjL0dhbWVDb25zdC50cyIsInNyYy9HYW1lTWFwLnRzIiwic3JjL0dhbWVPdmVyLnRzIiwic3JjL0dhbWVQbGF5LnRzIiwic3JjL0dhbWVTdGFydC50cyIsInNyYy9NYWluLnRzIiwic3JjL1JvbGUvQnVsbGV0LnRzIiwic3JjL1JvbGUvRW5lbXkudHMiLCJzcmMvUm9sZS9IZXJvLnRzIiwic3JjL1JvbGUvUm9sZS50cyIsInNyYy9Sb2xlL3Vmby50cyIsInNyYy91aS9sYXlhTWF4VUkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEEsc0NBQWlDO0FBRWpDLHlDQUFvQztBQUVwQztJQUlJLHNCQUFZLElBQVM7UUFFakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVNLGdDQUFTLEdBQWhCO1FBRUksUUFBUTtRQUNkLG1CQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUN6QixRQUFRO1FBQ1IsbUJBQVMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLFNBQVM7UUFDVCxtQkFBUyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDbkIsWUFBWTtRQUNaLG1CQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNwQixhQUFhO1FBQ2IsbUJBQVMsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFSixRQUFRO0lBQ0Qsc0NBQWUsR0FBdEI7UUFFQyxvQkFBb0I7UUFDcEIsT0FBTztRQUNQLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLEdBQUcsbUJBQVMsQ0FBQyxVQUFV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QUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzdCLEVBQUU7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOztVQUVHO0lBQ0ssMEJBQVcsR0FBbkI7UUFFQyxTQUFTO1FBQ1QsSUFBSSxFQUFFLEdBQVEsSUFBSSxDQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxJQUFJLEVBQUUsR0FBUSxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzNDLFFBQVE7UUFDUixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBRSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUUsRUFBRSxDQUFDO1FBQ2hCLFdBQVc7UUFDWCxJQUFJLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDOUIsQ0FBQztJQUNEOztVQUVHO0lBQ0ssd0JBQVMsR0FBakI7UUFFQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVEOztVQUVHO0lBQ0ssbUJBQUksR0FBWjtRQUVDLFVBQVU7UUFDVixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBQyxtQkFBUyxDQUFDLEtBQUssRUFBQyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQzlELFFBQVE7UUFDUixJQUFHLElBQUks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LFVBQVUsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUxjLGlCQUFNLEdBQU0sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLHFCQUFxQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMscUJBQXFCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsZUFBZSxFQUFDLHFCQUFxQixFQUFDLG1CQUFtQixFQUFDLG9CQUFvQixDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFNcm9ELGlCQUFDO0tBVkQsQUFVQyxDQVYrQixNQUFNLEdBVXJDO0lBVlksYUFBVSxhQVV0QixDQUFBO0lBQ0Q7UUFBZ0MsOEJBQUk7UUFPaEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBTGMsaUJBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FB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QUMsSUFBSSxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxrQkFBa0IsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLGVBQWUsRUFBQyxpQkFBaUIsRUFBQyxtQkFBbUIsRUFBQyxrQkFBa0IsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxDQUFDO1FBTS84QixrQkFBQztLQVRELEFBU0MsQ0FUZ0MsTUFBTSxHQVN0QztJQVRZLGNBQVcsY0FTdkIsQ0FBQTtBQUNMLENBQUMsRUE3Q2EsRUFBRSxHQUFGLFVBQUUsS0FBRixVQUFFLFFBNkNmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBNYWluIGZyb20gXCIuL01haW5cIjtcclxuaW1wb3J0IFJvbGVcdGZyb20gXCIuL1JvbGUvUm9sZVwiO1xyXG5pbXBvcnQgSGVyb1x0ZnJvbSBcIi4vUm9sZS9IZXJvXCI7XHJcbmltcG9ydCBFbmVteSBmcm9tIFwiLi9Sb2xlL0VuZW15XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vUm9sZS9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi9HYW1lQ29uc3RcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZW15TWFuYWdlclxyXG57XHJcbiAgICBwcml2YXRlIE1haW46TWFpbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihtYWluOk1haW4pIFxyXG5cdHtcclxuICAgICAgICB0aGlzLk1haW4gPSBtYWluO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBSZXNldEluZm8oKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/mlYzkurrliLfmlrDliqDpgJ9cclxuXHRcdEdhbWVDb25zdC5jcmVhdGVUaW1lID0gMDtcclxuXHRcdC8v5pWM5Lq66YCf5bqm5o+Q5Y2HXHJcblx0XHRHYW1lQ29uc3Quc3BlZWRVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuihgOmHj+aPkOWNh1x0XHJcblx0XHRHYW1lQ29uc3QuaHBVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuaVsOmHj+aPkOWNh1x0XHRcdFx0XHJcblx0XHRHYW1lQ29uc3QubnVtVXAgPSAwO1xyXG5cdFx0Ly/ljYfnuqfnrYnnuqfmiYDpnIDnmoTmiJDnu6nmlbDph49cclxuXHRcdEdhbWVDb25zdC5sZXZlbFVwU2NvcmUgPSAxMDtcdFx0XHJcbiAgICB9XHJcblxyXG5cdC8v55Sf5oiQ5pWM5pa56aOe5py6XHJcblx0cHVibGljIGxvb3BDcmVhdGVFbmVteSgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+WIm+W7uuaVjOacuu+8jOWKoOWFpeWFs+WNoeWNh+e6p+aVsOaNru+8jOaPkOmrmOmavuW6plxyXG5cdFx0Ly/nlJ/miJDlsI/po57mnLpcclxuXHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICg4MCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lKSA9PTApXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMCwgR2FtZUNvbnN0Lmhwc1swXSxHYW1lQ29uc3Quc3BlZWRzWzBdICsgR2FtZUNvbnN0LnNwZWVkVXAgLCBHYW1lQ29uc3QubnVtc1swXSArIEdhbWVDb25zdC5udW1VcCk7XHJcblx0XHR9XHJcblx0XHQvL+eUn+aIkOS4reWei+mjnuaculxyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDE3MCAtIEdhbWVDb25zdC5jcmVhdGVUaW1lICogMikgPT0gMCkgXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMSwgR2FtZUNvbnN0Lmhwc1sxXSArR2FtZUNvbnN0LmhwVXAgKiAyLEdhbWVDb25zdC5zcGVlZHNbMV0gKyBHYW1lQ29uc3Quc3BlZWRVcCAsIEdhbWVDb25zdC5udW1zWzFdICsgR2FtZUNvbnN0Lm51bVVwKTtcclxuXHRcdH1cclxuXHRcdC8v55Sf5oiQYm9zc1xyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDEwMDAgLSBHYW1lQ29uc3QuY3JlYXRlVGltZSAqIDMpID09IDApIFxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDIsIEdhbWVDb25zdC5ocHNbMl0gKyBHYW1lQ29uc3QuaHBVcCAqIDYsR2FtZUNvbnN0LnNwZWVkc1syXSwgR2FtZUNvbnN0Lm51bXNbMl0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIOWIm+W7uuaVjOS6ulxyXG5cdCAqIEBwYXJhbSBpbmRleCBcdOaVjOS6uue8luWPt1xyXG5cdCAqIEBwYXJhbSBocCAgIFx0XHQg5pWM5Lq66KGA6YePXHJcblx0ICogQHBhcmFtIHNwZWVkXHRcdOaVjOS6uumAn+W6plxyXG5cdCAqIEBwYXJhbSBudW1cdFx05pWM5Lq65pWw6YePXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjcmVhdGVFbmVteShpbmRleDpudW1iZXIsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixudW06bnVtYmVyKTp2b2lkIFxyXG5cdHtcclxuXHRcdGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBudW07IGkrKylcclxuXHRcdHtcclxuXHRcdFx0Ly/liJvlu7rmlYzkurrvvIzku47lr7nosaHmsaDliJvlu7pcclxuXHRcdFx0bGV0IGVuZW15OkVuZW15ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiRW5lbXlcIiwgRW5lbXkpO1xyXG5cdFx0XHQvL+WIneWni+WMluaVjOS6ulxyXG5cdFx0XHRlbmVteS5pbml0KFwiZW5lbXlcIiArIChpbmRleCsxKSwgaHAsIHNwZWVkLEdhbWVDb25zdC5yYWRpdXNbaW5kZXhdLDEpO1xyXG5cdFx0XHQvL+S7juWvueixoeaxoOS4reWIm+W7uueahOWvueixoeatu+S6oeWJjeiiq+makOiXj+S6hu+8jOWboOatpOimgemHjeaWsOWIneWni+WMluaYvuekuu+8jOWQpuWImeaWsOWIm+W7uuinkuiJsuS4jeS8muaYvuekuuWHuuadpVxyXG5cdFx0XHRlbmVteS52aXNpYmxlPXRydWU7XHJcblx0XHRcdC8v6ZqP5py65L2N572uXHJcblx0XHRcdGVuZW15LnBvcyhNYXRoLnJhbmRvbSgpICooNzIwLTgwKSs1MCwgLU1hdGgucmFuZG9tKCkgKiAxMDApO1xyXG5cdFx0XHQvL+a3u+WKoOWIsOiInuWPsOS4ilxyXG5cdFx0XHR0aGlzLk1haW4ucm9sZUxheWVyLmFkZENoaWxkKGVuZW15KTtcclxuXHRcdH1cclxuXHR9XHJcbn0iLCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVDb25zdFxyXG57XHJcbiAgICAvL+a4uOaIj+WFs+WNoeaPkOWNh+WxnuaAp1xyXG5cdC8qKirmlYzkurrliLfmlrDliqDpgJ8qKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlVGltZTpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrpgJ/luqbmj5DljYcqKiovXHJcblx0cHVibGljIHN0YXRpYyBzcGVlZFVwOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uuihgOmHj+aPkOWNh1x0KioqL1x0XHRcclxuXHRwdWJsaWMgc3RhdGljIGhwVXA6bnVtYmVyID0gMDtcclxuXHQvKioq5pWM5Lq65pWw6YeP5o+Q5Y2HXHQqKiovXHRcdFx0XHRcdFxyXG5cdHB1YmxpYyBzdGF0aWMgbnVtVXA6bnVtYmVyID0gMDtcclxuXHQvKioqKuWNh+e6p+etiee6p+aJgOmcgOeahOaIkOe7qeaVsOmHjyoqKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgbGV2ZWxVcFNjb3JlOiBudW1iZXIgPSAxMDtcclxuXHJcblx0LyoqKirmlYzmnLrooYDph4/ooagqKioqL1xyXG5cdHB1YmxpYyBzdGF0aWMgaHBzOiBudW1iZXJbXSA9IFsxLCA3LCAxNV07XHJcblx0LyoqKuaVjOacuueUn+aIkOaVsOmHj+ihqCoqL1xyXG5cdHB1YmxpYyBzdGF0aWMgbnVtczogbnVtYmVyW10gPSBbMiwgMSwgMV07XHJcblx0LyoqKuaVjOacuumAn+W6puihqCoqKi9cclxuXHRwdWJsaWMgc3RhdGljIHNwZWVkczogIG51bWJlcltdID0gWzMsIDIsIDFdO1xyXG5cdC8qKirmlYzmnLrooqvlh7vljYrlvoTooagqKiovXHJcblx0cHVibGljIHN0YXRpYyByYWRpdXM6ICBudW1iZXJbXSA9IFsyMCwgMzUsIDgwXTtcclxuICAgIFxyXG5cdC8qKua4uOaIj+WFs+WNoeaVsCoqKi9cclxuXHRwdWJsaWMgc3RhdGljIGxldmVsOm51bWJlcj0xO1xyXG5cdC8qKueOqeWutuW+l+WIhioqKi9cclxuXHRwdWJsaWMgc3RhdGljIHNjb3JlOm51bWJlcj0wO1xyXG5cdFxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP6IOM5pmv55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFwIGV4dGVuZHMgdWkuR2FtZUJnVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDmuLjmiI/og4zmma/np7vliqjmm7TmlrBcclxuICAgICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGVNYXAoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy55Kz0xO1xyXG4gICAgICAgIC8v5aaC5p6c6IOM5pmv5Zu+5Yiw5LqG5LiL6Z2i5LiN5Y+v6KeB77yM56uL5Y2z6LCD5pW05L2N572u5Yiw5LiK6Z2i5b6q546v5pi+56S6XHJcbiAgICAgICAgLy/muLjmiI/oiJ7lj7Dpq5jkuLoxMjgwXHJcbiAgICAgICAgaWYgKHRoaXMuYmcxLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgdGhpcy5iZzEueSAtPSAxMjgwICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYmcyLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJnMi55IC09IDEyODAgKiAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPdmVyIGV4dGVuZHMgdWkuR2FtZU92ZXJVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFx0Ly9cIumHjeaWsOW8gOWni1wi5oyJ6ZKu6byg5qCH5LqL5Lu2XHJcblx0XHRcdHRoaXMuYnRuX3Jlc3RhcnQub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vblJlc3RhcnQpO1xyXG4gICAgfVxyXG5cdC8qKlxyXG5cdFx05ri45oiP6YeN5paw5byA5aeLXHJcblx0XHQgKi9cdFx0XHJcblx0XHRwcml2YXRlIG9uUmVzdGFydCgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mkq3mlL5JREXkuK3nvJbovpHnmoTmjInpkq7liqjnlLtcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5wbGF5KDAsZmFsc2UpO1xyXG5cdFx0XHQvL+ebkeWQrOWKqOeUu+WujOaIkOS6i+S7tu+8jOazqOaEj+eUqG9uY2VcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLkFuaUNvbXBsZXRlKTtcclxuXHRcdH1cclxuXHRcdC8qKlxyXG5cdFx0IOaMiemSruWKqOeUu+aSreaUvuWujOaIkFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIEFuaUNvbXBsZXRlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+WPkemAgemHjeaWsOW8gOWni+S6i+S7tu+8jOWcqE1haW7nsbvkuK3nm5HlkKxcclxuXHRcdFx0dGhpcy5ldmVudChcInJlU3RhcnRcIilcclxuXHRcdFx0Ly/nvJPliqjliqjnlLvlhbPpl63mlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdFx0dGhpcy5jbG9zZSgpO1xyXG5cdFx0fVxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBsYXkgZXh0ZW5kcyB1aS5HYW1lUGxheVVJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy/nm5HlkKzmmoLlgZzmjInpkq7kuovku7ZcclxuICAgICAgICB0aGlzLmJ0bl9wYXVzZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uUGF1c2UpXHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdFx0IOa4uOaIj+aaguWBnFxyXG5cdFx0ICovXHRcclxuXHRcdHByaXZhdGUgb25QYXVzZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mmL7npLpJREXkuK3pmpDol4/nmoTmmoLlgZznlYzpnaJcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2UudmlzaWJsZT10cnVlO1xyXG5cdFx0XHQvL+aaguWBnOeVjOmdouWKoOeCueWHu+ebkeWQrO+8iOS4gOasoe+8iVxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS5vbmNlKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25Db250aW51ZSlcclxuXHRcdFx0XHRcclxuXHRcdFx0Ly/ml7bpl7Tlr7nosaHnvKnmlL7kuLow5bCx5piv5YGc5q2iXHJcblx0XHRcdExheWEudGltZXIuc2NhbGU9MDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQg5ri45oiP57un57utXHJcblx0XHQgKi9cdFxyXG5cdFx0cHJpdmF0ZSBvbkNvbnRpbnVlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aXtumXtOWvueixoee8qeaUvuS4ujHlsLHmmK/mraPluLjpgJ/luqbmkq3mlL5cclxuXHRcdFx0TGF5YS50aW1lci5zY2FsZT0xO1xyXG5cdFx0XHQvL+makOiXj+aaguWBnOeVjOmdolxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS52aXNpYmxlPWZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKioqKuacrOWxgOa4uOaIj+aVsOaNrlVJ5pu05pawKioqL1xyXG5cdFx0cHVibGljIHVwZGF0ZShocDpudW1iZXIsbGV2ZWw6bnVtYmVyLHNjb3JlOm51bWJlcik6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+inkuiJsuihgOmHj+abtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9ocC50ZXh0PVwiSFA6XCIraHA7XHJcblx0XHRcdC8v5YWz5Y2h562J57qn5pu05pawXHJcblx0XHRcdHRoaXMudHh0X2xldmVsLnRleHQ9XCJMRVZFTDpcIitsZXZlbDtcclxuXHRcdFx0Ly/muLjmiI/liIbmlbDmm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfc2NvcmUudGV4dD1cIlNDT1JFOlwiK3Njb3JlO1xyXG5cdFx0fVxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP5byA5aeL55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhcnQgZXh0ZW5kcyB1aS5HYW1lU3RhcnRVSVxyXG57XHJcbiAgICAvKioq5ri45oiP6LWE5rqQ5Zyw5Z2A5pWw57uEKioqL1xyXG4gICAgIHByaXZhdGUgYXNzZXRBcnI6YW55PVtcclxuICAgIHt1cmw6XCJyZXMvYXRsYXMvZ2FtZVJvbGUuYXRsYXNcIn1cclxuICAgICwge3VybDpcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvYnVsbGV0Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvZ2FtZV9vdmVyLm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfVxyXG4gICAgLCB7dXJsOlwic291bmQvZW5lbXkxX2RpZS5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgICwge3VybDpcInNvdW5kL2VuZW15M19vdXQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICBdXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL+a4uOaIj+WKoOi9veacquWujOaIkOaaguaXtuS4jeaYvuekuu+8jOmYsuatoueCueWHu+WHuumUmVxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvL+ebkeWQrOeVjOmdouaYr+WQpuWFs+mXrVxyXG4gICAgICAgIHRoaXMub25jZShsYXlhLmV2ZW50cy5FdmVudC5DTE9TRSx0aGlzLHRoaXMub25DbG9zZSk7XHJcbiAgICAgICAgLy/liqDovb3liankvZnmuLjmiI/otYTmupDjgIHpn7PkuZDvvIzliqDovb3lrozmiJDkuI7liqDovb3ov5vluqblm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMuYXNzZXRBcnIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Db21wbGV0ZSksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Qcm9ncmVzcykpXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuLjmiI/otYTmupDliqDovb3lrozmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Yqg6L295a6M5oiQXHJcbiAgICAgICAgdGhpcy50eHRfbG9hZC50ZXh0PVwi6LWE5rqQ5Yqg6L295a6M5oiQLOW8gOWni+a4uOaIj+WQpy4uLlwiO1xyXG4gICAgICAgIC8v5ri45oiP5byA5aeL5oyJ6ZKu5pi+56S65bm25by55Ye6XHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgIC8v57yT5Yqo57G75by55Ye65Yqo55S7XHJcbiAgICAgICAgTGF5YS5Ud2Vlbi5mcm9tKHRoaXMuYnRuX3N0YXJ0LHt5OnRoaXMuYnRuX3N0YXJ0LnkrMjB9LDEwMDAsTGF5YS5FYXNlLmVsYXN0aWNPdXQpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOa4uOaIj+i1hOa6kOWKoOi9vei/m+W6plxyXG4gICAgICogQHBhcmFtIGxvYWROdW0gIOi/m+W6plxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uUHJvZ3Jlc3MobG9hZE51bTpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+aYvuekuuWKoOi9vei/m+W6plxyXG4gICAgICAgIHRoaXMudHh0X2xvYWQudGV4dD1cIui1hOa6kOWKoOi9veS4re+8jOW9k+WJjei/m+W6pu+8mlwiK2xvYWROdW0qMTAwK1wiJVwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6ZetXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DbG9zZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S7juiInuWPsOenu+mZpOiHquW3sVxyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIC8v5Y+q5Yqg6L295LiA5qyh77yM5Zug5q2k55u05o6l5raI5q+B6Ieq5bexXHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFdlYkdMID0gTGF5YS5XZWJHTDtcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZTtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBHYW1lU3RhcnQgZnJvbSBcIi4vR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCBHYW1lTWFwIGZyb20gXCIuL0dhbWVNYXBcIjtcclxuaW1wb3J0IEdhbWVQbGF5IGZyb20gXCIuL0dhbWVQbGF5XCI7XHJcbmltcG9ydCBHYW1lT3ZlciBmcm9tIFwiLi9HYW1lT3ZlclwiO1xyXG5pbXBvcnQgUm9sZVx0ZnJvbSBcIi4vUm9sZS9Sb2xlXCI7XHJcbmltcG9ydCBIZXJvXHRmcm9tIFwiLi9Sb2xlL0hlcm9cIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL1JvbGUvRW5lbXlcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9Sb2xlL0J1bGxldFwiO1xyXG5pbXBvcnQgRW5lbXlNYW5hZ2VyIGZyb20gXCIuL0VuZW15TWFuYWdlclwiO1xyXG5pbXBvcnQgR2FtZUNvbnN0IGZyb20gXCIuL0dhbWVDb25zdFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBcclxue1xyXG5cdC8qKuW8gOWni+mhtemdoioqKi9cclxuXHRwdWJsaWMgc3RhcnQ6R2FtZVN0YXJ0O1xyXG5cdC8qKuWcsOWbvumhtemdoioqKi9cclxuXHRwdWJsaWMgbWFwOkdhbWVNYXA7XHJcblx0Lyoq5ri45oiP5Lit55WM6Z2iKioqL1xyXG5cdHB1YmxpYyBwbGF5OkdhbWVQbGF5O1xyXG5cdC8qKua4uOaIj+e7k+adn+mhtemdoioqKi9cclxuXHRwdWJsaWMgb3ZlcjpHYW1lT3ZlcjtcclxuXHJcblx0Ly/mlYzmlrnnlJ/miJDnrqHnkIZcclxuXHRwcml2YXRlIGVuZW15TWFuYWdlcjpFbmVteU1hbmFnZXI7XHJcblxyXG5cdC8qKuinkuiJsuWxguWuueWZqCoqKi9cclxuXHRwdWJsaWMgcm9sZUxheWVyOkxheWEuU3ByaXRlO1xyXG5cdC8qKueOqeWutuS4u+inkioqKi9cclxuXHRwdWJsaWMgaGVybzpSb2xlO1xyXG5cdFxyXG5cdC8qKum8oOagh+S4iuS4gOW4p3jluqfmoIcqKiAqL1x0XHRcclxuXHRwcml2YXRlIG1vdmVYOm51bWJlcjtcclxuXHQvKirpvKDmoIfkuIrkuIDluKd55bqn5qCHKiogKi9cdFxyXG5cdHByaXZhdGUgbW92ZVk6bnVtYmVyO1xyXG5cclxuXHQvKioqKuS4u+inkuatu+S6oeWQjua4uOaIj+e7k+adn+aXtumXtCoqKi9cclxuXHRwcml2YXRlIGRlYXRoVGltZTpudW1iZXI9MFxyXG5cclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuXHRcdC8v5Yid5aeL5YyW5byV5pOO77yM5bu66K6u5aKe5YqgV2ViR2zmqKHlvI9cclxuXHRcdExheWEuaW5pdCg3MjAsMTI4MCxXZWJHTCk7XHJcblx0XHQvL+WFqOWxj+S4jeetieavlOe8qeaUvuaooeW8j1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBTdGFnZS5TQ0FMRV9FWEFDVEZJVDtcclxuXHRcdC8v5Yqg6L295Yid5aeL5YyWVUnotYTmupBcclxuXHRcdExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvZ2FtZVVJLmF0bGFzXCIsbGF5YS51dGlscy5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuR2FtZVN0YXJ0KSk7XHJcblx0XHRcclxuXHRcdC8v5Yid5aeL5YyW6KeS6Imy566h55CG5ZmoXHJcblx0XHR0aGlzLmVuZW15TWFuYWdlciA9IG5ldyBFbmVteU1hbmFnZXIodGhpcyk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIEdhbWVTdGFydCgpOnZvaWQgXHJcblx0e1xyXG5cdFx0Ly/lrp7kvovljJblvIDlp4vpobXpnaJcclxuXHRcdHRoaXMuc3RhcnQgPSBuZXcgR2FtZVN0YXJ0KCk7XHJcblx0XHR0aGlzLnN0YXJ0LnBvcHVwKCk7XHJcblx0XHQvL+ebkeWQrOW8gOWni+a4uOaIj+W8gOWni+aMiemSruS6i+S7tizngrnlh7vlkI7ov5vlhaXmuLjmiI/kuK1cclxuXHRcdHRoaXMuc3RhcnQuYnRuX3N0YXJ0Lm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5nYW1lSW5pdClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDmuLjmiI/kuK3vvIzmuLjmiI/liJ3lp4vljJZcclxuXHRcdCovXHJcblx0cHJpdmF0ZSBnYW1lSW5pdCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+e8k+WKqOWKqOeUu+WFs+mXreaViOaenOOAgklEReS4remhtemdouS4ukRpYWxvZ+aJjeWPr+eUqFxyXG5cdFx0dGhpcy5zdGFydC5jbG9zZSgpO1xyXG5cdFx0XHJcblx0XHQvL+mHjee9ruWFs+WNoeaVsOaNrlxyXG5cdFx0Ly/muLjmiI/lhbPljaHmlbBcclxuXHRcdEdhbWVDb25zdC5sZXZlbCA9IDE7XHJcblx0XHQvL+eOqeWutuW+l+WIhlxyXG5cdFx0R2FtZUNvbnN0LnNjb3JlID0gMDtcclxuXHJcblx0XHR0aGlzLmVuZW15TWFuYWdlci5SZXNldEluZm8oKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJblnLDlm77og4zmma/pobXpnaIo5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5tYXAgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5tYXAgPSBuZXcgR2FtZU1hcCgpO1xyXG5cdFx0Ly/liqDovb3liLDoiJ7lj7BcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5tYXApO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluinkuiJsuWxguW5tuWKoOi9veWIsOiInuWPsCjlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLnJvbGVMYXllciA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLnJvbGVMYXllciA9IG5ldyBMYXlhLlNwcml0ZSgpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnJvbGVMYXllcik7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5ri45oiP5LitVUnpobXpnaIo5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5wbGF5ID09IG51bGwpXHJcblx0XHRcdHRoaXMucGxheSA9IG5ldyBHYW1lUGxheSgpO1xyXG5cdFx0Ly/liqDovb3liLDoiJ7lj7BcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5wbGF5KTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbkuLvop5Io5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5oZXJvID09IG51bGwpXHJcblx0XHR0aGlzLmhlcm8gPSBuZXcgSGVybygpO1xyXG5cdFx0Ly/liJ3lp4vljJbop5LoibLnsbvlnovjgIHooYDph4/vvIzms6jvvJrpgJ/luqZzcGVlZOS4ujDvvIzlm6DkuLrkuLvop5LmmK/pgJrov4fmk43mjqfmlLnlj5jkvY3nva4s6Zi16JCl5Li6MFxyXG5cdFx0dGhpcy5oZXJvLmluaXQoXCJoZXJvXCIsMTAsMCwzMCwwKTtcclxuXHRcdC8v5q275Lqh5ZCO5Lya6ZqQ6JeP77yM6YeN5paw5byA5aeL5ZCO6ZyA5pi+56S6XHJcblx0XHR0aGlzLmhlcm8udmlzaWJsZT10cnVlO1xyXG5cdFx0Ly/kuLvop5LkvY3nva7kv67mlLlcclxuXHRcdHRoaXMuaGVyby5wb3MoMzYwLDgwMCk7XHJcblx0XHQvL+inkuiJsuWKoOi9veWIsOinkuiJsuWxguS4rVxyXG5cdFx0dGhpcy5yb2xlTGF5ZXIuYWRkQ2hpbGQodGhpcy5oZXJvKTtcclxuXHRcdFxyXG5cdFx0Ly/pvKDmoIfmjInkuIvnm5HlkKxcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25Nb3VzZURvd24pO1xyXG5cdFx0Ly/pvKDmoIfmiqzotbfnm5HlkKxcclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLm9uTW91c2VVcCk7XHJcblx0XHQvL+a4uOaIj+S4u+W+queOr1xyXG5cdFx0TGF5YS50aW1lci5mcmFtZUxvb3AoMSx0aGlzLHRoaXMubG9vcCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQg54K55Ye75byA5aeL6Kem5Y+R56e75YqoXHJcblx0XHQqL1x0XHJcblx0cHJpdmF0ZSBvbk1vdXNlRG93bigpOnZvaWRcclxuXHR7XHJcblx0XHQvL+iusOW9lem8oOagh+aMieS4i+aXtueahOS9jee9ru+8jOeUqOS6juiuoeeul+m8oOagh+enu+WKqOmHj1xyXG5cdFx0dGhpcy5tb3ZlWD1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdHRoaXMubW92ZVk9TGF5YS5zdGFnZS5tb3VzZVk7XHJcblx0XHQvL1xyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9NT1ZFLHRoaXMsdGhpcy5vbk1vdXNlTW92ZSk7XHJcblx0fVxyXG5cdFxyXG5cdC8qKlxyXG5cdCDkuLvop5Lot5/pmo/pvKDmoIfnp7vliqhcclxuXHRcdCovXHRcclxuXHRwcml2YXRlIG9uTW91c2VNb3ZlKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v6K6h566X6KeS6Imy56e75Yqo6YePXHJcblx0XHRsZXQgeHg6bnVtYmVyPXRoaXMubW92ZVgtTGF5YS5zdGFnZS5tb3VzZVg7XHJcblx0XHRsZXQgeXk6bnVtYmVyPXRoaXMubW92ZVktTGF5YS5zdGFnZS5tb3VzZVk7XHJcblx0XHQvL+abtOaWsOenu+WKqOS9jee9rlxyXG5cdFx0dGhpcy5oZXJvLngtPXh4O1xyXG5cdFx0dGhpcy5oZXJvLnktPXl5O1xyXG5cdFx0Ly/mm7TmlrDmnKzluKfnmoTnp7vliqjluqfmoIdcclxuXHRcdHRoaXMubW92ZVg9TGF5YS5zdGFnZS5tb3VzZVg7XHJcblx0XHR0aGlzLm1vdmVZPUxheWEuc3RhZ2UubW91c2VZO1xyXG5cdH1cclxuXHQvKipcclxuXHQg6byg5qCH5oqs6LW344CB5YWz6Zet56e75Yqo55uR5ZCsXHJcblx0XHQqL1x0XHRcclxuXHRwcml2YXRlIG9uTW91c2VVcCgpOnZvaWRcclxuXHR7XHJcblx0XHRMYXlhLnN0YWdlLm9mZihFdmVudC5NT1VTRV9NT1ZFLHRoaXMsdGhpcy5vbk1vdXNlTW92ZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQg5ri45oiP5Li75b6q546vXHJcblx0XHQqL1xyXG5cdHByaXZhdGUgbG9vcCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+acrOWxgOa4uOaIj+aVsOaNruabtOaWsFxyXG5cdFx0dGhpcy5wbGF5LnVwZGF0ZSh0aGlzLmhlcm8uaHAsR2FtZUNvbnN0LmxldmVsLEdhbWVDb25zdC5zY29yZSlcclxuXHRcdC8v5aaC5p6c5Li76KeS5q275LqhXHJcblx0XHRpZih0aGlzLmhlcm8uaHA8PTApXHJcblx0XHR7XHJcblx0XHRcdC8v546p5a626aOe5py65q275Lqh5ZCO5bu26L+f5pe26Ze077yMMTAw5bin5ZCO5by55Ye65ri45oiP57uT5p2f55WM6Z2iXHJcblx0XHRcdHRoaXMuZGVhdGhUaW1lKytcclxuXHRcdFx0aWYgKHRoaXMuZGVhdGhUaW1lPj0xMDApXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmRlYXRoVGltZT0wO1xyXG5cdFx0XHRcdC8v5ri45oiP57uT5p2fXHJcblx0XHRcdFx0dGhpcy5nYW1lT3ZlcigpO1xyXG5cdFx0XHRcdC8v5pys5pa55rOV5YaF5ZCO57ut6YC76L6R5LiN5omn6KGMXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRlbHNlLy/kuLvop5LmnKrmrbvkuqFcclxuXHRcdHtcclxuXHRcdFx0Ly/muLjmiI/ljYfnuqforqHnrpdcclxuXHRcdFx0dGhpcy5sZXZlbFVwKCk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly/lnLDlm77mu5rliqjmm7TmlrBcclxuXHRcdHRoaXMubWFwLnVwZGF0ZU1hcCgpXHJcblx0XHQvL+a4uOaIj+eisOaSnumAu+i+kVxyXG5cdFx0dGhpcy5jaGVja0NvbGxlY3QoKTtcclxuXHRcdC8v5pWM5pa56aOe5py655Sf5oiQ6YC76L6RXHJcblx0XHR0aGlzLmVuZW15TWFuYWdlci5sb29wQ3JlYXRlRW5lbXkoKTtcclxuXHR9XHJcblxyXG5cdC8v5ri45oiP56Kw5pKe6YC76L6RXHJcblx0cHJpdmF0ZSBjaGVja0NvbGxlY3QoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/pgY3ljobmiYDmnInpo57mnLrvvIzmm7TmlLnpo57mnLrnirbmgIFcclxuXHRcdGZvciAodmFyIGk6IG51bWJlciA9IHRoaXMucm9sZUxheWVyLm51bUNoaWxkcmVuIC0gMTsgaSA+IC0xOyBpLS0pIFxyXG5cdFx0e1xyXG5cdFx0XHQvL+iOt+WPluesrOS4gOS4quinkuiJslxyXG5cdFx0XHR2YXIgcm9sZTpSb2xlID0gdGhpcy5yb2xlTGF5ZXIuZ2V0Q2hpbGRBdChpKSBhcyBSb2xlO1xyXG5cdFx0XHQvL+inkuiJsuiHqui6q+abtOaWsFxyXG5cdFx0XHRyb2xlLnVwZGF0ZSgpO1xyXG5cclxuXHRcdFx0Ly/lpoLmnpzop5LoibLmrbvkuqHvvIzkuIvkuIDlvqrnjq9cclxuXHRcdFx0aWYocm9sZS5ocDw9MCkgY29udGludWU7XHJcblx0XHRcdC8v5Y+R5bCE5a2Q5by5XHJcblx0XHRcdHJvbGUuc2hvb3QoKTtcclxuXHJcblx0XHRcdC8v56Kw5pKe5qOA5rWLXHJcblx0XHRcdGZvcih2YXIgajpudW1iZXI9aS0xO2o+LTE7ai0tKVxyXG5cdFx0XHR7XHQvL+iOt+WPluesrOS6jOS4quinkuiJslxyXG5cdFx0XHRcdHZhciByb2xlMTpSb2xlPXRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaikgYXMgUm9sZTtcclxuXHRcdFx0XHQvL+WmguaenHJvbGUx5pyq5q275Lqh5LiU5LiN5ZCM6Zi16JClXHJcblx0XHRcdFx0aWYocm9sZTEuaHA+MCYmcm9sZTEuY2FtcCE9cm9sZS5jYW1wKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC8v6I635Y+W56Kw5pKe5Y2K5b6EXHJcblx0XHRcdFx0XHR2YXIgaGl0UmFkaXVzOm51bWJlcj1yb2xlLmhpdFJhZGl1cytyb2xlMS5oaXRSYWRpdXM7XHJcblx0XHRcdFx0XHQvL+eisOaSnuajgOa1i1xyXG5cdFx0XHRcdFx0aWYoTWF0aC5hYnMocm9sZS54LXJvbGUxLngpPGhpdFJhZGl1cyYmTWF0aC5hYnMocm9sZS55LXJvbGUxLnkpPGhpdFJhZGl1cylcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Ly/lpoLmnpzmn5DkuIDkuKrnorDmkp7kvZPmmK/pgZPlhbfvvIzliJnlkIPpgZPlhbfvvIzlkKbliJnmjonooYBcclxuXHRcdFx0XHRcdFx0aWYocm9sZS5wcm9wVHlwZSE9MHx8cm9sZTEucHJvcFR5cGUhPTApXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQvL+aXoOazleWIpOaWreWTquS4quaYr+mBk+WFt++8jOWboOatpOmDveebuOS6kuWQg+ivleivlVxyXG5cdFx0XHRcdFx0XHRcdHJvbGUuZWF0UHJvcChyb2xlMSk7XHJcblx0XHRcdFx0XHRcdFx0cm9sZTEuZWF0UHJvcChyb2xlKTtcclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdC8v6KeS6Imy55u45LqS5o6J6KGAXHJcblx0XHRcdFx0XHRcdFx0cm9sZS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdFx0cm9sZTEubG9zdEhwKDEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cdC8qKlxyXG5cdCDmuLjmiI/ljYfnuqforqHnrpdcclxuXHRcdCovXHJcblx0cHJpdmF0ZSBsZXZlbFVwKCk6dm9pZFxyXG5cdHtcclxuXHRcdGlmKEdhbWVDb25zdC5zY29yZT5HYW1lQ29uc3QubGV2ZWxVcFNjb3JlKVxyXG5cdFx0e1xyXG5cdFx0XHQvL+WFs+WNoeetiee6p+aPkOWNh1xyXG5cdFx0XHRHYW1lQ29uc3QubGV2ZWwrKztcclxuXHRcdFx0Ly/op5LoibLooYDph4/lop7liqDvvIzmnIDlpKczMFxyXG5cdFx0XHR0aGlzLmhlcm8uaHA9TWF0aC5taW4odGhpcy5oZXJvLmhwK0dhbWVDb25zdC5sZXZlbCoxLDMwKTtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzliJvlu7rmlYzmnLrpl7TpmpTotornn61cclxuXHRcdFx0R2FtZUNvbnN0LmNyZWF0ZVRpbWUgPSBHYW1lQ29uc3QubGV2ZWwgPCAzMCA/IEdhbWVDb25zdC5sZXZlbCAqIDIgOiA2MDtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrpo57ooYzpgJ/luqbotorpq5hcclxuXHRcdFx0R2FtZUNvbnN0LnNwZWVkVXAgPSBNYXRoLmZsb29yKEdhbWVDb25zdC5sZXZlbCAvIDYpO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuuihgOmHj+i2iumrmFxyXG5cdFx0XHRHYW1lQ29uc3QuaHBVcCA9IE1hdGguZmxvb3IoR2FtZUNvbnN0LmxldmVsIC8gOCk7XHJcblx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py65pWw6YeP6LaK5aSaXHJcblx0XHRcdEdhbWVDb25zdC5udW1VcCA9IE1hdGguZmxvb3IoR2FtZUNvbnN0LmxldmVsIC8gMTApO1xyXG5cdFx0XHQvL+aPkOmrmOS4i+S4gOe6p+eahOWNh+e6p+WIhuaVsFxyXG5cdFx0XHRHYW1lQ29uc3QubGV2ZWxVcFNjb3JlICs9IEdhbWVDb25zdC5sZXZlbCAqIDEwO1xyXG5cdFx0fVxyXG5cdH1cclxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuXHQvKipcclxuXHQg5ri45oiP57uT5p2fXHJcblx0XHQqL1xyXG5cdHByaXZhdGUgZ2FtZU92ZXIoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/np7vpmaTmiYDmnInoiJ7lj7Dkuovku7bvvIzpvKDmoIfmk43mjqdcclxuXHRcdExheWEuc3RhZ2Uub2ZmQWxsKCk7XHJcblx0XHQvL+enu+mZpOWcsOWbvuiDjOaZr1xyXG5cdFx0dGhpcy5tYXAucmVtb3ZlU2VsZigpO1xyXG5cdFx0Ly/np7vpmaTmuLjmiI/kuK1VSVxyXG5cdFx0dGhpcy5wbGF5LnJlbW92ZVNlbGYoKTtcclxuXHRcdFxyXG5cdFx0Ly/muIXnqbrop5LoibLlsYLlrZDlr7nosaFcclxuXHRcdHRoaXMucm9sZUxheWVyLnJlbW92ZUNoaWxkcmVuKDAsdGhpcy5yb2xlTGF5ZXIubnVtQ2hpbGRyZW4tMSk7XHJcblx0XHQvL+enu+mZpOinkuiJsuWxglxyXG5cdFx0dGhpcy5yb2xlTGF5ZXIucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHJcblx0XHQvL+WOu+mZpOa4uOaIj+S4u+W+queOr1xyXG5cdFx0TGF5YS50aW1lci5jbGVhcih0aGlzLHRoaXMubG9vcCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5ri45oiP57uT5p2f6aG16Z2iXHJcblx0XHRpZih0aGlzLm92ZXIgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5vdmVyID0gbmV3IEdhbWVPdmVyKCk7XHJcblx0XHQvL+a4uOaIj+enr+WIhuaYvuekulxyXG5cdFx0dGhpcy5vdmVyLnR4dF9zY29yZS50ZXh0PSBHYW1lQ29uc3Quc2NvcmUudG9TdHJpbmcoKTtcclxuXHRcdC8v5Lul5by55Ye65pa55byP5omT5byA77yM5pyJ57yT5Yqo5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHR0aGlzLm92ZXIucG9wdXAoKTtcclxuXHRcdC8v6YeN5paw5byA5aeL5LqL5Lu255uR5ZCsLOeCueWHu+WQjui/m+WFpea4uOaIj+S4rVxyXG5cdFx0dGhpcy5vdmVyLm9uKFwicmVTdGFydFwiLHRoaXMsdGhpcy5nYW1lSW5pdCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCdWxsZXQgZXh0ZW5kcyBSb2xlXHJcbntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+makOiXj++8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirop5LoibLmrbvkuqHlubblm57mlLbliLDlr7nosaHmsaAqKi9cclxuICAgIHB1YmxpYyBkaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuZGllKCk7XHJcbiAgICAgICAgLy/lm57mlLbliLDlr7nosaHmsaBcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcIkJ1bGxldFwiLCB0aGlzKTtcclxuICAgIH1cclxuICAgICAgICAgICBcclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IHVmbyBmcm9tIFwiLi91Zm9cIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcbmltcG9ydCBCdWxsZXQgZnJvbSBcIi4vQnVsbGV0XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteSBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnNob290SW50ZXJ2YWwgPSAxMDAwOyAgLy/lsITlh7vpl7TpmpRcclxuICAgIH1cclxuXHJcbiAgICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImhpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImRpZVwiKTtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHpn7PmlYhcclxuICAgICAgICAgICAgLy8gTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZ2FtZV9vdmVyLm1wM1wiKTtcclxuICAgICAgICAgICAgR2FtZUNvbnN0LnNjb3JlKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKirliqjnlLvlrozmiJDlkI7lm57osIPmlrnms5UqKiovXHJcbiAgICBwdWJsaWMgb25Db21wbGV0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5vbkNvbXBsZXRlKCk7XHJcblxyXG4gICAgICAgIC8v5aaC5p6c5q275Lqh5Yqo55S75pKt5pS+5a6M5oiQXHJcbiAgICAgICAgaWYodGhpcy5hY3Rpb249PVwiZGllXCIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL3VwZGF0ZSgp5pa55rOV5Lit77yM6ZqQ6JeP5ZCO6L+b6KGM5Zue5pS2XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5sb3N0UHJvcCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHRoaXMuYWN0aW9uPT1cImhpdFwiKS8v5aaC5p6c5piv5Y+X5Lyk5Yqo55S777yM5LiL5LiA5bin5pKt5pS+6aOe6KGM5Yqo55S7XHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJmbHlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeaOieiQveeJqeWTgSoqL1xyXG4gICAgcHJpdmF0ZSBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnR5cGUhPVwiZW5lbXkzXCIpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4qumBk+WFt1xyXG4gICAgICAgIGxldCBwcm9wOnVmbyA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcInVmb1wiLHVmbyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICBsZXQgcjpOdW1iZXI9TWF0aC5yYW5kb20oKTtcclxuICAgICAgICBsZXQgbnVtOm51bWJlcj0ocjwwLjcpPzE6MjtcclxuICAgICAgICBcclxuICAgICAgICAvL+mHjeaWsOWIneWni+WMlumBk+WFt+WxnuaApyzpmLXokKXkuLrmlYzmlrnvvIjlj6rkuI7kuLvop5Llj5HnlJ/norDmkp7vvIlcclxuICAgICAgICBwcm9wLmluaXQoXCJ1Zm9cIitudW0sMSwyLDMwLDEpO1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgcHJvcC5wcm9wVHlwZT1udW07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lvLrliLbmmL7npLpcclxuICAgICAgICBwcm9wLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAvL+eUn+aIkOeahOS9jee9ruS4uuatu+S6oeiAheS9jee9rlxyXG4gICAgICAgIHByb3AucG9zKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgICAgIC8v5Yqg6L295Yiw54i25a655ZmoIFxyXG4gICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gTGF5YS5Ccm93c2VyLm5vdygpIDtcclxuICAgICAgICAvL+WmguaenOW9k+WJjeaXtumXtOWkp+S6juS4i+asoeWwhOWHu+aXtumXtFxyXG4gICAgICAgIGlmICh0aW1lID50aGlzLnNob290VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Y+R5bCE5a2Q5by555qE5L2N572u5pWw57uEXHJcbiAgICAgICAgICAgIGxldCBwb3M6bnVtYmVyW10gPSB0aGlzLmJ1bGxldFBvc1t0aGlzLnNob290TnVtLTFdXHJcbiAgICAgICAgICAgIGZvcihsZXQgaTpudW1iZXIgPSAwIDsgaTxwb3MubGVuZ3RoIDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+abtOaWsOS4i+asoeWtkOW8ueWwhOWHu+eahOaXtumXtFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aW1lICsgdGhpcy5zaG9vdEludGVydmFsIDsgXHJcbiAgICAgICAgICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldDogQnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiQnVsbGV0XCIsQnVsbGV0KSBhcyBCdWxsZXQ7XHJcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQxXCIsMSwxMCwxLHRoaXMuY2FtcClcclxuICAgICAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54K3Bvc1tpXSwgdGhpcy55KzgwKTtcclxuICAgICAgICAgICAgICAgIC8v5peL6L2s6KeS5bqmXHJcblxyXG4gICAgICAgICAgICAgICAgLy/mt7vliqDliLDop5LoibLlsYJcclxuICAgICAgICAgICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKGJ1bGxldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6KeS6Imy5q275Lqh5bm25Zue5pS25Yiw5a+56LGh5rGgKiovXHJcbiAgICBwdWJsaWMgZGllKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmRpZSgpO1xyXG4gICAgICAgIC8v5Zue5pS25Yiw5a+56LGh5rGgXHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoXCJFbmVteVwiLCB0aGlzKTtcclxuICAgIH1cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9CdWxsZXRcIjtcclxuaW1wb3J0IEdhbWVDb25zdCBmcm9tIFwiLi4vR2FtZUNvbnN0XCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZXJvIGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIC8vdGhpcy5wbGF5QWN0aW9uKFwiaGl0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHliqjnlLtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZGllXCIpO1xyXG4gICAgICAgICAgICAvL+a3u+WKoOatu+S6oemfs+aViFxyXG4gICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9nYW1lX292ZXIubXAzXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgICAgIC8qKlxyXG4gICAgICog6KeS6Imy5ZCD5Yiw6YGT5YW377yM5Yqg6KGA5oiW5a2Q5by557qn5YirXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgZWF0UHJvcChwcm9wOlJvbGUpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WmguaenOiwg+eUqOiAheaYr+S4u+inkuaIlnByb3DkuI3mmK/pgZPlhbfvvIzliJnov5Tlm55cclxuICAgICAgICBpZihwcm9wLnByb3BUeXBlPT0wKSByZXR1cm47XHJcbiAgICAgICAgLy/mt7vliqDlkIPlvLrljJbpgZPlhbfpn7PmlYhcdFx0XHRcdFx0XHJcbiAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvYWNoaWV2ZW1lbnQubXAzXCIpO1xyXG4gICAgICAgIC8v5ZCD5a2Q5by5566xXHJcbiAgICAgICAgaWYocHJvcC5wcm9wVHlwZT09MSkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WtkOW8uee6p+WIq+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldExldmVsKytcclxuICAgICAgICAgICAgLy/lrZDlvLnmr4/ljYcy57qn77yM5a2Q5by55pWw6YeP5aKe5YqgMe+8jOacgOWkp+aVsOmHj+mZkOWItuWcqDTkuKpcclxuICAgICAgICAgICAgdGhpcy5zaG9vdE51bSA9IE1hdGgubWluKE1hdGguZmxvb3IodGhpcy5idWxsZXRMZXZlbCAvIDIpICsgMSw0KTtcclxuICAgICAgICAgICAgLy/lrZDlvLnnuqfliKvotorpq5jvvIzlj5HlsITpopHnjofotorlv6tcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gMzAwIC0gOCAqICh0aGlzLmJ1bGxldExldmVsID4gOCA/IDggOiB0aGlzLmJ1bGxldExldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwcm9wLnByb3BUeXBlPT0yKS8v5ZCD6KGAXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+ihgOmHj+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmhwKz0yO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mBk+WFt+atu+S6oVxyXG4gICAgICAgIHByb3AuaHA9MDtcclxuICAgICAgICAvL+mBk+WFt+WQg+WujOWQjua2iOWkse+8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHByb3AudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDmm7TmlrBcclxuICAgICAqL1x0XHJcbiAgICBwdWJsaWMgdXBkYXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5Li76KeS6L6555WM5qOA5p+lXHJcbiAgICAgICAgLy/pnIDlh4/ljrvop5LoibLlrr3miJbpq5jnmoTkuIDljYrvvIzlm6DkuLrlnKhJREXkuK3liLbkvZzliqjnlLvml7bvvIzmiJHku6zmiorop5LoibLnmoTkuK3lv4PlgZrkuLrkuobop5LoibLlr7nosaHnmoTljp/ngrlcclxuICAgICAgICAvL+WIpOaWreaYr+WQpuW3puWPs+i2heWHulxyXG4gICAgICAgIGlmKHRoaXMueDx0aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMueD10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLng+NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy54PTcyMC10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbkuIrkuIvotoXlh7pcclxuICAgICAgICBpZih0aGlzLnk8dGhpcy5yb2xlQW5pLmhlaWdodC8yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy55PXRoaXMucm9sZUFuaS5oZWlnaHQvMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLnk+MTI4MC10aGlzLnJvbGVBbmkuaGVpZ2h0LzIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnk9MTI4MC10aGlzLnJvbGVBbmkuaGVpZ2h0LzI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgIOinkuiJsuWwhOWHu++8jOeUn+aIkOWtkOW8uVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHNob290KCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6I635Y+W5b2T5YmN5pe26Ze0XHJcbiAgICAgICAgbGV0IHRpbWU6bnVtYmVyID0gTGF5YS5Ccm93c2VyLm5vdygpIDtcclxuICAgICAgICAvL+WmguaenOW9k+WJjeaXtumXtOWkp+S6juS4i+asoeWwhOWHu+aXtumXtFxyXG4gICAgICAgIGlmICh0aW1lID50aGlzLnNob290VGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Y+R5bCE5a2Q5by555qE5L2N572u5pWw57uEXHJcbiAgICAgICAgICAgIGxldCBwb3M6bnVtYmVyW10gPSB0aGlzLmJ1bGxldFBvc1t0aGlzLnNob290TnVtLTFdXHJcbiAgICAgICAgICAgIGZvcihsZXQgaTpudW1iZXIgPSAwIDsgaTxwb3MubGVuZ3RoIDsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAvL+abtOaWsOS4i+asoeWtkOW8ueWwhOWHu+eahOaXtumXtFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG9vdFRpbWUgPSB0aW1lICsgdGhpcy5zaG9vdEludGVydmFsIDsgXHJcbiAgICAgICAgICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4quWtkOW8uVxyXG4gICAgICAgICAgICAgICAgbGV0IGJ1bGxldDogQnVsbGV0ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiQnVsbGV0XCIsQnVsbGV0KSBhcyBCdWxsZXQ7XHJcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQyXCIsMSwtMTAsMSx0aGlzLmNhbXApXHJcbiAgICAgICAgICAgICAgICAvL+WtkOW8uea2iOWkseWQjuS8muS4jeaYvuekuu+8jOmHjeaWsOWIneWni+WMllxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8v6K6+572u5a2Q5by55Y+R5bCE5Yid5aeL5YyW5L2N572uXHJcbiAgICAgICAgICAgICAgICBidWxsZXQucG9zKHRoaXMueCtwb3NbaV0sIHRoaXMueS04MCk7XHJcbiAgICAgICAgICAgICAgICAvL+aXi+i9rOinkuW6plxyXG4gICAgICAgICAgICAgICAgYnVsbGV0LnJvdGF0aW9uID0gMDtcclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5Yiw6KeS6Imy5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgLy/mt7vliqDlrZDlvLnpn7PmlYhcdFx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9idWxsZXQubXAzXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiXHJcbmltcG9ydCBBbmltYXRpb24gPSBMYXlhLkFuaW1hdGlvbjtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlIGV4dGVuZHMgTGF5YS5TcHJpdGVcclxue1xyXG5cdC8qKirpo57mnLrnmoTnsbvlnosgICDigJxoZXJv4oCdOueOqeWutumjnuacuu+8jOKAnGVuZW154oCd77ya5pWM5Lq66aOe5py644CB4oCcYnVsbGXigJ3vvJrlrZDlvLnjgIFcInVmb1wiOumBk+WFtyoqKiovXHJcbiAgICBwdWJsaWMgdHlwZTpTdHJpbmc7XHJcbiAgICAvKioq6aOe5py655qE6KGA6YePKioqL1xyXG4gICAgcHVibGljIGhwOm51bWJlcj0wOyBcclxuICAgIC8qKirpo57mnLrnmoTpgJ/luqYqKiovXHJcbiAgICBwcm90ZWN0ZWQgc3BlZWQ6bnVtYmVyPTA7XHRcclxuICAgIFxyXG4gICAgLyoqKumjnuacuueahOiiq+aUu+WHu+WNiuW+hCoqKi9cclxuICAgIHB1YmxpYyBoaXRSYWRpdXM6bnVtYmVyO1xyXG4gICAgLyoqKumjnuacuueahOmYteiQpe+8iOaVjOaIkeWMuuWIq++8iSoqKi9cclxuICAgIHB1YmxpYyBjYW1wOm51bWJlcjtcclxuICAgIFxyXG4gICAgLyoqKuinkuiJsueahOWKqOeUu+i1hOa6kCoqKi9cclxuICAgIHByb3RlY3RlZCByb2xlQW5pOkFuaW1hdGlvbjtcclxuICAgIC8qKirlvZPliY3liqjnlLvliqjkvZwqKiovXHJcbiAgICBwcm90ZWN0ZWQgYWN0aW9uOlN0cmluZztcclxuICAgIFxyXG4gICAgLyoqKuWwhOWHu+mXtOmalCoqKi9cclxuICAgIHB1YmxpYyBzaG9vdEludGVydmFsOiBudW1iZXI9IDMwMDtcclxuICAgIC8qKirkuIvmrKHlsITlh7vml7bpl7QqKiovXHJcbiAgICBwdWJsaWMgc2hvb3RUaW1lOiBudW1iZXI9IDMwMDtcclxuICAgIFxyXG4gICAgLyoqKirpgZPlhbfnsbvlnosgMDrpo57mnLrmiJblrZDlvLnvvIwxOuWtkOW8ueeuse+8jDI66KGA55O2KioqL1xyXG4gICAgcHVibGljIHByb3BUeXBlOm51bWJlcj0wO1xyXG4gICAgLyoqKuWtkOW8uee6p+WIq++8iOWQg+WtkOW8uemBk+WFt+WQjuWNh+e6p++8iSoqKi9cclxuICAgIHB1YmxpYyBidWxsZXRMZXZlbDogbnVtYmVyID0gMDtcclxuICAgIC8qKirlkIzml7blsITlh7vlrZDlvLnmlbDph48qKiovXHJcbiAgICBwdWJsaWMgc2hvb3ROdW06IG51bWJlcj0gMTtcclxuICAgIC8qKirlrZDlvLnlgY/np7vnmoTkvY3nva4qKiovXHJcbiAgICBwcm90ZWN0ZWQgYnVsbGV0UG9zOiBudW1iZXJbXVtdID0gW1swXSwgWy0xNSwgMTVdLCBbLTMwLCAwLCAzMF0sIFstNDUsIC0xNSwgMTUsIDQ1XV07XHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgIC8v5a6e5L6L5YyW5Yqo55S7XHJcbiAgICAgICAgIHRoaXMucm9sZUFuaT1uZXcgQW5pbWF0aW9uKCk7XHJcbiAgICAgICAgIC8v5Yqg6L29SURF57yW6L6R55qE5Yqo55S75paH5Lu2XHJcbiAgICAgICAgIHRoaXMucm9sZUFuaS5sb2FkQW5pbWF0aW9uKFwiR2FtZVJvbGUuYW5pXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5Yid5aeL5YyWXHJcbiAgICAgKiBAcGFyYW0gdHlwZSAg6KeS6Imy57G75Z6LIC0tLeKAnGhlcm/igJ06546p5a626aOe5py677yM4oCcZW5lbXkxLTPigJ3vvJrmlYzkurrpo57mnLrjgIHigJxidWxsZToxLTLigJ3vvJrlrZDlvLnjgIFcInVmbzEtMlwiOumBk+WFt1xyXG4gICAgICogQHBhcmFtIGhwICAgICAg6KGA6YePXHJcbiAgICAgKiBAcGFyYW0gc3BlZWQgICDpgJ/luqZcclxuICAgICAqIEBwYXJhbSBoaXRSYWRpdXMgICDnorDmkp7ljYrlvoRcclxuICAgICAqIEBwYXJhbSBjYW1wICAgIOmYteiQpVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGluaXQodHlwZTpTdHJpbmcsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixoaXRSYWRpdXM6bnVtYmVyLGNhbXA6bnVtYmVyKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/op5LoibLliJ3lp4vljJblsZ7mgKdcclxuICAgICAgICB0aGlzLnR5cGU9dHlwZTtcclxuICAgICAgICB0aGlzLmhwPWhwO1xyXG4gICAgICAgIHRoaXMuc3BlZWQ9c3BlZWQ7XHJcbiAgICAgICAgdGhpcy5oaXRSYWRpdXM9aGl0UmFkaXVzO1xyXG4gICAgICAgIHRoaXMuY2FtcD1jYW1wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v6YGT5YW35bGe5oCn5Yid5aeL5Li6MFxyXG4gICAgICAgIHRoaXMucHJvcFR5cGU9MDtcclxuICAgICAgICBcclxuICAgICAgICAvL+WKoOi9veWKqOeUu+WvueixoVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5yb2xlQW5pKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v55uR5ZCs5Yqo55S75a6M5oiQ5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLm9uKEV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKVxyXG4gICAgICAgIC8v5pKt5pS+6buY6K6k6aOe6KGM5Yqo55S7XHJcbiAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHVibGljIG9uQ29tcGxldGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLov5jmnKrmnInlrr3vvIzojrflvpfop5LoibLlrr3pq5hcdFxyXG4gICAgICAgIGlmKHRoaXMucm9sZUFuaS53aWR0aD09MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6I635b6X5Yqo55S755+p5b2i6L6555WMXHJcbiAgICAgICAgICAgIHZhciBib3VuZHM6TGF5YS5SZWN0YW5nbGU9dGhpcy5yb2xlQW5pLmdldEJvdW5kcygpO1xyXG4gICAgICAgICAgICAvL+inkuiJsiDlrr3pq5jotYvlgLxcclxuICAgICAgICAgICAgdGhpcy5yb2xlQW5pLnNpemUoYm91bmRzLndpZHRoLGJvdW5kcy5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7liqjnlLsgXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uIOWKqOeUu+eKtuaAgSAgIFwiZmx5XCLjgIFcImhpdFwi44CBXCJkaWVcIlxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBwbGF5QWN0aW9uKGFjdGlvbjpTdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGlvbj1hY3Rpb247XHJcbiAgICAgICAgLy/mkq3mlL7op5LoibLliqjnlLssbmFtZT3op5LoibLnsbvlnotf5Yqo55S754q25oCB77yM5aaC77yaaGVyb19mbHlcclxuICAgICAgICB0aGlzLnJvbGVBbmkucGxheSgwLHRydWUsdGhpcy50eXBlK1wiX1wiK2FjdGlvbik7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLpmpDol4/vvIzop5LoibLmtojkuqHlubblm57mlLZcclxuICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5kaWUoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+inkuiJsuagueaNrumAn+W6pumjnuihjFxyXG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgIC8v5aaC5p6c56e75Yqo5Yiw5pi+56S65Yy65Z+f5Lul5aSW77yM5YiZ56e76ZmkXHJcbiAgICAgICAgaWYgKHRoaXMueSA+IDEyODArMTAwfHx0aGlzLnk8LTE1MClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICBcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoq6KeS6Imy5q275Lqh5bm25Zue5pS25Yiw5a+56LGh5rGgKiovXHJcbiAgICBwdWJsaWMgZGllKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v6KeS6Imy5Yqo55S75YGc5q2iXHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLnN0b3AoKTsgXHJcbiAgICAgICAgLy/ljrvpmaTmiYDmnInliqjnlLvnm5HlkKxcclxuICAgICAgICB0aGlzLnJvbGVBbmkub2ZmQWxsKCk7XHJcbiAgICAgICAgLy/ku47oiJ7lj7Dnp7vpmaRcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuXHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB1Zm8gZXh0ZW5kcyBSb2xlXHJcbntcclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+makOiXj++8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirop5LoibLmrbvkuqHlubblm57mlLbliLDlr7nosaHmsaAqKi9cclxuICAgIHB1YmxpYyBkaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuZGllKCk7XHJcbiAgICAgICAgLy/lm57mlLbliLDlr7nosaHmsaBcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcInVmb1wiLCB0aGlzKTtcclxuICAgIH1cclxuICAgICAgICAgICBcclxufSIsIi8qKlRoaXMgY2xhc3MgaXMgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgYnkgTGF5YUFpcklERSwgcGxlYXNlIGRvIG5vdCBtYWtlIGFueSBtb2RpZmljYXRpb25zLiAqL1xuaW1wb3J0IFZpZXc9TGF5YS5WaWV3O1xuaW1wb3J0IERpYWxvZz1MYXlhLkRpYWxvZztcbmltcG9ydCBTY2VuZT1MYXlhLlNjZW5lO1xuZXhwb3J0IG1vZHVsZSB1aSB7XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZUJnVUkgZXh0ZW5kcyBWaWV3IHtcclxuXHRcdHB1YmxpYyBiZzE6TGF5YS5JbWFnZTtcblx0XHRwdWJsaWMgYmcyOkxheWEuSW1hZ2U7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdcIixcInByb3BzXCI6e1wid2lkdGhcIjo3MjAsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjEsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwidmFyXCI6XCJiZzFcIixcInNraW5cIjpcImJhY2tncm91bmQucG5nXCJ9LFwiY29tcElkXCI6Mn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOi0xMjgwLFwieFwiOjAsXCJ2YXJcIjpcImJnMlwiLFwic2tpblwiOlwiYmFja2dyb3VuZC5wbmdcIn0sXCJjb21wSWRcIjozfV0sXCJsb2FkTGlzdFwiOltcImJhY2tncm91bmQucG5nXCJdLFwibG9hZExpc3QzRFwiOltdLFwiY29tcG9uZW50c1wiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhHYW1lQmdVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lT3ZlclVJIGV4dGVuZHMgRGlhbG9nIHtcclxuXHRcdHB1YmxpYyBhbmlfcmVzdGFydDpMYXlhLkZyYW1lQW5pbWF0aW9uO1xuXHRcdHB1YmxpYyB0eHRfc2NvcmU6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIGJ0bl9yZXN0YXJ0OkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dcIixcInByb3BzXCI6e1wid2lkdGhcIjo3MjAsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjEsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmcuanBnXCIsXCJzaXplR3JpZFwiOlwiNCw0LDQsNFwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6Mzc4LFwieFwiOjIyOSxcInNraW5cIjpcImdhbWVVSS9nYW1lT3Zlci5wbmdcIn0sXCJjb21wSWRcIjozfSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoxMjAwLFwieFwiOjE5LFwid2lkdGhcIjo2ODEsXCJ0ZXh0XCI6XCJMYXlhQWlyMS43LjPlvJXmk47mlZnlrabmvJTnpLrniYhcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjoyNixcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiM3Yzc5NzlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo1fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjo1NzUsXCJ4XCI6MjQ0LFwid2lkdGhcIjoxNDQsXCJ0ZXh0XCI6XCLmnKzlsYDnp6/liIbvvJpcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiM3Yzc5NzlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo2fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjo1NzUsXCJ4XCI6MzYzLFwid2lkdGhcIjoxMjgsXCJ2YXJcIjpcInR4dF9zY29yZVwiLFwidGV4dFwiOlwiMTIwMFwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjd9LHtcInR5cGVcIjpcIkJveFwiLFwicHJvcHNcIjp7XCJ5XCI6OTYwLFwieFwiOjIzOSxcInZhclwiOlwiYnRuX3Jlc3RhcnRcIn0sXCJjb21wSWRcIjoxMCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjoxLFwid2lkdGhcIjoyNDAsXCJzdGF0ZU51bVwiOjIsXCJza2luXCI6XCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwic2l6ZUdyaWRcIjpcIjEwLDEwLDEwLDEwXCIsXCJoZWlnaHRcIjo4MH0sXCJjb21wSWRcIjoxMX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE4LFwieFwiOjQxLFwic2tpblwiOlwiZ2FtZVVJL3Jlc3RhcnQucG5nXCJ9LFwiY29tcElkXCI6MTJ9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwiYW5pbWF0aW9uc1wiOlt7XCJub2Rlc1wiOlt7XCJ0YXJnZXRcIjoxMCxcImtleWZyYW1lc1wiOntcInlcIjpbe1widmFsdWVcIjo5NzAsXCJ0d2Vlbk1ldGhvZFwiOlwiZWxhc3RpY091dFwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MTAsXCJrZXlcIjpcInlcIixcImluZGV4XCI6MH0se1widmFsdWVcIjo5NjAsXCJ0d2Vlbk1ldGhvZFwiOlwibGluZWFyTm9uZVwiLFwidHdlZW5cIjp0cnVlLFwidGFyZ2V0XCI6MTAsXCJrZXlcIjpcInlcIixcImluZGV4XCI6OH1dfX1dLFwibmFtZVwiOlwiYW5pX3Jlc3RhcnRcIixcImlkXCI6MSxcImZyYW1lUmF0ZVwiOjI0LFwiYWN0aW9uXCI6MH1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmcuanBnXCIsXCJnYW1lVUkvZ2FtZU92ZXIucG5nXCIsXCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwiZ2FtZVVJL3Jlc3RhcnQucG5nXCJdLFwibG9hZExpc3QzRFwiOltdLFwiY29tcG9uZW50c1wiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhHYW1lT3ZlclVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVQbGF5VUkgZXh0ZW5kcyBWaWV3IHtcclxuXHRcdHB1YmxpYyBidG5fcGF1c2U6TGF5YS5CdXR0b247XG5cdFx0cHVibGljIHR4dF9ocDpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgdHh0X2xldmVsOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyB0eHRfc2NvcmU6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIGdhbWVQYXVzZTpMYXlhLkJveDtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoyMCxcInhcIjoxMCxcIndpZHRoXCI6NzAwLFwic2tpblwiOlwiZ2FtZVVJL2JsYW5rLnBuZ1wiLFwiaGVpZ2h0XCI6NDV9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjoyMSxcInhcIjo2MTgsXCJ2YXJcIjpcImJ0bl9wYXVzZVwiLFwic3RhdGVOdW1cIjoxLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9wYXVzZS5wbmdcIn0sXCJjb21wSWRcIjo2fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjo0MSxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfaHBcIixcInRleHRcIjpcIkhQ77yaXCIsXCJoZWlnaHRcIjo0MCxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImxlZnRcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6OH0se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6MjQsXCJ4XCI6MjI4LFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9sZXZlbFwiLFwidGV4dFwiOlwibGV2ZWzvvJpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo5fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjo0MTUsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X3Njb3JlXCIsXCJ0ZXh0XCI6XCJTY29yZTpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjoxMH0se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInZpc2libGVcIjpmYWxzZSxcInZhclwiOlwiZ2FtZVBhdXNlXCIsXCJoZWlnaHRcIjoxMjgwLFwiYWxwaGFcIjoxfSxcImNvbXBJZFwiOjEzLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwic2tpblwiOlwiZ2FtZVVJL2JsYW5rLnBuZ1wiLFwic2l6ZUdyaWRcIjpcIjIsMiwyLDJcIixcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MTV9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo0MTEsXCJ4XCI6MTEwLFwid2lkdGhcIjo1MDAsXCJ2aXNpYmxlXCI6dHJ1ZSxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCIxMCwxMCwxMCwxMFwiLFwiaGVpZ2h0XCI6NTAwfSxcImNvbXBJZFwiOjEyfSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjo4MDEsXCJ4XCI6MTkwLFwid2lkdGhcIjozNDAsXCJ0ZXh0XCI6XCLngrnlh7vku7vmhI/kvY3nva7nu6fnu63muLjmiI9cIixcImhlaWdodFwiOjQ0LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiMyMzIyMjJcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjoxNH0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQ2OCxcInhcIjoyMTQsXCJza2luXCI6XCJnYW1lVUkvZ2FtZVBhdXNlLnBuZ1wifSxcImNvbXBJZFwiOjE2fV0sXCJjb21wb25lbnRzXCI6W119XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JsYW5rLnBuZ1wiLFwiZ2FtZVVJL2J0bl9wYXVzZS5wbmdcIixcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9nYW1lUGF1c2UucG5nXCJdLFwibG9hZExpc3QzRFwiOltdLFwiY29tcG9uZW50c1wiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhHYW1lUGxheVVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVTdGFydFVJIGV4dGVuZHMgRGlhbG9nIHtcclxuXHRcdHB1YmxpYyB0eHRfbG9hZDpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgYnRuX3N0YXJ0OkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJEaWFsb2dcIixcInByb3BzXCI6e1wid2lkdGhcIjo3MjAsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjEsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmcuanBnXCIsXCJzaXplR3JpZFwiOlwiNCw0LDQsNFwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6Mzc4LFwieFwiOjE3OSxcInNraW5cIjpcImdhbWVVSS9sb2dvLnBuZ1wifSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU4NyxcInhcIjoyMCxcIndpZHRoXCI6NjgxLFwidmFyXCI6XCJ0eHRfbG9hZFwiLFwidGV4dFwiOlwi5ri45oiP6LWE5rqQ5Yqg6L296L+b5bqmXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjMWMxYzFjXCIsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjR9LHtcInR5cGVcIjpcIkJveFwiLFwicHJvcHNcIjp7XCJ5XCI6OTYwLFwieFwiOjI0MCxcInZpc2libGVcIjp0cnVlLFwidmFyXCI6XCJidG5fc3RhcnRcIn0sXCJjb21wSWRcIjoxMCxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjoyNDAsXCJ2aXNpYmxlXCI6dHJ1ZSxcInN0YXRlTnVtXCI6MixcInNraW5cIjpcImdhbWVVSS9idG5fYmcucG5nXCIsXCJzaXplR3JpZFwiOlwiMjAsMjAsMjAsMjBcIixcImhlaWdodFwiOjgwfSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxOSxcInhcIjo0MSxcInNraW5cIjpcImdhbWVVSS9zdGFydC5wbmdcIn0sXCJjb21wSWRcIjoxMX1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9sb2dvLnBuZ1wiLFwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcImdhbWVVSS9zdGFydC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVTdGFydFVJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHIiXX0=
