export type ProductCategory =
  | "Mercado"
  | "Farmácia"
  | "Beleza"
  | "Moda"
  | "Eletrônicos"
  | "Jogos"
  | "Brinquedos"
  | "Casa"
  | "Outros";

export type ProductSummary = {
  id: string;
  name: string;
  price: string;
  unit?: string;
  image: string;
  seal: string;
  availability: "DISPONÍVEL" | "INDISPONÍVEL";
  category: ProductCategory;
};

export type ProductDetails = {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  availability: "DISPONÍVEL" | "INDISPONÍVEL";
  stockCount: number;
  seal: string;
};

export const SLUG_TO_CATEGORY: Record<string, ProductCategory> = {
  mercado: "Mercado",
  farmacia: "Farmácia",
  beleza: "Beleza",
  moda: "Moda",
  eletronicos: "Eletrônicos",
  jogos: "Jogos",
  brinquedos: "Brinquedos",
  casa: "Casa",
  outros: "Outros",
};

export const CATEGORY_TO_SLUG: Record<ProductCategory, string> = {
  Mercado: "mercado",
  "Farmácia": "farmacia",
  Beleza: "beleza",
  Moda: "moda",
  "Eletrônicos": "eletronicos",
  Jogos: "jogos",
  Brinquedos: "brinquedos",
  Casa: "casa",
  Outros: "outros",
};

export const allProductSummaries: ProductSummary[] = [
  // --- Produtos Originais ---
  { id: "1",  name: "Brownie Meio A.",          price: "R$4,70",     image: "brownie-meio-amargo", seal: "cjr",               availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "2",  name: "Brownie Trad.",            price: "R$3,80",     image: "brownie-tradicional", seal: "cjr",               availability: "INDISPONÍVEL", category: "Mercado" },
  { id: "3",  name: "Nozes",                    price: "R$29,99",    unit: "/kg", image: "nozes",           seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "4",  name: "Banana",                   price: "R$3,99",     unit: "/kg", image: "banana",          seal: "moumer",           availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "5",  name: "Limão Siciliano",          price: "R$17,99",    unit: "/kg", image: "limao-siciliano",  seal: "moumer",           availability: "INDISPONÍVEL", category: "Mercado" },
  { id: "6",  name: "Leite",                    price: "R$4,99",     image: "leite-integral",      seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "7",  name: "Manteiga",                 price: "R$23,99",    image: "manteiga",            seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "8",  name: "Leite Cond.",              price: "R$7,99",     image: "leite-condensado",    seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "9",  name: "Coca Cola",                price: "R$3,99",     image: "coca-zero",           seal: "dcarts-&-baskets", availability: "INDISPONÍVEL", category: "Mercado" },
  { id: "10", name: "Farinha de T.",            price: "R$6,99",     image: "farinha-de-trigo",    seal: "dcarts-&-baskets", availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "11", name: "Grand Theft Auto VI",      price: "499,99",     image: "nome",                seal: "magic-chicken",     availability: "INDISPONÍVEL", category: "Jogos" },
  { id: "12", name: "Redbull",                  price: "R$5,60",     image: "redbull",             seal: "cjr",               availability: "DISPONÍVEL",   category: "Mercado" },
  { id: "13", name: "Batom Liq.",               price: "R$149,99",   image: "batom-liq",           seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "14", name: "Nike Dunk Ben&Jerry's",    price: "R$10.000,00",image: "nome",                seal: "sneaker-store",     availability: "DISPONÍVEL",   category: "Moda" },
  { id: "15", name: "Mouse Logitech G403",      price: "R$399,99",   image: "nome",                seal: "nako",              availability: "INDISPONÍVEL", category: "Eletrônicos" },

  // --- Novos Produtos Rare Beauty (ID 16 - 35) ---
  { id: "16", name: "Soft Pinch Blush",         price: "R$159,00",   image: "rb-blush-liquid",     seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "17", name: "Iluminador Líquido",       price: "R$169,00",   image: "rb-highlighter",      seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "18", name: "Bronzer Stick",            price: "R$179,00",   image: "rb-bronzer",          seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "19", name: "Mascara Volumizing",       price: "R$139,00",   image: "rb-mascara",          seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "20", name: "Batom Matte",              price: "R$129,00",   image: "rb-lipstick",         seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "21", name: "Bruma 4-em-1",             price: "R$189,00",   image: "rb-mist",             seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "22", name: "Base Weightless",          price: "R$219,00",   image: "rb-foundation",       seal: "rare-beauty",       availability: "INDISPONÍVEL", category: "Beleza" },
  { id: "23", name: "Corretivo Bright",         price: "R$149,00",   image: "rb-concealer",        seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "24", name: "Blush Cremoso",            price: "R$145,00",   image: "rb-melting-blush",    seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "25", name: "Paleta Sombras",           price: "R$229,00",   image: "rb-eyeshadow",        seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "26", name: "Gel Sobrancelhas",         price: "R$119,00",   image: "rb-brow-gel",         seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "27", name: "Kit Blotting",             price: "R$99,00",    image: "rb-blotting",         seal: "rare-beauty",       availability: "INDISPONÍVEL", category: "Beleza" },
  { id: "28", name: "Primer Pore",              price: "R$159,00",   image: "rb-primer",           seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "29", name: "Delineador Liq.",          price: "R$125,00",   image: "rb-eyeliner",         seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "30", name: "Lápis Labial",             price: "R$99,00",    image: "rb-lipliner",         seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "31", name: "Lip Balm Dewy",            price: "R$109,00",   image: "rb-lipbalm",          seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "32", name: "Gloss Labial",             price: "R$115,00",   image: "rb-gloss",            seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "33", name: "Body Mist",                price: "R$199,00",   image: "rb-body-mist",        seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
  { id: "34", name: "Creme Mãos",               price: "R$105,00",   image: "rb-hand-cream",       seal: "rare-beauty",       availability: "INDISPONÍVEL", category: "Beleza" },
  { id: "35", name: "Lip Oil Tinted",           price: "R$135,00",   image: "rb-lipoil",           seal: "rare-beauty",       availability: "DISPONÍVEL",   category: "Beleza" },
];


export const allProductDetails: ProductDetails[] = [
  {
    id: "1",
    name: "Brownie Meio Amargo 80g",
    price: 4.70,
    description: "Recheado com uma ganache de chocolate meio amargo bem cremosa, esse brownie conquistou o coração de muita gente!\n\nINGREDIENTES:\nAchocolatado em pó, farinha de trigo enriquecida com ferro e ácido fólico, chocolate meio amargo, açúcar, ovo, manteiga, cacau em pó, emulsificante: lecitina de soja, conservante: sorbato de potássio, propionato de cálcio e conservante para doces (sal refinado, iodo, dióxido de silício), aroma de baunilha.\n\nCONTÉM GLÚTEN.\nCONTÉM LACTOSE.\nALÉRGICOS: CONTÉM OVO E DERIVADOS DE LEITE, TRIGO E SOJA.",
    images: [
      "brownie-meio-amargo", //essa é a imagem principal
       "brownie-meio-amargo-2", //imagem 2
        "tabela-nutricional-brownie-meio-amargo"], //imagem 3 
    rating: 4.5,
    reviews: 15,
    availability: "DISPONÍVEL",
    stockCount: 3, 
    seal: "cjr"
  },
  {
    id: "2",
    name: "Brownie Tradicional 80g",
    price: 3.80,
    description: "O clássico brownie tradicional com pedaços de chocolate e muito sabor. Perfeito para qualquer hora do dia.",
    images: ["brownie-tradicional"],
    rating: 4.8,
    reviews: 22,
    availability: "INDISPONÍVEL",
    stockCount: 0,
    seal: "cjr"
  },
  {
    id: "4",
    name: "Banana",
    price: 3.99,
    description: "Banana fresca e saborosa, perfeita para lanches e sobremesas.",
    images: ["banana", "banana2", "banana3"],
    rating: 4.5,
    reviews: 10,
    availability: "DISPONÍVEL",
    stockCount: 12,
    seal: "moumer"
  },
  // --- Novos Produtos Rare Beauty (Detalhes) ---
  {
    id: "16",
    name: "Soft Pinch Liquid Blush",
    price: 159.00,
    description: "Um blush líquido leve e duradouro que se funde lindamente à pele para um brilho suave e saudável. Disponível em acabamentos matte e cintilante.",
    images: ["rb-blush-liquid", "rb-blush-liquid-swatch", "rb-blush-liquid-model"],
    rating: 4.9,
    reviews: 1250,
    availability: "DISPONÍVEL",
    stockCount: 50,
    seal: "rare-beauty"
  },
  {
    id: "17",
    name: "Positive Light Liquid Luminizer",
    price: 169.00,
    description: "Iluminador líquido sedoso de segunda pele que cria um acabamento duradouro, suave e luminoso.",
    images: ["rb-highlighter", "rb-highlighter-glow"],
    rating: 4.8,
    reviews: 890,
    availability: "DISPONÍVEL",
    stockCount: 32,
    seal: "rare-beauty"
  },
  {
    id: "18",
    name: "Warm Wishes Effortless Bronzer Stick",
    price: 179.00,
    description: "Bastão bronzeador inovador que cria um brilho instantâneo e natural. Desliza suavemente e esfuma facilmente.",
    images: ["rb-bronzer", "rb-bronzer-apply"],
    rating: 4.7,
    reviews: 540,
    availability: "DISPONÍVEL",
    stockCount: 20,
    seal: "rare-beauty"
  },
  {
    id: "19",
    name: "Perfect Strokes Universal Volumizing Mascara",
    price: 139.00,
    description: "Máscara de cílios tudo-em-um que levanta, alonga, curva e dá volume a cada cílio de todos os ângulos.",
    images: ["rb-mascara", "rb-mascara-eye"],
    rating: 4.6,
    reviews: 2100,
    availability: "DISPONÍVEL",
    stockCount: 100,
    seal: "rare-beauty"
  },
  {
    id: "20",
    name: "Kind Words Matte Lipstick",
    price: 129.00,
    description: "Batom matte amanteigado, rico em pigmentos, que abraça os lábios com conforto puro o dia todo.",
    images: ["rb-lipstick", "rb-lipstick-lips"],
    rating: 4.5,
    reviews: 320,
    availability: "DISPONÍVEL",
    stockCount: 45,
    seal: "rare-beauty"
  },
  {
    id: "21",
    name: "Always an Optimist 4-in-1 Mist",
    price: 189.00,
    description: "Uma bruma facial ultra-fina que hidrata, prepara, fixa e refresca a pele para um brilho natural.",
    images: ["rb-mist"],
    rating: 4.8,
    reviews: 400,
    availability: "DISPONÍVEL",
    stockCount: 15,
    seal: "rare-beauty"
  },
  {
    id: "22",
    name: "Liquid Touch Weightless Foundation",
    price: 219.00,
    description: "Base inovadora com a sensação de um sérum, mas com cobertura média construível.",
    images: ["rb-foundation"],
    rating: 4.4,
    reviews: 150,
    availability: "INDISPONÍVEL",
    stockCount: 0,
    seal: "rare-beauty"
  },
  {
    id: "23",
    name: "Liquid Touch Brightening Concealer",
    price: 149.00,
    description: "Corretivo leve e hidratante que ilumina, disfarça imperfeições e oferece cobertura média a alta.",
    images: ["rb-concealer"],
    rating: 4.7,
    reviews: 600,
    availability: "DISPONÍVEL",
    stockCount: 28,
    seal: "rare-beauty"
  },
  {
    id: "24",
    name: "Stay Vulnerable Melting Blush",
    price: 145.00,
    description: "Blush cremoso resistente à água que derrete na pele para um rubor natural e suave.",
    images: ["rb-melting-blush"],
    rating: 4.6,
    reviews: 230,
    availability: "DISPONÍVEL",
    stockCount: 10,
    seal: "rare-beauty"
  },
  {
    id: "25",
    name: "Discovery Eyeshadow Palette",
    price: 229.00,
    description: "Paleta de sombras com 7 tons fáceis de usar em acabamentos matte e metálico.",
    images: ["rb-eyeshadow"],
    rating: 4.9,
    reviews: 110,
    availability: "DISPONÍVEL",
    stockCount: 5,
    seal: "rare-beauty"
  },
  {
    id: "26",
    name: "Brow Harmony Pencil & Gel",
    price: 119.00,
    description: "Lápis de sobrancelha triangular com gel de fixação colorido para sobrancelhas naturais e definidas.",
    images: ["rb-brow-gel"],
    rating: 4.5,
    reviews: 90,
    availability: "DISPONÍVEL",
    stockCount: 40,
    seal: "rare-beauty"
  },
  {
    id: "27",
    name: "Blotting Kit",
    price: 99.00,
    description: "Kit com papéis absorventes de oleosidade e uma esponja em pó para retoques on-the-go.",
    images: ["rb-blotting"],
    rating: 4.2,
    reviews: 50,
    availability: "INDISPONÍVEL",
    stockCount: 0,
    seal: "rare-beauty"
  },
  {
    id: "28",
    name: "Always an Optimist Pore Diffusing Primer",
    price: 159.00,
    description: "Primer em gel hidratante que suaviza a textura da pele e minimiza a aparência dos poros.",
    images: ["rb-primer"],
    rating: 4.7,
    reviews: 340,
    availability: "DISPONÍVEL",
    stockCount: 22,
    seal: "rare-beauty"
  },
  {
    id: "29",
    name: "Perfect Strokes Matte Liquid Liner",
    price: 125.00,
    description: "Delineador líquido preto intenso, à prova d'água e de longa duração com ponta de precisão.",
    images: ["rb-eyeliner"],
    rating: 4.8,
    reviews: 780,
    availability: "DISPONÍVEL",
    stockCount: 60,
    seal: "rare-beauty"
  },
  {
    id: "30",
    name: "Kind Words Matte Lip Liner",
    price: 99.00,
    description: "Lápis labial super cremoso e à prova d'água que desliza como um bálsamo.",
    images: ["rb-lipliner"],
    rating: 4.6,
    reviews: 200,
    availability: "DISPONÍVEL",
    stockCount: 35,
    seal: "rare-beauty"
  },
  {
    id: "31",
    name: "With Gratitude Dewy Lip Balm",
    price: 109.00,
    description: "Bálsamo labial hidratante com um toque de cor translúcida e brilho suave.",
    images: ["rb-lipbalm"],
    rating: 4.5,
    reviews: 150,
    availability: "DISPONÍVEL",
    stockCount: 18,
    seal: "rare-beauty"
  },
  {
    id: "32",
    name: "Stay Vulnerable Glossy Lip Balm",
    price: 115.00,
    description: "Máscara labial ultra brilhante e não pegajosa que envolve os lábios com hidratação e cor suave.",
    images: ["rb-gloss"],
    rating: 4.7,
    reviews: 410,
    availability: "DISPONÍVEL",
    stockCount: 25,
    seal: "rare-beauty"
  },
  {
    id: "33",
    name: "Find Comfort Body & Hair Fragrance Mist",
    price: 199.00,
    description: "Bruma perfumada para corpo e cabelo com notas de raspas de limão, jasmim e madeira de cashmere.",
    images: ["rb-body-mist"],
    rating: 4.9,
    reviews: 980,
    availability: "DISPONÍVEL",
    stockCount: 12,
    seal: "rare-beauty"
  },
  {
    id: "34",
    name: "Find Comfort Hydrating Hand Cream",
    price: 105.00,
    description: "Creme para mãos de rápida absorção que hidrata profundamente sem deixar sensação oleosa.",
    images: ["rb-hand-cream"],
    rating: 4.8,
    reviews: 300,
    availability: "INDISPONÍVEL",
    stockCount: 0,
    seal: "rare-beauty"
  },
  {
    id: "35",
    name: "Soft Pinch Tinted Lip Oil",
    price: 135.00,
    description: "Um óleo labial inovador que começa brilhante e deixa uma mancha de cor duradoura e confortável.",
    images: ["rb-lipoil"],
    rating: 4.8,
    reviews: 1500,
    availability: "DISPONÍVEL",
    stockCount: 80,
    seal: "rare-beauty"
  },
];