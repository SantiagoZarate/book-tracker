"use server";

import { createServerAction } from "zsa";
import { createBookSchema } from "./bookSchema";

export const createBookAction = createServerAction()
  .input(createBookSchema)
  .handler(async ({ input }) => {
    console.log({ input });
  });
