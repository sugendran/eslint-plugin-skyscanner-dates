const { promisify } = require('util');
const fs = require('fs');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const { homedir, EOL } = require('os');

const tokenRegex = new RegExp('//artifactory.skyscannertools.net/artifactory/api/npm/npm/:_authToken=(.*)', 'gm');
const tokenPlaceholder = '{tokenPlaceholder}';
const command = 'node npm-auth.js';
const writeError = (error) => {
  console.error(`😱 Error: ${error}`, EOL); // eslint-disable-line no-console
};

const writeMessage = (message) => {
  console.error(`ℹ️   ${message}`, EOL); // eslint-disable-line no-console
};
async function help() {
  return new Promise((resolve) => {
    writeMessage("Remember to check if you're on the latest NodeJs version 😀 ");
    writeMessage(`
Usage:
to generate .npmrcs: ${command} generateNpmrc
to show this help message: ${command} help
`);
    resolve();
  });
}
function setNpmrc(path) {
  return async function writeToNpmrc(content) {
    return writeFileAsync(`${path}/.npmrc`, content);
  };
}
function getNpmrcTemplate(path, encoding = 'utf8') {
  return async function npmrc() {
    return readFileAsync(`${path}/.npmrc.template`, { encoding });
  };
}

function getNpmrc(path, encoding = 'utf8') {
  return async function npmrc() {
    return readFileAsync(`${path}/.npmrc`, { encoding });
  };
}
function getMatch(regex) {
  return function execRegex(s) {
    regex.lastIndex = 0; // eslint-disable-line no-param-reassign
    return regex.exec(s);
  };
}
const hostNpmrc = getNpmrc(`${homedir()}`);
const libNpmrcTemplate = getNpmrcTemplate(`${__dirname}`);
const updateLibNpmrc = setNpmrc(`${__dirname}`);
const extractNpmToken = getMatch(tokenRegex);

async function generateNpmrc() {
  const host = await hostNpmrc();
  const lib = await libNpmrcTemplate();
  const [, hostToken] = extractNpmToken(host);

  if (hostToken === '') {
    throw new Error("Your NPM token isn't set! Check out Confluence for how to login and put this in your ~/.npmrc or the secret variable defined by your Drone configuration. https://confluence.skyscannertools.net/x/vrEdAg");
  }

  await updateLibNpmrc(lib.replace(tokenPlaceholder, hostToken));
}

const actions = {
  generateNpmrc,
  help,
};
async function main() {
  const [, , action] = process.argv;
  if (!action) {
    return writeError(`No command provided, run ${command} help to get 🆘`);
  }
  if (actions[action]) {
    try {
      await actions[action]();
      return writeMessage('All done, have a nice day 😀 ');
    } catch (exc) {
      return writeError(`Something went wrong ${exc.toString()}`);
    }
  }
  return writeError(`Invalid command, run ${command} help to get 🆘`);
}
main();
