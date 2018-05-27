import { getSuccessData } from '../../base';
// import { getRandomNumber } from '../../util';

export default function getResult() {
    return getSuccessData({
        uid: 10,
        name: 'Jim-0',
        age: 22
        // age: getRandomNumber(),
    });
}

