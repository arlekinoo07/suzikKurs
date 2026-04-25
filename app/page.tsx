import Image from "next/image";
import Link from "next/link";
import ProfileEntry from "./auth/profile-entry";
import { formatPrice, getBouquets, getCategories } from "../lib/catalog";

export default function Home() {
  const categories = getCategories();
  const bouquets = getBouquets();

  return (
    <main className="landing">
      <div className="page-shell">
        <header className="site-header">
          <nav className="nav nav-left">
            <a href="#home">Главная</a>
            <a href="#about">О нас</a>
          </nav>

          <a className="brand" href="#home">
            <span className="brand-flower">✿</span>
            <span className="brand-text">
              <small>BELLA</small>
              <small>FLOWER</small>
            </span>
          </a>

          <nav className="nav nav-right">
            <a href="#products">Букеты</a>
            <ProfileEntry />
            <a href="#contact">Контакты</a>
          </nav>
        </header>

        <section className="hero" id="home">
          <div className="hero-flowers hero-flowers-left" aria-hidden="true">
            <div className="hero-flower-frame">
              <Image
                src="/photo/back.jpeg"
                alt=""
                width={420}
                height={420}
                className="hero-flower-image"
              />
            </div>
          </div>

          <div className="hero-copy">
            <h1>
              <span className="title-rose">Bella</span>
              <span className="title-green">Flower</span>
            </h1>
            <p className="hero-text">
              Цветы, собранные с любовью,
              <br />
              с заботой именно для вас.
            </p>
            <div className="hero-actions">
              <a href="#catalog" className="button button-primary">
                КАТЕГОРИИ
              </a>
              <a href="#products" className="button button-secondary">
                КУПИТЬ
              </a>
              <ProfileEntry variant="hero" />
            </div>
          </div>

          <div className="hero-flowers hero-flowers-right" aria-hidden="true">
            <div className="hero-flower-frame">
              <Image
                src="/photo/back.jpeg"
                alt=""
                width={420}
                height={420}
                className="hero-flower-image hero-flower-image-right"
              />
            </div>
          </div>
        </section>

        <section className="section" id="catalog">
          <div className="section-heading">
            <h2>КАТЕГОРИИ ЦВЕТОВ</h2>
            <p>
              Выберите подходящую категорию цветов для любого повода.
              <br />
              От нежных роз до праздничных композиций, у нас найдется букет для
              любого настроения и события.
            </p>
          </div>

          <div className="categories">
            {categories.map((category) => (
              <article key={category.title} className="category-card">
                <div className="category-icon">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={110}
                    height={110}
                    className="category-icon-image"
                  />
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section products-section" id="products">
          <div className="section-heading section-heading-green">
            <h2>ХИТЫ ПРОДАЖ</h2>
            <p>
              Самые популярные и любимые цветочные композиции наших клиентов.
              <br />
              Эти букеты отлично подойдут, чтобы порадовать близких по любому
              поводу.
            </p>
          </div>

          <div className="product-grid">
            {bouquets.map((bouquet) => (
              <Link
                key={bouquet.slug}
                href={`/bouquets/${bouquet.slug}`}
                className="product-card"
              >
                <article>
                  <div className="product-photo-wrap">
                    <div className="photo-circle" />
                    <div className="product-image-frame">
                      <Image
                        className="product-image"
                        src={bouquet.image}
                        alt={bouquet.title}
                        width={240}
                        height={240}
                      />
                    </div>
                  </div>
                  <div className="product-card-body">
                    <p className="product-tag">{bouquet.tag}</p>
                    <h3>{bouquet.title}</h3>
                    <p className="product-summary">{bouquet.shortDescription}</p>
                    <p className="product-price">
                      <strong>{formatPrice(bouquet.price)}</strong>
                      {bouquet.oldPrice ? <s>{formatPrice(bouquet.oldPrice)}</s> : null}
                    </p>
                    <span className="product-link">Открыть карточку товара</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        <footer className="site-footer" id="contact">
          <div className="footer-main">
            <div className="footer-brand-block">
              <a className="footer-brand" href="#home">
                <span className="brand-flower">✿</span>
                <span className="footer-brand-name">Bella Flower</span>
              </a>
              <p className="footer-text">
                Нежные букеты для свадеб, дней рождения, юбилеев и особенных
                моментов. Собираем композиции с любовью и доставляем в тот же
                день.
              </p>
            </div>

            <div className="footer-column" id="about">
              <p className="footer-title">Магазин</p>
              <a href="#catalog" className="footer-link">
                Категории цветов
              </a>
              <a href="#products" className="footer-link">
                Хиты продаж
              </a>
              <a href="#products" className="footer-link">
                Свадебные букеты
              </a>
              <a href="#products" className="footer-link">
                Коллекция роз
              </a>
            </div>

            <div className="footer-column">
              <p className="footer-title">Контакты</p>
              <p className="footer-text">hello@bellaflower.com</p>
              <p className="footer-text">+7 (999) 123-45-67</p>
              <p className="footer-text">Москва, улица Garden, 21</p>
            </div>

            <div className="footer-column">
              <p className="footer-title">Время работы</p>
              <p className="footer-text">Пн - Пт: 9:00 - 21:00</p>
              <p className="footer-text">Сб - Вс: 10:00 - 22:00</p>
              <p className="footer-text">Доставка в день заказа доступна</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">© 2026 Bella Flower. Все права защищены.</p>
            <div className="footer-socials">
              <a href="#contact" className="footer-social">
                Instagram
              </a>
              <a href="#contact" className="footer-social">
                Telegram
              </a>
              <a href="#contact" className="footer-social">
                WhatsApp
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
