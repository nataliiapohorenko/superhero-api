-- CreateTable
CREATE TABLE "Superhero" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT,
    "origin_description" TEXT,
    "superpowers" TEXT[],
    "catch_phrase" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Superhero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "heroId" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_heroId_fkey" FOREIGN KEY ("heroId") REFERENCES "Superhero"("id") ON DELETE CASCADE ON UPDATE CASCADE;
