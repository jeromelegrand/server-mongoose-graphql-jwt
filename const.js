// express
const PORT = process.env.PORT || 3000;

// mongoose
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'test';


// jwt
const ALGORITHM = process.env.ALGORITHM || 'RS512'
const TOKEN_DURATION = process.env.TOKEN_DURATION || '30m'
const REFRESH_TOKEN_DURATION = process.env.REFRESH_TOKEN_DURATION || 2_592_000 // 30 days into seconds

module.exports = {PORT, TOKEN_DURATION, REFRESH_TOKEN_DURATION, ALGORITHM, DB_HOST, DB_NAME};

