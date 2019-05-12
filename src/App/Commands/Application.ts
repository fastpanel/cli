/**
 * Application.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import fs from 'fs';
import path from 'path';
import Winston from 'winston';
import { EOL } from 'os';
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
    /* Check application settings. */
    if (!this.config.get('package', false)) {
      this.cli
      .command('app', 'Create application by template.')
      .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
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
                await this.cli.exec(
                  ['app:cli'],
                  options
                );
              } catch (error) {
                /* Stop command by error. */
                reject(error);
              }
            break;
            case 'Simple application':
            default:
              try {
                /* Run command. */
                await this.cli.exec(
                  ['app:simple'],
                  options
                );
              } catch (error) {
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
      .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
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
      .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
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
  public getNameByCwd (): String {
    let a = process.cwd().split(path.sep);
    return a[a.length -1];
  }

}

module.exports = Command;

/* End of file Application.ts */