import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import ReviewCard from '@/components/reviews/ReviewCard';


// funcao para barra de progresso de estrelas
function StarRow({ stars, count, percent }: { stars: number, count: number, percent: string }) {
    return (
        <div className="flex items-center gap-3 text-sm">
            <span className="w-3 text-gray-400 font-bold">{stars}</span>
            <Star size={14} className="text-gray-600" />
            <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: percent }}></div>
            </div>
            <span className="text-gray-500 w-8 text-right text-xs">{count}</span>
        </div>
    );
}

export default function AllReviewsPage({ params }: { params: { slug: string } }) {
    //mock
    const allReviews = Array.from({ length: 12 }).map((_, i) => ({
        id: i,
        author: `Cliente ${i + 1}`,
        avatar: `https://placehold.co/100x100/png?text=${i + 1}`,
        rating: i % 3 === 0 ? 5 : 4,
        text: "Produto chegou super rápido e a qualidade é incrível. O vendedor foi muito atencioso durante todo o processo.",
        date: `0${(i % 9) + 1}/10`
    }));

    return (
        <main className="min-h-screen bg-black text-white p-6 md:p-12">
            <div className="max-w-7x1 mx-auto">

                {/*header com botao de voltar */}
                <div className="flex items-center gap-4 mb-8">
                    <Link href={`/lojas/${params.slug}`} className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-2x1 md:text-3x1 font-bold">Todas as avaliações</h1>
                        <p className="text-gray-400 text-sm">Loja: {params.slug}</p>
                    </div>
                </div>

                {/* dashboard de notas */}
                <div className="bg-[#111] p-6 rounded-2x1 border border-gray-800 mb-10 flex flex-col md:flex-row items-center gap-8 shadow-lg">
                    {/*nota grande */}
                    <div className="flex flex-col items-center md:items-start min-w-[200px]">
                        <span className="text-6x1 font-bold text-white">4.8</span>
                        <div className="flex gap-1 my-2">
                            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={24} className="fill=yellow-400 text-yellow-400" />)}
                        </div>
                        <p className="text-gray-400 text-sm">Baseado em 120 avaliações</p>
                    </div>

                    {/*barra de progresso */}
                    <div className="flex-1 w-full space-y-2">
                        <StarRow stars={5} count={90} percent="80%" />
                        <StarRow stars={4} count={20} percent="15%" />
                        <StarRow stars={3} count={5} percent="3%" />
                        <StarRow stars={2} count={3} percent="1%" />
                        <StarRow stars={1} count={2} percent="1%" />
                    </div>
                </div>

                {/* Grid com todos os Comentários */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allReviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            id={review.id}
                            author={review.author}
                            avatar={review.avatar}
                            rating={review.rating}
                            text={review.text}
                            date={review.date}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}