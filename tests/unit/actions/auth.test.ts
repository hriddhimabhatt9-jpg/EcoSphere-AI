import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser } from '@/actions/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Mock dependencies
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
  },
}));

describe('auth.ts actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('registerUser', () => {
    it('returns error for invalid input data', async () => {
      const formData = new FormData();
      formData.append('name', 'J'); // too short
      formData.append('email', 'not-an-email');
      formData.append('password', '123'); // too short

      const result = await registerUser(formData);
      
      expect(result.error).toBe('Invalid input data');
      expect(result.fieldErrors).toBeDefined();
    });

    it('returns error if user already exists', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'test@example.com');
      formData.append('password', 'Password123!');

      // Mock prisma to return an existing user
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce({ id: '1', email: 'test@example.com' } as any);

      const result = await registerUser(formData);
      
      expect(result.error).toBe('An account with this email already exists.');
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
      expect(prisma.user.create).not.toHaveBeenCalled();
    });

    it('creates a new user successfully', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'test@example.com');
      formData.append('password', 'Password123!');

      // Mock prisma to return null (no existing user)
      vi.mocked(prisma.user.findUnique).mockResolvedValueOnce(null);
      // Mock bcrypt hash
      vi.mocked(bcrypt.hash).mockResolvedValueOnce('hashed-password' as any);
      // Mock prisma create
      vi.mocked(prisma.user.create).mockResolvedValueOnce({ id: '1', email: 'test@example.com' } as any);

      const result = await registerUser(formData);
      
      expect(result.success).toBe(true);
      expect(bcrypt.hash).toHaveBeenCalledWith('Password123!', 12);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: 'John Doe',
          email: 'test@example.com',
          passwordHash: 'hashed-password',
          provider: 'email',
        },
      });
    });

    it('catches and returns generic error on exception', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'test@example.com');
      formData.append('password', 'Password123!');

      vi.mocked(prisma.user.findUnique).mockRejectedValueOnce(new Error('DB connection failed'));

      const result = await registerUser(formData);
      
      expect(result.error).toBe('Something went wrong. Please try again later.');
    });
  });
});
