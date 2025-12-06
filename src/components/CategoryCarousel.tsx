"use client";

import useEmblaCarousel from "embla-carousel-react";
import {
  FaShoppingCart,
  FaClinicMedical,
  FaSmile,
  FaTshirt,
  FaLaptop,
  FaGamepad,
  FaRobot,
  FaEllipsisH,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { id: "mercado", name: "Mercado", icon: <FaShoppingCart /> },
  { id: "farmacia", name: "Farmácia", icon: <FaClinicMedical /> },
  { id: "beleza", name: "Beleza", icon: <FaSmile /> },
  { id: "moda", name: "Moda", icon: <FaTshirt /> },
  { id: "eletronicos", name: "Eletrônicos", icon: <FaLaptop /> },
  { id: "jogos", name: "Jogos", icon: <FaGamepad /> },
  { id: "brinquedos", name: "Brinquedos", icon: <FaRobot /> },
  { id: "casa", name: "Casa", icon: <FaHouse /> },
  { id: "outros", name: "Outros", icon: <FaEllipsisH /> },
];

export default function CategoryCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  const pathname = usePathname();
  // ex:
  // "/"                     -> ["home"]
  // "/ver_mais"             -> ["ver_mais"]
  // "/ver_mais/mercado"     -> ["ver_mais","mercado"]
  const segments = pathname
    ?.split("/")
    .filter(Boolean); // tira strings vazias

  const activeCategory = segments?.[1] || null; // segment[0] = "ver_mais", segment[1] = categoria

  return (
    <section className="home-block home-block--categories">
      <header className="home-block__header">
        <h2 className="home-block__title">Categorias</h2>
        <Link href="/ver_mais" className="home-block__action">
          ver mais
        </Link>
      </header>

      <div className="home-cat__viewport" ref={emblaRef}>
        <div className="home-cat__container">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <div key={cat.id} className="home-cat__slide">
                <Link
                  href={`/ver_mais/${cat.id}`}
                  className={`home-cat__card ${isActive ? "active" : ""}`}
                >
                  <span className="home-cat__icon">{cat.icon}</span>
                  <span className="home-cat__name">{cat.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
