export interface MenuItem {
  id: string;
  name: string;
  nameAr: string;
  category: 'pizza' | 'naan' | 'burger' | 'tacos' | 'box' | 'sides';
  price: number; // in Algerian Dinars (DA)
  ingredients: string;
  ingredientsAr: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  isSignature?: boolean;
  image?: string;
}

export interface CategoryInfo {
  id: 'all' | 'pizza' | 'naan' | 'burger' | 'tacos' | 'box' | 'sides';
  label: string;
  labelAr: string;
  iconName: string;
  description: string;
  descriptionAr: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    label: 'Tout le Menu',
    labelAr: 'جميع الأصناف',
    iconName: 'Utensils',
    description: 'Découvrez toutes les spécialités de Vinàqui Snack à Oran',
    descriptionAr: 'اكتشف جميع مأكولات وسندويتشات فيناكي سناك بوهران'
  },
  {
    id: 'pizza',
    label: 'Pizzas Artisanales',
    labelAr: 'بيتزا إيطالية بالفرن',
    iconName: 'Pizza',
    description: 'Pâte fraîche étalée à la main, sauce mijotée et fromage fondant',
    descriptionAr: 'عجينة طازجة يومياً، جبن ذائب وصلصة طماطم غنية'
  },
  {
    id: 'naan',
    label: 'Naan Cheese',
    labelAr: 'نان بالجبن (سبيسيال)',
    iconName: 'Flame',
    description: 'Pain naan indien cuit minute, farci de fromage et viandes savoureuses',
    descriptionAr: 'خبز نان محشي جبن ساخن مع تشكيلة لحوم وتتبيلات شهية'
  },
  {
    id: 'burger',
    label: 'Burgers Gourmets',
    labelAr: 'برغر لحم ودجاج',
    iconName: 'Beef',
    description: 'Pain brioché toasté, steaks hachés pur bœuf, tenders croustillants',
    descriptionAr: 'برغر بالخبز البريوشي مع شرائح لحم طازجة أو تندرز مقرمش'
  },
  {
    id: 'tacos',
    label: 'Tacos Français',
    labelAr: 'تاكوس فرنسي',
    iconName: 'Layers',
    description: 'Tacos généreusement gratinés avec notre fameuse sauce fromagère',
    descriptionAr: 'تاكوس محمر ومغلف بصلصة الجبن الخاصة الشهيرة'
  },
  {
    id: 'box',
    label: 'Boxes Gourmandes',
    labelAr: 'بوكس سناك',
    iconName: 'Package',
    description: 'Frites croustillantes nappées de sauce fromagère et viandes au choix',
    descriptionAr: 'علب بطاطا مقرمشة غارقة بصلصة الجبن وقطع اللحم أو التندرز'
  },
  {
    id: 'sides',
    label: 'Salades & Boissons',
    labelAr: 'سلطات ومشروبات',
    iconName: 'Coffee',
    description: 'Salade César, frites croustillantes et canettes fraîches',
    descriptionAr: 'سلطة سيزر، بطاطا مقلية ومشروبات غازية منعشة'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- PIZZAS ---
  {
    id: 'pz-marguerite',
    name: 'Marguerite',
    nameAr: 'مارغريتا',
    category: 'pizza',
    price: 500,
    ingredients: "Sauce tomate, cheddar, mozzarella, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، شيدر، موزاريلا، حبق طازج، زيت زيتون',
    isPopular: true
  },
  {
    id: 'pz-napolitaine',
    name: 'Pizza Napolitaine',
    nameAr: 'بيتزا نابوليتان',
    category: 'pizza',
    price: 700,
    ingredients: "Sauce tomate, câpres, anchois, mozzarella, cheddar, olive, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، كبار، أنشوجة، موزاريلا، شيدر، زيتون، حبق، زيت زيتون'
  },
  {
    id: 'pz-vegetarien',
    name: 'Pizza Végétarien',
    nameAr: 'بيتزا نباتية',
    category: 'pizza',
    price: 700,
    ingredients: "Sauce tomate, poivrons, oignons, maïs, tomate cerise, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، فلفل، بصل، ذرة، طماطم كرزية، موزاريلا، شيدر، حبق، زيت زيتون',
    isVegetarian: true
  },
  {
    id: 'pz-mushrooms',
    name: 'Pizza Mushrooms',
    nameAr: 'بيتزا فطر (شومبينيون)',
    category: 'pizza',
    price: 700,
    ingredients: "Sauce au choix, mushrooms, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة حسب الرغبة، فطر طازج، موزاريلا، شيدر، حبق، زيت زيتون'
  },
  {
    id: 'pz-ocean',
    name: 'Pizza Océan',
    nameAr: 'بيتزا أوسيان (تونة)',
    category: 'pizza',
    price: 700,
    ingredients: "Sauce tomate, thon, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، تونة ممتازة، موزاريلا، شيدر، حبق، زيت زيتون'
  },
  {
    id: 'pz-pepperoni',
    name: 'Pizza Pepperoni',
    nameAr: 'بيتزا بيبيروني',
    category: 'pizza',
    price: 750,
    ingredients: "Sauce tomate, pepperoni bœuf, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، شرائح بيبيروني بقري، موزاريلا، شيدر، حبق، زيت زيتون',
    isPopular: true
  },
  {
    id: 'pz-roti-fume',
    name: 'Pizza Rôti Fumé',
    nameAr: 'بيتزا لحم مدخن',
    category: 'pizza',
    price: 750,
    ingredients: "Sauce au choix, rôti fumé, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة حسب الاختيار، لحم مدخن، موزاريلا، شيدر، حبق، زيت زيتون'
  },
  {
    id: 'pz-poulet',
    name: 'Pizza Poulet',
    nameAr: 'بيتزا دجاج متبل',
    category: 'pizza',
    price: 800,
    ingredients: "Sauce tomate, poulet mariné, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، قطع دجاج متبلة، موزاريلا، شيدر، حبق، زيت زيتون',
    isPopular: true
  },
  {
    id: 'pz-boise',
    name: 'Pizza Boisé',
    nameAr: 'بيتزا بوازي (صلصة بيضاء)',
    category: 'pizza',
    price: 800,
    ingredients: "Sauce blanche, escalope, poivron, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة بيضاء كريمة، إسكالوب، فلفل حلو، موزاريلا، شيدر، حبق، زيت زيتون',
    isSignature: true
  },
  {
    id: 'pz-el-carne',
    name: 'Pizza El Carne',
    nameAr: 'بيتزا إل كارني (لحم مفروم)',
    category: 'pizza',
    price: 850,
    ingredients: "Sauce tomate, steak haché assaisonné, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، لحم مفروم متبل، موزاريلا، شيدر، حبق، زيت زيتون',
    isPopular: true
  },
  {
    id: 'pz-4-saisons',
    name: 'Pizza 4 Saisons',
    nameAr: 'بيتزا الفصول الأربعة',
    category: 'pizza',
    price: 850,
    ingredients: "Sauce tomate, steak haché, mushrooms, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، لحم مفروم، فطر، موزاريلا، شيدر، حبق، زيت زيتون'
  },
  {
    id: 'pz-4-fromages',
    name: 'Pizza 4 Fromages',
    nameAr: 'بيتزا 4 أجبان فرنسية',
    category: 'pizza',
    price: 850,
    ingredients: "Sauce au choix, mozzarella, cheddar, gruyère, camembert, basilic, huile d'olive",
    ingredientsAr: 'صلصة، موزاريلا، شيدر، غرويير، كامومبير، حبق، زيت زيتون',
    isPopular: true
  },
  {
    id: 'pz-buffalo',
    name: 'Pizza Buffalo',
    nameAr: 'بيتزا بوفالو دبل لحم',
    category: 'pizza',
    price: 900,
    ingredients: "Sauce tomate, steak haché, pepperoni, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، لحم مفروم، بيبيروني، موزاريلا، شيدر، حبق، زيت زيتون'
  },
  {
    id: 'pz-chevre-miel',
    name: 'Pizza Chèvre Miel',
    nameAr: 'بيتزا جبن ماعز وعسل مع الجوز',
    category: 'pizza',
    price: 900,
    ingredients: "Sauce blanche, fromage de chèvre, les noix, miel pur, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة بيضاء، جبن ماعز، جوز، عسل طبيعي، موزاريلا، شيدر، زيت زيتون',
    isSignature: true
  },
  {
    id: 'pz-marinier',
    name: 'Pizza Marinier',
    nameAr: 'بيتزا فواكه البحر (مارينيي)',
    category: 'pizza',
    price: 1300,
    ingredients: "Sauce tomate, fruits de mer sélectionnés, mozzarella, cheddar, basilic, huile d'olive",
    ingredientsAr: 'صلصة طماطم، فواكه بحر طازجة، موزاريلا، شيدر، حبق، زيت زيتون'
  },

  // --- TACOS ---
  {
    id: 'tc-mini',
    name: 'Tacos Mini',
    nameAr: 'تاكوس صغير',
    category: 'tacos',
    price: 400,
    ingredients: 'Poulet mariné, frites, sauce fromagère maison onctueuse',
    ingredientsAr: 'دجاج متبل، بطاطا مقلية، صلصة الجبن المنزلية الخاصة'
  },
  {
    id: 'tc-poulet',
    name: 'Tacos Poulet',
    nameAr: 'تاكوس دجاج',
    category: 'tacos',
    price: 700,
    ingredients: 'Poulet mariné grillé, frites dorées, sauce fromagère signature',
    ingredientsAr: 'دجاج مشوي، بطاطا مقلية، صلصة الجبن الكريمية',
    isPopular: true
  },
  {
    id: 'tc-viande',
    name: 'Tacos Viande',
    nameAr: 'تاكوس لحم مفروم',
    category: 'tacos',
    price: 800,
    ingredients: 'Viande hachée pur bœuf assaisonnée, frites, sauce fromagère maison',
    ingredientsAr: 'لحم مفروم بقري، بطاطا مقلية، صلصة الجبن الشهيرة'
  },
  {
    id: 'tc-mix',
    name: 'Tacos Mix',
    nameAr: 'تاكوس ميكس (لحم + تندرز)',
    category: 'tacos',
    price: 900,
    ingredients: 'Viande hachée, tenders croustillants de poulet, sauce fromagère maison, frites',
    ingredientsAr: 'لحم مفروم، قطع تندرز مقرمشة، صلصة جبن، بطاطا مقلية',
    isPopular: true
  },
  {
    id: 'tc-vinaqui',
    name: 'Tacos Vinàqui Spécial',
    nameAr: 'تاكوس فيناكي العملاق (3 لحوم)',
    category: 'tacos',
    price: 1100,
    ingredients: 'Viande hachée, tenders croustillants, poulet grillé, sauce fromagère onctueuse, frites',
    ingredientsAr: 'لحم مفروم + تندرز مقرمش + دجاج متبل، صلصة جبن مزدوجة وبطاطا',
    isSignature: true
  },

  // --- NAAN CHEESE ---
  {
    id: 'naan-dynamite',
    name: 'Naan Dynamite',
    nameAr: 'نان ديناميت (حار)',
    category: 'naan',
    price: 600,
    ingredients: 'Pain naan au fromage, sauce Chili thaï épicée, escalope tendre, fromage fondant, crudités',
    ingredientsAr: 'خبز نان بالجبن، صلصة تشيلي تايلاندية حارة، إسكالوب، جبن، سلطة',
    isSpicy: true,
    isPopular: true
  },
  {
    id: 'naan-supreme',
    name: 'Naan Suprême',
    nameAr: 'نان سوبريم (3 تندرز)',
    category: 'naan',
    price: 650,
    ingredients: 'Pain naan au fromage, sauce maison, 3 tenders croustillants, fromage, crudités',
    ingredientsAr: 'خبز نان محشي جبن، صلصة خاصة، 3 قطع تندرز مقرمشة، جبن، سلطة'
  },
  {
    id: 'naan-original',
    name: 'Naan Original',
    nameAr: 'نان أوريجينال',
    category: 'naan',
    price: 650,
    ingredients: 'Pain naan au fromage, sauce, escalope dorée, jambon de dinde, fromage, crudités',
    ingredientsAr: 'خبز نان بالجبن، إسكالوب مشوي، كاشير داند مدخن، جبن، سلطة'
  },
  {
    id: 'naan-royal',
    name: 'Naan Royal',
    nameAr: 'نان رويال (لحم + بيض)',
    category: 'naan',
    price: 650,
    ingredients: 'Pain naan au fromage, sauce, steak haché frais, œuf au plat, fromage, crudités',
    ingredientsAr: 'خبز نان بالجبن، ستيك لحم مفروم، بيض مقلي، جبن ذائب، سلطة'
  },
  {
    id: 'naan-elite',
    name: 'Naan Elite',
    nameAr: 'نان إيليت',
    category: 'naan',
    price: 700,
    ingredients: 'Pain naan au fromage, sauce, steak haché, escalope, jambon de dinde, fromage, crudités',
    ingredientsAr: 'خبز نان بالجبن، ستيك لحم، إسكالوب، كاشير داند، جبن، سلطة',
    isPopular: true
  },
  {
    id: 'naan-beef',
    name: 'Naan Beef (Triple Steak)',
    nameAr: 'نان بيف (3 شرائح لحم)',
    category: 'naan',
    price: 750,
    ingredients: 'Pain naan au fromage, sauce, 3 steaks hachés pur bœuf, fromage coulant, crudités',
    ingredientsAr: 'خبز نان بالجبن، 3 قطع ستيك بقري مفروم، جبن، سلطة'
  },
  {
    id: 'naan-empire',
    name: 'Naan Empire',
    nameAr: 'نان إمباير',
    category: 'naan',
    price: 800,
    ingredients: 'Pain naan au fromage, sauce, steak haché, tenders panés, fromage, crudités',
    ingredientsAr: 'خبز نان بالجبن، ستيك لحم مفروم، تندرز دجاج، جبن، سلطة'
  },
  {
    id: 'naan-ultimate',
    name: 'Naan Ultimate',
    nameAr: 'نان ألتيميت (المزيج الأقوى)',
    category: 'naan',
    price: 800,
    ingredients: 'Pain naan au fromage, sauce, steak haché, tenders croustillants, escalope, fromage, crudités',
    ingredientsAr: 'خبز نان بالجبن، ستيك مفروم، تندرز، إسكالوب، جبن، سلطة',
    isSignature: true
  },
  {
    id: 'naan-ocean',
    name: 'Naan Océan',
    nameAr: 'نان أوسيان (إسكالوب وجمبري)',
    category: 'naan',
    price: 900,
    ingredients: 'Pain naan au fromage, escalope, crevettes sautées, bisque de homard, fromage, crudités',
    ingredientsAr: 'خبز نان بالجبن، إسكالوب، جمبري (كروفيت)، صلصة بيسك هومار، جبن، سلطة'
  },

  // --- BURGERS ---
  {
    id: 'bg-cheese',
    name: 'Cheese Burger',
    nameAr: 'تشيز برغر كلاسيك',
    category: 'burger',
    price: 350,
    ingredients: 'Pain burger brioché, steak haché pur bœuf, fromage cheddar, crudités fraîches',
    ingredientsAr: 'خبز بريوش، شريحة لحم بقري، جبن شيدر، سلطة وخضار طازجة'
  },
  {
    id: 'bg-red',
    name: 'Red Burger',
    nameAr: 'ريد برغر (دبل ستيك)',
    category: 'burger',
    price: 500,
    ingredients: '2 steaks hachés pur bœuf, double fromage cheddar, crudités, sauce maison',
    ingredientsAr: 'شريحتان من اللحم البقري، دبل جبن، خضار وصلصة خاصة'
  },
  {
    id: 'bg-tendino',
    name: 'Tendino Burger',
    nameAr: 'تندينو برغر (دجاج كريسبي)',
    category: 'burger',
    price: 550,
    ingredients: 'Tenders panés ultra croustillants, fromage coulant, crudités fraîches',
    ingredientsAr: 'قطع تندرز مقرمشة، جبن ذائب، خس وطماطم وصلصة خاصة',
    isPopular: true
  },
  {
    id: 'bg-bombe',
    name: 'Bombe Burger',
    nameAr: 'بومب برغر (ستيك محشي جبن)',
    category: 'burger',
    price: 600,
    ingredients: '2 steaks hachés farcis au cœur de fromage fondant, cheddar, crudités',
    ingredientsAr: 'شريحتان لحم مفروم محشوة بالجبن المذاب، شيدر وسلطة',
    isSignature: true
  },
  {
    id: 'bg-snow',
    name: 'Snow Burger',
    nameAr: 'سنو برغر (إسكالوب بالكريمة)',
    category: 'burger',
    price: 650,
    ingredients: 'Escalope tendre nappée de crème champignon onctueuse, fromage, crudités',
    ingredientsAr: 'إسكالوب طري بصلصة الكريمة الغنية، جبن وخضار'
  },
  {
    id: 'bg-mushrooms',
    name: "Mushroom's Burger",
    nameAr: 'ماشرومز برغر (بصل مكرمل وفطر)',
    category: 'burger',
    price: 700,
    ingredients: '2 steaks hachés bœuf, oignons caramélisés doux, champignons sautés, fromage, crudités',
    ingredientsAr: 'شريحتا لحم بقري، بصل مكرمل، فطر سوتيه، جبن، سلطة',
    isPopular: true
  },
  {
    id: 'bg-sanjis',
    name: "Sanji's Burger",
    nameAr: 'سانجيز برغر (لحم + تندرز)',
    category: 'burger',
    price: 750,
    ingredients: 'Steak haché bœuf juteux, tenders croustillants de poulet, double fromage, crudités',
    ingredientsAr: 'ستيك لحم بقري شهي + تندرز دجاج مقرمش، دبل جبن وسلطة',
    isSignature: true
  },

  // --- BOXES ---
  {
    id: 'bx-poulet',
    name: 'Box Poulet',
    nameAr: 'بوكس دجاج متبل',
    category: 'box',
    price: 700,
    ingredients: 'Morceaux de poulet grillé, frites maison, généreuse sauce fromagère fondue, fromage',
    ingredientsAr: 'قطع دجاج متبل، بطاطا مقلية، صلصة الجبن الساخنة، جبن مبشور'
  },
  {
    id: 'bx-tenders',
    name: 'Box Tenders',
    nameAr: 'بوكس تندرز كريسبي',
    category: 'box',
    price: 750,
    ingredients: 'Tenders de poulet croustillants en dés, frites dorées, sauce fromagère onctueuse, fromage',
    ingredientsAr: 'تندرز مقرمش مقطع، بطاطا، كمية وفيرة من صوص الجبن والجبن الذائب',
    isPopular: true
  },
  {
    id: 'bx-viande',
    name: 'Box Viande',
    nameAr: 'بوكس لحم مفروم',
    category: 'box',
    price: 900,
    ingredients: 'Steak haché pur bœuf émietté, frites croustillantes, sauce fromagère, fromage coulant',
    ingredientsAr: 'لحم مفروم بقري، بطاطا مقلية، صلصة جبن، وجبن موزاريلا وشيدر'
  },
  {
    id: 'bx-vinaqui',
    name: 'Box Vinàqui Royale',
    nameAr: 'بوكس فيناكي الملكية (تريو لحوم)',
    category: 'box',
    price: 1300,
    ingredients: 'La totale : Viande hachée, poulet mariné, tenders croustillants, frites, cascade de sauce fromagère & fromage',
    ingredientsAr: 'لحم مفروم + دجاج متبل + تندرز مقرمش، بطاطا مقلية وطوفان من صلصة الجبن اللذيذة',
    isSignature: true
  },

  // --- SIDES, SALADS & DRINKS ---
  {
    id: 'sd-cesar',
    name: 'Salade César',
    nameAr: 'سلطة سيزر بالدجاج',
    category: 'sides',
    price: 600,
    ingredients: 'Salade croquante, poulet grillé, croûtons dorés, copeaux de fromage, sauce César maison',
    ingredientsAr: 'سلطة خضراء طازجة، دجاج مشوي، قطع خبز محمصة، جبن وصلصة سيزر'
  },
  {
    id: 'sd-frite',
    name: 'Portion de Frite',
    nameAr: 'صحن بطاطا مقلية',
    category: 'sides',
    price: 200,
    ingredients: 'Frites croustillantes dorées à l’extérieur, fondantes à l’intérieur',
    ingredientsAr: 'بطاطا مقلية مقرمشة وذهبية'
  },
  {
    id: 'sd-canette',
    name: 'Canette Fraîche (33cl)',
    nameAr: 'مشروب غازي بارد (علبة)',
    category: 'sides',
    price: 100,
    ingredients: 'Coca-Cola, Pepsi, Fanta, Sprite, Schweppes, Selecto (au choix)',
    ingredientsAr: 'كوكاكولا، سيلكتو، بيبسي، فانتا، سبرايت (حسب الاختيار)'
  },
  {
    id: 'sd-menu-formule',
    name: 'Formule Menu (Frite + Canette)',
    nameAr: 'عرض مينو كامل (بطاطا + مشروب)',
    category: 'sides',
    price: 250,
    ingredients: 'Ajoutez une grande portion de frites et une boisson fraîche à votre sandwich',
    ingredientsAr: 'أضف بطاطا مقلية مقرمشة ومشروب غازي مع أي وجبة'
  }
];

export const SAUCE_OPTIONS = [
  { id: 'fromagere', name: 'Sauce Fromagère Maison', nameAr: 'صلصة الجبن الخاصة' },
  { id: 'blanche', name: 'Sauce Blanche', nameAr: 'صلصة بيضاء' },
  { id: 'algerienne', name: 'Sauce Algérienne', nameAr: 'صلصة جزائرية' },
  { id: 'samourai', name: 'Sauce Samouraï (Piquante)', nameAr: 'صلصة ساموراي حارة' },
  { id: 'barbecue', name: 'Sauce Barbecue BBQ', nameAr: 'صلصة باربكيو' },
  { id: 'chili-thai', name: 'Sauce Chili Thaï Douce', nameAr: 'صلصة تشيلي تايلاندية' },
  { id: 'mayo-ketchup', name: 'Ketchup & Mayonnaise', nameAr: 'كاتشب ومايونيز' }
];

export const CHEESE_SUPPLEMENTS = [
  { id: 'gruyere', name: 'Gruyère Affiné', nameAr: 'جبن غرويير', price: 200 },
  { id: 'gouda', name: 'Gouda Fondant', nameAr: 'جبن غودا', price: 200 },
  { id: 'camembert', name: 'Camembert Français', nameAr: 'جبن كامومبير', price: 200 }
];

export const DELIVERY_ZONES = [
  { id: 'mirocho', name: 'Mirocho (Quartier Vinàqui)', nameAr: 'ميروشو (قرب المحل)', fee: 100, time: '15-25 min' },
  { id: 'akid-lotfi', name: 'Akid Lotfi', nameAr: 'عقيد لطفي', fee: 200, time: '25-35 min' },
  { id: 'maraval', name: 'Maraval', nameAr: 'مارافال', fee: 200, time: '25-35 min' },
  { id: 'courbet', name: 'Courbet / Gambetta', nameAr: 'كوربي / غامبيطا', fee: 250, time: '30-40 min' },
  { id: 'plateau', name: 'Plateau / Centre-Ville', nameAr: 'بلاتو / وسط المدينة', fee: 250, time: '30-40 min' },
  { id: 'usto', name: 'USTO / Bir El Djir', nameAr: 'إيسطو / بئر الجير', fee: 300, time: '35-45 min' },
  { id: 'es-senia', name: 'Es Sénia / Aéroport', nameAr: 'السانية', fee: 300, time: '35-45 min' },
  { id: 'canastel', name: 'Canastel / Belgaïd', nameAr: 'كناستيل / بلقايد', fee: 350, time: '40-50 min' }
];
