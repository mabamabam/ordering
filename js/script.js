(() => {
  'use strict';

  // 도마뱀
        window.addEventListener("scroll", () => {
            const y = window.scrollY;

            document.querySelector(".bg").style.transform =
                `translateY(${y * 0.15}px)`;
        });

        
        // 마우스
        const glow = document.querySelector(".cursor-glow");

        document.addEventListener("mousemove", (e)=>{

            glow.style.left = e.clientX + "px";
            glow.style.top = e.clientY + "px";

        });

  /* --------------------------------------------------------------------
     0. 플레이스홀더 이미지 생성 (실제 이미지 업로드 전 임시용)
     -------------------------------------------------------------------- */
  function placeholderDataUri(w, h, label, bg, fg) {
    const text = label
      ? `<text x="50%" y="50%" fill="${fg}" font-family="sans-serif"
          font-size="${Math.round(w / 16)}" text-anchor="middle" dominant-baseline="middle">
          ${label}
        </text>`
      : '';
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect width="100%" height="100%" fill="${bg}"/>
        ${text}
      </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  /* --------------------------------------------------------------------
     2. 책장 섹션 — JSON 데이터를 읽어 책등 컴포넌트 생성
     -------------------------------------------------------------------- */
  const shelfTrack = document.getElementById('shelfTrack');
  const modal = document.getElementById('bookModal');
  const modalImage = document.getElementById('modalImage');
  const modalTitle = document.getElementById('modalTitle');
  const modalAuthor = document.getElementById('modalAuthor');
  const modalContext = document.getElementById('modalContext');

  // 마우스가 있는 PC 환경인지 판별 (true면 호버로 오픈, false면 모바일처럼 탭/클릭으로 오픈)
  const isHoverCapable = window.matchMedia('(min-width: 1200px)').matches;

  // 책장 데이터 (원래 data/books.json 이었던 내용을 그대로 옮겨온 것)
  const BOOKS_DATA = [
    // { title: "망사랑이 딱 좋아!", author: "앤솔로지", spine: 30, color: "#4B78FF", image: "archive(2)/1.webp", context: "커미션 | A5 | 목차 및 장표지 (A)" },
    // { title: "새벽이 드는 창가에", author: "IZE", spine: 20, color: "#ddff4d", image: "archive(2)/1.webp", context: "커미션 | A5" },
    // { title: "검푸른 장막 너머로", author: "IZE", spine: 20, color: "#ddff4d", image: "archive(2)/1.webp", context: "커미션 | A5" },
    { title: "우리는 여전히", author: "게스트북", spine: 30, color: "#ddff4d", image: "archive(2)/42.webp", context: "레디메이드 | A5" },
    { title: "데자뷰", author: "홍", spine: 20, color: "#ddff4d", image: "archive(2)/41.webp", context: "레디메이드 | A5" },
    { title: "청춘의 바깥", author: "미지", spine: 23, color: "#4B78FF", image: "archive(2)/43.webp", context: "레디메이드 | 비판형 | 목차 및 장표지 (A)" },
    { title: "어떤 세계", author: "@", spine: 20, color: "#ddff4d", image: "archive(2)/40.webp", context: "레디메이드 | A5" },
    { title: "Touch ①", author: "하얀꿈", spine: 30, color: "#222222", image: "archive(2)/35.webp", context: "커미션 | A5 | 책날개 | 시리즈 작업" },
    { title: "Touch ②", author: "하얀꿈", spine: 30, color: "#222222", image: "archive(2)/35.webp", context: "커미션 | A5 | 책날개 | 시리즈 작업" },
    { title: "계절 틈새로", author: "트윈지", spine: 22, color: "#ddff4d", image: "archive(2)/2.webp", context: "레디메이드 | A5" },
    { title: "마감과 영업 종료 사이", author: "물만두", spine: 22, color: "#4B78FF", image: "archive(2)/5.webp", context: "레디메이드 | A5 | 홀로그램박 | 목차 및 장표지 (A)" },
    { title: "순례자의 아가미", author: "BIKO", spine: 26, color: "#4B78FF", image: "archive(2)/31.webp", context: "레디메이드 | A5 | 목차 (2p)" },
    { title: "아이러닉 로맨틱", author: "BIKO", spine: 20, color: "#ddff4d", image: "archive(2)/30.webp", context: "레디메이드 | A5 | 중철" },
    { title: "시선 나누기", author: "BIKO", spine: 20, color: "#ddff4d", image: "archive(2)/29.webp", context: "레디메이드 | A5 | 약표제지" },
    { title: "Icarus", author: "R", spine: 22, color: "#4B78FF", image: "archive(2)/1.webp", context: "레디메이드 | B6 | 목차 및 장표지 (A)" },
    { title: "막간", author: "늠", spine: 20, color: "#222222", image: "archive(2)/3.webp", context: "레디메이드 | A5 | 중철 | 글엽서 굿즈" },
    { title: "이물감", author: "서민경", spine: 20, color: "#222222", image: "archive(2)/39.webp", context: "레디메이드 | 비판형 | 하드커버" },
    { title: "랑데부 포인트", author: "PAYLOR", spine: 27, color: "#222222", image: "archive(2)/34.webp", context: "커미션 | A5" },
    { title: "하나 둘 셋", author: "일서", spine: 25, color: "#ddff4d", image: "archive(2)/19.webp", context: "레디메이드 | B6" },
    { title: "어둠 속의 세 남자", author: "묄트게늄", spine: 22, color: "#ddff4d", image: "archive(2)/26.webp", context: "레디메이드 | A5" },
    { title: "防波堤", author: "zoo", spine: 22, color: "#4B78FF", image: "archive(2)/4.webp", context: "레디메이드 | A5 | 목차 및 장표지 (B)" },
    { title: "관외대출", author: "99", spine: 29, color: "#222222", image: "archive(2)/32.webp", context: "일러스트 편집 커미션 | 비판형 | 목차 및 장표지 (B)" },
    { title: "비정형 메타포", author: "노을", spine: 22, color: "#ddff4d", image: "archive(2)/17.webp", context: "레디메이드 | B6" },
    { title: "궤도 이탈하기", author: "앤솔로지", spine: 21, color: "#222222", image: "archive(2)/20.webp", context: "레디메이드 | A5 | 책날개" },
    { title: "황금시간", author: "목가", spine: 20, color: "#ddff4d", image: "archive(2)/23.webp", context: "레디메이드 | A5 | 중철" },
    { title: "가랑눈 내리는 집", author: "제행무상", spine: 21, color: "#ddff4d", image: "archive(2)/21.webp", context: "레디메이드 | B6 | 중철" },
    { title: "무덤팔아 부르주암", author: "딩", spine: 20, color: "#ddff4d", image: "archive(2)/22.webp", context: "레디메이드 | A5" },
    { title: "당신이 바꿀 수 있는 것", author: "M0icy_forever", spine: 20, color: "#222222", image: "archive(2)/33.webp", context: "커미션 | A5" },
    { title: "시간이 멈춘 자리에 우리가 남아서", author: "1열", spine: 20, color: "#222222", image: "archive(2)/44.webp", context: "레디메이드 | B6 | 중철 | 레이아웃 변경" },
    { title: "TRIPLE", author: "Authentic", spine: 20, color: "#ddff4d", image: "archive(2)/25.webp", context: "레디메이드 | A5" },
    { title: "폴리에스터 하트", author: "제이", spine: 28, color: "#ddff4d", image: "archive(2)/28.webp", context: "레디메이드 | A5" },
    { title: "소년찬가", author: "키튼", spine: 28, color: "#4B78FF", image: "archive(2)/6.webp", context: "레디메이드 | A5 | 책날개 | 레이아웃 변경 | 목차 및 장표지 | 책갈피 굿즈" },
    { title: "나의 꿈은 맑은 바람이 되어서", author: "@", spine: 20, color: "#222222", image: "archive(2)/38.webp", context: "포스터 | 오브젝트 추가" },
    { title: "녹청의 하루는 오늘도 바쁘게 움직인다", author: "제이", spine: 22, color: "#ddff4d", image: "archive(2)/18.webp", context: "레디메이드 | B6" },
    { title: "산등성이 불빛에 피어나다", author: "사희", spine: 21, color: "#ddff4d", image: "archive(2)/8.webp", context: "레디메이드 | A5" },
    { title: "오류", author: "반포", spine: 20, color: "#ddff4d", image: "archive(2)/24.webp", context: "레디메이드 | A5" },
    { title: "산제물이 향하는 곳", author: "엘로", spine: 21, color: "#ddff4d", image: "archive(2)/27.webp", context: "레디메이드 | B6" },
    { title: "연정의 입방체", author: "또또7", spine: 20, color: "#ddff4d", image: "archive(2)/12.webp", context: "레디메이드 | A5" },
    { title: "Deferred Alpha", author: "양피지", spine: 20, color: "#ddff4d", image: "archive(2)/37.webp", context: "레디메이드 | 웹소설 표지" },
    { title: "단편선", author: "튜즈", spine: 20, color: "#ddff4d", image: "archive(2)/11.webp", context: "레디메이드 | A5" },
    { title: "락앤롤베이비", author: "우물안두꺼비", spine: 27, color: "#4B78FF", image: "archive(2)/16.webp", context: "레디메이드 | 비판형 | 목차 및 장표지 (B)" },
    { title: "어떤 감정의 비가역성에 대하여", author: "한여름밤의 괴담", spine: 22, color: "#222222", image: "archive(2)/10.webp", context: "레디메이드 | A5 | 목차 및 장표지 (A)" },
    { title: "Wildest Dreams", author: "나리", spine: 25, color: "#ddff4d", image: "archive(2)/15.webp", context: "레디메이드 | A5" },
    { title: "99%토마토주스공급사건", author: "소람", spine: 21, color: "#4B78FF", image: "archive(2)/14.webp", context: "레디메이드 | A5 | 약표제지" },
    { title: "Lucky Strike", author: "유카", spine: 21, color: "#4B78FF", image: "archive(2)/13.webp", context: "레디메이드 | A5 | 장표지 (A)" },
    { title: "Find our way to Love Ending", author: "Kim10000tang", spine: 21, color: "#ddff4d", image: "archive(2)/9.webp", context: "레디메이드 | A5" },
    { title: "수란은 어렵다", author: "@", spine: 20, color: "#ddff4d", image: "archive(2)/36.webp", context: "레디메이드 | 웹소설 표지" },
  ];

  function truncateTitle(title) {
    return title.length > 9 ? title.slice(0, 9) + '…' : title;
  }

  function colorClass(hex) {
    const h = (hex || '').toLowerCase();
    if (h === '#222222') return 'book--dark';
    return 'book--lime';
  }

  // 책등 두께: spine 값(대략 20~30 범위 가정)을 28px~40px 사이로 매핑
  function spineWidth(spine) {
    const min = 20, max = 30, outMin = 26, outMax = 40;
    const clamped = Math.max(min, Math.min(max, Number(spine) || min));
    const ratio = (clamped - min) / (max - min);
    return Math.round(outMin + ratio * (outMax - outMin));
  }

  function createBookEl(book, i) {
    const el = document.createElement('button');
    el.type = 'button';
    el.className = `book ${colorClass(book.color)}`;
    el.style.width = spineWidth(book.spine) + 'px';
    el.style.background = book.color || '#222222';
    el.setAttribute('aria-label', `${book.title} - ${book.author}`);

    el.innerHTML = `
      <span class="book-text">
        <span class="book-title">${truncateTitle(book.title || '')}</span>
        <span class="book-author">${book.author || ''}</span>
      </span>`;

    if (isHoverCapable) {
      // PC: 책등에 마우스를 올리기만 해도 팝업이 뜨고, 벗어나면 닫힘
      // interactive=false 로 열어서 모달이 마우스 이벤트를 가로채지 않게 함
      // (그래야 모달이 책등 위를 덮어도 mouseleave가 잘못 발생해 깜빡이지 않음)
      el.addEventListener('mouseenter', () => openBookModal(book, i, false));
      el.addEventListener('mouseleave', () => closeModal());
      // 클릭하면 닫기 버튼/배경 클릭이 되는 일반 모달로 "고정"
      el.addEventListener('click', () => openBookModal(book, i, true));
    } else {
      // 모바일/터치: 탭(클릭)으로만 열림, 항상 상호작용 가능한 일반 모달
      el.addEventListener('click', () => openBookModal(book, i, true));
    }

    return el;
  }

  function createShelfRow() {
    const row = document.createElement('div');
    row.className = 'shelf-row';

    const track = document.createElement('div');
    track.className = 'shelf-track';
    track.setAttribute('aria-label', '책장');

    const board = document.createElement('div');
    board.className = 'shelf-board';
    board.setAttribute('aria-hidden', 'true');

    row.appendChild(track);
    row.appendChild(board);
    return { row, track, board };
  }

  /* --------------------------------------------------------------------
     책의 개수에 따라 책장을 여러 줄로 자동 분할 (좌우 스크롤 없이,
     한 줄이 넘치면 그 아래에 새 책장을 하나 더 생성)
     -------------------------------------------------------------------- */
  const shelfWrapEl = shelfTrack.closest('.shelf-wrap');

  // 원래 HTML에 있던 shelfTrack / shelf-board 한 쌍을 "행(row)" 구조로 감싸기
  (function wrapFirstRow() {
    const firstBoard = shelfWrapEl.querySelector('.shelf-board');
    const firstRow = document.createElement('div');
    firstRow.className = 'shelf-row';
    shelfWrapEl.insertBefore(firstRow, shelfTrack);
    firstRow.appendChild(shelfTrack);
    if (firstBoard) firstRow.appendChild(firstBoard);
  })();

  function layoutShelves() {
    const rows = shelfWrapEl.querySelectorAll('.shelf-row');
    // 첫 번째 행은 재사용(비우기), 나머지는 제거하고 다시 생성
    rows.forEach((row, idx) => {
      if (idx === 0) {
        row.querySelector('.shelf-track').innerHTML = '';
      } else {
        row.remove();
      }
    });

    const firstTrack = shelfWrapEl.querySelector('.shelf-track');
    const trackStyles = getComputedStyle(firstTrack);
    const paddingX = parseFloat(trackStyles.paddingLeft) + parseFloat(trackStyles.paddingRight);
    const availableWidth = Math.max(0, firstTrack.clientWidth - paddingX);

    let currentTrack = firstTrack;
    let currentWidth = 0;

    BOOKS_DATA.forEach((book, i) => {
      const w = spineWidth(book.spine);

      // 책을 추가했을 때 넘친다고 판단되면(오버플로우) 책장을 아래에 하나 더 생성
      if (currentWidth > 0 && currentWidth + w > availableWidth) {
        const { row, track } = createShelfRow();
        shelfWrapEl.appendChild(row);
        currentTrack = track;
        currentWidth = 0;
      }

      currentTrack.appendChild(createBookEl(book, i));
      currentWidth += w;
    });
  }

  layoutShelves();

  // 화면 크기가 바뀌면(반응형 구간 전환 등) 책장을 다시 계산
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layoutShelves, 150);
  });

  function openBookModal(book, i, interactive = true) {
    const img = book.image && book.image.trim()
      ? book.image
      : placeholderDataUri(2000, 1500, book.title || `작업물 ${i + 1}`, '#f1f1f1', '#999999');

    modalImage.src = img;
    modalImage.alt = book.title || '';
    modalTitle.textContent = book.title || '';
    modalContext.textContent = book.context || '';
    modal.classList.add('is-open');
    modal.classList.toggle('modal--preview', !interactive);
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    modal.classList.remove('is-open', 'modal--preview');
    modal.setAttribute('aria-hidden', 'true');
    modalImage.src = '';
  }

  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

})();
