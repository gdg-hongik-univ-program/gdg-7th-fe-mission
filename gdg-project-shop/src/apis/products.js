const BASE_URL = "";

export async function getProducts(){
    const response = await fetch(`${BASE_URL}/data/products.json`);  // 상품 요청: 옵션을 안 쓰면 GET이다. 

    if(!response.ok){
        throw new Error(`상품 조회 실패: ${response.status}`);  // 확인
    }

    return response.json();    // 반환
}