// Apply migration manually
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const migrationPath = path.join(process.cwd(), 'prisma', 'migrations', '20251230001237_init', 'migration.sql');

console.log('Database path:', dbPath);
console.log('Migration path:', migrationPath);

try {
  const db = new Database(dbPath);
  const migration = fs.readFileSync(migrationPath, 'utf8');

  console.log('Applying migration...');
  db.exec(migration);

  // Verify tables were created
  const result = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('✓ Migration applied successfully!');
  console.log('Tables in database:', result);

  db.close();
} catch (error) {
  console.error('✗ Migration failed:', error);
}
