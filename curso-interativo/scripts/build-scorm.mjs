#!/usr/bin/env node
// ============================================================================
// EcoSabon — SCORM Package Builder
// ============================================================================
// Copia o build do Vite + imsmanifest.xml para um pacote .zip SCORM 1.2.
// Uso: node scripts/build-scorm.mjs
// ============================================================================

import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const scormDir = join(root, 'dist-scorm');
const manifestSrc = join(root, 'scorm', 'imsmanifest.xml');

console.log('🏗️  Building standalone with Vite...');
execSync('npx vite build', { cwd: root, stdio: 'inherit' });

console.log('📦  Preparing SCORM package...');
if (existsSync(scormDir)) {
  execSync(`rm -rf "${scormDir}"`);
}
mkdirSync(scormDir, { recursive: true });

// Copy Vite build output
cpSync(distDir, scormDir, { recursive: true });

// Copy SCORM manifest
cpSync(manifestSrc, join(scormDir, 'imsmanifest.xml'));

// Create ZIP
const zipPath = join(root, 'ecosabon-curso-scorm.zip');
console.log('📦  Creating SCORM .zip...');
execSync(`cd "${scormDir}" && zip -r "${zipPath}" .`, { stdio: 'inherit' });

console.log(`✅  SCORM package ready: ${zipPath}`);
console.log('📤  Upload this .zip to your LMS (Moodle, Canvas, etc.)');
