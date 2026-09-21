"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/quiz-context";
import { fbTrackCustom, QUIZ_LEAD_EVENT_NAME } from "@/lib/fpixel";
import { quizQuestions } from "@/lib/quiz-config";

function formatPhoneNumber(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);

  if (digits.length > 6) return `(${area}) ${prefix}-${line}`;
  if (digits.length > 3) return `(${area}) ${prefix}`;
  if (digits.length > 0) return `(${area}`;
  return "";
}

export default function ContactPage() {
  const router = useRouter();
  const { answers, eventId } = useQuiz();
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactPreference, setContactPreference] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !phone.trim() || !contactPreference || !email.trim()) {
      setError("Please fill out every field.");
      return;
    }
    if (phone.replace(/\D/g, "").length !== 10) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);

    fbTrackCustom(QUIZ_LEAD_EVENT_NAME, { content_name: "Mr. Magico Quiz" }, eventId);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          phone: phone.trim(),
          contactPreference,
          email: email.trim(),
          answers,
          eventId,
          eventSourceUrl: window.location.href,
        }),
      });
    } catch (err) {
      console.error("Lead submission failed:", err);
    } finally {
      router.push("/quiz/thank-you");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => router.push(`/quiz/${quizQuestions.length}`)}
        className="w-fit text-sm font-bold text-[#3653e3]"
      >
        ← Back
      </button>

      <div>
        <p className="text-xs font-black uppercase tracking-wide text-gray-400">
          Last step
        </p>
        <h1 className="mt-2 text-[28px] font-black uppercase leading-tight text-[#00157a]">
          How can we best get in touch with you?
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          autoComplete="given-name"
          className="w-full rounded-xl bg-[#d9d9d9]/40 px-5 py-4 text-[16px] font-bold text-black outline-none placeholder:font-normal placeholder:text-gray-500 focus:ring-2 focus:ring-[#3653e3]"
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
          placeholder="Phone number"
          autoComplete="tel"
          maxLength={14}
          className="w-full rounded-xl bg-[#d9d9d9]/40 px-5 py-4 text-[16px] font-bold text-black outline-none placeholder:font-normal placeholder:text-gray-500 focus:ring-2 focus:ring-[#3653e3]"
        />
        <div className="flex gap-3">
          {[
            { value: "call", label: "Call me" },
            { value: "text", label: "Text me" },
          ].map((option) => {
            const selected = contactPreference === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setContactPreference(option.value)}
                className={`flex h-[58px] w-full items-center justify-center rounded-xl px-5 text-[13px] font-black uppercase transition-colors ${
                  selected
                    ? "bg-[#3653e3]/10 text-[#3653e3] ring-2 ring-[#3653e3]"
                    : "bg-[#d9d9d9]/40 text-black"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          autoComplete="email"
          className="w-full rounded-xl bg-[#d9d9d9]/40 px-5 py-4 text-[16px] font-bold text-black outline-none placeholder:font-normal placeholder:text-gray-500 focus:ring-2 focus:ring-[#3653e3]"
        />
      </div>

      {error && <p className="text-sm font-bold text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full rounded-lg bg-[#3653e3] py-3.5 text-[18px] font-black uppercase text-white transition-opacity disabled:opacity-40"
      >
        {submitting ? "Sending…" : "Get my free consult"}
      </button>
    </form>
  );
}
