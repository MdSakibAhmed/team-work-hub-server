import { RequestHandler } from "express";
import catchAsync from "../../utiles/catchAsync";
import { projectServices } from "./project.service";

const createProject: RequestHandler = catchAsync(async (req, res) => {
  const newProject = await projectServices.createProjectIntoDB(req.body);
  res.send({
    success: true,
    statusCode: 201,
    message: "project created successfully",
    data: newProject,
  });
});

const getAllProjects: RequestHandler = catchAsync(async (req, res) => {
  const data = await projectServices.getAllProjectsFromDB();
  res.send({
    success: true,
    statusCode: 200,
    message: "Projects retrieved successfully",
    data,
  });
});

const updateProject: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  // console.log(req.body);
  const updatedCourse = await projectServices.updateProjectIntoDB(
    courseId,
    req.body
  );
  res.send({
    success: true,
    statusCode: 200,
    message: "project updated successfully",
    data: updatedCourse,
  });
});

const deleteProject: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  // console.log(req.body);
  const deletedProject = await projectServices.deleteProjectFromDB(courseId);
  res.send({
    success: true,
    statusCode: 200,
    message: "project deleted successfully",
    data: null,
  });
});

export const projectControllers = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
