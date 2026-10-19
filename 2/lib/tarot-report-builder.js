/**
 * ============================================================================
 * 天門 (CHEONMUN) 정통 타로 살롱 — 상황별 스프레드 & 맞춤형 PDF 감명서 빌더
 * (tarot-report-builder.js)
 * ----------------------------------------------------------------------------
 * 1. 표지: 선택 상황 · 정통 스프레드명 · 질문 · 뽑힌 카드 전체 요약 스트립
 * 2. 제1장: 내가 뽑은 스프레드 시각적 배치도(Visual Spread Blueprint) + 아르카나/정역/4원소 역학
 * 3. 제2장: 포지션별 질문 × 카드 상징 × 상황 맥락 × 앞뒤 카드 유기적 연결(Card-to-Card Flow) 심층 풀이
 * 4. 제3장: 스프레드 핵심 축(Axis) 교차 비교 분석 (A vs B, 나 vs 상대, 의식 vs 무의식)
 * 5. 제4장: 칼 융 분석심리학 3단계(공감 ➔ 맹점 직면 ➔ 3대 행동 지침) & 최종 신탁 어인(天門之印)
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

  /**
   * 스프레드 배치도 내부의 미니 카드 슬롯 HTML 생성 헬퍼
   */
  function renderDiagramNode(item, extraClass = '') {
    if (!item) return '';
    const c = item.card;
    const isRev = item.isReversed;
    const dirShort = isRev ? '역' : '정';
    const dirClass = isRev ? 'rev' : 'up';
    const shortPos = item.position.shortName || `${item.position.index + 1}. ${item.position.name}`;

    return `
      <div class="diag-node ${dirClass} ${extraClass}">
        <div class="diag-pos-tag">${shortPos}</div>
        <div class="diag-img-box ${dirClass}">
          <img src="${c.image}" alt="${c.nameKo}" />
          <span class="diag-dir-pill ${dirClass}">${dirShort}</span>
        </div>
        <div class="diag-card-name">${c.nameKo}</div>
      </div>
    `;
  }

  /**
   * 6대 정통 스프레드별 시각적 배치도(Visual Spread Blueprint) HTML 생성
   */
  function renderVisualSpreadDiagram(spreadResult) {
    const spreadMeta = spreadResult.spread;
    const cards = spreadResult.cards;
    const layout = spreadMeta.layoutType || spreadMeta.id;

    // 1. 재회 릴레이션십 브릿지 7카드 (bridge_7)
    if (layout === 'bridge_7') {
      return `
        <div class="spread-blueprint-box layout-bridge-7">
          <div class="blueprint-grid-bridge">
            <div class="bridge-col side-me">
              <div class="bridge-col-title"><i class="fa-solid fa-user"></i> 나의 영역</div>
              ${renderDiagramNode(cards[1])}
              ${renderDiagramNode(cards[4])}
            </div>
            <div class="bridge-col center-bridge">
              <div class="bridge-col-title"><i class="fa-solid fa-bridge"></i> 이별 원인 ➔ 연락 파장 ➔ 최종 귀결</div>
              ${renderDiagramNode(cards[0], 'highlight-node')}
              <div class="bridge-arrow"><i class="fa-solid fa-angles-down"></i></div>
              ${renderDiagramNode(cards[5], 'highlight-node')}
              <div class="bridge-arrow"><i class="fa-solid fa-angles-down"></i></div>
              ${renderDiagramNode(cards[6], 'outcome-node')}
            </div>
            <div class="bridge-col side-partner">
              <div class="bridge-col-title"><i class="fa-solid fa-heart"></i> 상대방의 영역 (겉 / 무의식)</div>
              ${renderDiagramNode(cards[2])}
              ${renderDiagramNode(cards[3], 'highlight-node')}
            </div>
          </div>
        </div>
      `;
    }

    // 2. 연애 러버스 미러 6카드 (mirror_6)
    if (layout === 'mirror_6') {
      return `
        <div class="spread-blueprint-box layout-mirror-6">
          <div class="blueprint-grid-mirror">
            <div class="mirror-pair-row">
              ${renderDiagramNode(cards[0])}
              <div class="mirror-vs-icon"><i class="fa-solid fa-arrows-left-right"></i><span>시선의 거울 대칭</span></div>
              ${renderDiagramNode(cards[1])}
            </div>
            <div class="mirror-pair-row">
              ${renderDiagramNode(cards[2], 'highlight-node')}
              <div class="mirror-vs-icon"><i class="fa-solid fa-heart-pulse"></i><span>속마음 & 장애물</span></div>
              ${renderDiagramNode(cards[3])}
            </div>
            <div class="mirror-pair-row bottom-row">
              ${renderDiagramNode(cards[4], 'highlight-node')}
              <div class="mirror-vs-icon"><i class="fa-solid fa-arrow-right-long"></i><span>공략 열쇠 ➔ 미래</span></div>
              ${renderDiagramNode(cards[5], 'outcome-node')}
            </div>
          </div>
        </div>
      `;
    }

    // 3. 양자택일 V자 갈림길 7카드 (v_choice_7)
    if (layout === 'v_choice_7') {
      return `
        <div class="spread-blueprint-box layout-v-choice-7">
          <div class="v-choice-branches-wrap">
            <div class="v-branch branch-a">
              <div class="v-branch-header path-a"><i class="fa-solid fa-route"></i> 선택 A 경로 (진행 · 대가 · 결과)</div>
              <div class="v-branch-cards">
                ${renderDiagramNode(cards[1])}
                ${renderDiagramNode(cards[2])}
                ${renderDiagramNode(cards[3], 'highlight-node')}
              </div>
            </div>
            <div class="v-branch branch-b">
              <div class="v-branch-header path-b"><i class="fa-solid fa-compass"></i> 선택 B 경로 (진행 · 대가 · 결과)</div>
              <div class="v-branch-cards">
                ${renderDiagramNode(cards[4])}
                ${renderDiagramNode(cards[5])}
                ${renderDiagramNode(cards[6], 'outcome-node')}
              </div>
            </div>
          </div>
          <div class="v-choice-root">
            <div class="v-root-label"><i class="fa-solid fa-code-fork"></i> 갈림길의 중심 (현재 나의 내면 상태)</div>
            ${renderDiagramNode(cards[0], 'highlight-node')}
          </div>
        </div>
      `;
    }

    // 4. 커리어 말굽 호스슈 7카드 (horseshoe_7)
    if (layout === 'horseshoe_7') {
      return `
        <div class="spread-blueprint-box layout-horseshoe-7">
          <div class="horseshoe-row top-arch">
            ${renderDiagramNode(cards[2], 'highlight-node')}
            ${renderDiagramNode(cards[3])}
            ${renderDiagramNode(cards[4])}
          </div>
          <div class="horseshoe-row mid-arch">
            ${renderDiagramNode(cards[1])}
            ${renderDiagramNode(cards[5], 'highlight-node')}
          </div>
          <div class="horseshoe-row bot-arch">
            ${renderDiagramNode(cards[0])}
            ${renderDiagramNode(cards[6], 'outcome-node')}
          </div>
        </div>
      `;
    }

    // 5. 재물 펜타클 다이아몬드 6카드 (diamond_6)
    if (layout === 'diamond_6') {
      return `
        <div class="spread-blueprint-box layout-diamond-6">
          <div class="diamond-row top">
            ${renderDiagramNode(cards[4], 'highlight-node')}
          </div>
          <div class="diamond-row middle">
            ${renderDiagramNode(cards[2])}
            <div class="diamond-center-pair">
              ${renderDiagramNode(cards[0], 'highlight-node')}
              ${renderDiagramNode(cards[1])}
            </div>
            ${renderDiagramNode(cards[3])}
          </div>
          <div class="diamond-row bottom">
            ${renderDiagramNode(cards[5], 'outcome-node')}
          </div>
        </div>
      `;
    }

    // 6. 정통 켈틱 크로스 10카드 (celtic_10)
    return `
      <div class="spread-blueprint-box layout-celtic-10">
        <div class="blueprint-celtic-grid">
          <div class="blueprint-celtic-cross">
            <div class="bc-top">${renderDiagramNode(cards[4])}</div>
            <div class="bc-mid">
              ${renderDiagramNode(cards[3])}
              <div class="bc-center-pair">
                ${renderDiagramNode(cards[0], 'highlight-node')}
                ${renderDiagramNode(cards[1], 'crossing-node')}
              </div>
              ${renderDiagramNode(cards[5])}
            </div>
            <div class="bc-bot">${renderDiagramNode(cards[2])}</div>
          </div>
          <div class="blueprint-celtic-staff">
            <div class="staff-label">운명의 기둥 (Staff)</div>
            ${renderDiagramNode(cards[9], 'outcome-node')}
            ${renderDiagramNode(cards[8])}
            ${renderDiagramNode(cards[7])}
            ${renderDiagramNode(cards[6])}
          </div>
        </div>
      </div>
    `;
  }

  /**
   * 프리미엄 타로 감명서 HTML 전체 조립
   */
  function buildTarotReportHtml(readingData) {
    const { userName, domain, question, spreadResult, orderId, issueDate } = readingData;
    const cards = spreadResult.cards;
    const spreadMeta = spreadResult.spread;

    const reading = TarotEngine.generatePsychologicalReading(domain, question, spreadResult);
    const dignity = reading.dignity;
    const axis = reading.axisAnalysis;
    const posReadings = reading.positionReadings;

    const categoryTitle = spreadMeta.categoryTitle || spreadMeta.nameKo;
    const spreadEnBadge = spreadMeta.shortBadge || `${spreadMeta.cardCount} CARDS SPREAD`;
    const revRatio = Math.round((dignity.reversedCount / cards.length) * 100);

    let html = "";

    // ------------------------------------------------------------------------
    // [1. 표지 (A4 PDF 전용 1페이지 완벽 규격 — 상황·스프레드·뽑은 카드 스트립)]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-cover-card" id="tarotCoverCard">
        <div class="tarot-cover-border">
          <div class="cover-top-meta">
            <span class="meta-order">발급번호: ${orderId || 'TM-TAROT-20261020-7741'}</span>
            <span class="meta-date">감명일자: ${issueDate || '2026. 10. 20'}</span>
          </div>

          <div class="cover-badge-row">
            <div class="mystic-seal-badge">
              <span class="badge-tag">天門 타로 살롱 · 정통 아르카나 감명서</span>
              <span class="badge-sub">${spreadEnBadge}</span>
            </div>
          </div>

          <div class="cover-hero-title">
            <h1 class="tarot-main-title">${spreadMeta.nameKo}</h1>
            <h2 class="tarot-sub-title">【 ${categoryTitle} 】</h2>
            <div class="tarot-client-name">질문자(Querent): <strong>${userName || '내담자'}</strong> 님 전용 신탁</div>
          </div>

          <div class="cover-spread-info">
            <div class="spread-pill">
              <i class="fa-solid fa-compass-drafting"></i> <strong>적용 스프레드:</strong> ${spreadMeta.nameKo} (${spreadMeta.cardCount}장 정통 배치)
            </div>
            <div class="question-quote">
              <i class="fa-solid fa-quote-left"></i>
              <span>"${question || '지금 내 운명의 갈림길에서 무의식이 가리키는 진실과 최선의 선택을 묻습니다.'}"</span>
            </div>
            <div class="spread-purpose-note">
              ${spreadMeta.desc || ''}
            </div>
          </div>

          <!-- 표지 하단: 내가 직접 뽑은 카드 요약 스트립 -->
          <div class="cover-drawn-strip-box">
            <div class="strip-title"><i class="fa-solid fa-layer-group"></i> 내담자님이 직접 뽑으신 ${spreadMeta.cardCount}장의 아르카나 기록</div>
            <div class="cover-drawn-strip">
              ${cards.map((item, idx) => `
                <div class="strip-card-item ${item.isReversed ? 'rev' : 'up'}">
                  <span class="strip-pos-num">POS ${idx + 1}</span>
                  <div class="strip-thumb ${item.isReversed ? 'rev' : 'up'}">
                    <img src="${item.card.image}" alt="${item.card.nameKo}" />
                  </div>
                  <span class="strip-card-name">${item.card.nameKo}</span>
                  <span class="strip-card-dir">${item.isReversed ? '(역방향)' : '(정방향)'}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="cover-auth-box">
            <div class="seal-mark">天門之印</div>
            <div class="auth-text">
              <strong>天門 타로 살롱 & 분석심리학 연구원 정품 감명</strong>
              <span>상황별 정통 스프레드 역학 · 4원소 조화도(Elemental Dignities) · 칼 융 분석심리학 완전 고증</span>
            </div>
          </div>

          <div class="cover-footer-notice">
            <span>AUTHENTIC TAROT READING · CHEONMUN SALON</span>
            <span>본 감명서는 질문자님이 직접 뽑으신 카드와 스프레드 포지션의 고유한 공명을 해독한 서책입니다.</span>
          </div>
        </div>
      </section>
    `;

    // ------------------------------------------------------------------------
    // [2. 제 1 장: 내가 뽑은 스프레드 시각적 배치도 & 거시적 에너지 역학]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-chapter" id="tarotChap_blueprint">
        <div class="chapter-badge">제 1 장 · 스프레드 배치도와 거시적 에너지 판독</div>
        <h3 class="chapter-title">${spreadMeta.nameKo} — 시각적 배치도 (Spread Blueprint)</h3>
        
        <div class="chapter-prose">
          <p>
            타로 리딩에서 가장 중요한 것은 <strong>"어떤 질문의 자리(Position)에 어떤 카드가 놓였으며, 카드들이 서로 어떻게 시선을 주고받는가"</strong>입니다.
            아래 도면은 <strong>${userName || '내담자'}</strong> 님이 직접 선택하신 ${spreadMeta.cardCount}장의 카드가 <strong>【${spreadMeta.nameKo}】</strong>의 각 포지션에 실제로 배치된 결과입니다.
          </p>
        </div>

        <!-- 실제 뽑은 카드가 배치된 시각적 스프레드 도면 -->
        ${renderVisualSpreadDiagram(spreadResult)}

        <!-- 메이저/마이너 비중 & 정/역방향 에너지 흐름 2단 분석 -->
        <div class="macro-mechanics-grid">
          <div class="mechanic-box">
            <h4><i class="fa-solid fa-crown"></i> 아르카나 운명 비중 판독</h4>
            <div class="mechanic-stat-badges">
              <span class="m-badge gold">메이저 아르카나 ${dignity.majorCount}장 (${dignity.majorRatio}%)</span>
              <span class="m-badge slate">마이너 아르카나 ${dignity.minorCount}장 (${100 - dignity.majorRatio}%)</span>
            </div>
            <p>${dignity.arcanaAnalysis}</p>
          </div>

          <div class="mechanic-box">
            <h4><i class="fa-solid fa-arrows-up-down"></i> 정·역방향 무의식 흐름 판독</h4>
            <div class="mechanic-stat-badges">
              <span class="m-badge green">정방향(Upright) ${dignity.uprightCount}장</span>
              <span class="m-badge red">역방향(Reversed) ${dignity.reversedCount}장 (${revRatio}%)</span>
            </div>
            <p>${dignity.orientationAnalysis}</p>
          </div>
        </div>

        <!-- 4원소 조화도 (Elemental Dignities) -->
        <div class="dignity-section-wrap">
          <h4 class="sub-sec-title"><i class="fa-solid fa-atom"></i> 4원소 조화도 (Elemental Dignities) 및 융 심리 기능 분포</h4>
          <div class="elements-stat-grid">
            <div class="el-stat-col fire">
              <div class="el-head"><i class="fa-solid fa-fire"></i> 불 (Wands · 火)</div>
              <div class="el-jung">직관 · 열정 · 추진력</div>
              <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.fire}%;"></div></div>
              <div class="el-pct">${dignity.counts.fire}장 (${dignity.percentages.fire}%)</div>
            </div>
            <div class="el-stat-col water">
              <div class="el-head"><i class="fa-solid fa-water"></i> 물 (Cups · 水)</div>
              <div class="el-jung">감정 · 애착 · 수용성</div>
              <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.water}%;"></div></div>
              <div class="el-pct">${dignity.counts.water}장 (${dignity.percentages.water}%)</div>
            </div>
            <div class="el-stat-col air">
              <div class="el-head"><i class="fa-solid fa-wind"></i> 공기 (Swords · 風)</div>
              <div class="el-jung">이성 · 분석 · 결단력</div>
              <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.air}%;"></div></div>
              <div class="el-pct">${dignity.counts.air}장 (${dignity.percentages.air}%)</div>
            </div>
            <div class="el-stat-col earth">
              <div class="el-head"><i class="fa-solid fa-mountain"></i> 흙 (Pentacles · 地)</div>
              <div class="el-jung">감각 · 현실 · 결과물</div>
              <div class="el-bar-wrap"><div class="el-bar-fill" style="width: ${dignity.percentages.earth}%;"></div></div>
              <div class="el-pct">${dignity.counts.earth}장 (${dignity.percentages.earth}%)</div>
            </div>
          </div>

          <div class="dignity-summary-card">
            <h4><i class="fa-solid fa-scale-balanced"></i> 원소 상생·상극 판정: ${dignity.synergyTitle}</h4>
            <p>${dignity.synergyDesc}</p>
            <div class="dignity-tags">
              <span class="d-tag dom">최우세 에너지: ${dignity.dominant.meta.ko} (${dignity.dominant.meta.nature || ''})</span>
              <span class="d-tag def">보완 필요 에너지: ${dignity.deficient.meta.ko} (${dignity.deficient.meta.nature || ''})</span>
            </div>
          </div>
        </div>
      </section>
    `;

    // ------------------------------------------------------------------------
    // [3. 제 2 장: 포지션별 심층 맥락 풀이 (Position × Card × Flow)]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-chapter" id="tarotChap_positions">
        <div class="chapter-badge">제 2 장 · 포지션별 아르카나 심층 맥락 해독</div>
        <h3 class="chapter-title">${spreadMeta.nameKo} — 각 자리의 질문과 뽑힌 카드의 입체적 응답</h3>
        <div class="chapter-prose">
          <p>
            같은 카드라도 <strong>'나의 현재 마음'</strong> 자리에 놓였을 때와 <strong>'상대방의 무의식 속마음'</strong>이나 <strong>'선택의 대가'</strong> 자리에 놓였을 때의 해독은 완전히 달라집니다.
            각 포지션이 던지는 질문에 당신이 뽑은 카드가 어떻게 응답하고 있는지, 그리고 앞뒤 포지션의 카드들과 어떻게 유기적으로 연결되는지 한 장씩 정밀하게 해독합니다.
          </p>
        </div>

        <div class="cards-reading-list">
    `;

    posReadings.forEach((pRead, idx) => {
      const c = pRead.card;
      const pos = pRead.position;
      const isRev = pRead.isReversed;
      const dirClass = isRev ? "reversed" : "upright";
      const posNum = idx + 1;
      const keywords = c.keywords || [];

      html += `
        <div class="card-reading-row ${dirClass}" id="posReading_${posNum}">
          <div class="card-thumb-col">
            <div class="pos-num-circle">POS ${posNum}</div>
            <div class="card-frame-wrap ${dirClass}">
              <img src="${c.image}" alt="${c.nameEn}" class="tarot-card-img ${dirClass}" />
              <span class="dir-badge ${dirClass}">${pRead.dirKo}</span>
            </div>
            <div class="card-roman-meta">${c.nameEn}</div>
            <div class="card-archetype-tag">${pRead.archetype}</div>
          </div>

          <div class="card-content-col">
            <div class="pos-header-banner">
              <div class="pos-badge">포지션 ${posNum} / ${spreadMeta.cardCount} · ${pos.name}</div>
              <div class="pos-question-line"><i class="fa-solid fa-circle-question"></i> <strong>이 자리의 핵심 질문:</strong> "${pos.question}"</div>
              <div class="pos-role-desc"><i class="fa-solid fa-compass"></i> 역할 정의: ${pos.role}</div>
            </div>

            <h4 class="card-name-title">
              ${c.nameKo} <span class="card-dir-mark">— ${pRead.dirKo}</span>
            </h4>
            
            <div class="card-keywords-wrap">
              ${keywords.map(k => `<span class="c-tag">#${k}</span>`).join(' ')}
            </div>

            <!-- 1. 왜 이 포지션에 이 카드가 나왔는가 (맥락 진입) -->
            <div class="context-intro-box">
              <h5><i class="fa-solid fa-key"></i> 왜 【${pos.shortName || pos.name}】 자리에 이 카드가 나타났는가?</h5>
              <p>${pRead.contextIntro}</p>
            </div>

            <!-- 2. 도상학 상징 -->
            <div class="symbol-desc-box">
              <strong><i class="fa-solid fa-eye"></i> 라이더-웨이트 도상학(Iconography) 및 원형 상징:</strong> ${pRead.symbolism || c.upright.core || ''}
            </div>

            <!-- 3. 상황별·포지션별 맞춤 실전 풀이 -->
            <div class="domain-solution-box">
              <h5><i class="fa-solid fa-bullseye"></i> 【${categoryTitle}】 포지션 밀착 심층 해독</h5>
              <p>${pRead.deepContextualBody}</p>
            </div>

            <!-- 4. 앞뒤 포지션 카드와의 유기적 연결 흐름 (Card-to-Card Synergy Flow) -->
            <div class="card-flow-box">
              <h5><i class="fa-solid fa-diagram-project"></i> 인접 포지션 카드와의 유기적 흐름 (Card-to-Card Flow)</h5>
              <p>${pRead.flowConnection}</p>
            </div>

            <!-- 5. 이 포지션의 행동 지침 -->
            <div class="action-advice-box">
              <i class="fa-solid fa-bolt"></i> <strong>이 포지션의 실천 비책:</strong> ${pRead.advice}
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
    // [4. 제 3 장: 스프레드 핵심 축(Axis) 교차 비교 분석]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-chapter" id="tarotChap_axis">
        <div class="chapter-badge">제 3 장 · 스프레드 핵심 축(Axis) 교차 비교 판정</div>
        <h3 class="chapter-title">${axis.title}</h3>
        
        <div class="chapter-prose">
          <p>${axis.subtitle} — 개별 카드의 의미를 넘어, <strong>【${spreadMeta.nameKo}】</strong>의 구조적 대칭축을 이루는 핵심 포지션들을 서로 맞대어 비교한 결과입니다.</p>
        </div>

        <div class="axes-list-wrap">
          ${axis.axes.map(ax => `
            <div class="axis-block-card">
              <div class="axis-block-label"><i class="fa-solid fa-scale-balanced"></i> ${ax.label}</div>
              <div class="axis-comparison-grid">
                <div class="axis-col left-axis">
                  <div class="axis-col-header">${ax.leftTitle}</div>
                  <div class="axis-col-summary">${ax.leftDesc}</div>
                </div>
                <div class="axis-vs-divider"><span>VS</span></div>
                <div class="axis-col right-axis">
                  <div class="axis-col-header">${ax.rightTitle}</div>
                  <div class="axis-col-summary">${ax.rightDesc}</div>
                </div>
              </div>
              <div class="axis-synthesis-box">
                <h4><i class="fa-solid fa-gavel"></i> 교차 분석 판정</h4>
                <p>${ax.synthesis}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;

    // ------------------------------------------------------------------------
    // [5. 제 4 장: 융 분석심리학 3단계 종합 카타르시스 & 최종 신탁 어인]
    // ------------------------------------------------------------------------
    html += `
      <section class="tarot-chapter" id="tarotChap_synthesis">
        <div class="chapter-badge">제 4 장 · 칼 융 분석심리학 3단계 솔루션 & 최종 신탁</div>
        <h3 class="chapter-title">무의식의 그림자 직면과 주체적 운명 개척 로드맵</h3>
        
        <div class="jungian-step-box step-validation">
          <div class="step-header">
            <span class="step-num">STEP 1</span>
            <h4><i class="fa-solid fa-heart"></i> 깊은 공감과 현재 에너지의 수용 (Validation)</h4>
          </div>
          <div class="step-body">
            <p>${reading.validation}</p>
          </div>
        </div>

        <div class="jungian-step-box step-blindspot">
          <div class="step-header">
            <span class="step-num warning">STEP 2</span>
            <h4><i class="fa-solid fa-triangle-exclamation"></i> 뼈를 때리는 맹점 조명과 무의식의 그림자 직면 (Confronting the Shadow)</h4>
          </div>
          <div class="step-body">
            <p>${reading.blindSpot}</p>
          </div>
        </div>

        <div class="jungian-step-box step-action">
          <div class="step-header">
            <span class="step-num success">STEP 3</span>
            <h4><i class="fa-solid fa-check-double"></i> 뽑으신 카드들이 지시하는 3대 현실 행동 지침 (Actionable Roadmap)</h4>
          </div>
          <div class="step-body">
            <ul class="action-list">
              ${reading.actionPlan.map(a => `<li><i class="fa-solid fa-arrow-right"></i> <span>${a}</span></li>`).join('')}
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
              <span class="sub-line">天門 秘傳 · ${spreadEnBadge}</span>
              <strong>"카드는 운명을 선고하지 않습니다. 당신이 무의식을 깨워 운명을 선택하게 합니다."</strong>
            </div>
          </div>
        </div>
      </section>
    `;

    return html;
  }

  return {
    buildTarotReportHtml,
    renderVisualSpreadDiagram
  };
}));
