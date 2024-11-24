// app/layout.tsx
import NavBar from "@/components/navbar";
import "./globals.css";

export const metadata = {
  title: "Safa's Files App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Safa's File Upload and Management App"
        />
        <title>{metadata.title}</title>
      </head>
      <body className="bg-gray-50 font-sans text-gray-900">
        <div className="min-h-screen flex flex-col">
          <NavBar />

          <main className="flex-grow bg-white py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>

          <footer className="bg-gray-800 text-white py-4">
            <div className="max-w-7xl mx-auto text-center text-sm">
              <p>
                &copy; {new Date().getFullYear()} Safa's Files App. All rights
                reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
