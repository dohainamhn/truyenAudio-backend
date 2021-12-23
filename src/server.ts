import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import { adminResolvers, adminTypeDefs } from './admin/modules';
import { guestResolvers, guestTypeDefs } from './guest/modules';
import { verifyTokens } from './utils/auth/verifyToken';
import Mongodb from './utils/db';
dotenv.config();

// var corsOptions = {
//   origin: true,
//   credentials: true,
// };

// const createApolloServer = async (
//   typeDefs,
//   resolvers,
//   app,
//   path,
//   cors = {}
// ) => {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: ({ req, res }) => ({
//       req,
//       res,
//     }),
//     plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
//   });
//   await server.start();
//   console.log(`🚀 Server ready at http://localhost:4000${path}`);
//   server.applyMiddleware({ app, path, cors });
// };

// async function startApolloServer() {
//   const app = express();
//   const httpServer = http.createServer(app);
//   const PORT = process.env.PORT || 4000;

//   app.use(cookieParser());
//   app.use('/admin', verifyTokens);

//   await createApolloServer(
//     adminTypeDefs,
//     adminResolvers,
//     app,
//     '/admin',
//     corsOptions
//   );
//   await createApolloServer(guestTypeDefs, guestResolvers, app, '/guest');
//   await new Promise<void>((resolve) =>
//     httpServer.listen({ port: PORT }, resolve)
//   );
// }

class Home {
  constructor(private name: string){

  }
  getName(){
    console.log(this.name)
  }
}

const main = async () => {
  const home = new Home('name')
  home.getName()
 
  // await startApolloServer();
};
main();
