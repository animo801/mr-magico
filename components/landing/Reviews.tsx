import Image from 'next/image';

/**
 * `image` is the filename (no extension) from /public/images/ — reorder or
 * swap it per entry to move photos to a different reviewer.
 */
const reviews = [
  {
    name: 'Nicholas Collado',
    quote:
      "Mr. Magico was AWESOME! The show was thoughtful, very funny, interactive, and perfect for my daughter's birthday. I will definitely recommend!",
    image: 'review-avatar-1',
  },
  {
    name: 'Sammi Sher',
    quote:
      "Mr. Magico was so fun! We had a family party (kids + adults) and Mr. Magico included and entertained everyone from Grandma to our 4 year old. While there weren't too many magic tricks, the entertainment was top notch. The bunny was the biggest hit!",
    image: 'review-avatar',
  },
  {
    name: 'Michael Melore',
    quote:
      'We were very pleased booking through Mr Magico for a restaurant birthday event of 20 adult guests. Cisco the magician was perfect. He provided personalized attention to the guests and of course the birthday guest of honor. He had everyone engaged, laughing, surprised and entertained. The cost was very affordable.',
    image: 'review-avatar-2',
  },
  {
    name: 'Jessica Heimburger',
    quote:
      "Mr. Magico was awesome for my 6 year olds birthday party. We had an absolute blast. He performed for the entire hour, engaged over 16 kids, and brought so much joy and magic to our day!!!!\nHighly recommend booking for your next party.\nParent tip: he's great if your worried about weather. Rain or shine, he can set up pretty much anywhere!",
    image: 'review-avatar-3',
  },
  {
    name: 'Lexi McDonald Moriarty',
    quote:
      'We couldn’t have been happier with having Mr. Magico at my son‘s birthday party. My son loved every minute of it, and he won’t stop talking about it. John did a great job of keeping the kids attention and keeping them laughing, and he kept the adults laughing too. We would absolutely have him perform again!',
    image: 'review-avatar-4',
  },
  {
    name: 'Tony Persaud',
    quote:
      'I booked Cisco for a 12 year old birthday party. He was great!! Arrived on-time and had kids and adults engaged for the entire show. Would definitely recommend Mr. Magico and will use them again.',
    image: 'review-avatar-5',
  },
];

/**
 * Only four real reviews are available so far (cycled across the card row
 * below) — add more entries to `reviews` above once more are collected and
 * they'll appear here automatically.
 */
const displayReviews = Array.from(
  { length: 6 },
  (_, i) => reviews[i % reviews.length],
);

const stripPhotos = [
  '/images/hero-photo.png',
  '/images/strip-2.png',
  '/images/strip-3.png',
];

export default function Reviews() {
  return (
    <section className='bg-[#3653e3] pb-16 pt-8 text-white'>
      {/* Photo strip — mobile-only holdover from before the Figma desktop redesign; the
          desktop frame (node 9:32) starts straight at the "What parents think" heading. */}
      <div className='flex gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:hidden'>
        {stripPhotos.map((src, i) => (
          <div
            key={i}
            className='relative h-[271px] w-[203px] shrink-0 overflow-hidden'
          >
            <Image src={src} alt='' fill className='object-cover' />
          </div>
        ))}
      </div>

      <div className='mt-8 max-w-md px-6 lg:max-w-4xl lg:px-[60px]'>
        <p className='text-[16px] font-black uppercase leading-4 text-white/60'>
          What parents think
        </p>
        <h2 className='mt-3 text-[28px] font-black uppercase leading-[32px] lg:text-[56px] lg:leading-[56px]'>
          Over 1k 5 star google reviews. Read for yourself!
        </h2>
      </div>

      <div className='mt-8 flex items-start gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:gap-6 lg:px-[60px]'>
        {displayReviews.map((review, i) => (
          <div
            key={i}
            className='h-auto w-[249px] shrink-0 rounded-md bg-white/20 p-5 lg:w-[422px] lg:rounded-xl lg:p-8'
          >
            <div className='flex items-center gap-2 lg:gap-3'>
              <Image
                src={`/images/${review.image}.png`}
                alt=''
                width={35}
                height={35}
                className='size-[35px] shrink-0 rounded-full object-cover lg:size-[53px]'
              />
              <p className='text-[16px] font-black uppercase lg:text-[24px]'>
                {review.name}
              </p>
            </div>
            <p className='mt-3 whitespace-pre-line text-[14px] leading-[22px] lg:mt-4 lg:text-[21px] lg:leading-[33px]'>
              {review.quote}
            </p>
          </div>
        ))}
      </div>

      <div className='mt-4 max-w-md px-6 lg:max-w-2xl lg:px-[60px]'>
        <a
          href='https://www.google.com/search?q=mr+magico+reviews&oq=mr+magico&gs_lcrp=EgZjaHJvbWUqCQgAEEUYOxiABDIJCAAQRRg7GIAEMg0IARAuGK8BGMcBGIAEMggIAhAAGBYYHjIICAMQABgWGB4yCAgEEAAYFhgeMgYIBRBFGDwyBggGEEUYPDIGCAcQRRg90gEIMTA4M2owajSoAgCwAgA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x89c19f7bc93a5b65:0x36d2f7b7178dd3d4,1,,,,'
          target='_blank'
          rel='noreferrer'
          className='text-[18px] font-extrabold uppercase underline'
        >
          Read all 1k reviews on Google
        </a>
      </div>
    </section>
  );
}
