# 콘텐츠 수정

1. `src/content/locales/ko.json`에서 한국어 원문을 확정합니다.
2. 동일한 키와 단계 ID로 `en.json`, `ja.json`, `zh-Hans.json`을 수정합니다.
3. 모든 문장은 일반 텍스트입니다. HTML 태그를 넣지 않습니다.
4. `npm run check` 및 `npm run test:e2e`로 검증합니다.
5. 번역과 실제 운영 절차를 검수한 뒤 PR을 병합하고 배포합니다.

`src/content/guides.ts`의 published가 false인 콘텐츠는 목록·직접 URL 모두에서 비공개입니다.
새 체험을 공개하려면 네 언어에 동일 ID의 title/summary/steps/cautions를 채우고,
공통 stepIds와 순서를 맞춘 뒤 published를 true로 바꿉니다. 테스트는 누락·빈 문장·단계 불일치 때 실패합니다.
언어적 정확성이나 안전성을 자동 검사하는 것은 아닙니다.

중국어는 간체 `zh-Hans`입니다. 번체를 추가할 때는 Locale 타입, 언어명, JSON 등록과 테스트 범위에 `zh-Hant`를 추가합니다.
제품 도수·용량·가격·원재료는 아직 등록하지 않았습니다. 현장 자료를 확인한 뒤 공통 데이터로 추가하고 번역 파일에 숫자를 중복 저장하지 않습니다.

사진 추가 시 정적 이미지 경로는 `import.meta.env.BASE_URL`을 기준으로 조합하고 각 언어 대체 텍스트를 제공하세요.
현재 이미지는 외부 요청이 없는 CSS 장식으로 구성합니다.
