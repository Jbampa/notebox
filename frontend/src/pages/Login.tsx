import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { login } from "../services/auth";

/* -------- helpers -------- */
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const Login = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const showSuccess = location.state?.accountCreated;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),

    onSuccess: ({ token, user }) => {
      signIn(token, user);
      navigate("/dashboard", { replace: true });
    },

    onError: (error: any) => {
      setErrorMessage(
        error?.response?.data?.message ??
          "Invalid email or password."
      );
    },
  });

  const handleSubmit = () => {
    const trimmedEmail = email.trim();

    /* -------- validations -------- */
    if (!trimmedEmail) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 4) {
      setErrorMessage("Password must contain at least 4 characters.");
      return;
    }

    setErrorMessage("");
    loginMutation.mutate({ email: trimmedEmail, password });
  };

  const handleChange =
    (setter: (value: string) => void) =>
    (value: string) => {
      setter(value);
      if (errorMessage) setErrorMessage("");
    };

  return (
    <div className="min-h-screen w-full bg-zinc-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6">
          
          {/* Success message */}
          {showSuccess && (
            <div className="
              mb-4
              rounded-lg
              border border-green-200
              bg-green-50
              px-3 py-2
              text-sm
              text-green-700
            ">
              Account created successfully. You can now sign in.
            </div>
          )}

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-zinc-900">
              notebox
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Sign in to continue to your workspace
            </p>
          </div>

          {/* Form */}
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1">
                Email
              </label>
              <div className="relative">
                <EnvelopeIcon className="h-4 w-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    handleChange(setEmail)(e.target.value)
                  }
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
                  type="password"
                  value={password}
                  onChange={(e) =>
                    handleChange(setPassword)(e.target.value)
                  }
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
            {errorMessage && (
              <div className="
                rounded-lg
                border border-red-200
                bg-red-50
                px-3 py-2
                text-sm
                text-red-700
              ">
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="
                w-full h-10
                rounded-md
                bg-orange-600
                text-white
                text-sm
                font-medium
                hover:bg-orange-700
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loginMutation.isPending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px bg-zinc-200 flex-1" />
            <span className="text-xs text-zinc-400">or</span>
            <div className="h-px bg-zinc-200 flex-1" />
          </div>

          {/* Secondary action */}
          <button
            type="button"
            onClick={() => navigate("/register", { replace: true })}
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
            Create a new account
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
