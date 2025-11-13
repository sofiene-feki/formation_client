import React from "react";
import { NodeViewWrapper, NodeViewContent } from "@tiptap/react";

export default function ResizeableImageComponent({ node, updateAttributes }) {
  const { src, width } = node.attrs;

  const changeWidth = (e) => {
    updateAttributes({ width: e.target.value + "px" });
  };

  return (
    <NodeViewWrapper className="relative inline-block">
      <img
        src={src}
        style={{ width: width || "300px" }}
        className="rounded shadow"
      />

      <input
        type="range"
        min="50"
        max="800"
        value={parseInt(width || 300)}
        onChange={changeWidth}
        className="absolute bottom-0 left-0 w-full"
      />
    </NodeViewWrapper>
  );
}
