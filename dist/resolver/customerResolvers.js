"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerResolvers = void 0;
const cafeSchema_1 = require("../model/cafeSchema");
const customerSchema_1 = require("../model/customerSchema");
const mealSchema_1 = require("../model/mealSchema");
const reservationSchema_1 = require("../model/reservationSchema");
const reviewScheme_1 = require("../model/reviewScheme");
const bcryptjs_1 = __importStar(require("bcryptjs"));
const utils_1 = require("../utils");
exports.CustomerResolvers = {
    Query: {
        getCustomers: async () => {
            try {
                const customers = await customerSchema_1.Customer.find({});
                return customers;
            }
            catch (err) {
                console.log(err);
            }
        },
        getCustomerById: async (_, args) => {
            try {
                const singleCustomer = await customerSchema_1.Customer.findById(args.id);
                return singleCustomer;
            }
            catch (err) {
                console.log(err);
            }
        },
        getReservationsByCustomId: async (_, args) => {
            try {
                const singleCustomerReservations = await reservationSchema_1.Reservation.findById(args.id);
                return singleCustomerReservations;
            }
            catch (err) {
                console.log(err);
            }
        },
        getReviewsByCustomId: async (_, args) => {
            try {
                const singleCustomerReservations = await reviewScheme_1.Review.findById(args.id);
                return singleCustomerReservations;
            }
            catch (err) {
                console.log(err);
            }
        },
        getCafeByCustomId: async (_, args) => {
            try {
                const singleCustomerCafe = await cafeSchema_1.Cafe.findById(args.id);
                return singleCustomerCafe;
            }
            catch (err) {
                console.log(err);
            }
        },
        getMealsByCustomId: async (_, args) => {
            try {
                const singleCustomerMeal = await mealSchema_1.Meal.findById(args.id);
                return singleCustomerMeal;
            }
            catch (err) {
                console.log(err);
            }
        },
    },
    Mutation: {
        registerCustomer: async (_, args) => {
            try {
                const salt = await (0, bcryptjs_1.genSalt)();
                const password = await bcryptjs_1.default.hash(args.input.password, salt);
                const newCustomer = {
                    firstName: args.input.firstName,
                    lastName: args.input.lastName,
                    password,
                    email: args.input.email,
                    salt
                };
                const customerall = await customerSchema_1.Customer.create(newCustomer);
                if (customerall) {
                    return { ...newCustomer, _id: customerall._id };
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        loginCustomer: async (parent, args, context) => {
            try {
                const { password, email } = args.input;
                const output = await customerSchema_1.Customer.findOne({ email });
                const isValidPassword = await (0, utils_1.verifyPassword)(args.input.password, password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                    console.error("Invalid password");
                }
                return {
                    id: args.input.id,
                    email: args.input.email,
                    token: (0, utils_1.signToken)({ customerId: args.input.id }),
                };
            }
            catch (err) {
                console.log(err);
            }
        },
        updateCustomerProfile: async (_, args) => {
            try {
                const id = args.input.id;
                const updateReservation = {
                    id: args.input.id,
                    firstName: args.input.firstName,
                    lastName: args.input.lastName,
                    email: args.input.email,
                    phone: args.input.phone,
                    password: args.input.password,
                    profileImage: args.input.profileImage
                };
                const updateNew = await reservationSchema_1.Reservation.findByIdAndUpdate(id, updateReservation, { new: true });
                if (updateNew) {
                    return updateNew;
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        createReservation: async (_, args) => {
            try {
                const newReservation = {
                    time: args.input.time,
                    dateOfBooking: args.input.dateOfBooking,
                    cancelOfBooking: args.input.cancelOfBooking,
                    table: args.input.table,
                };
                const reservation = await reservationSchema_1.Reservation.create(newReservation);
                if (reservation) {
                    return reservation;
                }
            }
            catch (err) {
            }
        },
        updateReservation: async (_, args) => {
            try {
                const id = args.input.id;
                const updateReservation = {
                    id: args.input.id,
                    time: args.input.time,
                    dateOfBooking: args.input.dateOfBooking,
                    cancelOfBooking: args.input.cancelOfBooking,
                    table: args.input.table,
                };
                const updateNew = await reservationSchema_1.Reservation.findByIdAndUpdate(id, updateReservation, { new: true });
                if (updateNew) {
                    return updateNew;
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        deleteReservation: async (_, args) => {
            try {
                const deleteOne = await reservationSchema_1.Reservation.findById({ _id: args.id });
                console.log(deleteOne);
                if (deleteOne) {
                    return { message: `Product with ${args.id} has been deleted` };
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        createReview: async (_, args) => {
            try {
                const newReview = {
                    rating: args.input.rating,
                    comment: args.input.comment,
                };
                const review = await reviewScheme_1.Review.create(newReview);
                if (review) {
                    return review;
                }
            }
            catch (err) {
            }
        },
        updateReview: async (_, args) => {
            try {
                const id = args.input.id;
                const updateReview = {
                    id: args.input.id,
                    rating: args.input.rating,
                    comment: args.input.comment
                };
                const updateNew = await reviewScheme_1.Review.findByIdAndUpdate(id, updateReview, { new: true });
                if (updateNew) {
                    return updateNew;
                }
            }
            catch (err) {
                console.log(err);
            }
        },
        deleteReview: async (_, args) => {
            try {
                const deleteOne = await reviewScheme_1.Review.findById({ _id: args.id });
                console.log(deleteOne);
                if (deleteOne) {
                    return { message: `Product with ${args.id} has been deleted` };
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    }
};
