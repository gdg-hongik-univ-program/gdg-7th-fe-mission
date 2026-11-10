## React Router

### SPA(Single Page App)와 클라이언트 사이드 라우팅
SPA는 단일 html 페이지로 구성된 웹을 말한다. 사용자가 페이지를 탐색할 때, 상호작용에 따라 전체 페이지를 다시 로드하는 것이 아닌, 현재 페이지 내에서 필요한 컨텐츠만 업데이트 되도록 동적으로 로드하여 빠르고 원활한 사용자 경험을 제공한다. React는 가상 DOM을 사용하여 이러한 작업을 돕는다. <br>
이때 페이지가 하나라고 해서 URL도 하나인 것은 아니다. SPA에서는 여러 페이지를 제공하기 위해 Client-Side Routing을 사용한다. <br>
- `routing`: 사용자가 URL을 방문할 때 해당 URL에 맞는 페이지나 컨텐츠를 제공하는 방식

URL에 맞는 컨텐츠를 서버에 요청하는 게 아닌, 클라이언트가 화면을 직접 그린다. 이때 브라우저의 주소창은 History API를 통해 업데이트할 뿐, 새로고침은 일어나지 않는다. 

### `BrowserRouter`, `Routes`, `Route`의 역할

```js
const App = () => {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/product1/" element={<Product1 />}></Route>
					<Route path="/product2/" element={<Product2 />}></Route>
					<Route path="/product3/" element={<Product3 />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};
```

이와 같이 `BrowserRouter`로 전체 태그를 감싸고, 최상위 컴포넌트에서 보여줄 페이지들의 URL 경로와 매칭되는 컴포넌트를 `Route`로 정의하여 사용한다. `Routes`는 여러 라우트를 정의하는 컨테이너 역할을 한다. 

### `Link`와 `useNavigate`를 활용한 페이지 이동

`Link` 컴포넌트와 `to` 속성을 `<a>` 태그처럼 이용하여 경로 이동을 구현할 수 있다. `<button>` 태그와 `onClick` 속성을 이용할 때에는 `useNavigate`으로 경로를 변경한다. 

## CSS

### CSS Modules
: CSS 클래스 이름이 컴포넌트 내에서만 유효하도록 만들어 전역적인 클래스 이름 충돌 문제를 방지하는 기술 <br>

스타일을 적용할 컴포넌트와 동일한 위치에 `[컴포넌트명].module.css` 형식으로 CSS 파일을 생성해 사용한다. 클래스 이름을 찾는 범위가 로컬 scope로 한정되어 충돌 걱정이 없다. 

### Tailwind CSS
: 미리 정의된 수많은 Utility Classes를 조합하여 UI를 구축하는 프레임워크 <br>

- Utility Class: `flex`, `pt-4`, `text-center`와 같이 단 하나의 CSS 속성만 담당하는 작은 단위의 클래스

```html
<h1 className="text-3xl font-bold text-red-500">Hello, Tailwind CSS!</h1>
```

HTML 내에서 바로 스타일 적용이 가능해 개발 속도가 매우 빠르며, 미리 정의된 값을 사용하므로 디자인 일관성을 유지하기 좋다. 빌드 시 미사용 유틸리티 클래스는 자동 제거되어 최종 CSS 파일 크기가 작다. 