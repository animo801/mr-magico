"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useQuiz } from "@/context/quiz-context";
import { fbTrack } from "@/lib/fpixel";
import { quizQuestions } from "@/lib/quiz-config";

export default function ContactPage() {
  const router = useRouter();
  const { answers, eventId } = useQuiz();
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!firstName.trim() || !phone.trim() || !email.trim()) {
      setError("Please fill out every field.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }

    setSubmitting(true);

    fbTrack("Lead", { content_name: "Mr. Magico Quiz" }, eventId);

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          phone: phone.trim(),
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
          Where should we send your free consult?
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
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          autoComplete="tel"
          className="w-full rounded-xl bg-[#d9d9d9]/40 px-5 py-4 text-[16px] font-bold text-black outline-none placeholder:font-normal placeholder:text-gray-500 focus:ring-2 focus:ring-[#3653e3]"
        />
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
