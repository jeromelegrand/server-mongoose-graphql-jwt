const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;


module.exports = new GraphQLObjectType({
    name: 'RefreshToken',
    fields: () => ({
        id: {type: GraphQLID},
        userId: {type: GraphQLString},
        refreshToken: {type: GraphQLString},
        expirationTime: {type: GraphQLInt}
    }),
});
