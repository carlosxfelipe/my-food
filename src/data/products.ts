export interface Product {
  description?: string;
  id: string;
  image: string;
  name: string;
  price: number;
  rating?: number;
  sku: string;
  stock: number;
  tags?: string[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p-101",
    name: "Café Especial Torrado 250g",
    sku: "CAF-250-ESP",
    description: "Blend 100% arábica com notas de chocolate e caramelo.",
    price: 34.9,
    image:
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=1200&auto=format&fit=crop",
    rating: 4.7,
    stock: 42,
    tags: ["novo", "premium"],
  },
  {
    id: "p-102",
    name: "Chá Verde Matcha 100g",
    sku: "CHA-MATCHA-100",
    description: "Matcha cerimonial moído a pedra, ideal para lattes.",
    price: 59.9,
    image: "https://images.pexels.com/photos/734983/pexels-photo-734983.jpeg",
    rating: 4.5,
    stock: 18,
    tags: ["orgânico"],
  },
  {
    id: "p-103",
    name: "Cafeteira Prensa Francesa 600ml",
    sku: "PRENSA-600",
    description: "Vidro borossilicato com malha de aço inoxidável.",
    price: 119.9,
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop",
    rating: 4.2,
    stock: 7,
    tags: ["acessório"],
  },
  {
    id: "p-104",
    name: "Biscoito Amanteigado 200g",
    sku: "BIS-AMT-200",
    description: "Clássico amanteigado com toque de baunilha.",
    price: 14.5,
    image: "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg",
    rating: 4.0,
    stock: 0,
    tags: ["indisponível"],
  },
  {
    id: "p-106",
    name: "Cupcake de Chocolate com Caramelo",
    sku: "CUP-CHOC-CAR-1",
    description:
      "Massa de chocolate fofinha com cobertura cremosa de chocolate e caramelo.",
    price: 9.9,
    image: "https://images.pexels.com/photos/635409/pexels-photo-635409.jpeg",
    rating: 4.8,
    stock: 32,
    tags: ["doce", "confeitaria", "novo"],
  },
];
