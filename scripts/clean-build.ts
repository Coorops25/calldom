import { rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

await rm(path.join(ROOT, 'dist', 'server'), { recursive: true, force: true });
console.log('✓ Cleaned dist/server');
