import { auth } from "@clerk/nextjs/server";

export const getUser = async () => {
  const user = await auth();

  if (user.userId === null) {
    return null;
  }

  if (user.sessionClaims.metadata === undefined) {
    throw new Error("You need to add public metadata as metadata in the jwt session")
  }

  return {
    ...user,
    userId: user.userId,
    metadata: user.sessionClaims.metadata as CustomJwtSessionClaims["metadata"]
  }
}

export const getUserThatExists = async () => {
  const user = await auth();

  if (user.userId === null) {
    throw new Error("User not loggedin or not found");
  }

  if (user.sessionClaims.metadata === undefined) {
    throw new Error("You need to add public metadata as metadata in the jwt session")
  }

  return {
    ...user,
    userId: user.userId,
    metadata: user.sessionClaims.metadata as CustomJwtSessionClaims["metadata"]
  }
}