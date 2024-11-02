import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeId } from './types/membertype.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';
import { UserType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { parse, parseResolveInfo, ResolveTree, simplify } from 'graphql-parse-resolve-info';

export const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        memberTypes: {
            type: new GraphQLNonNull(new GraphQLList(MemberType)),
            resolve: async (parent, _, { prisma, memberTypeLoader }) => {
                const memberTypes = await prisma.memberType.findMany();
                
                memberTypes.forEach((memberType) => {
                    memberTypeLoader.prime(memberType.id, memberType);
                });

                return memberTypes;
            },
        },
        memberType: {
            type: MemberType,
            args: {
                id: { type: new GraphQLNonNull(MemberTypeId) },
            },
            resolve: async (_, { id }, { memberTypeLoader }) => {
                return memberTypeLoader.load(id);
            },
        },
        users: { 
            type: new GraphQLNonNull(new GraphQLList(UserType)),
            resolve: async (parent, _, { prisma, userLoader }, info) => {
                const parsedInfo = parseResolveInfo(info);

                const fields = parsedInfo!.fieldsByTypeName?.User || {};
                
                const include = {
                    ...(fields['userSubscribedTo'] && { userSubscribedTo: true }),
                    ...(fields['subscribedToUser'] && { subscribedToUser: true })
                };
                
                const users = await prisma.user.findMany({ include });
                
                users.forEach((user) => {
                    userLoader.prime(user.id, user);
                });

                return users;
            },
        },
        user: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, { id }, { userLoader }) => {
                return userLoader.load(id);
            },
        },
        posts: { 
            type: new GraphQLNonNull(new GraphQLList(PostType)),
            resolve: async (parent, _, { prisma, postLoader }) => {
                const posts = await prisma.post.findMany();
                
                posts.forEach((post) => {
                    postLoader.prime(post.id, post);
                });

                return posts;
            },
        },
        post: {
            type: PostType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, { id }, { postLoader }) => {
                return postLoader.load(id);
            },
        },
        profiles: { 
            type: new GraphQLNonNull(new GraphQLList(ProfileType)),
            resolve: async (parent, _, { prisma, profileLoader }) => {
                const profiles = await prisma.profile.findMany();
                
                profiles.forEach((profile) => {
                    profileLoader.prime(profile.id, profile);
                });

                return profiles;
            },
        },
        profile: {
            type: ProfileType,
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (_, { id }, { profileLoader }) => {
                return profileLoader.load(id);
            },
        },
    },
});