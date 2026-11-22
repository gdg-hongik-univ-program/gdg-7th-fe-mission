## 폴더 구조

- 가장 간단한 구조

```
- public
- src
    - assets
    - components
    - hooks
    - styles
    - types
```

- 페이지-레이아웃 구조

```
- src
    - assets
    - components
    - data
    - hooks
    - layout
    - pages
    - styles
    - tests
    - types
    - utils
```

몇 개 폴더 제외하고는 우리 프로젝트도 이 구조에 속하는 것 같다.

- 복잡해진 구조

```
- src
    - assets
    - colors
    - components
    - config
    - data
    - fonts
    - hooks
    - layout
    - pages
    - services
    - stores
    - stories
    - styles
    - tests
    - types
    - ui
    - utils
```

구조가 복잡해질수록, 하나의 요소를 나타내는 관련된 코드들이 너무 흩어져 있게 된다. 그럴 때는 기능별로 나누는 방법이 있다.

```
- todo
    - components
    - data
    - hooks
    - services
    - tests
    - types
```

### FSD

FSD는 위의 개념을 바탕으로 한 규칙을 이용한다.

1. app은 (되도록)page만 import 한다.
2. page에서는 UI, features, entities, shared 를 import 할 수 있다.
3. UI 에서는, features, entities, shared를 import 할 수 있다.
4. features에서는 entities와 shared를 import할 수 있다.
5. entities는 shared만 import 할 수 있다.

## 프로젝트에서 개선할 부분

- Props drilling
- 서로 다른 들여쓰기, 가독성 문제

Context API, Prettier로 수정해 주겠다.
