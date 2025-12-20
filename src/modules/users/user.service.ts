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

    const userExists = await findUser(user.email);

    if(userExists) {
        throw new AppError('Email already exists');
    }

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
    const result = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    return result
}

export const findUserById = async (id: number) => {
    const result = await prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
            email: true,
            name: true,
            avatar: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    return result;
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

    const { password: _, ...userWithoutPassword } = user;

    return {
        user: userWithoutPassword, 
        token: jwtToken
    }

}