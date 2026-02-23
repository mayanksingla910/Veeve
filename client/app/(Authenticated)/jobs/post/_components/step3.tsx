"use client";

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
import { CURRENCIES, EXPERIENCE_LEVELS, JobFormData } from "@/types/jobSchema";
import { useFormContext } from "react-hook-form";

function Step3Compensation() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<JobFormData>();

  return (
    <FieldGroup className="space-y-5">
      <Field>
        <FieldLabel>
          Experience Level <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={watch("experienceLevel")}
          onValueChange={(v) =>
            setValue("experienceLevel", v as JobFormData["experienceLevel"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select experience level..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {EXPERIENCE_LEVELS.map((l) => (
                <SelectItem key={l.value} value={l.value}>
                  {l.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <FieldError errors={[errors.experienceLevel]} />
      </Field>

      <FieldGroup>
        <FieldLabel className=" block">
          Salary Range{" "}
          <span className="text-muted-foreground font-normal">(optional)</span>
        </FieldLabel>
        <div className="grid sm:grid-cols-3 gap-4">
          <Field>
            <FieldLabel className="text-xs text-muted-foreground">
              Currency
            </FieldLabel>
            <Select
              value={watch("currency")}
              onValueChange={(v) =>
                setValue("currency", v as JobFormData["currency"], {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {CURRENCIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError errors={[errors.currency, errors.salaryMin, errors.salaryMax]} />
          </Field>

          <Field>
            <FieldLabel className="text-xs text-muted-foreground">
              Minimum
            </FieldLabel>
            <Input
              type="number"
              placeholder="e.g. 50000"
              {...register("salaryMin")}
            />
          </Field>

          <Field>
            <FieldLabel className="text-xs text-muted-foreground">
              Maximum
            </FieldLabel>
            <Input
              type="number"
              placeholder="e.g. 80000"
              {...register("salaryMax")}
            />
          </Field>
        </div>
        <FieldDescription className="text-xs">
          Jobs with salary ranges get significantly more applicants. Leave blank
          to show {"Competitive"}.
        </FieldDescription>
      </FieldGroup>
    </FieldGroup>
  );
}

export default Step3Compensation;
