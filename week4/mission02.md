# Linting과 Formatting 알아보기

## Linting과 Formatting

### Linting
**코드를 실행하지 않고 읽기만 해서, 버스가 될 수 있는 부분이나 잘못된 패턴을 찾아내는 것**이다.  
이는 **정적 분석**의 한 종류이다.  
- 예: 정의하지 않은 변수를 썼다, 선언만 하고 안 쓴 변수가 있다, Hook을 조건문 안에서 불렀다.  

### Formatting
**코드의 동작은 그대로 두고, 들여쓰기, 줄바꿈, 따옴표, 세미콜론 같은 "겉모양"을 일관되게 맞추는 것**이다.  
- 예: 작은 따옴표와 큰 따옴표가 섞여있다. 

|  |Linting|Formatting|
|---|---|---|
|보는 것|코드의 의미와 품질|코드의 모양|
|찾는 것|버그 가능성, 나쁜 패턴|스타일 불일치|
|동작에 영향|고치면 동작이 바뀔 수 있음|동작은 절대 안 바뀜|

## ESLint

### 무엇인가
**설정할 수 있는 JavaScript 린터**이다.  
런타임 버그부터 스타일 문제까지 코드의 문제를 찾고, 일부는 자동으로 고쳐 준다.  

### 핵심 개념

#### 규칙
ESLint의 기본 단위로, 규칙 하나가 "한 가지 기대"를 검사한다. 
- `no-unused-vars`: 선언하고 안 쓴 변수
- `no-undef`: 정의되지 않은 변수
- React 프로젝트에서는 react-hooks 플러그인의 Hook 규칙도 쓴다. 

#### 심각도
|값|뜻|
|---|---|
|`"off"`(0)|규칙 끄기|
|`"warn"`(1)|경고만(실행 결과에 영향 없음)|
|`"error"`(2)|에러(검사 실패로 처리)|

#### 설정 파일: `eslint.config.js`
```js
export default defineConfig([
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
    },
  },
]);
```
규칙을 켜거나 공유설정(`recommended` 등)을 가져오지 않으면 ESLint는 아무것도 검사하지 않는다.  

#### 플러그인
규칙 묶음을 추가하는 패키지이다.  
예: `eslint-plugin-react-hooks`

#### 자동 수정
`--fix`를 붙이면 안전하게 고칠 수 있는 규칙은 자동으로 고친다.  

## Prettier

### 무엇인가
**의견이 분명한(optionated) 코드 포매터**이다.  
JavaScript, JSX, CSS, JSON, Markdown 등을 지원한다. 

### 동작 방식
코드를 읽어서 구조(AST)로 바꾼 뒤, **원래 모양은 거의 버리고 Prettier 규칙대로 처음부터 다시 출력**한다.  
그래서 누가 어떻게 썼든 결과가 똑같아진다. (빈 줄 같은 일부는 남긴다.)  

### 왜 쓰나
가장 큰 이유는 **스타일에 대한 끝없는 논쟁을 멈추기**이다.  
세미콜론을 쓸지, 따옴표를 뭘 쓸지 사람끼리 정하고 리뷰에서 지적할 필요가 없다.  
Prettier는 **완전히 자동인 유일한 스타일 가이드**라고 한다.  

### 사용법
```bash
pnpm add -D --save-exact prettier   # 설치 (버전을 정확히 고정)
npx prettier . --write              # 전체 파일 정리
npx prettier . --check              # 정리 안 된 파일만 확인
```
- `.prettierrc`: 설정 파일(빈 `{}`로 시작해도 된다.)
- `.prettierignore`: 정리하지 않을 파일 목록
- 버전을 정리하는 이유: 작은 업데이트에도 정리 결과가 바뀔 수 있어서, 팀원끼리 버전이 다르면 서로 다른 모양으로 정리 된다.  

## ESLint와 Prettier의 차이

"Prettier vs. Linters"는 린터 규칙을 두 종류로 나눈다.

| 구분 | 서식 규칙 (Formatting rules) | 코드 품질 규칙 (Code-quality rules) |
|---|---|---|
| 예 | `max-len`(줄 길이), `keyword-spacing`, `comma-style` | `no-unused-vars`, `no-undef` |
| Prettier | 이 종류 전체를 대신해 줌 | 전혀 도와주지 않음 |
| ESLint | 할 수는 있음 | 이게 주특기 |

> **Prettier는 포매팅에, 린터는 버그를 잡는 데 쓰면 된다.**  
> (use Prettier for formatting and linters for catching bugs!)

| 구분 | ESLint | Prettier |
|---|---|---|
| 역할 | 코드 품질 검사 (버그 찾기) | 코드 모양 정리 |
| 방식 | 규칙을 하나하나 켜고 끔 | 규칙이 아니라 코드를 통째로 다시 출력 |
| 결과 | 경고나 에러로 알려 줌 (일부 자동 수정) | 파일을 바로 고쳐 줌 |
| 예: `useState`를 `newState`로 오타 | 잡음 | 못 잡음 |
| 예: 들여쓰기 | 일부 규칙으로 가능 | 알아서 맞춤 |

## 두 도구를 함께 쓰는 이유

> **서로 못 하는 걸 해 준다.**

- Prettier는 모양만 맞추고 버그는 못 찾는다. 
- ESLint는 버그는 찾지만, 모양까지 규칙으로 하나하나 관리하려면 설정이 많고 사람마다 의견이 갈린다.  

그래서 **모양은 Prettier에 맡기고, ESLint는 버그 찾기에 집중**하게 나눈다.  

### 같이 쓸 때 주의: 규칙 충돌
ESLint에도 서식 관련 규칙이 있어서, **Prettier가 정리한 모양을 ESLint가 "틀렸다"고 하거나 그 반대**가 생길 수 있다.  

### 해결: `eslint-config-prettier`
Prettier와 겹치거나 충돌하는 ESLint 규칙을 꺼 주는 설정이다.  
규칙을 끄기만 해서, 다른 설정과 같이 쓰고 **다른 설정들보다 뒤에** 넣어야 한다. 
```js
// eslint.config.js
import eslintConfigPrettier from "eslint-config-prettier/flat";

export default [
  // ... 기존 설정들
  eslintConfigPrettier,   // 맨 뒤에
];
```
<br>
<br>
<br>
<br>

# 적용
## 기존 프로젝트의 ESLint 설치 및 설정 여부 확인하기
```js
"scripts": {
  "lint": "eslint ."
},
"devDependencies": {
  "@eslint/js": "^10.0.1",
  "eslint": "^10.13.0",
  "eslint-plugin-react-hooks": "^7.1.1",
  "eslint-plugin-react-refresh": "^0.5.7",
  "globals": "^17.13.0"
}
```
ESLint는 이미 설치 되어 있고, Prettier는 없다.  

## ESLint, Prettier를 쇼핑몰 프로젝트에 설정하고 설정 방법 정리하기
우선 Prettier를 설치하고 설정한다.  
```bash
pnpm add -D --save-exact prettier
pnpm add -D eslint-config-prettier
```
- `--save-exact`: 버전을 정확히 고정한다. 
- `eslint-config-prettier`: ESLint 규칙 중 Prettier와 겹치는 걸 꺼 준다.  

`.prettierrc` 새 파일 추가
```json
echo '{ "endOfLine": "auto" }' > .prettierrc
```
Prettier 기본값은 줄바꿈을 LF로 바꾸는데, 내 파일들은 Windows 줄바꿈(CRLF)라서 **모든 줄이 바뀐 것처럼 보여서** 실제로 뭐가 바뀌었는지 비교할 수 없다.  
`"auto"`로 두면 원래 줄바꿈을 유지한다.  


`.prettierignore` 새 파일 추가
```
dist
pnpm-lock.yaml
```
`node_modules`와 `gitignore`에 있는 파일은 Prettier가 알아서 건너 뛰게 된다.  

## 적용하고 확인하기
먼저 지금 상태를 커밋하고 적용 전후를 `git diff`로 비교한다.  
```bash
git add gdg-project-shop
git commit -m "chore: Prettier, eslint-config-prettier 설정"
```

ESLint 검사
```bash
pnpm lint
```

Prettier 적용
```bash
pnpm format
git diff
```

## 변경사항
Prettier 적용 결과 17개 파일이 정리되었다.  
가장 큰 변화는 파일마다 2칸, 4칸으로 섞여 있던 들여쓰기가 2칸으로 통일되었다.  
그 밖으로 띄어쓰기 같은게 통일되었다.  
`pnpm lint`로 확인한 결과 에러가 0개였고,  
`pnpm dev`로 화면 확인 결과 화면은 똑같았다.  
