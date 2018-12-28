//导演类，控制游戏的逻辑
import {DataStore} from "./base/DataStore.js";
import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director {
    //单例
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
        this.landSpeed = 2;
    }

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    run() {
        if(!this.isGameOver){
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            //铅笔的第一组,铅笔的宽度加上左侧的x坐标小于0了， 就相当于到了左边界
            if(pencils[0].x + pencils[0].width <= 0 &&
                pencils.length === 4){
                //把数组的第一个元素推出，并数组个数减一
                pencils.shift();
                pencils.shift();
            }

            //当一个屏内只有一组时候，会随机创建一组铅笔
            if(pencils[0].x <= (window.innerWidth-pencils[0].width) / 2 &&
                pencils.length === 2){
                this.createPencil();
            }

            //绘制pencil
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });

            this.dataStore.get('land').draw();

            this.dataStore.get('birds').draw();


            //在浏览器刷新之前执行
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer', timer);
        }else {
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destroy();
        }

    }
}