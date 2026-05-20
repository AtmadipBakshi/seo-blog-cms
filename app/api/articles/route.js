import connectDB from "@/lib/mongodb";
import Article from "@/models/Article";
import slugify from "slugify";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const articles = await Article.find();

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const article = await Article.create({
      ...body,
      slug: slugify(body.title, {
        lower: true,
      }),
    });

    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { id } = await req.json();

    await Article.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Article Deleted",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();

    const updatedArticle =
      await Article.findByIdAndUpdate(
        body.id,
        {
          title: body.title,
          content: body.content,
          image: body.image,
          metaTitle: body.title,
          metaDescription:
            body.content.slice(0, 150),
        },
        { new: true }
      );

    return NextResponse.json(
      updatedArticle
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}