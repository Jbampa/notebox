import { RequestHandler } from "express";
import { handleAvatar, updateUser } from "./user.service";
import { AppError } from "../../errors/AppError";
import { coverToUrl } from "../../shared/utils/cover-to-url";

export const updateUserController: RequestHandler = async (req, res) => {
  try {
    const userId = (req.user as any).id;
    const { name, email, password } = req.body;

    let avatar: string | undefined;

    if (req.file) {
      const uploadedAvatar = await handleAvatar(req.file);

      if (!uploadedAvatar) {
        throw new AppError("Image not allowed", 400);
      }

      avatar = uploadedAvatar;
    }

    const result = await updateUser({ userId, name, email, password, avatar });
    const avatarUrl = coverToUrl(avatar);

    return res.status(200).json({
      ...result,
      avatarUrl
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ err: err.message });
    }

    return res.status(500).json({
      err: "An internal server error has occurred"
    });
  }
};
