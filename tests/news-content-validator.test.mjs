import { execFileSync } from "node:child_process";
import path from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const PROJECT_ROOT = process.cwd();
const SCRIPT_PATH = path.join(PROJECT_ROOT, "scripts", "validate-news-content.mjs");
const VALID_FIXTURE = path.join(PROJECT_ROOT, "tests", "fixtures", "news-valid");
const INVALID_FIXTURE = path.join(PROJECT_ROOT, "tests", "fixtures", "news-invalid");

function runValidator(newsRoot) {
  return execFileSync("node", [SCRIPT_PATH], {
    cwd: PROJECT_ROOT,
    env: { ...process.env, NEWS_ROOT: newsRoot, NEWS_CONTENT_VALIDATION_MODE: "strict" },
    encoding: "utf8",
  });
}

test("content validator accepts well-formed fixture news", () => {
  const output = runValidator(VALID_FIXTURE);
  assert.match(output, /NEWS content validation passed/);
});

test("content validator rejects malformed fixture news", () => {
  assert.throws(
    () => runValidator(INVALID_FIXTURE),
    (error) => {
      assert.equal(error.status, 1);
      assert.match(error.stderr, /missing daily framing marker|missing the summary label/);
      return true;
    },
  );
});
