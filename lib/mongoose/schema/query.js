const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const UserType = require('./user');
const User = require('../models/user');
const RefreshTokenType = require('./refresh-token');
const RefreshToken = require('../models/refresh-token');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return User.findById(args.id);
            },
        },
        users: {
            type: GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            },
        },
        refreshToken: {
            type: RefreshTokenType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return RefreshToken.findById(args.id);
            },
        },
        refreshTokens: {
            type: GraphQLList(RefreshTokenType),
            resolve(parent, args) {
                return RefreshToken.find({});
            },
        },
    },
});

module.exports = RootQuery;
