"use server";

export async function handleSubmit() {
  await new Promise((res) => setTimeout(res, 1000));

  return { result: "test" };
}
