"use strict";
/**
 * index.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const core_1 = require("@fastpanel/core");
/* Definition of basic settings. ------------------------------------------- */
/* ------------------------------------------------------------------------- */
/* Get application info. */
const { version } = require('../package.json');
/* Start app on production mode. */
process.env.NODE_ENV = 'production';
/* Definition of basic parameters. */
process.env.APP_NAME = 'fastPanel Manager';
process.env.APP_CLI_BIN = 'fpm';
process.env.APP_VERSION = version;
/* Identify the main paths. */
process.env.LOGGER_PATH = path_1.default.resolve(process.env.USERPROFILE, '.fpm/Logs');
process.env.CONFIG_PATH = path_1.default.resolve(process.env.USERPROFILE, '.fpm/Config');
/* Init and startup app. --------------------------------------------------- */
/* ------------------------------------------------------------------------- */
/* Create DI container instant. */
const container = new core_1.Cli.Global.FactoryDefault();
/* Create handler instant. */
const handler = new core_1.Cli.Global.Handler(container);
/* Register app as extension. */
handler.extensions.add(path_1.default.resolve(__dirname, 'App'));
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
