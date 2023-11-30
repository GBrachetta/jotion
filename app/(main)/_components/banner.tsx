"use client";

import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
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

interface BannerProps {
  document: Doc<"documents">;
}

export const Banner = ({ document }: BannerProps) => {
  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = async () => {
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
      loading: "Deleting document...",
      success: "Document deleted!",
      error: "Failed to delete document.",
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: document._id });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document Restored!",
      error: "Failed to restore document.",
    });
  };

  return (
    <div className="flex w-full items-center justify-center gap-x-2 bg-rose-500 p-2 text-center text-sm text-white">
      <p>This page is in the trash</p>
      <Button
        className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
        onClick={onRestore}
        size="sm"
        variant="outline"
      >
        Restore
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          className="h-auto border-white bg-transparent p-1 px-2 font-normal text-white hover:bg-primary/5 hover:text-white"
          size="sm"
          variant="outline"
        >
          Delete
        </Button>
      </ConfirmModal>
    </div>
  );
};
