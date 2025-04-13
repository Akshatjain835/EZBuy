import {Router} from 'express';
import { addFeatureImageController, getFeatureImagesController } from '../../controllers/common/feature.controller.js';

const featureRouter = Router();

featureRouter.post("/add", addFeatureImageController);
featureRouter.get("/get", getFeatureImagesController);

export default featureRouter;