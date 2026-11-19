# Linting과 Formatting
- Linting : 소스 코드를 실행하지 않고 정적 분석(Static Analysis)하여 잠재적인 버그, 문법 오류, 스타일 위반 등을 찾아내는 과정
- Formatting : 컴퓨터나 디지털 환경에서 텍스트, 문서, 데이터, 또는 저장장치의 형식이나 배치, 구조를 정비하는 과정
------------------
# ESLint와 Prettier의 역할 및 차이점
- ESLint : 자바스크립트 프로젝트 내에서 문법을 검사하고 에러를 표시해주는 정적 코드 분석 도구
- Prettier : 들여쓰기, 줄바꿈, 따옴표 등 코드 형식을 일관되게 정리하는 도구

#### 둘의 차이점
- ESLint는 실수와 위험한 코드를 찾고 Prettier은 띄어쓰기와 줄바꿈을 자동정리한다.
- Prettier은 코드가 어떻게 보이는지만 바꾸고 동작은 바꾸지 않는다.
- ESLint의 검사 대상 : 사용하지 않는 변수, 잘못된 조건문, 의도치 않은 전역 변수, 문법 오류 등 
- Prettier의 관리 대상 : 줄바꿈, 들여쓰기, 따옴표(' vs "), 세미콜론(;) 유무, 최대 줄 길이 등
-------------------
# 두 도구를 함께 사용하는 이유

Prettier과 ESLint를 각각 역할로 나눠 운영하면 사람마다 다른 코딩 습관이 들어와도 팀의 기준이 흔들리지 않고, 코드 리뷰와 유지보수 과정도 훨씬 매끄럽게 이어질 수 있기 때문이다. 또한, 각각 역할이 다르기 때문에 ESLint와 Prettier은 서로의 역할을 대신 할 수 없다.
------------------------
# 수정 전 코드
```
  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("상품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);
```
# 수정 후 코드
```
function loadProducts() {
  return getProducts()
    .then((data) => setProducts(data))
    .catch((err) => {
      console.error(err);
      setError("상품을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.");
    })
    .finally(() => setIsLoading(false));
}
```

# lint 적용 결과
```
> eslint .
(문제 없음)
```