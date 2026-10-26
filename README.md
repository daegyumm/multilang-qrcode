# 매료 다국어 QR 안내

매료 체험장 방문객을 위한 한국어·영어·일본어·중국어(간체) 모바일 안내 웹.
React + TypeScript + Vite + React Router. 서버·계정·DB 없이 정적 파일로 동작합니다.

## 현재 구현

- 언어 선택 → 홈 또는 원래 QR의 안내로 이동
- 환영 안내 및 시음 안내 4개 언어
- 같은 안내를 유지하는 언어 변경, 선택 저장, 새로고침·뒤로 가기
- 저장소 차단 시에도 정상 사용, 없는 안내·미공개 안내 오류 처리
- 모바일 대응, 문서 언어 변경, 키보드 포커스, 일반 텍스트 렌더링
- 번역 누락 검사, 브라우저 테스트, CI, 수동 Pages 배포, QR 생성 스크립트

**문구·번역은 초안입니다. 실제 현장 절차 및 원어민 검수 완료 전에는 QR을 인쇄하거나 공개 운영하지 마세요.**
잼·칵테일·캔 체험은 ID만 예약했고 공개하지 않습니다. 중국어는 간체입니다.
오프라인 지원·실시간 번역·결제·예약·음성·방문 통계는 포함하지 않습니다.

## 시작

Node 버전: `.nvmrc` 참조. npm lockfile을 함께 관리합니다.

```sh
npm ci
npm run dev
```

개발 주소: http://localhost:5173/multilang-qrcode/

```sh
npm run check
npx playwright install chromium
npm run test:e2e
```

`test:e2e`는 `npm run build` 후 실행해야 합니다. `check`에 빌드가 포함되어 있습니다.

## QR와 주소

| 목적 | 해시 경로 |
|---|---|
| 입구·언어 중립 | `#/` |
| 시음·언어 중립 | `#/guide/tasting` |
| 영어 시음 직접 진입 | `#/en/guide/tasting` |
| 일본어 홈 | `#/ja` |

언어 우선순위: URL 명시 → 저장된 선택 → 언어 선택 화면.
`maeryo.locale`만 브라우저에 저장합니다. 방문 추적 및 개인 정보 수집 기능은 없습니다.
미지원 언어·잘못된 체험 주소는 오류 화면을 표시합니다.

## 배포

1. PR 검증 완료 후 main에 병합합니다.
2. GitHub Settings → Pages → Source를 GitHub Actions로 설정합니다.
3. Actions → Deploy guide to Pages → Run workflow를 main에서 실행합니다.
4. 배포 결과의 실제 URL에서 테스트합니다.

초안이 자동으로 공개되지 않도록 배포는 수동 트리거입니다. 콘텐츠 검수 후 자동 배포로 전환할 수 있습니다.
기본 base는 `/multilang-qrcode/`. 사용자 도메인의 루트로 옮길 경우 `vite.config.ts`의 base도 `/`로 변경합니다.
예상 Pages 주소는 https://daegyumm.github.io/multilang-qrcode/ 이며 실제 배포 성공 전에는 활성 주소로 간주하지 않습니다.

```sh
npm run qr -- https://daegyumm.github.io/multilang-qrcode/
```

이 명령은 URL 유효 형식만 검사하며 실제 배포 상태는 검사하지 않습니다.
`qr-output/`에 SVG·PNG·주소 목록이 생깁니다. 최종 URL을 확인한 후 출력하고 인쇄물을 실제 휴대폰으로 스캔하세요.
QR 파일은 생성물로 git에서 제외합니다. URL·체험 ID는 인쇄 후 유지해야 합니다.

## 수정 문서

- [콘텐츠 수정](docs/content-editing.md)
- [QR 설치 및 현장 점검](docs/qr-locations.md)
- [MVP 범위 및 다음 작업](docs/mvp-spec.md)
