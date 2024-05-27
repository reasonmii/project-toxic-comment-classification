const Papa = require('papaparse');

const fs = require('fs');

function c(str) {
  return str.replace(/\s+/g, ' ').trim().replace(/^"/, '').replace(/"$/, '').trim().replace(/""/g, '"');
}

const csv = fs.readFileSync('./train.csv', 'utf8');
let a = Papa.parse(csv).data;

a = a.filter(item => item.length === 8).map(item => {
  if (item[1] === undefined) {
    console.info(item);
  }
  item[1] = c(item[1].substr(0));
  for (let i = 2; i < 8; i++) {
    item[i] = +item[i];
  }
  item.shift();
  return item;
})//.filter(item => Math.random() < 0.01 + 0.05 * (item[1] + item[2] + item[3] + item[4] + item[5] + item[6]))
a.shift();

const b = a.map(([str,n1,n2,n3,n4,n5,n6]) => [str, n1 + n2 + n3 + n4 + n5 + n6 > 0 ? 1 : 0]);

fs.writeFileSync('./train.json', JSON.stringify(a));
fs.writeFileSync('./classifyTrain.json', JSON.stringify(b));
