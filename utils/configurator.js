const fs = require('fs');
// eslint-disable-next-line import/no-dynamic-require
const configSetter = require(`../config-env/${process.env.ENV_NAME}.json`);

const fileData = Object.keys(configSetter).reduce((total, item) => {
  return `${total}${item}=${configSetter[item]}\n`;
}, '');

fs.writeFile('.env', fileData, () => {
  console.log('ENV SET!');
  // eslint-disable-next-line no-console
  console.log(fileData);
});
