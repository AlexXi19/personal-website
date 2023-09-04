import {
  pgTable,
  pgEnum,
  uuid,
  timestamp,
  text,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";
export const keyStatus = pgEnum("key_status", [
  "default",
  "expired",
  "invalid",
  "valid",
]);
export const keyType = pgEnum("key_type", ["aead-det", "aead-ietf"]);
export const factorType = pgEnum("factor_type", ["totp", "webauthn"]);
export const factorStatus = pgEnum("factor_status", ["unverified", "verified"]);
export const aalLevel = pgEnum("aal_level", ["aal1", "aal2", "aal3"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "plain",
  "s256",
]);

export const posts = pgTable("posts", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  author: text("author").notNull(),
  live: boolean("live").default(true).notNull(),
});

export const recs = pgTable("recs", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  title: text("title").notNull(),
  href: text("href").notNull(),
  type: text("type"),
  isOther: boolean("is_other").default(false).notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  text: text("text"),
});

export const tokens = pgTable("tokens", {
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token").primaryKey().notNull(),
});

export const readingList = pgTable(
  "reading_list",
  {
    id: uuid("id").defaultRandom().primaryKey().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
    url: text("url"),
    title: text("title"),
    done: boolean("done"),
    username: text("username"),
  },
  (table) => {
    return {
      readingListUrlKey: unique("reading_list_url_key").on(table.url),
    };
  },
);
