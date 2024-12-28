"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = async (resolve, root, args, context, info) => {
    const startTime = Date.now();
    console.log(`Starting resolver: ${info.fieldName}`);
    try {
        const result = await resolve(root, args, context, info);
        console.log(`Finished resolver: ${info.fieldName} in ${Date.now() - startTime}ms`);
        return result;
    }
    catch (error) {
        console.error(`Error in resolver ${info.fieldName}:`, error.message);
        throw error;
    }
};
exports.logger = logger;
