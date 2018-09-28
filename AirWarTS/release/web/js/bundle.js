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
},{"./ui/layaMaxUI":7}],2:[function(require,module,exports){
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
},{"./ui/layaMaxUI":7}],3:[function(require,module,exports){
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
},{"./ui/layaMaxUI":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var layaMaxUI_1 = require("./ui/layaMaxUI");
/***游戏开始界面***/
var GameStart = /** @class */ (function (_super) {
    __extends(GameStart, _super);
    function GameStart() {
        var _this = _super.call(this) || this;
        /***游戏资源地址数组***/
        _this.assetArr = [{ url: "res/atlas/gameRole.atlas" },
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
},{"./ui/layaMaxUI":7}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebGL = Laya.WebGL;
var Stage = Laya.Stage;
var Event = laya.events.Event;
var GameStart_1 = require("./GameStart");
var GameMap_1 = require("./GameMap");
var GamePlay_1 = require("./GamePlay");
var GameOver_1 = require("./GameOver");
var Role_1 = require("./Role");
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
            this.hero = new Role_1.default();
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
            var enemy = Laya.Pool.getItemByClass("role", Role_1.default);
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
},{"./GameMap":1,"./GameOver":2,"./GamePlay":3,"./GameStart":4,"./Role":6}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Animation = Laya.Animation;
var Event = laya.events.Event;
var Main_1 = require("./Main");
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
        /***是否是子弹***/
        _this.isBullet = false;
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
        //对象基本都从对象池中创建，如果之前为子弹，不重新赋值的话不会播放死亡动画
        this.isBullet = false;
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
    /**
     * 角色失血
     */
    Role.prototype.lostHp = function (lostHp) {
        //减血
        this.hp -= lostHp;
        //根据血量判断
        if (this.hp > 0) {
            //如果未死亡，则播放受击动画
            this.playAction("hit");
        }
        else {
            //如果死亡，则播放爆炸动画
            if (this.isBullet) {
                //隐藏，下一帧回收
                this.visible = false;
            }
            else {
                //添加死亡动画
                this.playAction("die");
                //添加死亡音效
                if (this.type == "hero")
                    Laya.SoundManager.playSound("sound/game_over.mp3");
                else
                    Laya.SoundManager.playSound("sound/enemy1_die.mp3");
                //如果碰撞掉血死亡者不是角色和子弹
                if (this.type != "hero" && !this.isBullet) {
                    //增加游戏积分
                    Main_1.default.score++;
                }
            }
        }
    };
    /**角色死亡掉落物品**/
    Role.prototype.lostProp = function () {
        if (this.type != "enemy3")
            return;
        //从对象池里面创建一个道具
        var prop = Laya.Pool.getItemByClass("role", Role);
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
     * 角色吃到道具，加血或子弹级别
     */
    Role.prototype.eatProp = function (prop) {
        //如果调用者是主角或prop不是道具，则返回
        if (this.type != "hero" || prop.propType == 0)
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
                var bullet = Laya.Pool.getItemByClass("role", Role);
                //初始化子弹信息
                bullet.init("bullet2", 1, -10, 1, this.camp);
                //角色类型为子弹类型
                bullet.isBullet = true;
                //子弹消失后会不显示，重新初始化
                bullet.visible = true;
                //设置子弹发射初始化位置
                bullet.pos(this.x + pos[i], this.y - 80);
                //添加到角色层
                this.parent.addChild(bullet);
                //添加子弹音效					
                Laya.SoundManager.playSound("sound/bullet.mp3");
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
        //回收到对象池
        Laya.Pool.recover("role", this);
    };
    return Role;
}(Laya.Sprite));
exports.default = Role;
},{"./Main":5}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvR2FtZU1hcC50cyIsInNyYy9HYW1lT3Zlci50cyIsInNyYy9HYW1lUGxheS50cyIsInNyYy9HYW1lU3RhcnQudHMiLCJzcmMvTWFpbi50cyIsInNyYy9Sb2xlLnRzIiwic3JjL3VpL2xheWFNYXhVSS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNUQSw0Q0FBb0M7QUFFcEMsY0FBYztBQUNkO0lBQXFDLDJCQUFXO0lBRTVDO2VBRUksaUJBQU87SUFDWCxDQUFDO0lBRUQ7O1VBRU07SUFDQywyQkFBUyxHQUFoQjtRQUVJLElBQUksQ0FBQyxDQUFDLElBQUUsQ0FBQyxDQUFDO1FBQ1YsNEJBQTRCO1FBQzVCLFlBQVk7UUFDWixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxFQUMvQjtZQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksSUFBSSxFQUMvQjtZQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLENBQUM7U0FDMUI7SUFDTCxDQUFDO0lBRUwsY0FBQztBQUFELENBekJBLEFBeUJDLENBekJvQyxjQUFFLENBQUMsUUFBUSxHQXlCL0M7Ozs7O0FDNUJELDRDQUFvQztBQUVwQyxZQUFZO0FBQ1o7SUFBc0MsNEJBQWE7SUFFL0M7UUFBQSxZQUVJLGlCQUFPLFNBR1Y7UUFGSSxjQUFjO1FBQ3BCLEtBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFD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RUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxhQUFhLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxVQUFVLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxtQkFBbUIsRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsb0JBQW9CLEVBQUMsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUMsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLGFBQWEsRUFBQyxZQUFZLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsT0FBTyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLGFBQWEsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLFdBQVcsRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLENBQUMsZUFBZSxFQUFDLHFCQUFxQixFQUFDLG1CQUFtQixFQUFDLG9CQUFvQixDQUFDLEVBQUMsWUFBWSxFQUFDLEVBQUUsRUFBQyxZQUFZLEVBQUMsRUFBRSxFQUFDLENBQUM7UUFNcm9ELGlCQUFDO0tBVkQsQUFVQyxDQVYrQixNQUFNLEdBVXJDO0lBVlksYUFBVSxhQVV0QixDQUFBO0lBQ0Q7UUFBZ0MsOEJBQUk7UUFPaEM7bUJBQWUsaUJBQU87UUFBQSxDQUFDO1FBQ3ZCLG1DQUFjLEdBQWQ7WUFDSSxpQkFBTSxjQUFjLFdBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBTGMsaUJBQU0sR0FBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLGtCQUFrQixFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsV0FBVyxFQUFDLFVBQVUsRUFBQyxDQUFDLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLEVBQUMsUUFBUSxFQUFDLENBQUMsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxVQUFVLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxtQkFBbUIsRUFBQyxFQUFDLFFBQVEsRUFBQyxDQUFDLEVBQUMsRUFBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEVBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBQyxHQUFHLEVBQUMsS0FBSyxFQUFDLFdBQVcsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLFFBQVEsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxNQUFNLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsbUJBQW1CLEVBQUMsRUFBQyxRQUFRLEVBQUMsQ0FBQyxFQUFDLEVBQUMsRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxFQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxPQUFPLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLG1CQUFtQixFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxFQUFDLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLEtBQUssRUFBQyxXQUFXLEVBQUMsUUFBUSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxFQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVB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QUUsS0FBRixVQUFFLFFBNkNmIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+iDjOaZr+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1hcCBleHRlbmRzIHVpLkdhbWVCZ1VJXHJcbntcclxuICAgIGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg5ri45oiP6IOM5pmv56e75Yqo5pu05pawXHJcbiAgICAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgdXBkYXRlTWFwKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIHRoaXMueSs9MTtcclxuICAgICAgICAvL+WmguaenOiDjOaZr+WbvuWIsOS6huS4i+mdouS4jeWPr+inge+8jOeri+WNs+iwg+aVtOS9jee9ruWIsOS4iumdouW+queOr+aYvuekulxyXG4gICAgICAgIC8v5ri45oiP6Iie5Y+w6auY5Li6MTI4MFxyXG4gICAgICAgIGlmICh0aGlzLmJnMS55ICsgdGhpcy55ID49IDEyODApIFxyXG4gICAgICAgIHsgXHJcbiAgICAgICAgICAgIHRoaXMuYmcxLnkgLT0gMTI4MCAqIDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmJnMi55ICsgdGhpcy55ID49IDEyODApIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5iZzIueSAtPSAxMjgwICogMjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59IiwiXHJcbmltcG9ydCB7IHVpIH0gZnJvbSBcIi4vdWkvbGF5YU1heFVJXCI7XHJcblxyXG4vKioq5ri45oiP55WM6Z2iKioqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lT3ZlciBleHRlbmRzIHVpLkdhbWVPdmVyVUlcclxue1xyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICBcdC8vXCLph43mlrDlvIDlp4tcIuaMiemSrum8oOagh+S6i+S7tlxyXG5cdFx0XHR0aGlzLmJ0bl9yZXN0YXJ0Lm9uKExheWEuRXZlbnQuTU9VU0VfRE9XTix0aGlzLHRoaXMub25SZXN0YXJ0KTtcclxuICAgIH1cclxuXHQvKipcclxuXHRcdOa4uOaIj+mHjeaWsOW8gOWni1xyXG5cdFx0ICovXHRcdFxyXG5cdFx0cHJpdmF0ZSBvblJlc3RhcnQoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pKt5pS+SURF5Lit57yW6L6R55qE5oyJ6ZKu5Yqo55S7XHJcblx0XHRcdHRoaXMuYW5pX3Jlc3RhcnQucGxheSgwLGZhbHNlKTtcclxuXHRcdFx0Ly/nm5HlkKzliqjnlLvlrozmiJDkuovku7bvvIzms6jmhI/nlKhvbmNlXHJcblx0XHRcdHRoaXMuYW5pX3Jlc3RhcnQub25jZShMYXlhLkV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5BbmlDb21wbGV0ZSk7XHJcblx0XHR9XHJcblx0XHQvKipcclxuXHRcdCDmjInpkq7liqjnlLvmkq3mlL7lrozmiJBcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBBbmlDb21wbGV0ZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/lj5HpgIHph43mlrDlvIDlp4vkuovku7bvvIzlnKhNYWlu57G75Lit55uR5ZCsXHJcblx0XHRcdHRoaXMuZXZlbnQoXCJyZVN0YXJ0XCIpXHJcblx0XHRcdC8v57yT5Yqo5Yqo55S75YWz6Zet5pWI5p6c44CCSURF5Lit6aG16Z2i5Li6RGlhbG9n5omN5Y+v55SoXHJcblx0XHRcdHRoaXMuY2xvc2UoKTtcclxuXHRcdH1cclxuXHJcbn0iLCJcclxuaW1wb3J0IHsgdWkgfSBmcm9tIFwiLi91aS9sYXlhTWF4VUlcIjtcclxuXHJcbi8qKirmuLjmiI/nlYzpnaIqKiovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVQbGF5IGV4dGVuZHMgdWkuR2FtZVBsYXlVSVxyXG57XHJcbiAgICBjb25zdHJ1Y3RvcigpIFxyXG5cdHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIC8v55uR5ZCs5pqC5YGc5oyJ6ZKu5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5idG5fcGF1c2Uub24oTGF5YS5FdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vblBhdXNlKVxyXG4gICAgfVxyXG5cclxuXHQvKipcclxuXHRcdCDmuLjmiI/mmoLlgZxcclxuXHRcdCAqL1x0XHJcblx0XHRwcml2YXRlIG9uUGF1c2UoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pi+56S6SURF5Lit6ZqQ6JeP55qE5pqC5YGc55WM6Z2iXHJcblx0XHRcdHRoaXMuZ2FtZVBhdXNlLnZpc2libGU9dHJ1ZTtcclxuXHRcdFx0Ly/mmoLlgZznlYzpnaLliqDngrnlh7vnm5HlkKzvvIjkuIDmrKHvvIlcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2Uub25jZShMYXlhLkV2ZW50Lk1PVVNFX0RPV04sdGhpcyx0aGlzLm9uQ29udGludWUpXHJcblx0XHRcdFx0XHJcblx0XHRcdC8v5pe26Ze05a+56LGh57yp5pS+5Li6MOWwseaYr+WBnOatolxyXG5cdFx0XHRMYXlhLnRpbWVyLnNjYWxlPTA7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0IOa4uOaIj+e7p+e7rVxyXG5cdFx0ICovXHRcclxuXHRcdHByaXZhdGUgb25Db250aW51ZSgpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/ml7bpl7Tlr7nosaHnvKnmlL7kuLox5bCx5piv5q2j5bi46YCf5bqm5pKt5pS+XHJcblx0XHRcdExheWEudGltZXIuc2NhbGU9MTtcclxuXHRcdFx0Ly/pmpDol4/mmoLlgZznlYzpnaJcclxuXHRcdFx0dGhpcy5nYW1lUGF1c2UudmlzaWJsZT1mYWxzZTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0LyoqKirmnKzlsYDmuLjmiI/mlbDmja5VSeabtOaWsCoqKi9cclxuXHRcdHB1YmxpYyB1cGRhdGUoaHA6bnVtYmVyLGxldmVsOm51bWJlcixzY29yZTpudW1iZXIpOnZvaWRcclxuXHRcdHtcclxuXHRcdFx0Ly/op5LoibLooYDph4/mm7TmlrBcclxuXHRcdFx0dGhpcy50eHRfaHAudGV4dD1cIkhQOlwiK2hwO1xyXG5cdFx0XHQvL+WFs+WNoeetiee6p+abtOaWsFxyXG5cdFx0XHR0aGlzLnR4dF9sZXZlbC50ZXh0PVwiTEVWRUw6XCIrbGV2ZWw7XHJcblx0XHRcdC8v5ri45oiP5YiG5pWw5pu05pawXHJcblx0XHRcdHRoaXMudHh0X3Njb3JlLnRleHQ9XCJTQ09SRTpcIitzY29yZTtcclxuXHRcdH1cclxufSIsIlxyXG5pbXBvcnQgeyB1aSB9IGZyb20gXCIuL3VpL2xheWFNYXhVSVwiO1xyXG5cclxuLyoqKua4uOaIj+W8gOWni+eVjOmdoioqKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZVN0YXJ0IGV4dGVuZHMgdWkuR2FtZVN0YXJ0VUlcclxue1xyXG4gICAgLyoqKua4uOaIj+i1hOa6kOWcsOWdgOaVsOe7hCoqKi9cclxuICAgIHByaXZhdGUgYXNzZXRBcnI6YW55PVt7dXJsOlwicmVzL2F0bGFzL2dhbWVSb2xlLmF0bGFzXCJ9LFxyXG4gICAge3VybDpcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfSwgXHJcbiAgICB7dXJsOlwic291bmQvYnVsbGV0Lm1wM1wiLCB0eXBlOkxheWEuTG9hZGVyLlNPVU5EfSxcclxuICAgIHt1cmw6XCJzb3VuZC9nYW1lX292ZXIubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9LFxyXG4gICAge3VybDpcInNvdW5kL2VuZW15MV9kaWUubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9LFxyXG4gICAge3VybDpcInNvdW5kL2VuZW15M19vdXQubXAzXCIsIHR5cGU6TGF5YS5Mb2FkZXIuU09VTkR9XHJcbiAgICBdXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAvL+a4uOaIj+WKoOi9veacquWujOaIkOaaguaXtuS4jeaYvuekuu+8jOmYsuatoueCueWHu+WHuumUmVxyXG4gICAgICAgIHRoaXMuYnRuX3N0YXJ0LnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAvL+ebkeWQrOeVjOmdouaYr+WQpuWFs+mXrVxyXG4gICAgICAgIHRoaXMub25jZShsYXlhLmV2ZW50cy5FdmVudC5DTE9TRSx0aGlzLHRoaXMub25DbG9zZSk7XHJcbiAgICAgICAgLy/liqDovb3liankvZnmuLjmiI/otYTmupDjgIHpn7PkuZDvvIzliqDovb3lrozmiJDkuI7liqDovb3ov5vluqblm57osIPmlrnms5VcclxuICAgICAgICBMYXlhLmxvYWRlci5sb2FkKHRoaXMuYXNzZXRBcnIsTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Db21wbGV0ZSksTGF5YS5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMub25Qcm9ncmVzcykpXHJcbiAgICB9XHJcblxyXG4gICAgXHQvKipcclxuXHRcdCAqIOa4uOaIj+i1hOa6kOWKoOi9veWujOaIkFxyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIG9uQ29tcGxldGUoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5Yqg6L295a6M5oiQXHJcblx0XHRcdHRoaXMudHh0X2xvYWQudGV4dD1cIui1hOa6kOWKoOi9veWujOaIkCzlvIDlp4vmuLjmiI/lkKcuLi5cIjtcclxuXHRcdFx0Ly/muLjmiI/lvIDlp4vmjInpkq7mmL7npLrlubblvLnlh7pcclxuXHRcdFx0dGhpcy5idG5fc3RhcnQudmlzaWJsZT10cnVlO1xyXG5cdFx0XHQvL+e8k+WKqOexu+W8ueWHuuWKqOeUu1xyXG5cdFx0XHRMYXlhLlR3ZWVuLmZyb20odGhpcy5idG5fc3RhcnQse3k6dGhpcy5idG5fc3RhcnQueSsyMH0sMTAwMCxMYXlhLkVhc2UuZWxhc3RpY091dCk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0ICog5ri45oiP6LWE5rqQ5Yqg6L296L+b5bqmXHJcblx0XHQgKiBAcGFyYW0gbG9hZE51bSAg6L+b5bqmXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgb25Qcm9ncmVzcyhsb2FkTnVtOm51bWJlcik6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+aYvuekuuWKoOi9vei/m+W6plxyXG5cdFx0XHR0aGlzLnR4dF9sb2FkLnRleHQ9XCLotYTmupDliqDovb3kuK3vvIzlvZPliY3ov5vluqbvvJpcIitsb2FkTnVtKjEwMCtcIiVcIjtcclxuXHRcdH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOeVjOmdouWFs+mXrVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIG9uQ2xvc2UoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ku47oiJ7lj7Dnp7vpmaToh6rlt7FcclxuICAgICAgICB0aGlzLnJlbW92ZVNlbGYoKTtcclxuICAgICAgICAvL+WPquWKoOi9veS4gOasoe+8jOWboOatpOebtOaOpea2iOavgeiHquW3sVxyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCBXZWJHTCA9IExheWEuV2ViR0w7XHJcbmltcG9ydCBTdGFnZSA9IExheWEuU3RhZ2U7XHJcbmltcG9ydCBFdmVudCA9IGxheWEuZXZlbnRzLkV2ZW50O1xyXG5pbXBvcnQgR2FtZVN0YXJ0IGZyb20gXCIuL0dhbWVTdGFydFwiO1xyXG5pbXBvcnQgR2FtZU1hcCBmcm9tIFwiLi9HYW1lTWFwXCI7XHJcbmltcG9ydCBHYW1lUGxheSBmcm9tIFwiLi9HYW1lUGxheVwiO1xyXG5pbXBvcnQgR2FtZU92ZXIgZnJvbSBcIi4vR2FtZU92ZXJcIjtcclxuaW1wb3J0IFJvbGVcdGZyb20gXCIuL1JvbGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4gXHJcbntcclxuXHQvKirlvIDlp4vpobXpnaIqKiovXHJcblx0cHJpdmF0ZSBzdGFydDpHYW1lU3RhcnQ7XHJcblx0Lyoq5Zyw5Zu+6aG16Z2iKioqL1xyXG5cdHByaXZhdGUgbWFwOkdhbWVNYXA7XHJcblx0Lyoq5ri45oiP5Lit55WM6Z2iKioqL1xyXG5cdHByaXZhdGUgcGxheTpHYW1lUGxheTtcclxuXHQvKirmuLjmiI/nu5PmnZ/pobXpnaIqKiovXHJcblx0cHJpdmF0ZSBvdmVyOkdhbWVPdmVyO1xyXG5cclxuXHQvKirmuLjmiI/lhbPljaHmlbAqKiovXHJcblx0cHVibGljIHN0YXRpYyBsZXZlbDpudW1iZXI9MTtcclxuXHQvKirnjqnlrrblvpfliIYqKiovXHJcblx0cHVibGljIHN0YXRpYyBzY29yZTpudW1iZXI9MDtcclxuXHRcclxuXHQvKirop5LoibLlsYLlrrnlmagqKiovXHJcblx0cHJpdmF0ZSByb2xlTGF5ZXI6TGF5YS5TcHJpdGU7XHJcblx0Lyoq546p5a625Li76KeSKioqL1xyXG5cdHByaXZhdGUgaGVybzpSb2xlO1xyXG5cdFxyXG5cdC8qKum8oOagh+S4iuS4gOW4p3jluqfmoIcqKiAqL1x0XHRcclxuXHRwcml2YXRlIG1vdmVYOm51bWJlcjtcclxuXHQvKirpvKDmoIfkuIrkuIDluKd55bqn5qCHKiogKi9cdFxyXG5cdHByaXZhdGUgbW92ZVk6bnVtYmVyO1xyXG5cdFxyXG5cdC8qKioq5pWM5py66KGA6YeP6KGoKioqKi9cclxuXHRwcml2YXRlIGhwczogbnVtYmVyW10gPSBbMSwgNywgMTVdO1xyXG5cdC8qKirmlYzmnLrnlJ/miJDmlbDph4/ooagqKi9cclxuXHRwcml2YXRlIG51bXM6IG51bWJlcltdID0gWzIsIDEsIDFdO1xyXG5cdC8qKirmlYzmnLrpgJ/luqbooagqKiovXHJcblx0cHJpdmF0ZSBzcGVlZHM6ICBudW1iZXJbXSA9IFszLCAyLCAxXTtcclxuXHQvKioq5pWM5py66KKr5Ye75Y2K5b6E6KGoKioqL1xyXG5cdHByaXZhdGUgcmFkaXVzOiAgbnVtYmVyW10gPSBbMjAsIDM1LCA4MF07XHJcblx0XHJcblx0LyoqKirkuLvop5LmrbvkuqHlkI7muLjmiI/nu5PmnZ/ml7bpl7QqKiovXHJcblx0cHJpdmF0ZSBkZWF0aFRpbWU6bnVtYmVyPTBcclxuXHRcdFxyXG5cdC8v5ri45oiP5YWz5Y2h5o+Q5Y2H5bGe5oCnXHJcblx0LyoqKuaVjOS6uuWIt+aWsOWKoOmAnyoqKiovXHJcblx0cHJpdmF0ZSBjcmVhdGVUaW1lOm51bWJlciA9IDA7XHJcblx0LyoqKuaVjOS6uumAn+W6puaPkOWNhyoqKi9cclxuXHRwcml2YXRlIHNwZWVkVXA6bnVtYmVyID0gMDtcclxuXHQvKioq5pWM5Lq66KGA6YeP5o+Q5Y2HXHQqKiovXHRcdFxyXG5cdHByaXZhdGUgaHBVcDpudW1iZXIgPSAwO1xyXG5cdC8qKirmlYzkurrmlbDph4/mj5DljYdcdCoqKi9cdFx0XHRcdFx0XHJcblx0cHJpdmF0ZSBudW1VcDpudW1iZXIgPSAwO1xyXG5cdC8qKioq5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePKioqL1xyXG5cdHByaXZhdGUgbGV2ZWxVcFNjb3JlOiBudW1iZXIgPSAxMDtcclxuXHJcblx0Y29uc3RydWN0b3IoKSBcclxuXHR7XHJcblx0XHQvL+WIneWni+WMluW8leaTju+8jOW7uuiuruWinuWKoFdlYkds5qih5byPXHJcblx0XHRMYXlhLmluaXQoNzIwLDEyODAsV2ViR0wpO1xyXG5cdFx0Ly/lhajlsY/kuI3nrYnmr5TnvKnmlL7mqKHlvI9cclxuXHRcdExheWEuc3RhZ2Uuc2NhbGVNb2RlID0gU3RhZ2UuU0NBTEVfRVhBQ1RGSVQ7XHJcblx0XHRcclxuXHRcdExheWEubG9hZGVyLmxvYWQoXCJyZXMvYXRsYXMvZ2FtZVVJLmF0bGFzXCIsbGF5YS51dGlscy5IYW5kbGVyLmNyZWF0ZSh0aGlzLHRoaXMuR2FtZVN0YXJ0KSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIEdhbWVTdGFydCgpOnZvaWQgXHJcblx0e1xyXG5cdFx0Ly/lrp7kvovljJblvIDlp4vpobXpnaJcclxuXHRcdHRoaXMuc3RhcnQgPSBuZXcgR2FtZVN0YXJ0KCk7XHJcblx0XHR0aGlzLnN0YXJ0LnBvcHVwKCk7XHJcblx0XHQvL+ebkeWQrOW8gOWni+a4uOaIj+W8gOWni+aMiemSruS6i+S7tizngrnlh7vlkI7ov5vlhaXmuLjmiI/kuK1cclxuXHRcdHRoaXMuc3RhcnQuYnRuX3N0YXJ0Lm9uKEV2ZW50Lk1PVVNFX1VQLHRoaXMsdGhpcy5nYW1lSW5pdClcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDmuLjmiI/kuK3vvIzmuLjmiI/liJ3lp4vljJZcclxuXHRcdCovXHJcblx0cHJpdmF0ZSBnYW1lSW5pdCgpOnZvaWRcclxuXHR7XHJcblx0XHQvL+e8k+WKqOWKqOeUu+WFs+mXreaViOaenOOAgklEReS4remhtemdouS4ukRpYWxvZ+aJjeWPr+eUqFxyXG5cdFx0dGhpcy5zdGFydC5jbG9zZSgpO1xyXG5cdFx0XHJcblx0XHQvL+mHjee9ruWFs+WNoeaVsOaNrlxyXG5cdFx0Ly/muLjmiI/lhbPljaHmlbBcclxuXHRcdE1haW4ubGV2ZWwgPSAxO1xyXG5cdFx0Ly/njqnlrrblvpfliIZcclxuXHRcdE1haW4uc2NvcmUgPSAwO1xyXG5cdFx0Ly/mlYzkurrliLfmlrDliqDpgJ9cclxuXHRcdHRoaXMuY3JlYXRlVGltZSA9IDA7XHJcblx0XHQvL+aVjOS6uumAn+W6puaPkOWNh1xyXG5cdFx0dGhpcy5zcGVlZFVwID0gMDtcclxuXHRcdC8v5pWM5Lq66KGA6YeP5o+Q5Y2HXHRcclxuXHRcdHRoaXMuaHBVcCA9IDA7XHJcblx0XHQvL+aVjOS6uuaVsOmHj+aPkOWNh1x0XHRcdFx0XHJcblx0XHR0aGlzLm51bVVwID0gMDtcclxuXHRcdC8v5Y2H57qn562J57qn5omA6ZyA55qE5oiQ57up5pWw6YePXHJcblx0XHR0aGlzLmxldmVsVXBTY29yZSA9IDEwO1x0XHRcdFxyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluWcsOWbvuiDjOaZr+mhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLm1hcCA9PSBudWxsKVxyXG5cdFx0XHR0aGlzLm1hcCA9IG5ldyBHYW1lTWFwKCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLm1hcCk7XHJcblx0XHRcclxuXHRcdC8v5a6e5L6L5YyW6KeS6Imy5bGC5bm25Yqg6L295Yiw6Iie5Y+wKOWmguaenOW3suWunuS+i+WMlu+8jOS4jemcgOimgemHjeaWsG5ldylcclxuXHRcdGlmKHRoaXMucm9sZUxheWVyID09IG51bGwpXHJcblx0XHRcdHRoaXMucm9sZUxheWVyID0gbmV3IExheWEuU3ByaXRlKCk7XHJcblx0XHRMYXlhLnN0YWdlLmFkZENoaWxkKHRoaXMucm9sZUxheWVyKTtcclxuXHRcdFxyXG5cdFx0Ly/lrp7kvovljJbmuLjmiI/kuK1VSemhtemdoijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLnBsYXkgPT0gbnVsbClcclxuXHRcdFx0dGhpcy5wbGF5ID0gbmV3IEdhbWVQbGF5KCk7XHJcblx0XHQvL+WKoOi9veWIsOiInuWPsFxyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZCh0aGlzLnBsYXkpO1xyXG5cdFx0XHJcblx0XHQvL+WunuS+i+WMluS4u+inkijlpoLmnpzlt7Llrp7kvovljJbvvIzkuI3pnIDopoHph43mlrBuZXcpXHJcblx0XHRpZih0aGlzLmhlcm8gPT0gbnVsbClcclxuXHRcdHRoaXMuaGVybyA9IG5ldyBSb2xlKCk7XHJcblx0XHQvL+WIneWni+WMluinkuiJsuexu+Wei+OAgeihgOmHj++8jOazqO+8mumAn+W6pnNwZWVk5Li6MO+8jOWboOS4uuS4u+inkuaYr+mAmui/h+aTjeaOp+aUueWPmOS9jee9rizpmLXokKXkuLowXHJcblx0XHR0aGlzLmhlcm8uaW5pdChcImhlcm9cIiwxMCwwLDMwLDApO1xyXG5cdFx0Ly/mrbvkuqHlkI7kvJrpmpDol4/vvIzph43mlrDlvIDlp4vlkI7pnIDmmL7npLpcclxuXHRcdHRoaXMuaGVyby52aXNpYmxlPXRydWU7XHJcblx0XHQvL+S4u+inkuS9jee9ruS/ruaUuVxyXG5cdFx0dGhpcy5oZXJvLnBvcygzNjAsODAwKTtcclxuXHRcdC8v6KeS6Imy5Yqg6L295Yiw6KeS6Imy5bGC5LitXHJcblx0XHR0aGlzLnJvbGVMYXllci5hZGRDaGlsZCh0aGlzLmhlcm8pO1xyXG5cdFx0XHJcblx0XHQvL+m8oOagh+aMieS4i+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9ET1dOLHRoaXMsdGhpcy5vbk1vdXNlRG93bik7XHJcblx0XHQvL+m8oOagh+aKrOi1t+ebkeWQrFxyXG5cdFx0TGF5YS5zdGFnZS5vbihFdmVudC5NT1VTRV9VUCx0aGlzLHRoaXMub25Nb3VzZVVwKTtcclxuXHRcdC8v5ri45oiP5Li75b6q546vXHJcblx0XHRMYXlhLnRpbWVyLmZyYW1lTG9vcCgxLHRoaXMsdGhpcy5sb29wKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCDngrnlh7vlvIDlp4vop6blj5Hnp7vliqhcclxuXHRcdCovXHRcclxuXHRwcml2YXRlIG9uTW91c2VEb3duKCk6dm9pZFxyXG5cdHtcclxuXHRcdC8v6K6w5b2V6byg5qCH5oyJ5LiL5pe255qE5L2N572u77yM55So5LqO6K6h566X6byg5qCH56e75Yqo6YePXHJcblx0XHR0aGlzLm1vdmVYPUxheWEuc3RhZ2UubW91c2VYO1xyXG5cdFx0dGhpcy5tb3ZlWT1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8vXHJcblx0XHRMYXlhLnN0YWdlLm9uKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKTtcclxuXHR9XHJcblx0XHJcblx0LyoqXHJcblx0IOS4u+inkui3n+maj+m8oOagh+enu+WKqFxyXG5cdFx0Ki9cdFxyXG5cdHByaXZhdGUgb25Nb3VzZU1vdmUoKTp2b2lkXHJcblx0e1xyXG5cdFx0Ly/orqHnrpfop5LoibLnp7vliqjph49cclxuXHRcdGxldCB4eDpudW1iZXI9dGhpcy5tb3ZlWC1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdGxldCB5eTpudW1iZXI9dGhpcy5tb3ZlWS1MYXlhLnN0YWdlLm1vdXNlWTtcclxuXHRcdC8v5pu05paw56e75Yqo5L2N572uXHJcblx0XHR0aGlzLmhlcm8ueC09eHg7XHJcblx0XHR0aGlzLmhlcm8ueS09eXk7XHJcblx0XHQvL+abtOaWsOacrOW4p+eahOenu+WKqOW6p+agh1xyXG5cdFx0dGhpcy5tb3ZlWD1MYXlhLnN0YWdlLm1vdXNlWDtcclxuXHRcdHRoaXMubW92ZVk9TGF5YS5zdGFnZS5tb3VzZVk7XHJcblx0fVxyXG5cdC8qKlxyXG5cdCDpvKDmoIfmiqzotbfjgIHlhbPpl63np7vliqjnm5HlkKxcclxuXHRcdCovXHRcdFxyXG5cdHByaXZhdGUgb25Nb3VzZVVwKCk6dm9pZFxyXG5cdHtcclxuXHRcdExheWEuc3RhZ2Uub2ZmKEV2ZW50Lk1PVVNFX01PVkUsdGhpcyx0aGlzLm9uTW91c2VNb3ZlKSA7XHJcblx0fVxyXG5cclxuXHRcdC8qKlxyXG5cdFx0IOa4uOaIj+S4u+W+queOr1xyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGxvb3AoKTp2b2lkXHJcblx0XHR7XHJcblx0XHRcdC8v5pys5bGA5ri45oiP5pWw5o2u5pu05pawXHJcblx0XHRcdHRoaXMucGxheS51cGRhdGUodGhpcy5oZXJvLmhwLE1haW4ubGV2ZWwsTWFpbi5zY29yZSlcclxuXHRcdFx0Ly/lpoLmnpzkuLvop5LmrbvkuqFcclxuXHRcdFx0aWYodGhpcy5oZXJvLmhwPD0wKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly/njqnlrrbpo57mnLrmrbvkuqHlkI7lu7bov5/ml7bpl7TvvIwxMDDluKflkI7lvLnlh7rmuLjmiI/nu5PmnZ/nlYzpnaJcclxuXHRcdFx0XHR0aGlzLmRlYXRoVGltZSsrXHJcblx0XHRcdFx0aWYgKHRoaXMuZGVhdGhUaW1lPj0xMDApXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0dGhpcy5kZWF0aFRpbWU9MDtcclxuXHRcdFx0XHRcdC8v5ri45oiP57uT5p2fXHJcblx0XHRcdFx0XHR0aGlzLmdhbWVPdmVyKCk7XHJcblx0XHRcdFx0XHQvL+acrOaWueazleWGheWQjue7remAu+i+keS4jeaJp+ihjFxyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fWVsc2UvL+S4u+inkuacquatu+S6oVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly/kuLvop5LlsITlh7tcclxuXHRcdFx0XHR0aGlzLmhlcm8uc2hvb3QoKTtcclxuXHRcdFx0XHQvL+a4uOaIj+WNh+e6p+iuoeeul1xyXG5cdFx0XHRcdHRoaXMubGV2ZWxVcCgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHQvL+WcsOWbvua7muWKqOabtOaWsFxyXG5cdFx0XHR0aGlzLm1hcC51cGRhdGVNYXAoKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHQvL+a4uOaIj+eisOaSnumAu+i+kVxyXG5cdFx0XHQvL+mBjeWOhuaJgOaciemjnuacuu+8jOabtOaUuemjnuacuueKtuaAgVxyXG5cdFx0XHRmb3IgKHZhciBpOiBudW1iZXIgPSB0aGlzLnJvbGVMYXllci5udW1DaGlsZHJlbiAtIDE7IGkgPiAtMTsgaS0tKSBcclxuXHRcdFx0e1xyXG5cdFx0XHRcdC8v6I635Y+W56ys5LiA5Liq6KeS6ImyXHJcblx0XHRcdFx0dmFyIHJvbGU6Um9sZSA9IHRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaSkgYXMgUm9sZTtcclxuXHRcdFx0XHQvL+inkuiJsuiHqui6q+abtOaWsFxyXG5cdFx0XHRcdHJvbGUudXBkYXRlKCk7XHRcdFx0XHRcclxuXHRcdFx0XHQvL+WmguaenOinkuiJsuatu+S6oe+8jOS4i+S4gOW+queOr1xyXG5cdFx0XHRcdGlmKHJvbGUuaHA8PTApIGNvbnRpbnVlO1xyXG5cdFx0XHRcdC8v56Kw5pKe5qOA5rWLXHJcblx0XHRcdFx0Zm9yKHZhciBqOm51bWJlcj1pLTE7aj4tMTtqLS0pXHJcblx0XHRcdFx0e1x0Ly/ojrflj5bnrKzkuozkuKrop5LoibJcclxuXHRcdFx0XHRcdHZhciByb2xlMTpSb2xlPXRoaXMucm9sZUxheWVyLmdldENoaWxkQXQoaikgYXMgUm9sZTtcclxuXHRcdFx0XHRcdC8v5aaC5p6ccm9sZTHmnKrmrbvkuqHkuJTkuI3lkIzpmLXokKVcclxuXHRcdFx0XHRcdGlmKHJvbGUxLmhwPjAmJnJvbGUxLmNhbXAhPXJvbGUuY2FtcClcclxuXHRcdFx0XHRcdHtcclxuXHRcdFx0XHRcdFx0Ly/ojrflj5bnorDmkp7ljYrlvoRcclxuXHRcdFx0XHRcdFx0dmFyIGhpdFJhZGl1czpudW1iZXI9cm9sZS5oaXRSYWRpdXMrcm9sZTEuaGl0UmFkaXVzO1xyXG5cdFx0XHRcdFx0XHQvL+eisOaSnuajgOa1i1xyXG5cdFx0XHRcdFx0XHRpZihNYXRoLmFicyhyb2xlLngtcm9sZTEueCk8aGl0UmFkaXVzJiZNYXRoLmFicyhyb2xlLnktcm9sZTEueSk8aGl0UmFkaXVzKVxyXG5cdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0Ly/lpoLmnpzmn5DkuIDkuKrnorDmkp7kvZPmmK/pgZPlhbfvvIzliJnlkIPpgZPlhbfvvIzlkKbliJnmjonooYBcclxuXHRcdFx0XHRcdFx0XHRpZihyb2xlLnByb3BUeXBlIT0wfHxyb2xlMS5wcm9wVHlwZSE9MClcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQvL+aXoOazleWIpOaWreWTquS4quaYr+mBk+WFt++8jOWboOatpOmDveebuOS6kuWQg+ivleivlVxyXG5cdFx0XHRcdFx0XHRcdFx0cm9sZS5lYXRQcm9wKHJvbGUxKTtcclxuXHRcdFx0XHRcdFx0XHRcdHJvbGUxLmVhdFByb3Aocm9sZSk7XHJcblx0XHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0XHR7XHJcblx0XHRcdFx0XHRcdFx0XHQvL+inkuiJsuebuOS6kuaOieihgFxyXG5cdFx0XHRcdFx0XHRcdFx0cm9sZS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdFx0XHRyb2xlMS5sb3N0SHAoMSk7XHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHQvL+WIm+W7uuaVjOacuu+8jOWKoOWFpeWFs+WNoeWNh+e6p+aVsOaNru+8jOaPkOmrmOmavuW6plxyXG5cdFx0XHQvL+eUn+aIkOWwj+mjnuaculxyXG5cdFx0XHRpZiAoTGF5YS50aW1lci5jdXJyRnJhbWUgJSAoODAgLSB0aGlzLmNyZWF0ZVRpbWUpID09MClcclxuXHRcdFx0e1xyXG5cdFx0XHRcdHRoaXMuY3JlYXRlRW5lbXkoMCwgdGhpcy5ocHNbMF0sdGhpcy5zcGVlZHNbMF0gKyB0aGlzLnNwZWVkVXAgLCB0aGlzLm51bXNbMF0gKyB0aGlzLm51bVVwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHQvL+eUn+aIkOS4reWei+mjnuaculxyXG5cdFx0XHRpZiAoTGF5YS50aW1lci5jdXJyRnJhbWUgJSAoMTcwIC0gdGhpcy5jcmVhdGVUaW1lICogMikgPT0gMCkgXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDEsIHRoaXMuaHBzWzFdICt0aGlzLmhwVXAgKiAyLHRoaXMuc3BlZWRzWzFdICsgdGhpcy5zcGVlZFVwICwgdGhpcy5udW1zWzFdICsgdGhpcy5udW1VcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0Ly/nlJ/miJBib3NzXHJcblx0XHRcdGlmIChMYXlhLnRpbWVyLmN1cnJGcmFtZSAlICgxMDAwIC0gdGhpcy5jcmVhdGVUaW1lICogMykgPT0gMCkgXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aGlzLmNyZWF0ZUVuZW15KDIsIHRoaXMuaHBzWzJdICsgdGhpcy5ocFVwICogNix0aGlzLnNwZWVkc1syXSwgdGhpcy5udW1zWzJdKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdH1cclxuXHJcblx0XHQvKipcclxuXHRcdCDmuLjmiI/ljYfnuqforqHnrpdcclxuXHRcdCAqL1xyXG5cdFx0cHJpdmF0ZSBsZXZlbFVwKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHRpZihNYWluLnNjb3JlPnRoaXMubGV2ZWxVcFNjb3JlKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly/lhbPljaHnrYnnuqfmj5DljYdcclxuXHRcdFx0XHRNYWluLmxldmVsKys7XHJcblx0XHRcdFx0Ly/op5LoibLooYDph4/lop7liqDvvIzmnIDlpKczMFxyXG5cdFx0XHRcdHRoaXMuaGVyby5ocD1NYXRoLm1pbih0aGlzLmhlcm8uaHArTWFpbi5sZXZlbCoxLDMwKTtcclxuXHRcdFx0XHQvL+WFs+WNoei2iumrmO+8jOWIm+W7uuaVjOacuumXtOmalOi2iuefrVxyXG5cdFx0XHRcdHRoaXMuY3JlYXRlVGltZSA9IE1haW4ubGV2ZWwgPCAzMCA/IE1haW4ubGV2ZWwgKiAyIDogNjA7XHJcblx0XHRcdFx0Ly/lhbPljaHotorpq5jvvIzmlYzmnLrpo57ooYzpgJ/luqbotorpq5hcclxuXHRcdFx0XHR0aGlzLnNwZWVkVXAgPSBNYXRoLmZsb29yKE1haW4ubGV2ZWwgLyA2KTtcclxuXHRcdFx0XHQvL+WFs+WNoei2iumrmO+8jOaVjOacuuihgOmHj+i2iumrmFxyXG5cdFx0XHRcdHRoaXMuaHBVcCA9IE1hdGguZmxvb3IoTWFpbi5sZXZlbCAvIDgpO1xyXG5cdFx0XHRcdC8v5YWz5Y2h6LaK6auY77yM5pWM5py65pWw6YeP6LaK5aSaXHJcblx0XHRcdFx0dGhpcy5udW1VcCA9IE1hdGguZmxvb3IoTWFpbi5sZXZlbCAvIDEwKTtcclxuXHRcdFx0XHQvL+aPkOmrmOS4i+S4gOe6p+eahOWNh+e6p+WIhuaVsFxyXG5cdFx0XHRcdHRoaXMubGV2ZWxVcFNjb3JlICs9IE1haW4ubGV2ZWwgKiAxMDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHQvKipcclxuXHRcdCAqICDliJvlu7rmlYzkurpcclxuXHRcdCAqIEBwYXJhbSBpbmRleCBcdOaVjOS6uue8luWPt1xyXG5cdFx0ICogQHBhcmFtIGhwICAgXHRcdCDmlYzkurrooYDph49cclxuXHRcdCAqIEBwYXJhbSBzcGVlZFx0XHTmlYzkurrpgJ/luqZcclxuXHRcdCAqIEBwYXJhbSBudW1cdFx05pWM5Lq65pWw6YePXHJcblx0XHQgKi9cclxuXHRcdHByaXZhdGUgY3JlYXRlRW5lbXkoaW5kZXg6bnVtYmVyLGhwOm51bWJlcixzcGVlZDpudW1iZXIsbnVtOm51bWJlcik6dm9pZCBcclxuXHRcdHtcclxuXHRcdFx0Zm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IG51bTsgaSsrKVxyXG5cdFx0XHR7XHJcblx0XHRcdFx0Ly/liJvlu7rmlYzkurrvvIzku47lr7nosaHmsaDliJvlu7pcclxuXHRcdFx0XHRsZXQgZW5lbXk6Um9sZSA9IExheWEuUG9vbC5nZXRJdGVtQnlDbGFzcyhcInJvbGVcIiwgUm9sZSk7XHJcblx0XHRcdFx0Ly/liJ3lp4vljJbmlYzkurpcclxuXHRcdFx0XHRlbmVteS5pbml0KFwiZW5lbXlcIiArIChpbmRleCsxKSwgaHAsIHNwZWVkLHRoaXMucmFkaXVzW2luZGV4XSwxKTtcclxuXHRcdFx0XHQvL+S7juWvueixoeaxoOS4reWIm+W7uueahOWvueixoeatu+S6oeWJjeiiq+makOiXj+S6hu+8jOWboOatpOimgemHjeaWsOWIneWni+WMluaYvuekuu+8jOWQpuWImeaWsOWIm+W7uuinkuiJsuS4jeS8muaYvuekuuWHuuadpVxyXG5cdFx0XHRcdGVuZW15LnZpc2libGU9dHJ1ZTtcclxuXHRcdFx0XHQvL+maj+acuuS9jee9rlxyXG5cdFx0XHRcdGVuZW15LnBvcyhNYXRoLnJhbmRvbSgpICooNzIwLTgwKSs1MCwgLU1hdGgucmFuZG9tKCkgKiAxMDApO1xyXG5cdFx0XHRcdC8v5re75Yqg5Yiw6Iie5Y+w5LiKXHJcblx0XHRcdFx0dGhpcy5yb2xlTGF5ZXIuYWRkQ2hpbGQoZW5lbXkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdC8qKlxyXG5cdFx0IOa4uOaIj+e7k+adn1xyXG5cdFx0ICovXHJcblx0XHRwcml2YXRlIGdhbWVPdmVyKCk6dm9pZFxyXG5cdFx0e1xyXG5cdFx0XHQvL+enu+mZpOaJgOacieiInuWPsOS6i+S7tu+8jOm8oOagh+aTjeaOp1xyXG5cdFx0XHRMYXlhLnN0YWdlLm9mZkFsbCgpO1xyXG5cdFx0XHRcclxuXHRcdFx0Ly/np7vpmaTlnLDlm77og4zmma9cclxuXHRcdFx0dGhpcy5tYXAucmVtb3ZlU2VsZigpO1xyXG5cdFx0XHQvL+enu+mZpOa4uOaIj+S4rVVJXHJcblx0XHRcdHRoaXMucGxheS5yZW1vdmVTZWxmKCk7XHJcblx0XHRcdFxyXG5cdFx0XHQvL+a4heepuuinkuiJsuWxguWtkOWvueixoVxyXG5cdFx0XHR0aGlzLnJvbGVMYXllci5yZW1vdmVDaGlsZHJlbigwLHRoaXMucm9sZUxheWVyLm51bUNoaWxkcmVuLTEpO1xyXG5cdFx0XHQvL+enu+mZpOinkuiJsuWxglxyXG5cdFx0XHR0aGlzLnJvbGVMYXllci5yZW1vdmVTZWxmKCk7XHJcblx0XHRcdFxyXG5cdFx0XHQvL+WOu+mZpOa4uOaIj+S4u+W+queOr1xyXG5cdFx0XHRMYXlhLnRpbWVyLmNsZWFyKHRoaXMsdGhpcy5sb29wKTtcclxuXHRcdFx0XHJcblx0XHRcdC8v5a6e5L6L5YyW5ri45oiP57uT5p2f6aG16Z2iXHJcblx0XHRcdGlmKHRoaXMub3ZlciA9PSBudWxsKVxyXG5cdFx0XHRcdHRoaXMub3ZlciA9IG5ldyBHYW1lT3ZlcigpO1xyXG5cdFx0XHQvL+a4uOaIj+enr+WIhuaYvuekulxyXG5cdFx0XHR0aGlzLm92ZXIudHh0X3Njb3JlLnRleHQ9TWFpbi5zY29yZS50b1N0cmluZygpO1xyXG5cdFx0XHQvL+S7peW8ueWHuuaWueW8j+aJk+W8gO+8jOaciee8k+WKqOaViOaenOOAgklEReS4remhtemdouS4ukRpYWxvZ+aJjeWPr+eUqFxyXG5cdFx0XHR0aGlzLm92ZXIucG9wdXAoKTtcclxuXHRcdFx0Ly/ph43mlrDlvIDlp4vkuovku7bnm5HlkKws54K55Ye75ZCO6L+b5YWl5ri45oiP5LitXHJcblx0XHRcdHRoaXMub3Zlci5vbihcInJlU3RhcnRcIix0aGlzLHRoaXMuZ2FtZUluaXQpO1xyXG5cdFx0fVxyXG59XHJcblxyXG5cclxuLy/mv4DmtLvlkK/liqjnsbtcclxubmV3IE1haW4oKTtcclxuIiwiXHJcbmltcG9ydCBBbmltYXRpb24gPSBMYXlhLkFuaW1hdGlvbjtcclxuaW1wb3J0IEV2ZW50ID0gbGF5YS5ldmVudHMuRXZlbnQ7XHJcbmltcG9ydCBNYWluIGZyb20gXCIuL01haW5cIjtcclxuXHJcbi8v6KeS6ImyXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGUgZXh0ZW5kcyBMYXlhLlNwcml0ZVxyXG57XHJcblx0LyoqKumjnuacuueahOexu+WeiyAgIOKAnGhlcm/igJ06546p5a626aOe5py677yM4oCcZW5lbXnigJ3vvJrmlYzkurrpo57mnLrjgIHigJxidWxsZeKAne+8muWtkOW8ueOAgVwidWZvXCI66YGT5YW3KioqKi9cclxuICAgIHB1YmxpYyB0eXBlOlN0cmluZztcclxuICAgIC8qKirpo57mnLrnmoTooYDph48qKiovXHJcbiAgICBwdWJsaWMgaHA6bnVtYmVyPTA7IFxyXG4gICAgLyoqKumjnuacuueahOmAn+W6pioqKi9cclxuICAgIHByaXZhdGUgc3BlZWQ6bnVtYmVyPTA7XHRcclxuICAgIFxyXG4gICAgLyoqKumjnuacuueahOiiq+aUu+WHu+WNiuW+hCoqKi9cclxuICAgIHB1YmxpYyBoaXRSYWRpdXM6bnVtYmVyO1xyXG4gICAgLyoqKumjnuacuueahOmYteiQpe+8iOaVjOaIkeWMuuWIq++8iSoqKi9cclxuICAgIHB1YmxpYyBjYW1wOm51bWJlcjtcclxuICAgIFxyXG4gICAgLyoqKuinkuiJsueahOWKqOeUu+i1hOa6kCoqKi9cclxuICAgIHByaXZhdGUgcm9sZUFuaTpBbmltYXRpb247XHJcbiAgICAvKioq5b2T5YmN5Yqo55S75Yqo5L2cKioqL1xyXG4gICAgcHJpdmF0ZSBhY3Rpb246U3RyaW5nO1xyXG4gICAgXHJcbiAgICAvKioq5bCE5Ye76Ze06ZqUKioqL1xyXG4gICAgcHVibGljIHNob290SW50ZXJ2YWw6IG51bWJlcj0gMzAwO1xyXG4gICAgLyoqKuS4i+asoeWwhOWHu+aXtumXtCoqKi9cclxuICAgIHB1YmxpYyBzaG9vdFRpbWU6IG51bWJlcj0gMzAwO1xyXG4gICAgLyoqKuaYr+WQpuaYr+WtkOW8uSoqKi9cclxuICAgIHB1YmxpYyBpc0J1bGxldDpCb29sZWFuID0gZmFsc2U7XHJcbiAgICBcclxuICAgIC8qKioq6YGT5YW357G75Z6LIDA66aOe5py65oiW5a2Q5by577yMMTrlrZDlvLnnrrHvvIwyOuihgOeTtioqKi9cclxuICAgIHB1YmxpYyBwcm9wVHlwZTpudW1iZXI9MDtcclxuICAgIC8qKirlrZDlvLnnuqfliKvvvIjlkIPlrZDlvLnpgZPlhbflkI7ljYfnuqfvvIkqKiovXHJcbiAgICBwdWJsaWMgYnVsbGV0TGV2ZWw6IG51bWJlciA9IDA7XHJcbiAgICAvKioq5ZCM5pe25bCE5Ye75a2Q5by55pWw6YePKioqL1xyXG4gICAgcHVibGljIHNob290TnVtOiBudW1iZXI9IDE7XHJcbiAgICAvKioq5a2Q5by55YGP56e755qE5L2N572uKioqL1xyXG4gICAgcHJpdmF0ZSBidWxsZXRQb3M6IG51bWJlcltdW10gPSBbWzBdLCBbLTE1LCAxNV0sIFstMzAsIDAsIDMwXSwgWy00NSwgLTE1LCAxNSwgNDVdXTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSBcclxuXHR7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgLy/lrp7kvovljJbliqjnlLtcclxuICAgICAgICAgdGhpcy5yb2xlQW5pPW5ldyBBbmltYXRpb24oKTtcclxuICAgICAgICAgLy/liqDovb1JREXnvJbovpHnmoTliqjnlLvmlofku7ZcclxuICAgICAgICAgdGhpcy5yb2xlQW5pLmxvYWRBbmltYXRpb24oXCJHYW1lUm9sZS5hbmlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLliJ3lp4vljJZcclxuICAgICAqIEBwYXJhbSB0eXBlICDop5LoibLnsbvlnosgLS0t4oCcaGVyb+KAnTrnjqnlrrbpo57mnLrvvIzigJxlbmVteTEtM+KAne+8muaVjOS6uumjnuacuuOAgeKAnGJ1bGxlOjEtMuKAne+8muWtkOW8ueOAgVwidWZvMS0yXCI66YGT5YW3XHJcbiAgICAgKiBAcGFyYW0gaHAgICAgICDooYDph49cclxuICAgICAqIEBwYXJhbSBzcGVlZCAgIOmAn+W6plxyXG4gICAgICogQHBhcmFtIGhpdFJhZGl1cyAgIOeisOaSnuWNiuW+hFxyXG4gICAgICogQHBhcmFtIGNhbXAgICAg6Zi16JClXHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgaW5pdCh0eXBlOlN0cmluZyxocDpudW1iZXIsc3BlZWQ6bnVtYmVyLGhpdFJhZGl1czpudW1iZXIsY2FtcDpudW1iZXIpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+inkuiJsuWIneWni+WMluWxnuaAp1xyXG4gICAgICAgIHRoaXMudHlwZT10eXBlO1xyXG4gICAgICAgIHRoaXMuaHA9aHA7XHJcbiAgICAgICAgdGhpcy5zcGVlZD1zcGVlZDtcclxuICAgICAgICB0aGlzLmhpdFJhZGl1cz1oaXRSYWRpdXM7XHJcbiAgICAgICAgdGhpcy5jYW1wPWNhbXA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lr7nosaHln7rmnKzpg73ku47lr7nosaHmsaDkuK3liJvlu7rvvIzlpoLmnpzkuYvliY3kuLrlrZDlvLnvvIzkuI3ph43mlrDotYvlgLznmoTor53kuI3kvJrmkq3mlL7mrbvkuqHliqjnlLtcclxuICAgICAgICB0aGlzLmlzQnVsbGV0PWZhbHNlO1xyXG4gICAgICAgIC8v6YGT5YW35bGe5oCn5Yid5aeL5Li6MFxyXG4gICAgICAgIHRoaXMucHJvcFR5cGU9MDtcclxuICAgICAgICBcclxuICAgICAgICAvL+WKoOi9veWKqOeUu+WvueixoVxyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5yb2xlQW5pKVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v55uR5ZCs5Yqo55S75a6M5oiQ5LqL5Lu2XHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLm9uKEV2ZW50LkNPTVBMRVRFLHRoaXMsdGhpcy5vbkNvbXBsZXRlKVxyXG4gICAgICAgIC8v5pKt5pS+6buY6K6k6aOe6KGM5Yqo55S7XHJcbiAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKioq5Yqo55S75a6M5oiQ5ZCO5Zue6LCD5pa55rOVKioqL1xyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCk6dm9pZFxyXG4gICAge1xyXG4gICAgICAgIC8v5aaC5p6c6KeS6Imy6L+Y5pyq5pyJ5a6977yM6I635b6X6KeS6Imy5a696auYXHRcclxuICAgICAgICBpZih0aGlzLnJvbGVBbmkud2lkdGg9PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+iOt+W+l+WKqOeUu+efqeW9oui+ueeVjFxyXG4gICAgICAgICAgICB2YXIgYm91bmRzOkxheWEuUmVjdGFuZ2xlPXRoaXMucm9sZUFuaS5nZXRCb3VuZHMoKTtcclxuICAgICAgICAgICAgLy/op5LoibIg5a696auY6LWL5YC8XHJcbiAgICAgICAgICAgIHRoaXMucm9sZUFuaS5zaXplKGJvdW5kcy53aWR0aCxib3VuZHMuaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgICAgICAvL+WmguaenOatu+S6oeWKqOeUu+aSreaUvuWujOaIkFxyXG4gICAgICAgIGlmKHRoaXMuYWN0aW9uPT1cImRpZVwiKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy91cGRhdGUoKeaWueazleS4re+8jOmakOiXj+WQjui/m+ihjOWbnuaUtlxyXG4gICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMubG9zdFByb3AoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmFjdGlvbj09XCJoaXRcIikvL+WmguaenOaYr+WPl+S8pOWKqOeUu++8jOS4i+S4gOW4p+aSreaUvumjnuihjOWKqOeUu1xyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QWN0aW9uKFwiZmx5XCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDop5LoibLlpLHooYBcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyBsb3N0SHAobG9zdEhwOm51bWJlcik6dm9pZCBcclxuICAgIHtcclxuICAgICAgICAvL+WHj+ihgFxyXG4gICAgICAgIHRoaXMuaHAgLT0gbG9zdEhwO1xyXG4gICAgICAgIC8v5qC55o2u6KGA6YeP5Yik5patXHJcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAwKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5pyq5q275Lqh77yM5YiZ5pKt5pS+5Y+X5Ye75Yqo55S7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUFjdGlvbihcImhpdFwiKTtcclxuICAgICAgICB9ZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5q275Lqh77yM5YiZ5pKt5pS+54iG54K45Yqo55S7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzQnVsbGV0KSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/pmpDol4/vvIzkuIvkuIDluKflm57mlLZcclxuICAgICAgICAgICAgICAgIHRoaXMudmlzaWJsZT1mYWxzZTtcclxuICAgICAgICAgICAgfWVsc2UgXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5q275Lqh5Yqo55S7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlBY3Rpb24oXCJkaWVcIik7XHJcbiAgICAgICAgICAgICAgICAvL+a3u+WKoOatu+S6oemfs+aViFxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50eXBlPT1cImhlcm9cIilcdCAgICBMYXlhLlNvdW5kTWFuYWdlci5wbGF5U291bmQoXCJzb3VuZC9nYW1lX292ZXIubXAzXCIpO1xyXG4gICAgICAgICAgICAgICAgZWxzZVx0XHQgICAgICAgICAgICAgICAgTGF5YS5Tb3VuZE1hbmFnZXIucGxheVNvdW5kKFwic291bmQvZW5lbXkxX2RpZS5tcDNcIik7XHJcbiAgICAgICAgICAgICAgICAvL+WmguaenOeisOaSnuaOieihgOatu+S6oeiAheS4jeaYr+inkuiJsuWSjOWtkOW8uVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50eXBlIT1cImhlcm9cIiYmIXRoaXMuaXNCdWxsZXQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy/lop7liqDmuLjmiI/np6/liIZcclxuICAgICAgICAgICAgICAgICAgICBNYWluLnNjb3JlKys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKuinkuiJsuatu+S6oeaOieiQveeJqeWTgSoqL1xyXG4gICAgcHJpdmF0ZSBsb3N0UHJvcCgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICBpZih0aGlzLnR5cGUhPVwiZW5lbXkzXCIpIHJldHVybjtcclxuICAgICAgICBcclxuICAgICAgICAvL+S7juWvueixoeaxoOmHjOmdouWIm+W7uuS4gOS4qumBk+WFt1xyXG4gICAgICAgIGxldCBwcm9wOlJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJyb2xlXCIsUm9sZSk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/nlJ/miJDpmo/mnLrpgZPlhbfnsbvlnotcclxuICAgICAgICBsZXQgcjpOdW1iZXI9TWF0aC5yYW5kb20oKTtcclxuICAgICAgICBsZXQgbnVtOm51bWJlcj0ocjwwLjcpPzE6MjtcclxuICAgICAgICBcclxuICAgICAgICAvL+mHjeaWsOWIneWni+WMlumBk+WFt+WxnuaApyzpmLXokKXkuLrmlYzmlrnvvIjlj6rkuI7kuLvop5Llj5HnlJ/norDmkp7vvIlcclxuICAgICAgICBwcm9wLmluaXQoXCJ1Zm9cIitudW0sMSwyLDMwLDEpO1xyXG4gICAgICAgIC8v6YGT5YW357G75Z6LXHJcbiAgICAgICAgcHJvcC5wcm9wVHlwZT1udW07XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lvLrliLbmmL7npLpcclxuICAgICAgICBwcm9wLnZpc2libGU9dHJ1ZTtcclxuICAgICAgICAvL+eUn+aIkOeahOS9jee9ruS4uuatu+S6oeiAheS9jee9rlxyXG4gICAgICAgIHByb3AucG9zKHRoaXMueCx0aGlzLnkpO1xyXG4gICAgICAgIC8v5Yqg6L295Yiw54i25a655ZmoIFxyXG4gICAgICAgIHRoaXMucGFyZW50LmFkZENoaWxkKHByb3ApO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuWQg+WIsOmBk+WFt++8jOWKoOihgOaIluWtkOW8uee6p+WIq1xyXG4gICAgICovXHRcdFxyXG4gICAgcHVibGljIGVhdFByb3AocHJvcDpSb2xlKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzosIPnlKjogIXmmK/kuLvop5LmiJZwcm9w5LiN5piv6YGT5YW377yM5YiZ6L+U5ZueXHJcbiAgICAgICAgaWYodGhpcy50eXBlIT1cImhlcm9cInx8cHJvcC5wcm9wVHlwZT09MCkgcmV0dXJuO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5re75Yqg5ZCD5by65YyW6YGT5YW36Z+z5pWIXHRcdFx0XHRcdFxyXG4gICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2FjaGlldmVtZW50Lm1wM1wiKTtcclxuICAgICAgICBcclxuICAgICAgICAvL+WQg+WtkOW8ueeusVxyXG4gICAgICAgIGlmKHByb3AucHJvcFR5cGU9PTEpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/np6/liIblop7liqBcclxuICAgICAgICAgICAgTWFpbi5zY29yZSsrO1xyXG4gICAgICAgICAgICAvL+WtkOW8uee6p+WIq+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmJ1bGxldExldmVsKytcclxuICAgICAgICAgICAgLy/lrZDlvLnmr4/ljYcy57qn77yM5a2Q5by55pWw6YeP5aKe5YqgMe+8jOacgOWkp+aVsOmHj+mZkOWItuWcqDTkuKpcclxuICAgICAgICAgICAgdGhpcy5zaG9vdE51bSA9IE1hdGgubWluKE1hdGguZmxvb3IodGhpcy5idWxsZXRMZXZlbCAvIDIpICsgMSw0KTtcclxuICAgICAgICAgICAgLy/lrZDlvLnnuqfliKvotorpq5jvvIzlj5HlsITpopHnjofotorlv6tcclxuICAgICAgICAgICAgdGhpcy5zaG9vdEludGVydmFsID0gMzAwIC0gOCAqICh0aGlzLmJ1bGxldExldmVsID4gOCA/IDggOiB0aGlzLmJ1bGxldExldmVsKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihwcm9wLnByb3BUeXBlPT0yKS8v5ZCD6KGAXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+ihgOmHj+WinuWKoFxyXG4gICAgICAgICAgICB0aGlzLmhwKz0yO1xyXG4gICAgICAgICAgICAvL+enr+WIhuWinuWKoFxyXG4gICAgICAgICAgICBNYWluLnNjb3JlKz0xO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+mBk+WFt+atu+S6oVxyXG4gICAgICAgIHByb3AuaHA9MDtcclxuICAgICAgICAvL+mBk+WFt+WQg+WujOWQjua2iOWkse+8jOS4i+S4gOW4p+WbnuaUtlxyXG4gICAgICAgIHByb3AudmlzaWJsZT1mYWxzZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLyoqXHJcbiAgICAgKiDmkq3mlL7liqjnlLsgXHJcbiAgICAgKiBAcGFyYW0gYWN0aW9uIOWKqOeUu+eKtuaAgSAgIFwiZmx5XCLjgIFcImhpdFwi44CBXCJkaWVcIlxyXG4gICAgICovXHRcclxuICAgIHB1YmxpYyBwbGF5QWN0aW9uKGFjdGlvbjpTdHJpbmcpOnZvaWRcclxuICAgIHtcclxuICAgICAgICB0aGlzLmFjdGlvbj1hY3Rpb247XHJcbiAgICAgICAgLy/mkq3mlL7op5LoibLliqjnlLssbmFtZT3op5LoibLnsbvlnotf5Yqo55S754q25oCB77yM5aaC77yaaGVyb19mbHlcclxuICAgICAgICB0aGlzLnJvbGVBbmkucGxheSgwLHRydWUsdGhpcy50eXBlK1wiX1wiK2FjdGlvbik7XHJcbiAgICB9IFxyXG4gICAgXHJcbiAgICAvKipcclxuICAgICAqIOinkuiJsuabtOaWsCzovrnnlYzmo4Dmn6VcclxuICAgICAqL1x0XHRcclxuICAgIHB1YmxpYyB1cGRhdGUoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/lpoLmnpzop5LoibLpmpDol4/vvIzop5LoibLmtojkuqHlubblm57mlLZcclxuICAgICAgICBpZighdGhpcy52aXNpYmxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy/kuLvop5LkuI3mrbvkuqHlm57mlLbvvIzlj6rpmpDol4/vvIzku6XlhY3lhbbku5blr7nosaHku6XkuLvop5Llm57lr7nosaHliJvlu7rvvIzlj5HnlJ/lvJXnlKjkv67mlLlcclxuICAgICAgICAgICAgaWYodGhpcy50eXBlIT1cImhlcm9cIikgXHR0aGlzLmRpZSgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6KeS6Imy5qC55o2u6YCf5bqm6aOe6KGMXHJcbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy/lpoLmnpznp7vliqjliLDmmL7npLrljLrln5/ku6XlpJbvvIzliJnnp7vpmaRcclxuICAgICAgICBpZiAodGhpcy50eXBlIT1cImhlcm9cIiYmKHRoaXMueSA+IDEyODArMTAwfHx0aGlzLnk8LTE1MCkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnZpc2libGU9ZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8v5Li76KeS6L6555WM5qOA5p+lXHJcbiAgICAgICAgaWYodGhpcy50eXBlPT1cImhlcm9cIilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8v6ZyA5YeP5Y676KeS6Imy5a695oiW6auY55qE5LiA5Y2K77yM5Zug5Li65ZyoSURF5Lit5Yi25L2c5Yqo55S75pe277yM5oiR5Lus5oqK6KeS6Imy55qE5Lit5b+D5YGa5Li65LqG6KeS6Imy5a+56LGh55qE5Y6f54K5XHJcbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm5bem5Y+z6LaF5Ye6XHJcbiAgICAgICAgICAgIGlmKHRoaXMueDx0aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54PXRoaXMucm9sZUFuaS53aWR0aC8yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy54PjcyMC10aGlzLnJvbGVBbmkud2lkdGgvMilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGhpcy54PTcyMC10aGlzLnJvbGVBbmkud2lkdGgvMjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpuS4iuS4i+i2heWHulxyXG4gICAgICAgICAgICBpZih0aGlzLnk8dGhpcy5yb2xlQW5pLmhlaWdodC8yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnk9dGhpcy5yb2xlQW5pLmhlaWdodC8yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy55PjEyODAtdGhpcy5yb2xlQW5pLmhlaWdodC8yKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnk9MTI4MC10aGlzLnJvbGVBbmkuaGVpZ2h0LzI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAg6KeS6Imy5bCE5Ye777yM55Sf5oiQ5a2Q5by5XHJcbiAgICAgKi9cdFx0XHJcbiAgICBwdWJsaWMgc2hvb3QoKTp2b2lkXHJcbiAgICB7XHJcbiAgICAgICAgLy/ojrflj5blvZPliY3ml7bpl7RcclxuICAgICAgICBsZXQgdGltZTpudW1iZXIgPUxheWEuQnJvd3Nlci5ub3coKSA7XHJcbiAgICAgICAgLy/lpoLmnpzlvZPliY3ml7bpl7TlpKfkuo7kuIvmrKHlsITlh7vml7bpl7RcclxuICAgICAgICBpZiAodGltZSA+dGhpcy5zaG9vdFRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL+iOt+W+l+WPkeWwhOWtkOW8ueeahOS9jee9ruaVsOe7hFxyXG4gICAgICAgICAgICBsZXQgcG9zOm51bWJlcltdID0gdGhpcy5idWxsZXRQb3NbdGhpcy5zaG9vdE51bS0xXVxyXG4gICAgICAgICAgICBmb3IobGV0IGk6bnVtYmVyID0gMCA7IGk8cG9zLmxlbmd0aCA7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgLy/mm7TmlrDkuIvmrKHlrZDlvLnlsITlh7vnmoTml7bpl7RcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvb3RUaW1lID0gdGltZSArIHRoaXMuc2hvb3RJbnRlcnZhbCA7IFxyXG4gICAgICAgICAgICAgICAgLy/ku47lr7nosaHmsaDph4zpnaLliJvlu7rkuIDkuKrlrZDlvLlcclxuICAgICAgICAgICAgICAgIGxldCBidWxsZXQ6IFJvbGUgPSBMYXlhLlBvb2wuZ2V0SXRlbUJ5Q2xhc3MoXCJyb2xlXCIsUm9sZSk7XHJcbiAgICAgICAgICAgICAgICAvL+WIneWni+WMluWtkOW8ueS/oeaBr1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmluaXQoXCJidWxsZXQyXCIsMSwtMTAsMSx0aGlzLmNhbXApXHJcbiAgICAgICAgICAgICAgICAvL+inkuiJsuexu+Wei+S4uuWtkOW8ueexu+Wei1xyXG4gICAgICAgICAgICAgICAgYnVsbGV0LmlzQnVsbGV0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIC8v5a2Q5by55raI5aSx5ZCO5Lya5LiN5pi+56S677yM6YeN5paw5Yid5aeL5YyWXHJcbiAgICAgICAgICAgICAgICBidWxsZXQudmlzaWJsZT10cnVlO1xyXG4gICAgICAgICAgICAgICAgLy/orr7nva7lrZDlvLnlj5HlsITliJ3lp4vljJbkvY3nva5cclxuICAgICAgICAgICAgICAgIGJ1bGxldC5wb3ModGhpcy54K3Bvc1tpXSwgdGhpcy55LTgwKTtcclxuICAgICAgICAgICAgICAgIC8v5re75Yqg5Yiw6KeS6Imy5bGCXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5hZGRDaGlsZChidWxsZXQpO1xyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvL+a3u+WKoOWtkOW8uemfs+aViFx0XHRcdFx0XHRcclxuICAgICAgICAgICAgICAgIExheWEuU291bmRNYW5hZ2VyLnBsYXlTb3VuZChcInNvdW5kL2J1bGxldC5tcDNcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8qKuinkuiJsuatu+S6oeW5tuWbnuaUtuWIsOWvueixoeaxoCoqL1xyXG4gICAgcHVibGljIGRpZSgpOnZvaWRcclxuICAgIHtcclxuICAgICAgICAvL+inkuiJsuWKqOeUu+WBnOatolxyXG4gICAgICAgIHRoaXMucm9sZUFuaS5zdG9wKCk7IFxyXG4gICAgICAgIC8v5Y676Zmk5omA5pyJ5Yqo55S755uR5ZCsXHJcbiAgICAgICAgdGhpcy5yb2xlQW5pLm9mZkFsbCgpO1xyXG4gICAgICAgIC8v5LuO6Iie5Y+w56e76ZmkXHJcbiAgICAgICAgdGhpcy5yZW1vdmVTZWxmKCk7XHJcbiAgICAgICAgLy/lm57mlLbliLDlr7nosaHmsaBcclxuICAgICAgICBMYXlhLlBvb2wucmVjb3ZlcihcInJvbGVcIiwgdGhpcyk7XHJcbiAgICB9XHJcbn0iLCIvKipUaGlzIGNsYXNzIGlzIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGJ5IExheWFBaXJJREUsIHBsZWFzZSBkbyBub3QgbWFrZSBhbnkgbW9kaWZpY2F0aW9ucy4gKi9cbmltcG9ydCBWaWV3PUxheWEuVmlldztcbmltcG9ydCBEaWFsb2c9TGF5YS5EaWFsb2c7XG5pbXBvcnQgU2NlbmU9TGF5YS5TY2VuZTtcbmV4cG9ydCBtb2R1bGUgdWkge1xyXG4gICAgZXhwb3J0IGNsYXNzIEdhbWVCZ1VJIGV4dGVuZHMgVmlldyB7XHJcblx0XHRwdWJsaWMgYmcxOkxheWEuSW1hZ2U7XG5cdFx0cHVibGljIGJnMjpMYXlhLkltYWdlO1xuICAgICAgICBwdWJsaWMgc3RhdGljICB1aVZpZXc6YW55ID17XCJ0eXBlXCI6XCJWaWV3XCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcInZhclwiOlwiYmcxXCIsXCJza2luXCI6XCJiYWNrZ3JvdW5kLnBuZ1wifSxcImNvbXBJZFwiOjJ9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjotMTI4MCxcInhcIjowLFwidmFyXCI6XCJiZzJcIixcInNraW5cIjpcImJhY2tncm91bmQucG5nXCJ9LFwiY29tcElkXCI6M31dLFwibG9hZExpc3RcIjpbXCJiYWNrZ3JvdW5kLnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZUJnVUkudWlWaWV3KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleHBvcnQgY2xhc3MgR2FtZU92ZXJVSSBleHRlbmRzIERpYWxvZyB7XHJcblx0XHRwdWJsaWMgYW5pX3Jlc3RhcnQ6TGF5YS5GcmFtZUFuaW1hdGlvbjtcblx0XHRwdWJsaWMgdHh0X3Njb3JlOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyBidG5fcmVzdGFydDpMYXlhLkJveDtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwic2tpblwiOlwiZ2FtZVVJL2JnLmpwZ1wiLFwic2l6ZUdyaWRcIjpcIjQsNCw0LDRcIixcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6Mn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjM3OCxcInhcIjoyMjksXCJza2luXCI6XCJnYW1lVUkvZ2FtZU92ZXIucG5nXCJ9LFwiY29tcElkXCI6M30se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6MTIwMCxcInhcIjoxOSxcIndpZHRoXCI6NjgxLFwidGV4dFwiOlwiTGF5YUFpcjEuNy4z5byV5pOO5pWZ5a2m5ryU56S654mIXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MjYsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjN2M3OTc5XCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6NX0se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6NTc1LFwieFwiOjI0NCxcIndpZHRoXCI6MTQ0LFwidGV4dFwiOlwi5pys5bGA56ev5YiG77yaXCIsXCJoZWlnaHRcIjoyOSxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjN2M3OTc5XCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6NTc1LFwieFwiOjM2MyxcIndpZHRoXCI6MTI4LFwidmFyXCI6XCJ0eHRfc2NvcmVcIixcInRleHRcIjpcIjEyMDBcIixcImhlaWdodFwiOjI5LFwiZm9udFNpemVcIjozMCxcImZvbnRcIjpcIlNpbUhlaVwiLFwiY29sb3JcIjpcIiM3Yzc5NzlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo3fSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjk2MCxcInhcIjoyMzksXCJ2YXJcIjpcImJ0bl9yZXN0YXJ0XCJ9LFwiY29tcElkXCI6MTAsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MSxcIndpZHRoXCI6MjQwLFwic3RhdGVOdW1cIjoyLFwic2tpblwiOlwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcInNpemVHcmlkXCI6XCIxMCwxMCwxMCwxMFwiLFwiaGVpZ2h0XCI6ODB9LFwiY29tcElkXCI6MTF9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjoxOCxcInhcIjo0MSxcInNraW5cIjpcImdhbWVVSS9yZXN0YXJ0LnBuZ1wifSxcImNvbXBJZFwiOjEyfV0sXCJjb21wb25lbnRzXCI6W119XSxcImFuaW1hdGlvbnNcIjpbe1wibm9kZXNcIjpbe1widGFyZ2V0XCI6MTAsXCJrZXlmcmFtZXNcIjp7XCJ5XCI6W3tcInZhbHVlXCI6OTcwLFwidHdlZW5NZXRob2RcIjpcImVsYXN0aWNPdXRcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjEwLFwia2V5XCI6XCJ5XCIsXCJpbmRleFwiOjB9LHtcInZhbHVlXCI6OTYwLFwidHdlZW5NZXRob2RcIjpcImxpbmVhck5vbmVcIixcInR3ZWVuXCI6dHJ1ZSxcInRhcmdldFwiOjEwLFwia2V5XCI6XCJ5XCIsXCJpbmRleFwiOjh9XX19XSxcIm5hbWVcIjpcImFuaV9yZXN0YXJ0XCIsXCJpZFwiOjEsXCJmcmFtZVJhdGVcIjoyNCxcImFjdGlvblwiOjB9XSxcImxvYWRMaXN0XCI6W1wiZ2FtZVVJL2JnLmpwZ1wiLFwiZ2FtZVVJL2dhbWVPdmVyLnBuZ1wiLFwiZ2FtZVVJL2J0bl9iZy5wbmdcIixcImdhbWVVSS9yZXN0YXJ0LnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZU92ZXJVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lUGxheVVJIGV4dGVuZHMgVmlldyB7XHJcblx0XHRwdWJsaWMgYnRuX3BhdXNlOkxheWEuQnV0dG9uO1xuXHRcdHB1YmxpYyB0eHRfaHA6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIHR4dF9sZXZlbDpsYXlhLmRpc3BsYXkuVGV4dDtcblx0XHRwdWJsaWMgdHh0X3Njb3JlOmxheWEuZGlzcGxheS5UZXh0O1xuXHRcdHB1YmxpYyBnYW1lUGF1c2U6TGF5YS5Cb3g7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgIHVpVmlldzphbnkgPXtcInR5cGVcIjpcIlZpZXdcIixcInByb3BzXCI6e1wid2lkdGhcIjo3MjAsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjEsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MjAsXCJ4XCI6MTAsXCJ3aWR0aFwiOjcwMCxcInNraW5cIjpcImdhbWVVSS9ibGFuay5wbmdcIixcImhlaWdodFwiOjQ1fSxcImNvbXBJZFwiOjd9LHtcInR5cGVcIjpcIkJ1dHRvblwiLFwicHJvcHNcIjp7XCJ5XCI6MjEsXCJ4XCI6NjE4LFwidmFyXCI6XCJidG5fcGF1c2VcIixcInN0YXRlTnVtXCI6MSxcInNraW5cIjpcImdhbWVVSS9idG5fcGF1c2UucG5nXCJ9LFwiY29tcElkXCI6Nn0se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6MjQsXCJ4XCI6NDEsXCJ3aWR0aFwiOjE1MCxcInZhclwiOlwidHh0X2hwXCIsXCJ0ZXh0XCI6XCJIUO+8mlwiLFwiaGVpZ2h0XCI6NDAsXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJsZWZ0XCIsXCJydW50aW1lXCI6XCJsYXlhLmRpc3BsYXkuVGV4dFwifSxcImNvbXBJZFwiOjh9LHtcInR5cGVcIjpcIlRleHRcIixcInByb3BzXCI6e1wieVwiOjI0LFwieFwiOjIyOCxcIndpZHRoXCI6MTUwLFwidmFyXCI6XCJ0eHRfbGV2ZWxcIixcInRleHRcIjpcImxldmVs77yaXCIsXCJoZWlnaHRcIjo0MCxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImxlZnRcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6OX0se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6MjQsXCJ4XCI6NDE1LFwid2lkdGhcIjoxNTAsXCJ2YXJcIjpcInR4dF9zY29yZVwiLFwidGV4dFwiOlwiU2NvcmU6XCIsXCJoZWlnaHRcIjo0MCxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImJvbGRcIjp0cnVlLFwiYWxpZ25cIjpcImxlZnRcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6MTB9LHtcInR5cGVcIjpcIkJveFwiLFwicHJvcHNcIjp7XCJ5XCI6MCxcInhcIjowLFwid2lkdGhcIjo3MjAsXCJ2aXNpYmxlXCI6ZmFsc2UsXCJ2YXJcIjpcImdhbWVQYXVzZVwiLFwiaGVpZ2h0XCI6MTI4MCxcImFscGhhXCI6MX0sXCJjb21wSWRcIjoxMyxcImNoaWxkXCI6W3tcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjowLFwieFwiOjAsXCJ3aWR0aFwiOjcyMCxcInNraW5cIjpcImdhbWVVSS9ibGFuay5wbmdcIixcInNpemVHcmlkXCI6XCIyLDIsMiwyXCIsXCJoZWlnaHRcIjoxMjgwfSxcImNvbXBJZFwiOjE1fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6NDExLFwieFwiOjExMCxcIndpZHRoXCI6NTAwLFwidmlzaWJsZVwiOnRydWUsXCJza2luXCI6XCJnYW1lVUkvYmcuanBnXCIsXCJzaXplR3JpZFwiOlwiMTAsMTAsMTAsMTBcIixcImhlaWdodFwiOjUwMH0sXCJjb21wSWRcIjoxMn0se1widHlwZVwiOlwiVGV4dFwiLFwicHJvcHNcIjp7XCJ5XCI6ODAxLFwieFwiOjE5MCxcIndpZHRoXCI6MzQwLFwidGV4dFwiOlwi54K55Ye75Lu75oSP5L2N572u57un57ut5ri45oiPXCIsXCJoZWlnaHRcIjo0NCxcImZvbnRTaXplXCI6MzAsXCJmb250XCI6XCJTaW1IZWlcIixcImNvbG9yXCI6XCIjMjMyMjIyXCIsXCJib2xkXCI6dHJ1ZSxcImFsaWduXCI6XCJjZW50ZXJcIixcInJ1bnRpbWVcIjpcImxheWEuZGlzcGxheS5UZXh0XCJ9LFwiY29tcElkXCI6MTR9LHtcInR5cGVcIjpcIkltYWdlXCIsXCJwcm9wc1wiOntcInlcIjo0NjgsXCJ4XCI6MjE0LFwic2tpblwiOlwiZ2FtZVVJL2dhbWVQYXVzZS5wbmdcIn0sXCJjb21wSWRcIjoxNn1dLFwiY29tcG9uZW50c1wiOltdfV0sXCJsb2FkTGlzdFwiOltcImdhbWVVSS9ibGFuay5wbmdcIixcImdhbWVVSS9idG5fcGF1c2UucG5nXCIsXCJnYW1lVUkvYmcuanBnXCIsXCJnYW1lVUkvZ2FtZVBhdXNlLnBuZ1wiXSxcImxvYWRMaXN0M0RcIjpbXSxcImNvbXBvbmVudHNcIjpbXX07XHJcbiAgICAgICAgY29uc3RydWN0b3IoKXsgc3VwZXIoKX1cclxuICAgICAgICBjcmVhdGVDaGlsZHJlbigpOnZvaWQge1xyXG4gICAgICAgICAgICBzdXBlci5jcmVhdGVDaGlsZHJlbigpO1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVZpZXcoR2FtZVBsYXlVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGV4cG9ydCBjbGFzcyBHYW1lU3RhcnRVSSBleHRlbmRzIERpYWxvZyB7XHJcblx0XHRwdWJsaWMgdHh0X2xvYWQ6bGF5YS5kaXNwbGF5LlRleHQ7XG5cdFx0cHVibGljIGJ0bl9zdGFydDpMYXlhLkJveDtcbiAgICAgICAgcHVibGljIHN0YXRpYyAgdWlWaWV3OmFueSA9e1widHlwZVwiOlwiRGlhbG9nXCIsXCJwcm9wc1wiOntcIndpZHRoXCI6NzIwLFwiaGVpZ2h0XCI6MTI4MH0sXCJjb21wSWRcIjoxLFwiY2hpbGRcIjpbe1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6NzIwLFwic2tpblwiOlwiZ2FtZVVJL2JnLmpwZ1wiLFwic2l6ZUdyaWRcIjpcIjQsNCw0LDRcIixcImhlaWdodFwiOjEyODB9LFwiY29tcElkXCI6Mn0se1widHlwZVwiOlwiSW1hZ2VcIixcInByb3BzXCI6e1wieVwiOjM3OCxcInhcIjoxNzksXCJza2luXCI6XCJnYW1lVUkvbG9nby5wbmdcIn0sXCJjb21wSWRcIjozfSx7XCJ0eXBlXCI6XCJUZXh0XCIsXCJwcm9wc1wiOntcInlcIjo1ODcsXCJ4XCI6MjAsXCJ3aWR0aFwiOjY4MSxcInZhclwiOlwidHh0X2xvYWRcIixcInRleHRcIjpcIua4uOaIj+i1hOa6kOWKoOi9vei/m+W6plwiLFwiaGVpZ2h0XCI6MjksXCJmb250U2l6ZVwiOjMwLFwiZm9udFwiOlwiU2ltSGVpXCIsXCJjb2xvclwiOlwiIzFjMWMxY1wiLFwiYWxpZ25cIjpcImNlbnRlclwiLFwicnVudGltZVwiOlwibGF5YS5kaXNwbGF5LlRleHRcIn0sXCJjb21wSWRcIjo0fSx7XCJ0eXBlXCI6XCJCb3hcIixcInByb3BzXCI6e1wieVwiOjk2MCxcInhcIjoyNDAsXCJ2aXNpYmxlXCI6dHJ1ZSxcInZhclwiOlwiYnRuX3N0YXJ0XCJ9LFwiY29tcElkXCI6MTAsXCJjaGlsZFwiOlt7XCJ0eXBlXCI6XCJCdXR0b25cIixcInByb3BzXCI6e1wieVwiOjAsXCJ4XCI6MCxcIndpZHRoXCI6MjQwLFwidmlzaWJsZVwiOnRydWUsXCJzdGF0ZU51bVwiOjIsXCJza2luXCI6XCJnYW1lVUkvYnRuX2JnLnBuZ1wiLFwic2l6ZUdyaWRcIjpcIjIwLDIwLDIwLDIwXCIsXCJoZWlnaHRcIjo4MH0sXCJjb21wSWRcIjo2fSx7XCJ0eXBlXCI6XCJJbWFnZVwiLFwicHJvcHNcIjp7XCJ5XCI6MTksXCJ4XCI6NDEsXCJza2luXCI6XCJnYW1lVUkvc3RhcnQucG5nXCJ9LFwiY29tcElkXCI6MTF9XSxcImNvbXBvbmVudHNcIjpbXX1dLFwibG9hZExpc3RcIjpbXCJnYW1lVUkvYmcuanBnXCIsXCJnYW1lVUkvbG9nby5wbmdcIixcImdhbWVVSS9idG5fYmcucG5nXCIsXCJnYW1lVUkvc3RhcnQucG5nXCJdLFwibG9hZExpc3QzRFwiOltdLFwiY29tcG9uZW50c1wiOltdfTtcclxuICAgICAgICBjb25zdHJ1Y3RvcigpeyBzdXBlcigpfVxyXG4gICAgICAgIGNyZWF0ZUNoaWxkcmVuKCk6dm9pZCB7XHJcbiAgICAgICAgICAgIHN1cGVyLmNyZWF0ZUNoaWxkcmVuKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVmlldyhHYW1lU3RhcnRVSS51aVZpZXcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyIl19
