import DataLoader from 'dataloader';

export const memberTypeLoader = (prisma) =>
    new DataLoader(async (ids) => {
        const memberTypes = await prisma.memberType.findMany({
            where: { id: { in: ids as string[] } },
        });
        const memberTypeMap = {};
        memberTypes.forEach(memberType => {
            memberTypeMap[memberType.id] = memberType;
        });
        return ids.map(id => memberTypeMap[id as string] || null);
    });
    
export const postLoader = (prisma) =>
    new DataLoader(async (ids) => {
        const posts = await prisma.post.findMany({
            where: { id: { in: ids as string[] } },
        });
        const postMap = {};
        posts.forEach(post => {
            postMap[post.id] = post;
        });
        return ids.map(id => postMap[id as string] || null);
    });

export const userPostsLoader = (prisma) =>
    new DataLoader(async (authorIds) => {
        const posts = await prisma.post.findMany({
            where: { authorId: { in: authorIds as string[] } },
        });
        const postMap = {};
        posts.forEach(post => {
            if (!postMap[post.authorId]) {
                postMap[post.authorId] = [];
            }
            postMap[post.authorId].push(post);
        });
        return authorIds.map(authorId => postMap[authorId as string] || []);
    });

export const profileLoader = (prisma) =>
    new DataLoader(async (ids) => {
        const profiles = await prisma.profile.findMany({
            where: { id: { in: ids as string[] } },
        });
        const profileMap = {};
        profiles.forEach(profile => {
            profileMap[profile.id] = profile;
        });
        return ids.map(id => profileMap[id as string] || null);
    });

export const userProfileLoader = (prisma) =>
    new DataLoader(async (userIds) => {
      const profiles = await prisma.profile.findMany({
        where: { userId: { in: userIds as string[] } },
      });
  
      const profileMap = {};
      profiles.forEach(profile => {
          profileMap[profile.userId] = profile;
      });
      return userIds.map(id => profileMap[id as string] || null);
    });

export const userLoader = (prisma) =>
    new DataLoader(async (ids) => {
        const users = await prisma.user.findMany({
            where: { id: { in: ids as string[] } },
            include: { userSubscribedTo: true, subscribedToUser: true },
        });
        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user;
        });
        return ids.map(id => userMap[id as string] || null);
    }); 