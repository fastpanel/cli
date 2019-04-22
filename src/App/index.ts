/**
 * index.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import Caporal from 'caporal';
import { Application, Extensions } from '@fastpanel/core';

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
    this.events.once('cli:getCommands', (cli: Caporal) => {});
  }
  
  /**
   * Startup a service provider.
   */
  async startup (): Promise<any> {}

}

/* End of file index.ts */