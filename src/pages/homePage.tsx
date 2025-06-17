import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex w-screen h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200 p-8 flex flex-col">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 select-none">X</h2>
        <nav className="flex flex-col space-y-6">
          <Link
            to="/add-client"
            className="text-lg text-gray-700 hover:text-indigo-600 font-semibold transition-colors duration-300"
          >
            ➕ Add Client
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 select-none">Welcome to X</h1>
      </main>
    </div>
  );
}

export default HomePage;
