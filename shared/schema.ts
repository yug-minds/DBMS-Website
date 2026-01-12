import { pgTable, text, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  subject: text("subject"), // Optional for some forms
  message: text("message"),
  type: text("type").notNull(), // 'general', 'admission', 'fee'
  createdAt: timestamp("created_at").defaultNow(),
});

export const careers = pgTable("careers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  position: text("position").notNull(),
  experience: text("experience"),
  resumeLink: text("resume_link"), // User can paste a link to their resume or portfolio
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  email: z.string().email(),
  phone: z.string().min(10, "Phone number is required"),
});

export const insertCareerSchema = createInsertSchema(careers).omit({ 
  id: true, 
  createdAt: true 
}).extend({
  email: z.string().email(),
  phone: z.string().min(10, "Phone number is required"),
});

export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Career = typeof careers.$inferSelect;
export type InsertCareer = z.infer<typeof insertCareerSchema>;
