const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const tCritical = {
  1: { 50: 1.000, 90: 6.314, 95: 12.710, 99: 63.660 },
  2: { 50: 0.816, 90: 2.920, 95: 4.303, 99: 9.925 },
  3: { 50: 0.765, 90: 2.353, 95: 3.182, 99: 5.841 },
  4: { 50: 0.741, 90: 2.132, 95: 2.776, 99: 4.604 },
  5: { 50: 0.727, 90: 2.015, 95: 2.571, 99: 4.032 },
  6: { 50: 0.718, 90: 1.943, 95: 2.447, 99: 3.707 },
  7: { 50: 0.711, 90: 1.895, 95: 2.365, 99: 3.499 },
  8: { 50: 0.706, 90: 1.860, 95: 2.306, 99: 3.355 },
  9: { 50: 0.703, 90: 1.833, 95: 2.262, 99: 3.250 },
  10: { 50: 0.700, 90: 1.812, 95: 2.228, 99: 3.169 },
  11: { 50: 0.697, 90: 1.796, 95: 2.201, 99: 3.106 },
  12: { 50: 0.695, 90: 1.782, 95: 2.179, 99: 3.055 },
  15: { 50: 0.691, 90: 1.753, 95: 2.131, 99: 2.947 },
  20: { 50: 0.687, 90: 1.725, 95: 2.086, 99: 2.845 },
  25: { 50: 0.684, 90: 1.708, 95: 2.060, 99: 2.787 },
  60: { 50: 0.679, 90: 1.671, 95: 2.000, 99: 2.660 }
};

const fCritical95 = {
  "9,3": 8.85,
  "3,9": 3.86,
  "12,999": 1.75,
  "999,12": 2.30,
  "4,4": 6.39,
  "5,5": 5.05,
  "10,10": 2.98
};

const qCritical95 = { 3: 0.970, 4: 0.829, 5: 0.710, 6: 0.625, 7: 0.568, 8: 0.526, 9: 0.493, 10: 0.466 };
const grubbsCritical95 = { 3: 1.153, 4: 1.463, 5: 1.672, 6: 1.822, 7: 1.938, 8: 2.032, 9: 2.110, 10: 2.176, 11: 2.234, 12: 2.285, 15: 2.409, 20: 2.557, 30: 2.745, 50: 2.956 };

const lectureCards = [
  ["Slides 2-5", "Reliability of standard deviation, confidence intervals, and why finite replicate sets need statistical tests."],
  ["Slides 7-9", "t critical vs t calculated, caffeine label claim, and confidence interval practice."],
  ["Slides 10-15", "Comparison of a measured mean with a known accepted value."],
  ["Slides 16-20", "Comparison of two experimental means using pooled standard deviation."],
  ["Slides 21-25", "Paired measurements and individual differences."],
  ["Slides 26-29", "F-test for comparing precision and variance."],
  ["Slides 30-33", "iClicker conceptual checks on paired tests and F-test assumptions."],
  ["Slides 34-36", "Rayleigh nitrogen measurements and the statistics behind argon discovery."],
  ["Slides 37-39", "Q-test and Grubbs test for suspected outliers."],
  ["Slides 40-41", "One-tailed vs two-tailed significance tests."]
];

const practiceCards = [
  {
    section: "Confidence interval",
    prompt: "Five caffeine measurements are 98.5, 100.1, 99.7, 101.0, and 99.9 mg. Does the 95% confidence interval support a 100.0 mg label claim?",
    key: "Mean = 99.84 mg and s = 0.90 mg. With df = 4, t95 = 2.776. The interval contains 100.0 mg, so the claim is statistically supported at 95%."
  },
  {
    section: "One-sample t",
    prompt: "A NIST coal standard is 3.19 wt% sulfur. A new method gives 3.29, 3.22, 3.30, and 3.23 wt%. Which test pathway fits?",
    key: "Case 1: experimental mean vs known value. Compare the mean and 95% confidence interval, or calculate t = |xbar - mu| sqrt(n) / s."
  },
  {
    section: "Two means",
    prompt: "Original instrument: mean 36.14, s = 0.28, n = 10. New instrument: mean 36.20, s = 0.47, n = 4. What should be checked before pooling?",
    key: "Use an F-test first because pooling assumes similar variances. F = 0.47^2 / 0.28^2 = 2.82."
  },
  {
    section: "Paired t",
    prompt: "A biosensor reads +5 mg/dL higher than a reference method for every patient. Why is a paired t-test more sensitive than an unpaired t-test?",
    key: "The paired test analyzes within-patient differences. Patient-to-patient variability cancels, so the systematic +5 bias becomes visible."
  },
  {
    section: "Outlier",
    prompt: "A data set contains one value far from the rest. Why must s be calculated before removing the suspected value in Grubbs test?",
    key: "Grubbs uses the full data set, including the suspected value, to calculate mean and standard deviation. Remove a point only after the test justifies it."
  }
];

let samplingRuns = [];

function fmt(value, digits = 3) {
  if (!Number.isFinite(value)) return "not available";
  if (Math.abs(value) >= 1000 || Math.abs(value) < 0.01 && value !== 0) return value.toExponential(2);
  return value.toFixed(digits);
}

function numbersFrom(text) {
  return text.split(/[\s,;]+/).map(Number).filter(Number.isFinite);
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

function nearestDf(df) {
  const keys = Object.keys(tCritical).map(Number).sort((a, b) => a - b);
  return keys.reduce((best, key) => Math.abs(key - df) < Math.abs(best - df) ? key : best, keys[0]);
}

function tCrit(df, level) {
  const key = nearestDf(df);
  return tCritical[key][level] || tCritical[key][95];
}

function setDecision(text) {
  $("#decisionMeter").textContent = text;
  $("#srStatus").textContent = text;
}

function setupTabs() {
  $$(".tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach(item => item.classList.remove("active"));
      $$(".tab-panel").forEach(panel => panel.classList.remove("active"));
      tab.classList.add("active");
      $("#" + tab.dataset.tab).classList.add("active");
    });
  });
  $("#toggleTextMode").addEventListener("click", () => {
    const on = document.body.classList.toggle("text-first");
    $("#toggleTextMode").setAttribute("aria-pressed", String(on));
  });
}

function rollSample() {
  const max = Number($("#populationSize").value);
  const n = Math.max(3, Number($("#sampleSize").value));
  const noise = Number($("#noisePercent").value) / 100;
  const values = Array.from({ length: n }, () => {
    const base = 1 + Math.random() * (max - 1);
    const err = (Math.random() - 0.5) * max * noise;
    return Math.max(1, Math.min(max, base + err));
  });
  const m = mean(values);
  const s = sd(values);
  samplingRuns.push({ m, s, n, values });
  samplingRuns = samplingRuns.slice(-100);
  $("#sampleStats").innerHTML = `<p><strong>n = ${n}</strong></p><p>Mean = ${fmt(m, 2)}, SD = ${fmt(s, 2)}, RSD = ${fmt(100 * s / m, 2)}%.</p><p>As n increases, the mean stabilizes and SD becomes a more reliable estimate of spread.</p>`;
  updateSamplingTable();
  drawSampling();
  setDecision("sample rolled");
}

function updateSamplingTable() {
  const rows = samplingRuns.slice(-8).map((run, i) => `<tr><td>${samplingRuns.length - Math.min(7, samplingRuns.length - 1) + i}</td><td>${fmt(run.m, 2)}</td><td>${fmt(run.s, 2)}</td><td>${fmt(100 * run.s / run.m, 2)}</td></tr>`).join("");
  $("#samplingTable tbody").innerHTML = rows;
}

function drawSampling() {
  const canvas = $("#samplingCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#d9e1e8";
  ctx.strokeRect(50, 20, w - 70, h - 60);
  const values = samplingRuns.map(run => run.m);
  if (!values.length) return;
  const min = Math.min(...values), max = Math.max(...values);
  const bins = Array.from({ length: 12 }, () => 0);
  values.forEach(value => {
    const idx = Math.min(11, Math.floor(((value - min) / Math.max(1e-9, max - min)) * 12));
    bins[idx] += 1;
  });
  const maxBin = Math.max(...bins);
  bins.forEach((count, i) => {
    const barW = (w - 90) / bins.length;
    const barH = (count / maxBin) * (h - 90);
    ctx.fillStyle = "#087f8c";
    ctx.fillRect(55 + i * barW, h - 42 - barH, barW - 4, barH);
  });
  const m = mean(values);
  const s = sd(values);
  $("#samplingSummary").textContent = `${values.length} sample means plotted. Mean of sample means is ${fmt(m, 2)} with SD ${fmt(s, 2)}.`;
}

function calcCi() {
  const values = numbersFrom($("#ciData").value);
  if (values.length < 2) {
    $("#ciOutput").innerHTML = "<p>Enter at least two measurements.</p>";
    return;
  }
  const level = Number($("#ciLevel").value);
  const n = values.length;
  const m = mean(values);
  const s = sd(values);
  const t = tCrit(n - 1, level);
  const half = t * s / Math.sqrt(n);
  $("#ciOutput").className = "result-box success";
  $("#ciOutput").innerHTML = `<p>Mean = <strong>${fmt(m, 4)}</strong>; s = ${fmt(s, 4)}; df = ${n - 1}; t = ${t}.</p><p>${level}% confidence interval: <strong>${fmt(m - half, 4)} to ${fmt(m + half, 4)}</strong>.</p>`;
  drawCi(m, half);
  setDecision("CI built");
}

function drawCi(m, half) {
  const canvas = $("#ciCanvas");
  const ctx = canvas.getContext("2d");
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, w, h);
  const left = 70, right = w - 70, y = h / 2;
  ctx.strokeStyle = "#18212f";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(left, y);
  ctx.lineTo(right, y);
  ctx.stroke();
  ctx.strokeStyle = "#d39b22";
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.moveTo(left + 120, y);
  ctx.lineTo(right - 120, y);
  ctx.stroke();
  ctx.fillStyle = "#c44762";
  ctx.beginPath();
  ctx.arc((left + right) / 2, y, 9, 0, Math.PI * 2);
  ctx.fill();
  $("#ciSummary").textContent = `The interval is centered on ${fmt(m, 4)} and extends plus or minus ${fmt(half, 4)}.`;
}

function renderTInputs() {
  const type = $("#tCase").value;
  const map = {
    known: `<label>Data<textarea id="tData" rows="3">3.29, 3.22, 3.30, 3.23</textarea></label><label>Known value<input id="knownValue" type="number" step="0.001" value="3.19"></label>`,
    two: `<label>Mean 1<input id="mean1" type="number" step="0.001" value="36.14"></label><label>SD 1<input id="s1" type="number" step="0.001" value="0.28"></label><label>n 1<input id="tn1" type="number" value="10"></label><label>Mean 2<input id="mean2" type="number" step="0.001" value="36.20"></label><label>SD 2<input id="s2" type="number" step="0.001" value="0.47"></label><label>n 2<input id="tn2" type="number" value="4"></label>`,
    paired: `<label>Method 1<textarea id="paired1" rows="3">17.2,23.1,28.5,15.3,23.1,32.5,39.5,38.7,52.5,42.6,52.7</textarea></label><label>Method 2<textarea id="paired2" rows="3">14.2,27.9,21.2,15.9,32.1,22.0,37.0,41.5,42.6,42.8,41.1</textarea></label>`
  };
  $("#tInputs").innerHTML = map[type];
}

function calcT() {
  const type = $("#tCase").value;
  let t = 0, df = 1, steps = [];
  if (type === "known") {
    const values = numbersFrom($("#tData").value);
    const known = Number($("#knownValue").value);
    const m = mean(values), s = sd(values), n = values.length;
    t = Math.abs(m - known) * Math.sqrt(n) / s;
    df = n - 1;
    steps = [`Mean = ${fmt(m, 4)} and s = ${fmt(s, 4)}.`, `Use t = |mean - known| sqrt(n) / s.`, `t calc = ${fmt(t, 3)} with df = ${df}.`];
  } else if (type === "two") {
    const m1 = Number($("#mean1").value), m2 = Number($("#mean2").value);
    const s1 = Number($("#s1").value), s2 = Number($("#s2").value);
    const n1 = Number($("#tn1").value), n2 = Number($("#tn2").value);
    const sp = Math.sqrt(((n1 - 1) * s1 ** 2 + (n2 - 1) * s2 ** 2) / (n1 + n2 - 2));
    t = Math.abs(m1 - m2) / (sp * Math.sqrt(1 / n1 + 1 / n2));
    df = n1 + n2 - 2;
    steps = [`Pooled SD = ${fmt(sp, 4)}.`, `Use t = |mean1 - mean2| / (sp sqrt(1/n1 + 1/n2)).`, `t calc = ${fmt(t, 3)} with df = ${df}.`];
  } else {
    const a = numbersFrom($("#paired1").value), b = numbersFrom($("#paired2").value);
    const d = a.map((value, i) => b[i] - value).filter(Number.isFinite);
    const md = mean(d), sdD = sd(d), n = d.length;
    t = Math.abs(md) * Math.sqrt(n) / sdD;
    df = n - 1;
    steps = [`Differences are Method 2 - Method 1.`, `Mean difference = ${fmt(md, 3)} and SD of differences = ${fmt(sdD, 3)}.`, `t calc = ${fmt(t, 3)} with df = ${df}.`];
  }
  const crit = tCrit(df, 95);
  const significant = t > crit;
  $("#tOutput").className = `result-box ${significant ? "warn" : "success"}`;
  $("#tOutput").innerHTML = `<p>t calc = <strong>${fmt(t, 3)}</strong>; t critical at 95% is approximately ${crit}.</p><p><strong>${significant ? "Statistically significant difference." : "No significant difference at 95%."}</strong></p>`;
  $("#tSteps").innerHTML = steps.map((step, i) => `<div class="coach-step"><span>${i + 1}</span><p>${step}</p></div>`).join("");
  setDecision(significant ? "significant" : "not significant");
}

function calcF() {
  const sA = Number($("#sdA").value), sB = Number($("#sdB").value);
  const nA = Number($("#nA").value), nB = Number($("#nB").value);
  const high = Math.max(sA, sB), low = Math.min(sA, sB);
  const f = high ** 2 / low ** 2;
  const dfNum = high === sA ? nA - 1 : nB - 1;
  const dfDen = high === sA ? nB - 1 : nA - 1;
  const key = `${dfNum},${dfDen}`;
  const crit = fCritical95[key] || "use table";
  const decision = typeof crit === "number" ? (f > crit ? "variances differ significantly" : "no significant variance difference") : "compare with F table";
  $("#fOutput").className = `result-box ${decision.startsWith("variances") ? "warn" : "success"}`;
  $("#fOutput").innerHTML = `<p>Put the larger variance on top. F calc = ${fmt(f, 3)} with df numerator = ${dfNum}, df denominator = ${dfDen}.</p><p>F critical: ${crit}. Decision: <strong>${decision}</strong>.</p>`;
  setDecision("F test");
}

function calcOutlier() {
  const values = numbersFrom($("#outlierData").value).sort((a, b) => a - b);
  const n = values.length;
  if (n < 3) return;
  const side = $("#outlierSide").value;
  const suspect = side === "low" ? values[0] : values[n - 1];
  const neighbor = side === "low" ? values[1] : values[n - 2];
  const gap = Math.abs(suspect - neighbor);
  const range = values[n - 1] - values[0];
  const q = gap / range;
  const m = mean(values), s = sd(values);
  const g = Math.abs(suspect - m) / s;
  const qCrit = qCritical95[n] || "table";
  const gCrit = grubbsCritical95[n] || "table";
  $("#outlierOutput").innerHTML = `<p>Suspected value = ${suspect}. Q calc = ${fmt(q, 3)}; Q critical = ${qCrit}.</p><p>Grubbs G calc = ${fmt(g, 3)}; G critical = ${gCrit}.</p><p>Only remove a point if the statistical test and experimental context justify it.</p>`;
  setDecision("outlier checked");
}

function renderPracticeCards() {
  $("#practiceCards").innerHTML = practiceCards.map((item, i) => `
    <article class="provided-question-card">
      <div class="question-card-head">
        <div>
          <span class="question-number">Question ${i + 1}</span>
          <p class="question-section">${item.section}</p>
        </div>
        <button class="ghost" type="button" data-key="${i}" aria-expanded="false">Reveal key</button>
      </div>
      <p>${item.prompt}</p>
      <div class="question-key" id="practice-key-${i}" hidden><h4>Key</h4><p>${item.key}</p></div>
    </article>
  `).join("");
  $$("[data-key]").forEach(button => {
    button.addEventListener("click", () => {
      const key = $("#practice-key-" + button.dataset.key);
      const show = key.hidden;
      key.hidden = !show;
      button.textContent = show ? "Hide key" : "Reveal key";
      button.setAttribute("aria-expanded", String(show));
    });
  });
}

function renderLectureMap() {
  $("#lectureMap").innerHTML = lectureCards.map(([slides, text]) => `<article class="lecture-card"><h3>${slides}</h3><p>${text}</p></article>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  setupTabs();
  renderTInputs();
  $("#tCase").addEventListener("change", renderTInputs);
  $("#rollOnce").addEventListener("click", rollSample);
  $("#rollMany").addEventListener("click", () => { for (let i = 0; i < 100; i++) rollSample(); });
  $("#calcCi").addEventListener("click", calcCi);
  $("#calcT").addEventListener("click", calcT);
  $("#calcF").addEventListener("click", calcF);
  $("#calcOutlier").addEventListener("click", calcOutlier);
  renderPracticeCards();
  renderLectureMap();
  calcCi();
  calcT();
  calcF();
});
