## week3_mission01
### HTTP
HTTP는 클라이언트와 서버가 Request
클라이언트가 요청(Request)을 보내면 서버가 처리해서 응답(Response)을 돌려준다.

#### 메서드
GET: 조회 / POST: 생성 / PUT: 전체 교체 / PATCH: 일부 수정 / DELETE: 삭제
* POST, PUT, PATCH는 바디(페이로드)가 필요하고, 보낼 때 JSON.stringify로 직렬화한다.

#### 상태 코드
2xx: 성공 (200, 201) / 4xx: 클라이언트 에러 (400, 404) / 5xx: 서버 에러 (500)

### 동기·비동기 처리
JS 엔진은 콜 스택이 하나인 싱글 스레드라 한 번에 하나의 태스크만 실행한다.
동기: 앞의 태스크가 끝날 때까지 다음 태스크가 기다린다. 순서는 보장되지만 블로킹이 생긴다.
비동기: 기다리지 않고 다음 태스크를 바로 실행한다. 블로킹은 없지만 순서가 보장되지 않는다.
```.js
setTimeout(foo, 3000);
bar();
// bar → (3초 후) foo
```
* setTimeout, HTTP 요청, 이벤트 핸들러는 비동기로 동작한다. 네트워크 요청은 언제 끝날지 모르니 비동기로 처리해야 페이지가 멈추지 않는다.

#### 이벤트 루프
비동기 콜백은 태스크 큐에서 기다리다가, 콜 스택이 비면 이벤트 루프가 콜 스택으로 옮겨 실행한다.
프로미스의 then/catch/finally 콜백은 마이크로태스크 큐에 들어가고, 태스크 큐보다 먼저 실행된다.

### 콜백 함수
다른 함수에 인수로 전달되어 나중에 호출되는 함수. 비동기 함수는 결과를 return할 수 없어서 후속 처리를 콜백으로 넘겼다.
한계
1. 콜백 헬: 비동기 요청이 이어지면 콜백이 계속 중첩되어 읽기 어렵다.
2. 에러 처리: 콜백은 나중에 따로 실행되므로 바깥의 try/catch로 에러를 잡을 수 없다.

### Promise
비동기 처리의 상태와 결과를 관리하는 객체. 성공하면 resolve, 실패하면 reject를 호출한다.
상태: pending(대기) → fulfilled(성공) 또는 rejected(실패). 한 번 정해지면(settled) 바뀌지 않는다.
then: 성공 시 처리 / catch: 실패 시 처리 / finally: 성공·실패 상관없이 실행
```.js
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log('끝'));
```
* then은 프로미스를 반환하므로 이어서 호출할 수 있다(체이닝). 콜백 헬은 없어지지만 여전히 콜백 형태다.
* Promise.all: 여러 비동기 작업을 병렬로 처리하고, 하나라도 실패하면 즉시 reject된다.

### async/await
프로미스를 동기 코드처럼 읽히게 쓰는 문법.
async 함수는 항상 프로미스를 반환하고, await는 async 함수 안에서만 쓸 수 있다. await는 프로미스가 끝날 때까지 기다렸다가 결과를 반환한다.
에러는 try/catch로 처리한다.
```.js
const load = async () => {
  try {
    const res = await fetch('/data/products.json');
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error(err);
  } finally {
    // 로딩 해제
  }
};
```
