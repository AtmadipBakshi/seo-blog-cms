"use client";

import { useEffect, useState } from "react";
import Editor from "@/components/Editor";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://seo-blog-cms.vercel.app/api/articles";

  async function fetchArticles() {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch articles:", err);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title,
        content,
        image,
        metaTitle: title,
        metaDescription: content
          ?.replace(/<[^>]*>/g, "")
          .slice(0, 150),
      };

      const res = await fetch(API_URL, {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editingId
            ? { ...payload, id: editingId }
            : { ...payload, published: true }
        ),
      });

      if (res.ok) {
        alert(editingId ? "Article Updated!" : "Article Created!");
      }

      setTitle("");
      setContent("");
      setImage("");
      setEditingId(null);

      fetchArticles();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  async function deleteArticle(id) {
    try {
      const res = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (res.ok) fetchArticles();
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  function editArticle(article) {
    setEditingId(article._id);
    setTitle(article.title);
    setContent(article.content);
    setImage(article.image);
  }

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-5xl mx-auto">

        {/* FORM */}
        <div className="bg-white p-8 rounded-lg shadow mb-10">
          <h1 className="text-3xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="text"
              placeholder="Article Title"
              className="w-full border p-3 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div>
              <label className="block mb-2 font-semibold">
                Article Content
              </label>

              <Editor value={content} onChange={setContent} />
            </div>

            <input
              type="text"
              placeholder="Image URL"
              className="w-full border p-3 rounded"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />

            <button
              type="submit"
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              {editingId ? "Update Article" : "Publish Article"}
            </button>
          </form>
        </div>

        {/* LIST */}
        <div className="space-y-4">

          {loading && (
            <p className="text-gray-500">Loading articles...</p>
          )}

          {!loading && articles.length === 0 && (
            <p className="text-gray-500">No articles found</p>
          )}

          {articles.map((article) => (
            <div
              key={article?._id}
              className="bg-white p-6 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-2xl font-bold">
                  {article?.title}
                </h2>
                <p className="text-gray-600">
                  {article?.slug}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => editArticle(article)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteArticle(article._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}