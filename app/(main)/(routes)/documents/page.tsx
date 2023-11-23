"use client";

import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const { user } = useUser();

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <Image
        alt="Empty"
        className="dark:hidden"
        height={300}
        src="/empty.png"
        width={300}
      />
      <Image
        alt="Empty"
        className="hidden dark:block"
        height={300}
        src="/empty-dark.png"
        width={300}
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.firstName}&apos;s Jotion
      </h2>
      <Button>
        <PlusCircle className="mr-2 h-4 w-4" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
