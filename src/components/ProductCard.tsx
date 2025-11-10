import Link from 'next/link';

export type StoreSeal = "cjr" | "moumer" | "nako" | string;
export type Availability = "DISPONÍVEL" | "INDISPONÍVEL";

export type Product = {
  id: string;
  name: string;
  price: string;
  unit?: string;
  image: string;
  seal: StoreSeal;
  availability: Availability;
};

function imageSrc(image: string) {
  return `/images/produtos/${image}.svg`;
}

function sealSrc(seal: string) {
  return `/images/lojas/${seal}.svg`;
}

export default function ProductCard({ id, name, price, unit, image, seal, availability }: Product) {
  return (

    <Link href={`/produtos/${id}`} className="product-card-link">

      <article className="card">
        <div className="thumb">
          <img src={imageSrc(image)} alt={name} />
          <img className="seal" src={sealSrc(seal)} alt={`Selo ${seal}`} />
        </div>
        <h3 className="title">{name}</h3>
        <div className="price-line">
          <span className="price">{price}</span>
          {unit && <span className="unit">{unit}</span>}
        </div>
        <span className={`availability ${availability === "DISPONÍVEL" ? "ok" : "off"}`}>
          {availability}
        </span>
      </article>

    </Link> 
  );
}
