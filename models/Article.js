import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    content: String,
    image: String,
    metaTitle: String,
    metaDescription: String,
    published: Boolean,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Article ||
  mongoose.model("Article", ArticleSchema);