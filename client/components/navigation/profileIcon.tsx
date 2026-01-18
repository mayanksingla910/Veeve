"use client";
import { ChevronDown } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

function ProfileIcon() {
  return (
    <Popover>
      <PopoverTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`h-12 md:flex gap-2 p-2 items-center cursor-pointer rounded-lg 
              transition-color ease-in-out duration-150 hover:bg-muted hidden
              `}
            >
              <Avatar
                className={`font-bold size-10`}
              >
                <AvatarImage src="" />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <ChevronDown />
            </div>
          </TooltipTrigger>
          <TooltipContent>Accounts</TooltipContent>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent className="mr-3"></PopoverContent>
    </Popover>
  );
}

export default ProfileIcon;
