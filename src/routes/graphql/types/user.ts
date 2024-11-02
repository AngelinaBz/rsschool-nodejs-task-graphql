import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: new GraphQLNonNull(UUIDType) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        balance: { type: new GraphQLNonNull(GraphQLFloat) },
        profile: {
            type: ProfileType,
            resolve: async ({ id }, _, { profileLoader }) => {
                return profileLoader.load(id);
            },
        },
        posts: {
            type: new GraphQLNonNull(new GraphQLList(PostType)),
            resolve: async ({ id }, _, { postsLoader }) => {
                return postsLoader.load(id);
            },
        },
        userSubscribedTo: {
            type: new GraphQLNonNull(new GraphQLList(UserType)),
            resolve: async ({ userSubscribedTo }, _, { userLoader }) => {
                return userSubscribedTo.map((subscribtion) => userLoader.load(subscribtion.authorId));
            },
        },
        subscribedToUser: {
            type: new GraphQLNonNull(new GraphQLList(UserType)),
            resolve: async ({ subscribedToUser }, _, { userLoader }) => {
                return subscribedToUser.map((subscribtion) => userLoader.load(subscribtion.subscriberId));
            },
        },
    }),
});