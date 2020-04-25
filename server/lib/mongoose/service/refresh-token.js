const RefreshToken = require('../models/refresh-token');

const RefreshTokenService = {
    save: async (userId, token) => {
        let refreshToken = await RefreshToken.find({userId});
        if (refreshToken) {
            refreshToken.refreshToken = refreshToken;
        } else {
            refreshToken = new RefreshToken({userId, refreshToken: token});
        }
        return await refreshToken.save();
    },
    check: async (userId, refreshToken) => {
       return !!(await RefreshToken.find({userId, refreshToken}));
    },
};

module.exports = RefreshTokenService;
