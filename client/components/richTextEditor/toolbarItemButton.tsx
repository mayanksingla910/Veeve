"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ToolbarItem } from "@/types/richTextEditor";
import { type Editor, useEditorState } from "@tiptap/react";


function ToolbarItemButton({ item, editor }: { item: ToolbarItem; editor: Editor }) {
  const Icon = item.icon;

  const { isActive, canExecute } = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: item.isActive?.(ctx.editor) ?? false,
      canExecute: item.canExecute ? item.canExecute(ctx.editor) : true,
    }),
  });

  return (
    <Tooltip >
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={isActive ? "secondary" : "ghost"}
          size="icon"
          onClick={() => item.action(editor)}
          disabled={!canExecute}
          aria-label={item.label}
          aria-pressed={isActive}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="flex items-center gap-2">
          {item.label}
          {item.shortcut && (
            <kbd className="text-[10px] z-10 font-mono text-muted-foreground bg-muted px-1 py-0.5 rounded">
              {item.shortcut}
            </kbd>
          )}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}

export default ToolbarItemButton
