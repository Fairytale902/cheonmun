/**
 * ============================================================================
 * 天門 (CHEONMUN) 타로 심리 엔진 — 상황별 정통 스프레드 & 맥락 리딩 엔진 (tarot-engine.js)
 * ----------------------------------------------------------------------------
 * 1. 6대 고민 상황별 전용 정통 스프레드 (재회 7카드, 속마음 6카드, 양자택일 7카드,
 *    커리어 호스슈 7카드, 재물 다이아몬드 6카드, 심층 켈틱 크로스 10카드)
 * 2. 암호학적 Fisher-Yates 셔플 & 1인칭 포지션 매핑
 * 3. 포지션 의미 × 뽑힌 카드 상징 × 정/역방향 × 인접 카드 흐름을 결합한 심층 맥락 풀이 생성기
 * 4. 스프레드별 핵심 축(Axis) 교차 비교 분석기 (A vs B, 나 vs 상대, 의식 vs 무의식 등)
 * 5. 칼 융 분석심리학 3단계 내담자 중심 카타르시스 합성기
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
  // 1. 6대 상황별 정통 타로 스프레드 규격 정의
  // --------------------------------------------------------------------------
  const SPREADS = {
    reunion: {
      id: "reunion",
      categoryTitle: "이별 · 재회 · 헤어진 사람의 속마음",
      nameKo: "릴레이션십 브릿지 스프레드 (Relationship Bridge · 7카드)",
      shortBadge: "재회 · 이별 7카드",
      layoutType: "bridge_7",
      domain: "love",
      cardCount: 7,
      desc: "나와 상대방의 현재 위치, 무의식 속 진짜 미련, 두 사람 사이의 현실적 장벽과 연락했을 때의 파장까지 입체적으로 조망하는 재회 전용 7카드 배치법입니다.",
      presetQuestions: [
        "헤어진 그 사람은 지금 나를 어떻게 생각하고 있을까요? 다시 연락해도 될까요?",
        "갑자기 차갑게 돌아선 상대방의 진짜 속마음과 재회 가능성이 궁금합니다.",
        "우리가 다시 만난다면 과거의 문제를 극복하고 잘 이어갈 수 있을까요?"
      ],
      positions: [
        {
          index: 0,
          key: "past_cause",
          name: "1. 어긋난 근본 원인과 과거의 카르마",
          shortName: "1. 이별의 근본 원인",
          question: "두 사람의 관계가 흔들리거나 멈추게 된 진짜 원인은 무엇인가?",
          role: "표면적인 다툼 이면에 숨겨진 두 사람의 근본적인 갈등 구조와 과거의 에너지"
        },
        {
          index: 1,
          key: "my_present",
          name: "2. 현재 나의 마음자리와 애착 상태",
          shortName: "2. 나의 현재 마음",
          question: "이별 후 지금 내가 서 있는 심리적 좌표와 상대방을 향한 감정의 본질은?",
          role: "그리움, 미련, 혹은 상처받은 자존심 등 현재 내담자 내면의 실제 상태"
        },
        {
          index: 2,
          key: "partner_present",
          name: "3. 상대방의 현재 상황과 표면적 태도",
          shortName: "3. 상대의 현재 상황",
          question: "그 사람은 지금 어떤 일상과 환경 속에 있으며, 겉으로 어떤 태도를 취하고 있는가?",
          role: "상대방이 외부 세계에 보여주는 현실적 근황과 의식적인 방어 태도"
        },
        {
          index: 3,
          key: "partner_unconscious",
          name: "4. 상대방 무의식 속 나에 대한 진짜 속마음",
          shortName: "4. 상대의 무의식 속마음",
          question: "이성적 판단을 내려놓은 밤, 그 사람의 무의식 깊은 곳에는 내가 어떻게 남아 있는가?",
          role: "상대방 스스로도 억누르거나 부인하고 있는 미련, 아픔, 혹은 솔직한 감정"
        },
        {
          index: 4,
          key: "obstacle",
          name: "5. 두 사람 사이를 가로막는 현실과 심리의 벽",
          shortName: "5. 재회의 장애물",
          question: "지금 두 사람이 다시 가까워지는 데 가장 큰 걸림돌이 되는 것은 무엇인가?",
          role: "반드시 직면하고 넘어서야 할 오해, 환경적 제약, 또는 자존심의 충돌"
        },
        {
          index: 5,
          key: "contact_reaction",
          name: "6. 다가갔을 때(연락 시) 일어날 파장과 반응",
          shortName: "6. 연락/행동 시 반응",
          question: "내가 먼저 손을 내밀거나 전략적으로 기다릴 때 상대방의 마음은 어떻게 움직이는가?",
          role: "접근 방식에 따른 상대방의 즉각적인 심리 변화와 관계의 촉매 작용"
        },
        {
          index: 6,
          key: "final_outcome",
          name: "7. 이 인연의 최종 귀결과 주체적 선택",
          shortName: "7. 인연의 최종 귀결",
          question: "현재의 에너지 흐름이 이어질 때 두 사람은 어떤 결말을 맞이하게 되는가?",
          role: "재회 성사 여부와 관계의 궁극적 방향성, 내담자가 쥐어야 할 주도권의 해답"
        }
      ]
    },

    romance: {
      id: "romance",
      categoryTitle: "짝사랑 · 썸 · 현재 교제 중인 상대 속마음",
      nameKo: "러버스 미러 스프레드 (Lover's Mirror · 6카드)",
      shortBadge: "연애 · 속마음 6카드",
      layoutType: "mirror_6",
      domain: "love",
      cardCount: 6,
      desc: "짝사랑하는 상대, 애매한 썸남/썸녀, 혹은 현재 만나는 연인의 겉과 속을 거울처럼 대조하여 관계의 발전 가능성과 결정적 공략법을 찾아내는 6카드 대칭 배치법입니다.",
      presetQuestions: [
        "지금 썸 타는(혹은 짝사랑하는) 그 사람도 나에게 이성적인 호감이 있을까요?",
        "현재 만나고 있는 연인이 나와의 미래를 진지하게 생각하고 있는지 속마음이 궁금합니다.",
        "그 사람의 마음을 완전히 열고 연인으로 발전하려면 어떻게 다가가야 할까요?"
      ],
      positions: [
        {
          index: 0,
          key: "my_view",
          name: "1. 내가 상대를 바라보는 시선과 기대",
          shortName: "1. 나의 시선과 기대",
          question: "나는 지금 상대방에게 어떤 매력을 느끼며, 어떤 관계를 갈망하고 있는가?",
          role: "내담자가 이 관계에 투사하고 있는 이상향과 현재의 감정 에너지"
        },
        {
          index: 1,
          key: "partner_view",
          name: "2. 상대방이 나를 바라보는 호감도와 인상",
          shortName: "2. 상대가 보는 나",
          question: "상대방의 눈에 나는 어떤 사람으로 비치고 있으며, 이성적 매력은 얼마나 작동하는가?",
          role: "상대방이 내담자에게 느끼는 호감, 설렘, 혹은 경계심의 현재 온도"
        },
        {
          index: 2,
          key: "partner_desire",
          name: "3. 상대방의 숨겨진 연애관과 무의식적 욕망",
          shortName: "3. 상대의 숨은 욕망",
          question: "그 사람이 말하지 않는 내면의 결핍과 진짜 원하는 사랑의 방식은 무엇인가?",
          role: "겉모습 뒤에 숨겨진 상대방의 연애 트라우마, 방어기제, 혹은 은밀한 바람"
        },
        {
          index: 3,
          key: "hidden_risk",
          name: "4. 두 사람 사이에 주의해야 할 오해와 암초",
          shortName: "4. 주의할 갈등 요소",
          question: "관계를 진전시킬 때 분위기를 깨뜨리거나 오해를 부를 수 있는 지점은?",
          role: "성급함, 소통 방식의 차이, 혹은 외부 변수 등 미리 피해 가야 할 리스크"
        },
        {
          index: 4,
          key: "magic_key",
          name: "5. 상대의 마음을 여는 결정적 열쇠 (Trigger)",
          shortName: "5. 관계 진전의 열쇠",
          question: "어떤 태도와 타이밍, 어떤 데이트나 대화가 그 사람의 심장을 움직이는가?",
          role: "상대방의 무의식적 빗장을 풀고 호감을 확신으로 바꾸는 실전 비책"
        },
        {
          index: 5,
          key: "romance_future",
          name: "6. 향후 관계의 발전 흐름과 최종 결론",
          shortName: "6. 관계의 미래 결론",
          question: "앞으로 1~3개월 동안 두 사람의 관계는 어떤 모습으로 피어나게 되는가?",
          role: "두 사람의 인연이 도달할 가까운 미래의 풍경과 최종 메시지"
        }
      ]
    },

    choice: {
      id: "choice",
      categoryTitle: "이직 vs 잔류 · 직진 vs 정리 (양자택일 갈림길)",
      nameKo: "운명의 갈림길 양자택일 스프레드 (Paths of Choice · 7카드)",
      shortBadge: "양자택일 A vs B 7카드",
      layoutType: "v_choice_7",
      domain: "career",
      cardCount: 7,
      desc: "현 직장에 남을지 이직할지, 이 일을 계속할지 새로운 도전을 할지 망설여질 때, A의 길과 B의 길이 가져올 과정·대가·최종 결과를 V자 분기점으로 정밀 비교하는 7카드 스프레드입니다.",
      presetQuestions: [
        "선택 A(현재 직장 잔류/안정)와 선택 B(퇴사 후 이직/새로운 도전) 중 어디가 내 운명에 더 나은 길일까요?",
        "지금 제안받은 곳으로 옮기는 것(A)과 더 좋은 조건을 기다리는 것(B) 중 무엇이 현명할까요?",
        "이 관계를 계속 유지하는 선택(A)과 과감히 정리하고 새 출발 하는 선택(B)의 결과를 비교하고 싶습니다."
      ],
      positions: [
        {
          index: 0,
          key: "center_self",
          name: "1. 갈림길에 선 현재 나의 심리적 중심점",
          shortName: "1. 현재 나의 중심",
          question: "내가 두 선택지 사이에서 결단을 내리지 못하고 흔들리는 진짜 이유는 무엇인가?",
          role: "결정을 앞두고 내담자의 무의식을 지배하고 있는 핵심 욕망과 두려움"
        },
        {
          index: 1,
          key: "path_a_process",
          name: "2. [선택 A]의 길로 갔을 때 펼쳐질 전개 과정",
          shortName: "2. 선택 A의 전개 과정",
          question: "첫 번째 선택지(유지/안정/A안)를 택했을 때 당장 마주하게 될 현실과 심리 상태는?",
          role: "선택 A의 초·중기 에너지 흐름과 일상에서 체감하게 될 분위기"
        },
        {
          index: 2,
          key: "path_a_cost",
          name: "3. [선택 A]에서 감수해야 할 대가와 리스크",
          shortName: "3. 선택 A의 대가/리스크",
          question: "선택 A를 택함으로써 포기해야 하거나 견뎌내야 할 숨은 비용은 무엇인가?",
          role: "선택 A의 그림자(Shadow) — 얻는 것 뒤에 숨겨진 아쉬움이나 한계점"
        },
        {
          index: 3,
          key: "path_a_outcome",
          name: "4. [선택 A]가 도달할 6개월~1년 뒤 최종 귀결",
          shortName: "4. 선택 A의 최종 결과",
          question: "선택 A의 길을 끝까지 걸어갔을 때 내 손에 남는 최종 성취와 만족도는?",
          role: "선택 A의 궁극적인 결실과 장기적인 운명 적합도"
        },
        {
          index: 4,
          key: "path_b_process",
          name: "5. [선택 B]의 길로 갔을 때 펼쳐질 전개 과정",
          shortName: "5. 선택 B의 전개 과정",
          question: "두 번째 선택지(변화/도전/B안)를 택했을 때 당장 마주하게 될 현실과 심리 상태는?",
          role: "선택 B의 초·중기 에너지 흐름과 새로운 환경에서의 역동성"
        },
        {
          index: 5,
          key: "path_b_cost",
          name: "6. [선택 B]에서 감수해야 할 대가와 리스크",
          shortName: "6. 선택 B의 대가/리스크",
          question: "선택 B를 택함으로써 치러야 할 통과의례나 현실적 부담은 무엇인가?",
          role: "선택 B의 그림자(Shadow) — 변화의 과정에서 반드시 넘어야 할 산"
        },
        {
          index: 6,
          key: "path_b_outcome",
          name: "7. [선택 B]가 도달할 6개월~1년 뒤 최종 귀결",
          shortName: "7. 선택 B의 최종 결과",
          question: "선택 B의 길을 끝까지 걸어갔을 때 내 손에 남는 최종 성취와 만족도는?",
          role: "선택 B의 궁극적인 결실과 두 선택지를 아우르는 최종 판정"
        }
      ]
    },

    career: {
      id: "career",
      categoryTitle: "취업 · 이직 · 창업 · 커리어 돌파구",
      nameKo: "호스슈 커리어 돌파 스프레드 (Horseshoe Breakthrough · 7카드)",
      shortBadge: "커리어 · 취업 돌파 7카드",
      layoutType: "horseshoe_7",
      domain: "career",
      cardCount: 7,
      desc: "취업, 이직, 승진, 창업의 문턱에서 왜 자꾸 막히는지, 내가 진짜 '못' 들어가는 건지 두려워서 '안' 들어가는 건지 무의식의 방어기제를 파헤치고 실질적인 합격·성공의 돌파구를 제시하는 말굽(U자) 7카드 배치법입니다.",
      presetQuestions: [
        "열심히 준비하는데도 취업(이직)이 자꾸 막히는 진짜 이유와 합격 돌파구가 궁금합니다.",
        "현재 직장에서 극심한 번아웃과 매너리즘을 겪고 있습니다. 내 커리어의 다음 돌파구는 어디에 있을까요?",
        "새롭게 준비 중인 사업(창업/프리랜서 독립)이 시장에서 성공적으로 안착할 수 있을까요?"
      ],
      positions: [
        {
          index: 0,
          key: "past_effort",
          name: "1. 지금까지 쌓아온 커리어 기반과 과거의 궤적",
          shortName: "1. 과거의 노력과 기반",
          question: "지금의 나를 만든 과거의 경험과 이미 내 안에 축적된 진짜 역량은 무엇인가?",
          role: "내담자가 스스로 과소평가하거나 잊고 있는 잠재력과 지난 시간의 의미"
        },
        {
          index: 1,
          key: "present_wall",
          name: "2. 현재 마주한 현실적 압박과 커리어 좌표",
          shortName: "2. 현재 마주한 벽",
          question: "지금 내 발목을 잡고 있는 가장 직접적인 현실 문제와 스트레스의 실체는?",
          role: "현재 커리어 전선에서 겪고 있는 정체감, 경쟁 압박, 혹은 환경적 한계"
        },
        {
          index: 2,
          key: "unconscious_block",
          name: "3. 무의식의 맹점: '못' 가는 것인가, '안' 가는 것인가",
          shortName: "3. 무의식 방어기제 직면",
          question: "과연 실력이 부족해서 못 들어가는 걸까, 상처받거나 실패할까 봐 무의식적으로 발을 빼고 있는 걸까?",
          role: "칼 융 심리학의 그림자(Shadow) — 완벽주의, 거절 공포, 혹은 자기 태업의 본질"
        },
        {
          index: 3,
          key: "external_env",
          name: "4. 나를 둘러싼 시장 환경과 타인들의 평가",
          shortName: "4. 외부 환경과 시선",
          question: "지원하는 회사, 업계, 혹은 주변 동료·면접관들은 나를 어떻게 바라보고 있는가?",
          role: "내 주관적 착각을 걷어내고 바라본 객관적인 외부 시장의 기류와 평가"
        },
        {
          index: 4,
          key: "hidden_opportunity",
          name: "5. 판도를 바꿀 숨은 기회와 귀인·촉매제",
          shortName: "5. 숨은 기회와 조력",
          question: "내가 미처 보지 못했던 의외의 기회나 나를 끌어줄 돌파구는 어디에 숨어 있는가?",
          role: "막힌 혈을 뚫어줄 새로운 관점, 문서운, 인맥, 혹은 직무적 무기"
        },
        {
          index: 5,
          key: "action_strategy",
          name: "6. 당장 실행해야 할 구체적 필승 전략",
          shortName: "6. 핵심 돌파 전략",
          question: "합격과 성공을 현실로 만들기 위해 지금 당장 바꾸고 실행해야 할 행동은?",
          role: "막연한 위로를 넘어 이력서, 면접 태도, 비즈니스 모델에서 취할 실전 행동 지침"
        },
        {
          index: 6,
          key: "career_outcome",
          name: "7. 커리어 돌파의 최종 결실과 미래의 위상",
          shortName: "7. 최종 성취와 결과",
          question: "이 시련의 터널을 통과한 뒤 내가 서 있게 될 자리와 손에 쥐게 될 성취는?",
          role: "향후 6개월~1년 내에 맞이할 커리어의 최종 귀결과 영혼의 성장"
        }
      ]
    },

    wealth: {
      id: "wealth",
      categoryTitle: "재물 · 투자 · 사업 자금 · 금전 파이프라인",
      nameKo: "펜타클 다이아몬드 스프레드 (Pentacle Wealth Diamond · 6카드)",
      shortBadge: "재물 · 금전 다이아몬드 6카드",
      layoutType: "diamond_6",
      domain: "wealth",
      cardCount: 6,
      desc: "현재 내 금전운의 중심 에너지를 진단하고, 돈이 새어나가는 무의식적 누수 혈점과 새롭게 열릴 수익 파이프라인 및 투자 타이밍을 정밀하게 짚어내는 다이아몬드 6카드 배치법입니다.",
      presetQuestions: [
        "올해 내 금전운의 흐름과 목돈을 모으거나 자산을 불릴 수 있는 돌파구가 궁금합니다.",
        "지금 계획 중인 투자(부동산·주식·사업 자금 투입)를 실행해도 괜찮을지 리스크를 알고 싶습니다.",
        "열심히 일해도 돈이 모이지 않고 새어나가는 근본 원인과 재물 개운법이 무엇인가요?"
      ],
      positions: [
        {
          index: 0,
          key: "wealth_center",
          name: "1. 현재 나의 재물 그릇과 금전 에너지 좌표",
          shortName: "1. 현재 재물 좌표",
          question: "지금 내 수중에 흐르는 돈의 기운과 재정적 안정도는 어떤 상태인가?",
          role: "내담자의 현재 자산 흐름과 돈을 대하는 근본적인 심리적 태도"
        },
        {
          index: 1,
          key: "money_leak",
          name: "2. 자금이 막히거나 새어나가는 누수의 원인",
          shortName: "2. 금전 누수와 장애",
          question: "내 재물운의 발목을 잡고 지출이나 손실을 유발하는 숨은 원인은 무엇인가?",
          role: "충동적 소비, 잘못된 인간관계, 혹은 비효율적인 자금 배분의 맹점"
        },
        {
          index: 2,
          key: "risk_warning",
          name: "3. 절대 피해야 할 유혹과 재정적 리스크",
          shortName: "3. 경계할 투자 리스크",
          question: "지금 시점에서 가장 조심해야 할 손실 요인이나 달콤한 함정은 무엇인가?",
          role: "자산을 지키기 위해 반드시 쳐내야 할 과욕, 조급증, 혹은 위험한 제안"
        },
        {
          index: 3,
          key: "new_pipeline",
          name: "4. 새롭게 열리는 수익 기회와 문서·계약운",
          shortName: "4. 새로운 수익 파이프라인",
          question: "나에게 실질적인 부를 가져다줄 새로운 기회나 수익원은 어디에서 오는가?",
          role: "본업의 확장, 부수입, 계약 성사, 혹은 가치가 상승할 기회의 영역"
        },
        {
          index: 4,
          key: "wealth_strategy",
          name: "5. 부의 흐름을 당기는 실전 자산 관리 지침",
          shortName: "5. 실전 재무 행동 지침",
          question: "재물 그릇을 키우고 현금 흐름을 극대화하기 위해 당장 취해야 할 태도는?",
          role: "공격적 확장과 보수적 수성 중 지금 내담자에게 필요한 명확한 금전 전략"
        },
        {
          index: 5,
          key: "wealth_outcome",
          name: "6. 향후 도달할 재정적 결실과 최종 금전운",
          shortName: "6. 최종 재물 결실",
          question: "이 흐름을 따라갔을 때 마침내 내 손에 쥐어질 재물적 성취와 규모는?",
          role: "다가올 재정적 풍요의 수준과 흔들리지 않는 부를 완성하는 최종 신탁"
        }
      ]
    },

    celtic: {
      id: "celtic",
      categoryTitle: "종합 심층 운명 · 인생 전환점 · 무의식 완전 해독",
      nameKo: "정통 켈틱 크로스 스프레드 (Master Celtic Cross · 10카드)",
      shortBadge: "정통 켈틱 크로스 10카드",
      layoutType: "celtic_10",
      domain: "inner",
      cardCount: 10,
      desc: "타로 스프레드의 제왕(King of Spreads). 한 가지 단편적 고민을 넘어 내 삶을 둘러싼 의식과 무의식, 과거와 미래, 내면의 두려움과 외부 환경의 역학을 10장의 카드로 완벽히 해부합니다.",
      presetQuestions: [
        "지금 내 인생에서 가장 중요한 전환점에 서 있습니다. 나도 모르는 내 무의식의 진짜 해답과 앞으로의 운명 흐름이 궁금합니다.",
        "겉으로는 버티고 있지만 내면이 많이 지쳐 있습니다. 지금 내 삶을 가로막는 근본 문제와 앞으로 나아갈 길을 알고 싶습니다.",
        "현재 내가 간절히 바라는 목표가 이루어질 수 있을지, 무엇을 바꾸어야 운이 트일지 10장의 카드로 깊이 있게 보고 싶습니다."
      ],
      positions: [
        {
          index: 0,
          key: "signifier",
          name: "1. 현재 나를 둘러싼 핵심 상황 (The Present)",
          shortName: "1. 현재 핵심 상황",
          question: "지금 이 순간 내 삶과 마음을 지배하고 있는 가장 중심적인 에너지는 무엇인가?",
          role: "질문의 본질이자 내담자가 서 있는 현재의 실존적 좌표"
        },
        {
          index: 1,
          key: "crossing",
          name: "2. 가로지르는 장애물 또는 촉매 (The Crossing)",
          shortName: "2. 교차하는 장애/촉매",
          question: "1번 카드를 수직으로 가로지르며 나를 시험에 들게 하거나 자극하는 힘은 무엇인가?",
          role: "현재 상황에서 피할 수 없이 정면 돌파해야만 하는 핵심 시련이자 성장 촉매"
        },
        {
          index: 2,
          key: "foundation",
          name: "3. 잠재의식의 뿌리와 숨겨진 본심 (The Foundation)",
          shortName: "3. 잠재의식의 뿌리",
          question: "내 이성이 미처 깨닫지 못하는 무의식 밑바닥에는 어떤 상처나 본능이 자리 잡고 있는가?",
          role: "현재의 문제를 만들어낸 가장 깊은 영혼의 뿌리이자 무의식적 동기"
        },
        {
          index: 3,
          key: "recent_past",
          name: "4. 지나가는 과거의 사건과 여파 (The Past)",
          shortName: "4. 지나가는 과거",
          question: "얼마 전까지 나를 흔들었으나 이제 막 영향력을 잃기 시작한 과거의 기류는?",
          role: "현재 상황에 직접적인 배경이 된 최근의 경험과 이제 놓아주어야 할 기억"
        },
        {
          index: 4,
          key: "crown",
          name: "5. 의식적 목표와 추구하는 이상향 (The Crown)",
          shortName: "5. 상위 의식과 목표",
          question: "내 머릿속(의식)에서 가장 바라는 최상의 시나리오나 목표는 무엇인가?",
          role: "3번 무의식과 대비되는 내담자의 표면적 의지, 욕망, 혹은 이상적 기대"
        },
        {
          index: 5,
          key: "near_future",
          name: "6. 곧 다가올 가까운 미래의 기류 (Near Future)",
          shortName: "6. 가까운 미래",
          question: "향후 1~3개월 이내에 내 눈앞에 구체적으로 다가올 사건과 에너지 변화는?",
          role: "곧 마주하게 될 새로운 국면과 단기적인 운의 파도"
        },
        {
          index: 6,
          key: "self_attitude",
          name: "7. 문제를 대하는 나의 내면 태도 (Self Image)",
          shortName: "7. 나의 내면 태도",
          question: "이 거대한 상황 속에서 나는 스스로를 어떻게 정의하며 어떤 자세를 취하고 있는가?",
          role: "상황을 돌파하거나 회피하려는 내담자 자신의 자아상과 심리적 방어 태세"
        },
        {
          index: 7,
          key: "environment",
          name: "8. 주변 환경과 타인들의 영향력 (Environment)",
          shortName: "8. 주변 환경과 타인",
          question: "나를 둘러싼 가족, 동료, 상대방, 혹은 사회적 환경은 나에게 어떤 압력이나 도움을 주는가?",
          role: "내 의지만으로 통제할 수 없는 외부 세계의 시선과 관계의 역학"
        },
        {
          index: 8,
          key: "hopes_fears",
          name: "9. 깊은 갈망과 은밀한 두려움 (Hopes & Fears)",
          shortName: "9. 희망과 두려움",
          question: "내가 가장 간절히 원하면서도 동시에 가장 두려워하는 양가감정의 실체는?",
          role: "기대와 공포가 동전의 양면처럼 맞물려 있는 내면의 가장 예민한 급소"
        },
        {
          index: 9,
          key: "final_outcome",
          name: "10. 모든 기류가 모이는 최종 귀결 (Final Outcome)",
          shortName: "10. 최종 운명 귀결",
          question: "1번부터 9번까지의 모든 에너지가 결합하여 도달하게 될 최종적인 결론과 삶의 교훈은?",
          role: "이번 타로 리딩의 대단원이자 내담자가 운명의 주인으로 거듭나기 위한 최종 해답"
        }
      ]
    }
  };

  // 호환성을 위한 별칭 매핑
  SPREADS.celtic_cross = SPREADS.celtic;
  SPREADS.two_choice = SPREADS.choice;
  SPREADS.three_timeline = SPREADS.reunion;
  SPREADS.three_mind = SPREADS.romance;
  SPREADS.single = SPREADS.wealth;

  // --------------------------------------------------------------------------
  // 2. 암호학적 셔플 & 스프레드 추출
  // --------------------------------------------------------------------------
  function secureRandom() {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] / (0xffffffff + 1);
    }
    return Math.random();
  }

  function shuffleDeck(cards) {
    const deck = [...cards];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(secureRandom() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function drawSpread(spreadId, selectedIndices, reversedChance = 0.28) {
    const spreadMeta = SPREADS[spreadId] || SPREADS.celtic;
    const allCards = TarotDB.CARDS;
    const count = spreadMeta.cardCount;

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
  // 3. 스프레드 전체 구성비 & 4원소 역학 분석 (Spread Dynamics & Elemental Dignity)
  // --------------------------------------------------------------------------
  function calculateElementalDignity(drawnCards) {
    const counts = { fire: 0, water: 0, air: 0, earth: 0 };
    let majorCount = 0;
    let minorCount = 0;
    let uprightCount = 0;
    let reversedCount = 0;

    drawnCards.forEach(item => {
      const el = item.card.element;
      if (counts[el] !== undefined) counts[el]++;
      if (item.card.arcana === 'major' || item.card.suit === 'major') {
        majorCount++;
      } else {
        minorCount++;
      }
      if (item.isReversed) {
        reversedCount++;
      } else {
        uprightCount++;
      }
    });

    const total = drawnCards.length;
    const percentages = {
      fire: Math.round((counts.fire / total) * 100),
      water: Math.round((counts.water / total) * 100),
      air: Math.round((counts.air / total) * 100),
      earth: Math.round((counts.earth / total) * 100)
    };

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const dominant = sorted[0];
    const deficient = sorted[sorted.length - 1];

    let synergyTitle = "";
    let synergyDesc = "";

    if (counts.fire > 0 && counts.air > 0 && counts.water === 0) {
      synergyTitle = "열정과 이성의 결합 (불 + 바람 상생)";
      synergyDesc = "직관적인 열망(불)이 날카로운 결단력(공기)을 만나 강력한 돌파구를 형성하고 있습니다. 감정적 미련에 발목 잡히기보다 명확한 판단과 빠른 실행이 상황을 단숨에 바꿉니다.";
    } else if (counts.water > 0 && counts.earth > 0 && counts.fire === 0) {
      synergyTitle = "비옥한 대지와 깊은 샘물 (물 + 흙 상생)";
      synergyDesc = "깊은 정서적 유대(물)와 현실적인 안정감(흙)이 결합하여 흔들리지 않는 신뢰와 실질적 결실을 예고합니다. 서두르지 않고 차분히 쌓아 올리는 진심이 승리합니다.";
    } else if (counts.fire >= 2 && counts.water >= 2) {
      synergyTitle = "열망과 감정의 뜨거운 증기 충돌 (불 + 물 교차)";
      synergyDesc = "당장 행동하고 싶은 조급한 열망(불)과 상처받기 두려운 깊은 감정(물)이 내면에서 강하게 부딪히고 있습니다. 감정의 파도가 가라앉을 때까지 충동적인 행동을 제어하는 것이 핵심입니다.";
    } else if (counts.air >= 2 && counts.earth >= 2) {
      synergyTitle = "머릿속의 계산과 발밑 현실의 줄다리기 (공기 + 흙 교차)";
      synergyDesc = "수많은 생각과 시나리오(공기)가 현실적인 조건과 책임(흙) 사이에서 팽팽하게 맞서고 있습니다. 지나친 걱정과 계산을 멈추고 눈앞의 실질적인 한 걸음에 집중해야 합니다.";
    } else {
      synergyTitle = `${TarotDB.ELEMENTS[dominant[0]].ko} 중심의 에너지 집중`;
      synergyDesc = `뽑으신 카드들 속에서 '${TarotDB.ELEMENTS[dominant[0]].ko}'의 기운이 가장 강하게 작동하며, 반면 '${TarotDB.ELEMENTS[deficient[0]].ko}'의 감각을 의식적으로 보완할 때 질문하신 상황의 균형이 완성됩니다.`;
    }

    // 메이저 아르카나 비중에 따른 운명적 무게감 해석
    let arcanaAnalysis = "";
    const majorRatio = Math.round((majorCount / total) * 100);
    if (majorRatio >= 45) {
      arcanaAnalysis = `전체 ${total}장 중 메이저 아르카나가 ${majorCount}장(${majorRatio}%)이나 출현했습니다. 이는 지금 겪고 계신 문제가 단순한 일상의 해프닝이 아니라, 내담자님의 인생 궤도와 영혼의 성장을 뒤흔드는 중대한 '운명적 변곡점'임을 뜻합니다.`;
    } else if (majorRatio >= 25) {
      arcanaAnalysis = `전체 ${total}장 중 메이저 아르카나 ${majorCount}장과 마이너 아르카나 ${minorCount}장이 이상적인 균형을 이루고 있습니다. 큰 운명의 흐름 속에서도 내담자님의 구체적인 현실 선택과 행동이 결과를 좌우할 수 있는 시기입니다.`;
    } else {
      arcanaAnalysis = `전체 ${total}장 중 마이너 아르카나가 ${minorCount}장(${100 - majorRatio}%)으로 주도권을 쥐고 있습니다. 이는 정해진 숙명에 휘둘리는 상황이 아니라, 내담자님이 당장 오늘 어떤 태도와 행동을 취하느냐에 따라 결과를 100% 바꿀 수 있는 '현실 주도형 국면'임을 보여줍니다.`;
    }

    // 정/역방향 비중에 따른 에너지 흐름 해석
    let orientationAnalysis = "";
    if (reversedCount === 0) {
      orientationAnalysis = `뽑힌 ${total}장의 카드가 모두 정방향(Upright)으로 열려 있습니다. 억압되거나 왜곡된 흐름 없이 에너지가 순리대로 막힘없이 표출되고 있어, 카드의 조언을 그대로 실행에 옮기시면 됩니다.`;
    } else if (reversedCount >= Math.ceil(total * 0.5)) {
      orientationAnalysis = `역방향(Reversed) 카드가 ${reversedCount}장 출현했습니다. 이는 운이 나쁘다는 뜻이 아니라, 내면의 에너지가 밖으로 건강하게 흐르지 못하고 '두려움, 과잉 집착, 혹은 회피'로 인해 안으로 꺾여 있음을 알리는 무의식의 신호입니다. 막힌 혈점을 풀어주는 심리적 전환이 필요합니다.`;
    } else {
      orientationAnalysis = `정방향 ${uprightCount}장과 역방향 ${reversedCount}장이 교차하고 있습니다. 순조롭게 풀리는 영역과 무의식적으로 저항하거나 두려워하는 지점(역방향 포지션)이 뚜렷이 구분되므로, 역방향이 놓인 자리를 집중적으로 점검해야 합니다.`;
    }

    return {
      counts,
      percentages,
      majorCount,
      minorCount,
      uprightCount,
      reversedCount,
      majorRatio,
      dominant: { element: dominant[0], count: dominant[1], meta: TarotDB.ELEMENTS[dominant[0]] },
      deficient: { element: deficient[0], count: deficient[1], meta: TarotDB.ELEMENTS[deficient[0]] },
      synergyTitle,
      synergyDesc,
      arcanaAnalysis,
      orientationAnalysis
    };
  }

  // --------------------------------------------------------------------------
  // 4. 포지션별 심층 맥락 풀이 생성기 (Position × Card × Adjacent Flow)
  // --------------------------------------------------------------------------
  function generatePositionContextualReading(spreadMeta, drawnCards, idx, userQuestion) {
    const current = drawnCards[idx];
    const pos = current.position;
    const card = current.card;
    const isRev = current.isReversed;
    const dirKo = isRev ? "역방향 (Reversed)" : "정방향 (Upright)";
    const textObj = isRev ? card.reversed : card.upright;

    const prevItem = idx > 0 ? drawnCards[idx - 1] : null;
    const nextItem = idx < drawnCards.length - 1 ? drawnCards[idx + 1] : null;

    // 스프레드 도메인에 맞는 카드 원문 선택
    const domainKey = spreadMeta.domain === "inner" ? "psychology" : spreadMeta.domain;
    const domainSpecificText = textObj[domainKey] || textObj.love || textObj.career || textObj.core;
    const psychologyText = textObj.psychology || card.upright.psychology || textObj.core;

    // 1) 포지션 맥락 도입부: 왜 이 자리에 이 카드가 나왔는가
    let contextIntro = `<strong>[${pos.name}]</strong> 자리는 <em>"${pos.question}"</em>라는 질문에 답하는 핵심 좌표입니다. `;
    if (isRev) {
      contextIntro += `이 자리에 <strong>[${card.nameKo}]</strong>가 <strong>역방향(${card.reversed.lens || '에너지의 내면화/과잉·결핍'})</strong>으로 놓였다는 것은, 이 영역에서 에너지가 자연스럽게 흐르지 못하고 무의식적인 저항이나 두려움, 혹은 과도한 집착으로 굴절되어 있음을 보여줍니다.`;
    } else {
      contextIntro += `이 자리에 <strong>[${card.nameKo}]</strong>가 <strong>정방향</strong>으로 당당히 자리 잡은 것은, 이 카드가 품은 본연의 원형 에너지(${card.keywords ? card.keywords.slice(0, 3).join(', ') : ''})가 현재 이 포지션의 해답을 가장 정직하고 선명하게 지배하고 있음을 뜻합니다.`;
    }

    // 2) 상황별·포지션별 심층 결합 해설
    let deepContextualBody = "";
    const sId = spreadMeta.id;

    if (sId === "reunion") {
      if (idx === 0) {
        deepContextualBody = `두 사람의 관계가 흔들렸던 근본 원인을 비추는 첫 자리에 [${card.nameKo}]가 출현했습니다. ${textObj.core} 즉, 표면적인 말다툼이나 사소한 서운함은 도화선이었을 뿐, 실제 내면에서는 '${card.keywords ? card.keywords[0] : '감정의 불균형'}'과 관련된 심리적 마찰이 누적되어 왔음을 알 수 있습니다. ${domainSpecificText}`;
      } else if (idx === 1) {
        deepContextualBody = `현재 내담자님의 마음자리를 대변하는 이 카드는 지금 당신이 겪고 있는 감정의 온도를 정밀하게 비춥니다. ${textObj.core} ${domainSpecificText} 스스로는 괜찮다고 다독이거나 이성적으로 정리하려 해도, 내면 깊은 곳에서는 아직 이 카드의 파동이 강하게 일렁이고 있습니다.`;
      } else if (idx === 2) {
        deepContextualBody = `상대방이 현재 처해 있는 현실과 겉으로 보여주는 태도는 [${card.nameKo}]로 요약됩니다. ${textObj.core} 밖으로 드러나는 모습만 보면 ${isRev ? '혼란스럽거나 방어적인 벽을 치고 있는 듯 보이지만' : '자신만의 페이스를 유지하며 감정을 통제하고 있는 듯 보이지만'}, 이는 어디까지나 표면적인 페르소나(가면)에 가깝습니다.`;
      } else if (idx === 3) {
        deepContextualBody = `재회 리딩에서 가장 중요한 <strong>'상대방의 무의식 속 진짜 속마음'</strong> 자리에 [${card.nameKo} (${dirKo})]가 나왔습니다. 낮 동안의 이성적 계산이 꺼진 밤, 그 사람의 무의식을 지배하는 감정은 바로 이것입니다: "${textObj.core}" ${domainSpecificText} ${psychologyText}`;
      } else if (idx === 4) {
        deepContextualBody = `두 사람 사이를 가로막고 있는 가장 현실적이고 심리적인 장벽은 [${card.nameKo}]가 가리키는 문제입니다. ${textObj.core} 이 장벽을 단순히 무시하거나 감정에만 호소해서 넘으려 하면 오히려 역효과가 날 수 있습니다. ${domainSpecificText}`;
      } else if (idx === 5) {
        deepContextualBody = `만약 내담자님이 먼저 연락하거나 다가갔을 때(혹은 전략적 침묵을 지켰을 때) 일어날 상대방의 반응과 파장은 [${card.nameKo}]로 나타납니다. ${textObj.core} ${domainSpecificText} 따라서 상대의 이러한 심리적 반사 반응을 미리 계산에 넣고 움직여야 주도권을 잃지 않습니다.`;
      } else {
        deepContextualBody = `일곱 장의 재회 여정이 모이는 최종 귀결 자리에 [${card.nameKo} (${dirKo})]가 선언되었습니다. ${textObj.core} ${domainSpecificText} 결국 이 인연의 매듭을 푸는 열쇠는 상대방의 변덕에 끌려다니는 것이 아니라, 이 카드가 제시하는 주체적 중심을 회복하는 데 있습니다.`;
      }
    } else if (sId === "romance") {
      if (idx === 0) {
        deepContextualBody = `상대방을 향한 내담자님의 현재 시선과 기대는 [${card.nameKo}]에 담겨 있습니다. ${textObj.core} ${domainSpecificText}`;
      } else if (idx === 1) {
        deepContextualBody = `거울의 반대편, 상대방이 지금 내담자님을 바라보는 인상과 호감도는 [${card.nameKo} (${dirKo})]입니다. ${textObj.core} ${domainSpecificText} 1번 자리의 내 마음([${drawnCards[0].card.nameKo}])과 비교해 보면 두 사람의 시선이 어떻게 교차하고 있는지 선명히 드러납니다.`;
      } else if (idx === 2) {
        deepContextualBody = `그 사람이 겉으로 말하지 않는 연애의 속내와 무의식적 욕망은 [${card.nameKo}]가 쥐고 있습니다. ${textObj.core} ${psychologyText} 상대를 움직이려면 겉모습이 아니라 바로 이 내면의 갈증을 건드려주어야 합니다.`;
      } else if (idx === 3) {
        deepContextualBody = `두 사람 사이에서 가장 경계해야 할 암초와 오해의 불씨는 [${card.nameKo}]입니다. ${textObj.core} ${domainSpecificText}`;
      } else if (idx === 4) {
        deepContextualBody = `상대방의 마음 빗장을 활짝 열어젖힐 결정적 열쇠(Trigger)로 [${card.nameKo}]가 뽑혔습니다! ${textObj.core} ${domainSpecificText} 이 카드의 무드와 에너지로 다가갈 때 상대방은 가장 강한 끌림을 느끼게 됩니다.`;
      } else {
        deepContextualBody = `두 사람의 관계가 향하는 최종 미래 흐름은 [${card.nameKo} (${dirKo})]로 귀결됩니다. ${textObj.core} ${domainSpecificText}`;
      }
    } else if (sId === "choice") {
      if (idx === 0) {
        deepContextualBody = `A와 B라는 두 갈림길 한가운데 서 있는 내담자님의 현재 내면 상태는 [${card.nameKo}]입니다. ${textObj.core} ${psychologyText} 당신이 결정을 내리지 못하고 망설이는 진짜 이유가 바로 이 카드 속에 투영되어 있습니다.`;
      } else if (idx === 1) {
        deepContextualBody = `<strong>[선택 A의 길]</strong>로 발을 내디뎠을 때 펼쳐질 초기·중기 전개 과정은 [${card.nameKo}]입니다. ${textObj.core} ${domainSpecificText}`;
      } else if (idx === 2) {
        deepContextualBody = `<strong>[선택 A]</strong>를 택했을 때 반드시 감수해야 할 현실적 대가와 숨은 리스크는 [${card.nameKo}]로 나타납니다. ${textObj.core} 세상에 공짜 선택은 없듯, A의 길이 요구하는 이 무게를 견딜 수 있는지 냉정히 따져보아야 합니다.`;
      } else if (idx === 3) {
        deepContextualBody = `<strong>[선택 A의 최종 결과]</strong> 자리에 [${card.nameKo} (${dirKo})]가 놓였습니다. A의 길을 끝까지 걸어갔을 때 마침내 손에 쥐게 될 결실은 다음과 같습니다: ${textObj.core} ${domainSpecificText}`;
      } else if (idx === 4) {
        deepContextualBody = `이제 반대편 <strong>[선택 B의 길]</strong>로 눈을 돌려봅니다. B를 선택했을 때 펼쳐질 전개 과정은 [${card.nameKo}]입니다. A의 과정이었던 [${drawnCards[1].card.nameKo}]와는 전혀 다른 결의 에너지가 흐릅니다. ${textObj.core} ${domainSpecificText}`;
      } else if (idx === 5) {
        deepContextualBody = `<strong>[선택 B]</strong>를 택했을 때 치러야 할 대가와 통과의례는 [${card.nameKo}]입니다. ${textObj.core} 새로운 길을 가는 대신 감당해야 할 현실적 과제를 정직하게 일깨워 줍니다.`;
      } else {
        deepContextualBody = `<strong>[선택 B의 최종 결과]</strong> 자리에 [${card.nameKo} (${dirKo})]가 선언되었습니다! ${textObj.core} ${domainSpecificText} 선택 A의 최종 결과였던 [${drawnCards[3].card.nameKo}]와 나란히 놓고 비교해 보면, 어느 길이 내 영혼의 성취에 더 부합하는지 명쾌한 답이 나옵니다.`;
      }
    } else if (sId === "career") {
      if (idx === 2) {
        // 3번 포지션: 못 가는가 안 가는가 무의식 직면
        deepContextualBody = `이 스프레드에서 가장 뼈를 때리는 핵심 질문, <strong>"과연 나는 실력이 없어서 '못' 가는 것인가, 상처받거나 실패할까 봐 무의식적으로 '안' 가고 있는 것인가?"</strong>에 대해 [${card.nameKo} (${dirKo})]가 답하고 있습니다. ${textObj.core} ${psychologyText} 정신과적 상담의 렌즈로 들여다보면, 당신을 막아선 가장 큰 벽은 외부의 스펙이 아니라 '${card.keywords ? card.keywords.slice(0, 2).join('과 ') : '내면의 방어기제'}'에 묶여 있던 당신 자신의 무의식적 주저함일 수 있습니다. ${domainSpecificText}`;
      } else {
        deepContextualBody = `커리어 돌파의 <strong>[${pos.shortName}]</strong> 자리에서 [${card.nameKo} (${dirKo})]가 빛을 발합니다. ${textObj.core} ${domainSpecificText} ${psychologyText}`;
      }
    } else if (sId === "wealth") {
      deepContextualBody = `재물 다이아몬드의 <strong>[${pos.shortName}]</strong> 자리에 놓인 [${card.nameKo} (${dirKo})]는 당신의 금전 파이프라인에 대해 매우 구체적인 신호를 보냅니다. ${textObj.core} ${domainSpecificText} ${psychologyText}`;
    } else {
      // 켈틱 크로스 10카드
      deepContextualBody = `정통 켈틱 크로스의 <strong>[${pos.name}]</strong> 자리에 [${card.nameKo} (${dirKo})]가 출현했습니다. ${textObj.core} ${domainSpecificText} 또한 심층 심리학적으로 볼 때 이 카드는 "${psychologyText}"라는 무의식의 메시지를 강하게 던지고 있습니다.`;
    }

    // 3) 인접 카드와의 유기적 흐름 연결 (Card-to-Card Connection)
    let flowConnection = "";
    if (prevItem && nextItem) {
      flowConnection = `앞선 <strong>${prevItem.position.shortName}</strong>의 <strong>[${prevItem.card.nameKo}]</strong> 에너지가 현재 이 자리의 <strong>[${card.nameKo}]</strong>를 거쳐, 다음 단계인 <strong>${nextItem.position.shortName}</strong>의 <strong>[${nextItem.card.nameKo}]</strong>로 이어지는 흐름에 주목하십시오. [${prevItem.card.nameKo}]에서 비롯된 파동이 [${card.nameKo}]의 국면을 통과하며 어떻게 전환되는지가 이번 리딩의 핵심 맥락입니다.`;
    } else if (prevItem && !nextItem) {
      flowConnection = `지금까지 펼쳐진 모든 포지션, 특히 직전 <strong>${prevItem.position.shortName}</strong>의 <strong>[${prevItem.card.nameKo}]</strong> 에너지를 통과하여 마침내 도달한 최종 종착지가 바로 이 <strong>[${card.nameKo}]</strong>입니다. 앞선 카드들이 보여준 갈등과 과정을 하나로 묶어내는 결정적 해답입니다.`;
    } else if (!prevItem && nextItem) {
      flowConnection = `스프레드의 문을 여는 이 <strong>[${card.nameKo}]</strong>의 기운은 곧바로 두 번째 자리인 <strong>${nextItem.position.shortName}</strong>의 <strong>[${nextItem.card.nameKo}]</strong>와 맞물리며 전체 이야기의 서막을 형성합니다.`;
    }

    return {
      position: pos,
      card: card,
      isReversed: isRev,
      dirKo: dirKo,
      contextIntro: contextIntro,
      deepContextualBody: deepContextualBody,
      flowConnection: flowConnection,
      advice: textObj.advice,
      symbolism: card.symbolism || card.archetype || "",
      archetype: card.archetype || card.elementKo || ""
    };
  }

  // --------------------------------------------------------------------------
  // 5. 스프레드별 핵심 축(Axis) 교차 비교 분석기
  // --------------------------------------------------------------------------
  function generateAxisAnalysis(spreadResult) {
    const spreadMeta = spreadResult.spread;
    const cards = spreadResult.cards;
    const sId = spreadMeta.id;

    const fmt = (item) => {
      if (!item) return "";
      return `${item.card.nameKo} (${item.isReversed ? '역방향' : '정방향'})`;
    };
    const getCore = (item) => {
      if (!item) return "";
      return (item.isReversed ? item.card.reversed.core : item.card.upright.core);
    };

    if (sId === "choice" && cards.length >= 7) {
      return {
        title: "양자택일 [선택 A vs 선택 B] 정밀 비교 판정",
        subtitle: "두 갈림길의 전개 과정, 치러야 할 대가, 그리고 최종 귀결의 1:1 대조 분석",
        type: "comparison",
        axes: [
          {
            label: "제 1 축 · 초기 전개 과정 비교",
            leftTitle: `선택 A의 과정: ${fmt(cards[1])}`,
            leftDesc: getCore(cards[1]),
            rightTitle: `선택 B의 과정: ${fmt(cards[4])}`,
            rightDesc: getCore(cards[4]),
            synthesis: `선택 A로 갈 경우 [${cards[1].card.nameKo}]의 흐름 속에서 ${cards[1].isReversed ? '다소간의 답답함이나 조정이' : '안정적이고 예측 가능한 전개가'} 이어지는 반면, 선택 B로 갈 경우 [${cards[4].card.nameKo}]가 상징하듯 ${cards[4].isReversed ? '초기 적응의 진통이 따르지만' : '역동적이고 새로운 에너지가'} 즉각 작동합니다.`
          },
          {
            label: "제 2 축 · 감수해야 할 대가(Cost) 비교",
            leftTitle: `선택 A의 리스크: ${fmt(cards[2])}`,
            leftDesc: getCore(cards[2]),
            rightTitle: `선택 B의 리스크: ${fmt(cards[5])}`,
            rightDesc: getCore(cards[5]),
            synthesis: `A를 택하면 [${cards[2].card.nameKo}]라는 기회비용을 감내해야 하고, B를 택하면 [${cards[5].card.nameKo}]라는 현실적 과제를 넘어야 합니다. 내담자님이 심리적으로 덜 후회할 대가가 어느 쪽인지가 첫 번째 기준입니다.`
          },
          {
            label: "제 3 축 · 최종 귀결(Outcome) 승부 판정",
            leftTitle: `선택 A 최종 결과: ${fmt(cards[3])}`,
            leftDesc: getCore(cards[3]),
            rightTitle: `선택 B 최종 결과: ${fmt(cards[6])}`,
            rightDesc: getCore(cards[6]),
            synthesis: `최종 결과 자리에 놓인 두 카드를 대조해 보면, 선택 A는 [${fmt(cards[3])}]로, 선택 B는 [${fmt(cards[6])}]로 귀결됩니다. ${(!cards[6].isReversed && cards[3].isReversed) ? '카드의 정방향 생명력이 살아 있는 [선택 B] 쪽이 장기적인 운의 확장성과 영혼의 만족도에서 훨씬 우세합니다.' : (!cards[3].isReversed && cards[6].isReversed) ? '카드의 안정성이 정방향으로 확보된 [선택 A] 쪽이 현재 시점에서는 리스크를 줄이고 실리를 챙기는 데 더 유리합니다.' : '두 길 모두 분명한 고유 가치를 지니고 있으나, 1번 중심 카드인 [' + fmt(cards[0]) + ']의 내면 갈망을 실질적으로 해소해 주는 쪽으로 결단을 내려야 합니다.'}`
          }
        ]
      };
    }

    if (sId === "reunion" && cards.length >= 7) {
      return {
        title: "재회 핵심 축 교차 분석: [나의 마음 vs 상대의 속마음]",
        subtitle: "표면적 태도 뒤에 숨겨진 무의식의 온도차와 재회 돌파 시나리오",
        type: "reunion_axis",
        axes: [
          {
            label: "제 1 축 · 현재 감정의 온도차 대조",
            leftTitle: `나의 현재 마음: ${fmt(cards[1])}`,
            leftDesc: getCore(cards[1]),
            rightTitle: `상대의 무의식 속마음: ${fmt(cards[3])}`,
            rightDesc: getCore(cards[3]),
            synthesis: `내담자님은 현재 [${fmt(cards[1])}]의 마음자리에 서 계시고, 상대방의 무의식 깊은 곳에는 [${fmt(cards[3])}]가 자리하고 있습니다. 상대방의 겉모습인 3번 카드([${fmt(cards[2])}])에 속지 말고, 4번 무의식 카드가 보여주는 진짜 감정선을 읽어야 합니다.`
          },
          {
            label: "제 2 축 · 장애물 돌파와 연락 시 파장",
            leftTitle: `가로막는 장벽: ${fmt(cards[4])}`,
            leftDesc: getCore(cards[4]),
            rightTitle: `연락/행동 시 반응: ${fmt(cards[5])}`,
            rightDesc: getCore(cards[5]),
            synthesis: `두 사람 사이의 벽인 [${cards[4].card.nameKo}]를 건드리지 않으면서 다가갈 때, 상대방은 [${fmt(cards[5])}]의 반응을 보이게 됩니다. 과거의 잘잘못을 따지기보다 이 반응 카드의 결에 맞춘 가벼운 접근이나 전략적 여유가 필수적입니다.`
          }
        ]
      };
    }

    if (sId === "romance" && cards.length >= 6) {
      return {
        title: "러버스 미러 대칭 분석: [나의 시선 vs 상대의 시선]",
        subtitle: "거울처럼 마주 본 두 사람의 호감도 대조와 관계 진전의 마스터키",
        type: "romance_axis",
        axes: [
          {
            label: "제 1 축 · 서로를 향한 시선의 교차",
            leftTitle: `내가 보는 상대: ${fmt(cards[0])}`,
            leftDesc: getCore(cards[0]),
            rightTitle: `상대가 보는 나: ${fmt(cards[1])}`,
            rightDesc: getCore(cards[1]),
            synthesis: `내가 기대하는 관계의 온도([${cards[0].card.nameKo}])와 상대방이 나에게 느끼는 인상([${cards[1].card.nameKo}])의 간극을 좁히는 것이 첫걸음입니다.`
          },
          {
            label: "제 2 축 · 숨은 욕망과 공략 열쇠의 결합",
            leftTitle: `상대의 숨은 욕망: ${fmt(cards[2])}`,
            leftDesc: getCore(cards[2]),
            rightTitle: `마음을 여는 열쇠: ${fmt(cards[4])}`,
            rightDesc: getCore(cards[4]),
            synthesis: `상대방 내면의 갈증인 [${cards[2].card.nameKo}]를 채워주기 위해 내담자님이 꺼내 들어야 할 마스터키는 바로 [${fmt(cards[4])}]입니다.`
          }
        ]
      };
    }

    if (sId === "career" && cards.length >= 7) {
      return {
        title: "커리어 돌파 핵심 축: [현실의 벽 vs 무의식 방어기제]",
        subtitle: "외부 환경의 문제와 내면의 두려움을 분리하고 합격·성공의 혈점을 뚫는 분석",
        type: "career_axis",
        axes: [
          {
            label: "제 1 축 · 표면적 압박 vs 무의식의 회피",
            leftTitle: `눈앞의 현실 장벽: ${fmt(cards[1])}`,
            leftDesc: getCore(cards[1]),
            rightTitle: `무의식 방어기제: ${fmt(cards[2])}`,
            rightDesc: getCore(cards[2]),
            synthesis: `겉으로는 [${cards[1].card.nameKo}]라는 외부 조건 때문에 힘들다고 느끼지만, 내면 깊숙이 들여다보면 [${cards[2].card.nameKo}]가 상징하는 심리적 두려움이 내 발걸음을 무겁게 잡고 있었습니다. 이 두 가지를 분리해서 직면할 때 비로소 길이 열립니다.`
          },
          {
            label: "제 2 축 · 숨은 기회와 필승 행동 전략",
            leftTitle: `숨은 기회·조력: ${fmt(cards[4])}`,
            leftDesc: getCore(cards[4]),
            rightTitle: `핵심 돌파 전략: ${fmt(cards[5])}`,
            rightDesc: getCore(cards[5]),
            synthesis: `[${cards[4].card.nameKo}]의 기회를 포착하여 [${cards[5].card.nameKo}]의 방식으로 밀어붙일 때, 최종 결과인 [${fmt(cards[6])}]의 성취에 가장 빠르게 도달합니다.`
          }
        ]
      };
    }

    if (sId === "wealth" && cards.length >= 6) {
      return {
        title: "재물 다이아몬드 교차 분석: [누수 차단 vs 파이프라인 확장]",
        subtitle: "새어나가는 돈을 막는 수성(守城)과 새로운 부를 여는 공성(攻城)의 조화",
        type: "wealth_axis",
        axes: [
          {
            label: "제 1 축 · 자금 누수 요인과 경계할 리스크",
            leftTitle: `금전 누수 원인: ${fmt(cards[1])}`,
            leftDesc: getCore(cards[1]),
            rightTitle: `경계할 투자 리스크: ${fmt(cards[2])}`,
            rightDesc: getCore(cards[2]),
            synthesis: `아무리 많은 돈을 벌어도 [${cards[1].card.nameKo}]의 누수 구멍과 [${cards[2].card.nameKo}]의 리스크를 방치하면 밑 빠진 독에 물 붓기가 됩니다. 먼저 이 두 지점을 잠그는 것이 재물운 개운의 1순위입니다.`
          },
          {
            label: "제 2 축 · 신규 수익 파이프라인과 실전 재무 전략",
            leftTitle: `새로운 수익 기회: ${fmt(cards[3])}`,
            leftDesc: getCore(cards[3]),
            rightTitle: `실전 재무 행동: ${fmt(cards[4])}`,
            rightDesc: getCore(cards[4]),
            synthesis: `새로운 부의 기회는 [${cards[3].card.nameKo}]의 영역에서 열리며, 이를 내 자산으로 확정 짓기 위해서는 [${cards[4].card.nameKo}]의 재무 전략을 즉각 실행해야 합니다.`
          }
        ]
      };
    }

    // 켈틱 크로스 10카드 3대 축 분석
    return {
      title: "켈틱 크로스 3대 핵심 축(Axis) 입체 해부",
      subtitle: "의식과 무의식, 과거와 미래, 내면과 외부 환경이 교차하는 운명의 좌표",
      type: "celtic_axis",
      axes: [
        {
          label: "제 1 수직축 · 표면 의식(5번) vs 잠재의식 뿌리(3번)",
          leftTitle: `5번 상위 의식(목표): ${fmt(cards[4])}`,
          leftDesc: getCore(cards[4]),
          rightTitle: `3번 잠재의식(뿌리): ${fmt(cards[2])}`,
          rightDesc: getCore(cards[2]),
          synthesis: `머릿속으로는 [${cards[4].card.nameKo}]를 추구하면서도, 무의식 밑바닥에서는 [${cards[2].card.nameKo}]의 감정이 작동하고 있습니다. 머리와 마음의 이 간극을 이해하는 것이 내면 통합의 출발점입니다.`
        },
        {
          label: "제 2 수평축 · 지나간 과거(4번) ➔ 가까운 미래(6번)",
          leftTitle: `4번 지나간 과거: ${fmt(cards[3])}`,
          leftDesc: getCore(cards[3]),
          rightTitle: `6번 가까운 미래: ${fmt(cards[5])}`,
          rightDesc: getCore(cards[5]),
          synthesis: `[${cards[3].card.nameKo}]의 과거 국면은 이제 막을 내리고, 곧 [${cards[5].card.nameKo}]가 예고하는 새로운 시간의 파도가 밀려옵니다.`
        },
        {
          label: "제 3 기둥축 · 나의 태도(7번) vs 외부 환경(8번)",
          leftTitle: `7번 나의 내면 태도: ${fmt(cards[6])}`,
          leftDesc: getCore(cards[6]),
          rightTitle: `8번 주변 환경과 시선: ${fmt(cards[7])}`,
          rightDesc: getCore(cards[7]),
          synthesis: `내면의 자세인 [${cards[6].card.nameKo}]와 외부의 흐름인 [${cards[7].card.nameKo}]가 만나는 지점에서 9번 카드([${fmt(cards[8])}])의 두려움을 넘어 10번 최종 귀결([${fmt(cards[9])}])로 나아가게 됩니다.`
        }
      ]
    };
  }

  // --------------------------------------------------------------------------
  // 6. 칼 융 분석심리학 3단계 종합 리딩 합성기
  // --------------------------------------------------------------------------
  function generatePsychologicalReading(domain, userQuestion, spreadResult) {
    const cards = spreadResult.cards;
    const spreadMeta = spreadResult.spread;
    const dignity = calculateElementalDignity(cards);
    const axisAnalysis = generateAxisAnalysis(spreadResult);
    const positionReadings = cards.map((_, idx) =>
      generatePositionContextualReading(spreadMeta, cards, idx, userQuestion)
    );

    const firstCard = cards[0];
    const firstText = firstCard.isReversed ? firstCard.card.reversed : firstCard.card.upright;

    // 무의식/장애물/그림자 포지션 카드 추출 (스프레드별 핵심 직면 카드)
    let shadowCard = cards[1] || cards[0];
    if (spreadMeta.id === "reunion" && cards[3]) shadowCard = cards[3];
    else if (spreadMeta.id === "romance" && cards[2]) shadowCard = cards[2];
    else if (spreadMeta.id === "choice") shadowCard = cards.find(c => c.isReversed) || cards[0];
    else if (spreadMeta.id === "career" && cards[2]) shadowCard = cards[2];
    else if (spreadMeta.id === "wealth" && cards[1]) shadowCard = cards[1];
    else if (spreadMeta.id === "celtic" && cards[2]) shadowCard = cards[2];

    const shadowText = shadowCard.isReversed ? shadowCard.card.reversed : shadowCard.card.upright;
    const finalCard = cards[cards.length - 1];
    const finalText = finalCard.isReversed ? finalCard.card.reversed : finalCard.card.upright;

    // STEP 1: 깊은 공감과 반영 (Validation)
    let step1_validation = `내담자님이 <strong>「${spreadMeta.nameKo}」</strong>의 첫 자리(${firstCard.position.shortName})에 뽑으신 카드는 <strong>[${firstCard.card.nameKo} (${firstCard.isReversed ? '역방향' : '정방향'})]</strong>입니다. 카드를 고르시는 순간 당신의 무의식이 얼마나 간절하고도 무거운 질문("${userQuestion}")을 품고 있었는지가 이 첫 장에 고스란히 투영되어 있습니다. ${firstText.core} 그동안 겉으로는 아무렇지 않은 척 이성적으로 버텨오셨겠지만, 홀로 감당해야 했던 불확실성과 마음의 피로가 결코 가볍지 않았음을 타로는 깊이 공감하며 비추고 있습니다.`;

    // STEP 2: 뼈를 때리는 맹점 조명과 직면 (Confronting the Blind Spot)
    let step2_blindspot = "";
    if (spreadMeta.id === "career" || spreadMeta.id === "choice") {
      step2_blindspot = `하지만 이제 정신과 상담의 냉철한 거울로 우리의 내면을 정면으로 마주해야 합니다. <strong>[${shadowCard.position.shortName}]</strong> 자리에 놓인 <strong>[${shadowCard.card.nameKo} (${shadowCard.isReversed ? '역방향' : '정방향'})]</strong>는 날카롭게 묻고 있습니다. 과연 당신은 저 문 안으로 능력이 부족해서 <strong>'못'</strong> 들어가는 것일까요, 아니면 거절당하거나 자존심이 상처받는 것이 두려워 무의식적으로 <strong>'안'</strong> 들어가고 발을 빼고 계셨던 것일까요? ${shadowText.core} 환경이나 타이밍만을 탓하기 전에, 완벽하지 않으면 시작조차 두려워했던 내 안의 방어기제를 직면해야만 막힌 혈이 뚫립니다.`;
    } else if (spreadMeta.id === "reunion" || spreadMeta.id === "romance") {
      step2_blindspot = `그러나 달콤한 희망 고문이나 막연한 원망만으로는 아무것도 바뀌지 않습니다. <strong>[${shadowCard.position.shortName}]</strong> 자리에 출현한 <strong>[${shadowCard.card.nameKo} (${shadowCard.isReversed ? '역방향' : '정방향'})]</strong>가 비추는 진실을 직면하십시오. ${shadowText.core} 혹시 상대방의 침묵이나 태도만을 탓하면서, 정작 나 자신도 상처받기 싫다는 방어기제 뒤에 숨어 상대가 100% 확신을 가져다주기만을 시험하고 있었던 것은 아닐까요? 내 안의 불안과 집착이 관계를 어떻게 긴장시켰는지 솔직하게 들여다보아야 합니다.`;
    } else {
      step2_blindspot = `외부의 상황만을 탓하기 전에, <strong>[${shadowCard.position.shortName}]</strong> 자리의 <strong>[${shadowCard.card.nameKo} (${shadowCard.isReversed ? '역방향' : '정방향'})]</strong>가 경고하는 무의식의 맹점을 직면해야 합니다. ${shadowText.core} 잃는 것에 대한 과도한 공포나 과거의 익숙한 패턴에 안주하려는 관성이 오히려 눈앞에 다가온 새로운 기회를 가로막고 있었던 것은 아닌지 냉철하게 성찰해야 할 시점입니다.`;
    }

    // STEP 3: 뽑은 카드들에 기반한 주체적 3대 행동 지침
    const actionCard = cards.length >= 6 ? cards[cards.length - 2] : finalCard;
    const actionCardText = actionCard.isReversed ? actionCard.card.reversed : actionCard.card.upright;

    const actionSteps = [
      `<strong>[제 1 지침 · ${actionCard.position.shortName} 카드(${actionCard.card.nameKo})의 실천]</strong>: ${actionCardText.advice}`,
      `<strong>[제 2 지침 · 최종 귀결 카드(${finalCard.card.nameKo})의 수용]</strong>: ${finalText.advice}`,
      `<strong>[제 3 지침 · 4원소 균형 회복(${dignity.deficient.meta.ko} 보완)]</strong>: 현재 스프레드에서 가장 강하게 쏠려 있는 '${dignity.dominant.meta.ko}'의 과열을 다스리고, 부족한 '${dignity.deficient.meta.ko}(${dignity.deficient.meta.jungFunction})'의 감각을 일상에 의식적으로 불어넣어 심리적 주도권을 완전히 회복하십시오.`
    ];

    return {
      validation: step1_validation,
      blindSpot: step2_blindspot,
      actionPlan: actionSteps,
      finalOutcomeSummary: `「${spreadMeta.nameKo}」의 마지막 자리인 <strong>[${finalCard.position.name}]</strong>에 놓인 <strong>[${finalCard.card.nameKo} (${finalCard.isReversed ? '역방향' : '정방향'})]</strong>는 선언합니다: "${finalText.core}" — ${finalText.advice}`,
      dignitySummary: `${dignity.synergyTitle} — ${dignity.synergyDesc}`,
      dignity,
      axisAnalysis,
      positionReadings
    };
  }

  return {
    SPREADS,
    drawSpread,
    calculateElementalDignity,
    generatePositionContextualReading,
    generateAxisAnalysis,
    generatePsychologicalReading,
    secureRandom
  };
}));
