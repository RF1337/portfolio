"use client";
import AnimatedText from "./AnimatedText";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutSection() {
    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (!textRef.current) return;

        // Split into words
        const split = new SplitText(textRef.current, {
            type: "words",
            wordsClass: "word"
        });

        gsap.fromTo(
            split.words,
            { opacity: 0.2, color: "#6B7280" }, // gray-500-ish
            {
                opacity: 1,
                color: "#ffffff", // blue-600 highlight
                stagger: 0.06,
                ease: "none",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 50%",
                    end: "bottom 50%",
                    scrub: true
                }
            }
        );

    }, []);

    return (
        <section id="about" className="mt-24 px-2 sm:px-4 md:px-8">
            <AnimatedText text="(About Rasmus)" className="text-xl md:text-4xl font-bold mb-4" type="lines" />

            <p
                ref={textRef}
                className="text-[clamp(1.5rem,4vw,3.5rem)] font-bold leading-tight text-gray-800"
            >
                I'm a dedicated developer driven by curiosity and a love for building meaningful digital experiences. While I'm still early in my professional journey, my passion for coding runs deep—from crafting clean interfaces to architecting smart backend solutions. I thrive on solving problems, learning new technologies, and bringing sharp, modern ideas into every project.
            </p>
        </section>
    );
}
