"use client";

import { useFormContext } from "react-hook-form";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type props = {
  getInputProps: ReturnType<typeof useDropzone>["getInputProps"],
  isDragActive: boolean,
  open: () => void,
}

export default function VideoUpload({
  getInputProps,
  isDragActive,
  open,
}: props) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const videoFile = watch("videoFile");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoFile instanceof File) {
      const url = URL.createObjectURL(videoFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setValue("videoFile", null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col gap-2 items-center h-full">
      <div
        onClick={open}
        className={cn(
          "relative flex flex-col items-center justify-center w-full lg:w-[70%] md:w-[85%] sm:w-[75%] aspect-video md:aspect-3/4 rounded-3xl overflow-hidden border-2 border-dashed transition-all cursor-pointer",
          isDragActive
            ? "border-primary bg-primary/10"
            : "border-transparent bg-muted",
          errors.videoFile ? "border-red-500" : "",
        )}
      >
        <input {...getInputProps()} />

        {previewUrl ? (
          <div className="relative w-full h-full group">
            <video
              src={previewUrl}
              className="w-full h-full object-cover"
              controls={false}
              muted
            />
            <div className="absolute inset-0 md:bg-black/40 md:opacity-0 group-hover:opacity-100 transition-opacity flex p-4 gap-3 justify-end">
              <Button variant="destructive" size="icon-sm" onClick={removeFile}>
                <X className="size-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center p-6 text-center text-muted-foreground">
            <ArrowUpCircle className="size-8" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Upload Video</p>
              <p className="text-xs">Drag and drop or click to browse</p>
            </div>
          </div>
        )}
      </div>
      {errors.videoFile && (
        <p className="text-sm text-red-500 font-medium">
          {errors.videoFile.message as string}
        </p>
      )}
    </div>
  );
}
