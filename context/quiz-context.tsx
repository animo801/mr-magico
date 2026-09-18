"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Answers = Record<string, string>;

type QuizContextValue = {
  answers: Answers;
  setAnswer: (id: string, value: string) => void;
  eventId: string;
};

const QuizContext = createContext<QuizContextValue | null>(null);

const STORAGE_KEY = "mr-magico-quiz-answers";
const EVENT_ID_KEY = "mr-magico-quiz-event-id";

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answers>(() => {
    if (typeof window === "undefined") return {};
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const [eventId] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    try {
      const stored = sessionStorage.getItem(EVENT_ID_KEY);
      if (stored) return stored;
      const created = createEventId();
      sessionStorage.setItem(EVENT_ID_KEY, created);
      return created;
    } catch {
      return createEventId();
    }
  });

  const setAnswer = (id: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // sessionStorage unavailable (private mode, etc.) — in-memory state still works
      }
      return next;
    });
  };

  const value = useMemo(() => ({ answers, setAnswer, eventId }), [answers, eventId]);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within a QuizProvider");
  return ctx;
}
