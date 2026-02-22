import DOMPurify from "isomorphic-dompurify";

const ALLOWED_TAGS = [
  "p", "br",
  "h1", "h2", "h3",
  "strong", "em", "u", "s",
  "ul", "ol", "li",
  "blockquote",
  "a",
];

export default function RichTextDisplay({ html }: { html: string }) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR: ["href", "rel"],
    FORCE_BODY: true,
  });

  return (
    <div
      className="prose prose-sm sm:prose-base dark:prose-invert max-w-none p-4"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}