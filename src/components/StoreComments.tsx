"use client";

import useEmblaCarousel from "embla-carousel-react";
import "@/styles/app-css/lojas.css";

type Comment = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text?: string;
};

function StarDisplay({ count, size = '1rem' }: { count: number, size?: string }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
     stars.push(i <= Math.ceil(count) ? '★' : '☆');
  }
  return <div style={{ fontSize: size, color: '#FACC15' }}>{stars.join('')}</div>;
}

export default function StoreComments({ comments }: { comments: Comment[] }) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  return (
    <div className="store-comments-viewport" ref={emblaRef}>
      <div className="store-comments-container">
        {comments.map((comment) => (
          <div key={comment.id} className="store-comments-slide">
            <div className="comment-card">
              <img 
                src={comment.avatar} 
                alt={comment.name} 
                className="comment-avatar" 
              />
              <div className="comment-info">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem'}}>
                    <h4 style={{margin: 0}}>{comment.name}</h4>
                    <StarDisplay count={comment.rating} size="0.8rem" />
                </div>
                <p style={{fontSize: '0.85rem', lineHeight: '1.4', margin: 0, opacity: 0.8}}>
                    "{comment.text}"
                </p>
                <span style={{display:'block', textAlign:'right', fontSize:'0.8rem', color:'#8B5CF6', marginTop:'0.5rem'}}>ver mais</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}