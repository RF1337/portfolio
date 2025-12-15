"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

interface CardData {
  title: string;
  copy: string;
}

interface CardProps extends CardData {
  index: number;
}

const Card = ({ title, copy, index }: CardProps) => {
  return (
    <div className="card" id={`card-${index + 1}`}>
      <div className="card-inner">
        <div className="card-content">
          <h1 className="text-white text-[clamp(32px,5vw,80px)] font-bold">{title}</h1>
          <p className="text-white my-16 text-4xl font-playfair max-w-[550px]">{copy}</p>
        </div>
        <div className="card-img">
          <img src={`/assets/card-${index + 1}.jpeg`} alt={title} />
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const cards: CardData[] = [
    {
        title: "Frontend",
        copy: "I create modern, responsive interfaces with smooth animations, clean UI, and a strong focus on user experience and performance across all devices."
        },
        {
        title: "Backend",
        copy: "I build fast, secure and scalable backend systems designed to handle real users and real data from database architecture to API design."
        },
        {
        title: "Deployment",
        copy: "I set up, host, and maintain my own production environments, focusing on reliability, stability, and smooth delivery of my applications."
        },
        {
        title: "Design",
        copy: "I design clean, intuitive interfaces and visual identities that balance aesthetics with functionality — turning ideas into polished, user-friendly experiences."
        }
  ];

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".card");

      ScrollTrigger.create({
        trigger: cards[0],
        start: "top 35%",
        endTrigger: cards[cards.length - 1],
        end: "top 30%",
        pin: ".intro",
        pinSpacing: false,
      });

      cards.forEach((card, index) => {
        const isLastCard = index === cards.length - 1;
        const cardInner = card.querySelector<HTMLElement>(".card-inner");

        if (!isLastCard && cardInner) {
          ScrollTrigger.create({
            trigger: card,
            start: "top 35%",
            endTrigger: ".outro",
            end: "top 65%",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(cardInner, {
            y: `-${(cards.length - index) * 20}vh`,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 35%",
              endTrigger: ".outro",
              end: "top 65%",
              scrub: true,
            },
          });
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <ReactLenis root>
      <div id="skills" ref={container}>
        <section className="intro">
        </section>

          <h1 className="title px-2 sm:px-4 md:px-8 mt-24 mb-8 text-[clamp(32px,5vw,96px)]">
            Skills
          </h1>
        <section className="cards">
          {cards.map((card, index) => (
            <Card key={index} {...card} index={index} />
          ))}
        </section>

        <section className="outro">
        </section>
      </div>
    </ReactLenis>
  );
}