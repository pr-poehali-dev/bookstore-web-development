import { useState } from 'react';
import { books } from '@/data/books';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Icon from '@/components/ui/icon';

interface CartPageProps {
  cartItems: number[];
  onRemoveFromCart: (bookId: number) => void;
  onNavigate: (page: string) => void;
}

interface OrderForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
  delivery: 'courier' | 'pickup' | 'post';
  payment: 'card' | 'cash';
}

export default function CartPage({ cartItems, onRemoveFromCart, onNavigate }: CartPageProps) {
  useScrollReveal();
  const [step, setStep] = useState<'cart' | 'order' | 'success'>('cart');
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(cartItems.map(id => [id, 1]))
  );
  const [form, setForm] = useState<OrderForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    comment: '',
    delivery: 'courier',
    payment: 'card',
  });

  const cartBooks = books.filter(b => cartItems.includes(b.id));
  const subtotal = cartBooks.reduce((sum, b) => sum + b.price * (quantities[b.id] || 1), 0);
  const deliveryCost = form.delivery === 'pickup' ? 0 : subtotal >= 2000 ? 0 : 350;
  const total = subtotal + deliveryCost;

  const handleQty = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center px-6">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <Icon name="CheckCircle" size={40} className="text-accent" />
          </div>
          <h1 className="font-cormorant text-5xl font-bold mb-4">Заказ принят!</h1>
          <p className="font-golos text-muted-foreground mb-2">Номер вашего заказа: <strong>#ФЛ-{Math.floor(Math.random() * 9000 + 1000)}</strong></p>
          <p className="font-golos text-muted-foreground mb-8">
            Подтверждение отправлено на <strong>{form.email || 'вашу почту'}</strong>.<br />
            Мы свяжемся с вами в ближайшее время.
          </p>
          <button
            onClick={() => onNavigate('catalog')}
            className="btn-ink px-10 py-4 border-2 border-primary text-primary font-golos font-semibold rounded-none hover:text-primary-foreground transition-colors"
          >
            <span>Продолжить покупки</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10 scroll-reveal">
          <h1 className="font-cormorant text-6xl font-bold mb-2">
            {step === 'cart' ? 'Корзина' : 'Оформление заказа'}
          </h1>
          <div className="flex items-center gap-4 mt-4">
            {['cart', 'order'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-golos font-bold transition-all duration-300 ${
                  step === s || (step === 'success' && i < 2)
                    ? 'bg-primary text-primary-foreground'
                    : i === 0 && step === 'order'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {i === 0 && step === 'order' ? <Icon name="Check" size={14} /> : i + 1}
                </div>
                <span className={`font-golos text-sm ${step === s ? 'text-foreground font-semibold' : 'text-muted-foreground'}`}>
                  {i === 0 ? 'Корзина' : 'Оформление'}
                </span>
                {i === 0 && <Icon name="ChevronRight" size={14} className="text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        {cartBooks.length === 0 ? (
          <div className="text-center py-24 scroll-reveal">
            <div className="font-cormorant text-7xl mb-6 opacity-20">🛒</div>
            <h2 className="font-cormorant text-4xl mb-3">Корзина пуста</h2>
            <p className="font-golos text-muted-foreground mb-8">Добавьте книги, которые вам понравились</p>
            <button onClick={() => onNavigate('catalog')} className="btn-ink px-8 py-4 border-2 border-primary text-primary font-golos font-semibold rounded-none hover:text-primary-foreground transition-colors">
              <span>Перейти в каталог</span>
            </button>
          </div>
        ) : step === 'cart' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartBooks.map((book, i) => (
                <div
                  key={book.id}
                  className="scroll-reveal flex gap-5 p-5 border border-border bg-card hover:border-primary/30 transition-colors"
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <img
                    src={book.cover}
                    alt={book.title}
                    onClick={() => onNavigate('book')}
                    className="w-20 aspect-[3/4] object-cover flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                  />
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-cormorant text-xl font-semibold cursor-pointer hover:text-accent transition-colors truncate"
                      onClick={() => onNavigate('book')}
                    >
                      {book.title}
                    </h3>
                    <p className="font-golos text-sm text-muted-foreground mb-4">{book.author}</p>

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => handleQty(book.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Icon name="Minus" size={14} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center font-golos text-sm font-semibold">
                          {quantities[book.id] || 1}
                        </span>
                        <button
                          onClick={() => handleQty(book.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors"
                        >
                          <Icon name="Plus" size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-cormorant text-2xl font-bold">
                          {book.price * (quantities[book.id] || 1)} ₽
                        </span>
                        <button
                          onClick={() => onRemoveFromCart(book.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="scroll-reveal">
              <div className="sticky top-24 p-6 border border-border bg-card">
                <h2 className="font-cormorant text-2xl font-bold mb-5">Итого</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between font-golos text-sm">
                    <span className="text-muted-foreground">Товары ({cartBooks.length})</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between font-golos text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4 flex justify-between mb-6">
                  <span className="font-cormorant text-xl font-bold">Итого</span>
                  <span className="font-cormorant text-2xl font-bold">{total} ₽</span>
                </div>

                {/* Promo */}
                <div className="flex gap-2 mb-6">
                  <input
                    placeholder="Промокод"
                    className="flex-1 px-3 py-2 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="px-4 py-2 border border-border font-golos text-sm hover:bg-muted transition-colors">
                    Применить
                  </button>
                </div>

                <button
                  onClick={() => setStep('order')}
                  className="btn-ink w-full py-4 border-2 border-primary text-primary font-golos font-semibold text-base rounded-none hover:text-primary-foreground transition-colors"
                >
                  <span>Оформить заказ</span>
                </button>

                <p className="font-golos text-xs text-muted-foreground text-center mt-4">
                  Бесплатная доставка от 2000 ₽
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Order form */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8 scroll-reveal">
              {/* Contact */}
              <div>
                <h2 className="font-cormorant text-2xl font-bold mb-5 pb-3 border-b border-border">Контактные данные</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Имя и фамилия', key: 'name', placeholder: 'Иван Иванов', required: true },
                    { label: 'Email', key: 'email', placeholder: 'ivan@mail.ru', required: true, type: 'email' },
                    { label: 'Телефон', key: 'phone', placeholder: '+7 (999) 000-00-00', required: true },
                  ].map(({ label, key, placeholder, required, type }) => (
                    <div key={key} className={key === 'phone' ? 'md:col-span-2 md:w-1/2' : ''}>
                      <label className="font-golos text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">{label}</label>
                      <input
                        type={type || 'text'}
                        placeholder={placeholder}
                        required={required}
                        value={form[key as keyof OrderForm] as string}
                        onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                        className="w-full px-4 py-3 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery */}
              <div>
                <h2 className="font-cormorant text-2xl font-bold mb-5 pb-3 border-b border-border">Способ доставки</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                  {[
                    { value: 'courier', label: 'Курьер', desc: '2–3 дня • 350 ₽' },
                    { value: 'pickup', label: 'Самовывоз', desc: '1 день • Бесплатно', },
                    { value: 'post', label: 'Почта России', desc: '5–10 дней • 350 ₽' },
                  ].map(({ value, label, desc }) => (
                    <label
                      key={value}
                      className={`flex flex-col gap-1 p-4 border cursor-pointer transition-all duration-200 ${
                        form.delivery === value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={value}
                        checked={form.delivery === value}
                        onChange={() => setForm(prev => ({ ...prev, delivery: value as OrderForm['delivery'] }))}
                        className="hidden"
                      />
                      <span className="font-golos text-sm font-semibold">{label}</span>
                      <span className="font-golos text-xs text-muted-foreground">{desc}</span>
                    </label>
                  ))}
                </div>
                {form.delivery !== 'pickup' && (
                  <div>
                    <label className="font-golos text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">Адрес доставки</label>
                    <input
                      placeholder="Улица, дом, квартира"
                      required
                      value={form.address}
                      onChange={e => setForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Payment */}
              <div>
                <h2 className="font-cormorant text-2xl font-bold mb-5 pb-3 border-b border-border">Способ оплаты</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { value: 'card', label: 'Банковская карта', icon: 'CreditCard' },
                    { value: 'cash', label: 'Наличными при получении', icon: 'Banknote' },
                  ].map(({ value, label, icon }) => (
                    <label
                      key={value}
                      className={`flex items-center gap-3 p-4 border cursor-pointer transition-all duration-200 ${
                        form.payment === value
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={value}
                        checked={form.payment === value}
                        onChange={() => setForm(prev => ({ ...prev, payment: value as OrderForm['payment'] }))}
                        className="hidden"
                      />
                      <Icon name={icon as 'CreditCard'} size={18} className="text-muted-foreground" />
                      <span className="font-golos text-sm font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="font-golos text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">Комментарий к заказу</label>
                <textarea
                  placeholder="Пожелания по доставке, упаковке..."
                  rows={3}
                  value={form.comment}
                  onChange={e => setForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-3 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
            </div>

            {/* Summary */}
            <div className="scroll-reveal">
              <div className="sticky top-24 p-6 border border-border bg-card">
                <h2 className="font-cormorant text-2xl font-bold mb-5">Ваш заказ</h2>
                <div className="space-y-3 mb-5">
                  {cartBooks.map(book => (
                    <div key={book.id} className="flex gap-3">
                      <img src={book.cover} alt={book.title} className="w-10 aspect-[3/4] object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-golos text-xs font-medium truncate">{book.title}</p>
                        <p className="font-golos text-xs text-muted-foreground">{quantities[book.id] || 1} шт.</p>
                      </div>
                      <span className="font-golos text-sm font-semibold">
                        {book.price * (quantities[book.id] || 1)} ₽
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 mb-6">
                  <div className="flex justify-between font-golos text-sm">
                    <span className="text-muted-foreground">Товары</span>
                    <span>{subtotal} ₽</span>
                  </div>
                  <div className="flex justify-between font-golos text-sm">
                    <span className="text-muted-foreground">Доставка</span>
                    <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                  </div>
                  <div className="flex justify-between font-cormorant text-xl font-bold pt-2 border-t border-border">
                    <span>Итого</span>
                    <span>{total} ₽</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-ink w-full py-4 border-2 border-primary text-primary font-golos font-semibold text-base rounded-none hover:text-primary-foreground transition-colors mb-3"
                >
                  <span>Подтвердить заказ</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep('cart')}
                  className="w-full py-3 font-golos text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Назад в корзину
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
