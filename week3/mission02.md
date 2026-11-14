## week3_mission02
### fetch
HTTP 요청을 보내는 JS 내장 Web API. 프로미스(Response 객체)를 반환한다.
첫 번째 인수: URL, 두 번째 인수: 메서드, 헤더, 바디를 담은 객체 (생략하면 GET)
응답 바디는 response.json()으로 꺼내야 하고, json()도 프로미스라서 한 번 더 await 한다.
```.js
const res = await fetch('/products');
if (!res.ok) throw new Error(`요청 실패 ${res.status}`);
const data = await res.json();

await fetch('/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ itemName: '커피', price: 4500, quantity: 20, category: '식품' }),
});
```
* fetch는 404, 500 같은 HTTP 에러가 나도 reject하지 않고 ok만 false로 둔다. reject는 네트워크 장애나 CORS 에러일 때뿐이라 res.ok를 직접 확인해야 한다.

### Axios
HTTP 요청을 보내는 외부 라이브러리 (npm install axios). 프로미스를 반환한다.
```.js
import axios from 'axios';

const res = await axios.get('/products');
console.log(res.data); // JSON이 자동으로 객체로 변환됨

await axios.post('/products', { itemName: '커피', price: 4500, quantity: 20, category: '식품' });
```
* 객체를 넘기면 직렬화와 Content-Type 설정을 알아서 해준다.
* 2xx가 아닌 HTTP 에러는 모두 reject하므로 catch 하나로 처리할 수 있다.

### fetch와 Axios 비교
1. 설치: fetch는 내장, Axios는 설치 필요
2. JSON 변환: fetch는 json(), JSON.stringify를 직접 / Axios는 자동
3. 에러 처리: fetch는 res.ok를 직접 확인 / Axios는 HTTP 에러도 reject
4. 응답 데이터: fetch는 json()의 결과 / Axios는 res.data
* 요청이 간단하면 fetch로 충분하고, 공통 설정이 많아지면 Axios가 편하다.