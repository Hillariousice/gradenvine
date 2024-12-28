"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const graphql_shield_1 = require("graphql-shield");
const rulesIndex_1 = require("./rule/rulesIndex");
exports.permissions = (0, graphql_shield_1.shield)({
    Query: {
        getCustomers: rulesIndex_1.isAuthorized,
        getCustomerById: rulesIndex_1.isAuthorized,
        getReservationsByCustomId: rulesIndex_1.isAuthorized,
        getReviewsByCustomId: rulesIndex_1.isAuthorized,
        getCafeByCustomId: rulesIndex_1.isAuthorized,
        getMealsByCustomId: rulesIndex_1.isAuthorized
    },
    Mutation: {
        updateCustomerProfile: rulesIndex_1.isAuthenticated,
        createReservation: rulesIndex_1.isAuthenticated,
        updateReservation: rulesIndex_1.isAuthenticated,
        deleteReservation: rulesIndex_1.isAuthenticated,
        createReview: rulesIndex_1.isAuthenticated,
        updateReview: rulesIndex_1.isAuthenticated,
        deleteReview: rulesIndex_1.isAuthenticated,
        updateCafeProfile: rulesIndex_1.isAuthenticated,
        createMeal: rulesIndex_1.isAuthenticated,
        updateMeal: rulesIndex_1.isAuthenticated,
        deleteMeal: rulesIndex_1.isAuthenticated
    },
});
