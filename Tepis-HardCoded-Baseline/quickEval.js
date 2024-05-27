const data = require('./classifyTrain.json');
const fs = require('fs-extra');
const path = require('path');

function getCapitalizedRatio(str) {
  let lowerCase = 0;
  let upperCase = 0;
  for (let i = 0; i < str.length; i++) {
    if (/[a-z]/.test(str[i])) {
      lowerCase++;
    } else if (/[A-Z]/.test(str[i])) {
      upperCase++;
    }
  }
  return [upperCase, upperCase / (lowerCase + upperCase)];
}

function classify(text) {
  const lcText = text.toLowerCase();
  if (
    lcText.includes('fuck') ||
    lcText.includes('dick') ||
    lcText.includes('retard') ||
    lcText.includes('shut up') ||
    lcText.includes('freaking') ||
    lcText.includes('gay') ||
    lcText.includes('asshole') ||
    lcText.includes('bitch') ||
    lcText.includes('testicle') ||
    lcText.includes('shit') ||
    lcText.includes('suck') ||
    lcText.includes('screw') ||
    lcText.includes('vagina') ||
    lcText.includes('coward') ||
    lcText.includes('penis') ||
    lcText.includes('***') ||
    lcText.includes('stupid')
  ) {
    return true;
  }

  const [capitalized, capitalizedRatio] = getCapitalizedRatio(text);
  if ((capitalizedRatio > 0.6)) {
    return true;
  }

  return false;
}

function evaluate(data, classifier) {
  let truePositive = 0;
  let trueNegative = 0;
  let falsePositive = 0;
  const falsePositives = [];
  let falseNegative = 0;
  const falseNegatives = [];
  for (const [str, answerInt] of data) {
    const answer = answerInt === 1;
    const guess = classifier(str);
    if (answer) {
      if (guess) {
        truePositive++;
      } else {
        falseNegative++;
        falseNegatives.push(str);
      }
    } else {
      if (guess) {
        falsePositive++;
        falsePositives.push(str);
      } else {
        trueNegative++;
      }
    }
  }
  
  console.info('truePositive', truePositive);
  console.info('trueNegative', trueNegative);
  console.info('falsePositive', falsePositive);
  console.info('falseNegative', falseNegative);
  console.info('accuracy', (truePositive + trueNegative) / (truePositive + trueNegative + falsePositive + falseNegative));
  console.info('precision', truePositive / (truePositive + falsePositive));
  console.info('recall', truePositive / (truePositive + falseNegative));

  fs.ensureDirSync(path.join(__dirname, 'samples'));
  fs.writeFileSync(path.join(__dirname, 'samples', 'falsePositives.txt'), falsePositives.join('\n'));
  fs.writeFileSync(path.join(__dirname, 'samples', 'falseNegatives.txt'), falseNegatives.join('\n'));
}

evaluate(data, classify)
