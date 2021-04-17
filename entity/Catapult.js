import Matter from "matter-js"
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

export default class Catapult extends BaseEntity{
    init(x,y){//300,400
        let group=Body.nextGroup(true);
        this.initial_xpos=x;
        this.initial_ypos=y;
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
        const crowbarBaseWidth=300;
        const crowbarBase=Bodies.rectangle(this.initial_xpos,this.initial_ypos,crowbarBaseWidth,20,{
            collisionFilter:{
                group:group
            },
            label:"crowbarBase",
            isSleeping:true
        });
        const crowbarBaseOffset=crowbarBaseWidth*0.5;

        const crowbarHead=Bodies.rectangle(this.initial_xpos-crowbarBaseOffset,this.initial_ypos,10,50,{
            label:"crowbarHead",
            isSleeping:true,
            inertia:Infinity
        });
        
        const compoundA=Body.create({
            parts:[crowbarBase,crowbarHead]
        })
        
        const crowbarRestOffset=90;
        const crowbarRest=Bodies.rectangle(this.initial_xpos-crowbarBaseOffset,this.initial_ypos+crowbarRestOffset,80,20,{
            label:"crowbarRest",
            isSleeping:true
        });
        const crowbarWeight=Bodies.rectangle(this.initial_xpos+crowbarBaseOffset,this.initial_ypos+100,50,50,{
            collisionFilter:{
                group:group
            },
            label:"crowbarWeight",
            isSleeping:true,
            density:0.0000001
        });
        this.crowbarWeight=crowbarWeight;
        const crowbarObsOffset=50;
        const crowbarObs=Bodies.rectangle(this.initial_xpos+crowbarBaseOffset,this.initial_ypos+crowbarObsOffset,30,30,{
            label:"crowbarObs",
            isSleeping:true
        });

        const jointA=Constraint.create({
            label:"jointA",
            type:"pin",
            bodyA:shaft,
            bodyB:compoundA.parts[0],
            stiffness:1,
            length:0,
         
        });
        /*
        const jointB=Constraint.create({
            label:"jointB",
            bodyA:compoundA.parts[0],
            bodyB:compoundA.parts[1],
            pointA:{x:-crowbarBaseOffset,y:0},
            pointB:{x:0,y:25},
            stiffness:1,
            length:0,
        });
        /*
        const jointD=Constraint.create({
            label:"jointD",
            bodyA:crowbarBase,
            bodyB:crowbarHead,
            pointA:{x:-crowbarBaseOffset,y:0},
            pointB:{x:0,y:25},
            stiffness:1,
            length:0,
        });
        */
        
        const jointC=Constraint.create({
            label:"jointC",
            bodyA:crowbarBase,
            bodyB:crowbarWeight,
            pointA:{x:crowbarBaseOffset,y:0},
            stiffness:1,
            length:80,
        });
        
        Composite.addBody(catapult,shaft);
        //Composite.addBody(catapult,crowbarBase);
        //Composite.addBody(catapult,crowbarHead);
        Composite.addBody(catapult,compoundA);
        Composite.addBody(catapult,crowbarRest);
        Composite.addBody(catapult,crowbarWeight);
        Composite.addBody(catapult,crowbarObs);
        Composite.addConstraint(catapult,jointA);
        //Composite.addConstraint(catapult,jointB);
        Composite.addConstraint(catapult,jointC);
    }
    fire(){
        Body.setDensity(this.crowbarWeight,0.1);
    }
    /**
     * 
     * @param {Matter.World} world 
     */
    addToWorld(world){
        World.add(world,this.catapult);
    }

}