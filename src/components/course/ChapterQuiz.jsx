import { useEffect, useState } from "react";

export default function ChapterQuiz({ quiz = [], onComplete = () => {} }) {
  const [answers, setAnswers] = useState([]); // array of selected indexes
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setAnswers(quiz.map(() => []));
    setSubmitted(false);
  }, [quiz]);

  const handleSelect = (qIndex, optIndex, isMultiple) => {
    if (submitted) return;

    setAnswers((prev) => {
      const copy = [...prev];

      if (isMultiple) {
        if (copy[qIndex].includes(optIndex)) {
          copy[qIndex] = copy[qIndex].filter((x) => x !== optIndex);
        } else {
          copy[qIndex] = [...copy[qIndex], optIndex];
        }
      } else {
        copy[qIndex] = [optIndex];
      }

      return copy;
    });
  };

  const handleSubmit = () => {
    let score = 0;

    quiz.forEach((q, i) => {
      const correct = q.correctAnswer.slice().sort().join(",");
      const selected = answers[i].slice().sort().join(",");
      if (correct === selected) score++;
    });

    const passed = score / quiz.length >= 0.7;

    setSubmitted(true);

    // ⭐ Send ONLY score + passed
    onComplete({
      score,
      passed,
    });
  };

  // ─────────────────────────────────────────────
  // UI HELPERS
  // ─────────────────────────────────────────────

  const isCorrectOption = (q, optIndex) => q.correctAnswer.includes(optIndex);

  const isUserSelected = (qIndex, optIndex) =>
    answers[qIndex]?.includes(optIndex);

  return (
    <div className="space-y-6">
      {quiz.map((q, i) => {
        const isMultiple = q.correctAnswer.length > 1;

        return (
          <div key={i} className="border p-4 rounded-lg bg-white">
            <div className="font-semibold text-lg mb-2">{q.question}</div>

            {isMultiple && (
              <p className="text-sm text-orange-600 mb-2">
                Plusieurs réponses possibles.
              </p>
            )}

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                // Determine color AFTER submission
                let style = "";

                if (submitted) {
                  if (isCorrectOption(q, idx)) {
                    style = "bg-green-100 border-green-600";
                  } else if (isUserSelected(i, idx)) {
                    style = "bg-red-100 border-red-600";
                  } else {
                    style = "bg-gray-100";
                  }
                }

                return (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-2 border rounded cursor-pointer transition ${style}`}
                  >
                    <input
                      type={isMultiple ? "checkbox" : "radio"}
                      name={`q-${i}`}
                      disabled={submitted}
                      checked={isUserSelected(i, idx)}
                      onChange={() => handleSelect(i, idx, isMultiple)}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>

            {/* Show correct answers after submission */}
            {submitted && (
              <p className="text-sm mt-3 text-green-700">
                ✔ Réponse correcte :{" "}
                <strong>
                  {q.correctAnswer.map((a) => q.options[a]).join(" | ")}
                </strong>
              </p>
            )}
          </div>
        );
      })}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700"
        >
          Valider
        </button>
      ) : (
        <div className="font-bold text-center text-lg mt-4">
          Score final :{" "}
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
