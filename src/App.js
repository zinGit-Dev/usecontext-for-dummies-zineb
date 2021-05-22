
import React, { useEffect} from 'react'
import MatterOne  from './components/MatterOne'
// import MatterTwo  from './components/MatterTwo'
import Matter from 'matter-js'
//  import AddBall from "./components/AddBall"
// import BallFailure from "./components/BallFailure"
import './App.css';

function App() {
  useEffect(() => {
    let World= Matter.World
    let Engine = Matter.Engine
    let Bodies = Matter.Bodies

    let engine = Engine.create({})
    const ball = Bodies.circle(120, 20, 20, {
      restitution: 0.9,
      render: {
        fillStyle: 'blue',
      },
    })
    World.add(engine.world, ball);
  }, [onclick])
  

  return (
    <div className="App">
      <MatterOne/>
      {/* <BallFailure/> */}
      {/* <AddBall/> */}
      {/* <MatterTwo/> */}
    
   
    </div>
  );
}

export default App;
