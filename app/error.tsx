"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const Error = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 dark:bg-[#1f1f1f]">
      <Image
        alt="Error"
        className="dark:hidden"
        height="300"
        src="/error.png"
        width="300"
      />
      <Image
        alt="Error"
        className="hidden dark:block"
        height="300"
        src="/error-dark.png"
        width="300"
      />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button asChild>
        <Link href="/documents">Go back</Link>
      </Button>
    </div>
  );
};

export default Error;
