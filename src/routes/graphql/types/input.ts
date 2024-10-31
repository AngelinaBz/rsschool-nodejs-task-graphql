import { GraphQLNonNull, GraphQLString, GraphQLInputObjectType, GraphQLBoolean, GraphQLInt, GraphQLFloat } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeId } from './membertype.js';

export const ChangePostInput = new GraphQLInputObjectType({
    name: 'ChangePostInput',
    fields: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
    },
});

export const ChangeProfileInput = new GraphQLInputObjectType({
    name: 'ChangeProfileInput',
    fields: {
        isMale: { type: GraphQLBoolean },
        yearOfBirth: { type: GraphQLInt },
        memberTypeId: { type: MemberTypeId },
    },
});

export const ChangeUserInput = new GraphQLInputObjectType({
    name: 'ChangeUserInput',
    fields: {
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat },
    },
});

export const CreatePostInput = new GraphQLInputObjectType({
    name: 'CreatePostInput',
    fields: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
    },
});

export const CreateProfileInput = new GraphQLInputObjectType({
    name: 'CreateProfileInput',
    fields: {
        isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
        yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: new GraphQLNonNull(UUIDType) },
        memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    },
});

export const CreateUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
    },
});