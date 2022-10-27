import { matchPath } from 'react-router-dom';
import { cache, render, renderConfig } from './render';
export default async function revalidate(url: string) {
    if (cache.has(url)) {
        for (let i = 0; i < renderConfig.isr.nisr.path.length; i++) {
            const element = renderConfig.ssr[i];
            if (matchPath(element, url)) {
                cache.set<string>(url, await render(url), renderConfig.isr.nisr.expries);
                return true;
            }
        }
        for (let i = 0; i < renderConfig.ssg.length; i++) {
            const element = renderConfig.ssg[i];
            if (matchPath(element, url)) {
                cache.set<string>(url, await render(url), 0);
                return true;
            }
        }
    }
    return false;
}