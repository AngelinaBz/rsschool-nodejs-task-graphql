import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './types/membertype.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';
import { UserType } from './types/user.js';
import { UUIDType } from './types/uuid.js';

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(MemberType)),
        },
        memberType: {
            type: MemberType,
            args: {
                id: { type: new GraphQLNonNull(MemberTypeId) },
            },
        },
        users: { type: new GraphQLNonNull(new GraphQLList(UserType)) },
        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
        },
        posts: { type: new GraphQLNonNull(new GraphQLList(PostType)) },
        post: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
        },
        profiles: { type: new GraphQLNonNull(new GraphQLList(ProfileType)) },
        profile: {
            type: ProfileType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
        },
    },
});