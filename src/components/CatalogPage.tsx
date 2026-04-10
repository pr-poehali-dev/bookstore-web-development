import { useState } from 'react';
import { books, categories } from '@/data/books';
import BookCard from './BookCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Icon from '@/components/ui/icon';

interface CatalogPageProps {
  onNavigate: (page: string, bookId?: number) => void;
  onAddToCart: (bookId: number) => void;
  cartItems: number[];
}

export default function CatalogPage({ onNavigate, onAddToCart, cartItems }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');

  useScrollReveal();

  const filtered = books
    .filter(b => activeCategory === 'Все' || b.category === activeCategory)
    .filter(b => {
      const q = searchQuery.toLowerCase();
      return !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviews - a.reviews;
    });

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="scroll-reveal">
          <div className="font-cormorant text-sm italic text-muted-foreground mb-2">Весь ассортимент</div>
          <h1 className="font-cormorant text-6xl md:text-7xl font-bold mb-6">Каталог</h1>
        </div>

        {/* Search */}
        <div className="scroll-reveal relative max-w-lg">
          <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по названию или автору..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 scroll-reveal">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 text-sm font-golos font-medium border transition-all duration-300 rounded-sm ${
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 scroll-reveal">
            <span className="font-golos text-sm text-muted-foreground">Сортировать:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-1.5 border border-border bg-background font-golos text-sm focus:outline-none cursor-pointer"
            >
              <option value="popular">По популярности</option>
              <option value="rating">По рейтингу</option>
              <option value="price-asc">Цена: по возрастанию</option>
              <option value="price-desc">Цена: по убыванию</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="font-golos text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'книга' : filtered.length < 5 ? 'книги' : 'книг'} найдено
        </p>
      </div>

      {/* Books grid */}
      <div className="max-w-7xl mx-auto px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-24 scroll-reveal">
            <div className="font-cormorant text-6xl mb-4 opacity-20">📚</div>
            <p className="font-cormorant text-3xl text-muted-foreground">Книги не найдены</p>
            <p className="font-golos text-muted-foreground mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((book, i) => (
              <div key={book.id} className="scroll-reveal" style={{ transitionDelay: `${(i % 8) * 0.07}s` }}>
                <BookCard
                  book={book}
                  onNavigate={onNavigate}
                  onAddToCart={onAddToCart}
                  inCart={cartItems.includes(book.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
