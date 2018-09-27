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
// import GameConfig from "./GameConfig";
var WebGL = Laya.WebGL;
var Stage = Laya.Stage;
var Main = /** @class */ (function () {
    /**地图页面***/
    //private map:GameMap;
    /**游戏中界面***/
    //private play:GamePlay;
    /**游戏结束页面***/
    //private over:GameOver;
    function Main() {
        //初始化引擎，建议增加WebGl模式
        Laya.init(720, 1280, WebGL);
        //全屏不等比缩放模式
        Laya.stage.scaleMode = Stage.SCALE_EXACTFIT;
        Laya.loader.load("res/atlas/gameUI.atlas", laya.utils.Handler.create(this, this.GameStart));
    }
    Main.prototype.GameStart = function () {
        //实例化开始页面
        // this.start = new GameStart();
        var bg = new Laya.Sprite();
        bg.loadImage("background.png");
        Laya.stage.addChild(bg);
    };
    return Main;
}());
//激活启动类
new Main();
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0xheWFBaXJJREVfYmV0YS9yZXNvdXJjZXMvYXBwL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvTWFpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVkEseUNBQXlDO0FBQ3pDLElBQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDMUIsSUFBTyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUUxQjtJQUlDLFdBQVc7SUFDWCxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLHdCQUF3QjtJQUN4QixhQUFhO0lBQ2Isd0JBQXdCO0lBRXhCO1FBRUMsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksRUFBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixXQUFXO1FBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQztRQUUzQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFTyx3QkFBUyxHQUFqQjtRQUVDLFNBQVM7UUFDVCxnQ0FBZ0M7UUFFaEMsSUFBSSxFQUFFLEdBQWUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdkMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRXpCLENBQUM7SUFDRixXQUFDO0FBQUQsQ0EvQkEsQUErQkMsSUFBQTtBQUdELE9BQU87QUFDUCxJQUFJLElBQUksRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xyXG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGltcG9ydCBHYW1lQ29uZmlnIGZyb20gXCIuL0dhbWVDb25maWdcIjtcclxuaW1wb3J0IFdlYkdMID0gTGF5YS5XZWJHTDtcclxuaW1wb3J0IFN0YWdlID0gTGF5YS5TdGFnZTtcclxuXHRcclxuY2xhc3MgTWFpbiBcclxue1xyXG5cdC8qKuW8gOWni+mhtemdoioqKi9cclxuXHRwcml2YXRlIHN0YXJ0OkdhbWVTdGFydDtcclxuXHQvKirlnLDlm77pobXpnaIqKiovXHJcblx0Ly9wcml2YXRlIG1hcDpHYW1lTWFwO1xyXG5cdC8qKua4uOaIj+S4reeVjOmdoioqKi9cclxuXHQvL3ByaXZhdGUgcGxheTpHYW1lUGxheTtcclxuXHQvKirmuLjmiI/nu5PmnZ/pobXpnaIqKiovXHJcblx0Ly9wcml2YXRlIG92ZXI6R2FtZU92ZXI7XHJcblxyXG5cdGNvbnN0cnVjdG9yKCkgXHJcblx0e1xyXG5cdFx0Ly/liJ3lp4vljJblvJXmk47vvIzlu7rorq7lop7liqBXZWJHbOaooeW8j1xyXG5cdFx0TGF5YS5pbml0KDcyMCwxMjgwLFdlYkdMKTtcclxuXHRcdC8v5YWo5bGP5LiN562J5q+U57yp5pS+5qih5byPXHJcblx0XHRMYXlhLnN0YWdlLnNjYWxlTW9kZSA9IFN0YWdlLlNDQUxFX0VYQUNURklUO1xyXG5cdFx0XHJcblx0XHQgTGF5YS5sb2FkZXIubG9hZChcInJlcy9hdGxhcy9nYW1lVUkuYXRsYXNcIixsYXlhLnV0aWxzLkhhbmRsZXIuY3JlYXRlKHRoaXMsdGhpcy5HYW1lU3RhcnQpKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgR2FtZVN0YXJ0KCk6dm9pZCBcclxuXHR7XHJcblx0XHQvL+WunuS+i+WMluW8gOWni+mhtemdolxyXG5cdFx0Ly8gdGhpcy5zdGFydCA9IG5ldyBHYW1lU3RhcnQoKTtcclxuXHJcblx0XHRsZXQgYmc6TGF5YS5TcHJpdGUgPSBuZXcgTGF5YS5TcHJpdGUoKTtcclxuXHRcdGJnLmxvYWRJbWFnZShcImJhY2tncm91bmQucG5nXCIpO1xyXG5cdFx0TGF5YS5zdGFnZS5hZGRDaGlsZChiZyk7XHJcblx0XHRcclxuXHR9XHJcbn1cclxuXHJcblxyXG4vL+a/gOa0u+WQr+WKqOexu1xyXG5uZXcgTWFpbigpO1xyXG4iXX0=
