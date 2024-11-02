import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql, GraphQLSchema, parse, validate } from 'graphql';
import { Mutations } from './types/mutation.js';
import depthLimit from 'graphql-depth-limit';
import { RootQueryType } from './query.js';
import { userLoader, postLoader, profileLoader, memberTypeLoader } from './loaders.js';

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
    async handler(req, reply) {
      const { query, variables } = req.body;
      const maxDepth = 5;
      const validationRules = [depthLimit(maxDepth)];
      
      const errors = validate(schema, parse(query), validationRules);
      
      if (errors.length > 0) {
        return reply.status(400).send({ errors });
      }

      const context = {
        prisma,
        memberTypeLoader: memberTypeLoader(prisma),
        postLoader: postLoader(prisma),
        profileLoader: profileLoader(prisma),
        userLoader: userLoader(prisma),
      };

      return graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: context,
      });
    },
  });
};

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutations,
});

export default plugin;
