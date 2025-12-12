"use client";
import { useEffect, useState } from "react";
import FooterPhysics from "./FooterPhysics";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [currentTime, setCurrentTime] = useState("");

    useEffect(() => {
        const update = () => {
            setCurrentTime(
                new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        };

        update();
        const interval = setInterval(update, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer id="footer" className="flex flex-col bg-[#151515] text-[#ffffff] my-8 rounded-2xl m-8 mt-24 h-[60vh] md:h-[94vh]">
            {/* Desktop Layout */}
            <div className="hidden md:flex justify-between items-center p-8">
                <p className="text-4xl flex-1 text-left font-extrabold">Ringsted, Denmark</p>
                <h2 className="text-6xl font-bold text-center flex flex-1">Let's work&nbsp;<span className="font-extrabold text-blue-600 font-playfair italic">together</span></h2>
                <p className="text-4xl flex-1 text-right font-extrabold">{currentTime}</p>
            </div>

            {/* Mobile Layout */}
<div className="md:hidden flex flex-col p-8 gap-6">
    <div className="flex justify-between w-full">
        <p className="text-[clamp(16px,3vw,36px)] font-extrabold text-left">Ringsted, Denmark</p>
        <p className="text-[clamp(16px,3vw,36px)] font-extrabold text-right">{currentTime}</p>
    </div>
</div>

            <div className="flex flex-col p-8 gap-6 md:hidden">
                <h2 className="text-5xl font-bold text-center">
                    Let's work <br />
                    <span className="font-extrabold text-blue-600 font-playfair italic">together</span>
                </h2>
                <a href="mailto:rasmusferst@gmail.com">
                    <button className="bg-blue-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors">
                        Send me a message
                    </button>
                </a>
            </div>


            <div className="flex-1 h-[80%] hidden md:block">
                <FooterPhysics />
            </div>

            <div className="flex justify-between p-8 text-center mt-auto">
                <p className="text-[clamp(16px,3vw,36px)] font-extrabold">&copy;{currentYear}</p>
                <p className="text-[clamp(16px,3vw,36px)] font-extrabold">Rasmus Ferst</p>
            </div>
        </footer>
    );
}