import { getBlogPosts } from "@/lib/notion";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const blogs = await getBlogPosts();
  return blogs.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blogs = await getBlogPosts();
  const post = blogs.find((p) => p.slug === params.slug);

  if (!post) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-6">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{post.content}</p>
    </div>
  );
}
