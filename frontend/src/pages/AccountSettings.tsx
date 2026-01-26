import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  CameraIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";

type SaveStatus = "success" | "error" | null;

export const AccountSettings = () => {
  /* ---------------- BASIC INFO ---------------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const authUser = useAuth();


  /* ---------------- AVATAR ---------------- */
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  /* ---------------- PASSWORD ---------------- */
  const [changePassword, setChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  /* ---------------- UI FEEDBACK ---------------- */
  const [error, setError] = useState<string>("");
  const [status, setStatus] = useState<SaveStatus>(null);

  /* ---------------- HELPERS ---------------- */

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleAvatarChange = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Avatar must be an image file");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setError("");
  };

  const validate = () => {
    if (!name.trim() || name.trim().length < 3) {
      return "Name must contain at least 3 characters";
    }

    if (!isValidEmail(email.trim())) {
      return "Please enter a valid email address";
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

    /* 
      🔧 Aqui futuramente:
      - mutation PATCH /user
      - enviar name, email
      - se avatarFile existir → multipart/form-data
      - se changePassword → enviar currentPassword + newPassword
    */

    // const updateAccountMutation = useMutation({
    //   mutationFn: 
    // })

    setStatus("success");

    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-zinc-900">
              Account settings
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Manage your personal information
            </p>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full overflow-hidden bg-zinc-200 flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserIcon className="h-8 w-8 text-zinc-500" />
                )}
              </div>

              <label className="absolute bottom-0 right-0 bg-orange-600 hover:bg-orange-700 text-white p-1.5 rounded-full cursor-pointer transition">
                <CameraIcon className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleAvatarChange(e.target.files?.[0])}
                />
              </label>
            </div>

            <div className="text-sm text-zinc-500">
              Click the camera icon to change your avatar
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-zinc-500 mb-1">
              Name
            </label>
            <div className="relative">
              <UserIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={`${authUser.user?.name}`}
                className="
                  w-full h-10 pl-9 pr-3 rounded-md
                  border border-zinc-200
                  text-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-orange-500/30
                  focus:border-orange-500
                "
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-xs font-medium text-zinc-500 mb-1">
              Email
            </label>
            <div className="relative">
              <EnvelopeIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`${authUser.user?.email}`}
                className="
                  w-full h-10 pl-9 pr-3 rounded-md
                  border border-zinc-200
                  text-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-orange-500/30
                  focus:border-orange-500
                "
              />
            </div>
          </div>

          {/* Password toggle */}
          <div className="mb-4">
            <button
              type="button"
              onClick={() => setChangePassword((prev) => !prev)}
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              {changePassword ? "Cancel password change" : "Change password"}
            </button>
          </div>

          {/* Password fields */}
          {changePassword && (
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">
                  Current password
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="
                      w-full h-10 pl-9 pr-3 rounded-md
                      border border-zinc-200
                      text-sm
                      focus:outline-none
                      focus:ring-2 focus:ring-orange-500/30
                      focus:border-orange-500
                    "
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1">
                  New password
                </label>
                <div className="relative">
                  <LockClosedIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="
                      w-full h-10 pl-9 pr-3 rounded-md
                      border border-zinc-200
                      text-sm
                      focus:outline-none
                      focus:ring-2 focus:ring-orange-500/30
                      focus:border-orange-500
                    "
                  />
                </div>
              </div>
            </div>
          )}

          {/* Feedback */}
          {error && (
            <div className="mb-4 px-3 py-2 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          {status === "success" && (
            <div className="mb-4 px-3 py-2 rounded-md bg-green-50 border border-green-200 text-sm text-green-700">
              Changes saved successfully
            </div>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            className="
              w-full h-10 rounded-md
              bg-orange-600 text-white
              text-sm font-medium
              hover:bg-orange-700 transition
            "
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
