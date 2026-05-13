import shopifyFashion from "@/assets/projects/shopify-fashion.jpg";
import shopifyElectronics from "@/assets/projects/shopify-electronics.jpg";
import shopifyCoffee from "@/assets/projects/shopify-coffee.jpg";
import shopifyPet from "@/assets/projects/shopify-pet.jpg";
import wooFashion from "@/assets/projects/woo-fashion.jpg";
import mernShop from "@/assets/projects/mern-shop.jpg";
import dashboardImg from "@/assets/projects/dashboard.jpg";
import bookingImg from "@/assets/projects/booking.jpg";
import shopifyBeauty from "@/assets/projects/shopify-beauty.jpg";

const SEED_MAP: Record<string, string> = {
  "/src/assets/projects/shopify-fashion.jpg": shopifyFashion,
  "/src/assets/projects/shopify-electronics.jpg": shopifyElectronics,
  "/src/assets/projects/shopify-coffee.jpg": shopifyCoffee,
  "/src/assets/projects/shopify-pet.jpg": shopifyPet,
  "/src/assets/projects/shopify-beauty.jpg": shopifyBeauty,
  "/src/assets/projects/woo-fashion.jpg": wooFashion,
  "/src/assets/projects/mern-shop.jpg": mernShop,
  "/src/assets/projects/dashboard.jpg": dashboardImg,
  "/src/assets/projects/booking.jpg": bookingImg,
};

const PLACEHOLDER =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 512'><rect width='800' height='512' fill='%23222'/><text x='50%25' y='50%25' fill='%23666' font-family='sans-serif' font-size='32' text-anchor='middle' dominant-baseline='middle'>No image</text></svg>";

export function resolveProjectImage(url: string | null | undefined): string {
  if (!url) return PLACEHOLDER;
  return SEED_MAP[url] ?? url;
}
