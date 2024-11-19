"use server";

import { trackService } from "@/services/track/track.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createServerAction } from "zsa";

export const deleteTrackAction = createServerAction()
  .input(
    z.object({
      trackId: z.string(),
    })
  )
  .handler(async ({ input }) => {
    try {
      await trackService.delete({ id: input.trackId });
    } catch (error) {
      console.log(error);
    }
    revalidatePath("/", "page");
    redirect("/");
  });
