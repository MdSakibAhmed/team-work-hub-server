import { Types } from "mongoose";
export type TTages = {
  name: string;
  isDeleted: boolean;
};
export type TDetailes = {
  level: string;
  description: string;
};
export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTages[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks:number
  details: TDetailes;
};
