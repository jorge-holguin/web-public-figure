import { getBlogPosts } from "@/lib/notion";
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateStaticParams() {
  const blogs = await getBlogPosts();

  if (!blogs || blogs.length === 0) {
    console.warn("⚠️ No se encontraron blogs en Notion. No se generarán páginas estáticas.");
    return [];
  }

  return blogs.map((post) => ({ slug: post.slug }));
}



export default async function BlogPost({ params }: { params: { slug: string } }) {
  const blogs = await getBlogPosts();

  if (!blogs || blogs.length === 0) {
    console.error("❌ Error: No se encontraron blogs.");
    return notFound();
  }

  const post = blogs.find((p) => p.slug === params.slug);

  if (!post) {
    console.error(`❌ Error: No se encontró el post con slug: ${params.slug}`);
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {post.image ? (
        <Image
          src={post.image}
          alt={post.title}
          width={800}
          height={400}
          priority
          className="w-full h-64 object-cover rounded-lg"
        />
      ) : (
        <p className="text-gray-500">⚠️ Imagen no disponible</p>
      )}
      
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mt-6">
        {post.title}
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        {post.date ? new Date(post.date).toLocaleDateString() : "Fecha no disponible"}
      </p>
      <p className="mt-4 text-gray-600 dark:text-gray-300">{post.content}</p>
    </div>
  );
}
