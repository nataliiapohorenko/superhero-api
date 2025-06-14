import request from 'supertest';
import app from '../../app';
import { prisma } from '../../prisma/client';
import { afterAll, beforeAll, expect, vi, describe, it } from 'vitest';
import path from 'path';
import fs from 'fs';

vi.mock('../../cloudinary/config', () => ({
  cloudinary: {
    uploader: {
      destroy: vi.fn().mockResolvedValue({}),
      upload_stream: vi.fn(() => vi.fn()),
    },
  },
}));

describe('Hero Service', () => {
  let heroId: string;

  beforeAll(async () => {
    const hero = await prisma.superhero.create({
      data: {
        nickname: 'Test Hero',
        real_name: 'John Doe',
        origin_description: 'Origin',
        superpowers: ['strength'],
        catch_phrase: 'Boom!'
      },
    });
    heroId = hero.id;
  });

  afterAll(async () => {
    await prisma.image.deleteMany();
    await prisma.superhero.deleteMany();
    await prisma.$disconnect();
  });

  it('should fetch paginated heroes', async () => {
    const res = await request(app).get('/api/heroes?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('heroes');
    expect(res.body).toHaveProperty('total');
  });

  it('should create a hero', async () => {
    const res = await request(app).post('/api/heroes').send({
      nickname: 'New Hero',
      real_name: 'Clark Kent',
      origin_description: 'Krypton',
      superpowers: ['X-ray vision'],
      catch_phrase: 'Up, up, and away!',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.nickname).toBe('New Hero');
  });

  it('should fetch single hero', async () => {
    const res = await request(app).get(`/api/heroes/${heroId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(heroId);
  });

  it('should update hero', async () => {
    const res = await request(app).put(`/api/heroes/${heroId}`).send({
      nickname: 'Updated Hero',
      real_name: 'Jane Doe',
      origin_description: 'Updated Origin',
      superpowers: ['flight'],
      catch_phrase: 'Zoom!',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.nickname).toBe('Updated Hero');
  });

  it('should return 404 for missing hero', async () => {
    const res = await request(app).get('/api/heroes/missing-id');
    expect(res.statusCode).toBe(404);
  });

  it('should delete hero and images', async () => {
    const hero = await prisma.superhero.create({
      data: {
        nickname: 'Delete Me',
        real_name: '',
        origin_description: '',
        superpowers: [],
        catch_phrase: '',
      },
    });
    const res = await request(app).delete(`/api/heroes/${hero.id}`);
    expect(res.statusCode).toBe(204);
  });

  it('should return 404 when deleting non-existent hero', async () => {
    const res = await request(app).delete('/api/heroes/nonexistent');
    expect(res.statusCode).toBe(404);
  });

  it('should return 400 if no image files are provided', async () => {
    const res = await request(app).post(`/api/heroes/${heroId}/images`).attach('images', '');
    expect(res.statusCode).toBe(400);
  });

  it('should return 404 when uploading image to non-existent hero', async () => {
    const imgDir = path.join(__dirname, '../assets');
    const imgPath = path.join(imgDir, 'test.jpg');

    fs.mkdirSync(imgDir, { recursive: true });
    fs.writeFileSync(imgPath, 'fake-image-data');

    const res = await request(app)
      .post(`/heroes/nonexistent/images`)
      .attach('images', imgPath);

    expect(res.statusCode).toBe(404);
    fs.unlinkSync(imgPath);
  });

  it('should return 404 when removing non-existent image', async () => {
    const res = await request(app).delete(`/api/heroes/${heroId}/images/nonexistent.jpg`);
    expect(res.statusCode).toBe(404);
  });
});
