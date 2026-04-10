import { useEffect } from 'react';
import { books } from '@/data/books';
import BookCard from './BookCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string, bookId?: number) => void;
  onAddToCart: (bookId: number) => void;
  cartItems: number[];
}

export default function HomePage({ onNavigate, onAddToCart, cartItems }: HomePageProps) {
  useScrollReveal();

  const bestsellers = books.filter(b => b.isBestseller).slice(0, 4);
  const newBooks = books.filter(b => b.isNew).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden paper-texture">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/50" />

        {/* Decorative background book illustration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden">
          <img
            src="https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/05b50591-f6d0-493a-be31-4f6d7dfbe167.jpg"
            alt="Книжный магазин"
            className="w-full h-full object-cover opacity-30 dark:opacity-15 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        </div>

        {/* Floating ornaments */}
        <div className="absolute top-1/4 right-1/4 text-6xl opacity-10 animate-float hidden lg:block" style={{animationDelay: '0.5s'}}>✦</div>
        <div className="absolute bottom-1/3 left-1/4 text-4xl opacity-10 animate-float hidden lg:block" style={{animationDelay: '1.5s'}}>❧</div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/50 text-muted-foreground text-sm font-golos mb-8 animate-fade-up opacity-0" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Более 10 000 книг в каталоге
            </div>

            <h1 className="font-cormorant text-6xl md:text-8xl font-bold leading-[0.95] mb-6 animate-fade-up opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
              Мир<br />
              <span className="italic text-gradient-amber">историй</span><br />
              ждёт вас
            </h1>

            <p className="font-golos text-lg text-muted-foreground leading-relaxed mb-10 max-w-md animate-fade-up opacity-0" style={{animationDelay: '0.35s', animationFillMode: 'forwards'}}>
              Редкие издания, современная проза, классика мировой литературы — 
              всё в одном месте. Доставим до двери за 2 дня.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-up opacity-0" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
              <button
                onClick={() => onNavigate('catalog')}
                className="btn-ink px-8 py-4 border-2 border-primary text-primary rounded-none font-golos font-semibold text-base tracking-wide hover:text-primary-foreground transition-colors"
              >
                <span>Перейти в каталог</span>
              </button>
              <button
                onClick={() => onNavigate('catalog')}
                className="flex items-center gap-2 px-8 py-4 text-muted-foreground font-golos font-medium text-base hover:text-foreground transition-colors group"
              >
                <Icon name="Sparkles" size={18} className="group-hover:text-accent transition-colors" />
                Новинки
              </button>
            </div>

            <div className="flex items-center gap-8 mt-14 pt-8 border-t border-border animate-fade-up opacity-0" style={{animationDelay: '0.65s', animationFillMode: 'forwards'}}>
              {[
                { value: '10K+', label: 'Книг' },
                { value: '50+', label: 'Жанров' },
                { value: '4.9★', label: 'Рейтинг' },
              ].map((stat) => (
                <div key={stat.value}>
                  <div className="font-cormorant text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="font-golos text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50">
          <div className="font-golos text-xs text-muted-foreground tracking-widest uppercase">Листать</div>
          <Icon name="ChevronDown" size={16} />
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="scroll-reveal">
          <div className="ornament-divider mb-4">
            <span className="font-cormorant text-sm italic text-muted-foreground">Бестселлеры</span>
          </div>
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-center mb-4">
            Читают все
          </h2>
          <p className="text-center text-muted-foreground font-golos mb-14">
            Самые популярные книги нашего магазина
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((book, i) => (
            <div
              key={book.id}
              className="scroll-reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <BookCard
                book={book}
                onNavigate={onNavigate}
                onAddToCart={onAddToCart}
                inCart={cartItems.includes(book.id)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden paper-texture">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-8 font-cormorant text-9xl font-bold opacity-20">§</div>
          <div className="absolute bottom-4 right-8 font-cormorant text-9xl font-bold opacity-20">❦</div>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center scroll-reveal">
          <div className="font-cormorant text-sm uppercase tracking-[0.3em] mb-4 opacity-70">Специальное предложение</div>
          <h2 className="font-cormorant text-5xl md:text-7xl font-bold mb-6">
            Скидка 20%<br />
            <span className="italic font-light">на первый заказ</span>
          </h2>
          <p className="font-golos text-lg opacity-80 mb-8 max-w-md mx-auto">
            Используйте промокод <strong className="font-bold">КНИГА2024</strong> при оформлении заказа
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="px-10 py-4 bg-primary-foreground text-primary font-golos font-semibold text-base rounded-none hover:bg-primary-foreground/90 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Воспользоваться предложением
          </button>
        </div>
      </section>

      {/* New arrivals */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-14 scroll-reveal">
          <div>
            <div className="font-cormorant text-sm italic text-muted-foreground mb-2">Только что поступили</div>
            <h2 className="font-cormorant text-5xl md:text-6xl font-bold">Новинки</h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="hidden md:flex items-center gap-2 font-golos text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Смотреть все
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newBooks.map((book, i) => (
            <div
              key={book.id}
              className="scroll-reveal-left"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div
                className="group cursor-pointer"
                onClick={() => onNavigate('book', book.id)}
              >
                <div className="relative overflow-hidden rounded-sm mb-5 aspect-[3/4]">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="font-cormorant text-xl font-bold mb-1">{book.title}</div>
                    <div className="font-golos text-sm opacity-80">{book.author}</div>
                  </div>
                  <div className="absolute top-3 left-3 px-2 py-1 bg-accent text-accent-foreground text-xs font-golos font-bold rounded">
                    Новинка
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-cormorant text-2xl font-semibold">{book.price} ₽</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onAddToCart(book.id); }}
                    className="btn-ink px-5 py-2 border border-primary text-primary text-sm font-golos font-medium rounded-none hover:text-primary-foreground transition-colors"
                  >
                    <span>В корзину</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50 paper-texture">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: 'Truck', title: 'Быстрая доставка', desc: 'По всей России за 2–5 дней' },
              { icon: 'Shield', title: 'Гарантия качества', desc: 'Только оригинальные издания' },
              { icon: 'RotateCcw', title: 'Возврат 14 дней', desc: 'Без вопросов и объяснений' },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="scroll-reveal flex gap-5 items-start"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 flex-shrink-0 rounded-full border border-border flex items-center justify-center text-accent">
                  <Icon name={feature.icon as 'Truck'} size={20} />
                </div>
                <div>
                  <h3 className="font-cormorant text-xl font-bold mb-1">{feature.title}</h3>
                  <p className="font-golos text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-cormorant text-2xl font-bold">
              <span className="text-gradient-amber">Ф</span>олиант
            </div>
            <p className="font-golos text-sm text-muted-foreground">
              © 2024 Фолиант. Все права защищены.
            </p>
            <div className="flex gap-4">
              {['Политика', 'Условия', 'Помощь'].map((item) => (
                <button key={item} className="font-golos text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
