"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { Toolbar } from "@/components/richTextEditor/toolbar";

interface JobDescriptionEditorProps {
  onChange?: (html: string) => void;
  initialContent?: string;
  isEditable?: boolean;
}

const DEFAULT_CONTENT = `
  <h2>The Role</h2>
  <p>Briefly describe the objective of this position...</p>
  <h2>Requirements</h2>
  <ul>
    <li>List your top requirements here...</li>
  </ul>
`;

export default function RichTextEditor({
  onChange,
  initialContent = DEFAULT_CONTENT,
  isEditable = false,
}: JobDescriptionEditorProps) {
  const [counts, setCounts] = useState({ words: 0, chars: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your job description…",
        emptyEditorClass: "is-editor-empty",
      }),
      CharacterCount.configure({ limit: 5000 }),
    ],
    editable: isEditable,
    immediatelyRender: false,
    content: initialContent,
    onCreate: ({ editor }) => {
      setCounts({
        words: editor.storage.characterCount.words(),
        chars: editor.storage.characterCount.characters(),
      });
    },
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
      setCounts({
        words: editor.storage.characterCount.words(),
        chars: editor.storage.characterCount.characters(),
      });
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose-base dark:prose-invert focus:outline-none min-h-[250px] p-4 max-w-none",
      },
    },
  });

  const isNearLimit = counts.chars > 4500;

  return (
    <div className="border rounded-xl overflow-clip focus-within:shadow-md transition-shadow">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} className="max-h-96 overflow-y-auto"/>
      <div className="flex justify-end gap-2 px-4 py-1.5 border-t bg-muted/40 text-xs text-muted-foreground">
        <span>
          {counts.words} {counts.words === 1 ? "word" : "words"}
        </span>
        <span>·</span>
        <span className={isNearLimit ? "text-destructive" : ""}>
          {counts.chars}/5000 {counts.chars === 1 ? "character" : "characters"}
        </span>
      </div>
    </div>
  );
}
