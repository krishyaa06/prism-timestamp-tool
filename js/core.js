/* Prism Timestamp Tool · core logic (browser + Node) */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Core = api;
})(typeof self !== "undefined" ? self : this, function () {
  /** Parse almost anything into a Date: unix seconds/ms/µs/ns, ISO, RFC 2822, "now", relative like "-2h". */
  function parse(input, now = Date.now()) {
    const s = String(input).trim();
    if (!s) return null;
    if (/^now$/i.test(s)) return { date: new Date(now), kind: "now" };
    let m;
    if ((m = /^([+-])\s*(\d+(?:\.\d+)?)\s*(s|sec|m|min|h|hr|d|day|w|week|mo|month|y|year)s?$/i.exec(s))) {
      const mult = { s: 1e3, sec: 1e3, m: 6e4, min: 6e4, h: 36e5, hr: 36e5, d: 864e5, day: 864e5, w: 6048e5, week: 6048e5, mo: 2592e6, month: 2592e6, y: 31536e6, year: 31536e6 }[m[3].toLowerCase()];
      return { date: new Date(now + (m[1] === "-" ? -1 : 1) * parseFloat(m[2]) * mult), kind: "relative" };
    }
    if (/^-?\d+(\.\d+)?$/.test(s)) {
      const n = parseFloat(s), digits = s.replace(/^-|\.\d+$/g, "").length;
      if (digits <= 11) return { date: new Date(n * 1000), kind: "unix seconds" };
      if (digits <= 14) return { date: new Date(n), kind: "unix milliseconds" };
      if (digits <= 17) return { date: new Date(n / 1000), kind: "unix microseconds" };
      return { date: new Date(n / 1e6), kind: "unix nanoseconds" };
    }
    const d = new Date(s);
    return isNaN(d) ? null : { date: d, kind: /^\d{4}-\d{2}-\d{2}/.test(s) ? "ISO 8601" : "date string" };
  }
  function relative(date, now = Date.now()) {
    const diff = date.getTime() - now, abs = Math.abs(diff);
    const units = [["year", 31536e6], ["month", 2592e6], ["week", 6048e5], ["day", 864e5], ["hour", 36e5], ["minute", 6e4], ["second", 1e3]];
    if (abs < 1000) return "just now";
    for (const [u, ms] of units) if (abs >= ms) { const v = Math.round(abs / ms); return diff < 0 ? `${v} ${u}${v > 1 ? "s" : ""} ago` : `in ${v} ${u}${v > 1 ? "s" : ""}`; }
  }
  function formats(date, tz) {
    const opt = (o) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, ...o }).format(date);
    const ms = date.getTime();
    return {
      "Unix (s)": String(Math.floor(ms / 1000)),
      "Unix (ms)": String(ms),
      "ISO 8601": date.toISOString(),
      "RFC 2822": date.toUTCString(),
      "Local": opt({ dateStyle: "full", timeStyle: "long" }),
      "SQL DATETIME": date.toISOString().replace("T", " ").slice(0, 19),
      "Discord": `<t:${Math.floor(ms / 1000)}:F>`,
      "Discord relative": `<t:${Math.floor(ms / 1000)}:R>`,
    };
  }
  function weekNumber(d) { const t = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())); const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day); const y = new Date(Date.UTC(t.getUTCFullYear(), 0, 1)); return Math.ceil(((t - y) / 864e5 + 1) / 7); }
  function info(date) {
    const start = Date.UTC(date.getUTCFullYear(), 0, 1), y = date.getUTCFullYear();
    return { dayOfYear: Math.floor((date - start) / 864e5) + 1, week: weekNumber(date), leap: (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0, quarter: Math.floor(date.getUTCMonth() / 3) + 1 };
  }
  function between(a, b) {
    const ms = Math.abs(b - a), d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), m = Math.floor((ms % 36e5) / 6e4), s = Math.floor((ms % 6e4) / 1e3);
    return { ms, text: `${d}d ${h}h ${m}m ${s}s`, days: +(ms / 864e5).toFixed(2), hours: +(ms / 36e5).toFixed(2) };
  }
  const ZONES = ["UTC", "Asia/Kolkata", "America/New_York", "America/Los_Angeles", "Europe/London", "Europe/Berlin", "Asia/Dubai", "Asia/Singapore", "Asia/Tokyo", "Australia/Sydney"];
  return { parse, relative, formats, info, between, ZONES, weekNumber };
});
