-- Create database for the app
CREATE DATABASE tvstanici_db;

-- Create a user for the app
CREATE USER tvstanici_user WITH PASSWORD 'tvstanici_password_2025';

-- Grant privileges to the user on the database
GRANT ALL PRIVILEGES ON DATABASE tvstanici_db TO tvstanici_user;

-- Connect to the new database
\c tvstanici_db

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO tvstanici_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO tvstanici_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO tvstanici_user;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO tvstanici_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO tvstanici_user;
