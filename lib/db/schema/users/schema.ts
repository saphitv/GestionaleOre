import {int, mysqlTable, primaryKey, timestamp, varchar} from "drizzle-orm/mysql-core";
import {InferType} from "prop-types";
import {InferModel} from "drizzle-orm";
import {AdapterAccount} from "next-auth/adapters";

// @ts-ignore
export const users = mysqlTable("users", {
  id: varchar("id", {length: 255}).notNull().primaryKey(),
  name: varchar("name", {length: 255}),
  email: varchar("email", {length: 255}).notNull(),
  emailVerified: timestamp("emailVerified", {mode: "date"}),
  image: varchar("image", {length: 255}),
})

export const accounts = mysqlTable(
  "accounts",
  {
    userId: varchar("userId", {length: 255}).notNull(),
    type: varchar("type", {length: 255})
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", {length: 255}).notNull(),
    providerAccountId: varchar("providerAccountId", {length: 255}).notNull(),
    refresh_token: varchar("refresh_token", {length: 255}),
    access_token: varchar("access_token", {length: 255}),
    expires_at: int("expires_at"),
    refresh_token_expires_in: int("refresh_token_expires_in"),
    token_type: varchar("token_type", {length: 255}),
    scope: varchar("scope", {length: 255}),
    id_token: varchar("id_token", {length: 255}),
    session_state: varchar("session_state", {length: 255}),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
  })
)

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", {length: 255}).notNull(),
    token: varchar("token", {length: 255}).notNull(),
    expires: timestamp("expires", {mode: "date"}).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  })
)

export const sessions = mysqlTable("sessions", {
  sessionToken: varchar("sessionToken", {length: 255}).notNull().primaryKey(),
  userId: varchar("userId", {length: 255}).notNull(),
  expires: timestamp("expires", {mode: "date"}).notNull(),
})

export type User = InferType<typeof users>
export type NewUser = InferModel<typeof users, 'insert'>;
