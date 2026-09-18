"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How far in advance should we book?",
    a: "Popular dates fill up fast, so we recommend booking 3-4 weeks ahead. That said, reach out even if your event is next week — we'll always try to make it work.",
  },
  {
    q: "How long is the show?",
    a: "Most parties run 45-60 minutes, and we tailor the pacing to the age of the kids in the room.",
  },
  {
    q: "What's included in a booking?",
    a: "A full interactive magic show, audience participation for the birthday kid and their friends, and a wrap-up moment made for photos.",
  },
  {
    q: "How far do you travel?",
    a: "We regularly perform across the greater metro area. Tell us your zip code in the quiz and we'll confirm availability.",
  },
  {
    q: "What if we need to reschedule?",
    a: "Life happens — reach out as soon as you can and we'll do our best to find a new date that works.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-md lg:max-w-2xl">
        <h2 className="text-center text-[28px] font-black uppercase text-black lg:text-[56px]">
          Frequently asked questions
        </h2>
        <div className="mt-8 flex flex-col gap-3">
          {faqs.map((item, index) => {
            const open = openIndex === index;
            return (
              <div key={item.q} className="rounded-xl border border-black/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-black uppercase text-black"
                >
                  {item.q}
                  <span className="text-lg">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-black/70">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
