import { Users } from "lucide-react";
import { FacilityBadge } from "./FacilityBadge";
import { StarRating } from "./StarRating";
import type { AboutType } from "@/types/guest-room.type";

export const AboutSection = ({
  about,
  facilities,
}: {
  about: AboutType;
  facilities: string[];
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          Description
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {about.description}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          Facilities
        </h3>
        <div className="flex flex-wrap gap-2">
          {facilities.map((facility, idx) => (
            <FacilityBadge key={idx} facility={facility} />
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-xl border border-primary/20">
        <h3 className="text-xl font-semibold mb-3 text-foreground">
          Rating Overview
        </h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(about.review.averageRating)} />
            <span className="text-lg font-semibold text-foreground">
              {about.review.averageRating.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users size={16} />
            <span>{about.review.totalReviewers} reviews</span>
          </div>
        </div>
      </div>
    </div>
  );
};
