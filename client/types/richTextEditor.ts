import { LucideIcon } from "lucide-react";
import { type Editor } from "@tiptap/react";

export interface ToolbarItem {
  value: string;
  icon: LucideIcon;
  label: string;
  shortcut?: string;
  action: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  canExecute?: (editor: Editor) => boolean;
}