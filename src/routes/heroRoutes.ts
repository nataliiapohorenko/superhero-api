import { Router } from 'express';
import {
  createHero,
  getAllHeroes,
  getHero,
  updateHero,
  deleteHero,
  uploadHeroImages,
  removeHeroImage,
} from '../controllers/heroController';
import { upload } from '../middleware/upload';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getAllHeroes));
router.get('/:id', asyncHandler(getHero));
router.post('/', asyncHandler(createHero));
router.put('/:id', asyncHandler(updateHero));
router.delete('/:id', asyncHandler(deleteHero));
router.post('/:id/images', upload.array('images', 5), asyncHandler(uploadHeroImages));
router.delete('/:id/images/:imageName', asyncHandler(removeHeroImage));

export default router;
