'use client';
import MenuButton from '../components/Menu/menuButton';

interface HeaderProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export default function Header({ toggleMenu, isMenuOpen }: HeaderProps) {

  return (
    <header className="py-8 px-8 mx-auto w-full flex justify-between items-center">
        <div className="logo">PORTFOLIO</div>
        <nav>
            <MenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </nav>
    </header>
  );
}