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
        <footer id="footer" className="flex flex-col bg-[#121212] h-[94vh] text-[#ffffff] my-8 rounded-2xl m-8 mt-24">
            <div className="flex justify-between items-center p-8">
                <p className="text-4xl flex-1 text-left font-extrabold">Ringsted, Denmark</p>
                <h2 className="text-6xl font-bold text-center flex flex-1">Let's work&nbsp;<span className="font-extrabold text-blue-600 font-playfair italic">together</span></h2>
                <p className="text-4xl flex-1 text-right font-extrabold">{currentTime}</p>
            </div>
<div className="flex-1 h-[80%]">
  <FooterPhysics />
</div>
            <div className="flex justify-between p-8 text-center mt-auto">
                <p className="text-4xl font-extrabold">&copy;{currentYear}</p>
                <p className="text-4xl font-extrabold">Rasmus Ferst</p>
            </div>
        </footer>
    );
}