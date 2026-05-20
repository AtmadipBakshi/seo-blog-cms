import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
  title: "SEO Blog CMS",

  description:
    "Modern SEO optimized blog platform built with Next.js and MongoDB",

  keywords: [
    "Next.js",
    "SEO",
    "Blog CMS",
    "MongoDB",
    "React",
  ],

  openGraph: {
    title: "SEO Blog CMS",

    description:
      "Fast and SEO optimized content platform",

    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "SEO Blog CMS",

    description:
      "Modern content publishing platform",
  },
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>

        <SessionWrapper>

          <Navbar />

          {children}

          <Footer />

        </SessionWrapper>

      </body>
    </html>
  );
}