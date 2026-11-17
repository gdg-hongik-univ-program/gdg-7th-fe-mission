### fetch
브라우저에 기본으로 들어 있는 함수로, 따로 설치하지 않고 서버에 HTTP 요청을 보낼 수 있음

Promise를 반환하기 때문에 await로 응답을 기다려야 함
응답은 res.json()으로 직접 JS 객체로 바꿔서 사용

```js
const res = await fetch("/data/products.json");
if (!res.ok) throw new Error("불러오기 실패");
const data = await res.json();
```

404, 500 같은 에러 응답이 와도 실패로 처리하지 않음
그래서 res.ok로 성공(200번대)인지 직접 확인하고 throw 해줘야 catch에서 잡을 수 있음

데이터를 보낼 때는 method, headers를 직접 쓰고 body를 JSON.stringify로 바꿔야 함

```js
await fetch("/products", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ itemName: "원피스", price: 500 }),
});
```

### axios
HTTP 요청을 보내기 위한 외부 라이브러리로, npm install axios로 설치해서 사용

응답 데이터가 자동으로 JS 객체로 변환되어 res.data에 들어 있음
상태 코드가 200번대가 아니면 자동으로 에러 처리해서 바로 catch로 넘어감

```js
const res = await axios.get("/data/products.json");
const data = res.data;
```

데이터를 보낼 때도 객체를 그대로 넣으면 변환과 헤더 설정을 알아서 해줌

```js
await axios.post("/products", { itemName: "원피스", price: 500 });
```

axios.create로 기본 서버 주소 설정, timeout으로 요청 시간 제한, 인터셉터로 모든 요청에 토큰 붙이기 같은 기능도 있음

### fetch vs axios
- fetch는 내장 함수라 설치 X, axios는 라이브러리라 설치 필요
- fetch는 res.json()으로 직접 변환, axios는 res.data에 자동 변환
- fetch는 404, 500을 직접 확인해야 함, axios는 자동으로 에러 처리
- fetch는 보낼 때 JSON.stringify와 헤더를 직접 써야 함, axios는 객체 그대로 넣으면 됨

간단한 요청은 fetch로 충분하고, 요청이 많거나 공통 설정이 필요한 프로젝트에서는 axios가 편함
이번 과제에서는 fetch로 public/data/products.json을 불러옴