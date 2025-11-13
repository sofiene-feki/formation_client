import React from "react";
import { motion } from "framer-motion";

export default function CourseContent({ content }) {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-6 flex justify-center"
    >
      <div className="w-full p-6 border rounded-xl bg-white dark:bg-slate-900 shadow-sm transition-all">
        <h3 className="text-lg font-semibold mb-6 text-slate-800 dark:text-slate-100 text-center">
          Contenu du chapitre
        </h3>

        {/* ✅ Rendu HTML Tiptap */}
        <div
          className="
            prose
            prose-slate
            dark:prose-invert
            max-w-none
            leading-relaxed
            text-[15px]
            prose-headings:font-semibold
            prose-headings:text-slate-800
            dark:prose-headings:text-slate-100
            prose-p:my-2
            prose-li:my-1
            prose-hr:my-6
            prose-hr:border-slate-200
            dark:prose-hr:border-slate-700
            overflow-hidden
            break-words
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.div>
  );
}
