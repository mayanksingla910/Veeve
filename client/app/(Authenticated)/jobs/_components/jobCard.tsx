"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, EllipsisVertical, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import JobCardOptions from "./jobCardOptions";
import { Job } from "@/types/jobSchema";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import JobDialog from "./JobDialog";

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card
          className="group hover:shadow-[1px_1px_15px_2px_rgba(0,0,0,0.1)] shadow-none 
          transition-all duration-200
          border border-muted/80 py-4 md:p-6"
        >
          <CardContent className="px-4 md:px-0 flex  gap-2 md:gap-4">
            <Avatar className="size-12">
              <AvatarImage src={job.logo} alt={job.company} />
              <AvatarFallback>{job.company[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 flex justify-between min-w-0">
              <div className="flex flex-col justify-between items-start gap-2">
                <div>
                  <h2 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    {job.company}
                  </h2>
                  <div className="flex items-center text-muted-foreground text-xs md:mt-1">
                    <span className="flex">
                      <MapPin className="size-3" /> {job.location}
                    </span>
                    <Dot />
                    <span>{job.postedAt}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="flex flex-col justify-between gap-4">
                <Popover>
                  <PopoverTrigger asChild className="sm:hidden block ">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="h-fit w-fit p-2 
                  rounded-md active:bg-muted active:scale-90 transition-all"
                    >
                      <EllipsisVertical className="size-4" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="left" className="w-fit p-2">
                    <JobCardOptions jobId={job.id} popOver={true} />
                  </PopoverContent>
                </Popover>
                <div className="sm:flex hidden items-end shrink-0">
                  <JobCardOptions jobId={job.id} />
                </div>

                <Button className="group-hover:opacity-100 opacity-0 md:block hidden transition-opacity">
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="min-w-6xl">
        <JobDialog />
      </DialogContent>
    </Dialog>
  );
}

export default JobCard;
