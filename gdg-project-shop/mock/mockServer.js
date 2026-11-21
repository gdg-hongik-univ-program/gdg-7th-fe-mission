
import fs from 'node:fs';

const initialData = JSON.parse(
  fs.readFileSync(new URL('../public/data/products.json', import.meta.url), 'utf-8'),
);

export default function mockServer() {
  let products = initialData.map((p) => ({ ...p }));
  let nextId = Math.max(...products.map((p) => p.id)) + 1;

  const send = (res, status, data) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify(data));
  };

  const readBody = (req) =>
    new Promise((resolve) => {
      let raw = '';
      req.on('data', (chunk) => (raw += chunk));
      req.on('end', () => {
        try {
          resolve(raw ? JSON.parse(raw) : {});
        } catch {
          resolve({});
        }
      });
    });

  return {
    name: 'mock-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');
        const path = url.pathname;
        if (!path.startsWith('/api/v1/')) return next();

        console.log(`[가짜 서버] ${req.method} ${req.url}`);

        // 상품 목록 / 상품 검색
        if (req.method === 'GET' && path === '/api/v1/products') {
          const itemName = url.searchParams.get('itemName');
          if (itemName === null) return send(res, 200, products);
          const found = products.find((p) => p.itemName === itemName);
          if (!found) return send(res, 404, { message: '상품을 찾지 못했어요' });
          return send(res, 200, found);
        }

        const body = await readBody(req);

        // 구매
        if (req.method === 'POST' && path === '/api/v1/products/purchase') {
          if (!Array.isArray(body)) return send(res, 400, { message: '장바구니 형식이 올바르지 않아요' });
          let totalPrice = 0;
          for (const { id, count } of body) {
            const product = products.find((p) => p.id === id);
            const n = Number(count);
            if (!product || !(n >= 1) || n > product.quantity) {
              return send(res, 400, { message: '구매할 수 없는 상품이 있어요' });
            }
          }
          for (const { id, count } of body) {
            const product = products.find((p) => p.id === id);
            product.quantity -= Number(count);
            totalPrice += product.price * Number(count);
          }
          return send(res, 200, { totalPrice });
        }

        // 관리자: 상품 등록
        if (req.method === 'POST' && path === '/api/v1/admin/products') {
          const { itemName, price, quantity, category } = body;
          if (!itemName || !(price >= 1) || !(quantity >= 1)) {
            return send(res, 400, { message: '입력값이 올바르지 않아요' });
          }
          if (products.some((p) => p.itemName === itemName)) {
            return send(res, 409, { message: '이미 있는 상품이에요' });
          }
          const newProduct = { id: nextId++, itemName, price, quantity, category };
          products.push(newProduct);
          return send(res, 201, newProduct);
        }

        // 관리자: 재고 추가
        if (req.method === 'PATCH' && path === '/api/v1/admin/products/stock') {
          const product = products.find((p) => p.itemName === body.itemName);
          if (!product) return send(res, 404, { message: '상품을 찾지 못했어요' });
          product.quantity += Number(body.quantity);
          return send(res, 200, product);
        }

        // 관리자: 상품 삭제
        if (req.method === 'DELETE' && path === '/api/v1/admin/products') {
          const before = products.length;
          products = products.filter((p) => p.itemName !== body.itemName);
          if (products.length === before) {
            return send(res, 404, { message: '상품을 찾지 못했어요' });
          }
          return send(res, 200, products);
        }

        return send(res, 404, { message: '없는 주소예요' });
      });
    },
  };
}
