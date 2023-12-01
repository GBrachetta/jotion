"use client";

import { setCookie } from "cookies-next";
import { Fira_Mono, Inter, Lora } from "next/font/google";
import { useRouter } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useSettings } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

const inter = Inter({ subsets: ["latin"] });
const fira = Fira_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });
const lora = Lora({ subsets: ["latin"] });

export const SettingsModal = () => {
  const router = useRouter();
  const settings = useSettings();

  const handleFont = (key: string, value: string) => {
    setCookie(key, value);
    settings.onClose();
    router.refresh();
  };

  return (
    <Dialog
      onOpenChange={settings.onClose}
      open={settings.isOpen}
    >
      <DialogContent>
        <DialogHeader className="border-b pb-3">
          <h2 className="text-lg font-medium">My settings</h2>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>Appearance</Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>
          <ModeToggle />
        </div>
        <Label>Fonts</Label>
        <div className="flex justify-evenly gap-x-2">
          <Button
            className="h-12 w-20 p-0"
            onClick={() => handleFont("font", "standard")}
            size="lg"
            variant="default"
          >
            <p className={cn("text-3xl", inter.className)}>Text</p>
          </Button>
          <Button
            className="h-12 w-20 p-0"
            onClick={() => handleFont("font", "mono")}
            size="lg"
            variant="default"
          >
            <p className={cn("text-3xl", fira.className)}>Text</p>
          </Button>
          <Button
            className="h-12 w-20 p-0"
            onClick={() => handleFont("font", "lora")}
            size="lg"
            variant="default"
          >
            <p className={cn("text-3xl", lora.className)}>Text</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
