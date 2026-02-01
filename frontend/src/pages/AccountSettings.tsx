import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CameraIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../services/user";

type SaveStatus = "success" | "error" | null;

export const AccountSettings = () => {
  const authUser = useAuth();

  /* ---------------- BASIC INFO ---------------- */
  const [name, setName] = useState(authUser.user?.name);

  /* ---------------- AVATAR ---------------- */
  const [avatarPreview, setAvatarPreview] = useState<
    string | null | undefined
  >(authUser.user?.avatarUrl);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);

  /* ---------------- PASSWORD ---------------- */
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /* ---------------- UI FEEDBACK ---------------- */
  const [error, setError] = useState("");
  const [status, setStatus] = useState<SaveStatus>(null);

  /* ---------------- MUTATION ---------------- */
  const updateAccountMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      setStatus("success");
      setError("");
      authUser.fetchUser();
      setTimeout(() => setStatus(null), 3000);
    },
    onError: (err: any) => {
      setStatus("error");
      setError(
        err?.response?.data?.err ||
          "Failed to update account. Please try again."
      );
    },
  });

  /* ---------------- HELPERS ---------------- */

  const handleAvatarChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Avatar must be an image file");
      return;
    }

    if (avatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setRemoveAvatar(false);
    setError("");
  };

  const handleRemoveAvatar = () => {
    if (avatarPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatar(true);
    setError("");
  };

  const validate = () => {
    if (!name || !name.trim() || name.trim().length < 3) {
      return "Name must contain at least 3 characters";
    }

    if (changePassword) {
      if (!currentPassword.trim()) {
        return "Current password is required";
      }
      if (newPassword.trim().length < 4) {
        return "New password must contain at least 4 characters";
      }
    }

    return null;
  };

  const handleSave = () => {
    setError("");
    setStatus(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    updateAccountMutation.mutate({
      name: name || undefined,
      currentPassword: changePassword ? currentPassword : undefined,
      password: changePassword ? newPassword : undefined,
      avatar: avatarFile,
      removeAvatar
    });
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8">
          {/* Header */}
          <div className="mb-10 border-b border-zinc-100 pb-6">
            <h1 className="text-xl font-bold text-zinc-900">
              Account settings
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your personal information and public profile
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12">
            {/* Avatar column */}
            <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
              <div className="relative mb-4">
                <div className="h-32 w-32 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center border-4 border-white shadow-sm">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-12 w-12 text-zinc-500" />
                  )}
                </div>

                {/* Upload */}
                <label className="absolute bottom-1 right-1 bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-full cursor-pointer transition shadow-md">
                  <CameraIcon className="h-5 w-5" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleAvatarChange(e.target.files?.[0])
                    }
                  />
                </label>

                {/* Remove avatar */}
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    title="Remove avatar"
                    className="
                      absolute -top-2 -right-2
                      bg-zinc-800/80 hover:bg-red-600
                      text-white
                      rounded-full p-1.5
                      transition
                    "
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="text-center md:text-left">
                <h2 className="font-semibold text-zinc-900 truncate">
                  {name || authUser.user?.name}
                </h2>
                <p className="text-xs text-zinc-500 truncate">
                  {authUser.user?.email}
                </p>
              </div>
            </div>

            {/* Form column */}
            <div className="flex-1 space-y-6">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-lg border border-zinc-200 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              {/* Email (readonly) */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <EnvelopeIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <div className="w-full h-11 pl-10 pr-3 rounded-lg border border-zinc-100 bg-zinc-50 text-sm flex items-center text-zinc-400 cursor-not-allowed">
                    {authUser.user?.email}
                  </div>
                </div>
              </div>

              {/* Password toggle */}
              <button
                type="button"
                onClick={() => setChangePassword((prev) => !prev)}
                className="text-sm font-medium text-orange-600 hover:text-orange-700 transition w-100 text-start"
              >
                {changePassword
                  ? "✕ Cancel password change"
                  : "→ Change security password"}
              </button>

              {changePassword && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) =>
                      setCurrentPassword(e.target.value)
                    }
                    className="h-10 px-3 rounded-md border border-zinc-200 text-sm"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="h-10 px-3 rounded-md border border-zinc-200 text-sm"
                  />
                </div>
              )}

              {/* Feedback */}
              {error && (
                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-700">
                  {error}
                </div>
              )}
              {status === "success" && (
                <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-700">
                  Changes saved successfully
                </div>
              )}

              {/* Save */}
              <button
                onClick={handleSave}
                disabled={updateAccountMutation.isPending}
                className="px-10 h-11 rounded-lg bg-orange-600 text-white text-sm font-bold hover:bg-orange-700 transition shadow-md disabled:opacity-50"
              >
                {updateAccountMutation.isPending
                  ? "Saving..."
                  : "Save all changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
