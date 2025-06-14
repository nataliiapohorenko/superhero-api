import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
export type HeroWithImages = Awaited<
  ReturnType<typeof prisma.superhero.findFirst>
> & { images: { id: string; url: string }[] };