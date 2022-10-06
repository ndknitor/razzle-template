import express from 'express';
import { Helmet } from 'react-helmet';
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

export const renderApp = (req: express.Request) => {
    // const markup = renderToString(
    //     <StaticRouter location={req.url}>
    //       <App />
    //     </StaticRouter>
    // );
    const markup = '';
    const helmet = Helmet.renderStatic();
    const html =
      // prettier-ignore
      `<!doctype html>
      <html lang="">
      <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
          ${helmet.link.toString()}
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
    return html;
  };