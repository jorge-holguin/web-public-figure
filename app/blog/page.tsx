import Link from "next/link"

// This would typically come from a CMS or API
const blogPosts = [
  {
    id: 1,
    title: "Propuestas para mejorar la educación en Perú",
    excerpt: "Nuestro plan para elevar la calidad educativa y garantizar el acceso universal a la educación.",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Plan de seguridad ciudadana",
    excerpt: "Estrategias concretas para combatir la delincuencia y mejorar la seguridad en nuestras ciudades.",
    date: "2023-05-10",
  },
  {
    id: 3,
    title: "Impulsando el desarrollo económico",
    excerpt: "Nuestras propuestas para fomentar el crecimiento económico y generar más empleos.",
    date: "2023-05-05",
  },
]

export default function Blog() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-8">Blog de Noticias</h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  <Link href={`/blog/${post.id}`} className="hover:text-somos-red transition-colors duration-200">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-somos-blue hover:text-somos-red transition-colors duration-200"
                  >
                    Leer más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

