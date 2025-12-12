"use client";
import { use, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

type CardProps = {
    title: string;
    description: string;
    index: number;
}

const Card = ({ title, description, index }: CardProps) => {
    return (
        <div className="card" id={`card-${index + 1}`}>
            <div className="card-inner">
                <div className="card-content">
                    <h1 className="text-6xl font-extrabold mb-4">{title}</h1>
                    <p className="text-4xl font-medium font-playfair max-w-[550px]">{description}</p>
                </div>
                <div className="card-img">
                    <img src="assets/projects/booking-project.webp" alt={title} />
                </div>
            </div>
        </div>
    );
}

export default function SkillsSection() {
    const cards = [
        {
        title: "Frontend",
        description: "I create modern, responsive interfaces with smooth animations, clean UI, and a strong focus on user experience and performance across all devices."
        },
        {
        title: "Backend",
        description: "I build fast, secure and scalable backend systems designed to handle real users and real data from database architecture to API design."
        },
        {
        title: "Deployment",
        description: "I set up, host, and maintain my own production environments, focusing on reliability, stability, and smooth delivery of my applications."
        },
        {
        title: "Design",
        description: "I design clean, intuitive interfaces and visual identities that balance aesthetics with functionality — turning ideas into polished, user-friendly experiences."
        }
    ]

    const container = useRef(null);

    useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".card");


            ScrollTrigger.create({
                trigger: cards[0],
                start: "top 35%",
                endTrigger: cards[cards.length - 1],
                end: "bottom 65%",
                pin: ".intro",
                pinSpacing: false,
            });

            cards.forEach((card, i) => {
                const isLastCard = i === cards.length - 1;
                const cardInner = card.querySelector(".card-inner");
                
                if (!isLastCard) {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top 35%",
                        endTrigger: ".outro",
                        end: "top 65%",
                        pin: true,
                        pinSpacing: false,
                    });
                }
            });
            },
            { scope: container}
        );

    return (
        <section className="cards" ref={container}>
                    {/* INTRO SECTION */}
        <div className="mt-24">
            <h1 className="text-7xl font-bold mb-4 px-8">Skills</h1>
        </div>
        <div className="intro">

        </div>
            {cards.map((card, index) => (
                <Card key={index} {...card} index={index} />
            ))}

                    {/* INTRO SECTION */}
        <div className="outro">
        </div>
        </section>
    );
}