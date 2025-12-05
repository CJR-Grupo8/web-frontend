"use client";

interface ReviewProps {
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export default function ReviewCard({ name, avatar, rating, comment, date }: ReviewProps) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between">

        {/* Avatar + nome */}
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={name}
            className="w-14 h-14 rounded-full object-cover border"
          />

          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="text-sm text-gray-500">{date}</span>
          </div>
        </div>

        {/* Rating */}
        <div className="text-yellow-400 text-xl font-semibold">
          {"★".repeat(rating)}
          <span className="text-gray-300">
            {"★".repeat(5 - rating)}
          </span>
        </div>
      </div>

      {/* Comentário */}
      <p className="mt-4 text-gray-700 leading-relaxed">
        {comment}
      </p>
    </div>
  );
}
