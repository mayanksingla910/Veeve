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

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  return (
    <Card className="group hover:shadow-md shadow-none hover:-translate-y-1 transition-all duration-300 border-muted/60">
      <CardContent className=" flex gap-4">
        <Avatar className="size-12">
          <AvatarImage src={job.logo} alt={job.company} />
          <AvatarFallback>{job.company[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div>
              <h2 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                {job.company}
              </h2>
              <div className="flex items-center text-muted-foreground text-xs mt-1">
                <span className="flex">
                  <MapPin className="size-3" /> {job.location}
                </span>
                <Dot />
                <span>{job.postedAt}</span>
              </div>
            </div>
            {/* <Button className="" variant="secondary">Apply</Button> */}
            <Popover>
              <PopoverTrigger asChild className="sm:hidden block ">
                <div
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
          </div>

          <div className="flex flex-row justify-between gap-4">
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mt-2">
              {job.description}
            </p>
            <div className="sm:flex hidden items-end shrink-0">
              <JobCardOptions jobId={job.id} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default JobCard;
