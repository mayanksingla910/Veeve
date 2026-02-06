"use client";

import { useFormContext } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function VideoInfo() {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();

  const hasVideo = !!watch("videoFile");

  return (
    <div className="py-2 sm:px-6 md:px-0 flex flex-col h-full justify-center pb-16">
      <LayoutGroup>
        <FieldGroup className="space-y-3">
          <AnimatePresence mode="popLayout">
            {hasVideo && (
              <motion.div
                key="progress-bar"
                layout
                initial={{ opacity: 0, y: -20, marginBottom: 0 }}
                animate={{ opacity: 1, y: 0, marginBottom: 10 }}
                exit={{ opacity: 0, y: -20, marginBottom: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel className="text-primary animate-pulse">
                      Upload Progress
                    </FieldLabel>
                    <Progress
                      value={watch("uploadProgress") || 0}
                      className="h-2"
                    />
                  </Field>
                  <Field className="grid grid-cols-3">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="secondary">Draft</Button>
                    <Button>Post</Button>
                  </Field>
                </FieldGroup>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Field
              className={cn(
                "transition-opacity duration-500",
                !hasVideo && "opacity-70",
              )}
            >
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                id="title"
                {...register("title")}
                placeholder="Add a title..."
                disabled={!hasVideo}
                className="p-5 text-md rounded-xl transition-all focus:ring-2"
              />
              {errors.title && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-red-500 mt-1"
                >
                  {errors.title.message as string}
                </motion.p>
              )}
            </Field>
          </motion.div>

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Field
              className={cn(
                "transition-opacity duration-500",
                !hasVideo && "opacity-70",
              )}
            >
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Add a description..."
                disabled={!hasVideo}
                className="p-3 rounded-xl min-h-32 max-h-52 resize-none transition-all"
              />
              {errors.description && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-500 mt-1"
                >
                  {errors.description.message as string}
                </motion.p>
              )}
            </Field>
          </motion.div>

          <motion.div
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Field
              className={cn(
                "transition-opacity duration-500",
                !hasVideo && "opacity-70",
              )}
            >
              <FieldLabel htmlFor="tags">Tags</FieldLabel>
              <Input
                id="tags"
                {...register("tags")}
                placeholder="e.g. #documentary, #vlog"
                disabled={!hasVideo}
                className="p-5 text-md rounded-xl"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Separate tags with commas
              </p>
            </Field>
          </motion.div>
        </FieldGroup>
      </LayoutGroup>
    </div>
  );
}
