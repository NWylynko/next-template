import { clerkClient } from "@clerk/nextjs/server"

type Metadata = {
  isAdmin?: true
}

export const listAccounts = async (offset: number = 0) => {
  const clerk = await clerkClient()

  const result = await clerk.users.getUserList({
    offset,
    limit: 100,
  })

  const nextOffset = result.data.length >= 100 ? offset + 100 : undefined

  return {
    users: result.data.map(({ privateMetadata, ...user}) => ({
      ...user,
      metadata: privateMetadata as Metadata
    })),
    nextPage: async () => listAccounts(nextOffset),
    nextOffset
  }
}

export const viewAccount = async (authId: string) => {
  const clerk = await clerkClient()

  const user = await clerk.users.getUser(authId)

  return {
    ...user,
    metadata: user.privateMetadata as Metadata
  }
}

export const updateAccount = async (authId: string, metadata: Metadata) => {
  const clerk = await clerkClient()

  const updatedUser = await clerk.users.updateUserMetadata(authId, {
    privateMetadata: metadata
  })

  return {
    ...updatedUser,
    metadata: updatedUser.privateMetadata as Metadata
  }
}

export const deleteAccount = async (authId: string) => {
  const clerk = await clerkClient()

  await clerk.users.deleteUser(authId)

  return {
    authId
  }
}