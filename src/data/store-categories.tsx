import type { StoreCategory } from "./stores";
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

export const CATEGORIES: {
  value: StoreCategory;
  label: string;
  icon?: React.ReactNode;
}[] = [
  { value: "mercado", label: "Mercado", icon: <FaShoppingCart /> },
  { value: "farmacia", label: "Farmácia", icon: <FaClinicMedical /> },
  { value: "beleza", label: "Beleza", icon: <FaSmile /> },
  { value: "moda", label: "Moda", icon: <FaTshirt /> },
  { value: "eletronicos", label: "Eletrônicos", icon: <FaLaptop /> },
  { value: "jogos", label: "Jogos", icon: <FaGamepad /> },
  { value: "brinquedos", label: "Brinquedos", icon: <FaRobot /> },
  { value: "casa", label: "Casa", icon: <FaHouse /> },
  { value: "outros", label: "Outros", icon: <FaEllipsisH /> },
];
