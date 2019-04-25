"use strict";
/**
 * Extension.ts
 *
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.cli
            .command('ext', 'Create extension by template.')
            .action((args, options, logger) => {
            return new Promise(async (resolve, reject) => {
                /* Command complete. */
                resolve();
            });
        });
    }
}
/*  */
module.exports = Command;
/* End of file Extension.ts */ 
