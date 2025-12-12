'use client';

import Link from 'next/link';
import { useLenis } from 'lenis/react';
import GetInTouch from '../components/GetInTouch';

export default function Header() {
    const lenis = useLenis(); // get Lenis instance

    const handleScroll = (e: React.MouseEvent, target: string) => {
        e.preventDefault();
        if (!lenis) return;

        lenis.scrollTo(target, {
            offset: 0,
            duration: 1.2,
            easing: (t: number) => 1 - Math.pow(1 - t, 3), // easeOutCubic
        });
    };

    return (
        <header className="py-8 px-8 mx-auto">
            <nav className="flex items-center justify-between">
                <ul className="flex gap-16">

                    {/* WORK */}
                    <li className="relative group">
                        <a
                            href="#work"
                            onClick={(e) => handleScroll(e, '#work')}
                            className="text-xl font-bold"
                        >
                            Work
                        </a>
                        <span className="
                            absolute left-0 -bottom-1 h-0.5 w-0 bg-current
                            transition-all duration-300
                            group-hover:w-full
                        "></span>
                    </li>

                    {/* SKILLS */}
                    <li className="relative group">
                        <a
                            href="#skills"
                            onClick={(e) => handleScroll(e, '#skills')}
                            className="text-xl font-bold"
                        >
                            Skills
                        </a>
                        <span className="
                            absolute left-0 -bottom-1 h-0.5 w-0 bg-current
                            transition-all duration-300
                            group-hover:w-full
                        "></span>
                    </li>

                    {/* ABOUT */}
                    <li className="relative group">
                        <a
                            href="#about"
                            onClick={(e) => handleScroll(e, '#about')}
                            className="text-xl font-bold"
                        >
                            About
                        </a>
                        <span className="
                            absolute left-0 -bottom-1 h-0.5 w-0 bg-current
                            transition-all duration-300
                            group-hover:w-full
                        "></span>
                    </li>

                    {/* TECH STACK */}
                    <li className="relative group">
                        <a
                            href="#tech-stack"
                            onClick={(e) => handleScroll(e, '#tech-stack')}
                            className="text-xl font-bold"
                        >
                            Tech Stack
                        </a>
                        <span className="
                            absolute left-0 -bottom-1 h-0.5 w-0 bg-current
                            transition-all duration-300
                            group-hover:w-full
                        "></span>
                    </li>

                </ul>

                <GetInTouch />
            </nav>
        </header>
    );
}
