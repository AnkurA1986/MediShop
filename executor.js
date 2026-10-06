const fs = require('fs');
const os = require('os');
const path = require('path');

const tester = process.env.TESTER_NAME || os.userInfo().username;
const resultsDir = path.resolve(__dirname, '..', 'allure-results');

fs.mkdirSync(resultsDir, { recursive: true });

const executor = {
  name: tester,               // shown in the Executors widget
  type: 'local',              // any label; known types (jenkins, github) get an icon
  buildName: `Run by ${tester} on ${new Date().toLocaleString()}`,
  reportName: 'MediShop Regression',
};

fs.writeFileSync(
  path.join(resultsDir, 'executor.json'),
  JSON.stringify(executor, null, 2)
);

console.log(`executor.json written for tester: ${tester}`);