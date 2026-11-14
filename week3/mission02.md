# fetch함수
- 첫번째 인자 : URL, 두번째 인자 : 옵션 객체
- GET 호출 : 원격 API에 있는 데이터를 가져올 때 쓰이는 방식
- POST 호출 : 원격 API에서 관리하고 있는 데이터를 생성
    - method 옵션 : POST
    - headers옵션 : JSON 포맷 사용한다고 알려줘야함
    - body 옵션 : 요청 전문
- PUT 호출 : 원격 API에서 관리하는 데이터의 수정
    - method 옵션 : PUT
    - POST방식과 매우 흡사
- DELETE 호출 : 원격 API에서 관리하는 데이터의 삭제
    - headers, body 옵션 필요 x
----------------------------------
# Axios
- Promise API를 활용하는 HTTP
- 비동기 통신 자바스크립트 라이브러리
- GET, POST, DELETE, PUT
## Axios의 장점
- 간결한 문법
- 자동 JSON 변환
- API 요청 취소 가능
- 요청/응답 완료 전에 가로채서 공통 로직을 삽입가능
- 오류 구분 쉬움
- 다양한 브라우저 지원