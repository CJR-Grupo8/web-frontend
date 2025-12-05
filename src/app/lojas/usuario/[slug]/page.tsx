"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { lojaService, produtoService } from '@/services/api';
import NavBar from "@/components/NavBar";
import EditStoreModal from '@/components/EditStoreModal';
import ProductCarousel from '@/components/ProductCarousel';
import ProductCatalog from '@/components/ProductCatalog';
import StoreComments from '@/components/StoreComments'; 

import "@/styles/app-css/lojas.css";

function StarDisplay({ count, size = '1rem' }: { count: number, size?: string }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
     stars.push(i <= Math.ceil(count) ? '★' : '☆');
  }
  return <div style={{ fontSize: size, color: '#FACC15' }}>{stars.join('')}</div>;
}

type Loja = {
  id: number;
  nome: string;
  descricao?: string;
  categoria?: string;
  createdAt: string;
  dono?: {
    id: number;
    fullName: string;
    username: string;
  };
};

type Produto = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
  estoque?: number;
};

export default function LojaUsuarioPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string | undefined;

  const [loja, setLoja] = useState<Loja | null>(null);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    if (slug) {
      loadLojaData();
    } else {
      setNotFoundError(true);
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    checkIfOwner();
  }, [loja]);

  const checkIfOwner = () => {
    if (!loja) return;
    
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      setIsOwner(false);
      return;
    }

    try {
      const user = JSON.parse(userStr);
      setIsOwner(user.id === loja.dono?.id);
    } catch {
      setIsOwner(false);
    }
  };

  const loadLojaData = async () => {
    if (!slug) {
      setNotFoundError(true);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Carregando loja de usuário com slug:', slug);
      
      // Buscar todas as lojas e encontrar pela correspondência do nome
      const lojasResponse = await lojaService.getAll();
      const lojaEncontrada = lojasResponse.data.find((l: Loja) => {
        const lojaSlug = l.nome.toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');
        return lojaSlug === slug;
      });

      if (!lojaEncontrada) {
        setNotFoundError(true);
        setLoading(false);
        return;
      }

      console.log('Loja encontrada:', lojaEncontrada);
      setLoja(lojaEncontrada);

      // Buscar produtos da loja
      const produtosResponse = await produtoService.getByLoja(lojaEncontrada.id);
      console.log('Produtos carregados:', produtosResponse.data.length);
      setProdutos(produtosResponse.data);

    } catch (error: any) {
      console.error("Erro ao carregar loja:", error);
      if (error.response?.status === 404) {
        setNotFoundError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <NavBar />
        <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
          Carregando loja...
        </div>
      </div>
    );
  }

  if (notFoundError || !loja) {
    notFound();
  }

  const bestRatedProducts = produtos.slice(0, 6);

  const comments = [
    { 
      id: 1, 
      name: "Sofia Figueiredo", 
      avatar: "https://placehold.co/50x50/E2D9C8/A4907C?text=SF", 
      rating: 5,
      text: "Adorei os produtos desta loja!"
    },
  ];

  const handleStoreUpdate = (newStoreName?: string) => {
    setShowEditModal(false);
    
    if (newStoreName) {
      // Gerar novo slug a partir do novo nome
      const newSlug = newStoreName.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      
      // Redirecionar para a nova URL
      router.push(`/lojas/usuario/${newSlug}`);
    } else {
      // Se o nome não mudou, apenas recarregar
      loadLojaData();
    }
  };

  return (
    <div className="store-page-container">
      <NavBar />

      {/* Modal de Edição */}
      {loja && (
        <EditStoreModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          storeId={loja.id}
          storeName={loja.nome}
          storeDescription={loja.descricao}
          storeCategoria={loja.categoria}
          onSuccess={handleStoreUpdate}
        />
      )}

      <header 
        className="store-hero" 
        style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} 
      >
      
        {/* Botões de Edição - Apenas para o dono */}
        {isOwner && (
          <div className="store-edit-buttons">
            <button
              className="edit-btn"
              title="Editar Loja"
              onClick={() => setShowEditModal(true)}
            >
              ✎
            </button>
            <button
              className="add-btn"
              title="Adicionar Produto"
              onClick={() => alert("Adicionar Produto: funcionalidade não implementada ainda")}
            >
              +
            </button>
          </div>
        )}

        <div className="store-hero__content">
          <h1 className="store-hero__title">{loja.nome}</h1>
          {loja.categoria && (
            <p className="store-hero__category">{loja.categoria}</p>
          )}
        </div>
        
        {loja.dono && (
          <div 
            className="store-hero__owner"
            onClick={() => router.push(`/usuario/${loja.dono!.username}`)}
            style={{ cursor: 'pointer' }}
          >
            by <span style={{textDecoration: 'underline'}}>{loja.dono.fullName}</span>
          </div>
        )}
      </header>

      <section className="store-rating-section">
        <h2 className="store-rating__title">Reviews e Comentários</h2>
        <div className="store-rating__score">4.5</div>
        <div className="store-rating__stars">
           <StarDisplay count={4.5} size="2.5rem" />
        </div>
        <a href="#" className="store-rating__link">
          ver mais (120 reviews)
        </a>

        <StoreComments comments={comments} />

      </section>

      <div className="store-products-section">
        
        {bestRatedProducts.length > 0 ? (
             <ProductCarousel 
                title="Produtos melhor avaliados" 
                items={bestRatedProducts.map(p => ({
                  id: String(p.id),
                  name: p.nome,
                  image: 'https://placehold.co/300x300/ccc/fff?text=' + p.nome.substring(0, 2),
                  price: String(p.preco),
                  rating: 4.5,
                  discount: 0,
                  seal: loja.nome,
                  availability: (p.estoque && p.estoque > 0) ? "DISPONÍVEL" : "INDISPONÍVEL",
                  category: (loja.categoria || 'outros') as any
                }))} 
            />
        ) : (
            <p style={{textAlign: 'center', padding: '2rem'}}>Esta loja ainda não possui produtos cadastrados.</p>
        )}

        <div style={{ marginTop: '2rem' }}>
             <ProductCatalog initialProducts={produtos.map(p => ({
               id: String(p.id),
               name: p.nome,
               image: 'https://placehold.co/300x300/ccc/fff?text=' + p.nome.substring(0, 2),
               price: String(p.preco),
               rating: 4.5,
               discount: 0,
               seal: loja.nome,
               availability: (p.estoque && p.estoque > 0) ? "DISPONÍVEL" : "INDISPONÍVEL",
               category: (loja.categoria || 'outros') as any
             }))} itemsPerPage={8} />
        </div>

      </div>
    </div>
  );
}
