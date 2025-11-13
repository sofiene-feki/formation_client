import { Node, mergeAttributes } from "@tiptap/core";

export const InfoBox = Node.create({
  name: "infoBox",
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "div[data-type='info-box']" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "info-box",
        class: "p-4 border-l-4 border-blue-500 bg-blue-50 rounded",
      }),
      0,
    ];
  },
});
