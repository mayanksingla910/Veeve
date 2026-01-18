"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";

function MiniProfile() {
  return (
    <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto w-full h-15">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src="" />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
        <span className="font-bold">mayanksingla</span>
      </div>
      <div className="flex gap-2">
        <Button>
          Contact
        </Button>
        <Button size="icon" variant="ghost">
          <Ellipsis className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default MiniProfile;