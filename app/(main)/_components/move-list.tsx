"use client";

import { useMutation, useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { Item } from "./item";
import { MoveToItem } from "./move-to-item";

interface DocumentListProps {
  data?: Doc<"documents">[];
  level?: number;
  parentDocumentId?: Id<"documents">;
}

export const MoveList = ({
  level = 0,
  parentDocumentId,
}: DocumentListProps) => {
  const move = useMutation(api.documents.move);

  const params = useParams();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId,
  });

  const currentDocument = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  const possibleDestinations = documents?.filter(
    (possibleDestination) =>
      possibleDestination._id !== params.documentId &&
      currentDocument?.parentDocument !== possibleDestination._id,
  );

  const handleMove = (documentId: Id<"documents">) => {
    if (!documentId) return;
    const promise = move({
      id: params.documentId as Id<"documents">,
      destinationId: documentId,
    });

    toast.promise(promise, {
      loading: "Moving...",
      success: "Moved!",
      error: "Failed to move.",
    });
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          "hidden py-1 text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden",
        )}
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
      >
        No pages inside
      </p>
      {possibleDestinations?.map((document) => (
        <div key={document._id}>
          <MoveToItem
            documentIcon={document.icon}
            icon={FileIcon}
            id={document._id}
            label={document.title}
            level={level}
            onClick={() => handleMove(document._id)}
            onExpand={() => onExpand(document._id)}
          />
          {expanded[document._id] && (
            <MoveList
              level={level + 1}
              parentDocumentId={document._id}
            />
          )}
        </div>
      ))}
    </>
  );
};
