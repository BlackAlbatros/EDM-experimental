import { cn } from "@/lib/utils";

const BANNER_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F86cecfe73f914f2393fc7c63dbac01cd%2F97aaa999f6134438a52e32441978122e?format=webp&width=1600";

export function Banner({ total }: { total: number }) {
  return (
    <section className="relative w-full overflow-hidden rounded-xl">
      <img
        src={BANNER_URL}
        alt="Electronic Music banner"
        className={cn(
          "h-[26vh] min-h-[180px] w-full object-cover object-center md:h-[36vh]",
        )}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-10">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
          Muziq.Rocks – Electronic Music
        </h1>
        <p className="mt-2 text-white/90">
          {new Intl.NumberFormat().format(total)} videos
        </p>
      </div>
    </section>
  );
}
