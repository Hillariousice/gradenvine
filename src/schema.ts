export const typeDefs = `#graphql

# Types
type Cafe {
    id: ID!
    reservation: [Reservation!]!
    venue: [String!]!
    meal: [Meal!]!
    isVerified: Boolean!
    email: String!
    phone: String!
    salt: String!
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
    meal: [Meal!]!
    reviews: [Review!]!
    isVerified: Boolean!
    salt: String!
    token: String!
    password: String!
    email: String!
    phone: String!
    profileImage: String
    dateCreate: String!
    dateUpdate: String!
}

type Meal {
    id: ID!
    mainCourse: [String!]!
    desert: [String!]!
    sweetener: [String!]!
    drink: [String!]!
    isAvailable: Boolean!
    timeOfDelivery: String!
}

type Reservation {
    id: ID!
    time: String!
    dateOfBooking: String!
    venue: [String!]!
    table: String!
    reviews: [Review!]!
}

type AuthPayload {
    id: ID!
    email: String!
    token: String!
}

type DeleteResponse {
    message: String!
}

# Inputs
input CreateCafeInput {
    name: String!
    email: String!
    password: String!
    phone: String
}

input LoginCustomerInput {
    email: String!
    password: String!
}

input UpdateCafeProfileInput {
    id: ID!
    name: String
    email: String
    phone: String
    password: String
    profileImage: String
}

input CreateMealInput {
    mainCourse: [String!]!
    desert: [String!]!
    sweetener: [String!]!
    drink: [String!]!
    timeOfDelivery: String!
}

input UpdateMealInput {
    id: ID!
    mainCourse: [String]
    desert: [String]
    sweetener: [String]
    drink: [String]
    isAvailable: Boolean
    timeOfDelivery: String
}

input CreateCustomerInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    phone: String
}

input UpdateCustomerProfileInput {
    id: ID!
    firstName: String
    lastName: String
    email: String
    phone: String
    password: String
    profileImage: String
}

input CreateReservationInput {
    time: String!
    dateOfBooking: String!
    venue: [String!]!
    table: String!
}

input UpdateReservationInput {
    id: ID!
    time: String
    dateOfBooking: String
    cancelOfBooking: String
    venue: [String]
    table: String
}

input CreateReviewInput {
    rating: Int!
    comment: String!
}

input UpdateReviewInput {
    id: ID!
    rating: Int
    comment: String
}

# Queries
type Query {
    # Cafe queries
    getCafes: [Cafe!]!
    getCafeById(id: ID!): Cafe
    getReservationsByCafeId(id: ID!): [Reservation]
    getReviewsByCafeId(id: ID!): [Review]
    getCustomerByCafeId(id: ID!): Customer
    getMealsByCafeId(id: ID!): [Meal]

    # Customer queries
    getCustomers: [Customer!]!
    getCustomerById(id: ID!): Customer
    getReservationsByCustomId(id: ID!): [Reservation]
    getReviewsByCustomId(id: ID!): [Review]
    getCafeByCustomId(id: ID!): Cafe
    getMealsByCustomId(id: ID!): [Meal]
}

# Mutations
type Mutation {
    # Cafe mutations
    registerCafe(input: CreateCafeInput!): Cafe
    updateCafeProfile(input: UpdateCafeProfileInput!): Cafe
    createMeal(input: CreateMealInput!): Meal
    updateMeal(input: UpdateMealInput!): Meal
    deleteMeal(id: ID!): DeleteResponse

    # Customer mutations
    registerCustomer(input: CreateCustomerInput!): Customer
    loginCustomer(input: LoginCustomerInput!): AuthPayload
    updateCustomerProfile(input: UpdateCustomerProfileInput!): Customer

    # Reservation mutations
    createReservation(input: CreateReservationInput!): Reservation
    updateReservation(input: UpdateReservationInput!): Reservation
    deleteReservation(id: ID!): DeleteResponse

    # Review mutations
    createReview(input: CreateReviewInput!): Review
    updateReview(input: UpdateReviewInput!): Review
    deleteReview(id: ID!): DeleteResponse
}
`
