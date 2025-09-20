import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "rocks.muziq.electronic",
  appName: "Muziq.Rocks - Electronic Music",
  webDir: "dist/spa",
  server: {
    androidScheme: "https",
  },
  android: {
    backgroundColor: "#000000",
    allowMixedContent: true,
  },
};

export default config;
