"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Blog() {
  interface BlogPost {
    id: string;
    image: string;
    title: string;
    slug: string;
    excerpt: string;
    date: string;
  }

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos de Notion:", data); // Muestra los datos en la consola
        setBlogPosts(Array.isArray(data) ? data : []); // Asegura que sea un array
      })
      .catch((error) => console.error("Error obteniendo blogs:", error));
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8">
          Blog de Noticias
        </h1>

        {/* Verifica si blogPosts es un array antes de hacer .map() */}
        {Array.isArray(blogPosts) && blogPosts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="hover:text-somos-red transition-colors duration-200">
                        {post.title}
                      </span>
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                    <Link href={`/blog/${post.slug}`}>
                      <span className="text-somos-blue hover:text-somos-red transition-colors duration-200">
                        Leer más
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hay blogs disponibles.</p>
        )}
      </div>
    </div>
  );
}
