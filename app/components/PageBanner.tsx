import Image from "next/image"

interface PageBannerProps {
  title: string
  imageSrc: string
  imageAlt: string
}

export default function PageBanner({ title, imageSrc, imageAlt }: PageBannerProps) {
  return (
    <div className="relative w-full h-64 md:h-[400px] overflow-hidden">
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
        objectPosition="top"
        priority
        className="transition-transform duration-300 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent flex items-start justify-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4 py-6 mt-8 bg-gradient-to-r from-transparent via-black/50 to-transparent">
          {title}
        </h1>
      </div>
    </div>
  )
}
