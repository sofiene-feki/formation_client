import React, { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import ImageResize from "tiptap-extension-resize-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";

import { FontSize } from "../course/extensions/FontSize";
import { FontFamily } from "../course/extensions/FontFamily";

// Icons
import {
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineStrikethrough,
} from "react-icons/ai";

import {
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatListBulleted,
  MdFormatListNumbered,
} from "react-icons/md";

import { FiMinus, FiPlus, FiImage } from "react-icons/fi";
import { ListKit } from "@tiptap/extension-list";

export default function RichTextEditor({ value, onChange }) {
  const [fontSize, setFontSize] = useState(16);
  const [currentColor, setCurrentColor] = useState("#000000");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),

      ListKit, // ✅ handles all lists correctly
      TextStyle,
      Color,
      Highlight,
      Underline,
      FontSize,
      FontFamily,
      ImageResize.configure({ inline: false }),
      Link,

      TextAlign.configure({
        types: [
          "heading",
          "paragraph",
          "bulletList",
          "orderedList",
          "listItem",
        ],
      }),

      Placeholder.configure({
        placeholder: "Commencez à écrire le contenu du chapitre...",
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    // ✅ Sync external value -> editor
    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  /* ✅ Update font size on selection */
  useEffect(() => {
    if (!editor) return;

    const updateFont = () => {
      const size = editor.getAttributes("textStyle").fontSize;
      setFontSize(size ? parseInt(size.replace("px", "")) : 16);
    };

    editor.on("selectionUpdate", updateFont);
    return () => editor.off("selectionUpdate", updateFont);
  }, [editor]);

  /* ✅ Update color on selection */
  useEffect(() => {
    if (!editor) return;

    const updateColor = () => {
      const color = editor.getAttributes("textStyle").color;
      setCurrentColor(color || "#000000");
    };

    editor.on("selectionUpdate", updateColor);
    editor.on("transaction", updateColor);

    return () => {
      editor.off("selectionUpdate", updateColor);
      editor.off("transaction", updateColor);
    };
  }, [editor]);

  /* ✅ Font size change */
  const changeFontSize = (delta) => {
    let newSize = Math.min(80, Math.max(10, fontSize + delta));
    setFontSize(newSize);

    editor
      .chain()
      .focus()
      .setFontSize(newSize + "px")
      .run();
  };

  /* ✅ Toolbar button UI */
  const ToolbarButton = ({ onClick, active, children }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded border hover:bg-gray-200 transition ${
        active ? "bg-gray-300 border-gray-400" : ""
      }`}
    >
      {children}
    </button>
  );
  useEffect(() => {
    if (!editor) return;

    const updateFontFamily = () => {
      const ff = editor.getAttributes("textStyle").fontFamily;
    };

    editor.on("selectionUpdate", updateFontFamily);
    return () => editor.off("selectionUpdate", updateFontFamily);
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="border rounded-lg bg-white shadow-sm p-3 space-y-3">
      {/* ✅ Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b pb-3">
        {/* ✅ Font family */}
        <select
          defaultValue=""
          className="border rounded px-2 py-1"
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
        >
          <option value="" disabled>
            Font
          </option>
          <option value="Cairo">Cairo</option>
          <option value="Roboto">Roboto</option>
          <option value="Arial">Arial</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>

        {/* ✅ Font size */}
        <div className="flex items-center gap-1 border rounded px-2 py-1 bg-gray-50">
          <ToolbarButton onClick={() => changeFontSize(-2)}>
            <FiMinus />
          </ToolbarButton>

          <span className="mx-2 text-sm font-medium w-10 text-center">
            {fontSize}
          </span>

          <ToolbarButton onClick={() => changeFontSize(2)}>
            <FiPlus />
          </ToolbarButton>
        </div>

        {/* ✅ Color picker (Canva style) */}
        <div className="relative">
          <button
            className="flex flex-col items-center justify-center p-2 border rounded hover:bg-gray-200 transition w-9"
            onClick={() =>
              document.getElementById("hidden-color-picker").click()
            }
          >
            <span className="font-bold text-sm">A</span>
            <span
              className="w-full h-1 rounded"
              style={{ backgroundColor: currentColor }}
            ></span>
          </button>

          <input
            id="hidden-color-picker"
            type="color"
            className="absolute top-0 left-0 opacity-0 pointer-events-none"
            value={currentColor}
            onChange={(e) => {
              const c = e.target.value;
              setCurrentColor(c);
              editor.chain().focus().setColor(c).run();
            }}
          />
        </div>

        {/* ✅ Bold / Italic / Underline / Strike */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <AiOutlineBold size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <AiOutlineItalic size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <AiOutlineUnderline size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <AiOutlineStrikethrough size={14} />
        </ToolbarButton>

        {/* ✅ Highlight */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
        >
          <span className="bg-yellow-200 px-1 rounded">aA</span>
        </ToolbarButton>

        {/* ✅ Alignments */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <MdFormatAlignLeft size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <MdFormatAlignCenter size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        >
          <MdFormatAlignRight size={14} />
        </ToolbarButton>

        {/* ✅ Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <MdFormatListBulleted size={14} />
        </ToolbarButton>

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <MdFormatListNumbered size={14} />
        </ToolbarButton>

        {/* ✅ Image upload + resize */}
        <ToolbarButton
          onClick={() => {
            const url = prompt("URL de l'image :");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
        >
          <FiImage size={14} />
        </ToolbarButton>
      </div>

      {/* ✅ Editor content */}
      <EditorContent
        editor={editor}
        className="tiptap w-full h-full prose prose-sm outline-none focus:outline-none"
      />
    </div>
  );
}
