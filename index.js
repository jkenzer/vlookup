var fs = require('fs');
var csv = require('fast-csv');

const primaryFile = 'bounced-clicked.csv';
const primaryFieldPrimary = 'Email address';

const lookupFile = 'campaign.csv';
const lookupFieldPrimary = 'EMAIL';
const lookupFieldToAppend = 'ID';

const outputFile = primaryFile;

const primaryFileData = [];
const lookupFileData = [];
const newFileData = [];

const lookupFilePromise = new Promise((resolve) => {
  csv.parseFile(lookupFile, { headers: true })
    .on('error', error => console.error(error))
    .on('data', row => lookupFileData.push(row))
    .on('end', (rowCount => {
      resolve();
      console.log(`Lookup Parsed ${rowCount} rows`);
    }));
});

const primaryFilePromise = new Promise((resolve) => {
  csv.parseFile(primaryFile, { headers: true })
    .on('error', error => console.error(error))
    .on('data', row => primaryFileData.push(row))
    .on('end', (rowCount => {
      resolve();
      console.log(`Primary Parsed ${rowCount} rows`);
    }));
});

Promise.all([lookupFilePromise, primaryFilePromise]).then(() => {
  primaryFileData.forEach((row, index) => {
    if (row[primaryFieldPrimary] != '') {
      let match = lookupFileData.filter(obj => {
        return obj[lookupFieldPrimary].trim() == row[primaryFieldPrimary].trim();
      });
      if (match.length > 0) {
        console.log(`${row[primaryFieldPrimary]} - ${match[0][lookupFieldToAppend]}`);
        primaryFileData[index][lookupFieldToAppend] = match[0][lookupFieldToAppend];
      } else {
        console.log(lookupFieldToAppend);
        primaryFileData[index][lookupFieldToAppend] = '';
      }
    } else {
      primaryFileData[index][lookupFieldToAppend] = '';
    }
    newFileData.push(row);
  });
  csv.writeToPath(outputFile, newFileData, { headers: true })
    .on('error', error => console.error(error))
    .on('finish', () => console.log(`Done Writing. ${newFileData.length} records written`));
});
