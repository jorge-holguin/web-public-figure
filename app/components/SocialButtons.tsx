import { Facebook, Twitter, Instagram } from "lucide-react"

export default function SocialButtons() {
  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-4">
        <a
          href="https://www.facebook.com/somosperu"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-2 rounded-l-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Facebook size={24} />
        </a>
        <a
          href="https://www.twitter.com/somosperu"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 text-white p-2 rounded-l-md hover:bg-sky-600 transition-colors duration-200"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://www.instagram.com/somosperu"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pink-600 text-white p-2 rounded-l-md hover:bg-pink-700 transition-colors duration-200"
        >
          <Instagram size={24} />
        </a>
      </div>
    </div>
  )
}

