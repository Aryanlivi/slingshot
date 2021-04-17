import * as PIXI from "pixi.js"
import Matter from "matter-js"
import Catapult from "./entity/Catapult.js"
import Stone from "./entity/Stone.js"
const World=Matter.World;
const Engine=Matter.Engine;
const Runner=Matter.Runner;
const Render=Matter.Render;
const Bodies=Matter.Bodies;
const Body=Matter.Body;
const Constraint=Matter.Constraint;
const Composite=Matter.Composite;
const Mouse=Matter.Mouse;
const MouseConstraint=Matter.MouseConstraint;
const Events=Matter.Events;

class Gameworld{
    app;
    engine;
    objects;
    constructor(){
        this.app=new PIXI.Application({
            width:800,
            height:600,
            backgroundColor:0xD3D3D3,
        });
        this.gamecanvas=document.getElementById("gamecanvas");
        //this.gamecanvas.append(this.app.view);

        this.objects=[];

        // create an engine
        this.engine = Engine.create();
        //assigning world
        this.world=this.engine.world;
        // create a renderer
        this.enginecanvas=document.getElementById("enginecanvas")
        this.render = Render.create({
            element: this.enginecanvas,
            engine: this.engine
        });
       
        // run the engine
        //Engine.run(this.engine);
        Runner.run(this.engine);
        Render.run(this.render);
        const catapult=new Catapult();
        catapult.init(300,400);
        catapult.addToWorld(this.world);
        const stone=new Stone();
        stone.init(300,400);
        stone.addToWorld(this.world);
        //this.app.ticker.add((delta)=>{this.sync()})
    }   
}
new Gameworld();