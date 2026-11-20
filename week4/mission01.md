refactoring은 코드는 작아져도 같은 로직을 갖고 있는 것을 말한다. 결과의 변경 없이 코드의 구조를 재조정하는 것인데 쉽게 말해 보기 쉽게 정리하는 과정이다. 그렇기 때문에 refactoring을 하면 가독성이 향상되고 유지보수가 편리해진다.
Custom Hook은 react의 hook을 활용하는 함수를 별도의 분리하여 재사용할 수 있도록 만든 함수이다. 올려준 강의를 보면서 별도의 파일을 따로 만들어 직접 따라해봤는데 전에 비해 한눈에 보기 편해졌다. 특히 반복되는 함수를 커스텀 훅으로 따로 페이지를 만드니 재사용할 때 용이함을 많이 느꼈다.
일반함수와 달리 Custom Hook은 use로 시작하며 react 로직을 재사용한다. 그렇기 때문에 Custom Hook 페이지에는 react로직을 import하는 대신 Custom Hook을 사용하는 페이지에서는 그 부분을 생략할 수 있다.
상품의 데이터를 관리하는 코드가 들어간 SortPage,Content, PricePage, CategoryPage를 custom hook을 통해 정리했다. 이때 주의할 부분이 custom hook을 사용해도 다른 코드에서 react hook을 아직 사용하고 있다면 기존 import값을 유지해야한다.
