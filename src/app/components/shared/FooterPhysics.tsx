"use client";

import { useEffect, useRef } from "react";
import Matter, { Mouse, MouseConstraint } from "matter-js";

export default function FooterPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { width, height } = sceneRef.current.getBoundingClientRect();

    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Events = Matter.Events;
    const Query = Matter.Query;

    const engine = Engine.create();

    const render = Render.create({
      element: sceneRef.current,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
      },
    });

    // ----------------------
    // Load TWO SVGs
    // ----------------------
    const svgConversation = new Image();
    svgConversation.src = "/assets/conversation.svg";

    const svgEmail = new Image();
    svgEmail.src = "/assets/email.svg";

    // ----------------------
    // SHAPES — CIRLCES
    // ----------------------
    const circleA = Bodies.circle(300, 0, 90, {
      render: { fillStyle: "#3b82f6" },
      label: "circleConversation",
    });

    const circleB = Bodies.circle(500, 0, 90, {
      render: { fillStyle: "#10b981" },
      label: "circleEmail",
    });

    // ----------------------
    // OVALS WITH TEXT
    // ----------------------
    const ovalA = Bodies.rectangle(500, 0, 400, 170, {
      chamfer: { radius: 85 },
      render: { fillStyle: "#f59e0b" },
      label: "ovalA",
    }) as Matter.Body & { labelText?: string };
    ovalA.labelText = "Hit me up!";

    const ovalB = Bodies.rectangle(700, 0, 300, 170, {
      chamfer: { radius: 85 },
      render: { fillStyle: "#ec4899" },
      label: "ovalB",
    }) as Matter.Body & { labelText?: string };
    ovalB.labelText = "Let's talk";

    const ovalC = Bodies.rectangle(900, 0, 500, 170, {
      chamfer: { radius: 85 },
      render: { fillStyle: "#8b5cf6" },
      label: "ovalC",
    }) as Matter.Body & { labelText?: string };
    ovalC.labelText = "Send a message";

    const shapes = [circleA, circleB, ovalA, ovalB, ovalC];

    // Walls
    const wallThickness = 200;

    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, {
      isStatic: true,
    });
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, {
      isStatic: true,
      render: { visible: false },
    });
    const wallLeft = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
      isStatic: true,
    });
    const wallRight = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, {
      isStatic: true,
    });

    Composite.add(engine.world, [ground, ceiling, wallLeft, wallRight, ...shapes]);

    // Dragging
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    const canvas = render.canvas;

    Events.on(engine, "afterUpdate", () => {
      const hovered = Query.point(shapes, mouse.position);
      canvas.style.cursor = hovered.length > 0 ? "pointer" : "default";
    });

    // Click detection
    let mouseDownPos = { x: 0, y: 0 };
    let isDragging = false;

    Events.on(mouseConstraint, "startdrag", () => {
      mouseDownPos = { x: mouse.position.x, y: mouse.position.y };
      isDragging = false;
      canvas.style.cursor = "grabbing";
    });

    Events.on(mouseConstraint, "mousemove", () => {
      if (mouseConstraint.body) {
        const dx = mouse.position.x - mouseDownPos.x;
        const dy = mouse.position.y - mouseDownPos.y;
        if (Math.sqrt(dx * dx + dy * dy) > 5) isDragging = true;
      }
    });

    Events.on(mouseConstraint, "enddrag", (event: any) => {
      const body = event.body;

      if (!isDragging && shapes.includes(body)) {
        window.location.href = "mailto:rasmusferst@gmail.com";
      }

      canvas.style.cursor = "pointer";
    });

    // ----------------------
    // RENDER — SVG + TEXT
    // ----------------------
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      shapes.forEach((body) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);

        // Draw SVG for circle A
        if (body.label === "circleConversation" && svgConversation.complete) {
          ctx.drawImage(svgConversation, -40, -40, 80, 80);
        }

        // Draw SVG for circle B
        if (body.label === "circleEmail" && svgEmail.complete) {
          ctx.drawImage(svgEmail, -40, -40, 80, 80);
        }

        // Draw TEXT for ovals
        if ((body as any).labelText) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "bold 55px Arial";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText((body as any).labelText!, 0, 0);
        }

        ctx.restore();
      });
    });

    // Run
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
    };
  }, []);

  return <div ref={sceneRef} className="w-full h-full overflow-hidden" />;
}
