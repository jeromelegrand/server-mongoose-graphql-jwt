const mongoose = require('mongoose');

const {RefreshTokenSchema} = require('./refresh-token');

module.exports = mongoose.model(
    'User',
    {
        lastName: String,
        firstName: String,
        email: String,
        password: String,
        refreshToken: RefreshTokenSchema,
    },
);
