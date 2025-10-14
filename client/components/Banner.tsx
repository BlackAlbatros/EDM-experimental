import { cn } from "@/lib/utils";

const BANNER_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F86cecfe73f914f2393fc7c63dbac01cd%2F97aaa999f6134438a52e32441978122e?format=webp&width=1600";

export function Banner({ total }: { total: number }) {
  const formattedTotal = new Intl.NumberFormat().format(total);

  return (
    <section className="relative mt-4 mb-6 overflow-hidden rounded-2xl md:mt-6 md:mb-8">
      <div className="absolute inset-0">
        <img
          src={BANNER_URL}
          alt="Electronic Music banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
      </div>

      <div className="relative z-10 flex min-h-[220px] flex-col items-center justify-center gap-3 px-6 py-10 text-center md:min-h-[280px] md:px-12 md:py-14">
        <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-4xl">
          Muziq.Rocks – Electronic Music
        </h1>
        <p className="text-white/90">{formattedTotal} videos</p>
        <p className="max-w-5xl text-sm leading-relaxed text-white/90 md:text-base">
          Dive into the electrifying world of electronic music with Muziq.Rocks,
          your go-to app for the best in Dance, House, Trance, NU Disco, and
          EDM. Whether you're a dedicated raver, a club enthusiast, or simply
          someone who loves to groove to the latest beats, Muziq.Rocks has
          something for you. Explore a diverse collection of high-energy tracks
          that span across the spectrum of electronic genres. From the deep,
          hypnotic rhythms of House and Trance to the vibrant and funky vibes of
          NU Disco, Muziq.Rocks brings you the sounds that define the global
          dance scene.
        </p>
      </div>
    </section>
  );
}
