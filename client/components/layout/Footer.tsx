import { Globe } from "lucide-react";

const MuziqSiteIcon = () => (
  <Globe size={32} strokeWidth={1.5} />
);

const AppleMusicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={32}
    height={32}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.05 13.5c-.91 0-1.82-.44-2.84-1.31v8.26c0 .55-.45 1-1 1s-1-.45-1-1v-15c0-.55.45-1 1-1 .55 0 1 .45 1 1v.13c1.02-.87 1.93-1.31 2.84-1.31 2.84 0 5.27 2.46 5.27 5.63s-2.43 5.6-5.27 5.6zm0-9.13c-.83 0-1.67.38-2.39 1.09v6.08c.72.71 1.56 1.09 2.39 1.09 1.93 0 3.54-1.62 3.54-3.63s-1.61-3.63-3.54-3.63z" />
    <path d="M6.5 13.5c-2.84 0-5.27-2.46-5.27-5.63S3.66 2.27 6.5 2.27c.91 0 1.82.44 2.84 1.31V1.5c0-.55.45-1 1-1s1 .45 1 1v15c0 .55-.45 1-1 1s-1-.45-1-1v-.13c-1.02.87-1.93 1.31-2.84 1.31zm0-9.13c1.93 0 3.54 1.62 3.54 3.63s-1.61 3.63-3.54 3.63c-.83 0-1.67-.38-2.39-1.09v-6.08c.72-.71 1.56-1.09 2.39-1.09z" />
  </svg>
);

const SpotifyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={32}
    height={32}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" fill="none" />
    <path d="M9.04 9.04c3.94-2.31 10.43-2.53 14.12.73.65.58.22 1.51-.73 1.61-2.79.3-7.73.41-10.86 2.46-.3.23-.78.16-1.03-.24-.25-.4-.03-.85.5-1.17zM8.84 12.74c-.15-.25-.11-.63.2-.85 2.37-1.73 5.94-2.24 9.41-1.23.35.1.6.35.55.72-.05.37-.42.64-.78.55-3.06-.93-6.17-.51-8.2.95-.19.14-.49.12-.68-.08zm-.46 2.95c-.1-.16-.1-.42.08-.57 1.99-1.44 4.98-1.88 7.46-.98.27.1.45.36.41.65-.04.29-.28.49-.57.42-2.17-.73-4.79-.35-6.5.68-.18.1-.41.07-.48-.2z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={32}
    height={32}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const AmazonMusicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={32}
    height={32}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M6.5 7c-1.93 0-3.5 1.57-3.5 3.5S4.57 14 6.5 14 10 12.43 10 10.5 8.43 7 6.5 7zm0 5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    <path d="M17.5 7c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const Footer = () => {
  const links = [
    {
      name: "Site",
      url: "https://muziq.rocks",
      icon: MuziqSiteIcon,
      label: "Muziq.Rocks",
    },
    {
      name: "Apple Music",
      url: "https://music.apple.com/profile/MuziqRocks",
      icon: AppleMusicIcon,
      label: "MuziqRocks",
    },
    {
      name: "Spotify",
      url: "https://open.spotify.com/user/MuziqRocks",
      icon: SpotifyIcon,
      label: "MuziqRocks",
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@MuziqRocks",
      icon: YouTubeIcon,
      label: "MuziqRocks",
    },
    {
      name: "Amazon Music",
      url: "https://music.amazon.com/artists/MuziqRocks",
      icon: AmazonMusicIcon,
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
                <Icon />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
};
