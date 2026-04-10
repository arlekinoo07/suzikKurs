import Image from "next/image";
import ProfileEntry from "./auth/profile-entry";

const categories = [
  { title: "Новый малыш", image: "/photo/nav1.jpeg" },
  { title: "Юбилеи", image: "/photo/nav2.jpeg" },
  { title: "Дни рождения", image: "/photo/nav3.jpeg" },
  { title: "Розы", image: "/photo/nav4.jpeg" },
  { title: "Свадьбы", image: "/photo/nav5.jpeg" }
];

const bouquets = [
  {
    title: "Цветочная фантазия",
    price: "15 000 ₽",
    oldPrice: "20 000 ₽",
    tag: "Свадьба",
    image: "/photo/buket1.jpeg"
  },
  {
    title: "Весенняя серенада",
    price: "8 000 ₽",
    oldPrice: "15 000 ₽",
    tag: "День рождения",
    image: "/photo/buket2.jpeg"
  },
  {
    title: "Зимний шепот",
    price: "10 000 ₽",
    oldPrice: "",
    tag: "Юбилеи",
    image: "/photo/buket3.jpeg"
  },
  {
    title: "Садовое очарование",
    price: "8 000 ₽",
    oldPrice: "18 000 ₽",
    tag: "День рождения",
    image: "/photo/buket4.jpeg"
  },
  {
    title: "Совершенство роз",
    price: "20 000 ₽",
    oldPrice: "",
    tag: "Розы",
    image: "/photo/buket5.jpeg"
  },
  {
    title: "Летняя симфония",
    price: "18 000 ₽",
    oldPrice: "",
    tag: "Свадьба",
    image: "/photo/buket6.jpeg"
  }
];

export default function Home() {
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
              <article key={bouquet.image} className="product-card">
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
                <p className="product-tag">{bouquet.tag}</p>
                <h3>{bouquet.title}</h3>
                <p className="product-price">
                  <strong>{bouquet.price}</strong>
                  {bouquet.oldPrice ? <s>{bouquet.oldPrice}</s> : null}
                </p>
              </article>
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
