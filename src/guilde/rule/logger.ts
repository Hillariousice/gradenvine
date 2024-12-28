import { GraphQLResolveInfo } from "graphql";

export const logger = async (
  resolve: Function,
  root: any,
  args: any,
  context: any,
  info: GraphQLResolveInfo
) => {
  const startTime = Date.now();
  
  console.info(`Resolver started: ${info.parentType.name}.${info.fieldName}`);
  
  try {
    const result = await resolve(root, args, context, info);
    const duration = Date.now() - startTime;

    console.info(
      `Resolver finished: ${info.parentType.name}.${info.fieldName} in ${duration}ms`
    );

    return result;
  } catch (error: any) {
    console.error(
      `Error in resolver: ${info.parentType.name}.${info.fieldName}`,
      error.message
    );
    throw error;
  }
};
