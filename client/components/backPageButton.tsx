"use client";

import { MoveLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface BackPageButtonProps {
  onBeforeNavigate?: () => Promise<boolean> | boolean;
}

function BackPageButton({ onBeforeNavigate }: BackPageButtonProps) {
  const router = useRouter();

  async function handleClick() {
    if (onBeforeNavigate) {
      const canLeave = await onBeforeNavigate();
      if (!canLeave) return;
    }
    router.back();
  }

  return (
    <Button
      type="button"
      size="icon"
      variant="ghost"
      onClick={handleClick}
      className="size-12 hover:bg-muted active:scale-95 active:bg-muted"
    >
      <MoveLeft className="size-8" />
    </Button>
  );
}

export default BackPageButton;
