import { sql } from "drizzle-orm";
import {
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  unique,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `mario-kart-scoreboard_${name}`,
);

export const players = createTable(
  "players",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 128 }).notNull(),
    handle: varchar("handle", { length: 128 }),
  },
  (p) => ({
    uniqueNameAndHandle: unique("uniqueNameAndHandle").on(p.name, p.handle),
  }),
);

export const heatParticipations = createTable(
  "heat_participations",
  {
    id: serial("id").primaryKey(),
    heatId: varchar("heatId").notNull(),
    heatDate: timestamp("heatDate", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    playerId: integer("playerId")
      .notNull()
      .references(() => players.id),
    finishingPosition: integer("finishingPosition").notNull(),
    score: integer("score"),
  },
  (t) => ({
    uniquePlayersInHeat: unique("uniquePlayersInHeat").on(t.heatId, t.playerId),
    uniqueFinisingPositionsInHeat: unique("uniqueFinisingPositionsInHeat").on(
      t.heatId,
      t.finishingPosition,
    ),
  }),
);

// export const posts = createTable(
//   "post",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 256 }),
//     createdById: varchar("createdById", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     createdAt: timestamp("created_at", { withTimezone: true })
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt", { withTimezone: true }),
//   },
//   (example) => ({
//     createdByIdIdx: index("createdById_idx").on(example.createdById),
//     nameIndex: index("name_idx").on(example.name),
//   }),
// );

// export const users = createTable("user", {
//   id: varchar("id", { length: 255 }).notNull().primaryKey(),
//   name: varchar("name", { length: 255 }),
//   email: varchar("email", { length: 255 }).notNull(),
//   emailVerified: timestamp("emailVerified", {
//     mode: "date",
//     withTimezone: true,
//   }).default(sql`CURRENT_TIMESTAMP`),
//   image: varchar("image", { length: 255 }),
// });

// export const usersRelations = relations(users, ({ many }) => ({
//   accounts: many(accounts),
// }));

// export const accounts = createTable(
//   "account",
//   {
//     userId: varchar("userId", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     type: varchar("type", { length: 255 })
//       .$type<AdapterAccount["type"]>()
//       .notNull(),
//     provider: varchar("provider", { length: 255 }).notNull(),
//     providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
//     refresh_token: text("refresh_token"),
//     access_token: text("access_token"),
//     expires_at: integer("expires_at"),
//     token_type: varchar("token_type", { length: 255 }),
//     scope: varchar("scope", { length: 255 }),
//     id_token: text("id_token"),
//     session_state: varchar("session_state", { length: 255 }),
//   },
//   (account) => ({
//     compoundKey: primaryKey({
//       columns: [account.provider, account.providerAccountId],
//     }),
//     userIdIdx: index("account_userId_idx").on(account.userId),
//   })
// );

// export const accountsRelations = relations(accounts, ({ one }) => ({
//   user: one(users, { fields: [accounts.userId], references: [users.id] }),
// }));

// export const sessions = createTable(
//   "session",
//   {
//     sessionToken: varchar("sessionToken", { length: 255 })
//       .notNull()
//       .primaryKey(),
//     userId: varchar("userId", { length: 255 })
//       .notNull()
//       .references(() => users.id),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (session) => ({
//     userIdIdx: index("session_userId_idx").on(session.userId),
//   })
// );

// export const sessionsRelations = relations(sessions, ({ one }) => ({
//   user: one(users, { fields: [sessions.userId], references: [users.id] }),
// }));

// export const verificationTokens = createTable(
//   "verificationToken",
//   {
//     identifier: varchar("identifier", { length: 255 }).notNull(),
//     token: varchar("token", { length: 255 }).notNull(),
//     expires: timestamp("expires", {
//       mode: "date",
//       withTimezone: true,
//     }).notNull(),
//   },
//   (vt) => ({
//     compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
//   })
// );
