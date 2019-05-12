/**
 * index.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import fs from 'fs';
import path from 'path';
import glob from 'glob';
import Caporal from 'caporal';
import { Application, Cli, Extensions } from '@fastpanel/core';

/**
 * Class Extension
 * 
 * Initialization of the extension.
 * 
 * @version 1.0.0
 */
export class Extension extends Extensions.ExtensionDefines {

  /**
   * Registers a service provider.
   */
  async register (): Promise<any> {
    /* Registered watchdog event. */
    this.events.on('watchdog', (app: Application) => {});
    
    /* Registered cli commands. */
    this.events.once('cli:getCommands', (cli: Caporal) => {
      glob.sync(path.resolve(__dirname, 'Commands/**/*.js'), {
        nosort: true,
        absolute: true
      }).forEach((file) => {
        try {
          let Command = require(path.resolve(file));
          let instant = new Command(this.di);

          if (instant instanceof Cli.CommandDefines) {
            instant.initialize();
          } else {
            instant = null;
          }
        } catch (error) {
          this.logger.error(error.toString());
        }
      });
    });
  }
  
  /**
   * Startup a service provider.
   */
  async startup (): Promise<any> {

    /* Load application settings. ------------------------------------------ */
    /* --------------------------------------------------------------------- */

    let targetPkg = path.resolve(process.cwd(), 'package.json');
    
    if (fs.existsSync(targetPkg)) {
      this.config.set('package', require(targetPkg));
    }

    /* --------------------------------------------------------------------- */
    
  }

}

/* End of file index.ts */