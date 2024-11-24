// components/NavBar.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname(); // Get the current route for active link

  // Helper function to check if the link is active
  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center text-white">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold tracking-tight">
              <Link href="/" className="hover:text-indigo-200">
                Safa&apos;s Files
              </Link>
            </h1>
          </div>
          <div className="space-x-6 hidden md:flex">
            <Link
              href="/"
              className={`${
                isActive("/")
                  ? "bg-black text-white"
                  : "text-indigo-100 bg-gray-800"
              } py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-indigo-700 hover:text-white font-medium`}
            >
              Home
            </Link>
            <Link
              href="/upload"
              className={`${
                isActive("/upload")
                  ? "bg-black text-white"
                  : "text-indigo-100 bg-gray-800"
              } py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-indigo-700 hover:text-white font-medium`}
            >
              Upload File
            </Link>
            <Link
              href="/files"
              className={`${
                isActive("/files")
                  ? "bg-black text-white"
                  : "text-indigo-100 bg-gray-800"
              } py-3 px-6 rounded-lg transition-colors duration-300 hover:bg-indigo-700 hover:text-white font-medium`}
            >
              View Files
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
