// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
// import {
//   bigint,
//   index,
//   mysqlTableCreator,
//   timestamp,
//   varchar,
// } from "drizzle-orm/mysql-core";

import {
  pgTable,
  varchar,
  bigint,
  timestamp,
  index,
  pgTableCreator,
} from "drizzle-orm/pg-core";

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   fullName: text("full_name"),
//   phone: varchar("phone", { length: 256 }),
// });

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
//  * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
//  */
export const createTable = pgTableCreator((name) => `example_${name}`);

// converted example to postgres with Drizzle
export const posts = pgTable(
  "post",
  {
    id: bigint("id", { mode: "number" })
      .primaryKey()
      .$defaultFn(() => sql`nextval('post_id_seq')`),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at").$onUpdateFn(() => sql`NOW()`),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

// Original example
// export const posts = createTable(
//   "post",
//   {
//     id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updated_at").onUpdateNow(),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );
