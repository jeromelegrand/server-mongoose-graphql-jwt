const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        email: {type: GraphQLString},
        password: {type: GraphQLString},
    }),
});

module.exports = UserType;
