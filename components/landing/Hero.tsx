import Link from 'next/link';
import Header from './Header';
import ReviewerCarousel from './ReviewerCarousel';

export default function Hero() {
  return (
    <section className='relative overflow-hidden bg-gradient-to-b from-[#0b1638] via-[#16255c] to-[#223a7b] pb-24 pt-28 text-white min-h-[780px] lg:min-h-screen lg:pb-0'>
      {/* Mobile: video fills the section as a background. Desktop uses a
          dedicated panel on the right instead (below) — the video is hidden
          here at lg so it isn't rendered (and decoded) twice. */}
      <div className='absolute inset-0 lg:hidden'>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster='/images/hero-video-poster.jpg'
          className='size-full object-cover'
          style={{ objectPosition: '50% 20%' }}
        >
          <source src='/videos/hero-highlight.mp4' type='video/mp4' />
        </video>
        <div className='absolute inset-0 bg-gradient-to-b from-[#0b1638]/75 via-[#16255c]/70 to-[#223a7b]/75' />
      </div>

      <Header />
      <div className='relative mx-auto max-w-md px-6 lg:max-w-380 lg:pb-24 lg:pl-[48px] lg:pr-[calc(min(46vw,580px)+40px)]'>
        <div className='lg:max-w-[1200px] '>
          <p className='hidden text-[20px] font-black uppercase text-white/50 lg:block'>
            The most popular magician in NYC
          </p>
          <h1 className='mt-0 text-[32px] font-black uppercase leading-[32px] lg:mt-3 lg:text-[56px] lg:leading-[56px] xl:text-[72px] xl:leading-[72px]'>
            Your kids favorite{' '}
            <span
              className='box-decoration-clone px-1 py-0.5'
              style={{
                backgroundImage:
                  'linear-gradient(to bottom, transparent 0%, transparent 12%, #3653e3 12%, #3653e3 88%, transparent 88%, transparent 100%)',
              }}
            >
              birthday party ever.
            </span>
          </h1>
          <p className='mt-6 text-[24px] leading-[24px] text-white lg:text-[28px] lg:leading-[36px]'>
            For over 20 years, we at Mr. Magico have been working to amazing
            kids and adults with our act specifically for birthday parties.
          </p>
          <Link
            href='/quiz/1'
            className='mt-8 inline-block rounded-lg bg-[#3653e3] px-8 py-3.5 text-[18px] font-black uppercase text-white lg:rounded-xl lg:px-10 lg:py-4 lg:text-[22px]'
          >
            Connect with Mr. Magico
          </Link>

          <div className='mt-14'>
            <p className='text-[16px] font-black uppercase text-white/56'>
              Over 1k 5 star google reviews
            </p>
            <div className='mt-4'>
              <ReviewerCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: dedicated video panel on the right, flush against the page
          edge and stretched to the section's full height (via inset-y-0,
          not a fixed h-screen) — so it always reaches the section's actual
          bottom edge even when left-column padding makes the section taller
          than one viewport. Positioned relative to the full-width section
          (not the padded content column) so it reaches the true edge
          regardless of how wide the viewport is. */}
      <div className='hidden overflow-hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-[46%] lg:max-w-[580px]'>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster='/images/hero-video-poster.jpg'
          className='size-full object-cover'
          style={{ objectPosition: '50% 20%' }}
        >
          <source src='/videos/hero-highlight.mp4' type='video/mp4' />
        </video>
      </div>
    </section>
  );
}
