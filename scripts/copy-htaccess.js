#!/usr/bin/env node

/**
 * Copy .htaccess file to build output directory
 * This script ensures .htaccess is available for Hostinger deployment
 */

import { copyFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const htaccessSource = join(projectRoot, '.htaccess');
const htaccessDest = join(projectRoot, 'dist', 'public', '.htaccess');

try {
  // Check if .htaccess exists
  if (!existsSync(htaccessSource)) {
    console.error('❌ Error: .htaccess file not found in project root');
    process.exit(1);
  }

  // Copy .htaccess to dist/public
  copyFileSync(htaccessSource, htaccessDest);
  console.log('✓ .htaccess copied to dist/public');
} catch (error) {
  console.error('❌ Error copying .htaccess:', error.message);
  process.exit(1);
}
