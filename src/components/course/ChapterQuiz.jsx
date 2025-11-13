import { useState } from "react";

export default function ChapterQuiz({ quiz, onComplete }) {
  const [answers, setAnswers] = useState(Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    const score = quiz.reduce(
      (acc, q, i) => acc + (q.correctAnswer === answers[i] ? 1 : 0),
      0
    );
    const passed = score >= quiz.length * 0.7; // pass >= 70%
    setSubmitted(true);
    onComplete({ score, passed });
  };

  return (
    <div className="space-y-4">
      {quiz.map((q, i) => (
        <div key={i}>
          <p className="font-semibold">{q.question}</p>
          {q.options.map((opt, idx) => (
            <label key={idx} className="block">
              <input
                type="radio"
                name={`q${i}`}
                value={idx}
                disabled={submitted}
                onChange={() =>
                  setAnswers((a) => {
                    const copy = [...a];
                    copy[i] = idx;
                    return copy;
                  })
                }
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Submit
        </button>
      ) : (
        <p
          className={`font-bold ${
            submitted && answers ? "text-green-600" : "text-red-600"
          }`}
        >
          Score:{" "}
          {quiz.reduce(
            (acc, q, i) => acc + (q.correctAnswer === answers[i] ? 1 : 0),
            0
          )}{" "}
          / {quiz.length}
        </p>
      )}
    </div>
  );
}
