import { books } from '@/data/books';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import BookCard from './BookCard';
import Icon from '@/components/ui/icon';

interface BookPageProps {
  bookId: number;
  onNavigate: (page: string, bookId?: number) => void;
  onAddToCart: (bookId: number) => void;
  cartItems: number[];
}

export default function BookPage({ bookId, onNavigate, onAddToCart, cartItems }: BookPageProps) {
  useScrollReveal();

  const book = books.find(b => b.id === bookId);
  const related = books.filter(b => b.id !== bookId && b.category === book?.category).slice(0, 4);
  const inCart = cartItems.includes(bookId);

  if (!book) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="font-cormorant text-4xl mb-4">Книга не найдена</p>
          <button onClick={() => onNavigate('catalog')} className="font-golos text-accent underline">
            Вернуться в каталог
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center gap-2 font-golos text-sm text-muted-foreground">
          <button onClick={() => onNavigate('home')} className="hover:text-foreground transition-colors">Главная</button>
          <Icon name="ChevronRight" size={14} />
          <button onClick={() => onNavigate('catalog')} className="hover:text-foreground transition-colors">Каталог</button>
          <Icon name="ChevronRight" size={14} />
          <span className="text-foreground">{book.title}</span>
        </div>
      </div>

      {/* Book details */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          {/* Cover */}
          <div className="scroll-reveal-left">
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/10 to-transparent rounded-sm blur-2xl" />
              <div className="relative aspect-[3/4] overflow-hidden book-shadow rounded-sm">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {book.isNew && (
                  <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-golos font-bold">Новинка</span>
                )}
                {book.isBestseller && (
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-golos font-bold">Бестселлер</span>
                )}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="scroll-reveal flex flex-col">
            <p className="font-golos text-sm text-muted-foreground uppercase tracking-widest mb-3">{book.category}</p>
            <h1 className="font-cormorant text-5xl md:text-6xl font-bold leading-tight mb-3">{book.title}</h1>
            <p className="font-cormorant text-2xl italic text-muted-foreground mb-6">{book.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[1,2,3,4,5].map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    className={star <= Math.round(book.rating) ? 'text-accent fill-accent' : 'text-border'}
                  />
                ))}
              </div>
              <span className="font-golos text-sm font-semibold">{book.rating}</span>
              <span className="font-golos text-sm text-muted-foreground">({book.reviews} отзывов)</span>
            </div>

            {/* Description */}
            <p className="font-golos text-base text-muted-foreground leading-relaxed mb-8">
              {book.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-8 p-5 bg-muted/50 border border-border">
              {[
                { label: 'Страниц', value: book.pages },
                { label: 'Год', value: book.year },
                { label: 'Издательство', value: book.publisher },
                { label: 'ISBN', value: book.isbn },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="font-golos text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
                  <p className="font-golos text-sm font-medium mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            {/* Price & action */}
            <div className="flex items-end gap-4 mb-6">
              <div>
                <span className="font-cormorant text-5xl font-bold">{book.price} ₽</span>
                {book.oldPrice && (
                  <span className="font-golos text-lg text-muted-foreground line-through ml-3">{book.oldPrice} ₽</span>
                )}
              </div>
              {book.oldPrice && (
                <span className="mb-1 px-2 py-0.5 bg-destructive/10 text-destructive text-sm font-golos font-semibold">
                  Скидка {Math.round((1 - book.price / book.oldPrice) * 100)}%
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {book.inStock ? (
                <>
                  <button
                    onClick={() => onAddToCart(book.id)}
                    className={`flex-1 btn-ink flex items-center justify-center gap-2 px-8 py-4 border-2 font-golos font-semibold text-base rounded-none transition-colors ${
                      inCart
                        ? 'border-accent bg-accent text-accent-foreground hover:bg-accent/90'
                        : 'border-primary text-primary hover:text-primary-foreground'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon name={inCart ? 'Check' : 'ShoppingBag'} size={18} />
                      {inCart ? 'В корзине' : 'В корзину'}
                    </span>
                  </button>
                  {inCart && (
                    <button
                      onClick={() => onNavigate('cart')}
                      className="px-8 py-4 border border-border font-golos font-medium text-base rounded-none hover:bg-muted transition-colors"
                    >
                      Оформить
                    </button>
                  )}
                </>
              ) : (
                <div className="flex-1 py-4 text-center border border-border font-golos text-muted-foreground">
                  Нет в наличии
                </div>
              )}
            </div>

            {/* Delivery info */}
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
              {[
                { icon: 'Truck', text: 'Доставка от 2 дней' },
                { icon: 'Package', text: 'Бесплатно от 2000 ₽' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground font-golos">
                  <Icon name={icon as 'Truck'} size={14} />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related books */}
        {related.length > 0 && (
          <div>
            <div className="scroll-reveal mb-10">
              <div className="ornament-divider mb-4">
                <span className="font-cormorant text-sm italic text-muted-foreground">Похожие книги</span>
              </div>
              <h2 className="font-cormorant text-4xl font-bold text-center">Вам также понравится</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((b, i) => (
                <div key={b.id} className="scroll-reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <BookCard
                    book={b}
                    onNavigate={onNavigate}
                    onAddToCart={onAddToCart}
                    inCart={cartItems.includes(b.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
