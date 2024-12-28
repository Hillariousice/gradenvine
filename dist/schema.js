"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql
type Cafe {
    id: ID!
    reservation: [Reservation!]!
    venue: [String!]!
    meal: [Meal!]!
    isVerified: Boolean!
    email: String!
    phone: String!
    salt:String!
    token: String!
    password: String!
    name: String!
    dateCreate: String!
    dateUpdate: String!
    customer: [Customer!]!
}
type Review {
    id: ID!
    rating: Int!
    comment: String!
}

type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    reservation: [Reservation!]!
    meal: [Reservation!]!
    reviews: [Review!]!
    isVerified: Boolean!
    salt:String!
    token: String!
    password: String!
    email: String!
    phone: String!
    profileImage: String!
    dateCreate: String!
    dateUpdate: String!
}
type Meal {
    mainCourse: [String!]!
    desert: [String!]!
    sweetener: [String!]!
    drink: [String!]!
    isAvailiable: Boolean!
    timeOfDelivery: String!
}
type Reservation {
    time: String!
    dateOfBooking: String!
    venue: [String!]!
    table: String!
    reviews: [Review!]!
}
type Query{
    reservations: [Reservation]
    customers: [Customer]
    meals: [Meal] 
    reviews: [Review]
}
`;
