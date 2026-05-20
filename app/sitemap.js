async function getArticles() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/articles`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function sitemap() {
  const articles = await getArticles();

  const articleUrls = articles.map((article) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/article/${article.slug}`,
    lastModified: article.updatedAt || new Date(),
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      lastModified: new Date(),
    },
    ...articleUrls,
  ];
}