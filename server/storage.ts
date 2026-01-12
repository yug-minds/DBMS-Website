import { db } from "./db";
import {
  inquiries,
  careers,
  type InsertInquiry,
  type Inquiry,
  type InsertCareer,
  type Career
} from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  createCareerApplication(application: InsertCareer): Promise<Career>;
}

export class DatabaseStorage implements IStorage {
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const [inquiry] = await db
      .insert(inquiries)
      .values(insertInquiry)
      .returning();
    return inquiry;
  }

  async createCareerApplication(insertCareer: InsertCareer): Promise<Career> {
    const [career] = await db
      .insert(careers)
      .values(insertCareer)
      .returning();
    return career;
  }
}

export const storage = new DatabaseStorage();
