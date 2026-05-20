async function getArticles() {
  const res = await fetch("http://localhost:3000/api/articles", {
    cache: "no-store",
  });

  return res.json();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const articles = await getArticles();

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
  };
}

export default async function ArticlePage({ params }) {
  const { slug } = await params;

  const articles = await getArticles();

  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <h1 className="p-10 text-3xl">Article Not Found</h1>
    );
  }

  // REMOVE HTML TAGS FOR READING TIME
  const plainText = article.content.replace(/<[^>]*>/g, "");

  // CALCULATE READING TIME
  const words = plainText.split(" ").length;
  const readingTime = Math.ceil(words / 200);

  // FORMAT DATE (UI ONLY)
  const publishDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ JSON-LD SEO DATA (IMPORTANT ADDITION)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image:
      article.image ||
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    author: {
      "@type": "Person",
      name: "Atmadip Bakshi",
    },
    datePublished: article.createdAt
      ? new Date(article.createdAt).toISOString()
      : new Date().toISOString(),
    dateModified: article.updatedAt
      ? new Date(article.updatedAt).toISOString()
      : new Date(article.createdAt).toISOString(),
  };

  return (
    <main className="min-h-screen bg-gray-100 py-16 px-6">
      
      {/* SEO JSON-LD SCRIPT */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <article className="max-w-4xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-xl">

        {/* ARTICLE IMAGE */}
        <img
          src={
            article.image ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643"
          }
          alt={article.title}
          className="w-full h-[400px] object-cover rounded-2xl mb-10"
        />

        {/* HEADER */}
        <header className="mb-12">

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-black text-white px-4 py-1 rounded-full text-sm">
              Technology
            </span>

            <span className="text-gray-500 text-sm">
              {publishDate}
            </span>

            <span className="text-gray-500 text-sm">
              {readingTime} min read
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
            {article.title}
          </h1>

          <p className="text-lg text-gray-600 leading-8">
            {article.metaDescription?.replace(/<[^>]*>/g, "")}
          </p>
        </header>

        {/* AUTHOR */}
        <div className="flex items-center gap-4 border-y py-6 mb-10">
          <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">
            A
          </div>

          <div>
            <h3 className="font-bold text-lg">
              Atmadip Bakshi
            </h3>
            <p className="text-gray-500 text-sm">
              Full Stack Developer & Content Creator
            </p>
          </div>
        </div>

        {/* ARTICLE CONTENT */}
        <section className="prose prose-lg max-w-none prose-headings:font-bold prose-img:rounded-xl prose-p:text-gray-800 prose-p:leading-9">
          <div
            dangerouslySetInnerHTML={{
              __html: article.content,
            }}
          />
        </section>

      </article>
    </main>
  );
}