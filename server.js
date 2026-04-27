import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PassThrough } from 'node:stream';
import express from 'express';
import { renderToPipeableStream } from 'react-dom/server';
import { createServer as createViteServer } from 'vite';

const root = path.dirname(fileURLToPath(import.meta.url));
const resolve = (p) => path.resolve(root, p);
const clientDist = resolve('dist');
const serverBundle = resolve('dist/server/entry-server.js');
const forceDev = process.env.VITE_SSR_DEV === 'true';
const hasServerBundle = existsSync(serverBundle);
const isProd = !forceDev && hasServerBundle;
const port = Number(process.env.PORT || 3000);

function renderToString(element) {
  return new Promise((resolveHtml, rejectHtml) => {
    let html = '';
    const stream = new PassThrough();

    stream.on('data', (chunk) => {
      html += chunk.toString();
    });
    stream.on('end', () => resolveHtml(html));
    stream.on('error', rejectHtml);

    const timeout = setTimeout(() => {
      rejectHtml(new Error('SSR render timed out'));
    }, 15000);

    const { pipe, abort } = renderToPipeableStream(element, {
      onAllReady() {
        clearTimeout(timeout);
        pipe(stream);
      },
      onShellError(error) {
        clearTimeout(timeout);
        rejectHtml(error);
      },
      onError(error) {
        console.error('[SSR]', error);
      },
    });

    stream.on('close', () => clearTimeout(timeout));
    stream.on('end', () => clearTimeout(timeout));
    stream.on('error', () => {
      clearTimeout(timeout);
      abort();
    });
  });
}

async function createRenderer(vite) {
  if (isProd) {
    const { createApp } = await import(serverBundle);
    return async (url) => renderToString(createApp(url));
  }

  return async (url) => {
    const { createApp } = await vite.ssrLoadModule('/src/entry-server.tsx');
    return renderToString(createApp(url));
  };
}

async function createTemplateRenderer(vite) {
  if (isProd) {
    const template = await fs.readFile(resolve('dist/index.html'), 'utf-8');
    return async (url, appHtml) => template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  }

  return async (url, appHtml) => {
    const template = await fs.readFile(resolve('index.html'), 'utf-8');
    const transformed = await vite.transformIndexHtml(url, template);
    return transformed.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  };
}

async function start() {
  const app = express();
  let vite;

  if (!isProd) {
    vite = await createViteServer({
      appType: 'custom',
      server: { middlewareMode: true },
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(clientDist, { index: false, maxAge: '1y' }));
  }

  const renderApp = await createRenderer(vite);
  const renderTemplate = await createTemplateRenderer(vite);

  app.get('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;
      const appHtml = await renderApp(url);
      const html = await renderTemplate(url, appHtml);
      res.status(200).setHeader('Content-Type', 'text/html').end(html);
    } catch (error) {
      if (!isProd && vite) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

  app.listen(port, () => {
    console.log(`[ssr] http://localhost:${port} (${isProd ? 'production' : 'development'})`);
  });
}

start().catch((error) => {
  console.error(error);
  process.exit(1);
});
