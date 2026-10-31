# 질문 답변

## 1. HTML의 Element와 Arribute는 무엇인가?
### Element(요소)
- `<p><\p>`: 시작 및 종료 태그
- `안녕하세요!`: 컨텐츠
---
일반적으로 HTML 요소는 시작 태그 + 컨텐츠 + 종료 태그로 구성됨(컨텐츠와 종료 태그가 없는 빈 요소도 있다!)

중첩관계: 요소는 다른 요소를 포함할 수 있다. 

### Attribute(속성)
- `src`, `alt`, `id`, `class`, `href`, `alt`, `title`, `style` 등이 있다

요소에 추가적인 정보를 제공하는 역할을 한다. 
일반적으로 시작 태그 안에 `이름 = "값"`의 형태로 작성한다. 

- `id`: 한 문서 내에서 고유하게 지정
- `class`: 여러 요소에 같은 값을 사용할 수 있음 

## 2. div와 Semantic Tag의 차이는 무엇인가?
- `div`: 의미가 없는 상자로서 묶거나 CSS로 꾸미려고 쓸 뿐 무엇을 나타내는지 설명해주지는 않는다. 
- Sementic tag: 이름 자체가 역할을 알려준다. `<header>`는 머리말, `<nav>`는 메뉴, `<main>`은 본문, `<footer>`는 꼬리말을 나타낸다. 

예시:
```html
<div class="header">
  <div class="navigation">메뉴</div>
</div>
```
```html
<header>
  <nav>메뉴</nav>
</header>
```
시맨틱 태그를 쓰면 가독성이 좋다. 그런데 딱 맞는 시맨틱 태그가 없고 그냥 묶거나 스타일만 입히고 싶을 때는 `<div>`를 쓴다. 

## 3. `<article>` vs `<section>` 두 태그의 차이점은 무엇인가?

- `<article>`: 독립적으로 구성되는 콘텐츠, 그 자체로 완결된 내용이다. 
- `<section>`: 주제 별 콘텐츠 구획, 앞 뒤 맥락이 필요하고 한 페이지를 나눈 구역이 해당된다. 

예시: 
```html
<article>
  <h1>React 정리 글</h1>
  <section>
    <h2>컴포넌트</h2>
    ...
  </section>
  <section>
    <h2>props</h2>
    ...
  </section>
</article>
```

# 미션2 - 시맨틱 태그로 구조 분해하기
![시맨틱 태그 구조](./week0/mission01-html.png)

# 학습 내용 정리(필요한 부분 요약)

## HTML이란?
웹페이지의 콘텐츠와 구조를 정의하는 마크업 언어

HTML은 JS같은 프로그래밍 언어가 아니라, 콘텐츠를 구조화하는 마크업 언어이다. 

## HTML의 기본 구조
크게 문서정보를 담는 `head`와 실제 콘텐츠를 담는 `body`로 구성된다. 
```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    <p>안녕하세요! 첫 번째 웹페이지입니다.</p>
  </body>
</html>
```
요소
- `<!DOCTYPE html>`: HTML 문서임을 알리고 표준 모드로 해석하도록 선언
- `<html>`: HTML 문서의 최상위 요소
- `<head>`: 문서의 설정 및 메타데이터를 담는 영역
- `<body>`: 실제 웹페이지의 콘텐츠를 담는 영역

주요 태그에는 `meta`, `title`, `link`, `style`, `script`가 있다. 

## 자주 사용하는 HTML 태그
- `h1`~`h6`: 제목과 하위 제목
- `p`: 문단
- `span`: 의미를 별도로 부여하지 않는 인라인 컨테이너
- `strong`: 중요한 내용
- `em`: 강조하는 내용
- `br`: 줄바꿈
- `hr`: 주제나 문단 사이의 구분

글자 크기를 조절하기 위해 제목 태그를 선택하면 안되는 이유는 약간 계층별로 나누는 역할이 있어서 그럴 것 같다. 

### 기타 태그

#### 링크와 이미지 관련 태그
- `<a href="...">`: 링크
- <img src="..." alt="...">`: 이미지

#### 목록
- `<ul>`: 순서 없는 목록(점)
- `<ol>`: 순서 있는 목록(숫자)
- `<li>`: 목록 항목

#### 입력과 폼
- `<form>`: 입력 양식 전체를 감쌈
- `<input>`: 한 줄 입력
- `<label>`: 입력창의 이름표
- `<button>`: 버튼

#### 텍스트를 꾸미거나 의미를 더하는 태그
- `<code>`: 짧은 코드
- `<pre>`: 줄바꿈과 공백 보여줌
- `<mark>`: 형광펜 표시
- `<blockquote>`: 인용문

#### 표
- `<table>`: 표 전체
- `<thead>`, `<tbody>`, `<tfoot>`: 머리글, 본문, 바닥글 영역

## 시맨틱 HTML
가독성 및 기타 편의상 이유로 시맨틱 태그를 사용한다. 

### 시맨틱 태그
의미론적인, 의미를 가지는 태그

### 시맨틱 태그를 사용하는 이유
1. 코드의 가독성과 유지보수성
2. 웹 접근성
3. 검색엔진 최적화

