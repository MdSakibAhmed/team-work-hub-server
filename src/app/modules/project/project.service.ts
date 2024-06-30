import { IProject } from "./project.interface";
import { Project } from "./project.model";

const createProjectIntoDB = async (payload: IProject) => {
  const result = await Project.create(payload);
  return result;
};

const getAllProjectsFromDB = async () => {
  const result = await Project.find();
  return result;
};

const updateProjectIntoDB = async (id: string, data: Partial<IProject>) => {
  const updateProject = Project.findByIdAndUpdate(id, data, {
    runValidators: true,
    new: true,
  });
  return updateProject;
};

const deleteProjectFromDB = async (id: string) => {
  const result = Project.findByIdAndDelete(id);
  return result;
};

export const projectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
