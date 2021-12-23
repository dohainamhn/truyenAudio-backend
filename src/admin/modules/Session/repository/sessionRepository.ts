import mongoose from 'mongoose';
import { Session, SessionRepository } from '../interface';

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    refreshToken: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const sessionModel = mongoose.model('Session', sessionSchema);

export const sessionRepository: SessionRepository = {
  find: async (payload: any) => {
    return await sessionModel.find(payload);
  },
  create: async (payload: any) => {
    return await sessionModel.create(payload);
  },
  findOne: async (payload: Partial<Session>) => {
    return await sessionModel.findOne(payload);
  },
  update: async (payload: Partial<Session>) => {
    const { userId } = payload;
    return await sessionModel.findOneAndUpdate(
      {
        userId,
      },
      payload,
      {
        upsert: true
      }
    );
  },
};
