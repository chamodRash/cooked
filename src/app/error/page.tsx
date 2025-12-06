import Link from "next/link";

export default async function ErrorPage(props: {
  searchParams: Promise<{ message?: string }>;
}) {
  const searchParams = await props.searchParams;
  const message = searchParams.message || "An unknown error occurred";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Authentication Error
        </h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <Link
          href="/"
          className="inline-block px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
