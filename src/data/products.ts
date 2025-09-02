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
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?q=80&w=400&auto=format&fit=crop",
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
    image:
      "https://images.pexels.com/photos/734983/pexels-photo-734983.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image:
      "https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image:
      "https://images.pexels.com/photos/635409/pexels-photo-635409.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    image:
      "https://images.pexels.com/photos/5946686/pexels-photo-5946686.jpeg?auto=compress&cs=tinysrgb&w=400",
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
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop",
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
      "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.9,
    stock: 20,
    tags: ["doce", "confeitaria", "artesanal"],
  },
  {
    id: "p-111",
    name: "Granola Artesanal 300g",
    sku: "GRA-ART-300",
    description: "Granola crocante com aveia, castanhas, mel e frutas secas.",
    price: 22.9,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    stock: 25,
    tags: ["natural", "saudável"],
  },
  {
    id: "p-113",
    name: "Chá Preto Earl Grey 75g",
    sku: "CHA-EG-75",
    description:
      "Clássico chá preto aromatizado com óleo natural de bergamota.",
    price: 27.5,
    image:
      "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    stock: 15,
    tags: ["chá", "clássico", "aromático"],
  },
  {
    id: "p-116",
    name: "Latte Macchiato 300ml",
    sku: "LAT-MAC-300",
    description:
      "Café espresso suave combinado com leite vaporizado e uma fina camada de espuma.",
    price: 14.9,
    image:
      "https://images.pexels.com/photos/302896/pexels-photo-302896.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.6,
    stock: 28,
    tags: ["bebida", "café", "clássico"],
  },

  {
    id: "p-117",
    name: "Mel Orgânico 300g",
    sku: "MEL-ORG-300",
    description: "Mel puro e orgânico, ideal para adoçar bebidas e receitas.",
    price: 27.9,
    image:
      "https://images.pexels.com/photos/2965571/pexels-photo-2965571.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    stock: 19,
    tags: ["natural", "orgânico", "saudável"],
  },
  {
    id: "p-124",
    name: "Torta de Limão 1kg",
    sku: "TOR-LIM-1K",
    description:
      "Torta de limão com base crocante de biscoito, recheio cremoso e cobertura de merengue maçaricado.",
    price: 74.9,
    image:
      "https://images.pexels.com/photos/3026801/pexels-photo-3026801.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    stock: 8,
    tags: ["torta", "doce", "confeitaria"],
  },
  {
    id: "p-128",
    name: "Torta Holandesa 900g",
    sku: "TOR-HOL-900",
    description:
      "Torta gelada com base de biscoito, creme especial e cobertura de ganache de chocolate.",
    price: 79.9,
    image:
      "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.8,
    stock: 9,
    tags: ["torta", "bolo", "gelada"],
  },
  {
    id: "p-130",
    name: "Cookies de Aveia e Uva-Passa 150g",
    sku: "COO-AVE-150",
    description:
      "Cookies crocantes com aveia integral e uva-passa selecionada.",
    price: 16.9,
    image:
      "https://images.pexels.com/photos/890577/pexels-photo-890577.jpeg?auto=compress&cs=tinysrgb&w=400",
    rating: 4.2,
    stock: 22,
    tags: ["doce", "saudável"],
  },
];
