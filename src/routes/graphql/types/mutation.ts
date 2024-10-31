import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { CreateUserInput, CreateProfileInput, CreatePostInput, ChangePostInput, ChangeProfileInput, ChangeUserInput } from './input.js';
import { UserType } from './user.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';
import { UUIDType } from './uuid.js';

export const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        createUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                dto: { type: new GraphQLNonNull(CreateUserInput) },
            },
            resolve: (parent, { dto }, { prisma }) => {
                return prisma.user.create({
                    data: dto,
                });
            },
        },
        createProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                dto: { type: new GraphQLNonNull(CreateProfileInput) },
            },
            resolve: async (parent, { dto }, { prisma }) => {
                return prisma.profile.create({
                    data: dto,
                });
            },
        },
        createPost: {
            type: new GraphQLNonNull(PostType),
            args: {
                dto: { type: new GraphQLNonNull(CreatePostInput) },
            },
            resolve: async (parent, { dto }, { prisma }) => {
                return prisma.post.create({
                    data: dto,
                });
            },
        },
        changePost: {
            type: new GraphQLNonNull(PostType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangePostInput) },
            },
            resolve: async (parent, { id, dto }, { prisma }) => {
                return prisma.post.update({
                    where: { id: id },
                    data: dto,
                });
            },
        },
        changeProfile: {
            type: new GraphQLNonNull(ProfileType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeProfileInput) },
            },
            resolve: async (parent, { id, dto }, { prisma }) => {
                return prisma.profile.update({
                    where: { id: id },
                    data: dto,
                });
            },
        },
        changeUser: {
            type: new GraphQLNonNull(UserType),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
                dto: { type: new GraphQLNonNull(ChangeUserInput) },
            },
            resolve: async (parent, { id, dto }, { prisma }) => {
                return prisma.user.update({
                    where: { id: id },
                    data: dto,
                });
            },
        },
        deleteUser: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (parent, { id }, { prisma }) => {
                await prisma.user.delete({ where: { id: id } });
                return `User with ID ${id} has been deleted.`;
            },
        },
        deletePost: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (parent, { id }, { prisma }) => {
                await prisma.post.delete({ where: { id: id } });
                return `Post with ID ${id} has been deleted.`;
            },
        },
        deleteProfile: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                id: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (parent, { id }, { prisma }) => {
                await prisma.profile.delete({ where: { id: id } });
                return `Profile with ID ${id} has been deleted.`;
            },
        },
        subscribeTo: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (parent, { userId, authorId }, { prisma }) => {
                await prisma.subscribers.create({ 
                    data: {
                        userId: userId,
                        authorId: authorId,
                    }
                });
                return `User with ID ${userId} has subscribed to author with ID ${authorId}.`;
            },
        },
        unsubscribeFrom: {
            type: new GraphQLNonNull(GraphQLString),
            args: {
                userId: { type: new GraphQLNonNull(UUIDType) },
                authorId: { type: new GraphQLNonNull(UUIDType) },
            },
            resolve: async (parent, { userId, authorId }, { prisma }) => {
                await prisma.subscribers.delete({ 
                    where: {
                        userId: userId,
                        authorId: authorId,
                    }
                });
                return `User with ID ${userId} has unsubscribed from author with ID ${authorId}.`;
            },
        },
    },
});