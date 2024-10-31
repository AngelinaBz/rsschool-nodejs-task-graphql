import { graphql, GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLInputObjectType, GraphQLEnumType, GraphQLNonNull } from 'graphql';

export const MemberTypeId = new GraphQLEnumType({
    name: 'MemberTypeId',
    values: {
        BASIC: { value: 'BASIC' },
        BUSINESS: { value: 'BUSINESS' },
    },
});

export const MemberType = new GraphQLObjectType({
    name: 'MemberType',
    fields: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
        discount: { type: new GraphQLNonNull(GraphQLFloat) },
        postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    },
});