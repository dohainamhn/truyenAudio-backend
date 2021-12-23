"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoDb {
    constructor() {
        this.mongoUrl = process.env.MONGODBURL;
        this.mongoDBConnected = false;
        this.connect = async () => {
            try {
                if (!this.mongoDBConnected) {
                    await mongoose_1.default.connect(this.mongoUrl);
                    this.mongoDBConnected = true;
                    console.log('DB connected');
                }
            }
            catch (error) {
                console.log(`DB connection failed with error ${error}`);
            }
        };
        this.stop = async () => {
            if (this.mongoDBConnected) {
                await mongoose_1.default.connection.close();
                this.mongoDBConnected = false;
                console.log('DB connected');
            }
        };
    }
}
exports.default = MongoDb;
//# sourceMappingURL=index.js.map