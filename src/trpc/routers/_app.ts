import { createTRPCRouter, protectedProcedure } from "../init";

export const appRouter = createTRPCRouter({
  getCurrentUser: protectedProcedure.query(({ ctx }) => {
    return ctx.auth.user;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
