const fs = require('fs');

const path = './db/database.json';

const guardarData = ( data ) => {
    // const path = './db/database.txt';

    fs.writeFileSync( path, JSON.stringify(data) );
}

const leerData = () => {
    if ( !fs.existsSync(path) ) {
        return null;
    }

    const database = fs.readFileSync(path, { encoding: 'utf-8' });
    const dataParse = JSON.parse( database );
    return dataParse;
}

module.exports = {
    guardarData,
    leerData
};