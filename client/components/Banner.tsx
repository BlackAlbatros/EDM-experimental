import { cn } from "@/lib/utils";

const BANNER_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F86cecfe73f914f2393fc7c63dbac01cd%2F97aaa999f6134438a52e32441978122e?format=webp&width=1600";

export function Banner({ total }: { total: number }) {
  return (
    <section className="relative w-full overflow-hidden rounded-xl mt-4 mb-6 md:mt-6 md:mb-8">
      <img
        src={BANNER_URL}
        alt="Electronic Music banner"
        className={cn(
          "h-[22vh] min-h-[160px] w-full object-cover object-center md:h-[28vh]",
        )}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-10 text-center py-8 md:py-12">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
          Muziq.Rocks – Electronic Music
        </h1>
        <p className="mt-1 text-white/90">
          {new Intl.NumberFormat().format(total)} videos
        </p>
        <p className="mt-3 max-w-5xl text-sm md:text-base leading-relaxed text-white/90">
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
