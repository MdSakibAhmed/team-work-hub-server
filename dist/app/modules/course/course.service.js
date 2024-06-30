"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const review_model_1 = require("../review/review.model");
const course_imodel_1 = require("./course.imodel");
const course_const_1 = require("./course.const");
const createCourseIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_imodel_1.Course.create(payload);
    return result;
});
const getAllCourseFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let queries = [];
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
            startDate: { $gte: query.startDate },
        });
        queries.push({
            endDate: { $lte: query.endDate },
        });
    }
    if (query.durationInWeeks) {
        queries.push({ durationInWeeks: query.durationInWeeks });
    }
    console.log(queries);
    let filterQueries = course_imodel_1.Course.find(queries.length ? { $and: queries } : {});
    const queryOptions = {};
    if (query.sortBy) {
        const field = query.sortBy;
        const sortOrder = query.sortOrder
            ? query.sortOrder
            : "asc";
        if (course_const_1.Shortfields.includes(field)) {
            queryOptions[field] = sortOrder;
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
    const data = yield paginateQuery.limit(limit);
    const total = yield course_imodel_1.Course.countDocuments({});
    return { meta: { page, limit, total }, data };
});
const updateCourseIntoDB = (courseId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { tags, details } = payload, remainingData = __rest(payload, ["tags", "details"]);
    const modifiedData = Object.assign({}, remainingData);
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            modifiedData[`details.${key}`] = value;
        }
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updatedCourse = yield course_imodel_1.Course.findByIdAndUpdate(courseId, modifiedData, {
            new: true,
            runValidators: true,
            session,
        });
        if (!updatedCourse) {
            throw new Error("Cant not update course");
        }
        // update tags based on isDelted
        // delete
        if (tags && tags.length > 0) {
            const deltedTags = tags.filter((tg) => tg.isDeleted).map((tg) => tg.name);
            console.log("names", deltedTags);
            const deltedTagesCours = yield course_imodel_1.Course.findByIdAndUpdate(courseId, {
                $pull: {
                    tags: { name: { $in: deltedTags } },
                },
            }, { new: true, session });
            if (!deltedTagesCours) {
                throw new Error("Cant not deleted  tag");
            }
            const addedTags = tags.filter((tg) => !tg.isDeleted);
            const addedTagesCours = yield course_imodel_1.Course.findByIdAndUpdate(courseId, {
                $addToSet: {
                    tags: { $each: addedTags },
                },
            }, { new: true, session });
            if (!addedTagesCours) {
                throw new Error("Cant not added tag");
            }
        }
        const result = yield course_imodel_1.Course.findById(courseId);
        session.commitTransaction();
        session.endSession();
        return result;
    }
    catch (error) {
        session.abortTransaction();
        session.endSession();
        throw new Error(error);
    }
});
const getCourseWithReviewsFromDB = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    const course = yield course_imodel_1.Course.findOne({ _id: courseId });
    const reviews = yield review_model_1.Review.find({ courseId }, { _id: 0 });
    return { course, reviews };
});
const getBestCourseBasedOnAvarageFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.aggregate([
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
            $group: {
                _id: null,
                data: { $first: "$$ROOT" },
            },
        },
        {
            $lookup: {
                from: "courses",
                localField: "data._id",
                foreignField: "_id",
                as: "course",
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
});
exports.CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    updateCourseIntoDB,
    getCourseWithReviewsFromDB,
    getBestCourseBasedOnAvarageFromDB,
};
