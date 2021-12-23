import mongoose from 'mongoose';
import { CreateUserPayload } from '../interface/CreateUserPayload';
import { User } from '../interface/User';
import { UserRepository } from '../interface/UserRepository';

const UserSchema = new mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const userModel = mongoose.model('User', UserSchema);

export const userRepository: UserRepository = {
  find: async (payload: CreateUserPayload)=>{
    return await userModel.find(payload)
  },
  create: async (payload: CreateUserPayload) => {
    return await userModel.create(payload);
  },
  findOne: async(payload: Partial<User>) => {
    return await userModel.findOne(payload)
  }
};
