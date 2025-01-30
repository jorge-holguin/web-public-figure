import { Facebook, Twitter } from "lucide-react";
import TikTokIcon from "../icons/IconIonLogoTiktok";

export default function SocialButtons() {
  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-4">
        <a
          href="https://www.facebook.com/CongresistaValer/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white p-2 rounded-l-md hover:bg-blue-700 transition-colors duration-200"
        >
          <Facebook size={24} />
        </a>
        <a
          href="https://x.com/HectorValer_PER"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 text-white p-2 rounded-l-md hover:bg-sky-600 transition-colors duration-200"
        >
          <Twitter size={24} />
        </a>
        <a
          href="https://www.tiktok.com/@hectorvaler.congresista"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 text-white p-2 rounded-l-md hover:bg-black transition-colors duration-200"
        >
          <TikTokIcon width="24px" height="24px" style={{ color: "#ffffff" }} />
        </a>
      </div>
    </div>
  );
}
