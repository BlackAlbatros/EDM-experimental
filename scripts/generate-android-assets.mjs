// Generate Android launcher icons (mipmap) and splash drawables from a source logo
// Usage: node scripts/generate-android-assets.mjs [imageUrl]
// Requires: pnpm add -D sharp

import fs from "fs";
import path from "path";
import sharp from "sharp";

const SRC =
  process.argv[2] ||
  "https://cdn.builder.io/api/v1/image/assets%2F86cecfe73f914f2393fc7c63dbac01cd%2F5edf1caedd8f4c8392fed5a48727d373?format=webp&width=1024";

const androidRoot = path.join(
  process.cwd(),
  "android",
  "app",
  "src",
  "main",
  "res",
);
const outRoot = fs.existsSync(androidRoot)
  ? androidRoot
  : path.join(process.cwd(), "android-assets");
if (!fs.existsSync(outRoot)) fs.mkdirSync(outRoot, { recursive: true });

const mipmap = {
  mdpi: 48,
  hdpi: 72,
  xhdpi: 96,
  xxhdpi: 144,
  xxxhdpi: 192,
};

const splashSize = {
  mdpi: 320,
  hdpi: 480,
  xhdpi: 720,
  xxhdpi: 960,
  xxxhdpi: 1280,
};

async function main() {
  const buffer = await fetch(SRC)
    .then((r) => r.arrayBuffer())
    .then((b) => Buffer.from(b));

  for (const [bucket, size] of Object.entries(mipmap)) {
    const dir = path.join(outRoot, `mipmap-${bucket}`);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, "ic_launcher.png");
    await sharp(buffer)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toFile(file);
    const round = path.join(dir, "ic_launcher_round.png");
    await sharp(buffer).resize(size, size).png().toFile(round);
  }

  for (const [bucket, size] of Object.entries(splashSize)) {
    const dir = path.join(outRoot, `drawable-${bucket}`);
    fs.mkdirSync(dir, { recursive: true });
    const file = path.join(dir, "splash.png");
    // center logo on black square canvas
    const canvas = sharp({
      create: {
        width: size,
        height: size,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      },
    });
    const logo = await sharp(buffer)
      .resize(Math.floor(size * 0.5))
      .png()
      .toBuffer();
    await canvas
      .composite([{ input: logo, gravity: "centre" }])
      .png()
      .toFile(file);
  }

  console.log("Assets generated in:", outRoot);
  console.log(
    "If android/ exists, files were written directly. Otherwise, copy them into android/app/src/main/res/ then rebuild.",
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
