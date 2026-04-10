import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  cartCount: number;
  isDark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ currentPage, onNavigate, cartCount, isDark, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 theme-transition ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <button
          onClick={() => onNavigate('home')}
          className="font-cormorant text-2xl md:text-3xl font-bold tracking-wide text-foreground hover:opacity-80 transition-opacity"
        >
          <span className="text-gradient-amber">Ф</span>олиант
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`nav-link-animated font-golos text-sm font-medium tracking-wide ${
                currentPage === link.id ? 'text-foreground active' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center border border-border hover:bg-muted transition-all duration-300 hover:scale-110"
          >
            <Icon name={isDark ? 'Sun' : 'Moon'} size={16} />
          </button>

          <button
            onClick={() => onNavigate('cart')}
            className="relative w-9 h-9 rounded-full flex items-center justify-center border border-border hover:bg-muted transition-all duration-300 hover:scale-110"
          >
            <Icon name="ShoppingBag" size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center font-bold animate-scale-in">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center"
          >
            <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } bg-background/98 backdrop-blur-md border-b border-border`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {links.map((link, i) => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMenuOpen(false); }}
              className={`text-left font-golos text-base font-medium py-2 border-b border-border/30 transition-all duration-300`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
