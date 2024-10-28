import { createNote, listNotes } from "@/server/api/notes";
import { getUserThatExists } from "@/services/clerk";
import { revalidatePath } from "next/cache";

export default async function NotesPage() {
  const { userId } = await getUserThatExists()
  const notes = await listNotes(userId)

  return (
    <main className="max-w-2xl mx-auto shadow-2xl p-4 m-4">
      <h1>Notes</h1>

      <form action={async (formData) => {
        "use server"

        const { userId } = await getUserThatExists()

        await createNote(
          userId,
          formData.get("note") as string
        )

        revalidatePath("/notes")
      }} className="grid grid-cols-[1fr,auto] gap-2 justify-items-between p-2">
        <input  className="border rounded p-2" name="note" />
        <button  className="border rounded p-2" type="submit">Add Note</button>
      </form>

      <ul className="flex flex-col gap-2 p-2">
        {notes.map((note) => (
          <li key={note.noteId} className="border rounded p-2">{note.text}</li>
        ))}
      </ul>
    </main>
  );
}