// import { IDocument } from "../project/project.interface";
import { TDocument } from "./document.interface";
import { Document } from "./document.model";
import { AppDataSource, redisClient } from "../../../server";
import { FindOperator } from "typeorm";
const createDocIntoDB = async (payload: TDocument, originalUrl: string) => {
  const documentRepo = AppDataSource.getRepository(Document);

  const document = new Document();
  document.title = payload.title;
  document.content = payload.content;
  documentRepo.save(document);

  // invalid redis cache
  await redisClient.del(originalUrl);
  return document;
};

const getAllDocsFromDB = async (originalUrl: string) => {
  const documentRepo = AppDataSource.getRepository(Document);

  const result = await documentRepo.find();
  // store in redis
  await redisClient.set(originalUrl, JSON.stringify(result), "EX", 60);

  return result;
};

const deleteDocFromDB = async (
  id: number | FindOperator<number>,
  originalUrl: string
) => {
  const documentRepo = AppDataSource.getRepository(Document);
  const document = await documentRepo.findOneBy({ id });
  if (!document) {
    throw new Error("Document not found");
  }
  const result = await documentRepo.remove(document);

  // invalid redis cache
  await redisClient.del(originalUrl);
  return result;
};

export const docServices = {
  createDocIntoDB,
  getAllDocsFromDB,
  deleteDocFromDB,
};
