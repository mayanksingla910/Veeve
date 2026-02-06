"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Bookmark, CircleOffIcon, Star } from "lucide-react";

interface Option {
  label: string;
  icon: React.ReactNode;
  action: (id: string) => void;
  variant?: "ghost" | "destructive";
}

const options: Option[] = [
  {
    label: "Save",
    icon: <Bookmark className="size-4" />,
    action: (id) => console.log("Save", id),
  },
  {
    label: "Star",
    icon: <Star className="size-4" />,
    action: (id) => console.log("Star", id),
  },
  {
    label: "Report",
    icon: <CircleOffIcon className="size-4" />,
    action: (id) => console.log("Report", id),
  },
];

function JobCardOptions({
  jobId,
  popOver = false,
}: {
  jobId: string;
  popOver?: boolean;
}) {
  return (
    <TooltipProvider >
      <div className={`flex gap-1 ${popOver ? "flex-col" : "flex-row"}`}>
        {options.map((option) => (
          <Tooltip key={option.label}>
            <TooltipTrigger asChild>
              <Button
                size={popOver ? "default" : "icon"}
                variant={option.variant || "ghost"}
                className={`active:scale-90 transition-transform ${popOver ? "w-full justify-start" : ""}`}
                // onClick={() => option.action(jobId)}
              >
                {option.icon}
                {popOver && <p className="text-xs text-muted-foreground">
                  {option.label}
                </p>}
              </Button>
            </TooltipTrigger>
            {!popOver && (
              <TooltipContent side="bottom">{option.label}</TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}

export default JobCardOptions;
