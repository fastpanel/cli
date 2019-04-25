/**
 * Task.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import { EOL } from 'os';
import Winston from 'winston';
import { Cli } from '@fastpanel/core';

/**
 * Class Command
 * 
 * @version 1.0.0
 */
class Command extends Cli.CommandDefines {
  
  /**
   * Initialize a commands provider.
   */
  public initialize () {
    this.cli
    .command('queue task', 'Create task by template.')
    .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
      return new Promise(async (resolve, reject) => {
        /* Command complete. */
        resolve();
      });
    });
  }

}

/*  */
module.exports = Command;

/* End of file Task.ts */