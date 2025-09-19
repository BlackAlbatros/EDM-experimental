import { Link } from "react-router-dom";

const LOGO_URL =
  "https://cdn.builder.io/api/v1/image/assets%2F86cecfe73f914f2393fc7c63dbac01cd%2F165c7c733c6c4dc7bd887d8396d885a9?format=webp&width=800";

export function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/80 bg-background/70 border-b">
      <div className="container mx-auto flex items-center gap-3 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO_URL} alt="Muziq.Rocks" className="h-8 w-8" />
          <span className="font-bold tracking-wide">Muziq.Rocks</span>
        </Link>
        <nav className="ml-auto flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-primary font-medium">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
}
