import { compare, hash } from "bcryptjs";
import { Prisma, User } from "@prisma/client";
import { prisma } from '../../shared/database/prisma'
import { AppError } from "../../errors/AppError";
import { createJwt } from "../../shared/utils/jwt";

export const encryptPassword = async (password: string) => {
    const hashPassword = hash(password, 8)
    return hashPassword;
}

export const createUser = async (user: Prisma.UserCreateInput) => {
    const encryptedPassword = await encryptPassword(user.password);

    const result = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: encryptedPassword
        }
    })

    return result
}

export const findUser = async (email: string) => {
    const result = prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return result
}

export const findUserById = async (id: number) => {
    const result = prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return result
}

export const authenticateUser = async (email: string, password: string) => {

    const user: User | null = await findUser(email);

    if (!user) {
        throw new AppError('Invalid Email or password', 401);
    }

    const isPasswordCorrect =  user ? compare(password, user.password) : false;

    if (!isPasswordCorrect) {
        throw new AppError('Invalid Email or password', 401);
    }

    const jwtToken = createJwt(user.id);

    return {
        user, 
        token: jwtToken
    }

}