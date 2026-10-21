/**
 * ============================================================================
 * 천문사주 (cheonmun.life) - 86p 정통 서책 감명서 엔진 (A4 전면 조판 고도화)
 * ============================================================================
 * 구성:
 * 0. 의명진단학(醫命診斷學: 황제내경 오운육기 · 동의보감 장부론) 정밀 진단 엔진
 * 1. 제1권 (newyear) : 세운(歲運) 총운 & 생성일 기준 향후 12개월 월별 터닝포인트 (21장)
 * 2. 제2권 (master)  : 평생 총운 & 10년 대운 연대기 · 의명진단 마스터팩 (23장)
 * 3. 제3권 (match)   : 1:1 심층 사주 궁합 · 식궁합/여행 · 19+ 에로틱 속궁합 (20장)
 * 4. 제4권 (career)  : 정신과 상담형 이직 · 취업 · 창업 커리어 천직 비서 (20장)
 * -> 표지(1장) + 목판본 원국 명식표(1장) + 본문 84장 = 총 86장 (A4 86페이지 규격)
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 0. 의명진단학 (醫命診斷學) 엔진 - 황제내경 오운육기(五運六氣) & 동의보감 장부론
// ----------------------------------------------------------------------------
const MEDICAL_SAJU_ORGANS = {
  wood: {
    elKor: '목(木)',
    zang: '간장(肝臟)',
    fu: '담낭(膽囊)',
    tissue: '근육·인대·신경계·안구(眼)·손톱',
    emotion: '분노(怒)·억울함·강박적 긴장',
    excessSymptom: '간양상항(肝陽上亢)으로 인한 편두통, 안구 건조 및 충혈, 뒷목 경직, 승모근 뭉침, 수면 중 이갈이, 담석 및 자율신경 과민 증상',
    deficientSymptom: '간혈허(肝血虛)로 인한 만성 근육 피로, 시력 급감, 손발톱 갈라짐, 잦은 현기증, 결단력 저하(담허), 아침 기상 시 극심한 무기력증',
    medicinalFood: '구기자, 결명자, 부추, 미나리, 다슬기, 매실, 시금치, 청경채, 오미자',
    teaPrescription: '구기자·결명자·국화잎을 3:2:1 비율로 달인 청간명목차(淸肝明目茶)',
    avoidFood: '지나치게 기름진 튀김류, 고도주(독주), 인공 감미료, 야간 매운 야식',
    meridianTime: '축시(01:00~03:00, 간경) · 자시(23:00~01:00, 담경) — 반드시 숙면에 들어야 간혈이 해독·재생됨'
  },
  fire: {
    elKor: '화(火)',
    zang: '심장(心臟)',
    fu: '소장(小腸)',
    tissue: '혈관·동맥·혀(舌)·땀샘·안면 홍조·자율신경',
    emotion: '조급증(喜/燥)·가슴 두근거림·예민한 각성',
    excessSymptom: '심화항성(心火亢盛)으로 인한 흉부 답답함(화병), 불면증, 입안 궤양(구내염), 안면 열감, 부정맥성 두근거림, 소장 흡수 장애',
    deficientSymptom: '심기허(心氣虛)로 인한 수족냉증, 저혈압성 어지럼증, 작은 일에도 쉽게 놀라는 가슴 두근거림(경계·정충), 만성 건망증 및 우울감',
    medicinalFood: '연자육(연꽃씨), 대추, 쓴박하, 붉은 토마토, 비트, 석류, 단삼, 여주, 아스파라거스',
    teaPrescription: '연자육·산조인·대추를 달인 양심안신차(養心安神茶) 또는 죽엽차(대나무잎차)',
    avoidFood: '고농도 카페인(공복 아메리카노), 에너지 드링크, 과도한 정제당',
    meridianTime: '오시(11:00~13:00, 심경) · 미시(13:00~15:00, 소장경) — 점심 식사 후 15분간의 눈감기 명상이 심혈을 보호함'
  },
  earth: {
    elKor: '토(土)',
    zang: '비장(脾臟)·췌장',
    fu: '위장(胃臟)',
    tissue: '기살(근육 살집)·입술(脣)·소화점막·림프 순환',
    emotion: '지나친 생각(思)·걱정·반추적 강박',
    excessSymptom: '비위습열(脾胃濕熱)로 인한 역류성 식도염, 복부 팽만감, 내장지방 축적, 대사증후군, 식곤증, 만성 위염 및 담적병(痰積病)',
    deficientSymptom: '비기허(脾氣虛)로 인한 소화불량, 잦은 설사 또는 과민성 대장, 사지 무력감, 조금만 굶어도 손이 떨리는 저혈당성 피로, 안검하수',
    medicinalFood: '산약(마), 생강, 단호박, 양배추, 황기, 인삼, 찹쌀, 대추, 연근, 표고버섯',
    teaPrescription: '생강·진피(귤껍질)·대추를 덖어 우려낸 보비건위차(補脾健胃茶)',
    avoidFood: '찬물(냉수), 밀가루 면류, 급하게 삼키는 식습관, 늦은 밤 폭식',
    meridianTime: '진시(07:00~09:00, 위경) · 사시(09:00~11:00, 비경) — 아침에 따뜻한 미음이나 온수를 마셔야 비위가 깨어남'
  },
  metal: {
    elKor: '금(金)',
    zang: '폐장(肺臟)',
    fu: '대장(大腸)',
    tissue: '기관지·피부(모공)·코(鼻)·점막 면역·대장 연동',
    emotion: '비애(悲)·우울감·결벽적 완벽주의',
    excessSymptom: '폐열·대장조열로 인한 만성 비염, 아토피성 피부 트러블, 마른기침, 변비와 설사의 교차, 호흡기 과민 반응, 결장 긴장',
    deficientSymptom: '폐기허(肺氣虛)로 인한 얕은 호흡, 환절기 감기·독감 취약, 피부 탄력 저하 및 극건성, 목소리 갈라짐, 장내 유익균 감소로 인한 면역력 저하',
    medicinalFood: '도라지(길경), 더덕, 배, 무, 영지버섯, 맥문동, 오미자, 은행, 백합뿌리, 연근',
    teaPrescription: '맥문동·도라지·배 말린 것을 달인 윤폐청금차(潤肺淸金茶)',
    avoidFood: '극도로 건조하고 매운 자극성 식품, 흡연 및 미세먼지 노출, 찬 유제품',
    meridianTime: '인시(03:00~05:00, 폐경) · 묘시(05:00~07:00, 대장경) — 기상 직후 미지근한 물 한 잔이 대장 독소를 배출함'
  },
  water: {
    elKor: '수(水)',
    zang: '신장(腎臟)·부신',
    fu: '방광(膀胱)·생식기',
    tissue: '뼈(骨)·골수·뇌수(腦)·귀(耳)·모발·호르몬 내분비',
    emotion: '공포(恐)·불안·만성적 긴장과 의심',
    excessSymptom: '수습정체(水濕停滯)로 인한 하체 부종, 수족냉증, 야간 빈뇨, 요통, 생식기 냉증, 신장 결석 및 림프 순환 정체',
    deficientSymptom: '신음허·신양허(腎虛)로 인한 만성 부신 피로, 이명(귀울림), 조기 탈모 및 새치, 골밀도 저하, 허리·무릎 시큰거림, 성기능 및 정력 감퇴',
    medicinalFood: '검은콩(서리태), 흑임자, 산수유, 복분자, 굴, 해삼, 미역·다시마, 호두, 밤, 마늘',
    teaPrescription: '산수유·숙지황·구기자를 달인 보신익정차(補腎益精茶) 또는 흑두차',
    avoidFood: '과도한 나트륨(짠 국물), 차가운 맥주, 극단적인 단식 및 밤샘 작업',
    meridianTime: '신시(15:00~17:00, 방광경) · 유시(17:00~19:00, 신경) — 오후 늦게 소금기 적은 수분 섭취와 족욕이 신기를 보충함'
  }
};

function diagnoseMedicalSaju(user) {
  const p = user.pillars;
  const counts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };
  const weights = { year: 1.0, month: 2.2, day: 1.8, hour: 1.2 };

  ['year', 'month', 'day', 'hour'].forEach(k => {
    const pil = p[k];
    if (!pil) return;
    const w = weights[k];
    counts[CHEONGAN_ELEMENTS[pil.stemIdx]] += w * 0.45;
    counts[JIJI_ELEMENTS[pil.branchIdx]] += w * 0.55;
  });

  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const excessEl = sorted[0][0];
  const secondExcessEl = sorted[1][0];
  const deficientEl = sorted[sorted.length - 1][0];
  const secondDeficientEl = sorted[sorted.length - 2][0];

  // 상극(태과 오행이 극하는 오행) 분석
  const controlMap = { wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire' };
  const attackedEl = controlMap[excessEl];

  // 한난조습(寒暖燥濕) 조후 체질 판정
  const mBranch = p.month.branchIdx;
  let thermalType = '';
  let thermalDesc = '';
  let thermalPrescription = '';

  if ([10, 11, 0, 1].includes(mBranch)) {
    thermalType = '한습체질 (寒濕體質 · 냉기 응축형)';
    thermalDesc = '겨울 절기(亥·子·丑·초봄)의 차갑고 응축된 기운 속에서 태어나 체내 말초 혈관이 쉽게 수축하고 하복부와 사지가 냉해지기 쉬운 체질입니다. 스트레스를 받으면 기혈이 얼어붙어 소화기 연동운동이 멈추고 근육이 굳는 증상이 먼저 나타납니다.';
    thermalPrescription = '몸의 중심 체온(단전)을 0.5도 높이는 온열 섭생(溫熱攝生)이 생명줄입니다. 냉수·아이스 음료를 금하고, 반신욕·족욕과 생강·계피·쑥 등 양기를 돋우는 식재료를 상비하십시오.';
  } else if ([4, 5, 6, 7].includes(mBranch)) {
    thermalType = '조열체질 (燥熱體質 · 열기 상충형)';
    thermalDesc = '여름 절기(巳·午·未·늦봄)의 뜨거운 양기가 충만한 시기에 태어나 상체와 두면부(머리·가슴)로 열이 치솟는 상열하한(上熱下寒) 또는 조열(燥熱) 체질입니다. 진액과 수분이 쉽게 말라 안구건조, 피부열감, 수면 장애 및 신경 과민이 발생하기 쉽습니다.';
    thermalPrescription = '가슴과 머리의 화기(火氣)를 내리고 신장의 수기(水氣)를 끌어올리는 수승화강(水昇火降)이 핵심입니다. 매운 자극성 음식과 심야 각성을 피하고, 보리차·맥문동·연자육 및 푸른 채소로 체내 진액을 보충하십시오.';
  } else if ([2, 3].includes(mBranch)) {
    thermalType = '풍온체질 (風溫體質 · 기운 발산형)';
    thermalDesc = '봄 절기(寅·卯)의 솟구치는 생장 기운을 품고 태어나 신경계와 간담(肝膽)의 대사가 매우 활발한 체질입니다. 에너지를 밖으로 뿜어내는 속도가 빨라 오버페이스에 의한 자율신경 실조와 근육 긴장이 잦습니다.';
    thermalPrescription = '지나치게 뻗어 나가는 목(木) 기운을 갈무리하고 간혈을 보충하는 양간(養肝) 섭생이 필요합니다. 신맛과 푸른 채소를 적절히 섭취하되, 밤 11시 이전에 조명을 낮추어 신경계를 이완시키십시오.';
  } else {
    thermalType = '량조체질 (涼燥體質 · 수렴 건조형)';
    thermalDesc = '가을 절기(申·酉·戌)의 서늘하고 수렴하는 금(金) 기운 속에서 태어나 호흡기·기관지·피부 점막과 대장이 예민한 체질입니다. 환절기 기온 차와 건조함에 면역 장벽이 쉽게 흔들리며, 완벽주의적 긴장이 장 트러블로 직결됩니다.';
    thermalPrescription = '폐와 대장의 점막을 촉촉하게 적시는 윤폐(潤肺) 섭생이 필수입니다. 도라지·배·더덕·흰목이버섯 등 백색(白色) 식재료를 가까이하고, 깊은 복식호흡과 유산소 운동으로 폐활량을 키우십시오.';
  }

  return {
    counts,
    excessEl,
    secondExcessEl,
    deficientEl,
    secondDeficientEl,
    attackedEl,
    excessOrgan: MEDICAL_SAJU_ORGANS[excessEl],
    deficientOrgan: MEDICAL_SAJU_ORGANS[deficientEl],
    attackedOrgan: MEDICAL_SAJU_ORGANS[attackedEl],
    secondDeficientOrgan: MEDICAL_SAJU_ORGANS[secondDeficientEl],
    thermalType,
    thermalDesc,
    thermalPrescription
  };
}

// ----------------------------------------------------------------------------
// 공통 헬퍼: 현재 생성 날짜(new Date()) 기준 세운 및 향후 12개월 계산
// ----------------------------------------------------------------------------
function getDynamicSeunContext(user) {
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const curDay = now.getDate();

  let yearGan = '丙', yearZhi = '午';
  const _SolarRef = (typeof Solar !== 'undefined') ? Solar : (typeof window !== 'undefined' ? window.Solar : null);
  if (_SolarRef) {
    try {
      const s = _SolarRef.fromYmdHms(curYear, curMonth, curDay, 12, 0, 0);
      const ec = s.getLunar().getEightChar();
      yearGan = ec.getYearGan();
      yearZhi = ec.getYearZhi();
    } catch (e) {}
  }

  const yStemIdx = Math.max(0, CHEONGAN_HANJA.indexOf(yearGan));
  const yBranchIdx = Math.max(0, JIJI_HANJA.indexOf(yearZhi));
  const yearHanja = `${yearGan}${yearZhi}`;
  const yearKor = `${CHEONGAN[yStemIdx]}${JIJI[yBranchIdx]}`;
  const yearEl = CHEONGAN_ELEMENTS[yStemIdx];
  const yearAnimal = JIJI_ANIMALS[yBranchIdx];
  const dayMaster = user.pillars.day.stemIdx;
  const yearTenGod = getTenGod(dayMaster, yStemIdx);

  // 생성월 기준 향후 12개월 배열 생성
  const months12 = [];
  for (let i = 0; i < 12; i++) {
    const targetDate = new Date(curYear, (curMonth - 1) + i, 15, 12, 0, 0);
    const tY = targetDate.getFullYear();
    const tM = targetDate.getMonth() + 1;
    let mGan = CHEONGAN_HANJA[(yStemIdx * 2 + tM) % 10];
    let mZhi = JIJI_HANJA[(tM + 1) % 12];

    if (_SolarRef) {
      try {
        const ms = _SolarRef.fromYmdHms(tY, tM, 15, 12, 0, 0);
        const mec = ms.getLunar().getEightChar();
        mGan = mec.getMonthGan();
        mZhi = mec.getMonthZhi();
      } catch (e) {}
    }

    const mStemIdx = Math.max(0, CHEONGAN_HANJA.indexOf(mGan));
    const mBranchIdx = Math.max(0, JIJI_HANJA.indexOf(mZhi));
    const mTenGod = getTenGod(dayMaster, mStemIdx);
    const mBranchTenGod = getTenGod(dayMaster, HIDDEN_STEMS[mBranchIdx][0]);

    months12.push({
      seq: i + 1,
      year: tY,
      month: tM,
      gan: mGan,
      zhi: mZhi,
      stemIdx: mStemIdx,
      branchIdx: mBranchIdx,
      kor: `${CHEONGAN[mStemIdx]}${JIJI[mBranchIdx]}`,
      el: CHEONGAN_ELEMENTS[mStemIdx],
      branchEl: JIJI_ELEMENTS[mBranchIdx],
      tenGod: mTenGod,
      branchTenGod: mBranchTenGod
    });
  }

  return {
    curYear,
    curMonth,
    curDay,
    yearGan,
    yearZhi,
    yearHanja,
    yearKor,
    yearEl,
    yearAnimal,
    yearTenGod,
    yStemIdx,
    yBranchIdx,
    months12
  };
}



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
    ? `<div class="counseling-empathy-box">
         <h5><i class="fa-solid fa-feather-pointed"></i> 의뢰인 ${user.name}님의 밤잠을 설치게 만드는 현실 고민 진단</h5>
         <p><strong>의뢰인 호소:</strong> "${user.userConcernDetail}"<br>
         사주 원국과 당해 세운(${seun.yearHanja})의 흐름을 대조한 결과, 이 고민은 개인의 능력 부족이 아니라 ${seun.yearTenGod}의 기운이 인생의 새로운 국면을 요구하며 안방과 직무궁을 흔들기 때문에 일어나는 구조적 성장통입니다. 본 감명서의 비책에 따라 행동 타이밍을 조율하십시오.</p>
       </div>`
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
      incidentStory = `이달은 이달의 지지 ${m.zhi}(${JIJI[m.branchIdx]})가 ${user.name}님의 뿌리이자 안방인 일지 ${JIJI_HANJA[dayBranch]}(${JIJI[dayBranch]})를 정면으로 충돌(沖)합니다. 가만히 머물러 있으려 해도 주변 환경과 관계가 강제로 흔들리는 징조가 뚜렷합니다. 부부·연인 간의 사소한 서운함이 극단적인 자존심 싸움으로 번지거나, 살고 있는 집의 누수·계약 만료, 또는 조직 내 갑작스러운 부서 이동·출장 이슈가 한꺼번에 몰아닥칩니다. 과거의 미련이나 낡은 방식에 집착하면 신체 통증이나 관재구설로 터지니 주의하십시오.`;
      actionStory = `충(沖)은 내가 먼저 선제적으로 기운을 빼주면 '대변혁의 기회'로 승화됩니다. 이달에는 방치했던 집안 가구 배치를 바꾸거나, 묵은 짐을 대대적으로 버리고, 장거리 여행이나 출장으로 공간을 이동하십시오. 특히 ${m.month}월에는 중요한 감정적 담판이나 이별 통보를 홧김에 하지 마시고, 결정 전 반드시 48시간의 냉각기를 두어야 뒤탈을 막습니다.`;
    } else if (isMonthClash) {
      incidentTheme = '월지 사회궁 충(沖) — 직장 내 보직 변경, 상사 마찰, 거래선 재편';
      incidentStory = `이달의 지지가 ${user.name}님의 사회적 활동 무대인 월지 ${JIJI_HANJA[user.pillars.month.branchIdx]}를 강하게 타격합니다. 상사의 갑작스러운 퇴사나 조직 개편으로 내 업무 영역이 강제로 바뀌거나, 믿었던 거래처와의 계약 조건 변경, 주력 프로젝트의 피벗(Pivot)이 발생합니다. 이는 당신을 밀어내려는 악재가 아니라, 더 큰 물로 나가기 위해 낡은 판을 깨뜨리는 명리학적 환골탈태입니다.`;
      actionStory = `조직 내 힘겨루기에 직접 휘말리지 마시고 모든 지시와 합의 사항을 문서와 메일로 철저히 남겨 책임을 분산하십시오. 또한 이달은 헤드헌터나 외부에서 솔깃한 이직 제안이 들어오는 달이니, 즉흥적으로 사표를 던지지 말고 이면 조건을 냉정히 저울질하며 몸값을 높이는 협상 카드로 활용하십시오.`;
    } else if (isComb) {
      incidentTheme = '일지 육합(六合) — 귀인 결속, 극적 계약 체결, 애정의 반등';
      incidentStory = `이달의 지지 ${m.zhi}가 일지 ${JIJI_HANJA[dayBranch]}와 끈끈한 육합(六合)을 이루어 얼어붙었던 기운이 봄눈 녹듯 풀립니다. 흩어졌던 자금과 사람의 마음이 하나로 모이며, 지지부진하던 협상이나 계약이 극적으로 성사되는 징조가 나타납니다. 연인과의 관계에서는 오해가 풀리고 결혼 논의가 급물살을 타며, 솔로인 경우 신뢰할 만한 귀인의 소개로 지적 수준이 맞는 인연과 급격히 가까워집니다.`;
      actionStory = `기운이 결속되는 황금기이므로 망설였던 제안서 발송, 투자 유치, 연봉 협상, 공식 프로포즈를 이달 안에 밀어붙이십시오. 다만 합(合)의 기운이 과하면 정에 이끌려 맺고 끊음을 분명히 하지 못할 수 있으니, 친밀한 관계일수록 공과 사를 명확히 구분하는 서류를 구비해야 복록이 오래갑니다.`;
    } else {
      incidentTheme = `${m.tenGod} 투출 — 사회적 명분 획득과 현실적 결실의 수확`;
      incidentStory = `천간에 ${m.gan}(${m.tenGod})의 기운이 우뚝 솟아 사회적으로 당신의 존재감이 널리 드러납니다. 주도권을 쥐고 프로젝트를 진두지휘하거나 새로운 수익원을 개척할 기회가 주어집니다. 다만 지지의 ${m.zhi}(${m.branchTenGod}) 기운과의 조화를 살피지 않고 과속하면, 월 중순(14일~20일 사이)에 예상치 못한 업무 과부하로 번아웃이 올 수 있으니 완급 조절이 필요합니다.`;
      actionStory = `혼자 모든 책임을 짊어지려 하지 말고 주변 동료나 외부 파트너에게 역할을 위임하십시오. 이달에는 당장의 단기 현금 차익에 눈멀기보다 장기적인 지분·라이선스·인허가 등 '문서화된 권리'를 확보하는 데 집중할 때 향후 몇 배의 자산으로 돌아옵니다.`;
    }

    const luckyDays = `${(m.month * 3) % 9 + 2}일, ${(m.month * 5) % 10 + 12}일, ${(m.month * 7) % 8 + 21}일`;
    const cautionDays = `${(m.month * 2) % 7 + 4}일, ${(m.month * 4) % 9 + 16}일`;
    const luckyDir = (m.branchIdx % 2 === 0) ? '동남쪽 (새로운 생기와 기회가 솟는 방위)' : '북서쪽 (안정과 귀인의 비호를 받는 방위)';
    const luckyColor = ['wood', 'water'].includes(m.el) ? '네이비 블루 · 다크 그린' : '아이보리 화이트 · 샴페인 골드';

    return `
      <div class="report-chapter">
        <div class="chapter-badge">CHAPTER ${String(chapNum).padStart(2, '0')} · 향후 12개월 월별 단독 감명 (제${m.seq}월)</div>
        <h3 class="chapter-title">${m.year}년 ${m.month}월 [${m.gan}${m.zhi}(${m.kor})월] — ${m.tenGod}·${m.branchTenGod}의 기운과 실전 운명 비책</h3>
        <div class="chapter-prose">
          <p>
            감명 시점으로부터 <strong>제${m.seq}번째 달인 ${m.year}년 ${m.month}월(${m.gan}${m.zhi}월)</strong>은 ${user.name}님의 일간 ${CHEONGAN_HANJA[dayMaster]}(${CHEONGAN[dayMaster]})을 기준으로 천간에 <strong>${m.tenGod}</strong>, 지지에 <strong>${m.branchTenGod}</strong>의 파동을 드리웁니다. ${incidentTheme}.
          </p>
          <p>
            이 시기에는 명리학적으로 겉으로 드러나는 명분(${m.gan})과 바닥에서 움직이는 실속(${m.zhi}) 사이에 묘한 온도 차가 발생합니다. 남들의 시선에 그럴듯해 보이는 일보다, 내 손에 실질적인 현금과 권한이 쥐어지는 길을 선택해야 후회가 없습니다.
          </p>

          <div class="event-prediction-box">
            <h5><i class="fa-solid fa-bolt"></i> 앞으로 벌어질 구체적 징조와 사건 예고</h5>
            <p>${incidentStory}</p>
          </div>

          <div class="action-secret-box">
            <h5><i class="fa-solid fa-scroll"></i> 천문 황실 비전(秘傳) — 이달의 실전 비방(秘方) 및 개운 행동</h5>
            <p>
              • <strong>약속 및 담판 길방(吉方):</strong> 중요한 협상이나 미팅 시 ${luckyDir}에 위치한 회의실이나 좌석을 선점하십시오.<br>
              • <strong>의상 및 소지품 파장:</strong> 이달에는 ${luckyColor} 계열의 상의나 금속성 소지품을 몸에 지니면 불필요한 구설을 튕겨냅니다.<br>
              • <strong>실전 행동 강령:</strong> ${actionStory}
            </p>
          </div>

          <div class="medical-care-box">
            <h5><i class="fa-solid fa-leaf"></i> 의명학(醫命學) 장부 양생 및 체질 보양 처방</h5>
            <p>
              이달은 ${ELEMENT_KOREAN[m.el]} 기운의 변동으로 ${user.name}님의 취약 장부인 <strong>${med.deficientOrgan.zang}과 ${med.attackedOrgan.fu}</strong>의 피로도가 가중됩니다. 소화불량이나 안구 건조, 만성 피로가 잦아질 수 있으니 식단에 <strong>${med.deficientOrgan.medicinalFood.split(',').slice(0, 4).join(', ')}</strong> 섭취를 늘리고, ${med.deficientOrgan.teaPrescription}을 온수로 틈틈이 음용하십시오.
            </p>
          </div>

          <div class="key-point-box">
            <h5><i class="fa-solid fa-calendar-check"></i> ${m.year}년 ${m.month}월 핵심 길일(吉日) & 주의일 캘린더</h5>
            <p>
              • <strong>대길일(결단·계약·면접·자금 집행):</strong> ${m.month}월 <strong>${luckyDays}</strong> (우주적 에너지가 집중되는 타이밍)<br>
              • <strong>주의일(감정 충돌·문서 오기·구설 조심):</strong> ${m.month}월 <strong>${cautionDays}</strong> (야간 음주 및 즉흥적 계좌 송금을 철저히 삼가십시오)
            </p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    ${buildMyeongshikTableHtml(user)}

    <!-- 제1장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 세운(歲運) 총론 및 천문 기상도</div>
      <h3 class="chapter-title">${user.name}님의 ${natureName} 원국과 당해 세운(${seun.yearHanja}·${seun.yearKor})의 대충돌과 조화</h3>
      <div class="chapter-prose">
        <p>
          사주명리학에서 원국(原局) 여덟 글자가 당신이 타고난 ‘자동차의 차체와 엔진’이라면, 해마다 바뀌며 찾아오는 <strong>세운(歲運)</strong>은 당신이 지금 달리고 있는 ‘도로의 기후와 지형’입니다. 본 감명서는 과거의 연도에 얽매이지 않고, ${user.name}님께서 운명을 조회하신 현재 시점(<strong>${seun.curYear}년 ${seun.curMonth}월</strong>)을 기점으로 당해 <strong>${seun.yearHanja}(${seun.yearKor}) 세운</strong>과 향후 12개월간의 월건(月建) 변화를 천문력 기준으로 정밀 추적합니다.
        </p>
        <p>
          현재 하늘을 지배하는 세운의 천간은 <strong>${seun.yearGan}(${ELEMENT_KOREAN[seun.yearEl]})</strong>이며, 지지는 <strong>${seun.yearZhi}(${seun.yearAnimal})</strong>입니다. 이를 ${user.name}님의 일간 <strong>${CHEONGAN_HANJA[dayMaster]}(${CHEONGAN[dayMaster]})</strong>에 대입하면 육친상 <strong>‘${seun.yearTenGod}’</strong>의 거대한 파도가 삶의 전면에 밀려들어 온 형국입니다.
        </p>

        ${userConcern}

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-bolt"></i> 당해 세운(${seun.yearHanja})에 일어날 핵심 사건과 환경 변화</h5>
          <p>
            올해는 그동안 미뤄두었던 인생의 중대 과제가 한꺼번에 고개를 드는 해입니다. 직업과 사회적 무대에서는 ${seun.yearTenGod}의 주도권 쟁탈전이 벌어지며, 과거의 익숙했던 루틴에서 벗어나 새로운 권한을 쥐거나 독자적인 성과를 입증해야 하는 상황으로 내몰립니다. 특히 상반기에는 주변 사람들과의 기대치 불일치로 인한 피로감이 누적될 수 있으나, 가을 이후 조후용신인 ${yongshin.johuYongshin}의 기운이 유입되며 극적인 명예 회복과 자산 증식의 활로가 열립니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> 당해 세운 핵심 명리 처방과 절대 수칙</h5>
          <p>
            • <strong>원국 격국 및 강약:</strong> ${pattern.name} (${strength.title}, 득령·득지 ${strength.score}점) — 무리한 정면 승부보다 시스템에 올라타 레버리지를 일으키십시오.<br>
            • <strong>핵심 용신(用神) 나침반:</strong> 억부용신 <strong>[${yongshin.eokbuYongshin}]</strong> / 조후용신 <strong>[${yongshin.johuYongshin}]</strong><br>
            • <strong>조후 양생 지침:</strong> 궁통보감 고전에 비추어 볼 때 ${user.name}님은 ${climate.seasonBadgeText}의 기운을 품고 계시므로(${climate.quote}), 세운의 과열된 기운은 차분히 가라앉히고 얼어붙은 기운은 열정으로 녹여내는 지혜가 요구됩니다.
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
          운에서 들어오는 글자가 내 사주의 연주(조상·초년), 월주(직업·사회궁), 일주(배우자·안방), 시주(말년·자녀·결과물) 중 어느 기둥을 건드리느냐에 따라 사건이 터지는 무대가 정확히 결정됩니다. ${user.name}님의 사주 4기둥 위에 세운 ${seun.yearHanja}가 얹혔을 때 일어나는 기둥별 화학반응은 다음과 같습니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-sitemap"></i> 4대 기둥별 현실 발현 사건 및 충돌 징조</h5>
          <p>
            • <strong>연주 [${user.pillars.year.hanja}]:</strong> 가문, 본가, 혹은 몸담고 있는 업계 전체의 정책·제도 변화가 의사결정에 압력을 가합니다. 윗사람과의 갈등을 피하고 명분을 먼저 챙기십시오.<br>
            • <strong>월주 [${user.pillars.month.hanja}]:</strong> 직무 변동과 주력 수익 구조의 재편이 가장 직접적으로 발생하는 자리입니다. 기존의 업무 방식에 새로운 자동화나 협업 시스템을 결합해야 도태되지 않습니다.<br>
            • <strong>일주 [${user.pillars.day.hanja}]:</strong> 내면의 독립 욕구와 거주 환경의 변동이 동시에 찾아옵니다. 배우자나 연인과의 관계에서 사소한 주도권 다툼을 피하고 공동의 재무 목표를 세우십시오.<br>
            • <strong>시주 [${user.pillars.hour ? user.pillars.hour.hanja : '미상'}]:</strong> 본업 외의 제2 파이프라인, 특허, 자격, 은밀한 투자처가 태동하는 구간으로 하반기로 갈수록 결실력이 커집니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-shield-halved"></i> 세운 충·살(沖煞)을 무력화하는 3대 액막이 비방</h5>
          <p>
            1. <strong>24시간 지연의 법칙:</strong> 중요한 계약서 날인, 거액 송금, 이별 및 사표 통보는 감정이 고조된 순간에 절대 하지 마시고 반드시 하루의 밤을 넘긴 후 실행하십시오.<br>
            2. <strong>공간 파동 정화:</strong> 현재 머무는 침실이나 서재의 서북쪽 구석에 탁한 기운이 고이지 않도록 소금단지나 황동 소품을 배치하여 충살을 흡수하십시오.<br>
            3. <strong>신살 업상대체:</strong> 원국에 잠재된 ${(user.extendedShinsal || []).map(s => s.name).slice(0, 3).join(', ') || '특수 신살'}의 기운을 살리기 위해 봉사활동이나 전문 분야 집중 연구로 날카로운 칼날을 긍정적으로 소모하십시오.
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
          1년 열두 달 내내 전속력으로 달릴 수는 없습니다. 명리학의 고수들은 조후용신(<strong>${yongshin.johuYongshin}</strong>)과 억부용신(<strong>${yongshin.eokbuYongshin}</strong>)이 득세하는 계절에 승부수를 던지고, 기신(忌神)이 강해지는 계절에는 철저히 현금을 보유하며 방패를 듭니다.
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
          <h5><i class="fa-solid fa-chess-knight"></i> ${user.name}님을 위한 연간 공방(攻防) 황금률</h5>
          <p>
            다음 장(CHAPTER 04~15)부터는 감명일 기준 <strong>향후 12개월(제1월~제12월)</strong>의 각 달을 한 페이지씩 단독으로 해부합니다. 매월 초 해당 페이지를 펼쳐 그달의 길일과 주의일, 실전 비방을 삶의 지침서로 삼으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제4장 ~ 제15장: 향후 12개월 월별 단독 심층 감명서 (12장) -->
    ${monthlyChaptersHtml}

    <!-- 제16장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 16 · 연간 재물(財物) 파이프라인 및 현금흐름 극대화</div>
      <h3 class="chapter-title">돈이 들어오는 문과 빠져나가는 구멍 — 향후 1년간의 자산 배분 전략</h3>
      <div class="chapter-prose">
        <p>
          ${user.name}님의 원국은 <strong>${strength.title}</strong> 구조 위에 <strong>${pattern.name}</strong>의 재물 그릇을 얹고 있습니다. ${strength.status === 'strong' ? '주체적 에너지가 강하므로 남의 밑에서 고정급만 받기보다 인센티브, 사업 소득, 독자적 투자 파이프라인에서 큰 재물이 터져 나오는 구조입니다.' : '무리하게 차입 레버리지를 일으키기보다, 확실한 시스템·우량 배당·자격·문서 자산에 올라타 안정적인 현금흐름을 구축할 때 부가 새지 않고 견고히 쌓입니다.'}
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
            3. <strong>지갑 풍수 비책:</strong> 영수증이나 쓰지 않는 카드를 지갑에서 매일 비워내고, ${yongshin.eokbuYongshin === '금(金)' ? '새 지폐 1장을 붉은 종이에 싸서' : '금빛 클립으로 지폐를 묶어'} 안쪽 깊숙이 넣어두면 재물의 누수를 차단합니다.
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
          <h5><i class="fa-solid fa-compass-drafting"></i> ${user.name}님 맞춤 문서·이동 개운 비방전</h5>
          <p>
            • <strong>길방(吉方) 선점:</strong> 현재 거주지 기준 <strong>${dayEl === 'wood' || dayEl === 'fire' ? '동남쪽 · 남쪽 (생기 방위)' : '서북쪽 · 북동쪽 (수렴 방위)'}</strong>로 움직일 때 막혔던 일들이 자연스럽게 풀립니다.<br>
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
          운이 바뀔 때는 반드시 <strong>‘사람’</strong>을 통해 복과 화가 들어옵니다. ${user.name}님의 일간 ${CHEONGAN_HANJA[dayMaster]}을 기준으로 천을귀인(天乙貴人)과 용신 오행(<strong>${yongshin.eokbuYongshin}</strong>)을 품은 인연을 곁에 두면 얽혔던 실타래가 기적처럼 풀립니다.
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
          동의보감과 황제내경은 "사주에 오행의 편고(偏枯)가 있으면 반드시 신체 장부의 허실(虛實)로 발현된다"고 단언합니다. ${user.name}님의 원국 분석 결과, 가장 보살펴야 할 취약 장부는 <strong>${med.deficientOrgan.zang}</strong>이며, 가장 과열되기 쉬운 장부는 <strong>${med.excessOrgan.zang}</strong>입니다.
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
            • <strong>약선 음식:</strong> ${med.deficientOrgan.medicinalFood}<br>
            • <strong>매일 마실 한방차:</strong> ${med.deficientOrgan.teaPrescription}<br>
            • <strong>경락 골든타임:</strong> ${med.deficientOrgan.meridianTime} — 이 시간에는 전자기기를 멀리하고 숙면을 취해야 오장육부의 진액이 재생됩니다.
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
          <h5><i class="fa-solid fa-wand-magic-sparkles"></i> ${user.name}님 맞춤 황실 개운 처방전</h5>
          <p>
            • <strong>침실 베개 방향:</strong> 머리를 <strong>${dayEl === 'water' || dayEl === 'wood' ? '동쪽 또는 남쪽' : '서북쪽'}</strong>으로 두고 주무시면 자는 동안 대지의 맑은 자기를 흡수하여 아침 기상이 가벼워집니다.<br>
            • <strong>행운의 색채:</strong> 속옷이나 지갑, 휴대폰 케이스에 ${yongshin.johuYongshin === '화(火)' ? '레드 · 버건디' : yongshin.johuYongshin === '수(水)' ? '블랙 · 딥 네이비' : '골드 · 화이트'} 색상을 적극 차용하십시오.<br>
            • <strong>행운의 숫자와 암호:</strong> 중요한 비밀번호나 계좌 끝자리에 ${yongshin.johuYongshin === '목(木)' ? '3, 8' : yongshin.johuYongshin === '화(火)' ? '2, 7' : '1, 6'}을 조합하십시오.<br>
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
          운명은 단절된 1년의 점이 아니라, 끊임없이 이어지는 파도의 곡선입니다. 당해 세운(${seun.yearHanja})을 성공적으로 디딤돌 삼아 나아갈 때, 향후 3년 동안 ${user.name}님의 인생에는 다음과 같은 거대한 퀀텀 점프가 준비되어 있습니다.
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
          <h5><i class="fa-solid fa-heart"></i> 천문(天門) 스승이 ${user.name}님께 바치는 축원문</h5>
          <p>
            "흐르는 강물은 바위를 만나도 멈추지 않고, 바위를 감싸 안고 돌아 마침내 큰 바다에 이릅니다. 그동안 남모르게 흘린 땀방울과 눈물은 결코 헛되지 않았으며, 이제 운의 순풍이 당신의 돛을 힘차게 밀어줄 차례입니다. 부디 당신의 고유한 별을 믿고 당당하게 전진하십시오."
          </p>
        </div>
      </div>
    </div>
  `;
}



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
    ? `<div class="key-point-box">
         <h5><i class="fa-solid fa-brain"></i> 명리학 십성(十星)과 현대 심리학 MBTI (${user.userMbti}) 교차 분석</h5>
         <p>${user.name}님의 사주 본원인 <strong>${natureName}</strong>과 ${user.userMbti} 성향은 '깊은 내면의 통찰과 독립적인 실행력'이라는 강력한 공통분모를 가집니다. 겉으로는 합리적이고 차분하지만, 본인의 원칙이나 목표가 설정되면 타협 없이 끝까지 밀어붙이는 승부사 기질이 발현됩니다.</p>
       </div>`
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

    return `
      <div class="report-chapter">
        <div class="chapter-badge">CHAPTER ${String(chapNum).padStart(2, '0')} · 10년 대운 연대기 심층 해부 (제${idx + 1}대운)</div>
        <h3 class="chapter-title">${d.startAge}세 ~ ${d.endAge}세 [${d.gan}${d.zhi}(${d.kor}) 대운] — ${d.tenGod}·${dBranchTenGod}의 10년 기상도</h3>
        <div class="chapter-prose">
          <p>
            <strong>${user.name}님의 인생 제${idx + 1}막 (${d.startAge}세~${d.endAge}세, ${stageLabel})</strong>을 지배하는 10년 대운은 <strong>${d.gan}${d.zhi}(${d.kor})</strong>입니다. 대운의 전반부 5년(${d.startAge}세~${d.startAge + 4}세)은 천간 <strong>${d.gan}(${d.tenGod})</strong>이 외적인 사회 환경과 인맥의 물갈이를 주도하며, 후반부 5년(${d.startAge + 5}세~${d.endAge}세)은 지지 <strong>${d.zhi}(${dBranchTenGod})</strong>가 실질적인 재물고와 생활 터전의 뿌리를 다지거나 대변혁을 일으킵니다.
          </p>
          <p>
            ${isPrime ? `특히 이 <strong>${d.startAge}세~${d.endAge}세 구간</strong>은 ${user.name}님의 원국 격국(${pattern.name})이 대운의 지지를 받아 인생 최대의 사회적 영토와 자산을 확보하는 <strong>황금 전성기(Prime Era)</strong>입니다. 안주하지 마시고 본인의 브랜드와 시스템을 구축하십시오.` : `이 <strong>${d.startAge}세~${d.endAge}세 구간</strong>은 무리한 외형 확장보다는 전문성을 깊이 파고들어 다음 도약기를 위한 자원을 비축해야 하는 내실의 시간입니다.`}
            ${isClashWithMonth ? `<br><strong>[월지 대운충]:</strong> 이 10년 사이에 직업 도메인이나 주력 사업 아이템이 완전히 뒤바뀌는 대대적인 환골탈태를 경험합니다.` : ''}
            ${isClashWithDay ? `<br><strong>[일지 대운충]:</strong> 안방과 거주 환경이 요동치므로 거주지 대이동이나 가정 관계의 성숙한 재정립이 요구됩니다.` : ''}
          </p>

          <div class="event-prediction-box">
            <h5><i class="fa-solid fa-hourglass-start"></i> 이 10년간 반드시 겪게 될 핵심 사건과 환경 변화</h5>
            <p>
              • <strong>전반 5년 (${d.startAge}~${d.startAge + 4}세, 천간 ${d.gan}·${d.tenGod}):</strong> 새로운 사회적 직함이나 프로젝트 제안이 쏟아집니다. 인간관계의 물갈이가 시작되며, 과거의 인연보다 새로운 협력자와의 결속이 성패를 좌우합니다. 초기 2년은 검증에 집중하고 3년 차부터 전면 승부를 거십시오.<br>
              • <strong>후반 5년 (${d.startAge + 5}~${d.endAge}세, 지지 ${d.zhi}·${dBranchTenGod}):</strong> 전반기에 뿌린 노력이 현실적인 결과물(${dBranchTenGod})로 단단히 굳어지는 시기입니다. 부동산·지분 취득, 법인 설립, 또는 조직 내 확고한 고위직 안착이 이 5년 안에 판가름 납니다.
            </p>
          </div>

          <div class="action-secret-box">
            <h5><i class="fa-solid fa-scroll"></i> 천문 대운 개운 비책 — 10년의 승률을 극대화하는 행동 지침</h5>
            <p>
              • <strong>대운 교체기 액막이:</strong> 대운이 바뀌는 전후 1~2년(${d.startAge - 1}세, ${d.startAge}세 무렵)에는 몸살이나 일시적 정체감이 올 수 있습니다. 이는 낡은 기운이 빠져나가는 자연스러운 명리 환절기이므로, 헌 가구를 교체하고 건강검진을 받아 액운을 물리적으로 소모하십시오.<br>
              • <strong>자산 수성 전략:</strong> ${d.tenGod}의 작용이 과열될 때는 지인의 투자 제안이나 동업 유혹을 차단하고, 확실한 현금 파이프라인과 안전 자산에 자금을 묶어두는 것이 최선입니다.
            </p>
          </div>

          <div class="medical-care-box">
            <h5><i class="fa-solid fa-heart-pulse"></i> 의명학(醫命學) 장부 관리 및 취약 질환 방어</h5>
            <p>
              이 대운의 오행(${ELEMENT_KOREAN[CHEONGAN_ELEMENTS[dStemIdx]]}·${ELEMENT_KOREAN[JIJI_ELEMENTS[dBranchIdx]]})이 원국의 <strong>${med.deficientOrgan.zang}과 ${med.attackedOrgan.zang}</strong>에 주는 자극을 세심하게 관찰하십시오. ${d.startAge + 4}세와 ${d.endAge - 1}세 무렵에는 과로를 절대 피하시고 ${med.deficientOrgan.medicinalFood.split(',').slice(0, 3).join(', ')} 위주의 온열 식단을 유지하십시오.
            </p>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    ${buildMyeongshikTableHtml(user)}

    <!-- 제1장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 자평진전(子平眞詮) 10대 격국(格局) 총론</div>
      <h3 class="chapter-title">하늘이 부여한 사회적 그릇 — ${user.name}님은 왜 [${pattern.name}]의 삶을 살게 되는가</h3>
      <div class="chapter-prose">
        <p>
          사주명리학의 최고봉인 『자평진전(子平眞詮)』은 인간의 사회적 성패와 삶의 무대를 결정짓는 핵심 열쇠로 <strong>월지(月支: 태어난 달의 지지)</strong> 지장간에서 투출한 <strong>격국(格局)</strong>을 꼽습니다. 일간(日干)이 ‘나 자신의 영혼’이라면, 격국은 내가 세상에 나가 평생 동안 휘두르게 될 ‘최강의 무기이자 사회적 직함’입니다.
        </p>
        <p>
          ${user.name}님의 원국을 정밀 감명한 결과, 당신의 사주는 <strong>[${pattern.name} (${pattern.badge})]</strong>으로 귀결됩니다. ${pattern.desc}
        </p>

        ${userMbtiRef}

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-crown"></i> [${pattern.name}]의 운명적 사회 발현 방식</h5>
          <p>
            ${pattern.name}을 타고난 사람은 남의 지시를 맹목적으로 따르는 수동적 환경에 갇히면 극심한 정신적 질식과 번아웃을 겪습니다. 반면 본인의 전문성과 자율성이 보장되는 판에 서면 남들보다 3배 이상의 집중력을 발휘하여 업계의 독보적인 자리를 꿰차는 특유의 승부사 기질이 발현됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> [${pattern.name}] 성패(成敗)의 절대 법칙</h5>
          <p>
            • <strong>타고난 천직 도메인:</strong> ${pattern.career}<br>
            • <strong>부의 축적 메커니즘:</strong> ${pattern.wealth}<br>
            • <strong>신강/신약 최적 포지셔닝:</strong> ${strength.title} (${strength.score}점) — ${strength.desc}
          </p>
        </div>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 일주(日柱) 본원 심층 해부 — 영혼의 핵과 배우자궁</div>
      <h3 class="chapter-title">${natureName}의 양면성 — 남들은 절대 모르는 당신의 고독과 야망</h3>
      <div class="chapter-prose">
        <p>
          사주 여덟 글자 중 나 자신을 상징하는 일간(日干) <strong>${CHEONGAN_HANJA[dayMaster]}(${CHEONGAN[dayMaster]})</strong>과 내가 발을 딛고 선 안방이자 배우자 자리인 일지(日支) <strong>${JIJI_HANJA[dayBranch]}(${JIJI[dayBranch]})</strong>의 결합은 평생의 무의식과 심리를 지배합니다.
        </p>
        <p>
          겉으로 드러나는 ${user.name}님은 예의 바르고 합리적이며 웬만한 일에는 감정을 크게 드러내지 않는 것처럼 보입니다. 그러나 일지 ${JIJI_HANJA[dayBranch]}의 지장간(${HIDDEN_STEMS[dayBranch].map(i => CHEONGAN_HANJA[i]).join('·')}) 속에는 누구에게도 종속되기 싫어하는 강렬한 독립심과 서늘한 야망이 깃들어 있습니다.
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
      <h3 class="chapter-title">연주 [${user.pillars.year.hanja}(${user.pillars.year.korean})]에 새겨진 초년의 서사와 자수성가의 코드</h3>
      <div class="chapter-prose">
        <p>
          연주(年柱)는 내가 태어난 가문의 영적 토양과 유년기(0세~19세)의 성장 환경을 관장합니다. ${user.name}님의 연주는 <strong>${user.pillars.year.hanja}(${user.pillars.year.korean})</strong>로, 조상의 업력과 부모의 영향력이 당신의 성격 형성에 어떤 밑그림을 그렸는지 보여줍니다.
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
      <h3 class="chapter-title">월주 [${user.pillars.month.hanja}(${user.pillars.month.korean})]와 지장간 역학 — 청년·중년 사회적 성취의 엔진</h3>
      <div class="chapter-prose">
        <p>
          월주(月柱)는 20대부터 40대까지 청·중년기의 커리어 무대이자 사회적 활동의 핵심 심장입니다. ${user.name}님의 월주 <strong>${user.pillars.month.hanja}(${user.pillars.month.korean})</strong>는 세상이 당신을 부르는 방식이자, 당신이 돈을 벌어들이는 가장 강력한 파이프라인입니다.
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
            남들이 만들어 놓은 사다리를 단순히 오르기보다, ${pattern.name}의 독창성을 살려 '나만의 전문 영역'을 특화하십시오. 직함보다 실질적인 라이선스와 저작권, 고객 데이터베이스를 확보하는 것이 40대 이후의 거대한 자산으로 직결됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제5장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 05 · 시주(時柱) 말년·결실궁 해부 — 인생 후반전의 부귀와 숨은 욕망</div>
      <h3 class="chapter-title">시주 [${user.pillars.hour ? `${user.pillars.hour.hanja}(${user.pillars.hour.korean})` : '삼주 감명 모드'}]가 예고하는 50대 이후의 최종 성적표</h3>
      <div class="chapter-prose">
        <p>
          시주(時柱)는 50대 이후 인생의 결실기이자 자녀궁, 그리고 남들에게 차마 말하지 못하는 은밀한 취미와 무의식의 창고입니다. 시주가 튼튼하면 초년과 중년에 아무리 풍파를 겪더라도 말년에 거대한 부와 안락한 가문을 완성합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-trophy"></i> 인생 후반전에 기다리고 있는 보상과 결실</h5>
          <p>
            ${user.pillars.hour ? `시주에 자리한 ${user.pillars.hour.hanja}의 기운은 후반전으로 갈수록 부동산, 배당 소득, 혹은 자녀의 출세로 인한 복록이 두터워짐을 뜻합니다. 중년의 고난이 결국 말년의 큰 그릇을 빚기 위한 불가피한 풀무질이었음을 깨닫게 됩니다.` : `태어난 시간이 미상이더라도 원국의 월주와 일주 구조상 중년 이후의 자산 수성 능력이 뛰어나며, 나이가 들수록 품격과 대인관계의 원숙함이 배가됩니다.`}
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
          <h5><i class="fa-solid fa-scale-balanced"></i> ${user.name}님의 용신 배합과 길흉의 분기점</h5>
          <p>
            ${user.name}님의 억부용신은 <strong>[${yongshin.eokbuYongshin}]</strong>이며, 조후용신은 <strong>[${yongshin.johuYongshin}]</strong>입니다. 용신의 기운이 대운이나 세운에서 들어올 때는 특별한 무리 없이도 귀인이 돕고 일이 일사천리로 풀리나, 용신을 극하는 기신(忌神) 운에서는 사소한 욕심이 큰 화를 부릅니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> 용신의 기운을 일상으로 끌어들이는 3대 처방</h5>
          <p>
            • <strong>공간 방위:</strong> 집이나 사무실의 ${yongshin.johuYongshin === '수(水)' ? '북쪽' : yongshin.johuYongshin === '화(火)' ? '남쪽' : yongshin.johuYongshin === '목(木)' ? '동쪽' : '서쪽'}을 항상 청결하고 밝게 유지하십시오.<br>
            • <strong>식습관:</strong> ${climate.seasonBadgeText}의 기운을 다스릴 수 있도록, 차가운 체질은 따뜻한 온수와 구운 음식을, 열이 많은 체질은 시원한 채소와 보리차를 생활화하십시오.<br>
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
          <h5><i class="fa-solid fa-atom"></i> 원국 내 역학 관계(${(dynamics.stemRelations || []).concat(dynamics.branchRelations || []).join(', ') || '독립적 평형'})가 빚어내는 심리</h5>
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
          <h5><i class="fa-solid fa-wand-magic"></i> ${user.name}님의 사주에 깃든 주요 길신의 위력</h5>
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
    ${daeunChaptersHtml}

    <!-- 제19장: 의명진단학 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 의명진단학(醫命診斷學) 제1편 — 오운육기(五運六氣) 오장육부 허실 진단</div>
      <h3 class="chapter-title">황제내경에 근거한 장부 균형 진단 — 내 몸의 어느 장기가 울고 있는가</h3>
      <div class="chapter-prose">
        <p>
          동양의학의 성전인 『황제내경(黃帝內經)』은 사주팔자의 오행 불균형이 곧 인체 오장육부의 기혈 순환 장애를 일으킨다고 밝힙니다. ${user.name}님의 사주 원국에서 <strong>가장 태과(太過)한 기운은 ${med.excessOrgan.elKor}</strong>이며, <strong>가장 결핍(不及)된 기운은 ${med.deficientOrgan.elKor}</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-triangle-exclamation"></i> 오행 편고로 인해 나타나는 만성 신체 증상</h5>
          <p>
            • <strong>${med.excessOrgan.zang} 과열 증상:</strong> ${med.excessOrgan.excessSymptom}<br>
            • <strong>${med.deficientOrgan.zang} 허약 증상:</strong> ${med.deficientOrgan.deficientSymptom}
          </p>
        </div>

        <div class="medical-care-box">
          <h5><i class="fa-solid fa-mortar-pestle"></i> 오장육부 평형을 되찾는 근본 조치</h5>
          <p>
            태과한 장부의 열기는 덜어내고(瀉), 메마른 장부의 진액은 채워주는(補) 섭생이 필수적입니다. 기름진 야식과 차가운 음료를 금하고, ${med.deficientOrgan.zang}을 보하는 ${med.deficientOrgan.medicinalFood.split(',').slice(0, 4).join(', ')} 섭취를 주 3회 이상 유지하십시오.
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
          사람의 체질은 태어난 달의 기후에 따라 <strong>한(寒)·난(暖)·조(燥)·습(濕)</strong>의 네 가지로 갈립니다. ${user.name}님은 <strong>[${med.thermalType}]</strong>으로 분류됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-temperature-half"></i> 체질적 특성과 스트레스 시 발병 메커니즘</h5>
          <p>${med.thermalDesc}</p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-notes-medical"></i> 평생 체질 맞춤 생활 수칙</h5>
          <p>${med.thermalPrescription}</p>
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
          <h5><i class="fa-solid fa-utensils"></i> ${user.name}님을 살리는 맞춤 약선 식품</h5>
          <p>
            • <strong>반드시 챙겨 먹어야 할 본초 식재료:</strong> ${med.deficientOrgan.medicinalFood}<br>
            • <strong>기운을 맑히는 한방차 레시피:</strong> ${med.deficientOrgan.teaPrescription}<br>
            • <strong>절대 피해야 할 독소 음식:</strong> ${med.deficientOrgan.avoidFood}
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
          <h5><i class="fa-solid fa-bed"></i> ${user.name}님 맞춤 수면과 호흡 비방</h5>
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
          사주명리학에서 재물(財物)은 단순히 통장의 숫자가 아니라, 내가 세상에 기여하고 타인을 이롭게 한 대가로 우주가 되돌려주는 ‘에너지의 총량’입니다. ${user.name}님의 평생 재물선은 초년의 시행착오를 거쳐 중년 전성기에 만개하며, 말년에는 견고한 시스템 자산으로 완성되는 대기만성형 궤적을 그립니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-coins"></i> 인생 3단계 자산 완성 시나리오</h5>
          <p>
            • <strong>청년기 (씨앗기):</strong> 내 몸값을 올리는 전문 기술과 자격, 신용 자본을 구축하는 데 집중하십시오.<br>
            • <strong>중년기 (폭발기):</strong> ${pattern.name}의 주도권을 활용하여 독자적인 사업체나 핵심 자산(부동산·지분)을 매입하십시오.<br>
            • <strong>노년기 (수성기):</strong> 공격적인 투자를 멈추고 현금흐름이 보장되는 연금과 임대 수익 구조로 전환하여 가문의 반석을 굳히십시오.
          </p>
        </div>

        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-hand-holding-heart"></i> ${user.name}님의 고귀한 삶을 축원하며</h5>
          <p>
            "당신의 사주에 새겨진 여덟 글자는 정해진 감옥이 아니라, 당신이 가장 아름답고 눈부시게 피어날 수 있도록 안내하는 보물지도입니다. 하늘의 때를 알고 나아갈 때 세상의 모든 바람이 당신의 편이 될 것입니다."
          </p>
        </div>
      </div>
    </div>
  `;
}



// ============================================================================
// 3. 제3권 (match) : 1:1 심층 사주 궁합 · 식궁합/여행 · 19+ 에로틱 속궁합 (총 20장)
// ============================================================================
function buildMatchReportHtml(user, natureName) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const dayEl = CHEONGAN_ELEMENTS[dayMaster];
  const climate = user.climate;
  const strength = user.strength;
  const yongshin = user.yongshin;
  const med = diagnoseMedicalSaju(user);

  return `
    ${buildMyeongshikTableHtml(user)}

    <!-- 제1장: 프롤로그 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 인연의 문턱에서 드리는 첫 말씀 (프롤로그)</div>
      <h3 class="chapter-title">어떤 마음으로 이 페이지를 펼치셨든 — 두 사주의 민낯부터 편견 없이 마주합니다</h3>
      <div class="chapter-prose">
        <p>
          사랑은 세상에서 가장 찬란한 축복이지만, 동시에 한 사람의 밑바닥 불안과 상처를 가장 적나라하게 들추어내는 거울이기도 합니다. 짝사랑의 초조함으로 잠 못 이루고 계시든, 이별 후 지독한 그리움으로 재회의 끈을 놓지 못하고 계시든, 혹은 사랑하면서도 잦은 다툼으로 지쳐 계시든, 본 감명서는 두 사람의 원국 여덟 글자를 가감 없이 펼쳐놓고 <strong>'인연의 근원적 설계도'</strong>를 해독합니다.
        </p>

        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-heart-crack"></i> 얽히고설킨 마음에 건네는 명리학적 위로</h5>
          <p>
            "상대가 왜 그렇게 냉정하게 돌아섰는지, 왜 내 사소한 말에 불같이 화를 내는지, 도대체 나와 그 사람 사이에는 어떤 보이지 않는 끈이 연결되어 있는지... 당신이 겪고 있는 그 모든 혼란은 결코 당신이 부족해서가 아닙니다. 두 영혼의 기운이 서로를 맞추어가는 과정에서 필연적으로 발생하는 명리학적 마찰열일 뿐입니다."
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> 본 감명서 20장의 입체적 구성 안내</h5>
          <p>
            본 서책은 단순한 점수 매기기(몇 점짜리 궁합인가)를 단호히 거부합니다. 겉궁합(성격·사회적 가치관)부터 시작하여, 짝사랑·재회·결혼 등 <strong>현재 상황별 맞춤 전략 3편</strong>, 갈등 시 상대의 분노를 즉시 잠재우는 화해의 언어학, 데이트와 식궁합, 그리고 어디서도 듣지 못했던 <strong>19+ 성인 에로틱 속궁합 5부작</strong>까지, 두 사람의 관계를 영구히 결속시킬 모든 비방을 남김없이 전수합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 본원(本元)의 이끌림과 일주(日柱) 구조 해부</div>
      <h3 class="chapter-title">${user.name}님과 상대방의 에너지 본질 — 자석처럼 끌리는 이유와 부딪히는 지점</h3>
      <div class="chapter-prose">
        <p>
          남녀가 처음 만나 스파크가 튀는 것은 머리의 계산이 아니라, <strong>일간(日干: 영혼의 본질)</strong>과 <strong>일지(日支: 육체와 안방의 기운)</strong>가 무의식중에 서로의 결핍을 알아보고 자석처럼 끌어당기기 때문입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-magnet"></i> 두 사람 사이에서 일어나는 화학 반응의 실체</h5>
          <p>
            ${user.name}님의 ${natureName} 기운은 상대방에게 전에 없던 안정감과 지적 매력을 선사하며, 상대방의 기운은 당신의 굳어 있던 감성을 단숨에 흔들어 깨웁니다. 서로에게서 자신이 가지지 못한 세계를 발견하기에 급격한 설렘에 빠져들지만, 익숙해질수록 그 차이점이 "왜 나와 같지 않은가"라는 실망감으로 돌변하기 쉽습니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-hand-holding-heart"></i> 본원의 조화를 이끄는 관계 유지 비결</h5>
          <p>
            상대방을 내 틀에 맞추어 개조하려 들지 마십시오. 당신의 정밀함과 상대방의 직관력이 서로를 보완할 때 두 사람은 단순한 연인을 넘어 인생 최고의 동반자이자 원팀이 됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제3장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 03 · 오행(五行) 배합과 에너지 균형</div>
      <h3 class="chapter-title">내가 채워주고 상대가 덜어주는 기운 — 두 사주의 유무(有無) 분석</h3>
      <div class="chapter-prose">
        <p>
          완벽한 궁합이란 두 사람의 사주가 똑같은 것이 아니라, <strong>내가 넘치는 기운을 상대에게 흘려보내고, 내가 메마른 기운을 상대에게서 수혈받는 상생(相生)의 고리</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-arrows-spin"></i> 기운의 흐름과 감정 교류의 징조</h5>
          <p>
            한쪽이 감정적으로 폭주할 때 다른 한쪽이 차분한 이성으로 제동을 걸어주거나, 한쪽이 깊은 무기력에 빠졌을 때 다른 한쪽이 불꽃 같은 추진력으로 손을 잡아 끌어올려 주는 상호 보완의 기류가 작동합니다. 다만 피로가 극에 달한 시기에는 서로의 부족한 점을 탓하며 에너지를 고갈시킬 위험이 있습니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-scale-balanced"></i> 오행 균형을 잡는 일상 커플 처방</h5>
          <p>
            두 사람의 대화에서 "당신 때문에"라는 표현을 완전히 금지하고, "우리가 함께"라는 표현을 의식적으로 쓰십시오. 언어의 파동이 오행의 탁기를 정화하고 둘 사이의 감정 저수지를 풍요롭게 만듭니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제4장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 04 · 무엇이 부족한가 — 결핍의 구멍과 채워야 할 제3의 오행</div>
      <h3 class="chapter-title">두 사주 사이에서 비어 있는 틈새와 이를 메우는 관계 개운법</h3>
      <div class="chapter-prose">
        <p>
          두 사람의 사주를 합쳐도 여전히 부족하거나 고갈되어 있는 오행이 존재할 수 있습니다. 이것이 바로 관계의 <strong>'결핍의 구멍'</strong>이며, 외부의 풍수와 생활 습관으로 이 제3의 오행을 채워주지 않으면 이유 모를 권태나 외부 변수에 흔들리게 됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-circle-exclamation"></i> 결핍 오행이 자극받을 때 생기는 위기</h5>
          <p>
            제3의 오행이 부족하면 둘만의 폐쇄적인 관계에 갇혀 사소한 집착과 의심이 싹트거나, 외부 재정적 압박이 들어왔을 때 둘의 애정이 급격히 위축되는 현상이 벌어집니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-wand-magic-sparkles"></i> 부족한 제3 오행을 보충하는 커플 개운 비책</h5>
          <p>
            • <strong>공간 풍수:</strong> 데이트나 주거 공간에 자연 식물(목기), 따뜻한 캔들(화기), 도자기나 황토 소품(토기), 금속 스탠드(금기), 미니 분수대나 어항(수기)을 배치하십시오.<br>
            • <strong>외부 활동:</strong> 둘만의 좁은 방에만 있지 마시고 주말마다 미술관, 숲길 산책, 새로운 레저 활동을 공유하여 신선한 제3의 에너지를 관계 안으로 끌어들이십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제5장: 상황별 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 05 · 상황별 맞춤 전략 ① — [짝사랑 · 썸 · 탐색기]인 경우</div>
      <h3 class="chapter-title">아직 닿지 않은 마음을 내 쪽으로 기울게 만드는 사주 공략법</h3>
      <div class="chapter-prose">
        <p>
          상대의 마음을 열려면 무작정 저돌적으로 다가가거나 막연히 기다리는 수동적 태도를 버려야 합니다. 상대의 일간과 십신 특성을 정확히 파악하여 <strong>'가장 거부할 수 없는 방식과 타이밍'</strong>으로 접근해야 승률이 올라갑니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-comments"></i> 썸 단계에서 상대가 보이는 심리적 반응과 진입 신호</h5>
          <p>
            상대는 겉으로는 무심한 척하거나 예의 바른 거리를 유지할 수 있지만, 당신의 지적인 전문성이나 예상치 못한 반전 매력을 볼 때 깊은 호기심을 느낍니다. 섣부른 조급함으로 매일 연락을 쏟아부으면 부담을 느끼고 방어벽을 세우게 됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-bullseye"></i> 상대방의 마음을 무장해제시키는 3단계 공략 공식</h5>
          <p>
            1. <strong>연락 골든타임:</strong> 밤늦은 감정 과잉의 시간보다, 상대의 기운이 차분해지는 오후 4시~6시 사이에 업무나 관심사와 관련된 가벼운 명분으로 톡을 건네십시오.<br>
            2. <strong>질문의 미학:</strong> "뭐해?" 같은 막연한 안부 대신, 상대의 취향이나 전문 지식을 묻는 질문으로 자존감을 세워주십시오.<br>
            3. <strong>밀당의 명리 수칙:</strong> 3번 다정하게 반응했다면 1번은 연락 템포를 늦추어 상대가 당신의 빈자리를 스스로 체감하게 만드십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제6장: 상황별 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 06 · 상황별 맞춤 전략 ② — [이별 후 재회(再會)를 고민하는] 경우</div>
      <h3 class="chapter-title">끊어진 줄 알았던 인연의 실타래 — 언제, 어떤 명분으로 다시 닿는가</h3>
      <div class="chapter-prose">
        <p>
          헤어졌다고 해서 두 사람의 사주적 인연의 끈이 완전히 끊어진 것은 아닙니다. 대부분의 이별은 사랑이 식어서가 아니라, 특정 대운이나 세운에서 <strong>일지와 월지가 충(沖)을 맞아 감정의 퓨즈가 끊어졌기 때문</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-clock-rotate-left"></i> 재회의 기운이 다시 차오르는 결정적 타이밍</h5>
          <p>
            이별 직후의 매달림이나 장문의 해명 문자는 100% 역효과를 냅니다. 상대의 사주에서 충살의 탁기가 빠져나가고 일지 합(合)의 기운이 찾아오는 <strong>이별 후 최소 45일~90일 시점</strong>에 상대의 방어기제가 무너지고 미화된 그리움이 솟구칩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-paper-plane"></i> 재회를 부르는 '단 한 줄의 명분 멘트'와 행동 비책</h5>
          <p>
            • <strong>금기 행동:</strong> SNS에 감정적인 슬픈 글귀나 술 사진을 올리지 마시고, 당신이 혼자서도 빛나고 성숙해졌음을 은연중에 보여주십시오.<br>
            • <strong>연락 멘트 공식:</strong> "다시 만나자"는 무거운 고백이 아니라, "예전에 네가 추천해 줬던 책(또는 장소) 지나가다 생각나서 연락했어. 잘 지내지?"와 같이 상대가 답장하기 편안한 가벼운 핑계를 던져 대화의 문을 여십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제7장: 상황별 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 07 · 상황별 맞춤 전략 ③ — [현재 교제 중 · 결혼을 앞둔] 경우</div>
      <h3 class="chapter-title">설렘을 넘어 평생의 동반자로 — 주도권 조율과 공동 자산의 결합</h3>
      <div class="chapter-prose">
        <p>
          연애가 ‘두 감정의 화학 반응’이라면, 결혼은 ‘두 집안의 명리학적 기운과 경제적 현실이 하나로 결합하는 거대한 제도적 계약’입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-ring"></i> 현실적 결합 과정에서 직면할 마찰과 징조</h5>
          <p>
            결혼 준비 과정에서 예식장, 혼수, 주거지 마련 등 돈과 양가 부모의 개입이 시작될 때 두 사람의 사주에 숨겨진 재성과 관성의 충돌이 발생합니다. "우리가 사랑하는데 왜 이런 일로 싸워야 하나"라는 회의감이 들 수 있으나, 이는 독립된 두 성인이 한 팀을 이루기 위한 통과의례입니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-shield-heart"></i> 백년가약을 단단하게 묶는 3대 결속 비책</h5>
          <p>
            • <strong>양가 분리의 원칙:</strong> 부모님의 의견은 경청하되, 최종 결정은 반드시 두 사람만의 합의하에 내려 외풍을 차단하십시오.<br>
            • <strong>재정 투명성:</strong> 서로의 자산과 부채 현황을 솔직하게 공유하고 공동의 자산 증식 5개년 목표를 수립하십시오.<br>
            • <strong>혼인 대길일 선점:</strong> 두 사람의 일지와 충돌하지 않고 천을귀인이 비추는 손 없는 날을 혼인일로 정하여 평생의 복록을 축원하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제8장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 08 · 다툼의 뇌관과 화해의 언어학</div>
      <h3 class="chapter-title">두 사람이 싸우게 되는 진짜 이유와 상대의 분노를 즉시 잠재우는 한마디</h3>
      <div class="chapter-prose">
        <p>
          모든 커플에게는 유독 그 말만 나오면 이성을 잃고 싸우게 되는 <strong>'사주적 역린(逆鱗)'</strong>이 존재합니다. 상대방의 역린을 미리 알고 그 단어를 피하는 것만으로도 이별 위기의 90%를 예방할 수 있습니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-fire"></i> 다툼의 뇌관이 폭발하는 전형적 시나리오</h5>
          <p>
            한쪽은 문제를 즉시 논리적으로 따져서 해결하려 들고, 다른 한쪽은 감정적 서운함을 위로받지 못해 입을 닫아버리는 '대화의 엇박자'가 반복됩니다. 침묵은 분노를 부르고, 쏟아붓는 말은 상대의 영혼에 씻을 수 없는 흉터를 남깁니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-comment-medical"></i> 상대의 닫힌 귀를 여는 기적의 화해 언어</h5>
          <p>
            싸움이 격화될 때는 시시비비를 가리지 마시고 즉시 한 발 물러나 <strong>"내가 당신의 마음을 미처 헤아리지 못해서 서운하게 했네, 미안해. 잠시 30분만 숨 고르고 다시 이야기하자"</strong>라는 완충 멘트를 건네십시오. 상대의 뇌관을 적시는 최고의 명약입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제9장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 09 · 두 사주에 가장 완벽한 데이트 성향과 공간 설계</div>
      <h3 class="chapter-title">어떤 데이트가 두 사람의 호르몬과 오행을 가장 아름답게 공명시키는가</h3>
      <div class="chapter-prose">
        <p>
          데이트는 단순히 밥을 먹고 영화를 보는 시간이 아닙니다. 두 사람의 사주에 부족한 오행을 채우고 자연스러운 스킨십과 깊은 대화를 유도하는 <strong>'풍수적 치유의 시간'</strong>이어야 합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-plane-departure"></i> 추천 여행지와 공간 테마</h5>
          <p>
            복잡하고 소음이 심한 도심의 번화가 데이트는 두 사람의 신경계를 피로하게 만듭니다. 물과 숲의 기운이 조화로운 호숫가, 바다 전망의 조용한 독채 숙소, 또는 고즈넉한 한옥 카페에서 머물 때 서로에 대한 애정이 가장 깊어집니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-map-location-dot"></i> 국내 및 해외 최적의 힐링 목적지</h5>
          <p>
            • <strong>국내 여행지:</strong> 강릉·속초(동해의 맑은 수기), 제주 애월·서귀포(목기와 토기의 조화), 경주 보문호수(화개와 영적 안정).<br>
            • <strong>해외 여행지:</strong> 일본 교토(고즈넉한 온천 힐링), 스위스 인터라켄(웅장한 자연 에너지), 발리 우붓(몸과 마음의 완전한 디톡스).
          </p>
        </div>
      </div>
    </div>

    <!-- 제10장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 10 · 두 사람의 식궁합(食宮合)과 사랑을 키우는 밥상</div>
      <h3 class="chapter-title">음식 취향의 일치와 체질 보양 — 밥상에서 완성되는 사랑의 화학 반응</h3>
      <div class="chapter-prose">
        <p>
          동의보감에서는 "같은 솥의 밥을 먹으며 체질의 기운을 맞추는 것이 백년해로의 지름길"이라 하였습니다. 식궁합이 맞지 않으면 사소한 외식 메뉴 선택부터 신경전이 벌어지고 장기적으로 신체 면역력의 불균형이 찾아옵니다.
        </p>

        <div class="medical-care-box">
          <h5><i class="fa-solid fa-utensils"></i> 두 사람의 사랑을 북돋우는 최적의 메뉴</h5>
          <p>
            • <strong>추천 메뉴:</strong> 담백한 샤브샤브나 전골 요리(수기와 목기의 조화), 따뜻한 삼계탕이나 해신탕(부족한 양기 보충).<br>
            • <strong>피해야 할 외식:</strong> 지나치게 맵고 자극적인 마라탕이나 기름진 야간 배달 음식은 두 사람의 간열과 심화를 돋워 사소한 일에도 언성을 높이게 만듭니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-wine-glass"></i> 함께 나누는 차(茶)와 주도(酒道)</h5>
          <p>
            식사 후 미지근한 캐모마일차나 국화차를 함께 마시며 하루의 피로를 나누는 15분의 티타임이 수백만 원짜리 보약보다 관계를 돈독하게 만듭니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제11장: 19+ 속궁합 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 11 · [19+ 성인 비전] 심층 속궁합 제1편 — 본능적 끌림과 성적 에너지의 조화</div>
      <h3 class="chapter-title">침실의 문이 닫히면 시작되는 본능의 대화 — 두 사람의 성적 판타지와 육체적 자력</h3>
      <div class="chapter-prose">
        <p>
          낮의 대화가 이성의 영역이라면, 밤의 침실은 <strong>두 사람의 사주에 내재된 가장 원초적인 오행과 생명 에너지가 교환되는 신성한 의식</strong>입니다. 속궁합이 조화를 이루면 낮 동안 쌓였던 사소한 갈등과 서운함이 단 한 번의 깊은 교감으로 눈 녹듯 씻겨 내려갑니다.
        </p>

        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-fire-burner"></i> 침실에서의 주도권과 성적 에너지 역학</h5>
          <p>
            ${user.name}님과 상대방 사이에는 '리드하고 싶은 욕망'과 '완전히 장악당해 몰입하고 싶은 욕망'이 절묘한 텐션을 형성합니다. 낮에는 주도면밀하고 지적인 모습을 유지하는 쪽이 밤에는 예상치 못한 과감함과 뜨거운 몰입을 드러낼 때, 상대방은 형언할 수 없는 깊은 전율과 성적 카타르시스를 느끼게 됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-moon"></i> 본능의 문을 여는 침실 시크릿 코드</h5>
          <p>
            체면과 수치심을 완전히 내려놓으십시오. 두 사람 사이에서 성적 욕망을 표현하는 것은 부끄러운 일이 아니라 서로의 영혼과 육체를 가장 깊이 존중하고 결속시키는 지고의 소통입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제12장: 19+ 속궁합 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 12 · [19+ 성인 비전] 심층 속궁합 제2편 — 두 사람을 무장해제시키는 침실 무드 설계</div>
      <h3 class="chapter-title">오감을 자극하는 조명 · 향기 · 온도 — 긴장을 녹이고 쾌락을 극대화하는 공간 연출</h3>
      <div class="chapter-prose">
        <p>
          사람의 몸은 주변 환경의 파동에 극도로 민감합니다. 특히 오행 체질에 맞지 않는 차갑거나 건조한 침실은 말초 혈관을 수축시켜 애액 분비를 방해하고 오르가즘 도달을 가로막는 최대의 장애물이 됩니다.
        </p>

        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-candle-holder"></i> 두 사람에게 최적화된 관능의 침실 환경</h5>
          <p>
            • <strong>조명 조도:</strong> 형광등이나 밝은 백색등은 신경계를 각성시켜 몰입을 방해합니다. 침대 발치 쪽에 2700K 앰버(주황빛)의 은은한 간접 조명이나 캔들 워머를 두어 서로의 실루엣만 드러나게 하십시오.<br>
            • <strong>아로마 향기:</strong> 긴장을 완화하는 일랑일랑, 샌달우드, 다마스크 로즈 계열의 천연 에센셜 오일을 디퓨징하여 후각을 통해 대뇌 변연계를 직접 자극하십시오.<br>
            • <strong>온도와 침구:</strong> 체온보다 살짝 따뜻한 24~25도의 실내 온도와 부드러운 극세사 또는 100수 순면 침구를 준비하십시오.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-music"></i> 청각적 자극과 엠비언트 사운드</h5>
          <p>
            적막한 침묵은 어색한 긴장을 부릅니다. 빗소리나 60BPM 전후의 몽환적인 로파이(Lo-Fi) 재즈 음악을 낮게 깔아 둘만의 고립된 안식처를 완성하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제13장: 19+ 속궁합 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 13 · [19+ 성인 비전] 심층 속궁합 제3편 — 서로를 단숨에 달아오르게 하는 시작과 전희(Foreplay)</div>
      <h3 class="chapter-title">서두르지 않는 손길이 빚어내는 절정 — 상대가 갈망하는 스킨십 템포와 민감대</h3>
      <div class="chapter-prose">
        <p>
          대부분의 속궁합 불만은 본 게임이 아니라 <strong>‘전희(Foreplay)의 부실함과 타이밍의 불일치’</strong>에서 비롯됩니다. 특히 여성의 신체는 충분한 온기와 이완이 선행되어야 골반저근이 부드럽게 열리며 깊은 교감이 가능해집니다.
        </p>

        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-hand-holding-heart"></i> 단계별 관능 애무 프로토콜</h5>
          <p>
            1. <strong>목덜미와 쇄골의 워밍업:</strong> 직접적인 성감대를 바로 건드리지 마시고, 귀 뒤쪽과 목덜미, 쇄골 라인을 따라 부드러운 입맞춤과 따뜻한 숨결을 불어넣으십시오.<br>
            2. <strong>손끝의 온도 전달:</strong> 척추를 따라 손가락 끝으로 미끄러지듯 등을 쓸어내리며 신체 긴장을 완전히 풀어주십시오.<br>
            3. <strong>골반과 허벅지 안쪽의 빌드업:</strong> 허벅지 안쪽에서 시작하여 점진적으로 핵심 부위로 좁혀 들어가는 '밀당의 손길'이 상대방의 갈증을 최고조로 끌어올립니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-feather"></i> 감각의 차단과 맹점 자극</h5>
          <p>
            가끔은 부드러운 안대나 실크 스카프로 상대의 시야를 차단해 보십시오. 시각이 닫히는 순간 청각과 촉각이 5배 이상 예민해져 평소 느끼지 못했던 극한의 쾌감을 맛보게 됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제14장: 19+ 속궁합 4 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 14 · [19+ 성인 비전] 심층 속궁합 제4편 — 오행 체질별 추천 체위(Positions)와 리듬의 변주</div>
      <h3 class="chapter-title">깊이와 각도의 미학 — 두 사람의 신체 구조에 가장 완벽히 밀착되는 체위</h3>
      <div class="chapter-prose">
        <p>
          신체 골반의 각도와 장부의 한열에 따라 두 사람이 결합했을 때 가장 자극이 극대화되는 <strong>'명리학적 황금 체위'</strong>가 존재합니다. 획일적인 자세를 벗어나 리듬의 변주를 줄 때 관계의 지루함이 사라집니다.
        </p>

        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-venus-mars"></i> 추천 체위 매트릭스와 골반 각도</h5>
          <p>
            • <strong>심층 밀착 변형 정상위:</strong> 여성의 골반 아래에 단단한 베개나 쿠션을 받쳐 허리를 15도 들어 올리는 자세입니다. 각도가 좁혀지면서 질 입구와 G스팟에 깊고 지속적인 마찰을 주어 가장 안정적이고 황홀한 오르가즘을 유도합니다.<br>
            • <strong>관능적 후배위(후배위 변형):</strong> 완전히 엎드리지 않고 상체를 살짝 세운 상태에서 골반을 밀착시키는 자세로, 시각적 자극과 함께 깊은 삽입감을 극대화합니다.<br>
            • <strong>여성 상위의 리듬 제어:</strong> 여성이 상체에 손을 짚고 스스로 삽입 깊이와 원을 그리는 회전 리듬을 제어할 때, 남성은 평소 경험하지 못한 색다른 쾌감과 복종의 희열을 느낍니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-water"></i> 템포와 수분(윤활) 관리</h5>
          <p>
            처음부터 빠른 속도로 달리지 마시고, 느리고 깊은 호흡과 함께 3번 천천히 밀착하고 1번 얕게 빼내는 리듬의 강약을 조절하십시오. 필요하다면 수용성 워밍 젤을 아낌없이 활용하는 것이 마찰 통증을 없애고 쾌감을 높이는 배려입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제15장: 19+ 속궁합 5 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 15 · [19+ 성인 비전] 심층 속궁합 제5편 — 오르가즘 타이밍 일치와 결정적 애프터케어</div>
      <h3 class="chapter-title">관계의 끝에서 완성되는 진짜 사랑 — 절정의 여운과 영혼을 녹이는 포옹</h3>
      <div class="chapter-prose">
        <p>
          사정이나 절정이 끝난 직후 등을 돌리고 잠에 빠져들거나 곧바로 스마트폰을 보는 행동은 관계의 만족도를 한순간에 바닥으로 추락시킵니다. 여운이 지속되는 <strong>'애프터케어 10분'</strong>이야말로 두 사람의 옥시토신 호르몬을 최고치로 끌어올리는 시간입니다.
        </p>

        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-heart-pulse"></i> 오르가즘 타이밍의 일치를 위한 신호 체계</h5>
          <p>
            절정에 도달하는 속도가 다를 때는 솔직한 숨소리와 손짓으로 서로의 속도를 조율하십시오. "지금 너무 좋아", "조금만 천천히"와 같은 짧은 피드백이 서로를 가장 배려하는 침실의 언어입니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-hands-holding"></i> 여운을 완성하는 10분 백허그와 수분 보충</h5>
          <p>
            관계가 끝난 후 미지근한 물 한 잔을 건네고, 이불 속에서 상대의 심장 소리를 들으며 최소 10분간 따뜻하게 안아주십시오. "오늘 당신과 함께해서 정말 행복했어"라는 한마디가 상대의 영혼을 당신에게 영원히 귀속시킵니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제16장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 16 · 두 사람의 재물 궁합과 경제권 배분</div>
      <h3 class="chapter-title">돈 때문에 깨지는 사랑은 없다, 원칙이 없어 깨질 뿐이다 — 공동 자산 관리</h3>
      <div class="chapter-prose">
        <p>
          궁합에서 재물운은 단순한 돈 문제가 아니라, <strong>두 사람의 가치관과 미래 생존력이 맞물리는 현실의 척도</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-coins"></i> 경제권 갈등이 터지는 취약 지점</h5>
          <p>
            한쪽은 미래를 위해 소비를 극도로 아끼려 하고, 다른 한쪽은 현재의 삶의 질과 체면을 중시할 때 재정적 마찰이 시작됩니다. 각자의 소비 방식을 비난하기 시작하면 감정의 파탄으로 이어집니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-vault"></i> 재물을 불리는 커플 경제권 황금 분할</h5>
          <p>
            • <strong>경제권 일원화:</strong> 둘 중 꼼꼼하고 숫자에 밝은 쪽에 가계부와 고정 자산 운용을 일임하십시오.<br>
            • <strong>노터치 개인 용돈:</strong> 서로에게 묻지도 따지지도 않는 순수 개인 용돈 통장을 매월 일정액 보장하여 자존감을 지켜주십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제17장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 17 · 시댁/처가 및 양가 가족과의 역학 관계 조율</div>
      <h3 class="chapter-title">보이지 않는 외풍(外風)을 막아라 — 양가 가족 간의 기운 충돌 방어벽</h3>
      <div class="chapter-prose">
        <p>
          부부 싸움의 절반은 둘 사이의 문제가 아니라 <strong>양가 부모나 형제자매의 기운이 개입하면서 증폭</strong>됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-users"></i> 외풍이 불어닥칠 때의 위험 신호</h5>
          <p>
            본가나 처가의 지나친 간섭, 금전 지원 요구, 혹은 명절 제사 문제로 인해 "왜 당신은 내 편을 들어주지 않는가"라는 원망이 싹트는 순간 부부의 신뢰가 금이 갑니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-shield"></i> 단단한 부부 방어벽 구축 공식</h5>
          <p>
            각자의 집안에서 나오는 쓴소리는 본인이 직접 완충하고, 배우자의 공로만 부모님께 전달하는 '소통의 필터링'을 철저히 지키십시오. 부부는 언제나 양가 집안보다 최우선 순위여야 합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제18장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 18 · 바람기, 도화살, 외부 유혹 방어 비책</div>
      <h3 class="chapter-title">흔들리는 눈빛을 제압하라 — 도화의 살기를 매력으로 가두는 개운술</h3>
      <div class="chapter-prose">
        <p>
          사주에 도화살이나 역마살이 강하면 매력적이고 인기가 많아 외부의 이성 유혹에 노출되기 쉽습니다. 이를 의심과 감시로 막으려 들면 오히려 역마의 반발심만 키우게 됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-eye"></i> 외부 유혹이 파고드는 취약 시기</h5>
          <p>
            원국의 일지가 세운이나 월운에서 충(沖)을 맞거나 비겁(比劫)이 강해지는 달에 일시적인 권태와 외부의 달콤한 유혹이 교차합니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-lock"></i> 외도를 원천 차단하는 침실 풍수와 신뢰 비방</h5>
          <p>
            • <strong>침실 거울 차단:</strong> 침대 정면에 부부의 모습이 비치는 거울은 제3자의 기운을 끌어들이므로 치우거나 천으로 덮으십시오.<br>
            • <strong>매력의 내부 소비:</strong> 둘만의 여행과 새로운 데이트로 도화의 에너지를 파트너에게 쏟아붓게 만드십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제19장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 권태기 타파 시나리오와 관계 리셋 솔루션</div>
      <h3 class="chapter-title">익숙함이라는 덫을 깨부숴라 — 첫 만남의 심장박동을 되살리는 리셋 의식</h3>
      <div class="chapter-prose">
        <p>
          오래된 연인에게 찾아오는 권태기는 사랑이 끝난 것이 아니라, <strong>두 사람 사이의 자극과 에너지가 정체되어 뇌의 도파민 분비가 멈춘 상태</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-battery-half"></i> 권태기가 부르는 위험한 무관심</h5>
          <p>
            대화가 단답형으로 줄어들고, 스킨십이 사라지며, 서로를 당연하게 여기는 순간 관계는 서서히 죽어갑니다. 이때 판을 흔들어주지 않으면 사소한 계기로 파국을 맞이합니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-arrows-rotate"></i> 관계를 180도 리셋하는 충격 요법 3선</h5>
          <p>
            1. <strong>각자의 시공간 분리:</strong> 일주일간 연락을 최소화하고 각자의 취미와 친구들에게 몰입하여 그리움의 공간을 확보하십시오.<br>
            2. <strong>완전히 낯선 공간으로의 일탈:</strong> 둘 다 한 번도 가보지 않은 낯선 도시나 해외로 즉흥 여행을 떠나 새로운 생존 도파민을 분비시키십시오.<br>
            3. <strong>역할 체인지 데이트:</strong> 하루 동안 완전히 다른 콘셉트의 옷을 입고 처음 만난 남남처럼 상황극 데이트를 즐겨보십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제20장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 두 사람의 인연이 결실을 맺는 대길(大吉) 시기와 에필로그</div>
      <h3 class="chapter-title">하늘이 맺어준 인연의 완성 — 백년해로를 축원하는 천문(天門) 축원문</h3>
      <div class="chapter-prose">
        <p>
          수천억 개의 별이 빛나는 우주에서 두 영혼이 같은 시공간에 태어나 서로의 눈을 바라보게 된 것은 기적 그 자체입니다. 두 사람의 사주는 부족한 점을 채우고 넘치는 점을 덜어내며 함께 더 큰 세상을 향해 나아갈 수 있는 귀한 인연입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-champagne-glasses"></i> 관계가 비약적으로 결실을 맺는 대길의 달</h5>
          <p>
            향후 12개월 중 두 사람의 일지와 삼합(三合) 또는 육합(六合)을 이루는 시기에는 결혼, 임신, 공동 주택 매입 등 인생의 가장 큰 경사가 찾아옵니다.
          </p>
        </div>

        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-heart"></i> ${user.name}님과 소중한 인연께 바치는 천문 헌사</h5>
          <p>
            "비바람이 몰아쳐도 깊이 뿌리내린 두 그루의 나무는 땅속에서 서로의 뿌리를 얽어 넘어지지 않습니다. 사랑은 상대의 완벽함을 찾는 것이 아니라, 상대의 불완전함을 나의 사랑으로 감싸 안는 용기입니다. 두 분의 앞날에 늘 하늘의 은총과 깊은 평화가 깃들기를 진심으로 축원합니다."
          </p>
        </div>
      </div>
    </div>
  `;
}



// ============================================================================
// 4. 제4권 (career) : 정신과 상담형 이직 · 취업 · 창업 커리어 천직 비서 (총 20장)
// ============================================================================
function buildCareerPersonaProse(user) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const dayEl = CHEONGAN_ELEMENTS[dayMaster];
  const pattern = user.pattern || SAJU_PATTERNS['정관격'];
  const strength = user.strength;

  const proseMap = {
    wood: {
      title: '개척자이자 추진력 있는 전략가형',
      summary: '새로운 영역에 깃발을 꽂고 남들이 가지 않은 길을 개척할 때 가장 큰 도파민과 성취감을 느끼는 원형입니다.',
      careerTrait: '기존 시스템의 반복 업무에 갇히면 에너지가 급속도로 고갈되며, 신규 사업 기획이나 독립된 프로젝트를 이끌 때 압도적 성과를 냅니다.'
    },
    fire: {
      title: '대중을 매료시키는 브랜더이자 커뮤니케이터형',
      summary: '사람의 마음을 움직이고 트렌드를 읽어내며 조직의 비전을 전파하는 데 탁월한 화려한 직업적 오라를 가집니다.',
      careerTrait: '보이지 않는 곳에서 서류만 만지는 일보다, 대외 협상, 마케팅, 방송, 강의, 세일즈 등 사람과 직접 마주하는 무대에서 몸값이 폭발합니다.'
    },
    earth: {
      title: '조직의 척추이자 신뢰를 엮는 플랫폼 오거나이저형',
      summary: '모든 사람과 자원이 모여드는 중심 허브 역할을 하며, 갈등을 중재하고 시스템을 안정화하는 중후한 아우라를 지닙니다.',
      careerTrait: '경영 관리, 부동산, 금융 인프라, 조직 운영 등 판을 떠받치는 핵심 요직에서 대체 불가능한 권한을 쥐게 됩니다.'
    },
    metal: {
      title: '완벽을 추구하는 칼잡이형 스페셜리스트',
      summary: '오류를 용납하지 않는 날카로운 분석력과 단호한 결단력으로 업계의 기준과 규율을 세우는 프로페셔널입니다.',
      careerTrait: '법률, IT 아키텍처, 감사, 의료, 금융 공학 등 한 끗 차이로 승패가 갈리는 고도의 전문직에서 최고의 자산 가치를 인정받습니다.'
    },
    water: {
      title: '보이지 않는 판을 짜는 지혜로운 책사형 전략가',
      summary: '남들이 보지 못하는 이면의 수 싸움과 미래 트렌드를 꿰뚫어 보며, 은밀하게 자금을 굴리고 판을 설계하는 지략가입니다.',
      careerTrait: '빅데이터, 투자 전략, 연구 개발, 글로벌 비즈니스 등 심도 있는 통찰력이 요구되는 분야에서 시대를 앞서갑니다.'
    }
  };

  return proseMap[dayEl] || proseMap.wood;
}

function buildCareerReportHtml(user, natureName) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const dayEl = CHEONGAN_ELEMENTS[dayMaster];
  const pattern = user.pattern || SAJU_PATTERNS['정관격'];
  const strength = user.strength;
  const yongshin = user.yongshin;
  const seun = getDynamicSeunContext(user);
  const med = diagnoseMedicalSaju(user);
  const persona = buildCareerPersonaProse(user);

  const userConcern = user.userConcernDetail
    ? `<div class="counseling-empathy-box">
         <h5><i class="fa-solid fa-feather-pointed"></i> 의뢰인 ${user.name}님의 실제 진로 고민 분석</h5>
         <p><strong>의뢰인 호소:</strong> "${user.userConcernDetail}"<br>
         현재 느끼시는 불안과 답답함은 당신의 역량이 부족해서가 아닙니다. 화분이 좁아진 나무가 뿌리로 화분 벽을 두드리듯, 당신의 그릇(${pattern.name})이 커져 현재 조직의 한계와 충돌하고 있는 지극히 정상적인 신호입니다.</p>
       </div>`
    : '';

  return `
    ${buildMyeongshikTableHtml(user)}

    <!-- 제1장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 심층 커리어 상담실의 문을 열며 (프롤로그)</div>
      <h3 class="chapter-title">불안으로 잠 못 이루는 당신의 밤을 먼저 읽습니다 — 맞춤형 커리어 처방 안내</h3>
      <div class="chapter-prose">
        <p>
          "이 회사를 계속 다녀야 할까, 아니면 지금이라도 이직해야 할까?", "내 사업을 시작해도 밥은 먹고살 수 있을까?", "왜 나는 남들처럼 적당히 만족하며 살지 못하고 끊임없이 길을 찾아 헤맬까?"... 지금 이 글을 읽고 계신 ${user.name}님의 머릿속을 맴도는 수많은 질문을 잘 알고 있습니다.
        </p>

        ${userConcern}

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-stethoscope"></i> 정신과 상담형 커리어 진단 — 당신을 옥죄는 불안의 실체</h5>
          <p>
            대한민국 직장인의 80%는 자신의 사주 격국과 맞지 않는 옷을 입은 채 매일 자책과 열등감에 시달립니다. 본 감명서는 뜬구름 잡는 위로를 건네지 않습니다. ${user.name}님이 타고난 <strong>직업적 유전자(${persona.title})</strong>를 정확히 규명하고, 이직의 승률 계산부터 연봉 협상 화법, 사내 정치 방어, 1인 창업의 조건까지 가장 현실적인 로드맵을 처방합니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-compass"></i> 커리어 천직 비서 20장 활용 매뉴얼</h5>
          <p>
            제3장~5장은 <strong>이직을 고민하는 분</strong>, 제6장~8장은 <strong>취업과 시험을 앞둔 분</strong>, 제9장~11장은 <strong>내 사업과 창업을 꿈꾸는 분</strong>을 위한 집중 챕터입니다. 현재 본인의 상황에 맞는 페이지를 먼저 펼쳐보시되, 전체 20장을 순서대로 독파할 때 평생을 지탱할 커리어 무기가 완성됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 내 사주의 직업적 원형(Archetype)과 에너지 보존 법칙</div>
      <h3 class="chapter-title">${user.name}님은 조직의 톱니바퀴인가, 판을 짜는 설계자인가, 칼을 쥔 야전사령관인가</h3>
      <div class="chapter-prose">
        <p>
          모든 인간은 태어날 때 우주로부터 고유한 '직업적 역할 코드'를 부여받습니다. ${user.name}님의 사주는 <strong>[${persona.title}]</strong>으로, ${persona.summary}
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-chess"></i> 조직 내에서 발현되는 당신의 핵심 강점과 치명적 약점</h5>
          <p>
            • <strong>독점적 무기:</strong> ${persona.careerTrait}<br>
            • <strong>치명적 약점:</strong> 본인의 기준이 워낙 높고 완벽을 추구하다 보니, 일 처리가 느리거나 무책임한 동료를 보면 속에서 천불이 나며 감정 조절이 어려워집니다. 혼자 다 떠안으려다 번아웃에 빠지는 패턴을 반복하게 됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-bolt"></i> 내 몸값을 2배로 올리는 에너지 재배치 전략</h5>
          <p>
            남들과 똑같은 스펙 쌓기에 시간을 낭비하지 마십시오. 당신의 격국인 <strong>[${pattern.name}]</strong>의 강점을 살려, '내가 가장 적은 스트레스를 받으면서 남들보다 압도적인 퀄리티를 뽑아낼 수 있는 단 하나의 핵심 직무'에 모든 자원을 집중하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제3장: 이직 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 03 · [심층 이직 상담 ①] 당신이 지금 이직을 떠올리는 진짜 이유</div>
      <h3 class="chapter-title">마음을 달래며 들여다본 본심 — 지금의 답답함은 무능이 아니라 그릇의 팽창입니다</h3>
      <div class="chapter-prose">
        <p>
          지금 현 직장에서 느끼는 권태, 상사에 대한 환멸, 또는 매일 아침 출근길에 차오르는 한숨을 “내가 인내심이 부족한가”라는 자책으로 연결하지 마십시오. 나무(${ELEMENT_KOREAN[dayEl]})가 자라 화분이 좁아지면 뿌리가 화분 벽을 뚫고 나오듯, 당신의 운기가 다음 단계로 넘어가려 할 때 나타나는 자연스러운 성장통입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-triangle-exclamation"></i> 지금 당장 퇴사하면 안 되는 '도피성 퇴사'의 함정</h5>
          <p>
            운이 흉한 달에 감정적으로 사표를 던지면, 새로 옮겨간 회사에서도 똑같이 무능한 상사와 열악한 처우를 만나는 '악연의 도돌이표'에 갇히게 됩니다. 이직은 도망치는 것이 아니라, 가장 몸값이 비싼 순간에 당당하게 환승하는 철저한 전략이어야 합니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-bullseye"></i> 감정을 냉각하고 협상력을 키우는 실전 솔루션</h5>
          <p>
            • 현 직장에서 '받을 수 있는 모든 성과와 포트폴리오'를 엑셀과 PDF로 완전히 정리할 때까지는 절대로 퇴사 의사를 입 밖으로 내지 마십시오.<br>
            • "나는 언제든 떠날 준비가 되어 있다"는 내적 여유를 품는 순간, 아이러니하게도 현 직장에서의 스트레스가 절반으로 줄어들고 상사를 관조하는 힘이 생깁니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제4장: 이직 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 04 · [심층 이직 상담 ②] 이직의 승률과 최적의 탈출·진입 타이밍</div>
      <h3 class="chapter-title">지금 움직일 때의 승산은 몇 퍼센트인가 — 환승 이직의 골든 타임</h3>
      <div class="chapter-prose">
        <p>
          이직에서 승리한다는 것은 단순히 회사를 옮기는 것이 아니라, <strong>연봉·직급·워라밸·기업 브랜드 중 최소 두 가지 이상을 우상향시켜 옮긴다</strong>는 뜻입니다. 현재 세운(${seun.yearHanja})과 향후 12개월 월운을 대조할 때 ${user.name}님의 이직 승률은 다음과 같이 갈립니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-chart-line"></i> 월운별 이직 승률과 이력서 제출 골든타임</h5>
          <p>
            • <strong>승률 85% 이상 골든 먼스:</strong> 원국의 월지와 육합(六合) 또는 삼합(三合)을 이루는 달(주로 봄과 가을의 관인상생 월)에는 헤드헌터의 제안이 몰리고 면접관의 호감을 한 몸에 받습니다.<br>
            • <strong>절대 움직이면 안 되는 달 (승률 30% 미만):</strong> 일지나 월지가 정면 충(沖)을 맞아 깨지는 달에는 입사하자마자 부서가 공중분해되거나 약속된 연봉이 깎이는 사기성 이직에 휘말릴 수 있으니 몸을 낮추십시오.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-file-arrow-up"></i> 이력서 투척과 면접 일정 조율 비방</h5>
          <p>
            이력서는 화요일 오전 10시~11시 사이에 제출하십시오. 인사 담당자의 기운이 가장 맑고 긍정적인 평가를 내리는 시간대입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제5장: 이직 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 05 · [심층 이직 상담 ③] 연봉 협상과 면접에서 내 격국을 가장 비싸게 파는 법</div>
      <h3 class="chapter-title">면접관의 심리를 꿰뚫는 [${pattern.name}] 어필 화법과 몸값 극대화 전략</h3>
      <div class="chapter-prose">
        <p>
          면접은 스펙을 평가받는 시험이 아니라, <strong>면접관이 가진 문제와 고통을 내가 해결해 줄 수 있음을 증명하는 비즈니스 세일즈</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-comments-dollar"></i> 연봉 협상 테이블에서 벌어지는 심리전</h5>
          <p>
            기업은 당신의 실력보다 '당신이 이직을 얼마나 절박하게 원하는가'를 보고 연봉을 후려칩니다. 조급함을 내비치는 순간 협상 주도권을 빼앗기게 됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-handshake"></i> [${pattern.name}] 전용 연봉 20% 인상 화법</h5>
          <p>
            • "저는 이전 직장에서 이러이러한 정량적 성과를 냈으며, 귀사에 합류할 경우 3개월 내에 귀사의 주력 병목 현상을 해결해 드릴 수 있습니다."라는 문제 해결자 프레임을 선점하십시오.<br>
            • 희망 연봉을 먼저 부르지 마시고, "회사 내 동급 포지션의 상위 밴드를 기대하며, 기여도에 따른 인센티브 테이블을 함께 열어두고 싶습니다"라고 대응하여 상한선을 열어두십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제6장: 취업 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 06 · [심층 취업·시험 상담 ①] ‘못’ 들어가는 것인가, ‘안’ 들어가는 것인가</div>
      <h3 class="chapter-title">뼈를 때리는 사주 팩트체크 — 당신의 발목을 잡는 진짜 범인은 스펙이 아닙니다</h3>
      <div class="chapter-prose">
        <p>
          취업이나 공시, 전문직 시험에서 번번이 문턱을 넘지 못할 때, 사람들은 자격증이 부족하거나 학벌이 모자라다고 자책합니다. 그러나 명리학의 관점에서 보면, <strong>당신의 영혼이 그 자리가 내 길이 아님을 알고 무의식중에 시험을 거부하고 있는 경우</strong>가 태반입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-eye-low-vision"></i> 불합격이 반복되는 구조적 원인</h5>
          <p>
            내 사주가 야생의 사자(식상·편관)인데 남들이 좋다는 공무원이나 안정적인 공기업(정인·정관)에 억지로 자신을 쑤셔 넣으려 하니, 서류와 면접관의 눈에 '영혼 없는 지원자'로 비치는 것입니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-arrows-split-up-and-left"></i> 방향 전환과 합격선 재설정</h5>
          <p>
            무리하게 남들의 기준에 맞추지 마시고, 당신의 일간 오행(${ELEMENT_KOREAN[dayEl]})이 활발하게 소통할 수 있는 인더스트리로 타깃을 15도만 틀어보십시오. 경쟁률이 100대 1인 곳에서 3대 1인 독점적 시장으로 진입하는 순간 단숨에 최종 합격 통지서를 거머쥐게 됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제7장: 취업 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 07 · [심층 취업·시험 상담 ②] 관운(官運)과 인성(印星) 합격 기운을 여는 루틴</div>
      <h3 class="chapter-title">서류 탈락의 사슬을 끊고 최종 합격 통지서를 끌어당기는 명리학적 실전 비법</h3>
      <div class="chapter-prose">
        <p>
          시험과 취업의 당락을 가르는 기운은 <strong>관성(官星: 조직의 간택)</strong>과 <strong>인성(印星: 문서와 자격 합격증)</strong>입니다. 이 두 기운이 원국이나 대운에서 부족하더라도, 일상 루틴과 공간 풍수로 관인의 통로를 강제로 뚫어낼 수 있습니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-graduation-cap"></i> 합격을 방해하는 탁기와 잡념</h5>
          <p>
            시험 직전 집중력이 흐트러지거나 마킹 실수, 또는 면접 당일 극심한 긴장으로 머릿속이 하얘지는 것은 사주의 조후가 깨져 상열(上熱)이 머리로 치솟기 때문입니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-pen-nib"></i> 관인상생(官印相生) 합격 부스트 루틴</h5>
          <p>
            • <strong>책상 풍수:</strong> 공부하거나 자소서를 쓰는 책상은 문을 등지지 말고, 문을 대각선으로 바라보는 '권력형 좌석'에 배치하십시오.<br>
            • <strong>합격 의상:</strong> 면접 당일에는 ${yongshin.johuYongshin === '수(水)' ? '단정한 다크 네이비' : '따뜻한 차콜 그레이'} 정장에 신뢰감을 주는 푸른빛 넥타이나 스카프를 매치하십시오.<br>
            • <strong>마인드 컨트롤:</strong> 면접관을 심사위원이 아니라 "나에게 조언을 구하러 온 내담자"로 바라보는 멘탈 전환이 면접관을 압도합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제8장: 취업 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 08 · [심층 취업·시험 상담 ③] 대기업 · 공직 · 전문직 · 스타트업 토양 매칭</div>
      <h3 class="chapter-title">어떤 규모의 조직에 들어갔을 때 ${user.name}님의 수명과 자산이 가장 길어지는가</h3>
      <div class="chapter-prose">
        <p>
          누군가에게는 신의 직장인 공기업이 다른 사주에게는 숨 막히는 감옥이 되고, 누군가에게는 불안한 스타트업이 다른 사주에게는 초고속 신분 상승의 사다리가 됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-building"></i> 조직 규모별 ${user.name}님의 적합도 판정</h5>
          <p>
            • <strong>대기업 / 다국적 기업:</strong> ${pattern.name}의 구조상 체계화된 시스템과 높은 브랜드 가치가 당신의 방패막이가 되어주므로 매우 유리합니다.<br>
            • <strong>공직 / 공기업:</strong> 안정성은 있으나 경직된 위계질서와 느린 의사결정으로 인해 5년 차 전후로 심각한 권태를 느낄 수 있습니다.<br>
            • <strong>스타트업 / 스케일업:</strong> 초기 혼란은 있으나 스톡옵션과 빠른 의사결정 권한을 쥐며 C-Level로 직행할 수 있는 폭발적 무대가 됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-landmark"></i> 최적의 조직 선택 공식</h5>
          <p>
            당장의 연봉 몇백만 원 차이보다 "내가 3년 뒤 이 회사의 이름을 등에 업고 더 큰 시장으로 점프할 수 있는가"를 최우선 기준으로 삼으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제9장: 창업 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 09 · [심층 창업·사업 상담 ①] 내 이름으로 간판을 걸어도 되는 사주인가</div>
      <h3 class="chapter-title">월급쟁이의 천장을 깨고 내 사업(Owner)으로 나아갈 때의 명리학적 조건</h3>
      <div class="chapter-prose">
        <p>
          사주에 <strong>편재(偏財)와 식상(食傷)</strong>이 발달하고 일간의 근(根)이 튼튼하면 반드시 인생의 어느 시점에 내 이름으로 된 사업체를 차리게 됩니다. 그러나 자본금만 들고 무작정 뛰어들면 3년 내에 폐업하는 비극을 피할 수 없습니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-shop"></i> 사업가로 독립할 수 있는 명리학적 징조</h5>
          <p>
            회사에서 시키는 일보다 내가 기획한 아이템으로 성과를 낼 때 희열을 느끼고, "왜 대표는 저렇게 멍청하게 의사결정을 할까"라는 생각이 자주 든다면 이미 마음속에 오너의 씨앗이 싹튼 것입니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-door-open"></i> 안전한 소프트 랜딩 창업 공식</h5>
          <p>
            직장을 덜컥 그만두지 마시고, 주말과 퇴근 후 시간을 활용하여 <strong>'월 100만 원의 부수입이 나오는 1인 비즈니스 모델'</strong>을 먼저 완성하십시오. 부수입이 본업 월급의 80%에 도달하는 순간이 바로 독립의 대길일입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제10장: 창업 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 10 · [심층 창업·사업 상담 ②] 돈이 붙는 업종 아이템과 1인 기업 vs 조직 확장</div>
      <h3 class="chapter-title">나를 부자로 만드는 비즈니스 모델 — 고정비 없는 디지털 자산 vs 오프라인 매장</h3>
      <div class="chapter-prose">
        <p>
          현대 비즈니스에서 가장 미련한 창업은 보증금과 인테리어 비용으로 수억 원의 빚을 지고 시작하는 오프라인 자영업입니다. ${user.name}님의 사주는 <strong>'지식·콘텐츠·소프트웨어·브랜딩'</strong>과 같은 무형의 고부가가치 아이템에서 가장 큰 마진을 남깁니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-cubes"></i> 1인 기업 vs 팀 빌딩 확장 타이밍</h5>
          <p>
            초기 2년은 직원을 뽑지 마시고 자동화 툴과 외주 파트너를 활용한 고효율 1인 지식 기업으로 현금을 비축하십시오. 고정 인건비가 나가지 않아야 위기 시에도 끄떡없이 생존합니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-lightbulb"></i> 돈이 저절로 굴러들어오는 캐시카우 설계</h5>
          <p>
            내 시간을 1대 1로 파는 용역 서비스에서 벗어나, 한 번 만들어두면 24시간 자동으로 판매되는 디지털 강의, 템플릿, 구독 소프트웨어, 독점 라이선스 구조로 피벗하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제11장: 창업 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 11 · [심층 창업·사업 상담 ③] 동업(同業)의 독약과 성약 — 지분 및 투자 유치의 철칙</div>
      <h3 class="chapter-title">절대 손잡으면 안 되는 동업자 명식 vs 지분 51%의 절대 사수</h3>
      <div class="chapter-prose">
        <p>
          "친한 친구끼리 동업하면 돈 잃고 사람도 잃는다"는 말은 명리학적으로 100% 진실입니다. 특히 원국에 <strong>비견·겁재(比肩·劫財)</strong>가 흉하게 작용하는 시기에 동업을 하면, 회사가 잘될수록 지분 싸움과 횡령으로 법정 공방을 벌이게 됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-handshake-slash"></i> 동업 파탄의 전형적 징조</h5>
          <p>
            초기에는 "의리로 함께하자"며 구두로 대충 지분을 5대 5로 나눴다가, 실제 매출이 발생하고 한쪽이 더 많이 일한다고 느끼는 순간 지옥 같은 의심과 배신이 시작됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-file-contract"></i> 동업 시 반드시 지켜야 할 3대 철칙</h5>
          <p>
            1. <strong>지분 51% 사수:</strong> 대표권과 의사결정권은 반드시 한 사람이 쥐고 있어야 조직이 산으로 가지 않습니다.<br>
            2. <strong>주주간 계약서(SHA) 공증:</strong> 중도 퇴사 시 지분 회수 조건(베스팅)과 겸업 금지 조항을 법무법인을 통해 공증받으십시오.<br>
            3. <strong>피해야 할 명식:</strong> 내 일간과 일지를 정면 충하거나, 말만 앞서고 실행력이 없는 비겁 태과자는 절대 공동 창업자로 들이지 마십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제12장: 조직 생존 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 12 · [조직 생존 · 사내 정치 ①] 상사와 결정권자를 내 편으로 조종하는 심리학</div>
      <h3 class="chapter-title">권력자의 가려운 곳을 긁어라 — 관성(官星)을 다루는 궁극의 보고법과 처세술</h3>
      <div class="chapter-prose">
        <p>
          직장에서 일만 잘하면 인정받을 것이라는 생각은 순진한 착각입니다. 승진과 보직을 결정하는 것은 당신의 실력 30%와 <strong>결정권자의 심리를 안정시켜 주는 정치력 70%</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-user-tie"></i> 꼰대 상사가 당신을 경계하는 이유</h5>
          <p>
            당신의 똑똑함과 정론직필이 상사에게는 '자신의 자리를 위협하는 도전'이나 '다루기 힘든 부하'로 느껴질 수 있습니다. 상사를 가르치려 드는 순간 인사고과에 보복이 가해집니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-comment-dots"></i> 상사의 충성을 이끌어내는 3단계 보고 화법</h5>
          <p>
            • <strong>두괄식 요약:</strong> "팀장님, 말씀해주신 방향에 따라 3가지 옵션을 준비했습니다. 1안이 비용 대비 가장 효율적이라 사료됩니다."<br>
            • <strong>공로의 헌납:</strong> "팀장님께서 지난 회의 때 짚어주신 포인트 덕분에 거래처를 설득할 수 있었습니다"라며 상사의 체면을 세워주십시오.<br>
            • 상사의 신뢰를 얻으면 당신에게 전적인 재량권이 위임되며, 사내 정쟁에서 가장 든든한 방패막이가 되어줍니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제13장: 조직 생존 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 13 · [조직 생존 · 사내 정치 ②] 내 공로를 가로채는 동료와 소인배 완벽 차단법</div>
      <h3 class="chapter-title">웃는 얼굴 뒤에 칼을 숨긴 오피스 빌런 — 비겁(比劫) 쟁재를 방어하는 철벽 방어막</h3>
      <div class="chapter-prose">
        <p>
          내가 밤새워 만든 기획서나 성과를 윗선에 슬쩍 가로채 보고하거나, 뒤에서 은근히 험담을 퍼뜨려 평판을 깎아내리는 동료는 사주명리학에서 <strong>'내 밥그릇을 깨뜨리는 겁재(劫財)'</strong>에 해당합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-user-ninja"></i> 오피스 빌런이 파고드는 빈틈</h5>
          <p>
            당신의 착한 성품과 "좋은 게 좋은 거지"라는 유화적인 태도를 만만하게 보고 점진적으로 영역을 침범합니다. 단 한 번이라도 단호하게 선을 긋지 않으면 계속해서 착취당하게 됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-shield"></i> 소인배를 한 방에 제압하는 증거 수집과 냉혈한 처세</h5>
          <p>
            • <strong>기록의 무기화:</strong> 모든 지시와 아이디어 제안은 구두가 아닌 이메일, 메신저 캡처로 날짜와 시간을 남기고 참조인(CC)에 상사를 걸어두십시오.<br>
            • <strong>단호한 침묵:</strong> 사내 루머나 뒷담화 모임에는 철저히 불참하고 "저는 제 업무에만 집중하고 싶습니다"라는 서늘한 선을 유지하십시오. 빌런은 감정적 반응이 없는 강자에게는 덤비지 못합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제14장: 조직 생존 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 14 · [조직 생존 · 사내 정치 ③] 승진 · 인사 발령 · 핵심 보직 쟁취 전략</div>
      <h3 class="chapter-title">주류 라인에 올라타라 — 인사이동 시즌의 사주학적 베팅과 생존 매뉴얼</h3>
      <div class="chapter-prose">
        <p>
          인사 발령 시즌은 회사의 정치 지형도가 재편되는 격변기입니다. 줄을 잘못 서거나 한직으로 밀려나면 지난 수년간의 노력이 한순간에 물거품이 됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-arrows-split-up-and-left"></i> 보직 배치의 길흉 분기점</h5>
          <p>
            겉만 번지르르하고 실속 없는 지원 부서에 안주하다가는 구조조정의 1순위 타깃이 됩니다. 회사의 매출이 발생하거나 최고 권력자의 핵심 관심사가 있는 '주력 부서'로 진입해야 생명력이 길어집니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-chess-queen"></i> 핵심 보직을 쟁취하는 사전 정지 작업</h5>
          <p>
            인사 발표 2개월 전부터 평소 눈여겨보던 핵심 부서의 리더와 티타임을 갖고 당신의 역량과 합류 의사를 은밀히 타진하십시오. "뽑아주시면 이러이러한 문제를 해결하겠습니다"라는 구체적 카드를 제시하는 자가 요직을 꿰찹니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제15장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 15 · 타고난 천직(天職) 도메인 10선과 절대 피해야 할 상극 업종</div>
      <h3 class="chapter-title">${user.name}님의 부귀를 보장하는 최적의 산업군 vs 기운을 갉아먹는 블랙홀 산업</h3>
      <div class="chapter-prose">
        <p>
          사주 원국의 오행 배합과 격국에 부합하는 산업군에서 일하면 1의 노력으로 10의 결실을 얻지만, 상극인 산업군에 머물면 10을 갈아 넣어도 1의 인정조차 받지 못합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-star"></i> ${user.name}님에게 가장 돈이 붙는 3대 천직 도메인</h5>
          <p>
            1. <strong>핵심 주력 분야:</strong> ${pattern.career} — 당신의 고유한 직업적 DNA와 완벽히 공명하는 판입니다.<br>
            2. <strong>제2 확장 분야:</strong> ${yongshin.johuYongshin === '수(水)' ? '글로벌 무역 · 데이터 분석 · 지식 이커머스' : yongshin.johuYongshin === '화(火)' ? '미디어 브랜딩 · 엔터테인먼트 · 첨단 AI 기술' : '금융 자산 운용 · 전략 컨설팅 · 프리미엄 서비스'}.<br>
            3. <strong>전문 자격 분야:</strong> 남들이 쉽게 진입하지 못하는 독점적 라이선스 및 기술 특화 영역.
          </p>
        </div>

        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-ban"></i> 절대 발을 들이면 안 되는 상극(相剋) 업종</h5>
          <p>
            단순 노무, 저가 출혈 경쟁 자영업, 규제가 극심하여 개인의 창의성이 말살되는 관료적 조직은 당신의 기혈을 말리고 우울증을 유발하므로 과감히 배제하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제16장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 16 · 본업을 뛰어넘는 부업(Side-Job) · N잡 파이프라인 설계</div>
      <h3 class="chapter-title">월급 외 월 300만 원의 자유 — 시간과 장소에 구애받지 않는 제2 수익 엔진</h3>
      <div class="chapter-prose">
        <p>
          평생직장의 개념이 사라진 시대에 단 하나의 월급 통장에만 생계를 의존하는 것은 브레이크 없는 자동차를 운전하는 것과 같습니다. 사주에 내재된 <strong>시주(時柱)의 잠재력</strong>을 깨워 본업의 전문성을 레버리지하는 부업 시스템을 구축해야 합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-network-wired"></i> 실패하지 않는 N잡의 조건</h5>
          <p>
            배달이나 단순 알바처럼 내 육체 노동 시간을 직접 파는 부업은 본업을 망치고 건강만 해칩니다. 반드시 '한 번의 노력으로 반복적인 수익이 창출되는 지식 자산'이어야 합니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-laptop-code"></i> ${user.name}님 맞춤형 디지털 파이프라인 3단계</h5>
          <p>
            • <strong>1단계 (전자책/템플릿):</strong> 현 직무에서 겪었던 시행착오와 해결 노하우를 30페이지 PDF로 정리하여 크몽이나 탈잉에 런칭하십시오.<br>
            • <strong>2단계 (소규모 유료 커뮤니티):</strong> 같은 고민을 가진 직장인들을 모아 월 회비 기반의 실무 스터디를 운영하십시오.<br>
            • <strong>3단계 (온디맨드 컨설팅):</strong> 고단가 1대 1 자문 서비스를 통해 시간당 단가를 20만 원 이상으로 끌어올리십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제17장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 17 · 직장인 번아웃(Burnout)과 가면증후군 심리 치유 처방</div>
      <h3 class="chapter-title">열심히 살았는데 왜 허무할까 — 영혼의 배터리를 재충전하는 명리학적 휴식법</h3>
      <div class="chapter-prose">
        <p>
          "언제까지 이렇게 버틸 수 있을까?", "사람들이 내 실력의 밑천을 알아채면 어쩌지?"라는 가면증후군과 번아웃은 <strong>사주의 일간이 모든 에너지를 밖으로 쏟아붓고 진액이 고갈되었을 때</strong> 뇌가 보내는 절규입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-battery-empty"></i> 번아웃이 부르는 위험한 신호</h5>
          <p>
            만성적인 두통, 이유 없는 짜증, 주말 내내 누워만 있어도 피로가 풀리지 않는 상태는 이미 자율신경계가 한계에 도달했음을 뜻합니다. 이때 스스로를 채찍질하면 공황장애나 우울증으로 직결됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-shield-heart"></i> 죄책감 없는 '완전 단절'의 안식 비방</h5>
          <p>
            • <strong>퇴근 후 업무 톡 차단:</strong> 저녁 7시 이후에는 회사 업무 알림을 완전히 음소거하고 일과 나를 분리하는 '심리적 퇴근'을 실천하십시오.<br>
            • <strong>오행 디톡스:</strong> 주말 하루는 자연 속으로 들어가 스마트폰을 끄고 숲길을 걷거나 온천욕을 즐기며 대지의 순수한 생기를 재충전하십시오.<br>
            • 당신은 일하기 위해 태어난 기계가 아니라, 삶을 누리기 위해 태어난 존귀한 존재임을 매일 밤 거울 앞에서 상기하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제18장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 18 · 근로계약 · 동업계약 · 스톡옵션 · 법적 분쟁 리스크 방어</div>
      <h3 class="chapter-title">사인은 마지막에 하라 — 관재구설(官災口舌)과 사기를 원천 차단하는 계약의 법</h3>
      <div class="chapter-prose">
        <p>
          커리어의 정상에서 한순간에 나락으로 떨어지는 것은 실력이 없어서가 아니라, <strong>계약서의 독소 조항 하나를 무심코 넘겼다가 법적 소송에 휘말리기 때문</strong>입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-gavel"></i> 직장인과 창업가를 위협하는 3대 계약 리스크</h5>
          <p>
            1. <strong>과도한 경업금지 조항:</strong> 퇴사 후 2년간 동종 업계 취업을 금지한다는 부당한 서약서에 서명했다가 커리어가 끊기는 비극.<br>
            2. <strong>스톡옵션 행사 조건의 함정:</strong> 회사가 상장되거나 인수합병될 때 휴지 조각이 되도록 설계된 불공정 조항.<br>
            3. <strong>지식재산권(IP) 귀속 분쟁:</strong> 내가 개발한 독창적 소프트웨어나 콘텐츠의 권리를 회사가 강제로 빼앗아 가는 사태.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-scale-balanced"></i> 관재를 원천 차단하는 문서 날인 5대 수칙</h5>
          <p>
            모든 중요 계약서는 서명 전 반드시 전문 노무사나 변호사의 유료 자문을 거치십시오. 수십만 원의 자문료가 훗날 수억 원의 자산과 법적 평화를 지켜주는 최고의 보험입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제19장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 향후 10년 커리어 & 몸값 점프업 타임라인 매트릭스</div>
      <h3 class="chapter-title">단기적 파도에 흔들리지 마라 — 10년 뒤 업계의 정점에 서는 연차별 마일스톤</h3>
      <div class="chapter-prose">
        <p>
          단기적인 눈앞의 연봉 인상에 일희일비하지 마십시오. 현재 시점(${seun.curYear}년)으로부터 향후 10년간 ${user.name}님의 커리어를 최정상 궤도에 올려놓을 연차별 전략 매트릭스를 제시합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-timeline"></i> 10개년 3단계 커리어 퀀텀 점프 로드맵</h5>
          <p>
            • <strong>초기 3년 (전문성 확립기):</strong> 누구도 부인할 수 없는 정량적 프로젝트 성과 3개를 포트폴리오로 완성하고 업계 내 핵심 네트워크를 확보하십시오.<br>
            • <strong>중기 4년 (영향력 확장기):</strong> 팀장, 임원, 또는 독립 법인의 대표로서 독자적인 시스템과 팀을 구축하여 레버리지를 극대화하십시오.<br>
            • <strong>후기 3년 (자산화 완성기):</strong> 내 노동력을 쓰지 않아도 지분 배당과 라이선스, 플랫폼 수익으로 자산이 불어나는 완전한 경제적 자유를 달성하십시오.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-flag-checkered"></i> 10년 후 당신이 서 있을 최종 고지</h5>
          <p>
            ${pattern.name}의 기운을 온전히 꽃피운 10년 뒤의 당신은, 더 이상 남의 눈치를 보지 않고 업계의 룰을 스스로 결정하는 독보적인 마스터가 되어 있을 것입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제20장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 천직을 향해 나아가는 ${user.name}님께 바치는 헌사 (에필로그)</div>
      <h3 class="chapter-title">당신의 가치는 당신이 매기는 것이다 — 위대한 여정을 시작하는 당신에게</h3>
      <div class="chapter-prose">
        <p>
          사주 여덟 글자는 당신이 가야 할 방향을 비추는 등대일 뿐, 그 바다를 직접 항해하고 파도를 넘어서는 것은 결국 당신 자신의 용기와 결단입니다.
        </p>

        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-heart"></i> 천문(天門) 커리어 상담실의 마지막 응원</h5>
          <p>
            "세상이 정해놓은 좁은 잣대에 당신의 무한한 가능성을 가두지 마십시오. 당신은 남들의 기준에 맞추어 평가받기 위해 태어난 것이 아니라, 당신만의 고유한 깃발을 꽂고 세상을 놀라게 하기 위해 태어났습니다. 가슴속에 타오르는 야망의 불꽃을 두려워하지 마시고, 오늘부터 당신의 찬란한 전성기를 향해 당당하게 첫 발을 내딛으십시오."
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-stamp"></i> 천문명리학술원 흠정비장(欽定秘藏) 인가</h5>
          <p>
            본 감명서는 ${user.name}님만을 위해 천문력과 명리학 고전의 정수를 집대성하여 봉헌되었습니다. 길이 보이지 않을 때마다 이 페이지를 다시 펼쳐 당신 안에 잠든 거인의 힘을 일깨우십시오.
          </p>
        </div>
      </div>
    </div>
  `;
}



// 브라우저 및 Node 환경 공용 내보내기
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MEDICAL_SAJU_ORGANS,
    diagnoseMedicalSaju,
    getDynamicSeunContext,
    buildNewYearReportHtml,
    buildMasterReportHtml,
    buildMatchReportHtml,
    buildCareerPersonaProse,
    buildCareerReportHtml
  };
}
