## Linting vs Formatting

### Linting
: 코드를 정적 분석하여 잠재적인 버그, 오류, 코드 품질 문제, 안티 패턴 등을 식별하고 알려주는 작업 `ex) ESLint`

```js
// eslint.config.js

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // 빌드 결과물 디렉토리는 린트 검사에서 제외합니다
  { ignores: ['dist'] },
  {
    // JavaScript와 TypeScript 권장 규칙을 확장합니다
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    
    // TypeScript 파일(.ts, .tsx)에만 적용합니다
    files: ['**/*.{ts,tsx}'],
    
    languageOptions: {
      // ECMAScript 2020 문법을 사용합니다
      ecmaVersion: 2020,
      // 브라우저 전역 변수를 사용할 수 있도록 설정합니다
      globals: globals.browser,
    },
    
    // React Hooks와 React Refresh 플러그인을 사용합니다
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    
    rules: {
      // React Hooks 권장 규칙을 적용합니다
      ...reactHooks.configs.recommended.rules,
      // 컴포넌트만 export하도록 경고합니다 (상수 export는 허용)
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
```

### Formatting
: 띄어쓰기, 줄 바꿈, 따옴표 등의 시각적 스타일을 일관성 있게 맞추어 가독성을 높이는 작업 `ex) Prettier` 

```js
{
  // 문자열을 작은따옴표(')로 작성합니다
  "singleQuote": true,
  
  // 문장 끝에 세미콜론(;)을 추가합니다
  "semi": true,
  
  // 여러 줄일 때 마지막 요소 뒤에 쉼표를 추가합니다
  "trailingComma": "all",
  
  // 탭 대신 스페이스로 들여쓰기합니다
  "useTabs": false,
  
  // 들여쓰기 너비를 2칸으로 설정합니다
  "tabWidth": 2,
  
  // 한 줄의 최대 길이를 80자로 제한합니다
  "printWidth": 80,
  
  // 객체 리터럴의 중괄호 안쪽에 공백을 추가합니다
  "bracketSpacing": true,
  
  // 화살표 함수의 매개변수를 항상 괄호로 감쌉니다
  "arrowParens": "always",
  
  // JSX 태그의 닫는 꺾쇠 괄호를 다음 줄에 배치합니다
  "bracketSameLine": false,
  
  // 특정 파일 패턴에 대해 다른 설정을 적용합니다
  "overrides": [
    {
      "files": "*.json",
      "options": {
        "printWidth": 100
      }
    }
  ]
}
```

