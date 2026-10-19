/**
 * ============================================================================
 * 天門 (CHEONMUN) 타로 심리 살롱 — 프론트엔드 메인 컨트롤러 (app.js)
 * ----------------------------------------------------------------------------
 * 1. 3D 우주 별빛 캔버스 & 인터랙티브 파티클
 * 2. 78장 아르카나 3D 부채꼴(Fan Deck) 1인칭 카드 뽑기
 * 3. 스프레드 보드 (켈틱 크로스, 3카드, 양자택일, 원카드) 3D 플립 애니메이션
 * 4. 4원소 조화도(Elemental Dignity) & 칼 융 분석심리학 3단계 내러티브 연동
 * 5. 토스페이먼츠(Toss Payments) / 포트원 결제 시뮬레이션
 * 6. 모바일 100% 반응형 E-Book 뷰어 & A4 고서적 PDF 인쇄 연동
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. 애플리케이션 상태 (State)
  // --------------------------------------------------------------------------
  const APP_STATE = {
    currentView: 'landing',
    userName: '김우주',
    domain: 'career',
    question: '지금 다니는 직장에서 번아웃이 왔습니다. 과감히 퇴사하고 새로운 분야로 이직을 시도해도 될까요?',
    spreadId: 'celtic_cross',
    sajuEnabled: false,
    sajuContext: null,
    pickedCards: [],     // Array of { cardIndex, isReversed }
    spreadResult: null,   // Output from TarotEngine.drawSpread
    flippedCards: new Set(),
    selectedProduct: 'tarot', // 'tarot' (19,500원) or 'bundle' (39,200원)
    finalPrice: 19500,
    orderId: ''
  };

  // --------------------------------------------------------------------------
  // 2. 캔버스 별빛 효과 (Cosmic Stars & Shooting Stars)
  // --------------------------------------------------------------------------
  function initStarsCanvas() {
    const canvas = document.getElementById('starsCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const starCount = Math.min(120, Math.floor((width * height) / 4500));
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.7 + 0.3,
        speed: Math.random() * 0.015 + 0.005,
        direction: Math.random() > 0.5 ? 1 : -1
      });
    }

    const shootingStars = [];

    function spawnShootingStar() {
      if (shootingStars.length < 2 && Math.random() < 0.03) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.4),
          len: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          alpha: 1
        });
      }
    }

    function renderStars() {
      ctx.clearRect(0, 0, width, height);

      // 고정 별 렌더링 & 깜빡임
      stars.forEach(s => {
        s.alpha += s.speed * s.direction;
        if (s.alpha > 0.95 || s.alpha < 0.2) {
          s.direction *= -1;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 208, 97, ${s.alpha.toFixed(2)})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(245, 208, 97, 0.4)';
        ctx.fill();
      });

      // 유성 렌더링
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        const tailX = ss.x - Math.cos(ss.angle) * ss.len;
        const tailY = ss.y - Math.sin(ss.angle) * ss.len;

        const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${ss.alpha})`);
        grad.addColorStop(1, 'rgba(245, 208, 97, 0)');

        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;
        ss.alpha -= 0.02;

        if (ss.alpha <= 0 || ss.x > width || ss.y > height) {
          shootingStars.splice(i, 1);
        }
      }

      requestAnimationFrame(renderStars);
    }

    renderStars();
  }

  // --------------------------------------------------------------------------
  // 3. 상단 프로모션 카운트다운 타이머
  // --------------------------------------------------------------------------
  function initCountdown() {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    if (!hoursEl || !minutesEl || !secondsEl) return;

    let totalSeconds = 23 * 3600 + 59 * 60 + 40;

    setInterval(() => {
      if (totalSeconds > 0) totalSeconds--;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minutesEl.textContent = String(m).padStart(2, '0');
      secondsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // --------------------------------------------------------------------------
  // 4. 소셜 프루프 실시간 알림 토스트 (Live Toast)
  // --------------------------------------------------------------------------
  function initLiveToast() {
    const toast = document.getElementById('liveToast');
    const msgEl = document.getElementById('toastMessage');
    const timeEl = document.getElementById('toastTime');
    if (!toast || !msgEl || !timeEl) return;

    const toastPresets = [
      { text: "서울 서초구 박*원 님이 <strong>'이직 켈틱 크로스 10카드'</strong>를 해독하셨습니다.", time: "방금 전" },
      { text: "부산 해운대구 이*진 님이 <strong>'재회 3카드 시간선'</strong>을 해독하셨습니다.", time: "1분 전" },
      { text: "경기 성남시 정*우 님이 <strong>'사업 양자택일 5카드'</strong>를 해독하셨습니다.", time: "2분 전" },
      { text: "대구 수성구 최*영 님이 <strong>'내면 융 심리 구조 3카드'</strong>를 해독하셨습니다.", time: "방금 전" },
      { text: "인천 연수구 강*호 님이 <strong>'사주 + 타로 통합 프리미엄'</strong>을 발급받으셨습니다.", time: "3분 전" },
      { text: "서울 강남구 한*서 님이 <strong>'오늘의 조언 원카드'</strong>를 해독하셨습니다.", time: "방금 전" }
    ];

    let index = 0;
    setInterval(() => {
      index = (index + 1) % toastPresets.length;
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(15px)';

      setTimeout(() => {
        msgEl.innerHTML = toastPresets[index].text;
        timeEl.textContent = toastPresets[index].time;
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
      }, 400);
    }, 6500);
  }

  // --------------------------------------------------------------------------
  // 5. 뷰 전환 제어 (View Switcher)
  // --------------------------------------------------------------------------
  function switchView(viewName) {
    const views = ['landing', 'shuffle', 'board', 'result', 'report'];
    views.forEach(v => {
      const el = document.getElementById(v + 'View');
      if (el) {
        if (v === viewName) {
          el.classList.remove('hidden');
          el.classList.add('active');
        } else {
          el.classList.add('hidden');
          el.classList.remove('active');
        }
      }
    });

    if (viewName === 'report') {
      document.body.classList.add('in-report-view');
    } else {
      document.body.classList.remove('in-report-view');
    }

    APP_STATE.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --------------------------------------------------------------------------
  // 6. 랜딩 뷰 폼 및 옵션 선택 제어
  // --------------------------------------------------------------------------
  function initFormControls() {
    // 도메인 라디오 선택 카드 시각화
    const domainInputs = document.querySelectorAll('input[name="tarotDomain"]');
    domainInputs.forEach(input => {
      input.addEventListener('change', () => {
        document.querySelectorAll('.domain-card').forEach(c => c.classList.remove('active'));
        input.closest('.domain-card').classList.add('active');
        APP_STATE.domain = input.value;
      });
    });

    // 스프레드 라디오 선택 카드 시각화
    const spreadInputs = document.querySelectorAll('input[name="tarotSpread"]');
    spreadInputs.forEach(input => {
      input.addEventListener('change', () => {
        document.querySelectorAll('.spread-opt-card').forEach(c => c.classList.remove('active'));
        input.closest('.spread-opt-card').classList.add('active');
        APP_STATE.spreadId = input.value;
      });
    });
  }

  // 사주 크로스 분석 토글
  function toggleSajuInput() {
    const subWrap = document.getElementById('sajuInputSubWrap');
    const toggleText = document.getElementById('sajuToggleText');
    const toggleIcon = document.getElementById('sajuToggleIcon');
    if (!subWrap) return;

    const isHidden = subWrap.classList.contains('hidden');
    if (isHidden) {
      subWrap.classList.remove('hidden');
      toggleText.textContent = "접기";
      toggleIcon.className = "fa-solid fa-chevron-up";
      APP_STATE.sajuEnabled = true;
    } else {
      subWrap.classList.add('hidden');
      toggleText.textContent = "열기";
      toggleIcon.className = "fa-solid fa-chevron-down";
      APP_STATE.sajuEnabled = false;
    }
  }

  // 예시 질문 칩 클릭
  function setPresetQuestion(btn) {
    const qText = btn.textContent.replace(/^"|"$/g, '').trim();
    const textarea = document.getElementById('userQuestion');
    if (textarea) {
      textarea.value = qText;
      textarea.focus();
    }
  }

  // 사주 일간(Day Stem) 간이 계산
  function calculateDayStem(birthDateStr) {
    if (!birthDateStr) return { dayCheongan: "갑", dayElement: "목" };
    try {
      const refDate = new Date("2000-01-01T00:00:00Z");
      const targetDate = new Date(birthDateStr + "T00:00:00Z");
      const diffDays = Math.round((targetDate - refDate) / (1000 * 60 * 60 * 24));

      const cheongan = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
      const elements = ["목", "목", "화", "화", "토", "토", "금", "금", "수", "수"];

      const stemIdx = (((4 + diffDays) % 10) + 10) % 10;
      return {
        dayCheongan: cheongan[stemIdx],
        dayElement: elements[stemIdx]
      };
    } catch (e) {
      return { dayCheongan: "갑", dayElement: "목" };
    }
  }

  // 1. 셔플 시작 버튼 핸들러
  function handleStartShuffle(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById('userName');
    const questionInput = document.getElementById('userQuestion');
    const domainInput = document.querySelector('input[name="tarotDomain"]:checked');
    const spreadInput = document.querySelector('input[name="tarotSpread"]:checked');

    APP_STATE.userName = (nameInput && nameInput.value.trim()) || '김우주';
    APP_STATE.question = (questionInput && questionInput.value.trim()) || '내 운명의 숨은 신호와 올바른 선택의 길을 묻습니다.';
    APP_STATE.domain = domainInput ? domainInput.value : 'career';
    APP_STATE.spreadId = spreadInput ? spreadInput.value : 'celtic_cross';

    // 사주 입력 여부 확인
    if (APP_STATE.sajuEnabled) {
      const bDate = document.getElementById('sajuBirthDate').value;
      const bTime = document.getElementById('sajuBirthTime').value;
      const gender = document.getElementById('sajuGender').value;
      const stemInfo = calculateDayStem(bDate);
      APP_STATE.sajuContext = {
        birthDate: bDate,
        birthTime: bTime,
        gender: gender,
        dayCheongan: stemInfo.dayCheongan,
        dayElement: stemInfo.dayElement
      };
    } else {
      APP_STATE.sajuContext = null;
    }

    APP_STATE.pickedCards = [];
    APP_STATE.flippedCards.clear();
    APP_STATE.spreadResult = null;

    initFanDeckView();
    switchView('shuffle');
  }

  // --------------------------------------------------------------------------
  // 7. VIEW 2: 78장 아르카나 3D 부채꼴(Fan Deck) 덱 & 1인칭 뽑기
  // --------------------------------------------------------------------------
  function initFanDeckView() {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.celtic_cross;
    const requiredCount = spreadMeta.cardCount;

    // 안내 텍스트 갱신
    const counterText = document.getElementById('shuffleCounterText');
    const trayCountText = document.getElementById('trayCountText');
    const trayTotalText = document.getElementById('trayTotalText');
    const btnGoToBoard = document.getElementById('btnGoToBoard');

    if (counterText) counterText.textContent = `카드를 1장씩 터치하여 골라주세요 ( 0 / ${requiredCount} )`;
    if (trayCountText) trayCountText.textContent = '0';
    if (trayTotalText) trayTotalText.textContent = String(requiredCount);
    if (btnGoToBoard) {
      btnGoToBoard.disabled = true;
      btnGoToBoard.classList.remove('glow-pulse');
    }

    // 하단 픽 트레이 슬롯 렌더링
    const trayRow = document.getElementById('pickedSlotsRow');
    if (trayRow) {
      let slotsHtml = '';
      for (let i = 0; i < requiredCount; i++) {
        const posInfo = spreadMeta.positions[i] || { name: `포지션 ${i + 1}` };
        slotsHtml += `
          <div class="tray-slot" id="traySlot_${i}">
            <span class="slot-idx">${i + 1}</span>
            <span class="slot-name">${posInfo.name.split(' ')[0]}</span>
          </div>
        `;
      }
      trayRow.innerHTML = slotsHtml;
    }

    // 78장 부채꼴 아크 덱 렌더링
    const fanStage = document.getElementById('fanDeckStage');
    if (!fanStage) return;

    fanStage.innerHTML = '';
    const totalCards = 78;
    const startAngle = -68;
    const endAngle = 68;
    const step = (endAngle - startAngle) / (totalCards - 1);

    for (let i = 0; i < totalCards; i++) {
      const angle = startAngle + i * step;
      const cardEl = document.createElement('div');
      cardEl.className = 'fan-card-item';
      cardEl.id = `fanCard_${i}`;
      cardEl.dataset.cardIndex = String(i);
      cardEl.style.setProperty('--rot', angle.toFixed(2));
      cardEl.style.transform = `translate(-50%, -50%) rotate(${angle.toFixed(2)}deg)`;
      cardEl.style.zIndex = String(i + 1);
      cardEl.style.backgroundImage = "url('assets/cards/card_back.jpg')";

      cardEl.addEventListener('click', () => handlePickFanCard(i, cardEl));
      fanStage.appendChild(cardEl);
    }
  }

  // 카드 클릭하여 뽑기
  function handlePickFanCard(cardIndex, cardEl) {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.celtic_cross;
    const requiredCount = spreadMeta.cardCount;

    if (APP_STATE.pickedCards.length >= requiredCount) return;
    if (cardEl.classList.contains('picked')) return;

    // 카드 선택 등록
    cardEl.classList.add('picked');
    const isReversed = Math.random() < 0.28; // 약 28% 역방향 확률
    const slotIdx = APP_STATE.pickedCards.length;

    APP_STATE.pickedCards.push({
      cardIndex: cardIndex,
      isReversed: isReversed
    });

    // 트레이 슬롯 업데이트
    const slotEl = document.getElementById(`traySlot_${slotIdx}`);
    if (slotEl) {
      slotEl.classList.add('filled');
      slotEl.style.backgroundImage = "url('assets/cards/card_back.jpg')";
    }

    // 카운터 업데이트
    const curCount = APP_STATE.pickedCards.length;
    const counterText = document.getElementById('shuffleCounterText');
    const trayCountText = document.getElementById('trayCountText');
    if (counterText) counterText.textContent = `카드를 1장씩 터치하여 골라주세요 ( ${curCount} / ${requiredCount} )`;
    if (trayCountText) trayCountText.textContent = String(curCount);

    // 모두 선택 완료 시
    if (curCount === requiredCount) {
      const btnGoToBoard = document.getElementById('btnGoToBoard');
      if (btnGoToBoard) {
        btnGoToBoard.disabled = false;
        btnGoToBoard.classList.add('glow-pulse');
        btnGoToBoard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (counterText) counterText.innerHTML = `✨ <strong>${requiredCount}장의 카드가 모두 선택되었습니다!</strong> 보드로 이동하세요.`;
    }
  }

  // 빠른 자동 추첨
  function handleAutoPick() {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.celtic_cross;
    const requiredCount = spreadMeta.cardCount;

    // 이미 뽑힌 인덱스 확인
    const pickedIndices = new Set(APP_STATE.pickedCards.map(p => p.cardIndex));
    const unpicked = [];
    for (let i = 0; i < 78; i++) {
      if (!pickedIndices.has(i)) unpicked.push(i);
    }

    // 셔플하여 필요한 만큼 채우기
    while (APP_STATE.pickedCards.length < requiredCount && unpicked.length > 0) {
      const randIdx = Math.floor(Math.random() * unpicked.length);
      const chosenCardIndex = unpicked.splice(randIdx, 1)[0];
      const cardEl = document.getElementById(`fanCard_${chosenCardIndex}`);
      if (cardEl) {
        handlePickFanCard(chosenCardIndex, cardEl);
      }
    }
  }

  // 스프레드 보드로 이동
  function goToSpreadBoard() {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.celtic_cross;
    const requiredCount = spreadMeta.cardCount;

    if (APP_STATE.pickedCards.length < requiredCount) {
      handleAutoPick();
    }

    // TarotEngine.drawSpread 호출 및 실제 카드 매핑
    const chosenIndices = APP_STATE.pickedCards.map(p => p.cardIndex);
    APP_STATE.spreadResult = TarotEngine.drawSpread(APP_STATE.spreadId, chosenIndices, 0.28);

    // 사용자가 선택한 정/역방향 동기화
    APP_STATE.pickedCards.forEach((p, idx) => {
      if (APP_STATE.spreadResult.cards[idx]) {
        APP_STATE.spreadResult.cards[idx].isReversed = p.isReversed;
      }
    });

    renderSpreadBoard();
    switchView('board');
  }

  // --------------------------------------------------------------------------
  // 8. VIEW 3: 스프레드 보드 렌더링 & 3D 플립 애니메이션
  // --------------------------------------------------------------------------
  function renderSpreadBoard() {
    const mat = document.getElementById('spreadClothMat');
    if (!mat || !APP_STATE.spreadResult) return;

    const spreadMeta = APP_STATE.spreadResult.spread;
    const cards = APP_STATE.spreadResult.cards;

    // 상단 헤더 텍스트 갱신
    const badgeEl = document.getElementById('boardSpreadBadge');
    const titleEl = document.getElementById('boardTitle');
    const descEl = document.getElementById('boardDesc');

    if (badgeEl) badgeEl.textContent = `${spreadMeta.nameKo} (${spreadMeta.cardCount}장)`;
    if (titleEl) titleEl.textContent = `"${APP_STATE.userName} 님의 질문에 대한 우주의 배치도"`;
    if (descEl) descEl.textContent = `"${APP_STATE.question}" 에 대한 78장 아르카나의 영적 포지션입니다. 카드를 탭하여 앞면을 확인하세요.`;

    // 퀵 프리뷰 초기화
    const prevBar = document.getElementById('cardPreviewContent');
    if (prevBar) {
      prevBar.innerHTML = `<strong>카드를 터치해보세요!</strong> 각 카드가 가리키는 융 심리학적 무의식 메시지가 나타납니다.`;
    }

    mat.innerHTML = '';

    // 플립 카드 헬퍼 렌더 함수
    function createFlipCardHtml(cardItem, idx, isCrossing = false) {
      const c = cardItem.card;
      const isRev = cardItem.isReversed;
      const pos = cardItem.position;
      return `
        <div class="tarot-flip-card ${isCrossing ? 'crossing' : ''}" id="flipCard_${idx}" onclick="handleCardFlip(${idx})" title="${pos.name}: 클릭하여 확인">
          <div class="flip-card-inner">
            <div class="flip-card-back"></div>
            <div class="flip-card-front">
              <img src="${c.image}" alt="${c.nameKo}" loading="lazy" />
            </div>
          </div>
          <div class="card-pos-label">${pos.name.split(' ')[0]}</div>
        </div>
      `;
    }

    // 1) 켈틱 크로스 10카드 레이아웃
    if (spreadMeta.id === 'celtic_cross') {
      mat.innerHTML = `
        <div class="celtic-cross-layout">
          <!-- 왼쪽 3x3 십자가 영역 -->
          <div class="celtic-cross-center">
            <div class="c-slot-crown">${createFlipCardHtml(cards[4], 4)}</div>
            <div class="c-slot-past">${createFlipCardHtml(cards[3], 3)}</div>
            <div class="c-slot-center">
              ${createFlipCardHtml(cards[0], 0)}
              ${createFlipCardHtml(cards[1], 1, true)}
            </div>
            <div class="c-slot-future">${createFlipCardHtml(cards[5], 5)}</div>
            <div class="c-slot-found">${createFlipCardHtml(cards[2], 2)}</div>
          </div>

          <!-- 오른쪽 기둥(Staff) 4단 영역 -->
          <div class="celtic-pillar-col">
            ${createFlipCardHtml(cards[9], 9)}
            ${createFlipCardHtml(cards[8], 8)}
            ${createFlipCardHtml(cards[7], 7)}
            ${createFlipCardHtml(cards[6], 6)}
          </div>
        </div>
      `;
    }
    // 2) 3카드 스프레드 (시간선 또는 심리구조)
    else if (spreadMeta.id === 'three_timeline' || spreadMeta.id === 'three_mind') {
      mat.innerHTML = `
        <div class="three-cards-layout">
          ${createFlipCardHtml(cards[0], 0)}
          ${createFlipCardHtml(cards[1], 1)}
          ${createFlipCardHtml(cards[2], 2)}
        </div>
      `;
    }
    // 3) 양자택일 5카드
    else if (spreadMeta.id === 'two_choice') {
      mat.innerHTML = `
        <div class="two-choice-layout">
          <div class="choice-center-row">
            ${createFlipCardHtml(cards[0], 0)}
          </div>
          <div class="two-choice-branches">
            <div class="choice-branch-col">
              <span class="branch-badge">선택 A (진행 및 귀결)</span>
              ${createFlipCardHtml(cards[1], 1)}
              ${createFlipCardHtml(cards[2], 2)}
            </div>
            <div class="choice-branch-col">
              <span class="branch-badge">선택 B (진행 및 귀결)</span>
              ${createFlipCardHtml(cards[3], 3)}
              ${createFlipCardHtml(cards[4], 4)}
            </div>
          </div>
        </div>
      `;
    }
    // 4) 원카드 (Single)
    else {
      mat.innerHTML = `
        <div class="three-cards-layout" style="justify-content: center;">
          ${createFlipCardHtml(cards[0], 0)}
        </div>
      `;
    }
  }

  // 카드 개별 뒤집기 (플립)
  function handleCardFlip(cardIndex) {
    const cardEl = document.getElementById(`flipCard_${cardIndex}`);
    if (!cardEl || !APP_STATE.spreadResult) return;

    const cardItem = APP_STATE.spreadResult.cards[cardIndex];
    if (!cardItem) return;

    const isFlipped = cardEl.classList.contains('flipped');

    if (!isFlipped) {
      cardEl.classList.add('flipped');
      if (cardItem.isReversed) {
        cardEl.classList.add('reversed');
      }
      APP_STATE.flippedCards.add(cardIndex);
    } else {
      cardEl.classList.remove('flipped');
      cardEl.classList.remove('reversed');
      APP_STATE.flippedCards.delete(cardIndex);
    }

    // 인라인 프리뷰 툴팁 갱신
    const c = cardItem.card;
    const isRev = cardItem.isReversed;
    const dirKo = isRev ? "역방향" : "정방향";
    const dirClass = isRev ? "text-danger" : "text-success";
    const textObj = isRev ? c.reversed : c.upright;
    const domainText = textObj[APP_STATE.domain] || textObj.core;

    const prevContent = document.getElementById('cardPreviewContent');
    if (prevContent) {
      prevContent.innerHTML = `
        <strong>[포지션: ${cardItem.position.name}]</strong>
        <span class="preview-name">${c.nameKo} <span class="${dirClass}">(${dirKo})</span></span> — 
        <em>"${textObj.core.slice(0, 100)}..."</em>
      `;
    }
  }

  // 모든 카드 한 번에 뒤집기
  function flipAllCards() {
    if (!APP_STATE.spreadResult) return;
    const cards = APP_STATE.spreadResult.cards;

    cards.forEach((item, idx) => {
      setTimeout(() => {
        const cardEl = document.getElementById(`flipCard_${idx}`);
        if (cardEl && !cardEl.classList.contains('flipped')) {
          cardEl.classList.add('flipped');
          if (item.isReversed) {
            cardEl.classList.add('reversed');
          }
          APP_STATE.flippedCards.add(idx);
        }
      }, idx * 120);
    });
  }

  // --------------------------------------------------------------------------
  // 9. VIEW 4: 결과 대시보드 및 결제란 연동
  // --------------------------------------------------------------------------
  function proceedToResultView() {
    if (!APP_STATE.spreadResult) return;

    // 만약 안 뒤집힌 카드가 있다면 모두 뒤집기
    flipAllCards();

    const cards = APP_STATE.spreadResult.cards;
    const dignity = TarotEngine.calculateElementalDignity(cards);
    const reading = TarotEngine.generatePsychologicalReading(
      APP_STATE.domain,
      APP_STATE.question,
      APP_STATE.spreadResult,
      APP_STATE.sajuContext
    );

    // 결과 뷰 텍스트 갱신
    const resDominantEl = document.getElementById('resDominantEl');
    const resOneLineSummary = document.getElementById('resOneLineSummary');
    const resCriticQuote = document.getElementById('resCriticQuote');
    const resDignityBox = document.getElementById('resDignityBox');

    if (resDominantEl) {
      resDominantEl.textContent = `${dignity.dominant.meta.ko}`;
    }
    if (resOneLineSummary) {
      resOneLineSummary.textContent = `${dignity.synergyTitle} — ${dignity.synergyDesc}`;
    }
    if (resCriticQuote) {
      resCriticQuote.textContent = `"${reading.blindSpot}"`;
    }

    // 4원소 조화도 프리뷰 그리드 렌더링
    if (resDignityBox) {
      resDignityBox.innerHTML = `
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--gold-primary); margin-bottom: 12px;">
          <i class="fa-solid fa-atom"></i> 내면의 4원소 심리 기능 맵 (Elemental Dignities)
        </h4>
        <div class="elements-stat-grid">
          <div class="el-stat-col fire">
            <div class="el-head"><i class="fa-solid fa-fire"></i> 불 (Fire)</div>
            <div class="el-jung">직관 · 열정</div>
            <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.fire}%;"></div></div>
            <div class="el-pct">${dignity.counts.fire}장 (${dignity.percentages.fire}%)</div>
          </div>
          <div class="el-stat-col water">
            <div class="el-head"><i class="fa-solid fa-water"></i> 물 (Water)</div>
            <div class="el-jung">감정 · 관계</div>
            <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.water}%;"></div></div>
            <div class="el-pct">${dignity.counts.water}장 (${dignity.percentages.water}%)</div>
          </div>
          <div class="el-stat-col air">
            <div class="el-head"><i class="fa-solid fa-wind"></i> 공기 (Air)</div>
            <div class="el-jung">사고 · 결단</div>
            <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.air}%;"></div></div>
            <div class="el-pct">${dignity.counts.air}장 (${dignity.percentages.air}%)</div>
          </div>
          <div class="el-stat-col earth">
            <div class="el-head"><i class="fa-solid fa-mountain"></i> 흙 (Earth)</div>
            <div class="el-jung">감각 · 현실</div>
            <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.earth}%;"></div></div>
            <div class="el-pct">${dignity.counts.earth}장 (${dignity.percentages.earth}%)</div>
          </div>
        </div>
      `;
    }

    switchView('result');
  }

  // 결제 상품 전환 (단독 vs 통합권)
  function toggleTarotProduct(prodType) {
    const cardTarot = document.getElementById('repCard_tarot');
    const cardBundle = document.getElementById('repCard_bundle');
    const priceText = document.getElementById('tarotFinalPrice');
    const payBtnText = document.getElementById('payBtnText');

    APP_STATE.selectedProduct = prodType;

    if (prodType === 'bundle') {
      if (cardTarot) {
        cardTarot.classList.remove('active');
        cardTarot.setAttribute('aria-checked', 'false');
      }
      if (cardBundle) {
        cardBundle.classList.add('active');
        cardBundle.setAttribute('aria-checked', 'true');
      }
      APP_STATE.finalPrice = 39200;
      if (priceText) priceText.textContent = '39,200원';
      if (payBtnText) payBtnText.textContent = '39,200원 안전 결제하고 리포트 열람';
    } else {
      if (cardTarot) {
        cardTarot.classList.add('active');
        cardTarot.setAttribute('aria-checked', 'true');
      }
      if (cardBundle) {
        cardBundle.classList.remove('active');
        cardBundle.setAttribute('aria-checked', 'false');
      }
      APP_STATE.finalPrice = 19500;
      if (priceText) priceText.textContent = '19,500원';
      if (payBtnText) payBtnText.textContent = '19,500원 안전 결제하고 리포트 열람';
    }
  }

  // 토스페이먼츠 / 포트원 결제 트리거
  function triggerTarotPayment() {
    const refundCheck = document.getElementById('refundNoticeCheck');
    if (refundCheck && !refundCheck.checked) {
      alert('디지털 콘텐츠 열람 개시 후 환불 불가 동의에 체크해주세요.');
      refundCheck.focus();
      return;
    }

    const payButton = document.getElementById('payButton');
    const originalText = payButton.innerHTML;
    payButton.disabled = true;
    payButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 결제 모듈 호출 및 암호화 인증 중...`;

    // 1초 뒤 결제 성공 및 리포트 발급
    setTimeout(() => {
      payButton.disabled = false;
      payButton.innerHTML = originalText;

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
      const randNum = Math.floor(1000 + Math.random() * 9000);
      APP_STATE.orderId = `TM-TAROT-${dateStr}-${randNum}`;

      generateAndDisplayReport();
    }, 1100);
  }

  // --------------------------------------------------------------------------
  // 10. VIEW 5: 프리미엄 타로 감명서 생성 및 렌더링
  // --------------------------------------------------------------------------
  function generateAndDisplayReport() {
    const bookWrapper = document.getElementById('tarotBookWrapper');
    if (!bookWrapper || !APP_STATE.spreadResult) return;

    const issueDateStr = new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const readingData = {
      userName: APP_STATE.userName,
      domain: APP_STATE.domain,
      question: APP_STATE.question,
      spreadResult: APP_STATE.spreadResult,
      sajuContext: APP_STATE.sajuContext,
      orderId: APP_STATE.orderId,
      issueDate: issueDateStr
    };

    // TarotReportBuilder를 통해 전체 HTML 조립
    const reportHtml = TarotReportBuilder.buildTarotReportHtml(readingData);
    bookWrapper.innerHTML = reportHtml;

    // 상단 툴바 타이틀 갱신
    const barUserName = document.getElementById('reportBarUserName');
    if (barUserName) {
      barUserName.textContent = `${APP_STATE.userName} 님의 타로 비서`;
    }

    switchView('report');
  }

  // 리포트 PDF 저장 / 인쇄
  function downloadOrPrintReport() {
    window.print();
  }

  // 리포트 공유하기
  function shareReport() {
    if (navigator.share) {
      navigator.share({
        title: `${APP_STATE.userName} 님의 천문(天文) 타로 심층 감명서`,
        text: `칼 융 분석심리학과 78장 아르카나 무의식 해독 결과`,
        url: window.location.href
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('감명서 링크가 클립보드에 복사되었습니다.');
    }
  }

  // --------------------------------------------------------------------------
  // 11. 초기화 구동 (Initialization)
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initStarsCanvas();
    initCountdown();
    initLiveToast();
    initFormControls();
  });

  // 전역 노출 함수
  window.switchView = switchView;
  window.toggleSajuInput = toggleSajuInput;
  window.setPresetQuestion = setPresetQuestion;
  window.handleStartShuffle = handleStartShuffle;
  window.handlePickFanCard = handlePickFanCard;
  window.handleAutoPick = handleAutoPick;
  window.goToSpreadBoard = goToSpreadBoard;
  window.handleCardFlip = handleCardFlip;
  window.flipAllCards = flipAllCards;
  window.proceedToResultView = proceedToResultView;
  window.toggleTarotProduct = toggleTarotProduct;
  window.triggerTarotPayment = triggerTarotPayment;
  window.downloadOrPrintReport = downloadOrPrintReport;
  window.shareReport = shareReport;

})();
