/* =========================================
   ハンバーガーメニュー ＋スクロール半透明
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const navbar   = document.querySelector('.navbar');
  const hamburger= document.querySelector('.hamburger');
  const overlay  = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-close');

  // 防御
  if (!navbar)   console.error('[UI] .navbar が見つかりません');
  if (!hamburger)console.error('[UI] .hamburger が見つかりません');
  if (!overlay)  console.error('[UI] .menu-overlay が見つかりません');
  if (!closeBtn) console.error('[UI] .menu-close が見つかりません');

  // メニュー開閉
  if (hamburger && overlay){
    hamburger.addEventListener('click', () => {
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
    });
  }
  if (closeBtn && overlay){
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlay.setAttribute('aria-hidden', 'true');
    });
  }
  if (overlay){
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay){
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
      }
    });
    // クリックで閉じる（アンカー）
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
      });
    });
  }

  // スクロールでナビ半透明
  const onScroll = () => {
    if (!navbar) return;
    if (window.scrollY > 12) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // 初期化
});

/* =========================================
   日程タブ＆タイムライン生成（新規追加／上書きなし）
   ========================================= */

// 実データ（9/29〜10/3、10/4–10/5まとめ）
const days = [
  {
    label: "9/29",
    theme: "到着日（チェックイン＆近場で軽食）",
    items: [
      { time: "11:45", type: "flight",   icon: "fa-plane-departure", text: "羽田空港発（AF293便）" },
      { time: "18:10", type: "flight",   icon: "fa-plane-arrival",   text: "パリ・シャルルドゴール空港着" },
      { time: "",      type: "taxi",     icon: "fa-taxi",            text: "空港→ホテル（送迎車 約1h / 約90€）" },
      { time: "20:00頃", type: "hotel",  icon: "fa-hotel",           text: "ホテル着・チェックイン" },
      { time: "",      type: "food",     icon: "fa-utensils",        text: "夕食：ホテル周辺のカフェまたは軽食（予約なし）" },
    ]
  },
  {
    label: "9/30",
    theme: "午前：市内観光ツアー／午後：百貨店＆オペラ外観",
    items: [
      { time: "",           type: "taxi",     icon: "fa-taxi",            text: "ホテル→集合場所（送迎タクシー / 約20分）" },
      { time: "9:00–12:30", type: "sight",    icon: "fa-landmark",        text: "JTB「モンマルトルとシテ島散策付きパリ市内観光（日本語・カフェ付）」参考16,832円 / 約3.5h" },
      { time: "昼",         type: "food",     icon: "fa-utensils",        text: "シテ島周辺で各自ランチ" },
      { time: "午後",       type: "shopping", icon: "fa-bag-shopping",    text: "ギャラリー・ラファイエット見学 → パレ・ガルニエ外観（徒歩圏）" },
      { time: "",           type: "bus",      icon: "fa-bus-simple",      text: "バスまたはタクシーでホテルへ" },
    ]
  },
  {
    label: "10/1",
    theme: "午前：ルーブル／午後：ベルサイユ（日本語ガイド・カフェランチ付）",
    items: [
      { time: "",           type: "taxi",   icon: "fa-taxi",             text: "ホテル→ルーブル（送迎タクシー / 約20分）" },
      { time: "日中",       type: "art",    icon: "fa-palette",          text: "JTB「午前ルーブル美術館＆午後ベルサイユ宮殿観光」参考34,305円 / 約9h（カフェランチ付）" },
      { time: "夕方",       type: "bus",    icon: "fa-bus-simple",       text: "ツアー送迎でホテルへ" },
    ]
  },
  {
    label: "10/2",
    theme: "終日：モンサンミッシェル（往復バス＋オムレツ／日本語ガイド）",
    items: [
      { time: "",           type: "taxi",   icon: "fa-taxi",             text: "ホテル→集合場所（送迎タクシー / 約20分）" },
      { time: "終日",       type: "bus",    icon: "fa-bus-simple",       text: "JTB「モンサンミッシェル・往復バス＋オムレツ／ガイド付き」参考35,266円 / 約14h" },
      { time: "夜",         type: "hotel",  icon: "fa-hotel",            text: "ホテル着" },
    ]
  },
  {
    label: "10/3",
    theme: "午前：朝市＆カフェ／午後：オルセー＆オランジェリー／夜：特別ディナー",
    items: [
      { time: "午前",       type: "sight",   icon: "fa-store",           text: "JTB「パリの朝市とカフェ（日本語）」参考9,178円 / 約2.5h" },
      { time: "午後",       type: "art",     icon: "fa-palette",         text: "オルセー美術館・オランジェリー美術館（ミュージアムパス）" },
      { time: "夕方〜夜",   type: "food",    icon: "fa-utensils",        text: "特別ディナー（予算70〜100€／事前予約）" },
      { time: "夜",         type: "hotel",   icon: "fa-hotel",           text: "ホテル着" },
    ]
  },
  {
    label: "10/4–10/5",
    theme: "帰国：ホテル→空港→翌日日本着",
    items: [
      { time: "",     type: "taxi",   icon: "fa-taxi",              text: "ホテル→空港（送迎車 / 約1h / 約90€）" },
      { time: "9:30", type: "flight", icon: "fa-plane-departure",   text: "パリ発（AF便）" },
      { time: "翌日", type: "flight", icon: "fa-plane-arrival",     text: "羽田着" }
    ]
  }
];

// DOMに描画
(function initSchedule(){
  const app   = document.getElementById('schedule-app');
  if(!app) return; // セクション未配置なら何もしない
  const tabs  = app.querySelector('.schedule-tabs');
  const panels= app.querySelector('.schedule-panels');

  // タブ生成（横スクロールしないようグリッドで折り返し）
  days.forEach((d, idx) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'schedule-tab';
    btn.textContent = d.label;
    btn.setAttribute('role','tab');
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => selectTab(idx));
    tabs.appendChild(btn);

    // パネル
    const panel = document.createElement('div');
    panel.className = 'schedule-panel' + (idx===0 ? ' active':'');
    panel.setAttribute('role','tabpanel');

    // テーマ
    const theme = document.createElement('div');
    theme.className = 'day-theme';
    theme.textContent = d.theme;
    panel.appendChild(theme);

    // タイムライン
    const tl = document.createElement('div');
    tl.className = 'timeline';
    d.items.forEach(ev => {
      const t = document.createElement('div');
      t.className = 'timeline-time';
      t.textContent = ev.time || ' ';
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.dataset.type = ev.type;
      item.innerHTML = `<i class="fa-solid ${ev.icon}"></i><span>${ev.text}</span>`;
      tl.appendChild(t);
      tl.appendChild(item);
    });
    panel.appendChild(tl);

    panels.appendChild(panel);
  });

  function selectTab(i){
    // タブ
    [...tabs.children].forEach((b, idx) => {
      b.setAttribute('aria-selected', String(idx===i));
    });
    // パネル
    [...panels.children].forEach((p, idx) => {
      p.classList.toggle('active', idx===i);
    });
  }
})();

