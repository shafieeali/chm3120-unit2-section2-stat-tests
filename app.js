const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const SLIDE_COUNT = 41;
let currentSlide = 1;
let currentNote = 1;
let samplingRuns = [];
let lastOneSampleDecision = null;

const tCritical = {
  1: { 50: 1.000, 80: 3.078, 90: 6.314, 95: 12.710, 99: 63.660 },
  2: { 50: 0.816, 80: 1.886, 90: 2.920, 95: 4.303, 99: 9.925 },
  3: { 50: 0.765, 80: 1.638, 90: 2.353, 95: 3.182, 99: 5.841 },
  4: { 50: 0.741, 80: 1.533, 90: 2.132, 95: 2.776, 99: 4.604 },
  5: { 50: 0.727, 80: 1.476, 90: 2.015, 95: 2.571, 99: 4.032 },
  6: { 50: 0.718, 80: 1.440, 90: 1.943, 95: 2.447, 99: 3.707 },
  7: { 50: 0.711, 80: 1.415, 90: 1.895, 95: 2.365, 99: 3.499 },
  8: { 50: 0.706, 80: 1.397, 90: 1.860, 95: 2.306, 99: 3.355 },
  9: { 50: 0.703, 80: 1.383, 90: 1.833, 95: 2.262, 99: 3.250 },
  10: { 50: 0.700, 80: 1.372, 90: 1.812, 95: 2.228, 99: 3.169 },
  11: { 50: 0.697, 80: 1.363, 90: 1.796, 95: 2.201, 99: 3.106 },
  12: { 50: 0.695, 80: 1.356, 90: 1.782, 95: 2.179, 99: 3.055 },
  13: { 50: 0.694, 80: 1.350, 90: 1.771, 95: 2.160, 99: 3.012 },
  14: { 50: 0.692, 80: 1.345, 90: 1.761, 95: 2.145, 99: 2.977 },
  15: { 50: 0.691, 80: 1.341, 90: 1.753, 95: 2.131, 99: 2.947 },
  20: { 50: 0.687, 80: 1.325, 90: 1.725, 95: 2.086, 99: 2.845 },
  25: { 50: 0.684, 80: 1.316, 90: 1.708, 95: 2.060, 99: 2.787 },
  60: { 50: 0.679, 80: 1.296, 90: 1.671, 95: 2.000, 99: 2.660 },
  1000: { 50: 0.675, 80: 1.282, 90: 1.646, 95: 1.962, 99: 2.581 }
};

const qCritical95 = {
  3: 0.970, 4: 0.829, 5: 0.710, 6: 0.625, 7: 0.568, 8: 0.526, 9: 0.493, 10: 0.466
};

const grubbsCritical95 = {
  3: 1.153, 4: 1.463, 5: 1.672, 6: 1.822, 7: 1.938, 8: 2.032, 9: 2.110, 10: 2.176,
  11: 2.234, 12: 2.285, 15: 2.409, 20: 2.557, 30: 2.745, 50: 2.956
};

const lectureCards = [
  { range: "2-5", title: "Reliability and confidence intervals", detail: "Why a finite number of replicates requires statistical treatment, and how x-bar +/- ts/sqrt(N) is built." },
  { range: "7-9", title: "t critical and first practice", detail: "Use the t table, caffeine label claim, and carbohydrate confidence interval examples." },
  { range: "10-15", title: "Mean versus accepted value", detail: "Decide whether one experimental mean differs from a known value." },
  { range: "16-20", title: "Two experimental means", detail: "Compare two means after checking the assumptions behind pooled standard deviation." },
  { range: "21-25", title: "Paired measurements", detail: "Use differences within matched samples instead of treating the data as unrelated." },
  { range: "26-29", title: "F-test for precision", detail: "Compare variances before deciding whether two methods have comparable precision." },
  { range: "30-33", title: "Concept checks", detail: "Lecture clicker-style questions about paired tests and F-test choices." },
  { range: "34-36", title: "Rayleigh nitrogen story", detail: "A historical example of statistical difference leading to chemical discovery." },
  { range: "37-39", title: "Q and Grubbs outliers", detail: "Test suspicious data points before rejecting them." },
  { range: "40-41", title: "One-tail and two-tail tests", detail: "Match the statistical test to the scientific question." }
];

function fmt(value, digits = 3) {
  if (!Number.isFinite(value)) return "not available";
  if (Math.abs(value) >= 10000 || (Math.abs(value) < 0.001 && value !== 0)) return value.toExponential(2);
  return value.toFixed(digits).replace(/0+$/, "").replace(/\.$/, "");
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

function numbersFrom(text) {
  return text.split(/[\s,;]+/).map(value => Number(value)).filter(Number.isFinite);
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function sd(values) {
  if (values.length < 2) return NaN;
  const m = mean(values);
  const variance = values.reduce((sum, value) => sum + (value - m) ** 2, 0) / (values.length - 1);
  return Math.sqrt(variance);
}

function nearestKey(table, value) {
  const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
  return keys.reduce((best, key) => Math.abs(key - value) < Math.abs(best - value) ? key : best, keys[0]);
}

function tCrit(df, level) {
  const key = nearestKey(tCritical, df);
  return tCritical[key][level] || tCritical[key][95];
}

function qCrit(n) {
  return qCritical95[nearestKey(qCritical95, n)];
}

function grubbsCrit(n) {
  return grubbsCritical95[nearestKey(grubbsCritical95, n)];
}

function setDecision(text) {
  $("#decisionMeter").textContent = text;
  $("#srStatus").textContent = text;
}

function slideSrc(n) {
  return `assets/slides/slide-${String(n).padStart(2, "0")}.png`;
}

function noteSrc(n) {
  return `assets/classnotes/page-${String(n).padStart(2, "0")}.png`;
}

function transcript(n) {
  return (window.slideTranscripts || []).find(item => item.number === n) || {
    number: n,
    title: `Slide ${n}`,
    text: "Transcript unavailable."
  };
}

function parseSlideSpec(spec) {
  return String(spec).split(",").flatMap(part => {
    const trimmed = part.trim();
    if (!trimmed) return [];
    if (trimmed.includes("-")) {
      const [a, b] = trimmed.split("-").map(Number);
      return Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
    }
    return [Number(trimmed)];
  }).filter(n => Number.isInteger(n) && n >= 1 && n <= SLIDE_COUNT);
}

function setupTabs() {
  $$(".tab").forEach(tab => {
    tab.addEventListener("click", () => openTab(tab.dataset.tab));
    tab.addEventListener("keydown", event => {
      const tabs = $$(".tab");
      const index = tabs.indexOf(tab);
      let nextIndex = index;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex !== index) {
        event.preventDefault();
        tabs[nextIndex].focus();
        openTab(tabs[nextIndex].dataset.tab);
      }
    });
  });
  $("#toggleTextMode").addEventListener("click", () => {
    const on = document.body.classList.toggle("text-first");
    $("#toggleTextMode").setAttribute("aria-pressed", String(on));
  });
  $("#toggleTranscripts").addEventListener("click", () => {
    const on = document.body.classList.toggle("hide-transcripts");
    $("#toggleTranscripts").setAttribute("aria-pressed", String(!on));
    $("#toggleTranscripts").textContent = on ? "Show transcripts" : "Hide transcripts";
  });
  $("#openAccessibilityGuide").addEventListener("click", () => $("#accessibilityGuide").hidden = false);
  $("#closeAccessibilityGuide").addEventListener("click", () => $("#accessibilityGuide").hidden = true);
}

function openTab(tabId) {
  $$(".tab").forEach(item => {
    const active = item.dataset.tab === tabId;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
    item.tabIndex = active ? 0 : -1;
  });
  $$(".tab-panel").forEach(panel => {
    const active = panel.id === tabId;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
  setDecision(tabId);
}

function renderSlideStrips() {
  $$(".slide-strip").forEach(strip => {
    const slides = parseSlideSpec(strip.dataset.slides || "");
    strip.innerHTML = slides.map(n => {
      const info = transcript(n);
      return `
        <button class="slide-thumb" type="button" data-jump-slide="${n}">
          <img src="${slideSrc(n)}" alt="Thumbnail of lecture slide ${n}">
          <span>Slide ${n}: ${escapeHtml(info.title)}</span>
        </button>
      `;
    }).join("");
  });
  $$("[data-jump-slide]").forEach(button => {
    button.addEventListener("click", () => {
      updateSlide(Number(button.dataset.jumpSlide));
      openTab("slides");
    });
  });
  $$("[data-open-slides]").forEach(button => {
    button.addEventListener("click", () => {
      const [first] = parseSlideSpec(button.dataset.openSlides);
      updateSlide(first || 1);
      openTab("slides");
    });
  });
  $$("[data-open-notes]").forEach(button => {
    button.addEventListener("click", () => {
      const [first] = parseSlideSpec(button.dataset.openNotes);
      updateNote(first || 1);
      openTab("notes");
    });
  });
}

function updateSlide(n) {
  currentSlide = Math.min(SLIDE_COUNT, Math.max(1, Number(n) || 1));
  const info = transcript(currentSlide);
  $("#slideNumber").value = currentSlide;
  $("#mainSlideImage").src = slideSrc(currentSlide);
  $("#mainSlideImage").alt = `Lecture slide ${currentSlide}: ${info.title}`;
  $("#mainSlideTranscript").innerHTML = `<h3>Slide ${currentSlide}: ${escapeHtml(info.title)}</h3><p>${escapeHtml(info.text)}</p>`;
  setDecision(`slide ${currentSlide}`);
}

function updateNote(n) {
  currentNote = Math.min(SLIDE_COUNT, Math.max(1, Number(n) || 1));
  const info = transcript(currentNote);
  $("#noteNumber").value = currentNote;
  $("#mainNoteImage").src = noteSrc(currentNote);
  $("#mainNoteImage").alt = `Class note page ${currentNote}: ${info.title}`;
  $("#mainNoteTranscript").innerHTML = `<h3>Note page ${currentNote}: ${escapeHtml(info.title)}</h3><p>${escapeHtml(info.text)}</p>`;
  setDecision(`note ${currentNote}`);
}

function setupBrowsers() {
  $("#prevSlide").addEventListener("click", () => updateSlide(currentSlide - 1));
  $("#nextSlide").addEventListener("click", () => updateSlide(currentSlide + 1));
  $("#slideNumber").addEventListener("change", event => updateSlide(event.target.value));
  $("#slideNumber").addEventListener("input", event => updateSlide(event.target.value));
  $("#prevNote").addEventListener("click", () => updateNote(currentNote - 1));
  $("#nextNote").addEventListener("click", () => updateNote(currentNote + 1));
  $("#noteNumber").addEventListener("change", event => updateNote(event.target.value));
  $("#noteNumber").addEventListener("input", event => updateNote(event.target.value));
  $("#printSlide").addEventListener("click", () => printMode("print-slide"));
  $("#printNote").addEventListener("click", () => printMode("print-note"));
  $("#printPractice").addEventListener("click", () => printMode("print-practice"));
  updateSlide(1);
  updateNote(1);
}

function printMode(className) {
  document.body.classList.add(className);
  window.print();
  window.setTimeout(() => document.body.classList.remove(className), 500);
}

function renderLectureMap() {
  $("#lectureMap").innerHTML = lectureCards.map(card => `
    <button class="lecture-card" type="button" data-open-slides="${card.range}">
      <strong>Slides ${escapeHtml(card.range)}: ${escapeHtml(card.title)}</strong>
      <p>${escapeHtml(card.detail)}</p>
    </button>
  `).join("");
  $$("#lectureMap [data-open-slides]").forEach(button => {
    button.addEventListener("click", () => {
      const [first] = parseSlideSpec(button.dataset.openSlides);
      updateSlide(first || 1);
    });
  });
}

function gaussian(meanValue, sdValue) {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return meanValue + sdValue * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function runSampling() {
  const trueMean = Number($("#trueMean").value);
  const trueSd = Math.max(0.0001, Number($("#trueSd").value));
  const n = Math.max(2, Number($("#sampleSize").value));
  const count = Number($("#experimentCount").value);
  const start = samplingRuns.length;
  for (let i = 0; i < count; i += 1) {
    const values = Array.from({ length: n }, () => gaussian(trueMean, trueSd));
    const m = mean(values);
    const s = sd(values);
    const half = tCrit(n - 1, 95) * s / Math.sqrt(n);
    samplingRuns.push({ run: start + i + 1, m, s, half });
  }
  samplingRuns = samplingRuns.slice(-1000);
  const recent = samplingRuns[samplingRuns.length - 1];
  $("#sampleStats").className = "result-box success";
  $("#sampleStats").innerHTML = `<p>Latest experiment: mean = <strong>${fmt(recent.m, 3)}</strong>, s = ${fmt(recent.s, 3)}, 95% CL = +/- ${fmt(recent.half, 3)}.</p><p>Notice how each small experiment gives a different estimate of the true mean and SD.</p>`;
  drawSampling();
  renderSamplingTable();
  setDecision("simulation run");
}

function clearSampling() {
  samplingRuns = [];
  $("#sampleStats").className = "result-box";
  $("#sampleStats").textContent = "Simulation cleared.";
  $("#samplingTable tbody").innerHTML = "";
  drawSampling();
  setDecision("cleared");
}

function renderSamplingTable() {
  $("#samplingTable tbody").innerHTML = samplingRuns.slice(-8).map(run => `
    <tr><td>${run.run}</td><td>${fmt(run.m, 3)}</td><td>${fmt(run.s, 3)}</td><td>+/- ${fmt(run.half, 3)}</td></tr>
  `).join("");
}

function drawSampling() {
  const canvas = $("#samplingCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#d8e0e4";
  ctx.strokeRect(50, 24, w - 75, h - 70);
  if (!samplingRuns.length) {
    $("#samplingSummary").textContent = "Run the simulation to see how finite replicate sets scatter around the population mean.";
    return;
  }
  const values = samplingRuns.map(run => run.m);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const bins = Array.from({ length: 18 }, () => 0);
  values.forEach(value => {
    const idx = Math.min(bins.length - 1, Math.floor(((value - min) / Math.max(1e-9, max - min)) * bins.length));
    bins[idx] += 1;
  });
  const maxBin = Math.max(...bins);
  bins.forEach((count, i) => {
    const barW = (w - 95) / bins.length;
    const barH = (count / maxBin) * (h - 105);
    ctx.fillStyle = "#087f8c";
    ctx.fillRect(56 + i * barW, h - 48 - barH, Math.max(2, barW - 4), barH);
  });
  const avg = mean(values);
  const spread = sd(values);
  $("#samplingSummary").textContent = `${values.length} experiment means plotted. Average of means = ${fmt(avg, 3)}; SD of means = ${fmt(spread, 3)}.`;
}

function calcCi() {
  const values = numbersFrom($("#ciData").value);
  if (values.length < 2) {
    $("#ciOutput").className = "result-box warning";
    $("#ciOutput").textContent = "Enter at least two measurements.";
    return;
  }
  const level = Number($("#ciLevel").value);
  const n = values.length;
  const m = mean(values);
  const s = sd(values);
  const t = tCrit(n - 1, level);
  const half = t * s / Math.sqrt(n);
  $("#ciOutput").className = "result-box success";
  $("#ciOutput").innerHTML = `<p>Mean = <strong>${fmt(m, 5)}</strong>; s = ${fmt(s, 5)}; N = ${n}; df = ${n - 1}; t = ${fmt(t, 3)}.</p><p>${level}% confidence interval: <strong>${fmt(m - half, 5)} to ${fmt(m + half, 5)}</strong>.</p>`;
  drawCi(m, half);
  setDecision("CI built");
}

function drawCi(m, half) {
  const canvas = $("#ciCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  const left = 80;
  const right = w - 80;
  const y = h / 2;
  ctx.strokeStyle = "#172026";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(right, y);
  ctx.stroke();
  ctx.strokeStyle = "#c98d17";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(left + 110, y);
  ctx.lineTo(right - 110, y);
  ctx.stroke();
  ctx.fillStyle = "#b74352";
  ctx.beginPath();
  ctx.arc((left + right) / 2, y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#172026";
  ctx.font = "18px sans-serif";
  ctx.fillText(`mean ${fmt(m, 4)}`, (left + right) / 2 - 50, y - 24);
  $("#ciSummary").textContent = `The interval is centered on ${fmt(m, 5)} and extends +/- ${fmt(half, 5)}.`;
}

function calcOneT() {
  const values = numbersFrom($("#oneData").value);
  const known = Number($("#knownValue").value);
  const level = Number($("#oneLevel").value);
  if (values.length < 2 || !Number.isFinite(known)) {
    $("#oneOutput").className = "result-box warning";
    $("#oneOutput").textContent = "Enter at least two data values and a known value.";
    return;
  }
  const n = values.length;
  const m = mean(values);
  const s = sd(values);
  const t = Math.abs(m - known) * Math.sqrt(n) / s;
  const crit = tCrit(n - 1, level);
  const different = t > crit;
  lastOneSampleDecision = different ? "different" : "consistent";
  $("#oneOutput").className = `result-box ${different ? "danger" : "success"}`;
  $("#oneOutput").innerHTML = `<p>t calc = <strong>${fmt(t, 3)}</strong>; t critical = ${fmt(crit, 3)} at ${level}% with df = ${n - 1}.</p><p>${different ? "The difference is statistically significant." : "The data are statistically consistent with the claimed value."}</p>`;
  $("#oneSteps").innerHTML = [
    `Mean = ${fmt(m, 4)} and s = ${fmt(s, 4)}.`,
    "Use t = |mean - known value| sqrt(N) / s.",
    `${fmt(t, 3)} ${different ? ">" : "<="} ${fmt(crit, 3)}, so the claim is ${different ? "not supported" : "supported"} at this confidence level.`
  ].map(step => `<p>${escapeHtml(step)}</p>`).join("");
  setDecision(different ? "different" : "consistent");
}

function calcTwoT() {
  const m1 = Number($("#mean1").value);
  const s1 = Number($("#s1").value);
  const n1 = Number($("#n1").value);
  const m2 = Number($("#mean2").value);
  const s2 = Number($("#s2").value);
  const n2 = Number($("#n2").value);
  const level = Number($("#twoLevel").value);
  const large = Math.max(s1, s2);
  const small = Math.min(s1, s2);
  const f = large ** 2 / small ** 2;
  const sp = Math.sqrt(((n1 - 1) * s1 ** 2 + (n2 - 1) * s2 ** 2) / (n1 + n2 - 2));
  const t = Math.abs(m1 - m2) / (sp * Math.sqrt(1 / n1 + 1 / n2));
  const df = n1 + n2 - 2;
  const crit = tCrit(df, level);
  const different = t > crit;
  $("#twoOutput").className = `result-box ${different ? "danger" : "success"}`;
  $("#twoOutput").innerHTML = `<p>F = ${fmt(f, 3)}. Use the F-test first to decide whether pooling is reasonable.</p><p>Pooled SD = ${fmt(sp, 4)}; t calc = <strong>${fmt(t, 3)}</strong>; t critical = ${fmt(crit, 3)} with df = ${df}.</p><p>${different ? "The two means are significantly different." : "The two means are not significantly different at this confidence level."}</p>`;
  $("#twoTable").innerHTML = `<table class="mini-table"><caption>Accessible data table for the two-mean comparison</caption><thead><tr><th>Group</th><th>Mean</th><th>Standard deviation</th><th>n</th></tr></thead><tbody><tr><td>1</td><td>${fmt(m1, 4)}</td><td>${fmt(s1, 4)}</td><td>${n1}</td></tr><tr><td>2</td><td>${fmt(m2, 4)}</td><td>${fmt(s2, 4)}</td><td>${n2}</td></tr></tbody></table>`;
  drawTwoMeans(m1, s1, m2, s2);
  setDecision(different ? "means differ" : "means similar");
}

function drawTwoMeans(m1, s1, m2, s2) {
  const canvas = $("#twoCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  const min = Math.min(m1 - 3 * s1, m2 - 3 * s2);
  const max = Math.max(m1 + 3 * s1, m2 + 3 * s2);
  const x = value => 60 + ((value - min) / (max - min)) * (w - 120);
  function curve(m, s, color, yBase) {
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let px = 60; px <= w - 60; px += 4) {
      const value = min + ((px - 60) / (w - 120)) * (max - min);
      const density = Math.exp(-0.5 * ((value - m) / s) ** 2);
      const py = yBase - density * 95;
      if (px === 60) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.fillRect(x(m) - 2, yBase - 110, 4, 116);
  }
  curve(m1, s1, "#087f8c", h - 48);
  curve(m2, s2, "#b74352", h - 48);
  $("#twoSummary").textContent = `Distribution 1 is centered at ${fmt(m1, 3)}; distribution 2 is centered at ${fmt(m2, 3)}. The wider curve has the larger standard deviation.`;
}

function calcPaired() {
  const a = numbersFrom($("#pairedA").value);
  const b = numbersFrom($("#pairedB").value);
  const level = Number($("#pairedLevel").value);
  const n = Math.min(a.length, b.length);
  if (n < 2) {
    $("#pairedOutput").className = "result-box warning";
    $("#pairedOutput").textContent = "Enter at least two matched pairs.";
    return;
  }
  const differences = Array.from({ length: n }, (_, i) => b[i] - a[i]);
  const md = mean(differences);
  const sdD = sd(differences);
  const t = Math.abs(md) * Math.sqrt(n) / sdD;
  const crit = tCrit(n - 1, level);
  const different = t > crit;
  $("#pairedOutput").className = `result-box ${different ? "danger" : "success"}`;
  $("#pairedOutput").innerHTML = `<p>Mean difference = <strong>${fmt(md, 4)}</strong>; s(d) = ${fmt(sdD, 4)}; t calc = ${fmt(t, 3)}; t critical = ${fmt(crit, 3)}.</p><p>${different ? "The paired measurements show a significant systematic difference." : "The paired measurements do not show a significant systematic difference."}</p>`;
  $("#pairedTable").innerHTML = `<table class="mini-table"><thead><tr><th>Pair</th><th>A</th><th>B</th><th>B - A</th></tr></thead><tbody>${differences.map((d, i) => `<tr><td>${i + 1}</td><td>${fmt(a[i], 3)}</td><td>${fmt(b[i], 3)}</td><td>${fmt(d, 3)}</td></tr>`).join("")}</tbody></table>`;
  setDecision(different ? "paired difference" : "paired similar");
}

function calcF() {
  const sda = Number($("#fSda").value);
  const sdb = Number($("#fSdb").value);
  const na = Number($("#fNa").value);
  const nb = Number($("#fNb").value);
  const larger = Math.max(sda, sdb);
  const smaller = Math.min(sda, sdb);
  const f = larger ** 2 / smaller ** 2;
  const df1 = sda >= sdb ? na - 1 : nb - 1;
  const df2 = sda >= sdb ? nb - 1 : na - 1;
  $("#fOutput").className = "result-box success";
  $("#fOutput").innerHTML = `<p>F = larger variance / smaller variance = <strong>${fmt(f, 3)}</strong>.</p><p>Degrees of freedom: numerator ${df1}, denominator ${df2}. Use the F table for the final critical comparison; if F is larger than F critical, the precisions are significantly different.</p>`;
  setDecision("F-test done");
}

function calcOutlier() {
  const values = numbersFrom($("#outlierData").value).sort((a, b) => a - b);
  const side = $("#outlierSide").value;
  if (values.length < 3) {
    $("#outlierOutput").className = "result-box warning";
    $("#outlierOutput").textContent = "Enter at least three values.";
    return;
  }
  const n = values.length;
  const suspect = side === "low" ? values[0] : values[n - 1];
  const nearest = side === "low" ? values[1] : values[n - 2];
  const range = values[n - 1] - values[0];
  const q = Math.abs(nearest - suspect) / range;
  const m = mean(values);
  const s = sd(values);
  const g = Math.abs(suspect - m) / s;
  const qReject = q > qCrit(n);
  const gReject = g > grubbsCrit(n);
  $("#outlierOutput").className = `result-box ${qReject || gReject ? "danger" : "success"}`;
  $("#outlierOutput").innerHTML = `<p>Suspected value: <strong>${fmt(suspect, 5)}</strong>.</p><p>Q calc = ${fmt(q, 3)}; Q critical = ${fmt(qCrit(n), 3)}. ${qReject ? "Q-test supports rejection." : "Q-test does not support rejection."}</p><p>Grubbs G = ${fmt(g, 3)}; G critical = ${fmt(grubbsCrit(n), 3)}. ${gReject ? "Grubbs test supports rejection." : "Grubbs test does not support rejection."}</p>`;
  setDecision(qReject || gReject ? "outlier flagged" : "keep data");
}

function calcTail() {
  const question = $("#tailQuestion").value;
  const t = Math.abs(Number($("#tailT").value));
  const df = Number($("#tailDf").value);
  const twoCrit = tCrit(df, 95);
  const oneCrit = tCrit(df, 90);
  const oneTail = question !== "different";
  const crit = oneTail ? oneCrit : twoCrit;
  const significant = t > crit;
  drawTail(oneTail, t, crit);
  $("#tailOutput").className = `result-box ${significant ? "danger" : "success"}`;
  $("#tailOutput").innerHTML = `<p>${oneTail ? "Use a one-tailed test because the question is directional." : "Use a two-tailed test because the question asks whether the result is different in either direction."}</p><p>t calc = ${fmt(t, 3)}; approximate critical value = ${fmt(crit, 3)}. ${significant ? "Reject the null hypothesis." : "Do not reject the null hypothesis."}</p>`;
  $("#tailTable").innerHTML = `<table class="mini-table"><caption>Accessible decision table for the tail selector</caption><thead><tr><th>Question type</th><th>Tail choice</th><th>t calculated</th><th>Critical value</th><th>Decision</th></tr></thead><tbody><tr><td>${escapeHtml($("#tailQuestion option:checked").textContent)}</td><td>${oneTail ? "One-tailed" : "Two-tailed"}</td><td>${fmt(t, 3)}</td><td>${fmt(crit, 3)}</td><td>${significant ? "Reject null hypothesis" : "Do not reject null hypothesis"}</td></tr></tbody></table>`;
  setDecision(oneTail ? "one-tailed" : "two-tailed");
}

function drawTail(oneTail, t, crit) {
  const canvas = $("#tailCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  const yBase = h - 55;
  const center = w / 2;
  const scale = 85;
  ctx.strokeStyle = "#172026";
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let px = 80; px <= w - 80; px += 3) {
    const xVal = (px - center) / scale;
    const y = yBase - Math.exp(-0.5 * xVal * xVal) * 160;
    if (px === 80) ctx.moveTo(px, y);
    else ctx.lineTo(px, y);
  }
  ctx.stroke();
  ctx.fillStyle = "rgba(183,67,82,0.28)";
  if (oneTail) {
    ctx.fillRect(center + crit * scale, 50, w - (center + crit * scale) - 80, yBase - 50);
  } else {
    ctx.fillRect(80, 50, center - crit * scale - 80, yBase - 50);
    ctx.fillRect(center + crit * scale, 50, w - (center + crit * scale) - 80, yBase - 50);
  }
  ctx.fillStyle = "#087f8c";
  ctx.fillRect(center + t * scale - 2, 45, 4, yBase);
}

function setupChecks() {
  $$(".check-btn").forEach(button => {
    button.addEventListener("click", () => {
      if (button.dataset.check === "oneSample") {
        const feedback = $("#oneCheckFeedback");
        if (!lastOneSampleDecision) {
          feedback.className = "result-box warning";
          feedback.textContent = "Run the one-sample t test first, then make the interpretation choice.";
          return;
        }
        const correct = button.dataset.answer === lastOneSampleDecision;
        feedback.className = `result-box ${correct ? "success" : "warning"}`;
        feedback.textContent = correct ? "Correct. Your interpretation matches the t comparison." : "Try again. Compare t calculated with t critical and remember that smaller t means the difference can be explained by random variation.";
      }
    });
  });
}

function renderPracticeFilters() {
  const cards = window.practiceSetOne || [];
  const topics = ["Statistics focus", "All topics", ...new Set(cards.map(card => card.topic))];
  $("#practiceTopic").innerHTML = topics.map(topic => `<option value="${escapeHtml(topic)}">${escapeHtml(topic)}</option>`).join("");
  $("#practiceTopic").value = "Statistics focus";
  $("#practiceTopic").addEventListener("change", renderPracticeCards);
  $("#practiceSearch").addEventListener("input", renderPracticeCards);
  $("#collapseKeys").addEventListener("click", () => {
    $$(".key-text").forEach(key => key.hidden = true);
    $$(".hint-text").forEach(hint => hint.hidden = true);
    $$(".hint-key").forEach(button => button.textContent = "Hint");
    $$(".reveal-key").forEach(button => {
      button.textContent = "Reveal key";
      button.setAttribute("aria-expanded", "false");
    });
  });
  renderPracticeCards();
}

function renderPracticeCards() {
  const cards = window.practiceSetOne || [];
  const topic = $("#practiceTopic").value;
  const term = $("#practiceSearch").value.trim().toLowerCase();
  const filtered = cards.filter(card => {
    const topicOk = topic === "All topics" || (topic === "Statistics focus" ? card.number >= 33 && card.number <= 49 : card.topic === topic);
    const text = `${card.number} ${card.topic} ${card.prompt} ${card.key}`.toLowerCase();
    return topicOk && (!term || text.includes(term));
  });
  $("#practiceCards").innerHTML = filtered.map(card => `
    <article class="practice-card">
      <header>
        <div>
          <h3>Question ${card.number}</h3>
          <span class="badge">${escapeHtml(card.topic)}</span>
        </div>
        <button class="ghost hint-key" type="button" data-key="${card.number}">Hint</button>
        <button class="ghost reveal-key" type="button" data-key="${card.number}" aria-controls="key-${card.number}" aria-expanded="false">Reveal key</button>
      </header>
      <p class="question-text">${escapeHtml(card.prompt)}</p>
      <div class="hint-text" id="hint-${card.number}" hidden>${escapeHtml(makeHint(card))}</div>
      <div class="key-text" id="key-${card.number}" hidden>${escapeHtml(card.key)}</div>
    </article>
  `).join("");
  $$(".hint-key").forEach(button => {
    button.addEventListener("click", () => {
      const hint = $(`#hint-${button.dataset.key}`);
      hint.hidden = !hint.hidden;
      button.textContent = hint.hidden ? "Hint" : "Hide hint";
    });
  });
  $$(".reveal-key").forEach(button => {
    button.addEventListener("click", () => {
      const key = $(`#key-${button.dataset.key}`);
      key.hidden = !key.hidden;
      button.setAttribute("aria-expanded", String(!key.hidden));
      button.textContent = key.hidden ? "Reveal key" : "Hide key";
    });
  });
  setDecision(`${filtered.length} cards`);
}

function makeHint(card) {
  const text = `${card.prompt} ${card.topic}`.toLowerCase();
  if (text.includes("confidence") || text.includes("interval")) return "Start with the mean and sample standard deviation, choose the t value from df = N - 1, then calculate t*s/sqrt(N).";
  if (text.includes("grubbs")) return "Calculate the mean and sample standard deviation using the full data set first, including the suspected value.";
  if (text.includes("q-test") || text.includes("q test")) return "Sort the values, find the gap between the suspected value and its nearest neighbor, then divide by the full range.";
  if (text.includes("paired")) return "Pair each sample first, calculate each difference, then run the t-test on the differences.";
  if (text.includes("f-test") || text.includes("variance")) return "Put the larger variance in the numerator so F is at least 1, then compare against the F table using both degrees of freedom.";
  if (text.includes("calibration") || text.includes("lod") || text.includes("loq")) return "Identify the slope, intercept, blank mean, and blank standard deviation before converting signal limits to concentration.";
  return "Identify the lecture topic first, write the known quantities with units, and choose the equation before doing arithmetic.";
}

function setupExamples() {
  $$("[data-load-example]").forEach(button => {
    button.addEventListener("click", () => {
      const example = button.dataset.loadExample;
      if (example === "caffeine") {
        $("#oneData").value = "98.5, 100.1, 99.7, 101.0, 99.9";
        $("#knownValue").value = "100.0";
        calcOneT();
      }
      if (example === "twoMeans") {
        $("#mean1").value = "36.14";
        $("#s1").value = "0.28";
        $("#n1").value = "10";
        $("#mean2").value = "36.20";
        $("#s2").value = "0.47";
        $("#n2").value = "4";
        calcTwoT();
      }
      if (example === "paired") {
        $("#pairedA").value = "95.2, 108.5, 122.3, 87.6, 134.2, 101.7, 115.8";
        $("#pairedB").value = "96.1, 109.8, 123.1, 88.9, 135.5, 102.3, 116.4";
        calcPaired();
      }
      if (example === "outlier") {
        $("#outlierData").value = "2.31017, 2.30986, 2.31010, 2.31001, 2.31024, 2.31010, 2.31028, 2.29889";
        $("#outlierSide").value = "low";
        calcOutlier();
      }
    });
  });
}

function setupCalculators() {
  $("#runSampling").addEventListener("click", runSampling);
  $("#clearSampling").addEventListener("click", clearSampling);
  $("#calcCi").addEventListener("click", calcCi);
  $("#calcOneT").addEventListener("click", calcOneT);
  $("#calcTwoT").addEventListener("click", calcTwoT);
  $("#calcPaired").addEventListener("click", calcPaired);
  $("#calcF").addEventListener("click", calcF);
  $("#calcOutlier").addEventListener("click", calcOutlier);
  $("#calcTail").addEventListener("click", calcTail);
}

function init() {
  setupTabs();
  openTab("reliability");
  renderSlideStrips();
  renderLectureMap();
  setupBrowsers();
  setupCalculators();
  setupExamples();
  setupChecks();
  renderPracticeFilters();
  drawSampling();
  calcCi();
  calcOneT();
  calcTwoT();
  calcPaired();
  calcTail();
}

document.addEventListener("DOMContentLoaded", init);
