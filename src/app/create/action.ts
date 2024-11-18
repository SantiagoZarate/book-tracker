"use server";

export const createBookTrack = async (formData: FormData) => {
  console.log("RUNNING ON THE SERVER");
  const data = {
    title: formData.get("title"),
  };

  console.log({ data });
};
