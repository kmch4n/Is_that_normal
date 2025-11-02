
const sections = Array.from(document.querySelectorAll("main section"));
const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
const prefersReduce = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const fadeIO =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) e.target.classList.add("show");
          }
        },
        { threshold: 0.1 }
      )
    : null;
for (const el of document.querySelectorAll(".fade")) {
  fadeIO ? fadeIO.observe(el) : el.classList.add("show");
}

let isManualNav = false;
const posIO =
  "IntersectionObserver" in window
    ? new IntersectionObserver(
        (ents) => {
          for (const en of ents) {
            if (en.isIntersecting) {
              const i = sections.indexOf(en.target);
              if (i !== -1 && !isManualNav) {
                current = i;
                const id = sections[i].id;
                for (const a of navLinks) {
                  a.setAttribute(
                    "aria-current",
                    String(a.getAttribute("href") === `#${id}`)
                  );
                }
              }
            }
          }
        },
        { threshold: 0.6 }
      )
    : null;

let current = 0;
if (posIO) {
  for (const s of sections) posIO.observe(s);
}

// 2) スコア UI
const elRange = document.getElementById("score");
const elNum = document.getElementById("scoreNum");
const elLabel = document.getElementById("scoreLabel");
const key = "normal-score-v1";
function label(v) {
  if (v < 30) return "マイペース型：自分の時間を大切にできる人。怠けではなく、持続可能な働き方を知っています。";
  if (v < 60) return "バランス型：仕事と生活の両立を意識する成熟タイプ。現代社会の理想に近い姿です。";
  if (v < 85) return "働きすぎ予備軍：向上心が強い反面、休むことに罪悪感を覚えていませんか？心と身体の余白を意識して。";
  return "ワーカホリック傾向：情熱が暴走しかけています。成果よりも健康と人間関係を優先する勇気を。";
}
try {
  if (elRange && elNum && elLabel) {
    const saved = localStorage.getItem(key);
    if (saved != null) elRange.value = saved;
    const init = parseInt(elRange.value, 10) || 0;
    elNum.textContent = init;
    elLabel.textContent = label(init);
    elRange.addEventListener(
      "input",
      (e) => {
        const v = parseInt(e.target.value, 10) || 0;
        elNum.textContent = v;
        elLabel.textContent = label(v);
        try {
          localStorage.setItem(key, String(v));
        } catch {}
      },
      { passive: true }
    );
  }
} catch {}

// 3) キーボードでセクション移動（← →）
function goto(i) {
  if (i < 0 || i >= sections.length) return;
  current = i;
  isManualNav = true;
  sections[i].scrollIntoView({
    behavior: prefersReduce ? "auto" : "smooth",
    block: "start",
  });
  sections[i].focus({ preventScroll: true });
  const id = sections[i].id;
  for (const a of navLinks) {
    a.setAttribute("aria-current", String(a.getAttribute("href") === `#${id}`));
  }
  setTimeout(() => (isManualNav = false), prefersReduce ? 100 : 1000);
}
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") goto(Math.min(current + 1, sections.length - 1));
  else if (e.key === "ArrowLeft") goto(Math.max(current - 1, 0));
});
