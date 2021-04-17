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
const Mouse=Matter.Mouse;
const MouseConstraint=Matter.MouseConstraint;
const Events=Matter.Events;

export default class Catapult extends BaseEntity{
    init(x,y){//300,400
        this.initial_xpos=x;
        this.initial_ypos=y;
        const catapult=Composite.create({label:"Catapult"})
        this.catapult=catapult;
        const shaft=Bodies.rectangle(this.initial_xpos,this.initial_ypos,20,200,{label:"shaft",isStatic:true});
        const crowbarBaseWidth=250;
        const crowbarBase=Bodies.rectangle(this.initial_xpos,this.initial_ypos,crowbarBaseWidth,20,{label:"crowbarBase",isStatic:true});
        const crowbarBaseOffset=crowbarBaseWidth*0.45;
        const crowbarHead=Bodies.rectangle(this.initial_xpos-crowbarBaseOffset,this.initial_ypos-10,20,50,{label:"crowbarHead",isStatic:true});
        const crowbarRestOffset=100;
        const crowbarRest=Bodies.rectangle(this.initial_xpos-crowbarBaseOffset,this.initial_ypos+crowbarRestOffset,80,20,{label:"crowbarRest",isStatic:true});
        const crowbarWeight=Bodies.rectangle(this.initial_xpos+crowbarBaseOffset,this.initial_ypos+100,50,50,{label:"crowbarWeight",isStatic:true});
        const crowbarObsOffset=50;
        const crowbarObs=Bodies.rectangle(this.initial_xpos+crowbarObsOffset,this.initial_ypos+crowbarObsOffset,30,30,{label:"crowbarObs",isStatic:true});

        const jointA=Constraint.create({
            label:"jointA",
            type:"pin",
            bodyA:shaft,
            bodyB:crowbarBase,
            stiffness:1,
            length:0,
         
        });

        const jointB=Constraint.create({
            label:"jointB",
            type:"pin",
            bodyA:crowbarBase,
            bodyB:crowbarHead,
            pointA:{x:-crowbarBaseOffset,y:0},
            stiffness:1,
            length:0,
        });

        const jointC=Constraint.create({
            label:"jointC",
            bodyA:crowbarBase,
            bodyB:crowbarWeight,
            pointA:{x:crowbarBaseOffset,y:0},
            stiffness:1,
            length:5,
        });
        
        Composite.addBody(catapult,shaft);
        Composite.addBody(catapult,crowbarBase);
        Composite.addBody(catapult,crowbarHead);
        Composite.addBody(catapult,crowbarRest);
        Composite.addBody(catapult,crowbarWeight);
        Composite.addBody(catapult,crowbarObs);
        Composite.addConstraint(catapult,jointA);
        Composite.addConstraint(catapult,jointB);
        Composite.addConstraint(catapult,jointC);
    }
    /**
     * 
     * @param {Matter.World} world 
     */
     addToWorld(world){
        World.add(world,this.catapult);
    }

}