const graphql = require('graphql');
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull} = graphql;

const RootQuery = require('./query');
const Mutation = require('./mutation');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
