const featureBoxes = [
  { label: 'Participation in almost all trick', icon: '🙌' },
  { label: "Jokes to get'em laughing", icon: '😂' },
  { label: 'Live Animals', icon: '🐰' },
  { label: 'Music + Sound Effects', icon: '🎶' },
  { label: 'Custom balloon animals', icon: '✨' },
  { label: 'Teach a trick', icon: '🪄' },
];

export default function Parents() {
  return (
    <>
      <section className='bg-white px-6 pb-16 pt-10'>
        <div className='mx-auto grid max-w-md grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-3 lg:max-w-3xl lg:gap-3'>
          {featureBoxes.map(({ label, icon }) => (
            <div
              key={label}
              className='flex h-[125px] flex-col items-center justify-center gap-2 rounded-xl border border-[#223a7b]/10 bg-[#f4f6fd] px-2 text-center shadow-sm transition-shadow hover:shadow-md'
            >
              <span className='text-2xl' aria-hidden>
                {icon}
              </span>
              <span className='text-[12.33px] font-black uppercase leading-[24.66px] text-[#223a7b]'>
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className='bg-[#223a7b] px-6 py-20 text-center text-white lg:px-[60px] lg:py-28 lg:text-left'>
        <div className='lg:flex lg:items-center lg:justify-between lg:gap-12'>
          <div className='lg:max-w-[680px]'>
            <p className='text-[24px] font-black uppercase leading-[60px] text-white/60 lg:text-[38px] lg:leading-[36px]'>
              We don&rsquo;t forget about
            </p>
            <p className='text-[80px] font-black uppercase leading-[36px] lg:text-[128px] lg:leading-[128px]'>
              Parents
            </p>
            <p className='mt-8 text-[20px] leading-[28px] lg:text-[28px] lg:leading-[36px]'>
              While the show is for the kids, we work hard to involve the
              parents as much as we can. From shaping the balloon animals to
              jokes only adults will get, you can rest assured you and all your
              guests will be entertained.
            </p>
          </div>
          <div className='mx-auto mt-10 h-[400px] w-full max-w-[462px] shrink-0 rounded-xl bg-[#d9d9d9] lg:mx-0 lg:h-[518px]' />
        </div>
      </section>
    </>
  );
}
