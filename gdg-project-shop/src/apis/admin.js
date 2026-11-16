// 상품 등록 API
export async function registerProduct(product) {
    const response = await fetch("/admin/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        throw new Error(`상품 등록에 실패했습니다. (${response.status})`);
    }

    return response.json();
}

// 재고 추가 API
export async function addProductStock(stock) {
    const response = await fetch("/admin/products/stock", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(stock),
    });

    if (!response.ok) {
        throw new Error(`재고 추가에 실패했습니다. (${response.status})`);
    }

    return response.json();
}

// 상품 삭제 API
export async function deleteProduct(itemName) {
    const response = await fetch("/admin/products", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemName }),
    });

    if (!response.ok) {
        throw new Error(`상품 삭제에 실패했습니다. (${response.status})`);
    }

    return response.json();
}