import { useQueryClient } from "@tanstack/react-query";

const ErrorPage = () => {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({
      queryKey: ["donation-requests"],
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-red-100 rounded-2xl p-8 text-center shadow-sm">
        <AlertCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Failed to load requests
        </h2>
        <p className="text-gray-600 mb-6">
          Something went wrong while fetching your donation requests.
        </p>
        <button
          onClick={handleRetry}
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
