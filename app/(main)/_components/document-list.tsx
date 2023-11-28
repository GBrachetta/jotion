"use client";

import { useQuery } from "convex/react";
import { FileIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";

import { Item } from "./item";

interface DocumentListProps {
  data?: Doc<"documents">[];
  level?: number;
  parentDocumentId?: Id<"documents">;
}

export const DocumentList = ({
  data,
  level = 0,
  parentDocumentId,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
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

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
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
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            active={params.documentId === document._id}
            documentIcon={document.icon}
            expanded={expanded[document._id]}
            icon={FileIcon}
            id={document._id}
            label={document.title}
            level={level}
            onClick={() => onRedirect(document._id)}
            onExpand={() => onExpand(document._id)}
          />
          {expanded[document._id] && (
            <DocumentList
              level={level + 1}
              parentDocumentId={document._id}
            />
          )}
        </div>
      ))}
    </>
  );
};
