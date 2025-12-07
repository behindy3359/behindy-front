import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off",
      
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      
      // React Hook 의존성 - WARN (개발 완료 후 정리)
      "react-hooks/exhaustive-deps": "warn",
      
      // 실제 에러를 방지하는 규칙들은 유지
      "no-console": "off",                              // console.log 허용
      "@typescript-eslint/no-non-null-assertion": "warn", // ! 사용 경고
      "@typescript-eslint/prefer-as-const": "warn",       // as const 권장
      
      // Next.js 이미지 최적화
      "@next/next/no-img-element": "warn",
      
      // Next.js Link 컴포넌트 사용 권장
      "@next/next/no-html-link-for-pages": "warn",
      
      // 세미콜론 사용 (prettier와 충돌 방지)
      "semi": "off",
      "@typescript-eslint/semi": "off",
      
      // 따옴표 스타일
      "quotes": "off",
      "@typescript-eslint/quotes": "off",
    }
  },
  
  {
    // 타입 정의 파일들은 더 관대하게
    files: ["src/types/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    }
  },
  {
    files: ["src/store/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/exhaustive-deps": "off",
    }
  },
  {
    files: ["src/config/**/*.ts", "src/utils/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    }
  },
  {
    files: ["src/components/**/*.tsx", "src/app/**/*.tsx"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
    }
  }
];

export default eslintConfig;