import { Globe, Apple, Radio, Youtube, Music } from "lucide-react";

export const Footer = () => {
  const links = [
    {
      name: "Site",
      url: "https://muziq.rocks",
      icon: Globe,
      label: "Muziq.Rocks",
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/profile/MuziqRocks",
      icon: Apple,
      label: "MuziqRocks",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/MuziqRocks",
      icon: Spotify,
      label: "MuziqRocks",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@MuziqRocks",
      icon: Youtube,
      label: "MuziqRocks",
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/artists/MuziqRocks",
      icon: Music,
      label: "MuziqRocks",
    },
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-8 justify-center items-center">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 hover:opacity-80 transition-opacity"
                aria-label={`${link.name}: ${link.label}`}
              >
                <Icon size={32} strokeWidth={1.5} />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
