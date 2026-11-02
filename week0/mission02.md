1. CCS

HTML은 웹페이지의 뼈대 CSS는 요소들의 색상, 크기, 위치 등을 결정

1.1 CSS 기본 문법

CCS는 선택자(Selector), 속성(Property), 값(Value)로 구성
p{
	color: blue;
	font-size: 16px
}
p: 스타일 적용할 대상인 선택자
color, font-size: 변경할 스타일 속성
blue, 16px: 속성에 적용할 값
p를 파란색, 16px의 크기로 지정

1.2 CSS 적용 방법

대표적인 세가지
-인라인 스타일: HTML Element의 style 속성에 작성
-내부 스타일시트:  HTML의 style 태그 안에 작성
-외부 스타일시트: 별도의 .css 파일을 만들어 연결



2. CSS 선택자

어떤 HTML 요소에 스타일을 적용할지 지정

대표적으로 태그, 클래스, ID 선택자
태그: p
클래스: .description
ID: #notice
로 표현

2.1 CSS 우선순위

캐스케이드: 어떤 스타일잉 최종적으로 결정될지 결정하는 규칙

우선순위: ID선택자 > 클래스 선택자 > 태그 선택자
우선순위가 같다면 제일 최신 수정한 스타일이 적용



3. CSS의 주요 속성

color: 글자 색상
background-color: 배경 색상
font-size: 글자 크기
font-weight: 글자 두께
width, height: 요소의 너비와 높이]
border: 테두리
border-radius: 모서리를 둥글게 만들기
margin: 요소 바깥쪽 여백
padding: 요소 안쪽 여백



4. 박스 모델

content: 텍스트나 이미지 등 실제컨텐츠
padding: 콘텐츠와 테두리 사이의 여백(요소 바깥쪽 공간 조절)
border: 요소의 테두리(요소 내부의 공간 조절)
margin: 요소 바깥쪽의 여백

4.1 box-sizing

width: 200px;
padding: 20px;
border: 2px solid black;

box-sizing: content-box에서는 width가 콘텐츠 영역의 너비를 의미
실제 태두리 포함 너비는 244px

box-sizing: border-box;
width: 200px;
padding: 20px;
border: 2px solid black;

border-box는 설정한 width 안에  Padding과 Border가 포함되도록 계산
따라서 요소 테두리 포함한 너비는 200px



5. display와 레이아웃

HTML 요소는 display 속성에 따라 화면에 배치되는 방식이 다르다

5.1 Block, Inline, Inline-block

block: 기존덕을로 새로운 줄에서 시작하며 사용 가능한 너비를 차지
inline: 텍스트처럼 한 줄에 배치되며 width, height가 직접 적용되지 않음
inline-block: 한 줄에 배치되면서 너비와 높이도 설정 가능

div는 기본적으로 block, span은 inline으로 표시

display 값에 따라 요소의 배치와 크기가  어떻게 달라지는지 알아두면 좋아요



6. Flexbox: 박스들을 한 줄로 쉽게 정렬하고 배치하는 CSS방법

6.1 Flexbox 학습하기

-Flex Container와 Flex Item: 부모 요소에 display: flex를 주면 부모가 컨테이너가 되고, 바로 아래 자식들은 아이템이 된다
-Main Axis(주축)과 Cross Axis(교차축): 아이템이 늘어서는 방향이 주축, 그것의 수직이 교차축. 기본적으로는 주축은 가로, 교차축은 세로
-flex-direction: 주축 방향을 정함, row는 가로 column은 세로
-justify-content: 주축 방향 정렬, center는 가운데, space-between은 양 끝에 붙혀서 간격 일정하게
-align-items: 교차축 방향 정렬
-gap: 아이템 사이 간격
-flex-wrap: 공간이 모자랄 때 줄 바꿀지 말지, 기본값인 nowrap은 한 줄로 그냥 막 만들고, wrap은 그냥 줄 바꿈함



7. 추가로 알아야 할 CSS

7.1 Position

-static: 기본 배치 방법
-relative: 원래 배치를 기준으로 상대적으로 이동
-absolute: 기존의 배치 흐름에서 벗어나 기준 요소를 중심으로 위치 지정
-fixed: 일반적으로 화면(viewport)를 기준으로 위치 고정
-sticky: 스크롤 위치와 컨테이너에 따라 달라지는 배치

7.2 Hover & transition

:hover를 사용하면 마우스를 버튼에 올리면 색이 변함
transition은 속성값이 부드럽게 전환되도록 도와줌




Transform: 요소를 이동, 회전하거나 크기를 변경하는 방법

translate( , ) :이동
rotate():  회전
scale( , ): 크기 조절
skew: 기울이기(직사각형이 평행사변형 됨)
transform-origin: 기본값은 요소의 정중앙, transform-origin: topleft; 로 바꾸면 왼쪽 위의 모서리가 축이 됨