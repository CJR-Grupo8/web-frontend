import React from 'react';
import {Star} from 'lucide-react'

interface ReviewCardProps{
    id: number | string;
    author: string;
    avatar: string;
    rating: number;
    text?: string;
    date?:string;
}

export default function ReviewCard({author,avatar,rating,text,date}: ReviewCardProps){
    return(
        <div className="bg-white text-black p-6 rounded-2x1 shadow-sm border border-gray-100 min-w-[300px] w-full md:max-w-[350px] flex flex-col h-full flex-shrink-0">
            {/* avatar e nome */}
            <div className="flex, justifiy-between item-start mb-4">
                <div className="flex items-center gap-3">
                    <img
                    src={avatar}
                    alt={author}
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 bg-gray-100"
                    />
                    <div>
                        <h4 className="font-bold text-sm text-gray-900">{author}</h4>
                        {date && <span className="text-sm text-gray-400">{date}</span>}
                    </div>
                </div>
            </div>

            {/*estrelas*/}
            <div className="flex mb-3">
                {Array.from({length: 5}).map((_, i) => (
                    <Star
                    key={i}
                    size={16}
                    className={`${i < rating ? "fill-yellow-400 text-yellow-400": "text-gray-300"}`}
                    />
                ))}
            </div>

            {/* texto de comentario */}
            {text && (
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                    {text}
                </p>
            )}
        </div>
    );
}