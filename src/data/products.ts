import { Product } from '../components/ui/ProductCard';

const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

const rawProductsData: Omit<Product, 'slug'>[] = [
  { 
    id: '1', 
    name: 'Đĩa xoay lò vi sóng Sharp 27cm chấu cài', 
    productCode: 'SH-27C',
    size: '27 cm',
    brand: 'Sharp',
    price: 250000, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Đĩa xoay lò vi sóng', 
    stockStatus: 'in_stock' 
  },
  { 
    id: '2', 
    name: 'Vòng xoay lò vi sóng đa năng 3 bánh xe', 
    productCode: 'VX-01',
    size: 'Phổ thông',
    brand: 'OEM',
    price: 80000, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Vòng xoay và trục xoay',
    badge: 'best_seller'
  },
  { 
    id: '3', 
    name: 'Tụ điện máy lạnh Panasonic chính hãng', 
    productCode: 'TU-PA20',
    brand: 'Panasonic',
    price: 0, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Linh kiện máy lạnh',
    stockStatus: 'in_stock'
  },
  { 
    id: '4', 
    name: 'Bo mạch máy giặt Toshiba Inverter', 
    productCode: 'BM-TS30',
    brand: 'Toshiba',
    price: 450000, 
    category: 'Linh kiện máy giặt', 
    stockStatus: 'out_of_stock'
  },
  { 
    id: '5', 
    name: 'Đĩa xoay lò vi sóng Electrolux 24.5cm', 
    productCode: 'EL-245',
    size: '24.5 cm',
    brand: 'Electrolux',
    price: 180000, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Đĩa xoay lò vi sóng', 
    stockStatus: 'in_stock' 
  },
  { 
    id: '6', 
    name: 'Motor đĩa xoay lò vi sóng 220V', 
    productCode: 'MT-220',
    brand: 'OEM',
    price: 120000, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Linh kiện lò vi sóng', 
    badge: 'new' 
  },
  { 
    id: '7', 
    name: 'Cục nóng máy lạnh Daikin 1HP', 
    productCode: 'DK-1HP',
    brand: 'Daikin',
    price: 3500000, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Linh kiện máy lạnh', 
    stockStatus: 'in_stock' 
  },
  { 
    id: '8', 
    name: 'Đĩa xoay lò vi sóng Samsung 31.5cm', 
    productCode: 'SS-315',
    size: '31.5 cm',
    brand: 'Samsung',
    price: 320000, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Đĩa xoay lò vi sóng', 
    stockStatus: 'low_stock' 
  },
  { 
    id: '9', 
    name: 'Đĩa xoay lò vi sóng LG 34cm', 
    productCode: 'LG-34',
    size: '34 cm',
    brand: 'LG',
    price: 380000, 
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', 
    category: 'Đĩa xoay lò vi sóng', 
    stockStatus: 'in_stock' 
  }
];

export const productsData: Product[] = rawProductsData.map(p => ({
  ...p,
  slug: p.id === '1' ? 'dia-xoay-lo-vi-song-sharp-27cm' : generateSlug(p.name)
}));

export const searchSuggestionsData = [
  "Đĩa xoay Sharp",
  "Đĩa lò vi sóng 27 cm",
  "Vòng xoay lò vi sóng",
  "Linh kiện máy lạnh",
  "Pin năng lượng mặt trời"
];

export const filtersData = {
  categories: [
    "Đĩa xoay lò vi sóng",
    "Vòng xoay và trục xoay",
    "Linh kiện lò vi sóng",
    "Linh kiện máy lạnh",
    "Linh kiện máy giặt"
  ],
  brands: [
    "Sharp",
    "Electrolux",
    "Samsung",
    "LG",
    "Panasonic",
    "Toshiba",
    "Daikin",
    "OEM"
  ],
  sizes: [
    "24.5 cm",
    "27 cm",
    "31.5 cm",
    "34 cm",
    "Phổ thông"
  ]
};

export interface DetailedProduct extends Omit<import('../components/ui/ProductCard').Product, 'id'> {
  id: string;
  gallery?: string[];
  rating?: number;
  ratingCount?: number;
  specifications?: Record<string, string>;
  description?: string;
  compatibility?: string;
}

export const detailedProductsData: DetailedProduct[] = productsData.map(p => ({
  ...p,
  slug: p.id === '1' ? 'dia-xoay-lo-vi-song-sharp-27cm' : p.slug,
  gallery: p.id === '1' ? [
    p.image || '',
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1615367687848-15dcc3fc7b8f?q=80&w=600&auto=format&fit=crop'
  ] : [p.image || ''],
  rating: 4.8,
  ratingCount: 124,
  shortDescription: p.id === '1' ? 'Đĩa thủy tinh chịu nhiệt cao cấp, thay thế trực tiếp cho các dòng lò vi sóng Sharp 20L. Thiết kế gờ nổi chống trượt, đảm bảo thức ăn chín đều. Độ bền cao, dễ dàng vệ sinh.' : 'Sản phẩm chất lượng cao, độ bền ổn định.',
  specifications: p.id === '1' ? {
    'Đường kính': '27 cm (270 mm)',
    'Chất liệu': 'Thủy tinh chịu nhiệt cao cấp',
    'Khớp nối': '3 chấu (hình hoa thị)',
    'Thương hiệu': 'Phù hợp Sharp, Electrolux, Sanyo...'
  } : undefined,
  description: p.id === '1' ? '<p>Đĩa thủy tinh lò vi sóng 27cm là linh kiện thay thế phổ biến cho nhiều dòng lò vi sóng gia đình dung tích từ 20L - 23L. Sản phẩm được làm từ thủy tinh cường lực, chịu được nhiệt độ cao và sự sốc nhiệt thường xuyên trong quá trình hâm nóng thức ăn.</p><p>Thiết kế mặt đáy với ngàm 3 chấu đặc trưng giúp đĩa ăn khớp hoàn hảo với vòng xoay và motor, đảm bảo chuyển động mượt mà, giúp thức ăn chín đều.</p><p class="font-bold text-text-primary mt-4">Lưu ý trước khi mua:</p><ul class="list-disc pl-5 mt-2 space-y-1"><li>Đo lại đường kính đĩa cũ của bạn. Nếu sai số 1-2mm vẫn có thể sử dụng.</li><li>Kiểm tra phần ngàm ở giữa đáy đĩa xem có phải loại 3 chấu hay mặt phẳng.</li></ul>' : '<p>Mô tả chi tiết đang cập nhật.</p>',
}));
