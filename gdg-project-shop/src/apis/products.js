export async function products() {
    const response = await fetch("/data/produucts.json");
    return response.json();
}