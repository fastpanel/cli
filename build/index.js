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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const core_1 = require("@fastpanel/core");
const child_process_1 = require("child_process");
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
    /* Startup success. */
    .then(async () => {
    /* Check command and target app. */
    if (process.argv.length > 2 &&
        handler.config.get('package', false) &&
        fs_1.default.existsSync(path_1.default.resolve(process.cwd(), 'build/cli.js')) &&
        !handler.cli.getCommands().filter((c) => (c.name() === process.argv[2] || c.getAlias() === process.argv[2])).length ||
        !handler.cli.getCommands().length) {
        /* Spawn target app. */
        new Promise(async (resolve, reject) => {
            let child = child_process_1.spawn('node', ['build/cli.js', ...process.argv.slice(2)], {
                env: {},
                cwd: process.cwd(),
                stdio: "inherit"
            });
            child.on('close', (code, signal) => {
                resolve();
            });
        }).then(() => {
            /* Close all connections. */
            process.exit(0);
        });
    }
    else {
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
