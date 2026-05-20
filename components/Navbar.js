export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4">

      <div className="max-w-6xl mx-auto flex justify-between items-center">

        <a
          href="/"
          className="text-2xl font-bold"
        >
          SEO Blog CMS
        </a>

        <div className="flex gap-6">

          <a href="/">
            Home
          </a>

          <a href="/admin">
            Admin
          </a>

        </div>

      </div>

    </nav>
  );
}