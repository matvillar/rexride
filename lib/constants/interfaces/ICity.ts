import { Document } from 'mongoose';

export interface ICity extends Document {
  _id: string;
  name: string;
}
