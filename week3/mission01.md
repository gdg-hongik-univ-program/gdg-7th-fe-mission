HTTP : HTML 문서와 같은 리소스들을 가져올 수 있도록 해주는 프로토콜

웹에서 이루어지는 모든 데이터 교환의 기초, 클라이언트-서버 프로토콜이기도 함.

클라이언트와 서버들은 개별적인 메시지 교환에 의해 통신
요청 : 보통 브라우저인 클라이언트에 의해 전송되는 메시지
응답 : 그에 대해 서버에서 응답으로 전송되는 메시지

HTTP의 특징
1) 간단함 : 사람이 읽을 수 있으며 간단하게 고안
2) 확장 가능  상태를 저장하지 않음

HTTP가 제어하는 것
1) 캐시
2) origin제약사항 완화
3) 인증
4) 프록시와 터널링
5) 세션

요청 메시지 예시
GET/HTTP/1.1
Host : developer.mozilla.org
Accept-Language : fr

1) 보통 클라이언트가 수행하고자 하는 동작을 정의한 GET, POST 같은 동사나 OPTIONS나 HEAD와 같은 명사를 먼저 정의

2) 가져오려는 리소스의 경로 (developer.mozilla.org)

3) 프로토콜 버전(1.1)

4) 선택적 헤더들

5) POST와 같은 몇 가지 메서드를 위한, 전송된 리소스를 포함하는 응답의 본문과 유사한 본문

응답 메시지 예시
HTTP/1.1 200 O
date : Tue, 18 Jun 2024 10:03:55 GMT
cache-control : public, max-age=3600
content-type : text/html

1) HTTP 프로토콜의 버전
2) 요청의 성공 여부와, 그 이유를 나타내는 상태 코드
3) 아무런 영향력이 없는, 상태 코드의 짧은 설명을 나타내는 상태 메시지
4) 요청 헤더와 비슷한, HTTP 헤더들
5) 선택 사항으로 가져온 리소스가 포함되는 본문

API : 응용 프로그래밍 인터페이스
서로 다른 소프트웨어들이 서로 데이터를 주고받고 기능을 공유할 수 있도록 함.

HTTP 기반으로 가장 일반적으로 사용된 API는 user agent와 서버간에 데이터를 교환하는데 사용될 수 있는 XMLHttpRequest API, 최신 Fetch API는 보다 강력하고 유연한 기능을 제공

동기 vs 비동기

동기 : 직렬적 task 수행
비동기 : 병렬적 수행

예시로, Task1이 데이터에서 서버를 가져올 경우, 
동기적 수행에서는 아예 그 시간 동안 blocking이 되지만,
비동기적 수행에서는 그 시간 동안 task2가 수행. 이때 비동기적 수행에서는 콜백 함수를 함께 알려줌.

Promise
자바스크립트는 비동기 처리를 위한 하나의 패턴으로 콜백 함수를 사용, 이를 처리하기 위한 패턴

전통적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현

Promise는 비동기 처리가 성공(fulfilled)하였는지 또는 실패(rejected)하였는지 등의 상태(state) 정보를 보유

pending: 비동기 처리가 아직 수행되지 않은 상태
fulfilled: 비동기 처리가 수행된 상태 (성공)
rejected: 비동기 처리가 수행된 상태 (실패)
settled: 비동기 처리가 수행된 상태 (성공 또는 실패)

async/await
async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법
복잡했던 Promise를 조금 더 편하게 사용

async 개념
- async 키워드는 function 앞에 사용
- function 앞에 async를 붙이면 해당 함수는 항상 프라미스를 반환
- 프라미스가 아닌 값을 반환하더라도 이행 상태의 프라미스(resolved promise)로 값을 감싸 이행된 프라미스가 반환
- 아래 예시의 함수를 호출하면 result가 1인 이행 프라미스가 반환

await 개념
- await는 async 함수 안에서만 동작
- await는 ‘기다리다'라는 뜻을 가진 영단어 인데, 프라미스가 처리될 때 까지 기다리는 역할
- 그리고 결과는 그 이후 반환

예시

async function f() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("완료!"), 1000)
  });

  let result = await promise; // 프라미스가 이행될 때까지 기다림 (*)

  alert(result); // "완료!"
}

f();