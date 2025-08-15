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
   日程タブ＆タイムライン生成（新規追加）
   ========================================= */
document.addEventListener('DOMContentLoaded', function () {
  const tabsContainer = document.getElementById('tabs');
  const panelsContainer = document.getElementById('panels');

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
    if (idx === 0) panel.classList.add('active');

    // タイトル
    const h3 = document.createElement('h3');
    h3.textContent = day.theme;
    panel.appendChild(h3);

    // タイムライン
    day.items.forEach(item => {
      const row = document.createElement('div');
      row.className = 'timeline';

      const time = document.createElement('div');
      time.className = 'time';
      time.textContent = item.time || '';
      row.appendChild(time);

      const icon = document.createElement('div');
      icon.className = 'icon ' + item.type;
      icon.innerHTML = `<i class="fas ${item.icon}"></i>`;
      row.appendChild(icon);

      const event = document.createElement('div');
      event.className = 'event';
      event.textContent = item.text;
      row.appendChild(event);

      panel.appendChild(row);
    });

    panelsContainer.appendChild(panel);
  });

  // タブ切り替え関数
  function selectTab(i) {
    [...tabsContainer.children].forEach((b, idx) => {
      b.setAttribute('aria-selected', String(idx === i));
    });
    [...panelsContainer.children].forEach((p, idx) => {
      p.classList.toggle('active', idx === i);
    });
  }
});

