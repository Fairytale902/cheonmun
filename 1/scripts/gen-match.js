/**
 * gen-match.js - 제3권 1:1 심층 사주 궁합 · 식궁합/여행 · 19+ 에로틱 속궁합 (20장)
 */
function getMatchBuilderCode() {
  return `
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

  return \`
    \${buildMyeongshikTableHtml(user)}

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
      <h3 class="chapter-title">\${user.name}님과 상대방의 에너지 본질 — 자석처럼 끌리는 이유와 부딪히는 지점</h3>
      <div class="chapter-prose">
        <p>
          남녀가 처음 만나 스파크가 튀는 것은 머리의 계산이 아니라, <strong>일간(日干: 영혼의 본질)</strong>과 <strong>일지(日支: 육체와 안방의 기운)</strong>가 무의식중에 서로의 결핍을 알아보고 자석처럼 끌어당기기 때문입니다.
        </p>

        <div class="event-prediction-box">
          <h5><i class="fa-solid fa-magnet"></i> 두 사람 사이에서 일어나는 화학 반응의 실체</h5>
          <p>
            \${user.name}님의 \${natureName} 기운은 상대방에게 전에 없던 안정감과 지적 매력을 선사하며, 상대방의 기운은 당신의 굳어 있던 감성을 단숨에 흔들어 깨웁니다. 서로에게서 자신이 가지지 못한 세계를 발견하기에 급격한 설렘에 빠져들지만, 익숙해질수록 그 차이점이 "왜 나와 같지 않은가"라는 실망감으로 돌변하기 쉽습니다.
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
            \${user.name}님과 상대방 사이에는 '리드하고 싶은 욕망'과 '완전히 장악당해 몰입하고 싶은 욕망'이 절묘한 텐션을 형성합니다. 낮에는 주도면밀하고 지적인 모습을 유지하는 쪽이 밤에는 예상치 못한 과감함과 뜨거운 몰입을 드러낼 때, 상대방은 형언할 수 없는 깊은 전율과 성적 카타르시스를 느끼게 됩니다.
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
          <h5><i class="fa-solid fa-heart"></i> \${user.name}님과 소중한 인연께 바치는 천문 헌사</h5>
          <p>
            "비바람이 몰아쳐도 깊이 뿌리내린 두 그루의 나무는 땅속에서 서로의 뿌리를 얽어 넘어지지 않습니다. 사랑은 상대의 완벽함을 찾는 것이 아니라, 상대의 불완전함을 나의 사랑으로 감싸 안는 용기입니다. 두 분의 앞날에 늘 하늘의 은총과 깊은 평화가 깃들기를 진심으로 축원합니다."
          </p>
        </div>
      </div>
    </div>
  \`;
}
`;
}

module.exports = { getMatchBuilderCode };
