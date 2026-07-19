/* ==========================================================================
   BASE DE PRODUTOS
   Troque estes dados pelos produtos reais da marca.
   "img" é o array de imagens do card (1ª = padrão, 2ª = hover/swipe).
   "gallery" é usado na página de produto.
   ========================================================================== */

const PRODUCTS = [
  {
    id: "mn-014",
    sku: "N°014",
    name: "Casaco Reto Estruturado",
    category: "Feminino",
    price: 689.0,
    oldPrice: null,
    colors: ["Preto", "Areia"],
    sizes: ["P", "M", "G", "GG"],
    img: ["https://picsum.photos/seed/mono-014a/900/1150?grayscale", "https://picsum.photos/seed/mono-014b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-014a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-014b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-014c/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-014d/1200/1500?grayscale"
    ],
    description: "Casaco de corte reto em alfaiataria dupla, ombro estruturado e caimento levemente oversized. Peça de fechamento em botão duplo, forro interno em cetim e acabamento fosco.",
    details: ["Composição: 78% lã, 20% poliéster, 2% elastano", "Forro: 100% cetim", "Modelagem oversized", "Lavagem a seco"],
    rating: 4.8,
    reviewsCount: 96,
    reviews: [
      { name: "Carla M.", rating: 5, date: "12/06/2026", text: "Caimento perfeito, tecido pesado e de ótima qualidade. Veste bem em todos os tamanhos entre P e M." },
      { name: "Renata S.", rating: 5, date: "02/06/2026", text: "Peça atemporal, uso pra tudo. Chegou muito bem embalada." },
      { name: "Bruno T.", rating: 4, date: "28/05/2026", text: "Muito bom, só achei o ombro um pouco largo pro meu biotipo." }
    ]
  },
  {
    id: "mn-021",
    sku: "N°021",
    name: "Calça Alfaiataria Wide Leg",
    category: "Feminino",
    price: 349.0,
    oldPrice: 419.0,
    colors: ["Preto", "Off White"],
    sizes: ["36", "38", "40", "42", "44"],
    img: ["https://picsum.photos/seed/mono-021a/900/1150?grayscale", "https://picsum.photos/seed/mono-021b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-021a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-021b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-021c/1200/1500?grayscale"
    ],
    description: "Calça de cintura alta com pernas amplas e caimento fluido. Pences frontais marcam a cintura, zíper invisível lateral e bolsos funcionais.",
    details: ["Composição: 96% viscose, 4% elastano", "Cintura alta", "Zíper lateral invisível", "Lavar à mão"],
    rating: 4.6,
    reviewsCount: 58,
    reviews: [
      { name: "Ana P.", rating: 5, date: "15/06/2026", text: "Super confortável e chique ao mesmo tempo. Comprei em duas cores." },
      { name: "Juliana R.", rating: 4, date: "01/06/2026", text: "Linda, só é preciso passar a ferro antes de usar." }
    ]
  },
  {
    id: "mn-032",
    sku: "N°032",
    name: "Camisa Popeline Assimétrica",
    category: "Masculino",
    price: 279.0,
    oldPrice: null,
    colors: ["Branco", "Preto"],
    sizes: ["P", "M", "G", "GG"],
    img: ["https://picsum.photos/seed/mono-032a/900/1150?grayscale", "https://picsum.photos/seed/mono-032b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-032a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-032b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-032c/1200/1500?grayscale"
    ],
    description: "Camisa em popeline de algodão com barra assimétrica e botões de madrepérola. Corte reto, ideal para compor looks de dia a noite.",
    details: ["Composição: 100% algodão", "Botões em madrepérola", "Corte reto", "Passar em temperatura média"],
    rating: 4.7,
    reviewsCount: 41,
    reviews: [
      { name: "Diego A.", rating: 5, date: "10/06/2026", text: "Tecido leve e não amassa fácil. Muito bem cortada." },
      { name: "Felipe N.", rating: 4, date: "22/05/2026", text: "Boa qualidade, entrega rápida." }
    ]
  },
  {
    id: "mn-045",
    sku: "N°045",
    name: "Blazer Cropped Linho",
    category: "Feminino",
    price: 459.0,
    oldPrice: null,
    colors: ["Areia", "Preto"],
    sizes: ["P", "M", "G"],
    img: ["https://picsum.photos/seed/mono-045a/900/1150?grayscale", "https://picsum.photos/seed/mono-045b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-045a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-045b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-045c/1200/1500?grayscale"
    ],
    description: "Blazer cropped em linho leve, forro parcial e botão único. Comprimento na cintura para compor com calças de cintura alta.",
    details: ["Composição: 100% linho", "Comprimento cropped", "Botão único", "Lavagem a seco"],
    rating: 4.5,
    reviewsCount: 27,
    reviews: [
      { name: "Marina L.", rating: 5, date: "18/06/2026", text: "Amei o caimento, ótimo pra verão." },
      { name: "Sofia C.", rating: 4, date: "05/06/2026", text: "Muito bonito, o tecido amassa um pouco." }
    ]
  },
  {
    id: "mn-051",
    sku: "N°051",
    name: "Calça Reta Alfaiataria",
    category: "Masculino",
    price: 329.0,
    oldPrice: 389.0,
    colors: ["Preto", "Grafite"],
    sizes: ["38", "40", "42", "44", "46"],
    img: ["https://picsum.photos/seed/mono-051a/900/1150?grayscale", "https://picsum.photos/seed/mono-051b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-051a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-051b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-051c/1200/1500?grayscale"
    ],
    description: "Calça de alfaiataria em corte reto, tecido com leve elastano para conforto no dia a dia. Pences frontais e barra acabada a fio.",
    details: ["Composição: 92% poliéster, 8% elastano", "Corte reto", "Cintura média", "Lavar à máquina, ciclo delicado"],
    rating: 4.4,
    reviewsCount: 33,
    reviews: [
      { name: "Rafael G.", rating: 4, date: "09/06/2026", text: "Boa alfaiataria pelo preço, veste bem." },
      { name: "Otávio M.", rating: 5, date: "30/05/2026", text: "Melhor calça social que já comprei online." }
    ]
  },
  {
    id: "mn-063",
    sku: "N°063",
    name: "Vestido Midi Canelado",
    category: "Feminino",
    price: 389.0,
    oldPrice: null,
    colors: ["Preto", "Marrom"],
    sizes: ["P", "M", "G"],
    img: ["https://picsum.photos/seed/mono-063a/900/1150?grayscale", "https://picsum.photos/seed/mono-063b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-063a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-063b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-063c/1200/1500?grayscale"
    ],
    description: "Vestido midi em malha canelada com decote canoa e fenda lateral discreta. Caimento justo ao corpo, ideal para uso em camadas.",
    details: ["Composição: 95% viscose, 5% elastano", "Malha canelada", "Comprimento midi", "Lavar à mão"],
    rating: 4.9,
    reviewsCount: 74,
    reviews: [
      { name: "Beatriz F.", rating: 5, date: "14/06/2026", text: "Veste super bem, tecido não marca e não é transparente." },
      { name: "Camila V.", rating: 5, date: "03/06/2026", text: "Já é o segundo que compro, virou básico aqui de casa." }
    ]
  },
  {
    id: "mn-078",
    sku: "N°078",
    name: "Moletom Oversized Essential",
    category: "Unissex",
    price: 229.0,
    oldPrice: null,
    colors: ["Preto", "Cinza", "Off White"],
    sizes: ["P", "M", "G", "GG"],
    img: ["https://picsum.photos/seed/mono-078a/900/1150?grayscale", "https://picsum.photos/seed/mono-078b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-078a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-078b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-078c/1200/1500?grayscale"
    ],
    description: "Moletom em algodão peruano com modelagem oversized, gola careca reforçada e punhos ribana. Peça unissex de uso diário.",
    details: ["Composição: 100% algodão peruano", "Modelagem oversized", "Gola careca reforçada", "Lavar à máquina, água fria"],
    rating: 4.8,
    reviewsCount: 112,
    reviews: [
      { name: "Pedro H.", rating: 5, date: "16/06/2026", text: "Tecido grosso, não desbota e não some no varal." },
      { name: "Larissa D.", rating: 5, date: "08/06/2026", text: "Confortabilíssimo, comprei pra mim e pro meu namorado." }
    ]
  },
  {
    id: "mn-089",
    sku: "N°089",
    name: "Trench Coat Impermeável",
    category: "Unissex",
    price: 799.0,
    oldPrice: 899.0,
    colors: ["Bege", "Preto"],
    sizes: ["P", "M", "G", "GG"],
    img: ["https://picsum.photos/seed/mono-089a/900/1150?grayscale", "https://picsum.photos/seed/mono-089b/900/1150?grayscale"],
    gallery: [
      "https://picsum.photos/seed/mono-089a/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-089b/1200/1500?grayscale",
      "https://picsum.photos/seed/mono-089c/1200/1500?grayscale"
    ],
    description: "Trench coat impermeável com cinto de amarrar, forro xadrez removível e viés reforçado nas costuras. Peça de transição para todas as estações.",
    details: ["Composição: 65% algodão, 35% poliéster", "Tratamento impermeável", "Forro removível", "Lavagem a seco"],
    rating: 4.9,
    reviewsCount: 65,
    reviews: [
      { name: "Vitor S.", rating: 5, date: "20/06/2026", text: "Excelente para dias de chuva, super elegante." },
      { name: "Isabela K.", rating: 5, date: "11/06/2026", text: "Peça investimento, vale cada centavo." }
    ]
  }
];

function formatPrice(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}
