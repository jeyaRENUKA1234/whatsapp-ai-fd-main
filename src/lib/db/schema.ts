import {
  pgTable,
  serial,
  varchar,
  text,
  bigint,
  boolean,
  timestamp,
  pgEnum,
  integer,
  date,
  real,
  jsonb
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const rewardTierEnum = pgEnum("reward_tier", [
  "BRONZE",
  "SILVER",
  "GOLD",
]);

export const rewardTypeEnum = pgEnum("reward_type", [
  "QUOTE",
  "TIDY_ZEN_MOMENT",
  "TOKEN",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  telegramId: bigint("telegram_id", { mode: "number" }).notNull().unique(),
  username: varchar("username", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  languageCode: varchar("language_code", { length: 16 }),
  isPremium: boolean("is_premium").default(false),
  phoneNumber: varchar("phone_number", { length: 32 }),
  profilePhotoUrl: varchar("profile_photo_url", { length: 1024 }),
  tier: rewardTierEnum("tier").default("BRONZE").notNull(),
  walletAddress: varchar("wallet_address", { length: 255 }).unique(),
  silverPaid: boolean("silver_paid").default(false),
  goldPaid: boolean("gold_paid").default(false),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  lastActiveAt: timestamp("last_active_at"),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const rewards = pgTable("rewards", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  tier: rewardTierEnum("tier").notNull(),
  type: rewardTypeEnum("type").notNull(),
  value: text("value").notNull(),
  probability: integer("probability").default(0),
  spinDate: date("spin_date"),
  isClaim: boolean("is_claim").default(false).notNull(),
  amount: real("amount").default(0).notNull(), 
  txid: text("txid").default(""),
  zenCode: text("zen_code").default(""),
  isSpin: boolean("is_spin").default(false), 
  symbol: text("symbol").default(""),
  walletAddress: text("wallet_address").default(""),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const tiers = pgTable("tiers", {
  id: serial("id").primaryKey(),
  name: rewardTierEnum("name").notNull(),
  amount: integer("amount").notNull(),
  status: text("status").default("active"),
  color: text("color").notNull(),
  bgColor: text("bg_color").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

export const referral = pgTable("referral", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  referralId: integer("referral_id")
    .notNull()
    .references(() => users.id),
  isPlayed: boolean("is_played").notNull().default(false),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  lastActiveAt: timestamp("last_active_at"),
});

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const partner = pgTable("partner", {
  id: serial("id").primaryKey(),
  groupName: text("group_name"),
  symbol: text("symbol"),
  walletAddress: text("wallet_address"),
  approved: boolean("approved").default(false),
  channelId: bigint("channel_id", { mode: "number" }),
  tokenAddress: text("token_address"),
  project: text("project"),
  duration: text("duration"),
  contact: text("contact"),
  logo: text("logo"),
  url: text("url"),
  adminIds: jsonb("admin_ids").default(sql`'[]'::jsonb`),
  endAt: timestamp("end_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});



export const groupusers = pgTable("groupusers", {
  id: serial("id").primaryKey(),
  telegramId: bigint("telegram_id", { mode: "number" }).notNull(),
  channelId: bigint("channel_id", { mode: "number" }).notNull(),
  username: varchar("username", { length: 255 }),
  groupName: varchar("group_name", { length: 255 }),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  languageCode: varchar("language_code", { length: 16 }),
  isPremium: boolean("is_premium").default(false),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
  lastActiveAt: timestamp("last_active_at"),
});

export const loghistory = pgTable("loghistory", {
  id: serial("id").primaryKey(),
  telegramId: bigint("telegram_id", { mode: "number" }).notNull(),
  walletAddress: text("wallet_address").default(""),
  initData: text("init_data").default(""),
  reqHeaders: text("req_headers").default(""),
  ipAddress: text("ip_address").default(""),
  claimId: real("claim_id").default(0).notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`)
});