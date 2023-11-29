"use client";

import { useMutation } from "convex/react";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

interface FavoriteProps {
  initialData: Doc<"documents">;
}

export const Favorite = ({ initialData }: FavoriteProps) => {
  const update = useMutation(api.documents.update);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFavorite = () => {
    setIsSubmitting(true);

    try {
      update({
        id: initialData._id,
        isFavorite: true,
      });
    } catch {
      toast.error("Failed to mark as favorite");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUnfavorite = () => {
    setIsSubmitting(true);

    try {
      update({
        id: initialData._id,
        isFavorite: false,
      });
    } catch (error) {
      toast.error("Failed to mark as normal");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {initialData.isFavorite ? (
        <Button
          disabled={isSubmitting}
          onClick={onUnfavorite}
          size="sm"
          variant="ghost"
        >
          <Star
            className="h-4 w-4 text-orange-400"
            fill="orange"
          />
        </Button>
      ) : (
        <Button
          disabled={isSubmitting}
          onClick={onFavorite}
          size="sm"
          variant="ghost"
        >
          <Star className="h-4 w-4" />
        </Button>
      )}
    </>
  );
};
