

document.addEventListener("DOMContentLoaded", function(){

        // 도마뱀 배경 패럴랙스 (해당 요소가 있는 페이지에서만 동작)
        const bg = document.querySelector(".bg");
        if (bg) {
            window.addEventListener("scroll", () => {
                const y = window.scrollY;
                bg.style.transform = `translateY(${y * 0.15}px)`;
            });
        }


        // 마우스 커서 글로우 (해당 요소가 있는 페이지에서만 동작)
        const glow = document.querySelector(".cursor-glow");
        if (glow) {
            document.addEventListener("mousemove", (e) => {
                glow.style.left = e.clientX + "px";
                glow.style.top = e.clientY + "px";
            });
        }

});


/* ===== 3D Book viewer =====
   책 데이터: spreads 배열의 한 항목 = 펼침면 1개 (left / right = 쪽, info = 하단 상세정보)
   쪽(page) 형식: { src:"이미지경로" } | { text:"문구" } | { paper:"#색상" } | {} (빈 종이) */
const BOOK_DATA = {
      "spreads": [
        { "left": { "src": "pages/139-1.webp" }, "right": { "src": "pages/139-2.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "차례 (2p)", "title": "[ 물결의 이면에게 ]" } },
        { "left": { "src": "pages/139-3.webp" }, "right": { "src": "pages/139-4.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "흑백 장표지", "title": "[ 물결의 이면에게 ]" } },
        { "left": { "src": "pages/142-1.webp" }, "right": { "src": "pages/142-2.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "차례 (2p)", "title": "[ 총기 사용 수칙 ]" } },
        { "left": { "paper": "#c7c7c7"}, "right": { "src": "pages/131-1.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "차례 (1p)", "title": "[ 포말의 기록 ]" } },
        { "left": { "paper": "#c7c7c7"}, "right": { "src": "pages/49-0.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "차례 (1p)", "title": "[ Icarus ]" } },
        { "left": { "src": "pages/49-1.webp" }, "right": { "src": "pages/49-2.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "흑백 장표지", "title": "[ Icarus ]" } },
        { "left": { "paper": "#c7c7c7" }, "right": { "src": "pages/98-1.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "차례 (1p)", "title": "[ 마감과 영업 종료 사이 ]" } },
        { "left": { "src": "pages/98-2.webp" }, "right": { "src": "pages/98-3.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "흑백 장표지", "title": "[ 마감과 영업 종료 사이 ]" } },
        { "left": { "src": "pages/103-1.webp" }, "right": { "src": "pages/103-2.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "차례 (2p)", "title": "[ 순례자의 아가미 ]" } },
        { "left": { "src": "pages/90-1.webp" }, "right": { "src": "pages/90-2.webp" },
          "info": { "type": "Type A ; 사진 타입", "desc": "흑백 장표지", "title": "[ TRIPLE ]" } },
        // { "left": {"src": "pages/9-1.webp"}, "right": {"src": "pages/9-3.webp"},
        //   "info": { "type": "Type A ; 사진 타입", "desc": "컬러 장표지", "title": "[ 어떤 감정의 비가역성에 대하여 ]" } },
        // { "left": {"src": "pages/9-2.webp"}, "right": {"src": "pages/9-4.webp"},
        //   "info": { "type": "Type A ; 사진 타입", "desc": "컬러 장표지", "title": "[ 어떤 감정의 비가역성에 대하여 ]" } },
      ]
    };

/* 두 번째 뷰어 데이터 (형식 동일) — 임시로 기존 이미지를 넣어두었으니 교체해서 사용하세요 */
const BOOK_DATA_B = {
      "spreads": [
        { "left": { "src": "pages/116-4.webp" }, "right": { "src": "pages/116-2.webp" },
          "info": { "type": "Type B ; 일러스트 타입", "desc": "차례 (2p)", "title": "[ 소드마스터는 대화로 해결하지 않는다 ]" } },
        { "left": { "src": "pages/116-1.webp" }, "right": { "src": "pages/116-3.webp" },
          "info": { "type": "Type B ; 일러스트 타입", "desc": "흑백 장표지", "title": "[ 소드마스터는 대화로 해결하지 않는다 ]" } },
        { "left": { "src": "pages/83-1.webp" }, "right": { "src": "pages/83-2.webp" },
          "info": { "type": "Type B ; 일러스트 타입", "desc": "흑백 장표지", "title": "[ 防波堤 ]" } },
        { "left": { "paper": "#6fa8dc" }, "right": { "src": "pages/38-0.webp" },
          "info": { "type": "Type B ; 일러스트 타입", "desc": "차례 (1p)", "title": "[ 락앤롤베이비 ]" } },
        { "left": { "src": "pages/38-1.webp" }, "right": { "src": "pages/38-3.webp" },
          "info": { "type": "Type B ; 일러스트 타입", "desc": "컬러 장표지", "title": "[ 락앤롤베이비 ]" } },
        { "left": { "src": "pages/38-2.webp" }, "right": { "src": "pages/38-4.webp" },
          "info": { "type": "Type B ; 일러스트 타입", "desc": "컬러 장표지", "title": "[ 락앤롤베이비 ]" } },
      ]
    };

/* HTML의 data-book 값 → 데이터 연결 */
const BOOKS = { a: BOOK_DATA, b: BOOK_DATA_B };

/* ===== 뷰어 초기화 (페이지의 .bk-wrap 마다 하나씩) ===== */
document.addEventListener("DOMContentLoaded", function(){
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const DUR = reduce ? 1 : 900;
    const viewers = [];

    function initBook(wrap, data) {
        const S = data.spreads;
        const N = S.length;
        const q = sel => wrap.querySelector(sel);
        const book = q('.bk'), stage = q('.bk-stage'), info = q('.bk-info'), count = q('.bk-count');
        let cur = 0, busy = false;

        S.forEach(s => [s.left, s.right].forEach(p => { if (p && p.src) new Image().src = p.src; }));

        // 쪽 내용 채우기
        function fill(el, p) {
            p = p || {};
            el.innerHTML = '';
            el.style.backgroundColor = p.paper || '';
            if (p.src) { const i = document.createElement('img'); i.src = p.src; i.alt = ''; i.draggable = false; el.appendChild(i); }
            if (p.text) { const t = document.createElement('div'); t.className = 'bk-txt'; t.textContent = p.text; el.appendChild(t); }
        }
        const mk = (cls, p) => { const d = document.createElement('div'); d.className = cls; fill(d, p); return d; };

        const L = mk('bk-pg l'), R = mk('bk-pg r');
        book.append(L, R);
        fill(L, S[0].left); fill(R, S[0].right);
        renderInfo(0, true);

        function renderInfo(i, instant) {
            const set = () => {
                const f = S[i].info || {};
                info.innerHTML = '<span class="tag"></span><h2></h2><p></p>';
                info.children[0].textContent = f.type || '';
                info.children[1].textContent = f.title || '';
                info.children[2].textContent = f.desc || '';
                count.textContent = (i + 1) + ' / ' + N;
                info.classList.remove('out');
            };
            if (instant) return set();
            info.classList.add('out');
            setTimeout(set, 250);
        }

        // dir: +1 다음, -1 이전 (끝에서 처음으로, 처음에서 끝으로 순환)
        function flip(dir) {
            if (busy) return;
            busy = true;
            const t = (cur + dir + N) % N;
            const leaf = document.createElement('div');
            leaf.className = 'bk-leaf';
            leaf.style.setProperty('--dur', DUR + 'ms');
            const front = mk('bk-face front', dir > 0 ? S[cur].right : S[t].right);
            const back = mk('bk-face back', dir > 0 ? S[t].left : S[cur].left);
            const shade = document.createElement('div'); shade.className = 'bk-shade';
            leaf.append(front, back, shade);
            leaf.style.transform = dir > 0 ? 'rotateY(0deg)' : 'rotateY(-180deg)';

            if (dir > 0) fill(R, S[t].right); else fill(L, S[t].left);   // 넘어가는 장 아래에 드러날 쪽
            book.appendChild(leaf);
            leaf.getBoundingClientRect();                                  // reflow
            leaf.style.transform = dir > 0 ? 'rotateY(-180deg)' : 'rotateY(0deg)';
            renderInfo(t);

            setTimeout(() => {
                if (dir > 0) fill(L, S[t].left); else fill(R, S[t].right);
                leaf.remove();
                cur = t; busy = false;
            }, DUR + 30);
        }

        // 클릭(좌/우 반쪽) · 스와이프 · 버튼
        let sx = null;
        stage.addEventListener('pointerdown', e => { sx = e.clientX; });
        stage.addEventListener('pointerup', e => {
            if (sx === null) return;
            const dx = e.clientX - sx; sx = null;
            if (Math.abs(dx) > 40) return flip(dx < 0 ? 1 : -1);
            const r = book.getBoundingClientRect();
            flip(e.clientX >= r.left + r.width / 2 ? 1 : -1);
        });
        stage.addEventListener('pointercancel', () => { sx = null; });
        stage.addEventListener('contextmenu', e => { e.preventDefault(); flip(-1); }); // 우클릭 = 이전
        q('.bk-next').onclick = () => flip(1);
        q('.bk-prev').onclick = () => flip(-1);

        // 마우스 따라 살짝 기울어지는 3D 시점
        if (!reduce) stage.addEventListener('pointermove', e => {
            if (e.pointerType !== 'mouse') return;
            const r = stage.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
            book.style.setProperty('--ry', (x * 8) + 'deg');
            book.style.setProperty('--rx', (8 - y * 8) + 'deg');
        });
        stage.addEventListener('pointerleave', () => { book.style.setProperty('--ry', '0deg'); book.style.setProperty('--rx', '0deg'); });

        viewers.push({ wrap, flip });
    }

    document.querySelectorAll('.bk-wrap').forEach(w => {
        const data = BOOKS[w.dataset.book];
        if (data) initBook(w, data);
    });

    // 키보드: 화면 중앙에 가장 가까운 뷰어를 넘김
    addEventListener('keydown', e => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        const mid = innerHeight / 2;
        let best = null, bd = Infinity;
        viewers.forEach(v => {
            const r = v.wrap.getBoundingClientRect();
            const d = Math.abs((r.top + r.bottom) / 2 - mid);
            if (d < bd) { bd = d; best = v; }
        });
        if (best) best.flip(e.key === 'ArrowRight' ? 1 : -1);
    });
});
