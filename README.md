# Project Name
Pomato-farm

## 📌 Overview
포모도로 기법을 기반으로, 최소한의 인터랙션으로 집중 습관을 형성할 수 있는지 검증하기 위한 프로토타입 앱.
A productivity app based on the Pomodoro technique, designed to explore how minimal interaction can improve focus and habit consistency.

### Current Status
- 2026/04/01: 기본적인 인증 & 포모도로 기능 구현 완료
 => Status: Prototype (Core features implemented)

## 👤 Potential Target User
하나의 앱을 통해 셍신상 관리를 하고 싶은 이용자

## 🎯 Purpose
- 외부 강의에 의존하지 않는 개발 경험을 세울 것
- 생산성 향상, 집중도 훈련 등 본인의 소기의 목적을 달성하기 위함과 동시에 개발 경험을 쌓기 위함.

## 🧪 Scope
### Included
- Authentication (Firebase 기반 간단 인증)
- Pomodoro timer (집중 세션 관리)
- Session 결과 저장 (이미지 캡처)
- TODO 연동 (작업 단위 집중)

### Why this scope?
- "집중 → 기록 → 회고" 흐름을 최소 기능으로 검증하기 위함

### Why Firebase?
빠른 프로토타이핑과 인증 구현 속도를 위해 선택

### Why Pomodoro?
집중과 휴식의 반복이 습관 형성에 효과적이라고 판단

## 🚧 Limitations
### Product
- 타겟 유저를 명확히 정의하지 않고 시작한 프로젝트로, UX 방향성이 실험적임

### Technical
- Firebase 기반으로 빠른 프로토타이핑에 집중 (RDB 설계 미적용)
- 테스트 코드 미구현 (속도 우선 선택)

## 🧠 What I Learned
### Project Management
- 작업 시간 기록의 중요성(정량적, 정성적 Performance Check)
- 프로젝트/업무 지연 시 원인 기록 필요성

### Technical
- setInterval / clearInterval 기반 Timer 제어
- 상태 기반 타이머 관리 방식(useState, useEffect)

### Insight
- 설계 없이 구현하면 속도는 빠르지만 유지보수성이 떨어짐

## 🔜 Possible Improvements
- 코드 리팩토링(Code Refactoring)
  - 중복된 인증 파츠 등은 useContext나 상태 관리 툴 등을 통해 중복을 줄일 것
- 남은 과제 구현
  - TODO App과 Pomodoro App 기능을 어떻게 연동할 것인가?
  - 화면 캡처 & 공유 기능은 무엇을 통해 개발할 수 있는가?