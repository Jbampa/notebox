import { Router } from "express";
import { createTrackerController, deleteTrackerController, getAllTrackersController, getTrackerController, updateTrackerController } from "./trackers.controllers";
import { isAutenticated } from "../../shared/http/middleware/isAutenticated";
import { validateResource } from "../../shared/http/middleware/validateResource";
import { createTrackerSchema, deleteTrackerSchema, updateTrackerSchema } from "./trackers.schemas";

export const trackerRoutes = Router();

trackerRoutes.get('/:trackerId', isAutenticated, getTrackerController);
trackerRoutes.get('/', isAutenticated, getAllTrackersController);
trackerRoutes.post('/', isAutenticated, validateResource(createTrackerSchema), createTrackerController);
trackerRoutes.patch('/:trackerId', isAutenticated, validateResource(updateTrackerSchema),updateTrackerController)
trackerRoutes.delete('/:trackerId', isAutenticated, validateResource(deleteTrackerSchema), deleteTrackerController);