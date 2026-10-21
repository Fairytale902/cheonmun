/**
 * gen-master.js - 제2권 평생 총운 & 10년 대운 연대기 · 의명진단 마스터팩 (23장)
 */
function getMasterBuilderCode() {
  return `
// ============================================================================
// 2. 제2권 (master) : 평생 총운 & 10년 대운 연대기 · 의명진단 마스터팩 (총 23장)
// ============================================================================
function buildMasterReportHtml(user, natureName) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const dayEl = CHEONGAN_ELEMENTS[dayMaster];
  const climate = user.climate;
  const strength = user.strength;
  const pattern = user.pattern || SAJU_PATTERNS['정관격'];
  const yongshin = user.yongshin;
  const dynamics = user.dynamics || { stemRelations: [], branchRelations: [] };
  const shinsalList = user.extendedShinsal || [];
  const med = diagnoseMedicalSaju(user);

  const userMbtiRef = (user.userMbti && user.userMbti !== 'unknown')
    ? \`<div class="key-point-box">
         <h5><i class="fa-solid fa-brain"></i> 명리학 십성(十星)과 현대 심리학 MBTI (\${user.userMbti}) 교차 분석</h5>
         <p>\${user.name}님의 사주 본원인 <strong>\${natureName}</strong>과 \${user.userMbti} 성향은 '깊은 내면의 통찰과 독립적인 실행력'이라는 강력한 공통분모를 가집니다. 겉으로는 합리적이고 차분하지만, 본인의 원칙이나 목표가 설정되면 타협 없이 끝까지 밀어붙이는 승부사 기질이 발현됩니다.</p>
       </div>\`
    : '';

  // 8대운 단독 페이지 생성 (제11장 ~ 제18장, 총 8장)
  const daeunList = user.daeunList || [];
  const daeunChaptersHtml = daeunList.slice(0, 8).map((d, idx) => {
    const chapNum = idx + 11;
    const isPrime = (idx === 2 || idx === 3 || idx === 4);
    const dStemIdx = Math.max(0, CHEONGAN_HANJA.indexOf(d.gan));
    const dBranchIdx = Math.max(0, JIJI_HANJA.indexOf(d.zhi));
    const dBranchTenGod = getTenGod(dayMaster, HIDDEN_STEMS[dBranchIdx][0]);
    const isClashWithMonth = (dBranchIdx + 6) % 12 === user.pillars.month.branchIdx;
    const isClashWithDay = (dBranchIdx + 6) % 12 === dayBranch;

    let stageLabel = '';
    if (idx === 0) stageLabel = '초년 뿌리 형성기 (학업·자아 탐색)';
    else if (idx === 1) stageLabel = '청년 사회 진입기 (독립·시행착오·초기 커리어)';
    else if (idx === 2) stageLabel = '중년 전반 도약기 (주력 무대 구축·결혼·자산 기틀)';
    else if (idx === 3) stageLabel = '중년 핵심 전성기 (사회적 정상·재물고 폭발)';
    else if (idx === 4) stageLabel = '중후반 수확·확장기 (문서 자산 완성·권위 확립)';
    else if (idx === 5) stageLabel = '장년 안정·전수기 (시스템 수익화·후학 및 명예)';
    else if (idx === 6) stageLabel = '노년 초입 안식기 (건강 섭생·안정적 노후 자산)';
    else stageLabel = '말년 회향·복록기 (가문 번영·정신적 완성)';

    return \`
      <div class="report-chapter">
        <div class="chapter-badge">CHAPTER \${String(chapNum).padStart(2, '0')} · 10년 대운 연대기 심층 해부 (제\${idx + 1}대운)</div>
        <h3 class="chapter-title">\${d.startAge}세 ~ \${d.endAge}세 [\${d.gan}\${d.zhi}(\${d.kor}) 대운] — \${d.tenGod}·\${dBranchTenGod}의 10년 기상도</h3>
        <div class="chapter-prose">
          <p>
            <strong>\${user.name}님의 인생 제\${idx + 1}막 (\${d.startAge}세~\${d.endAge}세, \${stageLabel})</strong>을 지배하는 10년 대운은 <strong>\${d.gan}\${d.zhi}(\${d.kor})</strong>입니다. 대운의 전반부 5년(\${d.startAge}세~\${d.startAge + 4}세)은 천간 <strong>\${d.gan}(\${d.tenGod})</strong>이 외적인 사회 환경과 인맥의 물갈이를 주도하며, 후반부 5년(\${d.startAge + 5}세~\${d.endAge}세)은 지지 <strong>\${d.zhi}(\${dBranchTenGod})</strong>가 실질적인 재물고와 생활 터전의 뿌리를 다지거나 대변혁을 일으킵니다.
          </p>
          <p>
            \${isPrime ? \`특히 이 <strong>\${d.startAge}세~\${d.endAge}세 구간</strong>은 \${user.name}님의 원국 격국(\${pattern.name})이 대운의 지지를 받아 인생 최대의 사회적 영토와 자산을 확보하는 <strong>황금 전성기(Prime Era)</strong>입니다. 안주하지 마시고 본인의 브랜드와 시스템을 구축하십시오.\` : \`이 <strong>\${d.startAge}세~\${d.endAge}세 구간</strong>은 무리한 외형 확장보다는 전문성을 깊이 파고들어 다음 도약기를 위한 자원을 비축해야 하는 내실의 시간입니다.\`}
            \${isClashWithMonth ? \`<br><strong>[월지 대운충]:</strong> 이 10년 사이에 직업 도메인이나 주력 사업 아이템이 완전히 뒤바뀌는 대대적인 환골탈태를 경험합니다.\` : ''}
            \${isClashWithDay ? \`<br><strong>[일지 대운충]:</strong> 안방과 거주 환경이 요동치므로 거주지 대이동이나 가정 관계의 성숙한 재정립이 요구됩니다.\` : ''}
          </p>

          <div class="event-prediction-box">
            <h5><i class="fa-solid fa-hourglass-start"></i> 이 10년간 반드시 겪게 될 핵심 사건과 환경 변화</h5>
            <p>
              • <strong>전반 5년 (\${d.startAge}~\${d.startAge + 4}세, 천간 \${d.gan}·\${d.tenGod}):</strong> 새로운 사회적 직함이나 프로젝트 제안이 쏟아집니다. 인간관계의 물갈이가 시작되며, 과거의 인연보다 새로운 협력자와의 결속이 성패를 좌우합니다. 초기 2년은 검증에 집중하고 3년 차부터 전면 승부를 거십시오.<br>
              • <strong>후반 5년 (\${d.startAge + 5}~\${d.endAge}세, 지지 \${d.zhi}·\${dBranchTenGod}):</strong> 전반기에 뿌린 노력이 현실적인 결과물(\${dBranchTenGod})로 단단히 굳어지는 시기입니다. 부동산·지분 취득, 법인 설립, 또는 조직 내 확고한 고위직 안착이 이 5년 안에 판가름 납니다.
            </p>
          </div>

          <div class="action-secret-box">
            <h5><i class="fa-solid fa-scroll"></i> 천문 대운 개운 비책 — 10년의 승률을 극대화하는 행동 지침</h5>
            <p>
              • <strong>대운 교체기 액막이:</strong> 대운이 바뀌는 전후 1~2년(\${d.startAge - 1}세, \${d.startAge}세 무렵)에는 몸살이나 일시적 정체감이 올 수 있습니다. 이는 낡은 기운이 빠져나가는 자연스러운 명리 환절기이므로, 헌 가구를 교체하고 건강검진을 받아 액운을 물리적으로 소모하십시오.<br>
              • <strong>자산 수성 전략:</strong> \${d.tenGod}의 작용이 과열될 때는 지인의 투자 제안이나 동업 유혹을 차단하고, 확실한 현금 파이프라인과 안전 자산에 자금을 묶어두는 것이 최선입니다.
            </p>
          </div>

          <div class="medical-care-box">
            <h5><i class="fa-solid fa-heart-pulse"></i> 의명학(醫命學) 장부 관리 및 취약 질환 방어</h5>
            <p>
              이 대운의 오행(\${ELEMENT_KOREAN[CHEONGAN_ELEMENTS[dStemIdx]]}·\${ELEMENT_KOREAN[JIJI_ELEMENTS[dBranchIdx]]})이 원국의 <strong>\${med.deficientOrgan.zang}과 \${med.attackedOrgan.zang}</strong>에 주는 자극을 세심하게 관찰하십시오. \${d.startAge + 4}세와 \${d.endAge - 1}세 무렵에는 과로를 절대 피하시고 \${med.deficientOrgan.medicinalFood.split(',').slice(0, 3).join(', ')} 위주의 온열 식단을 유지하십시오.
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
      <div class="chapter-badge">CHAPTER 01 · 자평진전(子平眞詮) 10대 격국(格局) 총론</div>
      <h3 class="chapter-title">하늘이 부여한 사회적 그릇 — \${user.name}님은 왜 [\${pattern.name}]의 삶을 살게 되는가</h3>
      <div class="chapter-prose">
        <p>
          사주명리학의 최고봉인 『자평진전(子平眞詮)』은 인간의 사회적 성패와 삶의 무대를 결정짓는 핵심 열쇠로 <strong>월지(月支: 태어난 달의 지지)</strong> 지장간에서 투출한 <strong>격국(格局)</strong>을 꼽습니다. 일간(日干)이 ‘나 자신의 영혼’이라면, 격국은 내가 세상에 나가 평생 동안 휘두르게 될 ‘최강의 무기이자 사회적 직함’입니다.
        </p>
        <p>
          \${user.name}님의 원국을 정밀 감명한 결과, 당신의 사주는 <strong>[\${pattern.name} (\${pattern.badge})]</strong>으로 귀결됩니다. \${pattern.desc}
        </p>

        \${userMbtiRef}

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-crown"></i> [\${pattern.name}]의 운명적 사회 발현 방식</h5>
          <p>
            \${pattern.name}을 타고난 사람은 남의 지시를 맹목적으로 따르는 수동적 환경에 갇히면 극심한 정신적 질식과 번아웃을 겪습니다. 반면 본인의 전문성과 자율성이 보장되는 판에 서면 남들보다 3배 이상의 집중력을 발휘하여 업계의 독보적인 자리를 꿰차는 특유의 승부사 기질이 발현됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> [\${pattern.name}] 성패(成敗)의 절대 법칙</h5>
          <p>
            • <strong>타고난 천직 도메인:</strong> \${pattern.career}<br>
            • <strong>부의 축적 메커니즘:</strong> \${pattern.wealth}<br>
            • <strong>신강/신약 최적 포지셔닝:</strong> \${strength.title} (\${strength.score}점) — \${strength.desc}
          </p>
        </div>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 일주(日柱) 본원 심층 해부 — 영혼의 핵과 배우자궁</div>
      <h3 class="chapter-title">\${natureName}의 양면성 — 남들은 절대 모르는 당신의 고독과 야망</h3>
      <div class="chapter-prose">
        <p>
          사주 여덟 글자 중 나 자신을 상징하는 일간(日干) <strong>\${CHEONGAN_HANJA[dayMaster]}(\${CHEONGAN[dayMaster]})</strong>과 내가 발을 딛고 선 안방이자 배우자 자리인 일지(日支) <strong>\${JIJI_HANJA[dayBranch]}(\${JIJI[dayBranch]})</strong>의 결합은 평생의 무의식과 심리를 지배합니다.
        </p>
        <p>
          겉으로 드러나는 \${user.name}님은 예의 바르고 합리적이며 웬만한 일에는 감정을 크게 드러내지 않는 것처럼 보입니다. 그러나 일지 \${JIJI_HANJA[dayBranch]}의 지장간(\${HIDDEN_STEMS[dayBranch].map(i => CHEONGAN_HANJA[i]).join('·')}) 속에는 누구에게도 종속되기 싫어하는 강렬한 독립심과 서늘한 야망이 깃들어 있습니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-mask"></i> 겉모습과 내면 사이의 충돌 징조</h5>
          <p>
            주변 사람들은 당신을 ‘스스로 알아서 척척 해내는 강한 사람’으로 보기에 쉽게 기댑니다. 하지만 혼자 있을 때 밀려오는 깊은 고독감과 인정 욕구, 그리고 완벽하지 않으면 스스로를 채찍질하는 결벽증이 당신의 기혈을 소모시킵니다. 배우자 자리 또한 까다로운 내적 기준 때문에 쉽게 마음을 다 열지 못하고 일정한 심리적 거리를 두는 경향이 나타납니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-key"></i> 내면의 고독을 다스리고 배우자복을 키우는 비방</h5>
          <p>
            • <strong>감정 표현의 일상화:</strong> 힘든 점을 속으로만 삭이지 마시고 가까운 사람에게 "지금 조금 버겁다"는 말을 솔직히 꺼내는 연습이 일지의 긴장을 풀어줍니다.<br>
            • <strong>배우자궁 개운:</strong> 배우자나 연인의 사소한 단점을 현미경으로 보듯 지적하기보다, 큰 틀에서의 헌신을 인정해줄 때 안방의 기운이 평온해지고 재물고가 잠깁니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제3장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 03 · 연주(年柱) 조상·초년궁 해부 — 가문의 유전자와 독립의 운명</div>
      <h3 class="chapter-title">연주 [\${user.pillars.year.hanja}(\${user.pillars.year.korean})]에 새겨진 초년의 서사와 자수성가의 코드</h3>
      <div class="chapter-prose">
        <p>
          연주(年柱)는 내가 태어난 가문의 영적 토양과 유년기(0세~19세)의 성장 환경을 관장합니다. \${user.name}님의 연주는 <strong>\${user.pillars.year.hanja}(\${user.pillars.year.korean})</strong>로, 조상의 업력과 부모의 영향력이 당신의 성격 형성에 어떤 밑그림을 그렸는지 보여줍니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-tree"></i> 초년 환경이 성인기에 미친 영향</h5>
          <p>
            유년기 시절 부모의 엄격한 기대나 집안의 환경 변화로 인해 일찍 철이 들었거나, 스스로 앞가림을 해야 한다는 조기 독립의 압박을 받았습니다. 이는 당신에게 강한 생존력과 문제 해결 능력을 선물했으나, 동시에 남에게 의탁하지 못하는 만성적 긴장감을 남겼습니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-seedling"></i> 조상의 음덕을 깨우는 효도와 공간 비방</h5>
          <p>
            연주의 기운을 길하게 쓰려면 부모와의 심리적 탯줄을 건강하게 끊어내고 완전한 독립을 이뤄야 합니다. 명절이나 제사 때 정성을 다하되, 평소에는 거리를 두어 독립된 가정을 꾸릴 때 가문의 수호 기운이 재물운으로 치환됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제4장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 04 · 월주(月柱) 사회·직업궁 해부 — 세상이 나를 쓰는 방식</div>
      <h3 class="chapter-title">월주 [\${user.pillars.month.hanja}(\${user.pillars.month.korean})]와 지장간 역학 — 청년·중년 사회적 성취의 엔진</h3>
      <div class="chapter-prose">
        <p>
          월주(月柱)는 20대부터 40대까지 청·중년기의 커리어 무대이자 사회적 활동의 핵심 심장입니다. \${user.name}님의 월주 <strong>\${user.pillars.month.hanja}(\${user.pillars.month.korean})</strong>는 세상이 당신을 부르는 방식이자, 당신이 돈을 벌어들이는 가장 강력한 파이프라인입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-briefcase"></i> 사회적 전성기에 직면할 기회와 시험대</h5>
          <p>
            월지의 지장간 기운이 강렬하게 작용하여, 직장이나 사회 조직에서 중요한 프로젝트를 떠맡게 되며 동년배보다 빠른 승진이나 독자 사업의 갈림길에 서게 됩니다. 30대 중반 전후로 직업적 대전환이나 업종 피벗의 유혹이 강력하게 찾아오는 구조입니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-award"></i> 월주의 에너지를 100% 현금화하는 커리어 비책</h5>
          <p>
            남들이 만들어 놓은 사다리를 단순히 오르기보다, \${pattern.name}의 독창성을 살려 '나만의 전문 영역'을 특화하십시오. 직함보다 실질적인 라이선스와 저작권, 고객 데이터베이스를 확보하는 것이 40대 이후의 거대한 자산으로 직결됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제5장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 05 · 시주(時柱) 말년·결실궁 해부 — 인생 후반전의 부귀와 숨은 욕망</div>
      <h3 class="chapter-title">시주 [\${user.pillars.hour ? \`\${user.pillars.hour.hanja}(\${user.pillars.hour.korean})\` : '삼주 감명 모드'}]가 예고하는 50대 이후의 최종 성적표</h3>
      <div class="chapter-prose">
        <p>
          시주(時柱)는 50대 이후 인생의 결실기이자 자녀궁, 그리고 남들에게 차마 말하지 못하는 은밀한 취미와 무의식의 창고입니다. 시주가 튼튼하면 초년과 중년에 아무리 풍파를 겪더라도 말년에 거대한 부와 안락한 가문을 완성합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-trophy"></i> 인생 후반전에 기다리고 있는 보상과 결실</h5>
          <p>
            \${user.pillars.hour ? \`시주에 자리한 \${user.pillars.hour.hanja}의 기운은 후반전으로 갈수록 부동산, 배당 소득, 혹은 자녀의 출세로 인한 복록이 두터워짐을 뜻합니다. 중년의 고난이 결국 말년의 큰 그릇을 빚기 위한 불가피한 풀무질이었음을 깨닫게 됩니다.\` : \`태어난 시간이 미상이더라도 원국의 월주와 일주 구조상 중년 이후의 자산 수성 능력이 뛰어나며, 나이가 들수록 품격과 대인관계의 원숙함이 배가됩니다.\`}
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-building-columns"></i> 말년 부귀를 확정 짓는 자산 관리 수칙</h5>
          <p>
            자녀에게 맹목적으로 모든 재산을 조기 증여하지 마시고, 본인의 명의로 된 확고한 월세 수익형 부동산이나 연금을 끝까지 쥐고 계십시오. 그것이 자녀와의 화목을 지키고 부모로서의 권위를 보존하는 가장 현실적인 개운법입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제6장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 06 · 억부용신(抑扶用神)과 조후용신(調候用神)의 비밀</div>
      <h3 class="chapter-title">궁통보감 120조후 고증 — 내 사주의 온도를 맞추고 운을 여는 절대 열쇠</h3>
      <div class="chapter-prose">
        <p>
          명리학에서 용신(用神)은 막힌 운의 혈관을 뚫어주는 '기적의 명약'입니다. 힘의 균형을 맞추는 <strong>억부용신(抑扶用神)</strong>과 사주의 계절적 한열(寒熱)을 다스리는 <strong>조후용신(調候用神)</strong>이 조화를 이룰 때 비로소 인생의 모든 문이 활짝 열립니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-scale-balanced"></i> \${user.name}님의 용신 배합과 길흉의 분기점</h5>
          <p>
            \${user.name}님의 억부용신은 <strong>[\${yongshin.eokbuYongshin}]</strong>이며, 조후용신은 <strong>[\${yongshin.johuYongshin}]</strong>입니다. 용신의 기운이 대운이나 세운에서 들어올 때는 특별한 무리 없이도 귀인이 돕고 일이 일사천리로 풀리나, 용신을 극하는 기신(忌神) 운에서는 사소한 욕심이 큰 화를 부릅니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> 용신의 기운을 일상으로 끌어들이는 3대 처방</h5>
          <p>
            • <strong>공간 방위:</strong> 집이나 사무실의 \${yongshin.johuYongshin === '수(水)' ? '북쪽' : yongshin.johuYongshin === '화(火)' ? '남쪽' : yongshin.johuYongshin === '목(木)' ? '동쪽' : '서쪽'}을 항상 청결하고 밝게 유지하십시오.<br>
            • <strong>식습관:</strong> \${climate.seasonBadgeText}의 기운을 다스릴 수 있도록, 차가운 체질은 따뜻한 온수와 구운 음식을, 열이 많은 체질은 시원한 채소와 보리차를 생활화하십시오.<br>
            • <strong>행동 개운:</strong> 용신 오행에 부합하는 취미(예: 수기는 수영과 독서, 목기는 원예와 등산, 화기는 러닝과 요리, 금기는 헬스와 금속 공예)를 꾸준히 즐기십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제7장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 07 · 원국 내 천간 합충(合沖)과 지지 형충회합(刑沖會合)</div>
      <h3 class="chapter-title">내 사주 안에서 끊임없이 부딪히고 결합하는 보이지 않는 역학 구조</h3>
      <div class="chapter-prose">
        <p>
          사주 원국 내부의 천간과 지지는 가만히 멈춰 있는 글자가 아닙니다. 서로 끌어당겨 합(合)을 이루기도 하고, 격렬히 부딪혀 충(沖)을 일으키며 내면의 갈등과 외적 변동을 만들어냅니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-atom"></i> 원국 내 역학 관계(\${(dynamics.stemRelations || []).concat(dynamics.branchRelations || []).join(', ') || '독립적 평형'})가 빚어내는 심리</h5>
          <p>
            내 안에서 '안정을 추구하는 마음'과 '모든 것을 뒤엎고 새로운 도전을 감행하려는 충동'이 주기적으로 팽팽하게 대립합니다. 이 모순된 두 에너지가 제대로 조율되지 못하면 우유부단함으로 기회를 놓치거나, 홧김에 중요한 관계를 끊어버리는 실수를 저지를 수 있습니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-yin-yang"></i> 내면의 충돌을 창조적 에너지로 승화하는 비방</h5>
          <p>
            충(沖)과 형(刑)의 에너지는 예술적 창작, 날카로운 분석, 법적·의료적 전문성, 또는 고난도 비즈니스 협상에서 최고의 천재성으로 승화됩니다. 내 안의 갈등을 자책하지 마시고 전문적인 결과물을 창조하는 원동력으로 전환하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제8장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 08 · 천을귀인 · 문창귀인 · 도화 · 역마 · 화개 길신(吉神) 활용법</div>
      <h3 class="chapter-title">하늘이 내린 보호막과 대중을 사로잡는 매력 자본의 현대적 사용 설명서</h3>
      <div class="chapter-prose">
        <p>
          과거의 신살론은 길신과 흉살을 극단적으로 나누었으나, 현대 자본주의 사회에서 신살(神煞)은 곧 <strong>‘독보적인 개성과 트래픽을 부르는 매력 자본’</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-wand-magic"></i> \${user.name}님의 사주에 깃든 주요 길신의 위력</h5>
          <p>
            원국에 자리한 길신들은 위기의 순간마다 벼랑 끝에서 당신을 건져 올리는 보이지 않는 손으로 작용합니다. 천을귀인은 결정적인 귀인을 붙여주며, 문창귀인은 뛰어난 기획력과 문장력을, 도화와 화개는 대중의 시선을 사로잡는 아우라와 예술적 감수성을 선물합니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-gem"></i> 길신을 돈과 영향력으로 치환하는 실전 공식</h5>
          <p>
            • <strong>도화살 활용:</strong> 숨기지 마시고 외모와 패션, SNS 브랜딩에 적극적으로 투자하여 당신의 인지도를 자산화하십시오.<br>
            • <strong>역마살 활용:</strong> 책상머리에만 앉아 있지 마시고 해외 출장, 이커머스, 이동형 비즈니스로 활동 반경을 넓힐 때 재물이 증식됩니다.<br>
            • <strong>화개살 활용:</strong> 철학, 심리학, 전문 자격, 종교적 성찰을 통해 남들이 흉내 낼 수 없는 정신적 깊이를 갖추십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제9장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 09 · 백호대살 · 괴강살 · 현침살의 프로페셔널 승화법</div>
      <h3 class="chapter-title">강렬한 살기(煞氣)를 압도적 카리스마와 전문직의 칼날로 바꾸는 비결</h3>
      <div class="chapter-prose">
        <p>
          백호(白虎), 괴강(魁罡), 현침(懸針)과 같은 강렬한 살(煞)은 과거에는 피를 보는 흉살로 꺼렸으나, 현대에는 <strong>의사, 검사, 프로그래머, 금융가, CEO 등 세상을 쥐락펴락하는 리더들의 필수 조건</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-shield-virus"></i> 살기(煞氣)가 미조율될 때 나타나는 위험 신호</h5>
          <p>
            이 강력한 에너지가 정당한 전문직 도메인(업상대체)으로 빠져나가지 못하면, 본인이나 가족의 급작스러운 수술수, 교통사고, 폭언으로 인한 구설수, 또는 극단적인 관재소송으로 터져 나올 수 있습니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-bolt-lightning"></i> 살기를 권력과 부로 바꾸는 업상대체(業象代替) 비방</h5>
          <p>
            • <strong>칼을 쓰는 직업:</strong> 날카로운 도구를 다루는 분야(IT 코딩, 수술·시술, 정밀 설계, 요리, 세무·법률 감정)에 종사하여 살기를 합법적으로 소모하십시오.<br>
            • <strong>정기적 헌혈:</strong> 1년에 2회 이상 정기적으로 헌혈을 하면 피를 보는 백호의 액운을 선제적으로 예방하는 최고의 개운이 됩니다.<br>
            • <strong>스포츠 단련:</strong> 격투기, 웨이트 트레이닝, 사격 등 신체 에너지를 극한으로 뿜어내는 운동을 취미로 삼으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제10장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 10 · 원진살(怨嗔煞) · 귀문관살(鬼門關煞) 심층 심리 치유</div>
      <h3 class="chapter-title">영적 예민함과 편집증을 천재적인 통찰력과 직관으로 바꾸는 마인드셋</h3>
      <div class="chapter-prose">
        <p>
          원진(怨嗔)과 귀문(鬼門)은 신경계가 일반인보다 수십 배 예민하여 상대방의 속마음과 보이지 않는 흐름을 번개처럼 감지하는 <strong>‘영적 안테나’</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-brain"></i> 귀문·원진이 발현될 때의 심리적 징조</h5>
          <p>
            밤에 불을 끄면 잡생각이 꼬리를 물어 불면증에 시달리거나, 상대방의 사소한 눈빛 하나에 깊은 원망과 불안을 느끼며 스스로를 괴롭히는 강박적 패턴이 나타납니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-spa"></i> 예민한 영혼을 위한 황실 심신 안정 비책</h5>
          <p>
            • <strong>수면 공간 차광:</strong> 침실에 암막 커튼을 설치하여 미세한 빛을 완벽히 차단하고, 머리맡에 스마트폰을 두지 마십시오.<br>
            • <strong>마음의 쓰레기 배출:</strong> 밤마다 머릿속의 복잡한 생각을 종이에 날것 그대로 써 내려간 뒤 찢어 버리는 '감정 배설 리추얼'을 행하십시오.<br>
            • <strong>직관의 활용:</strong> 이 예민함을 주식 매매 타이밍 포착, 디자인, 작문, 상담 등 통찰력이 필요한 창의적 작업에 쏟아부으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제11장 ~ 제18장: 10년 대운 제1대운~제8대운 단독 심층 감명서 (8장) -->
    \${daeunChaptersHtml}

    <!-- 제19장: 의명진단학 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 의명진단학(醫命診斷學) 제1편 — 오운육기(五運六氣) 오장육부 허실 진단</div>
      <h3 class="chapter-title">황제내경에 근거한 장부 균형 진단 — 내 몸의 어느 장기가 울고 있는가</h3>
      <div class="chapter-prose">
        <p>
          동양의학의 성전인 『황제내경(黃帝內經)』은 사주팔자의 오행 불균형이 곧 인체 오장육부의 기혈 순환 장애를 일으킨다고 밝힙니다. \${user.name}님의 사주 원국에서 <strong>가장 태과(太過)한 기운은 \${med.excessOrgan.elKor}</strong>이며, <strong>가장 결핍(不及)된 기운은 \${med.deficientOrgan.elKor}</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-triangle-exclamation"></i> 오행 편고로 인해 나타나는 만성 신체 증상</h5>
          <p>
            • <strong>\${med.excessOrgan.zang} 과열 증상:</strong> \${med.excessOrgan.excessSymptom}<br>
            • <strong>\${med.deficientOrgan.zang} 허약 증상:</strong> \${med.deficientOrgan.deficientSymptom}
          </p>
        </div>

        <div class="medical-care-box">
          <h5><i class="fa-solid fa-mortar-pestle"></i> 오장육부 평형을 되찾는 근본 조치</h5>
          <p>
            태과한 장부의 열기는 덜어내고(瀉), 메마른 장부의 진액은 채워주는(補) 섭생이 필수적입니다. 기름진 야식과 차가운 음료를 금하고, \${med.deficientOrgan.zang}을 보하는 \${med.deficientOrgan.medicinalFood.split(',').slice(0, 4).join(', ')} 섭취를 주 3회 이상 유지하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제20장: 의명진단학 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 의명진단학(醫命診斷學) 제2편 — 한난조습(寒暖燥濕) 체질과 취약 발병 대운</div>
      <h3 class="chapter-title">타고난 체온과 습도 — 평생을 두고 경계해야 할 질환 발현 연대기</h3>
      <div class="chapter-prose">
        <p>
          사람의 체질은 태어난 달의 기후에 따라 <strong>한(寒)·난(暖)·조(燥)·습(濕)</strong>의 네 가지로 갈립니다. \${user.name}님은 <strong>[\${med.thermalType}]</strong>으로 분류됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-temperature-half"></i> 체질적 특성과 스트레스 시 발병 메커니즘</h5>
          <p>\${med.thermalDesc}</p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-notes-medical"></i> 평생 체질 맞춤 생활 수칙</h5>
          <p>\${med.thermalPrescription}</p>
        </div>
      </div>
    </div>

    <!-- 제21장: 의명진단학 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 21 · 의명진단학(醫命診斷學) 제3편 — 동의보감 약선(藥膳) 식이요법과 본초 처방</div>
      <h3 class="chapter-title">음식으로 고치지 못하는 병은 의사도 못 고친다 — 밥상 위의 보약 처방전</h3>
      <div class="chapter-prose">
        <p>
          『동의보감』 식치(食治) 편에서는 "약보(藥補)보다 식보(食補)가 낫고, 식보보다 행보(行步)가 낫다"고 하였습니다. 내 사주에 부족한 오행의 파동을 음식의 맛과 색깔로 매일 흡수하는 것이 가장 강력한 수명 연장 비법입니다.
        </p>

        <div class="medical-care-box">
          <h5><i class="fa-solid fa-utensils"></i> \${user.name}님을 살리는 맞춤 약선 식품</h5>
          <p>
            • <strong>반드시 챙겨 먹어야 할 본초 식재료:</strong> \${med.deficientOrgan.medicinalFood}<br>
            • <strong>기운을 맑히는 한방차 레시피:</strong> \${med.deficientOrgan.teaPrescription}<br>
            • <strong>절대 피해야 할 독소 음식:</strong> \${med.deficientOrgan.avoidFood}
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-clock"></i> 식사 리듬과 꼭꼭 씹는 양생법</h5>
          <p>
            식사 시간은 최소 20분 이상 유지하며, 한 입에 30회 이상 씹어 침(옥액)과 충분히 섞여 넘어가도록 하십시오. 이것만으로도 비위의 소화 부담을 50% 줄이고 체내 독소 축적을 막을 수 있습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제22장: 의명진단학 4 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 22 · 의명진단학(醫命診斷學) 제4편 — 12시진 경락 생체리듬과 양생(養生) 비법</div>
      <h3 class="chapter-title">우주의 시계와 내 몸의 장기 연결 — 하루 24시간 자오유주(子午流注) 시간표</h3>
      <div class="chapter-prose">
        <p>
          인체의 기혈은 12시진(24시간) 동안 12개의 경락을 따라 일정한 주기로 순환합니다. 장기가 깨어나는 시진에 맞춰 물을 마시고 식사를 하며 잠자리에 드는 것이 노화를 늦추고 면역력을 극대화하는 비결입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-stopwatch"></i> 하루 중 가장 중요한 경락 골든타임</h5>
          <p>
            • <strong>자시·축시 (23:00~03:00, 담경·간경):</strong> 혈액이 간으로 돌아가 해독과 세포 재생을 마치는 시간입니다. 이 시간에 깨어 있으면 면역 체계가 급격히 무너집니다.<br>
            • <strong>진시 (07:00~09:00, 위경):</strong> 위장의 연동운동이 가장 활발한 시간이므로 따뜻한 온수나 가벼운 식사를 섭취해야 하루의 대사가 원활해집니다.<br>
            • <strong>오시 (11:00~13:00, 심경):</strong> 심장에 무리가 가지 않도록 점심 식사 후 15분간 눈을 감고 명상을 취하십시오.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-bed"></i> \${user.name}님 맞춤 수면과 호흡 비방</h5>
          <p>
            취침 전 30분간 족욕이나 스트레칭으로 머리에 몰린 상열(上熱)을 하체로 끌어내리는 수승화강(水昇火降) 루틴을 실천하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제23장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 23 · 평생 재물 그릇과 노후 자산 완성 최종 로드맵</div>
      <h3 class="chapter-title">부는 쫓는 자의 것이 아니라 담을 그릇을 빚은 자의 것이다 — 최종 자산 청사진</h3>
      <div class="chapter-prose">
        <p>
          사주명리학에서 재물(財物)은 단순히 통장의 숫자가 아니라, 내가 세상에 기여하고 타인을 이롭게 한 대가로 우주가 되돌려주는 ‘에너지의 총량’입니다. \${user.name}님의 평생 재물선은 초년의 시행착오를 거쳐 중년 전성기에 만개하며, 말년에는 견고한 시스템 자산으로 완성되는 대기만성형 궤적을 그립니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-coins"></i> 인생 3단계 자산 완성 시나리오</h5>
          <p>
            • <strong>청년기 (씨앗기):</strong> 내 몸값을 올리는 전문 기술과 자격, 신용 자본을 구축하는 데 집중하십시오.<br>
            • <strong>중년기 (폭발기):</strong> \${pattern.name}의 주도권을 활용하여 독자적인 사업체나 핵심 자산(부동산·지분)을 매입하십시오.<br>
            • <strong>노년기 (수성기):</strong> 공격적인 투자를 멈추고 현금흐름이 보장되는 연금과 임대 수익 구조로 전환하여 가문의 반석을 굳히십시오.
          </p>
        </div>

        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-hand-holding-heart"></i> \${user.name}님의 고귀한 삶을 축원하며</h5>
          <p>
            "당신의 사주에 새겨진 여덟 글자는 정해진 감옥이 아니라, 당신이 가장 아름답고 눈부시게 피어날 수 있도록 안내하는 보물지도입니다. 하늘의 때를 알고 나아갈 때 세상의 모든 바람이 당신의 편이 될 것입니다."
          </p>
        </div>
      </div>
    </div>
  \`;
}
`;
}

module.exports = { getMasterBuilderCode };
