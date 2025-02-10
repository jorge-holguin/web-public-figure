import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function transformNotionImageUrl(url: string): string {
  const prefix = "https://www.notion.so/image/";
  if (url.startsWith(prefix)) {
    // Extrae la parte codificada
    const encodedPart = url.substring(prefix.length);
    // Decodifica la URL
    const decodedUrl = decodeURIComponent(encodedPart);
    // Si la URL decodificada tiene query parameters, se remueven (se toma solo la parte antes del '?')
    const cleanUrl = decodedUrl.split('?')[0];
    return cleanUrl;
  }
  return url;
}