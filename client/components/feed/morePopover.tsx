import { Bookmark, CircleOff, Ellipsis, EyeOff, Heart } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const content = [
  { icon: <Heart className="size-4" />, text: "Like" },
  { icon: <EyeOff className="size-4" />, text: "Not Interested" },
  { icon: <Bookmark className="size-4" />, text: "Save" },
  { icon: <CircleOff className="size-4" />, text: "Report" },
];

function MorePopover() {
  return (
    <Popover>
      <PopoverTrigger>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="h-fit w-fit cursor-pointer p-1 
                  hover:bg-muted/80 rounded-md active:bg-muted 
                  border border-muted/0 active:border-muted/60 active:scale-80 transition-all"
            >
              <Ellipsis className="size-5 md:size-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">More Actions</TooltipContent>
        </Tooltip>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        {content.map((item, index) => (
          <div
            key={index}
            className="flex gap-2 items-center cursor-pointer hover:bg-muted active:scale-95 active:bg-muted/70 transition-transform duration-200 p-2 px-4 rounded-md"
          >
            {item.icon}
            <p>{item.text}</p>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export default MorePopover;
