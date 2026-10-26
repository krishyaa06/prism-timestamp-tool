(() => {
  const { $, copy, store, esc, debounce } = Prism;
  let paused = false, cur = null;
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  $("#chips").innerHTML = ["now", "-1h", "+1d", "-7d", "1700000000", "2027-01-01T00:00:00Z"].map((c) => `<button class="pill acc" data-c="${c}">${c}</button>`).join("");
  function tick() {
    if (!paused) { const n = Date.now(); $("#nowS").textContent = Math.floor(n / 1000); $("#nowMs").textContent = n + " ms"; }
    if (cur) $("#rel").textContent = Core.relative(cur);
    zones(); diff();
  }
  function convert() {
    const v = $("#in").value; store.set("ts:in", v);
    const r = Core.parse(v);
    if (!r) { cur = null; $("#kind").textContent = v.trim() ? "Unrecognised" : ""; $("#kind").className = "pill bad"; $("#fm").innerHTML = ""; $("#rel").textContent = ""; $("#info").innerHTML = ""; return; }
    cur = r.date; $("#kind").className = "pill acc"; $("#kind").textContent = r.kind;
    $("#rel").textContent = Core.relative(cur);
    $("#fm").innerHTML = Object.entries(Core.formats(cur, tz)).map(([k, v]) => `<tr><td>${k}</td><td data-v="${esc(v)}" title="Click to copy">${esc(v)}</td></tr>`).join("");
    const i = Core.info(cur);
    $("#info").innerHTML = `<span class="pill">Day ${i.dayOfYear}</span><span class="pill">Week ${i.week}</span><span class="pill">Q${i.quarter}</span><span class="pill ${i.leap ? "ok" : ""}">${i.leap ? "Leap year" : "Not a leap year"}</span><span class="pill">${esc(tz)}</span>`;
  }
  function zones() {
    const d = cur || new Date();
    $("#zones").innerHTML = [...new Set([tz, ...Core.ZONES])].map((z) => `<div class="z"><span>${z.replace(/_/g, " ")}</span><b>${new Intl.DateTimeFormat("en-GB", { timeZone: z, weekday: "short", hour: "2-digit", minute: "2-digit", second: "2-digit", day: "2-digit", month: "short" }).format(d)}</b></div>`).join("");
  }
  function diff() {
    const a = Core.parse($("#d1").value), b = Core.parse($("#d2").value);
    $("#diff").innerHTML = a && b ? (() => { const x = Core.between(a.date, b.date); return `<b>${x.text}</b><span class="muted small">${x.days} days · ${x.hours} hours · ${x.ms.toLocaleString()} ms</span>`; })() : '<span class="muted small">Enter two dates or timestamps</span>';
  }
  $("#in").addEventListener("input", debounce(convert, 120));
  $("#chips").onclick = (e) => { const b = e.target.closest("button"); if (b) { $("#in").value = b.dataset.c; convert(); } };
  $("#fm").onclick = (e) => { const td = e.target.closest("td[data-v]"); if (td) copy(td.dataset.v); };
  $("#useNow").onclick = () => { $("#in").value = String(Math.floor(Date.now() / 1000)); convert(); };
  $("#copyNow").onclick = () => copy($("#nowS").textContent);
  $("#pause").onclick = (e) => { paused = !paused; e.target.textContent = paused ? "Resume" : "Pause"; };
  ["#d1", "#d2"].forEach((id) => $(id).addEventListener("input", debounce(diff, 120)));
  $("#in").value = store.get("ts:in", String(Math.floor(Date.now() / 1000)));
  convert(); tick(); setInterval(tick, 1000);
})();
