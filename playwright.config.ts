import { type PlaywrightTestConfig, devices } from "@playwright/test";
import { test, expect, Expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import Jimp from "jimp";
import mime from "mime";

const config: PlaywrightTestConfig = {
  testDir: "e2e",
  retries: 2,
  timeout: process.env.CI ? 10000 : 5000,
  workers: process.env.CI ? 2 : undefined,
  use: {
    viewport: {
      width: 600,
      height: 1200,
    },
    baseURL: "http://localhost:8080/",
    // headless: process.env.CI ? true : false,
    // launchOptions: {
    //   slowMo: process.env.CI ? undefined : 100,
    // },
  },
  webServer: {
    command: "npm run serve",
    port: 8080,
  },
  updateSnapshots: "none",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  reporter: process.env.CI ? "github" : "list",
};

type SyncExpectationResult = {
  pass: boolean;
  message: string | (() => string);
};

export function toMatchImageDiff(
  this: ReturnType<Expect["getState"]>,
  buffer: Buffer,
  {
    name,
    threshold = { distance: 0.01, percent: 0.05 },
  }: { name: string; threshold: { distance: number; percent: number } }
): SyncExpectationResult {
  const testInfo = test.info();
  const snapshotFile = path.join(testInfo.snapshotDir, name);
  const mimeType = mime.getType(snapshotFile);

  // sync Jimp usage, https://github.com/oliver-moran/jimp/issues/303#issuecomment-989686751
  const actual = new Jimp(Jimp.decoders[mimeType](buffer))
    .scale(0.5)
    .quality(60);

  if (
    !fs.existsSync(snapshotFile) ||
    testInfo.config.updateSnapshots === "all"
  ) {
    if (testInfo.config.updateSnapshots === "none") {
      return {
        pass: false,
        message: () =>
          '"updateSnapshots" is set to "none" but snapshot file does not exist',
      };
    }

    fs.mkdirSync(path.dirname(snapshotFile), { recursive: true });
    fs.writeFileSync(snapshotFile, Jimp.encoders[mimeType](actual));

    return {
      pass: true,
      message: () => `created new snapshot: ${snapshotFile}`,
    };
  }

  const expected = new Jimp(
    Jimp.decoders[mimeType](fs.readFileSync(snapshotFile))
  );

  const diff = Jimp.diff(actual, expected);
  const distance = Jimp.distance(actual, expected);

  if (distance < threshold.distance || diff.percent < threshold.percent) {
    return { message: "", pass: true };
  } else {
    if (process.env.UPDATE_SNAPSHOTS_DIFFERENT) {
      fs.mkdirSync(path.dirname(snapshotFile), { recursive: true });
      fs.writeFileSync(snapshotFile, Jimp.encoders[mimeType](actual));
      return {
        message: () => `updated different snapshot: ${snapshotFile}`,
        pass: true,
      };
    }

    const actualPath = testInfo.outputPath(`actual-${name}`);
    const diffPath = testInfo.outputPath(`diff-${name}`);
    const expectedPath = testInfo.outputPath(`expected-${name}`);

    fs.writeFileSync(actualPath, Jimp.encoders[mimeType](actual));
    fs.writeFileSync(diffPath, Jimp.encoders[mimeType](diff.image));
    fs.writeFileSync(expectedPath, Jimp.encoders[mimeType](expected));

    testInfo.attachments.push({
      name: "actual",
      contentType: mimeType,
      path: actualPath,
    });
    testInfo.attachments.push({
      name: "diff",
      contentType: mimeType,
      path: diffPath,
    });
    testInfo.attachments.push({
      name: "expected",
      contentType: mimeType,
      path: expectedPath,
    });

    const message = () =>
      `${name}: distance=${distance}, diff.percent=${diff.percent}\nactual: ${actualPath}\ndiff: ${diffPath}\nexpected: ${expectedPath}`;

    return { message, pass: false };
  }
}

expect.extend({
  toMatchImageDiff,
});

export default config;
