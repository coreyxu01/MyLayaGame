import Role from "./Role";
import Hero from "./Hero";
import Bullet from "./Bullet";
import Enemy from "./Enemy";
import ufo from "./ufo";
import Enemy_1 from "./Enemy_1";
import Enemy_2 from "./Enemy_2";
import Enemy_3 from "./Enemy_3";

export default class RoleFactory
{
    public static GetRole(type:string):Role
    {
        let role:Role = null;
        switch (type)
        {
            case "hero":
                role = Laya.Pool.getItemByClass(type,Hero);
                break;
            case "bullet1":
            case "bullet2":
                role = Laya.Pool.getItemByClass(type,Bullet);
                break;
            case "ufo":
                role = Laya.Pool.getItemByClass(type,ufo);
                break;
            case "enemy1":
                role = Laya.Pool.getItemByClass(type,Enemy_1);
                break;
            case "enemy2":
                role = Laya.Pool.getItemByClass(type,Enemy_2);
                break;
            case "enemy3":
                role = Laya.Pool.getItemByClass(type,Enemy_3);
                break;
            default:
                role = Laya.Pool.getItemByClass(type,Role);
        }   
       return role;
    }
}