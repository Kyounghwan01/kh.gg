const modules: any = {};

const requireModule = require.context(
  '.', // 현재 폴더 검색
  false, // 하위 폴더 확인 안함
  /^((?!index).)*\.ts$/, // index.js를 제외한 모든 js 파일
);

requireModule.keys().forEach((filename: any) => {
  const moduleDefinition = requireModule(filename);
  const modulePath = filename
    .replace(/^\.\//, '') // 시작부분 "./" 제거
    .replace(/\.\w+$/, ''); // 확장자 제거

  modules[modulePath] = {
    ...moduleDefinition.default,
  };
});

export default modules;
