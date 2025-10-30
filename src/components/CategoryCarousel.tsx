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
import "./styles/home-carousel.css";

const categories = [
  { id: "mercado", name: "Mercado", icon: <FaShoppingCart /> },
  { id: "farmacia", name: "Farmácia", icon: <FaClinicMedical /> },
  { id: "beleza", name: "Beleza", icon: <FaSmile /> },
  { id: "moda", name: "Moda", icon: <FaTshirt /> },
  { id: "eletronicos", name: "Eletrônicos", icon: <FaLaptop /> },
  { id: "jogos", name: "Jogos", icon: <FaGamepad /> },
  { id: "brinquedos", name: "Brinquedos", icon: <FaRobot /> },
  { id: "outros", name: "Outros", icon: <FaEllipsisH /> },
];

export default function CategoryCarousel() {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
  });

  return (
    <section className="home-block">
      <header className="home-block__header">
        <h2 className="home-block__title">Categorias</h2>
      </header>

      <div className="home-cat__viewport" ref={emblaRef}>
        <div className="home-cat__container">
          {categories.map((cat) => (
            <div key={cat.id} className="home-cat__slide">
              <button className="home-cat__card" type="button">
                <span className="home-cat__icon">{cat.icon}</span>
                <span className="home-cat__name">{cat.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
