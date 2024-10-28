"use client";

import { useCallback } from "react";
import { getPublicFileUploadUrl, getPrivateFileUploadUrl } from "./fileUpload-actions";

// react hook, takes a 'File' and returns a promise that resolves to the fileId (uuid)
export const useUploadPublicFile = () => {
  return useCallback(
    async (file: File) => {
      const { fileUUID, uploadUrl } = await getPublicFileUploadUrl(file.type, file.size);

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      if (response.status !== 200) {
        throw new Error("Failed to upload file");
      }

      return fileUUID;
    },
    [],
  );
};

export const useUploadPrivateFile = () => {
  return useCallback(
    async (file: File) => {
      const { fileUUID, uploadUrl } = await getPrivateFileUploadUrl(file.type, file.size);

      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
      });

      if (!response.ok) {
        throw new Error("Failed to upload document");
      }

      if (response.status !== 200) {
        throw new Error("Failed to upload document");
      }

      return fileUUID;
    },
    [],
  );
};
