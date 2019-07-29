"use strict";
/**
 * Application.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const core_1 = require("@fastpanel/core");
/**
 * Class Command
 *
 * @version 1.0.0
 */
class Command extends core_1.Cli.CommandDefines {
    /**
     * Initialize a commands provider.
     */
    initialize() {
        /* Check application settings. */
        if (!this.config.get('package', false)) {
            this.cli
                .command('app', 'Create application by template.')
                .action((args, options, logger) => {
                return new Promise(async (resolve, reject) => {
                    /* Init npm project. */
                    try {
                        await new Promise((resolve, reject) => {
                            let child = child_process_1.spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['init', '--yes'], {
                                env: {
                                    APPDATA: process.env.APPDATA
                                },
                                cwd: process.cwd(),
                                stdio: "ignore"
                            });
                            child.on('close', (code, signal) => {
                                resolve();
                            });
                            child.on('error', (error) => {
                                reject(error);
                            });
                        });
                    }
                    catch (error) {
                        reject(error);
                    }
                    /* Load npm package. */
                    try {
                        this.config.set('package', require(path_1.default.resolve(process.cwd(), 'package.json')));
                    }
                    catch (error) {
                        reject(error);
                    }
                    /* Show welcome message. */
                    logger.info(await ejs_1.default.renderFile(path_1.default.resolve(__dirname, '../../../templates', 'app/welcome.ejs'), {
                        package: this.config.get('package', {})
                    }, {
                        root: path_1.default.resolve(__dirname, '../../../templates')
                    }));
                    /* Show prompts to user. */
                    let answers = await this.prompt([
                        {
                            type: 'list',
                            name: 'type',
                            message: 'Select the desired application type:',
                            choices: [
                                {
                                    name: 'Simple application'
                                },
                                {
                                    name: 'Command line tools'
                                }
                            ]
                        }
                    ]);
                    /* Create application by type. */
                    switch (answers.type) {
                        case 'Command line tools':
                            try {
                                /* Run command. */
                                await this.cli.exec(['app:cli'], options);
                            }
                            catch (error) {
                                /* Stop command by error. */
                                reject(error);
                            }
                            break;
                        case 'Simple application':
                        default:
                            try {
                                /* Run command. */
                                await this.cli.exec(['app:simple'], options);
                            }
                            catch (error) {
                                /* Stop command by error. */
                                reject(error);
                            }
                    }
                    /* Command complete. */
                    resolve();
                });
            });
            this.cli
                .command('app:cli', 'Create command line tools.')
                .visible(false)
                .action((args, options, logger) => {
                return new Promise(async (resolve, reject) => {
                    /*  */
                    logger.info('app:cli');
                    /* Command complete. */
                    resolve();
                });
            });
            this.cli
                .command('app:simple', 'Create simple application.')
                .visible(false)
                .action((args, options, logger) => {
                return new Promise(async (resolve, reject) => {
                    /*  */
                    logger.info('app:simple');
                    /* Command complete. */
                    resolve();
                });
            });
        }
    }
    /**
     *
     */
    getNameByCwd() {
        let a = process.cwd().split(path_1.default.sep);
        return a[a.length - 1];
    }
}
module.exports = Command;
/* End of file Application.ts */ 
