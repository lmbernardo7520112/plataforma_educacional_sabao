// server/services/squadService.test.ts

import { describe, it, expect } from 'vitest';
import { SquadService } from './squadService.js';

describe('SquadService — Access Code Cryptography', () => {
  describe('generateAccessCode', () => {
    it('should generate an 8-character uppercase code', () => {
      const code = SquadService.generateAccessCode();
      expect(code).toHaveLength(8);
      expect(code).toMatch(/^[A-Z0-9_-]+$/);
      expect(code).toBe(code.toUpperCase());
    });

    it('should generate unique codes on consecutive calls', () => {
      const codes = new Set<string>();
      for (let i = 0; i < 100; i++) {
        codes.add(SquadService.generateAccessCode());
      }
      // With 36^8 space, 100 codes should all be unique
      expect(codes.size).toBe(100);
    });
  });

  describe('hashAccessCode', () => {
    it('should return a 64-char hex SHA-256 hash', () => {
      const hash = SquadService.hashAccessCode('ABCD1234');
      expect(hash).toHaveLength(64);
      expect(hash).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should be deterministic (same code → same hash)', () => {
      const hash1 = SquadService.hashAccessCode('TESTCODE');
      const hash2 = SquadService.hashAccessCode('TESTCODE');
      expect(hash1).toBe(hash2);
    });

    it('should be case-insensitive (uppercased internally)', () => {
      const hash1 = SquadService.hashAccessCode('AbCd1234');
      const hash2 = SquadService.hashAccessCode('ABCD1234');
      expect(hash1).toBe(hash2);
    });

    it('should produce different hashes for different codes', () => {
      const hash1 = SquadService.hashAccessCode('CODE0001');
      const hash2 = SquadService.hashAccessCode('CODE0002');
      expect(hash1).not.toBe(hash2);
    });
  });

  describe('verifyAccessCode', () => {
    it('should return true for matching code and hash', () => {
      const code = 'TESTCODE';
      const hash = SquadService.hashAccessCode(code);
      expect(SquadService.verifyAccessCode(code, hash)).toBe(true);
    });

    it('should return true for case-insensitive match', () => {
      const hash = SquadService.hashAccessCode('MYCODE99');
      expect(SquadService.verifyAccessCode('mycode99', hash)).toBe(true);
    });

    it('should return false for non-matching code', () => {
      const hash = SquadService.hashAccessCode('RIGHTCODE');
      expect(SquadService.verifyAccessCode('WRONGCODE', hash)).toBe(false);
    });

    it('should use timing-safe comparison', () => {
      // This test verifies the function doesn't throw on valid hex inputs
      const code = SquadService.generateAccessCode();
      const hash = SquadService.hashAccessCode(code);
      expect(() => SquadService.verifyAccessCode(code, hash)).not.toThrow();
    });
  });

  describe('full flow: generate → hash → verify', () => {
    it('should generate code that verifies against its own hash', () => {
      const code = SquadService.generateAccessCode();
      const hash = SquadService.hashAccessCode(code);
      
      // Plaintext code verifies against hash
      expect(SquadService.verifyAccessCode(code, hash)).toBe(true);
      
      // Different code does not verify
      const otherCode = SquadService.generateAccessCode();
      expect(SquadService.verifyAccessCode(otherCode, hash)).toBe(false);
    });

    it('should not store or return hash from generateAccessCode', () => {
      const code = SquadService.generateAccessCode();
      // The code itself is NOT a hash (8 chars, not 64)
      expect(code).toHaveLength(8);
      expect(code).not.toMatch(/^[a-f0-9]{64}$/);
    });
  });
});
