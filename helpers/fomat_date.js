
const fomatDate = ( date = '') => {

    const newDate = date.split('T');
    return newDate[0];
}

module.exports = fomatDate;