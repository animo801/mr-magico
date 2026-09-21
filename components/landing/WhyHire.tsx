import Image from 'next/image';

export default function WhyHire() {
  return (
    <>
      <section
        id='why-hire'
        className='relative flex min-h-[760px] flex-col items-center justify-start overflow-hidden bg-[#223a7b] px-6 pb-16 pt-20 text-white lg:min-h-[900px] lg:items-start lg:px-[60px] lg:pt-28'
      >
        <Image
          src='/images/hero-photo.png'
          alt=''
          fill
          className='object-cover'
          style={{ objectPosition: '50% 20%' }}
        />
        <div className='absolute inset-0 bg-gradient-to-b from-[rgba(34,58,123,0.6)] to-[rgba(34,58,123,0)]' />
        <div className='absolute inset-x-0 bottom-0 h-[220px] bg-gradient-to-b from-white/0 to-white' />

        {/* Decorative stars — mobile-only holdover from before the Figma desktop
            redesign; node 9:32 has no star decorations on this section. */}
        <div
          className='pointer-events-none absolute inset-0 lg:hidden'
          aria-hidden
        >
          <Image
            src='/images/star-1.svg'
            alt=''
            width={92}
            height={88}
            className='absolute left-[-8%] top-[-4%] rotate-[-15.52deg]'
          />
          <Image
            src='/images/star-1.svg'
            alt=''
            width={92}
            height={88}
            className='absolute left-[9%] top-[-14%] rotate-[-15.52deg]'
          />
          <Image
            src='/images/star-2.svg'
            alt=''
            width={96}
            height={92}
            className='absolute left-[63%] top-[-16%] rotate-[20.04deg]'
          />
          <Image
            src='/images/star-3.svg'
            alt=''
            width={81}
            height={77}
            className='absolute left-[84%] top-[0%] rotate-[4.54deg]'
          />
        </div>

        <div className='relative mx-auto max-w-md text-center lg:mx-0 lg:max-w-2xl lg:text-left'>
          <p className='text-[18px] font-black uppercase leading-[32px] text-white/60 lg:text-[36px] lg:leading-[40px]'>
            Why hire Mr. Magico?
          </p>
          <h2 className='mt-1 text-[48px] font-black uppercase leading-[40px] lg:text-[95px] lg:leading-[80px]'>
            He makes your kid the star of the show
          </h2>
        </div>
      </section>

      <section className='relative -mt-px bg-white px-6 py-14'>
        <div className='mx-auto max-w-md text-[24px] font-black leading-[36px] text-[#111] lg:max-w-2xl lg:text-center lg:text-[32px]'>
          <p>
            Every kid deserves to feel special on their birthday. Like for 45
            minutes, they are a magician too.
          </p>
          <p className='mt-6'>
            Here are 6 things we do to make that happen for your kid:
          </p>
        </div>
      </section>
    </>
  );
}
