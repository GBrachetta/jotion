import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 dark:bg-[#1f1f1f]">
      <h1 className="pb-4 text-4xl">The page you requested was not found</h1>

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
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
