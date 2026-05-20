"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles", {
          cache: "no-store",
        });

        const data = await res.json();

        // safety check
        if (Array.isArray(data)) {
          setArticles(data);
        } else {
          setArticles([]);
        }
      } catch (err) {
        console.error("Failed to load articles:", err);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const featuredArticle = filteredArticles[0];

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-black to-gray-800 text-white py-28 px-6 text-center">
        <div className="max-w-4xl mx-auto">

          <h1 className="text-6xl font-extrabold mb-6 leading-tight">
            SEO Blog CMS
          </h1>

          <p className="text-xl text-gray-300 mb-10">
            Modern SEO Optimized Content Publishing Platform Built With Next.js & MongoDB
          </p>

          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-2xl p-4 rounded-xl text-black text-lg outline-none"
          />
        </div>
      </section>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-center py-20 text-gray-500">
          Loading articles...
        </div>
      )}

      {/* FEATURED ARTICLE */}
      {!loading && featuredArticle && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

            <div className="p-10 flex flex-col justify-center">

              <span className="bg-black text-white px-4 py-1 rounded-full text-sm w-fit mb-6">
                Featured Article
              </span>

              <h2 className="text-5xl font-bold mb-6 leading-tight">
                {featuredArticle.title}
              </h2>

              <p className="text-gray-600 text-lg mb-8">
                {featuredArticle.metaDescription?.replace(/<[^>]*>/g, "")}
              </p>

              <a
                href={`/article/${featuredArticle.slug}`}
                className="bg-black text-white px-6 py-3 rounded-xl w-fit hover:bg-gray-800 transition"
              >
                Read Featured Article
              </a>

            </div>

            <div>
              <img
                src={
                  featuredArticle.image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                }
                alt={featuredArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </section>
      )}

      {/* ARTICLE GRID */}
      {!loading && (
        <section className="max-w-6xl mx-auto px-6 pb-20">

          <div className="flex items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">Latest Articles</h2>
            <p className="text-gray-500">{filteredArticles.length} Articles</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredArticles.map((article) => (
              <article
                key={article._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition duration-300"
              >

                <img
                  src={
                    article.image ||
                    "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
                  }
                  alt={article.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold mb-4 line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {article.metaDescription?.replace(/<[^>]*>/g, "")}
                  </p>

                  <a
                    href={`/article/${article.slug}`}
                    className="inline-block bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
                  >
                    Read Article
                  </a>

                </div>

              </article>
            ))}

          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-3xl font-bold mb-4">No Articles Found</h3>
              <p className="text-gray-500">Try searching with another keyword.</p>
            </div>
          )}

        </section>
      )}

    </main>
  );
}