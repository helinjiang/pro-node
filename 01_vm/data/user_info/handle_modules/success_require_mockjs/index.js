const Mock = require('mockjs');
const { getSuccessData } = require('../../base');

function getResult() {
    return getSuccessData({
        uid: Mock.Random.integer(1, 999),
        name: Mock.Random.word(3, 10),
        age: Mock.Random.integer(18, 80)
    });
}

module.exports = getResult;

console.log(getResult());