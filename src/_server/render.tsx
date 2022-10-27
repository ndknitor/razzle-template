import { Request } from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import React from 'react';
import NodeCache from 'node-cache';
import { matchPath } from 'react-router-dom';
import { createServerContext } from 'use-sse';
import App from '../App';
import { RenderConfig } from './RenderConfig';


const renderConfig: RenderConfig =
{
  ssr: [],
  ssg: ["/about"],
  isr: {
    nisr: {
      path: ["/"],
      expries: 1 * 60 * 1000,
      capacity: 100
    },
    disr: {
      path: [],
      listen: 1,
      count: 10,
      expries: 30 * 60 * 1000,
      capacity: 300,
      trackingCapacity: 5000
    }
  }
};
const renderApp = async (url: string, csr: boolean) => {
  let [head, initData, markup] = ["", "{}", ""];
  if (!csr) {
    [head, initData, markup] = await serverRender(url);
  }
  const html =
    `<!doctype html>
<html>
  <head>
    ${head}
    <meta charSet='utf-8' />
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    ${cssLinksFromAssets(assets, 'client')}
  </head>
  <body>
    <div id="root">${markup}</div>
    <div id="data" hidden>${encodeURI(initData)}</div>
  </body>
  <script>window._initialDataContext=JSON.parse(decodeURI(document.getElementById('data').innerText))</script>
  ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
</html>`;
  return html;
};

const serverRender = async (url: string) => {
  const { ServerDataContext, resolveData } = createServerContext();
  const helmetContext: any = {};
  renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ServerDataContext>
          <App />
        </ServerDataContext>
      </StaticRouter>
    </HelmetProvider>
  );
  const data = await resolveData();
  const markup = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <ServerDataContext>
          <App />
        </ServerDataContext>
      </StaticRouter>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;
  const head = `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`;
  const initData = JSON.stringify(data.toJSON());
  return [head, initData, markup];
}

export const render = async (request: Request) => {
  //ssg
  let result = await cache.get<string>(request.url);  
  if (result) {
    return result;
  }
  //ssr
  for (let i = 0; i < renderConfig.ssr.length; i++) {
    const element = renderConfig.ssr[i];
    if (matchPath(element, request.url)) {
      return await renderApp(request.url, false);
    }
  }
  //nisr
  for (let i = 0; i < renderConfig.isr.nisr.path.length; i++) {
    const element = renderConfig.isr.nisr.path[i];
    if (matchPath(element, request.url)) {
      let count = 0;
      cache.keys().map(key => {
        if (matchPath(element, key)) {
          count++;
        }
      });
      if (count < renderConfig.isr.nisr.capacity) {
        result = await renderApp(request.url, false);
        cache.set(request.url, result, renderConfig.isr.nisr.expries);
        return result;
      }
      else {
        return await renderApp(request.url, false);
      }
    }
  }
  //disr
  for (let i = 0; i < renderConfig.isr.disr.path.length; i++) {
    const element = renderConfig.isr.disr.path[i];
    if (matchPath(element, request.url)) {
      
    }
  }
  //csr
  return renderApp(request.url, true);
};
const cache = new NodeCache();
renderConfig.ssg.map(item => {
  if (item.indexOf(":") < 0) {
    cache.set(item, renderApp(item, false), 0);
  }
});

let assets: any;
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