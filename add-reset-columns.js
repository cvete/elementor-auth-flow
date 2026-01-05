const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://tvstanici_user:tvstanici_pass_2025!@91.98.112.195:5432/tvstanici_db'
});

async function addResetColumns() {
  try {
    await pool.query(`
      ALTER TABLE "User"
      ADD COLUMN IF NOT EXISTS "passwordResetToken" TEXT UNIQUE,
      ADD COLUMN IF NOT EXISTS "passwordResetTokenExpires" TIMESTAMP;
    `);
    console.log('✅ Successfully added password reset columns!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await pool.end();
  }
}

addResetColumns();
