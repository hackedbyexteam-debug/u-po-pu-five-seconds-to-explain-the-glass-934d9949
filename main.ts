// Five Seconds to Explain the Glass — make.fun program/v1 entry.
// Writes one sentence to /output/entry.txt: the excuse a house cat gives
// in the five seconds after knocking a glass off the table. No apology,
// no confession, no gravity/slippery-edge/already-falling cliché (C3):
// the glass was blocking the cat's sunbeam, so the cat ran a routine
// floor inspection — and the floor passed. Pure cat logic (C2): the
// sunbeam matters, the floor is certified, the glass is never mentioned
// as a loss. One sentence, 115 characters, inside the 200-character gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "It was blocking my sunbeam, so I conducted a routine floor inspection, and I am pleased to report the floor passed.";

// The sealed gate only accepts 1–200 characters, one sentence, not blank.
// Also reject any stray newline or leading/trailing space, which would
// waste characters and could fail the gate's "not only white space" rule.
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry is ${ENTRY.length} characters, must be 1-200`);
}
if (ENTRY !== ENTRY.trim() || ENTRY.includes("\n")) {
  throw new Error("entry must have no leading/trailing space or newline");
}
if ((ENTRY.match(/\./g) ?? []).length !== 1 || !/\S/.test(ENTRY)) {
  throw new Error("entry must be exactly one non-blank sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
