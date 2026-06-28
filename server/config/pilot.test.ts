// server/config/pilot.test.ts

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  isPilotModeEnabled,
  getAllowedTeacherEmails,
  normalizeEmail,
  isTeacherAllowedInPilot,
  isPublicRegistrationDisabledInPilot,
} from './pilot.js';

describe('Restricted Pilot Mode Policies', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    // Reset process.env before each test
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    // Restore process.env after each test
    process.env = originalEnv;
  });

  describe('isPilotModeEnabled', () => {
    it('should return true when PILOT_MODE is "true"', () => {
      process.env.PILOT_MODE = 'true';
      expect(isPilotModeEnabled()).toBe(true);
    });

    it('should return false when PILOT_MODE is "false"', () => {
      process.env.PILOT_MODE = 'false';
      expect(isPilotModeEnabled()).toBe(false);
    });

    it('should return false when PILOT_MODE is not set', () => {
      delete process.env.PILOT_MODE;
      expect(isPilotModeEnabled()).toBe(false);
    });
  });

  describe('normalizeEmail', () => {
    it('should convert email to lower case and trim whitespace', () => {
      expect(normalizeEmail('  PROFESSOR@example.com  ')).toBe('professor@example.com');
    });

    it('should return empty string if email is falsy', () => {
      expect(normalizeEmail(undefined)).toBe('');
      expect(normalizeEmail('')).toBe('');
    });
  });

  describe('getAllowedTeacherEmails', () => {
    it('should return empty array if PILOT_ALLOWED_TEACHER_EMAILS is not set', () => {
      delete process.env.PILOT_ALLOWED_TEACHER_EMAILS;
      expect(getAllowedTeacherEmails()).toEqual([]);
    });

    it('should parse comma-separated emails, trim and normalize them', () => {
      process.env.PILOT_ALLOWED_TEACHER_EMAILS = ' LEONARDO@example.com , nadja@example.com ';
      expect(getAllowedTeacherEmails()).toEqual(['leonardo@example.com', 'nadja@example.com']);
    });
  });

  describe('isTeacherAllowedInPilot', () => {
    it('should return true if pilot mode is disabled', () => {
      process.env.PILOT_MODE = 'false';
      expect(isTeacherAllowedInPilot('random@example.com')).toBe(true);
    });

    it('should return true if pilot mode is enabled and email is in allowlist', () => {
      process.env.PILOT_MODE = 'true';
      process.env.PILOT_ALLOWED_TEACHER_EMAILS = 'leonardo@example.com,nadja@example.com';
      expect(isTeacherAllowedInPilot('LEONARDO@example.com')).toBe(true);
      expect(isTeacherAllowedInPilot('nadja@example.com')).toBe(true);
    });

    it('should return false if pilot mode is enabled and email is not in allowlist', () => {
      process.env.PILOT_MODE = 'true';
      process.env.PILOT_ALLOWED_TEACHER_EMAILS = 'leonardo@example.com,nadja@example.com';
      expect(isTeacherAllowedInPilot('random@example.com')).toBe(false);
    });
  });

  describe('isPublicRegistrationDisabledInPilot', () => {
    it('should return true if PILOT_MODE is enabled', () => {
      process.env.PILOT_MODE = 'true';
      expect(isPublicRegistrationDisabledInPilot()).toBe(true);
    });

    it('should return false if PILOT_MODE is disabled', () => {
      process.env.PILOT_MODE = 'false';
      expect(isPublicRegistrationDisabledInPilot()).toBe(false);
    });
  });
});
