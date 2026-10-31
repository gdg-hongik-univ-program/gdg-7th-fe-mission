### 1. HTML의 Element와 Attribute는 무엇인가요?

**Element**: 요소 <br>
HTML 코드를 구성한다. 컨텐츠를 포함하지 않고, 종료 태그도 없을 경우 <b>빈 요소(Void Element)</b>라고 한다. 
요소는 다른 요소를 포함할 수 있다. <br>
```
<div>
    <p>상품에 대한 설명</p>
</div>
``` 
<br>

**Attribute**: 속성 <br>
요소에 추가적인 정보를 제공한다. 특히 `id`는 고유하게, `class`는 여러 요소에 지정할 수 있다. <br>
```
<img src="product.png", alt="흰색 반팔 티셔츠">
```


### 2. div와 Semantic Tag의 차이는 무엇인가요?

**Semantic**: 의미를 가지는 <br>
`div`는 단순히 요소들을 묶을 때 사용된다. 
Semantic Tag는 영역이 의미하는 바를 명확히 전달한다. <br>
Semantic Tag를 이용할 때, 코드를 더 이해하기 쉽고 가독성이 좋다. 

### 3. `<article>` vs `<section>` 두 태그의 차이점은 무엇인가요?

`article`: 독립적이고 완전히 자립적인 컨텐츠를 감쌀 때 이 태그를 사용한다. 단독으로도 사용되며 재사용될 수 있다. <br>
`section`: 주제별로 연관된 내용을 그룹화하고 나눈다. 단독으로는 잘 사용되지 않으며, 전체 문서의 일부분이 된다. <br>