# Refactoring과 Custom Hook 학습하기

## Refactoring의 의미와 필요성
리팩토링: 겉으로 보이는 동작은 그대로 두고, 코드의 내부 구조를 더 이해하기 쉽고 고치기 쉽게 바꾸는 것이다.  

### 왜 필요한가?
1. 읽기 쉬워진다. 
2. 고치기 쉬워진다. 
3. 버그가 준다. 
4. 새 기능을 넣기 쉬워진다. 

## Custom Hook의 개념과 사용 목적
### 개념
커스텀 훅은 여러 커포넌트에서 반복되는 "state + Effect 로직"을 `use`로 시작하는 함수로 묶어서 재사용하는 것이다.  
`useState`, `useEffect` 같은 기본 Hook을 조합해서 내가 직접 만드는 Hook이다.  

### 왜 필요한가?
같은 코드가 두 컴포넌트에 반복될 때, 그 코드를 커스텀 훅으로 뺄 수 있다.  
**전**
```js
const [isOnline, setIsOnline] = useState(true);
useEffect(() => {
  function handleOnline() { setIsOnline(true); }
  function handleOffline() { setIsOnline(false); }
  window.addEventListener('online', handleOnline);
  window.addEventListener('offline', handleOffline);
  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('offline', handleOffline);
  };
}, []);
```
**후**
```js
// 커스텀 훅
function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    // ... 위와 같은 이벤트 등록과 정리
  }, []);
  return isOnline;
}
// 커스텀 훅 뺀 결과
function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();
  return <button disabled={!isOnline}>{isOnline ? '저장' : '재연결 중...'}</button>;
}
```
이제 컴포넌트는 **목적**만 말하고, **어떻게**는 Hook 안에 숨겨진다.  

### 이름 규칙
- `use` + 대문자로 시작해야 한다. 
- 이름으로 "이 함수 안에 state나 Effect가 있다"는 걸 한 눈에 알 수 있다. 
- Hook을 하나도 안 쓰는 함수는 `use`로 시작하면 안 된다. 

**중요한 점: state를 공유하는게 아니라 "로직"을 공유하는 것이다.**  
**커스텀 Hook을 부를 때마다 state가 따로 생긴다.** 

### 그 외 알아둘 것
Effect를 감쌀 때 만들면 좋다.  
작은 중복마다 다 만들 필요는 없다.  
"언제 실행되는지"를 이름으로 한 Hook은 피해야 한다.  
커스텀 Hook의 코드는 컴포넌트가 다시 렌더링될 때마다 같이 다시 실행되서, 순수하게 짜야 한다.  

## 일반 함수와 Custom Hook의 차이점 정리하기
| |일반 함수|커스텀 Hook|
|---|---|---|
|이름|자유|`use` + 대문자|
|안에서 Hook 사용| ❌ 못 씀 | ✅ (`useState`, `useEffect`) 등 사용|
|state 기억| ❌ 부를 때마다 새로 계산| ✅ 렌더링 사이에 값을 기억|
|값이 바뀌면 화면 갱신|❌|✅ 안의 state가 바뀌면 그 컴포넌트가 다시 렌더링|
|어디서 부르나|어디서든|컴포넌트나 다른 컴포넌트 Hook의 맨 위에만|
|조건문 안에서 호출|✅ 가능|❌ 안 됨|
|쓰는 목적|값 계산, 변환, 요청 같은 로직 재사용|state와 Effect가 들어간 로직 재사용|

## 지금까지 작성한 쇼핑몰 코드에서 리팩터링하거나 Custom Hook을 활용할 수 있는 사례 한 가지 생각해 보기
`App.jsx`의 상품 불러오기 부분에서 에러 처리를 거의 똑같이 두 번 하고 있어서 커스텀 훅으로 묶으면 좋아 보인다. 
```js
async function refreshProducts() {
  try {
    const data = await getProducts();     // 같음
    setProducts(data);                    // 같음
  } catch (error) {
    console.error(error);                 // 같음
  }
}
```
`useProducts`라는 이름으로 커스텀 Hook으로 만들면 좋을 것 같다.  

## Gdg 스터디 영상 정리

### 리팩토링
- `rafce`: 함수형 코드 나옴
- `rfce`: 기본 껌데기 함수형 코드 나옴
- `usss`: `useState` 코드 나옴
- `uef`: `useEffect` 코드 나옴

```js
fucntion Todo(props) {
    return (
        <div key={props.id}>
            <P>{props.title}</p>
        </div>
    )
}
export default Todo
```

```js
<Todo id={todo.id} title={todo.title}/>
```

리팩토링은 결과의 변경 없이 코드의 구조를 재조정하는 작업이다.  
오래된 코드를 고칠 때만 하는게 아니라 첨부터 완벽하게 만들기 어려워서 한다.  

### 커스텀 훅
폴더 세개
- `components`: Todo/EmptyData 컴포넌트
- `hooks`: Custom Hook
- `pages`: User1, User2 페이지

`useState`나 `useEffect`가 중복될 때 하나로 묶기

커스텀 훅은 남발하면 안된다.  