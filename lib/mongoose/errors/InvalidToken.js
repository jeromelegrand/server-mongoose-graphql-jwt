module.exports = class InvalidToken extends Error {
    status = 401;

    constructor() {
        super('Invalid tokens.');
    }
};
