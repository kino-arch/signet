import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { Button } from "@/components/ui/button"
import { Bold, Italic, List, ListOrdered, RemoveFormatting } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface PremiumRichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function PremiumRichTextEditor({
  value,
  onChange,
  placeholder = "Enter text...",
  className,
}: PremiumRichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // Disabling headers to prevent resume breakage
        codeBlock: false,
        blockquote: false,
        horizontalRule: false,
        strike: false,
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        // Tiptap applies standard HTML tags which we can style via Tailwind descendant selectors
        class: cn(
          "min-h-32 w-full bg-transparent px-3 py-2 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "[&_p]:m-0 [&_p]:mb-2 [&_p:last-child]:mb-0",
          "[&_ul]:my-2 [&_ul]:ml-4 [&_ul]:list-disc [&_ul]:pl-2",
          "[&_ol]:my-2 [&_ol]:ml-4 [&_ol]:list-decimal [&_ol]:pl-2",
          "[&_li]:mb-1 [&_li>p]:mb-0",
          "[&.is-editor-empty:first-child::before]:pointer-events-none [&.is-editor-empty:first-child::before]:float-left [&.is-editor-empty:first-child::before]:h-0 [&.is-editor-empty:first-child::before]:text-muted-foreground [&.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]"
        ),
      },
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false })
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <div
      className={cn(
        "flex flex-col border border-input bg-transparent shadow-sm transition-all focus-within:ring-1 focus-within:ring-ring",
        className
      )}
    >
      {/* Premium minimal toolbar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-input bg-muted/40 p-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Bold"
          className={cn(
            "h-7 w-7",
            editor.isActive("bold") && "bg-muted shadow-sm"
          )}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Italic"
          className={cn(
            "h-7 w-7",
            editor.isActive("italic") && "bg-muted shadow-sm"
          )}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-3.5 w-3.5" />
        </Button>
        <div className="mx-1 h-4 w-px bg-border" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Bullet List"
          className={cn(
            "h-7 w-7",
            editor.isActive("bulletList") && "bg-muted shadow-sm"
          )}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-3.5 w-3.5" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Numbered List"
          className={cn(
            "h-7 w-7",
            editor.isActive("orderedList") && "bg-muted shadow-sm"
          )}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-3.5 w-3.5" />
        </Button>
        <div className="mx-1 h-4 w-px bg-border" />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Clear formatting"
          className="h-7 w-7 text-muted-foreground hover:text-foreground"
          onClick={() =>
            editor.chain().focus().clearNodes().unsetAllMarks().run()
          }
          title="Clear formatting"
        >
          <RemoveFormatting className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} className="cursor-text" />
    </div>
  )
}
