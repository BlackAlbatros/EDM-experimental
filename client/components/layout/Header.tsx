import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F86cecfe73f914f2393fc7c63dbac01cd%2F165c7c733c6c4dc7bd887d8396d885a9?format=webp&width=800";

export function Header() {
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const navigate = useNavigate();

  useEffect(() => {
    setQ(params.get("q") ?? "");
  }, [params]);

  function onChange(value: string) {
    setQ(value);
    const next = new URLSearchParams(params);
    if (value) next.set("q", value);
    else next.delete("q");
    setParams(next, { replace: true });
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/80 bg-background/70 border-b">
      <div className="container mx-auto flex items-center gap-3 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Muziq.Rocks" className="h-8 w-8" />
          <span className="font-bold tracking-wide">Muziq.Rocks</span>
        </Link>
        <div className="ml-auto w-full max-w-md">
          <input
            value={q}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search titles and descriptions…"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            aria-label="Search videos"
          />
        </div>
      </div>
    </header>
  );
}
