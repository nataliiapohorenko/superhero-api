Superhero Management App
This is a full-stack web application for managing superheroes and their images. It includes features for creating, updating, listing, deleting heroes, and uploading images to Cloudinary.

🧩 Technologies Used:
Express.js
Prisma ORM (with PostgreSQL)
Multer for file handling
Cloudinary for image storage
Vitest & Supertest for testing

Backend Setup 

1. Install dependencies:
npm install

2. Set up environment variables in .env:
DATABASE_URL=your_postgresql_url
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

3. Migrate Prisma schema to database:
npx prisma migrate deploy

4. Generate Prisma Client
npx prisma generate

5. Run seed file
npx tsx prisma/seed.ts

6. Start the server:
npm run dev

7. Run backend tests:
npx vitest run

🧪 Backend Test Coverage:
Hero CRUD operations
Image upload/delete logic
Error handling (404, 400, etc.)
