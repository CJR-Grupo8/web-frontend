import NavBar from "@/components/NavBar";
import ReviewSection from "@/components/reviews/ReviewSection";

export default function ReviewsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />

      <main>
        <ReviewSection slug={slug} />
      </main>
    </div>
  );
}
