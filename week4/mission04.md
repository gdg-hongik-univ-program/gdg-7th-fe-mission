# 폴더 구조

## 주요 폴더의 역할

| 폴더 | 역할 | 예시 |
| --- | --- | --- |
| `components` | 여러 곳에서 다시 쓰는 작은 화면 조각 | 버튼, `Item`, `Navbar`, `Footer` |
| `pages` | 주소(Route) 하나에 연결되는 화면 전체 | `HomePage`, `CategoryPage`, `AdminPage` |
| `apis` | 서버와 통신하는 함수 (fetch) | `getProducts`, `createProduct` |
| `hooks` | 직접 만든 Custom Hook | `useNumberInput`, `useProducts` |
| `utils` | 화면이나 상태와 상관없는 계산/변환 함수 | 가격에 콤마 찍기, 날짜 바꾸기 |

- `components`는 **부품**, `pages`는 부품을 조립한 **완성된 화면**이다.
- `hooks`에는 `useState`, `useEffect`를 쓰는 함수, `utils`에는 그냥 일반 함수를 넣는다.

## 파일을 나누는 기준

- **역할이 다르면 나눈다.** 화면, 서버 통신, 상태 로직, 계산은 각자 다른 폴더에 둔다.
- **두 군데 이상에서 쓰면 뺀다.** 복붙된 코드는 `components`, `hooks`, `utils`로 빼서 한 곳에서 관리한다.
- **주소(Route)에 연결되면 `pages`에 둔다.**
- **한 파일에는 한 가지 일만** 하게 한다. 파일이 너무 길어지면 나눌 때가 된 것이다.
- **안 쓰는 파일은 지운다.** 같은 이름 파일이 여러 개 있으면 어떤 게 진짜인지 헷갈린다.

# 쇼핑몰 프로젝트 리팩토링

## 리팩토링 전 구조
```
src/
├─ components/
│  ├─ CategoryPage.jsx   ← pages에도 있음 (안 쓰는 복사본)
│  ├─ PricePage.jsx      ← pages에도 있음 (안 쓰는 복사본)
│  ├─ SortPage.jsx       ← pages에도 있음 (안 쓰는 복사본)
│  ├─ Content.jsx        ← 메인 화면인데 components에 있음
│  ├─ Item.jsx
│  ├─ Navbar.jsx
│  └─ Footer.jsx
├─ data/
│  └─ mockData.js        ← 위 복사본들만 불러옴 (실제로는 안 씀)
└─ pages/
   ├─ HomePage.jsx       ← 빈 파일
   ├─ CategoryPage.jsx
   ├─ PricePage.jsx
   ├─ SortPage.jsx
   └─ AdminPage.jsx
```

## 문제점
- `CategoryPage`, `PricePage`, `SortPage`가 `components`와 `pages`에 **두 벌씩** 있다. `App.jsx`는 `pages` 것만 쓴다.
- 그래서 `components` 쪽을 고쳐도 화면이 안 바뀌어서 헷갈린다.
- `mockData.js`는 서버에서 데이터를 받게 바뀐 뒤로 안 쓰는데 남아 있다.
- 메인 화면(`/`)인 `Content.jsx`는 페이지인데 `components`에 있고, `pages/HomePage.jsx`는 비어 있다.

## 리팩토링 내용
1. `components`의 안 쓰는 복사본 3개(`CategoryPage`, `PricePage`, `SortPage`)를 지웠다.
2. 안 쓰는 `data/mockData.js`를 지웠다.
3. `components/Content.jsx`의 내용을 `pages/HomePage.jsx`로 옮기고 이름을 `HomePage`로 바꿨다.
4. 파일 위치가 바뀌어서 `import` 경로를 고쳤다.

```jsx
// pages/HomePage.jsx
import Item from '../components/Item';       // 전: './Item'
import { searchProduct } from '../apis/products';

// App.jsx
import HomePage from './pages/HomePage';     // 전: import Content from './components/Content';
<Route path="/" element={showPage(<HomePage items={items} cart={cart} setCart={setCart} />)} />
```

## 리팩토링 후 구조
```
src/
├─ components/
│  ├─ Item.jsx
│  ├─ Navbar.jsx
│  └─ Footer.jsx
└─ pages/
   ├─ HomePage.jsx
   ├─ CategoryPage.jsx
   ├─ PricePage.jsx
   ├─ SortPage.jsx
   └─ AdminPage.jsx
```

## 변경 이유
- `components`에는 부품만, `pages`에는 화면만 남아서 **어디에 뭐가 있는지 바로 보인다.**
- 같은 파일이 두 벌 있지 않아서 **고칠 곳이 하나**가 됐다.
- 메인 화면도 다른 화면처럼 `pages`에 있어서 규칙이 일정해졌다.

## 동작 확인
- `npm run dev` 후 메인, 카테고리, 가격, 정렬, 관리자 페이지가 전과 똑같이 나오는지 확인했다.
- 검색, 장바구니 담기도 전과 똑같이 동작했다.