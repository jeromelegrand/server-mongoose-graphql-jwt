require('dotenv').config();

const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./lib/mongoose/schema');

const {PORT} = require('./const');
const {useCors} = require('./lib/cors');
const {connectMongoDB} = require('./lib/mongoose/connect');
const jwtMiddleware = require('./lib/jwt/jwt-middleware');
const UserService = require('./lib/mongoose/service/user');
const UserAlreadyExist = require('./lib/mongoose/errors/UserAlreadyExist');
const InvalidCredentials = require('./lib/mongoose/errors/InvalidCredentials');

connectMongoDB();

const app = express();
app.use(express.json());

useCors(app);

app.listen(PORT, () => {
    console.log(`Application listening on ${PORT}`);
});

app.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;
        return res.status(200).json(await UserService.login(email, password));
    } catch (e) {
        if (e instanceof InvalidCredentials) {
            return res.status(e.status).json({message: e.message});
        }
        return res.status(400).json({message: e.message});
    }
});

app.post('/sign', async (req, res) => {
    try {
        return res.status(200).json(await UserService.create(req.body));
    } catch (e) {
        if (e instanceof UserAlreadyExist) {
            return res.status(e.status).json({message: e.message});
        }
        return res.status(400).json({message: e.message});
    }
});

jwtMiddleware(app);

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));
