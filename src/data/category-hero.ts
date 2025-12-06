export const CATEGORY_HERO: Record<
  string,
  {
    lines: string[];
    imageSrc: string;
    imageAlt?: string;
    background?: string;
  }
> = {
  mercado: {
    lines: ["Tudo do seu", "mercado favorito"],
    imageSrc: "/hero/mercado.png",
    background: "black",
  },

  farmacia: {
    lines: ["Cuide bem de você", "com os melhores produtos"],
    imageSrc: "/hero/farmacia.png",
    background: "black",
  },

  beleza: {
    lines: ["Realce sua beleza", "com marcas incríveis"],
    imageSrc: "/hero/beleza.png",
    background: "black",
  },

  moda: {
    lines: ["Estilo para todos", "os momentos"],
    imageSrc: "/hero/moda.png",
    background: "black",
  },

  eletronicos: {
    lines: ["A tecnologia", "ao seu alcance"],
    imageSrc: "/hero/eletronicos.png",
    background: "black",
  },

  jogos: {
    lines: ["Diversão sem limites", "para todas as idades"],
    imageSrc: "/hero/jogos.png",
    background: "black",
  },

  brinquedos: {
    lines: ["Brincar é aprender", "todos os dias"],
    imageSrc: "/hero/brinquedos.png",
    background: "black",
  },

  casa: {
    lines: ["Tudo para sua casa", "ficar do seu jeito"],
    imageSrc: "/hero/casa.png",
    background: "black",
  },

  outros: {
    lines: ["Explore novas categorias", "e descubra novidades"],
    imageSrc: "/hero/outros.png",
    background: "black",
  },

  // ⭐ DEFAULT UNIVERSAL — usado quando a categoria não existe
  default: {
    lines: ["Explore nossos produtos", "e encontre o que precisa"],
    imageSrc: "/hero/default.png",
    background: "black",
  },
};
