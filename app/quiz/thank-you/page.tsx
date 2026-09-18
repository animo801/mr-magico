"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ThankYouPage() {
  useEffect(() => {
    try {
      sessionStorage.removeItem("mr-magico-quiz-answers");
      sessionStorage.removeItem("mr-magico-quiz-event-id");
    } catch {
      // sessionStorage unavailable — nothing to clean up
    }
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <span className="text-5xl">🎉</span>
      <h1 className="text-[28px] font-black uppercase leading-tight text-[#00157a]">
        You&rsquo;re all set!
      </h1>
      <p className="text-gray-600">
        Thanks for reaching out. Someone from the Mr. Magico team will call you soon to
        lock in your free consult.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-lg bg-[#3653e3] px-6 py-3 text-[16px] font-black uppercase text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
