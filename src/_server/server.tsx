import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { renderApp } from './render';

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', async (req: express.Request, res: express.Response) => {
    const html = await renderApp(req);
    res.send(html);
  });
if (process.env.RAZZLE_API) {
  server.use(createProxyMiddleware('/', { target: process.env.RAZZLE_API }));
}

export default server;
