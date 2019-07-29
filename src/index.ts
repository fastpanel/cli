/**
 * index.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import fs from 'fs';
import path from 'path';
import { Cli } from '@fastpanel/core';
import { spawn } from 'child_process';

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
/* Startup success. */
.then(async () => {
  /* Check command and target app. */
  if (
    /* --------------------------------------------------------------------- */
    (process.argv.length > 2 &&
    handler.config.get('package', false) &&
    fs.existsSync(path.resolve(process.cwd(), 'build/cli.js')) &&
    !handler.cli.getCommands().filter((c: any) => (c.name() === process.argv[2] || c.getAlias() === process.argv[2])).length) ||
    /* --------------------------------------------------------------------- */
    (process.argv.length > 2 &&
    handler.config.get('package', false) &&
    fs.existsSync(path.resolve(process.cwd(), 'build/cli.js')) &&
    !handler.cli.getCommands().length)
  ) {
    /* Spawn target app. */
    try {
      await new Promise(async (resolve, reject) => {
        let child = spawn('node', ['build/cli.js', ...process.argv.slice(2)], {
          env: {},
          cwd: process.cwd(),
          stdio: "inherit"
        });
        
        child.on('close', (code, signal) => {
          resolve();
        });

        child.on('error', (error) => {
          reject(error);
        });
      });
    } catch (error) {
      handler.logger.error(error.toString());
    }

    /* Close all connections. */
    process.exit(0);
  } else {
    /* Startup cli handler. */
    await handler.cli.parse(process.argv);

    /* Close all connections. */
    process.exit(0);
  }
})
/* Startup error. */
.catch((error) => {
  /* Startup error message. */
  console.error('Cli handler startup error:', error);
});

/* End of file index.ts */