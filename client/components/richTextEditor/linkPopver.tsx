"use client";

import { useState, useRef } from "react";
import { type Editor, useEditorState } from "@tiptap/react";
import { LinkIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LinkPopoverProps {
  editor: Editor;
}

export function LinkPopover({ editor }: LinkPopoverProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { isActive, currentHref } = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive("link"),
      currentHref:
        (ctx.editor.getAttributes("link").href as string | undefined) ?? "",
    }),
  });

  function validate(value: string): boolean {
    if (!value.trim()) {
      setError("URL is required.");
      return false;
    }
    try {
      // Allow relative URLs and ones without a protocol by prepending https://
      const normalized = /^https?:\/\//i.test(value)
        ? value
        : `https://${value}`;
      new URL(normalized);
      return true;
    } catch {
      setError("Please enter a valid URL.");
      return false;
    }
  }

  function handleApply() {
    if (!validate(url)) return;
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    editor.chain().focus().setLink({ href: normalized }).run();
    setOpen(false);
  }

  function handleRemove() {
    editor.chain().focus().unsetLink().run();
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApply();
    }
    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        if (next) {
          setUrl(currentHref); // pre-fill when opening
          setError("");
        }
        setOpen(next);
      }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant={isActive ? "secondary" : "ghost"}
              size="icon"
              aria-label="Link"
              aria-pressed={isActive}
            >
              <LinkIcon />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="flex items-center gap-2">
            Link
            <kbd className="text-[10px] z-10 font-mono text-muted-foreground bg-muted px-1 py-0.5 rounded">
              Ctrl+K
            </kbd>
          </p>
        </TooltipContent>
      </Tooltip>

      <PopoverContent
        className="w-72 p-3"
        side="bottom"
        align="start"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="link-url" className="text-xs font-medium">
              URL
            </Label>
            <Input
              ref={inputRef}
              id="link-url"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError("");
              }}
              onKeyDown={handleKeyDown}
              className={
                error ? "border-destructive focus-visible:ring-destructive" : ""
              }
            />
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <div className="flex items-center gap-2">
            {isActive && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleRemove}
              >
                <Trash2 className="size-3.5 mr-1.5" />
                Remove
              </Button>
            )}
            <div className="flex items-center gap-2 ml-auto">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="button" size="sm" onClick={handleApply}>
                {isActive ? "Update" : "Apply"}
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
