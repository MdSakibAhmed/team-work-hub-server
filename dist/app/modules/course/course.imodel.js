"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const TagsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    _id: false,
    versionKey: false,
});
const CourseSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
    },
    price: {
        type: Number,
        required: true,
    },
    tags: {
        type: [TagsSchema],
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    endDate: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    provider: {
        type: String,
        required: true,
    },
    durationInWeeks: {
        type: Number,
    },
    details: {
        level: { type: String, required: true },
        description: { type: String, required: true },
    },
}, {
    versionKey: false,
});
CourseSchema.pre("save", function (next) {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    const differencInMilliSecands = endDate - startDate;
    const weekDifference = differencInMilliSecands / (1000 * 60 * 60 * 24 * 7);
    const roundWeekNumber = Math.ceil(weekDifference);
    this.durationInWeeks = roundWeekNumber;
    next();
});
// CourseSchema.virtual("durationInWeeks").get(function () {
//   const startDate: number = new Date(this.startDate).getTime();
//   const endDate: number = new Date(this.endDate).getTime();
//   const differencInMilliSecands = endDate - startDate;
//   const weekDifference = differencInMilliSecands / (1000 * 60 * 60 * 24 * 7);
//   console.log(weekDifference);
//   const roundWeekNumber = Math.ceil(weekDifference);
//   return roundWeekNumber;
// });
exports.Course = (0, mongoose_1.model)("Course", CourseSchema);
