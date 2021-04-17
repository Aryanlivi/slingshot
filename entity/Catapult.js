import { Body } from "matter-js"
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
    compositeParts=[];
    init(x,y){//300,400
        this.initial_xpos=x;
        this.initial_ypos=y;
        const catapult=Composite.create({label:"Catapult"})
        const shaft=Bodies.rectangle(this.initial_xpos,this.initial_ypos,20,100);
        const crowbarBaseWidth=250;
        const crowbarBase=Bodies.rectangle(this.initial_xpos,this.initial_ypos,crowbarBaseWidth,20);
        const crowbarBaseOffset=crowbarBaseWidth*0.5;
        const crowbarHead=Bodies.rectangle(this.initial_xpos-crowbarBaseOffset,this.initial_ypos,20,20);
        const crowbarRestOffset=100;
        const crowbarRest=Bodies.rectangle(this.initial_xpos-crowbarBaseOffset,this.initial_ypos+crowbarRestOffset,80,20);
        const crowbarWeight=Bodies.rectangle(crowbarBaseOffset,this.initial_ypos,100,100);
        const crowbarObsOffset=50;
        const crowbarObs=Bodies.rectangle(this.initial_xpos+crowbarObsOffset,this.initial_ypos+crowbarObsOffset,30,30);

        const jointA=Constraint.create({
            type:"pin",
            bodyA:shaft,
            bodyB:crowbarBase,
            stiffness:1,
            length:0,
        });

        const jointB=Constraint.create({
            bodyA:crowbarBase,
            bodyB:crowbarHead,
            pointA:{x:-crowbarBaseOffset,y:0},
            stiffness:1,
            length:0,
        });

        const jointC=Constraint.create({
            bodyA:crowbarBase,
            bodyB:crowbarWeight,
            pointA:{X:crowbarBaseOffset,y:0},
            stiffness:1,
            length:5,
        });
        
        this.compositeParts.push(shaft,crowbarBase,crowbarHead,crowbarRest,crowbarWeight,crowbarObs,jointA,jointB,jointC);
        for(let loop=0;loop<=this.compositeParts.length;loop++){
            Composite.add(catapult,this.compositeParts[i]);
        };
    }
}