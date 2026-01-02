// Test database connection
const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
console.log('Database path:', dbPath);
console.log('DATABASE_URL from env:', process.env.DATABASE_URL);

try {
  const db = new Database(dbPath);
  console.log('✓ Database connection successful!');

  // Test query
  const result = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
  console.log('Tables in database:', result);

  db.close();
} catch (error) {
  console.error('✗ Database connection failed:', error);
}
