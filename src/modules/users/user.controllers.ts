import { RequestHandler } from "express";
import { handleAvatar, updateUser, findUserById } from "./user.service";
import { AppError } from "../../errors/AppError";
import { avatarToUrl } from "../../shared/utils/cover-to-url";
import fs from "fs/promises";
import path from "path";

export const updateUserController: RequestHandler = async (req, res) => {
  try {
    const userId = (req.user as any).id;
    const { name, currentPassword, password, removeAvatar } = req.body;

    const user = await findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    let avatar: string | null | undefined = undefined;

    if (req.file) {
      const uploadedAvatar = await handleAvatar(req.file);

      if (!uploadedAvatar) {
        throw new AppError("Image not allowed", 400);
      }

      if (user.avatar) {
        const oldAvatarPath = path.resolve(
          "public/images/avatar",
          user.avatar
        );

        try {
          await fs.unlink(oldAvatarPath);
        } catch {
        }
      }

      avatar = uploadedAvatar;
    }

    else if (removeAvatar === "true") {
      avatar = null; 
    }
    
    const result = await updateUser({
      userId,
      name,
      currentPassword,
      password,
      avatar,
    });

    return res.status(200).json({
      ...result,
      avatarUrl: result.avatar ? avatarToUrl(result.avatar) : null,
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ err: err.message });
    }

    return res.status(500).json({
      err: "An internal server error has occurred",
    });
  }
};
