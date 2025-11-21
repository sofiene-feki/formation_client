// components/course-sections/ContentSection.jsx
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import ChapterEditor from "./ChapterEditor";
import QuizBlock from "./QuizBlock";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function makeId() {
  return `item_${Date.now().toString(36)}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export default function ContentSection({ course, setCourse }) {
  // ensure contentItems exists
  const contentItems = course.contentItems || [];

  const sensors = useSensors(useSensor(PointerSensor));

  const addChapter = () => {
    const newItem = {
      id: makeId(),
      type: "chapter",
      title: "",
      videoUrl: "",
      content: "",
    };
    setCourse({ ...course, contentItems: [...contentItems, newItem] });
  };

  const addQuizBlock = () => {
    const newItem = {
      id: makeId(),
      type: "quiz",
      // quiz block only needs quiz array
      quiz: [],
      title: "Quiz", // optional label
    };
    setCourse({ ...course, contentItems: [...contentItems, newItem] });
  };

  const updateItem = (id, updated) => {
    const arr = contentItems.map((it) =>
      it.id === id ? { ...it, ...updated } : it
    );
    setCourse({ ...course, contentItems: arr });
  };

  const removeItem = (id) => {
    setCourse({
      ...course,
      contentItems: contentItems.filter((i) => i.id !== id),
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = contentItems.findIndex((c) => c.id === active.id);
      const newIndex = contentItems.findIndex((c) => c.id === over.id);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(contentItems, oldIndex, newIndex);
        setCourse({ ...course, contentItems: newOrder });
      }
    }
  };

  //   useEffect(() => {
  //     console.log("Content items updated:", course);
  //   }, [course]);

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Contenu du cours</h2>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={contentItems.map((it) => it.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {contentItems.length === 0 && (
              <div className="text-sm text-gray-500">
                Aucun chapitre ni quiz — ajoutez-en un.
              </div>
            )}

            {contentItems.map((item, index) => {
              if (item.type === "chapter") {
                return (
                  <div key={item.id} data-id={item.id}>
                    <ChapterEditor
                      id={item.id}
                      index={index}
                      chapter={item}
                      updateChapter={(updated) => updateItem(item.id, updated)}
                      removeChapter={() => removeItem(item.id)}
                    />
                  </div>
                );
              } else if (item.type === "quiz") {
                return (
                  <div key={item.id} data-id={item.id}>
                    <QuizBlock
                      id={item.id}
                      index={index}
                      quizBlock={item}
                      updateQuizBlock={(updated) =>
                        updateItem(item.id, updated)
                      }
                      removeQuizBlock={() => removeItem(item.id)}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </SortableContext>
      </DndContext>

      <div className="flex justify-end gap-4 items-center">
        <Button onClick={addQuizBlock}>+ Ajouter un Quiz</Button>
        <Button onClick={addChapter}>+ Ajouter un chapitre</Button>
      </div>
    </div>
  );
}
