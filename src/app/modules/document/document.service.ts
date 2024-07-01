import { IDocument } from "../project/project.interface";
import { Document } from "./document.model";

const createDocIntoDB = async (payload: IDocument) => {
  const result = await Document.create(payload);
  return result;
};

const getAllDocsFromDB = async () => {
  const result = await Document.find();
  return result;
};


const deleteDocFromDB = async (id: string) => {
  const result = Document.findByIdAndDelete(id);
  return result;
};

export const docServices = {
  createDocIntoDB,
  getAllDocsFromDB,
  deleteDocFromDB,
};
