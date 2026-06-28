// server/config/pilot.ts

import dotenv from 'dotenv';

dotenv.config();

/**
 * Checks if the restricted pilot mode is active.
 * @returns boolean
 */
export function isPilotModeEnabled(): boolean {
  return process.env.PILOT_MODE === 'true';
}

/**
 * Normalizes an email address by converting it to lowercase and trimming whitespace.
 * @param email - The email to normalize
 * @returns string
 */
export function normalizeEmail(email?: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Returns the normalized list of allowed teacher email addresses from env.
 * @returns string[]
 */
export function getAllowedTeacherEmails(): string[] {
  const envVal = process.env.PILOT_ALLOWED_TEACHER_EMAILS;
  if (!envVal) return [];
  
  return envVal
    .split(',')
    .map(email => normalizeEmail(email))
    .filter(Boolean);
}

/**
 * Validates if the given teacher email is authorized to access the system.
 * If PILOT_MODE is false or undefined, all emails are allowed.
 * If PILOT_MODE is true, only emails in the allowlist are permitted.
 * @param email - The email to check
 * @returns boolean
 */
export function isTeacherAllowedInPilot(email: string): boolean {
  if (!isPilotModeEnabled()) {
    return true;
  }
  
  const normalized = normalizeEmail(email);
  const allowlist = getAllowedTeacherEmails();
  
  return allowlist.includes(normalized);
}

/**
 * Asserts that the teacher is allowed in the pilot mode. Throws an error if not.
 * @param email - The email to check
 */
export function assertTeacherAllowedInPilot(email: string): void {
  if (!isTeacherAllowedInPilot(email)) {
    const err = new Error('Acesso restrito ao piloto autorizado.');
    (err as unknown as { code: string }).code = 'FORBIDDEN';
    throw err;
  }
}

/**
 * Checks if public registration should be disabled.
 * Public registration is disabled if PILOT_MODE is active.
 * @returns boolean
 */
export function isPublicRegistrationDisabledInPilot(): boolean {
  return isPilotModeEnabled();
}
