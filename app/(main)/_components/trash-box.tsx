"use client";

import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";

interface PartialContent {
  props: {
    url: string;
  };
  type: string;
}

type Content = PartialContent[];

export const TrashBox = () => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filteredDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    document: Doc<"documents">,
  ) => {
    event.stopPropagation();
    const promise = restore({ id: document._id });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  const onRemove = async (document: Doc<"documents">) => {
    if (document.coverImage) {
      const url = document.coverImage;

      await edgestore.publicFiles.delete({ url });
    }

    if (document.content?.includes("image")) {
      const parsedContent: Content = JSON.parse(document.content);

      const urls = parsedContent
        .filter((content) => content.type === "image")
        .map((content) => content.props.url);

      for (const url of urls) {
        await edgestore.publicFiles.delete({ url });
      }
    }

    const promise = remove({ id: document._id });

    toast.promise(promise, {
      loading: "Removing note...",
      success: "Note removed!",
      error: "Failed to remove note.",
    });

    if (params.documentId === document._id) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          className="h-7 bg-secondary px-2 focus-visible:ring-transparent"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by page title..."
          value={search}
        />
      </div>
      <div className="mt-2 px-1 pb-1">
        <p className="hidden pb-2 text-center text-xs text-muted-foreground last:block">
          No documents found
        </p>
        {filteredDocuments?.map((document) => (
          <div
            className="flex w-full items-center justify-between rounded-sm text-sm text-primary hover:bg-primary/5"
            key={document._id}
            onClick={() => onClick(document._id)}
            role="button"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                onClick={(e) => onRestore(e, document)}
                role="button"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document)}>
                <div
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                  role="button"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
