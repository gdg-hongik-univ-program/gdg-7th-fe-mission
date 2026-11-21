# 주요 폴더 역할
- components : 재사용 가능한 UI 컴포넌트를 모아 두는 디렉토리
- pages : 화면 단위 컴포넌트를 모아 두는 관례적 폴더
- apis : fetch, axios 등을 사용해 서버에 데이터를 요청하고 응답을 받는 함수들을 관리
- hooks : 상태 관리, 사이드 이펙트, 데이터 페칭, 폼/모달 제어 등 컴포넌트 로직을 추상화한 custom hook을 보관
- utils : 프로젝트 전반에서 재사용할 수 있는 범용 헬퍼 함수나 순수 함수를 모아두는 디렉터리
-------------
# 파일 분리 기준
- 역할별로 나누기 : 파일 하나에는 역할 하나만
- 종류별로 나누기
- 기능별로 나누기
----------------------
# 리팩토링하기

#### 리팩토링 전 문제
["의류", "전자기기", "화장품", "식품"]이 CategoryPage.jsx와 AdminPage.jsx에 똑같이 두 번 있다.

```jsx
// CategoryPage.jsx
const categories = ["의류", "전자기기", "화장품", "식품"];

// AdminPage.jsx
const categories = ["의류", "전자기기", "화장품", "식품"];
```

#### 리팩토링 후
`src/constants/categories.js`에 한 번만 선언하고, 두 파일에서 불러와 사용한다.

```js
// constants/categories.js
export const CATEGORIES = ["의류", "전자기기", "화장품", "식품"];
```

```jsx
// CategoryPage.jsx, AdminPage.jsx
import { CATEGORIES } from "../constants/categories";

{CATEGORIES.map((category) => ( ... ))}
```

## 변경 이유
- 같은 값이 두 파일에 있으면 카테고리를 바꿀 때 두 곳을 모두 고쳐야 하고, 하나를 빠뜨리면 페이지마다 목록이 달라질 수 있다.
- API 명세서에서 허용하는 카테고리 4개를 한곳에서 관리할 수 있다.
- 바뀌지 않는 고정값을 `constants` 폴더에 모아 파일의 역할을 분명히 했다.