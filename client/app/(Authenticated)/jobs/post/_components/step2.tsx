"use client";

import { MultiSelect } from "@/components/multiSelect";
import {
  FieldGroup,
  FieldLabel,
  FieldDescription,
  Field,
  FieldError,
} from "@/components/ui/field";
import { JobFormData } from "@/types/jobSchema";
import { useFormContext } from "react-hook-form";

const EDIT_TYPES = [
  "Short-form (Reels / TikTok / Shorts)",
  "Long-form (YouTube / Documentary)",
  "Corporate / Brand",
  "Wedding & Events",
  "Music Video",
  "Commercial / Ad",
  "Narrative / Film",
  "News & Broadcast",
  "Social Media Content",
  "Motion Graphics",
  "Animation",
  "Podcast / Interview",
  "Real Estate",
  "Sports Highlight",
  "E-learning / Tutorial",
];

const SOFTWARES = [
  "Adobe Premiere Pro",
  "Final Cut Pro",
  "DaVinci Resolve",
  "Avid Media Composer",
  "Adobe After Effects",
  "Adobe Audition",
  "Logic Pro",
  "CapCut",
  "iMovie",
  "Vegas Pro",
  "Lightworks",
  "Kdenlive",
  "Blender",
  "Cinema 4D",
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Figma",
  "Frame.io",
  "LucidLink",
];

function Step2Requirements() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<JobFormData>();

  return (
    <FieldGroup className="space-y-6">
      <Field>
        <FieldLabel>
          Edit Types <span className="text-destructive">*</span>
        </FieldLabel>
        <FieldDescription className="text-xs mb-2">
          What kind of editing will this role involve? Select all that apply or
          add your own.
        </FieldDescription>
        <MultiSelect
          options={EDIT_TYPES}
          value={watch("editTypes")}
          onChange={(v) => setValue("editTypes", v, { shouldValidate: true })}
          placeholder="e.g. Short-form, Documentary..."
          createLabel="Add edit type"
        />
        <FieldError errors={[errors.editTypes]} />
      </Field>

      <Field>
        <FieldLabel>Software & Tools</FieldLabel>
        <FieldDescription className="text-xs mb-2">
          Which tools should the candidate know? Add required or preferred
          software.
        </FieldDescription>
        <MultiSelect
          options={SOFTWARES}
          value={watch("softwares")}
          onChange={(v) => setValue("softwares", v, { shouldValidate: true })}
          placeholder="e.g. Premiere Pro, DaVinci Resolve..."
          createLabel="Add software"
        />
      </Field>
      <FieldError errors={[errors.softwares]} />
    </FieldGroup>
  );
}

export default Step2Requirements;
