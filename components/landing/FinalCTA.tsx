import Link from "next/link";

/**
 * The Figma frame only had a literal "CTA" placeholder label here — no real
 * headline copy was designed. Reproducing the exact section (full-bleed navy
 * panel, centered) without inventing marketing copy; swap in real copy when
 * the client provides it.
 */
export default function FinalCTA() {
  return (
    <section className="flex min-h-[529px] items-center justify-center bg-[#223a7b] px-6 py-20 text-center">
      <Link
        href="/quiz/1"
        className="inline-block rounded-lg bg-[#3653e3] px-8 py-3.5 text-[18px] font-black uppercase text-white"
      >
        Connect with Mr. Magico
      </Link>
    </section>
  );
}
