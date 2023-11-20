import { Button } from "@/components/ui/button";

import { Logo } from "./logo";

export const Footer = () => {
  return (
    <div className="z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]">
      <Logo />
      <div className="flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end">
        <Button
          size="sm"
          variant="ghost"
        >
          Privacy Policy
        </Button>
        <Button
          size="sm"
          variant="ghost"
        >
          Terms and Conditions
        </Button>
      </div>
    </div>
  );
};
