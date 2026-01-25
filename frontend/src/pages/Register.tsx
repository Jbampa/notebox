import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { signUp } from "../services/auth";
import { useNavigate } from "react-router-dom";

/* -------- helpers -------- */

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorCreating, setErrorCreating] = useState("");

  const navigate = useNavigate();

  const createUserMutation = useMutation({
    mutationFn: ({
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    }) => signUp(name, email, password),

    onSuccess: () => {
      navigate("/", {
        replace: true,
        state: { accountCreated: true },
      });
    },

    onError: (error: any) => {
      setErrorCreating(
        error?.response?.data?.message ??
          "Failed to create account. Please try again."
      );
    },
  });

  const handleSubmit = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    /* -------- validations -------- */

    if (!trimmedName || trimmedName.length < 2) {
      setErrorCreating("Name must contain at least 2 characters.");
      return;
    }

    if (!trimmedEmail) {
      setErrorCreating("Email is required.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorCreating("Please enter a valid email address.");
      return;
    }

    if (password.length < 4) {
      setErrorCreating("Password must have at least 4 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorCreating("Passwords do not match.");
      return;
    }

    setErrorCreating("");
    createUserMutation.mutate({
      name: trimmedName,
      email: trimmedEmail,
      password,
    });
  };

  const handleChange =
    (setter: (value: string) => void) =>
    (value: string) => {
      setter(value);
      if (errorCreating) setErrorCreating("");
    };

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex items-center justify-center px-4 py-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-zinc-900">
              Create your account
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Start organizing your notes with notebox
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Name
              </label>
              <div className="relative">
                <UserIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={name}
                  onChange={(e) => handleChange(setName)(e.target.value)}
                  type="text"
                  placeholder="Your name"
                  className="
                    w-full h-10
                    pl-9 pr-3
                    rounded-md
                    border border-zinc-200
                    bg-white
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-500/30
                    focus:border-orange-500
                  "
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Email
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={email}
                  onChange={(e) => handleChange(setEmail)(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full h-10
                    pl-9 pr-3
                    rounded-md
                    border border-zinc-200
                    bg-white
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-500/30
                    focus:border-orange-500
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={password}
                  onChange={(e) => handleChange(setPassword)(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="
                    w-full h-10
                    pl-9 pr-3
                    rounded-md
                    border border-zinc-200
                    bg-white
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-500/30
                    focus:border-orange-500
                  "
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Confirm password
              </label>
              <div className="relative">
                <LockClosedIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  value={confirmPassword}
                  onChange={(e) =>
                    handleChange(setConfirmPassword)(e.target.value)
                  }
                  type="password"
                  placeholder="••••••••"
                  className="
                    w-full h-10
                    pl-9 pr-3
                    rounded-md
                    border border-zinc-200
                    bg-white
                    text-sm
                    text-zinc-900
                    placeholder:text-zinc-400
                    focus:outline-none
                    focus:ring-2
                    focus:ring-orange-500/30
                    focus:border-orange-500
                  "
                />
              </div>
            </div>

            {/* Error */}
            {errorCreating && (
              <div className="
                rounded-lg
                border border-red-200
                bg-red-50
                px-3 py-2
                text-sm
                text-red-700
              ">
                {errorCreating}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              type="button"
              disabled={createUserMutation.isPending}
              className="
                w-full h-10
                rounded-md
                bg-orange-600
                text-white
                text-sm
                font-medium
                hover:bg-orange-700
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {createUserMutation.isPending
                ? "Creating account…"
                : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-zinc-200 flex-1" />
            <span className="text-xs text-zinc-400">
              already have an account?
            </span>
            <div className="h-px bg-zinc-200 flex-1" />
          </div>

          {/* Secondary action */}
          <button
            onClick={() => navigate("/", { replace: true })}
            type="button"
            className="
              w-full h-10
              rounded-md
              border border-zinc-200
              bg-white
              text-sm
              text-zinc-700
              hover:bg-zinc-50
              transition
            "
          >
            Sign in instead
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-zinc-400 text-center mt-6">
          © {new Date().getFullYear()} Notebox. Made by Jbampa.
        </p>
      </div>
    </div>
  );
};
