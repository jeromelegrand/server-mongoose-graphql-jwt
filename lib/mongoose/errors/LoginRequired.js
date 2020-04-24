module.exports = class LoginRequired extends Error {
    status = 401;

    constructor() {
        super('Login required');
    }
}
