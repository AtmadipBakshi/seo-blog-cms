async function getArticles() {
  const res = await fetch(
    "http://localhost:3000/api/articles",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function sitemap() {
  const articles = await getArticles();

  const articleUrls = articles.map(
    (article) => ({
      url: `http://localhost:3000/article/${article.slug}`,
      lastModified:
        article.updatedAt,
    })
  );

  return [
    {
      url: "http://localhost:3000",
      lastModified: new Date(),
    },

    ...articleUrls,
  ];
}