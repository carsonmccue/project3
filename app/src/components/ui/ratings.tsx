import React from "react";
import { Star } from "lucide-react";

interface RatingsProps {
	stars: number;
}

const Ratings: React.FC<RatingsProps> = ({ stars }) => {
	const maxStars = 5;
	const filledStars = Math.floor(Math.min(Math.max(stars, 0), maxStars));
	const emptyStars = maxStars - filledStars;

	return (
		<div className="flex gap-3 items-center">
			<div className="flex items-center h-4">
				{[...Array(filledStars)].map((_, index) => (
					<Star
						key={`filled-${index}`}
						className="w-4 h-4 text-yellow-400"
					/>
				))}
				{[...Array(emptyStars)].map((_, index) => (
					<Star
						key={`empty-${index}`}
						className="w-4 h-4 text-gray-300"
					/>
				))}
			</div>
			<p>{stars} stars</p>
		</div>
	);
};

export default Ratings;
