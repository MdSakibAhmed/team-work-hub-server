import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import { docServices } from "./document.service";
import { Project } from "../project/project.model";
import { io } from "../../../server";
import { Document } from "./document.model";

const createDoc: RequestHandler = catchAsync(async (req, res) => {
  const newDoc = await docServices.createDocIntoDB(req.body);

  res.send({
    success: true,
    statusCode: 201,
    message: "project created successfully",
    data: newDoc,
  });
});

const getAllDocs: RequestHandler = catchAsync(async (req, res) => {
  const data = await docServices.getAllDocsFromDB();
  res.send({
    success: true,
    statusCode: 200,
    message: "Doc retrieved successfully",
    data,
  });
});

const deleteDoc: RequestHandler = catchAsync(async (req, res) => {
  const { doctId } = req.params;

  // console.log(req.body);
  const deletedProject = await docServices.deleteDocFromDB(doctId);
  res.send({
    success: true,
    statusCode: 200,
    message: "doc deleted successfully",
    data: null,
  });
});

export const docControllers = {
  createDoc,
  getAllDocs,
  deleteDoc,
};
