import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const authFun = () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  return { userId };
};

export const ourFileRouter = {
  thumbnail: f({ image: { maxFileSize: "4MB" } })
    .middleware(() => authFun())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
