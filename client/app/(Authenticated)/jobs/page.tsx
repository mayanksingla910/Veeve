import FilterSidebar from "./_components/filterSidebar";
import JobCard from "./_components/jobCard";

const MOCK_JOBS = Array.from({ length: 10 }).map((_, i) => ({
  id: `${i}`,
  company: "TechCorp",
  logo: `https://i.pravatar.cc/150?u=${i}`,
  location: "Delhi, India",
  postedAt: "7 days ago",
  description:
    "Looking for a Senior Frontend Engineer to join our core team...",
}));

export default function JobFeedPage() {
  return (
    <main className="flex min-h-screen p-4 max-w-600 mx-auto gap-8 justify-center">
      
      <div className="flex-1 space-y-4 max-w-4xl">
        <h1 className="text-xl font-bold mb-6">Recommended Jobs</h1>
        {MOCK_JOBS.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      
      <aside className="hidden lg:block w-80">
        <FilterSidebar />
      </aside>
    </main>
  );
}
