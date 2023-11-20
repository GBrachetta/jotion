import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export const Logo = () => {
  return (
    <div className="hidden items-center gap-x-2 md:flex">
      <Link href="/">
        <Image
          alt="Logo"
          className="dark:hidden"
          height={40}
          src="/logo.svg"
          width={40}
        />
      </Link>
      <Link href="/">
        <Image
          alt="Logo"
          className="hidden dark:block"
          height={40}
          src="/logo-dark.svg"
          width={40}
        />
      </Link>
      <p className={cn("font-semibold", font.className)}>Jotion</p>
    </div>
  );
};
