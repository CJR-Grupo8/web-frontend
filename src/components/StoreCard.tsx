import Link from 'next/link';
import type { Store } from '@/data/stores';

type StoreCardProps = {
  store: Store;
  variant?: 'carousel' | 'grid' | 'card';
  hrefBase?: string;
  hrefOverride?: string;
};

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function StoreCard({
  store,
  variant = 'carousel',
  hrefBase = '/lojas',
  hrefOverride,
}: StoreCardProps) {
  const slug = store.slug ?? toSlug(store.name);
  const targetHref = hrefOverride ?? `${hrefBase}/${slug}`;

  return (
    <Link href={targetHref} className={`store-card store-card--${variant}`}>
      <div className="store-card-logo">
        <img src={store.logo} alt={store.name} />
      </div>
      <div className="store-card-name">{store.name}</div>
      <div className="store-card-category">{store.categoryLabel}</div>
    </Link>
  );
}
