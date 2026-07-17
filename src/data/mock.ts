export const mockSearchSuggestions = [
  "Đĩa xoay Sharp",
  "Đĩa lò vi sóng 27 cm",
  "Vòng xoay lò vi sóng",
  "Linh kiện máy lạnh",
  "Pin năng lượng mặt trời"
];

export const mockCategories = [
  {
    title: 'Đĩa xoay lò vi sóng',
    description: 'Đa dạng kích thước, phù hợp nhiều thương hiệu.',
    iconName: 'Microwave',
    colSpan: 'col-span-2',
    rowSpan: 'row-span-2',
    isLarge: true,
  },
  {
    title: 'Vòng xoay và trục xoay',
    iconName: 'RotateCw',
  },
  {
    title: 'Linh kiện lò vi sóng',
    iconName: 'Wrench',
  },
  {
    title: 'Linh kiện máy lạnh',
    iconName: 'Snowflake',
  },
  {
    title: 'Linh kiện máy giặt',
    iconName: 'WashingMachine',
  },
  {
    title: 'Thiết bị năng lượng mặt trời',
    description: 'Pin năng lượng và phụ kiện đi kèm.',
    iconName: 'Sun',
    colSpan: 'col-span-2 md:col-span-1 lg:col-span-2',
    isHorizontal: true,
  }
];

export const mockProducts = [
  { id: '1', name: 'Đĩa xoay lò vi sóng Sharp 27cm', price: 150000, oldPrice: 180000, image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', category: 'Đĩa xoay', isNew: true },
  { id: '2', name: 'Trục xoay lò vi sóng đa năng', price: 80000, image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', category: 'Linh kiện' },
  { id: '3', name: 'Tụ điện máy lạnh Panasonic', price: 120000, oldPrice: 150000, image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', category: 'Máy lạnh' },
  { id: '4', name: 'Bo mạch máy giặt Toshiba', price: 450000, image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop', category: 'Máy giặt', isNew: true },
];

export const mockFeatures = [
  { title: 'Tư vấn chính xác', description: 'Hỗ trợ kiểm tra đúng model, đúng kích thước trước khi mua.', iconName: 'CheckCircle2' },
  { title: 'Chất lượng đảm bảo', description: 'Linh kiện chính hãng và hàng thay thế loại 1 bền bỉ.', iconName: 'ShieldCheck' },
  { title: 'Giao hàng toàn quốc', description: 'Đóng gói cẩn thận, chống vỡ cho đĩa thủy tinh.', iconName: 'Truck' },
  { title: 'Hỗ trợ kỹ thuật', description: 'Hướng dẫn tự thay thế linh kiện tại nhà qua Zalo.', iconName: 'Wrench' }
];

export const mockTestimonials = [
  { name: 'Anh Tuấn', role: 'Thợ sửa điện lạnh', content: 'Tôi thường xuyên mua linh kiện ở đây. Giá tốt, giao hàng nhanh và đóng gói rất cẩn thận, đĩa thủy tinh không bao giờ vỡ.', rating: 5 },
  { name: 'Chị Mai', role: 'Khách hàng cá nhân', content: 'Được shop tư vấn rất nhiệt tình, tôi gửi ảnh lò vi sóng cũ là shop chọn đúng loại đĩa vừa y. Rất hài lòng!', rating: 5 },
  { name: 'Chú Hùng', role: 'Khách hàng cá nhân', content: 'Tìm mua trục xoay cũ mấy tiệm không có, may sao lên website Gia Định tìm được ngay. Sẽ ủng hộ lâu dài.', rating: 4 }
];
