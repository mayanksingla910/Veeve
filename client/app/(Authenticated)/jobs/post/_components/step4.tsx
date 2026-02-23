"use client";

import RichTextEditor from "@/components/richTextEditor";
import { Field, FieldGroup, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field";
import { JobFormData } from "@/types/jobSchema";
import { useFormContext } from "react-hook-form";


function Step4Description() {

  const {
      watch,
      setValue,
      formState: { errors },
    } = useFormContext<JobFormData>();

  return (
    <FieldGroup className="space-y-5">
      <Field>
        <FieldLabel>
          Full Job Description <span className="text-destructive">*</span>
        </FieldLabel>
        <FieldDescription className="text-xs mb-3">
          Describe the role in detail — responsibilities, requirements, what makes your team great. Be specific to attract the right candidates.
        </FieldDescription>
        <RichTextEditor
          isEditable={true}
          initialContent={watch("jobDescription") || undefined}
          onChange={(html) => setValue("jobDescription", html, { shouldValidate: true })}
        />
        <FieldError errors={[errors.jobDescription]} />
      </Field>
    </FieldGroup>
  );
}

export default Step4Description;