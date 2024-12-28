import { shield } from "graphql-shield";

import { isAuthorized, isAuthenticated } from './rule/rulesIndex'


export const permissions = shield({
  Query: {
    "*": isAuthenticated,
    getCustomers: isAuthorized,
    getCustomerById: isAuthorized,
    getReservationsByCustomId: isAuthorized,
    getReviewsByCustomId: isAuthorized,
    getCafeByCustomId: isAuthorized,
    getMealsByCustomId: isAuthorized
  },
  Mutation: {
    "*": isAuthorized,
    updateCustomerProfile: isAuthenticated,
    createReservation: isAuthenticated,
    updateReservation: isAuthenticated,
    deleteReservation: isAuthenticated,
    createReview: isAuthenticated,
    updateReview: isAuthenticated,
    deleteReview: isAuthenticated,
    updateCafeProfile: isAuthenticated,
    createMeal: isAuthenticated,
    updateMeal: isAuthenticated,
    deleteMeal: isAuthenticated
  },
});