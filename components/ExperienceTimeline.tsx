const timeline = [
  {
    year: 'Pagi',
    title: 'Sunrise Trek dan Kopi Muria',
    description:
      'Mulai hari dengan trekking ringan dan mencicipi kopi robusta Muria ditemani panorama hamparan sawah.'
  },
  {
    year: 'Siang',
    title: 'Outbond Adventure & Workshop',
    description:
      'Jalani sesi team building, fun games, hingga workshop budaya seperti batik Eco-Print atau kuliner lokal.'
  },
  {
    year: 'Sore',
    title: 'Rileks di Villa atau Glamping',
    description:
      'Kembali ke villa panorama untuk beristirahat, menikmati snack tradisional, atau spa herbal rumahan.'
  },
  {
    year: 'Malam',
    title: 'Api Unggun & Kuliner Nusantara',
    description:
      'Akhiri hari dengan BBQ, live acoustic, dan api unggun bersama, sambil menikmati langit penuh bintang.'
  }
];

export function ExperienceTimeline() {
  return (
    <section className="bg-desert/60 py-20">
      <div className="container-responsive space-y-12">
        <div className="text-center space-y-3">
          <h2 className="section-title">Rangkaian Pengalaman Satu Hari di Taman Sardi</h2>
          <p className="section-subtitle">
            Agenda fleksibel yang dapat disesuaikan dengan kebutuhan perusahaan, komunitas, maupun keluarga besar.
          </p>
        </div>
        <div className="relative grid gap-10 md:grid-cols-2">
          {timeline.map((item) => (
            <article key={item.title} className="rounded-3xl bg-white p-8 shadow-lg border border-secondary/10">
              <span className="text-sm font-semibold text-primary uppercase">{item.year}</span>
              <h3 className="text-2xl font-display text-secondary mt-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
