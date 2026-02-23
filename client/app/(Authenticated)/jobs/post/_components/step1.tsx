"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COUNTRIES,
  JOB_TYPES,
  JobFormData,
  LOCATION_TYPES,
} from "@/types/jobSchema";
import { useFormContext } from "react-hook-form";

const needsLocation = (type: string) => type === "onsite" || type === "hybrid";

function Step1Basics() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<JobFormData>();
  const locationType = watch("locationType");
  const showLocation = needsLocation(locationType);

  return (
    <FieldGroup className="space-y-5">
      {/* Row 1 */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Field>
          <FieldLabel>
            Job Role <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            placeholder="e.g. Senior Video Editor"
            {...register("jobRole")}
          />
          <FieldError errors={[errors.jobRole]} />
        </Field>

        <Field>
          <FieldLabel>
            Employment Type <span className="text-destructive">*</span>
          </FieldLabel>
          <Select
            value={watch("jobType")}
            onValueChange={(v) =>
              setValue("jobType", v as JobFormData["jobType"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {JOB_TYPES.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldError errors={[errors.jobType]} />
        </Field>
      </div>

      {/* Summary */}
      <Field>
        <FieldLabel>
          One-line Summary <span className="text-destructive">*</span>
        </FieldLabel>
        <Input
          placeholder="e.g. Looking for a creative editor for short-form social content..."
          {...register("jobSummary")}
        />
        <FieldDescription className="text-xs">
          This appears in job listing previews. Keep it under 100 characters.
        </FieldDescription>
        <FieldError errors={[errors.jobSummary]} />
      </Field>

      {/* Location type */}
      <Field>
        <FieldLabel>
          Work Location <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={watch("locationType")}
          onValueChange={(v) => {
            setValue("locationType", v as JobFormData["locationType"], {
              shouldValidate: true,
            });
            // Clear location if switching to remote
            if (!needsLocation(v)) {
              setValue("country", "", { shouldValidate: false });
              setValue("region", "", { shouldValidate: false });
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select work arrangement..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {LOCATION_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError errors={[errors.locationType]} />
      </Field>

      {/* Conditional country + region */}
      <AnimatePresence>
        {showLocation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className=""
          >
            <div className="grid sm:grid-cols-2 gap-5 pt-1">
              <Field>
                <FieldLabel>
                  Country <span className="text-destructive">*</span>
                </FieldLabel>
                <Select
                  value={watch("country")}
                  onValueChange={(v) =>
                    setValue("country", v, { shouldValidate: true })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {COUNTRIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError errors={[errors.country]} />
              </Field>

              <Field>
                <FieldLabel>
                  State / Region
                  <span className="text-destructive"> *</span>
                </FieldLabel>
                <Input
                  placeholder="e.g. California, London, Maharashtra..."
                  {...register("region")}
                />
                <FieldError errors={[errors.region]} />
              </Field>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FieldGroup>
  );
}

export default Step1Basics;
