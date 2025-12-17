"use client";

import { FC } from "react";
import styles from "./menuOverlay.module.css";
import Header from "@/app/components/shared/Header";

interface MenuOverlayProps {
  isOpen: boolean;
  toggleMenu: () => void; // pass toggle function
}

const MenuOverlay: FC<MenuOverlayProps> = ({ isOpen, toggleMenu }) => {
  // helper to handle link clicks
  const handleClick = (e: React.MouseEvent, target?: string) => {
    e.preventDefault();
    toggleMenu();

    if (target) {
      // scroll to target if provided
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`}>

      {/* Overlay header */}
      <Header toggleMenu={toggleMenu} isMenuOpen={isOpen} />

      <ul className="flex flex-row flex-wrap justify-start items-start p-8">
        <li>
          <a href="#" className="text-[96px] leading-none" onClick={(e) => handleClick(e)}>
            HOME
          </a>
        </li>
        <li>
          <a href="#work" className="text-[96px] leading-none" onClick={(e) => handleClick(e, "#work")}>
            WORK
          </a>
        </li>
        <li>
          <a href="#about" className="text-[96px] leading-none" onClick={(e) => handleClick(e, "#about")}>
            ABOUT
          </a>
        </li>
        <li>
          <a href="#skills" className="text-[96px] leading-none" onClick={(e) => handleClick(e, "#skills")}>
            SKILLS
          </a>
        </li>
        <li>
          <a href="#tech" className="text-[96px] leading-none" onClick={(e) => handleClick(e, "#tech")}>
            TECH
          </a>
        </li>
        <li className="mt-auto">
          <p>rasmusferst@gmail.com</p>
          <p>Ringsted, Denmark</p>
        </li>
      </ul>
    </div>
  );
};

export default MenuOverlay;
