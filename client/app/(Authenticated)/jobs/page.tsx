import { Button } from "@/components/ui/button";
import FilterSidebar from "./_components/filterSidebar";
import JobCard from "./_components/jobCard";
import { HardHat, RotateCcw } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import JobPostButtons from "./_components/jobPostButtons";

const MOCK_JOBS = Array.from({ length: 10 }).map((_, i) => ({
  id: `${i}`,
  company: "TechCorp",
  logo: `https://i.pravatar.cc/150?u=${i}`,
  location: "Delhi, India",
  postedAt: "7 days ago",
  description:
    "Looking for a Video Editor to join our team. We are looking for someone with a passion for video editing and a desire to learn new skills. If you have a knack for video editing, we would love to hear from you.",
}));

export default function JobFeedPage() {
  return (
    <main className="container mx-auto flex flex-col lg:flex-row gap-8">
      <div className="flex-1 w-full max-w-4xl mx-auto lg:mx-0 space-y-6">
        <header className=" flex justify-between items-center mr-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Recommended Jobs
          </h1>
          <div className="flex gap-2 lg:hidden">
            <Popover>
              <PopoverTrigger className="active:scale-90 size-8 p-2 flex items-center justify-center rounded-md bg-primary text-primary-foreground transition-all">
                <HardHat />
              </PopoverTrigger>
              <PopoverContent side="right" className="w-fit p-1 py-2">
                <JobPostButtons isMobile={true}/>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        <div className="grid grid-cols-2 gap-4 max-w-lg ml-auto lg:hidden">
          <Button
            variant="secondary"
            className="active:scale-95 active:bg-muted/60 uppercase"
          >
            Filters
          </Button>

          <Button
            variant="outline"
            className="uppercase active:scale-95 active:bg-muted/60 flex gap-1"
          >
            <RotateCcw className="size-3" /> Clear
          </Button>
        </div>

        <div className="space-y-3 md:space-y-4">
          {MOCK_JOBS.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

      <aside className="hidden lg:block w-80 shrink-0">
        <FilterSidebar />
      </aside>
    </main>
  );
}
