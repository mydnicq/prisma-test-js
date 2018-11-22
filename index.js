const { prisma, Prisma } = require("./prisma-client");
const { GraphQLServer } = require("graphql-yoga");

const resolvers = {
  Query: {
    getAllUsers(root, args, context) {
      return context.prisma.users();
    }
  },
  // Mutation: {
  //   createDraft(root, args, context) {
  //     return context.prisma.createPost({
  //       title: args.title,
  //       author: {
  //         connect: { id: args.userId }
  //       }
  //     });
  //   },
  //   publish(root, args, context) {
  //     return context.prisma.updatePost({
  //       where: { id: args.postId },
  //       data: { published: true }
  //     });
  //   },
  //   createUser(root, args, context) {
  //     return context.prisma.createUser({ name: args.name });
  //   }
  // },
  User: {
    courses(root, args, context) {
      return context.prisma.user({ id: root.id }).courses();
    }
  }
};

const server = new GraphQLServer({
  typeDefs: "./schema.graphql",
  resolvers,
  context: {
    prisma: new Prisma({
      endpoint: "http://localhost:4466",
      debug: true
    })
  }
});
server.start(() => console.log("Server is running on http://localhost:4000"));
