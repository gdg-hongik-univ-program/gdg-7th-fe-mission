## Fetch와 Axios

### Fetch
Fetch API는 HTTP 요청과 응답 등의 요소를 Javascript에서 접근하고 조작할 수 있도록 한다. 

```js
async function logJSONData() {
  const response = await fetch("http://example.com/movies.json");
  const jsonData = await response.json();
  console.log(jsonData);
}
```
Response 객체는 HTTP 응답 전체를 나타낸다. JSON 본문을 얻기 위해서 `json()` 메소드를 호출해야 한다. `json()`은 응답을 JSON으로 파싱한 결과로 이행하는 또다른 Promise를 반환한다. <br>

#### 요청 옵션
`fetch()` 메소드에는 두 번째 매개변수를 제공할 수도 있다. init 객체를 사용해 여러 가지 설정을 제어할 수 있다. 
- method
- headers
- body
- mode
- credentials
- cache 등

### 요청 중단
아직 완료되지 않은 `fetch()`를 취소하기 위해 `AbortController`를 사용할 수 있다. 

```js
const controller = new AbortController();
const signal = controller.signal;
// ...

try {
    const response = await fetch(url, { signal });
} 
// ...

controller.abort();
```

### Axios
: Promise API를 활용하는 HTTP 비동기 통신 자바스크립트 라이브러리 <br>
프론트엔드에서 백엔드 API 서버와 데이터를 주고받을 때 주로 사용된다. <br>

Axios를 사용하는 이유는?
- fetch보다 직관적이고 간결한 문법
- 자동 JSON 변환
- AbortController API 없이 요청 취소 가능

```js
import axios from "axios";

const response = await axios.get(
  "https://jsonplaceholder.typicode.com/posts/1"
); // get method

console.log(response.data);

const res = await axios.post(
    "/api/login", {
        email: "test@example.com",
        password: "1234"
    }
); // post method

console.log(res.data);
```