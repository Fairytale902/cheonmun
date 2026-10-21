/**
 * assemble-reports.js - Assemble modular report generators into lib/report-builders.js
 */
const fs = require('fs');
const path = require('path');

const { getNewYearBuilderCode } = require('./gen-newyear.js');
const { getMasterBuilderCode } = require('./gen-master.js');
const { getMatchBuilderCode } = require('./gen-match.js');
const { getCareerBuilderCode } = require('./gen-career.js');

const headerCode = `/**
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
  const yearHanja = \`\${yearGan}\${yearZhi}\`;
  const yearKor = \`\${CHEONGAN[yStemIdx]}\${JIJI[yBranchIdx]}\`;
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
      kor: \`\${CHEONGAN[mStemIdx]}\${JIJI[mBranchIdx]}\`,
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
`;

const footerCode = `
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
`;

const fullCode = [
  headerCode,
  getNewYearBuilderCode(),
  getMasterBuilderCode(),
  getMatchBuilderCode(),
  getCareerBuilderCode(),
  footerCode
].join('\n\n');

const targetPath = path.resolve(__dirname, '../lib/report-builders.js');
fs.writeFileSync(targetPath, fullCode, 'utf8');
console.log('Successfully generated dense report-builders.js at:', targetPath);
console.log('Total characters:', fullCode.length);
console.log('Total lines:', fullCode.split('\n').length);
