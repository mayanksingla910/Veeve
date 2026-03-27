import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import JobCardOptions from "./jobCardOptions";
import { Job } from "@/types/jobSchema";
import HeaderDetailBadges from "./headerDetailBadges";

interface JobDetailsDialogProps {
  job: Job;
}

function JobDetailsDialog({ job }: JobDetailsDialogProps) {
  return (
    <div>
      <DialogHeader className="flex flex-col gap-6"> 
        <div className="flex  justify-between gap-6">
          <div className="flex gap-4 items-center">
            <Avatar className="size-16">
              <AvatarImage src={job.logo} alt={job.company} />
              <AvatarFallback>{job.company[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h2 className="text-muted-foreground uppercase tracking-wider text-sm font-semibold">
                {job.company}
              </h2>
              <DialogTitle className="text-2xl font-bold">
                Video Editor
              </DialogTitle>
            </div>
          </div>
          <div className="mt-2">
            <JobCardOptions jobId={job.id} jobDetailsDialog={true} />
          </div>
        </div>
        <HeaderDetailBadges />
      </DialogHeader>
      <ScrollArea></ScrollArea>
      <DialogFooter>
        <div></div>
        <Button>Apply Now</Button>
      </DialogFooter>
    </div>
  );
}

export default JobDetailsDialog;
