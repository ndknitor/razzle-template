import express from 'express';

let app = require('./_server/server').default;

if (module.hot) {
  module.hot.accept('./_server/server', () => {
    console.log('🔁  HMR Reloading `./_server/server`...');
    try {
      app = require('./_server/server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, () => {
    console.log(`> App started http://localhost:${port}`)
  });
