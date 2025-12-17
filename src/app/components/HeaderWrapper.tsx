"use client";

import { useState } from "react";
import Header from "./shared/Header";
import MenuOverlay from "./menu/menuOverlay";

export default function HeaderWrapper({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <>
      <Header toggleMenu={toggleMenu} isMenuOpen={menuOpen} />
      <MenuOverlay toggleMenu={toggleMenu} isOpen={menuOpen} />
      {children}
    </>
  );
}