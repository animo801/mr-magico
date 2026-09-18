import Image from "next/image";

const reviews = [
  {
    name: "Sammi Sher",
    quote:
      "Mr. Magico was so fun! We had a family party (kids + adults) and Mr. Magico included and entertained everyone from Grandma to our 4 year old. While there weren't too many magic tricks, the entertainment was top notch. The bunny was the biggest hit!",
  },
];

/**
 * Only one review was exported from Figma (reused six times across the card
 * row in the source file too) — add more entries to `reviews` above once
 * real reviews are available and they'll appear here automatically.
 */
const displayReviews = Array.from({ length: 6 }, () => reviews[0]);

const stripPhotos = ["/images/hero-photo.png", "/images/strip-2.png", "/images/strip-3.png"];

export default function Reviews() {
  return (
    <section className="bg-[#3653e3] pb-16 pt-8 text-white">
      {/* Photo strip — mobile-only holdover from before the Figma desktop redesign; the
          desktop frame (node 9:32) starts straight at the "What parents think" heading. */}
      <div className="flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:hidden">
        {stripPhotos.map((src, i) => (
          <div key={i} className="relative h-[271px] w-[203px] shrink-0 overflow-hidden">
            <Image src={src} alt="" fill className="object-cover" />
          </div>
        ))}
      </div>

      <div className="mt-8 max-w-md px-6 lg:max-w-4xl lg:px-[60px]">
        <p className="text-[16px] font-black uppercase leading-4 text-white/60">
          What parents think
        </p>
        <h2 className="mt-3 text-[28px] font-black uppercase leading-[32px] lg:text-[56px] lg:leading-[56px]">
          Over 1k 5 star google reviews. Read for yourself!
        </h2>
      </div>

      <div className="mt-8 flex gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:gap-6 lg:px-[60px]">
        {displayReviews.map((review, i) => (
          <div
            key={i}
            className="w-[249px] shrink-0 rounded-md bg-white/20 p-5 lg:h-[375px] lg:w-[422px] lg:rounded-xl lg:p-8"
          >
            <div className="flex items-center gap-2 lg:gap-3">
              <Image
                src="/images/review-avatar.png"
                alt=""
                width={35}
                height={35}
                className="size-[35px] shrink-0 rounded-full object-cover lg:size-[53px]"
              />
              <p className="text-[16px] font-black uppercase lg:text-[24px]">{review.name}</p>
            </div>
            <p className="mt-3 text-[14px] leading-[22px] lg:mt-4 lg:text-[21px] lg:leading-[33px]">
              {review.quote}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 max-w-md px-6 lg:max-w-2xl lg:px-[60px]">
        <a
          href="https://www.google.com/search?q=mr+magico+reviews"
          target="_blank"
          rel="noreferrer"
          className="text-[18px] font-extrabold uppercase underline"
        >
          Read full review here
        </a>
      </div>
    </section>
  );
}
