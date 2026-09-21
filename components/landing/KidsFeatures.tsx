import Image from 'next/image';

const featureBoxes: { label: string; icon?: string; iconSrc?: string }[] = [
  { label: 'Participation in almost all trick', icon: '🙌' },
  { label: "Jokes to get'em laughing", icon: '😂' },
  { label: 'Live Animals', icon: '🐰' },
  { label: 'Music + Sound Effects', icon: '🎶' },
  { label: 'Custom balloon animals', iconSrc: '/images/balloon-dog.svg' },
  { label: 'Teach them a trick', icon: '🪄' },
];

export default function KidsFeatures() {
  return (
    <section className='bg-white px-6 pb-16'>
      <div className='mx-auto grid max-w-md grid-cols-2 gap-3 sm:max-w-2xl sm:grid-cols-3 lg:max-w-3xl lg:gap-3'>
        {featureBoxes.map(({ label, icon, iconSrc }) => (
          <div
            key={label}
            className='flex h-[125px] flex-col items-center justify-center gap-2 rounded-xl border border-[#223a7b]/10 bg-[#f4f6fd] px-4 text-center shadow-sm transition-shadow hover:shadow-md'
          >
            {iconSrc ? (
              <Image src={iconSrc} alt='' width={32} height={32} />
            ) : (
              <span className='text-2xl' aria-hidden>
                {icon}
              </span>
            )}
            <span className='text-[14px] font-black uppercase leading-[16px] text-[#223a7b]'>
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
