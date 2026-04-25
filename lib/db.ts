import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { createHash, timingSafeEqual } from "node:crypto";

const databasePath = path.join(process.cwd(), "data", "bella-flower.db");

type CategorySeed = {
  slug: string;
  title: string;
  image: string;
  description: string;
};

type BouquetSeed = {
  slug: string;
  title: string;
  price: number;
  oldPrice: number | null;
  tag: string;
  image: string;
  shortDescription: string;
  description: string;
  composition: string;
  size: string;
  aroma: string;
  delivery: string;
  care: string;
  accent: string;
};

const categories: CategorySeed[] = [
  {
    slug: "newborn",
    title: "Новый малыш",
    image: "/photo/nav1.jpeg",
    description: "Воздушные композиции для выписки, знакомства и первых семейных фото."
  },
  {
    slug: "anniversary",
    title: "Юбилеи",
    image: "/photo/nav2.jpeg",
    description: "Статусные букеты с выразительной формой для важных дат."
  },
  {
    slug: "birthday",
    title: "Дни рождения",
    image: "/photo/nav3.jpeg",
    description: "Живые, праздничные букеты, которые сразу создают настроение."
  },
  {
    slug: "roses",
    title: "Розы",
    image: "/photo/nav4.jpeg",
    description: "Классика в современном прочтении: от нежных до эффектных оттенков."
  },
  {
    slug: "wedding",
    title: "Свадьбы",
    image: "/photo/nav5.jpeg",
    description: "Нежные свадебные композиции для невесты, зала и особенных моментов."
  }
];

const bouquets: BouquetSeed[] = [
  {
    slug: "cvetochnaya-fantaziya",
    title: "Цветочная фантазия",
    price: 15000,
    oldPrice: 20000,
    tag: "Свадьба",
    image: "/photo/buket1.jpeg",
    shortDescription: "Объемный букет в пудровой гамме для торжественных событий.",
    description:
      "Пышная композиция с акцентом на мягкие пастельные оттенки. Хорошо подходит для свадебного подарка, утренней фотосессии и эффектного поздравления.",
    composition: "Пионовидные розы, эустома, кустовая роза, эвкалипт, шелковая упаковка.",
    size: "Высота 55 см, диаметр около 38 см",
    aroma: "Нежный, сливочно-цветочный",
    delivery: "Собираем за 2 часа, доставка по Москве в день заказа",
    care: "Подрезать стебли на 1 см и менять воду каждые 24 часа",
    accent: "В подарок открытка с вашим текстом и лента в цвет оформления"
  },
  {
    slug: "vesennyaya-serenada",
    title: "Весенняя серенада",
    price: 8000,
    oldPrice: 15000,
    tag: "День рождения",
    image: "/photo/buket2.jpeg",
    shortDescription: "Легкий праздничный букет с ярким весенним настроением.",
    description:
      "Эта композиция выглядит свежо и легко, поэтому особенно хорошо подходит для дня рождения, комплимента или теплого знака внимания.",
    composition: "Тюльпаны, ранункулюсы, альстромерия, фисташка, матовая упаковка.",
    size: "Высота 45 см, диаметр около 30 см",
    aroma: "Свежий, зеленый",
    delivery: "Готовность за 90 минут, возможна доставка к точному времени",
    care: "Ставить в прохладную воду и держать вдали от батарей",
    accent: "Можно добавить мини-открытку и коробку французских макаронс"
  },
  {
    slug: "zimniy-shepot",
    title: "Зимний шепот",
    price: 10000,
    oldPrice: null,
    tag: "Юбилеи",
    image: "/photo/buket3.jpeg",
    shortDescription: "Сдержанная благородная композиция с выразительным силуэтом.",
    description:
      "Сбалансированный букет в холодной палитре с дорогим визуальным ритмом. Отлично смотрится в интерьерной съемке и в качестве статусного подарка.",
    composition: "Белые розы, гвоздика, диантус, хлопок, эвкалипт, дизайнерская лента.",
    size: "Высота 52 см, диаметр около 34 см",
    aroma: "Спокойный и чистый",
    delivery: "Доставка в течение дня или самовывоз из салона",
    care: "Не ставить под прямое солнце, обновлять срезы через день",
    accent: "Премиальная упаковка и фирменная карточка Bella Flower"
  },
  {
    slug: "sadovoe-ocharovanie",
    title: "Садовое очарование",
    price: 8000,
    oldPrice: 18000,
    tag: "День рождения",
    image: "/photo/buket4.jpeg",
    shortDescription: "Романтичный букет с ощущением только что собранного сада.",
    description:
      "Композиция с мягкой асимметрией и живым садовым характером. Хорошо подходит для поздравления мамы, подруги или коллеги.",
    composition: "Кустовые розы, маттиола, гортензия, эустома, крафтовая упаковка.",
    size: "Высота 48 см, диаметр около 32 см",
    aroma: "Выраженный сладко-цветочный",
    delivery: "Собираем в течение 2 часов, курьер заранее звонит получателю",
    care: "Использовать чистую вазу и удалить листья ниже уровня воды",
    accent: "По желанию добавим атласную ленту и мини-вазу"
  },
  {
    slug: "sovershenstvo-roz",
    title: "Совершенство роз",
    price: 20000,
    oldPrice: null,
    tag: "Розы",
    image: "/photo/buket5.jpeg",
    shortDescription: "Выразительная розовая композиция для признаний и важных дат.",
    description:
      "Классический роскошный букет, в котором весь акцент сделан на идеальную форму и насыщенный оттенок роз. Сильный выбор для романтического повода.",
    composition: "Премиальные эквадорские розы, эвкалипт, плотная дизайнерская упаковка.",
    size: "Высота 60 см, диаметр около 36 см",
    aroma: "Яркий розовый аромат",
    delivery: "Доставка в день заказа, доступна ночная доставка",
    care: "Ежедневно менять воду и снимать внешние защитные лепестки по мере раскрытия",
    accent: "Можно оформить как букет-сюрприз с анонимной запиской"
  },
  {
    slug: "letnyaya-simfoniya",
    title: "Летняя симфония",
    price: 18000,
    oldPrice: null,
    tag: "Свадьба",
    image: "/photo/buket6.jpeg",
    shortDescription: "Светлая воздушная композиция для торжества и фотосессии.",
    description:
      "Нежный букет с плавными линиями и натуральной пластикой. Его часто выбирают для свадеб, помолвок и фотосессий на открытом воздухе.",
    composition: "Пионовидные розы, гортензия, эустома, хамелациум, эвкалипт.",
    size: "Высота 54 см, диаметр около 37 см",
    aroma: "Свежий, с легкой медовой нотой",
    delivery: "Приоритетная сборка утром, доставка в четырехчасовой интервал",
    care: "Хранить в прохладе, не оставлять рядом с фруктами",
    accent: "Доступно оформление в свадебной палитре мероприятия"
  }
];

declare global {
  var bellaFlowerDb: Database.Database | undefined;
}

function hashPassword(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function ensureSeed(db: Database.Database) {
  const categoryCount = db.prepare("SELECT COUNT(*) as count FROM categories").get() as {
    count: number;
  };

  if (categoryCount.count === 0) {
    const insertCategory = db.prepare(
      "INSERT INTO categories (slug, title, image, description) VALUES (@slug, @title, @image, @description)"
    );
    const insertBouquet = db.prepare(
      `INSERT INTO bouquets
       (slug, title, price, old_price, tag, image, short_description, description, composition, size, aroma, delivery, care, accent)
       VALUES
       (@slug, @title, @price, @oldPrice, @tag, @image, @shortDescription, @description, @composition, @size, @aroma, @delivery, @care, @accent)`
    );

    const seed = db.transaction(() => {
      for (const category of categories) {
        insertCategory.run(category);
      }

      for (const bouquet of bouquets) {
        insertBouquet.run(bouquet);
      }
    });

    seed();
  }
}

function initDb() {
  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  const db = new Database(databasePath);

  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      image TEXT NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bouquets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      price INTEGER NOT NULL,
      old_price INTEGER,
      tag TEXT NOT NULL,
      image TEXT NOT NULL,
      short_description TEXT NOT NULL,
      description TEXT NOT NULL,
      composition TEXT NOT NULL,
      size TEXT NOT NULL,
      aroma TEXT NOT NULL,
      delivery TEXT NOT NULL,
      care TEXT NOT NULL,
      accent TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  ensureSeed(db);

  return db;
}

export function getDb() {
  if (!globalThis.bellaFlowerDb) {
    globalThis.bellaFlowerDb = initDb();
  }

  return globalThis.bellaFlowerDb;
}

export function createUser(name: string, email: string, password: string) {
  const db = getDb();
  const passwordHash = hashPassword(password);
  const result = db
    .prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)")
    .run(name, email, passwordHash);

  return {
    id: Number(result.lastInsertRowid),
    name,
    email
  };
}

export function findUserByEmail(email: string) {
  const db = getDb();
  return db
    .prepare("SELECT id, name, email, password_hash as passwordHash FROM users WHERE email = ?")
    .get(email) as
    | { id: number; name: string; email: string; passwordHash: string }
    | undefined;
}

export function verifyPassword(password: string, passwordHash: string) {
  const calculated = Buffer.from(hashPassword(password), "utf8");
  const stored = Buffer.from(passwordHash, "utf8");

  return calculated.length === stored.length && timingSafeEqual(calculated, stored);
}

export function createSession(userId: number, token: string) {
  const db = getDb();
  db.prepare("INSERT INTO sessions (token, user_id) VALUES (?, ?)").run(token, userId);
}

export function getSessionUser(token: string) {
  const db = getDb();
  return db
    .prepare(
      `SELECT users.id, users.name, users.email
       FROM sessions
       JOIN users ON users.id = sessions.user_id
       WHERE sessions.token = ?`
    )
    .get(token) as { id: number; name: string; email: string } | undefined;
}
