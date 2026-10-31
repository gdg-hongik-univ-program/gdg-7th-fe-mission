### 1. CSS의 `id` 선택자와 `class` 선택자는 어떻게 다르며, 각각 어떤 상황에서 사용하는 것이 좋을까요?

`id` 선택자는 `#id`와 같이 사용해 해당 id의 요소를 선택한다. `class` 선택자는 `.class`와 같이 사용해 해당 class의 요소를 선택한다. <br>
우선순위는 `id` 선택자가 더 높다. <br>
따라서 고유한 요소의 가장 우선적인 스타일을 결정하기 위해서는 `id` 선택자를 사용해야 한다. 여러 요소에 동시에 같은 스타일을 적용하고자 할 때에는 `class` 선택자를 사용해야 한다. 

### 2. `margin`과 `padding`은 어떤 차이가 있나요? `box-sizing: border-box`를 사용하면 무엇이 달라질까요?

`margin`은 border 바깥쪽의 여백을 결정한다. `padding`은 border 안쪽의 여백이다. <br> 
`box-sizing: border-box`를 사용할 경우, width로 지정한 값이 padding과 border를 포함한 컨텐츠의 너비가 된다. 

### 3. Flexbox 직접 정리하기

Flex Container -> `display: flex;`가 설정된 부모 컨테이너 <br>
Flex Item -> 부모 컨테이너 안에 들어 있는 자식 아이템 <br>

Flexbox는 기본적으로 아이템을 가로 방향으로 배열한다. 이때 `flex-direction`을 통해 방향을 바꿀 수 있다. <br>
`flex-direction: row` or `column;`

``` 
.box {
    display: flex;
    justify-content: space-between;
}
```
`justify-content`는 main-axis 방향 배열을 결정한다. 

``` 
.box {
    display: flex;
    align-items: space-between;
}
```
`align-items`는 cross-axis 방향 배열을 결정한다. <br>
<br>
속성이 `space-between`이 아니고 아이템 사이가 서로 가까운 경우, 간격을 설정해줄 수 있다. `gap`을 사용한다. 
``` 
.box {
    display: flex;
    justify-content: center;
    gap: 4px;
}
```
`flex-wrap`을 사용하면 줄바꿈을 설정할 수 있다. <br>
`flex-wrap: wrap` or `nowrap;`

### 4. Media Query 알아보기

미디어 유형 특정하기
```
@media screen {
    /* screen only */
}
```

미디어 기능 특정하기
```
@media (hover: hover) {
  /* when hovered */
}
```

사이즈 제한하기
```
@media (max-width: 1250px) {
  /* 1250px 이하인 경우 */
}
```
-> 이와 같이 스크린 사이즈를 제한해 모바일, 데스크탑용 레이아웃을 따로 개발할 수 있다. 