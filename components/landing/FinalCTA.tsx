import Link from "next/link";

/**
 * The Figma frame only had a literal "CTA" placeholder label here — no real
 * headline copy was designed. Reproducing the exact section (full-bleed navy
 * panel, centered), with a header added on top; swap in real copy when the
 * client provides it.
 */
export default function FinalCTA() {
  return (
    <section className="flex min-h-[529px] flex-col items-center justify-center bg-[#223a7b] px-6 py-20 text-center">
      <h2 className="max-w-3xl text-[44px] font-black uppercase leading-[48px] text-white lg:text-[72px] lg:leading-[76px]">
        Ready to make some magic?
      </h2>
      <Link
        href="/quiz/1"
        className="mt-8 inline-block rounded-lg bg-[#3653e3] px-8 py-3.5 text-[18px] font-black uppercase text-white"
      >
        Connect with Mr. Magico
      </Link>
    </section>
  );
}
