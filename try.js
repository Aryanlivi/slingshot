import Matter, { Events } from "matter-js"
/*
function concave(){
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Vertices = Matter.Vertices,
        Bodies = Matter.Bodies;

    // provide concave decomposition support library
    Common.setDecomp(require('poly-decomp'));

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 800,
            height: 600
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    Composite.add(world, [
        // walls
        Bodies.rectangle(400, 0, 800, 50, { isStatic: true }),
        Bodies.rectangle(400, 600, 800, 50, { isStatic: true }),
        Bodies.rectangle(800, 300, 50, 600, { isStatic: true }),
        Bodies.rectangle(0, 300, 50, 600, { isStatic: true })
    ]);

    var arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50');
    var chevron = Vertices.fromPath('0 0 20 0 20 50 200 50 200 60 0 60');
        //star = Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'),
        //horseShoe = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7');

    var stack = Composites.stack(5, 5, 2, 2, 10, 10, function(x, y) {
        var color = Common.choose(['#f19648', '#f5d259', '#f55a3c', '#063e7b', '#ececd1']);
        return Bodies.fromVertices(x, y, Common.choose([arrow, chevron]), {
            render: {
                fillStyle: color,
                strokeStyle: color,
                lineWidth: 1
            }
        }, true);
    });

    Composite.add(world, stack);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });


};
concave()

*/
function catapult() {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composites = Matter.Composites,
        Constraint = Matter.Constraint,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Bodies = Matter.Bodies,
        Body = Matter.Body,
        Vector = Matter.Vector;
        var canvas=document.getElementById("mycanvas");

    // create engine
    var engine = Engine.create(),
        world = engine.world;
    // create renderer
    var render = Render.create({
        element: canvas,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            showAngleIndicator: true,
            showCollisions: true,
            showBounds: true,
            showVelocity: true
        }
    });

    Render.run(render);
    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    var group = Body.nextGroup(true);


    var catapult = Bodies.rectangle(400, 400, 320, 20, { collisionFilter: { group: group } });

    Composite.add(world, [
        catapult,
        Bodies.rectangle(400, 600, 800, 50.5, { isStatic: true, render: { fillStyle: '#060a19' } }),
        Bodies.rectangle(450, 505, 20, 50, { isStatic: true, render: { fillStyle: '#060a19' } }),
        Bodies.rectangle(400, 435, 20, 250, {collisionFilter: { group: group }, render: { fillStyle: '#060a19' } }),
        //Bodies.circle(500, 100, 50, { density: 0.5 }),
        Constraint.create({ 
            bodyA: catapult, 
            pointB: Vector.clone(catapult.position),
            stiffness: 1,
            length: 0
        })
    ]);
    canvas.addEventListener("pointerdown",()=>{
        console.log("work");
    Body.applyForce(catapult,{x:0,y:0},Vector.create(0,-1));});
    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // fit the render viewport to the scene
    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: 800, y: 600 }
    });

    // context for MatterTools.Demo
    return {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};
catapult();
