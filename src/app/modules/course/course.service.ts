import mongoose, { SortOrder } from "mongoose";
import { Review } from "../review/review.model";
import { Course } from "./course.imodel";
import { TCourse } from "./course.interface";
import { Shortfields } from "./course.const";
import { string } from "zod";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  let queries: {}[] = [];

  if (query.language) {
    queries.push({ language: query.language });
  }
  if (query.provider) {
    queries.push({ provider: query.provider });
  }
  if (query.level) {
    queries.push({ "details.level": query.level });
  }
  if (query.minPrice && query.maxPrice) {
    queries.push({ price: { $gte: query.minPrice, $lte: query.maxPrice } });
  }
  if (query.tags) {
    queries.push({ "tags.name": query.tags });
  }
  if (query.startDate && query.endDate) {
    queries.push({
      startDate: { $gte: query.startDate as string },
    });
    queries.push({
      endDate: { $lte: query.endDate as string },
    });
  }
  if (query.durationInWeeks) {
    queries.push({ durationInWeeks: query.durationInWeeks });
  }
  console.log(queries);
  let filterQueries = Course.find(queries.length ? { $and: queries } : {});

  const queryOptions: { [key: string]: SortOrder | { $meta: any } } = {};
  if (query.sortBy) {
    const field = query.sortBy as string;
    const sortOrder: SortOrder = query.sortOrder
      ? (query.sortOrder as SortOrder)
      : "asc";
    if (Shortfields.includes(field)) {
      queryOptions[field] = sortOrder as SortOrder;
    }
  }
  console.log("options", queryOptions);
  const sortQuery = filterQueries.sort(queryOptions);

  let page = 1;
  let limit = 4;
  let skip = 0;

  // IF limit IS GIVEN SET IT

  if (query.limit) {
    limit = Number(query.limit);
  }

  // IF page IS GIVEN SET IT

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);
  const data = await paginateQuery.limit(limit);
  const total = await Course.countDocuments({});
  return { meta: { page, limit, total }, data };
};

const updateCourseIntoDB = async (
  courseId: string,
  payload: Partial<TCourse>
) => {
  const { tags, details, ...remainingData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingData };

  if (details && Object.keys(details).length) {
    for (const [key, value] of Object.entries(details)) {
      modifiedData[`details.${key}`] = value;
    }
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      modifiedData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    if (!updatedCourse) {
      throw new Error("Cant not update course");
    }

    // update tags based on isDelted
    // delete
    if (tags && tags.length > 0) {
      const deltedTags = tags.filter((tg) => tg.isDeleted).map((tg) => tg.name);
      console.log("names", deltedTags);
      const deltedTagesCours = await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            tags: { name: { $in: deltedTags } },
          },
        },
        { new: true }
      );
      if (!deltedTagesCours) {
        throw new Error("Cant not deleted  tag");
      }
      const addedTags = tags.filter((tg) => !tg.isDeleted);
      const addedTagesCours = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: {
            tags: { $each: addedTags },
          },
        },
        { new: true }
      );

      if (!addedTagesCours) {
        throw new Error("Cant not added tag");
      }
    }

    const result = await Course.findById(courseId, {}, { session });
    if (!result) {
      throw new Error("Cant not find course ");
    }

    session.commitTransaction();
    session.endSession();

    return result;
  } catch (error: any) {
    session.abortTransaction();
    session.endSession();
    throw new Error(error);
  }
};

const getCourseWithReviewsFromDB = async (courseId: string) => {
  const course = await Course.findOne({ _id: courseId });
  const reviews = await Review.find({ courseId }, { _id: 0 });
  return { course, reviews };
};
const getBestCourseBasedOnAvarageFromDB = async () => {
  const result = await Review.aggregate([
    {
      $group: {
        _id: "$courseId",
        reviewCount: { $sum: 1 },
        averageRating: { $avg: "$rating" },
      },
    },
    {
      $sort: {
        averageRating: -1,
      },
    },

    {
      $lookup: {
        from: "courses",
        localField: "_id",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $group: {
        _id: null,
        data: { $first: "$$ROOT" },
      },
    },

    {
      $project: {
        _id: 0,
        "data._id": 0,
      },
    },
  ]);

  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  updateCourseIntoDB,
  getCourseWithReviewsFromDB,
  getBestCourseBasedOnAvarageFromDB,
};
