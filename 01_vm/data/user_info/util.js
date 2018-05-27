import { Random } from 'mockjs';

export  function getRandomNumber() {
    return Random.integer(1, 100);
}