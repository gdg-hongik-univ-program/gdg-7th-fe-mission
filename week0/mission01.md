### 1. HTML의 Element와 Attribute의 차이
Element는 일반적으로 시작 태그, 콘텐츠, 종료 태그로 이루어져 있음. 웹을 구성하는 기본 단위 ex : <p>content</p>
Attribute는 요소에 추가적인 정보를 제공함. 일반적으로 이름="값" 형태로 이루어짐 ex : <p id = "first">~</p>

### 2. div와 시맨틱 태그의 차이
div : 의미를 부여하지 않고 요소들을 묶는데 사용. Semantic tag : 의미를 명확하게 나타내는 tag
위와 같은 차이로 인하여 코드의 가독성과 웹의 접근성, 검색엔진을 최적화하기 위해서는 시맨틱 태그를 사용하는 것이 더 유리함.
ex : <article>, <section>

### 3. <article>과 <section>의 차이
공통점 : 둘 다 의미를 나타내는 Semantic tag
차이점 : <section>은 주제별로 콘텐츠를 구획하는 반면 <article>은 독립적으로 콘텐츠가 구성됨.
예를들어, 최신 뉴스 목록은 <section>으로 구분하고, 각각의 뉴스 기사는 독립적인 콘텐츠이므로 <article>로 구성할 수 있음.