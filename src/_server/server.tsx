import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { renderApp } from './render';
import revalidate from './revalidate';

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/fpi/revalidate', (request: express.Request, response: express.Response) => {
    revalidate(request);
  })
  .get('/*', async (request: express.Request, response: express.Response) => {
    const html = await renderApp(request);
    response.send(html);
  });
if (process.env.RAZZLE_API) {
  server.use(createProxyMiddleware('/', { target: process.env.RAZZLE_API }));
}

export default server;
