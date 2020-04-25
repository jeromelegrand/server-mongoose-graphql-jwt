const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLNonNull} = graphql;

const UserType = require('./user');
const User = require('../models/user');
const UserService = require('../service/user');

const Mutation = new GraphQLObjectType({
    name: 'MutationType',
    fields: () => ({
        addUser: {
            type: UserType,
            args: {
                firstName: {type: new GraphQLNonNull(GraphQLString)},
                lastName: {type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args) {
                return UserService.create({...args});
            },
        },
        delUser: {
            type: UserType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args) {
                return await User.findByIdAndDelete(args.id);
            },
        },
    }),
});

module.exports = Mutation;
