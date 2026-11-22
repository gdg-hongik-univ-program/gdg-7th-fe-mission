## 리팩토링

- 기본은 컴포넌트 나누기.
- 부모 컴포넌트가 자식 컴포넌트의 로직을 신경 쓸 필요 없도록 해 준다. 
- (믿고 끌어다 쓰기)
- `.map()` 내부를 새 컴포넌트로 만들면 깔끔하다. 

```js
function Admin({ update }) {
    return (
        <div className="admin-view flex flex-col gap-8">
            <Add update={update} />
            <Restock update={update} />
            <Delete update={update} />
        </div>
    );
}
```
한 페이지 내부에 있는 코드도 이런 식으로 쪼개서 불러오도록 했다. 

## Custom Hook

: 반복되는 useState, useEffect를 묶어서 나만의 훅을 만들 수 있다. <br>
하나의 함수에 훅을 조합해 넣어 놓고 호출해 사용하게 되면 그게 커스텀 훅이다. 컴포넌트 간 로직이 공유되어야 할 때 유용하게 사용된다. 