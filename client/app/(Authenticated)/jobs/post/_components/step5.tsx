"use client";

import { useFormContext } from "react-hook-form";
import { JobFormData, COUNTRIES, EXPERIENCE_LEVELS } from "@/types/jobSchema";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Briefcase, Star, DollarSign, Clapperboard, Wrench } from "lucide-react";
import RichTextDisplay from "@/components/richTextEditor/richTextDisplay";

function ReviewRow({ icon: Icon, label, value }: {
  icon: React.ElementType;
  label: string;
  value?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function TagRow({ icon: Icon, label, tags }: {
  icon: React.ElementType;
  label: string;
  tags: string[];
}) {
  if (!tags.length) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <Badge key={t} variant="secondary" className="font-normal text-xs">
              {t}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function Step5Review() {
  const { getValues } = useFormContext<JobFormData>();
  const data = getValues();

  // Resolve labels from values for display
  const countryLabel = COUNTRIES.find((c) => c.value === data.country)?.label;
  const experienceLabel = EXPERIENCE_LEVELS.find((l) => l.value === data.experienceLevel)?.label;

  const locationLabel = [
    data.locationType
      ? data.locationType.charAt(0).toUpperCase() + data.locationType.slice(1)
      : "",
    data.region,
    countryLabel,
  ]
    .filter(Boolean)
    .join(", ");

  const salaryLabel =
    data.salaryMin || data.salaryMax
      ? `${data.currency} ${data.salaryMin || "?"} – ${data.salaryMax || "?"}`
      : "Competitive (not specified)";

  return (
    <div className="space-y-6">
      {/* Header preview */}
      <div className="rounded-xl border bg-muted/30 p-4 space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">
              {data.jobRole || <span className="text-muted-foreground italic">No title</span>}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              {data.jobSummary || <span className="italic">No summary provided</span>}
            </p>
          </div>
          {data.jobType && (
            <Badge variant="secondary" className="shrink-0 capitalize">
              {data.jobType.replace("-", " ")}
            </Badge>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="grid sm:grid-cols-2 gap-4">
        <ReviewRow icon={MapPin}     label="Location"   value={locationLabel || undefined} />
        <ReviewRow icon={Briefcase}  label="Employment" value={data.jobType?.replace("-", " ")} />
        <ReviewRow icon={Star}       label="Experience" value={experienceLabel} />
        <ReviewRow icon={DollarSign} label="Salary"     value={salaryLabel} />
      </div>

      {/* Skill tags */}
      {(data.editTypes.length > 0 || data.softwares.length > 0) && (
        <>
          <Separator />
          <div className="space-y-4">
            <TagRow icon={Clapperboard} label="Edit Types"       tags={data.editTypes} />
            <TagRow icon={Wrench}       label="Software & Tools" tags={data.softwares} />
          </div>
        </>
      )}

      <Separator />

      {/* Description */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
          Job Description Preview
        </p>
        {data.jobDescription ? (
          <div className="rounded-lg border bg-muted/20 overflow-hidden">
            <RichTextDisplay html={data.jobDescription} />
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No description added yet. Go back to Step 4 to add one.
          </div>
        )}
      </div>
    </div>
  );
}

export default Step5Review;