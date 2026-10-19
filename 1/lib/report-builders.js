/**
 * ============================================================================
 * 천문사주 (cheonmun.life) - 80+ 페이지 대백과사전급 정밀 감명서 엔진
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
// 1. 제1권 (newyear) : 세운(歲運) 총운 & 12개월 월별 터닝포인트 (총 21장)
//    - 제목에서 고정 연도(2026)를 배제하고 생성 시점(new Date) 기준으로 매년 영구 판매 가능
//    - 구성: 세운 총운(3장) + 향후 12개월 월별 단독 심층 감명서(12장) + 재물/계약/귀인/건강/풍수/3년로드맵(6장) = 21장
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

    let statusTitle = '';
    let statusCore = '';
    if (isClash) {
      statusTitle = `[일지 정면충(沖) · 환경 대격변의 달]`;
      statusCore = `이달의 지지 ${m.zhi}(${JIJI[m.branchIdx]})가 ${user.name}님의 안방 자리인 일지 ${JIJI_HANJA[dayBranch]}(${JIJI[dayBranch]})를 정면으로 타격합니다. 가만히 앉아 있어도 주변 환경이 강제로 흔들리는 달입니다. 억지로 과거의 방식이나 인연을 붙잡으려 하면 몸이 아프거나 관재(구설)로 터지므로, 차라리 이직·부서 이동·이사·장거리 출장·낡은 관계 정리 등 내가 먼저 판을 흔들어 기운을 빼내야 대길(大吉)로 전환됩니다.`;
    } else if (isMonthClash) {
      statusTitle = `[월지 사회궁 충(沖) · 직무/사업 재편의 달]`;
      statusCore = `이달의 지지가 사회적 간판인 월지 ${JIJI_HANJA[user.pillars.month.branchIdx]}와 충돌하여 조직 개편, 상사 교체, 거래처 변동, 주력 매출원의 이동이 발생합니다. 당황하지 말고 플랜 B를 즉시 가동하면 위기가 곧 독점적 기회로 바뀝니다.`;
    } else if (isComb) {
      statusTitle = `[일지 육합(六合) · 귀인 결속과 계약 성사의 달]`;
      statusCore = `이달의 지지 ${m.zhi}(${JIJI[m.branchIdx]})가 일지 ${JIJI_HANJA[dayBranch]}와 끈끈한 육합(六合)을 결성합니다. 흩어졌던 사람의 마음과 자금이 하나로 모이는 시기로, 중요한 문서 날인·연봉 협상·신규 파트너십 체결·연인과의 관계 진전에 있어 향후 1년 중 손꼽히는 황금 찬스입니다.`;
    } else {
      statusTitle = `[${m.tenGod}·${m.branchTenGod} 교차 · 내실과 전략적 도약의 달]`;
      statusCore = `천간의 ${m.gan}(${m.tenGod}) 기운이 표면적인 과제를 던지고, 지지의 ${m.zhi}(${m.branchTenGod}) 기운이 실질적인 바닥의 흐름을 형성합니다. 감정적 조급함을 내려놓고 ${yongshin.eokbuYongshin}의 원칙에 맞춰 자원을 배분할 때 가장 높은 수익률과 평판을 거두게 됩니다.`;
    }

    // 십신별 재물/직업/연애 세부 전략
    const wealthGuide = ['정재', '편재', '식신', '상관'].includes(m.tenGod)
      ? `천간에 <strong>${m.tenGod}</strong>이 투출하여 현금 흐름과 영업·투자 감각이 가장 날카롭게 깨어나는 달입니다. 적극적으로 수익 파이프라인을 넓히고 미수금을 회수하되, 월 중순(13일~19일)에는 충동적인 레버리지 베팅보다 확실한 실물·현금 흐름 위주로 포트폴리오를 압축하십시오.`
      : `천간에 <strong>${m.tenGod}</strong>이 자리하여 당장의 단기 차익보다는 문서(계약권·자격·지분)를 확보하거나 지출 누수를 막는 수성(守城) 전략이 유리한 달입니다. 특히 지인의 투자 권유나 명분만 앞선 모임 지출을 냉정히 차단하십시오.`;

    const careerGuide = ['정관', '편관', '정인', '편인'].includes(m.tenGod)
      ? `조직 내 권한 부여, 공식 프로젝트 리드, 시험·승진·인허가 운이 강하게 들어옵니다. 윗사람이나 심사위원에게 나의 논리적 문서와 정량적 지표를 전면 제시하면 경쟁자를 압도합니다.`
      : `틀에 박힌 보고보다 현장에서 직접 발로 뛰며 실적을 증명해야 빛이 나는 달입니다. 내 아이디어를 구두로만 흘리지 말고 반드시 기록으로 남겨 저작권과 주도권을 선점하십시오.`;

    const luckyDays = `${(m.month * 3) % 9 + 2}일, ${(m.month * 5) % 10 + 12}일, ${(m.month * 7) % 8 + 21}일`;
    const cautionDays = `${(m.month * 2) % 7 + 4}일, ${(m.month * 4) % 9 + 16}일`;

    return `
      <div class="report-chapter">
        <div class="chapter-badge">CHAPTER ${String(chapNum).padStart(2, '0')} · 향후 12개월 월별 단독 감명 (제${m.seq}월)</div>
        <h3 class="chapter-title">${m.year}년 ${m.month}월 [${m.gan}${m.zhi}(${m.kor})월] — ${m.tenGod}의 기운과 월간 행동 비책</h3>
        <div class="chapter-prose">
          <p>
            감명 시점으로부터 <strong>제${m.seq}번째 달인 ${m.year}년 ${m.month}월(${m.gan}${m.zhi}월)</strong>은 ${user.name}님의 일간 ${CHEONGAN_HANJA[dayMaster]}(${CHEONGAN[dayMaster]})을 기준으로 천간에 <strong>${m.tenGod}</strong>, 지지에 <strong>${m.branchTenGod}</strong>의 에너지를 드리웁니다. ${statusTitle}
          </p>
          <p>${statusCore}</p>

          <table class="report-detail-table">
            <thead>
              <tr>
                <th style="width:24%;">감명 영역</th>
                <th>${m.year}년 ${m.month}월 (${m.gan}${m.zhi}월) 세밀 운세 및 실전 행동 지침</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>💰 재물 · 투자운</strong></td>
                <td>${wealthGuide}</td>
              </tr>
              <tr>
                <td><strong>💼 직장 · 사업운</strong></td>
                <td>${careerGuide}</td>
              </tr>
              <tr>
                <td><strong>❤️ 애정 · 대인관계</strong></td>
                <td>일지 배우자궁(${JIJI_HANJA[dayBranch]})과 이달 지지(${m.zhi})의 기류상, 상대방의 사소한 말실수를 자존심 문제로 확대 해석하는 것을 경계해야 합니다. 먼저 경청하고 따뜻한 식사 자리를 마련할 때 뜻밖의 진심과 조력을 얻습니다.</td>
              </tr>
              <tr>
                <td><strong>🌿 이달의 건강 섭생</strong></td>
                <td>${ELEMENT_KOREAN[m.el]} 기운이 변동함에 따라 <strong>${med.deficientOrgan.zang}·${med.attackedOrgan.zang}</strong> 계통의 피로도를 점검해야 합니다. ${med.deficientOrgan.medicinalFood.split(',').slice(0, 3).join(', ')} 섭취를 늘리십시오.</td>
              </tr>
            </tbody>
          </table>

          <div class="key-point-box">
            <h5><i class="fa-solid fa-calendar-check"></i> ${m.year}년 ${m.month}월 핵심 길일(吉日) & 주의일 캘린더</h5>
            <p>
              • <strong>결단·계약·면접·자금 집행 대길일:</strong> ${m.month}월 <strong>${luckyDays}</strong><br>
              • <strong>감정 충돌·문서 오기·구설 주의일:</strong> ${m.month}월 <strong>${cautionDays}</strong> (해당일에는 야간 음주 및 즉흥적 송금을 삼가십시오)
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
      <h3 class="chapter-title">${user.name}님의 ${ natureName } 원국과 당해 세운(${seun.yearHanja}·${seun.yearKor})의 대충돌과 조화</h3>
      <div class="chapter-prose">
        <p>
          사주명리학에서 원국(原局) 여덟 글자가 당신이 타고난 ‘자동차의 차체와 엔진’이라면, 해마다 바뀌며 찾아오는 <strong>세운(歲運)</strong>은 당신이 지금 달리고 있는 ‘도로의 기후와 지형’입니다. 본 감명서는 고정된 과거의 연도에 얽매이지 않고, ${user.name}님께서 운명을 조회하신 현재 시점(<strong>${seun.curYear}년 ${seun.curMonth}월</strong>)을 기점으로 당해 <strong>${seun.yearHanja}(${seun.yearKor}) 세운</strong>과 향후 12개월간의 월건(月建) 변화를 천문력 기준으로 정밀 추적합니다.
        </p>
        <p>
          현재 하늘을 지배하는 세운의 천간은 <strong>${seun.yearGan}(${ELEMENT_KOREAN[seun.yearEl]})</strong>이며, 지지는 <strong>${seun.yearZhi}(${seun.yearAnimal})</strong>입니다. 이를 ${user.name}님의 일간 <strong>${CHEONGAN_HANJA[dayMaster]}(${CHEONGAN[dayMaster]})</strong>에 대입하면 육친상 <strong>‘${seun.yearTenGod}’</strong>의 거대한 파도가 당신의 삶 전면에 밀려들어 온 형국입니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-compass"></i> 당해 세운(${seun.yearHanja}) 핵심 명리 진단</h5>
          <p>
            • <strong>원국 격국 및 강약:</strong> ${pattern.name} (${strength.title}, 득령·득지 ${strength.score}점)<br>
            • <strong>세운 천간 작용:</strong> ${seun.yearGan}(${seun.yearTenGod}) — 사회적 무대에서의 역할 재정의 및 ${seun.yearTenGod} 중심의 사건 발현<br>
            • <strong>핵심 용신(用神) 나침반:</strong> 억부용신 <strong>[${yongshin.eokbuYongshin}]</strong> / 조후용신 <strong>[${yongshin.johuYongshin}]</strong>
          </p>
        </div>
        <p>
          궁통보감(窮通寶鑑) 고전 조후론에 비추어 볼 때, ${user.name}님은 <strong>${climate.seasonBadgeText}</strong>의 기운을 품고 태어나셨습니다(${climate.quote}). 따라서 이번 세운의 ${ELEMENT_KOREAN[seun.yearEl]} 기운이 원국의 한난조습(寒暖燥濕)에 미치는 영향을 정확히 읽고, 과열된 기운은 식히고 얼어붙은 기운은 데우는 선제적 대응이 성패를 가릅니다.
        </p>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 원국-세운 합충형파해(合沖刑破害) 정밀 스캔</div>
      <h3 class="chapter-title">내 사주 4기둥과 세운이 부딪히는 지점 — 무엇이 깨지고 무엇이 맺어지는가</h3>
      <div class="chapter-prose">
        <p>
          운에서 들어오는 글자가 내 사주의 연주(조상·초년), 월주(직업·사회궁), 일주(배우자·안방), 시주(말년·자녀·결과물) 중 어느 기둥을 건드리느냐에 따라 사건이 터지는 장소가 정확히 결정됩니다. ${user.name}님의 원국 내부 역학(<strong>${(user.dynamics?.stemRelations || []).concat(user.dynamics?.branchRelations || []).join(', ') || '독립적 기둥 유지'}</strong>) 위에 세운 ${seun.yearHanja}가 얹혔을 때 일어나는 화학반응은 다음과 같습니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:22%;">사주 기둥</th>
              <th style="width:20%;">원국 간지</th>
              <th>세운(${seun.yearHanja})과의 상호작용 및 현실 발현 사건</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>연주 (年柱)</strong><br>외부 환경·윗사람</td>
              <td><strong>${user.pillars.year.hanja}</strong> (${user.pillars.year.korean})</td>
              <td>가문, 본가, 혹은 업계 전체의 거시적 규제나 트렌드 변화가 ${user.name}님의 의사결정에 압력을 가합니다. 윗사람이나 기존 관행과 맞서기보다 명분을 세워 실리를 챙겨야 합니다.</td>
            </tr>
            <tr>
              <td><strong>월주 (月柱)</strong><br>직장·사업·사회궁</td>
              <td><strong>${user.pillars.month.hanja}</strong> (${user.pillars.month.korean})</td>
              <td>가장 직접적인 직무 변동과 수익 구조 재편이 일어나는 자리입니다. ${pattern.name}의 특성이 세운 ${seun.yearTenGod}과 결합하여 기존 업무 방식에 새 엔진을 달게 됩니다.</td>
            </tr>
            <tr>
              <td><strong>일주 (日柱)</strong><br>본인·배우자·거주지</td>
              <td><strong>${user.pillars.day.hanja}</strong> (${user.pillars.day.korean})</td>
              <td>내면의 독립 욕구와 생활 반경의 변화가 동시에 찾아옵니다. 배우자나 연인과의 관계에서 주도권 다툼을 피하고 공동의 재무 목표를 설정할 때 결속력이 극대화됩니다.</td>
            </tr>
            <tr>
              <td><strong>시주 (時柱)</strong><br>미래 자산·부업·자녀</td>
              <td><strong>${user.pillars.hour ? user.pillars.hour.hanja : '미입력'}</strong></td>
              <td>당장 눈에 보이는 본업 외에 미래를 위한 씨앗(제2 파이프라인, 특허, 자격, 투자처)이 잉태되는 구간입니다. 후반기로 갈수록 시주의 결실력이 강해집니다.</td>
            </tr>
          </tbody>
        </table>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-bolt"></i> 세운 충·살(沖煞) 방어 핵심 수칙</h5>
          <p>
            원국에 잠재된 <strong>${(user.extendedShinsal || []).map(s => s.name).slice(0, 3).join(', ') || '특수 신살'}</strong>의 기운이 세운의 자극을 받을 때는 ‘속도전’이 독이 됩니다. 문서 날인 전 최소 24시간의 숙려 시간을 두는 것만으로도 올해 예상되는 손재수의 80%를 예방할 수 있습니다.
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
          1년 열두 달 내내 전속력으로 달릴 수는 없습니다. 명리학의 고수들은 자신의 조후용신(<strong>${yongshin.johuYongshin}</strong>)과 억부용신(<strong>${yongshin.eokbuYongshin}</strong>)이 득세하는 계절에 승부수를 던지고, 기신(忌神)이 강해지는 계절에는 철저히 현금을 보유하며 몸을 낮춥니다.
        </p>
        <p>
          • <strong>목(木)의 계절 (인·묘·진월 / 2월~4월):</strong> 새로운 기획, 인맥 확장, 이직 타진, 학업 및 자격 시작의 기운이 솟구칩니다. 머뭇거리던 프로젝트를 수면 위로 올리십시오.<br>
          • <strong>화(火)의 계절 (사·오·미월 / 5월~7월):</strong> 기운이 최고조로 발산되며 대외 노출, 마케팅, 영업 성과가 폭발하나, 동시에 감정적 마찰과 과열 투자로 인한 현금 고갈을 경계해야 합니다.<br>
          • <strong>금(金)의 계절 (신·유·술월 / 8월~10월):</strong> 벌려놓은 일들을 냉정하게 가지치기하고, 실속 없는 인간관계와 적자 항목을 도려내어 현금과 문서로 결실을 거두는 수확기입니다.<br>
          • <strong>수(水)의 계절 (해·자·축월 / 11월~1월):</strong> 다음 해의 판을 짜기 위해 지식을 비축하고 건강을 돌보며, 수면 아래에서 핵심 계약과 자산을 조용히 갈무리하는 응축기입니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-chess-knight"></i> ${user.name}님을 위한 연간 승부처 요약</h5>
          <p>
            다음 장(CHAPTER 04~15)부터는 감명일 기준 <strong>향후 12개월(제1월~제12월)</strong>의 각 달을 한 페이지씩 단독으로 해부합니다. 매월 초 해당 페이지를 펼쳐 그달의 길일과 주의일을 체크리스트로 활용하십시오.
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
          ${user.name}님의 원국은 <strong>${strength.title}</strong> 구조 위에 <strong>${pattern.name}</strong>의 재물 그릇을 얹고 있습니다. ${strength.status === 'strong' ? '본인의 주체적 에너지가 강하므로 남의 밑에서 정해진 급여만 받기보다 성과급, 인센티브, 사업 소득, 혹은 주도적인 투자에서 큰 재물이 터지는 구조입니다.' : '무리하게 혼자 모든 리스크를 떠안는 공격적 차입 투자보다는, 확실한 시스템·플랫폼·우량 문서(부동산·배당·자격)에 올라타 안정적인 현금흐름을 구축할 때 재물이 새지 않고 쌓입니다.'}
        </p>
        <p>
          향후 12개월 동안 재물운의 핵심 키워드는 <strong>‘유동성 확보’와 ‘문서화’</strong>입니다. 손에 들어온 현금을 계좌에 그냥 두면 비겁(경쟁자·지인·예상치 못한 수리비나 경조사)의 기운이 이를 흔들어 빼앗아 갑니다. 따라서 수입이 발생하는 즉시 강제 저축이나 중장기 자산 계좌로 이체하여 ‘내 눈앞에서 현금을 숨기는 개운법’을 써야 합니다.
        </p>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-ban"></i> 향후 1년간 절대 금기시해야 할 재무 행동 3가지</h5>
          <p>
            1. <strong>친분 기반의 금전 대여 및 동업 출자:</strong> 혈연이나 오랜 지인일수록 계약서 없는 돈거래는 원진살의 원한으로 되돌아옵니다.<br>
            2. <strong>감정적 보복 소비 및 홧김의 베팅:</strong> 직무 스트레스가 극에 달하는 달에 충동적으로 고가품을 결제하거나 고위험 자산에 추격 매수하는 패턴을 끊으십시오.<br>
            3. <strong>구두 약속에 의존한 용역·납품 진행:</strong> 선입금과 날인된 계약서 없이는 단 한 걸음도 움직이지 않는 냉철함이 당신의 재물고를 지킵니다.
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
          명리학에서 문서운은 <strong>인성(印星: 정인·편인)</strong>과 <strong>식상·재성의 결실</strong>로 판별합니다. 향후 1년 내 거주지 이동(매매·전월세 계약), 사업장 임대차, 차량 교체, 혹은 중요한 법적·업무적 협약서 날인을 앞두고 계신다면 다음의 방위와 시기를 엄격히 준수하십시오.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:25%;">구분</th>
              <th>${user.name}님 맞춤 문서 · 이동 개운 처방</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>길방(吉方) · 유리한 방향</strong></td>
              <td>현재 거주지 또는 주 활동지 기준 <strong>${dayEl === 'wood' || dayEl === 'fire' ? '동남쪽 · 남쪽 (양기 소통 방위)' : '서북쪽 · 북동쪽 (수렴 및 안정 방위)'}</strong> 및 채광과 통풍이 확보된 고층·탁 트인 지형</td>
            </tr>
            <tr>
              <td><strong>기피해야 할 흉방</strong></td>
              <td>일지 ${JIJI_HANJA[dayBranch]}와 정면 충(沖)을 이루는 방향의 막다른 골목, 습기가 차는 반지하, 혹은 공사 소음이 끊이지 않는 풍수적 파살(破煞) 지대</td>
            </tr>
            <tr>
              <td><strong>계약서 특약 필수 점검</strong></td>
              <td>권리관계(근저당·선순위 채권), 위약금 조항, 중도 해지 조건을 반드시 본인이 직접 두 번 이상 대조하십시오. 대리인에게 일임하면 문서 착오가 발생합니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제18장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 18 · 귀인(貴人)과 소인배(小人輩) 감별 명식표</div>
      <h3 class="chapter-title">향후 1년간 내 인생을 끌어올릴 귀인의 특징 vs 에너지를 갉아먹을 악연</h3>
      <div class="chapter-prose">
        <p>
          운이 바뀔 때는 반드시 <strong>‘사람’</strong>을 통해 복과 화가 들어옵니다. ${user.name}님의 일간 ${CHEONGAN_HANJA[dayMaster]}을 기준으로 천을귀인(天乙貴人)과 용신 오행(<strong>${yongshin.eokbuYongshin}</strong>)을 가진 사람을 곁에 두면 막혔던 혈이 뚫리듯 문제가 해결됩니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-user-check"></i> 반드시 잡아야 할 올해의 귀인(貴人) 시그널</h5>
          <p>
            • <strong>띠(출생연도 지지) 및 기질:</strong> 나의 용신 기운(${yongshin.johuYongshin})을 보완해 주며, 감정적 과장 없이 수치와 팩트로 조언해 주는 차분한 실무형 인물.<br>
            • <strong>만나는 장소:</strong> 술자리나 유흥 모임이 아닌, 직무 세미나·교육장·공식 비즈니스 미팅·운동 모임에서 조우하는 인연.
          </p>
        </div>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-user-xmark"></i> 즉시 손절해야 할 소인배(악연) 시그널</h5>
          <p>
            • 첫 만남부터 지나치게 친밀감을 과시하며 남의 험담을 공유하거나, 검증되지 않은 일확천금 정보로 당신의 조급증을 자극하는 인물.<br>
            • 내 성취를 은근히 깎아내려 자존감을 갉아먹는 가스라이팅형 동료나 지인은 올해 상반기 내에 거리를 두어야 내 복록이 온전히 보전됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제19장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 계절별 신체 바이오리듬 및 질환 예방 캘린더</div>
      <h3 class="chapter-title">세운의 오행 편중이 건드리는 내 몸의 약점과 사계절 건강 수칙</h3>
      <div class="chapter-prose">
        <p>
          명리학에서 건강은 오행의 균형 그 자체입니다. ${user.name}님은 원국상 <strong>${med.excessOrgan.elKor} 기운(${med.excessOrgan.zang}·${med.excessOrgan.fu})</strong>이 상대적으로 강하고, <strong>${med.deficientOrgan.elKor} 기운(${med.deficientOrgan.zang}·${med.deficientOrgan.fu})</strong>이 취약한 구조를 지니고 있습니다.
        </p>
        <p>
          특히 세운(${seun.yearHanja})의 기운이 더해지는 향후 1년 동안에는 과로와 수면 부족이 누적될 경우 <strong>${med.deficientOrgan.deficientSymptom}</strong> 또는 <strong>${med.excessOrgan.excessSymptom}</strong> 형태로 신체의 경고등이 켜질 수 있습니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-heart-circle-check"></i> 연간 건강 방어 3대 생활 루틴</h5>
          <p>
            1. <strong>생체 경락 시간 준수:</strong> ${med.deficientOrgan.meridianTime}<br>
            2. <strong>맞춤 약선 차(茶) 상비:</strong> 커피 대신 <strong>${med.deficientOrgan.teaPrescription}</strong>을 수시로 음용하여 장부의 허열을 내리십시오.<br>
            3. <strong>정기 검진 권장 시기:</strong> 일지 충이나 월지 충이 들어오는 달의 전월에는 반드시 치과·위내시경·혈액 대사 검진을 선제적으로 받아 액땜하십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제20장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 생활 풍수(風水) · 방위 · 색상 · 행운수 개운 비방</div>
      <h3 class="chapter-title">일상 공간을 부와 행운의 자석으로 바꾸는 천문(天門) 개운 비책</h3>
      <div class="chapter-prose">
        <p>
          사주 원국의 부족한 오행을 채우는 가장 빠르고 현실적인 방법은 내가 매일 머무는 <strong>공간(풍수), 몸에 걸치는 색채(파장), 그리고 반복하는 습관(행동 개운)</strong>을 바꾸는 것입니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:26%;">개운 항목</th>
              <th>${user.name}님 맞춤 황실 개운 처방전</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🎨 행운의 컬러 (색채 파장)</strong></td>
              <td>속옷·지갑·스마트폰 케이스·침구류에 조후/억부 보완색인 <strong>${med.deficientEl === 'water' ? '네이비·블랙·차콜' : med.deficientEl === 'wood' ? '포레스트 그린·민트·청록' : med.deficientEl === 'fire' ? '버건디·코랄·웜화이트' : med.deficientEl === 'earth' ? '베이지·머스타드·골드' : '화이트·실버·메탈릭 그레이'}</strong>를 포인트로 배치하십시오.</td>
            </tr>
            <tr>
              <td><strong>🛏️ 침실 & 책상 풍수</strong></td>
              <td>침대 머리는 창문과 방문을 대각선으로 바라보되 직접 맞닿지 않게 배치하고, 책상 위에는 불필요한 종이 더미를 치워 <strong>명당(明堂: 책상 앞 공간)</strong>을 비워두어야 문서운과 결단력이 살아납니다.</td>
            </tr>
            <tr>
              <td><strong>🔢 행운의 선천수(先天數)</strong></td>
              <td>비밀번호나 중요 의사결정 단위에 <strong>${dayEl === 'wood' ? '3, 8' : dayEl === 'fire' ? '2, 7' : dayEl === 'earth' ? '5, 0' : dayEl === 'metal' ? '4, 9' : '1, 6'}</strong>의 수리(數理) 조합을 활용하십시오.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제21장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 21 · 향후 3년 세운(歲運) 브릿지 및 총결론</div>
      <h3 class="chapter-title">올해의 씨앗이 내년과 내후년에 어떤 거목으로 자라나는가 — 3개년 중기 전망</h3>
      <div class="chapter-prose">
        <p>
          운명은 단절된 점이 아니라 도도하게 흐르는 강물입니다. 지금 맞이한 <strong>${seun.curYear}년(${seun.yearHanja})</strong>을 기점으로 앞으로 이어질 <strong>${seun.curYear + 1}년</strong>과 <strong>${seun.curYear + 2}년</strong>의 3개년 흐름을 연결해 보면, 지금 당신이 겪고 있는 고민과 진통이 결코 헛된 소모가 아님을 알게 됩니다.
        </p>
        <p>
          • <strong>제1차년도 (${seun.curYear}년 ~ ${seun.curYear + 1}년 초):</strong> 낡은 껍질을 깨고 내 사주의 본래 격국(<strong>${pattern.name}</strong>)에 맞지 않는 불필요한 인연과 비효율적 관행을 정리하며 핵심 무기를 벼리는 <strong>‘기반 재정립기’</strong>입니다.<br>
          • <strong>제2차년도 (${seun.curYear + 1}년):</strong> 정비된 체력과 문서를 바탕으로 새로운 시장과 직책에서 실질적인 점유율과 현금흐름을 빠르게 확장하는 <strong>‘도약 및 증식기’</strong>입니다.<br>
          • <strong>제3차년도 (${seun.curYear + 2}년):</strong> 확장된 성과를 부동산·지분·장기 자산 등 흔들리지 않는 성벽(문서)으로 굳혀 사회적 위상을 확고히 하는 <strong>‘안착 및 결실기’</strong>입니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-scroll"></i> 제1권 세운(歲運) 감명서 총결</h5>
          <p>
            "${user.name}님, 하늘은 준비된 자에게만 충(沖)의 폭풍을 도약의 바람으로 바꾸어 줍니다. 매달 이 서책의 월별 지침을 나침반 삼아 나아가신다면, 향후 12개월은 당신의 인생에서 가장 눈부신 전환점으로 기록될 것입니다."
          </p>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 2. 제2권 (master) : 평생 총운 & 10년 대운 · 의명진단 마스터팩 (총 23장)
//    - 자평진전 10대 격국 + 4기둥 해부(5장) + 용신·길신·흉살·심리(5장)
//    - 10년 대운 제1~제8대운 단독 심층 해부(8장)
//    - 의명진단학(醫命診斷學) 4대 장 정밀 수록(4장) + 평생 재물 로드맵(1장) = 23장
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
            <strong>${user.name}님의 인생 제${idx + 1}막 (${d.startAge}세~${d.endAge}세, ${stageLabel})</strong>을 지배하는 10년 대운은 <strong>${d.gan}${d.zhi}(${d.kor})</strong>입니다. 대운의 전반부 5년(${d.startAge}세~${d.startAge + 4}세)은 천간 <strong>${d.gan}(${d.tenGod})</strong>이 외적인 사회 환경과 인간관계를 주도하며, 후반부 5년(${d.startAge + 5}세~${d.endAge}세)은 지지 <strong>${d.zhi}(${dBranchTenGod})</strong>가 실질적인 재물고와 가정·건강의 뿌리를 뒤흔들거나 반석 위에 올려놓습니다.
          </p>
          <p>
            ${isPrime ? `특히 이 <strong>${d.startAge}세~${d.endAge}세 구간</strong>은 ${user.name}님의 원국 격국(${pattern.name})이 대운의 힘을 받아 사회적 성취와 자산 증식의 레버리지를 극대화할 수 있는 <strong>핵심 승부처(Prime Era)</strong>입니다. 작은 안정에 안주하지 말고 본인의 이름값과 문서를 넓히는 과감한 확장이 요구됩니다.` : `이 <strong>${d.startAge}세~${d.endAge}세 구간</strong>은 무리한 외형 확장보다 내실을 다지고 다음 대운의 파도를 타기 위한 그릇을 빚는 시기입니다. ${d.tenGod}의 순기능을 살려 전문성과 신용을 축적하십시오.`}
            ${isClashWithMonth ? `<br><strong>[특기사항 - 월지 대운충]:</strong> 이 대운은 원국의 월지(직업궁)와 정면 충(沖)을 이루므로 10년 사이에 직업 도메인이나 사업 아이템이 완전히 뒤바뀌는 대대적인 환골탈태를 겪게 됩니다.` : ''}
            ${isClashWithDay ? `<br><strong>[특기사항 - 일지 대운충]:</strong> 이 대운은 원국의 일지(배우자·안방)를 강하게 흔들므로 거주지 대이동(타지·해외 포함)이나 배우자와의 관계 재정립, 건강 관리에 각별한 주의가 필요합니다.` : ''}
          </p>
          <table class="report-detail-table">
            <thead>
              <tr>
                <th style="width:24%;">대운 세분 구간</th>
                <th>${d.gan}${d.zhi} 대운(${d.startAge}~${d.endAge}세) 영역별 운명 지침</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>전반 5년 (${d.startAge}~${d.startAge + 4}세)</strong><br>천간 [${d.gan} · ${d.tenGod}]</td>
                <td>대외적인 명분과 새로운 기회가 <strong>${d.tenGod}</strong>의 형태로 찾아옵니다. 인간관계의 물갈이가 일어나며, 새로운 분야에 대한 학습이나 프로젝트 제안이 활발해집니다. 초기 2년은 검증에 집중하고 3년 차부터 본격 베팅하십시오.</td>
              </tr>
              <tr>
                <td><strong>후반 5년 (${d.startAge + 5}~${d.endAge}세)</strong><br>지지 [${d.zhi} · ${dBranchTenGod}]</td>
                <td>전반기에 뿌린 씨앗이 현실적인 결과물(<strong>${dBranchTenGod}</strong>)로 굳어지는 시기입니다. 현금 흐름의 구조화, 부동산·문서 취득, 혹은 조직 내 확고한 입지 구축이 이 5년 동안 판가름 납니다.</td>
              </tr>
              <tr>
                <td><strong>의명(醫命) 건강 주의보</strong></td>
                <td>대운 오행이 원국의 <strong>${med.deficientOrgan.zang}</strong>과 <strong>${med.attackedOrgan.zang}</strong>에 부담을 줄 수 있는 시기이므로, ${d.startAge + 4}세와 ${d.endAge - 1}세 무렵에는 과로를 피하고 정밀 검진을 챙기십시오.</td>
              </tr>
            </tbody>
          </table>
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
          사주명리학의 최고봉인 『자평진전(子平眞詮)』은 인간의 사회적 성패와 삶의 무대를 결정짓는 핵심 열쇠로 <strong>월지(月支: 태어난 달의 지지)</strong>의 지장간에서 투출한 <strong>격국(格局)</strong>을 꼽습니다. 일간(日干)이 ‘나 자신의 영혼’이라면, 격국은 내가 세상에 나가 평생 동안 휘두르게 될 ‘최강의 무기이자 사회적 직함’입니다.
        </p>
        <p>
          ${user.name}님의 원국을 정밀 감명한 결과, 당신의 사주는 <strong>[${pattern.name} (${pattern.badge})]</strong>으로 귀결됩니다. ${pattern.desc}
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-crown"></i> [${pattern.name}] 성패(成敗)의 절대 법칙</h5>
          <p>
            • <strong>타고난 천직 도메인:</strong> ${pattern.career}<br>
            • <strong>부의 축적 메커니즘:</strong> ${pattern.wealth}<br>
            • <strong>원국 신강/신약 지수:</strong> <strong>${strength.title}</strong> (종합 에너지 ${strength.score}점) — ${strength.desc}
          </p>
        </div>
        <p>
          많은 이들이 자신의 격국을 모른 채 남들이 좋다는 유망 직종이나 투자처를 쫓다가 수십 년을 허비합니다. ${user.name}님은 오직 <strong>${pattern.name}</strong>의 정체성에 부합하는 판 위에서 싸울 때만 최소한의 노력으로 최대의 부와 명예를 거머쥘 수 있습니다.
        </p>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 일주(日柱) 본원 심층 해부 — 영혼의 핵과 배우자궁</div>
      <h3 class="chapter-title">${natureName}의 양면성 — 남들은 절대 모르는 당신의 고독과 야망</h3>
      <div class="chapter-prose">
        <p>
          사주 여덟 글자 중 나 자신을 상징하는 일간(日干) <strong>${CHEONGAN_HANJA[dayMaster]}(${CHEONGAN[dayMaster]})</strong>과 내가 발을 딛고 선 안방이자 배우자 자리인 일지(日支) <strong>${JIJI_HANJA[dayBranch]}(${JIJI[dayBranch]})</strong>의 결합은 당신의 내면 심리와 평생의 생활 양식을 지배합니다.
        </p>
        <p>
          겉으로 드러나는 ${user.name}님은 예의 바르고 합리적이며 웬만한 일에는 감정을 크게 드러내지 않는 것처럼 보입니다. 그러나 일지 ${JIJI_HANJA[dayBranch]}의 지장간(<strong>${HIDDEN_STEMS[dayBranch].map(i => CHEONGAN_HANJA[i]).join('·')}</strong>) 속에는 누구에게도 지배받기 싫어하는 강렬한 주체성과, 한 번 마음먹은 일은 끝장을 봐야 직성이 풀리는 서늘한 승부사 기질이 숨어 있습니다.
        </p>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-eye"></i> ${natureName}이 평생 경계해야 할 심리적 그림자</h5>
          <p>
            스스로의 기준치가 지나치게 높아 타인의 사소한 무능이나 약속 불이행을 속으로 칼같이 채점하고 손절하는 경향이 있습니다. 또한 힘들어도 남에게 약한 모습을 보이지 못해 혼자 속으로 삭이다가 한순간에 관계를 끊어버리는 극단성을 조율해야 말년이 외롭지 않습니다.
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
          연주(年柱)는 내가 태어난 가문의 배경, 부모·조상으로부터 물려받은 기질적 유전자, 그리고 만 19세 이전 초년기의 정서적 토양을 나타냅니다. ${user.name}님의 연주는 <strong>${user.pillars.year.hanja}(${user.pillars.year.korean})</strong>로 구성되어 있습니다.
        </p>
        <p>
          이 구조를 가진 분들은 설령 부모의 유산이나 지원이 있더라도 결국에는 본인의 손으로 가풍을 새로 세우거나, 일찍부터 정신적·경제적으로 부모의 그늘에서 벗어나야만 직성이 풀리는 <strong>‘개척자형 운명’</strong>을 타고납니다. 초년에 겪었던 정서적 갈증이나 책임감은 결코 불행이 아니라, 중년 이후 남들보다 훨씬 단단한 위기관리 능력을 갖게 만든 담금질이었습니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-seedling"></i> 연주가 일주에 건네는 평생의 조언</h5>
          <p>
            본가나 고향에 지나치게 밀착하기보다 적당한 물리적·심리적 거리를 유지할 때 오히려 부모 형제와의 우애도 지켜지고 본인의 재물운도 막힘없이 뻗어 나갑니다.
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
          월주(月柱)는 사주팔자에서 가장 강력한 에너지를 뿜어내는 사령탑(司令塔)이자, 20세부터 40대 중반까지 당신이 사회라는 정글에서 어떤 무기로 살아남는지를 보여주는 자리입니다. ${user.name}님의 월주는 <strong>${user.pillars.month.hanja}(${user.pillars.month.korean})</strong>이며, 월지 지장간에는 <strong>${HIDDEN_STEMS[user.pillars.month.branchIdx].map(i => `${CHEONGAN_HANJA[i]}(${getTenGod(dayMaster, i)})`).join(' · ')}</strong>의 기운이 암장되어 있습니다.
        </p>
        <p>
          이는 당신이 단순히 시키는 일만 반복하는 실무자가 아니라, 판의 흐름을 읽고 자원을 조율하며 결과물을 기획해 내는 자리에서 가장 큰 부가가치를 창출함을 뜻합니다. 특히 천간과 지지의 연결고리상, 명분(타이틀·자격)과 실리(현금·성과) 중 어느 한쪽만 택하기보다 초반에는 조직의 간판을 빌려 신용을 쌓고 중반 이후 본인의 독자적 전문성을 자산화하는 2단계 전략이 완벽히 들어맞습니다.
        </p>
      </div>
    </div>

    <!-- 제5장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 05 · 시주(時柱) 말년·결실궁 해부 — 인생 후반전의 부귀와 숨은 욕망</div>
      <h3 class="chapter-title">시주 [${user.pillars.hour ? `${user.pillars.hour.hanja}(${user.pillars.hour.korean})` : '삼주 감명 모드'}]가 예고하는 50대 이후의 최종 성적표</h3>
      <div class="chapter-prose">
        <p>
          초년과 중년에 아무리 화려하게 날아올라도 시주(時柱: 말년궁·자녀궁·최종 결실궁)가 무너지면 노년이 고달프고, 반대로 초년이 파란만장했더라도 시주가 든든하면 인생 후반전에 모든 상처를 보상받는 대부귀를 누립니다.
        </p>
        <p>
          ${user.pillars.hour ? `${user.name}님의 시주는 <strong>${user.pillars.hour.hanja}(${user.pillars.hour.korean})</strong>로, 일간 기준 천간에 <strong>${getTenGod(dayMaster, user.pillars.hour.stemIdx)}</strong>, 지지에 <strong>${getTenGod(dayMaster, HIDDEN_STEMS[user.pillars.hour.branchIdx][0])}</strong>의 기운이 자리 잡고 있습니다. 이는 나이가 들수록 현역에서 완전히 손을 떼기보다, 자신이 쌓아온 경험·문서·자산을 굴려 젊은 시절보다 훨씬 여유롭고 품격 있는 현금흐름을 유지하는 ‘대기만성형 말년복’을 의미합니다.` : `현재 출생 시각 미입력(삼주 감명) 상태이나, 일주 ${natureName}과 월주 ${user.pillars.month.hanja}의 결속 구조를 볼 때 중년 이후 본인의 이름으로 된 문서 자산(부동산·연금·지분)을 얼마나 철저히 묶어두느냐가 말년의 평안을 좌우합니다.`}
        </p>
      </div>
    </div>

    <!-- 제6장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 06 · 억부용신(抑扶用神)과 조후용신(調候用神)의 비밀</div>
      <h3 class="chapter-title">궁통보감 120조후 고증 — 내 사주의 온도를 맞추고 운을 여는 절대 열쇠</h3>
      <div class="chapter-prose">
        <p>
          명리학에서 <strong>용신(用神)</strong>이란 내 사주의 병(病)을 고치는 약(藥)입니다. 첫째로 사주의 강약을 조절하는 <strong>억부용신(抑扶用神)</strong>이 있고, 둘째로 태어난 계절의 한난조습(추위·더위·건조함·습함)을 조절하는 <strong>조후용신(調候用神)</strong>이 있습니다. 억부가 ‘돈과 직장의 성패’를 좌우한다면, 조후는 ‘그 사람이 느끼는 삶의 행복도와 정신적 평안’을 좌우합니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-key"></i> ${user.name}님의 양대 용신(用神) 판정서</h5>
          <p>
            • <strong>억부용신 (사회적 성취의 무기):</strong> <strong>${yongshin.eokbuYongshin}</strong> — ${yongshin.eokbuDesc}<br>
            • <strong>조후용신 (궁통보감 계절 조율):</strong> <strong>${yongshin.johuYongshin}</strong> (${climate.seasonBadgeText})<br>
            • <strong>고전 원문 비평:</strong> "${climate.quote}"
          </p>
        </div>
        <p>
          인생이 이유 없이 답답하고 우울할 때는 어김없이 조후용신(<strong>${yongshin.johuYongshin}</strong>)이 손상된 시기입니다. 이때는 억지로 일을 벌이기보다 조후를 보완하는 환경(채광, 온도, 물가, 혹은 해당 오행의 취미와 귀인)으로 몸을 옮기는 것이 최고의 개운법입니다.
        </p>
      </div>
    </div>

    <!-- 제7장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 07 · 원국 내 천간 합충(合沖)과 지지 형충회합(刑沖會合)</div>
      <h3 class="chapter-title">내 사주 안에서 끊임없이 부딪히고 결합하는 보이지 않는 역학 구조</h3>
      <div class="chapter-prose">
        <p>
          가만히 있어도 내 마음속에서 두 가지 욕망이 싸우거나, 인생의 중요한 기로마다 비슷한 패턴의 인간관계 문제가 반복된다면 그것은 원국 내부의 <strong>합(合)·충(沖)·형(刑)</strong> 때문입니다.
        </p>
        <p>
          • <strong>천간(天干)의 정신적 역학:</strong> <strong>${(dynamics.stemRelations && dynamics.stemRelations.length > 0) ? dynamics.stemRelations.join(' / ') : '천간 각 글자가 합충으로 묶이지 않고 고유의 독립적 투출력을 온전히 발휘하는 청(淸)한 구조'}</strong><br>
          • <strong>지지(地支)의 현실적 역학:</strong> <strong>${(dynamics.branchRelations && dynamics.branchRelations.length > 0) ? dynamics.branchRelations.join(' / ') : '지지 네 기둥이 서로를 파극하지 않고 안정적인 지반을 유지하는 구조'}</strong>
        </p>
        <p>
          원국에 합(合)이 있으면 대인관계의 결속력과 타협 능력이 뛰어나나 때로 결단이 늦어질 수 있고, 충(沖)이나 형(刑)이 있으면 남들이 엄두도 못 내는 개혁과 돌파를 해내나 한곳에 정착하기까지 역동적인 이동을 겪게 됩니다. 이는 결함이 아니라 당신만의 ‘추진 방식’입니다.
        </p>
      </div>
    </div>

    <!-- 제8장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 08 · 천을귀인 · 문창귀인 · 도화 · 역마 · 화개 길신(吉神) 활용법</div>
      <h3 class="chapter-title">하늘이 내린 보호막과 대중을 사로잡는 매력 자본의 현대적 사용 설명서</h3>
      <div class="chapter-prose">
        <p>
          과거 농경사회에서는 도화살(桃花煞)이나 역마살(驛馬煞)을 흉하게 보았으나, 현대 자본주의 사회에서 도화는 ‘트래픽과 팬덤을 부르는 매력 자본’이요, 역마는 ‘글로벌 비즈니스와 유통·플랫폼을 장악하는 기동력’입니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:25%;">주요 길신·특수별</th>
              <th>${user.name}님 원국 내 작동 원리 및 자본화 전략</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>천을귀인 (天乙貴人)</strong><br>최고의 수호신</td>
              <td>절체절명의 위기에서 반드시 돕는 손길이 나타나 목숨과 재산을 건지는 별입니다. 남에게 베푼 작은 예의와 신용이 결정적 순간 수억 원의 가치로 돌아옵니다.</td>
            </tr>
            <tr>
              <td><strong>문창·학당 (文昌)</strong><br>지성과 문서의 힘</td>
              <td>글쓰기, 기획, 계약서 작성, 교육, 라이선스 취득에서 남다른 총명함을 발휘합니다. 본인의 노하우를 반드시 텍스트나 콘텐츠로 남기십시오.</td>
            </tr>
            <tr>
              <td><strong>도화·홍염 (桃花)</strong><br>시선 집중과 매력</td>
              <td>가만히 있어도 시선을 끌고 호감을 사는 기운입니다. 대면 영업, 브랜딩, 미디어, 고급 서비스업에서 가격 결정권을 높이는 무기로 쓰십시오.</td>
            </tr>
            <tr>
              <td><strong>역마·화개 (驛馬·華蓋)</strong><br>확장과 깊은 통찰</td>
              <td>역마로 넓게 시장을 개척하고 화개의 예술적·철학적 깊이로 대체 불가능한 전문성을 완성하는 양날의 날개입니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제9장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 09 · 백호대살 · 괴강살 · 현침살의 프로페셔널 승화법 (업상대체)</div>
      <h3 class="chapter-title">강렬한 살기(煞氣)를 압도적 카리스마와 전문직의 칼날로 바꾸는 비결</h3>
      <div class="chapter-prose">
        <p>
          사주에 <strong>백호대살(白虎大煞), 괴강살(魁罡煞), 양인살(羊刃煞), 현침살(懸針煞)</strong> 같은 강한 살(煞)이 있을 때, 이를 방치하면 내 몸이 다치거나 구설·사고로 발현되지만, 내가 먼저 그 살기를 직업적으로 매일 쓰면 오히려 해당 분야의 일인자가 됩니다. 이를 명리학에서 <strong>‘업상대체(業象代替)’</strong>라 부릅니다.
        </p>
        <p>
          현재 ${user.name}님에게 감지된 주요 신살 기운은 <strong>[${shinsalList.map(s => s.name).join(' · ') || '내재된 결단살과 현침 기운'}]</strong>입니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-wand-sparkles"></i> ${user.name}님을 위한 업상대체(業象代替) 실전 처방</h5>
          <p>
            • <strong>직무적 승화:</strong> 정밀한 숫자와 데이터를 다루는 재무·IT, 생사여탈이나 분쟁을 다루는 의료·법무·세무, 혹은 날카로운 안목이 필요한 디자인·엔지니어링·고도화된 영업 협상에서 이 에너지를 소모하십시오.<br>
            • <strong>일상적 액땜:</strong> 정기적인 헌혈, 스케일링, 피부과 시술, 혹은 고강도 근력 운동으로 몸에 작은 자극과 땀을 내면 백호·양인의 흉기가 말끔히 해소됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제10장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 10 · 원진살(怨嗔煞) · 귀문관살(鬼門關煞) 심층 심리 치유</div>
      <h3 class="chapter-title">천재적인 직관력 뒤에 숨은 예민함과 관계의 애증을 다스리는 법</h3>
      <div class="chapter-prose">
        <p>
          원진(怨嗔)과 귀문(鬼門)은 남들이 보지 못하는 이면의 심리와 미세한 분위기 변화를 귀신같이 읽어내는 <strong>‘초감각적 안테나’</strong>입니다. 이 기운이 있는 분들은 사람의 거짓말이나 가식을 본능적으로 꿰뚫어 보며, 예술·기획·심리·전략 분야에서 타의 추종을 불허하는 영감을 발휘합니다.
        </p>
        <p>
          다만 이 안테나가 가까운 가족이나 연인에게 향할 때, “왜 내 마음을 말하지 않아도 몰라주느냐”는 서운함과 미워하면서도 끊어내지 못하는 애증(愛憎)으로 자신을 괴롭히게 됩니다.
        </p>
        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-heart-crack"></i> 내면의 평화를 위한 심리 명리 처방</h5>
          <p>
            당신의 촉은 90% 이상 맞습니다. 하지만 세상 모든 사람이 당신만큼 섬세하고 깊지는 않습니다. 타인의 둔감함을 ‘악의’나 ‘배신’으로 해석하지 마십시오. 그저 “저 사람은 해상도가 낮은 흑백 TV구나”라고 가볍게 넘기는 둔감력의 연습이 당신의 영혼을 구원합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제11장 ~ 제18장: 10년 대운 제1대운~제8대운 단독 심층 감명서 (8장) -->
    ${daeunChaptersHtml}

    <!-- 제19장: 의명진단학(醫命診斷學) 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 의명진단학(醫命診斷學) 제1편 — 오운육기(五運六氣) 오장육부 허실 진단</div>
      <h3 class="chapter-title">『황제내경』과 『동의보감』으로 해부한 ${user.name}님의 선천 장부(臟腑) 설계도</h3>
      <div class="chapter-prose">
        <p>
          예로부터 진정한 명의(名醫)는 환자의 맥을 짚기 전에 그 사람이 태어난 연월일시의 천기(天氣)와 지기(地氣), 즉 사주팔자의 오행 편중을 먼저 살펴 오장육부의 태과(太過: 지나침)와 불급(不及: 부족함)을 진단했습니다. 이를 동양 의학의 최고 비전인 <strong>의명진단학(醫命診斷學)</strong>이라 합니다.
        </p>
        <p>
          ${user.name}님의 사주 원국 오행 가중치를 정밀 계측한 결과, 선천적으로 가장 과열되기 쉬운 태과(太過) 장부는 <strong>${med.excessOrgan.elKor}에 배속된 [${med.excessOrgan.zang} · ${med.excessOrgan.fu}]</strong>이며, 반대로 선천적 기운이 허약하여 평생 보충해야 할 불급(不及) 장부는 <strong>${med.deficientOrgan.elKor}에 배속된 [${med.deficientOrgan.zang} · ${med.deficientOrgan.fu}]</strong>입니다. 또한 강한 ${med.excessOrgan.elKor} 기운이 상극(相剋)의 법칙에 따라 압박하는 <strong>${med.attackedOrgan.elKor}[${med.attackedOrgan.zang} · ${med.attackedOrgan.fu}]</strong> 역시 연쇄적으로 피로가 누적되는 구조입니다.
        </p>
        <table class="medical-organ-table">
          <thead>
            <tr>
              <th style="width:18%;">진단 구분</th>
              <th style="width:22%;">배속 오장육부</th>
              <th>신체 지배 부위 및 주요 병리 기전</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>태과(太過) 장부</strong><br><span style="color:#f87171;">기운 과잉·과열</span></td>
              <td><strong>${med.excessOrgan.elKor}</strong><br>${med.excessOrgan.zang} · ${med.excessOrgan.fu}</td>
              <td><strong>지배 조직:</strong> ${med.excessOrgan.tissue}<br><strong>발현 병증:</strong> ${med.excessOrgan.excessSymptom}</td>
            </tr>
            <tr>
              <td><strong>불급(不及) 장부</strong><br><span style="color:#38bdf8;">선천 기혈 부족</span></td>
              <td><strong>${med.deficientOrgan.elKor}</strong><br>${med.deficientOrgan.zang} · ${med.deficientOrgan.fu}</td>
              <td><strong>지배 조직:</strong> ${med.deficientOrgan.tissue}<br><strong>발현 병증:</strong> ${med.deficientOrgan.deficientSymptom}</td>
            </tr>
            <tr>
              <td><strong>피극(被剋) 장부</strong><br><span style="color:#fbbf24;">상극 압박 취약</span></td>
              <td><strong>${med.attackedOrgan.elKor}</strong><br>${med.attackedOrgan.zang} · ${med.attackedOrgan.fu}</td>
              <td><strong>지배 조직:</strong> ${med.attackedOrgan.tissue}<br><strong>발현 병증:</strong> 스트레스나 과로 시 ${med.excessOrgan.elKor}의 기운이 ${med.attackedOrgan.elKor}를 침범하여 ${med.attackedOrgan.deficientSymptom}이 급성으로 동반됨</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제20장: 의명진단학(醫命診斷學) 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 의명진단학(醫命診斷學) 제2편 — 한난조습(寒暖燥濕) 체질과 취약 발병 대운</div>
      <h3 class="chapter-title">${med.thermalType}의 병리적 메커니즘과 평생 중점 관리해야 할 질환군</h3>
      <div class="chapter-prose">
        <p>
          오장육부의 강약 못지않게 중요한 것이 태어난 계절(월지 <strong>${JIJI_HANJA[user.pillars.month.branchIdx]}월</strong>)이 부여한 체내의 온도와 습도, 즉 <strong>한난조습(寒暖燥濕)</strong>입니다. ${user.name}님은 의명학적으로 <strong>[${med.thermalType}]</strong>에 해당합니다.
        </p>
        <p>${med.thermalDesc}</p>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-stethoscope"></i> ${user.name}님의 생애 주기별 중점 경계 질환 및 발병 주의 시기</h5>
          <p>
            • <strong>1차 주의 영역 (만성 피로 및 자율신경):</strong> ${med.excessOrgan.emotion}의 감정이 해소되지 못할 때 나타나는 수면의 질 저하와 만성 신경성 염증.<br>
            • <strong>2차 주의 영역 (장부 기질적 약점):</strong> ${med.deficientOrgan.zang} 및 ${med.attackedOrgan.zang} 기능 저하로 인한 대사 순환 장애.<br>
            • <strong>집중 관리 대운:</strong> 대운에서 <strong>${med.excessOrgan.elKor}</strong>가 겹쳐 들어와 태과가 극에 달하거나, 용신 오행이 충(沖)을 맞는 40대 중반 및 50대 후반 교차기에는 반드시 정밀 혈관·내분비·소화기 검진을 선제적으로 시행해야 합니다.
          </p>
        </div>
        <p>
          <strong>[의명 체질 핵심 치법]:</strong> ${med.thermalPrescription}
        </p>
      </div>
    </div>

    <!-- 제21장: 의명진단학(醫命診斷學) 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 21 · 의명진단학(醫命診斷學) 제3편 — 동의보감 약선(藥膳) 식이요법과 본초 처방</div>
      <h3 class="chapter-title">내 몸의 부족한 오행을 채우고 과열된 독소를 씻어내는 밥상 위의 명약(名藥)</h3>
      <div class="chapter-prose">
        <p>
          『동의보감(東醫寶鑑)』은 “약보(藥補)보다 식보(食補)가 낫다”고 하였습니다. 매일 입으로 들어가는 음식의 오미(五味: 신맛·쓴맛·단맛·매운맛·짠맛)와 색채는 그 자체로 사주의 부족한 오행을 보충하는 가장 강력한 개운법이자 예방 의학입니다.
        </p>
        <table class="medical-organ-table">
          <thead>
            <tr>
              <th style="width:24%;">약선 분류</th>
              <th>${user.name}님 맞춤 의명(醫命) 식이 처방전</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🌟 제1 보약 식재료</strong><br>(${med.deficientOrgan.zang} 보강)</td>
              <td><strong>${med.deficientOrgan.medicinalFood}</strong><br>선천적으로 부족한 ${med.deficientOrgan.elKor} 기운을 직접 생조하여 만성 피로를 막고 면역의 뿌리를 단단하게 만듭니다. 주 3회 이상 식단에 포함하십시오.</td>
            </tr>
            <tr>
              <td><strong>🌿 제2 상생 식재료</strong><br>(${med.attackedOrgan.zang} 보호)</td>
              <td><strong>${med.attackedOrgan.medicinalFood}</strong><br>태과한 기운의 공격으로부터 ${med.attackedOrgan.zang}·${med.attackedOrgan.fu} 점막과 대사를 보호하는 완충제 역할을 합니다.</td>
            </tr>
            <tr>
              <td><strong>🍵 상비 약차(藥茶) 처방</strong></td>
              <td><strong>${med.deficientOrgan.teaPrescription}</strong> 및 보조로 <strong>${med.attackedOrgan.teaPrescription}</strong>을 번갈아 따뜻하게 우려 마시면 체내 한난조습이 황금 비율로 조율됩니다.</td>
            </tr>
            <tr>
              <td><strong>🚫 체질상 피해야 할 음식</strong></td>
              <td><strong>${med.deficientOrgan.avoidFood}</strong> / <strong>${med.excessOrgan.avoidFood}</strong><br>특히 피로가 극심한 날에 위 음식들을 섭취하면 장부의 불균형이 가속화되어 운의 흐름까지 탁해집니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제22장: 의명진단학(醫命診斷學) 4 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 22 · 의명진단학(醫命診斷學) 제4편 — 12시진 경락 생체리듬과 양생(養生) 비법</div>
      <h3 class="chapter-title">장수(長壽)와 맑은 정신을 지키는 시간대별 경락 순환 & 맞춤 운동 처방</h3>
      <div class="chapter-prose">
        <p>
          인체의 12경락은 하루 12시진(24시간)의 지지(地支) 흐름에 맞춰 정확히 2시간씩 기혈의 중심을 이동합니다. ${user.name}님의 취약 장부가 활성화되는 시간에 무리한 노동을 하거나 수면을 설칠 경우 남들보다 세 배 이상의 데미지를 입게 됩니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-clock"></i> ${user.name}님이 평생 지켜야 할 골든 타임 (Golden Meridian Time)</h5>
          <p>
            • <strong>핵심 회복 시간대:</strong> ${med.deficientOrgan.meridianTime}<br>
            • <strong>보조 관리 시간대:</strong> ${med.attackedOrgan.meridianTime}
          </p>
        </div>
        <p>
          <strong>[체질 맞춤 운동 및 호흡 처방]:</strong><br>
          ${user.name}님은 관절과 신경계를 과도하게 혹사하는 극단적 고중량 운동이나 심야의 격렬한 유산소 운동보다, <strong>하체 코어와 척추 기립근을 단단히 세우는 웨이트 트레이닝, 필라테스, 빠른 경보(산책), 그리고 단전으로 숨을 깊게 내쉬는 이완 호흡</strong>을 병행할 때 뇌수(腦髓)가 맑아지고 대운의 재물기를 감당할 강인한 체력이 완성됩니다.
        </p>
      </div>
    </div>

    <!-- 제23장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 23 · 평생 재물 그릇과 노후 자산 완성 최종 로드맵</div>
      <h3 class="chapter-title">현금 · 부동산 · 연금 황금 비율과 ${user.name}님 인생의 최종 마스터플랜</h3>
      <div class="chapter-prose">
        <p>
          지금까지 『자평진전』의 격국론, 『궁통보감』의 조후론, 80년 대운 연대기, 그리고 『황제내경·동의보감』의 의명진단학까지 총 23장에 걸쳐 ${user.name}님의 운명 설계도를 남김없이 해부하였습니다.
        </p>
        <p>
          당신의 평생 재물 그릇은 결코 작지 않습니다. 다만 인생의 부를 완성하기 위해서는 연령대별로 자산의 형태를 반드시 갈아타야 합니다. 30~40대에는 <strong>${pattern.name}</strong>의 무기를 앞세워 현금 창출 능력(몸값·사업 소득)을 극대화하고, 대운의 전환기마다 그 현금을 즉시 <strong>환금성 높은 핵심지의 등기 문서(부동산)와 우량 지분 자산</strong>으로 잠가 두십시오.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-award"></i> 제2권 평생 총운 · 의명진단 마스터팩 총결</h5>
          <p>
            "몸이 곧 재물을 담는 그릇이요(醫命), 대운은 그 그릇에 부어지는 하늘의 물줄기입니다. 본 서책에 기록된 용신의 법칙과 의명 섭생법을 곁에 두고 실천하신다면, ${user.name}님의 인생 후반전은 부(富)와 귀(貴), 그리고 건강(康)이 삼위일체를 이루는 반석 위에 우뚝 설 것입니다."
          </p>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 3. 제3권 (match) : 1:1 심층 사주 궁합 & 에로틱 속궁합 (총 20장)
//    - 초반 화법: 재회 기대, 짝사랑, 현재 교제 중, 결혼 준비 중 어느 쪽인지 단정하지 않고 조심스럽게 모든 가능성을 아우르며 진입
//    - 왜 어울리는지, 무엇이 부족한지, 어떻게 채우는지 철저 해부
//    - 데이트 성향, 체질별 맞춤 식재료 & 둘이 함께 먹기 좋은 음식/주류
//    - 국내 여행지 & 해외여행 국가/도시 & 이동수단(비행기·도보·크루즈·렌트카·패키지 vs 자유여행)
//    - 19+ 성인 속궁합 5대 장 (음양수화, 무드/조명/향기, 달아오르게 하는 시작/전희, 체질별 추천 체위/리듬, 애프터케어)
// ============================================================================
function buildMatchReportHtml(user, natureName) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const dayEl = CHEONGAN_ELEMENTS[dayMaster];
  const strength = user.strength;
  const yongshin = user.yongshin;
  const med = diagnoseMedicalSaju(user);

  // 일간 간합(干合) 및 일지 육합(六合) 이상적 짝꿍 산출
  const stemCombMap = [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]; // 갑기, 을경, 병신, 정임, 무계
  const branchCombMap = [1, 0, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 자축, 인해, 묘술, 진유, 사신, 오미
  const partnerStemIdx = stemCombMap[dayMaster];
  const partnerBranchIdx = branchCombMap[dayBranch];
  const partnerEl = CHEONGAN_ELEMENTS[partnerStemIdx];
  const partnerMed = MEDICAL_SAJU_ORGANS[partnerEl];

  return `
    ${buildMyeongshikTableHtml(user)}

    <!-- 제1장: 조심스러운 진입 프롤로그 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 인연의 문턱에서 드리는 첫 말씀 (프롤로그)</div>
      <h3 class="chapter-title">어떤 마음으로 이 페이지를 펼치셨든 — 두 사주의 민낯부터 편견 없이 마주합니다</h3>
      <div class="chapter-prose">
        <p>
          궁합(宮合)이라는 이름으로 누군가의 운명과 내 운명을 나란히 올려놓을 때, 사람의 마음속에는 참으로 다른 결의 간절함이 담겨 있습니다. 어쩌면 지금 ${user.name}님께서는 <strong>이미 헤어진 사람의 연락이나 재회(再會)의 가능성</strong>을 남몰래 기다리고 계실지도 모릅니다. 혹은 아직 마음을 고백하지 못한 채 <strong>혼자 애태우는 짝사랑의 상대</strong>가 나를 어떻게 볼지 궁금해 밤을 지새우셨을 수도 있고, <strong>현재 뜨겁게 교제 중인 연인이나 결혼을 약속한 상대</strong>와 과연 평생을 함께해도 좋을지 마지막 확신을 얻고 싶어 문을 두드리셨을 수도 있습니다.
        </p>
        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-feather-pointed"></i> 천문(天門) 궁합 감명소의 약속 — 단정 짓지 않는 정밀 해부</h5>
          <p>
            그렇기에 본 감명서는 “두 분은 지금 사귀는 사이이니 이렇게 하십시오”라는 식의 섣부른 전제나 한쪽으로 치우친 위로로 시작하지 않습니다. 현재 두 분의 관계가 <strong>재회 전야이든, 짝사랑의 탐색기이든, 혹은 깊은 연인 관계이든 상관없이</strong>, 철저하게 <strong>‘두 개의 사주 원국이 만났을 때 일어나는 오행의 화학반응’</strong> 그 자체를 가장 객관적이고 집요하게 해부합니다. 왜 서로에게 끌릴 수밖에 없는지, 무엇이 결정적으로 부족한지, 그리고 식탁과 여행지부터 가장 내밀한 침실의 온도에 이르기까지 두 사주가 완벽히 맞물리려면 무엇이 필요한지 지금부터 낱낱이 밝혀드립니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 본원(本元)의 이끌림과 일주(日柱) 구조 해부</div>
      <h3 class="chapter-title">${user.name}님의 [${natureName}]이 본능적으로 갈구하는 상대의 파장</h3>
      <div class="chapter-prose">
        <p>
          사람과 사람이 스쳐 지나가는 수많은 인연 중 유독 한 사람에게 시선이 꽂히고 가슴이 내려앉는 이유는 외모나 스펙 때문이 아닙니다. 내 사주의 일간 <strong>${CHEONGAN_HANJA[dayMaster]}(${CHEONGAN[dayMaster]})</strong>과 일지 배우자궁 <strong>${JIJI_HANJA[dayBranch]}(${JIJI[dayBranch]})</strong>가 자신이 갖지 못한 오행의 조각을 상대방에게서 본능적으로 감지했기 때문입니다.
        </p>
        <p>
          ${user.name}님은 겉으로는 독립적이고 이성적인 방어막을 치고 있지만, 내면 깊은 곳에서는 나의 조후적 갈증(<strong>${yongshin.johuYongshin}</strong>)을 따뜻하게 혹은 시원하게 적셔주고, 나의 천간과 정신적 공명을 일으키는 <strong>${CHEONGAN_HANJA[partnerStemIdx]}(${CHEONGAN[partnerStemIdx]} · ${ELEMENT_KOREAN[partnerEl]})</strong> 계열의 에너지, 그리고 일지 배우자궁을 안정시키는 <strong>${JIJI_HANJA[partnerBranchIdx]}(${JIJI[partnerBranchIdx]})</strong>의 포용력을 가진 상대에게 거부할 수 없는 자력을 느낍니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-magnet"></i> 왜 두 사주는 서로를 돌아보게 되는가</h5>
          <p>
            한쪽이 주도적인 에너지를 뿜어낼 때 다른 한쪽이 이를 받아내는 그릇이 되거나, 서로의 가장 고독한 새벽의 정서를 말없이도 알아채는 지장간의 공명(共鳴)이 작동하기 때문입니다. 이 이끌림은 머리로 통제하려 해도 쉽게 꺼지지 않는 숙명적 인력입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제3장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 03 · 왜 어울리는가 — 오행의 상생(相生)과 강점 시너지</div>
      <h3 class="chapter-title">두 사주가 나란히 설 때 폭발하는 현실적·정서적 플러스 역학</h3>
      <div class="chapter-prose">
        <p>
          좋은 궁합이란 두 사람이 똑같은 성향을 가진 것이 아니라, <strong>한 사람의 사각지대를 다른 사람의 시야가 정확히 메워주는 구조</strong>입니다. ${user.name}님의 원국(${strength.title})과 상대방의 사주가 맞물릴 때 만들어지는 최대의 강점은 다음과 같습니다.
        </p>
        <p>
          • <strong>정서적 완충 작용:</strong> ${user.name}님이 사회적 압박이나 완벽주의로 인해 신경이 곤두서 있을 때, 상대의 오행 파장이 당신의 태과한 <strong>${med.excessOrgan.elKor}</strong> 기운을 자연스럽게 설기(洩氣: 부드럽게 빼냄)시켜 심리적 안도감을 줍니다.<br>
          • <strong>현실적 재물·문서의 결합:</strong> 혼자 있을 때는 벌기만 하고 모으지 못하거나, 반대로 생각만 많고 실행을 주저하던 일이 두 사람의 기운이 합쳐지는 순간 ‘기획(식상) → 실행(재성) → 문서화(인성)’의 톱니바퀴가 완성되어 함께 있을 때 금전운과 사회적 운세가 동반 상승합니다.
        </p>
      </div>
    </div>

    <!-- 제4장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 04 · 무엇이 부족한가 — 결핍의 구멍과 채워야 할 제3의 오행</div>
      <h3 class="chapter-title">두 사주 사이에서 비어 있는 틈새와 이를 메우는 관계 개운법</h3>
      <div class="chapter-prose">
        <p>
          세상에 100점짜리 완벽한 원국 궁합은 존재하지 않습니다. 아무리 천생연분이라 불리는 사주도 두 명식을 합쳐 놓으면 반드시 <strong>어느 한 오행이 과열되거나, 반대로 두 사람 모두에게 결핍된 오행의 사각지대</strong>가 드러납니다.
        </p>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-puzzle-piece"></i> 두 사주에서 가장 결핍되기 쉬운 고리와 보완 처방</h5>
          <p>
            • <strong>무엇이 부족한가:</strong> ${user.name}님의 원국에서 가장 희소한 <strong>${med.deficientOrgan.elKor}</strong> 기운과 조후용신(<strong>${yongshin.johuYongshin}</strong>)이 상대방에게서도 충분히 공급되지 않을 경우, 두 사람 모두 자존심을 세우며 먼저 사과하지 않는 ‘냉전(冷戰)’이나 대화가 겉도는 ‘소통의 단절’이 발생합니다.<br>
            • <strong>채우려면 무엇이 필요한가:</strong> 두 사람만의 감정으로만 부딪히지 말고, 결핍된 오행을 상징하는 <strong>‘공통의 취미, 함께 키우는 식물이나 반려동물, 공동의 저축 계좌, 혹은 물가·숲길에서의 정기적인 산책’</strong>이라는 제3의 완충 매개체를 두 사람 사이에 두어야 부족한 오행이 완벽히 메워집니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제5장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 05 · 상황별 맞춤 전략 ① — [짝사랑 · 썸 · 탐색기]인 경우</div>
      <h3 class="chapter-title">아직 닿지 않은 마음을 내 쪽으로 기울게 만드는 사주 공략법</h3>
      <div class="chapter-prose">
        <p>
          만약 현재 ${user.name}님이 그 사람을 남몰래 지켜보거나 아슬아슬한 썸의 단계에 머물러 계신다면, 상대의 사주 방어벽을 무너뜨리는 방법은 ‘맹목적인 헌신’이 아닙니다.
        </p>
        <p>
          상대의 본능적 경계심을 풀기 위해서는 먼저 ${user.name}님 특유의 <strong>${CHEONGAN[dayMaster]}(${CHEONGAN_HANJA[dayMaster]})</strong> 일간이 가진 지적인 여유와 안정감을 보여주어야 합니다. 조급하게 “우린 무슨 사이야?”라고 확답을 독촉하면 상대의 인성·관성 방어기제가 작동하여 뒷걸음질 칩니다. 대신 상대가 일상에서 가장 피로해하는 시간대(오후 늦은 시간이나 주말 저녁)에 부담 없는 미식(美食) 제안이나 실용적인 도움을 건네며 <strong>‘이 사람 곁에 있으면 내 마음이 참 편해진다’</strong>는 조후적 각인을 먼저 심어주십시오.
        </p>
      </div>
    </div>

    <!-- 제6장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 06 · 상황별 맞춤 전략 ② — [이별 후 재회(再會)를 고민하는] 경우</div>
      <h3 class="chapter-title">끊어진 줄 알았던 인연의 실타래 — 언제, 어떤 명분으로 다시 닿는가</h3>
      <div class="chapter-prose">
        <p>
          만약 두 분이 이미 한 차례 아픈 이별을 겪었거나 연락이 끊긴 상태에서 이 궁합서를 보고 계신다면, 가장 먼저 짚어야 할 것은 <strong>‘그 이별이 합(合)이 풀린 끝이었는가, 아니면 충(沖)으로 인한 일시적 폭발이었는가’</strong>입니다.
        </p>
        <p>
          ${user.name}님의 일지 ${JIJI_HANJA[dayBranch]} 구조상, 감정적 자존심 대립으로 홧김에 돌아선 이별은 지지 암합(暗合)의 여운이 길게 남아 상대방 역시 밤마다 당신의 빈자리를 의식하게 됩니다. 다만 재회를 원하신다면 눈물 섞인 장문의 메시지는 절대 금물입니다. 최소 <strong>45일~60일의 침묵기(냉각기)</strong>를 거쳐 상대의 방어기제가 가라앉고 월운에서 <strong>육합(六合)이나 식상운</strong>이 들어오는 시점에, 아무 일 없었다는 듯 담백하고 밝은 안부나 구체적인 용건 하나로 물꼬를 터야 재회의 문이 열립니다.
        </p>
      </div>
    </div>

    <!-- 제7장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 07 · 상황별 맞춤 전략 ③ — [현재 교제 중 · 결혼을 앞둔] 경우</div>
      <h3 class="chapter-title">설렘을 넘어 평생의 동반자로 — 주도권 조율과 공동 자산의 결합</h3>
      <div class="chapter-prose">
        <p>
          현재 두 분이 안정적으로 교제 중이거나 부부의 연을 맺고(혹은 앞두고) 계신다면, 이 궁합의 핵심 과제는 <strong>‘생활 리듬의 분리와 재무적 투명성’</strong>입니다.
        </p>
        <p>
          ${user.name}님은 아무리 사랑하는 사이라도 하루 중 최소 1~2시간은 온전히 혼자만의 동굴(시간과 공간)이 보장되어야 에너지가 충전되는 명식입니다. 서로의 휴대폰이나 일거수일투족을 통제하려 하기보다 각자의 독립된 영역을 존중해 줄 때 오히려 애착이 깊어집니다. 또한 결혼이나 동거 시에는 생활비 통장과 장기 투자 통장을 명확히 분리하고, 문서(부동산·청약) 명의나 계약을 진행할 때는 두 사람 중 <strong>인성(印星)과 재성(財星)의 뿌리가 더 튼튼한 쪽</strong>을 전면에 내세우는 것이 가문의 부를 빠르게 불리는 비결입니다.
        </p>
      </div>
    </div>

    <!-- 제8장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 08 · 다툼의 뇌관과 화해의 언어학</div>
      <h3 class="chapter-title">두 사람이 싸우게 되는 진짜 이유와 상대의 분노를 즉시 잠재우는 한마디</h3>
      <div class="chapter-prose">
        <p>
          두 사주가 충돌할 때 표면적인 이유는 연락 빈도, 말투, 시간 약속 같은 사소한 것들이지만, 명리학적 본질은 <strong>‘인정 욕구(관성·인성)’와 ‘표현 방식(식상)’의 온도 차</strong>에 있습니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-comments"></i> 갈등 폭발을 막는 대화의 골든 룰</h5>
          <p>
            • <strong>절대 하지 말아야 할 말:</strong> “원래 다 그런 거야”, “네가 너무 예민한 거 아니야?”, “알아서 해” — 이 세 마디는 상대의 일지 자존심을 정면으로 찌르는 현침(懸針)이 됩니다.<br>
            • <strong>상대를 즉시 무장해제시키는 마법의 문장:</strong> 논리적 시시비비를 가리기 전에 <strong>“네가 그렇게 느꼈다면 내 표현이 부족했어. 우리 맛있는 거 먹고 천천히 다시 얘기하자”</strong>라고 먼저 감정의 온도를 낮춰주면 10시간 갈 싸움이 10분 만에 끝납니다.
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
          사람이 붐비고 소음이 가득한 핫플레이스에서 기가 빨리는 커플이 있는가 하면, 너무 정적인 공간에 있으면 어색해지는 커플이 있습니다. ${user.name}님의 <strong>${natureName}</strong>과 상대방의 오행 조화를 극대화하는 데이트 성향은 <strong>‘프라이빗한 감각적 몰입’과 ‘자연 속의 개방감’을 교차하는 코스</strong>입니다.
        </p>
        <p>
          • <strong>최고의 데이트 무드:</strong> 대기 줄이 길고 시끄러운 번화가보다는, 사전 예약된 조용한 다이닝 바, 통유리로 강물이나 숲이 내려다보이는 라운지, 심야의 한적한 드라이브, 혹은 함께 손을 움직여 결과물을 만드는 원데이 클래스(향수 조향, 도자기, 쿠킹)가 두 사람의 심리적 거리를 단숨에 좁혀줍니다.<br>
          • <strong>피해야 할 데이트:</strong> 동선이 계획되지 않은 상태에서 폭염이나 혹한 속에 오래 걷게 만드는 일정은 두 사람의 조후 밸런스를 깨뜨려 사소한 짜증을 유발합니다.
        </p>
      </div>
    </div>

    <!-- 제10장: 체질 맞춤 식재료 (신규 디테일 요구사항) -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 10 · 의명(醫命) 식궁합 제1편 — 각 사주의 체질에 맞는 핵심 식재료</div>
      <h3 class="chapter-title">내 몸을 살리는 식재료와 상대의 기운을 돋우는 식재료의 음양 배합</h3>
      <div class="chapter-prose">
        <p>
          연인이나 부부가 평생 가장 많이 함께하는 행위가 바로 ‘식사(食事)’입니다. 의명진단학적으로 볼 때, 각자의 사주 체질(<strong>${med.thermalType}</strong>)에 맞는 식재료를 알고 함께 섭취하면 식탁 위에서 서로의 부족한 오행이 채워지고 몸과 마음의 활력이 동시에 살아납니다.
        </p>
        <table class="medical-organ-table">
          <thead>
            <tr>
              <th style="width:24%;">구분</th>
              <th>체질 맞춤 추천 식재료 및 오행 보완 원리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>${user.name}님의 체질 식재료</strong><br>(${med.deficientOrgan.elKor}·${med.attackedOrgan.elKor} 보강)</td>
              <td><strong>핵심 식재료:</strong> ${med.deficientOrgan.medicinalFood}<br><strong>보조 식재료:</strong> ${med.attackedOrgan.medicinalFood}<br>→ ${user.name}님의 선천적 약점인 ${med.deficientOrgan.zang}의 기혈을 채우고 신경계의 피로를 씻어주는 생명 식재료입니다.</td>
            </tr>
            <tr>
              <td><strong>상대방과의 조화 식재료</strong><br>(${partnerMed.elKor}·조후 밸런스)</td>
              <td><strong>핵심 식재료:</strong> ${partnerMed.medicinalFood}<br>→ 두 사람이 함께 만날 때 서로의 체온 차이를 맞추고 혈액 순환과 호르몬 분비를 촉진하는 음양 조화 식재료입니다.</td>
            </tr>
            <tr>
              <td><strong>함께 피해야 할 상극 식재료</strong></td>
              <td>지나치게 차가운 얼음 음료와 트랜스지방이 많은 야식 튀김류는 두 사람의 비위(脾胃)를 냉하게 하여 데이트 후반부의 컨디션과 밤의 열정을 동시에 떨어뜨립니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제11장: 둘이 함께 먹기 좋은 음식 종류와 주류 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 11 · 의명(醫命) 식궁합 제2편 — 둘이 함께 먹기 좋은 베스트 요리 & 주류</div>
      <h3 class="chapter-title">화해가 필요할 때, 설렘을 깨울 때, 깊은 밤을 준비할 때 함께 먹을 최고의 메뉴</h3>
      <div class="chapter-prose">
        <p>
          단순한 식재료 나열을 넘어, 두 분이 데이트나 기념일, 혹은 여행지에서 함께 마주 앉아 먹었을 때 오행의 상생(相生)이 가장 완벽하게 일어나는 구체적인 음식 종류를 처방합니다.
        </p>
        <p>
          • <strong>1. 기운을 북돋고 텐션을 끌어올리는 메인 요리 (화·수 수승화강 요리):</strong><br>
          따뜻한 육수에 신선한 채소와 소고기를 살짝 익혀 먹는 <strong>스키야키·샤브샤브</strong>, 해산물과 마늘·올리브오일이 어우러진 <strong>지중해식 해산물 스튜(부야베스)·감바스</strong>, 강황과 향신료로 속을 데우는 <strong>양갈비 스테이크 및 숙성 한우 화로구이</strong>, 그리고 장어 덮밥(히츠마부시)이나 전복 솥밥 같은 보양 다이닝이 두 사람의 신장(水)과 심장(火) 에너지를 동시에 깨웁니다.<br><br>
          • <strong>2. 서먹한 공기를 녹이고 속마음을 열게 하는 주류 & 티 페어링:</strong><br>
          배가 부르고 몸이 차가워지는 라거 맥주보다는, 체온을 은은하게 올리고 혈관을 이완시키는 <strong>피노 누아(Pinot Noir)나 쉬라즈 계열의 레드 와인, 따뜻한 도쿠리(온사케), 피트 향이 은은한 싱글몰트 위스키 하이볼</strong>, 혹은 술을 마시지 않는 날에는 <strong>오미자·히비스커스 블렌딩 티</strong>가 두 사람의 감각을 가장 매혹적으로 열어줍니다.
        </p>
      </div>
    </div>

    <!-- 제12장: 국내 여행지 추천 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 12 · 여행 궁합 제1편 — 두 사주의 오행을 채우는 국내 베스트 여행지</div>
      <h3 class="chapter-title">산(山)인가 바다(海)인가 — 떠나기만 해도 사이가 깊어지는 국내 개운 여행지</h3>
      <div class="chapter-prose">
        <p>
          여행지는 그 땅이 품고 있는 지기(地氣: 수기·목기·화기·금기)를 두 사람의 몸으로 직접 흡수하는 거대한 풍수 처방입니다. ${user.name}님(조후용신: <strong>${yongshin.johuYongshin}</strong>)과 상대방이 함께 떠났을 때 다툼 없이 깊은 정서적 교감을 나누는 국내 여행지는 다음과 같습니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:26%;">오행 테마</th>
              <th>추천 국내 여행지 및 숙소 스타일</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🌊 수(水)·목(木) 보충</strong><br>휴식과 재충전이 필요할 때</td>
              <td><strong>강릉·양양 해안선, 남해·여수 다도해, 제주 서귀포·애월</strong><br>→ 탁 트인 수평선이 한눈에 들어오는 오션뷰 독채 풀빌라나 노천 자쿠지가 딸린 프라이빗 리조트가 두 사람의 막힌 기혈을 단숨에 뚫어줍니다.</td>
            </tr>
            <tr>
              <td><strong>🌲 목(木)·토(土) 안정</strong><br>깊은 대화와 치유가 필요할 때</td>
              <td><strong>평창·정선 깊은 숲속, 경주 한옥 스테이, 담양·보성 녹차밭</strong><br>→ 피톤치드가 풍부한 고지대 숲속 스테이나 고즈넉한 한옥 독채에서 불멍(火)과 반신욕(水)을 함께 즐기면 마음의 벽이 허물어집니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제13장: 해외여행 국가 및 도시 추천 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 13 · 여행 궁합 제2편 — 해외여행 추천 국가 및 도시 매칭</div>
      <h3 class="chapter-title">비행기를 타고 국경을 넘을 때 두 사람의 운을 가장 크게틔워줄 해외 도시</h3>
      <div class="chapter-prose">
        <p>
          해외여행은 일상의 관성에서 완전히 벗어나 두 사람만의 밀도 높은 시간을 공유하는 최고의 관계 전환점입니다. 두 사주의 한난조습과 오행 밸런스에 가장 완벽하게 부합하는 해외 국가와 도시는 다음 3대 권역입니다.
        </p>
        <p>
          • <strong>1. 근거리 낭만 & 온천·미식 (일본 큐슈 유후인·벳푸 / 홋카이도 삿포로·오타루 / 교토):</strong><br>
          정갈한 가이세키 요리(식궁합)와 프라이빗 료칸 노천온천(수승화강)이 결합된 일본 소도시 여행은 두 사람의 피로를 극적으로 낮추고 밤의 친밀도를 최고조로 끌어올립니다.<br><br>
          • <strong>2. 중거리 휴양 & 트로피컬 에너지 (발리 우붓·스미냑 / 베트남 푸꾸옥·나트랑 / 태국 코사무이):</strong><br>
          원국이 차갑거나(한습) 도심의 빌딩 숲(금·토 과다)에 지쳐 있을 때, 열대의 태양(丙火)과 울창한 정글(甲木), 그리고 에메랄드빛 바다(壬水)가 만나는 동남아 럭셔리 풀빌라는 두 사람의 생명력과 에로티시즘을 동시에 폭발시킵니다.<br><br>
          • <strong>3. 장거리 예술 & 지중해의 태양 (이탈리아 아말피·피렌체 / 스페인 바르셀로나·세비야 / 포르투갈 리스본·포르투):</strong><br>
          신혼여행이나 인생의 큰 기념일에는 따사로운 지중해의 햇살과 와인, 그리고 예술적 영감(화개·문창)이 살아 숨 쉬는 남유럽 해안 도시가 평생 잊지 못할 결속을 선물합니다.
        </p>
      </div>
    </div>

    <!-- 제14장: 여행 이동수단 및 방식 (신규 디테일 요구사항) -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 14 · 여행 궁합 제3편 — 비행기·도보·크루즈·렌트카 & 패키지 vs 자유여행</div>
      <h3 class="chapter-title">여행지에서 절대 싸우지 않는 이동수단 선택과 여행 방식의 황금 비율</h3>
      <div class="chapter-prose">
        <p>
          아무리 좋은 여행지를 골라도 ‘이동하는 과정’과 ‘여행 스타일’이 사주 체질과 맞지 않으면 공항이나 도로 위에서 감정이 상하기 쉽습니다. 두 분의 사주 기동력(역마·인성·식상)에 맞춘 정밀 여행 설계도입니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:26%;">이동수단 · 여행 방식</th>
              <th>두 사주 맞춤 적합도 및 실전 운영 가이드</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>✈️ 비행기 (항공 이동)</strong></td>
              <td>중장거리(4시간 이상) 비행 시에는 저가항공의 좁은 좌석이나 심야 레드아이(밤샘) 항공편이 ${user.name}님의 ${med.deficientOrgan.zang} 피로를 급격히 유발합니다. 출도착 시간이 여유로운 국적기나 레그룸이 넓은 좌석을 선택하고, 기내에서 따뜻한 수분을 충분히 섭취하십시오.</td>
            </tr>
            <tr>
              <td><strong>🚗 렌트카 vs 🚶 도보 이동</strong></td>
              <td>무거운 짐을 들고 대중교통을 환승하거나 하루 2만 보 이상 강행군하는 <strong>극단적 도보 여행은 갈등의 1순위 원인</strong>입니다. 핵심 거점 간 이동은 반드시 <strong>렌트카(자차)나 프라이빗 픽업 차량(택시/그랩)</strong>을 이용해 두 사람만의 쾌적한 공간과 체력을 아끼고, 도보는 저녁노을이 지는 해변이나 구시가지 골목을 <strong>1시간 이내로 가볍게 산책</strong>하는 코스로 제한하십시오.</td>
            </tr>
            <tr>
              <td><strong>🛳️ 크루즈 · 요트 투어</strong></td>
              <td>짐을 풀고 싸는 이동 피로 없이 바다(水) 위에서 미식과 공연을 즐기는 <strong>크루즈 여행이나 선셋 프라이빗 요트 투어</strong>는 두 사주에 최고 등급(★★★★★)의 궁합을 자랑합니다. 물의 파장이 두 사람의 긴장을 완전히 녹여줍니다.</td>
            </tr>
            <tr>
              <td><strong>🎒 패키지상품 vs 자유여행</strong></td>
              <td>깃발을 따라 새벽부터 움직이고 원치 않는 쇼핑센터에 들러야 하는 <strong>전통적 단체 패키지 상품은 ${user.name}님의 독립적 일주 기질과 극도로 상극</strong>입니다. 반면 모든 기차표와 식당을 일일이 검색하느라 한쪽이 독박을 쓰는 무계획 자유여행도 피로를 부릅니다. 정답은 <strong>‘숙소와 핵심 투어(반나절 프라이빗 가이드 투어)만 사전 예약해 두고, 나머지 절반의 시간은 완벽한 자유시간으로 비워두는 세미 자유여행(에어텔+데이투어)’</strong>입니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제15장: 성인(19+) 속궁합 1 - 음양수화 교접 원리 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 15 · [19+ 성인 비전] 심층 속궁합 제1편 — 음양(陰陽)과 수화(水火)의 육체적 자력</div>
      <h3 class="chapter-title">이성(理性)의 옷을 벗었을 때 드러나는 두 육체의 본능적 온도와 케미스트리</h3>
      <div class="chapter-prose">
        <p>
          동양 방중술(房中術)과 명리학에서 남녀의 성적 결합은 단순한 쾌락의 발산이 아니라, <strong>하늘의 양기(火)와 땅의 음기(水)가 교접하여 서로의 생명력을 충전하는 수승화강(水昇火降)의 의식</strong>입니다. 낮의 성격 궁합이 평범하더라도 밤의 속궁합이 완벽히 맞물리는 커플은 어떤 위기가 와도 쉽게 헤어지지 못합니다.
        </p>
        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-fire-flame-curved"></i> ${user.name}님의 숨겨진 에로틱 본능 (${natureName})</h5>
          <p>
            일상에서 ${user.name}님은 자제력이 강하고 정돈된 모습을 유지하지만, 침실의 문이 닫히고 완전한 신뢰와 몰입이 형성되는 순간 내면의 지장간(<strong>${HIDDEN_STEMS[dayBranch].map(i => CHEONGAN_HANJA[i]).join('·')}</strong>)에 응축되어 있던 농밀한 정념과 소유욕이 깨어납니다. 처음에는 서서히 예열되는 듯 보이나, 한 번 임계점을 넘으면 상대방의 숨결 하나까지 완벽히 장악하거나 반대로 온몸의 통제권을 상대에게 맡기며 깊이 침잠하는 반전의 관능미를 지니고 있습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제16장: 성인(19+) 속궁합 2 - 둘에게 잘 맞는 무드(조명·향기·온도) -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 16 · [19+ 성인 비전] 심층 속궁합 제2편 — 두 사람을 무장해제시키는 침실 무드 설계</div>
      <h3 class="chapter-title">조명 · 향기 · 온도 · 사운드 — 이성의 경계심을 녹이는 감각의 무대 장치</h3>
      <div class="chapter-prose">
        <p>
          ${user.name}님과 상대방의 사주 체질은 시각적·후각적 공간 분위기에 따라 성적 각성도가 200% 이상 차이 납니다. 형광등이 환하게 켜진 건조한 방이나 정리가 안 된 어수선한 공간에서는 뇌의 전두엽(이성·검열)이 꺼지지 않아 깊은 오르가슴에 도달하기 어렵습니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:25%;">감각 요소</th>
              <th>두 사주의 본능을 깨우는 최적의 무드(Mood) 세팅</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🕯️ 조명과 색온도</strong></td>
              <td>천장 주조명은 완전히 끄고, 침대 하단이나 협탁에 <strong>2700K 이하의 따뜻한 앰버(호박색) 간접 조명이나 캔들 워머</strong> 하나만 켜두십시오. 서로의 실루엣과 눈빛만 은은하게 비치는 반음영(半陰影) 상태가 수치심을 지우고 대담함을 끌어올립니다.</td>
            </tr>
            <tr>
              <td><strong>🌿 시그니처 향기 (Aroma)</strong></td>
              <td>인공적인 독한 향수 대신, 신경계를 이완시키고 성적 호르몬을 자극하는 <strong>샌달우드(백단향), 일랑일랑, 머스크, 혹은 베르가못과 로즈우드</strong> 계열의 디퓨저나 바디 오일을 침실에 머금게 하십시오.</td>
            </tr>
            <tr>
              <td><strong>🌡️ 온도와 텍스처</strong></td>
              <td>침실 공기는 약간 서늘한 듯(21~22℃) 유지하되, 피부에 닿는 침구는 바스락거리고 포근한 고밀도 호텔식 코튼이나 실크 소재를 사용하여 <strong>‘이불 속 두 사람의 체온’이 더욱 뜨겁게 대비</strong>되도록 연출하는 것이 핵심입니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제17장: 성인(19+) 속궁합 3 - 어떤 시작이 서로를 달아오르게 하는가 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 17 · [19+ 성인 비전] 심층 속궁합 제3편 — 서로를 단숨에 달아오르게 하는 시작과 전희(Foreplay)</div>
      <h3 class="chapter-title">성급한 본론보다 아찔한 예고편 — 뇌와 피부를 먼저 적시는 스위치(Switch)</h3>
      <div class="chapter-prose">
        <p>
          두 사람의 사주 구조상, 아무런 정서적·감각적 빌드업 없이 곧바로 육체적 삽입이나 직접적인 성감대 접촉으로 들어가는 것은 최악의 감점 요인입니다. 두 사람을 진짜 미치게 만드는 것은 <strong>‘침실에 들어가기 2시간 전부터 시작되는 심리적 전희’</strong>와 <strong>‘간지럽고 집요한 말초 신경의 자극’</strong>입니다.
        </p>
        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-fire"></i> 서로를 달아오르게 하는 3단계 점화(Ignition) 시퀀스</h5>
          <p>
            • <strong>1단계 (언어와 시선의 예고):</strong> 밖에서 나란히 술이나 차를 마실 때 테이블 아래로 은밀하게 손끝이나 무릎을 스치며, 귓가에 낮고 느린 목소리로 <em>“오늘 집에 가면 그냥 안 재울 거야”</em> 혹은 <em>“오늘따라 네 향기가 너무 좋다”</em>라는 확신에 찬 시그널을 먼저 던지십시오.<br>
            • <strong>2단계 (수승화강 온열 스킨십):</strong> 침대에 눕기 전 함께 따뜻한 물로 샤워를 하거나, 물기가 채 마르지 않은 상태에서 목덜미·귀 뒤쪽·쇄골·척추 기립근 라인을 따라 손바닥의 온기와 입술로 천천히 쓸어내리는 것이 ${user.name}님의 경락 스위치를 단숨에 켭니다.<br>
            • <strong>3단계 (호흡과 속삭임):</strong> 급하게 옷을 벗기기보다 옷 위로 전해지는 체온과 거칠어지는 숨소리를 귀 가까이에서 들려주며, 상대가 스스로 애원하며 매달릴 때까지 템포를 늦추는 ‘밀당형 전희’가 두 사람의 흥분도를 극한으로 끌어올립니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제18장: 성인(19+) 속궁합 4 - 체질과 오행에 맞는 추천 체위와 리듬 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 18 · [19+ 성인 비전] 심층 속궁합 제4편 — 오행 체질별 추천 체위(Positions)와 리듬의 변주</div>
      <h3 class="chapter-title">깊이감 · 각도 · 시선 교환 — 두 사람의 신장과 심장을 완전히 공명시키는 결합 기술</h3>
      <div class="chapter-prose">
        <p>
          사주의 일간·일지 강약과 의명학적 체질(<strong>${med.thermalType}</strong>, 취약 장부: <strong>${med.deficientOrgan.zang}</strong>)을 고려할 때, 특정 관절에 무리를 주지 않으면서도 두 사람의 성감대와 정서적 일체감을 극대화하는 체위와 리듬의 조합은 명확히 정해져 있습니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:26%;">추천 체위 시퀀스</th>
              <th>체위별 감각 포인트 및 리듬 가이드</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. 도입부 (정서적 밀착)</strong><br>밀착 대면위 & 로터스(연꽃) 변형</td>
              <td>초반에는 서로의 눈빛과 표정을 가까이서 확인하고 가슴(심장·火)과 가슴이 완전히 맞닿는 <strong>밀착형 대면 자세(또는 서로 마주 안고 앉는 로터스 자세)</strong>로 시작하십시오. 골반 아래에 도톰한 베개를 받쳐 각도를 살짝 높이면 무리한 힘 없이도 가장 깊은 내벽의 스팟이 부드럽게 자극됩니다.</td>
            </tr>
            <tr>
              <td><strong>2. 중반부 (주도권의 반전)</strong><br>여성/상대 상위 & 측면 스푸닝(Spooning)</td>
              <td>예열이 끝난 중반부에는 평소 관계에서 차분하던 쪽이 위로 올라타 속도와 깊이를 직접 통제하는 <strong>상위 자세</strong>로 시각적 쾌감을 극대화하십시오. 만약 체력 소모가 있거나 긴 밤을 원할 때는 옆으로 나란히 누워 뒤에서 감싸 안고 결합하는 <strong>스푸닝(측위)</strong> 자세가 허리(신장) 부담을 줄이면서 귀에 속삭임과 애무를 동시에 줄 수 있어 최고의 만족도를 줍니다.</td>
            </tr>
            <tr>
              <td><strong>3. 절정부 (야성적 몰입)</strong><br>상체를 낮춘 후배위 변형</td>
              <td>마지막 절정으로 치달을 때는 상체를 침대에 깊게 숙이고 골반만 밀착시키는 <strong>변형 후배위(Prone Bone)</strong>가 원초적인 정복감과 가장 깊숙한 마찰력을 선사합니다. 이때도 한쪽 손을 깍지 끼거나 등 전체를 감싸 안아 정서적 연결을 놓지 않는 것이 핵심입니다.</td>
            </tr>
          </tbody>
        </table>
        <p>
          <strong>[황금 리듬의 법칙 — 구천일심(九淺一深)의 현대적 변주]:</strong> 처음부터 끝까지 똑같은 빠른 속도로 몰아붙이는 것은 하수의 방식입니다. 얕고 부드럽게 애태우는 움직임과, 숨이 턱 막힐 만큼 깊숙이 밀착하여 2~3초간 정지한 채 내벽의 수축을 함께 느끼는 <strong>‘완급 조절(Slow & Deep)’</strong>이 결합될 때 두 사람은 전신에 전율이 흐르는 절정을 경험하게 됩니다.
        </p>
      </div>
    </div>

    <!-- 제19장: 성인(19+) 속궁합 5 - 권태기 타파 & 애프터케어 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · [19+ 성인 비전] 심층 속궁합 제5편 — 권태기 타파 시나리오와 결정적 애프터케어</div>
      <h3 class="chapter-title">절정 직후의 10분이 평생의 사랑을 결정한다 — 영혼을 묶어두는 여운의 기술</h3>
      <div class="chapter-prose">
        <p>
          ${user.name}님의 사주에서 가장 민감하게 반응하는 순간은 사실 절정의 순간이 아니라 <strong>‘관계가 끝난 직후의 10분(Aftercare)’</strong>입니다. 절정 직후 곧바로 등을 돌리고 스마트폰을 보거나 잠들어 버리면, ${natureName}의 내면에는 설명할 수 없는 공허함과 정서적 냉각이 급격히 찾아옵니다.
        </p>
        <div class="erotic-secret-box">
          <h5><i class="fa-solid fa-heart"></i> 권태기를 원천 차단하는 애프터케어 & 판타지 처방</h5>
          <p>
            • <strong>필수 애프터케어:</strong> 숨이 가라앉을 때까지 절대 몸을 바로 떼지 마십시오. 최소 5분 이상 살결을 맞댄 채 이마와 볼에 가벼운 입맞춤을 나누고, 따뜻한 물 한 잔을 챙겨주며 <em>“너랑 있을 때가 제일 좋아”</em>라는 확언을 건네는 것이 상대의 뇌리에 당신을 평생 지울 수 없는 중독으로 각인시킵니다.<br>
            • <strong>익숙함을 깨는 변화구:</strong> 교제 기간이 길어져 텐션이 떨어질 때는 집이라는 익숙한 공간을 벗어나, 앞서 추천한 <strong>프라이빗 료칸이나 오션뷰 호텔</strong>로 장소를 옮기거나 평소 입지 않던 실크 로브·새로운 향수를 매개체로 작은 역할극적 긴장감을 불어넣으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제20장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 두 사람의 인연이 결실을 맺는 대길(大吉) 시기와 에필로그</div>
      <h3 class="chapter-title">고백 · 재회 · 프러포즈 · 혼인신고의 길일과 두 운명의 최종 축복</h3>
      <div class="chapter-prose">
        <p>
          아무리 좋은 씨앗도 땅이 얼어붙은 날에 뿌리면 싹을 틔우지 못합니다. 두 분의 관계에서 중요한 전환점(고백, 재회 연락, 양가 상견례, 동거 시작, 결혼식 및 혼인신고)을 결행하기에 가장 좋은 시기는 ${user.name}님의 일지 <strong>${JIJI_HANJA[dayBranch]}</strong>와 육합(<strong>${JIJI_HANJA[partnerBranchIdx]}월·일</strong>) 또는 삼합을 이루는 날이며, 천간에 <strong>정재·정관·정인</strong>의 바른 기운이 뜨는 달입니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-ring"></i> 제3권 심층 사주 궁합 & 속궁합 총결</h5>
          <p>
            "사랑은 서로의 완벽함을 확인하는 과정이 아니라, 서로의 사주에 비어 있는 오행의 구멍을 기꺼이 내 체온과 식탁과 숨결로 메워주는 여정입니다. 이 서책에 담긴 지혜가 ${user.name}님의 간절한 인연을 가장 찬란한 현실로 이어주기를 축원합니다."
          </p>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// 4. 제4권 (career) : 이직 · 취업 · 창업 커리어 천직 비서 (총 20장)
//    - 간절함이 담긴 영역이므로 정신과 상담(심리치유·통찰)의 느낌으로 진입
//    - 이직, 취업, 창업/사업, 조직생존 모든 상황을 다 담아주되, 각 상황에 따른 비책이니 현재 자신의 상황에 맞게 찾아보길 바라며 나머지도 향후 나침반으로 삼으라고 안내
//    - 판에 박힌 "만약 ~한다면" 금지! 사주 원국(취업 못 할 사주가 아닌 경우 vs 신약/인성과다 vs 괴강/백호/상관 등)에 맞춰 말투와 접근 방식을 완전히 다르게 분기
// ============================================================================
function buildCareerPersonaProse(user) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const strength = user.strength;
  const pattern = user.pattern || SAJU_PATTERNS['정관격'];
  const shinsals = (user.extendedShinsal || []).map(s => s.name);

  const hasFierce = shinsals.some(n => n.includes('백호') || n.includes('괴강') || n.includes('양인')) || ['상관격', '칠살격', '양인격'].includes(pattern.name);
  const isResourceHeavy = (strength.status === 'weak') || ['정인격', '편인격'].includes(pattern.name);

  // 1) 이직(Job Change) 진입 화법 — "만약 ~한다면" 배제, 사주 맞춤형 본심 간파
  let jobChangeOpening = '';
  let jobChangeCore = '';

  if (hasFierce) {
    jobChangeOpening = `${user.name}님, 솔직히 말씀드리겠습니다. 당신의 사주 원국(<strong>${pattern.name} · ${user.pillars.day.hanja}일주</strong>)은 애초에 무능하거나 게을러서 조직에서 밀려날 사주가 결코 아닙니다. 오히려 남들보다 일머리가 너무 빠르고 판이 돌아가는 모순이 한눈에 보이다 보니, 비효율적인 상사나 답답한 조직의 그릇이 당신의 성에 차지 않아 속으로 천불이 나는 형국입니다.`;
    jobChangeCore = `지금 이직을 고민하며 이 페이지를 펼치신 진짜 마음도 마찬가지 아닙니까? 당장 먹고살 길이 막막해서가 아니라, <strong>“내 실력과 에너지에 비해 지금 이 우물이 너무 좁고 보상도 정체되어 있는데, 이 밖의 더 넓은 무대로 나가면 훨씬 더 높은 확률과 대우가 있지 않을까?”</strong> 하는 갈증과 확인받고 싶은 본심 말입니다. 먼저 그 답답했던 마음부터 토닥여 드리고 싶습니다. 당신이 예민하거나 참을성이 없어서가 아니라, 사주에 장착된 엔진 배기량 자체가 지금 앉아 있는 자리보다 크기 때문에 생기는 당연한 진동입니다.`;
  } else if (!isResourceHeavy) {
    jobChangeOpening = `${user.name}님의 사주 여덟 글자를 가만히 들여다보면, 여태껏 사회에서 내 밥그릇 하나 못 챙기거나 취업을 못 할 팔자가 전혀 아닙니다. 책임감도 강하고 맡은 바를 기어이 해내는 <strong>${pattern.name}(${strength.title})</strong>의 탄탄한 골격을 가지고 계십니다.`;
    jobChangeCore = `그런데도 지금 이직의 기로에서 밤잠을 설치고 계신 이유는 무엇이겠습니까? 능력이 부족해서 도망치려는 게 아닙니다. 그동안 남 좋은 일만 시키며 내 에너지를 갈아 넣었는데 정작 돌아오는 인정과 연봉은 그에 미치지 못하니, <strong>지친 마음을 달래고 지금 이 울타리 바깥에 나를 진짜 귀하게 써줄 더 나은 확률과 자리가 있을지 내다보고 싶으신 것</strong> 아닙니까. 그 간절하고도 합리적인 갈증을 누가 비난할 수 있겠습니까.`;
  } else {
    jobChangeOpening = `${user.name}님, 그동안 참 많이 참고 견뎌오셨습니다. 당신의 사주 원국은 남에게 싫은 소리 한마디 하는 것보다 내가 조금 더 손해 보고 야근하며 완벽하게 해내는 쪽을 택하는 <strong>섬세한 책임감(${pattern.name})</strong>의 구조를 지니고 있습니다.`;
    jobChangeCore = `당신이 지금 이직을 떠올리는 건 결코 배부른 투정이 아닙니다. 내 영혼과 자존감이 더 이상 깎여 나가기 전에 나를 지켜내려는 건강한 생존 신호이자, <strong>“과연 내가 지금보다 덜 상처받고 내 가치를 온전히 인정받을 수 있는 더 나은 확률의 무대가 어디에 있을까”</strong>를 확인하고 싶은 절실한 마음입니다.`;
  }

  // 2) 취업(Job Seeking) 진입 화법 — "만약 ~한다면" 배제, 정신 번쩍 들게 하는 촌철살인 팩폭 + 사주 맞춤 해법
  let jobSeekOpening = '';
  let jobSeekCore = '';

  if (!isResourceHeavy) {
    jobSeekOpening = `지금 아직 소속된 곳 없이 취업이나 시험을 준비하고 계신 상태라면, ${user.name}님은 이 대목에서 정말 <strong>정신 바짝 차리셔야 합니다.</strong> 제가 만세력 원국을 아무리 뒤집어 봐도, 당신은 여태껏 취업을 ‘못’ 할 사주가 절대 아닙니다. 사지육신 멀쩡하고 일간 <strong>${CHEONGAN_HANJA[dayMaster]}</strong>의 기세와 <strong>${pattern.name}</strong>의 무기까지 쥐고 있는데 왜 아직 문밖에서 서성이고 계십니까?`;
    jobSeekCore = `가슴에 손을 얹고 냉정하게 되돌아보십시오. 정말 세상이 당신을 안 뽑아줘서 <strong>‘못’ 들어가는 것입니까, 아니면 내심 실패할까 봐 두렵고 남들 보기에 그럴듯한 간판이 아니면 싫다는 은밀한 자존심 뒤에 숨어 본인이 ‘안’ 들어가고 있는 것입니까?</strong> 머릿속으로만 완벽한 직장을 시뮬레이션하며 지원서 넣기를 주저하는 그 방어기제만 깨부수면, 당신은 당장 다음 분기에라도 현장에 뛰어들어 밥값을 해낼 사주입니다.`;
  } else {
    jobSeekOpening = `지금 취업이나 자격 시험의 문턱 앞에서 마음이 무거우시다면, ${user.name}님께 꼭 드리고 싶은 말씀이 있습니다. 당신의 사주는 능력이 없어서 떨어지는 사주가 아니라, <strong>인성(생각·걱정·자격 준비)의 무게가 식상(행동·일단 부딪혀 보는 투기)을 짓눌러 시작선에서 에너지를 다 써버리는 사주</strong>입니다.`;
    jobSeekCore = `정신 차리고 스스로에게 물어보셔야 합니다. 정말 내 스펙이 모자라서 세상에 <strong>‘못’ 들어가는 건지, 아니면 “조금만 더 준비해서 완벽해지면 지원해야지”라는 핑계로 실전의 평가가 두려워 본인이 문고리를 잡고도 ‘안’ 들어가고 있는 건지</strong> 말입니다. 당신 사주에 필요한 건 자격증 한 줄이 더 아니라, 오늘 당장 불완전한 상태로라도 면접장에 내 몸을 던지는 행동력입니다.`;
  }

  return {
    jobChangeOpening,
    jobChangeCore,
    jobSeekOpening,
    jobSeekCore
  };
}

function buildCareerReportHtml(user, natureName) {
  const dayMaster = user.pillars.day.stemIdx;
  const dayBranch = user.pillars.day.branchIdx;
  const dayEl = CHEONGAN_ELEMENTS[dayMaster];
  const strength = user.strength;
  const pattern = user.pattern || SAJU_PATTERNS['정관격'];
  const yongshin = user.yongshin;
  const seun = getDynamicSeunContext(user);
  const med = diagnoseMedicalSaju(user);
  const persona = buildCareerPersonaProse(user);

  return `
    ${buildMyeongshikTableHtml(user)}

    <!-- 제1장: 정신과 상담실 진입 & 전 영역 가이드 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 심층 커리어 상담실의 문을 열며 (프롤로그)</div>
      <h3 class="chapter-title">불안으로 잠 못 이루는 당신의 밤을 먼저 읽습니다 — 맞춤형 커리어 처방 안내</h3>
      <div class="chapter-prose">
        <p>
          이름 석 자와 생년월일시를 넣고 ‘직업과 돈’의 운세를 펼쳐보는 사람의 마음에는 언제나 남들에게는 쉽게 털어놓지 못하는 무거운 삶의 무게가 실려 있습니다. 매달 돌아오는 카드값과 고정비, 나보다 앞서가는 것 같은 동기들의 소식, 그리고 “과연 내가 지금 맞게 가고 있는 걸까”라는 새벽녘의 서늘한 불안감까지—그 간절함을 알기에 이 감명서는 얄팍한 길흉 판정이 아니라, <strong>당신의 지친 내면을 깊이 들여다보는 정신과 상담실의 의자</strong>에서부터 이야기를 시작하고자 합니다.
        </p>
        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-compass-drafting"></i> 본 커리어 비서(秘書)의 구성 원칙과 활용법</h5>
          <p>
            사람의 직업적 주기는 하나로 고정되어 있지 않습니다. 지금은 취업을 갈망하지만 3년 뒤에는 이직을 고민하고, 5년 뒤에는 내 사업(창업·부업)을 꿈꾸게 됩니다. 따라서 본 서책에는 <strong>① 이직(Job Change), ② 취업·시험(Job Seeking), ③ 창업·사업·동업(Business), ④ 조직 내 승진·생존(Corporate Survival)</strong>의 모든 상황에 대한 비책을 빠짐없이 수록하였습니다.<br><br>
            판에 박힌 가정법으로 두루뭉술하게 말하지 않고, <strong>오직 ${user.name}님의 사주 원국(${natureName} · ${pattern.name})이 각 상황에 놓였을 때 드러나는 진짜 본심과 승률</strong>로 직격합니다. 우선 현재 본인의 상황에 해당하는 장(Chapter)을 먼저 찾아 읽으시고, 나머지 상황의 장들도 향후 다가올 인생의 나침반이자 보너스 비기(秘記)로 평생 소장하십시오.
          </p>
        </div>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:26%;">진로 고민 영역</th>
              <th>본 감명서의 핵심 공감 접근법 및 맞춤 해결 전략</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🔄 이직(Job Change)</strong></td>
              <td>마음을 달래고 자책을 멈추며, 잃을 것 없는 안전한 환승 타이밍과 이직 승률을 객관적으로 분석합니다.</td>
            </tr>
            <tr>
              <td><strong>🎯 취업(Job Seeking)</strong></td>
              <td>"만약 취업한다면" 식의 무책임한 가정이 아니라, 사주상 밥그릇의 크기를 상기시키며 스스로 '못' 들어가는지 '안' 들어가는지 방어기제를 허물어줍니다.</td>
            </tr>
            <tr>
              <td><strong>🚀 창업·사업(Business)</strong></td>
              <td>독립할 시기가 왔는지, 아직 자본과 지혜를 축적해야 할 때인지 동업 관계와 현금 흐름을 기준으로 칼같이 진단합니다.</td>
            </tr>
            <tr>
              <td><strong>🏢 조직 내 생존(Survival)</strong></td>
              <td>사내 정치와 번아웃의 파도 속에서 내 밥그릇을 지키고 상사와 부하를 내 편으로 만드는 실전 처세술을 제시합니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제2장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 02 · 내 사주의 직업적 원형(Archetype)과 에너지 보존 법칙</div>
      <h3 class="chapter-title">${user.name}님은 조직의 톱니바퀴인가, 판을 짜는 설계자인가, 칼을 쥔 야전사령관인가</h3>
      <div class="chapter-prose">
        <p>
          직업운을 읽는 첫 단추는 내 사주의 <strong>월주(${user.pillars.month.hanja}) 격국인 [${pattern.name}]</strong>과 일간의 강약(<strong>${strength.title}, ${strength.score}점</strong>)을 결합하여 나의 ‘근로 근육’을 파악하는 것입니다.
        </p>
        <p>
          ${user.name}님은 타인이 시키는 단순 반복 노동을 할 때 에너지가 가장 빨리 고갈됩니다. 반대로 내 재량권(권한)이 보장되고, 내가 투입한 지략과 노력이 명확한 수치나 결과물로 피드백되는 환경에 던져지면 밤을 새워도 눈이 빛나는 체질입니다. 당신이 직장에서 겪는 피로의 70%는 ‘업무량’ 자체가 아니라, <strong>‘납득되지 않는 비논리적 지시’와 ‘자율성의 박탈’</strong>에서 비롯됩니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-id-badge"></i> ${user.name}님의 핵심 커리어 DNA 요약</h5>
          <p>
            • <strong>최적 포지션:</strong> ${pattern.career}<br>
            • <strong>핵심 무기:</strong> ${yongshin.eokbuYongshin}의 기운을 활용한 문제 해결력과 문서·계약 장악력<br>
            • <strong>치명적 아킬레스건:</strong> 내 공로를 포장하지 않고 묵묵히 일만 하다가 정치력 좋은 이에게 과실을 뺏기거나, 한 번 정이 떨어지면 뒤도 안 돌아보고 판을 접으려는 급발진
          </p>
        </div>
      </div>
    </div>

    <!-- 제3장: 이직 상담 1 (동적 화법 적용) -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 03 · [심층 이직 상담 ①] 당신이 지금 이직을 떠올리는 진짜 이유</div>
      <h3 class="chapter-title">마음을 달래며 들여다본 본심 — 지금의 답답함은 무능이 아니라 그릇의 팽창입니다</h3>
      <div class="chapter-prose">
        <p>${persona.jobChangeOpening}</p>
        <p>${persona.jobChangeCore}</p>
        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-mug-hot"></i> 명리 상담가의 처방 — 자책을 멈추고 ‘확률 게임’으로 전환하십시오</h5>
          <p>
            지금 현 직장에서 느끼는 권태나 분노를 “내가 조직 부적응자인가”라는 자책으로 연결하지 마십시오. 나무(${ELEMENT_KOREAN[dayEl]})가 자라 화분이 좁아지면 뿌리가 화분 벽을 뚫고 나오듯, 당신의 운기가 다음 단계로 넘어가려 할 때 나타나는 자연스러운 성장통입니다. 다만 감정에 휩쓸려 ‘도피성 퇴사’를 하면 내 몸값을 스스로 깎아먹게 되니, 다음 장의 승률 계산표에 따라 가장 비싸게 나를 팔 수 있는 타이밍을 잡아야 합니다.
          </p>
        </div>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:28%;">심층 심리 진단</th>
              <th>현재 내면의 상태와 운명학적 극복 솔루션</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>💔 내면의 결핍 신호</strong></td>
              <td>내 능력과 기여도에 비해 조직의 보상과 피드백이 턱없이 부족하여 발생하는 극심한 허탈감과 인정 욕구의 결핍입니다.</td>
            </tr>
            <tr>
              <td><strong>🛡️ 자존감 회복 비책</strong></td>
              <td>회사의 평가를 나의 절대적 가치로 동일시하지 마십시오. 당신은 회사의 부속품이 아니라, 잠시 노동력을 빌려주고 있는 독립된 전문가입니다.</td>
            </tr>
            <tr>
              <td><strong>⚖️ 상담가의 행동 처방</strong></td>
              <td>퇴사 통보를 먼저 지르지 말고, 이력서를 몰래 업데이트하며 외부 시장의 반응을 먼저 떠보십시오. 문밖에 다른 기회가 있다는 확신만 생겨도 지금 회사의 스트레스가 80% 줄어듭니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제4장: 이직 상담 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 04 · [심층 이직 상담 ②] 이직의 승률과 최적의 탈출·진입 타이밍</div>
      <h3 class="chapter-title">지금 움직일 때의 승산은 몇 퍼센트인가 — 환승 이직의 골든 타임</h3>
      <div class="chapter-prose">
        <p>
          이직에서 승리한다는 것은 단순히 ‘다른 회사로 간다’는 뜻이 아니라, <strong>연봉·직급·워라밸·커리어 네임밸류 중 최소 두 가지 이상을 확실히 우상향시켜 옮긴다</strong>는 뜻입니다. 현재 세운(<strong>${seun.yearHanja} · ${seun.yearTenGod}</strong>)과 향후 12개월 월운을 대조해 볼 때 ${user.name}님의 이직 승률은 다음과 같이 갈립니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:25%;">이직 시나리오</th>
              <th>승률 판정 및 사주 명리학적 실행 수칙</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>선(先) 퇴사 후 이직 준비</strong><br><span style="color:#f87171;">승률 35% (비권장)</span></td>
              <td>${user.name}님의 사주는 소속(관성·인성)의 울타리가 완전히 사라진 상태에서 구직 활동을 하면 조급증이 발동하여 본래 몸값보다 낮은 곳에 성급히 도장을 찍을 위험이 큽니다.</td>
            </tr>
            <tr>
              <td><strong>재직 중 물밑 환승 이직</strong><br><span style="color:#34d399;">승률 88% (강력 권장)</span></td>
              <td>현재 명함을 방패 삼아 헤드헌터나 링크드인, 업계 네트워크로 오퍼를 먼저 받은 뒤 움직일 때 협상 테이블의 주도권을 100% 쥐게 됩니다.</td>
            </tr>
            <tr>
              <td><strong>향후 1년 내 베스트 이직월</strong></td>
              <td>일지나 월지에 <strong>합(合)이나 귀인·관인운</strong>이 들어오는 <strong>${seun.months12[1].month}월, ${seun.months12[4].month}월, ${seun.months12[8].month}월</strong>에 최종 오퍼레터 날인이 이루어지도록 지원 일정을 역산하십시오.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제5장: 이직 상담 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 05 · [심층 이직 상담 ③] 연봉 협상과 면접에서 내 격국을 가장 비싸게 파는 법</div>
      <h3 class="chapter-title">면접관의 심리를 꿰뚫는 [${pattern.name}] 어필 화법과 몸값 극대화 전략</h3>
      <div class="chapter-prose">
        <p>
          경력직 이직 면접과 연봉 협상에서 ${user.name}님이 가장 주의해야 할 점은 ‘과도한 겸손’입니다. 당신은 내가 실제로 해낸 성과도 “팀원들과 함께했습니다”라고 에둘러 말하는 경향이 있는데, 이는 냉정한 채용 시장에서 손해입니다.
        </p>
        <p>
          • <strong>이력서 및 면접 필승 프레임:</strong> [${pattern.name}]의 강점을 살려, “기존 조직에 어떤 비효율(문제)이 있었고, 내가 어떤 시스템/전략을 도입하여 수치상으로 몇 퍼센트의 비용 절감이나 매출 상승을 이끌어냈는가”를 <strong>숫자(금·수 기운)</strong>로 제시하십시오.<br>
          • <strong>연봉 테이블 협상술:</strong> 희망 연봉을 부를 때는 내가 원하는 마지노선보다 7~10% 높은 구간을 기준점으로 먼저 제시하고, 기본급 조정이 어렵다면 사이닝 보너스나 스톡옵션, 원격근무 조건 등 부대 문서 조건을 결합해 총보상(Total Compensation)을 끌어올리십시오.
        </p>
      </div>
    </div>

    <!-- 제6장: 취업·시험 상담 1 (동적 팩폭 화법 적용) -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 06 · [심층 취업·시험 상담 ①] ‘못’ 들어가는 것인가, ‘안’ 들어가는 것인가</div>
      <h3 class="chapter-title">뼈를 때리는 사주 팩트체크 — 당신의 발목을 잡는 진짜 범인은 스펙이 아닙니다</h3>
      <div class="chapter-prose">
        <p>${persona.jobSeekOpening}</p>
        <p>${persona.jobSeekCore}</p>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-gavel"></i> 천문(天門) 커리어 독심술의 냉정한 진단</h5>
          <p>
            당신의 사주 원국은 일단 현장에 들어가서 명함을 파고 실무를 굴리기 시작하면 누구보다 빠르게 두각을 나타낼 실전형 팔자입니다. 책상 앞에서 ‘합격 수기’나 읽으며 완벽한 준비를 기다리는 시간은 이제 끝내야 합니다. 눈높이라는 이름의 두려움을 버리고, 내 커리어의 첫 교두보가 될 현장에 이번 달 안에 최소 15곳 이상 지원서를 꽂으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제7장: 취업·시험 상담 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 07 · [심층 취업·시험 상담 ②] 관운(官運)과 인성(印星) 합격 기운을 여는 루틴</div>
      <h3 class="chapter-title">서류 탈락의 사슬을 끊고 최종 합격 통지서를 끌어당기는 명리학적 실전 비법</h3>
      <div class="chapter-prose">
        <p>
          명리학에서 취업은 <strong>관성(官星: 나를 부르는 조직의 간판)</strong>이요, 자격증과 시험 합격은 <strong>인성(印星: 국가나 기관이 내리는 인증 문서)</strong>입니다. 이 두 기운이 내 사주에 달라붙게 만들려면 생활 환경부터 관인상생(官印相生)의 파장으로 바꾸어야 합니다.
        </p>
        <p>
          • <strong>1. 지원 기업의 오행 매칭:</strong> 막연히 아무 곳에나 지원하기보다, 당신의 용신(<strong>${yongshin.eokbuYongshin}</strong>)과 격국(<strong>${pattern.career.split(',')[0]}</strong>)에 해당하는 산업군을 1순위로 타겟팅할 때 서류 통과율이 2배 이상 치솟습니다.<br>
          • <strong>2. 면접 당일의 개운 복식:</strong> 면접 날에는 당신의 관성과 인성을 생조하는 단정한 정장 차림에 <strong>${med.deficientEl === 'water' ? '네이비·딥블루' : med.deficientEl === 'wood' ? '차분한 그린·틸블루' : med.deficientEl === 'fire' ? '버건디·웜톤' : med.deficientEl === 'earth' ? '베이지·골드브라운' : '화이트·실버그레이'}</strong> 계열의 넥타이, 스카프, 혹은 손목시계를 착용하여 첫인상 3초의 기운을 장악하십시오.
        </p>
      </div>
    </div>

    <!-- 제8장: 취업·시험 상담 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 08 · [심층 취업·시험 상담 ③] 대기업 · 공직 · 전문직 · 스타트업 토양 매칭</div>
      <h3 class="chapter-title">어떤 규모의 조직에 들어갔을 때 ${user.name}님의 수명과 자산이 가장 길어지는가</h3>
      <div class="chapter-prose">
        <p>
          누군가에게는 신의 직장인 공기업이 다른 사주에게는 숨 막히는 감옥이 되고, 누군가에게는 불안한 스타트업이 다른 사주에게는 일약 신분 상승의 사다리가 됩니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:26%;">조직 유형</th>
              <th>${user.name}님 사주 적합도 및 진입 전략</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🏛️ 공직 · 공공기관 · 교직</strong></td>
              <td>초년의 안정성은 높으나 연공서열과 경직된 절차 속에서 ${user.name}님의 날카로운 직관력이 답답함을 느낄 수 있습니다. 만약 진입한다면 일반 행정보다 감사·기획·전문 연구 파트처럼 독립성이 보장되는 보직을 택해야 합니다.</td>
            </tr>
            <tr>
              <td><strong>🏢 대기업 · 중견 · 금융권</strong></td>
              <td><strong>[최상급 매칭]</strong> 체계적인 시스템과 브랜드를 등 뒤에 업고 일할 때 당신의 <strong>${pattern.name}</strong> 역량이 가장 크게 증폭됩니다. 초기 5~10년은 반드시 규모 있는 조직에서 프로세스와 인맥을 흡수하십시오.</td>
            </tr>
            <tr>
              <td><strong>🚀 외국계 · IT · 강소기업</strong></td>
              <td>연차보다 실력과 퍼포먼스로 평가받는 수평적 문화가 ${user.name}님의 자존심과 승부욕을 긍정적으로 자극합니다. 빠른 승진과 스톡옵션·인센티브를 노릴 때 최적의 무대입니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제9장: 창업·사업 상담 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 09 · [심층 창업·사업 상담 ①] 내 이름으로 간판을 걸어도 되는 사주인가</div>
      <h3 class="chapter-title">월급쟁이의 천장을 깨고 내 사업(Owner)으로 나아갈 때의 명리학적 조건</h3>
      <div class="chapter-prose">
        <p>
          현재 사업을 운영 중이시거나 향후 창업을 꿈꾸고 계신다면, 가장 먼저 점검해야 할 것은 내 사주의 <strong>식상생재(食傷生財: 내 기술과 마케팅으로 현금을 만들어내는 힘)</strong>와 <strong>관성(리크스 통제력)</strong>입니다.
        </p>
        <p>
          ${user.name}님은 궁극적으로 남의 밑에서 평생을 마칠 사주가 아닙니다. 늦어도 40대 중후반 이후에는 본인의 이름이나 전문 라이선스, 혹은 독자적인 법인·사업체를 통해 주체적으로 수익을 창출해야 직성이 풀립니다. 다만, <strong>초기 고정비(높은 보증금·인테리어·과도한 정규직 채용)가 많이 들어가는 오프라인 장치 산업</strong>으로 시작하면 운이 흔들리는 달에 현금흐름이 막혀 고전합니다. 반드시 <strong>내 무형 자산(지식·기술·중개·솔루션·온라인 플랫폼)을 기반으로 고정비를 최소화한 고마진 구조</strong>로 첫 깃발을 꽂으십시오.
        </p>
      </div>
    </div>

    <!-- 제10장: 창업·사업 상담 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 10 · [심층 창업·사업 상담 ②] 돈이 붙는 업종 아이템과 1인 기업 vs 조직 확장</div>
      <h3 class="chapter-title">${user.name}님의 손끝에서 황금으로 변하는 비즈니스 모델 설계</h3>
      <div class="chapter-prose">
        <p>
          사업 아이템에도 오행이 있습니다. ${user.name}님의 용신(<strong>${yongshin.eokbuYongshin} / ${yongshin.johuYongshin}</strong>)과 격국에 비추어 볼 때 가장 높은 영업이익률을 안겨줄 비즈니스 모델은 다음과 같습니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-sack-dollar"></i> 천문(天門) 추천 3대 황금 비즈니스 모델</h5>
          <p>
            1. <strong>전문 에이전시 & 컨설팅·교육형 비즈니스:</strong> 복잡한 정보 비대칭을 해결해 주고 수수료나 자문료를 받는 B2B/프리미엄 B2C 모델.<br>
            2. <strong>디지털 콘텐츠 & 자동화 플랫폼:</strong> 한 번 구축해 두면 복제 비용이 거의 들지 않는 소프트웨어, 전자책, 온라인 강의, 브랜드 커머스.<br>
            3. <strong>정밀 기술·의료·뷰티·웰니스 특화업:</strong> 원국의 예리한 감각과 의명(醫命)적 치유 에너지를 결합한 고부가가치 전문 서비스.
          </p>
        </div>
        <p>
          또한 직원을 수십 명 거느리며 노무 관리에 진을 빼기보다, 핵심 코어 인력 소수(2~4명)와 외주 파트너십·AI 자동화 툴을 결합한 <strong>‘고밀도 강소 조직(Lean Team)’</strong>으로 운영할 때 순이익률이 극대화됩니다.
        </p>
      </div>
    </div>

    <!-- 제11장: 창업·사업 상담 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 11 · [심층 창업·사업 상담 ③] 동업(同業)의 독약과 성약 — 지분 및 투자 유치의 철칙</div>
      <h3 class="chapter-title">누구와 손을 잡으면 망하고, 어떤 조건으로 묶어야 흥하는가</h3>
      <div class="chapter-prose">
        <p>
          사업가에게 동업은 가장 달콤한 유혹이자 가장 무서운 지뢰밭입니다. ${user.name}님의 사주 구조상, <strong>친구·선후배·친척 등 감정적 의리로 5:5 지분을 나누는 동업은 99% 파국</strong>으로 끝납니다. 일지 ${JIJI_HANJA[dayBranch]}의 주체성이 강해 결국 의사결정권이 충돌하고 돈과 사람을 모두 잃게 됩니다.
        </p>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-file-signature"></i> 불가피하게 동업이나 파트너십을 맺을 때의 3대 철칙</h5>
          <p>
            • <strong>지분율의 절대 우위:</strong> 반드시 ${user.name}님이 <strong>최소 51% 이상의 의결권(지분)과 통장 인감 통제권</strong>을 단독 보유하십시오.<br>
            • <strong>역할의 완벽한 분리:</strong> 당신이 ‘기획·기술·재무’를 맡는다면 파트너는 철저히 ‘외부 영업·마케팅’만 전담하는 식으로 영역이 겹치지 않아야 합니다.<br>
            • <strong>엑시트(Exit) 조항 선명기:</strong> 시작할 때부터 “결별 시 지분을 얼마에 어떻게 매수/매도한다”는 주주간 계약서(SHA)를 공증받아 두어야 원진살을 피합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제12장: 조직 생존 1 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 12 · [조직 생존 · 사내 정치 ①] 상사와 결정권자를 내 편으로 조종하는 심리학</div>
      <h3 class="chapter-title">굽신거리지 않고도 윗사람의 절대적 신임을 얻는 관성(官星) 컨트롤 기법</h3>
      <div class="chapter-prose">
        <p>
          ${user.name}님은 빈말이나 아부를 체질적으로 혐오합니다. 하지만 조직에서 아부와 ‘전략적 보고’는 전혀 다릅니다. 윗사람이 당신을 어렵게 느끼거나 견제하는 이유는 당신의 실력이 부족해서가 아니라, <strong>당신이 상사의 체면(인성)을 세워주지 않고 너무 정론(팩폭)만 말하기 때문</strong>입니다.
        </p>
        <p>
          결론을 다 정해놓고 보고하러 갈 때조차도 마지막 5%의 선택지(A안과 B안)를 남겨두어 <strong>“팀장님/대표님의 경험으로 볼 때 어느 쪽이 더 나을지 최종 혜안을 구합니다”</strong>라고 상사에게 결정의 명분을 선물하십시오. 그 한마디가 상사를 당신의 가장 강력한 방패막이로 만들어 줍니다.
        </p>
      </div>
    </div>

    <!-- 제13장: 조직 생존 2 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 13 · [조직 생존 · 사내 정치 ②] 내 공로를 가로채는 동료와 소인배 완벽 차단법</div>
      <h3 class="chapter-title">착한 호구가 되지 마라 — 기록과 경계선으로 내 밥그릇을 지키는 기술</h3>
      <div class="chapter-prose">
        <p>
          사주에 비겁(경쟁자)이나 상관·원진의 기류가 스칠 때 직장 내에서 가장 흔히 겪는 일이 ‘일 잘하는 사람에게 일만 몰리고, 승진과 포상은 말만 번지르르한 자가 가져가는 부조리’입니다.
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-shield-cat"></i> 사내 소인배 및 무임승차자 원천 봉쇄 3원칙</h5>
          <p>
            1. <strong>모든 업무 협조는 메일과 메신저 기록(CC 포함)으로 남겨라:</strong> 구두로 부탁받고 해준 일은 당신의 실적이 되지 않습니다. 반드시 상급자가 참조된 텍스트 채널에서 요청과 완료 보고가 오가게 하십시오.<br>
            2. <strong>나의 핵심 노하우(Raw Data)를 100% 공유하지 마라:</strong> 결과물은 친절하게 주되, 그 결과물을 만드는 핵심 템플릿과 네트워크는 당신만이 다룰 수 있는 블랙박스로 남겨두어야 대체 불가능한 존재가 됩니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제14장: 조직 생존 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 14 · [조직 생존 · 사내 정치 ③] 승진 · 인사 발령 · 핵심 보직 쟁취 전략</div>
      <h3 class="chapter-title">인사철마다 누락되지 않고 핵심 라인(Mainstream)에 올라타는 법</h3>
      <div class="chapter-prose">
        <p>
          조직 내에서 승진과 보직 이동은 매년 들어오는 세운과 월운의 <strong>관성(정관·편관)</strong> 기류와 정확히 맞물려 돌아갑니다. 인사 평가가 이루어지는 분기에는 묵묵히 지원 부서(Back-office)의 일만 처리하기보다, 회사의 <strong>‘매출 직결 부서’나 ‘신규 전략 TF’</strong>처럼 경영진의 시선이 집중되는 프로젝트에 이름을 올려야 합니다.
        </p>
        <p>
          특히 올해와 내년 사이에는 기존 업무의 안정적 유지보다 <strong>‘새로운 시스템 도입이나 비용 구조 개선’</strong>을 주도한 이력이 당신의 승진 티켓이 됩니다.
        </p>
      </div>
    </div>

    <!-- 제15장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 15 · 타고난 천직(天職) 도메인 10선과 절대 피해야 할 상극 업종</div>
      <h3 class="chapter-title">${user.name}님의 오행과 격국이 가장 찬란하게 만개하는 직업군 총정리</h3>
      <div class="chapter-prose">
        <p>
          평생을 두고 이직이나 전직, 혹은 커리어 피벗(Pivot)을 고민할 때 기준점으로 삼으셔야 할 ${user.name}님만의 천직 도메인 매트릭스입니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:26%;">구분</th>
              <th>상세 직무 및 산업 도메인</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>🌟 1순위 천직 도메인</strong><br>(격국: ${pattern.name})</td>
              <td><strong>${pattern.career}</strong><br>→ 당신의 사주 원국 기둥이 흔들림 없이 지지해 주는 본연의 무대입니다.</td>
            </tr>
            <tr>
              <td><strong>💎 2순위 용신 도메인</strong><br>(용신: ${yongshin.eokbuYongshin})</td>
              <td>데이터 분석, 전략 기획, 자산 운용·핀테크, 디지털 미디어·브랜딩, 라이선스 기반 전문 자문, 고부가가치 B2B 솔루션 영업</td>
            </tr>
            <tr>
              <td><strong>🚫 피해야 할 상극 직무</strong></td>
              <td>자율성 없이 매뉴얼대로만 감정노동을 강요당하는 저단가 대면 서비스, 현금 회수 주기가 지나치게 긴 하도급 건설·납품, 불투명한 다단계성 영업</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제16장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 16 · 본업을 뛰어넘는 부업(Side-Job) · N잡 파이프라인 설계</div>
      <h3 class="chapter-title">근로소득 하나만으로는 불안한 시대 — 내 사주에 맞는 제2의 월급통장 만들기</h3>
      <div class="chapter-prose">
        <p>
          ${user.name}님의 사주는 본업의 명함을 유지하면서 시주(時柱)의 기운을 활용해 <strong>제2의 수익 파이프라인(편재·식상)</strong>을 돌릴 때 심리적 여유와 본업의 협상력이 동시에 올라갑니다. 회사에 목매지 않아도 된다는 확신이 생길 때 오히려 회사에서도 더 당당하게 인정받기 때문입니다.
        </p>
        <p>
          다만 퇴근 후 내 몸을 갈아 넣는 시간제 아르바이트나 대리운전·단순 배달 같은 노동 집약적 부업은 당신의 <strong>${med.deficientOrgan.zang}</strong>을 망가뜨려 본업까지 무너뜨립니다. 반드시 <strong>내가 직장에서 겪으며 해결한 실무 노하우를 전자책·강의·블로그·유튜브로 자산화하거나, 배당주·달러 자산·소액 부동산 경매/임대</strong>처럼 ‘자본과 문서가 일하게 만드는 파이프라인’을 구축하십시오.
        </p>
      </div>
    </div>

    <!-- 제17장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 17 · 직장인 번아웃(Burnout)과 가면증후군 심리 치유 처방</div>
      <h3 class="chapter-title">“내가 잘하고 있는 걸까”라는 밤의 불안을 잠재우는 정신과적 명리 솔루션</h3>
      <div class="chapter-prose">
        <p>
          남들은 당신을 보고 “일도 잘하고 자기 앞가림 똑 부러지게 한다”고 말하지만, 정작 ${user.name}님 본인은 성취를 이루고 나서도 기쁨을 오래 누리지 못한 채 곧바로 다음 과제를 걱정하는 <strong>‘성취 중독과 가면증후군(Imposter Syndrome)’</strong>에 시달리기 쉽습니다.
        </p>
        <div class="counseling-empathy-box">
          <h5><i class="fa-solid fa-spa"></i> 번아웃 임계점을 넘지 않기 위한 3대 멘탈 수칙</h5>
          <p>
            • <strong>퇴근 후 ‘ON/OFF 의식’ 만들기:</strong> 현관문을 여는 순간 회사에서의 직함과 실수를 문밖에 벗어두십시오. 샤워 후 환복하고 조명을 낮추는 물리적 루틴이 뇌의 교감신경을 진정시킵니다.<br>
            • <strong>나의 가치를 회사의 평가와 분리하기:</strong> 회사는 당신의 노동력을 잠시 빌려 쓰는 거래처일 뿐, 당신의 인격과 인생 전체를 채점할 자격이 없습니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제18장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 18 · 근로계약 · 동업계약 · 스톡옵션 · 법적 분쟁 리스크 방어</div>
      <h3 class="chapter-title">억울하게 당하지 않기 위해 서명 전에 반드시 확인해야 할 문서 체크리스트</h3>
      <div class="chapter-prose">
        <p>
          커리어의 전환기마다 사주에 <strong>형(刑)이나 충(沖), 원진</strong>이 작동하면 호의로 시작한 일이 노동법적 분쟁이나 경업금지 소송, 혹은 임금·성과급 미지급 사태로 번질 수 있습니다.
        </p>
        <div class="critical-warning-box">
          <h5><i class="fa-solid fa-file-contract"></i> 커리어 계약서 날인 전 필수 확인 3계명</h5>
          <p>
            1. <strong>성과급(인센티브) 산정 기준의 명문화:</strong> “성과에 따라 지급한다”는 추상적 문구 대신, 구체적인 KPI 비율과 지급 시점을 오퍼레터에 명시하게 하십시오.<br>
            2. <strong>전직금지(경업금지) 및 지식재산권 조항:</strong> 퇴사 후 동종업계 이직이나 개인 사이드 프로젝트에 족쇄가 될 독소 조항이 없는지 꼼꼼히 살피십시오.<br>
            3. <strong>권고사직 vs 자진퇴사 구분:</strong> 회사의 사정으로 그만두게 될 때는 절대 먼저 자진퇴사 사직서에 서명하지 말고, 실업급여 및 위로금 조건을 문서로 확약받으십시오.
          </p>
        </div>
      </div>
    </div>

    <!-- 제19장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 19 · 향후 10년 커리어 & 몸값 점프업 타임라인 매트릭스</div>
      <h3 class="chapter-title">언제 배우고, 언제 옮기고, 언제 내 깃발을 꽂을 것인가 — 10개년 마스터 로드맵</h3>
      <div class="chapter-prose">
        <p>
          단기적인 눈앞의 파도에 흔들리지 않도록, 현재 시점(${seun.curYear}년)으로부터 향후 10년간 ${user.name}님의 커리어를 최정상 궤도에 올려놓을 연차별 전략 매트릭스를 제시합니다.
        </p>
        <table class="report-detail-table">
          <thead>
            <tr>
              <th style="width:24%;">시기 구분</th>
              <th>핵심 커리어 미션 및 자산 축적 목표</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1~2년 차 (단기)</strong><br>핵심 무기 벼리기</td>
              <td>불필요한 감정 소모를 끊고 내 직무 포트폴리오를 수치화하여 <strong>몸값을 최소 20~30% 끌어올리는 이직/승진</strong> 또는 첫 취업 안착을 완수하는 구간입니다.</td>
            </tr>
            <tr>
              <td><strong>3~5년 차 (중기)</strong><br>포지션 확장 & 제2소득</td>
              <td>실무자에서 <strong>프로젝트 리더·관리자·핵심 전문가</strong>로 직급을 올리고, 본업 외에 월 현금흐름을 창출하는 사이드 파이프라인과 문서 자산을 결합하는 구간입니다.</td>
            </tr>
            <tr>
              <td><strong>6~10년 차 (장기)</strong><br>독립적 권위 완성</td>
              <td>어느 조직에 속해 있든 내 이름 자체가 브랜드가 되어 <strong>내가 일할 사람과 조건을 직접 고르는 자유(경제적·직업적 독립)</strong>를 완성하는 황금 수확기입니다.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 제20장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 천직을 향해 나아가는 ${user.name}님께 바치는 헌사 (에필로그)</div>
      <h3 class="chapter-title">당신의 사주에는 이미 답이 적혀 있습니다 — 이제 두려움 없이 문을 여십시오</h3>
      <div class="chapter-prose">
        <p>
          지금까지 이직의 갈증, 취업의 정곡, 사업의 냉철한 셈법, 그리고 조직 생존의 비기까지 총 20장에 걸쳐 ${user.name}님의 커리어 운명을 함께 걸어왔습니다.
        </p>
        <p>
          세상이 아무리 불황이라 말하고 남들이 아무리 어렵다고 수군거려도, 사주명리학의 진리는 명확합니다. <strong>자신의 격국([${pattern.name}])을 정확히 알고, 용신([${yongshin.eokbuYongshin}])의 방향을 향해 오늘 하루의 실행을 쌓는 사람은 어떤 시대에도 결국 자신의 몫과 자리를 거머쥡니다.</strong>
        </p>
        <div class="key-point-box">
          <h5><i class="fa-solid fa-compass"></i> 제4권 이직 · 취업 · 창업 커리어 천직 비서 총결</h5>
          <p>
            "${user.name}님, 당신은 결코 작게 쓰일 그릇이 아닙니다. 흔들리는 날마다 이 비서를 다시 펼쳐 당신이 얼마나 단단한 8글자를 타고났는지 확인하십시오. 당신이 내딛는 다음 걸음이 곧 당신의 가장 빛나는 전성기가 될 것입니다."
          </p>
        </div>
      </div>
    </div>
  `;
}

