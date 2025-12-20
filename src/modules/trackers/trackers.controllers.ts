import { RequestHandler } from "express";
import { AppError } from "../../errors/AppError";
import { createTracker, deleteTracker, findTracker, getAllTrackers, updateTracker } from "./trackers.services";

export const getAllTrackersController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;

        const trackers = await getAllTrackers(userId);

        return res.status(200).json(trackers);
    } catch(err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }
    }
}

export const getTrackerController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {trackerId} = req.params;
        const trackerIdAsNumber = Number(trackerId);

        const tracker = await findTracker(trackerIdAsNumber, userId);

        return res.status(200).json(tracker);
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }
        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}

export const createTrackerController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;

        const {title, isCurrency, isInteger, stepValue} =  req.body;

        const tracker = await createTracker({userId, title, isCurrency, isInteger, stepValue})

        return res.status(200).json(tracker);
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json(err)
        }
        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}

export const deleteTrackerController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {trackerId} = req.params;

        const trackerIdAsNumber = Number(trackerId)

        const tracker = await deleteTracker(trackerIdAsNumber, userId);

        return res.status(204).json({})
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }
        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}

export const updateTrackerController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;

        const {title, value, isCurrency, isInteger, stepValue} = req.body;

        const {trackerId} = req.params;
        const trackerIdAsNumber = Number(trackerId);

        const tracker = await updateTracker({trackerId: trackerIdAsNumber, userId, title, value, isCurrency, isInteger, stepValue});

        return res.status(200).json(tracker);
    } catch(err) {
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                err: err.message
            })
        }
        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}