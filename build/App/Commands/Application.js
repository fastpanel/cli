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
const path_1 = __importDefault(require("path"));
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
