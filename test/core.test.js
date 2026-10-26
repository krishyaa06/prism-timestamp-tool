const test = require("node:test");
const assert = require("node:assert/strict");
const C = require("../js/core.js");
const NOW = Date.UTC(2026, 9, 26, 10, 0, 0);

test("detects unix precision", () => {
  assert.equal(C.parse("1700000000").kind, "unix seconds");
  assert.equal(C.parse("1700000000000").kind, "unix milliseconds");
  assert.equal(C.parse("1700000000000000").date.getTime(), 1700000000000);
  assert.equal(C.parse("1700000000000000000").kind, "unix nanoseconds");
});
test("ISO, now and relative input", () => {
  assert.equal(C.parse("2026-10-26T10:00:00Z").date.getTime(), NOW);
  assert.equal(C.parse("now", NOW).date.getTime(), NOW);
  assert.equal(C.parse("-2h", NOW).date.getTime(), NOW - 7200000);
  assert.equal(C.parse("+3 days", NOW).date.getTime(), NOW + 3 * 864e5);
  assert.equal(C.parse("banana"), null);
});
test("relative wording", () => {
  assert.equal(C.relative(new Date(NOW - 5 * 6e4), NOW), "5 minutes ago");
  assert.equal(C.relative(new Date(NOW + 864e5), NOW), "in 1 day");
});
test("formats include Discord tags", () => {
  const f = C.formats(new Date(NOW), "UTC");
  assert.equal(f["Unix (s)"], String(NOW / 1000));
  assert.equal(f.Discord, `<t:${NOW / 1000}:F>`);
  assert.equal(f["SQL DATETIME"], "2026-10-26 10:00:00");
});
test("calendar info and difference", () => {
  assert.equal(C.info(new Date(Date.UTC(2024, 11, 31))).dayOfYear, 366);
  assert.equal(C.info(new Date(Date.UTC(2024, 0, 1))).leap, true);
  assert.equal(C.weekNumber(new Date(Date.UTC(2026, 0, 1))), 1);
  assert.equal(C.between(new Date(0), new Date(90061000)).text, "1d 1h 1m 1s");
});
