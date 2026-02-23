"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save, SendHorizonal } from "lucide-react";
import Step1Basics from "./step1";
import Step2Requirements from "./step2";
import Step3Compensation from "./step3";
import Step4Description from "./step4";
import Step5Review from "./step5";
import { JobFormData, jobFormSchema, stepSchemas } from "@/types/jobSchema";
import { FormProvider, Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface JobPostingFormProps {
  onDirtyChange?: (isDirty: boolean) => void;
  onSaveDraftReady?: (saveFn: () => Promise<void>) => void;
}

const STEPS = [
  { number: 1, title: "Basics", description: "Role & location" },
  { number: 2, title: "Requirements", description: "Skills & software" },
  { number: 3, title: "Compensation", description: "Pay & experience" },
  { number: 4, title: "Description", description: "Full job details" },
  { number: 5, title: "Review", description: "Confirm & post" },
];

const variants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

function JobPostingForm({ onDirtyChange, onSaveDraftReady }: JobPostingFormProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const form = useForm<JobFormData, unknown, JobFormData>({
  resolver: zodResolver(jobFormSchema) as Resolver<JobFormData>,
    defaultValues: {
      jobRole: "",
      jobSummary: "",
      jobType: undefined,
      locationType: undefined,
      country: undefined,
      region: "",
      editTypes: [],
      softwares: [],
      experienceLevel: undefined,
      currency: "INR",
      salaryMin: "",
      salaryMax: "",
      jobDescription: "",
    },
    mode: "onTouched", // validate fields after they've been touched
  });

  const isDirty = form.formState.isDirty;

  // Notify parent when dirty state changes
  useEffect(() => {
    onDirtyChange?.(isDirty);
  }, [isDirty, onDirtyChange]);

  // Give parent access to the save draft function once on mount
  useEffect(() => {
    onSaveDraftReady?.(async () => {
      const values = form.getValues();
      console.log("Saving draft:", values);
      // await saveDraftToDB(values);
    });
  }, [onSaveDraftReady]); // intentionally omit form — stable ref

  function next() {
    const currentSchema = stepSchemas[step - 1];
    const values = form.getValues();

    const result = currentSchema.safeParse(values);

    if (!result.success) {
      // Manually trigger errors on just the failing fields
      const fieldErrors = result.error.flatten().fieldErrors;
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        form.setError(field as keyof JobFormData, {
          type: "manual",
          message: messages?.[0],
        });
      });
      return; // don't advance
    }

    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function back() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

// Make sure this is typed against the inferred schema type
async function onSubmit(data: JobFormData) {
  console.log("Submitting:", data);
}

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Step indicator */}
        <div className="flex items-center">
          {STEPS.map((s, i) => {
            const isCompleted = step > s.number;
            const isCurrent = step === s.number;

            return (
              <div
                key={s.number}
                className="flex items-center flex-1 last:flex-none"
              >
                <div className="flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <motion.div
                      animate={{
                        backgroundColor:
                          isCompleted || isCurrent
                            ? "var(--color-primary)"
                            : "transparent",
                        borderColor:
                          isCompleted || isCurrent
                            ? "var(--color-primary)"
                            : "var(--color-border)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                    >
                      <motion.span
                        animate={{
                          color:
                            isCompleted || isCurrent
                              ? "#fff"
                              : "var(--color-muted-foreground)",
                        }}
                        className="text-xs font-semibold"
                      >
                        {isCompleted ? "✓" : s.number}
                      </motion.span>
                    </motion.div>
                  </div>

                  {/* Label — only show for current on small screens */}
                  <div
                    className={`hidden lg:block ${!isCurrent ? "opacity-40" : ""}`}
                  >
                    <p className="text-xs font-semibold leading-none">
                      {s.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      {s.description}
                    </p>
                  </div>
                </div>

                {i < STEPS.length - 1 && (
                  <div className="flex-1 mx-2 h-px bg-border overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: isCompleted ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Card */}
        <Card className="overflow-hidden shadow-sm">
          <div className="px-4 md:px-6 md:pt-6 pb-4 border-b lg:hidden flex items-end justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-1">
                Step {step} of {STEPS.length}
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                {STEPS[step - 1].title}
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {STEPS[step - 1].description}
              </p>
            </div>

            {/* Circular progress */}
            <svg width="44" height="44" className="shrink-0 -rotate-90">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="3"
              />
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 18}`}
                animate={{
                  strokeDashoffset:
                    2 * Math.PI * 18 * (1 - step / STEPS.length),
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </svg>
          </div>

          <CardContent className="p-2 md:p-4 lg:p-6">
            <div>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  {step === 1 && <Step1Basics />}
                  {step === 2 && <Step2Requirements />}
                  {step === 3 && <Step3Compensation />}
                  {step === 4 && <Step4Description />}
                  {step === 5 && <Step5Review />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={back}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft />
                Back
              </Button>
              <div className="flex items-center justify-center gap-2">
                <Button variant={"outline"} type="button" className="gap-2">
                  <Save />
                  Save Draft
                </Button>

                {step < STEPS.length ? (
                  <Button type="button" onClick={next} className="gap-2">
                    Continue
                    <ArrowRight />
                  </Button>
                ) : (
                  <Button type="submit" className="gap-2">
                    Post Job
                    <SendHorizonal />
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}

export default JobPostingForm;
