"use server";

export async function addBookAction(formData: FormData) {
  const data = {
    title: formData.get("title"),
  };
  console.log({ data });
}
