const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const {TokenExpiredError} = jwt;
const {uid} = require('rand-token');

const User = require('../models/user');
const {RefreshToken} = require('../models/refresh-token');
const UserAlreadyExist = require('../errors/UserAlreadyExist');
const InvalidTokens = require('../errors/InvalidToken');
const InvalidCredentials = require('../errors/InvalidCredentials');
const {sign, verifyToken, verifyRefreshToken} = require('../../jwt/jwt');
const {REFRESH_TOKEN_DURATION} = require('../../../const');

const UserService = {
    create: async (user) => {
        if (await UserService.userExist(user.email)) {
            throw new UserAlreadyExist();
        }

        // hash user password
        user.password = await bcrypt.hash(user.password, 10);
        return await new User(user).save();
    },
    userExist: async email => !!(await User.findOne({email})),
    login: async (email, password) => {
        // get user in database
        const user = await User.findOne({email});
        if (user) {
            // check if password is ok
            const match = await bcrypt.compare(password, user.password);
            if (match) {

                // get token
                const token = sign(user);

                // make a new refresh token
                const refresh = await UserService.updateRefresh(user);

                return {payload: jwt.decode(token), token, refresh};
            }
        }

        throw  new InvalidCredentials();
    },
    updateRefresh: async user => {
        user.refreshToken = new RefreshToken({
            token: uid(512),
            generationTime: moment(),
            expirationTime: moment().add(REFRESH_TOKEN_DURATION, 's'),
        });
        await user.save();
        return user.refreshToken.token;
    },
    checkAut: async (req, res) => {
        const auth = req.header('Authorization');
        if (auth) {
            const [type, token] = auth.split(' ');
            if (type === 'Bearer' && token) {
                try {
                    // auth success with token (throw error if failed)
                    if (verifyToken(token)) return;
                } catch (e) {
                    if (e instanceof TokenExpiredError) {
                        const refresh = req.header('x-refresh-token');
                        if (refresh) {
                            const newToken = await verifyRefreshToken(token, refresh);
                            if (newToken) {
                                // auth success with refresh token
                                res.set({
                                    'Access-Control-Expose-Headers': 'x-new-token',
                                    'x-new-token': newToken,
                                });
                                return;
                            }
                        }
                    }
                }
            }
        }
        throw new InvalidTokens();
    },
};

module.exports = UserService;
