# Pomato-farm 기본 기획서 및 설계서
## 📄 Document Purpose
이 문서는 Pomato-farm 프로젝트의 초기 기획 및 설계 방향을 정의하며,
개발 중 의사결정 기준으로 사용된다.

## Overview
포모도로 기법을 기반으로, 최소한의 인터랙션으로 집중 습관을 형성할 수 있는지 검증하기 위한 프로토타입 앱.
A productivity app based on the Pomodoro technique, designed to explore how minimal interaction can improve focus and habit consistency.

## 기술 선정(Stack)
### Next.js
- 빠른 프로토타이핑 가능
- CSR/SSR 선택 유연성 확보
- 향후 확장성 고려

### Firebase
- 인증 및 데이터 관리 빠르게 구현 가능
- 서버 구축 없이 MVP 검증 가능

### Chakra UI
- 빠른 UI 구성
- 일관된 디자인 시스템 확보

## 소스 구조
### Commit Rule
가능하면 의미 단위의 Commit, Commit message, PR 권장

### docs
- 화면 별, 기능 별 설계서를 작성함.
- (추후) 새 기능 추가/개발 시, 해당 PR의 docs 폴더에 사양(Specification) Markdown 파일을 추가할 것.

### public
svg, ico 파일 등 해당 프로젝트에서 쓰이는 이미지 파일을 저장하는 공간

### src
- components: 화면을 구성하는 각 컴포넌트 폴더.
- constants: 프로젝트 전체에 쓰이는 값들을 정의한 폴더.
- pages: 페이지 컴포넌트
- styles: CSS 스타일시트
- utils: 인증, Hooks 관련 로직을 저장하는 폴더.

## 기능 설계
### v1 (Core)
- Pomodoro Timer
- 사용자 인증

### v2 (확장)
- TODO 기능
- 기록 관리 (월별/일별)

### v3 (부가 기능)
- 기록 이미지화 및 공유

### 설계 의도
- v1에서 "집중 → 기록" 흐름 검증
- 이후 TODO 연계를 통해 생산성 관리 확장

## 세부 설계
(각 기능 설계 )

## 👤 Target User
- 간단한 UI로 집중 루틴을 만들고 싶은 사용자
- 여러 생산성 앱 사용에 피로감을 느끼는 사용자

## 🎯 Core Value
- 최소한의 인터랙션으로 집중 시작 가능
- 집중 기록을 시각적으로 확인 가능