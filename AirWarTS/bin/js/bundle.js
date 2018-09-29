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
},{"./ui/layaMaxUI":11}],2:[function(require,module,exports){
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
},{"./ui/layaMaxUI":11}],3:[function(require,module,exports){
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
},{"./ui/layaMaxUI":11}],4:[function(require,module,exports){
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
},{"./ui/layaMaxUI":11}],5:[function(require,module,exports){
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
        this.checkCollect();
        //敌方飞机生成逻辑
        this.loopCreateEnemy();
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
    //生成敌方飞机
    Main.prototype.loopCreateEnemy = function () {
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
},{"./GameMap":1,"./GameOver":2,"./GamePlay":3,"./GameStart":4,"./Role/Enemy":7,"./Role/Hero":8}],6:[function(require,module,exports){
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
},{"./Role":9}],7:[function(require,module,exports){
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
},{"../Main":5,"./Role":9,"./ufo":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var Main_1 = require("../Main");
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
                //添加到角色层
                this.parent.addChild(bullet);
                //添加子弹音效					
                //Laya.SoundManager.playSound("sound/bullet.mp3");
            }
        }
    };
    return Hero;
}(Role_1.default));
exports.default = Hero;
},{"../Main":5,"./Bullet":6,"./Role":9}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{"./Role":9}],11:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZU1hcC50cyIsInNyYy9HYW1lT3Zlci50cyIsInNyYy9HYW1lUGxheS50cyIsInNyYy9HYW1lU3RhcnQudHMiLCJzcmMvTWFpbi50cyIsInNyYy9Sb2xlL0J1bGxldC50cyIsInNyYy9Sb2xlL0VuZW15LnRzIiwic3JjL1JvbGUvSGVyby50cyIsInNyYy9Sb2xlL1JvbGUudHMiLCJzcmMvUm9sZS91Zm8udHMiLCJzcmMvdWkvbGF5YU1heFVJLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1RBLDRDQUFvQztBQUVwQyxjQUFjO0FBQ2Q7SUFBcUMsMkJBQVc7SUFFNUM7ZUFFSSxpQkFBTztJQUNYLENBQUM7SUFFRDs7VUFFTTtJQUNDLDJCQUFTLEdBQWhCO1FBRUksSUFBSSxDQUFDLENBQUMsSUFBRSxDQUFDLENBQUM7UUFDViw0QkFBNEI7UUFDNUIsWUFBWTtRQUNaLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQy9CO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztTQUMxQjtRQUNELElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQy9CO1lBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztTQUMxQjtJQUNMLENBQUM7SUFFTCxjQUFDO0FBQUQsQ0F6QkEsQUF5QkMsQ0F6Qm9DLGNBQUUsQ0FBQyxRQUFRLEdBeUIvQzs7Ozs7QUM1QkQsNENBQW9DO0FBRXBDLFlBQVk7QUFDWjtJ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RUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLGFBQWEsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLG1CQUFtQixFQUFDLFVBQVUsRUFBQyxhQUFhLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxvQkFBb0IsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFdBQVcsRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxhQUFhLEVBQUMsWUFBWSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxLQUFLLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsYUFBYSxFQUFDLElBQUksRUFBQyxDQUFDLEVBQUMsV0FBVyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxVQUFVLEVBQUMsQ0FBQyxlQUFlLEVBQUMscUJBQXFCLEVBQUMsbUJBQW1CLEVBQUMsb0JBQW9CLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQztRQU1yb0QsaUJBQUM7S0FWRCxBQVVDLENBVitCLE1BQU0sR0FVckM7SUFWWSxhQUFVLGFBVXRCLENBQUE7SUFDRDtRQUFnQyw4QkFBSTtRQU9oQzttQkFBZSxpQkFBTztRQUFBLENBQUM7UUFDdkIsbUNBQWMsR0FBZDtZQUNJLGlCQUFNLGNBQWMsV0FBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFMYyxpQkFBTSxHQUFNLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxJQUFJLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsVUFBVSxFQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsc0JBQXNCLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsa0JBQWtCLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxlQUFlLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxRQUFRLEVBQUMsR0FBRyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE1BQU0sRUFBQyxzQkFBc0IsRUFBQyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsQ0FBQyxFQUFDLFlBQVksRUFBQyxFQUFFLEVBQUMsQ0FBQyxF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QixDQUFBO0FBQ0wsQ0FBQyxFQTdDYSxFQUFFLEdBQUYsVUFBRSxLQUFGLFVBQUUsUUE2Q2YiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XHJcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG4oZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP6IOM5pmv55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lTWFwIGV4dGVuZHMgdWkuR2FtZUJnVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDmuLjmiI/og4zmma/np7vliqjmm7TmlrBcclxuICAgICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGVNYXAoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgdGhpcy55Kz0xO1xyXG4gICAgICAgIC8v5aaC5p6c6IOM5pmv5Zu+5Yiw5LqG5LiL6Z2i5LiN5Y+v6KeB77yM56uL5Y2z6LCD5pW05L2N572u5Yiw5LiK6Z2i5b6q546v5pi+56S6XHJcbiAgICAgICAgLy/muLjmiI/oiJ7lj7Dpq5jkuLoxMjgwXHJcbiAgICAgICAgaWYgKHRoaXMuYmcxLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAgeyBcclxuICAgICAgICAgICAgdGhpcy5iZzEueSAtPSAxMjgwICogMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYmcyLnkgKyB0aGlzLnkgPj0gMTI4MCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmJnMi55IC09IDEyODAgKiAyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVPdmVyIGV4dGVuZHMgdWkuR2FtZU92ZXJVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIFx0Ly9cIumHjeaWsOW8gOWni1wi5oyJ6ZKu6byg5qCH5LqL5Lu2XHJcblx0XHRcdHRoaXMuYnRuX3Jlc3RhcnQub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vblJlc3RhcnQpO1xyXG4gICAgfVxyXG5cdC8qKlxyXG5cdFx05ri45oiP6YeN5paw5byA5aeLXHJcblx0XHQgKi9cdFx0XHJcblx0XHRwcml2YXRlIG9uUmVzdGFydCgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mkq3mlL5JREXkuK3nvJbovpHnmoTmjInpkq7liqjnlLtcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5wbGF5KDAsZmFsc2UpO1xyXG5cdFx0XHQvL+ebkeWQrOWKqOeUu+WujOaIkOS6i+S7tu+8jOazqOaEj+eUqG9uY2VcclxuXHRcdFx0dGhpcy5hbmlfcmVzdGFydC5vbmNlKExheWEuRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLkFuaUNvbXBsZXRlKTtcclxuXHRcdH1cclxuXHRcdC8qKlxyXG5cdFx0IOaMiemSruWKqOeUu+aSreaUvuWujOaIkFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIEFuaUNvbXBsZXRlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+WPkemAgemHjeaWsOW8gOWni+S6i+S7tu+8jOWcqE1haW7nsbvkuK3nm5HlkKxcclxuXHRcdFx0dGhpcy5ldmVudChcInJlU3RhcnRcIilcclxuXHRcdFx0Ly/nvJPliqjliqjnlLvlhbPpl63mlYjmnpzjgIJJREXkuK3pobXpnaLkuLpEaWFsb2fmiY3lj6/nlKhcclxuXHRcdFx0dGhpcy5jbG9zZSgpO1xyXG5cdFx0fVxyXG5cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVBsYXkgZXh0ZW5kcyB1aS5HYW1lUGxheVVJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgLy/nm5HlkKzmmoLlgZzmjInpkq7kuovku7ZcclxuICAgICAgICB0aGlzLmJ0bl9wYXVzZS5vbihMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uUGF1c2UpXHJcbiAgICB9XHJcblxyXG5cdC8qKlxyXG5cdFx0IOa4uOaIj+aaguWBnFxyXG5cdFx0ICovXHRcclxuXHRcdHByaXZhdGUgb25QYXVzZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/mmL7npLpJREXkuK3pmpDol4/nmoTmmoLlgZznlYzpnaJcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2UudmlzaWJsZT10cnVlO1xyXG5cdFx0XHQvL+aaguWBnOeVjOmdouWKoOeCueWHu+ebkeWQrO+8iOS4gOasoe+8iVxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS5vbmNlKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25Db250aW51ZSlcclxuXHRcdFx0XHRcclxuXHRcdFx0Ly/ml7bpl7Tlr7nosaHnvKnmlL7kuLow5bCx5piv5YGc5q2iXHJcblx0XHRcdExheWEudGltZXIuc2NhbGU9MDtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQg5ri45oiP57un57utXHJcblx0XHQgKi9cdFxyXG5cdFx0cHJpdmF0ZSBvbkNvbnRpbnVlKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aXtumXtOWvueixoee8qeaUvuS4ujHlsLHmmK/mraPluLjpgJ/luqbmkq3mlL5cclxuXHRcdFx0TGF5YS50aW1lci5zY2FsZT0xO1xyXG5cdFx0XHQvL+makOiXj+aaguWBnOeVjOmdolxyXG5cdFx0XHR0aGlzLmdhbWVQYXVzZS52aXNpYmxlPWZhbHNlO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKioqKuacrOWxgOa4uOaIj+aVsOaNrlVJ5pu05pawKioqL1xyXG5cdFx0cHVibGljIHVwZGF0ZShocDpudW1iZXIsbGV2ZWw6bnVtYmVyLHNjb3JlOm51bWJlcik6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+inkuiJsuihgOmHj+abtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9ocC50ZXh0PVwiSFA6XCIraHA7XHJcblx0XHRcdC8v5YWz5Y2h562J57qn5pu05pawXHJcblx0XHRcdHRoaXMudHh0X2xldmVsLnRleHQ9XCJMRVZFTDpcIitsZXZlbDtcclxuXHRcdFx0Ly/muLjmiI/liIbmlbDmm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfc2NvcmUudGV4dD1cIlNDT1JFOlwiK3Njb3JlO1xyXG5cdFx0fVxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP5byA5aeL55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lU3RhcnQgZXh0ZW5kcyB1aS5HYW1lU3RhcnRVSVxyXG57XHJcbiAgICAvKioq5ri45oiP6LWE5rqQ5Zyw5Z2A5pWw57uEKioqL1xyXG4gICAgIHByaXZhdGUgYXNzZXRBcnI6YW55PVt7dXJsOlwicmVzL2F0bGFzL2dhbWVSb2xlLmF0bGFzXCJ9Ly8sXHJcbiAgICAvLyB7dXJsOlwic291bmQvYWNoaWV2ZW1lbnQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9LCBcclxuICAgIC8vIHt1cmw6XCJzb3VuZC9idWxsZXQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9LFxyXG4gICAgLy8ge3VybDpcInNvdW5kL2dhbWVfb3Zlci5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH0sXHJcbiAgICAvLyB7dXJsOlwic291bmQvZW5lbXkxX2RpZS5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH0sXHJcbiAgICAvLyB7dXJsOlwic291bmQvZW5lbXkzX291dC5tcDNcIiwgdHlwZTpMYXlhLkxvYWRlci5TT1VORH1cclxuICAgIF1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8v5ri45oiP5Yqg6L295pyq5a6M5oiQ5pqC5pe25LiN5pi+56S677yM6Ziy5q2i54K55Ye75Ye66ZSZXHJcbiAgICAgICAgdGhpcy5idG5fc3RhcnQudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIC8v55uR5ZCs55WM6Z2i5piv5ZCm5YWz6ZetXHJcbiAgICAgICAgdGhpcy5vbmNlKGxheWEuZXZlbnRzLkV2ZW50LkNMT1NFLHRoaXMsdGhpcy5vbkNsb3NlKTtcclxuICAgICAgICAvL+WKoOi9veWJqeS9mea4uOaIj+i1hOa6kOOAgemfs+S5kO+8jOWKoOi9veWujOaIkOS4juWKoOi9vei/m+W6puWbnuiwg+aWueazlVxyXG4gICAgICAgIExheWEubG9hZGVyLmxvYWQodGhpcy5hc3NldEFycixMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vbkNvbXBsZXRlKSxMYXlhLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5vblByb2dyZXNzKSlcclxuICAgIH1cclxuXHJcbiAgICBcdC8qKlxyXG5cdFx0ICog5ri45oiP6LWE5rqQ5Yqg6L295a6M5oiQXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgb25Db21wbGV0ZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/liqDovb3lrozmiJBcclxuXHRcdFx0dGhpcy50eHRfbG9hZC50ZXh0PVwi6LWE5rqQ5Yqg6L295a6M5oiQLOW8gOWni+a4uOaIj+WQpy4uLlwiO1xyXG5cdFx0XHQvL+a4uOaIj+W8gOWni+aMiemSruaYvuekuuW5tuW8ueWHulxyXG5cdFx0XHR0aGlzLmJ0bl9zdGFydC52aXNpYmxlPXRydWU7XHJcblx0XHRcdC8v57yT5Yqo57G75by55Ye65Yqo55S7XHJcblx0XHRcdExheWEuVHdlZW4uZnJvbSh0aGlzLmJ0bl9zdGFydCx7eTp0aGlzLmJ0bl9zdGFydC55KzIwfSwxMDAwLExheWEuRWFzZS5lbGFzdGljT3V0KTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqXHJcblx0XHQgKiDmuLjmiI/otYTmupDliqDovb3ov5vluqZcclxuXHRcdCAqIEBwYXJhbSBsb2FkTnVtICDov5vluqZcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBvblByb2dyZXNzKGxvYWROdW06bnVtYmVyKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pi+56S65Yqg6L296L+b5bqmXHJcblx0XHRcdHRoaXMudHh0X2xvYWQudGV4dD1cIui1hOa6kOWKoOi9veS4re+8jOW9k+WJjei/m+W6pu+8mlwiK2xvYWROdW0qMTAwK1wiJVwiO1xyXG5cdFx0fVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog55WM6Z2i5YWz6ZetXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25DbG9zZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+S7juiInuWPsOenu+mZpOiHquW3sVxyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG4gICAgICAgIC8v5Y+q5Yqg6L295LiA5qyh77yM5Zug5q2k55u05o6l5raI5q+B6Ieq5bexXHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IFdlYkdMID0gTGF5YS5XZWJHTDtcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZTtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBHYW1lU3RhcnQgZnJvbSBcIi4vR2FtZVN0YXJ0XCI7XHJcbmltcG9ydCBHYW1lTWFwIGZyb20gXCIuL0dhbWVNYXBcIjtcclxuaW1wb3J0IEdhbWVQbGF5IGZyb20gXCIuL0dhbWVQbGF5XCI7XHJcbmltcG9ydCBHYW1lT3ZlciBmcm9tIFwiLi9HYW1lT3ZlclwiO1xyXG5pbXBvcnQgUm9sZVx0ZnJvbSBcIi4vUm9sZS9Sb2xlXCI7XHJcbmltcG9ydCBIZXJvXHRmcm9tIFwiLi9Sb2xlL0hlcm9cIjtcclxuaW1wb3J0IEVuZW15IGZyb20gXCIuL1JvbGUvRW5lbXlcIjtcclxuaW1wb3J0IEJ1bGxldCBmcm9tIFwiLi9Sb2xlL0J1bGxldFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFpbiBcclxue1xyXG5cdC8qKuW8gOWni+mhtemdoioqKi9cclxuXHRwcml2YXRlIHN0YXJ0OkdhbWVTdGFydDtcclxuXHQvKirlnLDlm77pobXpnaIqKiovXHJcblx0cHJpdmF0ZSBtYXA6R2FtZU1hcDtcclxuXHQvKirmuLjmiI/kuK3nlYzpnaIqKiovXHJcblx0cHJpdmF0ZSBwbGF5OkdhbWVQbGF5O1xyXG5cdC8qKua4uOaIj+e7k+adn+mhtemdoioqKi9cclxuXHRwcml2YXRlIG92ZXI6R2FtZU92ZXI7XHJcblxyXG5cdC8qKua4uOaIj+WFs+WNoeaVsCoqKi9cclxuXHRwdWJsaWMgc3RhdGljIGxldmVsOm51bWJlcj0xO1xyXG5cdC8qKueOqeWutuW+l+WIhioqKi9cclxuXHRwdWJsaWMgc3RhdGljIHNjb3JlOm51bWJlcj0wO1xyXG5cdFxyXG5cdC8qKuinkuiJsuWxguWuueWZqCoqKi9cclxuXHRwcml2YXRlIHJvbGVMYXllcjpMYXlhLlNwcml0ZTtcclxuXHQvKirnjqnlrrbkuLvop5IqKiovXHJcblx0cHJpdmF0ZSBoZXJvOlJvbGU7XHJcblx0XHJcblx0Lyoq6byg5qCH5LiK5LiA5bineOW6p+aghyoqICovXHRcdFxyXG5cdHByaXZhdGUgbW92ZVg6bnVtYmVyO1xyXG5cdC8qKum8oOagh+S4iuS4gOW4p3nluqfmoIcqKiAqL1x0XHJcblx0cHJpdmF0ZSBtb3ZlWTpudW1iZXI7XHJcblx0XHJcblx0LyoqKirmlYzmnLrooYDph4/ooagqKioqL1xyXG5cdHByaXZhdGUgaHBzOiBudW1iZXJbXSA9IFsxLCA3LCAxNV07XHJcblx0LyoqKuaVjOacuueUn+aIkOaVsOmHj+ihqCoqL1xyXG5cdHByaXZhdGUgbnVtczogbnVtYmVyW10gPSBbMiwgMSwgMV07XHJcblx0LyoqKuaVjOacuumAn+W6puihqCoqKi9cclxuXHRwcml2YXRlIHNwZWVkczogIG51bWJlcltdID0gWzMsIDIsIDFdO1xyXG5cdC8qKirmlYzmnLrooqvlh7vljYrlvoTooagqKiovXHJcblx0cHJpdmF0ZSByYWRpdXM6ICBudW1iZXJbXSA9IFsyMCwgMzUsIDgwXTtcclxuXHRcclxuXHQvKioqKuS4u+inkuatu+S6oeWQjua4uOaIj+e7k+adn+aXtumXtCoqKi9cclxuXHRwcml2YXRlIGRlYXRoVGltZTpudW1iZXI9MFxyXG5cdFx0XHJcblx0Ly/muLjmiI/lhbPljaHmj5DljYflsZ7mgKdcclxuXHQvKioq5pWM5Lq65Yi35paw5Yqg6YCfKioqKi9cclxuXHRwcml2YXRlIGNyZWF0ZVRpbWU6bnVtYmVyID0gMDtcclxuXHQvKioq5pWM5Lq66YCf5bqm5o+Q5Y2HKioqL1xyXG5cdHByaXZhdGUgc3BlZWRVcDpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrooYDph4/mj5DljYdcdCoqKi9cdFx0XHJcblx0cHJpdmF0ZSBocFVwOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uuaVsOmHj+aPkOWNh1x0KioqL1x0XHRcdFx0XHRcclxuXHRwcml2YXRlIG51bVVwOm51bWJlciA9IDA7XHJcblx0LyoqKirljYfnuqfnrYnnuqfmiYDpnIDnmoTmiJDnu6nmlbDph48qKiovXHJcblx0cHJpdmF0ZSBsZXZlbFVwU2NvcmU6IG51bWJlciA9IDEwO1xyXG5cclxuXHRjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuXHRcdC8v5Yid5aeL5YyW5byV5pOO77yM5bu66K6u5aKe5YqgV2ViR2zmqKHlvI9cclxuXHRcdExheWEuaW5pdCg3MjAsMTI4MCxXZWJHTCk7XHJcblx0XHQvL+WFqOWxj+S4jeetieavlOe8qeaUvuaooeW8j1xyXG5cdFx0TGF5YS5zdGFnZS5zY2FsZU1vZGUgPSBTdGFnZS5TQ0FMRV9FWEFDVEZJVDtcclxuXHRcdFxyXG5cdFx0TGF5YS5sb2FkZXIubG9hZChcInJlcy9hdGxhcy9nYW1lVUkuYXRsYXNcIixsYXlhLnV0aWxzLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5HYW1lU3RhcnQpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgR2FtZVN0YXJ0KCk6dm9pZCBcclxuXHR7XHJcblx0XHQvL+WunuS+i+WMluW8gOWni+mhtemdolxyXG5cdFx0dGhpcy5zdGFydCA9IG5ldyBHYW1lU3RhcnQoKTtcclxuXHRcdHRoaXMuc3RhcnQucG9wdXAoKTtcclxuXHRcdC8v55uR5ZCs5byA5aeL5ri45oiP5byA5aeL5oyJ6ZKu5LqL5Lu2LOeCueWHu+WQjui/m+WFpea4uOaIj+S4rVxyXG5cdFx0dGhpcy5zdGFydC5idG5fc3RhcnQub24oRXZlbnQuTU9VU0VfVVAsdGhpcyx0aGlzLmdhbWVJbml0KVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOa4uOaIj+S4re+8jOa4uOaIj+WIneWni+WMllxyXG5cdFx0Ki9cclxuXHRwcml2YXRlIGdhbWVJbml0KCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v57yT5Yqo5Yqo55S75YWz6Zet5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHR0aGlzLnN0YXJ0LmNsb3NlKCk7XHJcblx0XHRcclxuXHRcdC8v6YeN572u5YWz5Y2h5pWw5o2uXHJcblx0XHQvL+a4uOaIj+WFs+WNoeaVsFxyXG5cdFx0TWFpbi5sZXZlbCA9IDE7XHJcblx0XHQvL+eOqeWutuW+l+WIhlxyXG5cdFx0TWFpbi5zY29yZSA9IDA7XHJcblx0XHQvL+aVjOS6uuWIt+aWsOWKoOmAn1xyXG5cdFx0dGhpcy5jcmVhdGVUaW1lID0gMDtcclxuXHRcdC8v5pWM5Lq66YCf5bqm5o+Q5Y2HXHJcblx0XHR0aGlzLnNwZWVkVXAgPSAwO1xyXG5cdFx0Ly/mlYzkurrooYDph4/mj5DljYdcdFxyXG5cdFx0dGhpcy5ocFVwID0gMDtcclxuXHRcdC8v5pWM5Lq65pWw6YeP5o+Q5Y2HXHRcdFx0XHRcclxuXHRcdHRoaXMubnVtVXAgPSAwO1xyXG5cdFx0Ly/ljYfnuqfnrYnnuqfmiYDpnIDnmoTmiJDnu6nmlbDph49cclxuXHRcdHRoaXMubGV2ZWxVcFNjb3JlID0gMTA7XHRcdFx0XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5Zyw5Zu+6IOM5pmv6aG16Z2iKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMubWFwID09IG51bGwpXHJcblx0XHRcdHRoaXMubWFwID0gbmV3IEdhbWVNYXAoKTtcclxuXHRcdC8v5Yqg6L295Yiw6Iie5Y+wXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMubWFwKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbop5LoibLlsYLlubbliqDovb3liLDoiJ7lj7Ao5aaC5p6c5bey5a6e5L6L5YyW77yM5LiN6ZyA6KaB6YeN5pawbmV3KVxyXG5cdFx0aWYodGhpcy5yb2xlTGF5ZXIgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5yb2xlTGF5ZXIgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuXHRcdExheWEuc3RhZ2UuYWRkQ2hpbGQodGhpcy5yb2xlTGF5ZXIpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMlua4uOaIj+S4rVVJ6aG16Z2iKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMucGxheSA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLnBsYXkgPSBuZXcgR2FtZVBsYXkoKTtcclxuXHRcdC8v5Yqg6L295Yiw6Iie5Y+wXHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMucGxheSk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5Li76KeSKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMuaGVybyA9PSBudWxsKVxyXG5cdFx0dGhpcy5oZXJvID0gbmV3IEhlcm8oKTtcclxuXHRcdC8v5Yid5aeL5YyW6KeS6Imy57G75Z6L44CB6KGA6YeP77yM5rOo77ya6YCf5bqmc3BlZWTkuLow77yM5Zug5Li65Li76KeS5piv6YCa6L+H5pON5o6n5pS55Y+Y5L2N572uLOmYteiQpeS4ujBcclxuXHRcdHRoaXMuaGVyby5pbml0KFwiaGVyb1wiLDEwLDAsMzAsMCk7XHJcblx0XHQvL+atu+S6oeWQjuS8mumakOiXj++8jOmHjeaWsOW8gOWni+WQjumcgOaYvuekulxyXG5cdFx0dGhpcy5oZXJvLnZpc2libGU9dHJ1ZTtcclxuXHRcdC8v5Li76KeS5L2N572u5L+u5pS5XHJcblx0XHR0aGlzLmhlcm8ucG9zKDM2MCw4MDApO1xyXG5cdFx0Ly/op5LoibLliqDovb3liLDop5LoibLlsYLkuK1cclxuXHRcdHRoaXMucm9sZUxheWVyLmFkZENoaWxkKHRoaXMuaGVybyk7XHJcblx0XHRcclxuXHRcdC8v6byg5qCH5oyJ5LiL55uR5ZCsXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uTW91c2VEb3duKTtcclxuXHRcdC8v6byg5qCH5oqs6LW355uR5ZCsXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5vbk1vdXNlVXApO1xyXG5cdFx0Ly/muLjmiI/kuLvlvqrnjq9cclxuXHRcdExheWEudGltZXIuZnJhbWVMb29wKDEsdGhpcyx0aGlzLmxvb3ApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0IOeCueWHu+W8gOWni+inpuWPkeenu+WKqFxyXG5cdFx0Ki9cdFxyXG5cdHByaXZhdGUgb25Nb3VzZURvd24oKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/orrDlvZXpvKDmoIfmjInkuIvml7bnmoTkvY3nva7vvIznlKjkuo7orqHnrpfpvKDmoIfnp7vliqjph49cclxuXHRcdHRoaXMubW92ZVg9TGF5YS5zdGFnZS5tb3VzZVg7XHJcblx0XHR0aGlzLm1vdmVZPUxheWEuc3RhZ2UubW91c2VZO1xyXG5cdFx0Ly9cclxuXHRcdExheWEuc3RhZ2Uub24oRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpO1xyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQg5Li76KeS6Lef6ZqP6byg5qCH56e75YqoXHJcblx0XHQqL1x0XHJcblx0cHJpdmF0ZSBvbk1vdXNlTW92ZSgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+iuoeeul+inkuiJsuenu+WKqOmHj1xyXG5cdFx0bGV0IHh4Om51bWJlcj10aGlzLm1vdmVYLUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0bGV0IHl5Om51bWJlcj10aGlzLm1vdmVZLUxheWEuc3RhZ2UubW91c2VZO1xyXG5cdFx0Ly/mm7TmlrDnp7vliqjkvY3nva5cclxuXHRcdHRoaXMuaGVyby54LT14eDtcclxuXHRcdHRoaXMuaGVyby55LT15eTtcclxuXHRcdC8v5pu05paw5pys5bin55qE56e75Yqo5bqn5qCHXHJcblx0XHR0aGlzLm1vdmVYPUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0dGhpcy5tb3ZlWT1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHR9XHJcblx0LyoqXHJcblx0IOm8oOagh+aKrOi1t+OAgeWFs+mXreenu+WKqOebkeWQrFxyXG5cdFx0Ki9cdFx0XHJcblx0cHJpdmF0ZSBvbk1vdXNlVXAoKTp2b2lkXHJcblx0e1xyXG5cdFx0TGF5YS5zdGFnZS5vZmYoRXZlbnQuTU9VU0VfTU9WRSx0aGlzLHRoaXMub25Nb3VzZU1vdmUpIDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDmuLjmiI/kuLvlvqrnjq9cclxuXHRcdCovXHJcblx0cHJpdmF0ZSBsb29wKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v5pys5bGA5ri45oiP5pWw5o2u5pu05pawXHJcblx0XHR0aGlzLnBsYXkudXBkYXRlKHRoaXMuaGVyby5ocCxNYWluLmxldmVsLE1haW4uc2NvcmUpXHJcblx0XHQvL+WmguaenOS4u+inkuatu+S6oVxyXG5cdFx0aWYodGhpcy5oZXJvLmhwPD0wKVxyXG5cdFx0e1xyXG5cdFx0XHQvL+eOqeWutumjnuacuuatu+S6oeWQjuW7tui/n+aXtumXtO+8jDEwMOW4p+WQjuW8ueWHuua4uOaIj+e7k+adn+eVjOmdolxyXG5cdFx0XHR0aGlzLmRlYXRoVGltZSsrXHJcblx0XHRcdGlmICh0aGlzLmRlYXRoVGltZT49MTAwKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0dGhpcy5kZWF0aFRpbWU9MDtcclxuXHRcdFx0XHQvL+a4uOaIj+e7k+adn1xyXG5cdFx0XHRcdHRoaXMuZ2FtZU92ZXIoKTtcclxuXHRcdFx0XHQvL+acrOaWueazleWGheWQjue7remAu+i+keS4jeaJp+ihjFxyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0ZWxzZS8v5Li76KeS5pyq5q275LqhXHJcblx0XHR7XHJcblx0XHRcdC8v5Li76KeS5bCE5Ye7XHJcblx0XHRcdHRoaXMuaGVyby5zaG9vdCgpO1xyXG5cdFx0XHQvL+a4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0XHR0aGlzLmxldmVsVXAoKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Ly/lnLDlm77mu5rliqjmm7TmlrBcclxuXHRcdHRoaXMubWFwLnVwZGF0ZU1hcCgpXHJcblx0XHQvL+a4uOaIj+eisOaSnumAu+i+kVxyXG5cdFx0dGhpcy5jaGVja0NvbGxlY3QoKTtcclxuXHRcdC8v5pWM5pa56aOe5py655Sf5oiQ6YC76L6RXHJcblx0XHR0aGlzLmxvb3BDcmVhdGVFbmVteSgpO1xyXG5cdH1cclxuXHJcblx0Ly/muLjmiI/norDmkp7pgLvovpFcclxuXHRwcml2YXRlIGNoZWNrQ29sbGVjdCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+mBjeWOhuaJgOaciemjnuacuu+8jOabtOaUuemjnuacuueKtuaAgVxyXG5cdFx0Zm9yICh2YXIgaTogbnVtYmVyID0gdGhpcy5yb2xlTGF5ZXIubnVtQ2hpbGRyZW4gLSAxOyBpID4gLTE7IGktLSkgXHJcblx0XHR7XHJcblx0XHRcdC8v6I635Y+W56ys5LiA5Liq6KeS6ImyXHJcblx0XHRcdHZhciByb2xlOlJvbGUgPSB0aGlzLnJvbGVMYXllci5nZXRDaGlsZEF0KGkpIGFzIFJvbGU7XHJcblx0XHRcdC8v6KeS6Imy6Ieq6Lqr5pu05pawXHJcblx0XHRcdHJvbGUudXBkYXRlKCk7XHRcdFx0XHRcclxuXHRcdFx0Ly/lpoLmnpzop5LoibLmrbvkuqHvvIzkuIvkuIDlvqrnjq9cclxuXHRcdFx0aWYocm9sZS5ocDw9MCkgY29udGludWU7XHJcblx0XHRcdC8v56Kw5pKe5qOA5rWLXHJcblx0XHRcdGZvcih2YXIgajpudW1iZXI9aS0xO2o+LTE7ai0tKVxyXG5cdFx0XHR7XHQvL+iOt+WPluesrOS6jOS4quinkuiJslxyXG5cdFx0XHRcdHZhciByb2xlMTpSb2xlPXRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaikgYXMgUm9sZTtcclxuXHRcdFx0XHQvL+WmguaenHJvbGUx5pyq5q275Lqh5LiU5LiN5ZCM6Zi16JClXHJcblx0XHRcdFx0aWYocm9sZTEuaHA+MCYmcm9sZTEuY2FtcCE9cm9sZS5jYW1wKVxyXG5cdFx0XHRcdHtcclxuXHRcdFx0XHRcdC8v6I635Y+W56Kw5pKe5Y2K5b6EXHJcblx0XHRcdFx0XHR2YXIgaGl0UmFkaXVzOm51bWJlcj1yb2xlLmhpdFJhZGl1cytyb2xlMS5oaXRSYWRpdXM7XHJcblx0XHRcdFx0XHQvL+eisOaSnuajgOa1i1xyXG5cdFx0XHRcdFx0aWYoTWF0aC5hYnMocm9sZS54LXJvbGUxLngpPGhpdFJhZGl1cyYmTWF0aC5hYnMocm9sZS55LXJvbGUxLnkpPGhpdFJhZGl1cylcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Ly/lpoLmnpzmn5DkuIDkuKrnorDmkp7kvZPmmK/pgZPlhbfvvIzliJnlkIPpgZPlhbfvvIzlkKbliJnmjonooYBcclxuXHRcdFx0XHRcdFx0aWYocm9sZS5wcm9wVHlwZSE9MHx8cm9sZTEucHJvcFR5cGUhPTApXHJcblx0XHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0XHQvL+aXoOazleWIpOaWreWTquS4quaYr+mBk+WFt++8jOWboOatpOmDveebuOS6kuWQg+ivleivlVxyXG5cdFx0XHRcdFx0XHRcdHJvbGUuZWF0UHJvcChyb2xlMSk7XHJcblx0XHRcdFx0XHRcdFx0cm9sZTEuZWF0UHJvcChyb2xlKTtcclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0XHRcdC8v6KeS6Imy55u45LqS5o6J6KGAXHJcblx0XHRcdFx0XHRcdFx0cm9sZS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdFx0cm9sZTEubG9zdEhwKDEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL+eUn+aIkOaVjOaWuemjnuaculxyXG5cdHByaXZhdGUgbG9vcENyZWF0ZUVuZW15KCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v5Yib5bu65pWM5py677yM5Yqg5YWl5YWz5Y2h5Y2H57qn5pWw5o2u77yM5o+Q6auY6Zq+5bqmXHJcblx0XHQvL+eUn+aIkOWwj+mjnuaculxyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDgwIC0gdGhpcy5jcmVhdGVUaW1lKSA9PTApXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMCwgdGhpcy5ocHNbMF0sdGhpcy5zcGVlZHNbMF0gKyB0aGlzLnNwZWVkVXAgLCB0aGlzLm51bXNbMF0gKyB0aGlzLm51bVVwKTtcclxuXHRcdH1cclxuXHRcdC8v55Sf5oiQ5Lit5Z6L6aOe5py6XHJcblx0XHRpZiAoTGF5YS50aW1lci5jdXJyRnJhbWUgJSAoMTcwIC0gdGhpcy5jcmVhdGVUaW1lICogMikgPT0gMCkgXHJcblx0XHR7XHJcblx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMSwgdGhpcy5ocHNbMV0gK3RoaXMuaHBVcCAqIDIsdGhpcy5zcGVlZHNbMV0gKyB0aGlzLnNwZWVkVXAgLCB0aGlzLm51bXNbMV0gKyB0aGlzLm51bVVwKTtcclxuXHRcdH1cclxuXHRcdC8v55Sf5oiQYm9zc1xyXG5cdFx0aWYgKExheWEudGltZXIuY3VyckZyYW1lICUgKDEwMDAgLSB0aGlzLmNyZWF0ZVRpbWUgKiAzKSA9PSAwKSBcclxuXHRcdHtcclxuXHRcdFx0dGhpcy5jcmVhdGVFbmVteSgyLCB0aGlzLmhwc1syXSArIHRoaXMuaHBVcCAqIDYsdGhpcy5zcGVlZHNbMl0sIHRoaXMubnVtc1syXSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQg5ri45oiP5Y2H57qn6K6h566XXHJcblx0XHQqL1xyXG5cdHByaXZhdGUgbGV2ZWxVcCgpOnZvaWRcclxuXHR7XHJcblx0XHRpZihNYWluLnNjb3JlPnRoaXMubGV2ZWxVcFNjb3JlKVxyXG5cdFx0e1xyXG5cdFx0XHQvL+WFs+WNoeetiee6p+aPkOWNh1xyXG5cdFx0XHRNYWluLmxldmVsKys7XHJcblx0XHRcdC8v6KeS6Imy6KGA6YeP5aKe5Yqg77yM5pyA5aSnMzBcclxuXHRcdFx0dGhpcy5oZXJvLmhwPU1hdGgubWluKHRoaXMuaGVyby5ocCtNYWluLmxldmVsKjEsMzApO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOWIm+W7uuaVjOacuumXtOmalOi2iuefrVxyXG5cdFx0XHR0aGlzLmNyZWF0ZVRpbWUgPSBNYWluLmxldmVsIDwgMzAgPyBNYWluLmxldmVsICogMiA6IDYwO1xyXG5cdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuumjnuihjOmAn+W6pui2iumrmFxyXG5cdFx0XHR0aGlzLnNwZWVkVXAgPSBNYXRoLmZsb29yKE1haW4ubGV2ZWwgLyA2KTtcclxuXHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrooYDph4/otorpq5hcclxuXHRcdFx0dGhpcy5ocFVwID0gTWF0aC5mbG9vcihNYWluLmxldmVsIC8gOCk7XHJcblx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py65pWw6YeP6LaK5aSaXHJcblx0XHRcdHRoaXMubnVtVXAgPSBNYXRoLmZsb29yKE1haW4ubGV2ZWwgLyAxMCk7XHJcblx0XHRcdC8v5o+Q6auY5LiL5LiA57qn55qE5Y2H57qn5YiG5pWwXHJcblx0XHRcdHRoaXMubGV2ZWxVcFNjb3JlICs9IE1haW4ubGV2ZWwgKiAxMDtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0ICogIOWIm+W7uuaVjOS6ulxyXG5cdCAqIEBwYXJhbSBpbmRleCBcdOaVjOS6uue8luWPt1xyXG5cdCAqIEBwYXJhbSBocCAgIFx0XHQg5pWM5Lq66KGA6YePXHJcblx0ICogQHBhcmFtIHNwZWVkXHRcdOaVjOS6uumAn+W6plxyXG5cdCAqIEBwYXJhbSBudW1cdFx05pWM5Lq65pWw6YePXHJcblx0ICovXHJcblx0cHJpdmF0ZSBjcmVhdGVFbmVteShpbmRleDpudW1iZXIsaHA6bnVtYmVyLHNwZWVkOm51bWJlcixudW06bnVtYmVyKTp2b2lkIFxyXG5cdHtcclxuXHRcdGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBudW07IGkrKylcclxuXHRcdHtcclxuXHRcdFx0Ly/liJvlu7rmlYzkurrvvIzku47lr7nosaHmsaDliJvlu7pcclxuXHRcdFx0bGV0IGVuZW15OkVuZW15ID0gTGF5YS5Qb29sLmdldEl0ZW1CeUNsYXNzKFwiRW5lbXlcIiwgRW5lbXkpO1xyXG5cdFx0XHQvL+WIneWni+WMluaVjOS6ulxyXG5cdFx0XHRlbmVteS5pbml0KFwiZW5lbXlcIiArIChpbmRleCsxKSwgaHAsIHNwZWVkLHRoaXMucmFkaXVzW2luZGV4XSwxKTtcclxuXHRcdFx0Ly/ku47lr7nosaHmsaDkuK3liJvlu7rnmoTlr7nosaHmrbvkuqHliY3ooqvpmpDol4/kuobvvIzlm6DmraTopoHph43mlrDliJ3lp4vljJbmmL7npLrvvIzlkKbliJnmlrDliJvlu7rop5LoibLkuI3kvJrmmL7npLrlh7rmnaVcclxuXHRcdFx0ZW5lbXkudmlzaWJsZT10cnVlO1xyXG5cdFx0XHQvL+maj+acuuS9jee9rlxyXG5cdFx0XHRlbmVteS5wb3MoTWF0aC5yYW5kb20oKSAqKDcyMC04MCkrNTAsIC1NYXRoLnJhbmRvbSgpICogMTAwKTtcclxuXHRcdFx0Ly/mt7vliqDliLDoiJ7lj7DkuIpcclxuXHRcdFx0dGhpcy5yb2xlTGF5ZXIuYWRkQ2hpbGQoZW5lbXkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQg5ri45oiP57uT5p2fXHJcblx0XHQqL1xyXG5cdHByaXZhdGUgZ2FtZU92ZXIoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/np7vpmaTmiYDmnInoiJ7lj7Dkuovku7bvvIzpvKDmoIfmk43mjqdcclxuXHRcdExheWEuc3RhZ2Uub2ZmQWxsKCk7XHJcblx0XHQvL+enu+mZpOWcsOWbvuiDjOaZr1xyXG5cdFx0dGhpcy5tYXAucmVtb3ZlU2VsZigpO1xyXG5cdFx0Ly/np7vpmaTmuLjmiI/kuK1VSVxyXG5cdFx0dGhpcy5wbGF5LnJlbW92ZVNlbGYoKTtcclxuXHRcdFxyXG5cdFx0Ly/muIXnqbrop5LoibLlsYLlrZDlr7nosaFcclxuXHRcdHRoaXMucm9sZUxheWVyLnJlbW92ZUNoaWxkcmVuKDAsdGhpcy5yb2xlTGF5ZXIubnVtQ2hpbGRyZW4tMSk7XHJcblx0XHQvL+enu+mZpOinkuiJsuWxglxyXG5cdFx0dGhpcy5yb2xlTGF5ZXIucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHJcblx0XHQvL+WOu+mZpOa4uOaIj+S4u+W+queOr1xyXG5cdFx0TGF5YS50aW1lci5jbGVhcih0aGlzLHRoaXMubG9vcCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW5ri45oiP57uT5p2f6aG16Z2iXHJcblx0XHRpZih0aGlzLm92ZXIgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5vdmVyID0gbmV3IEdhbWVPdmVyKCk7XHJcblx0XHQvL+a4uOaIj+enr+WIhuaYvuekulxyXG5cdFx0dGhpcy5vdmVyLnR4dF9zY29yZS50ZXh0PU1haW4uc2NvcmUudG9TdHJpbmcoKTtcclxuXHRcdC8v5Lul5by55Ye65pa55byP5omT5byA77yM5pyJ57yT5Yqo5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHR0aGlzLm92ZXIucG9wdXAoKTtcclxuXHRcdC8v6YeN5paw5byA5aeL5LqL5Lu255uR5ZCsLOeCueWHu+WQjui/m+WFpea4uOaIj+S4rVxyXG5cdFx0dGhpcy5vdmVyLm9uKFwicmVTdGFydFwiLHRoaXMsdGhpcy5nYW1lSW5pdCk7XHJcblx0fVxyXG59XHJcblxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQnVsbGV0IGV4dGVuZHMgUm9sZVxyXG57XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5aSx6KGAXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgbG9zdEhwKGxvc3RIcDpudW1iZXIpOnZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgLy/pmpDol4/vvIzkuIvkuIDluKflm57mlLZcclxuICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6KeS6Imy5q275Lqh5bm25Zue5pS25Yiw5a+56LGh5rGgKiovXHJcbiAgICBwdWJsaWMgZGllKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLmRpZSgpO1xyXG4gICAgICAgIC8v5Zue5pS25Yiw5a+56LGh5rGgXHJcbiAgICAgICAgTGF5YS5Qb29sLnJlY292ZXIoXCJCdWxsZXRcIiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICAgICAgICAgXHJcbn0iLCJpbXBvcnQgUm9sZSBmcm9tIFwiLi9Sb2xlXCI7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuLi9NYWluXCI7XHJcbmltcG9ydCB1Zm8gZnJvbSBcIi4vdWZvXCI7XHJcblxyXG4vL+inkuiJslxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbmVteSBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgIC8qKlxyXG4gICAgICog6KeS6Imy5aSx6KGAXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgbG9zdEhwKGxvc3RIcDpudW1iZXIpOnZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgLy/lh4/ooYBcclxuICAgICAgICB0aGlzLmhwIC09IGxvc3RIcDtcclxuICAgICAgICAvL+agueaNruihgOmHj+WIpOaWrVxyXG4gICAgICAgIGlmICh0aGlzLmhwID4gMCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+WmguaenOacquatu+S6oe+8jOWImeaSreaUvuWPl+WHu+WKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJoaXRcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+a3u+WKoOatu+S6oeWKqOeUu1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJkaWVcIik7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh6Z+z5pWIXHJcbiAgICAgICAgICAgIC8vIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2dhbWVfb3Zlci5tcDNcIik7XHJcbiAgICAgICAgICAgIE1haW4uc2NvcmUrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqKuWKqOeUu+WujOaIkOWQjuWbnuiwg+aWueazlSoqKi9cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHN1cGVyLm9uQ29tcGxldGUoKTtcclxuXHJcbiAgICAgICAgLy/lpoLmnpzmrbvkuqHliqjnlLvmkq3mlL7lrozmiJBcclxuICAgICAgICBpZih0aGlzLmFjdGlvbj09XCJkaWVcIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vdXBkYXRlKCnmlrnms5XkuK3vvIzpmpDol4/lkI7ov5vooYzlm57mlLZcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmxvc3RQcm9wKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodGhpcy5hY3Rpb249PVwiaGl0XCIpLy/lpoLmnpzmmK/lj5fkvKTliqjnlLvvvIzkuIvkuIDluKfmkq3mlL7po57ooYzliqjnlLtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImZseVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgICAgICAgICAvKirop5LoibLmrbvkuqHmjonokL3nianlk4EqKi9cclxuICAgIHByaXZhdGUgbG9zdFByb3AoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgaWYodGhpcy50eXBlIT1cImVuZW15M1wiKSByZXR1cm47XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ku47lr7nosaHmsaDph4zpnaLliJvlu7rkuIDkuKrpgZPlhbdcclxuICAgICAgICBsZXQgcHJvcDp1Zm8gPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJ1Zm9cIix1Zm8pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v55Sf5oiQ6ZqP5py66YGT5YW357G75Z6LXHJcbiAgICAgICAgbGV0IHI6TnVtYmVyPU1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgbGV0IG51bTpudW1iZXI9KHI8MC43KT8xOjI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/ph43mlrDliJ3lp4vljJbpgZPlhbflsZ7mgKcs6Zi16JCl5Li65pWM5pa577yI5Y+q5LiO5Li76KeS5Y+R55Sf56Kw5pKe77yJXHJcbiAgICAgICAgcHJvcC5pbml0KFwidWZvXCIrbnVtLDEsMiwzMCwxKTtcclxuICAgICAgICAvL+mBk+WFt+exu+Wei1xyXG4gICAgICAgIHByb3AucHJvcFR5cGU9bnVtO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5by65Yi25pi+56S6XHJcbiAgICAgICAgcHJvcC52aXNpYmxlPXRydWU7XHJcbiAgICAgICAgLy/nlJ/miJDnmoTkvY3nva7kuLrmrbvkuqHogIXkvY3nva5cclxuICAgICAgICBwcm9wLnBvcyh0aGlzLngsdGhpcy55KTtcclxuICAgICAgICAvL+WKoOi9veWIsOeItuWuueWZqCBcclxuICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChwcm9wKTtcclxuICAgIH1cclxuXHJcbiAgICAvKirop5LoibLmrbvkuqHlubblm57mlLbliLDlr7nosaHmsaAqKi9cclxuICAgIHB1YmxpYyBkaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgc3VwZXIuZGllKCk7XHJcbiAgICAgICAgLy/lm57mlLbliLDlr7nosaHmsaBcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcIkVuZW15XCIsIHRoaXMpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IFJvbGUgZnJvbSBcIi4vUm9sZVwiO1xyXG5pbXBvcnQgTWFpbiBmcm9tIFwiLi4vTWFpblwiO1xyXG5pbXBvcnQgQnVsbGV0IGZyb20gXCIuL0J1bGxldFwiO1xyXG5cclxuLy/op5LoibJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgXHJcbiAgICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImhpdFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImRpZVwiKTtcclxuICAgICAgICAgICAgLy/mt7vliqDmrbvkuqHpn7PmlYhcclxuICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZ2FtZV9vdmVyLm1wM1wiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgICAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzosIPnlKjogIXmmK/kuLvop5LmiJZwcm9w5LiN5piv6YGT5YW377yM5YiZ6L+U5ZueXHJcbiAgICAgICAgaWYocHJvcC5wcm9wVHlwZT09MCkgcmV0dXJuO1xyXG4gICAgICAgIC8v5re75Yqg5ZCD5by65YyW6YGT5YW36Z+z5pWIXHRcdFx0XHRcdFxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiKTtcclxuICAgICAgICAvL+WQg+WtkOW8ueeusVxyXG4gICAgICAgIGlmKHByb3AucHJvcFR5cGU9PTEpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/np6/liIblop7liqBcclxuICAgICAgICAgICAgTWFpbi5zY29yZSsrO1xyXG4gICAgICAgICAgICAvL+WtkOW8uee6p+WIq+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldExldmVsKytcclxuICAgICAgICAgICAgLy/lrZDlvLnmr4/ljYcy57qn77yM5a2Q5by55pWw6YeP5aKe5YqgMe+8jOacgOWkp+aVsOmHj+mZkOWItuWcqDTkuKpcclxuICAgICAgICAgICAgdGhpcy5zaG9vdE51bSA9IE1hdGgubWluKE1hdGguZmxvb3IodGhpcy5idWxsZXRMZXZlbCAvIDIpICsgMSw0KTtcclxuICAgICAgICAgICAgLy/lrZDlvLnnuqfliKvotorpq5jvvIzlj5HlsITpopHnjofotorlv6tcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gMzAwIC0gOCAqICh0aGlzLmJ1bGxldExldmVsID4gOCA/IDggOiB0aGlzLmJ1bGxldExldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwcm9wLnByb3BUeXBlPT0yKS8v5ZCD6KGAXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+ihgOmHj+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmhwKz0yO1xyXG4gICAgICAgICAgICAvL+enr+WIhuWinuWKoFxyXG4gICAgICAgICAgICBNYWluLnNjb3JlKz0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mBk+WFt+atu+S6oVxyXG4gICAgICAgIHByb3AuaHA9MDtcclxuICAgICAgICAvL+mBk+WFt+WQg+WujOWQjua2iOWkse+8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHByb3AudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPSBMYXlhLkJyb3dzZXIubm93KCkgO1xyXG4gICAgICAgIC8v5aaC5p6c5b2T5YmN5pe26Ze05aSn5LqO5LiL5qyh5bCE5Ye75pe26Ze0XHJcbiAgICAgICAgaWYgKHRpbWUgPnRoaXMuc2hvb3RUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ojrflvpflj5HlsITlrZDlvLnnmoTkvY3nva7mlbDnu4RcclxuICAgICAgICAgICAgbGV0IHBvczpudW1iZXJbXSA9IHRoaXMuYnVsbGV0UG9zW3RoaXMuc2hvb3ROdW0tMV1cclxuICAgICAgICAgICAgZm9yKGxldCBpOm51bWJlciA9IDAgOyBpPHBvcy5sZW5ndGggOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5pu05paw5LiL5qyh5a2Q5by55bCE5Ye755qE5pe26Ze0XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob290VGltZSA9IHRpbWUgKyB0aGlzLnNob290SW50ZXJ2YWwgOyBcclxuICAgICAgICAgICAgICAgIC8v5LuO5a+56LGh5rGg6YeM6Z2i5Yib5bu65LiA5Liq5a2Q5by5XHJcbiAgICAgICAgICAgICAgICBsZXQgYnVsbGV0OiBCdWxsZXQgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJCdWxsZXRcIixCdWxsZXQpIGFzIEJ1bGxldDtcclxuICAgICAgICAgICAgICAgIC8v5Yid5aeL5YyW5a2Q5by55L+h5oGvXHJcbiAgICAgICAgICAgICAgICBidWxsZXQuaW5pdChcImJ1bGxldDJcIiwxLC0xMCwxLHRoaXMuY2FtcClcclxuICAgICAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54K3Bvc1tpXSwgdGhpcy55LTgwKTtcclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5Yiw6KeS6Imy5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgLy/mt7vliqDlrZDlvLnpn7PmlYhcdFx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICAvL0xheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2J1bGxldC5tcDNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IEFuaW1hdGlvbiA9IExheWEuQW5pbWF0aW9uO1xyXG5pbXBvcnQgRXZlbnQgPSBsYXlhLmV2ZW50cy5FdmVudDtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGUgZXh0ZW5kcyBMYXlhLlNwcml0ZVxyXG57XHJcblx0LyoqKumjnuacuueahOexu+WeiyAgIOKAnGhlcm/igJ06546p5a626aOe5py677yM4oCcZW5lbXnigJ3vvJrmlYzkurrpo57mnLrjgIHigJxidWxsZeKAne+8muWtkOW8ueOAgVwidWZvXCI66YGT5YW3KioqKi9cclxuICAgIHB1YmxpYyB0eXBlOlN0cmluZztcclxuICAgIC8qKirpo57mnLrnmoTooYDph48qKiovXHJcbiAgICBwdWJsaWMgaHA6bnVtYmVyPTA7IFxyXG4gICAgLyoqKumjnuacuueahOmAn+W6pioqKi9cclxuICAgIHByb3RlY3RlZCBzcGVlZDpudW1iZXI9MDtcdFxyXG4gICAgXHJcbiAgICAvKioq6aOe5py655qE6KKr5pS75Ye75Y2K5b6EKioqL1xyXG4gICAgcHVibGljIGhpdFJhZGl1czpudW1iZXI7XHJcbiAgICAvKioq6aOe5py655qE6Zi16JCl77yI5pWM5oiR5Yy65Yir77yJKioqL1xyXG4gICAgcHVibGljIGNhbXA6bnVtYmVyO1xyXG4gICAgXHJcbiAgICAvKioq6KeS6Imy55qE5Yqo55S76LWE5rqQKioqL1xyXG4gICAgcHJvdGVjdGVkIHJvbGVBbmk6QW5pbWF0aW9uO1xyXG4gICAgLyoqKuW9k+WJjeWKqOeUu+WKqOS9nCoqKi9cclxuICAgIHByb3RlY3RlZCBhY3Rpb246U3RyaW5nO1xyXG4gICAgXHJcbiAgICAvKioq5bCE5Ye76Ze06ZqUKioqL1xyXG4gICAgcHVibGljIHNob290SW50ZXJ2YWw6IG51bWJlcj0gMzAwO1xyXG4gICAgLyoqKuS4i+asoeWwhOWHu+aXtumXtCoqKi9cclxuICAgIHB1YmxpYyBzaG9vdFRpbWU6IG51bWJlcj0gMzAwO1xyXG4gICAgXHJcbiAgICAvKioqKumBk+WFt+exu+WeiyAwOumjnuacuuaIluWtkOW8ue+8jDE65a2Q5by5566x77yMMjrooYDnk7YqKiovXHJcbiAgICBwdWJsaWMgcHJvcFR5cGU6bnVtYmVyPTA7XHJcbiAgICAvKioq5a2Q5by557qn5Yir77yI5ZCD5a2Q5by56YGT5YW35ZCO5Y2H57qn77yJKioqL1xyXG4gICAgcHVibGljIGJ1bGxldExldmVsOiBudW1iZXIgPSAwO1xyXG4gICAgLyoqKuWQjOaXtuWwhOWHu+WtkOW8ueaVsOmHjyoqKi9cclxuICAgIHB1YmxpYyBzaG9vdE51bTogbnVtYmVyPSAxO1xyXG4gICAgLyoqKuWtkOW8ueWBj+enu+eahOS9jee9rioqKi9cclxuICAgIHByb3RlY3RlZCBidWxsZXRQb3M6IG51bWJlcltdW10gPSBbWzBdLCBbLTE1LCAxNV0sIFstMzAsIDAsIDMwXSwgWy00NSwgLTE1LCAxNSwgNDVdXTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgLy/lrp7kvovljJbliqjnlLtcclxuICAgICAgICAgdGhpcy5yb2xlQW5pPW5ldyBBbmltYXRpb24oKTtcclxuICAgICAgICAgLy/liqDovb1JREXnvJbovpHnmoTliqjnlLvmlofku7ZcclxuICAgICAgICAgdGhpcy5yb2xlQW5pLmxvYWRBbmltYXRpb24oXCJHYW1lUm9sZS5hbmlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLliJ3lp4vljJZcclxuICAgICAqIEBwYXJhbSB0eXBlICDop5LoibLnsbvlnosgLS0t4oCcaGVyb+KAnTrnjqnlrrbpo57mnLrvvIzigJxlbmVteTEtM+KAne+8muaVjOS6uumjnuacuuOAgeKAnGJ1bGxlOjEtMuKAne+8muWtkOW8ueOAgVwidWZvMS0yXCI66YGT5YW3XHJcbiAgICAgKiBAcGFyYW0gaHAgICAgICDooYDph49cclxuICAgICAqIEBwYXJhbSBzcGVlZCAgIOmAn+W6plxyXG4gICAgICogQHBhcmFtIGhpdFJhZGl1cyAgIOeisOaSnuWNiuW+hFxyXG4gICAgICogQHBhcmFtIGNhbXAgICAg6Zi16JClXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgaW5pdCh0eXBlOlN0cmluZyxocDpudW1iZXIsc3BlZWQ6bnVtYmVyLGhpdFJhZGl1czpudW1iZXIsY2FtcDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+inkuiJsuWIneWni+WMluWxnuaAp1xyXG4gICAgICAgIHRoaXMudHlwZT10eXBlO1xyXG4gICAgICAgIHRoaXMuaHA9aHA7XHJcbiAgICAgICAgdGhpcy5zcGVlZD1zcGVlZDtcclxuICAgICAgICB0aGlzLmhpdFJhZGl1cz1oaXRSYWRpdXM7XHJcbiAgICAgICAgdGhpcy5jYW1wPWNhbXA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/pgZPlhbflsZ7mgKfliJ3lp4vkuLowXHJcbiAgICAgICAgdGhpcy5wcm9wVHlwZT0wO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Yqg6L295Yqo55S75a+56LGhXHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnJvbGVBbmkpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nm5HlkKzliqjnlLvlrozmiJDkuovku7ZcclxuICAgICAgICB0aGlzLnJvbGVBbmkub24oRXZlbnQuQ09NUExFVEUsdGhpcyx0aGlzLm9uQ29tcGxldGUpXHJcbiAgICAgICAgLy/mkq3mlL7pu5jorqTpo57ooYzliqjnlLtcclxuICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJmbHlcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKirliqjnlLvlrozmiJDlkI7lm57osIPmlrnms5UqKiovXHJcbiAgICBwdWJsaWMgb25Db21wbGV0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WmguaenOinkuiJsui/mOacquacieWuve+8jOiOt+W+l+inkuiJsuWuvemrmFx0XHJcbiAgICAgICAgaWYodGhpcy5yb2xlQW5pLndpZHRoPT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/ojrflvpfliqjnlLvnn6nlvaLovrnnlYxcclxuICAgICAgICAgICAgdmFyIGJvdW5kczpMYXlhLlJlY3RhbmdsZT10aGlzLnJvbGVBbmkuZ2V0Qm91bmRzKCk7XHJcbiAgICAgICAgICAgIC8v6KeS6ImyIOWuvemrmOi1i+WAvFxyXG4gICAgICAgICAgICB0aGlzLnJvbGVBbmkuc2l6ZShib3VuZHMud2lkdGgsYm91bmRzLmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5aSx6KGAXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgbG9zdEhwKGxvc3RIcDpudW1iZXIpOnZvaWQgXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5ZCD5Yiw6YGT5YW377yM5Yqg6KGA5oiW5a2Q5by557qn5YirXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgZWF0UHJvcChwcm9wOlJvbGUpOnZvaWRcclxuICAgIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvuWKqOeUuyBcclxuICAgICAqIEBwYXJhbSBhY3Rpb24g5Yqo55S754q25oCBICAgXCJmbHlcIuOAgVwiaGl0XCLjgIFcImRpZVwiXHJcbiAgICAgKi9cdFxyXG4gICAgcHVibGljIHBsYXlBY3Rpb24oYWN0aW9uOlN0cmluZyk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMuYWN0aW9uPWFjdGlvbjtcclxuICAgICAgICAvL+aSreaUvuinkuiJsuWKqOeUuyxuYW1lPeinkuiJsuexu+Wei1/liqjnlLvnirbmgIHvvIzlpoLvvJpoZXJvX2ZseVxyXG4gICAgICAgIHRoaXMucm9sZUFuaS5wbGF5KDAsdHJ1ZSx0aGlzLnR5cGUrXCJfXCIrYWN0aW9uKTtcclxuICAgIH0gXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICog6KeS6Imy5pu05pawLOi+ueeVjOajgOafpVxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIHVwZGF0ZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+WmguaenOinkuiJsumakOiXj++8jOinkuiJsua2iOS6oeW5tuWbnuaUtlxyXG4gICAgICAgIGlmKCF0aGlzLnZpc2libGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+S4u+inkuS4jeatu+S6oeWbnuaUtu+8jOWPqumakOiXj++8jOS7peWFjeWFtuS7luWvueixoeS7peS4u+inkuWbnuWvueixoeWIm+W7uu+8jOWPkeeUn+W8leeUqOS/ruaUuVxyXG4gICAgICAgICAgICBpZih0aGlzLnR5cGUhPVwiaGVyb1wiKSBcdHRoaXMuZGllKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy/op5LoibLmoLnmja7pgJ/luqbpo57ooYxcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5zcGVlZDtcclxuICAgICAgICBcclxuICAgICAgICAvL+WmguaenOenu+WKqOWIsOaYvuekuuWMuuWfn+S7peWklu+8jOWImeenu+mZpFxyXG4gICAgICAgIGlmICh0aGlzLnR5cGUhPVwiaGVyb1wiJiYodGhpcy55ID4gMTI4MCsxMDB8fHRoaXMueTwtMTUwKSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/kuLvop5LovrnnlYzmo4Dmn6VcclxuICAgICAgICBpZih0aGlzLnR5cGU9PVwiaGVyb1wiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/pnIDlh4/ljrvop5LoibLlrr3miJbpq5jnmoTkuIDljYrvvIzlm6DkuLrlnKhJREXkuK3liLbkvZzliqjnlLvml7bvvIzmiJHku6zmiorop5LoibLnmoTkuK3lv4PlgZrkuLrkuobop5LoibLlr7nosaHnmoTljp/ngrlcclxuICAgICAgICAgICAgLy/liKTmlq3mmK/lkKblt6blj7PotoXlh7pcclxuICAgICAgICAgICAgaWYodGhpcy54PHRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLng9dGhpcy5yb2xlQW5pLndpZHRoLzI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLng+NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLng9NzIwLXRoaXMucm9sZUFuaS53aWR0aC8yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5LiK5LiL6LaF5Ye6XHJcbiAgICAgICAgICAgIGlmKHRoaXMueTx0aGlzLnJvbGVBbmkuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueT10aGlzLnJvbGVBbmkuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLnk+MTI4MC10aGlzLnJvbGVBbmkuaGVpZ2h0LzIpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRoaXMueT0xMjgwLXRoaXMucm9sZUFuaS5oZWlnaHQvMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICDop5LoibLlsITlh7vvvIznlJ/miJDlrZDlvLlcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBzaG9vdCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgIFxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKirop5LoibLmrbvkuqHlubblm57mlLbliLDlr7nosaHmsaAqKi9cclxuICAgIHB1YmxpYyBkaWUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/op5LoibLliqjnlLvlgZzmraJcclxuICAgICAgICB0aGlzLnJvbGVBbmkuc3RvcCgpOyBcclxuICAgICAgICAvL+WOu+mZpOaJgOacieWKqOeUu+ebkeWQrFxyXG4gICAgICAgIHRoaXMucm9sZUFuaS5vZmZBbGwoKTtcclxuICAgICAgICAvL+S7juiInuWPsOenu+mZpFxyXG4gICAgICAgIHRoaXMucmVtb3ZlU2VsZigpO1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCBSb2xlIGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IE1haW4gZnJvbSBcIi4uL01haW5cIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHVmbyBleHRlbmRzIFJvbGVcclxue1xyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWkseihgFxyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGxvc3RIcChsb3N0SHA6bnVtYmVyKTp2b2lkIFxyXG4gICAge1xyXG4gICAgICAgIC8v6ZqQ6JeP77yM5LiL5LiA5bin5Zue5pS2XHJcbiAgICAgICAgdGhpcy52aXNpYmxlPWZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBzdXBlci5kaWUoKTtcclxuICAgICAgICAvL+WbnuaUtuWIsOWvueixoeaxoFxyXG4gICAgICAgIExheWEuUG9vbC5yZWNvdmVyKFwidWZvXCIsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgICAgICAgIFxyXG59IiwiLyoqVGhpcyBjbGFzcyBpcyBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBieSBMYXlhQWlySURFLCBwbGVhc2UgZG8gbm90IG1ha2UgYW55IG1vZGlmaWNhdGlvbnMuICovXG5pbXBvcnQgVmlldz1MYXlhLlZpZXc7XG5pbXBvcnQgRGlhbG9nPUxheWEuRGlhbG9nO1xuaW1wb3J0IFNjZW5lPUxheWEuU2NlbmU7XG5leHBvcnQgbW9kdWxlIHVpIHtcclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lQmdVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJnMTpMYXlhLkltYWdlO1xuXHRcdHB1YmxpYyBiZzI6TGF5YS5JbWFnZTtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiVmlld1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ2YXJcIjpcImJnMVwiLFwic2tpblwiOlwiYmFja2dyb3VuZC5wbmdcIn0sXCJjb21wSWRcIjoyfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6LTEyODAsXCJ4XCI6MCxcInZhclwiOlwiYmcyXCIsXCJza2luXCI6XCJiYWNrZ3JvdW5kLnBuZ1wifSxcImNvbXBJZFwiOjN9XSxcImxvYWRMaXN0XCI6W1wiYmFja2dyb3VuZC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVCZ1VJLnVpVmlldyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVPdmVyVUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIGFuaV9yZXN0YXJ0OkxheWEuRnJhbWVBbmltYXRpb247XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgYnRuX3Jlc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MjI5LFwic2tpblwiOlwiZ2FtZVVJL2dhbWVPdmVyLnBuZ1wifSxcImNvbXBJZFwiOjN9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjEyMDAsXCJ4XCI6MTksXCJ3aWR0aFwiOjY4MSxcInRleHRcIjpcIkxheWFBaXIxLjcuM+W8leaTjuaVmeWtpua8lOekuueJiFwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjI2LFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjV9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjoyNDQsXCJ3aWR0aFwiOjE0NCxcInRleHRcIjpcIuacrOWxgOenr+WIhu+8mlwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzdjNzk3OVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjU3NSxcInhcIjozNjMsXCJ3aWR0aFwiOjEyOCxcInZhclwiOlwidHh0X3Njb3JlXCIsXCJ0ZXh0XCI6XCIxMjAwXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjN2M3OTc5XCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6N30se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjM5LFwidmFyXCI6XCJidG5fcmVzdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjEsXCJ3aWR0aFwiOjI0MCxcInN0YXRlTnVtXCI6MixcInNraW5cIjpcImdhbWVVSS9idG5fYmcucG5nXCIsXCJzaXplR3JpZFwiOlwiMTAsMTAsMTAsMTBcIixcImhlaWdodFwiOjgwfSxcImNvbXBJZFwiOjExfSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTgsXCJ4XCI6NDEsXCJza2luXCI6XCJnYW1lVUkvcmVzdGFydC5wbmdcIn0sXCJjb21wSWRcIjoxMn1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJhbmltYXRpb25zXCI6W3tcIm5vZGVzXCI6W3tcInRhcmdldFwiOjEwLFwia2V5ZnJhbWVzXCI6e1wieVwiOlt7XCJ2YWx1ZVwiOjk3MCxcInR3ZWVuTWV0aG9kXCI6XCJlbGFzdGljT3V0XCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjowfSx7XCJ2YWx1ZVwiOjk2MCxcInR3ZWVuTWV0aG9kXCI6XCJsaW5lYXJOb25lXCIsXCJ0d2VlblwiOnRydWUsXCJ0YXJnZXRcIjoxMCxcImtleVwiOlwieVwiLFwiaW5kZXhcIjo4fV19fV0sXCJuYW1lXCI6XCJhbmlfcmVzdGFydFwiLFwiaWRcIjoxLFwiZnJhbWVSYXRlXCI6MjQsXCJhY3Rpb25cIjowfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9iZy5qcGdcIixcImdhbWVVSS9nYW1lT3Zlci5wbmdcIixcImdhbWVVSS9idG5fYmcucG5nXCIsXCJnYW1lVUkvcmVzdGFydC5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVPdmVyVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVBsYXlVSSBleHRlbmRzIFZpZXcge1xyXG5cdFx0cHVibGljIGJ0bl9wYXVzZTpMYXlhLkJ1dHRvbjtcblx0XHRwdWJsaWMgdHh0X2hwOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyB0eHRfbGV2ZWw6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIHR4dF9zY29yZTpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgZ2FtZVBhdXNlOkxheWEuQm94O1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3XCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjIwLFwieFwiOjEwLFwid2lkdGhcIjo3MDAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJoZWlnaHRcIjo0NX0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjIxLFwieFwiOjYxOCxcInZhclwiOlwiYnRuX3BhdXNlXCIsXCJzdGF0ZU51bVwiOjEsXCJza2luXCI6XCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wifSxcImNvbXBJZFwiOjZ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxLFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9ocFwiLFwidGV4dFwiOlwiSFDvvJpcIixcImhlaWdodFwiOjQwLFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwibGVmdFwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo4fSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjoyNCxcInhcIjoyMjgsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X2xldmVsXCIsXCJ0ZXh0XCI6XCJsZXZlbO+8mlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjl9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjQxNSxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfc2NvcmVcIixcInRleHRcIjpcIlNjb3JlOlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjEwfSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwidmlzaWJsZVwiOmZhbHNlLFwidmFyXCI6XCJnYW1lUGF1c2VcIixcImhlaWdodFwiOjEyODAsXCJhbHBoYVwiOjF9LFwiY29tcElkXCI6MTMsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJza2luXCI6XCJnYW1lVUkvYmxhbmsucG5nXCIsXCJzaXplR3JpZFwiOlwiMiwyLDIsMlwiLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxNX0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjQxMSxcInhcIjoxMTAsXCJ3aWR0aFwiOjUwMCxcInZpc2libGVcIjp0cnVlLFwic2tpblwiOlwiZ2FtZVVJL2JnLmpwZ1wiLFwic2l6ZUdyaWRcIjpcIjEwLDEwLDEwLDEwXCIsXCJoZWlnaHRcIjo1MDB9LFwiY29tcElkXCI6MTJ9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjgwMSxcInhcIjoxOTAsXCJ3aWR0aFwiOjM0MCxcInRleHRcIjpcIueCueWHu+S7u+aEj+S9jee9rue7p+e7rea4uOaIj1wiLFwiaGVpZ2h0XCI6NDQsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzIzMjIyMlwiLFwiYm9sZFwiOnRydWUsXCJhbGlnblwiOlwiY2VudGVyXCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjE0fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDY4LFwieFwiOjIxNCxcInNraW5cIjpcImdhbWVVSS9nYW1lUGF1c2UucG5nXCJ9LFwiY29tcElkXCI6MTZ9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmxhbmsucG5nXCIsXCJnYW1lVUkvYnRuX3BhdXNlLnBuZ1wiLFwiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2dhbWVQYXVzZS5wbmdcIl0sXCJsb2FkTGlzdDNEXCI6W10sXCJjb21wb25lbnRzXCI6W119O1xyXG4gICAgICAgIGNvbnN0cnVjdG9yKCl7IHN1cGVyKCl9XHJcbiAgICAgICAgY3JlYXRlQ2hpbGRyZW4oKTp2b2lkIHtcclxuICAgICAgICAgICAgc3VwZXIuY3JlYXRlQ2hpbGRyZW4oKTtcclxuICAgICAgICAgICAgdGhpcy5jcmVhdGVWaWV3KEdhbWVQbGF5VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZVN0YXJ0VUkgZXh0ZW5kcyBEaWFsb2cge1xyXG5cdFx0cHVibGljIHR4dF9sb2FkOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyBidG5fc3RhcnQ6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIkRpYWxvZ1wiLFwicHJvcHNcIjp7XCJ3aWR0aFwiOjcyMCxcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6MSxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9iZy5qcGdcIixcInNpemVHcmlkXCI6XCI0LDQsNCw0XCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjozNzgsXCJ4XCI6MTc5LFwic2tpblwiOlwiZ2FtZVVJL2xvZ28ucG5nXCJ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6NTg3LFwieFwiOjIwLFwid2lkdGhcIjo2ODEsXCJ2YXJcIjpcInR4dF9sb2FkXCIsXCJ0ZXh0XCI6XCLmuLjmiI/otYTmupDliqDovb3ov5vluqZcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiMxYzFjMWNcIixcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6NH0se1widHlwZVwiOlwiQm94XCIsXCJwcm9wc1wiOntcInlcIjo5NjAsXCJ4XCI6MjQwLFwidmlzaWJsZVwiOnRydWUsXCJ2YXJcIjpcImJ0bl9zdGFydFwifSxcImNvbXBJZFwiOjEwLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiQnV0dG9uXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjI0MCxcInZpc2libGVcIjp0cnVlLFwic3RhdGVOdW1cIjoyLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcInNpemVHcmlkXCI6XCIyMCwyMCwyMCwyMFwiLFwiaGVpZ2h0XCI6ODB9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjE5LFwieFwiOjQxLFwic2tpblwiOlwiZ2FtZVVJL3N0YXJ0LnBuZ1wifSxcImNvbXBJZFwiOjExfV0sXCJjb21wb25lbnRzXCI6W119XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2xvZ28ucG5nXCIsXCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwiZ2FtZVVJL3N0YXJ0LnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZVN0YXJ0VUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cciJdfQ==
