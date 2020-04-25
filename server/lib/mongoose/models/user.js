const mongoose = require('mongoose');

const {RefreshTokenSchema} = require('./refresh-token');

module.exports = mongoose.model(
    'User',
    {
        lastName: String,
        firstName: String,
        email: {type: String, required: true, trim: true, unique: true},
        password: String,
        refreshToken: RefreshTokenSchema,
    },
);
