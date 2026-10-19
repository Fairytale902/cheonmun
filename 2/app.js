/**
 * ============================================================================
 * 天門 (CHEONMUN) 타로 살롱 — 상황별 정통 스프레드 메인 컨트롤러 (app.js)
 * ----------------------------------------------------------------------------
 * 1. 6대 고민 상황별 전용 정통 스프레드(배치법) 선택 & 포지션 설계도 프리뷰
 * 2. 포지션 인식형 78장 부채꼴(Fan Deck) 1인칭 카드 뽑기 (현재 뽑는 자리 질문 실시간 안내)
 * 3. 6종 정통 스프레드 기하학적 보드 배치 (브릿지, 미러, V-갈림길, 호스슈, 다이아몬드, 켈틱 크로스)
 * 4. 뽑은 카드 & 스프레드 맥락이 결합된 고서적 A4 PDF 감명서 생성 및 인쇄
 * ============================================================================
 */

(function () {
  'use strict';

  // 상황 키 ➔ 스프레드 ID 매핑
  const SITUATION_TO_SPREAD = {
    reunion: 'reunion',
    romance: 'romance',
    choice: 'choice',
    career: 'career',
    wealth: 'wealth',
    celtic: 'celtic'
  };

  // --------------------------------------------------------------------------
  // 1. 애플리케이션 상태 (State)
  // --------------------------------------------------------------------------
  const APP_STATE = {
    currentView: 'landing',
    userName: '김우주',
    situation: 'career',
    domain: 'career',
    spreadId: 'career',
    question: '지금 다니는 직장에서 번아웃이 왔습니다. 과감히 퇴사하고 새로운 분야로 이직을 시도해도 될까요?',
    pickedCards: [],     // Array of { cardIndex, isReversed }
    spreadResult: null,  // Output from TarotEngine.drawSpread
    flippedCards: new Set(),
    selectedProduct: 'tarot',
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
  // 3. 소셜 프루프 실시간 알림 토스트
  // --------------------------------------------------------------------------
  function initLiveToast() {
    const toast = document.getElementById('liveToast');
    const msgEl = document.getElementById('toastMessage');
    const timeEl = document.getElementById('toastTime');
    if (!toast || !msgEl || !timeEl) return;

    const toastPresets = [
      { text: "서울 서초구 박*원 님이 <strong>'호스슈 커리어 7카드 스프레드'</strong> PDF 감명서를 발급받으셨습니다.", time: "방금 전" },
      { text: "부산 해운대구 이*진 님이 <strong>'재회 릴레이션십 브릿지 7카드'</strong>를 해독하셨습니다.", time: "1분 전" },
      { text: "경기 성남시 정*우 님이 <strong>'운명의 갈림길 양자택일 7카드'</strong>를 해독하셨습니다.", time: "2분 전" },
      { text: "대구 수성구 최*영 님이 <strong>'러버스 미러 속마음 6카드'</strong>를 해독하셨습니다.", time: "방금 전" },
      { text: "인천 연수구 강*호 님이 <strong>'정통 켈틱 크로스 10카드'</strong> 완역본을 저장하셨습니다.", time: "3분 전" },
      { text: "서울 강남구 한*서 님이 <strong>'펜타클 다이아몬드 재물 6카드'</strong>를 해독하셨습니다.", time: "방금 전" }
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
  // 4. 뷰 전환 제어 (View Switcher)
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
  // 5. STEP 1: 6대 상황별 정통 스프레드 선택 및 실시간 설계도 프리뷰 갱신
  // --------------------------------------------------------------------------
  function initFormControls() {
    const sitCards = document.querySelectorAll('.situation-card');
    sitCards.forEach(card => {
      card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        sitCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const catKey = card.dataset.category || 'career';
        const spreadKey = SITUATION_TO_SPREAD[catKey] || 'career';

        APP_STATE.situation = catKey;
        APP_STATE.spreadId = spreadKey;
        updateSpreadPreviewPanel(spreadKey, true);
      });
    });

    // 초기 기본 스프레드(career) 프리뷰 렌더링
    updateSpreadPreviewPanel(APP_STATE.spreadId, false);
  }

  function updateSpreadPreviewPanel(spreadId, updateQuestionText = false) {
    const spreadMeta = TarotEngine.SPREADS[spreadId] || TarotEngine.SPREADS.career;
    APP_STATE.domain = spreadMeta.domain || 'career';

    const titleEl = document.getElementById('sppSpreadTitle');
    const countBadgeEl = document.getElementById('sppCardCountBadge');
    const descEl = document.getElementById('sppSpreadDesc');
    const posGridEl = document.getElementById('sppPositionsGrid');
    const chipsListEl = document.getElementById('presetChipsList');
    const startBtnText = document.getElementById('startShuffleBtnText');
    const textarea = document.getElementById('userQuestion');

    if (titleEl) {
      titleEl.textContent = `${spreadMeta.nameKo}`;
    }
    if (countBadgeEl) {
      countBadgeEl.textContent = `총 ${spreadMeta.cardCount}장의 카드를 뽑습니다`;
    }
    if (descEl) {
      descEl.textContent = spreadMeta.desc || spreadMeta.description || '';
    }
    if (startBtnText) {
      startBtnText.textContent = `${spreadMeta.nameKo} 셔플 & 포지션별 카드 뽑기`;
    }

    // 포지션 목록 렌더링
    if (posGridEl) {
      posGridEl.innerHTML = spreadMeta.positions.map((pos, i) => `
        <div class="spp-pos-item">
          <span class="spp-pos-num">포지션 ${i + 1}</span>
          <strong class="spp-pos-name">${pos.name.replace(/^\d+\.\s*/, '')}</strong>
          <span class="spp-pos-q">"${pos.question}"</span>
        </div>
      `).join('');
    }

    // 추천 질문 칩 렌더링
    if (chipsListEl && spreadMeta.presetQuestions) {
      chipsListEl.innerHTML = spreadMeta.presetQuestions.map(q => `
        <button type="button" class="q-chip" onclick="setPresetQuestion(this)">"${q}"</button>
      `).join('');

      if (updateQuestionText && textarea && spreadMeta.presetQuestions[0]) {
        textarea.value = spreadMeta.presetQuestions[0];
      }
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

  // 셔플 시작 핸들러
  function handleStartShuffle(event) {
    if (event) event.preventDefault();

    const nameInput = document.getElementById('userName');
    const questionInput = document.getElementById('userQuestion');
    const sitInput = document.querySelector('input[name="tarotSituation"]:checked');

    APP_STATE.userName = (nameInput && nameInput.value.trim()) || '김우주';
    APP_STATE.question = (questionInput && questionInput.value.trim()) || '내 운명의 숨은 신호와 올바른 선택의 길을 묻습니다.';

    if (sitInput) {
      APP_STATE.situation = sitInput.value;
      APP_STATE.spreadId = SITUATION_TO_SPREAD[sitInput.value] || APP_STATE.spreadId;
    }

    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.career;
    APP_STATE.domain = spreadMeta.domain || 'career';

    APP_STATE.pickedCards = [];
    APP_STATE.flippedCards.clear();
    APP_STATE.spreadResult = null;

    initFanDeckView();
    switchView('shuffle');
  }

  // --------------------------------------------------------------------------
  // 6. VIEW 2: 포지션 인식형 78장 부채꼴(Fan Deck) 1인칭 카드 뽑기
  // --------------------------------------------------------------------------
  function initFanDeckView() {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.career;
    const requiredCount = spreadMeta.cardCount;

    const traySpreadName = document.getElementById('traySpreadName');
    const trayCountText = document.getElementById('trayCountText');
    const trayTotalText = document.getElementById('trayTotalText');
    const btnGoToBoard = document.getElementById('btnGoToBoard');

    if (traySpreadName) traySpreadName.textContent = spreadMeta.nameKo;
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
        const posInfo = spreadMeta.positions[i] || { name: `포지션 ${i + 1}`, shortName: `${i + 1}. 자리` };
        slotsHtml += `
          <div class="tray-slot ${i === 0 ? 'current-target' : ''}" id="traySlot_${i}">
            <span class="slot-idx">POS ${i + 1}</span>
            <span class="slot-name">${posInfo.shortName ? posInfo.shortName.replace(/^\d+\.\s*/, '') : posInfo.name}</span>
          </div>
        `;
      }
      trayRow.innerHTML = slotsHtml;
    }

    // 현재 뽑을 포지션 안내 배너 초기화
    updateCurrentPositionPrompt();

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
      cardEl.style.backgroundImage = "url('/2/assets/cards/card_back.jpg')";

      cardEl.addEventListener('click', () => handlePickFanCard(i, cardEl));
      fanStage.appendChild(cardEl);
    }
  }

  // 현재 몇 번째 포지션의 카드를 뽑고 있는지 상단 프롬프트 실시간 갱신
  function updateCurrentPositionPrompt() {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.career;
    const requiredCount = spreadMeta.cardCount;
    const curIdx = APP_STATE.pickedCards.length;

    const counterText = document.getElementById('shuffleCounterText');
    const stepBadge = document.getElementById('cppStepBadge');
    const headingEl = document.getElementById('shuffleHeading');
    const subHeadingEl = document.getElementById('shuffleSubHeading');
    const promptBox = document.getElementById('currentPosPromptBox');

    // 트레이 슬롯 타겟 하이라이트 업데이트
    for (let i = 0; i < requiredCount; i++) {
      const sEl = document.getElementById(`traySlot_${i}`);
      if (sEl) {
        if (i === curIdx) sEl.classList.add('current-target');
        else sEl.classList.remove('current-target');
      }
    }

    if (curIdx < requiredCount) {
      const pos = spreadMeta.positions[curIdx];
      if (counterText) {
        counterText.textContent = `포지션별 카드를 1장씩 선택해주세요 ( ${curIdx} / ${requiredCount} )`;
      }
      if (stepBadge) {
        stepBadge.textContent = `지금 뽑으실 자리: 포지션 ${curIdx + 1} / ${requiredCount}`;
      }
      if (headingEl) {
        headingEl.textContent = pos.name;
      }
      if (subHeadingEl) {
        subHeadingEl.textContent = `"${pos.question}" — 이 질문을 마음속으로 떠올리며 직관이 이끄는 카드를 선택하세요.`;
      }
      if (promptBox) {
        promptBox.classList.remove('completed');
      }
    } else {
      if (counterText) {
        counterText.innerHTML = `✨ <strong>${requiredCount}개의 스프레드 포지션 카드가 모두 선택되었습니다!</strong>`;
      }
      if (stepBadge) {
        stepBadge.textContent = `선택 완료 (${requiredCount} / ${requiredCount})`;
      }
      if (headingEl) {
        headingEl.textContent = `${spreadMeta.nameKo}의 모든 자리가 채워졌습니다`;
      }
      if (subHeadingEl) {
        subHeadingEl.textContent = `아래 [스프레드 보드에 배치하기] 버튼을 눌러 당신이 뽑은 카드들을 확인하십시오.`;
      }
      if (promptBox) {
        promptBox.classList.add('completed');
      }
    }
  }

  // 카드 1장 클릭하여 뽑기
  function handlePickFanCard(cardIndex, cardEl) {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.career;
    const requiredCount = spreadMeta.cardCount;

    if (APP_STATE.pickedCards.length >= requiredCount) return;
    if (cardEl.classList.contains('picked')) return;

    cardEl.classList.add('picked');
    const isReversed = Math.random() < 0.28;
    const slotIdx = APP_STATE.pickedCards.length;

    APP_STATE.pickedCards.push({
      cardIndex: cardIndex,
      isReversed: isReversed
    });

    const slotEl = document.getElementById(`traySlot_${slotIdx}`);
    if (slotEl) {
      slotEl.classList.add('filled');
      slotEl.style.backgroundImage = "url('/2/assets/cards/card_back.jpg')";
    }

    const curCount = APP_STATE.pickedCards.length;
    const trayCountText = document.getElementById('trayCountText');
    if (trayCountText) trayCountText.textContent = String(curCount);

    updateCurrentPositionPrompt();

    if (curCount === requiredCount) {
      const btnGoToBoard = document.getElementById('btnGoToBoard');
      if (btnGoToBoard) {
        btnGoToBoard.disabled = false;
        btnGoToBoard.classList.add('glow-pulse');
        btnGoToBoard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  // 남은 포지션 자동 추첨
  function handleAutoPick() {
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.career;
    const requiredCount = spreadMeta.cardCount;

    const pickedIndices = new Set(APP_STATE.pickedCards.map(p => p.cardIndex));
    const unpicked = [];
    for (let i = 0; i < 78; i++) {
      if (!pickedIndices.has(i)) unpicked.push(i);
    }

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
    const spreadMeta = TarotEngine.SPREADS[APP_STATE.spreadId] || TarotEngine.SPREADS.career;
    const requiredCount = spreadMeta.cardCount;

    if (APP_STATE.pickedCards.length < requiredCount) {
      handleAutoPick();
    }

    const chosenIndices = APP_STATE.pickedCards.map(p => p.cardIndex);
    APP_STATE.spreadResult = TarotEngine.drawSpread(APP_STATE.spreadId, chosenIndices, 0.28);

    APP_STATE.pickedCards.forEach((p, idx) => {
      if (APP_STATE.spreadResult.cards[idx]) {
        APP_STATE.spreadResult.cards[idx].isReversed = p.isReversed;
      }
    });

    renderSpreadBoard();
    switchView('board');
  }

  // --------------------------------------------------------------------------
  // 7. VIEW 3: 6종 정통 스프레드 기하학적 보드 렌더링 & 3D 플립
  // --------------------------------------------------------------------------
  function renderSpreadBoard() {
    const mat = document.getElementById('spreadClothMat');
    if (!mat || !APP_STATE.spreadResult) return;

    const spreadMeta = APP_STATE.spreadResult.spread;
    const cards = APP_STATE.spreadResult.cards;
    const layout = spreadMeta.layoutType || spreadMeta.id;

    const badgeEl = document.getElementById('boardSpreadBadge');
    const titleEl = document.getElementById('boardTitle');
    const descEl = document.getElementById('boardDesc');

    if (badgeEl) badgeEl.textContent = `${spreadMeta.nameKo} (${spreadMeta.cardCount}장)`;
    if (titleEl) titleEl.textContent = `"${APP_STATE.userName} 님이 뽑으신 【${spreadMeta.nameKo}】 배치도"`;
    if (descEl) descEl.textContent = `"${APP_STATE.question}" — 카드를 탭하여 앞면을 뒤집어보세요.`;

    const prevBar = document.getElementById('cardPreviewContent');
    if (prevBar) {
      prevBar.innerHTML = `<strong>배치된 카드를 터치해보세요!</strong> 각 포지션의 핵심 질문과 뽑힌 아르카나의 상징이 나타납니다.`;
    }

    function createFlipCardHtml(cardItem, idx, isCrossing = false) {
      if (!cardItem) return '';
      const c = cardItem.card;
      const pos = cardItem.position;
      const shortLabel = pos.shortName || `${idx + 1}. ${pos.name.split(' ')[0]}`;
      return `
        <div class="tarot-flip-card ${isCrossing ? 'crossing' : ''}" id="flipCard_${idx}" onclick="handleCardFlip(${idx})" title="${pos.name}: 클릭하여 뒤집기">
          <div class="flip-card-inner">
            <div class="flip-card-back"></div>
            <div class="flip-card-front">
              <img src="${c.image}" alt="${c.nameKo}" loading="lazy" />
            </div>
          </div>
          <div class="card-pos-label">${shortLabel}</div>
        </div>
      `;
    }

    // 1) 재회 릴레이션십 브릿지 7카드 (bridge_7)
    if (layout === 'bridge_7') {
      mat.innerHTML = `
        <div class="board-bridge-layout">
          <div class="b-bridge-col">
            <div class="b-col-tag">나의 영역 (현재 마음 / 장애물)</div>
            ${createFlipCardHtml(cards[1], 1)}
            ${createFlipCardHtml(cards[4], 4)}
          </div>
          <div class="b-bridge-col center">
            <div class="b-col-tag">이별 원인 ➔ 연락 파장 ➔ 최종 귀결</div>
            ${createFlipCardHtml(cards[0], 0)}
            ${createFlipCardHtml(cards[5], 5)}
            ${createFlipCardHtml(cards[6], 6)}
          </div>
          <div class="b-bridge-col">
            <div class="b-col-tag">상대방 영역 (표면 태도 / 무의식 속마음)</div>
            ${createFlipCardHtml(cards[2], 2)}
            ${createFlipCardHtml(cards[3], 3)}
          </div>
        </div>
      `;
    }
    // 2) 연애 러버스 미러 6카드 (mirror_6)
    else if (layout === 'mirror_6') {
      mat.innerHTML = `
        <div class="board-mirror-layout">
          <div class="b-mirror-row">
            ${createFlipCardHtml(cards[0], 0)}
            <div class="b-mirror-divider"><i class="fa-solid fa-arrows-left-right"></i><span>시선의 거울 대칭</span></div>
            ${createFlipCardHtml(cards[1], 1)}
          </div>
          <div class="b-mirror-row">
            ${createFlipCardHtml(cards[2], 2)}
            <div class="b-mirror-divider"><i class="fa-solid fa-heart-pulse"></i><span>속마음 & 암초</span></div>
            ${createFlipCardHtml(cards[3], 3)}
          </div>
          <div class="b-mirror-row">
            ${createFlipCardHtml(cards[4], 4)}
            <div class="b-mirror-divider"><i class="fa-solid fa-arrow-right"></i><span>공략 열쇠 ➔ 미래</span></div>
            ${createFlipCardHtml(cards[5], 5)}
          </div>
        </div>
      `;
    }
    // 3) 양자택일 V자 갈림길 7카드 (v_choice_7)
    else if (layout === 'v_choice_7') {
      mat.innerHTML = `
        <div class="two-choice-layout">
          <div class="two-choice-branches">
            <div class="choice-branch-col">
              <span class="branch-badge">선택 A 경로 (진행 · 대가 · 결과)</span>
              <div class="branch-cards-row">
                ${createFlipCardHtml(cards[1], 1)}
                ${createFlipCardHtml(cards[2], 2)}
                ${createFlipCardHtml(cards[3], 3)}
              </div>
            </div>
            <div class="choice-branch-col">
              <span class="branch-badge">선택 B 경로 (진행 · 대가 · 결과)</span>
              <div class="branch-cards-row">
                ${createFlipCardHtml(cards[4], 4)}
                ${createFlipCardHtml(cards[5], 5)}
                ${createFlipCardHtml(cards[6], 6)}
              </div>
            </div>
          </div>
          <div class="choice-center-row">
            <span class="branch-badge gold">갈림길의 중심 (현재 나의 내면)</span>
            ${createFlipCardHtml(cards[0], 0)}
          </div>
        </div>
      `;
    }
    // 4) 커리어 말굽 호스슈 7카드 (horseshoe_7)
    else if (layout === 'horseshoe_7') {
      mat.innerHTML = `
        <div class="board-horseshoe-layout">
          <div class="hs-tier tier-top">
            ${createFlipCardHtml(cards[2], 2)}
            ${createFlipCardHtml(cards[3], 3)}
            ${createFlipCardHtml(cards[4], 4)}
          </div>
          <div class="hs-tier tier-mid">
            ${createFlipCardHtml(cards[1], 1)}
            ${createFlipCardHtml(cards[5], 5)}
          </div>
          <div class="hs-tier tier-bot">
            ${createFlipCardHtml(cards[0], 0)}
            ${createFlipCardHtml(cards[6], 6)}
          </div>
        </div>
      `;
    }
    // 5) 재물 펜타클 다이아몬드 6카드 (diamond_6)
    else if (layout === 'diamond_6') {
      mat.innerHTML = `
        <div class="board-diamond-layout">
          <div class="dm-row top">
            ${createFlipCardHtml(cards[4], 4)}
          </div>
          <div class="dm-row mid">
            ${createFlipCardHtml(cards[2], 2)}
            <div class="dm-center-pair">
              ${createFlipCardHtml(cards[0], 0)}
              ${createFlipCardHtml(cards[1], 1)}
            </div>
            ${createFlipCardHtml(cards[3], 3)}
          </div>
          <div class="dm-row bot">
            ${createFlipCardHtml(cards[5], 5)}
          </div>
        </div>
      `;
    }
    // 6) 정통 켈틱 크로스 10카드 (celtic_10)
    else {
      mat.innerHTML = `
        <div class="celtic-cross-layout">
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
          <div class="celtic-pillar-col">
            ${createFlipCardHtml(cards[9], 9)}
            ${createFlipCardHtml(cards[8], 8)}
            ${createFlipCardHtml(cards[7], 7)}
            ${createFlipCardHtml(cards[6], 6)}
          </div>
        </div>
      `;
    }
  }

  // 카드 개별 뒤집기
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

    const c = cardItem.card;
    const isRev = cardItem.isReversed;
    const dirKo = isRev ? "역방향(Reversed)" : "정방향(Upright)";
    const dirClass = isRev ? "text-danger" : "text-success";
    const textObj = isRev ? c.reversed : c.upright;

    const prevContent = document.getElementById('cardPreviewContent');
    if (prevContent) {
      prevContent.innerHTML = `
        <div>
          <strong>[${cardItem.position.name}]</strong> <span class="preview-q">"${cardItem.position.question}"</span><br>
          <span class="preview-name">➔ ${c.nameKo} <span class="${dirClass}">(${dirKo})</span>:</span>
          <em>"${textObj.core.slice(0, 115)}..."</em>
        </div>
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
      }, idx * 100);
    });
  }

  // --------------------------------------------------------------------------
  // 8. VIEW 4: 스프레드 1차 판독 요약 & 토스페이먼츠 PDF 감명서 발급 연동
  // --------------------------------------------------------------------------
  function proceedToResultView() {
    if (!APP_STATE.spreadResult) return;

    flipAllCards();

    const spreadMeta = APP_STATE.spreadResult.spread;
    const cards = APP_STATE.spreadResult.cards;
    const dignity = TarotEngine.calculateElementalDignity(cards);
    const reading = TarotEngine.generatePsychologicalReading(
      APP_STATE.domain,
      APP_STATE.question,
      APP_STATE.spreadResult
    );

    const resSpreadTag = document.getElementById('resSpreadTag');
    const resDominantEl = document.getElementById('resDominantEl');
    const resOneLineSummary = document.getElementById('resOneLineSummary');
    const resCriticQuote = document.getElementById('resCriticQuote');
    const resDrawnStrip = document.getElementById('resDrawnSummaryStrip');
    const resDignityBox = document.getElementById('resDignityBox');
    const checkoutProdTitle = document.getElementById('checkoutProdTitle');

    if (resSpreadTag) {
      resSpreadTag.textContent = `✨ ${spreadMeta.nameKo} (${spreadMeta.cardCount}장) 1차 배열 판독 완료`;
    }
    if (resDominantEl) {
      resDominantEl.textContent = `${dignity.dominant.meta.ko}`;
    }
    if (resOneLineSummary) {
      resOneLineSummary.textContent = `${dignity.synergyTitle} — ${dignity.synergyDesc}`;
    }
    if (resCriticQuote) {
      resCriticQuote.textContent = `"${reading.blindSpot}"`;
    }
    if (checkoutProdTitle) {
      checkoutProdTitle.textContent = `${spreadMeta.nameKo} 심층 타로 감명서 (PDF 완역본)`;
    }

    // 내가 뽑은 카드 요약 스트립
    if (resDrawnStrip) {
      resDrawnStrip.innerHTML = `
        <div class="rds-header">
          <i class="fa-solid fa-layer-group"></i> <strong>${APP_STATE.userName}</strong> 님이 뽑으신 【${spreadMeta.nameKo}】 ${spreadMeta.cardCount}장 배열 요약
        </div>
        <div class="rds-grid">
          ${cards.map((item, idx) => `
            <div class="rds-card-chip">
              <span class="rds-pos">${item.position.shortName || (idx + 1) + '번 자리'}</span>
              <strong class="rds-name">${item.card.nameKo}</strong>
              <span class="rds-dir ${item.isReversed ? 'rev' : 'up'}">${item.isReversed ? '역방향' : '정방향'}</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    // 4원소 조화도 프리뷰
    if (resDignityBox) {
      resDignityBox.innerHTML = `
        <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--gold-primary); margin-bottom: 12px;">
          <i class="fa-solid fa-atom"></i> 뽑으신 ${spreadMeta.cardCount}장의 4원소 조화도 (Elemental Dignities)
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
            <div class="el-jung">감정 · 애착</div>
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

  // 결제 상품 전환
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
      APP_STATE.finalPrice = 29000;
      if (priceText) priceText.textContent = '29,000원';
      if (payBtnText) payBtnText.textContent = '29,000원 안전 결제하고 스프레드 PDF 감명서 열람';
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
      if (payBtnText) payBtnText.textContent = '19,500원 안전 결제하고 스프레드 PDF 감명서 열람';
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
    payButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 스프레드 배치도 및 포지션별 심층 감명서 조판 중...`;

    setTimeout(() => {
      payButton.disabled = false;
      payButton.innerHTML = originalText;

      const now = new Date();
      const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
      const randNum = Math.floor(1000 + Math.random() * 9000);
      APP_STATE.orderId = `TM-TAROT-${dateStr}-${randNum}`;

      generateAndDisplayReport();
    }, 900);
  }

  // --------------------------------------------------------------------------
  // 9. VIEW 5: 프리미엄 타로 스프레드 감명서 생성 및 렌더링
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
      orderId: APP_STATE.orderId,
      issueDate: issueDateStr
    };

    const reportHtml = TarotReportBuilder.buildTarotReportHtml(readingData);
    bookWrapper.innerHTML = reportHtml;

    const barUserName = document.getElementById('reportBarUserName');
    if (barUserName) {
      barUserName.textContent = `${APP_STATE.userName} 님 · ${APP_STATE.spreadResult.spread.nameKo}`;
    }

    switchView('report');
  }

  function downloadOrPrintReport() {
    window.print();
  }

  function shareReport() {
    if (navigator.share) {
      navigator.share({
        title: `${APP_STATE.userName} 님의 천문(天文) 타로 스프레드 감명서`,
        text: `${APP_STATE.spreadResult ? APP_STATE.spreadResult.spread.nameKo : '정통 타로 스프레드'} 심층 해독 결과`,
        url: window.location.href
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('감명서 링크가 클립보드에 복사되었습니다.');
    }
  }

  // --------------------------------------------------------------------------
  // 10. 초기화 구동 (Initialization)
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initStarsCanvas();
    initLiveToast();
    initFormControls();
  });

  // 전역 노출 함수
  window.switchView = switchView;
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
