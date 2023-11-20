import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-4xl">The page you requested was not found</h1>
      <div className="relative h-[300px] w-[300px] sm:h-[350px] sm:w-[350px] md:h-[400px] md:w-[400px]">
        <Image
          alt="Reading"
          className="object-contain dark:hidden"
          fill
          src="/reading.png"
        />
        <Image
          alt="Reading"
          className="hidden object-contain dark:block"
          fill
          src="/reading-dark.png"
        />
      </div>
      <Link href="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
