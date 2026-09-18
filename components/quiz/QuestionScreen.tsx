"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/quiz-context";
import type { QuizQuestion } from "@/lib/quiz-config";

export default function QuestionScreen({
  question,
  stepNumber,
  totalSteps,
  nextHref,
  prevHref,
}: {
  question: QuizQuestion;
  stepNumber: number;
  totalSteps: number;
  nextHref: string;
  prevHref: string;
}) {
  const router = useRouter();
  const { answers, setAnswer } = useQuiz();
  const [value, setValue] = useState(answers[question.id] ?? "");

  const handleNext = () => {
    if (!value.trim()) return;
    setAnswer(question.id, value.trim());
    router.push(nextHref);
  };

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => router.push(prevHref)}
        className="w-fit text-sm font-bold text-[#3653e3]"
      >
        ← Back
      </button>

      <div>
        <p className="text-xs font-black uppercase tracking-wide text-gray-400">
          Question {stepNumber} of {totalSteps}
        </p>
        <h1 className="mt-2 text-[28px] font-black uppercase leading-[32px] text-[#00157a]">
          {question.question}
        </h1>
      </div>

      {question.type === "single-select" ? (
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const selected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue(option.value)}
                className={`flex min-h-16 w-full items-center justify-center px-3 py-3 text-center text-[28px] font-black uppercase leading-[32px] transition-colors ${
                  selected
                    ? "bg-[#3653e3]/10 text-[#3653e3] ring-2 ring-[#3653e3]"
                    : "bg-[#d9d9d9]/21 text-black"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={question.placeholder}
          className="h-16 w-full bg-[#d9d9d9]/21 px-5 text-[18px] font-bold text-black outline-none placeholder:font-normal placeholder:text-gray-500 focus:ring-2 focus:ring-[#3653e3]"
        />
      )}

      <button
        type="button"
        onClick={handleNext}
        disabled={!value.trim()}
        className="mt-2 h-12 w-[236px] max-w-full rounded-lg bg-[#3653e3] text-[18px] font-black text-white transition-opacity disabled:opacity-40"
      >
        Next question
      </button>
    </div>
  );
}
