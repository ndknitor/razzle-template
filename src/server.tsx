import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import App from './App';
import Head from './head';

let assets: any;
const escapeHtml = (unsafe: string) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const syncLoadAssets = () => {
  assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);
};
syncLoadAssets();

const cssLinksFromAssets = (assets, entrypoint) => {
  return assets[entrypoint] ? assets[entrypoint].css ?
    assets[entrypoint].css.map(asset =>
      `<link rel="stylesheet" href="${asset}">`
    ).join('') : '' : '';
};

const jsScriptTagsFromAssets = (assets, entrypoint, extra = '') => {
  return assets[entrypoint] ? assets[entrypoint].js ?
    assets[entrypoint].js.map(asset =>
      `<script src="${asset}"${extra}></script>`
    ).join('') : '' : '';
};
const titleTag = (title: string) => {
  return `<title>${escapeHtml(title)}</title>`;
}
const metaTags = (map: Map<string, string>) => {
  let result = '';
  for (const [key, value] of Object.entries(map)) {
    result += `<meta name='${escapeHtml(key)}' content='${escapeHtml(value)}'/>`;
  }
  return result;
}
export const renderApp = (req: express.Request, res: express.Response) => {

  const markup = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );
  const html =
    // prettier-ignore
    `<!doctype html>
    <html lang="">
    <head>
        {{title}}
        {{metas}}
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinksFromAssets(assets, 'client')}
    </head>
    <body>
        <div id="root">${markup}</div>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </body>
  </html>`;  
  return html.replace('{{title}}', titleTag(Head.title)).replace('{{metas}}', metaTags(Head.metas));
};

const server = express()
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR!))
  .get('/*', (req: express.Request, res: express.Response) => {
    const html = renderApp(req, res);
    res.send(html);
  });

export default server;
