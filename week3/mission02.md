# Fetch와 Axios 학습하기

## fetch
브라우저에 기본으로 들어 있는 HTTP 요청 함수여서, 설치 없이 바로 쓸 수 있다.  
호출하면 Promise를 돌려주고, 응답이 오면 `Response`객체가 담긴다.  

`fetch()` 함수는 첫번째 인자로 URL, 두번째 인자로 옵션 객체를 받고, Promise 타입의 객체를 반환한다. 

옵션 객체에는 HTTP 방식(method), HTTP 요청 헤더(headers), HTTP 요청 전문(body) 등을 읽어올 수 있다. 

### GET 호출
원격 API에 있는 데이터를 가져 올 때 쓰이는 GET 방식의 HTTP 통신

`fetch()`함수는 디폴트로 GET 방식으로 작동하고 이는 요청 전문을 받지 않기 때문에 옵션 인자가 필요 없다. 
```js
fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) =>
  console.log(response),
);
```
응답 객체로 응답 상태가 `200 OK`인 것을 알 수 있다. 
```js
Response {status: 200, ok: true, redirected: false, type: "cors", url: "https://jsonplaceholder.typicode.com/posts/1", …}
```
대부분 REST API들은 JSON형태의 데이터를 응답하기 때문에 응답(response) 객체는 `json()` 메서드를 제공한다. 
```js
fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json())
  .then((data) => console.log(data));
```
특정 API에 저장된 데이터를 보여주는 웹페이지나 애플리케이션에서는 GET을 쓰면 된다. 

### POST 호출
원격 API에서 관리하고 있는 데이터를 생성해야 한다면 요청 전문을 포함할 수 있는 POST 방식이 필요하다. 

- `method`: 메서드를 적는다. 안 적으면 GET이다.
- `headers`: "보내는 데이터가 JSON이에요"라고 알려준다.
- `body`: 객체를 `JSON.stringify`로 직접 문자열로 바꿔서 넣어야 한다.
```js
fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
}).then((response) => console.log(response));
```
응답 객체를 통해 응답 코드가 `201 Created`인 것을 알 수 있다. 
```js
Response {type: "cors", url: "https://jsonplaceholder.typicode.com/posts", redirected: false, status: 201, ok: true, …}
```

### PUT, DELETE 호출
원격 API에서 관리하는 데이터의 수정과 삭제를 위해 PUT과 DELETE를 쓴다.  

PUT방식은 `method`옵션만 `PUT`이고 기본적으로 POST 방식과 매우 흡사하다. 
```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    title: "Test",
    body: "I am testing!",
    userId: 1,
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
  ```
  ```js
  {title: "Test", body: "I am testing!", userId: 1, id: 1}
  ```
  DELETE 방식에서는 보낼 데이터가 없어서, `headers`와 `body` 옵션이 필요가 없다. 
```js
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data));
  ```
  `{}`

## Axios
브라우저와 Node.js에서 쓸 수 있는 Promise 기반 HTTP 클라이언트 라이브러리이다.  
외부 라이브러리라서 설치가 필요하다. 

쓰는 이유:
- 간결한 문법: fetch보다 짧고 직관적이다. 
- 자동 JSON 변환: 요청/응답을 JSON으로 자동 처리함
- 요청 취소: API 요청 취소가 가능하다. 
- 인터셉터: 요청/응답 완료 전에 가로채서 공통 로직을 삽입할 수 있다. 
- 오류 처리: status 코드 기반 오류 구분이 쉽다. 
- 브라우저 호환성: 다양한 브라우저들을 지원한다. 

설치
```bash
pnpm add axios
npm install axios
```

### GET
```js
import axios from "axios";

const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
  params: { postId: 5 },   // → ?postId=5 가 자동으로 붙음
});
console.log(response.data);
```

### POST
```js
const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
  title: "foo",
  body: "bar",
  userId: 1,
});
```
객체를 그냥 넣으면 JSON으로 자동 변환해서 보낸다.  
`JSON.stringify`도, `Content-Type` 헤더도 직접 안 써도 된다. 

### PUT
```js
const response = await axios.put("https://jsonplaceholder.typicode.com/posts/1",{
    title: "foo",
    body: "bar",
    userId: 1,
});
```

### DELETE
```js
const response = await axios.delete(
      "https://jsonplaceholder.typicode.com/posts/1"
);
```

### 메서드별 함수
|함수|메서드|
|---|---|
|`axios.get(url, config)`|조회|
|`axios.post(url, data, config)`|등록|
|`axios.put(url, data, config)`|전체 수정|
|`axios.patch(url, data, config)`|부분 수정|
|`axios.delete(url, config)`|삭제|

### 응답 객체
```js
const { data, status, headers } = await axios.get("/api/users/1");
```
- `data`: 서버가 보낸 본문(이미 JSON으로 바뀌어 있음)
- `status`: 상태 코드(예: 200)
- `statusText`: 상태 메시지(예: "OK")
- `headers`: 응답 헤더
- `config`: 요청할 때 쓴 설정

fetch와 달리 `.json()`을 따로 부를 필요가 없다.  `response.data`에 바로 들어 있다. 

### 예외 처리
axios는 2XX가 아니면 자동으로 실패로 처리한다.  
그래서 `response.ok`를 확인할 필요가 없다. 
```js
try {
  const response = await axios.get("/user/12345");
} catch (error) {
  if (error.response) {
    // 서버가 응답은 했는데 2xx가 아님 (404, 500 등)
    console.log(error.response.status, error.response.data);
  } else if (error.request) {
    // 요청은 보냈는데 응답이 안 옴 (네트워크 문제 등)
  } else {
    // 요청을 만드는 중에 문제가 생김
    console.log(error.message);
  }
}
```
### 인스턴스: 공통 설정 묶기
```js
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

const response = await api.get("/users/1");   // → https://api.example.com/users/1
```
서버 주소, 시간 제한, 헤더를 한번만 정해두고 계속 쓸 수 있다. `api.js`같은 파일에 만들어 두고 쓴다. 

### 인터셉터: 요청과 응답 가로채기
```js
// 요청을 보내기 직전에 실행
api.interceptors.request.use((config) => {
  // 예: 로그인 토큰을 헤더에 넣기
  return config;
});

// 응답을 받은 직후에 실행
api.interceptors.response.use(
  (response) => response,                 // 2xx면 여기
  (error) => Promise.reject(error)        // 그 외면 여기
);
```
모든 요청에 토큰 넣기, 모든 에러를 한 곳에서 처리하기처럼 공통 작업을 한번에 할 수 있다. 

### 자주 사용하는 기능
|기능|예시 코드|설명
|---|---|---|
|기본 인스턴스 생성|`axios.create()`|공통 설정을 모듈로 분리 가능|
|요청 헤더 추가|`headers: {}`|토큰 인증 시 사용|
|인터셉터|`axios.interceptors`|요청/응답 가로채기 (ex.토큰 붙이기)|
|응답 타임 명시|`axios.get<Type>()`|TypeScript에서 응답 타입 지정|
|타임아웃 설정|`timeout: 5000`|요청 시간 제한 설정|
|요청 취소|`CancelToken`|중복 요청 중단 등|

## fetch vs axios
||fetch|axios|
|---|---|---|
|종류|브라우저 내장 함수|외부 라이브러리|
|설치|필요 없음|`pnpm add axios`|
|응답 본문|`await response.json()`을 한 번 더|`response.da`에 바로|
|요청 본문|`JSON.stringify` + `Content-Type` 직접|객체를 넣으면 자동 변환|
|404, 500|성공으로 처리 -> `response.ok` 직접 확인|자동으로 실패 -> `catch`로 감|
|쿼리 파라미터|주소에 직접 붙임|`params` 옵션|
|공통 설정|직접 함수를 만들어야 함|`axios.create`|
|요청/응답 가로채기|없음|인터셉터|
|시간 제한|`AbortController`로 직접|`timeout` 옵션|

```js
// fetch
const res = await fetch("/items", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ itemName: "원피스", price: 500 }),
});
if (!res.ok) throw new Error(res.status);
const data = await res.json();

// axios
const { data } = await axios.post("/items", { itemName: "원피스", price: 500 });
```