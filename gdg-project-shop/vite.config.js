import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import mockServer from './mock/mockServer.js' // 가짜 서버 (진짜 서버가 생기면 이 줄 삭제)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), mockServer()], // 진짜 서버가 생기면 mockServer() 삭제
})
