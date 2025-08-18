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
   日程タブ＆タイムライン生成
   ========================================= */
function getIconClass(type) {
  switch(type) {
    case 'taxi': return 'fa-taxi';
    case 'bus': return 'fa-bus';
    case 'train': return 'fa-train';
    case 'walk': return 'fa-shoe-prints';
    case 'museum': return 'fa-landmark';
    case 'meal': return 'fa-utensils';
    default: return 'fa-circle'; // fallback
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer   = document.getElementById('tabs');
  const panelsContainer = document.getElementById('panels');
  if(!tabsContainer || !panelsContainer || !window.days) return;

  // タブ生成
  days.forEach((day, idx) => {
    const btn = document.createElement('button');
    btn.textContent = day.label;
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => selectTab(idx));
    tabsContainer.appendChild(btn);
  });

  // パネル生成
  days.forEach((day, idx) => {
    const panel = document.createElement('div');
    panel.className = 'day-panel';
    if (idx === 0) panel.classList.add('active');

    /* --- ヘッダー --- */
    const header = document.createElement('div');
    header.className = 'day-header';

    const dl = document.createElement('div');
    dl.className = 'day-label';
    dl.textContent = day.dayLabel || `${idx+1}日目`;

    // 右側（テーマ + AM/PMタグ）
    const theme = document.createElement('div');
    theme.className = 'day-theme';
    theme.textContent = day.theme || '';

    const tags = document.createElement('div');
    tags.className = 'tags';
    if (day.am){
      const am = document.createElement('span');
      am.className = 'tag am'; // ←色付け用
      am.innerHTML = `<strong>AM</strong>&nbsp;${day.am}`;
      tags.appendChild(am);
    }
    if (day.pm){
      const pm = document.createElement('span');
      pm.className = 'tag pm'; // ←色付け用
      pm.innerHTML = `<strong>PM</strong>&nbsp;${day.pm}`;
      tags.appendChild(pm);
    }

    header.appendChild(dl);
    const rightWrap = document.createElement('div');
    rightWrap.appendChild(theme);
    rightWrap.appendChild(tags);
    header.appendChild(rightWrap);

    panel.appendChild(header);

    /* --- タイムライン --- */
    (day.items || []).forEach(item => {
      const row = document.createElement('div');
      const moveTypes = ['taxi','bus','train','walk'];
      row.className = 'timeline' + (moveTypes.includes(item.type) ? ' move' : '');

      const time = document.createElement('div');
      time.className = 'time';
      time.textContent = item.time || '';
      row.appendChild(time);

// アイコン（タイプに応じた色クラス）
const icon = document.createElement('div');
icon.className = 'icon ' + (item.type || '');

// type→FontAwesome マッピング（最新版）
const FA_ICON = {
  taxi:   'fa-taxi',
  bus:    'fa-bus',
  train:  'fa-train',
  walk:   'fa-person-walking', 
  flight: 'fa-plane-departure',
  sight:  'fa-landmark',
  meal:   'fa-utensils',
  hotel:  'fa-hotel',
  spot:   'fa-location-dot'
};

const fa = document.createElement('i');
const faClass =
  (item.icon && /^fa-/.test(item.icon))
    ? item.icon
    : (FA_ICON[item.type] || 'fa-circle');// 不明なら●表記
fa.className = `fas ${faClass}`;
icon.appendChild(fa);
row.appendChild(icon);

      const event = document.createElement('div');
      event.className = 'event';

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = item.text || '';
      event.appendChild(title);

if (item.details) {
  const ul = document.createElement('ul');
  ul.className = 'details';

  if (Array.isArray(item.details) && item.details.length) {
    // ← ここがあなたの今のコードと同じ「配列版」処理
    item.details.forEach(d => {
      const li = document.createElement('li');
      if (typeof d === 'string' && d.trim().startsWith('所要時間')) {
        li.innerHTML = `<i class="fa-regular fa-clock"></i>&nbsp;${d}`;
      } else if (typeof d === 'string' && /https?:\/\//.test(d)) {
        li.innerHTML = d.replace(/https?:\/\/\S+/g, (url) => {
          return `<a href="${url}" target="_blank" rel="noopener">${url}</a>`;
        });
      } else {
        li.textContent = d;
      }
      ul.appendChild(li);
    });
  } else if (typeof item.details === 'object') {
    // ← 追加：オブジェクト版の処理
    const { duration, url, notes } = item.details;

    if (duration) {
      const li = document.createElement('li');
      li.innerHTML = `<i class="fa-regular fa-clock"></i>&nbsp;所要時間: ${duration}`;
      ul.appendChild(li);
    }
    if (url) {
      const li = document.createElement('li');
      li.innerHTML = String(url).replace(/https?:\/\/\S+/g, (u) =>
        `<a href="${u}" target="_blank" rel="noopener">${u}</a>`);
      ul.appendChild(li);
    }
    if (notes) {
      const list = Array.isArray(notes) ? notes : String(notes).split(/\r?\n/);
      list.filter(Boolean).forEach(n => {
        const li = document.createElement('li');
        li.textContent = n;
        ul.appendChild(li);
      });
    }
  }

  if (ul.children.length) event.appendChild(ul);
}

      row.appendChild(event);
      panel.appendChild(row);
    });

    panelsContainer.appendChild(panel);
  });

  // ←←← forEachの外に出す！！
  function selectTab(i) {
    [...tabsContainer.children].forEach((b, idx) => {
      b.setAttribute('aria-selected', String(idx === i));
    });
    [...panelsContainer.children].forEach((p, idx) => {
      p.classList.toggle('active', idx === i);
    });
  }
});
