import image from"../../../assets/Home-page/playstation.png"
import type { Product } from "../../../store/state";



export const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  price: (i + 1) * 100,
  description: `Description for product ${i + 1}`,
  images: [image, "/bag2.png"],
  category: {
    id: 1,
    name: "Category 1",
    image: image,
    slug: "category-1",
  },
  slug: `product-${i + 1}`,
}));
