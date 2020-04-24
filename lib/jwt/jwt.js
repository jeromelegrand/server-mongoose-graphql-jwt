const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const User = require('../mongoose/models/user');
const {TOKEN_DURATION, ALGORITHM} = require('../../const');

/*
For generating keys :
ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS512.key
# Don't add passphrase

OR

openssl rsa -in jwtRS512.key -pubout -outform PEM -out jwtRS512.key.pub
 */
const privateKey = fs.readFileSync(path.resolve('lib/jwt/keys/jwtRS512.key'));
const publicKey = fs.readFileSync(path.resolve('lib/jwt/keys/jwtRS512.key.pub'));


const sign = (user) => {
    const {email, firstName, lastName} = user;
    const payload = {email, firstName, lastName};

    const options = {
        algorithm: ALGORITHM,
        expiresIn: TOKEN_DURATION,
    };

    // return token
    return jwt.sign(payload, privateKey, options);
};

const verifyToken = token => {
    const payload = jwt.verify(token, publicKey, {algorithms: [ALGORITHM]});
    if (payload) {
        return {token, payload};
    }

    return false;
};

/**
 *
 * @param token
 * @param refresh
 * @returns {Promise<boolean|*>}
 */
const verifyRefreshToken = async (token, refresh) => {
    const payload = jwt.decode(token);

    // get user with email and refreshToken
    const refreshUser = await User
        .findOne({email: payload.email})
        .where('refreshToken.token').equals(refresh);

    if (refreshUser) {
        const {expirationTime} = refreshUser.refreshToken;

        // check refreshToken expiration
        if (moment(expirationTime).diff(moment()) > 0) {
            // return new token
            return sign(refreshUser);
        }
    }

    return false;
};

module.exports = {sign, verifyToken, verifyRefreshToken};
