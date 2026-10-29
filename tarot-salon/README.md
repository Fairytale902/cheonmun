# 천문(天文) 타로 살롱 — 독립 출시용 패키지

천문사주(`cheonmun.life`)와 분리된 **별도 웹 서비스**로 배포하기 위한 폴더입니다.
이 폴더 하나만으로 동작하며, 상위 저장소의 `1/`(사주)·`2/`(구 타로관) 파일을 참조하지 않습니다.

## 구조

```
tarot-salon/
├── index.html            # 6대 상황별 스프레드 · 78장 부채꼴 덱 · 결과 · 감명서 뷰
├── app.js                # 메인 컨트롤러 (결제 · 소장 링크 · 딥링크 · 픽셀 · 뒤로가기 방어)
├── style.css             # 타로 살롱 전용 스타일
├── policy.css            # 약관/개인정보/환불 페이지 공용 스타일
├── terms.html · privacy.html · refund.html
├── lib/                  # 타로 DB(78장) · 스프레드 엔진 · 감명서 빌더
├── assets/cards/         # 카드 이미지 79장 (앞면 78 + 뒷면 1)
├── api/verify-payment.js # 포트원 V2 결제 서버 검증 (Vercel Serverless)
└── vercel.json
```

## 배포 (Vercel 새 프로젝트)

1. Vercel에서 새 프로젝트 생성 → 이 저장소 연결 → **Root Directory = `tarot-salon`** 지정.
2. 환경변수 `PORTONE_API_SECRET` 등록 (포트원 콘솔 > 연동 정보 > V2 API Secret).
3. 커스텀 도메인 연결.
4. [app.js](app.js)의 `PORTONE_CONFIG.storeId / channelKey`를 실키로 교체하거나,
   `index.html`에서 `window.CHEONMUN_TAROT_PORTONE_CONFIG = { storeId, channelKey }`를 주입.
5. 도메인 확정 후 사주관 [1/app.js](../1/app.js)의 `CM_TAROT_SITE_URL`을 새 도메인으로 교체.

## 상용화 모듈

| 기능 | 내용 |
| --- | --- |
| 실결제 + 서버 검증 | 포트원 V2 SDK 결제 → `/api/verify-payment`가 **서버 가격표**(19,500 / 29,000원)로 금액·상태 대조 |
| 결제 키 미연동 시 | 무료 열람 차단, 심사 대기 안내. 내부 검수는 `?demo=1`(세션 유지) 또는 localhost |
| 평생 소장 링크 | `?restore=토큰` — 스프레드·카드·정역방향·질문을 담아 어느 기기에서나 동일 감명서 복원 |
| 이 기기 보관함 | 헤더 `내 감명서` / 푸터 `발급 감명서 다시보기` (최근 20건) |
| 광고 추적 | UTM·fbclid 저장, `?pixel=ID` 또는 `window.CHEONMUN_TAROT_PIXEL_ID`로 Meta Pixel 자동 로드, GA4·GTM 브릿지 |
| 딥링크 | `?situation=reunion\|romance\|choice\|career\|wealth\|celtic` (별칭: love, ex, job, money, ab 등) |
| 뒤로가기 방어 | 화면 전환마다 History API 기록 → 모바일 뒤로가기 시 이전 단계로 복귀 |
| 사주 교차판매 | 결과·감명서 하단에서 `cheonmun.life/1/?concern=…&step=input` 로 연결 (UTM 포함) |

## 퍼널 이벤트

`PageView` → `DeepLinkLanding` → `StartDraw` → `ViewResult` → `InitiateCheckout` → `Purchase`
보조: `BackNavigation`, `RestoreReport`, `CopyRestoreLink`, `CrossSellClick`, `PrintReport`

## 광고 URL 예시

```
https://<타로도메인>/?situation=reunion&utm_source=ig&utm_campaign=reunion_v1
https://<타로도메인>/?situation=choice&step=input&utm_source=meta&utm_campaign=ab_choice
```
