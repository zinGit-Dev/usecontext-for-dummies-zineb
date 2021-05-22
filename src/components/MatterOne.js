            import React, { useEffect, useRef } from 'react'
            import Matter from 'matter-js'

            export default function MatterOne()  {

              const boxRef = useRef(null)
              const canvasRef = useRef(null)

              useEffect(() => {
                let Engine = Matter.Engine
                let Render = Matter.Render
                let World = Matter.World
                let Bodies = Matter.Bodies

                let engine = Engine.create({})

                let render = Render.create({
                  element: boxRef.current,
                  engine: engine,
                  canvas: canvasRef.current,
                  options: {
                    width: 1500,
                    height: 1000,
                    background: '#95B3BF',
                    wireframes: false,
                  },
                })

                const floor = Bodies.rectangle(150, 800, window.innerWidth, 20, {
                  isStatic: true,
                  render: {
                    fillStyle: '#253C59',
                  },
                })

                const ball = Bodies.circle(120, 20, 20, {
                  restitution: 0.9,
                  render:  
                  {
                    fillStyle: '#BFA004',
                          }
                })
                const ball2 = Bodies.circle(120, 40, 40, {
                  restitution:0.9,
                  render: {
                    fillStyle: '#5A798C',
                  },
                })

                World.add(engine.world, [floor, ball,ball2])

                Engine.run(engine)
                Render.run(render)
              
              }, [])
              

              return (
                <div
                  ref={boxRef}
                  style={{
                    border: '1px solid white',
                    width: 300,
                    height: 300,
                  }}
                >
                  <canvas ref={canvasRef} />

                </div>
              )
            }

         //ver el la respuesta final en este link para convertir los ball en pictures
         //https://stackoverflow.com/questions/45066995/sprite-image-not-appearing-on-matter-js