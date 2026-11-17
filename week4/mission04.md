# Mission 4. 폴더 구조

## 주요 폴더의 역할

- components: 여러 곳에서 재사용하는 UI 조각. (Navbar, Footer, Item 같은 것)
- pages: 라우터 주소 하나에 연결되는 페이지 단위 컴포넌트. 안에서 components를 조합해서 화면을 만든다.
- apis: 서버와 통신하는 함수 모음. fetch 코드를 한 곳에 모아두면 주소나 요청 방식이 바뀌어도 여기만 고치면 된다.
- hooks: 직접 만든 커스텀 훅. 상태나 useEffect가 들어간 로직을 컴포넌트에서 분리할 때 쓴다.
- utils: 상태 없이 계산만 하는 일반 함수. (가격 포맷, 날짜 변환 등)
- stores: 여러 컴포넌트가 같이 쓰는 전역 상태. Context나 상태 관리 라이브러리의 store를 둔다.
- assets: 이미지, 아이콘 같은 정적 파일.

## 파일을 나누는 기준

- 역할이 다르면 나눈다. 화면을 그리는 코드, 서버와 통신하는 코드, 상태를 관리하는 코드는 서로 다른 폴더에 둔다.
- 재사용되는지 본다. 여러 페이지에서 쓰면 components, 한 페이지에서만 쓰면 그 페이지 안에 둬도 된다.
- 상태가 있는지 본다. useState, useEffect가 있으면 hooks, 계산만 하면 utils로 나눈다.
- 프로젝트 규모에 맞춘다. 지금은 파일이 많지 않아서 폴더를 너무 잘게 나누면 오히려 찾기 어렵다. FSD처럼 세세한 구조보다는 역할별 폴더 정도가 적당하다고 생각했다.

## 쇼핑몰 프로젝트 리팩터링

### 리팩터링 전

src
├── apis
│   └── products.js
├── components
├── pages
├── stores          (미션 3에서 추가)
├── App.jsx
└── main.jsx

App.jsx 안에 아래 코드가 같이 들어 있었다.
- products, loading, error state 3개
- useEffect로 상품 목록을 불러오고 로딩/에러를 처리하는 코드
- 구매 처리(handlePurchase)
- Navbar, Routes, Footer 화면 구성

App은 원래 전체 화면 배치와 라우팅을 담당하는 컴포넌트인데, 상품을 불러오는 코드가 위쪽을 길게 차지하고 있어서 App을 열었을 때 화면 구조가 바로 안 보였다.

### 리팩터링 후

src
├── apis
│   └── products.js
├── components
├── hooks
│   └── useProducts.js
├── pages
├── stores
│   ├── cartContext.js
│   └── CartProvider.jsx
├── App.jsx
└── main.jsx

hooks/useProducts.js
- App에 있던 products, loading, error state와 useEffect를 그대로 옮겼다.
- products, setProducts, loading, error를 return해서 App에서 쓸 수 있게 했다.
- setProducts도 같이 돌려주는 건 관리자 페이지에서 삭제 후 목록을 갱신하고, 구매 후 목록을 다시 불러올 때 필요해서다.

App.jsx
- state 3개와 useEffect가 아래 한 줄로 바뀌었다.

const { products, setProducts, loading, error } = useProducts();

- App에서 useState, useEffect를 더 이상 쓰지 않아서 react import도 지웠다.

### 변경 이유
- App은 화면 구성과 구매 처리만 남아서 읽기 쉬워졌다.
- 상품을 불러오는 방식이 바뀌어도 useProducts.js만 고치면 된다.
- 폴더 이름만 봐도 apis는 통신, hooks는 커스텀 훅, stores는 전역 상태, components와 pages는 화면이라는 게 보이도록 나눴다.
- 미션 1에서 리팩터링할 수 있는 부분으로 생각했던 걸 실제로 적용했다.

### 리팩터링하면서 있었던 일
코드만 새 파일로 옮기고 import, export를 빼먹어서 ESLint에서 'useState' is not defined, 'useProducts' is not defined 같은 에러가 나왔다. App에는 안 쓰게 된 useState, useEffect import가 남아서 never used 에러도 나왔다. 
파일을 옮길 때 import 경로와 export를 같이 챙겨야 한다는 걸 알게 됐고, lint 덕분에 빠진 곳을 바로 찾을 수 있었다.

### 동작 확인
npm run lint 에러 0개, format:check 통과를 확인했다. 
npm run dev로 실행해서 상품 목록 로딩, 관리자 페이지, 장바구니 담기와 구매가 리팩터링 전과 똑같이 동작하는 것을 확인했다.