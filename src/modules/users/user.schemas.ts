import z from 'zod';

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string()
      .min(3, "Name is too short")
      .max(50, "Name is too long")
      .optional(),
    currentPassword: z.string().optional(),
    password: z.string().min(4, "New password is too short").optional(),
    avatar: z.any().optional(), 
  })
  .strict()
  .refine((data) => {
    const hasName = !!data.name;
    const hasNewPassword = !!data.password;
    const hasAvatar = !!data.avatar;

    return hasName || hasNewPassword || hasAvatar;
  }, {
    message: "You must provide at least one field to update (name, password, or avatar)",
    path: ["name"], 
  })
  .refine((data) => {
    if (data.password && !data.currentPassword) return false;
    if (!data.password && data.currentPassword) return false;
    return true;
  }, {
    message: "Both current password and new password must be provided together",
    path: ["password"],
  })
});