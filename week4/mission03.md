## 상태 관리

이 프로젝트에서도 굉장히 깊은 props 상속이 발생한다. 심지어 객체 구조 분해를 사용해서 props를 넘겨 주기 전에는 계속 같은 코드를 반복하는 것이 귀찮아서 실제로 props를 사용해야 하는 곳에서만 props.props.props.id와 같이 사용할까? 하는 유혹이 들기도 했다. <br>

이와 같이 높이 props를 끌어올려야 하는 상황을 Prop drilling이라 한다. 그리고 이런 상황을 해결하기 위해 순간이동시키는 방법을 Context라 한다. 

```js
<Section>
  <Heading level={3}>About</Heading>
  <Heading level={3}>Photos</Heading>
  <Heading level={3}>Videos</Heading>
</Section>
```
이 코드를 

```js
<Section level={3}>
  <Heading>About</Heading>
  <Heading>Photos</Heading>
  <Heading>Videos</Heading>
</Section>
```
이렇게 썼다. 그럼 heading에서 section의 레벨을 가져올 수 있을까?

1. Context를 생성하세요. (제목 레벨을 위한 것이므로 LevelContext라고 이름 지어봅시다.)
2. 데이터가 필요한 컴포넌트에서 context를 사용하세요. (Heading에서는 LevelContext를 사용합니다.)
3. 데이터를 지정하는 컴포넌트에서 context를 제공하세요. (Section에서는 LevelContext를 제공합니다.)

```js
export default function Heading({ children }) {
  const level = useContext(LevelContext);
  // ...
}
```
이렇게 가장 근처의 상태를 요청할 수 있고,


```js
import { LevelContext } from './LevelContext.js';

export default function Section({ level, children }) {
  return (
    <section className="section">
      <LevelContext value={level}>
        {children}
      </LevelContext>
    </section>
  );
}
```
이렇게 상위 컴포넌트의 상태를 하위 컴포넌트에 알릴 수 있다. <br>

이러한 역할을 하는 상태 관리 라이브러리도 다양하다. 
- Zustand
- Jotai
- Redux Toolkit