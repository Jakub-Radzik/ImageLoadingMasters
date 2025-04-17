interface LayoutProps {
  children: React.ReactNode;
  show?: boolean;
}

export const TestPageLayout: React.FC<LayoutProps> = ({ children, show }) => {
  return show ? (
    <div className="min-h-screen bg-gray-100 text-gray-800 w-full max-w-[2560px] mx-auto flex flex-col justify-between">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        Testowanie Ładowania Obrazów
      </header>

      <main className="w-full max-w-[2560px] mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
        <section className="border border-gray-300 p-4 rounded-md bg-gray-50">
          {children}
        </section>
        <p className="text-lg text-gray-700 mb-4 text-center">
          Tutaj można testować różne techniki ładowania obrazów w rzeczywistych
          warunkach.
        </p>
      </main>

      <footer className="text-center text-gray-600 py-4 mt-6 border-t">
        © {new Date().getFullYear()} Testowanie Obrazów - React & TypeScript
      </footer>
    </div>
  ) : (
    <>{children}</>
  );
};
