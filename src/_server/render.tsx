import express from 'express';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import React from 'react';
import App from '../App';
import { createServerContext } from 'use-sse';
import { RenderConfig } from './renderConfig';

const renderConfig : RenderConfig =
{
  ssr: [],
  ssg: {
    storeMode: 'RAM',
    path: []
  },
  isr: {
    nisr: {
      path: [],
      expries: 0
    },
    disr: {
      listen: 0,
      count: 0,
      expries: 0,
      storeMode: 'RAM',
      capacity: 0,
      trackingCapacity: 0
    }
  }
};
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

export const renderApp = async (req: express.Request) => {
  const { ServerDataContext, resolveData } = createServerContext();
  renderToString(
    <StaticRouter location={req.url}>
      <ServerDataContext>
        <App />
      </ServerDataContext>
    </StaticRouter>
  );
  
  const data = await resolveData();
  const markup = renderToString(
    <StaticRouter location={req.url}>
      <ServerDataContext>
        <App />
      </ServerDataContext>
    </StaticRouter>
  );
  const helmet = Helmet.renderStatic();
  const html =
    `<!doctype html>
      <html>
      <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          ${cssLinksFromAssets(assets, 'client')}
      </head>
      <body>
          <div id="root">${markup}</div>
          <div id="data" hidden>${encodeURI(JSON.stringify(data.toJSON()))}</div>
      </body>
        <script>window._initialDataContext=JSON.parse(decodeURI(document.getElementById('data').innerText))</script>
        ${jsScriptTagsFromAssets(assets, 'client', ' defer crossorigin')}
    </html>`;
  return html;
};
