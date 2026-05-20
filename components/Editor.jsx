"use client";

import {
  useEditor,
  EditorContent,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

export default function Editor({
  value,
  onChange,
}) {

  const editor = useEditor({

    extensions: [
      StarterKit,
    ],

    content: value,

    immediatelyRender: false,

    onUpdate({ editor }) {

      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (

    <div className="border rounded-lg bg-white overflow-hidden">

      <div className="flex gap-2 p-3 border-b bg-gray-50 flex-wrap">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="px-3 py-1 border rounded"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="px-3 py-1 border rounded"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-3 py-1 border rounded"
        >
          List
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 1,
            }).run()
          }
          className="px-3 py-1 border rounded"
        >
          H1
        </button>

      </div>

      <EditorContent
        editor={editor}
        className="p-4 min-h-[250px]"
      />

    </div>
  );
}