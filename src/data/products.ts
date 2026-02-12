export interface Product {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: string;
  pricePeriod: string;
  badge?: string;
  badgeColor?: string;
  imageUrl: string;
  imageAlt: string;
  category: 'phones' | 'sim' | 'broadband' | 'wearables';
  highlights: string[];
}

export const products: Product[] = [
  // Phones
  {
    name: 'iPhone 17',
    slug: 'iphone-17',
    description: 'The latest iPhone with A19 chip, 48MP camera system, and Dynamic Island.',
    longDescription:
      'The iPhone 17 delivers a powerful leap forward with the A19 chip, an advanced 48MP camera system, and the immersive Dynamic Island. Featuring all-day battery life, a stunning Super Retina XDR display, and Apple Intelligence built in, it redefines what a smartphone can do. Available on flexible pay monthly plans with 3 months half price when you switch.',
    price: '£45.99',
    pricePeriod: '/month',
    badge: 'New',
    badgeColor: 'purple',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-17-series/iphone-17/iphone-17-620x620px.png',
    imageAlt: 'iPhone 17',
    category: 'phones',
    highlights: [
      'A19 chip for blazing-fast performance',
      '48MP advanced camera system',
      'Dynamic Island for alerts & Live Activities',
      'All-day battery life',
      'Apple Intelligence built in',
      'USB-C connectivity',
    ],
  },
  {
    name: 'iPhone Air',
    slug: 'iphone-air',
    description: 'Ultra-thin design with all the power of iPhone. The thinnest iPhone ever made.',
    longDescription:
      'The iPhone Air is the thinnest iPhone ever made, delivering stunning design without compromising on power. With a sleek aluminium body, a gorgeous edge-to-edge display, and the A19 chip under the hood, it offers the full iPhone experience in an ultra-portable form factor. Perfect for those who want premium performance with a lighter footprint.',
    price: '£49.99',
    pricePeriod: '/month',
    badge: 'New',
    badgeColor: 'blue',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-17-series/iphone-air/iphone-air-620x620px.png',
    imageAlt: 'iPhone Air',
    category: 'phones',
    highlights: [
      'Thinnest iPhone ever made',
      'A19 chip for powerful performance',
      'Edge-to-edge OLED display',
      'Lightweight aluminium design',
      'Apple Intelligence built in',
      'All-day battery life',
    ],
  },
  {
    name: 'iPhone 17 Pro',
    slug: 'iphone-17-pro',
    description: 'Pro-level camera, titanium design, and the most powerful iPhone chip ever.',
    longDescription:
      'The iPhone 17 Pro is built for professionals and power users. Featuring a grade 5 titanium frame, the A19 Pro chip, and a triple-lens 48MP camera system with 5x optical zoom, it delivers desktop-class performance in your pocket. ProRes video recording, Action mode stabilisation, and the most advanced display technology make this the ultimate creative tool.',
    price: '£54.99',
    pricePeriod: '/month',
    badge: 'Pro',
    badgeColor: 'gray',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-17-series/iphone-17-pro/iphone-17-pro-620x620px.png',
    imageAlt: 'iPhone 17 Pro',
    category: 'phones',
    highlights: [
      'A19 Pro chip — fastest iPhone chip ever',
      'Grade 5 titanium frame',
      '48MP triple camera with 5x optical zoom',
      'ProRes & Log video recording',
      'Always-On ProMotion display',
      'USB-C with Thunderbolt speeds',
    ],
  },
  {
    name: 'iPhone 17 Pro Max',
    slug: 'iphone-17-pro-max',
    description:
      'The ultimate iPhone. Largest display, longest battery life, most powerful camera.',
    longDescription:
      "The iPhone 17 Pro Max is Apple's most advanced smartphone ever. With the largest Super Retina XDR display, the longest battery life in any iPhone, and the most powerful camera system featuring a 48MP main, ultra-wide, and telephoto lens with 5x zoom. The A19 Pro Max chip handles anything you throw at it, from console-quality gaming to professional video editing.",
    price: '£59.99',
    pricePeriod: '/month',
    badge: 'Pro Max',
    badgeColor: 'gray',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-17-series/iphone-17-pro-max/iphone-17-pro-max-620x620px.png',
    imageAlt: 'iPhone 17 Pro Max',
    category: 'phones',
    highlights: [
      'Largest ever iPhone display',
      'Longest battery life in any iPhone',
      'A19 Pro Max chip',
      '48MP triple camera with 5x optical zoom',
      'Titanium design — premium build',
      'Up to 2TB storage',
    ],
  },
  {
    name: 'iPhone 16e',
    slug: 'iphone-16e',
    description:
      'Essential iPhone experience. Apple Intelligence built in, at an incredible price.',
    longDescription:
      "The iPhone 16e brings the essential iPhone experience at an incredible price. With Apple Intelligence built in, a powerful A16 Bionic chip, and a stunning 6.1-inch OLED display, you get all the features that matter without the premium price tag. It's the perfect entry point to the iPhone ecosystem with Face ID, a high-quality camera, and all-day battery life.",
    price: '£29.99',
    pricePeriod: '/month',
    badge: 'Value',
    badgeColor: 'green',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-16-series/iphone-16e/iphone-16e-white-logo-1100x1100.png',
    imageAlt: 'iPhone 16e in White',
    category: 'phones',
    highlights: [
      'Apple Intelligence built in',
      'A16 Bionic chip',
      '6.1-inch OLED display',
      'Face ID security',
      'All-day battery life',
      'Incredible value',
    ],
  },
  {
    name: 'iPhone 15',
    slug: 'iphone-15',
    description: 'Incredible value with Dynamic Island, 48MP camera, and USB-C.',
    longDescription:
      'The iPhone 15 remains one of the best smartphones available, offering incredible value with the Dynamic Island, a 48MP main camera, and USB-C connectivity. The A16 Bionic chip powers smooth performance for gaming, photography, and everyday tasks. Now available at an even better price on pay monthly plans with 3 months half price.',
    price: '£35.99',
    pricePeriod: '/month',
    badge: 'Popular',
    badgeColor: 'red',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/apple/iphone-15/popular-deals-tile-620px-iphone15-pink-dmcd.png',
    imageAlt: 'iPhone 15 in Pink',
    category: 'phones',
    highlights: [
      'Dynamic Island',
      '48MP main camera',
      'USB-C connectivity',
      'A16 Bionic chip',
      'Ceramic Shield front',
      '3 months half price when you switch',
    ],
  },
  {
    name: 'Samsung Galaxy S25 Ultra',
    slug: 'samsung-galaxy-s25-ultra',
    description: 'The ultimate Galaxy experience. Titanium frame, S Pen, 200MP camera.',
    longDescription:
      "The Samsung Galaxy S25 Ultra is the ultimate Android flagship. Built with a titanium frame and armed with Galaxy AI, it features a stunning 200MP camera, built-in S Pen for precision control, and a massive 6.9-inch QHD+ display. With Snapdragon 8 Elite power and 5000mAh battery, it's designed for those who demand the very best.",
    price: '£56.99',
    pricePeriod: '/month',
    badge: 'Flagship',
    badgeColor: 'yellow',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/s25-range/hub-and-series-page/620x620-samsung-s25-ultra.png',
    imageAlt: 'Samsung Galaxy S25 Ultra',
    category: 'phones',
    highlights: [
      'Titanium frame construction',
      '200MP camera system',
      'Built-in S Pen',
      'Galaxy AI features',
      'Snapdragon 8 Elite processor',
      '6.9-inch QHD+ display',
    ],
  },
  {
    name: 'Samsung Galaxy S25+',
    slug: 'samsung-galaxy-s25-plus',
    description: 'Flagship performance with Galaxy AI and a stunning 6.7-inch display.',
    longDescription:
      'The Samsung Galaxy S25+ delivers flagship performance with Galaxy AI intelligence in a sleek, refined design. The 6.7-inch Dynamic AMOLED 2X display is vibrant and immersive, while the triple camera system captures stunning photos in any light. With all-day battery life and rapid charging, it keeps up with your busiest days.',
    price: '£44.99',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/s25-range/hub-and-series-page/620x620-samsung-s25-plus.png',
    imageAlt: 'Samsung Galaxy S25+',
    category: 'phones',
    highlights: [
      '6.7-inch Dynamic AMOLED 2X display',
      'Galaxy AI built in',
      'Triple camera system',
      'All-day battery with rapid charging',
      'Snapdragon 8 Elite processor',
      'IP68 water resistance',
    ],
  },
  {
    name: 'Samsung Galaxy S25',
    slug: 'samsung-galaxy-s25',
    description: 'Galaxy AI in a compact size. Perfect balance of power and portability.',
    longDescription:
      'The Samsung Galaxy S25 packs flagship features into a compact, pocketable design. Galaxy AI helps you do more with smart suggestions, translation, and creative tools. The 50MP camera captures beautiful photos, the 6.2-inch display is bright and responsive, and the all-day battery keeps you going. A perfect balance of power and portability.',
    price: '£39.99',
    pricePeriod: '/month',
    badge: 'Best Seller',
    badgeColor: 'green',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/s25-range/hub-and-series-page/620x620-samsung-s25-blue.png',
    imageAlt: 'Samsung Galaxy S25 in Blue',
    category: 'phones',
    highlights: [
      'Compact flagship design',
      'Galaxy AI features',
      '50MP triple camera',
      '6.2-inch Dynamic AMOLED display',
      'All-day battery life',
      'Snapdragon 8 Elite chip',
    ],
  },
  {
    name: 'Samsung Galaxy S25 Edge',
    slug: 'samsung-galaxy-s25-edge',
    description:
      'The slimmest Galaxy ever. Premium titanium silver finish with edge-to-edge display.',
    longDescription:
      'The Samsung Galaxy S25 Edge is the slimmest Galaxy smartphone ever created. With a stunning titanium silver finish and edge-to-edge display, it turns heads everywhere. Despite its ultra-thin profile, it packs in powerful Galaxy AI features, a capable camera system, and enough battery to last all day. Premium design meets everyday practicality.',
    price: '£52.99',
    pricePeriod: '/month',
    badge: 'New',
    badgeColor: 'purple',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/s25-range/hub-and-series-page/620x620-samsung-s25-edge-titanium-silver.png',
    imageAlt: 'Samsung Galaxy S25 Edge in Titanium Silver',
    category: 'phones',
    highlights: [
      'Slimmest Galaxy ever',
      'Titanium silver finish',
      'Edge-to-edge display',
      'Galaxy AI built in',
      'Premium camera system',
      'Ultra-thin design',
    ],
  },
  {
    name: 'Samsung Galaxy Z Fold7',
    slug: 'samsung-galaxy-z-fold7',
    description: 'Unfold your world. Tablet-sized display that fits in your pocket.',
    longDescription:
      "The Samsung Galaxy Z Fold7 unfolds a tablet-sized 7.6-inch display from your pocket. Multitask like never before with split-screen apps, take stunning photos with the advanced triple camera, and enjoy Galaxy AI features designed for the foldable form factor. It's the ultimate productivity device for work and play.",
    price: '£58.99',
    pricePeriod: '/month',
    badge: 'Foldable',
    badgeColor: 'cyan',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/flip7-and-fold7/hub-and-series-page/620x620-samsung-z-fold7-blue-shadow.png',
    imageAlt: 'Samsung Galaxy Z Fold7',
    category: 'phones',
    highlights: [
      '7.6-inch foldable main display',
      'Tablet productivity in your pocket',
      'Advanced triple camera system',
      'Galaxy AI for foldables',
      'Multi-window multitasking',
      'S Pen compatible',
    ],
  },
  {
    name: 'Samsung Galaxy Z Flip7',
    slug: 'samsung-galaxy-z-flip7',
    description: 'Compact and stylish foldable with FlexWindow and hands-free selfies.',
    longDescription:
      'The Samsung Galaxy Z Flip7 brings style and innovation together in a compact foldable design. The large FlexWindow lets you check notifications, take selfies, and control apps without opening the phone. Hands-free selfies with FlexMode, Galaxy AI features, and a vibrant 6.7-inch internal display make this the most stylish phone around.',
    price: '£42.99',
    pricePeriod: '/month',
    badge: 'Foldable',
    badgeColor: 'cyan',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/flip7-and-fold7/hub-and-series-page/620x620-samsung-z-flip7-blue-shadow.png',
    imageAlt: 'Samsung Galaxy Z Flip7',
    category: 'phones',
    highlights: [
      'FlexWindow external display',
      'Hands-free selfie mode',
      'Compact foldable design',
      'Galaxy AI built in',
      '6.7-inch internal display',
      'Stylish and pocketable',
    ],
  },
  {
    name: 'Samsung Galaxy Z Flip7 FE',
    slug: 'samsung-galaxy-z-flip7-fe',
    description: 'The foldable for everyone. Galaxy Z Flip experience at an accessible price.',
    longDescription:
      "The Samsung Galaxy Z Flip7 FE makes foldable technology accessible to everyone. Get the iconic flip design, FlexWindow functionality, and Galaxy AI features at a more affordable price. It's the perfect way to experience foldable innovation without the premium price tag, with all the essentials you need in a fun, compact form factor.",
    price: '£32.99',
    pricePeriod: '/month',
    badge: 'Value',
    badgeColor: 'green',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/samsung/flip7-and-fold7/hub-and-series-page/620x620-samsung-z-flip7-fe-white.png',
    imageAlt: 'Samsung Galaxy Z Flip7 FE in White',
    category: 'phones',
    highlights: [
      'Affordable foldable experience',
      'FlexWindow functionality',
      'Galaxy AI features',
      'Compact flip design',
      'Great value for money',
      'Full Galaxy ecosystem',
    ],
  },
  {
    name: 'Google Pixel 10 Pro',
    slug: 'google-pixel-10-pro',
    description: 'AI-powered photography with Gemini built in. The smartest Pixel yet.',
    longDescription:
      'The Google Pixel 10 Pro is the smartest smartphone ever made, with Gemini AI built right in. The advanced camera system with AI-enhanced computational photography takes stunning photos in any lighting condition. Seven years of software updates, a beautiful 6.7-inch LTPO OLED display, and the Tensor G5 chip deliver a pure, intelligent Android experience.',
    price: '£42.99',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/google/pixel-10/google-pixel-10-pro-logo-1100-1100px.png',
    imageAlt: 'Google Pixel 10 Pro',
    category: 'phones',
    highlights: [
      'Gemini AI built in',
      'AI-enhanced computational photography',
      'Google Tensor G5 chip',
      '7 years of software updates',
      '6.7-inch LTPO OLED display',
      'Pure Android experience',
    ],
  },
  {
    name: 'HONOR Magic V5',
    slug: 'honor-magic-v5',
    description: 'Ultra-thin foldable with incredible display and premium design.',
    longDescription:
      'The HONOR Magic V5 pushes the boundaries of foldable design with an impossibly thin profile that feels like a regular smartphone when closed. The massive internal display is stunning for media and productivity, while the advanced camera system captures beautiful moments. MagicOS delivers smart AI features that adapt to how you use your phone.',
    price: '£52.99',
    pricePeriod: '/month',
    badge: 'Hot',
    badgeColor: 'orange',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/honor/magic-v5/620x620-honor-magic-v5-black.png',
    imageAlt: 'HONOR Magic V5 in Black',
    category: 'phones',
    highlights: [
      'Ultra-thin foldable design',
      'Large immersive internal display',
      'Advanced camera system',
      'MagicOS with AI features',
      'Premium build quality',
      'All-day battery life',
    ],
  },
  {
    name: 'Motorola Razr 60 Ultra',
    slug: 'motorola-razr-60-ultra',
    description:
      'Iconic flip design meets modern tech. Large external display and powerful camera.',
    longDescription:
      'The Motorola Razr 60 Ultra brings the iconic Razr flip design into the modern era. The large external display lets you do more without opening the phone — check messages, snap selfies, and control music. Inside, a vibrant pOLED display and powerful Snapdragon processor deliver a premium smartphone experience in a fun, compact package.',
    price: '£38.99',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/phones/motorola/razr-60-ultra/620x620-motorola-razr-60-ultra.png',
    imageAlt: 'Motorola Razr 60 Ultra',
    category: 'phones',
    highlights: [
      'Iconic Razr flip design',
      'Large external display',
      'Powerful Snapdragon processor',
      'Premium pOLED internal display',
      'Advanced camera system',
      'Compact and pocketable',
    ],
  },
  // SIM Only
  {
    name: 'Unlimited SIM',
    slug: 'unlimited-sim',
    description: 'Unlimited data, calls and texts. No speed caps. 30-day or 24-month plans.',
    longDescription:
      "Get truly unlimited data, calls, and texts with no speed caps and no fair usage restrictions. Stream, download, and browse as much as you want on the UK's fastest 5G network. Choose from flexible 30-day rolling contracts or save more with a 24-month plan. Perfect for heavy data users who don't want to worry about limits.",
    price: '£10',
    pricePeriod: '/month',
    badge: 'Best Seller',
    badgeColor: 'green',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/sim/sim-630px-new.png',
    imageAlt: 'Three SIM Card',
    category: 'sim',
    highlights: [
      'Truly unlimited data',
      'No speed caps',
      'Unlimited calls and texts',
      '5G included at no extra cost',
      '30-day or 24-month plans',
      'Keep your number when you switch',
    ],
  },
  {
    name: '100GB SIM',
    slug: '100gb-sim',
    description: '100GB of data with unlimited calls and texts. Perfect for most users.',
    longDescription:
      "Our 100GB SIM plan gives you plenty of data for streaming, browsing, and social media, along with unlimited calls and texts. 5G is included at no extra cost, so you'll enjoy the fastest speeds available in your area. A great mid-range option for users who want plenty of data without paying for unlimited.",
    price: '£8',
    pricePeriod: '/month',
    badge: 'Value',
    badgeColor: 'blue',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/sim/sim-630px-new.png',
    imageAlt: 'Three 100GB SIM Card',
    category: 'sim',
    highlights: [
      '100GB monthly data',
      'Unlimited calls and texts',
      '5G included free',
      'EU roaming included',
      'Flexible contract lengths',
      'Great value for most users',
    ],
  },
  {
    name: '40GB SIM',
    slug: '40gb-sim',
    description: '40GB of data with unlimited calls and texts. Great for light users.',
    longDescription:
      "The 40GB SIM plan is ideal for light to moderate data users. With 40GB of 5G-ready data plus unlimited calls and texts, it covers everyday browsing, social media, and email with ease. It's our most affordable data plan, perfect for those who mainly use Wi-Fi at home but want reliable coverage on the go.",
    price: '£6',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/sim/sim-630px-new.png',
    imageAlt: 'Three 40GB SIM Card',
    category: 'sim',
    highlights: [
      '40GB monthly data',
      'Unlimited calls and texts',
      '5G ready',
      'EU roaming included',
      'Most affordable plan',
      'Perfect for light users',
    ],
  },
  {
    name: 'Pay As You Go SIM',
    slug: 'payg-sim',
    description:
      'Top up as you go. No contract, no commitment. Keep full control of your spending.',
    longDescription:
      'Our Pay As You Go SIM puts you in complete control. No monthly commitment, no contract — just top up when you need to. The SIM is completely free, and you only pay for what you use. Perfect for kids, secondary devices, or anyone who prefers to manage their spending carefully. Order your free SIM today and activate online in minutes.',
    price: '£0',
    pricePeriod: 'Free SIM',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/sim/sim-630px-new.png',
    imageAlt: 'Three PAYG SIM Card',
    category: 'sim',
    highlights: [
      'Free SIM card',
      'No contract required',
      'Top up as you go',
      'Full spending control',
      '5G access included',
      'Activate online in minutes',
    ],
  },
  // Broadband
  {
    name: '5G Home Broadband',
    slug: '5g-home-broadband',
    description:
      'Ultra-fast 5G broadband for your home. No landline needed. Plug in and go in minutes.',
    longDescription:
      "Get ultra-fast 5G broadband for your home without the need for a landline or engineer visit. Simply plug in the router and connect to blazing-fast 5G speeds in minutes. With average download speeds of 150Mbps, it's perfect for streaming 4K content, gaming online, and connecting multiple devices. Save £200 when you switch from your current provider.",
    price: '£20',
    pricePeriod: '/month',
    badge: 'Save £200',
    badgeColor: 'green',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/broadband/wifi-graphic-1500x750.png',
    imageAlt: 'Three 5G Home Broadband',
    category: 'broadband',
    highlights: [
      'Average 150Mbps download speeds',
      'No landline needed',
      'Plug in and go setup',
      'No engineer visit required',
      'Save £200 when you switch',
      'Connect multiple devices',
    ],
  },
  {
    name: 'Home Broadband Plus',
    slug: 'home-broadband-plus',
    description: 'Our fastest home broadband. Ideal for streaming, gaming, and working from home.',
    longDescription:
      'Home Broadband Plus delivers our fastest home internet experience with priority 5G speeds and a premium router with extended coverage. With average download speeds over 300Mbps, it handles 4K streaming on multiple screens, lag-free gaming, and seamless video calls simultaneously. Ideal for busy households and remote workers who demand the best.',
    price: '£30',
    pricePeriod: '/month',
    badge: 'Fastest',
    badgeColor: 'purple',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/pages/broadband/broadband-hbb-1600x1040.jpg',
    imageAlt: 'Three Home Broadband Plus',
    category: 'broadband',
    highlights: [
      'Average 300Mbps+ download speeds',
      'Priority 5G connection',
      'Premium router with extended range',
      'Perfect for multiple 4K streams',
      'Low latency for gaming',
      'Ideal for working from home',
    ],
  },
  {
    name: 'Mobile Broadband',
    slug: 'mobile-broadband',
    description: 'Portable Wi-Fi on the go. Connect multiple devices anywhere with 5G coverage.',
    longDescription:
      'Take your broadband anywhere with our portable Mobile Broadband device. Connect up to 20 devices to fast 5G speeds wherever you have coverage — perfect for travelling, commuting, or working remotely. The compact device fits in your bag and provides hours of battery life for a full day of connectivity on the move.',
    price: '£12',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/pages/broadband/broadband-mbb-1600x1040.jpeg',
    imageAlt: 'Three Mobile Broadband',
    category: 'broadband',
    highlights: [
      'Portable Wi-Fi device',
      'Connect up to 20 devices',
      '5G speeds on the go',
      'All-day battery life',
      'Perfect for travel & commuting',
      'Compact and lightweight',
    ],
  },
  // Wearables
  {
    name: 'Samsung Galaxy Watch Ultra',
    slug: 'samsung-galaxy-watch-ultra',
    description:
      'Built for extreme adventures. Titanium grade, dual-frequency GPS, 100m water resistance.',
    longDescription:
      "The Samsung Galaxy Watch Ultra is built for those who push boundaries. Crafted from titanium grade material with 100m water resistance and dual-frequency GPS, it's ready for any adventure — from deep-sea diving to mountain climbing. Advanced health sensors track everything from heart rate to body composition, while Galaxy AI provides personalised fitness insights.",
    price: '£24.99',
    pricePeriod: '/month',
    badge: 'New',
    badgeColor: 'orange',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/wearables/samsung/watch8/620x620-samsung-watch-ultra-2025.png',
    imageAlt: 'Samsung Galaxy Watch Ultra',
    category: 'wearables',
    highlights: [
      'Titanium grade construction',
      '100m water resistance',
      'Dual-frequency GPS',
      'Advanced health sensors',
      'Galaxy AI fitness insights',
      'Multi-day battery life',
    ],
  },
  {
    name: 'Samsung Galaxy Watch8 Classic',
    slug: 'samsung-galaxy-watch8-classic',
    description: 'Classic design meets smart tech. Rotating bezel, health tracking, and Galaxy AI.',
    longDescription:
      'The Samsung Galaxy Watch8 Classic combines timeless watchmaking design with cutting-edge smart technology. The signature rotating bezel provides intuitive navigation, while comprehensive health tracking monitors your heart rate, sleep quality, stress levels, and body composition. Galaxy AI delivers personalised wellness recommendations to keep you at your best.',
    price: '£18.99',
    pricePeriod: '/month',
    imageUrl:
      'https://www.three.co.uk/content/dam/threedigital/new-dam-structure-temp/device-images/wearables/samsung/watch8/620x620-samsung-watch8-classic.png',
    imageAlt: 'Samsung Galaxy Watch8 Classic',
    category: 'wearables',
    highlights: [
      'Classic rotating bezel design',
      'Comprehensive health tracking',
      'Galaxy AI wellness insights',
      'Heart rate & sleep monitoring',
      'Body composition analysis',
      'Premium stainless steel build',
    ],
  },
];

export const categoryLabels: Record<string, string> = {
  phones: 'Phones',
  sim: 'SIM Only',
  broadband: 'Broadband',
  wearables: 'Wearables',
};

export const categories = ['phones', 'sim', 'broadband', 'wearables'] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
