module.exports = class UserAlreadyExist extends Error {
    status = 409;

    constructor() {
        super('User email already exist');
    }
}
