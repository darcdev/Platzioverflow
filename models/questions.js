class Questions {
    constructor(db) {
        this.db = db;
        this.ref = this.db.ref('/');
        this.collection = this.ref.child('questions');
    }
    async create(data, user) {
        const dataQuestion = {
            ...data
        }
        dataQuestion.owner = user;
        const question = this.collection.push(dataQuestion);

        return question.key;
    }

    async getLast(amount) {
        const query = await this.collection.limitToLast(amount).once('value');
        const data = query.val()
        return data;
    }
}
module.exports = Questions