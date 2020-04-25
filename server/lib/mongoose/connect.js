const mongoose = require('mongoose');

const {DB_HOST, DB_NAME} = require('../../const');


const connectMongoDB = () => {
    mongoose.connect(
        `mongodb://${DB_HOST}/${DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
    );

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Connected to mongoDB');
    });
}

module.exports = {connectMongoDB};
