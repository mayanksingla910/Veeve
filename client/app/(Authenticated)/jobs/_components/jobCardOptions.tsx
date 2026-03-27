"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Bookmark, CircleOffIcon, Share2, X } from "lucide-react";

interface Option {
  label: string;
  icon: React.ReactNode;
  action: (id: string) => void;
  variant?: "ghost" | "destructive";
}

const options: Option[] = [
  {
    label: "Save",
    icon: <Bookmark />,
    action: (id) => console.log("Save", id),
  },
  {
    label: "Share",
    icon: <Share2 />,
    action: (id) => console.log("Star", id),
  },
  {
    label: "Report",
    icon: <CircleOffIcon />,
    action: (id) => console.log("Report", id),
    variant: "destructive",
  },
  {
    label: "Close",
    icon: <X className="size-5" />,
    action: (id) => console.log("Close", id),
  },
];

function JobCardOptions({
  jobId,
  popOver = false,
  jobDetailsDialog = false,
}: {
  jobId: string;
  popOver?: boolean;
  jobDetailsDialog?: boolean;
}) {
  return (
    <TooltipProvider delayDuration={500}>
      <div className={`flex gap-1 ${popOver ? "flex-col" : "flex-row"}`}>
        {options.map((option) => {
          if (jobDetailsDialog && option.label === "Report") return null;
          if (!jobDetailsDialog && option.label === "Close") return null;

          return (
            <Tooltip key={option.label}>
              <TooltipTrigger asChild>
                <Button
                  size={
                    popOver ? "default" : jobDetailsDialog ? "icon-lg" : "icon"
                  }
                  variant={
                    option.variant || (jobDetailsDialog ? "outline" : "ghost")
                  }
                  className={`active:scale-90 transition-all ${popOver ? "w-full justify-start active:bg-muted/70" : ""}`}
                  // onClick={() => option.action(jobId)}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {option.icon}
                  {popOver && (
                    <p className="text-xs text-muted-foreground">
                      {option.label}
                    </p>
                  )}
                </Button>
              </TooltipTrigger>
              {!popOver && <TooltipContent>{option.label}</TooltipContent>}
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}

export default JobCardOptions;
