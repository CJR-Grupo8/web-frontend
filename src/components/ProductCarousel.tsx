"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductCard, { Product } from "@/components/ProductCard";
import Link from "next/link";

type ProductCarouselProps = {
    title?: string;
    category?: string;
    items: Product[];
};

export default function ProductCarousel({
    title = "Produtos",
    category,
    items,
}: ProductCarouselProps) {
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: "start",
        dragFree: true,
    });

    return (
        <section className="home-block">
            <header className="home-block__header">
                <h2 className="home-block__title">
                    <span className="home-block__title-main">{title}</span>

                    {category && (
                        <>
                            <span className="home-block__title-em">em</span>
                            <Link
                                href={`/categorias/${encodeURIComponent(category.toLowerCase())}`}
                                className="home-block__title-category"
                            >
                                {category}
                            </Link>
                        </>
                    )}
                </h2>

                <Link href="/ver_mais" className="home-block__action">
                    ver mais
                </Link>
            </header>

            <div className="home-prod__viewport" ref={emblaRef}>
                <div className="home-prod__container">
                    {items.map((product) => (
                        <div key={product.id} className="home-prod__slide">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
