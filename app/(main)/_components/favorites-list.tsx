"use client";

import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";

import { Item } from "./item";

export const FavoritesList = () => {
  const params = useParams();
  const router = useRouter();

  const documents = useQuery(api.documents.getFavorites);

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return <Item.Skeleton />;
  }

  return (
    <>
      <p className="hidden py-1 pl-[18px] text-sm font-medium text-muted-foreground/80 last:block">
        No favorites yet
      </p>
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            active={params.documentId === document._id}
            documentIcon={document.icon}
            icon={FileIcon}
            id={document._id}
            isFavorite={document.isFavorite}
            label={document.title}
            onClick={() => onRedirect(document._id)}
          />
        </div>
      ))}
    </>
  );
};
