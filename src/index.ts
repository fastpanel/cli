/**
 * index.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import path from 'path';
import { Cli } from '@fastpanel/core';

/* Definition of basic settings. ------------------------------------------- */
/* ------------------------------------------------------------------------- */

/* Get application info. */
const  { version } = require('../package.json');

/* Start app on production mode. */
process.env.NODE_ENV = 'production';

/* Definition of basic parameters. */
process.env.APP_NAME = 'fastPanel Manager';
process.env.APP_CLI_BIN = 'fpm';
process.env.APP_VERSION = version;

/* Identify the main paths. */
process.env.LOGGER_PATH = path.resolve(process.env.USERPROFILE, '.fpm/Logs');
process.env.CONFIG_PATH = path.resolve(process.env.USERPROFILE, '.fpm/Config');

/* Init and startup app. --------------------------------------------------- */
/* ------------------------------------------------------------------------- */

/* Create DI container instant. */
const container = new Cli.Global.FactoryDefault();

/* Create handler instant. */
const handler = new Cli.Global.Handler(container);

/* Register app as extension. */
handler.extensions.add(path.resolve(__dirname, 'App'));

/* Ready to start. */
handler
/* Init handler process. */
.init()
/* Startup error. */
.catch(function (error) {
  /* Startup error message. */
  console.error('Cli handler startup error:', error);
});

/* End of file index.ts */