const notableClients = [
  { name: "Chris Martin", title: "Lead singer of Coldplay", video: "/videos/chris-martin.mp4" },
  { name: "Jenny Brown", title: "News anchor", video: "/videos/jenny-brown.mp4" },
];

export default function Famous() {
  return (
    <section className="bg-[#e9edff] py-16">
      <div className="max-w-md px-6 lg:max-w-2xl lg:px-[60px]">
        <h2 className="mt-0 text-[28px] font-black uppercase leading-[32px] text-[#111] lg:mt-3 lg:text-[56px] lg:leading-[56px]">
          Honored to have performed for stars
        </h2>
      </div>

      <div className="mt-8 flex gap-6 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:gap-8 lg:px-[60px]">
        {notableClients.map((person) => (
          <div key={person.name} className="w-[290px] shrink-0 lg:w-[399px]">
            <video
              controls
              preload="metadata"
              className="h-[502px] w-[290px] rounded-xl bg-black object-cover lg:h-[643px] lg:w-[399px]"
            >
              <source src={person.video} type="video/mp4" />
            </video>
            <p className="mt-4 text-[20px] font-black uppercase leading-[20px] text-black lg:text-[28px] lg:leading-[32px]">
              {person.name}
            </p>
            <p className="mt-1.5 text-[14px] font-black uppercase leading-[14px] text-black/40">
              {person.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
