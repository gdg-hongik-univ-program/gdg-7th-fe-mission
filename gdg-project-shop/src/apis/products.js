import axios from 'axios';

const dev = true;
const BASE_URL = dev ? "/data" : "http://localhost:8080";

export async function products() {
    const response = await axios.get(dev ? `${BASE_URL}/products.json` : `${BASE_URL}/products`);
    return response.data;
}

export async function search(text) {
    if (dev) return console.log("검색", text);
    const response = await axios.get(`${BASE_URL}/products?itemName=${text}`);
    return response.data;
}

export async function admin_products(body) {
    if (dev) return console.log("상품 등록", body);
    const response = await axios.post(`${BASE_URL}/admin/products`, body);
    return response.data;
}

export async function admin_products_stock(body) {
    if (dev) return console.log("재고 추가", body);
    const response = await axios.patch(`${BASE_URL}/admin/products/stock`, body);
    return response.data;
}

export async function admin_delete(body) {
    if (dev) return console.log("상품 삭제", body);
    const response = await axios.delete(`${BASE_URL}/admin/products`, { data: body });
    return response.data;
}

export async function purchase(body) {
    if (dev) return console.log("상품 구매", body);
    const response = await axios.post(`${BASE_URL}/products/purchase`, body);
    return response.data;
}