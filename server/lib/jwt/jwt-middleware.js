const UserService = require('../mongoose/service/user');

const jwtMiddleware = app => {
    app.use(async (req, res, next) => {
        try {
            await UserService.checkAut(req, res);
            next();
        } catch (e) {
            return res.status(e.status || 400).json({message: e.message});
        }
    });
};

module.exports = jwtMiddleware;
