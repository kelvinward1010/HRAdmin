## SETUP DATABASE
1. Install Prisma and required packages

``bash
npm install prisma --save-dev
npm install @prisma/client
``

2. Initialize Prisma

``bash
npx prisma init
``

3. Configure your database connection

``.env
DATABASE_URL="postgresql://username:password@localhost:5432/dbname"
``

4. Create a migration and generate the Prisma client

``bash
npx prisma migrate dev --name init
``

Or, if you don't want to use migrations:
``bash
npx prisma db push
``

Then, generate the Prisma client manually:
``bash
npx prisma generate
``

Reset Migration:
``bash
npx prisma migrate reset
``
