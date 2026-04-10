import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 scroll-reveal">
        <div className="ornament-divider mb-4">
          <span className="font-cormorant text-sm italic text-muted-foreground">Мы рядом</span>
        </div>
        <h1 className="font-cormorant text-6xl md:text-7xl font-bold text-center mb-4">Контакты</h1>
        <p className="font-golos text-muted-foreground text-center max-w-md mx-auto">
          Есть вопросы? Мы всегда готовы помочь — напишите нам или приходите в магазин
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Info */}
          <div className="space-y-8">
            {/* Map placeholder */}
            <div className="scroll-reveal-left relative aspect-video bg-muted overflow-hidden rounded-sm">
              <img
                src="https://cdn.poehali.dev/projects/14e2789c-0b41-4fef-8129-7b02afc72855/files/05b50591-f6d0-493a-be31-4f6d7dfbe167.jpg"
                alt="Книжный магазин Фолиант"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/90 backdrop-blur-sm px-6 py-4 border border-border text-center">
                  <Icon name="MapPin" size={20} className="mx-auto mb-2 text-accent" />
                  <p className="font-cormorant text-lg font-bold">Книжный магазин «Фолиант»</p>
                  <p className="font-golos text-sm text-muted-foreground">Москва, ул. Арбат, 15</p>
                </div>
              </div>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: 'MapPin',
                  title: 'Адрес',
                  lines: ['г. Москва', 'ул. Арбат, д. 15'],
                  action: 'Построить маршрут',
                },
                {
                  icon: 'Clock',
                  title: 'Режим работы',
                  lines: ['Пн–Пт: 10:00–21:00', 'Сб–Вс: 10:00–20:00'],
                },
                {
                  icon: 'Phone',
                  title: 'Телефон',
                  lines: ['+7 (495) 123-45-67', '+7 (800) 555-00-11'],
                  action: 'Позвонить',
                },
                {
                  icon: 'Mail',
                  title: 'Email',
                  lines: ['info@foliant.ru', 'orders@foliant.ru'],
                  action: 'Написать',
                },
              ].map(({ icon, title, lines, action }, i) => (
                <div
                  key={title}
                  className="scroll-reveal p-5 border border-border hover:border-primary/40 transition-all duration-300 hover:shadow-sm group"
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 flex-shrink-0 rounded-full border border-border flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground group-hover:border-accent transition-all duration-300">
                      <Icon name={icon as 'MapPin'} size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-golos text-xs uppercase tracking-wider text-muted-foreground mb-1">{title}</p>
                      {lines.map(line => (
                        <p key={line} className="font-golos text-sm font-medium">{line}</p>
                      ))}
                      {action && (
                        <button className="font-golos text-xs text-accent mt-2 hover:underline">{action}</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="scroll-reveal">
              <p className="font-golos text-sm uppercase tracking-wider text-muted-foreground mb-4">Мы в соцсетях</p>
              <div className="flex gap-3">
                {[
                  { icon: 'MessageCircle', name: 'ВКонтакте' },
                  { icon: 'Send', name: 'Telegram' },
                  { icon: 'Instagram', name: 'Instagram' },
                ].map(({ icon, name }) => (
                  <button
                    key={name}
                    className="flex items-center gap-2 px-4 py-2 border border-border font-golos text-sm hover:border-accent hover:text-accent transition-all duration-300 hover:scale-105"
                  >
                    <Icon name={icon as 'Send'} size={15} />
                    {name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="scroll-reveal">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 border border-border">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <Icon name="CheckCircle" size={32} className="text-accent" />
                </div>
                <h2 className="font-cormorant text-4xl font-bold mb-3">Сообщение отправлено!</h2>
                <p className="font-golos text-muted-foreground mb-6">
                  Мы ответим на ваш вопрос в течение 24 часов.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="font-golos text-sm text-accent hover:underline"
                >
                  Отправить ещё одно сообщение
                </button>
              </div>
            ) : (
              <div className="p-8 border border-border bg-card">
                <h2 className="font-cormorant text-3xl font-bold mb-2">Написать нам</h2>
                <p className="font-golos text-sm text-muted-foreground mb-7">
                  Ответим в течение рабочего дня
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Ваше имя', key: 'name', placeholder: 'Иван Иванов', required: true },
                      { label: 'Email', key: 'email', placeholder: 'ivan@mail.ru', required: true, type: 'email' },
                    ].map(({ label, key, placeholder, required, type }) => (
                      <div key={key}>
                        <label className="font-golos text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">{label}</label>
                        <input
                          type={type || 'text'}
                          placeholder={placeholder}
                          required={required}
                          value={form[key as keyof typeof form]}
                          onChange={e => setForm(prev => ({ ...prev, [key]: e.target.value }))}
                          className="w-full px-4 py-3 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="font-golos text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">Тема</label>
                    <input
                      placeholder="Вопрос о заказе, наличии книги..."
                      value={form.subject}
                      onChange={e => setForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-4 py-3 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <div>
                    <label className="font-golos text-xs uppercase tracking-wider text-muted-foreground block mb-1.5">Сообщение</label>
                    <textarea
                      placeholder="Опишите ваш вопрос подробнее..."
                      required
                      rows={6}
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 border border-border bg-background font-golos text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-ink w-full py-4 border-2 border-primary text-primary font-golos font-semibold text-base rounded-none hover:text-primary-foreground transition-colors"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Icon name="Send" size={16} />
                      Отправить сообщение
                    </span>
                  </button>
                </form>

                <p className="font-golos text-xs text-muted-foreground text-center mt-5">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
