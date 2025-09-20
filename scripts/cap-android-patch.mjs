import fs from "fs";
import path from "path";

function fileExists(p) {
  try {
    fs.accessSync(p);
    return true;
  } catch {
    return false;
  }
}

const androidDir = path.join(process.cwd(), "android");
const gradleKts = path.join(androidDir, "app", "build.gradle.kts");
const gradleGroovy = path.join(androidDir, "app", "build.gradle");

if (!fileExists(androidDir)) {
  console.log("Android project not found. Run 'pnpm cap:add:android' first.");
  process.exit(0);
}

function patch(content) {
  let out = content;
  // minSdkVersion
  out = out.replace(/minSdk(?:Version)?\s*=\s*\d+/g, (m) => {
    const n = parseInt(m.match(/\d+/)[0], 10);
    return m.replace(/\d+/, String(Math.max(22, n)));
  });
  out = out.replace(/minSdk(?:Version)?\s+\d+/g, (m) => {
    const n = parseInt(m.match(/\d+/)[0], 10);
    return m.replace(/\d+/, String(Math.max(22, n)));
  });
  // versionCode
  out = out.replace(/versionCode\s*=\s*\d+/g, (m) => {
    const n = parseInt(m.match(/\d+/)[0], 10);
    return m.replace(/\d+/, String(Math.max(6, n)));
  });
  out = out.replace(/versionCode\s+\d+/g, (m) => {
    const n = parseInt(m.match(/\d+/)[0], 10);
    return m.replace(/\d+/, String(Math.max(6, n)));
  });
  // applicationId
  out = out.replace(/applicationId\s+"[^"]+"/g, 'applicationId "com.fireappbuilder.android.MuziqRocksEDM"');
  out = out.replace(/applicationId\s*=\s*"[^"]+"/g, 'applicationId = "com.fireappbuilder.android.MuziqRocksEDM"');
  return out;
}

if (fileExists(gradleKts)) {
  const src = fs.readFileSync(gradleKts, "utf8");
  const out = patch(src);
  fs.writeFileSync(gradleKts, out);
  console.log("Patched:", gradleKts);
} else if (fileExists(gradleGroovy)) {
  const src = fs.readFileSync(gradleGroovy, "utf8");
  const out = patch(src);
  fs.writeFileSync(gradleGroovy, out);
  console.log("Patched:", gradleGroovy);
} else {
  console.log("build.gradle(.kts) not found under android/app");
}
