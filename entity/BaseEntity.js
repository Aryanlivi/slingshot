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

export default class BaseEntity{
    /**
     * @type {[Matter.Body]}
     */
    bodies=[];
    /**
     * @type {number}
     */
    initial_xpos;
    /**
     * @type {number}
     */
    initial_ypos;
    init(){

    }
}