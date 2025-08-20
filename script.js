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

// 1) UI描画
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

/* =========================================
   Google Sheets APIからデータ取得 
    ========================================= */

async function fetchSchedule() {
  const apiKey  = "AIzaSyA498eTDYusBPxzeUdogcQ7Z3XG5zPvKk4";       // APIキー
  const spreadsheetId = "1RJnzcPcSGI9YTCaLIqhgRVhDKB7ttATCLKspcyCCinA"; // シートID
  const range   = "schedule!A:G";           // 列を指定

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${apiKey}`;
  console.log("fetch URL:", url); // 確認用
 try {
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text(); // エラー内容を直接確認できる
      throw new Error(`HTTP ${res.status} - ${text}`);
    }

    const data = await res.json();
    console.log("Google Sheets APIから受け取ったデータ:", data);

    return convertRowsToDays(data.values);
  } catch (err) {
    console.error("スケジュール取得エラー:", err);
    throw err;
  }
}

/* =========================================
   スプレッドシートの行データを日程オブジェクトに変換
   rows → days への変換関数（縦ブロック対応：label/dayLabel 見出しで区切る）
   ========================================= */

function convertRowsToDays(rows) {
  if (!rows || !rows.length) return [];

  const days = [];
  let i = 0;

  const val = (arr, idx) => (arr && arr[idx] != null ? String(arr[idx]).trim() : "");

  while (i < rows.length) {
    const r = rows[i] || [];

    // --- ブロック開始の見出し行を検出: ["label","dayLabel","theme","am","pm", ...] ---
    const isBlockHeader =
      val(r,0) === "label" && val(r,1) === "dayLabel";

    if (!isBlockHeader) { i++; continue; }

    // --- 親メタ行（見出しの次の行） ---
    const meta = rows[i + 1] || [];
    const day = {
      // A列: タブに出すラベル（"9/29" や "10/4-10/5" など任意OK）
      label:   val(meta, 0),
      // B列: "1日目" / "2日目" … ← ここが親判定の要
      dayLabel: val(meta, 1),
      theme:   val(meta, 2),
      am:      val(meta, 3),
      pm:      val(meta, 4),
      items:   []
    };
    days.push(day);

    // --- items 見出し行（通常 "time","type","text","duration","url","urltext","notes"） ---
    const itemsHeaderRow = rows[i + 2] || [];
    const headerIndex = {};
    itemsHeaderRow.forEach((h, idx) => { headerIndex[String(h).trim()] = idx; });

    // 欲しい列の場所（シート側の順番入れ替わってもOKにする）
    const idxTime    = headerIndex["time"]    ?? 0;
    const idxType    = headerIndex["type"]    ?? 1;
    const idxText    = headerIndex["text"]    ?? 2;
    const idxDur     = headerIndex["duration"]?? 3;
    const idxUrl     = headerIndex["url"]     ?? 4;
    const idxUrlText = headerIndex["urltext"] ?? 5;
    const idxNotes   = headerIndex["notes"]   ?? 6;

    // --- items を収集（次のブロック見出しが来るまで） ---
    let j = i + 3; // items の先頭行
    while (j < rows.length) {
      const rr = rows[j] || [];

      // 次のブロック開始で終了
      const nextIsHeader =
        val(rr,0) === "label" && val(rr,1) === "dayLabel";
      if (nextIsHeader) break;

      // 空行はスキップ
      const allEmpty = rr.every(c => String(c||"").trim() === "");
      if (!allEmpty) {
        const time = val(rr, idxTime);
        const type = val(rr, idxType);
        const text = val(rr, idxText);

        // 少なくとも何か入ってたら item として追加
        if (time || type || text) {
          const duration = val(rr, idxDur);
          const url      = val(rr, idxUrl);
          const urltext  = val(rr, idxUrlText);
          const notesRaw = val(rr, idxNotes);

          const item = { time, type, text };

          // details はオブジェクトで渡す（renderTabs の既存実装にそのまま合う）
          if (duration || url || urltext || notesRaw) {
            item.details = {
              duration,
              url,
              urltext,
              // 文字列のままでOK（renderTabs 側で行分割して <li> 化してくれる）
              notes: notesRaw
            };
          }

          day.items.push(item);
        }
      }
      j++;
    }

    // 次ブロック探索へ
    i = j;
  }

  return days;
}



// DOM読み込み後に処理開始
document.addEventListener('DOMContentLoaded', () => {
  fetchSchedule()
    .then(days => {
      console.log("取得した days:", days);
      renderTabs(days); // ← タブ描画処理。class名など変更不要
    })
    .catch(err => {
      console.error("スケジュール取得エラー:", err);
    });
});
