// セクションのフェードイン
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show')}})
}, {threshold: .1});
document.querySelectorAll('.fade').forEach(el=>observer.observe(el));

// スコア UI
const elRange = document.getElementById('score');
const elNum = document.getElementById('scoreNum');
const elLabel = document.getElementById('scoreLabel');
const key = 'normal-score-v1';
function label(v){
  if(v < 34) return '選好優先';
  if(v < 67) return '生活優先';
  return '達成志向';
}
if(elRange && elNum && elLabel){
  const saved = localStorage.getItem(key);
  if(saved){ elRange.value = saved; }
  const init = parseInt(elRange.value,10);
  elNum.textContent = init;
  elLabel.textContent = label(init);
  elRange.addEventListener('input', e=>{
    const v = parseInt(e.target.value,10);
    elNum.textContent = v;
    elLabel.textContent = label(v);
    localStorage.setItem(key, v);
  });
}

// 印刷
const printBtn = document.getElementById('printBtn');
if(printBtn){ printBtn.addEventListener('click', ()=> window.print()); }

// 要点コピー
const exportBtn = document.getElementById('exportBtn');
if(exportBtn){
  exportBtn.addEventListener('click', async ()=>{
    const points = `【要点まとめ】\n- 今の普通：未来の自分の生活のために働く\n- 2030s：週30→20h、週休4日\n- 2040s：基礎所得＋公共配当、働くのは選好へ\n- BIの効果：学ぶ機会拡大／挑戦容易、同時に格差認知など新たな問い\n- 新しい価値：人間の不完全さ・体験の自給・生き方の設計\n- 幸福の軸：何を生むか→どう生きるか\n- 本質：社会・他者・自分の相互作用で“普通”は再設計される`;
    try{
      await navigator.clipboard.writeText(points);
      alert('要点をコピーしました');
    }catch(err){
      prompt('コピーできない場合は手動でコピーしてください', points);
    }
  });
}

// キーボードでセクション移動（← →）
const sections = Array.from(document.querySelectorAll('main section'));
let current = 0;
function goto(i){
  if(i<0||i>=sections.length) return;
  current = i;
  sections[i].scrollIntoView({behavior:'smooth', block:'start'});
  sections[i].focus({preventScroll:true});
}
window.addEventListener('keydown', (e)=>{
  if(e.key==='ArrowRight') goto(Math.min(current+1, sections.length-1));
  if(e.key==='ArrowLeft') goto(Math.max(current-1, 0));
});
const io2 = new IntersectionObserver((ents)=>{
  ents.forEach(en=>{ if(en.isIntersecting){ current = sections.indexOf(en.target); } });
}, {threshold:.6});
sections.forEach(s=>io2.observe(s));
