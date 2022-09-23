#!/usr/bin/env node
/**
 * 
 * Package: 
 * Author: Ganesh B
 * Description: Nodejs npm module to traverse folder using code or cli or use glob patterns
 * Install: npm i traverse-cli, npm i traverse-fs, npm i fssys
 * Github: https://github.com/traverse-fs/cli-gen
 * npmjs Link: 
 * File: cli.js
 * File Description: gen-cli CLI main Command file
 * 
*/

const yargs = require("yargs");
const sYargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const config = require("../test/demos/template.config.json");


let options = [];
let k = Object.keys(config.options);
for (let i = 0; i < k.length; i++) {
    let o = {
        "name": k[i],
        ...config.options[k[i]]
    };
    options.push(o);
}

var argv = sYargs(hideBin(process.argv));


for (let j = 0; j < k.length; j++) {
    argv.command(
        k[j],
        options[j].describe,
        function (yargs) {
            for (let l = 0; l < opts.positional.length; l++) {
                let o = opts.positional[l];
                argv.positional(o.name, { ...o.properties })
            }
            return yargs;
        }.bind(null, opts = options[j]),
        (!options[j].file["function"]) ? require(options[j].file.path) : require(options[j].file.path)[options[j].file.function])
}

argv.option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging'
})
    .usage("Usage: \n hello dir [dirname] \n hello search [dirname] [searchtext]")
    .help('h')
    .alias('h', 'help')
    .epilog('cli-gen: MIT License')
    .showHelpOnFail(true)
    .demandCommand(1, '')
    .strict()
    .parse()

//
// argv.command({
//     command: '*',
//     handler: (argv) => {      
//         if (argv._[0]) {
//         console.log('Unknown commmand', argv._[0])        
//         }
//     }
// }).demand(1);
// 
// // OR You can use this
// 
// if (!argv.argv._[0]) {
//      yargs.showHelp();
// }
//