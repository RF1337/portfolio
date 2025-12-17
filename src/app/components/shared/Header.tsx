'use client';
import MenuButton from '../menu/menuButton';

interface HeaderProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

export default function Header({ toggleMenu, isMenuOpen }: HeaderProps) {

  return (
    <header className="py-8 px-8 mx-auto w-full flex justify-between items-center">
        <div className="text-lg">RASMUS FERST</div>

        {/* Phone */}
        <div className='block lg:hidden'>
            <MenuButton isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        </div>

        {/* Desktop */}
        <nav className="hidden lg:flex gap-12 text-lg">
            <a href="#about" className="hover:text-blue-600 transition-colors">ABOUT</a>
            <a href="#tech-stack" className="hover:text-blue-600 transition-colors">TECH STACK</a>
            <a href="#skills" className="hover:text-blue-600 transition-colors">SKILLS</a>
            <a href="#work" className="hover:text-blue-600 transition-colors">WORK</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">CONTACT</a>
        </nav>
    </header>
  );
}