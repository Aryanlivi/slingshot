import Matter, { Vector } from "matter-js"
import BaseEntity from "./BaseEntity.js"

const World=Matter.World;
const Engine=Matter.Engine;
const Runner=Matter.Runner;
const Render=Matter.Render;
const Bodies=Matter.Bodies;
const Body=Matter.Body;
const Constraint=Matter.Constraint;
const Composite=Matter.Composite;
const Vertices=Matter.Vertices;
const Mouse=Matter.Mouse;
const MouseConstraint=Matter.MouseConstraint;
const Events=Matter.Events;
const Common=Matter.Common;
const Bounds=Matter.Bounds;
export default class Catapult extends BaseEntity{
    init(x,y){//300,400
        let group=Body.nextGroup(true);
        let group2=Body.nextGroup(false);
        this.initial_xpos=x;
        this.initial_ypos=y;
        //Common.setDecomp(require('poly-decomp'));

        const catapult=Composite.create({label:"Catapult"})
        this.catapult=catapult;
        const shaft=Bodies.rectangle(this.initial_xpos,this.initial_ypos,20,200,{
            collisionFilter:{
                group:group
            },
            label:"shaft",
            isStatic:true
        });
        /*
        const crowbarBaseWidth=300;
        const crowbarBaseOffset=crowbarBaseWidth*0.6;
        const pointA={x:this.initial_xpos-crowbarBaseOffset,y:this.initial_ypos-50};
        const pointB={x:this.initial_xpos-crowbarBaseOffset+20,y:this.initial_ypos-50};
        const pointC={x:this.initial_xpos-crowbarBaseOffset+20,y:this.initial_ypos};
        const pointD={x:this.initial_xpos+crowbarBaseOffset,y:this.initial_ypos};
        const pointE={x:this.initial_xpos+crowbarBaseOffset,y:this.initial_ypos+20};
        const pointF={x:this.initial_xpos-crowbarBaseOffset,y:this.initial_ypos+20};
        const points=[pointA,pointB,pointC,pointD,pointE,pointF];
        const crowbarBase=Bodies.fromVertices(this.initial_xpos,this.initial_ypos,points,{
            collisionFilter:{
                group:group
            },
            label:"crowbarBase"
        });
        */
       
        const crowbarBaseWidth=450;
        const crowbarBaseOffset=crowbarBaseWidth*0.45;
        const crowbarBase_vertices= Vertices.fromPath('0 0 20 0 20 40 450 40 450 60 0 60');
        /*
        const crowbarBase=Bodies.fromVertices(this.initial_xpos-100,this.initial_ypos,crowbarBase_vertices,
        { 
            collisionFilter:{
                group:group
            },
            label:"crowbarBase",
            isSleeping:true,
            isStatic:false
            
        });
        Body.setCentre(crowbarBase,Vector.create(20,0),true);
        */
        const pointA={x:0,y:50};
        const pointB={x:20,y:50};
        const pointC={x:20,y:0};
        const pointD={x:0,y:0};
        const bound=Bounds.create(pointA,pointB,pointC,pointD);
        
        const crowbarBase=Bodies.rectangle(this.initial_xpos,this.initial_ypos,450,30,{
        collisionFilter:{
            group:group
        },
        label:"crowbarBase",
        isSleeping:true,
        isStatic:false,
        bounds:bound
        
        });
        this.crowbarBase=crowbarBase
        const crowbarRestOffset=50;
        const crowbarRest=Bodies.rectangle(this.initial_xpos-150,this.initial_ypos+100,10,10,{
            label:"crowbarRest",
            isStatic:true
        });
        const crowbarWeight=Bodies.rectangle(this.initial_xpos+crowbarBaseOffset,this.initial_ypos+100,50,50,{
            collisionFilter:{
                group:group2
            },
            label:"crowbarWeight",
            isSleeping:true,
            inertia:Infinity
        });
        this.crowbarWeight=crowbarWeight;
        const crowbarObsOffset=100;
        const crowbarObs=Bodies.rectangle(this.initial_xpos-30,this.initial_ypos-80,30,30,{
            collisionFilter:{
                group:group2
            },
            label:"crowbarObs",
            //isSensor:true,
            isStatic:true
        });

        const jointA=Constraint.create({
            label:"jointA",
            bodyA:crowbarBase,
            pointB: Vector.clone(crowbarBase.position),
            //pointB:{x:50,y:5},
            stiffness:1,
            length:0,
        });
        
        const jointB=Constraint.create({
            label:"jointB",
            type:"line",
            bodyA:crowbarRest,
            bodyB:crowbarBase,
            pointA:{x:0,y:0},
            pointB:{x:-190,y:0},
            stiffness:1,
            length:80,
        });
        this.jointB=jointB;
        const jointC=Constraint.create({
            label:"jointC",
            bodyA:crowbarBase,
            bodyB:crowbarWeight,
            pointA:{x:crowbarBaseOffset,y:0},
            stiffness:1,
            length:200,
        });
        this.jointC=jointC;
        
        Composite.addBody(catapult,shaft);
        Composite.addBody(catapult,crowbarBase);
        Composite.addBody(catapult,crowbarRest);
        Composite.addBody(catapult,crowbarWeight);
        Composite.addBody(catapult,crowbarObs);
        Composite.addConstraint(catapult,jointA);
        //Composite.addConstraint(catapult,jointB);
        Composite.addConstraint(catapult,jointC);
    }
    fire(){
        Body.setDensity(this.crowbarWeight,0.09);
        Composite.removeConstraint(this.catapult,this.jointB);
    }
    /**
     * 
     * @param {Matter.World} world 
     */
    addToWorld(world){
        World.add(world,this.catapult);
    }

}