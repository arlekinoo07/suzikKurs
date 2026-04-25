import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getBouquetBySlug } from "../../../lib/catalog";

type BouquetPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateMetadata({ params }: BouquetPageProps) {
  return params.then(({ slug }) => {
    const bouquet = getBouquetBySlug(slug);

    if (!bouquet) {
      return {
        title: "Букет не найден | Bella Flower"
      };
    }

    return {
      title: `${bouquet.title} | Bella Flower`,
      description: bouquet.shortDescription
    };
  });
}

export default async function BouquetPage({ params }: BouquetPageProps) {
  const { slug } = await params;
  const bouquet = getBouquetBySlug(slug);

  if (!bouquet) {
    notFound();
  }

  return (
    <main className="product-page">
      <div className="page-shell">
        <Link href="/" className="details-back-link">
          На главную
        </Link>

        <section className="product-details-card">
          <div className="product-details-media">
            <div className="product-details-badge">{bouquet.tag}</div>
            <Image
              src={bouquet.image}
              alt={bouquet.title}
              width={560}
              height={640}
              className="product-details-image"
            />
          </div>

          <div className="product-details-copy">
            <p className="product-details-kicker">Bella Flower Collection</p>
            <h1>{bouquet.title}</h1>
            <p className="product-details-description">{bouquet.description}</p>

            <div className="product-details-price">
              <strong>{formatPrice(bouquet.price)}</strong>
              {bouquet.oldPrice ? <s>{formatPrice(bouquet.oldPrice)}</s> : null}
            </div>

            <div className="product-facts-grid">
              <article className="product-fact">
                <span>Состав</span>
                <p>{bouquet.composition}</p>
              </article>
              <article className="product-fact">
                <span>Размер</span>
                <p>{bouquet.size}</p>
              </article>
              <article className="product-fact">
                <span>Аромат</span>
                <p>{bouquet.aroma}</p>
              </article>
              <article className="product-fact">
                <span>Доставка</span>
                <p>{bouquet.delivery}</p>
              </article>
              <article className="product-fact">
                <span>Уход</span>
                <p>{bouquet.care}</p>
              </article>
              <article className="product-fact">
                <span>Дополнительно</span>
                <p>{bouquet.accent}</p>
              </article>
            </div>

            <div className="product-details-actions">
              <a href="tel:+79991234567" className="button button-primary">
                Заказать букет
              </a>
              <Link href="/#products" className="button button-secondary">
                Смотреть еще
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
