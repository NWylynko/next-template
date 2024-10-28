import { db, schemas } from "../db"
import { eq, and } from "drizzle-orm"

export const listNotes = async (authId: string) => {
  return await db
    .select()
    .from(schemas.note)
    .where(eq(schemas.note.authId, authId))
}

export const viewNote = async (authId: string, noteId: number) => {
  const [note] = await db
    .select()
    .from(schemas.note)
    .where(and(
      eq(schemas.note.authId, authId),
      eq(schemas.note.noteId, noteId)
    ))
    .limit(1)

  return note
}

export const createNote = async (authId: string, text: string) => {
  const [note] = await db
    .insert(schemas.note)
    .values({ authId, text })
    .returning()

  if (note === undefined) {
    throw new Error("Failed to create note")
  }

  return note
}

export const updateNote = async (authId: string, noteId: number, text: string) => {
  const [note] = await db
    .update(schemas.note)
    .set({ text })
    .where(and(
      eq(schemas.note.authId, authId),
      eq(schemas.note.noteId, noteId)
    ))
    .returning()

  if (note === undefined) {
    throw new Error("Failed to update note")
  }

  return note
}

export const deleteNote = async (authId: string, noteId: number) => {
  await db
    .delete(schemas.note)
    .where(and(
      eq(schemas.note.authId, authId),
      eq(schemas.note.noteId, noteId)
    ))

  return {
    noteId
  }
}