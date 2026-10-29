/**
 * ============================================================================
 * 天門 (CHEONMUN) 타로 심리 엔진 — 78장 마스터 통합 데이터 모듈 (tarot-data.js)
 * ----------------------------------------------------------------------------
 * 22 Major + 14 Wands + 14 Cups + 14 Swords + 14 Pentacles
 * 총 78장 라이더-웨이트 완전판 데이터 어그리게이터 & 인덱싱 엔진
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['./tarot-data-major', './tarot-data-minor-wands', './tarot-data-minor-cups', './tarot-data-minor-swords', './tarot-data-minor-pentacles'], factory);
  } else if (typeof module === 'object' && module.exports) {
    const { MAJOR_ARCANA_DATA } = require('./tarot-data-major');
    const { MINOR_WANDS_DATA } = require('./tarot-data-minor-wands');
    const { MINOR_CUPS_DATA } = require('./tarot-data-minor-cups');
    const { MINOR_SWORDS_DATA } = require('./tarot-data-minor-swords');
    const { MINOR_PENTACLES_DATA } = require('./tarot-data-minor-pentacles');
    module.exports = factory(MAJOR_ARCANA_DATA, MINOR_WANDS_DATA, MINOR_CUPS_DATA, MINOR_SWORDS_DATA, MINOR_PENTACLES_DATA);
  } else {
    const maj = typeof MAJOR_ARCANA_DATA !== 'undefined' ? MAJOR_ARCANA_DATA : (root.MAJOR_ARCANA_DATA || []);
    const wan = typeof MINOR_WANDS_DATA !== 'undefined' ? MINOR_WANDS_DATA : (root.MINOR_WANDS_DATA || []);
    const cup = typeof MINOR_CUPS_DATA !== 'undefined' ? MINOR_CUPS_DATA : (root.MINOR_CUPS_DATA || []);
    const swo = typeof MINOR_SWORDS_DATA !== 'undefined' ? MINOR_SWORDS_DATA : (root.MINOR_SWORDS_DATA || []);
    const pen = typeof MINOR_PENTACLES_DATA !== 'undefined' ? MINOR_PENTACLES_DATA : (root.MINOR_PENTACLES_DATA || []);
    root.TarotDB = factory(maj, wan, cup, swo, pen);
  }
}(typeof self !== 'undefined' ? self : this, function (major, wands, cups, swords, pentacles) {

  // 78장 덱 통합
  const ALL_CARDS = [
    ...(major || []),
    ...(wands || []),
    ...(cups || []),
    ...(swords || []),
    ...(pentacles || [])
  ];

  // 빠른 ID 기반 맵 생성
  const CARD_MAP = {};
  ALL_CARDS.forEach(card => {
    CARD_MAP[card.id] = card;
  });

  // 원소별 메타데이터
  const ELEMENT_METADATA = {
    fire: {
      ko: "불 (Fire / 火)",
      oriental: "火 (화)",
      jungFunction: "직관 (Intuition)",
      nature: "열정, 추진력, 창조적 영감, 야망, 모험, 의지",
      color: "#ef4444",
      bgGlow: "rgba(239, 68, 68, 0.2)"
    },
    water: {
      ko: "물 (Water / 水)",
      oriental: "水 (수)",
      jungFunction: "감정 (Feeling)",
      nature: "사랑, 관계, 무의식, 직관, 수용성, 치유, 정서적 유대",
      color: "#38bdf8",
      bgGlow: "rgba(56, 189, 248, 0.2)"
    },
    air: {
      ko: "공기 (Air / 金)",
      oriental: "金 (금)",
      jungFunction: "사고 (Thinking)",
      nature: "논리, 이성, 소통, 결단, 진실, 고통과 각성",
      color: "#a78bfa",
      bgGlow: "rgba(167, 139, 250, 0.2)"
    },
    earth: {
      ko: "흙 (Earth / 土)",
      oriental: "土 (토)",
      jungFunction: "감각 (Sensation)",
      nature: "물질, 현실, 육체, 재물, 커리어 실적, 안정성, 성실함",
      color: "#34d399",
      bgGlow: "rgba(52, 211, 153, 0.2)"
    }
  };

  return {
    CARDS: ALL_CARDS,
    CARD_MAP: CARD_MAP,
    ELEMENTS: ELEMENT_METADATA,
    
    // 유틸리티 조회 함수
    getCardById: function (id) {
      return CARD_MAP[id] || null;
    },

    getCardsBySuit: function (suit) {
      return ALL_CARDS.filter(c => c.suit === suit);
    },

    getCardsByElement: function (element) {
      return ALL_CARDS.filter(c => c.element === element);
    },

    searchCards: function (query) {
      if (!query) return ALL_CARDS;
      const q = query.toLowerCase().trim();
      return ALL_CARDS.filter(c => 
        c.nameKo.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        (c.keywords && c.keywords.some(k => k.toLowerCase().includes(q)))
      );
    }
  };
}));
