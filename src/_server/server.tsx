import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { render } from './render';
import revalidate from './revalidate';

const app = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get(process.env.RAZZLE_REVALIDATE_PATH, async (request: express.Request, response: express.Response) => {
    const url = request.query[process.env.RAZZLE_REVALIDATE_QUERY_NAME] as string;
    const revalidated = await revalidate(url);
    response.json({ revalidated: revalidated });
  })
  .get('/*', async (request: express.Request, response: express.Response) => {
    const html = await render(request.url);
    response.send(html);
  });

if (process.env.RAZZLE_API_HOST) {
  app.use(createProxyMiddleware(process.env.RAZZLE_API_CONTEXT_FILTER, { target: process.env.RAZZLE_API_HOST }));
}

export default app;