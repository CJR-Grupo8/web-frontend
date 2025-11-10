"use client";

import useEmblaCarousel from "embla-carousel-react";
import ProductCard, { Product } from "@/components/ProductCard";
import '@/styles/components-css/home-carousel.css';
import Link from "next/link";


export default function ProductCarousel({
    title = "Produtos",
    items,
}: {
    title?: string;
    items: Product[];
}) {
    const [emblaRef] = useEmblaCarousel({
        loop: false,
        align: "start",
        dragFree: true,
    });

    return (
        <section className="home-block">
            <header className="home-block__header">
                <h2 className="home-block__title">{title}</h2>
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
