CREATE TYPE "public"."reward_tier" AS ENUM('BRONZE', 'SILVER', 'GOLD');--> statement-breakpoint
CREATE TYPE "public"."reward_type" AS ENUM('QUOTE', 'TIDY_ZEN_MOMENT', 'TOKEN');--> statement-breakpoint
CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "admin_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "groupusers" (
	"id" serial PRIMARY KEY NOT NULL,
	"telegram_id" bigint NOT NULL,
	"channel_id" bigint NOT NULL,
	"username" varchar(255),
	"group_name" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"language_code" varchar(16),
	"is_premium" boolean DEFAULT false,
	"is_admin" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"last_active_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "loghistory" (
	"id" serial PRIMARY KEY NOT NULL,
	"telegram_id" bigint NOT NULL,
	"wallet_address" text DEFAULT '',
	"init_data" text DEFAULT '',
	"req_headers" text DEFAULT '',
	"ip_address" text DEFAULT '',
	"claim_id" real DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "partner" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_name" text,
	"symbol" text,
	"wallet_address" text,
	"approved" boolean DEFAULT false,
	"channel_id" bigint,
	"token_address" text,
	"project" text,
	"duration" text,
	"contact" text,
	"logo" text,
	"url" text,
	"admin_ids" jsonb DEFAULT '[]'::jsonb,
	"end_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "quotes" (
	"id" serial PRIMARY KEY NOT NULL,
	"description" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "referral" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"referral_id" integer NOT NULL,
	"is_played" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"last_active_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "rewards" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"tier" "reward_tier" NOT NULL,
	"type" "reward_type" NOT NULL,
	"value" text NOT NULL,
	"probability" integer DEFAULT 0,
	"spin_date" date,
	"is_claim" boolean DEFAULT false NOT NULL,
	"amount" real DEFAULT 0 NOT NULL,
	"txid" text DEFAULT '',
	"zen_code" text DEFAULT '',
	"is_spin" boolean DEFAULT false,
	"symbol" text DEFAULT '',
	"wallet_address" text DEFAULT '',
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "tiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" "reward_tier" NOT NULL,
	"amount" integer NOT NULL,
	"status" text DEFAULT 'active',
	"color" text NOT NULL,
	"bg_color" text NOT NULL,
	"created_at" text DEFAULT CURRENT_TIMESTAMP,
	"updated_at" text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"telegram_id" bigint NOT NULL,
	"username" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"language_code" varchar(16),
	"is_premium" boolean DEFAULT false,
	"phone_number" varchar(32),
	"profile_photo_url" varchar(1024),
	"tier" "reward_tier" DEFAULT 'BRONZE' NOT NULL,
	"wallet_address" varchar(255),
	"silver_paid" boolean DEFAULT false,
	"gold_paid" boolean DEFAULT false,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"last_active_at" timestamp,
	CONSTRAINT "users_telegram_id_unique" UNIQUE("telegram_id"),
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
ALTER TABLE "referral" ADD CONSTRAINT "referral_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referral" ADD CONSTRAINT "referral_referral_id_users_id_fk" FOREIGN KEY ("referral_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;