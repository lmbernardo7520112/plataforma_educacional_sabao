// server/schemas/auth.schema.test.ts

import { describe, it, expect } from 'vitest';
import { teacherRegisterSchema, teacherLoginSchema, squadLoginSchema } from './auth.schema.ts';

describe('Auth Schemas', () => {
  describe('teacherRegisterSchema', () => {
    it('should accept valid registration payload', () => {
      const result = teacherRegisterSchema.safeParse({
        body: { name: 'Prof. Silva', email: 'silva@school.edu', password: 'secret123' },
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing name', () => {
      const result = teacherRegisterSchema.safeParse({
        body: { email: 'silva@school.edu', password: 'secret123' },
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email format', () => {
      const result = teacherRegisterSchema.safeParse({
        body: { name: 'Prof. Silva', email: 'not-an-email', password: 'secret123' },
      });
      expect(result.success).toBe(false);
    });

    it('should reject short password', () => {
      const result = teacherRegisterSchema.safeParse({
        body: { name: 'Prof. Silva', email: 'silva@school.edu', password: '123' },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('teacherLoginSchema', () => {
    it('should accept valid login payload', () => {
      const result = teacherLoginSchema.safeParse({
        body: { email: 'silva@school.edu', password: 'secret123' },
      });
      expect(result.success).toBe(true);
    });

    it('should reject missing email', () => {
      const result = teacherLoginSchema.safeParse({
        body: { password: 'secret123' },
      });
      expect(result.success).toBe(false);
    });

    it('should reject empty password', () => {
      const result = teacherLoginSchema.safeParse({
        body: { email: 'silva@school.edu', password: '' },
      });
      expect(result.success).toBe(false);
    });
  });

  describe('squadLoginSchema', () => {
    it('should accept valid ObjectId', () => {
      const result = squadLoginSchema.safeParse({
        body: { squadId: '507f1f77bcf86cd799439011' },
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid ObjectId format', () => {
      const result = squadLoginSchema.safeParse({
        body: { squadId: 'not-a-valid-id' },
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing squadId', () => {
      const result = squadLoginSchema.safeParse({
        body: {},
      });
      expect(result.success).toBe(false);
    });
  });
});
