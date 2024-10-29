import { clerkClient } from "@clerk/nextjs/server"


export const listAccounts = async (offset: number = 0) => {
  const clerk = await clerkClient()

  const result = await clerk.users.getUserList({
    offset,
    limit: 100,
  })

  const nextOffset = result.data.length >= 100 ? offset + 100 : undefined

  return {
    users: result.data.map(({ publicMetadata, ...user}) => ({
      ...user,
      publicMetadata: publicMetadata as CustomJwtSessionClaims["metadata"]
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
    publicMetadata: user.publicMetadata as CustomJwtSessionClaims["metadata"]
  }
}

export const updateAccount = async (authId: string, metadata: CustomJwtSessionClaims["metadata"]) => {
  const clerk = await clerkClient()

  const updatedUser = await clerk.users.updateUserMetadata(authId, {
    publicMetadata: metadata
  })

  return {
    ...updatedUser,
    publicMetadata: updatedUser.publicMetadata as CustomJwtSessionClaims["metadata"]
  }
}

export const deleteAccount = async (authId: string) => {
  const clerk = await clerkClient()

  await clerk.users.deleteUser(authId)

  return {
    authId
  }
}