export async function products() {
    const response = await fetch("/data/products.json");
    return response.json();
}