//初始化整个游戏的精灵，作为游戏开始的路口
import {ResourcesLoader} from "./js/base/ResourcesLoader.js";

export class Main {
    //构造方法
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        const loader = ResourcesLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));

        let image = new Image();
        image.src = '../res/background.png';

        image.onload = () => {
            this.ctx.drawImage(
              image,//图片对象
              0,//剪裁x起始位置（从图片左上角开始）
              0,//剪裁y起始位置
              image.width,//需要剪裁大小
              image.height,//需要剪裁大小
              0,//放置在图片的x位置
              0,//放置在图片的y位置
              image.width,//图片使用大小
              image.height
            );
        };
    }

    onResourceFirstLoaded(map) {
        console.log(map);
    }
}