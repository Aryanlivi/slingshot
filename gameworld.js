import * as PIXI from "pixi.js"
import Matter from "matter-js"
import Gameobj from "./gameobj.js"

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

class Slingshot{
    main_body;
    wood;
    ball;
    jointA;
    jointB;
    handle;
    weight;
    newball;
    ball_array=[];
    constructor(posx,posy,ball_radius){//300,200,30
       let group= Body.nextGroup(true);
       const wood_width=20;
       const wood_height=150;
       this.main_body=Composite.create({label:"slingshot"});
       this.wood=Bodies.rectangle(posx,posy,wood_width,wood_height,{
        collisionFilter:{
            group:group
        },
        isStatic:true,
        label:"wood"
        }
        );
       this.ball=Bodies.circle(posx-100,posy,ball_radius,{
        collisionFilter:{
            group:group
        },
        isSleeping:true,
        label:"ball"
        }
        );
        this.ball_array.push(this.ball);
       const handle_width=250;
       this.handle=Bodies.rectangle(posx,posy,handle_width,10,{
           collisionFilter:{
            group:group
           },
           isSleeping:true,
           //isStatic:true,
           label:"handle"
          
       });
       Body.rotate(this.handle,Math.PI);
       this.weight=Bodies.rectangle(posx+80,posy-50,50,50,{
           collisionFilter:{
               group:group
           },
           isStatic:true,
           isSleeping:true,
           density:0.02
           
       });
       const joint_offsetA=-50;
       this.jointA=Constraint.create({
           bodyA:this.wood,
           bodyB:this.handle,
           pointA:{x:0,y:joint_offsetA},
           pointB:{x:-joint_offsetA,y:0},
           
        angleAStiffness: 1,
        angleAMin: -0.5,
        angleAMax: 0.5,
           stiffness:1,
           length:0,
           render:{
               type:"pin"
           }
       });
       const rope_length=80;
       const joint_offsetB=handle_width*0.5;
       this.jointB=Constraint.create({
           bodyA:this.handle,
           bodyB:this.ball,
           pointA:{x:-joint_offsetB,y:0},
           pointB:{x:0,y:0},
           stiffness:1,
           length:rope_length
       });
       
       this.jointC=Constraint.create({
        bodyA:this.handle,
        bodyB:this.weight,
        pointA:{x:joint_offsetB,y:0},
        pointB:{x:0,y:0},
        stiffness:1,
        length:rope_length
    });
    this.sensor_box=Bodies.rectangle(posx-50,posy+110,50,50,{
        isSensor:true,
        isStatic:true,
        label:"sensor_box";
    });
       Composite.addBody(this.main_body,this.wood);
       Composite.addBody(this.main_body,this.handle);
       Composite.addBody(this.main_body,this.ball);
       Composite.addBody(this.main_body,this.weight);
       Composite.addConstraint(this.main_body,this.jointA);
       Composite.addConstraint(this.main_body,this.jointB);
       Composite.addConstraint(this.main_body,this.jointC);
    }
    recreate(posx,posy,ball_radius){
        let group= Body.nextGroup(true);
        this.newball=this.ball=Bodies.circle(posx-100,posy,ball_radius,{
            collisionFilter:{
                group:group
            },
            isSleeping:true,
            label:"ball"
            });
        this.jointB.bodyB=this.newball;
        this.ball_array.push(this.newball);
    }
    
}
class Gameworld{
    app;
    engine;
    objects;
    constructor(){
        this.app=new PIXI.Application({
            width:800,
            height:600,
            backgroundColor:0xD3D3D3,
        })
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
        const mouse=Mouse.create(this.enginecanvas);
        const mouseconstraint=MouseConstraint.create(this.engine,{
            mouse:mouse,
            constraint:{
                render:{visible:false}
            }
        })
        this.render.mouse=mouse;
        World.add(this.engine.world,mouseconstraint);
        this.setup();
        this.enginecanvas.addEventListener("pointerdown",()=>{this.myevent()});
        this.enginecanvas.addEventListener("pointerup",()=>{this.event2()});

        //this.app.ticker.add((delta)=>{this.sync()})
    }   
    sync(){
        this.objects.forEach((e)=>{e.sync()});
    }
    myevent(){  
        Body.setStatic(this.slingshot.weight,false);
        Body.setStatic(this.slingshot.handle,false);
        console.log("1");
    }
    event2(){
            console.log("2");
            World.remove(this.world,[this.slingshot.jointB]);
            Body.setDensity(this.slingshot.weight,0.001);
            Body.applyForce(this.slingshot.ball,{x:0,y:0},{x:0.1,y:0});
            //console.log(this.slingshot.handle.position);
            Body.applyForce(this.slingshot.handle,{x:-250*0.5,y:0},{x:-0.1,y:0});
            Events.on(this.engine,"collisionStart",(e)=>{
                if(e.pairs[0].bodyB==this.slingshot.sensor_box && e.pairs[0].bodyA==this.slingshot.handle){
                    Body.setStatic(this.slingshot.handle,true);
                    Body.setDensity(this.slingshot.weight,0.02);
                    this.slingshot.recreate(250,400,25);
                    World.add(this.world,[this.slingshot.newball,this.slingshot.jointB]); 
                }
        });
        /*
        Events.on(this.engine,"collisionStart",(e)=>{
            if(e.pairs[0].bodyB==this.slingshot.sensor_box){
                console.log("dasd")
                this.slingshot.recreate(250,400,25);
                this.slingshot.jointB.bodyA=this.slingshot.handle; 
                this.slingshot.jointB.bodyB=this.slingshot.ball; 
                World.add(this.world,[this.slingshot.ball,this.slingshot.jointB]);
                addball=false;
                return;
            };
        });
        */
    }
    bodychange(){
        
        if(click_count==0){
            const rotational_force=0.14;
            Body.applyForce(this.slingshot.handle,{x:0,y:0},{x:rotational_force,y:0});
            click_count++;
        }
        
        //temp.forEach((e)=>{console.log(e.collided)});
          
        /*
        else if(click_count==1){
            //this.slingshot.jointB.bodyB=this.slingshot.handle;
            World.remove(this.world,this.slingshot.jointB);
            Body.applyForce(this.slingshot.ball,{x:0,y:0},{x:0.1,y:0});
            this.slingshot.recreate(250,400,25);
            this.slingshot.jointB.bodyB=this.slingshot.ball; 
            World.add(this.world,[this.slingshot.ball,this.slingshot.jointB]);
            click_count=0;
        }
        */
        return;
    }
    setup(){
        const ground_body1 = Bodies.rectangle(405, this.app.renderer.height - 30, 810, 60, { isStatic: true,label:"ground"});
        this.slingshot=new Slingshot(250,400,25);
        World.add(this.world,[ground_body1,this.slingshot.sensor_box,this.slingshot.wood,this.slingshot.handle,this.slingshot.ball,this.slingshot.weight,this.slingshot.jointA,this.slingshot.jointB,this.slingshot.jointC]);
    }
}
new Gameworld();  