# Linting과 Formatting

## Linting(린팅)

코드를 실행하기 전에 미리 읽어 보고, 문제가 되는 코드를 찾아 알려주는 것이다. 
코드의 품질과 버그 가능성을 검사한다.  

## Formatting

코드가 하는 일은 건드리지 않고, 보이는 모양만 일정하게 맞추는 것
코드 스타일을 일정하게 통일하는 거다.  이런 일을 해 주는 도구를 Formatter라고 한다. 

# ESLint와 Prettier의 역할과 차이점

## ESLint = 대표적인 Linter

- JavaScript / React 코드에서 문제가 될 코드를 찾아 주는 도구이다.
- eslint.config.js에서 어떤 규칙으로 검사할지 정한다.



## Prettier = 대표적인 Formatter

- 저장할 때 코드를 정해진 스타일로 자동 정리 해주는 도구이다.
- .prettierrc 설정대로 통일한다.
- 코드는 검사 안하고 모양만 확인한다.

## 차이점

ESLint는 버그를 잘 잡고, Prettier은 정리만 잘 되어 있다.

## 둘 다 사용해야하는 이유

둘 다 사용해야 버그도 잘 잡고, 정리도 잘 되기 때문이다.

