import { getDb } from "./db";

export type Category = {
  id: number;
  slug: string;
  title: string;
  image: string;
  description: string;
};

export type Bouquet = {
  id: number;
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

export function formatPrice(price: number) {
  return `${new Intl.NumberFormat("ru-RU").format(price)} ₽`;
}

export function getCategories() {
  const db = getDb();
  return db
    .prepare("SELECT id, slug, title, image, description FROM categories ORDER BY id")
    .all() as Category[];
}

export function getBouquets() {
  const db = getDb();
  return db
    .prepare(
      `SELECT
        id,
        slug,
        title,
        price,
        old_price as oldPrice,
        tag,
        image,
        short_description as shortDescription,
        description,
        composition,
        size,
        aroma,
        delivery,
        care,
        accent
      FROM bouquets
      ORDER BY id`
    )
    .all() as Bouquet[];
}

export function getBouquetBySlug(slug: string) {
  const db = getDb();
  return db
    .prepare(
      `SELECT
        id,
        slug,
        title,
        price,
        old_price as oldPrice,
        tag,
        image,
        short_description as shortDescription,
        description,
        composition,
        size,
        aroma,
        delivery,
        care,
        accent
      FROM bouquets
      WHERE slug = ?`
    )
    .get(slug) as Bouquet | undefined;
}
