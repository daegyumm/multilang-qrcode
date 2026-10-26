# 매료 QR MVP

## 구현 범위

언어 선택, 홈, 안내 상세, 오류 화면. 환영·시음 안내 네 언어.
HashRouter를 사용하므로 정적 호스팅에 SPA rewrite가 필요하지 않습니다.
언어 코드: ko / en / ja / zh-Hans. 언어 중립 QR 목적지를 선택 이후에도 보존합니다.

## 다음 커밋 제안

1. `content: approve venue instructions and translations`: 한국어·번역 검수, 승인된 체험 절차 확정.
2. `feat: publish jam cocktail and canning guides`: 검수된 실제 절차를 네 언어로 등록 후 공개.
3. `feat: add verified product information`: 실제 제품 사진·원재료·도수·용량과 번역 설명.
4. `chore: launch venue QR guides`: Pages 설정·배포·실기기 점검·확정 주소 QR 출력.

도메인 확정은 QR 인쇄 전에 완료합니다. 추후 관리자 화면이 필요하면 콘텐츠 계약을 유지하고 읽기 경로를 API로 바꿉니다.
DB·인증·CMS·예약·결제·통계·음성·실시간 번역·오프라인 지원은 초기 범위 밖입니다.
