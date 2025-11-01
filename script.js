// 最低限のコメントのみ: 大きい箇所のみ説明

// 1) セクション演出・現在位置追跡
const sections = Array.from(document.querySelectorAll('main section'));
const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const fadeIO = 'IntersectionObserver' in window ? new IntersectionObserver((entries)=>{
  for(const e of entries){ if(e.isIntersecting) e.target.classList.add('show'); }
}, {threshold: .1}) : null;
for(const el of document.querySelectorAll('.fade')){ fadeIO ? fadeIO.observe(el) : el.classList.add('show'); }

let isManualNav = false;
const posIO = 'IntersectionObserver' in window ? new IntersectionObserver((ents)=>{
  for(const en of ents){ if(en.isIntersecting){
    const i = sections.indexOf(en.target);
    if(i !== -1 && !isManualNav){
      current = i;
      const id = sections[i].id;
      for(const a of navLinks){ a.setAttribute('aria-current', String(a.getAttribute('href') === `#${id}`)); }
    }
  }}
}, {threshold:.6}) : null;

let current = 0;
if(posIO){ for(const s of sections) posIO.observe(s); }

// 2) スコア UI（バグ修正済）
const elRange = document.getElementById('score');
const elNum = document.getElementById('scoreNum');
const elLabel = document.getElementById('scoreLabel');
const key = 'normal-score-v1';
function label(v){
  if(v < 34) return '選好優先';
  if(v < 67) return '生活優先';
  return '達成志向';
}
try{
  if(elRange && elNum && elLabel){
    const saved = localStorage.getItem(key);
    if(saved != null) elRange.value = saved;
    const init = parseInt(elRange.value,10) || 0;
    elNum.textContent = init;
    elLabel.textContent = label(init);
    elRange.addEventListener('input', (e)=>{
      const v = parseInt(e.target.value,10) || 0;
      elNum.textContent = v;
      elLabel.textContent = label(v);
      try{ localStorage.setItem(key, String(v)); }catch{}
    }, {passive:true});
  }
}catch{}

// 3) 印刷・要点コピー
const printBtn = document.getElementById('printBtn');
if(printBtn){ printBtn.addEventListener('click', ()=> window.print()); }

const exportBtn = document.getElementById('exportBtn');
if(exportBtn){
  exportBtn.addEventListener('click', async ()=>{
    const points = `【要点まとめ】\n- 今の普通：未来の自分の生活のために働く\n- 2030s：週30→20h、週休4日\n- 2040s：基礎所得＋公共配当、働くのは選好へ\n- 3つの代替困難性：予測不能性／関係性／意味創造性\n- 報酬の再設計：不人気職へ高報酬＋リスペクト、多層通貨の可能性\n- 新しい価値：人間の不完全さ・体験の自給・生き方の設計\n- 幸福の軸：何を生むか→どう生きるか\n- Key Message：『存在を選び取ること』が“普通”になる`;
    try{ await navigator.clipboard.writeText(points); alert('要点をコピーしました'); }
    catch{ prompt('コピーできない場合は手動でコピーしてください', points); }
  });
}

// 4) キーボードでセクション移動（← →）
function goto(i){
  if(i<0||i>=sections.length) return;
  current = i;
  isManualNav = true;
  sections[i].scrollIntoView({behavior: prefersReduce ? 'auto' : 'smooth', block:'start'});
  sections[i].focus({preventScroll:true});
  const id = sections[i].id;
  for(const a of navLinks){ a.setAttribute('aria-current', String(a.getAttribute('href') === `#${id}`)); }
  setTimeout(()=> isManualNav = false, prefersReduce ? 100 : 1000);
}
window.addEventListener('keydown', (e)=>{
  if(e.key==='ArrowRight') goto(Math.min(current+1, sections.length-1));
  else if(e.key==='ArrowLeft') goto(Math.max(current-1, 0));
});
