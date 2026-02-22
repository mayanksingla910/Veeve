"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoUpload from "./_components/videoUpload";
import VideoInfo from "./_components/videoInfo";
import { VideoPostFormValues, videoPostSchema } from "@/types/videoSchema";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function PostVideoPage() {
  const methods = useForm<VideoPostFormValues>({
    resolver: zodResolver(videoPostSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.[0]) {
        methods.setValue("videoFile", acceptedFiles[0], {
          shouldValidate: true,
        });
      }
    },
    [methods],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "video/*": [] },
    maxFiles: 1,
    noClick: true,
    noKeyboard: true,
  });

  const onSubmit = async (data: VideoPostFormValues) => {
    console.log("Form Data:", data);
    console.log("Video File to upload:", data.videoFile);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert("Video uploaded successfully!");
  };

  return (
    <FormProvider {...methods}>
      <form
        {...getRootProps()}
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-4 py-4 h-full"
      >
        <div className="sticky top-16 md:top-20 z-40 bg-background flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => router.back()}
              className="size-12 hover:bg-muted active:scale-95 active:bg-muted"
            >
              <MoveLeft className="size-8" />
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">Post Video</h1>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="ghost">
              Draft
            </Button>
            <Button type="submit" disabled={methods.formState.isSubmitting}>
              {methods.formState.isSubmitting && (
                <Loader2 className="mr-2 size-4 animate-spin" />
              )}
              Post
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_1.5fr] gap-12 max-w-6xl mx-auto mt-12 items-start">
          <VideoUpload
            getInputProps={getInputProps}
            isDragActive={isDragActive}
            open={open}
          />

          <VideoInfo />
        </div>
      </form>
    </FormProvider>
  );
}
