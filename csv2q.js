const fs = require('fs');

const checkType = require('./util/toParameter');

const target = process.argv[2];

if (process.argv.length !== 3 || !target) {
    console.log('Usage : node csv2q.js <Filename without extension>');
    process.exit(1);
}

const result = [];

const [column, ...data] = fs.readFileSync(`./${target}.csv`).toString().trim().split('\n');

const columnInfo = column.split(',');

const insertQuery = `INSERT INTO ${target} (${column}) VALUES\n`;

const hasJsonColumn = data[0].includes('[{');

if (hasJsonColumn) {
    console.log("JSON COLUMN DETECTED");

    const jsonIdx = columnInfo.findIndex(columnName => columnName.includes('_OPT'));

    data.forEach((r) => {
        let val = r.replace(/\"\"/g, '"');

        const jsonColumnPattern = /\"\[\{.*\}\]\"/;

        const jsonCol = val.match(jsonColumnPattern);

        let jsonObject;


        if (jsonCol) {
            console.log(jsonCol[0]);
            val = val.replace(jsonCol[0], '');
            val = val.replace(',,', ',');
            jsonObject = jsonCol[0].replace('"[', '[');
            jsonObject = jsonObject.replace(']"', ']');
        } else {
            val = val.replace(',[{}]', '');
            jsonObject = "[{}]";
        }

        let values = val.split(',');

        const newValues = [...values.slice(0, jsonIdx), jsonObject, ...values.slice(jsonIdx)].map(checkType);

        result.push(`(${newValues.join(',')})`);

    })
} else {
    console.log("JSON COLUMN NOT DETECTED");
    data.forEach((r) => {
        const values = r.split(',');

        const processed = values.map(checkType);


        result.push(`(${processed.join(',')})`);
    })
}

fs.writeFileSync(`./${target}_result_${+new Date()}.sql`, insertQuery + result.join(',\n'));

console.log('done');