import PIXI from "pixi.js"
import Matter from "matter-js"

const World=Matter.World;
class Gameobj{
    constructor(engine,container,body,image){
        this.texture=PIXI.Texture.from(image);
        this.sprite=new PIXI.Sprite(this.texture);
        this.body=body;
        World.add(engine.world,body);
        container.addchild(this.sprite);
    }
    sync(){
        this.sprite.position.x=this.body.position.x;
        this.sprite.position.y=this.body.position.y;
        this.sprite.rotation=this.body.angle;
    }
}
