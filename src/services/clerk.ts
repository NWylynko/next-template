import { viewAccount } from "@/server/api/account";
import { auth } from "@clerk/nextjs/server";

export const getUser = async () => {
  const user = await auth();

  if (user.userId === null) {
    return null;
  }

  return user
}

export const getUserWithMetadata = async () => {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const account = await viewAccount(user.userId);

  return {
    ...user,
    metadata: account.metadata,
    __account: account
  }
}

export const getUserThatExists = async () => {
  const user = await auth();

  if (user.userId === null) {
    throw new Error("User not loggedin or not found");
  }

  return {
    ...user,
    userId: user.userId
  }
}

export const getUserThatExistsWithMetadata = async () => {
  const user = await getUserThatExists();

  const account = await viewAccount(user.userId);

  return {
    ...user,
    metadata: account.metadata,
    __account: account
  }
}