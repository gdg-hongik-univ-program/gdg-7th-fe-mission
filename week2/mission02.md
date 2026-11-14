## week2_mission02
### React Router
Routing: 사용자가 요청한 URL에 따라 해당 URL에 맞는 페이지를 렌더링함
React는  SPA방식을 사용한다. SPA(single page application)은 새로운 페이지를 로드하지 않고, 컴포넌트만 변경하는 방식이다.
React Router는 신규 페이지를 불러오는게 아니라 각각의 URL에 맞는 컴포넌트를 렌더링한다.
기존에 a태그를 이용하여 페이지를 이동하는것은 React의 방식을 살리기 어렵기 때문에 Router를 이용해 필요한 부분만 렌더링 하는 편이 더 효율적이다.
가장 많이 사용하는 BrowserRouter 컴포넌트는 브라우저의 주소를 감지한다.
Routes 컴포넌트는 여러 Route를 감싸서 그 중 규칙이 일치하는 라우트 하나를 렌더링 시킨다.
Route 컴포넌트는 path속성에 경로를 element속성에는 컴포넌트를 넣어준다. 여러 라우팅을 매칭하고 싶은경우 URL뒤에 *을 둔다. <Route path="*">면 정의되지 않은 URL을 처리하기 위해 사용한다.
Link컴포넌트: 웹 페이지에서는 원래 링크를 보여줄 때 a태그를 사용하지만 a태그는 클릭시 페이지를 새로 불러오기때문에 사용하지 않는다. to Attribute: 이동할 경로, replace: true로 설정하면 현재 방문 기록을 대체
useNavigate: Link컴포넌트를 사용하지 않고 다른 페이지로 이동해야하는 경우, 페이지 이동을 수행하는 Hook이다. 

### Tailwind CSS
Tailwind CSS는 유틸리티 우선 방식으로 따로 CSS파일을 만들지 않고 미리 정의된 css를 className에 바로 작성하여 스타일을 적용하는 것이다.
ex. <nav className="flex items-center justify-between px-6 py-4">
group-hover: 부모요소에 마우스를 올렸을때 자식 요소의 스타일을 변경할 수 있다.
peer: 경고 문구를 보여줄때 유용하게 사용함. peer 요소가 유효하지 않을 때 문구를 보여줌.
clsx: 조건부로 className을 처리하는데 사용됨. 객체나 배열을 통해 조건에 따라 클래스를 추가하거나 제거할 수 있다.
clsx()는 전달받은 클래스들을 하나의 문자열로 합친다.
tailwind-merge는 클래스 충동을 해결한다. 중복된 CSS클래스를 제거하고, 마지막에 선언된 클래스를 우선시하여 병합.
ex. twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
    // → 'hover:bg-dark-red p-3 bg-[#B91C1C]'