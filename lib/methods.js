'use strict'

const { questions } = require('../models/index');

async function setAnswerRight(questionId, answerId, user) {
    let result;
    try {
        result = await questions.setAnswerRight(questionId, answerId, user);
    } catch (error) {
        console.error(error);
        return false;
    }
    return result;
}

async function getLast(amount) {
    let data;
    try {
        data = await questions.getLast(amount);
    } catch (error) {
        console.log(error);
    }

    return data;
}

module.exports = {
    setAnswerRight,
    getLast
}