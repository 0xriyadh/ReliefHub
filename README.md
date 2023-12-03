# ReliefHub: Natural Disaster Recovery Management App

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Interact with the Database
**Create an `enum` type**
```sql
CREATE TYPE "enum_type_name" AS ENUM ('enum_value_1', 'enum_value_2', 'enum_value_3');
```
**Get all Created `enum` types**
```sql
SELECT t.typname AS enumtype, 
       e.enumlabel AS enumlabel
FROM pg_type t 
JOIN pg_enum e ON t.oid = e.enumtypid  
ORDER BY t.typname ASC, e.enumlabel ASC;
```
**Remove or Delete a type**
```sql
DROP TYPE IF EXISTS "enum_type_name";
```
**Drop all Tables, `enum` types from the Database**
```sql
DO $$ DECLARE
    r RECORD;
BEGIN
    -- Drop all tables
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;

    -- Drop all types
    FOR r IN (SELECT typname FROM pg_type WHERE typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = current_schema())) LOOP
        EXECUTE 'DROP TYPE IF EXISTS ' || quote_ident(r.typname) || ' CASCADE';
    END LOOP;
END $$;
```