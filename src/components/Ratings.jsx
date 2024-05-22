import React from "react";
import { Star, StarHalf } from "lucide-react";

export default function Rating({ count }) {
  // Calculate the number of full stars
  const fullStars = Math.floor(count);
  // Check if there's a need for a half star
  const hasHalfStar = count % 1 !== 0;

  return (
    <div className="flex">
      {/* Render full stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <Star key={index} className="text-yellow-500 fill-current" />
      ))}
      {/* Render half star if needed */}
      {hasHalfStar && (
        <StarHalf key="half-star" className="text-yellow-500 fill-current" />
      )}
    </div>
  );
}
