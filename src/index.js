import App from './App.js';

(async () => {
  const app = new App();
  try {
    await app.run();
  } catch (error) {
    console.error('🔥 실행 중 예기치 못한 오류 발생:');
    console.error(error);
  }
})();
