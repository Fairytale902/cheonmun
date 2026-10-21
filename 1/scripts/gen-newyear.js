/**
 * gen-newyear.js - 제1권 세운 총운 & 12개월 월별 터닝포인트 (21장)
 */
function getNewYearBuilderCode() {
  return `
// ============================================================================
// 1. 제1권 (newyear) : 세운(歲運) 총운 & 향후 12개월 월별 터닝포인트 (총 21장)
// ============================================================================
function buildNewYearReportHtml(user, natureName) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const dayEl = CHEONGAN_ELEMENTS[dayMaster];
  const climate = user.climate;
  const pattern = user.pattern || SAJU_PATTERNS['정관격'];
  const strength = user.strength;
  const yongshin = user.yongshin;
  const seun = getDynamicSeunContext(user);
  const med = diagnoseMedicalSaju(user);

  const userConcern = user.userConcernDetail 
    ? \`<div class="counseling-empathy-box">
         <h5><i class="fa-solid fa-feather-pointed"></i> 의뢰인 \${user.name}님의 밤잠을 설치게 만드는 현실 고민 진단</h5>
         <p><strong>의뢰인 호소:</strong> "\${user.userConcernDetail}"<br>
         사주 원국과 당해 세운(\${seun.yearHanja})의 흐름을 대조한 결과, 이 고민은 개인의 능력 부족이 아니라 \${seun.yearTenGod}의 기운이 인생의 새로운 국면을 요구하며 안방과 직무궁을 흔들기 때문에 일어나는 구조적 성장통입니다. 본 감명서의 비책에 따라 행동 타이밍을 조율하십시오.</p>
       </div>\`
    : '';

  // 향후 12개월 각 달마다 단독 1페이지 분량의 심층 챕터 생성 (제4장 ~ 제15장, 총 12장)
  const monthlyChaptersHtml = seun.months12.map((m, idx) => {
    const chapNum = idx + 4;
    const isClash = (m.branchIdx + 6) % 12 === dayBranch;
    const isMonthClash = (m.branchIdx + 6) % 12 === user.pillars.month.branchIdx;
    const isComb = (
      (m.branchIdx + dayBranch === 1) ||
      (m.branchIdx === 2 && dayBranch === 11) || (m.branchIdx === 11 && dayBranch === 2) ||
      (m.branchIdx === 3 && dayBranch === 10) || (m.branchIdx === 10 && dayBranch === 3) ||
      (m.branchIdx === 4 && dayBranch === 9) || (m.branchIdx === 9 && dayBranch === 4) ||
      (m.branchIdx === 5 && dayBranch === 8) || (m.branchIdx === 8 && dayBranch === 5) ||
      (m.branchIdx === 6 && dayBranch === 7) || (m.branchIdx === 7 && dayBranch === 6)
    );

    let incidentTheme = '';
    let incidentStory = '';
    let actionStory = '';

    if (isClash) {
      incidentTheme = '일지 정면충(沖) — 안방과 거주 환경의 대격변 및 관계 정리';
      incidentStory = \`이달은 이달의 지지 \${m.zhi}(\${JIJI[m.branchIdx]})가 \${user.name}님의 뿌리이자 안방인 일지 \${JIJI_HANJA[dayBranch]}(\${JIJI[dayBranch]})를 정면으로 충돌(沖)합니다. 가만히 머물러 있으려 해도 주변 환경과 관계가 강제로 흔들리는 징조가 뚜렷합니다. 부부·연인 간의 사소한 서운함이 극단적인 자존심 싸움으로 번지거나, 살고 있는 집의 누수·계약 만료, 또는 조직 내 갑작스러운 부서 이동·출장 이슈가 한꺼번에 몰아닥칩니다. 과거의 미련이나 낡은 방식에 집착하면 신체 통증이나 관재구설로 터지니 주의하십시오.\`;
      actionStory = \`충(沖)은 내가 먼저 선제적으로 기운을 빼주면 '대변혁의 기회'로 승화됩니다. 이달에는 방치했던 집안 가구 배치를 바꾸거나, 묵은 짐을 대대적으로 버리고, 장거리 여행이나 출장으로 공간을 이동하십시오. 특히 \${m.month}월에는 중요한 감정적 담판이나 이별 통보를 홧김에 하지 마시고, 결정 전 반드시 48시간의 냉각기를 두어야 뒤탈을 막습니다.\`;
    } else if (isMonthClash) {
      incidentTheme = '월지 사회궁 충(沖) — 직장 내 보직 변경, 상사 마찰, 거래선 재편';
      incidentStory = \`이달의 지지가 \${user.name}님의 사회적 활동 무대인 월지 \${JIJI_HANJA[user.pillars.month.branchIdx]}를 강하게 타격합니다. 상사의 갑작스러운 퇴사나 조직 개편으로 내 업무 영역이 강제로 바뀌거나, 믿었던 거래처와의 계약 조건 변경, 주력 프로젝트의 피벗(Pivot)이 발생합니다. 이는 당신을 밀어내려는 악재가 아니라, 더 큰 물로 나가기 위해 낡은 판을 깨뜨리는 명리학적 환골탈태입니다.\`;
      actionStory = \`조직 내 힘겨루기에 직접 휘말리지 마시고 모든 지시와 합의 사항을 문서와 메일로 철저히 남겨 책임을 분산하십시오. 또한 이달은 헤드헌터나 외부에서 솔깃한 이직 제안이 들어오는 달이니, 즉흥적으로 사표를 던지지 말고 이면 조건을 냉정히 저울질하며 몸값을 높이는 협상 카드로 활용하십시오.\`;
    } else if (isComb) {
      incidentTheme = '일지 육합(六合) — 귀인 결속, 극적 계약 체결, 애정의 반등';
      incidentStory = \`이달의 지지 \${m.zhi}가 일지 \${JIJI_HANJA[dayBranch]}와 끈끈한 육합(六合)을 이루어 얼어붙었던 기운이 봄눈 녹듯 풀립니다. 흩어졌던 자금과 사람의 마음이 하나로 모이며, 지지부진하던 협상이나 계약이 극적으로 성사되는 징조가 나타납니다. 연인과의 관계에서는 오해가 풀리고 결혼 논의가 급물살을 타며, 솔로인 경우 신뢰할 만한 귀인의 소개로 지적 수준이 맞는 인연과 급격히 가까워집니다.\`;
      actionStory = \`기운이 결속되는 황금기이므로 망설였던 제안서 발송, 투자 유치, 연봉 협상, 공식 프로포즈를 이달 안에 밀어붙이십시오. 다만 합(合)의 기운이 과하면 정에 이끌려 맺고 끊음을 분명히 하지 못할 수 있으니, 친밀한 관계일수록 공과 사를 명확히 구분하는 서류를 구비해야 복록이 오래갑니다.\`;
    } else {
      incidentTheme = \`\${m.tenGod} 투출 — 사회적 명분 획득과 현실적 결실의 수확\`;
      incidentStory = \`천간에 \${m.gan}(\${m.tenGod})의 기운이 우뚝 솟아 사회적으로 당신의 존재감이 널리 드러납니다. 주도권을 쥐고 프로젝트를 진두지휘하거나 새로운 수익원을 개척할 기회가 주어집니다. 다만 지지의 \${m.zhi}(\${m.branchTenGod}) 기운과의 조화를 살피지 않고 과속하면, 월 중순(14일~20일 사이)에 예상치 못한 업무 과부하로 번아웃이 올 수 있으니 완급 조절이 필요합니다.\`;
      actionStory = \`혼자 모든 책임을 짊어지려 하지 말고 주변 동료나 외부 파트너에게 역할을 위임하십시오. 이달에는 당장의 단기 현금 차익에 눈멀기보다 장기적인 지분·라이선스·인허가 등 '문서화된 권리'를 확보하는 데 집중할 때 향후 몇 배의 자산으로 돌아옵니다.\`;
    }

    const luckyDays = \`\${(m.month * 3) % 9 + 2}일, \${(m.month * 5) % 10 + 12}일, \${(m.month * 7) % 8 + 21}일\`;
    const cautionDays = \`\${(m.month * 2) % 7 + 4}일, \${(m.month * 4) % 9 + 16}일\`;
    const luckyDir = (m.branchIdx % 2 === 0) ? '동남쪽 (새로운 생기와 기회가 솟는 방위)' : '북서쪽 (안정과 귀인의 비호를 받는 방위)';
    const luckyColor = ['wood', 'water'].includes(m.el) ? '네이비 블루 · 다크 그린' : '아이보리 화이트 · 샴페인 골드';

    return \`
      <div class="report-chapter">
        <div class="chapter-badge">CHAPTER \${String(chapNum).padStart(2, '0')} · 향후 12개월 월별 단독 감명 (제\${m.seq}월)</div>
        <h3 class="chapter-title">\${m.year}년 \${m.month}월 [\${m.gan}\${m.zhi}(\${m.kor})월] — \${m.tenGod}·\${m.branchTenGod}의 기운과 실전 운명 비책</h3>
        <div class="chapter-prose">
          <p>
            감명 시점으로부터 <strong>제\${m.seq}번째 달인 \${m.year}년 \${m.month}월(\${m.gan}\${m.zhi}월)</strong>은 \${user.name}님의 일간 \${CHEONGAN_HANJA[dayMaster]}(\${CHEONGAN[dayMaster]})을 기준으로 천간에 <strong>\${m.tenGod}</strong>, 지지에 <strong>\${m.branchTenGod}</strong>의 파동을 드리웁니다. \${incidentTheme}.
          </p>
          <p>
            이 시기에는 명리학적으로 겉으로 드러나는 명분(\${m.gan})과 바닥에서 움직이는 실속(\${m.zhi}) 사이에 묘한 온도 차가 발생합니다. 남들의 시선에 그럴듯해 보이는 일보다, 내 손에 실질적인 현금과 권한이 쥐어지는 길을 선택해야 후회가 없습니다.
          </p>

          <div class="event-prediction-box">
            <h5><i class="fa-solid fa-bolt"></i> 앞으로 벌어질 구체적 징조와 사건 예고</h5>
            <p>\${incidentStory}</p>
          </div>

          <div class="action-secret-box">
            <h5><i class="fa-solid fa-scroll"></i> 천문 황실 비전(秘傳) — 이달의 실전 비방(秘方) 및 개운 행동</h5>
            <p>
              • <strong>약속 및 담판 길방(吉方):</strong> 중요한 협상이나 미팅 시 \${luckyDir}에 위치한 회의실이나 좌석을 선점하십시오.<br>
              • <strong>의상 및 소지품 파장:</strong> 이달에는 \${luckyColor} 계열의 상의나 금속성 소지품을 몸에 지니면 불필요한 구설을 튕겨냅니다.<br>
              • <strong>실전 행동 강령:</strong> \${actionStory}
            </p>
          </div>

          <div class="medical-care-box">
            <h5><i class="fa-solid fa-leaf"></i> 의명학(醫命學) 장부 양생 및 체질 보양 처방</h5>
            <p>
              이달은 \${ELEMENT_KOREAN[m.el]} 기운의 변동으로 \${user.name}님의 취약 장부인 <strong>\${med.deficientOrgan.zang}과 \${med.attackedOrgan.fu}</strong>의 피로도가 가중됩니다. 소화불량이나 안구 건조, 만성 피로가 잦아질 수 있으니 식단에 <strong>\${med.deficientOrgan.medicinalFood.split(',').slice(0, 4).join(', ')}</strong> 섭취를 늘리고, \${med.deficientOrgan.teaPrescription}을 온수로 틈틈이 음용하십시오.
            </p>
          </div>

          <div class="key-point-box">
            <h5><i class="fa-solid fa-calendar-check"></i> \${m.year}년 \${m.month}월 핵심 길일(吉日) & 주의일 캘린더</h5>
            <p>
              • <strong>대길일(결단·계약·면접·자금 집행):</strong> \${m.month}월 <strong>\${luckyDays}</strong> (우주적 에너지가 집중되는 타이밍)<br>
              • <strong>주의일(감정 충돌·문서 오기·구설 조심):</strong> \${m.month}월 <strong>\${cautionDays}</strong> (야간 음주 및 즉흥적 계좌 송금을 철저히 삼가십시오)
            </p>
          </div>
        </div>
      </div>
    \`;
  }).join('');

  return \`
    \${buildMyeongshikTableHtml(user)}

    <!-- 제1장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 세운(歲運) 총론 및 천문 기상도</div>
      <h3 class="chapter-title">\${user.name}님의 \${natureName} 원국과 당해 세운(\${seun.yearHanja}·\${seun.yearKor})의 대충돌과 조화</h3>
      <div class="chapter-prose">
        <p>
          사주명리학에서 원국(原局) 여덟 글자가 당신이 타고난 ‘자동차의 차체와 엔진’이라면, 해마다 바뀌며 찾아오는 <strong>세운(歲運)</strong>은 당신이 지금 달리고 있는 ‘도로의 기후와 지형’입니다. 본 감명서는 과거의 연도에 얽매이지 않고, \${user.name}님께서 운명을 조회하신 현재 시점(<strong>\${seun.curYear}년 \${seun.curMonth}월</strong>)을 기점으로 당해 <strong>\${seun.yearHanja}(\${seun.yearKor}) 세운</strong>과 향후 12개월간의 월건(月建) 변화를 천문력 기준으로 정밀 추적합니다.
        </p>
        <p>
          현재 하늘을 지배하는 세운의 천간은 <strong>\${seun.yearGan}(\${ELEMENT_KOREAN[seun.yearEl]})</strong>이며, 지지는 <strong>\${seun.yearZhi}(\${seun.yearAnimal})</strong>입니다. 이를 \${user.name}님의 일간 <strong>\${CHEONGAN_HANJA[dayMaster]}(\${CHEONGAN[dayMaster]})</strong>에 대입하면 육친상 <strong>‘\${seun.yearTenGod}’</strong>의 거대한 파도가 삶의 전면에 밀려들어 온 형국입니다.
        </p>

        \${userConcern}

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-bolt"></i> 당해 세운(\${seun.yearHanja})에 일어날 핵심 사건과 환경 변화</h5>
          <p>
            올해는 그동안 미뤄두었던 인생의 중대 과제가 한꺼번에 고개를 드는 해입니다. 직업과 사회적 무대에서는 \${seun.yearTenGod}의 주도권 쟁탈전이 벌어지며, 과거의 익숙했던 루틴에서 벗어나 새로운 권한을 쥐거나 독자적인 성과를 입증해야 하는 상황으로 내몰립니다. 특히 상반기에는 주변 사람들과의 기대치 불일치로 인한 피로감이 누적될 수 있으나, 가을 이후 조후용신인 \${yongshin.johuYongshin}의 기운이 유입되며 극적인 명예 회복과 자산 증식의 활로가 열립니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> 당해 세운 핵심 명리 처방과 절대 수칙</h5>
          <p>
            • <strong>원국 격국 및 강약:</strong> \${pattern.name} (\${strength.title}, 득령·득지 \${strength.score}점) — 무리한 정면 승부보다 시스템에 올라타 레버리지를 일으키십시오.<br>
            • <strong>핵심 용신(用神) 나침반:</strong> 억부용신 <strong>[\${yongshin.eokbuYongshin}]</strong> / 조후용신 <strong>[\${yongshin.johuYongshin}]</strong><br>
            • <strong>조후 양생 지침:</strong> 궁통보감 고전에 비추어 볼 때 \${user.name}님은 \${climate.seasonBadgeText}의 기운을 품고 계시므로(\${climate.quote}), 세운의 과열된 기운은 차분히 가라앉히고 얼어붙은 기운은 열정으로 녹여내는 지혜가 요구됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 원국-세운 합충형파해(合沖刑破害) 정밀 스캔</div>
      <h3 class="chapter-title">내 사주 4기둥과 세운이 부딪히는 지점 — 무엇이 깨지고 무엇이 맺어지는가</h3>
      <div class="chapter-prose">
        <p>
          운에서 들어오는 글자가 내 사주의 연주(조상·초년), 월주(직업·사회궁), 일주(배우자·안방), 시주(말년·자녀·결과물) 중 어느 기둥을 건드리느냐에 따라 사건이 터지는 무대가 정확히 결정됩니다. \${user.name}님의 사주 4기둥 위에 세운 \${seun.yearHanja}가 얹혔을 때 일어나는 기둥별 화학반응은 다음과 같습니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-sitemap"></i> 4대 기둥별 현실 발현 사건 및 충돌 징조</h5>
          <p>
            • <strong>연주 [\${user.pillars.year.hanja}]:</strong> 가문, 본가, 혹은 몸담고 있는 업계 전체의 정책·제도 변화가 의사결정에 압력을 가합니다. 윗사람과의 갈등을 피하고 명분을 먼저 챙기십시오.<br>
            • <strong>월주 [\${user.pillars.month.hanja}]:</strong> 직무 변동과 주력 수익 구조의 재편이 가장 직접적으로 발생하는 자리입니다. 기존의 업무 방식에 새로운 자동화나 협업 시스템을 결합해야 도태되지 않습니다.<br>
            • <strong>일주 [\${user.pillars.day.hanja}]:</strong> 내면의 독립 욕구와 거주 환경의 변동이 동시에 찾아옵니다. 배우자나 연인과의 관계에서 사소한 주도권 다툼을 피하고 공동의 재무 목표를 세우십시오.<br>
            • <strong>시주 [\${user.pillars.hour ? user.pillars.hour.hanja : '미상'}]:</strong> 본업 외의 제2 파이프라인, 특허, 자격, 은밀한 투자처가 태동하는 구간으로 하반기로 갈수록 결실력이 커집니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-shield-halved"></i> 세운 충·살(沖煞)을 무력화하는 3대 액막이 비방</h5>
          <p>
            1. <strong>24시간 지연의 법칙:</strong> 중요한 계약서 날인, 거액 송금, 이별 및 사표 통보는 감정이 고조된 순간에 절대 하지 마시고 반드시 하루의 밤을 넘긴 후 실행하십시오.<br>
            2. <strong>공간 파동 정화:</strong> 현재 머무는 침실이나 서재의 서북쪽 구석에 탁한 기운이 고이지 않도록 소금단지나 황동 소품을 배치하여 충살을 흡수하십시오.<br>
            3. <strong>신살 업상대체:</strong> 원국에 잠재된 \${(user.extendedShinsal || []).map(s => s.name).slice(0, 3).join(', ') || '특수 신살'}의 기운을 살리기 위해 봉사활동이나 전문 분야 집중 연구로 날카로운 칼날을 긍정적으로 소모하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제3장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 03 · 사계절(춘·하·추·동) 기류 변화와 공방 타이밍</div>
      <h3 class="chapter-title">언제 칼을 뽑고 언제 방패를 들 것인가 — 연간 4분기 전략 지도</h3>
      <div class="chapter-prose">
        <p>
          1년 열두 달 내내 전속력으로 달릴 수는 없습니다. 명리학의 고수들은 조후용신(<strong>\${yongshin.johuYongshin}</strong>)과 억부용신(<strong>\${yongshin.eokbuYongshin}</strong>)이 득세하는 계절에 승부수를 던지고, 기신(忌神)이 강해지는 계절에는 철저히 현금을 보유하며 방패를 듭니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-clock-rotate-left"></i> 사계절 운명의 흐름과 에너지 분기점</h5>
          <p>
            • <strong>봄 (목 기운 / 2~4월):</strong> 싹이 트고 기운이 위로 뻗는 시기입니다. 망설였던 새 기획, 이직 탐색, 학업 및 자격증 취득에 시동을 걸면 가속도가 붙습니다.<br>
            • <strong>여름 (화 기운 / 5~7월):</strong> 꽃이 피고 대외 노출이 극대화되는 발산기입니다. 영업 실적과 네트워크 확장은 폭발하나, 충동적 소비와 감정적 대립으로 인한 손재수를 단속해야 합니다.<br>
            • <strong>가을 (금 기운 / 8~10월):</strong> 열매를 맺고 가지치기를 하는 결실기입니다. 불필요한 인간관계와 적자 요소를 도려내고, 확실한 문서와 현금으로 자산을 갈무리하십시오.<br>
            • <strong>겨울 (수 기운 / 11~1월):</strong> 씨앗을 땅속에 품고 봄을 기다리는 지혜의 응축기입니다. 새로운 투자를 벌리기보다 내실을 다지고 체력을 비축하십시오.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-chess-knight"></i> \${user.name}님을 위한 연간 공방(攻防) 황금률</h5>
          <p>
            다음 장(CHAPTER 04~15)부터는 감명일 기준 <strong>향후 12개월(제1월~제12월)</strong>의 각 달을 한 페이지씩 단독으로 해부합니다. 매월 초 해당 페이지를 펼쳐 그달의 길일과 주의일, 실전 비방을 삶의 지침서로 삼으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제4장 ~ 제15장: 향후 12개월 월별 단독 심층 감명서 (12장) -->
    \${monthlyChaptersHtml}

    <!-- 제16장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 16 · 연간 재물(財物) 파이프라인 및 현금흐름 극대화</div>
      <h3 class="chapter-title">돈이 들어오는 문과 빠져나가는 구멍 — 향후 1년간의 자산 배분 전략</h3>
      <div class="chapter-prose">
        <p>
          \${user.name}님의 원국은 <strong>\${strength.title}</strong> 구조 위에 <strong>\${pattern.name}</strong>의 재물 그릇을 얹고 있습니다. \${strength.status === 'strong' ? '주체적 에너지가 강하므로 남의 밑에서 고정급만 받기보다 인센티브, 사업 소득, 독자적 투자 파이프라인에서 큰 재물이 터져 나오는 구조입니다.' : '무리하게 차입 레버리지를 일으키기보다, 확실한 시스템·우량 배당·자격·문서 자산에 올라타 안정적인 현금흐름을 구축할 때 부가 새지 않고 견고히 쌓입니다.'}
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-wallet"></i> 향후 1년간 예상되는 재정적 기회와 손재수 징조</h5>
          <p>
            손에 쥔 현금을 계좌에 그대로 방치하면 주변 인연의 급전 요청, 가족의 예상치 못한 지출, 혹은 충동적인 테마주/코인 추격 매수로 인해 기운이 흔들립니다. 특히 여름철과 환절기 무렵에는 그럴듯한 사업 제안이나 투자 권유가 들어올 수 있으나, 원금 보장 각서가 없는 거래는 100% 손재수로 연결되니 경계하십시오.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-sack-dollar"></i> 재물고(財物庫)를 잠그는 황실 자산 보전 비방</h5>
          <p>
            1. <strong>강제 문서화 개운:</strong> 수입이 들어오는 즉시 30% 이상을 해지가 까다로운 장기 펀드나 청약, 채권 계좌로 자동 이체하여 내 눈앞에서 현금을 은닉하십시오.<br>
            2. <strong>금전 지출 시진 준수:</strong> 거액 결제나 투자 집행은 판단력이 흐려지는 야간(술시·해시, 19:30 이후)을 절대 피하고, 양기가 맑은 오전(진시·사시, 08:00~11:00)에만 진행하십시오.<br>
            3. <strong>지갑 풍수 비책:</strong> 영수증이나 쓰지 않는 카드를 지갑에서 매일 비워내고, \${yongshin.eokbuYongshin === '금(金)' ? '새 지폐 1장을 붉은 종이에 싸서' : '금빛 클립으로 지폐를 묶어'} 안쪽 깊숙이 넣어두면 재물의 누수를 차단합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제17장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 17 · 부동산 · 이사 · 문서 계약 · 관재(官災) 방어</div>
      <h3 class="chapter-title">도장을 찍어도 되는 달과 물러서야 할 방위 — 문서운 정밀 지침</h3>
      <div class="chapter-prose">
        <p>
          명리학에서 문서운은 <strong>인성(印星: 정인·편인)</strong>과 <strong>식상·재성의 결실</strong>로 판별합니다. 거주지 이전(매매·전월세 계약), 사업장 임대차, 차량 교체, 협약서 날인을 앞두고 계신다면 다음의 방위와 시기를 엄격히 준수하십시오.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-file-signature"></i> 향후 1년간 발생할 수 있는 문서 이슈와 관재 징조</h5>
          <p>
            임대인 또는 거래 상대방과의 구두 합의를 믿고 특약 사항을 누락했다가 보증금 반환 지연이나 위약금 분쟁에 휘말릴 수 있는 징조가 있습니다. 특히 원국의 일지와 충돌하는 월에는 중개사의 말만 믿고 서두르다가 하자 있는 매물을 잡을 위험이 있으니, 건축물대장과 등기부등본의 을구 근저당 설정을 계약 당일 아침에 다시 열람하십시오.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass-drafting"></i> \${user.name}님 맞춤 문서·이동 개운 비방전</h5>
          <p>
            • <strong>길방(吉方) 선점:</strong> 현재 거주지 기준 <strong>\${dayEl === 'wood' || dayEl === 'fire' ? '동남쪽 · 남쪽 (생기 방위)' : '서북쪽 · 북동쪽 (수렴 방위)'}</strong>로 움직일 때 막혔던 일들이 자연스럽게 풀립니다.<br>
            • <strong>기피해야 할 흉방:</strong> 일지와 정면 충을 이루는 방향의 막다른 골목이나 습기가 차는 터는 피하십시오.<br>
            • <strong>계약서 날인 비책:</strong> 계약 당일에는 검은색 정장보다는 밝은 상의를 착용하시고, 서명 직전 심호흡을 3회 하여 일간의 중심을 잡은 후 직접 도장을 날인하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제18장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 18 · 귀인(貴人)과 소인배(小人輩) 감별 명식표</div>
      <h3 class="chapter-title">향후 1년간 내 인생을 끌어올릴 귀인의 특징 vs 에너지를 갉아먹을 악연</h3>
      <div class="chapter-prose">
        <p>
          운이 바뀔 때는 반드시 <strong>‘사람’</strong>을 통해 복과 화가 들어옵니다. \${user.name}님의 일간 \${CHEONGAN_HANJA[dayMaster]}을 기준으로 천을귀인(天乙貴人)과 용신 오행(<strong>\${yongshin.eokbuYongshin}</strong>)을 품은 인연을 곁에 두면 얽혔던 실타래가 기적처럼 풀립니다.
        </p>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-user-check"></i> 반드시 곁에 두어야 할 올해의 귀인(貴人) 특징</h5>
          <p>
            • <strong>기질 및 화법:</strong> 감정적 과장 없이 숫자로 증명하며, 내가 듣기 좋은 아부보다 뼈가 되는 실무적 피드백을 주는 차분한 인물입니다.<br>
            • <strong>조우 장소:</strong> 술자리나 밤 모임이 아닌, 전문 세미나·학회·공식 비즈니스 협의체·도서관에서 우연히 인연이 닿습니다.<br>
            • <strong>활용법:</strong> 이들에게는 작은 부탁을 하더라도 반드시 정당한 대가나 성의 있는 감사를 표하여 신뢰 자본을 쌓으십시오.
          </p>
        </div>

        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-user-slash"></i> 즉시 거리를 두어야 할 소인배(에너지 뱀파이어) 시그널</h5>
          <p>
            • 첫 만남부터 지나치게 친밀감을 과시하며 제3자의 험담을 유도하거나, 검증되지 않은 투자 정보로 조급증을 부추기는 인물.<br>
            • 내 성취를 은근히 깎아내려 무력감을 심어주는 가스라이팅형 동료나 지인은 상반기 내에 칼같이 손절해야 본인의 운기가 훼손되지 않습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제19장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 계절별 신체 바이오리듬 및 질환 예방 캘린더</div>
      <h3 class="chapter-title">몸이 무너지면 운도 멈춘다 — 의명진단학 연간 건강 기상도</h3>
      <div class="chapter-prose">
        <p>
          동의보감과 황제내경은 "사주에 오행의 편고(偏枯)가 있으면 반드시 신체 장부의 허실(虛實)로 발현된다"고 단언합니다. \${user.name}님의 원국 분석 결과, 가장 보살펴야 할 취약 장부는 <strong>\${med.deficientOrgan.zang}</strong>이며, 가장 과열되기 쉬운 장부는 <strong>\${med.excessOrgan.zang}</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-stethoscope"></i> 계절별 주의 증상 및 신체 신호</h5>
          <p>
            • <strong>환절기 (간담·비위 피로):</strong> 극심한 만성 피로와 안구 건조, 승모근 결림이 나타나면 즉시 간의 과열을 의심하십시오.<br>
            • <strong>혹서기 (심소장 과열):</strong> 가슴 답답함, 수면 장애, 구내염이 잦아질 수 있으니 카페인 음료를 절제해야 합니다.<br>
            • <strong>동절기 (신방광 냉증):</strong> 하체 부종이나 요통, 손발 저림이 심해질 수 있으니 아랫배를 항상 따뜻하게 보온하십시오.
          </p>
        </div>

        <div class="medical-care-box">
          <h5><i class="fa-solid fa-notes-medical"></i> 동의보감 황실 체질 양생 처방전</h5>
          <p>
            • <strong>약선 음식:</strong> \${med.deficientOrgan.medicinalFood}<br>
            • <strong>매일 마실 한방차:</strong> \${med.deficientOrgan.teaPrescription}<br>
            • <strong>경락 골든타임:</strong> \${med.deficientOrgan.meridianTime} — 이 시간에는 전자기기를 멀리하고 숙면을 취해야 오장육부의 진액이 재생됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제20장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 생활 풍수(風水) · 방위 · 색상 · 행운수 개운 비방</div>
      <h3 class="chapter-title">공간과 파장을 바꾸어 운명을 비트는 황실 개운 비방전</h3>
      <div class="chapter-prose">
        <p>
          사주 원국의 부족한 오행을 채우는 가장 빠르고 현실적인 방법은 매일 머무는 <strong>공간(풍수), 몸에 걸치는 색채(파장), 그리고 반복하는 습관(행동 개운)</strong>을 바꾸는 것입니다.
        </p>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-wand-magic-sparkles"></i> \${user.name}님 맞춤 황실 개운 처방전</h5>
          <p>
            • <strong>침실 베개 방향:</strong> 머리를 <strong>\${dayEl === 'water' || dayEl === 'wood' ? '동쪽 또는 남쪽' : '서북쪽'}</strong>으로 두고 주무시면 자는 동안 대지의 맑은 자기를 흡수하여 아침 기상이 가벼워집니다.<br>
            • <strong>행운의 색채:</strong> 속옷이나 지갑, 휴대폰 케이스에 \${yongshin.johuYongshin === '화(火)' ? '레드 · 버건디' : yongshin.johuYongshin === '수(水)' ? '블랙 · 딥 네이비' : '골드 · 화이트'} 색상을 적극 차용하십시오.<br>
            • <strong>행운의 숫자와 암호:</strong> 중요한 비밀번호나 계좌 끝자리에 \${yongshin.johuYongshin === '목(木)' ? '3, 8' : yongshin.johuYongshin === '화(火)' ? '2, 7' : '1, 6'}을 조합하십시오.<br>
            • <strong>현관 풍수 비방:</strong> 현관 바닥에 신발을 2켤레 이상 어지럽히지 마시고, 현관문 오른쪽에 작은 거울이나 황동 풍경을 달아 탁기를 튕겨내십시오.
          </p>
        </div>

        <div class="key-point-box">
          <h5><i class="fa-solid fa-gem"></i> 일상 속 기운 정화 루틴</h5>
          <p>
            일주일에 한 번, 굵은 천일염을 푼 따뜻한 물로 족욕을 하거나 샤워 시 어깨에 소금을 살짝 문질러 씻어내면 타인에게서 묻어온 부정적인 감정 에너지가 말끔히 정화됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제21장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 21 · 향후 3년 세운(歲運) 브릿지 및 총결론</div>
      <h3 class="chapter-title">큰 파도를 넘은 자에게 주어지는 축복 — 향후 3개년 로드맵과 헌사</h3>
      <div class="chapter-prose">
        <p>
          운명은 단절된 1년의 점이 아니라, 끊임없이 이어지는 파도의 곡선입니다. 당해 세운(\${seun.yearHanja})을 성공적으로 디딤돌 삼아 나아갈 때, 향후 3년 동안 \${user.name}님의 인생에는 다음과 같은 거대한 퀀텀 점프가 준비되어 있습니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-stairs"></i> 향후 3개년(Year 1 ~ Year 3) 성장 연대기</h5>
          <p>
            • <strong>Year 1 (기틀 확립기):</strong> 낡은 환경을 털어내고 새로운 씨앗을 뿌리는 시기로, 내 전문성과 주력 무대가 마침내 윤곽을 드러냅니다.<br>
            • <strong>Year 2 (도약과 확장기):</strong> 뿌린 씨앗이 꽃을 피우며 권한과 수익이 배가되는 구간입니다. 귀인의 조력으로 날개를 달게 됩니다.<br>
            • <strong>Year 3 (결실과 반석기):</strong> 3년간의 노력이 확고한 문서와 자산으로 굳어지며 인생의 새로운 정상에 우뚝 서게 됩니다.
          </p>
        </div>

        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-heart"></i> 천문(天門) 스승이 \${user.name}님께 바치는 축원문</h5>
          <p>
            "흐르는 강물은 바위를 만나도 멈추지 않고, 바위를 감싸 안고 돌아 마침내 큰 바다에 이릅니다. 그동안 남모르게 흘린 땀방울과 눈물은 결코 헛되지 않았으며, 이제 운의 순풍이 당신의 돛을 힘차게 밀어줄 차례입니다. 부디 당신의 고유한 별을 믿고 당당하게 전진하십시오."
          </p>
        </div>
      </div>
    </div>
  \`;
}
`;
}

module.exports = { getNewYearBuilderCode };
