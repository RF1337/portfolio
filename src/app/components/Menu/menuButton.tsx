"use client";

import { FC } from "react";
import styles from "./menuButton.module.css";

interface MenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MenuButton: FC<MenuButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className={`${styles.hamburger} ${isOpen ? styles.active : ""}`}
      onClick={toggleMenu}
      aria-label="Toggle menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default MenuButton;
