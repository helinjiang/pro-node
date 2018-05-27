const { getSuccessData } = require('../../base');

function getResult() {
    return getSuccessData({
        uid: 10,
        name: 'Jim-0',
        age: 22
    });
}

module.exports = getResult;