const cors = require('cors');

/**
 *
 * @param app express
 * @param whitelist array of strings allowed origins
 */
const useCors = (app, whitelist = []) => {
    const corsOptions = {};
    if (whitelist.length > 0) {
        corsOptions.origin = (origin, callback) => {
            if (whitelist.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }

    app.use(cors(corsOptions));
};

module.exports = {useCors};
