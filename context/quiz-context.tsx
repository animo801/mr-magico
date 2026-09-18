"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  // Start with the same empty state on server and client — reading
  // sessionStorage during the initial render (rather than in an effect after
  // mount) makes the client's first render diverge from the server-rendered
  // HTML whenever a prior answer/eventId is already stored, causing a
  // hydration mismatch.
  const [answers, setAnswers] = useState<Answers>({});
  const [eventId, setEventId] = useState<string>("");

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setAnswers(JSON.parse(stored));
    } catch {
      // sessionStorage unavailable (private mode, etc.) — in-memory state still works
    }

    try {
      const stored = sessionStorage.getItem(EVENT_ID_KEY);
      if (stored) {
        setEventId(stored);
      } else {
        const created = createEventId();
        sessionStorage.setItem(EVENT_ID_KEY, created);
        setEventId(created);
      }
    } catch {
      setEventId(createEventId());
    }
  }, []);

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
