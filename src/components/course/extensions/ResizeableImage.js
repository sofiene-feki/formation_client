import Image from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ResizeableImageComponent from "./ResizeableImageComponent";

export const ResizeableImage = Image.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ResizeableImageComponent);
  },
});
