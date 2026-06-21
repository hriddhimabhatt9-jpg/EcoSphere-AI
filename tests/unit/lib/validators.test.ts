import { describe, it, expect } from 'vitest';
import { RegistrationSchema, LoginSchema, ActivitySchema } from '@/lib/validators';

describe('validators.ts', () => {
  describe('RegistrationSchema', () => {
    it('validates a correct registration payload', () => {
      const result = RegistrationSchema.safeParse({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'Password123'
      });
      expect(result.success).toBe(true);
    });

    it('rejects an invalid email', () => {
      const result = RegistrationSchema.safeParse({
        name: 'John Doe',
        email: 'invalid-email',
        password: 'Password123'
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email format');
      }
    });

    it('rejects a short password without uppercase', () => {
      const result = RegistrationSchema.safeParse({
        name: 'John',
        email: 'john@example.com',
        password: 'short'
      });
      expect(result.success).toBe(false);
    });
  });

  describe('LoginSchema', () => {
    it('validates a correct login payload', () => {
      const result = LoginSchema.safeParse({
        email: 'john@example.com',
        password: 'Password123'
      });
      expect(result.success).toBe(true);
    });

    it('rejects an empty password', () => {
      const result = LoginSchema.safeParse({
        email: 'john@example.com',
        password: ''
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ActivitySchema', () => {
    it('validates a correct activity payload', () => {
      const result = ActivitySchema.safeParse({
        type: 'transport',
        value: 10,
        unit: 'miles',
        date: new Date().toISOString()
      });
      expect(result.success).toBe(true);
    });

    it('rejects an invalid activity type', () => {
      const result = ActivitySchema.safeParse({
        type: 'invalid',
        value: 10,
        unit: 'miles',
        date: new Date().toISOString()
      });
      expect(result.success).toBe(false);
    });

    it('rejects negative values', () => {
      const result = ActivitySchema.safeParse({
        type: 'transport',
        value: -5,
        unit: 'miles',
        date: new Date().toISOString()
      });
      expect(result.success).toBe(false);
    });
  });
});
