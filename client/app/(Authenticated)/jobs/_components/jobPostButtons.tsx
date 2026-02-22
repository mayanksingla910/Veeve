"use client"

import { Button } from "@/components/ui/button";
import { ClipboardList, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const jobButtons = [
  {
    label: "Post a Job",
    icon: <Plus className="stroke-3" />,
    variant: "default",
    route: "/jobs/post",
  },
  {
    label: "Manage Jobs",
    icon: <ClipboardList />,
    variant: "outline",
    route: "/jobs/manage",
  },
];

function JobPostButtons({ isMobile = false }: { isMobile?: boolean }) {

  const router = useRouter();


  return (
    <div className={`w-full gap-2 ${isMobile ? "" : "mb-4 grid grid-cols-2"}`}>
      {jobButtons.map((item) => (
        <Button
          key={item.label}
          variant={isMobile ? "ghost" : item.variant as "default" | "outline"}
          onClick={() => router.push(item.route)}
          className={`flex gap-2 text-md ${isMobile ? "w-full justify-start active:scale-95 active:bg-muted/70" : "px-4 py-2"}`}
        >
          {item.icon} {item.label}
        </Button>
      ))}
    </div>
  );
}

export default JobPostButtons;
