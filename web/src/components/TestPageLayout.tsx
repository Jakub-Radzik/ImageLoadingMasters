import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const TestPageLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 w-full max-w-[2560px] mx-auto flex flex-col justify-between">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-center">
          Testowanie Ładowania Obrazów
        </h1>
      </header>

      <main className="w-full max-w-[2560px] mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <p className="text-lg text-gray-700 mb-4 text-center">
          Tutaj można testować różne techniki ładowania obrazów w rzeczywistych
          warunkach.
        </p>
        <section className="border border-gray-300 p-4 rounded-md bg-gray-50">
          {children}
        </section>
      </main>

      <footer className="text-center text-gray-600 py-4 mt-6 border-t">
        © {new Date().getFullYear()} Testowanie Obrazów - React & TypeScript
      </footer>
    </div>
  );
};

export default TestPageLayout;
