const fs = require('fs');

const target = process.argv[2];

if (!target) {
    console.log('Usage : node csvDateModifier.js <Filename without extension>');
    process.exit(1);
}

const [column, ...data] = fs.readFileSync(`./${target}.csv`).toString().trim().split('\n');

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const dateTimePattern = /^\d{4}-\d{2}-\d{2}(T|\s)\d{2}:\d{2}:\d{2}(\.\d{6}Z{0,1}){0,1}$/;

const targetIdx = column.split(',').findIndex((col) => col.includes('_DT'));

if (targetIdx !== -1) {
    console.log('No datetime field on csv file. Use proper files to modify datetime');
    process.exit(1);
} else {

}