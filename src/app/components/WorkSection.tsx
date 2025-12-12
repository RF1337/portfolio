"use client";
import Image from "next/image";
import { ReactLenis, useLenis } from 'lenis/react'
import AnimatedText from "./AnimatedText";

export default function WorkSection() {


  return (
    <section id="work" className="px-8">
        <h1 className="text-[100px]">Work</h1>
<div className="projects">
    <div className="project-card slide-left overflow-hidden">
        <a href="https://booking.bycentrum.dk/" className="block overflow-hidden rounded-sm">
            <img src="/assets/projects/booking-project.webp" alt="Booking Project" draggable="false" loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105" />
        </a>

        <div className="py-1 space-y-1">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-[clamp(14px,3vw,24px)]">Vordingborg Bycentrum | Booth Reservation</p>
                <p className="font-semibold text-[clamp(14px,3vw,24px)]">2024</p>
            </div>
            <div className="tech-ticker mt-1 overflow-hidden">
                <div className="text-[clamp(11px,3vw,21px)] tech-track text-[hsl(0,0%,50%)] inline-flex whitespace-nowrap">
                    <span className="inline-block">Angular | JSON |
                        Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">Angular | JSON |
                        Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">Angular | JSON |
                        Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">Angular | JSON |
                        Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">Angular | JSON |
                        Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">Angular | JSON |
                        Figma | UI | UX
                        |&nbsp;</span>
                </div>
            </div>
        </div>
    </div>

    <div className="project-card slide-right overflow-hidden">
        <a href="/projects/fitness-app" className="block overflow-hidden rounded-sm">
            <img src="/assets/projects/fitness-app-project.webp" alt="Fitness App Project" draggable="false"
                loading="lazy"
                className="w-full h-full object-cover transition-smooth duration-700 ease-in-out hover:scale-105 transition-filter" />
        </a>

        <div className="py-1 space-y-1">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-[clamp(14px,3vw,24px)]">Fitness App | Macrolifter - Diet &
                    Gym</p>
                <p className="font-semibold text-[clamp(14px,3vw,24px)]">2025</p>
            </div>
            <div className="tech-ticker mt-1 overflow-hidden">
                <div className="text-[clamp(11px,3vw,21px)] tech-track text-[hsl(0,0%,50%)] inline-flex whitespace-nowrap">
                    <span className="inline-block">React Native | Expo | Supabase |
                        RevenueCat | Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">React Native | Expo | Supabase |
                        RevenueCat | Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">React Native | Expo | Supabase |
                        RevenueCat | Figma | UI | UX
                        |&nbsp;</span>
                    <span className="inline-block">React Native | Expo | Supabase |
                        RevenueCat | Figma | UI | UX
                        |&nbsp;</span>
                </div>
            </div>
        </div>
    </div>
</div>
    </section>
  );
}