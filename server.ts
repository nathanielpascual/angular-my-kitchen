import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

enableProdMode();

const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(),'dist');

const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');


app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
   document: template,
    url: options.req.url,
   extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});
