import BaseEntity from "./BaseEntity.js"
import Matter from "matter-js"
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

export default class Stone extends BaseEntity{
    size;
    weight;
    init(size,weight,x,y){
        this.initial_xpos=x;
        this.initial_ypos=y;
        this.size=size;
        this.weight=weight;
        const circle=Bodies.circle(this.initial_xpos,this.initial_ypos,this.size,{isStatic:true});
        this.bodies.push(circle);
    }
    /**
     * 
     * @param {Matter.World} world 
     */
    addToWorld(world){
        World.add(world,this.bodies);
    }
}