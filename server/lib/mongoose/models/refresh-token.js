const mongoose = require('mongoose');
const {Schema} = mongoose;

const RefreshTokenSchema = new Schema({
    token: String,
    generationTime: Date,
    expirationTime: Date,
});

const RefreshToken = mongoose.model(
    'RefreshToken', RefreshTokenSchema,
);

module.exports = {RefreshToken, RefreshTokenSchema};
