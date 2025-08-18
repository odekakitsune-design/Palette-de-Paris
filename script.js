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

// 1) UI描画関数にまとめる
function renderTabs(days) {
  const tabsContainer   = document.getElementById('tabs');
  const panelsContainer = document.getElementById('panels');
  if(!tabsContainer || !panelsContainer) return;

  tabsContainer.innerHTML = '';
  panelsContainer.innerHTML = '';

  // タブ生成
  days.forEach((day, idx) => {
    const btn = document.createElement('button');
    btn.textContent = day.label;
    btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => selectTab(idx));
    tabsContainer.appendChild(btn);
  });

  // パネル生成（←あなたの長い処理をそのまま移植）
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
      am.className = 'tag am';
      am.innerHTML = `<strong>AM</strong>&nbsp;${day.am}`;
      tags.appendChild(am);
    }
    if (day.pm){
      const pm = document.createElement('span');
      pm.className = 'tag pm';
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

      // アイコン
      const icon = document.createElement('div');
      icon.className = 'icon ' + (item.type || '');
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
      fa.className = `fas ${(item.icon && /^fa-/.test(item.icon)) ? item.icon : (FA_ICON[item.type] || 'fa-circle')}`;
      icon.appendChild(fa);
      row.appendChild(icon);

      const event = document.createElement('div');
      event.className = 'event';

      const title = document.createElement('div');
      title.className = 'title';
      title.textContent = item.text || '';
      event.appendChild(title);

      // details処理（配列 or オブジェクト）
      if (item.details) {
        const ul = document.createElement('ul');
        ul.className = 'details';
        if (Array.isArray(item.details) && item.details.length) {
          item.details.forEach(d => {
            const li = document.createElement('li');
            if (typeof d === 'string' && d.trim().startsWith('所要時間')) {
              li.innerHTML = `<i class="fa-regular fa-clock"></i>&nbsp;${d}`;
            } else if (typeof d === 'string' && /https?:\/\//.test(d)) {
              li.innerHTML = d.replace(/https?:\/\/\S+/g, url => `<a href="${url}" target="_blank" rel="noopener">${url}</a>`);
            } else {
              li.textContent = d;
            }
            ul.appendChild(li);
          });
        } else if (typeof item.details === 'object') {
          const { duration, url, notes } = item.details;
          if (duration) {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fa-regular fa-clock"></i>&nbsp;所要時間: ${duration}`;
            ul.appendChild(li);
          }
          if (url) {
            const li = document.createElement('li');
            const linkText = item.details.urltext || url;
            li.innerHTML = `<a href="${url}" target="_blank" rel="noopener">${linkText}</a>`;
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

  // タブ切替関数
  function selectTab(i) {
    [...tabsContainer.children].forEach((b, idx) => {
      b.setAttribute('aria-selected', String(idx === i));
    });
    [...panelsContainer.children].forEach((p, idx) => {
      p.classList.toggle('active', idx === i);
    });
  }
}

// 2) ダミーデータ or スプレ読み込みを呼ぶ
// document.addEventListener('DOMContentLoaded', async function () {
//   // ★まずはダミーデータで確認
//   const dummy = [
//     {
//       label: "9/29",
//       dayLabel: "1日目",
//       theme: "出発と到着",
//       items: [
//         { time: "11:45", type:"flight", text: "羽田発", details: { notes: "AF293" } },
//         { time: "18:10", type:"flight", text: "パリ着", details: { notes: "CDG空港" } }
//       ]
//     }
//   ];
//   renderTabs(dummy);

//   // ★あとでここを差し替え
//   // const rows = await fetchSchedule();
//   // const days = convertRowsToDays(rows);
//   // renderTabs(days);
// });

// Google Sheets APIからデータ取得
// 1) APIからの読み取り部分
async function fetchSchedule() {
  const apiKey  = "AIzaSyBEeDZb5_2GsxInBtokjI_ij9ycsnXwnKk";       // APIキー
  const sheetId = "1RJnzcPcSGI9YTCaLIqhgRVhDKB7ttATCLKspcyCCinA"; // シートID
  const range   = "schedule!A:G";             // 列を指定

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Google Sheets API 取得失敗");
  const data = await res.json();
  return convertRowsToDays(data.values);
}

// 2) rows → days への変換関数
function convertRowsToDays(rows) {
  if (!rows || rows.length < 2) return [];

  const header = rows[0];
  const data   = rows.slice(1);
  const days = [];
  let currentDay = null;

  data.forEach(r => {
    const row = {};
    header.forEach((key, i) => {
      row[key] = r[i] || "";
    });

    // 「親行」かどうかの判定
    if (row.dayLabel) {
      currentDay = {
        label: row.label || "",
        dayLabel: row.dayLabel,
        theme: row.theme || "",
        am: row.am || "",
        pm: row.pm || "",
        items: []
      };
      days.push(currentDay);
    }

    // 親が確定していて内容行なら item として追加
    if (currentDay && row.time) {
      currentDay.items.push({
        time: row.time,
        type: row.type,
        text: row.text,
        details: row.details ? row.details.split("\n") : [],
        duration: row.duration || "",
        url: row.url || "",
        notes: row.notes || ""
      });
    }
  });

  return days;
}

// 3) 読み込み → UI描画（DOMContentLoaded への登録）
document.addEventListener('DOMContentLoaded', () => {
  fetchSchedule()
    .then(days => {
      console.log("取得した days:", days);
      renderTabs(days);
    })
    .catch(err => {
      console.error("スケジュール取得エラー:", err);
    });
});



