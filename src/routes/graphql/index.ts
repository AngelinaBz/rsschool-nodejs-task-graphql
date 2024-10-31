import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { MemberType, MemberTypeId } from './types/membertype.js';
import { PostType } from './types/post.js';
import { ProfileType } from './types/profile.js';
import { UserType } from './types/user.js';
import { UUIDType } from './types/uuid.js';
import { Mutations } from './types/mutation.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      return graphql({
        schema,
        source: req.body.query,
        variableValues: req.body.variables,
        contextValue: { prisma },
      });
    },
  });
};

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

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations,
});

export default plugin;
