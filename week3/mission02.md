라이브러리

브라우저에서 fetch() 함수를 지원하기 이 전에는 클라이언트 단에서 직접 HTTP 요청하고 응답을 받는 게 상당히 복잡해서 이러한 라이브러리를 사용하는 것이 합리적

요즘에는 굳이 이러한 라이브러리의 도움없이도 브라우저에서 내장된 fetch() 함수를 이용하면 대부분의 경우 충분

fetch 사용법
fetch(url, options)
  .then((response) => console.log("response:", response))
  .catch((error) => console.log("error:", error));

옵션(options) 객체에는 HTTP 방식(method), HTTP 요청 헤더(headers), HTTP 요청 전문(body) 등을 설정

fetch() 함수는 엄밀히 말해, 브라우저의 window 객체에 소속되어 있기 때문에 window.fetch()로 사용되기도 함.

fetch() 함수는 디폴트로 GET 방식으로 작동하고 GET 방식은 요청 전문을 받지 않기 때문에 옵션 인자가 필요가 없음

POST 호출 예시
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

PUT 호출 예시
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

DELETE 호출 예시
fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: "DELETE",
})
  .then((response) => response.json())
  .then((data) => console.log(data));

axios
Promise API를 활용하는 HTTP **비동기 통신 자바스크립트 라이브러리

사용하는 이유?
간결한 문법 : fetch보다 짧고 직관적
자동 JSON 변환 : 요청/응답을 JSON으로 자동 처리
요청 취소 : API 요청 취소가 가능(AbortController 필요없음)
인터셉터 : 요청/응답 완료 전에 가로채서 공통 로직을 삽입
오류 처리 : status 코드 기반 오류 구분이 쉬움

예시 : get
import axios from 'axios';

axios.get('/api/users')
	.then((res) => {
    	console.log(res.data);	// data from server
    })
    .catch((err) => {
    	console.error(err);	// errror
    });

예시 : post
axios.post('/api/login', {
	email: 'test@example.com'
    password: '1234'
})
.then((res) => {
	console.log(res.data);	// login success
})
.catch((err) => {
	console.error(err);	// login fail
})

예시 : delete
axios.delete("/example/list/13").then(function(res) {
	console.log(res);
}).catch(function(ex) {
	throw new Error(ex)
})

예시 : put
import axios from 'axios';

const updateUser = async () =>{
	try {
    	const response = await axios.put('/api/users/123', {
        	name: 'bob',
            email: 'bob@example.com',
        });
        
        console.log('수정된 데이터: ', response.data);
    } catch(error) {
    	console.error('error', error);
    }
};