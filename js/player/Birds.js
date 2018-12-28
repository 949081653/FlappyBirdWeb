//小鸟类
//循环渲染三只小鸟
//渲染图片的三个部分，循环渲染
import {Sprite} from "../base/Sprite.js";

export class Birds extends Sprite{

    constructor() {
        const image = Sprite.getImage('birds');
        super(image,0,0,image.width,image.height,
            0,0,image.width,image.height);
    }

}