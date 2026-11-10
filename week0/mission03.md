### 1. JavaScript에서 `let`과 `const`의 차이점은 무엇인가요? `const`로 선언한 객체의 속성도 변경할 수 없을까요?

`let`은 변수로 사용된다. 값을 여러 번 재할당할 수 있다. 
`const`는 주로 상수로 사용된다. 한 번 선언한 후 값을 바꿀 수 없다. <br>
그러나 `const`로 선언된 객체나 배열 자체를 재할당하는 것은 불가능하나, 객체 내부의 속성을 변경하거나 추가하는 것, 배열의 요소를 수정하는 것은 가능하다. 
```
const user = { name: 'Seohee' };
user.name = 'GDG'; // 가능
```

### 2. 배열의 `map()`, `filter()`, `find()`는 각각 어떤 역할을 하며, 반환하는 결과는 어떻게 다른가요?
`map()`을 이용한 상품 이름 가져오기
```
const products = [
    { id: 1, name: "티셔츠", price: 20000 },
    { id: 2, name: "청바지", price: 45000 },
    { id: 3, name: "운동화", price: 78000 }
];

const map = products.map((x) => x.name);

console.log(map);
```
<br> 

`filter()`를 이용한 50000원 이하 상품 찾기
```
const products = [
    { id: 1, name: "티셔츠", price: 20000 },
    { id: 2, name: "청바지", price: 45000 },
    { id: 3, name: "운동화", price: 78000 }
];

const filter = products.filter((x) => x.price<50000);

console.log(filter);
```
<br>

`find()`를 이용한 id가 2인 상품 찾기

```
const products = [
    { id: 1, name: "티셔츠", price: 20000 },
    { id: 2, name: "청바지", price: 45000 },
    { id: 3, name: "운동화", price: 78000 }
];

const find = products.find((x) => x.id==2);

console.log(find);
```


### 3. 구조 분해 할당(Destructuring)은 무엇이며, 어떤 상황에서 활용할 수 있나요?

- 배열
```
const array = ["Seohee", "20", "Coding"];

const [ name, age, hobby ] = array;
console.log(name); // Seohee
console.log(age); // 20
console.log(hobby); // Coding
```
<br>

- 객체
```
const object = { name: "Seohee", age: 20 };
const { name, age } = object;

console.log(name); // Seohee
console.log(age); // 20
```

배열 구조 분해는 배열에 담긴 값을 지정한 이름의 변수에 담는다. 이때 [ ... ]를 사용한다. <br>
객체 구조 분해는 객체의 value 값을 key 이름의 변수에 담는다. 이때 { ... }를 사용한다. <br>
객체 구조 분해에서 key 값이 아닌 다른 이름을 사용하려면 다음과 같이 쓸 수 있다. 

```
const { name: n, age: a } = object;

console.log(n); // Seohee
console.log(a); // 20
```

### 4. Promise란?

: 미래의 어떤 시점에 값을 제공하겠다는 약속 <br>
프로미스가 생성된 시점에는 알 수 없을 수도 있는 값을 위한 대리자이다. 큰 데이터를 불러올 때, 시간이 걸리는 작업 후 값을 업데이트할 때 등에 사용한다. <br>

`Promise`는 다음 중 하나의 상태를 가진다. <br>
- 대기(pending): 이행하지도, 거부하지도 않은 초기 상태
- 이행(fulfilled): 연산이 성공적으로 완료된 상태
- 거부(rejected): 연산이 실패한 상태

```
const myPromise = () => {
    return new Promise((resolve, reject) => {
        const data = fetch('URL');
        
        if (data)
            resolve(data);
        else
            reject("Error");
    })
};

myPromise()
    .then((value) => {
        console.log(value);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        // 무조건 실행됨
    });
```
위와 같이 사용하면 비동기 작업을 쉽게 할 수 있다. 성공할지 실패할지 모르는 작업, 시간이 걸리는 작업을 다룰 때 간편하다. 