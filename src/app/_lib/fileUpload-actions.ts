"use server";

import { db, schemas } from "@/server/db";
import { getUserThatExists } from "@/services/clerk";
import { uploadPrivateFile, uploadPublicFile } from "@/services/cloudflare";

export const getPublicFileUploadUrl = async (contentType: string, contentLength: number) => {
  const user = await getUserThatExists(); // auth check

  const fileUUID = crypto.randomUUID();

  const uploadUrlPromise = uploadPublicFile(fileUUID, contentType, contentLength);

  await db
    .insert(schemas.file)
    .values({
      authId: user.userId,
      bucket: "public",
      contentType,
      contentLength,
      fileUUID,
      status: "pending",
    })

  const uploadUrl = await uploadUrlPromise;

  return { fileUUID, uploadUrl };
}

export const getPrivateFileUploadUrl = async (contentType: string, contentLength: number) => {
  const user = await getUserThatExists(); // auth check

  const fileUUID = crypto.randomUUID();

  const uploadUrlPromise = uploadPrivateFile(fileUUID, contentType, contentLength);

  await db
    .insert(schemas.file)
    .values({
      authId: user.userId,
      bucket: "private",
      contentType,
      contentLength,
      fileUUID,
      status: "pending",
    })

  const uploadUrl = await uploadUrlPromise;

  return { fileUUID, uploadUrl };
}