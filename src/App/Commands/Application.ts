/**
 * Application.ts
 * 
 * @author    Desionlab <fenixphp@gmail.com>
 * @copyright 2014 - 2019 Desionlab
 * @license   MIT
 */

import fs from 'fs';
import ejs from 'ejs';
import path from 'path';
import Winston from 'winston';
import { EOL } from 'os';
import { Cli } from '@fastpanel/core';
import { spawn } from 'child_process';

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
          /* Init npm project. */
          try {
            await new Promise((resolve, reject) => {
              let child = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['init', '--yes'], {
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
          } catch (error) {
            reject(error);
          }

          /* Load npm package. */
          try {
            this.config.set(
              'package',
              require(path.resolve(process.cwd(), 'package.json'))
            );
          } catch (error) {
            reject(error);
          }
          
          /* Show welcome message. */
          logger.info(await ejs.renderFile(
            path.resolve(__dirname, '../../../templates', 'app/welcome.ejs'),
            {
              package: this.config.get('package', {})
            },
            {
              root: path.resolve(__dirname, '../../../templates')
            }
          ));

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
          /* Show welcome message. */
          logger.info(await ejs.renderFile(
            path.resolve(__dirname, '../../../templates', 'app/cli/welcome.ejs'),
            {
              package: this.config.get('package', {})
            },
            {
              root: path.resolve(__dirname, '../../../templates')
            }
          ));

          /* Show prompts to user. */
          let answers = await this.prompt([
            /* Package name. */
            {
              name: 'name',
              type: 'input',
              message: 'Package name',
              default: ''
            },
            /* Cli bin. */
            {
              name: 'cliBin',
              type: 'input',
              message: 'Cli bin',
              default: ''
            },
            /* Display name. */
            {
              name: 'displayName',
              type: 'input',
              message: 'Display name',
              default: ''
            },
            /* Description. */
            {
              name: 'description',
              type: 'input',
              message: 'Description',
              default: ''
            },
            /* Version. */
            {
              name: 'version',
              type: 'input',
              message: 'Version',
              default: ''
            }
          ]);
          
          logger.info(answers);

          /* Command complete. */
          resolve();
        });
      });

      this.cli
      .command('app:simple', 'Create simple application.')
      .visible(false)
      .action((args: {[k: string]: any}, options: {[k: string]: any}, logger: Winston.Logger) => {
        return new Promise(async (resolve, reject) => {
          /* Show welcome message. */
          logger.info(await ejs.renderFile(
            path.resolve(__dirname, '../../../templates', 'app/simple/welcome.ejs'),
            {
              package: this.config.get('package', {})
            },
            {
              root: path.resolve(__dirname, '../../../templates')
            }
          ));

          /* Show prompts to user. */
          let answers = await this.prompt([
            
          ]);

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