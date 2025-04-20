import { Link } from "react-router-dom";

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
      </main>

      <footer className="text-center text-gray-600 py-4 mt-6 border-t">
        <div className="flex gap-5">
          <Link to={"/ref"}>REF</Link>
          <Link to={"/refs"}>REFS</Link>
          {/* <Link to={"/cdn2"}>CDN HTTP2</Link>
          <Link to={"/cdns2"}>CDNs HTTP2</Link>
          <Link to={"/cdn3"}>CDN HTTP3</Link>
          <Link to={"/cdns3"}>CDNs HTTP3</Link> */}
          {/* <Link to={"/cdns3"}>CDNs HTTP3</Link> */}

          <Link to={"/cdn/ref"}>CDN REF</Link>
          <Link to={"/cdn/cdn1"}>CDN 1</Link>
          <Link to={"/cdn/cdn2"}>CDN 2</Link>
          <Link to={"/cdn/cdn3"}>CDN 3</Link>
        </div>
        © {new Date().getFullYear()} Testowanie Obrazów - React & TypeScript
      </footer>
    </div>
  ) : (
    <>{children}</>
  );
};
