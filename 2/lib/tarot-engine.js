/**
 * ============================================================================
 * 天門 (CHEONMUN) 타로 심리 엔진 — 핵심 연산 및 리딩 합성 모듈 (tarot-engine.js)
 * ----------------------------------------------------------------------------
 * 1. 암호학적 Fisher-Yates 셔플 & 정/역방향 추출
 * 2. 4대 정통 스프레드 (원카드, 3카드 3종, 양자택일 5카드, 켈틱 크로스 10카드)
 * 3. 4원소 조화도 (Elemental Dignities) 연산
 * 4. 사주(오행) x 타로(4원소) 하이브리드 크로스 분석
 * 5. 칼 융 분석심리학 기반 3단계 내담자 중심 심리 리딩 합성기
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./tarot-data'], factory);
  } else if (typeof module === 'object' && module.exports) {
    const TarotDB = require('./tarot-data');
    module.exports = factory(TarotDB);
  } else {
    root.TarotEngine = factory(root.TarotDB);
  }
}(typeof self !== 'undefined' ? self : this, function (TarotDB) {

  // --------------------------------------------------------------------------
  // 1. 스프레드 규격 정의
  // --------------------------------------------------------------------------
  const SPREADS = {
    single: {
      id: "single",
      nameKo: "원카드 (Single Card / 오늘의 조언)",
      desc: "질문에 대한 가장 직접적인 핵심 화두와 당장 취해야 할 직관적 행동 지침",
      cardCount: 1,
      positions: [
        { index: 0, key: "focus", name: "핵심 화두 & 행동 지침", role: "질문의 본질을 관통하는 우주의 직관적 메시지" }
      ]
    },
    three_timeline: {
      id: "three_timeline",
      nameKo: "3카드 시간선 (과거 · 현재 · 미래)",
      desc: "문제의 과거 원인부터 현재의 갈림길, 그리고 3~6개월 뒤의 귀결을 파악하는 정통 흐름",
      cardCount: 3,
      positions: [
        { index: 0, key: "past", name: "과거의 원인 및 카르마 (Past)", role: "현재 상황을 만든 과거의 사건과 무의식적 원인" },
        { index: 1, key: "present", name: "현재 마주한 상황과 심리 (Present)", role: "지금 이 순간 내담자가 서 있는 심리적 좌표와 현실" },
        { index: 2, key: "future", name: "가까운 미래의 흐름과 귀결 (Future)", role: "현재의 에너지 흐름이 이어질 때 맞닥뜨릴 결과" }
      ]
    },
    three_mind: {
      id: "three_mind",
      nameKo: "3카드 심리 구조 (의식 · 무의식 · 통합의 열쇠)",
      desc: "융 분석심리학 기반: 표면적 의식과 내면의 그림자(Shadow), 치유의 열쇠를 해독",
      cardCount: 3,
      positions: [
        { index: 0, key: "ego", name: "의식적 자아의 표면 생각 (Ego)", role: "내가 스스로 생각하고 통제할 수 있다고 믿는 의식" },
        { index: 1, key: "shadow", name: "무의식에 숨겨진 그림자 (Shadow)", role: "두려워서 회피하거나 억압해 온 내면의 진짜 욕망과 공포" },
        { index: 2, key: "key", name: "내적 통합과 치유의 열쇠 (Integration)", role: "그림자를 인정하고 온전한 자아를 회복하는 해법" }
      ]
    },
    two_choice: {
      id: "two_choice",
      nameKo: "양자택일 스프레드 (A vs B 갈림길)",
      desc: "이직할까 잔류할까? A와 만날까 B와 만날까? 두 선택의 과정과 대가를 객관적으로 비교",
      cardCount: 5,
      positions: [
        { index: 0, key: "center", name: "현재 나의 심리적 중심점 (Current)", role: "갈림길에 선 현재 내담자의 진짜 심리 상태" },
        { index: 1, key: "choice_a_process", name: "선택 A의 전개 과정 (Choice A Process)", role: "A를 선택했을 때 겪게 될 현실적 과정과 감정" },
        { index: 2, key: "choice_a_outcome", name: "선택 A의 최종 귀결과 대가 (Choice A Outcome)", role: "A 선택이 가져다줄 궁극의 결과와 치러야 할 대가" },
        { index: 3, key: "choice_b_process", name: "선택 B의 전개 과정 (Choice B Process)", role: "B를 선택했을 때 겪게 될 현실적 과정과 감정" },
        { index: 4, key: "choice_b_outcome", name: "선택 B의 최종 귀결과 대가 (Choice B Outcome)", role: "B 선택이 가져다줄 궁극의 결과와 치러야 할 대가" }
      ]
    },
    celtic_cross: {
      id: "celtic_cross",
      nameKo: "켈틱 크로스 (Celtic Cross · 10카드 정밀 감명)",
      desc: "타로의 제왕: 현재, 장애, 잠재의식, 과거, 상위의식, 미래, 자신, 주변, 희망/두려움, 최종결과",
      cardCount: 10,
      positions: [
        { index: 0, key: "signifier", name: "1. 현재의 핵심 상황 (Signifier)", role: "질문의 핵심 주제이자 내담자가 서 있는 현재 좌표" },
        { index: 1, key: "crossing", name: "2. 장애물 또는 촉매 (Crossing)", role: "1번 카드를 가로지르며 정면 대결해야 할 시련이나 촉매" },
        { index: 2, key: "foundation", name: "3. 잠재의식의 뿌리 (Foundation)", role: "인지하지 못하는 무의식적 뿌리, 과거로부터의 카르마" },
        { index: 3, key: "past", name: "4. 지나가는 과거 (Past)", role: "방금 영향력을 잃기 시작한 지나간 사건이나 감정" },
        { index: 4, key: "crown", name: "5. 상위 의식과 이상 (Crown)", role: "내담자가 바라는 최상의 목표 또는 상황에 대한 이상적 기대" },
        { index: 5, key: "near_future", name: "6. 가까운 미래 (Near Future)", role: "향후 1~3개월 내에 맞닥뜨릴 즉각적인 사건과 기류" },
        { index: 6, key: "self", name: "7. 내담자 자신의 태도 (Self Image)", role: "상황을 바라보는 내담자의 내면 심리와 자아상" },
        { index: 7, key: "environment", name: "8. 주변 환경과 타인의 시선 (Environment)", role: "가족, 동료, 연인 등 외부 환경과 타인들의 피드백" },
        { index: 8, key: "hopes_fears", name: "9. 깊은 희망과 두려움 (Hopes & Fears)", role: "마음속 가장 깊은 갈망과 그 이면에 숨은 공포" },
        { index: 9, key: "outcome", name: "10. 최종 귀결과 삶의 교훈 (Final Outcome)", role: "현재의 흐름이 지속될 때 도달하게 될 6개월~1년 뒤의 귀결" }
      ]
    }
  };

  // --------------------------------------------------------------------------
  // 2. 암호학적 셔플 & 덱 연산
  // --------------------------------------------------------------------------
  function secureRandom() {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] / (0xffffffff + 1);
    }
    return Math.random();
  }

  // Fisher-Yates 셔플
  function shuffleDeck(cards) {
    const deck = [...cards];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(secureRandom() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  // 지정된 스프레드에 맞춰 n장 카드 추출
  function drawSpread(spreadId, selectedIndices, reversedChance = 0.3) {
    const spreadMeta = SPREADS[spreadId] || SPREADS.single;
    const allCards = TarotDB.CARDS;
    const count = spreadMeta.cardCount;

    // 만약 사용자가 직접 고른 인덱스가 있다면 사용, 없으면 랜덤 셔플
    let drawn = [];
    if (selectedIndices && selectedIndices.length >= count) {
      for (let i = 0; i < count; i++) {
        const cIndex = selectedIndices[i] % allCards.length;
        const isReversed = secureRandom() < reversedChance;
        drawn.push({
          position: spreadMeta.positions[i],
          card: allCards[cIndex],
          isReversed: isReversed
        });
      }
    } else {
      const shuffled = shuffleDeck(allCards);
      for (let i = 0; i < count; i++) {
        const isReversed = secureRandom() < reversedChance;
        drawn.push({
          position: spreadMeta.positions[i],
          card: shuffled[i],
          isReversed: isReversed
        });
      }
    }

    return {
      spread: spreadMeta,
      cards: drawn,
      timestamp: new Date().toISOString()
    };
  }

  // --------------------------------------------------------------------------
  // 3. 4원소 조화도 (Elemental Dignities) 연산
  // --------------------------------------------------------------------------
  function calculateElementalDignity(drawnCards) {
    const counts = { fire: 0, water: 0, air: 0, earth: 0 };
    drawnCards.forEach(item => {
      const el = item.card.element;
      if (counts[el] !== undefined) counts[el]++;
    });

    const total = drawnCards.length;
    const percentages = {
      fire: Math.round((counts.fire / total) * 100),
      water: Math.round((counts.water / total) * 100),
      air: Math.round((counts.air / total) * 100),
      earth: Math.round((counts.earth / total) * 100)
    };

    // 최우세 원소 및 결핍 원소 도출
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0];
    const deficient = sorted[sorted.length - 1];

    // 원소 상호작용 해석
    let synergyTitle = "";
    let synergyDesc = "";

    if (counts.fire > 0 && counts.air > 0 && counts.water === 0) {
      synergyTitle = "열정과 이성의 결합 (불 + 바람 상생)";
      synergyDesc = "직관적인 열정이 날카로운 이성을 만나 폭발적인 추진력과 지적 돌파구를 형성합니다. 망설임 없는 과감한 전진이 가능합니다.";
    } else if (counts.water > 0 && counts.earth > 0 && counts.fire === 0) {
      synergyTitle = "비옥한 대지와 샘물 (물 + 흙 상생)";
      synergyDesc = "깊은 감정과 현실적인 물질이 만나 풍요로운 안식처를 이룹니다. 흔들리지 않는 안정감과 결실이 보장됩니다.";
    } else if (counts.fire > 0 && counts.water > 0) {
      synergyTitle = "열정과 감정의 증기 충돌 (불 + 물 상극)";
      synergyDesc = "하고 싶은 열정(불)과 불안한 감정(물)이 부딪혀 내면에서 뜨거운 증기가 솟구칩니다. 조급증과 감정 기복을 다스리는 것이 핵심입니다.";
    } else if (counts.air > 0 && counts.earth > 0) {
      synergyTitle = "이상과 현실의 마찰 (공기 + 흙 상극)";
      synergyDesc = "머릿속의 높은 이상(공기)과 발밑의 무거운 현실(흙) 사이에 괴리가 있습니다. 구름 위에 선을 긋기보다 땅에 못을 박는 구체성이 필요합니다.";
    } else {
      synergyTitle = "원소의 다차원적 혼합";
      synergyDesc = "다양한 심리적 기능이 교차하며 다각적인 관점에서의 성찰을 요구하고 있습니다.";
    }

    return {
      counts,
      percentages,
      dominant: { element: dominant[0], count: dominant[1], meta: TarotDB.ELEMENTS[dominant[0]] },
      deficient: { element: deficient[0], count: deficient[1], meta: TarotDB.ELEMENTS[deficient[0]] },
      synergyTitle,
      synergyDesc
    };
  }

  // --------------------------------------------------------------------------
  // 4. 사주 x 타로 하이브리드 크로스 분석기
  // --------------------------------------------------------------------------
  function calculateSajuTarotCross(sajuContext, dignity) {
    if (!sajuContext || !sajuContext.dayCheongan) return null;

    const dayStem = sajuContext.dayCheongan; // 예: "임", "갑", "병", "경", "무"
    const dayElement = sajuContext.dayElement || "수"; // 목, 화, 토, 금, 수

    const sajuToTarot = {
      "목": "fire",   // 목생화 (성장과 열정)
      "화": "fire",   // 화 (직관)
      "토": "earth",  // 토 (현실과 감각)
      "금": "air",    // 금 (이성과 결단)
      "수": "water"   // 수 (무의식과 감정)
    };

    const correspondingTarotElement = sajuToTarot[dayElement] || "water";
    const dominantTarotElement = dignity.dominant.element;

    let crossNarrative = "";
    if (correspondingTarotElement === dominantTarotElement) {
      crossNarrative = `내담자님의 사주 본질인 [${dayElement}(${dayStem})]의 기운이 타로의 우세 원소인 [${TarotDB.ELEMENTS[dominantTarotElement].ko}]와 완벽히 공명하고 있습니다. 타고난 본능과 직관이 지금 가리키는 방향이 정확하며, 자신의 본성을 믿고 나아갈 때 가장 강력한 운의 탄력을 받습니다.`;
    } else {
      crossNarrative = `내담자님의 사주 원국 [${dayElement}(${dayStem})]의 에너지는 지금 타로가 요구하는 [${TarotDB.ELEMENTS[dominantTarotElement].ko}]의 에너지를 보완재로 끌어당기고 있습니다. 평소 익숙했던 방식만을 고집하지 말고, 이번 상황에서는 타로 카드가 제안하는 새로운 심리적 태도를 취해야 매듭이 풀립니다.`;
    }

    return {
      dayStem,
      dayElement,
      correspondingTarotElement,
      dominantTarotElement,
      crossNarrative
    };
  }

  // --------------------------------------------------------------------------
  // 5. 내담자 중심 융 심리학 리딩 내러티브 합성기 (Narrative Synthesis)
  // --------------------------------------------------------------------------
  function generatePsychologicalReading(domain, userQuestion, spreadResult, sajuContext) {
    const cards = spreadResult.cards;
    const dignity = calculateElementalDignity(cards);
    const crossAnalysis = calculateSajuTarotCross(sajuContext, dignity);

    // 1단계: 깊은 공감과 반영 (Validation)
    let step1_validation = "";
    const firstCard = cards[0];
    const firstCardText = firstCard.isReversed ? firstCard.card.reversed : firstCard.card.upright;

    if (domain === "love") {
      step1_validation = `질문을 던지시는 순간의 마음자리가 첫 번째 카드인 [${firstCard.card.nameKo} (${firstCard.isReversed ? '역방향' : '정방향'})]에 고스란히 묻어납니다. 겉으로는 태연한 척, 혹은 이성적으로 판단하려 애쓰셨겠지만, 홀로 가슴앓이하며 감당하셔야 했던 밤의 무게와 서운함이 느껴집니다. ${firstCardText.core}`;
    } else if (domain === "career") {
      step1_validation = `이직이나 취업, 진로를 묻는 내담자님의 마음속 깊은 곳에는 단순한 성공을 넘어선 '존중받고 싶은 간절함'이 자리하고 있습니다. 첫 카드 [${firstCard.card.nameKo}]가 보여주듯, 당신은 결코 게으르거나 능력이 모자란 사람이 아닙니다. 지금까지 버텨온 것만으로도 이미 수많은 에너지를 소진하셨습니다. ${firstCardText.core}`;
    } else if (domain === "wealth") {
      step1_validation = `금전과 자산의 흐름을 묻는 이 자리는 현실적인 불안과 더불어 미래에 대한 책임감이 무겁게 내려앉아 있습니다. 첫 카드 [${firstCard.card.nameKo}]는 지금 내담자님이 겪고 계신 재정적 고민의 현실을 정직하게 비추고 있습니다. ${firstCardText.core}`;
    } else {
      step1_validation = `내면의 길을 묻는 내담자님의 영혼은 지금 깊은 전환점에 서 계십니다. 첫 카드 [${firstCard.card.nameKo}]가 가리키듯, 지금까지 당신을 지탱해 온 오래된 틀이 흔들리며 새로운 자아를 요구하고 있습니다. ${firstCardText.core}`;
    }

    // 2단계: 맹점 조명과 심리적 직면 (Confronting the Blind Spot)
    let step2_blindspot = "";
    // 카드 중 역방향이거나 장애/교차 포지션의 카드를 타겟팅
    let shadowCard = cards.find(c => c.isReversed) || (cards.length > 1 ? cards[1] : cards[0]);
    let shadowText = shadowCard.isReversed ? shadowCard.card.reversed : shadowCard.card.upright;

    if (domain === "career") {
      step2_blindspot = `그러나 정신과 상담의 냉철한 렌즈로 우리의 내면을 들여다보아야 합니다. [${shadowCard.card.nameKo}] 카드는 묻고 있습니다. 과연 당신은 저 문 안으로 '못' 들어가는 것일까요, 아니면 상처받거나 자존심이 깎이는 것이 두려워 무의식적으로 '안' 들어가고 발을 빼고 계셨던 것일까요? 만약 당신의 사주와 역량이 여태 취업이나 이직을 못할 그릇이 아니었다면, 지금 필요한 것은 무조건적인 자책이 아니라 '내가 두려워했던 진짜 맹점'을 마주하는 것입니다. ${shadowText.core}`;
    } else if (domain === "love") {
      step2_blindspot = `상대방의 무심함이나 침묵만을 탓하기 전에, [${shadowCard.card.nameKo}] 카드가 비추는 당신의 무의식을 직면해야 합니다. 혹시 당신 스스로도 상처받기 싫다는 방어기제 때문에 먼저 마음의 빗장을 걸어 잠그고, 상대가 100% 확신을 주며 다가오기만을 시험하고 계셨던 것은 아닐까요? 사랑을 원하면서도 동시에 취약해지는 것을 극도로 두려워했던 내면의 그림자를 들여다보아야 합니다.`;
    } else {
      step2_blindspot = `상황이나 타인의 탓으로 돌리기 전에, [${shadowCard.card.nameKo}] 카드가 경고하는 내면의 아집과 조급증을 직면해야 합니다. 잃는 것에 대한 과도한 공포가 오히려 최선의 선택을 가로막고 눈가리개를 씌우고 있었던 것은 아닌지 되돌아보아야 합니다.`;
    }

    // 3단계: 주체적인 3대 실천 행동 지침 (Action Plan)
    const finalCard = cards[cards.length - 1];
    const finalCardText = finalCard.isReversed ? finalCard.card.reversed : finalCard.card.upright;

    const actionSteps = [
      `1. [즉각적 행동 멈춤과 분별]: ${finalCardText.advice}`,
      `2. [에너지의 재정렬]: 우세 원소인 '${dignity.dominant.meta.ko}'의 에너지를 의식적으로 강화하여 결단을 현실화하십시오.`,
      `3. [심리적 주도권 회복]: 타인의 반응에 일희일비하지 말고, 오늘 밤 당신의 진심이 담긴 단 하나의 명확한 문장을 종이에 적어보십시오.`
    ];

    return {
      validation: step1_validation,
      blindSpot: step2_blindspot,
      actionPlan: actionSteps,
      finalOutcomeSummary: `${finalCard.position.name}에 위치한 [${finalCard.card.nameKo} (${finalCard.isReversed ? '역방향' : '정방향'})]는 말합니다. "${finalCardText.core}"`,
      dignitySummary: `${dignity.synergyTitle} — ${dignity.synergyDesc}`,
      crossAnalysis
    };
  }

  // --------------------------------------------------------------------------
  // 공용 공개 인터페이스
  // --------------------------------------------------------------------------
  return {
    SPREADS,
    drawSpread,
    calculateElementalDignity,
    calculateSajuTarotCross,
    generatePsychologicalReading,
    secureRandom
  };
}));
