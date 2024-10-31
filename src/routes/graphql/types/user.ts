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
        profile: { type: ProfileType },
        posts: { type: new GraphQLNonNull(new GraphQLList(PostType)) },
        userSubscribedTo: { type: new GraphQLNonNull(new GraphQLList(UserType)) },
        subscribedToUser: { type: new GraphQLNonNull(new GraphQLList(UserType)) },
    }),
});