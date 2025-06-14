import { Request, Response } from 'express';
import { prisma, HeroWithImages } from '../prisma/client';
import { cloudinary } from '../cloudinary/config';

export const getAllHeroes = async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const [heroes, total] = await Promise.all([
    prisma.superhero.findMany({
      skip,
      take: limit,
      include: {
        images: {
          take: 1,
        },
      },
    }),
    prisma.superhero.count(),
  ]);

  const heroesBase = heroes.map((hero: HeroWithImages) => ({
    id: hero.id,
    nickname: hero.nickname,
    images: hero.images
  }))

  res.json({ heroes: heroesBase, total });
};

export const getHero = async (req: Request, res: Response): Promise<void> => {
  const hero = await prisma.superhero.findUnique({
    where: { id: req.params.id },
    include: { images: true },
  });

  if (!hero) {
    res.status(404).json({ message: 'Hero not found' });
    return;
  }

  res.json(hero);
};

export const createHero = async (req: Request, res: Response): Promise<void> => {
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

  const newHero = await prisma.superhero.create({
    data: {
      nickname,
      real_name,
      origin_description,
      superpowers: typeof superpowers === 'string' ? JSON.parse(superpowers) : superpowers,
      catch_phrase,
    },
  });

  res.status(201).json(newHero);
};

export const updateHero = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nickname, real_name, origin_description, superpowers, catch_phrase } = req.body;

  try {
    const updatedHero = await prisma.superhero.update({
      where: { id },
      data: {
        nickname,
        real_name,
        origin_description,
        superpowers: typeof superpowers === 'string' ? JSON.parse(superpowers) : superpowers,
        catch_phrase,
      },
    });

    res.json(updatedHero);
  } catch (err) {
    res.status(404).json({ message: 'Hero not found' });
  }
};

export const deleteHero = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const hero = await prisma.superhero.findUnique({ 
    where: { id },
    include: { images: true },
  });
  if (!hero) {
    res.status(404).json({ message: 'Hero not found' });
    return
  }
  try {
    for (const image of hero.images) {
      const publicId = image.url.split('/').slice(-1)[0].split('.')[0];
      await cloudinary.uploader.destroy(`superheroes/${publicId}`);
    }
    await prisma.superhero.delete({ where: { id } });
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ message: 'Failed to delete hero' });
  }
};

export const uploadHeroImages = async (req: Request, res: Response): Promise<void> => {
  const heroId = req.params.id;
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    res.status(400).json({ message: 'No files provided' });
    return
  }

  const hero = await prisma.superhero.findUnique({ where: { id: heroId } });
  if (!hero) {
    res.status(404).json({ message: 'Hero not found' });
    return
  }

  try {
    const uploads = await Promise.all(
      files.map((file) => {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'superheroes' },
            async (error, result) => {
              if (error || !result) {
                return reject(error);
              }

              const created = await prisma.image.create({
                data: {
                  url: result.secure_url,
                  heroId,
                },
              });
              resolve(created);
            }
          );

          uploadStream.end(file.buffer);
        });
      })
    );

    res.status(200).json(uploads);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload image(s)' });
  }
};

export const removeHeroImage = async (req: Request, res: Response): Promise<void> => {
  const { id: heroId, imageName } = req.params;

  const image = await prisma.image.findFirst({
    where: {
      heroId,
      url: {
        contains: imageName,
      },
    },
  });

  if (!image) {
    res.status(404).json({ message: 'Image not found' });
    return;
  }

  const publicId = image.url.split('/').slice(-1)[0].split('.')[0];
  try {
    await cloudinary.uploader.destroy(`superheroes/${publicId}`);
  } catch (err) {
    console.warn('Could not delete from Cloudinary:', err);
  }

  await prisma.image.delete({
    where: { id: image.id },
  });

  res.sendStatus(204);
};
