export type QuizOption = {
  label: string;
  value: string;
};

export type SingleSelectQuestion = {
  id: string;
  type: "single-select";
  question: string;
  options: QuizOption[];
};

export type TextQuestion = {
  id: string;
  type: "text";
  question: string;
  placeholder: string;
  /** "service-area-zip": must be a 5-digit zip inside lib/service-area-zips.ts. */
  validate?: "service-area-zip";
};

export type QuizQuestion = SingleSelectQuestion | TextQuestion;

/**
 * Edit this array to change the quiz questions, order, or copy.
 * Each `id` is used as the key when the answer is stored and forwarded
 * to GoHighLevel / Facebook, so keep ids stable once you're live.
 */
export const quizQuestions: QuizQuestion[] = [
  {
    id: "location",
    type: "text",
    question: "What zip code is the event in?",
    placeholder: "e.g. 10001",
    validate: "service-area-zip",
  },
  {
    id: "event_timing",
    type: "single-select",
    question: "When is your event?",
    options: [
      { label: "This week", value: "this_week" },
      { label: "1–4 weeks out", value: "1_4_weeks" },
      { label: "1–3 months out", value: "1_3_months" },
      { label: "Just browsing, not sure yet", value: "not_sure" },
    ],
  },
  {
    id: "guest_count",
    type: "single-select",
    question: "How many kids are you expecting?",
    options: [
      { label: "1–5 kids", value: "1_5" },
      { label: "6–10 kids", value: "6_10" },
      { label: "11–20 kids", value: "11_20" },
      { label: "20+ kids", value: "20_plus" },
    ],
  },
  {
    id: "birthday_age",
    type: "single-select",
    question: "What's the birthday kid's age?",
    options: [
      { label: "Under 5", value: "under_5" },
      { label: "5–7", value: "5_7" },
      { label: "8–10", value: "8_10" },
      { label: "11+", value: "11_plus" },
    ],
  },
];
