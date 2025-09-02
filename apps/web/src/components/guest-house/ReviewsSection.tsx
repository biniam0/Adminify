import { Star } from "lucide-react";
import { Card } from "../ui/card";
import { StarRating } from "./StarRating";

export const ReviewsSection = ({
  feedback,
}: {
  feedback: { message: string; rating: number }[];
}) => {
  if (!feedback || feedback.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground/60 mb-2">
          <Star className="w-12 h-12 mx-auto" />
        </div>
        <p className="text-muted-foreground">No reviews available yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-foreground">Guest Reviews</h3>
      <div className="grid gap-4">
        {feedback.map((review, idx) => (
          <Card
            key={idx}
            className="p-4 border border-border shadow-sm bg-card"
          >
            <div className="flex items-start justify-between mb-2">
              <StarRating rating={review.rating} />
              <span className="text-sm text-muted-foreground">
                Review #{idx + 1}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {review.message}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
