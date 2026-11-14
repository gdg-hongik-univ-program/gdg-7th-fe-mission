export async function getProducts() {
    const res = await fetch('/data/products.json');

    if(!res.ok) throw new Error(`상품 조회 실패 ${res.status}`)
    const products = await res.json();
    return products;
}

export async function postProducts({itemName, price, quantity, category}) {
    const res = await fetch(API ,{
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({itemName, price, quantity, category}),
    });

    if(!res.ok) throw new Error(`상품 등록 실패${res.status}`)
}

export async function patchProducts(id, {quantity}) {
    const res = await fetch(`${API}/${id}` ,{
        method: 'PATCH',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify({quantity}),
    });

    if(!res.ok) throw new Error(`상품 변경 실패${res.status}`)
}

export async function deleteProducts(id) {
    const res = await fetch(`${API}/${id}` ,{
        method: 'DELETE',
    });
    if(!res.ok) throw new Error(`상품 삭제 실패${res.status}`)
}