"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
    constructor(name) {
        this.name = name;
    }
    getName() {
        console.log(this.name);
    }
}
const main = async () => {
    const home = new Home('name');
    home.getName();
    // const db = new Mongodb();
    // await db.connect();
    // await startApolloServer();
};
main();
//# sourceMappingURL=server.js.map