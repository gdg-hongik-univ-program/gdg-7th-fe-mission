## HTTP 요청/응답

### HTTP란? 
: HTML 문서 등 리소스들을 가져올 수 있도록 해주는 프로토콜 <br>

클라이언트-서버 프로토콜이란 수신자 측에 의해 요청이 초기화되는 프로토콜을 의미한다. 하나의 완전한 문서는 불러온(fetched) 하위 문서들로 재구성된다. 
- GET index.html
- GET styles.css
- GET header.png
- GET video.mp4
- GET advert.jpg
- ...

클라이언트와 서버는 데이터 스트림과 반대로 개별적인 메시지 교환으로 통신하는데, 클라이언트가 보내는 메시지는 요청(request)이라 하며 서버가 보내는 메시지는 응답(response)이라 한다. <br>

HTTP는 확장 가능한 프로토콜이며, 지속적으로 발전해 왔다. 그 확장성을 기반으로 HTML 문서뿐만 아닌 이미지, 영상 등 다양한 파일을 다룰 수 있다. <br>

이는 클라이언트-서버 프로토콜로, 하나의 개체 혹은 사용자(또는 그를 대신하는 프록시)가 요청을 보낸다. 사용자는 주로 웹 브라우저이나, 무엇이든 될 수 있다. (크롤링 봇 등) <br>

각각의 요청이 서버에 보내지면, 서버가 이를 다루며 응답을 제공한다. 클라이언트와 서버 사이에 있는 수많은 개체들을 프록시라 하는데, 이들은 각각 서로 다른 작업을 한다. 실제로는, router 등 브라우저와 서버 사이 요청을 다루는 컴퓨터들이 더 있다. <br>

## 동기/비동기 처리
- 동기: 직렬적
- 비동기: 병렬적 `ex) Web API, Ajax, setTimeout 등`

### 동기(Synchronous)

- 직렬적으로 태스크를 수행
- 요청을 보낸 후 응답을 받아야 다음 동작이 이루어진다. 
- 한 태스크를 수행하는 동안 나머지 태스크는 대기한다. 

### 비동기(Asynchronous)

- 병렬적으로 태스크를 수행
- 요청을 보낸 후 응답에 상관 없이 다음 동작이 이루어진다. 
- 자원을 효율적으로 사용할 수 있다. 
- 비동기 요청 시 응답 후 처리할 callback 함수를 함께 넘겨 준다. 태스크가 완료되면 콜백 함수가 실행된다. 

### Promise란?
콜백 함수를 계속 사용하면 콜백 헬로 인해 가독성이 나쁘고 에러의 처리가 곤란할 수 있다. 이러한 이유로 프로미스(Promise)를 도입했다. 

```js
const promise = new Promise((resolve, reject) => {

  if (/* 비동기 작업 수행 성공 */) {
    resolve('result');
  }
  else { 
    reject('failure reason');
  }
});
```

Promise는 비동기 처리의 상태 정보를 갖는다. 
- pending: 아직 수행되지 않음
- fulfilled: 비동기 처리가 성공함
- rejected: 비동기 처리가 실패함
- settled: 비동기 처리가 수행됨

1. 비동기 함수 내에서 Promise 객체를 그 내부에서 비동기 처리를 구현한다. 
2. 성공하면 `resolve()` 메소드를 호출한다. 인자로는 비동기 처리 결과를 전달하고, 이는 `Promise.then()` 등 후속 처리 메소드로 전달된다. 
3. 실패하면 `reject()` 메소드를 호출한다. 인자로는 에러 메시지를 전달하고, 이는 `Promise.catch()` 등 후속 처리 메소드로 전달된다. 

- `Promise.then()`
    - 두 개의 콜백 함수를 인자로 전달받는다. 
        1. 성공(fulfilled, resolve()) 시 호출
        2. 실패(rejected, reject()) 시 호출
    - Promise를 반환한다. 
- `Promise.catch()`
    - 예외(error, .then()에서의 error) 시 호출
    - Promise를 반환한다. 

then이나 catch 메소드를 chainning하면 여러 프로미스를 연결해서 사용할 수 있다. 

### Async/Await
: 자바스크립트의 비동기 처리 패턴 <br>
콜백 함수와 프로미스의 단점을 보완한다. 

```js
// 기본 문법
async function func() {
    await method();
}
```

#### async 개념
- function 앞에 async를 붙일 경우 해당 함수는 항상 Promise를 반환한다. 
- Promise가 아닌 값을 반환할 경우 이행 상태의 Promise로 값을 감싸서 반환되도록 한다. 
- `return 1;`과 `return Promise.resolve(1);`는 같은 값을 반환한다. 

#### await 개념
- await는 async 안에서만 동작한다. 
- Promise가 처리될 때까지 기다리는 역할을 하며, 결과는 그 이후 반환된다. 

```js
async function func() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("완료!");
        }, 1000);
    });
    let result = await promise; // *
    alert(result);
}

func();
```

- 함수를 호출하면 실행되는 도중에 `*`으로 표시된 줄에서 실행이 잠시 중단되고, Promise가 처리되면 실행이 재개된다. 
- 이때 Promise의 result 값이 변수 result에 할당되며, 위 예시에서 "완료!"가 출력된다. 
- 에러는 `try...catch`를 이용해 잡는다. 

```js
try {
    let response = await fetch("https://???");
} catch(err) {
    alert(err); // TypeError: failed to fetch
}

func();
```