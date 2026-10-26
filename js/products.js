const PRODUCTS_DATA = [
  {
    id: "prod-1",
    name: "Apex ANC Wireless Headphones",
    category: "Electronics",
    brand: "NovaTech",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviewsCount: 142,
    image: "assets/images/products/electronics/apex-headphones.jpg",
    gallery: [
      "assets/images/products/electronics/apex-headphones.jpg"
    ],
    shortDesc: "Premium active noise-canceling headphones with 40-hour battery life and spatial audio capability.",
    description: "Experience sound purity like never before. The Apex ANC Wireless Headphones feature studio-quality drivers, hybrid active noise cancellation, and lightweight memory foam ear cushions for all-day comfort.",
    specs: {
      "Battery Life": "40 Hours",
      "Bluetooth": "v5.3",
      "Noise Cancellation": "Active (ANC)",
      "Weight": "250g",
      "Warranty": "2 Years"
    },
    colors: ["Space Black", "Silver Frost", "Navy Blue"],
    inStock: true,
    featured: true,
    deal: true
  },
  {
    id: "prod-2",
    name: "Ultra Slim Book Pro 15.6\"",
    category: "Electronics",
    brand: "Zenith",
    price: 999.99,
    originalPrice: 1199.99,
    rating: 4.9,
    reviewsCount: 89,
    image: "assets/images/products/electronics/ultra-laptop.jpg",
    gallery: [
      "assets/images/products/electronics/ultra-laptop.jpg"
    ],
    shortDesc: "Ultra-fast processor, Retina 4K display, 16GB RAM, and 512GB NVMe SSD in a sleek aluminum chassis.",
    description: "Designed for creators and professionals on the go. High-speed multitasking, all-day power, and a breathtaking color-accurate display.",
    specs: {
      "Processor": "Octa-Core Gen 12",
      "RAM": "16GB LPDDR5",
      "Storage": "512GB SSD",
      "Display": "15.6\" OLED 4K"
    },
    colors: ["Space Gray", "Silver"],
    inStock: true,
    featured: true,
    deal: false
  },
  {
    id: "prod-3",
    name: "Pulse Smart Watch Series X",
    category: "Electronics",
    brand: "Pulse",
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.6,
    reviewsCount: 210,
    image: "assets/images/products/electronics/pulse-smartwatch.jpg",
    gallery: [
      "assets/images/products/electronics/pulse-smartwatch.jpg"
    ],
    shortDesc: "Advanced fitness tracking, ECG monitor, sleep analytics, and AMOLED always-on display.",
    description: "Track your health metrics seamlessly. Pulse Watch X comes with built-in GPS, water resistance up to 50m, and fast charging.",
    specs: {
      "Display": "1.9\" AMOLED",
      "Water Resistance": "5 ATM",
      "Battery": "7 Days Typical Use"
    },
    colors: ["Black", "Rose Gold", "Titanium"],
    inStock: true,
    featured: true,
    deal: true
  },
  {
    id: "prod-4",
    name: "Lumix Pro 4K Mirrorless Camera",
    category: "Electronics",
    brand: "Vision",
    price: 749.99,
    originalPrice: 849.99,
    rating: 4.7,
    reviewsCount: 54,
    image: "assets/images/products/electronics/lumix-camera.jpg",
    gallery: [
      "assets/images/products/electronics/lumix-camera.jpg"
    ],
    shortDesc: "24.2 MP Full-Frame sensor with 4K 60fps video recording and 5-axis image stabilization.",
    description: "Capture life's vibrant moments with extreme resolution and high dynamic range. Includes a versatile 24-70mm lens kit.",
    specs: {
      "Sensor": "24.2 MP Full Frame",
      "Video": "4K 60fps / 1080p 120fps",
      "Lens Mount": "Universal E-Mount"
    },
    colors: ["Matte Black"],
    inStock: true,
    featured: false,
    deal: false
  },
  {
    id: "prod-5",
    name: "Classic Heritage Leather Jacket",
    category: "Fashion",
    brand: "UrbanCraft",
    price: 129.99,
    originalPrice: 179.99,
    rating: 4.9,
    reviewsCount: 95,
    image: "assets/images/products/fashion/leather-jacket.jpg",
    gallery: [
      "assets/images/products/fashion/leather-jacket.jpg"
    ],
    shortDesc: "Authentic full-grain lambskin leather jacket with soft viscose inner lining and silver zips.",
    description: "Timeless style meets modern tailoring. Craftsmanship guaranteed to age beautifully with time.",
    specs: {
      "Material": "100% Genuine Leather",
      "Fit": "Slim Fit",
      "Care": "Professional Leather Clean"
    },
    sizes: ["S", "M", "L", "XL"],
    colors: ["Vintage Brown", "Midnight Black"],
    inStock: true,
    featured: true,
    deal: true
  },
  {
    id: "prod-6",
    name: "Urban Minimalist White Sneakers",
    category: "Fashion",
    brand: "SoleStudio",
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.6,
    reviewsCount: 178,
    image: "assets/images/products/fashion/white-sneakers.jpg",
    gallery: [
      "assets/images/products/fashion/white-sneakers.jpg"
    ],
    shortDesc: "Handcrafted vegan leather sneakers with memory foam insoles for ultimate everyday comfort.",
    description: "Sleek, versatile, and lightweight. Pair them easily with casual denim or tailored suits.",
    specs: {
      "Upper": "Premium Vegan Leather",
      "Sole": "Non-Slip Rubber",
      "Closure": "Lace-Up"
    },
    sizes: ["US 8", "US 9", "US 10", "US 11"],
    colors: ["Pure White", "White/Gum"],
    inStock: true,
    featured: true,
    deal: false
  },
  {
    id: "prod-7",
    name: "Luxury Italian Tote Handbag",
    category: "Fashion",
    brand: "Milano",
    price: 159.99,
    originalPrice: 210.00,
    rating: 4.8,
    reviewsCount: 62,
    image: "assets/images/products/fashion/luxury-tote.jpg",
    gallery: [
      "assets/images/products/fashion/luxury-tote.jpg"
    ],
    shortDesc: "Spacious luxury tote crafted from structured saffiano leather with magnetic gold clasp.",
    description: "Designed to hold all your work and lifestyle essentials effortlessly with inner laptop compartment.",
    specs: {
      "Dimensions": "38cm x 28cm x 14cm",
      "Material": "Saffiano Grain Leather",
      "Hardware": "Gold Plated"
    },
    colors: ["Tan Beige", "Classic Black", "Emerald Green"],
    inStock: true,
    featured: true,
    deal: false
  },
  {
    id: "prod-8",
    name: "Polarized Aviator Sunglasses",
    category: "Fashion",
    brand: "Optics",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.5,
    reviewsCount: 130,
    image: "assets/images/products/fashion/aviator-sunglasses.jpg",
    gallery: [
      "assets/images/products/fashion/aviator-sunglasses.jpg"
    ],
    shortDesc: "UV400 protection polarized lenses with lightweight titanium metal frame.",
    description: "Shield your eyes in effortless style. Reduces glare and maintains clear natural visual color rendering.",
    specs: {
      "Protection": "UV400 Polarized",
      "Frame": "Stainless Titanium"
    },
    colors: ["Gold/Green", "Black/Smokey"],
    inStock: true,
    featured: false,
    deal: true
  },
  {
    id: "prod-9",
    name: "Nordic Minimalist Ceramic Table Lamp",
    category: "Home & Living",
    brand: "Lumina",
    price: 64.99,
    originalPrice: 84.99,
    rating: 4.7,
    reviewsCount: 88,
    image: "assets/images/products/home-living/ceramic-lamp.jpg",
    gallery: [
      "assets/images/products/home-living/ceramic-lamp.jpg"
    ],
    shortDesc: "Warm ambient LED lighting with textured ceramic base and linen lampshade.",
    description: "Elevate your nightstand or desk aesthetic. Dimmable warm LED bulb included.",
    specs: {
      "Height": "45cm",
      "Bulb": "E27 Warm LED (Included)",
      "Switch": "Touch Dimmer"
    },
    colors: ["Oatmeal White", "Charcoal Gray"],
    inStock: true,
    featured: true,
    deal: false
  },
  {
    id: "prod-10",
    name: "Ergonomic Velvet Accent Chair",
    category: "Home & Living",
    brand: "Haven",
    price: 219.99,
    originalPrice: 289.99,
    rating: 4.9,
    reviewsCount: 41,
    image: "assets/images/products/home-living/velvet-chair.jpg",
    gallery: [
      "assets/images/products/home-living/velvet-chair.jpg"
    ],
    shortDesc: "Plush velvet upholstery with gold-tipped solid oak legs for living room elegance.",
    description: "Ergonomically contoured backrest provides unmatched relaxation while making a striking decor statement.",
    specs: {
      "Weight Capacity": "150 kg",
      "Fabric": "Stain-Resistant Velvet",
      "Legs": "Solid Oak Wood"
    },
    colors: ["Royal Blue", "Forest Green", "Dusty Rose"],
    inStock: true,
    featured: true,
    deal: true
  },
  {
    id: "prod-11",
    name: "Barista Touch Espresso Coffee Maker",
    category: "Home & Living",
    brand: "BrewMaster",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewsCount: 115,
    image: "assets/images/products/home-living/espresso-maker.jpg",
    gallery: [
      "assets/images/products/home-living/espresso-maker.jpg"
    ],
    shortDesc: "19-Bar Italian pump espresso machine with integrated milk steam frother wand.",
    description: "Brew rich authentic espressos, lattes, and cappuccinos right at home in under 45 seconds.",
    specs: {
      "Pump Pressure": "19 Bar",
      "Water Tank": "1.5 Liters",
      "Power": "1450W"
    },
    colors: ["Brushed Stainless Steel", "Matte Black"],
    inStock: true,
    featured: false,
    deal: false
  },
  {
    id: "prod-12",
    name: "Botanical Hyaluronic Acid Serum",
    category: "Beauty",
    brand: "GlowLab",
    price: 34.99,
    originalPrice: 44.99,
    rating: 4.9,
    reviewsCount: 310,
    image: "assets/images/products/beauty/hyaluronic-serum.jpg",
    gallery: [
      "assets/images/products/beauty/hyaluronic-serum.jpg"
    ],
    shortDesc: "Deeply moisturizing serum enriched with Vitamin B5 and organic botanical extracts.",
    description: "Instantly plumps skin, smooths fine lines, and delivers radiant 24-hour hydration. 100% cruelty-free.",
    specs: {
      "Volume": "50ml / 1.7 fl oz",
      "Skin Type": "All Skin Types",
      "Free From": "Parabens, Sulfates, Phthalates"
    },
    inStock: true,
    featured: true,
    deal: true
  },
  {
    id: "prod-13",
    name: "Maison Rose Eau De Parfum 100ml",
    category: "Beauty",
    brand: "Atelier",
    price: 89.99,
    originalPrice: 110.00,
    rating: 4.7,
    reviewsCount: 84,
    image: "assets/images/products/beauty/rose-perfume.jpg",
    gallery: [
      "assets/images/products/beauty/rose-perfume.jpg"
    ],
    shortDesc: "Sensual blend of Bulgarian Rose, Warm Amber, Vanilla, and White Musk.",
    description: "A signature floral fragrance that lasts effortlessly from day to night.",
    specs: {
      "Concentration": "Eau De Parfum",
      "Volume": "100ml",
      "Notes": "Rose, Amber, Vanilla"
    },
    inStock: true,
    featured: false,
    deal: false
  },
  {
    id: "prod-14",
    name: "Velvet Matte Moisture Lipstick Set",
    category: "Beauty",
    brand: "GlowLab",
    price: 29.99,
    originalPrice: 39.99,
    rating: 4.6,
    reviewsCount: 96,
    image: "assets/images/products/beauty/matte-lipstick.jpg",
    gallery: [
      "assets/images/products/beauty/matte-lipstick.jpg"
    ],
    shortDesc: "Trio set of ultra-pigmented matte lipsticks infused with jojoba oil.",
    description: "Non-drying longwear formula providing intense color payout with a weightless velvet finish.",
    specs: {
      "Set Includes": "3 Iconic Shades (Nude, Crimson, Berry)",
      "Finish": "Velvet Matte"
    },
    inStock: true,
    featured: false,
    deal: true
  },
  {
    id: "prod-15",
    name: "Sonic Pro ANC Wireless Earbuds",
    category: "Electronics",
    brand: "NovaTech",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewsCount: 168,
    image: "assets/images/products/electronics/sonic-earbuds.jpg",
    gallery: [
      "assets/images/products/electronics/sonic-earbuds.jpg"
    ],
    shortDesc: "Active noise canceling true wireless earbuds with immersive bass and sleek charging case.",
    description: "Enjoy crystal-clear calls and deep dynamic bass. Features touch gesture controls, IPX7 water resistance, and 30 hours of continuous playback.",
    specs: {
      "Battery": "30 Hours (with Case)",
      "Bluetooth": "v5.3",
      "Water Resistance": "IPX7",
      "Noise Cancellation": "Active (ANC)"
    },
    colors: ["Glossy Black", "Pearl White"],
    inStock: true,
    featured: true,
    deal: true
  },
  {
    id: "prod-16",
    name: "RGB Mechanical Gaming Keyboard",
    category: "Electronics",
    brand: "ApexGear",
    price: 119.99,
    originalPrice: 149.99,
    rating: 4.8,
    reviewsCount: 204,
    image: "assets/images/products/electronics/gaming-keyboard.jpg",
    gallery: [
      "assets/images/products/electronics/gaming-keyboard.jpg"
    ],
    shortDesc: "Hot-swappable mechanical switches with per-key RGB backlighting and aluminum top frame.",
    description: "Engineered for high-speed gaming and tactile typing. Features customizable macro keys, braided USB-C cable, and sound-dampening foam.",
    specs: {
      "Switch Type": "Tactile Brown / Linear Red",
      "Connectivity": "USB-C / 2.4GHz / Bluetooth",
      "Keycaps": "Double-shot PBT"
    },
    colors: ["Midnight RGB", "Retro White"],
    inStock: true,
    featured: true,
    deal: false
  },
  {
    id: "prod-17",
    name: "Breeze Linen Casual Shirt",
    category: "Fashion",
    brand: "UrbanCraft",
    price: 54.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviewsCount: 88,
    image: "assets/images/products/fashion/linen-shirt.jpg",
    gallery: [
      "assets/images/products/fashion/linen-shirt.jpg"
    ],
    shortDesc: "Breathable 100% organic cotton-linen blend casual button-down shirt for effortless summer style.",
    description: "Stay cool and sophisticated. Pre-washed for extra softness and tailored with a modern relaxed fit.",
    specs: {
      "Material": "100% Organic Cotton-Linen",
      "Fit": "Relaxed Fit",
      "Care": "Machine Wash Cold"
    },
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Light Beige", "Sky Blue", "Olive Green"],
    inStock: true,
    featured: false,
    deal: true
  },
  {
    id: "prod-18",
    name: "Ultrasonic Aroma Oil Diffuser",
    category: "Home & Living",
    brand: "Lumina",
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviewsCount: 142,
    image: "assets/images/products/home-living/aroma-diffuser.jpg",
    gallery: [
      "assets/images/products/home-living/aroma-diffuser.jpg"
    ],
    shortDesc: "Whisper-quiet ceramic essential oil humidifier with ambient warm night light.",
    description: "Transform your room into a relaxing spa sanctuary. Automatically shuts off when water runs low and supports continuous 8-hour misting.",
    specs: {
      "Capacity": "300ml",
      "Lighting": "7-Color Warm LED",
      "Timer": "1h / 3h / 6h / ON"
    },
    colors: ["Matte Ceramic White", "Natural Sand"],
    inStock: true,
    featured: true,
    deal: true
  },
  {
    id: "prod-19",
    name: "Natural Rose Quartz Facial Roller & Gua Sha Set",
    category: "Beauty",
    brand: "GlowLab",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.9,
    reviewsCount: 275,
    image: "assets/images/products/beauty/jade-roller.jpg",
    gallery: [
      "assets/images/products/beauty/jade-roller.jpg"
    ],
    shortDesc: "100% authentic Brazilian Rose Quartz face roller and heart-shaped gua sha scraping tool.",
    description: "Relieves facial muscle tension, reduces puffiness, and promotes lymphatic drainage to enhance radiant skin absorption.",
    specs: {
      "Material": "100% Natural Rose Quartz",
      "Includes": "Dual Roller + Gua Sha Tool",
      "Hardware": "Rose Gold Plated"
    },
    inStock: true,
    featured: true,
    deal: false
  }
];
function getAllProducts() {
  return PRODUCTS_DATA;
}

function getProductById(id) {
  return PRODUCTS_DATA.find(p => p.id === id) || null;
}

function getFeaturedProducts() {
  return PRODUCTS_DATA.filter(p => p.featured);
}

function getDealProducts() {
  return PRODUCTS_DATA.filter(p => p.deal);
}

function getProductsByCategory(categoryName) {
  if (!categoryName || categoryName.toLowerCase() === 'all') return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
}
