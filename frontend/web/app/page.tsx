export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">

      <h1 className="text-5xl font-bold text-gray-800 mb-6">
        College Pathfinder
      </h1>

      <p className="text-lg text-gray-600 mb-10">
        Find the best colleges based on your interests and preferences
      </p>

      <div className="flex gap-4">

        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Login
        </a>

        <a
          href="/register"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Register
        </a>

      </div>

    </main>
  );
}