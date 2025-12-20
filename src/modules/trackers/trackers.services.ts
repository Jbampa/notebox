import { AppError } from "../../errors/AppError"
import { prisma } from "../../shared/database/prisma"

type createTrackerDTO = {
    userId: number, 
    title: string,
    isCurrency?: boolean,
    isInteger?: boolean,
    stepValue: number
}

export const createTracker = async ({userId, title, isCurrency, isInteger, stepValue}: createTrackerDTO) => {
    const result = prisma.tracker.create({
        data: {
            title,
            isCurrency,
            isInteger,
            stepValue,
            userId
        }
    })

    return result;
}

export const getAllTrackers = async (userId: number) => {
    const result = await prisma.tracker.findMany({
        where: {
            userId: userId
        }
    })

    return result;
}

export const findTracker = async (trackerId: number, userId: number) => {
    const result = prisma.tracker.findFirst({
        where: {
            id: trackerId,
            userId: userId
        }
    })

    return result;
}

type updateTrackerDTO = {
    trackerId: number,
    userId: number,
    title: string,
    value: number,
    isCurrency: boolean,
    isInteger: boolean,
    stepValue: number
}

export const updateTracker = async ({trackerId, userId, title, value, isCurrency, isInteger, stepValue}: updateTrackerDTO) => {
    const tracker = await findTracker(trackerId, userId);

    if(!tracker) {
        throw new AppError("Tracker not found or access denied");
    }

    const result = await prisma.tracker.update({
        data: {
            title,
            value,
            isCurrency,
            isInteger,
            stepValue
        },
        where: {
            id: trackerId
        }
    })

    return result;
}

export const deleteTracker = async (trackerId: number, userId: number) => {
    const tracker = await findTracker(trackerId, userId);

    if(!tracker) {
        throw new AppError("Tracker not found or access denied")
    }

    const result = await prisma.tracker.delete({
        where: {
            id: trackerId
        }
    })

    return result;
}