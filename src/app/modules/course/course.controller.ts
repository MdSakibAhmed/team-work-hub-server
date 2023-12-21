import { RequestHandler } from "express";
import { CourseServices } from "./course.service";
import catchAsync from "../../utiles/catchAsync";

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const newCourse = await CourseServices.createCourseIntoDB(req.body);
  res.send({
    success: true,
    statusCode: 201,
    message: "Course created successfully",
    data: newCourse,
  });
});

const getAllcourses: RequestHandler = catchAsync(async (req, res) => {
  const { meta, data } = await CourseServices.getAllCourseFromDB(req.query);
  res.send({
    success: true,
    statusCode: 200,
    message: "Courses retrieved successfully",
    meta,
    data,
  });
});

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  // console.log(req.body);
  const updatedCourse = await CourseServices.updateCourseIntoDB(
    courseId,
    req.body
  );
  res.send({
    success: true,
    statusCode: 200,
    message: "Course updated successfully",
    data: updatedCourse,
  });
});

const getCourseWithReviews: RequestHandler = catchAsync(
  async (req, res) => {
    const { courseId } = req.params;

    const courseWithReviews = await CourseServices.getCourseWithReviewsFromDB(
      courseId
    );
    res.send({
      success: true,
      statusCode: 200,
      message: "Categories retrieved successfully",
      data: courseWithReviews,
    });
  }
);
const getBestCourseBasedOnAvarage: RequestHandler = catchAsync( async (req, res) => {

    const [data] = await CourseServices.getBestCourseBasedOnAvarageFromDB();
    console.log(data);
    const responsObj = {
      course: data?.course[0],
      averageRating: data?.data?.averageRating,
      reviewCount: data?.data?.reviewCount,
    };
    res.send({
      success: true,
      statusCode: 200,
      message: "Best course retrieved successfully",
      data: responsObj,
    });
 
});
export const CourseControllers = {
  createCourse,
  getAllcourses,
  updateCourse,
  getCourseWithReviews,
  getBestCourseBasedOnAvarage,
};
