import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const note = pgTable(
  "note",
  {
    noteId: serial().primaryKey(),
    authId: varchar({ length: 32 }).notNull(),

    text: varchar({ length: 1000 }).notNull(),
  },
  (table) => ({
    authIdx: index("note_authIdx").on(table.authId),
  }),
);

export const fileBucket = pgEnum("file_bucket", ["public", "private"])
export const fileStatus = pgEnum("file_status", ["pending", "complete"])

export const file = pgTable(
  "file",
  {
    fileId: serial().primaryKey(),
    authId: varchar({ length: 32 }).notNull(),

    fileUUID: uuid().notNull(),
    contentType: varchar({ length: 64 }).notNull(),
    contentLength: integer().notNull(),
    bucket: fileBucket().notNull(),
    status: fileStatus().notNull(),
  },
  (table) => ({
    authIdx: index("file_authIdx").on(table.authId),
    fileUUIDIdx: uniqueIndex("file_fileUUIDIdx").on(table.fileUUID),
  }),
);