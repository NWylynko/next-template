import "server-only";
import { env } from "@/env";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const publicBucketR2 = new S3Client({
  region: "auto",
  endpoint: env.CLOUDFLARE_R2_PUBLIC_ENDPOINT,
  credentials: {
    accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

const privateBucketR2 = new S3Client({
  region: "auto",
  endpoint: env.CLOUDFLARE_R2_PRIVATE_BUCKET,
  credentials: {
    accessKeyId: env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

// Generates a signed URL for uploading a file
export const uploadPublicFile = async (
  fileId: string,
  contentType: string,
  contentLength?: number,
) => {
  // Define the command for uploading an object
  const command = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_R2_PUBLIC_BUCKET,
    Key: fileId,
    ContentType: contentType,
    ContentLength: contentLength,
  });

  // Generate the pre-signed URL with a specified expiry time (e.g., 15 minutes)
  return await getSignedUrl(publicBucketR2, command, {
    expiresIn: 900, // Time in seconds after which the URL expires (900 = 15 minutes)
  });
};

// The url that points to the public file
export const getPublicFile = async (fileId: string) => {
  return `${env.CLOUDFLARE_R2_PUBLIC_ENDPOINT}/${fileId}`;
}

// Generates a signed URL for uploading a file
export const uploadPrivateFile = async (
  fileId: string,
  contentType: string,
  contentLength?: number,
) => {
  const command = new PutObjectCommand({
    Bucket: env.CLOUDFLARE_R2_PRIVATE_BUCKET,
    Key: fileId,
    ContentType: contentType,
    ContentLength: contentLength,
  });

  return await getSignedUrl(privateBucketR2, command, {
    expiresIn: 900, // Time in seconds after which the URL expires (900 = 15 minutes)
  });
};

// Generates a signed URL for downloading a private file
export const downloadPrivateFile = async (fileId: string) => {
  const command = new GetObjectCommand({
    Bucket: env.CLOUDFLARE_R2_PRIVATE_BUCKET,
    Key: fileId,
  });

  return await getSignedUrl(privateBucketR2, command, {
    expiresIn: 3660, // Time in seconds after which the URL expires (3600 = 1 hour)
  });
};
