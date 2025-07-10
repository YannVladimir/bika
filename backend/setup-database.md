# Database Setup Guide

## Prerequisites

1. PostgreSQL server must be running on localhost:5432
2. PostgreSQL user 'postgres' with password 'chuidesole' must exist

## Option 1: Using pgAdmin (GUI)

1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Create a new database named 'bika'
4. Run the application - it will automatically create tables and seed data

## Option 2: Using PostgreSQL Command Line (if available)

```bash
# Connect to PostgreSQL
psql -U postgres -h localhost

# Create database
CREATE DATABASE bika;

# Connect to the database
\c bika

# Exit
\q
```

## Option 3: Using Docker (if you have Docker)

```bash
# Start PostgreSQL container
docker run --name bika-postgres -e POSTGRES_PASSWORD=chuidesole -e POSTGRES_DB=bika -p 5432:5432 -d postgres:15

# The application will automatically connect and create tables
```

## Option 4: Let Spring Boot Create Everything

1. Make sure PostgreSQL is running
2. Run the application with dev profile: `mvn spring-boot:run -Dspring-boot.run.profiles=dev`
3. The application will create the database schema and seed data automatically

## Super Admin Credentials

After setup, you can login with:

- **Username**: superadmin
- **Email**: superadmin@bika.com
- **Password**: superadmin123

## Troubleshooting

- If you get connection errors, make sure PostgreSQL is running on port 5432
- If you get authentication errors, verify the username/password in application.yml
- If the database doesn't exist, create it manually or use the dev profile
