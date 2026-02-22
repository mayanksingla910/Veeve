"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Undo,
  Redo,
  Type,
  Eraser,
} from "lucide-react";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { LinkPopover } from "./linkPopver";
import { ToolbarItem } from "@/types/richTextEditor";
import ToolbarItemButton from "./toolbarItemButton";

interface ToolbarGroup {
  type: "toggle" | "action";
  items: ToolbarItem[];
}

const TOOLBAR_GROUPS: ToolbarGroup[] = [
  {
    type: "toggle",
    items: [
      {
        value: "heading-2",
        label: "Heading 2",
        icon: Heading2,
        action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: (e) => e.isActive("heading", { level: 2 }),
      },
      {
        value: "heading-3",
        label: "Heading 3",
        icon: Heading3,
        action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: (e) => e.isActive("heading", { level: 3 }),
      },
      {
        value: "paragraph",
        label: "Paragraph",
        icon: Type,
        action: (e) => e.chain().focus().setParagraph().run(),
        isActive: (e) =>
          e.isActive("paragraph") &&
          !e.isActive("heading", { level: 1 }) &&
          !e.isActive("heading", { level: 2 }) &&
          !e.isActive("heading", { level: 3 }),
      },
    ],
  },
  {
    type: "toggle",
    items: [
      {
        value: "bold",
        label: "Bold",
        shortcut: "Ctrl+B",
        icon: Bold,
        action: (e) => e.chain().focus().toggleBold().run(),
        isActive: (e) => e.isActive("bold"),
      },
      {
        value: "italic",
        label: "Italic",
        shortcut: "Ctrl+I",
        icon: Italic,
        action: (e) => e.chain().focus().toggleItalic().run(),
        isActive: (e) => e.isActive("italic"),
      },
      {
        value: "underline",
        label: "Underline",
        shortcut: "Ctrl+U",
        icon: Underline,
        action: (e) => e.chain().focus().toggleUnderline().run(),
        isActive: (e) => e.isActive("underline"),
      },
      {
        value: "strike",
        label: "Strikethrough",
        icon: Strikethrough,
        action: (e) => e.chain().focus().toggleStrike().run(),
        isActive: (e) => e.isActive("strike"),
      },
    ],
  },
  {
    type: "toggle",
    items: [
      {
        value: "bulletList",
        label: "Bullet List",
        icon: List,
        action: (e) => e.chain().focus().toggleBulletList().run(),
        isActive: (e) => e.isActive("bulletList"),
      },
      {
        value: "orderedList",
        label: "Ordered List",
        icon: ListOrdered,
        action: (e) => e.chain().focus().toggleOrderedList().run(),
        isActive: (e) => e.isActive("orderedList"),
      },
      {
        value: "blockquote",
        label: "Quote",
        icon: Quote,
        action: (e) => e.chain().focus().toggleBlockquote().run(),
        isActive: (e) => e.isActive("blockquote"),
      },
    ],
  },
  {
    // Link is rendered separately as <LinkPopover> — see Toolbar below
    type: "action",
    items: [
      {
        value: "clear",
        label: "Clear Formatting",
        icon: Eraser,
        action: (e) => e.chain().focus().unsetAllMarks().clearNodes().run(),
      },
    ],
  },
  {
    type: "action",
    items: [
      {
        value: "undo",
        label: "Undo",
        shortcut: "Ctrl+Z",
        icon: Undo,
        action: (e) => e.chain().focus().undo().run(),
        canExecute: (e) => e.can().undo(),
      },
      {
        value: "redo",
        label: "Redo",
        shortcut: "Ctrl+Y",
        icon: Redo,
        action: (e) => e.chain().focus().redo().run(),
        canExecute: (e) => e.can().redo(),
      },
    ],
  },
];

// Index of the group where the LinkPopover should be injected (before "clear")
const LINK_GROUP_INDEX = 3;

interface ToolbarProps {
  editor: Editor | null;
}

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  return (
    <TooltipProvider delayDuration={500}>
      <div className="flex flex-wrap items-center gap-1 p-2 border-b sticky top-0 z-10">
        {TOOLBAR_GROUPS.map((group, i) => (
          <React.Fragment key={i}>
            <div className="flex items-center gap-0.5">
              {i === LINK_GROUP_INDEX && <LinkPopover editor={editor} />}
              {group.items.map((item) => (
                <ToolbarItemButton key={item.value} item={item} editor={editor} />
              ))}
            </div>
            {i < TOOLBAR_GROUPS.length - 1 && (
              <div className="w-px h-5 bg-border mx-1 self-center shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </TooltipProvider>
  );
}

