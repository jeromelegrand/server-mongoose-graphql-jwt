module.exports = class InvalidCredentials extends Error {
    status = 401;

    constructor() {
        super('Login or password invalid.');
    }
}
