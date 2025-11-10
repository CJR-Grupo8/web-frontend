export type StoreCategory =
  | 'mercado'
  | 'farmacia'
  | 'beleza'
  | 'moda'
  | 'eletronicos'
  | 'jogos'
  | 'brinquedos'
  | 'casa';

export type Store = {
  id: number;
  slug: string;
  name: string;
  category: StoreCategory;
  categoryLabel: string;
  logo: string;
};

export const STORES: Store[] = [
  {
    id: 1,
    slug: 'cjr',
    name: 'CJR',
    category: 'mercado',
    categoryLabel: 'mercado',
    logo: '/images/lojas/cjr.svg',
  },
  {
    id: 2,
    slug: 'rare-beauty',
    name: 'Rare Beauty',
    category: 'beleza',
    categoryLabel: 'beleza',
    logo: '/images/lojas/rare-beauty.svg',
  },
  {
    id: 3,
    slug: 'the-croc-brew',
    name: 'The Croc Brew',
    category: 'mercado',
    categoryLabel: 'mercado',
    logo: '/images/lojas/the-croc-brew.svg',
  },
  {
    id: 4,
    slug: 'mini-reno',
    name: 'Mini Reno',
    category: 'casa',
    categoryLabel: 'casa',
    logo: '/images/lojas/mini-reno.svg',
  },
  {
    id: 5,
    slug: 'amoca',
    name: 'amoca',
    category: 'moda',
    categoryLabel: 'moda',
    logo: '/images/lojas/amoca.svg',
  },
  {
    id: 6,
    slug: 'repiit',
    name: 'Repiit',
    category: 'eletronicos',
    categoryLabel: 'eletrônicos',
    logo: '/images/lojas/repiit.svg',
  },
  {
    id: 7,
    slug: 'cream',
    name: 'Cream',
    category: 'beleza',
    categoryLabel: 'beleza',
    logo: '/images/lojas/cream.svg',
  },
];
