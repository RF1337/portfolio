"use client";

import { useEffect, useRef } from "react";
import Matter, { Mouse, MouseConstraint } from "matter-js";

export default function FooterPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { width, height } = sceneRef.current.getBoundingClientRect();

    // Aliases
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

    // Create engine
    const engine = Engine.create();

    // Create renderer attached to the div
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });

    // Circles + surroundings
    const circleA = Bodies.circle(200, 0, 80, {
      render: {
        sprite: {
          texture: "next.svg",
          xScale: 0.8,
          yScale: 0.8,
        },
      },
    });
    const circleB = Bodies.circle(450, 0, 80);
    const wallThickness = 100;

    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, { isStatic: true });
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, { isStatic: true, render: { visible: false } });
    const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });
    const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, { isStatic: true });

    Composite.add(engine.world, [ground, ceiling, wallLeft, wallRight, circleA, circleB]);

    // ⭐ Make bodies draggable
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Composite.add(engine.world, mouseConstraint);

    // Keep mouse in sync with renderer
    render.mouse = mouse;

    // run
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <div
      ref={sceneRef}
      className="w-full h-full overflow-hidden"
    ></div>
  );
}