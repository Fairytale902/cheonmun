/**
 * ============================================================================
 * 天門 (CHEONMUN) 타로 심리 엔진 — 타로 감명서 리포트 빌더 (tarot-report-builder.js)
 * ----------------------------------------------------------------------------
 * 인터랙티브 웹 뷰어 및 고해상도 A4 PDF 출력을 지원하는
 * 융 분석심리학 기반 프리미엄 타로 심층 감명서 HTML/Print 생성기
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./tarot-data', './tarot-engine'], factory);
  } else if (typeof module === 'object' && module.exports) {
    const TarotDB = require('./tarot-data');
    const TarotEngine = require('./tarot-engine');
    module.exports = factory(TarotDB, TarotEngine);
  } else {
    root.TarotReportBuilder = factory(root.TarotDB, root.TarotEngine);
  }
}(typeof self !== 'undefined' ? self : this, function (TarotDB, TarotEngine) {

  // 도메인별 한글 명칭
  const DOMAIN_NAMES = {
    love: "연애 · 재회 · 인연의 갈림길",
    career: "이직 · 취업 · 커리어 천직 비서",
    wealth: "재물 · 투자 · 현실적 번영",
    inner: "내면 심리 · 무의식의 그림자 탐구"
  };

  /**
   * 프리미엄 타로 감명서 HTML 전체 조립
   */
  function buildTarotReportHtml(readingData) {
    const { userName, domain, question, spreadResult, sajuContext, orderId, issueDate } = readingData;
    const cards = spreadResult.cards;
    const spreadMeta = spreadResult.spread;

    const dignity = TarotEngine.calculateElementalDignity(cards);
    const reading = TarotEngine.generatePsychologicalReading(domain, question, spreadResult, sajuContext);
    const domainKo = DOMAIN_NAMES[domain] || "운명 심리 상담";

    let html = "";

    // ------------------------------------------------------------------------
    // [1. 표지 (A4 PDF 전용 1페이지 완벽 규격)]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-cover-card" id="tarotCoverCard">
        <div class="tarot-cover-border">
          <div class="cover-top-meta">
            <span class="meta-order">발급번호: ${orderId || 'TM-TAROT-20261019-7741'}</span>
            <span class="meta-date">감명일자: ${issueDate || '2026. 10. 19'}</span>
          </div>

          <div class="cover-badge-row">
            <div class="mystic-seal-badge">
              <span class="badge-tag">天門 秘傳 · 心理 鑑明</span>
              <span class="badge-sub">78 ARCANUM SYNCHRONICITY</span>
            </div>
          </div>

          <div class="cover-hero-title">
            <h1 class="tarot-main-title">무의식의 거울 · 심리 타로 비서</h1>
            <h2 class="tarot-sub-title">【 ${domainKo} 】</h2>
            <div class="tarot-client-name">내담자 <strong>${userName || '고객'}</strong> 님 惠存 (혜존)</div>
          </div>

          <div class="cover-spread-info">
            <div class="spread-pill">
              <i class="fa-solid fa-layer-group"></i> <strong>스프레드:</strong> ${spreadMeta.nameKo} (${spreadMeta.cardCount}장)
            </div>
            <div class="question-quote">
              <i class="fa-solid fa-quote-left"></i>
              <span>"${question || '내 운명의 숨은 신호와 올바른 선택의 길을 묻습니다.'}"</span>
            </div>
          </div>

          <div class="cover-auth-box">
            <div class="seal-mark">天門之印</div>
            <div class="auth-text">
              <strong>天門 타로 심리분석연구원 정품 감명</strong>
              <span>칼 구스타프 융 분석심리학 · 4원소 조화도 · 라이더-웨이트 78장 완전 고증</span>
            </div>
          </div>

          <div class="cover-footer-notice">
            <span>AUTHENTIC REPORT · CHEONMUN.LIFE</span>
            <span>본 감명서는 내담자의 무의식을 조명한 지침서이므로 타인에게 양도하지 마십시오.</span>
          </div>
        </div>
      </section>
    `;

    // ------------------------------------------------------------------------
    // [2. 챕터 1: 4원소 조화도 & 사주 하이브리드 크로스 분석]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-chapter" id="tarotChap_dignity">
        <div class="chapter-badge">제 1 장 · 원소와 무의식의 역학</div>
        <h3 class="chapter-title">4원소 조화도 (Elemental Dignities) 및 심리 기능 맵</h3>
        
        <div class="chapter-prose">
          <p>
            타로의 4대 수트는 칼 융이 주창한 인간의 4대 심리 기능(<strong>불=직관, 물=감정, 공기=사고, 흙=감각</strong>)과 일치합니다.
            내담자님이 뽑으신 ${spreadMeta.cardCount}장의 카드에서 추출된 4원소 분포는 지금 내면에서 어떤 심리 기능이 주도권을 쥐고 있고,
            어떤 기능이 억압되어 있는지를 명확히 보여줍니다.
          </p>
        </div>

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

        <div class="dignity-summary-card">
          <h4><i class="fa-solid fa-atom"></i> 원소 상호작용 총평: ${dignity.synergyTitle}</h4>
          <p>${dignity.synergyDesc}</p>
          <div class="dignity-tags">
            <span class="d-tag dom">최우세 에너지: ${dignity.dominant.meta.ko} (${dignity.dominant.meta.nature})</span>
            <span class="d-tag def">보완 필요: ${dignity.deficient.meta.ko}</span>
          </div>
        </div>

        ${reading.crossAnalysis ? `
          <div class="saju-cross-card">
            <h4><i class="fa-solid fa-yin-yang"></i> 天門 사주명식 x 타로 원소 하이브리드 고증</h4>
            <p><strong>사주 일간:</strong> ${reading.crossAnalysis.dayElement}(${reading.crossAnalysis.dayStem}) 기운</p>
            <p>${reading.crossAnalysis.crossNarrative}</p>
          </div>
        ` : ''}
      </section>
    `;

    // ------------------------------------------------------------------------
    // [3. 챕터 2: 스프레드 포지션별 카드 심층 해독]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-chapter" id="tarotChap_cards">
        <div class="chapter-badge">제 2 장 · 아르카나 상징 심층 해독</div>
        <h3 class="chapter-title">${spreadMeta.nameKo} — 포지션별 상징과 무의식 메시지</h3>
        
        <div class="cards-reading-list">
    `;

    cards.forEach((item, idx) => {
      const c = item.card;
      const isRev = item.isReversed;
      const text = isRev ? c.reversed : c.upright;
      const dirKo = isRev ? "역방향 (Reversed)" : "정방향 (Upright)";
      const dirClass = isRev ? "reversed" : "upright";

      // 도메인별 텍스트
      let domainText = text[domain] || text.core;

      html += `
        <div class="card-reading-row ${dirClass}">
          <div class="card-thumb-col">
            <div class="card-frame-wrap ${dirClass}">
              <img src="${c.image}" alt="${c.nameEn}" class="tarot-card-img ${dirClass}" />
              <span class="dir-badge ${dirClass}">${dirKo}</span>
            </div>
            <div class="card-roman-meta">${c.nameEn}</div>
          </div>

          <div class="card-content-col">
            <div class="pos-badge">포지션 ${idx + 1}: ${item.position.name}</div>
            <div class="pos-role-desc"><i class="fa-solid fa-compass"></i> ${item.position.role}</div>
            <h4 class="card-name-title">${c.nameKo} <span class="card-dir-mark">(${dirKo})</span></h4>
            
            <div class="card-keywords-wrap">
              ${c.keywords ? c.keywords.map(k => `<span class="c-tag">#${k}</span>`).join(' ') : ''}
            </div>

            <div class="symbol-desc-box">
              <strong><i class="fa-solid fa-eye"></i> 상징학적 심층 해설:</strong> ${c.symbolism || c.archetype || ''}
            </div>

            <div class="core-psychology-box">
              <h5><i class="fa-solid fa-brain"></i> 무의식의 본질 메시지</h5>
              <p>${text.core}</p>
            </div>

            <div class="domain-solution-box">
              <h5><i class="fa-solid fa-bullseye"></i> 【${domainKo}】 맞춤 솔루션</h5>
              <p>${domainText}</p>
            </div>

            <div class="action-advice-box">
              <i class="fa-solid fa-bolt"></i> <strong>주체적 행동 지침:</strong> ${text.advice}
            </div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </section>
    `;

    // ------------------------------------------------------------------------
    // [4. 챕터 3: 융 분석심리학 3단계 종합 카타르시스 리딩]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-chapter" id="tarotChap_synthesis">
        <div class="chapter-badge">제 3 장 · 융 분석심리학 카타르시스 리포트</div>
        <h3 class="chapter-title">무의식의 그림자 직면과 주체적 운명 개척</h3>
        
        <div class="jungian-step-box step-validation">
          <div class="step-header">
            <span class="step-num">STEP 1</span>
            <h4><i class="fa-solid fa-heart"></i> 깊은 공감과 감정의 반영 (Validation)</h4>
          </div>
          <div class="step-body">
            <p>${reading.validation}</p>
          </div>
        </div>

        <div class="jungian-step-box step-blindspot">
          <div class="step-header">
            <span class="step-num warning">STEP 2</span>
            <h4><i class="fa-solid fa-triangle-exclamation"></i> 뼈를 때리는 맹점 조명과 무의식의 그림자 직면 (Confronting the Blind Spot)</h4>
          </div>
          <div class="step-body">
            <p>${reading.blindSpot}</p>
          </div>
        </div>

        <div class="jungian-step-box step-action">
          <div class="step-header">
            <span class="step-num success">STEP 3</span>
            <h4><i class="fa-solid fa-check-double"></i> 주체적인 3대 현실 실천 지침 (Actionable Roadmap)</h4>
          </div>
          <div class="step-body">
            <ul class="action-list">
              ${reading.actionPlan.map(a => `<li><i class="fa-solid fa-arrow-right"></i> ${a}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="final-oracle-box">
          <div class="oracle-icon"><i class="fa-solid fa-crown"></i></div>
          <div class="oracle-text">
            <h5>천문 타로 살롱 최종 신탁 (The Final Oracle)</h5>
            <p>${reading.finalOutcomeSummary}</p>
          </div>
          <div class="oracle-seal-row">
            <div class="seal-mark">天門之印</div>
            <div class="oracle-seal-text">
              <span class="sub-line">天門 秘傳 · 78 ARCANUM SYNCHRONICITY</span>
              <strong>"내면의 무의식을 비추어 삶의 온전한 주인이 되십시오."</strong>
            </div>
          </div>
        </div>
      </section>
    `;

    return html;
  }

  return {
    buildTarotReportHtml
  };
}));
