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
    userName: '고객',
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
  function switchView(viewName, opts = {}) {
    // 카드 배열 데이터 없이 히스토리로 보드/결과/리포트에 진입하면 첫 화면으로 보정
    if (['board', 'result', 'report'].includes(viewName) && !APP_STATE.spreadResult) {
      viewName = 'landing';
    }
    const views = ['landing', 'shuffle', 'board', 'result', 'report'];
    if (!opts.fromHistory) pushViewHistory(viewName, opts.replace);
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
    if (viewName === 'result') trackFunnelEvent('ViewResult', { spread: APP_STATE.spreadId });
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

    APP_STATE.userName = (nameInput && nameInput.value.trim()) || '고객';
    APP_STATE.question = (questionInput && questionInput.value.trim()) || '내 운명의 숨은 신호와 올바른 선택의 길을 묻습니다.';
    try {
      if (nameInput && nameInput.value.trim()) localStorage.setItem(LAST_NAME_KEY, nameInput.value.trim());
    } catch (e) {}
    trackFunnelEvent('StartDraw', { situation: sitInput ? sitInput.value : APP_STATE.situation });

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
      cardEl.style.backgroundImage = "url('/assets/cards/card_back.jpg')";

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
      slotEl.style.backgroundImage = "url('/assets/cards/card_back.jpg')";
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

  // --------------------------------------------------------------------------
  // 8-1. 포트원(PortOne V2) 실결제 + 서버 검증 (/api/verify-payment)
  // --------------------------------------------------------------------------
  const PORTONE_CONFIG = {
    // 포트원 관리자 콘솔(https://admin.portone.io) > 연동 정보의 Store ID / 채널 키로 교체
    storeId: 'store-demo-cheonmun-tarot',
    channelKey: 'channel-key-demo'
  };

  const PRODUCT_CATALOG = {
    tarot: { title: '정통 스프레드 심층 타로 감명서', price: 19500 },
    bundle: { title: '스프레드 감명서 + 6대 스프레드 올인원 패스', price: 29000 }
  };

  function getEffectivePortOneConfig() {
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem('ct_portone_config') || '{}'); } catch (e) {}
    const params = new URLSearchParams(window.location.search);
    if (params.get('storeId') && params.get('channelKey')) {
      saved = { storeId: params.get('storeId'), channelKey: params.get('channelKey') };
      try { localStorage.setItem('ct_portone_config', JSON.stringify(saved)); } catch (e) {}
    }
    const winCfg = window.CHEONMUN_TAROT_PORTONE_CONFIG || {};
    const storeId = winCfg.storeId || saved.storeId || PORTONE_CONFIG.storeId;
    const channelKey = winCfg.channelKey || saved.channelKey || PORTONE_CONFIG.channelKey;
    const isLive = Boolean(storeId && channelKey && !storeId.includes('demo') && !channelKey.includes('demo'));
    return { storeId, channelKey, isLive };
  }

  // 내부 QA 전용: 결제 키 미연동 상태에서 ?demo=1 로 접속하면 결제 없이 감명서 조판 흐름 검수
  function isInternalDemoMode() {
    try {
      const p = new URLSearchParams(window.location.search);
      if (p.get('demo') === '1') sessionStorage.setItem('ct_demo_mode', '1');
      return sessionStorage.getItem('ct_demo_mode') === '1'
        || ['localhost', '127.0.0.1'].includes(window.location.hostname);
    } catch (e) {
      return false;
    }
  }

  function makeOrderId() {
    const now = new Date();
    const dateStr = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
    return `TM-TAROT-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  async function triggerTarotPayment() {
    const refundCheck = document.getElementById('refundNoticeCheck');
    if (refundCheck && !refundCheck.checked) {
      alert('디지털 콘텐츠 열람 개시 후 환불 불가 동의에 체크해주세요.');
      refundCheck.focus();
      return;
    }
    if (!APP_STATE.spreadResult) return;

    const product = PRODUCT_CATALOG[APP_STATE.selectedProduct] || PRODUCT_CATALOG.tarot;
    const amount = product.price;
    const payButton = document.getElementById('payButton');
    const originalText = payButton.innerHTML;
    const restoreBtn = () => { payButton.disabled = false; payButton.innerHTML = originalText; };
    payButton.disabled = true;
    payButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 결제창 연결 중...`;

    const paymentId = makeOrderId();
    trackFunnelEvent('InitiateCheckout', {
      value: amount, currency: 'KRW', content_ids: [APP_STATE.selectedProduct], spread: APP_STATE.spreadId
    });

    const cfg = getEffectivePortOneConfig();
    if (typeof PortOne !== 'undefined' && cfg.isLive) {
      try {
        const response = await PortOne.requestPayment({
          storeId: cfg.storeId,
          channelKey: cfg.channelKey,
          paymentId,
          orderName: `${APP_STATE.spreadResult.spread.nameKo} ${product.title}`.slice(0, 60),
          totalAmount: amount,
          currency: 'KRW',
          payMethod: 'CARD',
          customer: { fullName: APP_STATE.userName || '고객' }
        });

        if (response && response.code != null) {
          alert(response.code === 'FAILURE_TYPE_CANCELLED' ? '결제가 취소되었습니다.' : `결제 실패: ${response.message || response.code}`);
          restoreBtn();
          return;
        }

        try {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, expectedAmount: amount, items: [APP_STATE.selectedProduct] })
          });
          const verifyJson = await verifyRes.json().catch(() => null);
          if (!verifyRes.ok || (verifyJson && verifyJson.verified === false)) {
            alert(`결제 검증 실패: ${(verifyJson && verifyJson.error) || '금액 불일치'}\n고객센터로 주문번호(${paymentId})를 알려주세요.`);
            restoreBtn();
            return;
          }
        } catch (vErr) {
          // 정적 로컬 서버 등 API 미구동 환경에서는 SDK 응답 기준으로 진행
        }

        restoreBtn();
        completeTarotPurchase(paymentId, amount, false);
        return;
      } catch (err) {
        console.error('포트원 결제 오류:', err);
        alert('결제창 호출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        restoreBtn();
        return;
      }
    }

    if (isInternalDemoMode()) {
      setTimeout(() => {
        restoreBtn();
        completeTarotPurchase(paymentId, amount, true);
      }, 600);
      return;
    }

    setTimeout(() => {
      restoreBtn();
      alert('현재 결제 심사 및 채널 키 연동 대기 중입니다.\n결제 연동이 완료되면 즉시 감명서가 발급됩니다.');
    }, 500);
  }

  function completeTarotPurchase(orderId, amount, isDemo) {
    APP_STATE.orderId = orderId;
    if (!isDemo) {
      trackFunnelEvent('Purchase', {
        order_id: orderId, value: amount, currency: 'KRW', content_ids: [APP_STATE.selectedProduct]
      });
    }
    generateAndDisplayReport();
    saveCurrentOrderToArchive(isDemo);
  }

  // --------------------------------------------------------------------------
  // 9. VIEW 5: 프리미엄 타로 스프레드 감명서 생성 및 렌더링
  // --------------------------------------------------------------------------
  function generateAndDisplayReport(issueDateOverride) {
    const bookWrapper = document.getElementById('tarotBookWrapper');
    if (!bookWrapper || !APP_STATE.spreadResult) return;

    const issueDateStr = issueDateOverride || new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    APP_STATE.issueDate = issueDateStr;

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

    renderSajuBridges();
    switchView('report');
  }

  function downloadOrPrintReport() {
    trackFunnelEvent('PrintReport', { order_id: APP_STATE.orderId });
    window.print();
  }

  function shareReport() {
    const url = getPermanentRestoreUrl();
    if (navigator.share) {
      navigator.share({
        title: `${APP_STATE.userName} 님의 천문(天文) 타로 스프레드 감명서`,
        text: `${APP_STATE.spreadResult ? APP_STATE.spreadResult.spread.nameKo : '정통 타로 스프레드'} 심층 해독 결과`,
        url
      }).catch(() => {});
    } else {
      copyPermanentRestoreLink();
    }
  }

  // --------------------------------------------------------------------------
  // 9-1. 평생 소장 링크(?restore=) & 이 기기 보관함
  // --------------------------------------------------------------------------
  const ARCHIVE_KEY = 'ct_saved_orders_v1';
  let currentRestoreToken = '';

  function encodeRestoreToken(payload) {
    const json = JSON.stringify(payload);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function decodeRestoreToken(token) {
    try {
      let b64 = String(token).replace(/-/g, '+').replace(/_/g, '/');
      while (b64.length % 4) b64 += '=';
      return JSON.parse(decodeURIComponent(escape(atob(b64))));
    } catch (e) {
      return null;
    }
  }

  function buildCompactPayload(isDemo) {
    return {
      v: 1,
      id: APP_STATE.orderId,
      d: APP_STATE.issueDate || '',
      n: APP_STATE.userName,
      q: APP_STATE.question,
      s: APP_STATE.spreadId,
      p: APP_STATE.selectedProduct,
      c: APP_STATE.spreadResult.cards.map((c, i) => [
        APP_STATE.pickedCards[i] ? APP_STATE.pickedCards[i].cardIndex : TarotEngine_cardIndexOf(c.card),
        c.isReversed ? 1 : 0
      ]),
      x: isDemo ? 1 : 0
    };
  }

  function TarotEngine_cardIndexOf(card) {
    const all = (window.TarotDB && window.TarotDB.CARDS) || [];
    const idx = all.indexOf(card);
    return idx >= 0 ? idx : 0;
  }

  function getSavedOrders() {
    try { return JSON.parse(localStorage.getItem(ARCHIVE_KEY) || '[]'); } catch (e) { return []; }
  }

  function saveCurrentOrderToArchive(isDemo) {
    if (!APP_STATE.spreadResult) return;
    const payload = buildCompactPayload(isDemo);
    currentRestoreToken = encodeRestoreToken(payload);
    try {
      const list = getSavedOrders().filter(o => o.id !== payload.id);
      list.unshift({
        id: payload.id,
        d: payload.d,
        n: payload.n,
        spread: APP_STATE.spreadResult.spread.nameKo,
        token: currentRestoreToken,
        demo: Boolean(isDemo)
      });
      localStorage.setItem(ARCHIVE_KEY, JSON.stringify(list.slice(0, 20)));
    } catch (e) {}
    renderPermanentLinkBanner();
  }

  function getPermanentRestoreUrl() {
    if (!currentRestoreToken) return window.location.href;
    return `${window.location.origin}${window.location.pathname}?restore=${encodeURIComponent(currentRestoreToken)}`;
  }

  function copyPermanentRestoreLink() {
    const url = getPermanentRestoreUrl();
    const done = () => alert('평생 소장 링크가 복사되었습니다.\n카카오톡 나에게 보내기 등에 저장해두면 언제든 다시 열람할 수 있습니다.');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(() => prompt('아래 링크를 복사해 보관하세요.', url));
    } else {
      prompt('아래 링크를 복사해 보관하세요.', url);
    }
    trackFunnelEvent('CopyRestoreLink', { order_id: APP_STATE.orderId });
  }

  function renderPermanentLinkBanner() {
    const host = document.getElementById('permanentLinkBanner');
    if (!host) return;
    host.innerHTML = `
      <div class="permanent-link-card">
        <i class="fa-solid fa-link"></i>
        <div class="plc-text">
          <strong>평생 소장 링크 · 주문번호 ${APP_STATE.orderId}</strong>
          <span>이 링크만 있으면 다른 기기·브라우저에서도 같은 감명서를 다시 열 수 있습니다.</span>
        </div>
        <button type="button" class="btn plc-btn" onclick="copyPermanentRestoreLink()">
          <i class="fa-regular fa-copy"></i> 링크 복사
        </button>
      </div>`;
  }

  function restoreFromPayload(data) {
    if (!data || !data.s || !Array.isArray(data.c) || !window.TarotEngine) return false;
    const spreadMeta = TarotEngine.SPREADS[data.s];
    if (!spreadMeta) return false;

    APP_STATE.userName = data.n || '고객';
    APP_STATE.question = data.q || '';
    APP_STATE.spreadId = data.s;
    APP_STATE.situation = data.s;
    APP_STATE.domain = spreadMeta.domain || 'career';
    APP_STATE.selectedProduct = data.p || 'tarot';
    APP_STATE.orderId = data.id || makeOrderId();
    APP_STATE.pickedCards = data.c.map(([cardIndex, rev]) => ({ cardIndex, isReversed: Boolean(rev) }));
    APP_STATE.spreadResult = TarotEngine.drawSpread(data.s, APP_STATE.pickedCards.map(p => p.cardIndex), 0);
    APP_STATE.pickedCards.forEach((p, idx) => {
      if (APP_STATE.spreadResult.cards[idx]) APP_STATE.spreadResult.cards[idx].isReversed = p.isReversed;
    });

    currentRestoreToken = encodeRestoreToken(data);
    generateAndDisplayReport(data.d || undefined);
    renderPermanentLinkBanner();
    trackFunnelEvent('RestoreReport', { order_id: APP_STATE.orderId, is_demo: Boolean(data.x) });
    return true;
  }

  function openOrderLookupModal() {
    const modal = document.getElementById('orderLookupModal');
    const list = document.getElementById('savedOrdersList');
    if (list) {
      const orders = getSavedOrders();
      list.innerHTML = orders.length === 0
        ? `<p class="empty-saved">이 기기에 보관된 감명서가 없습니다. 소장 링크를 붙여넣어 열람하세요.</p>`
        : orders.map((o, idx) => `
          <button type="button" class="saved-order-item" onclick="restoreOrderByIndex(${idx})">
            <span class="soi-title"><i class="fa-solid fa-scroll"></i> ${escapeHtml(o.n)} 님 · ${escapeHtml(o.spread)}</span>
            <span class="soi-meta">${escapeHtml(o.id)} · ${escapeHtml(o.d)}${o.demo ? ' · 검수용' : ''}</span>
          </button>`).join('');
    }
    if (modal) modal.classList.remove('hidden');
  }

  function closeOrderLookupModal() {
    const modal = document.getElementById('orderLookupModal');
    if (modal) modal.classList.add('hidden');
  }

  function restoreOrderByIndex(idx) {
    const item = getSavedOrders()[idx];
    if (!item) return;
    closeOrderLookupModal();
    restoreFromPayload(decodeRestoreToken(item.token));
  }

  function lookupOrderByQuery() {
    const input = document.getElementById('orderLookupInput');
    const msg = document.getElementById('orderLookupMsg');
    const q = (input && input.value.trim()) || '';
    if (!q) return;
    let token = '';
    try {
      token = q.includes('restore=') ? (new URL(q).searchParams.get('restore') || '') : '';
    } catch (e) {
      const m = q.match(/restore=([^&\s]+)/);
      token = m ? decodeURIComponent(m[1]) : '';
    }
    if (!token) {
      const found = getSavedOrders().find(o => o.id === q || o.n === q);
      if (found) token = found.token;
    }
    const data = token ? decodeRestoreToken(token) : null;
    if (data && restoreFromPayload(data)) {
      closeOrderLookupModal();
    } else if (msg) {
      msg.textContent = '일치하는 감명서를 찾지 못했습니다. 소장 링크 전체를 붙여넣어 주세요.';
    }
  }

  function escapeHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  // --------------------------------------------------------------------------
  // 9-2. 광고 유입 추적 (Meta Pixel / GA4 / GTM) & 퍼널 이벤트
  // --------------------------------------------------------------------------
  const AD_ATTR_KEY = 'ct_ad_attribution_v1';
  const FUNNEL_LOG_KEY = 'ct_funnel_events_v1';
  const LAST_NAME_KEY = 'ct_last_user_name_v1';

  function initAdAttributionAndTracking() {
    try {
      const params = new URLSearchParams(window.location.search);
      const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid', 'gclid', 'situation'];
      const captured = {};
      keys.forEach(k => { const v = params.get(k); if (v) captured[k] = v; });
      if (Object.keys(captured).length > 0) {
        captured.landedAt = new Date().toISOString();
        localStorage.setItem(AD_ATTR_KEY, JSON.stringify(captured));
      }

      const pixelParam = params.get('pixel');
      if (pixelParam) localStorage.setItem('ct_pixel_id', pixelParam);
      const pixelId = window.CHEONMUN_TAROT_PIXEL_ID || localStorage.getItem('ct_pixel_id');
      if (pixelId && typeof window.fbq === 'undefined') {
        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','https://connect.facebook.net/en_US/fbevents.js');
        window.fbq('init', pixelId);
      }
    } catch (e) {}
    trackFunnelEvent('PageView');
  }

  function trackFunnelEvent(eventName, payload = {}) {
    try {
      const attr = JSON.parse(localStorage.getItem(AD_ATTR_KEY) || '{}');
      const enriched = Object.assign({}, payload, {
        event: eventName,
        service: 'tarot',
        ts: new Date().toISOString(),
        utm_source: attr.utm_source || '',
        utm_campaign: attr.utm_campaign || ''
      });
      if (typeof window.fbq === 'function') {
        const std = ['PageView', 'ViewContent', 'Lead', 'AddToCart', 'InitiateCheckout', 'Purchase'];
        window.fbq(std.includes(eventName) ? 'track' : 'trackCustom', eventName, payload);
      }
      if (typeof window.gtag === 'function') window.gtag('event', eventName, payload);
      if (Array.isArray(window.dataLayer)) window.dataLayer.push(enriched);
      const log = JSON.parse(localStorage.getItem(FUNNEL_LOG_KEY) || '[]');
      log.push(enriched);
      localStorage.setItem(FUNNEL_LOG_KEY, JSON.stringify(log.slice(-50)));
    } catch (e) {}
  }

  // --------------------------------------------------------------------------
  // 9-3. 모바일 뒤로가기 이탈 방어 (History API)
  // --------------------------------------------------------------------------
  let historyReady = false;

  function pushViewHistory(viewName, replace) {
    try {
      if (!window.history || typeof history.pushState !== 'function') return;
      const next = Object.assign({}, history.state || {}, { ctView: viewName });
      if (replace || !historyReady) {
        history.replaceState(next, '');
        historyReady = true;
        return;
      }
      if (history.state && history.state.ctView === viewName) return;
      history.pushState(next, '');
    } catch (e) {}
  }

  function initHistoryGuard() {
    try {
      history.replaceState(Object.assign({}, history.state || {}, { ctView: APP_STATE.currentView || 'landing' }), '');
      historyReady = true;
    } catch (e) {}
    window.addEventListener('popstate', (e) => {
      closeOrderLookupModal();
      const target = (e.state && e.state.ctView) || 'landing';
      const from = APP_STATE.currentView;
      if (target === from) return;
      switchView(target, { fromHistory: true });
      trackFunnelEvent('BackNavigation', { from, to: target });
    });
  }

  // --------------------------------------------------------------------------
  // 9-4. 광고 소재별 딥링크 (?situation=reunion|romance|choice|career|wealth|celtic)
  // --------------------------------------------------------------------------
  const SITUATION_ALIASES = {
    reunion: 'reunion', breakup: 'reunion', ex: 'reunion',
    romance: 'romance', love: 'romance', crush: 'romance', some: 'romance', match: 'romance',
    choice: 'choice', ab: 'choice', decision: 'choice',
    career: 'career', job: 'career', work: 'career', business: 'career',
    wealth: 'wealth', money: 'wealth', invest: 'wealth',
    celtic: 'celtic', total: 'celtic', year: 'celtic', newyear: 'celtic'
  };

  function applyDeepLink() {
    let params;
    try { params = new URLSearchParams(window.location.search); } catch (e) { return; }
    const raw = String(params.get('situation') || params.get('concern') || params.get('topic') || '').toLowerCase().trim();
    const sit = SITUATION_ALIASES[raw];
    if (!sit) return;
    const card = document.querySelector(`.situation-card[data-category="${sit}"]`);
    if (card) {
      card.click();
      trackFunnelEvent('DeepLinkLanding', { situation: sit, raw });
      if (params.get('step') === 'input' || params.get('step') === 'form') {
        setTimeout(() => {
          const nameEl = document.getElementById('userName');
          if (nameEl) nameEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    }
  }

  // --------------------------------------------------------------------------
  // 9-5. 타로 → 천문 사주 교차판매 브릿지
  // --------------------------------------------------------------------------
  const SAJU_SITE_URL = 'https://cheonmun.life/1/';
  const SITUATION_TO_SAJU = {
    reunion: { concern: 'love', label: '1:1 심층 궁합' },
    romance: { concern: 'love', label: '1:1 심층 궁합' },
    choice: { concern: 'year', label: '2026 월별 터닝포인트' },
    career: { concern: 'career', label: '커리어 · 이직 타이밍' },
    wealth: { concern: 'wealth', label: '평생 재물선' },
    celtic: { concern: 'year', label: '2026 월별 터닝포인트' }
  };

  function buildSajuUrl(placement) {
    const base = window.CHEONMUN_SAJU_URL || SAJU_SITE_URL;
    const map = SITUATION_TO_SAJU[APP_STATE.situation] || SITUATION_TO_SAJU.career;
    const qs = new URLSearchParams({
      concern: map.concern,
      step: 'input',
      utm_source: 'cheonmun_tarot',
      utm_medium: 'crosssell',
      utm_campaign: 'tarot_to_saju',
      utm_content: placement
    });
    return `${base}${base.includes('?') ? '&' : '?'}${qs.toString()}`;
  }

  function renderSajuBridges() {
    const map = SITUATION_TO_SAJU[APP_STATE.situation] || SITUATION_TO_SAJU.career;
    [['sajuBridgeResult', 'result'], ['sajuBridgeReport', 'report']].forEach(([id, placement]) => {
      const host = document.getElementById(id);
      if (!host) return;
      host.innerHTML = `
        <div class="saju-bridge-card">
          <div class="sb-icon"><i class="fa-solid fa-scroll"></i></div>
          <div class="sb-body">
            <span class="sb-tag">천문 정통 사주명리 · 86p 서책 감명서</span>
            <strong class="sb-title">타로는 '지금의 마음'을, 사주는 '언제 풀리는지'를 봅니다</strong>
            <p class="sb-desc">카드가 보여준 지금의 흐름이 언제 바뀌는지, 생년월일시 8글자로 대운·세운의 시기를 확인해 보세요. 기본 만세력은 무료입니다.</p>
          </div>
          <a class="btn sb-btn" href="${buildSajuUrl(placement)}" target="_blank" rel="noopener"
             onclick="window.__ctTrack && window.__ctTrack('CrossSellClick', { to: 'saju', placement: '${placement}' })">
            ${map.label} 사주 보기 <i class="fa-solid fa-arrow-right"></i>
          </a>
        </div>`;
    });
  }

  // --------------------------------------------------------------------------
  // 10. 초기화 구동 (Initialization)
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initStarsCanvas();
    initLiveToast();
    initFormControls();
    initHistoryGuard();
    initAdAttributionAndTracking();

    try {
      const lastName = localStorage.getItem(LAST_NAME_KEY);
      const nameEl = document.getElementById('userName');
      if (lastName && nameEl && !nameEl.value) nameEl.value = lastName;
    } catch (e) {}

    const restoreParam = new URLSearchParams(window.location.search).get('restore');
    if (restoreParam) {
      const data = decodeRestoreToken(restoreParam);
      if (!restoreFromPayload(data)) alert('소장 링크가 손상되었거나 만료되었습니다. 링크 전체를 다시 확인해주세요.');
    } else {
      applyDeepLink();
    }
    renderSajuBridges();
  });

  // 전역 노출 함수
  window.__ctTrack = trackFunnelEvent;
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
  window.copyPermanentRestoreLink = copyPermanentRestoreLink;
  window.openOrderLookupModal = openOrderLookupModal;
  window.closeOrderLookupModal = closeOrderLookupModal;
  window.restoreOrderByIndex = restoreOrderByIndex;
  window.lookupOrderByQuery = lookupOrderByQuery;

})();
