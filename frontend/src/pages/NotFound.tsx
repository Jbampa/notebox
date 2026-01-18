import { Link } from "react-router-dom";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="text-center max-w-md">
        <ExclamationTriangleIcon className="h-12 w-12 mx-auto text-orange-500" />

        <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          The page you’re trying to access doesn’t exist or was moved.
        </p>

        <Link
          to="/dashboard"
          className="
            inline-flex items-center justify-center
            mt-6 px-4 h-10
            rounded-md
            bg-orange-600 text-white text-sm font-medium
            hover:bg-orange-700 transition
          "
        >
          Go back 
        </Link>
      </div>
    </div>
  );
};
