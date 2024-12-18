// import { IDocument } from "../project/project.interface";
import { TDocument } from "./document.interface";
import { Document } from "./document.model";
import { AppDataSource } from "../../../server";
import { FindOperator } from "typeorm";
const createDocIntoDB = async (payload: TDocument) => {
  const documentRepo = AppDataSource.getRepository(Document);

  const document = new Document();
  document.title = payload.title;
  document.content = payload.content;
  documentRepo.save(document);
  return document;
};

const getAllDocsFromDB = async () => {
  const documentRepo = AppDataSource.getRepository(Document);
  const result = await documentRepo.find();
  return result;
};

const deleteDocFromDB = async (id: number | FindOperator<number>) => {
  const documentRepo = AppDataSource.getRepository(Document);
  const document = await documentRepo.findOneBy({ id });
  if (!document) {
    throw new Error("Document not found");
  }
  const result = await documentRepo.remove(document);
  return result;
};

export const docServices = {
  createDocIntoDB,
  getAllDocsFromDB,
  deleteDocFromDB,
};
