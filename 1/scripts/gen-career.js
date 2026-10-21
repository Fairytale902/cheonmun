/**
 * gen-career.js - 제4권 정신과 상담형 이직 · 취업 · 창업 커리어 천직 비서 (20장)
 */
function getCareerBuilderCode() {
  return `
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
    ? \`<div class="counseling-empathy-box">
         <h5><i class="fa-solid fa-feather-pointed"></i> 의뢰인 \${user.name}님의 실제 진로 고민 분석</h5>
         <p><strong>의뢰인 호소:</strong> "\${user.userConcernDetail}"<br>
         현재 느끼시는 불안과 답답함은 당신의 역량이 부족해서가 아닙니다. 화분이 좁아진 나무가 뿌리로 화분 벽을 두드리듯, 당신의 그릇(\${pattern.name})이 커져 현재 조직의 한계와 충돌하고 있는 지극히 정상적인 신호입니다.</p>
       </div>\`
    : '';

  return \`
    \${buildMyeongshikTableHtml(user)}

    <!-- 제1장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 01 · 심층 커리어 상담실의 문을 열며 (프롤로그)</div>
      <h3 class="chapter-title">불안으로 잠 못 이루는 당신의 밤을 먼저 읽습니다 — 맞춤형 커리어 처방 안내</h3>
      <div class="chapter-prose">
        <p>
          "이 회사를 계속 다녀야 할까, 아니면 지금이라도 이직해야 할까?", "내 사업을 시작해도 밥은 먹고살 수 있을까?", "왜 나는 남들처럼 적당히 만족하며 살지 못하고 끊임없이 길을 찾아 헤맬까?"... 지금 이 글을 읽고 계신 \${user.name}님의 머릿속을 맴도는 수많은 질문을 잘 알고 있습니다.
        </p>

        \${userConcern}

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-stethoscope"></i> 정신과 상담형 커리어 진단 — 당신을 옥죄는 불안의 실체</h5>
          <p>
            대한민국 직장인의 80%는 자신의 사주 격국과 맞지 않는 옷을 입은 채 매일 자책과 열등감에 시달립니다. 본 감명서는 뜬구름 잡는 위로를 건네지 않습니다. \${user.name}님이 타고난 <strong>직업적 유전자(\${persona.title})</strong>를 정확히 규명하고, 이직의 승률 계산부터 연봉 협상 화법, 사내 정치 방어, 1인 창업의 조건까지 가장 현실적인 로드맵을 처방합니다.
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
      <h3 class="chapter-title">\${user.name}님은 조직의 톱니바퀴인가, 판을 짜는 설계자인가, 칼을 쥔 야전사령관인가</h3>
      <div class="chapter-prose">
        <p>
          모든 인간은 태어날 때 우주로부터 고유한 '직업적 역할 코드'를 부여받습니다. \${user.name}님의 사주는 <strong>[\${persona.title}]</strong>으로, \${persona.summary}
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-chess"></i> 조직 내에서 발현되는 당신의 핵심 강점과 치명적 약점</h5>
          <p>
            • <strong>독점적 무기:</strong> \${persona.careerTrait}<br>
            • <strong>치명적 약점:</strong> 본인의 기준이 워낙 높고 완벽을 추구하다 보니, 일 처리가 느리거나 무책임한 동료를 보면 속에서 천불이 나며 감정 조절이 어려워집니다. 혼자 다 떠안으려다 번아웃에 빠지는 패턴을 반복하게 됩니다.
          </p>
        </div>

        <div class="action-secret-box">
          <h5><i class="fa-solid fa-bolt"></i> 내 몸값을 2배로 올리는 에너지 재배치 전략</h5>
          <p>
            남들과 똑같은 스펙 쌓기에 시간을 낭비하지 마십시오. 당신의 격국인 <strong>[\${pattern.name}]</strong>의 강점을 살려, '내가 가장 적은 스트레스를 받으면서 남들보다 압도적인 퀄리티를 뽑아낼 수 있는 단 하나의 핵심 직무'에 모든 자원을 집중하십시오.
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
          지금 현 직장에서 느끼는 권태, 상사에 대한 환멸, 또는 매일 아침 출근길에 차오르는 한숨을 “내가 인내심이 부족한가”라는 자책으로 연결하지 마십시오. 나무(\${ELEMENT_KOREAN[dayEl]})가 자라 화분이 좁아지면 뿌리가 화분 벽을 뚫고 나오듯, 당신의 운기가 다음 단계로 넘어가려 할 때 나타나는 자연스러운 성장통입니다.
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
          이직에서 승리한다는 것은 단순히 회사를 옮기는 것이 아니라, <strong>연봉·직급·워라밸·기업 브랜드 중 최소 두 가지 이상을 우상향시켜 옮긴다</strong>는 뜻입니다. 현재 세운(\${seun.yearHanja})과 향후 12개월 월운을 대조할 때 \${user.name}님의 이직 승률은 다음과 같이 갈립니다.
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
      <h3 class="chapter-title">면접관의 심리를 꿰뚫는 [\${pattern.name}] 어필 화법과 몸값 극대화 전략</h3>
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
          <h5><i class="fa-solid fa-handshake"></i> [\${pattern.name}] 전용 연봉 20% 인상 화법</h5>
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
            무리하게 남들의 기준에 맞추지 마시고, 당신의 일간 오행(\${ELEMENT_KOREAN[dayEl]})이 활발하게 소통할 수 있는 인더스트리로 타깃을 15도만 틀어보십시오. 경쟁률이 100대 1인 곳에서 3대 1인 독점적 시장으로 진입하는 순간 단숨에 최종 합격 통지서를 거머쥐게 됩니다.
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
            • <strong>합격 의상:</strong> 면접 당일에는 \${yongshin.johuYongshin === '수(水)' ? '단정한 다크 네이비' : '따뜻한 차콜 그레이'} 정장에 신뢰감을 주는 푸른빛 넥타이나 스카프를 매치하십시오.<br>
            • <strong>마인드 컨트롤:</strong> 면접관을 심사위원이 아니라 "나에게 조언을 구하러 온 내담자"로 바라보는 멘탈 전환이 면접관을 압도합니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제8장: 취업 3 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 08 · [심층 취업·시험 상담 ③] 대기업 · 공직 · 전문직 · 스타트업 토양 매칭</div>
      <h3 class="chapter-title">어떤 규모의 조직에 들어갔을 때 \${user.name}님의 수명과 자산이 가장 길어지는가</h3>
      <div class="chapter-prose">
        <p>
          누군가에게는 신의 직장인 공기업이 다른 사주에게는 숨 막히는 감옥이 되고, 누군가에게는 불안한 스타트업이 다른 사주에게는 초고속 신분 상승의 사다리가 됩니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-building"></i> 조직 규모별 \${user.name}님의 적합도 판정</h5>
          <p>
            • <strong>대기업 / 다국적 기업:</strong> \${pattern.name}의 구조상 체계화된 시스템과 높은 브랜드 가치가 당신의 방패막이가 되어주므로 매우 유리합니다.<br>
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
          현대 비즈니스에서 가장 미련한 창업은 보증금과 인테리어 비용으로 수억 원의 빚을 지고 시작하는 오프라인 자영업입니다. \${user.name}님의 사주는 <strong>'지식·콘텐츠·소프트웨어·브랜딩'</strong>과 같은 무형의 고부가가치 아이템에서 가장 큰 마진을 남깁니다.
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
      <h3 class="chapter-title">\${user.name}님의 부귀를 보장하는 최적의 산업군 vs 기운을 갉아먹는 블랙홀 산업</h3>
      <div class="chapter-prose">
        <p>
          사주 원국의 오행 배합과 격국에 부합하는 산업군에서 일하면 1의 노력으로 10의 결실을 얻지만, 상극인 산업군에 머물면 10을 갈아 넣어도 1의 인정조차 받지 못합니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-star"></i> \${user.name}님에게 가장 돈이 붙는 3대 천직 도메인</h5>
          <p>
            1. <strong>핵심 주력 분야:</strong> \${pattern.career} — 당신의 고유한 직업적 DNA와 완벽히 공명하는 판입니다.<br>
            2. <strong>제2 확장 분야:</strong> \${yongshin.johuYongshin === '수(水)' ? '글로벌 무역 · 데이터 분석 · 지식 이커머스' : yongshin.johuYongshin === '화(火)' ? '미디어 브랜딩 · 엔터테인먼트 · 첨단 AI 기술' : '금융 자산 운용 · 전략 컨설팅 · 프리미엄 서비스'}.<br>
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
          <h5><i class="fa-solid fa-laptop-code"></i> \${user.name}님 맞춤형 디지털 파이프라인 3단계</h5>
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
          단기적인 눈앞의 연봉 인상에 일희일비하지 마십시오. 현재 시점(\${seun.curYear}년)으로부터 향후 10년간 \${user.name}님의 커리어를 최정상 궤도에 올려놓을 연차별 전략 매트릭스를 제시합니다.
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
            \${pattern.name}의 기운을 온전히 꽃피운 10년 뒤의 당신은, 더 이상 남의 눈치를 보지 않고 업계의 룰을 스스로 결정하는 독보적인 마스터가 되어 있을 것입니다.
          </p>
        </div>
      </div>
    </div>

    <!-- 제20장 -->
    <div class="report-chapter">
      <div class="chapter-badge">CHAPTER 20 · 천직을 향해 나아가는 \${user.name}님께 바치는 헌사 (에필로그)</div>
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
            본 감명서는 \${user.name}님만을 위해 천문력과 명리학 고전의 정수를 집대성하여 봉헌되었습니다. 길이 보이지 않을 때마다 이 페이지를 다시 펼쳐 당신 안에 잠든 거인의 힘을 일깨우십시오.
          </p>
        </div>
      </div>
    </div>
  \`;
}
`;
}

module.exports = { getCareerBuilderCode };
