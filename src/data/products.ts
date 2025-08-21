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
  {
    id: "p-108",
    name: "Chá de Hibisco 50g",
    sku: "CHA-HIB-50",
    description:
      "Flores de hibisco secas, sabor levemente ácido e refrescante.",
    price: 19.9,
    image: "https://images.pexels.com/photos/5946686/pexels-photo-5946686.jpeg",
    rating: 4.3,
    stock: 12,
    tags: ["chá", "natural"],
  },
  {
    id: "p-109",
    name: "Caneca de Porcelana 300ml",
    sku: "CAN-300-BLC",
    description: "Caneca branca clássica de porcelana, ideal para café ou chá.",
    price: 24.9,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop",
    rating: 4.1,
    stock: 64,
    tags: ["acessório", "utilitário"],
  },
  {
    id: "p-110",
    name: "Brownie de Nozes 80g",
    sku: "BRO-NOZ-80",
    description:
      "Brownie artesanal de chocolate meio amargo com pedaços de nozes.",
    price: 8.5,
    image:
      "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg",
    rating: 4.9,
    stock: 20,
    tags: ["doce", "confeitaria", "artesanal"],
  },
];
