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
const glob_1 = __importDefault(require("glob"));
const core_1 = require("@fastpanel/core");
/**
 * Class Extension
 *
 * Initialization of the extension.
 *
 * @version 1.0.0
 */
class Extension extends core_1.Extensions.ExtensionDefines {
    /**
     * Registers a service provider.
     */
    async register() {
        /* Registered watchdog event. */
        this.events.on('watchdog', (app) => { });
        /* Registered cli commands. */
        this.events.once('cli:getCommands', (cli) => {
            glob_1.default.sync(path_1.default.resolve(__dirname, 'Commands/**/*.js'), {
                nosort: true,
                absolute: true
            }).forEach((file) => {
                try {
                    let Command = require(path_1.default.resolve(file));
                    let instant = new Command(this.di);
                    if (instant instanceof core_1.Cli.CommandDefines) {
                        instant.initialize();
                    }
                    else {
                        instant = null;
                    }
                }
                catch (error) {
                    this.logger.error(error.toString());
                }
            });
        });
    }
    /**
     * Startup a service provider.
     */
    async startup() {
        /* Load application settings. ------------------------------------------ */
        /* --------------------------------------------------------------------- */
        let targetPkg = path_1.default.resolve(process.cwd(), 'package.json');
        if (fs_1.default.existsSync(targetPkg)) {
            this.config.set('package', require(targetPkg));
        }
        /* --------------------------------------------------------------------- */
    }
}
exports.Extension = Extension;
/* End of file index.ts */ 
