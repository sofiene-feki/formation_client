import { useEffect, useState } from "react";

export default function ChapterQuiz({ quiz = [], onComplete = () => {} }) {
  // answers[i] = array of selected indexes for question i
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // Reset when quiz changes
  useEffect(() => {
    setAnswers(quiz.map(() => [])); // each question → empty array
    setSubmitted(false);
  }, [quiz]);

  // Selecting an option
  const handleSelect = (qIndex, optIndex, isMultiple) => {
    setAnswers((prev) => {
      const copy = [...prev];

      if (isMultiple) {
        // toggle checkbox
        if (copy[qIndex].includes(optIndex)) {
          copy[qIndex] = copy[qIndex].filter((x) => x !== optIndex);
        } else {
          copy[qIndex] = [...copy[qIndex], optIndex];
        }
      } else {
        // radio → single correct
        copy[qIndex] = [optIndex];
      }

      return copy;
    });
  };

  // Submit and score
  const handleSubmit = () => {
    let score = 0;

    quiz.forEach((q, i) => {
      const correct = q.correctAnswer.sort().join(",");
      const selected = answers[i].sort().join(",");

      if (correct === selected) score++;
    });

    const passed = quiz.length === 0 ? true : score / quiz.length >= 0.7;

    setSubmitted(true);
    onComplete({ score, passed });
  };

  return (
    <div className="space-y-4">
      {quiz.map((q, i) => {
        const isMultiple = q.correctAnswer.length > 1;

        return (
          <div key={i} className="border p-3 rounded">
            <div className="font-semibold mb-2">{q.question}</div>

            {isMultiple && (
              <p className="text-sm text-orange-600 mb-2">
                Attention, plusieurs réponses sont possibles.
              </p>
            )}

            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type={isMultiple ? "checkbox" : "radio"}
                    name={`q${i}`}
                    checked={answers[i]?.includes(idx)}
                    disabled={submitted}
                    onChange={() => handleSelect(i, idx, isMultiple)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Soumettre
        </button>
      ) : (
        <div className="font-bold">
          Score:{" "}
          {
            quiz.filter((q, i) => {
              return (
                q.correctAnswer.slice().sort().join(",") ===
                answers[i].slice().sort().join(",")
              );
            }).length
          }{" "}
          / {quiz.length}
        </div>
      )}
    </div>
  );
}
