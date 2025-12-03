
# 디자인을 -> 코드로

This is a code bundle for 디자인을 -> 코드로. The original project is available at https://www.figma.com/design/D3demA8RDXCaYhyJB6R6SE/%EB%94%94%EC%9E%90%EC%9D%B8%EC%9D%84--%3E-%EC%BD%94%EB%93%9C%EB%A1%9C.

## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## 배포하기

### 방법 1: Vercel (추천 - 가장 간단)

1. [Vercel](https://vercel.com)에 가입하고 로그인
2. "Add New Project" 클릭
3. GitHub 저장소를 연결하거나 프로젝트를 업로드
4. 빌드 설정:
   - Build Command: `npm run build`
   - Output Directory: `build`
5. "Deploy" 클릭

또는 Vercel CLI 사용:
```bash
npm i -g vercel
vercel
```

### 방법 2: Netlify

1. [Netlify](https://www.netlify.com)에 가입하고 로그인
2. "Add new site" > "Import an existing project"
3. GitHub 저장소를 연결
4. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `build`
5. "Deploy site" 클릭

또는 Netlify CLI 사용:
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=build
```

### 방법 3: GitHub Pages

1. GitHub 저장소에 코드 푸시
2. Settings > Pages로 이동
3. Source를 "GitHub Actions"로 설정
4. `.github/workflows/deploy.yml` 파일이 자동으로 생성됨 (이미 포함됨)

### 로컬 빌드

```bash
npm run build
```

빌드된 파일은 `build` 폴더에 생성됩니다.
  