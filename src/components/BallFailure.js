import React from "react";
import ReactDOM from "react-dom";
import Matter  from "matter-js";

import "./styles.css";

function cradles() {
  var Engine = Matter.Engine,
    World = Matter.World,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Body = Matter.Body,
    Render = Matter.Render;

  var engine = Engine.create();
  var world = engine.world;
  // create a renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      wireframes: false,
      background: "#0f0f00"
    }
  });
  // run the engine
  Engine.run(engine);
  // run the renderer
  Render.run(render);

  var cradle = Composites.newtonsCradle(280, 100, 5, 40, 200);
  World.add(world, cradle);
  Body.translate(cradle.bodies[0], { x: -180, y: -100 });
  //Body.setAngle(cradle.bodies[4],180);
  // add mouse control
  var mouse = Mouse.create(render.canvas),
  mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.8,
     // length:50,
     // pointA:(10,20),
      render: {
        visible: false,
        type:'pin',
        lineWidth:10,
        //anchors:true
      }
    }
  });
  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  /* render.mouse = mouse;
  Render.lookAt(render, {
    min: { x: 50, y: 90 },
    max: { x: 800, y: 600 }
}); */

}
function loader(){
  var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Events = Matter.Events,
  Body = Matter.Body,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  Composites = Matter.Composites,
  Common = Matter.Common,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  World = Matter.World;

  // create engine
  var engine = Engine.create(),
      world = engine.world;
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: 800,
      height: 600,
      wireframes: false
    }
  });
  Render.run(render);
   // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);
  /*******events */
 /*  Events.on(world, 'beforeAdd', function(event) {
        console.log('added to world:', event.object);
  }); */
  Events.on(engine, 'beforeUpdate', function(event) {
    var engine = event.source;

    // apply random forces every 5 secs
    if (event.timestamp % 5000 < 50)
       shakeScene(engine);
       engine.enableSleeping=true;
  });
  Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    // change object colours to show those ending a collision
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];

        pair.bodyA.render.fillStyle = '#222';
        pair.bodyB.render.fillStyle = '#222';
    }
  });

  /*****scene */
  var bodyStyle = { fillStyle: '#222' };

  // scene code
  World.add(world, [
      Bodies.rectangle(400, 0, 800, 50, { isStatic: true, render: bodyStyle }),
      Bodies.rectangle(400, 600, 800, 50, { isStatic: true, render: bodyStyle }),
      Bodies.rectangle(800, 300, 50, 600, { isStatic: true, render: bodyStyle }),
      Bodies.rectangle(0, 300, 50, 600, { isStatic: true, render: bodyStyle })
  ]);
  var stack = Composites.stack(70, 100, 9, 4, 50, 50, function(x, y) {
    return Bodies.circle(x, y, 15, { restitution: 1, render: bodyStyle });
  });
  World.add(world, stack); 
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

World.add(world, mouseConstraint);
Events.on(mouseConstraint, 'mousedown', function(event) {
  var mousePosition = event.mouse.position;
  console.log('mousedown at ' + mousePosition.x + ' ' + mousePosition.y);
  shakeScene(engine);
});

var shakeScene = function(engine) {
        var bodies = Composite.allBodies(engine.world);

        for (var i = 0; i < bodies.length; i++) {
            var body = bodies[i];

            if (!body.isStatic && body.position.y >= 500) {
                var forceMagnitude = 0.02 * body.mass;

                Body.applyForce(body, body.position, { 
                    x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]), 
                    y: -forceMagnitude + Common.random() * -forceMagnitude
                });
            }
        }
};

}
function App() {
  return (
    <div className="App">
      <div className="cntr">
        {loader()}        
        {cradles()}
        
      </div>
    </div>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

