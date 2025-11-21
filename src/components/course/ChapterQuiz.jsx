import { useEffect, useState } from "react";

export default function ChapterQuiz({ quiz = [], onComplete = () => {} }) {
  const [answers, setAnswers] = useState(() => Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // reset when quiz changes
    setAnswers(Array(quiz.length).fill(null));
    setSubmitted(false);
  }, [quiz]);

  const handleSelect = (qIndex, optionIndex) => {
    setAnswers((s) => {
      const copy = [...s];
      copy[qIndex] = optionIndex;
      return copy;
    });
  };

  const handleSubmit = () => {
    const score = quiz.reduce(
      (acc, q, i) => acc + (q.correctAnswer === answers[i] ? 1 : 0),
      0
    );
    const passed = quiz.length === 0 ? true : score / quiz.length >= 0.7;
    setSubmitted(true);
    onComplete({ score, passed });
  };

  return (
    <div className="space-y-4">
      {quiz.map((q, i) => (
        <div key={i} className="border p-3 rounded">
          <div className="font-semibold mb-2">{q.question}</div>
          <div className="space-y-2">
            {q.options.map((opt, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`q${i}`}
                  checked={answers[i] === idx}
                  disabled={submitted}
                  onChange={() => handleSelect(i, idx)}
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

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
          {quiz.reduce(
            (acc, q, i) => acc + (q.correctAnswer === answers[i] ? 1 : 0),
            0
          )}{" "}
          / {quiz.length}
        </div>
      )}
    </div>
  );
}
