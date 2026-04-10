import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HomePage from '@/components/HomePage';
import CatalogPage from '@/components/CatalogPage';
import BookPage from '@/components/BookPage';
import CartPage from '@/components/CartPage';
import ContactsPage from '@/components/ContactsPage';

type Page = 'home' | 'catalog' | 'book' | 'cart' | 'contacts';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentBookId, setCurrentBookId] = useState<number>(1);
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('foliant-theme');
    if (saved === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('foliant-theme', next ? 'dark' : 'light');
  };

  const navigate = (page: string, bookId?: number) => {
    setCurrentPage(page as Page);
    if (bookId) setCurrentBookId(bookId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (bookId: number) => {
    setCartItems(prev =>
      prev.includes(bookId) ? prev : [...prev, bookId]
    );
  };

  const removeFromCart = (bookId: number) => {
    setCartItems(prev => prev.filter(id => id !== bookId));
  };

  return (
    <div>
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        cartCount={cartItems.length}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main className="theme-transition">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigate}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        )}
        {currentPage === 'catalog' && (
          <CatalogPage
            onNavigate={navigate}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        )}
        {currentPage === 'book' && (
          <BookPage
            bookId={currentBookId}
            onNavigate={navigate}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        )}
        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onRemoveFromCart={removeFromCart}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'contacts' && (
          <ContactsPage />
        )}
      </main>
    </div>
  );
}
