import FacebookIcon from "../icons/iconIonLogoFacebook";
import TikTokIcon from "../icons/IconIonLogoTiktok";
import YouTubeIcon from "../icons/iconIonLogoYoutube";
import TwitterIcon from "../icons/iconIonLogoTwitter";
//import InstagramIcon from "../icons/iconIonLogoInstagram";
import KickIcon from "../icons/iconIonLogoKick";

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
          <FacebookIcon size={24} />
        </a>
        <a
          href="https://x.com/HectorValer_PER"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 text-white p-2 rounded-l-md hover:bg-sky-600 transition-colors duration-200"
        >
          <TwitterIcon size={24} />
        </a>
        <a
          href="https://www.tiktok.com/@hectorvaler.congresista"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-900 text-white p-2 rounded-l-md hover:bg-black transition-colors duration-200"
        >
          <TikTokIcon width="24px" height="24px" style={{ color: "#ffffff" }} />
        </a>
       {/*  <a
          href="https://www.instagram.com/@hectorvalerpinto"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white p-2 rounded-md hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 transition-colors duration-200 flex items-center justify-center"
          >
          <InstagramIcon width="24px" height="24px" style={{ color: "#ffffff" }} />
        </a> */}
        <a
          href="https://www.youtube.com/@hectorvalerpinto1312"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 text-white p-2 rounded-l-md hover:bg-red-700 transition-colors duration-200 flex items-center justify-center"
        >
          <YouTubeIcon width="24px" height="24px" style={{ color: "#ffffff" }} />
        </a>
        <a
          href="https://kick.com/hector-valer"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black text-white p-2 rounded-md hover:bg-gray-900 transition-colors duration-200 flex items-center justify-center"
          >
          <KickIcon width="24px" height="24px" style={{ color: "#ffffff" }} />
        </a>
      </div>
    </div>
  );
}
