import { Book } from '@/data/books';
import Icon from '@/components/ui/icon';

interface BookCardProps {
  book: Book;
  onNavigate: (page: string, bookId?: number) => void;
  onAddToCart: (bookId: number) => void;
  inCart: boolean;
}

export default function BookCard({ book, onNavigate, onAddToCart, inCart }: BookCardProps) {
  return (
    <div className="group flex flex-col cursor-pointer card-hover">
      <div
        className="relative overflow-hidden rounded-sm mb-4"
        onClick={() => onNavigate('book', book.id)}
      >
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {book.isNew && (
            <span className="px-2 py-0.5 bg-accent text-accent-foreground text-[11px] font-golos font-bold rounded">
              Новинка
            </span>
          )}
          {book.isBestseller && !book.isNew && (
            <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[11px] font-golos font-bold rounded">
              Хит
            </span>
          )}
          {book.oldPrice && (
            <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-[11px] font-golos font-bold rounded">
              -{Math.round((1 - book.price / book.oldPrice) * 100)}%
            </span>
          )}
        </div>

        {!book.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="font-golos text-sm font-semibold text-muted-foreground border border-border px-3 py-1 bg-background/80">
              Нет в наличии
            </span>
          </div>
        )}

        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate('book', book.id); }}
            className="px-5 py-2 bg-background/95 text-foreground text-sm font-golos font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-200 rounded-sm"
          >
            Подробнее
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div
          className="mb-1 cursor-pointer"
          onClick={() => onNavigate('book', book.id)}
        >
          <p className="font-golos text-xs text-muted-foreground uppercase tracking-wider mb-1">{book.category}</p>
          <h3 className="font-cormorant text-xl font-semibold leading-tight hover:text-accent transition-colors line-clamp-2">
            {book.title}
          </h3>
          <p className="font-golos text-sm text-muted-foreground mt-0.5">{book.author}</p>
        </div>

        <div className="flex items-center gap-1 mt-2 mb-3">
          <div className="flex gap-0.5">
            {[1,2,3,4,5].map((star) => (
              <Icon
                key={star}
                name="Star"
                size={12}
                className={star <= Math.round(book.rating) ? 'text-accent fill-accent' : 'text-border'}
              />
            ))}
          </div>
          <span className="font-golos text-xs text-muted-foreground">({book.reviews})</span>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="font-cormorant text-2xl font-bold">{book.price} ₽</span>
            {book.oldPrice && (
              <span className="font-golos text-sm text-muted-foreground line-through">{book.oldPrice} ₽</span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(book.id); }}
            disabled={!book.inStock}
            className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 rounded-sm ${
              inCart
                ? 'bg-accent border-accent text-accent-foreground hover:bg-accent/80'
                : book.inStock
                  ? 'border-border hover:border-primary hover:bg-primary hover:text-primary-foreground'
                  : 'border-border opacity-30 cursor-not-allowed'
            }`}
          >
            <Icon name={inCart ? 'Check' : 'Plus'} size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
