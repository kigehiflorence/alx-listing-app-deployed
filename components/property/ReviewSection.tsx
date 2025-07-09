import axios from "axios";
import { useState, useEffect } from "react";

interface Review {
  id: number;
  reviewerName: string;
  comment: string;
  rating: number;
}

interface ReviewSectionProps {
  propertyId: number;
}

const ReviewSection = ({ propertyId }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://api.example.com/properties/${propertyId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [propertyId]);

  if (loading) {
    return <p className="text-center">Loading reviews...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (reviews.length === 0) {
    return <p className="text-center text-gray-600">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-semibold">Guest Reviews</h2>
      {reviews.map((review) => (
        <div key={review.id} className="border p-4 rounded shadow-sm">
          <p className="font-semibold">{review.reviewerName}</p>
          <p className="text-yellow-500">Rating: {review.rating} / 5</p>
          <p className="text-gray-700 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
