import { RequestHandler } from "express";
import { authenticateUser, createUser, findUser } from "../users/user.service";
import { AppError } from "../../errors/AppError";

export const authSignupController: RequestHandler = async (req, res) => {

    try {
        const user = await createUser(req.body);

        console.log('chegou aqui');

        const response = {
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
        }

        console.log(response);

        res.status(201).json({
            response
        })
    } catch(error) {
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                err: error.message
            })
        }


        return res.status(500).json({
            message: 'An internal server occurred '
        })
    }

}

export const authSigninController: RequestHandler = async (req, res) => {
    try {
        const {email, password} =  req.body;

        const authUser = await authenticateUser(email, password);

        const response = {
            user: {
                id: authUser.user.id,
                name: authUser.user.name,
                email: authUser.user.email
            },
            token: authUser.token
        }

        res.status(200).json(response)

    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                error: err.message
            })
        }

        return res.status(500).json(
            {
                error: "An internal server error occurred"
            }
        )

    }
}