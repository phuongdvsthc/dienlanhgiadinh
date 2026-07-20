export interface Author {
  name: string;
  avatar: string;
  bio: string;
}

export interface TOCItem {
  id: string;
  title: string;
}

export type ContentBlock = 
  | { type: 'html'; html: string }
  | { type: 'callout'; variant: 'warning' | 'info' | 'quick_answer'; title: string; content: string }
  | { type: 'product'; productId: string }
  | { type: 'faq'; items: { question: string; answer: string }[] };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  updatedAt?: string;
  readTime?: string;
  category: string;
  views?: number;
  featured?: boolean;
  author?: Author;
  toc?: TOCItem[];
  contentBlocks?: ContentBlock[];
}

const defaultAuthor: Author = {
  name: 'KS. Nguyễn Văn A',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6Tv-Fw3qclZDL0VMC9qvPg56KNiQk6-51jIoV6mnEXGwyXpnDzmQgveuaCpEcsnbKSxdXbpuSZOo3_McI5sbOV0LvwwodOz9dSmBk-07ZBDk2E6vTE1Q_bgFeRWCwXD8N-_o-uHcP03LdfeXEnkHSKJUT9IH1NlylIKfob82MB4gJiQabtSUBwol2cXeFWcHHypaMBcyW37CNcUuZGp6LPqw71fRZwkyZmGctbaU7_ucj9hK8tP62lY6NQ1dopbEkVqHUOkfyTHpS',
  bio: 'Chuyên gia hệ thống làm lạnh công nghiệp với hơn 15 năm kinh nghiệm thực tế.'
};

export const postsData: BlogPost[] = [
  {
    id: '1',
    slug: 'cach-kiem-tra-dia-xoay-lo-vi-song-co-phu-hop-hay-khong',
    title: 'Cách đo kích thước đĩa xoay lò vi sóng để mua đúng loại',
    excerpt: 'Hướng dẫn chi tiết từng bước cách đo đĩa xoay lò vi sóng bị vỡ hoặc mất, đảm bảo bạn mua đúng loại mâm thủy tinh thay thế vừa khít với trục quay, tránh lãng phí tiền bạc.',
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop',
    date: '10/05/2024',
    updatedAt: '15/10/2024',
    readTime: '5 phút đọc',
    category: 'Lò vi sóng',
    views: 1250,
    featured: true,
    author: defaultAuthor,
    toc: [
      { id: 'why-measure', title: 'Vì sao cần đo đúng kích thước?' },
      { id: 'how-to-measure', title: 'Cách đo đường kính' },
      { id: 'check-center', title: 'Cách kiểm tra chốt giữa' },
      { id: 'find-model', title: 'Cách tìm model lò vi sóng' },
      { id: 'faq', title: 'Câu hỏi thường gặp' }
    ],
    contentBlocks: [
      {
        type: 'callout',
        variant: 'quick_answer',
        title: 'Cách nhanh nhất để chọn đúng đĩa xoay',
        content: '1. Đo đường kính: Đo từ mép này sang mép kia qua tâm đĩa (VD: 24.5cm, 27cm).\n2. Kiểm tra chốt: Quan sát mặt dưới đĩa là mặt phẳng hay có 3 chấu (ngàm).\n3. Gửi Model/Hình: Chụp model phía sau lò gửi Zalo để kỹ thuật báo chuẩn xác nhất.'
      },
      {
        type: 'html',
        html: '<h2 id="why-measure">Vì sao cần đo đúng kích thước?</h2><p>Khi đĩa thủy tinh lò vi sóng bị vỡ, nhiều người thường nghĩ chỉ cần mua một chiếc đĩa cùng hãng là được. Tuy nhiên, mỗi thương hiệu (như Sharp, Panasonic, Electrolux...) lại sản xuất nhiều dòng lò vi sóng với dung tích khác nhau (20L, 23L, 25L, 30L...).</p><p>Nếu mua đĩa quá to, cửa lò sẽ không đóng được hoặc đĩa cạ vào thành lò khi quay. Nếu mua đĩa quá nhỏ, đĩa sẽ dễ bị trượt khỏi vòng xoay, gây đổ vỡ thức ăn bên trong.</p>'
      },
      {
        type: 'callout',
        variant: 'warning',
        title: 'Cảnh báo quan trọng',
        content: 'Tuyệt đối không mua đĩa chỉ dựa vào tên thương hiệu (VD: "Bán cho tôi đĩa lò vi sóng Sharp"). Bạn bắt buộc phải cung cấp kích thước hoặc model lò để tránh mua nhầm, mất thời gian đổi trả.'
      },
      {
        type: 'html',
        html: '<h2 id="how-to-measure">Cách đo đường kính đĩa xoay</h2><p>Nếu đĩa cũ chỉ bị nứt hoặc vỡ làm đôi, bạn có thể ghép lại để đo. Dùng thước cuộn hoặc thước kẻ học sinh đo khoảng cách dài nhất từ mép này sang mép kia (đi qua tâm đĩa).</p><ul><li><strong>Trường hợp đĩa đã vỡ vụn:</strong> Hãy đo khoang bên trong lò. Đo từ tâm trục quay ra đến mép trong cùng của cửa lò, sau đó nhân đôi lên và trừ đi khoảng 1-2cm khoảng hở.</li><li><strong>Các kích thước phổ biến:</strong> 24.5cm, 25.5cm, 27cm, 31.5cm, 34cm.</li></ul>'
      },
      {
        type: 'product',
        productId: '1'
      },
      {
        type: 'html',
        html: '<h2 id="check-center">Cách kiểm tra chốt giữa (ngàm)</h2><p>Kích thước đường kính là chưa đủ, bạn cần xác định loại chốt xoay dưới đáy đĩa. Thông thường có 2 loại chính:</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6"><div class="bg-surface rounded-lg p-4 border border-border/50"><strong class="block text-primary mb-2">Đĩa có 3 chấu (ngàm)</strong><p class="text-sm mb-0">Mặt dưới đĩa có 3 cái gờ lồi lên hình hoa thị. Loại này ăn khớp trực tiếp vào con cóc xoay (trục xoay nhựa) gắn ở tâm lò. Rất phổ biến ở lò Sharp.</p></div><div class="bg-surface rounded-lg p-4 border border-border/50"><strong class="block text-primary mb-2">Đĩa mặt phẳng</strong><p class="text-sm mb-0">Mặt dưới đĩa hoàn toàn nhẵn phẳng. Loại này đặt lên một vòng xoay có bánh xe, vòng xoay này mới là bộ phận truyền động. Phổ biến ở lò Panasonic, Electrolux.</p></div></div>'
      },
      {
        type: 'html',
        html: '<h2 id="find-model">Cách tìm model lò vi sóng</h2><p>Nếu bạn không tự tin vào việc đo đạc, cách chắc chắn 100% là cung cấp mã Model của lò cho nơi bán. Tem chứa mã Model thường được dán ở:</p><ul><li>Mặt sau của lò vi sóng.</li><li>Bên trong khung cửa (khi mở cửa ra sẽ thấy).</li></ul><p>Mã model thường bắt đầu bằng chữ cái và số, ví dụ: R-20A, NN-ST34, EMM20... Hãy chụp rõ nét toàn bộ tem thông số này gửi qua Zalo cho Điện lạnh Gia Định để được tư vấn chính xác loại đĩa cần mua.</p>'
      },
      {
        type: 'faq',
        items: [
          {
            question: 'Đĩa lò vi sóng của tôi 25cm nhưng tôi mua 27cm dùng được không?',
            answer: 'Đa số trường hợp là không được. Khoang lò vi sóng được thiết kế vừa khít với dung tích. Nếu đĩa to hơn 2cm, khi xoay có thể cạ vào vách lò hoặc nắp chắn sóng, gây kẹt hoặc cháy nổ do ma sát. Bạn nên mua đúng kích thước nguyên bản.'
          },
          {
            question: 'Làm sao để biết lò vi sóng nhà tôi dùng đĩa loại nào khi đã vứt đĩa cũ đi?',
            answer: 'Bạn hãy chụp ảnh tem Model dán sau lưng lò và chụp bên trong khoang lò (chỗ trục xoay giữa) gửi qua Zalo cho chúng tôi. Kỹ thuật viên sẽ tra cứu mã part và báo lại chính xác loại đĩa phù hợp cho bạn.'
          },
          {
            question: 'Mua đĩa thủy tinh online có sợ bị vỡ khi giao hàng không?',
            answer: 'Điện lạnh Gia Định bọc hàng rất kỹ bằng nhiều lớp xốp nổ (bubble wrap) và chèn xốp cứng trong hộp carton dày. Tỷ lệ vỡ hỏng trong quá trình vận chuyển gần như bằng 0. Nếu xảy ra rủi ro vỡ do bưu tá, chúng tôi cam kết gửi đền cái mới 100% miễn phí.'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'bao-lau-thi-nen-bao-duong-may-lanh-dinh-ky',
    title: 'Bao lâu thì nên bảo dưỡng máy lạnh định kỳ?',
    excerpt: 'Những dấu hiệu cho thấy máy lạnh của bạn cần được vệ sinh và bảo dưỡng ngay.',
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop',
    date: '08/05/2024',
    category: 'Máy lạnh',
    views: 3420,
    author: defaultAuthor,
    contentBlocks: [
      {
        type: 'html',
        html: '<p>Nội dung chi tiết đang cập nhật...</p>'
      }
    ]
  },
  {
    id: '3',
    slug: 'cach-thay-tu-dien-block-tu-lanh-an-toan',
    title: 'Cách thay tụ điện block tủ lạnh an toàn',
    excerpt: 'Hướng dẫn chi tiết các bước thay thế tụ điện cho block tủ lạnh đảm bảo an toàn.',
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop',
    date: '01/05/2024',
    category: 'Tủ lạnh',
    views: 8230
  },
  {
    id: '4',
    slug: 'tai-sao-dan-nong-may-lanh-keu-to-bat-thuong',
    title: 'Tại sao dàn nóng máy lạnh kêu to bất thường?',
    excerpt: 'Nguyên nhân và cách khắc phục tình trạng dàn nóng máy lạnh phát ra tiếng ồn lớn.',
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop',
    date: '25/04/2024',
    category: 'Máy lạnh',
    views: 6105
  },
  {
    id: '5',
    slug: 'khac-phuc-loi-may-giat-cap-nuoc-lien-tuc',
    title: 'Khắc phục lỗi máy giặt cấp nước liên tục',
    excerpt: 'Hướng dẫn kiểm tra van cấp nước và phao áp lực khi máy giặt không tự ngắt nước.',
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop',
    date: '20/04/2024',
    category: 'Máy giặt',
    views: 4500
  },
  {
    id: '6',
    slug: 'bang-ma-loi-may-lanh-daikin-inverter-moi-nhat',
    title: 'Bảng mã lỗi máy lạnh Daikin Inverter mới nhất',
    excerpt: 'Tổng hợp bảng mã lỗi máy lạnh Daikin Inverter và cách test lỗi bằng remote.',
    image: 'https://images.unsplash.com/photo-1585659722983-3a6750f22f77?q=80&w=600&auto=format&fit=crop',
    date: '15/04/2024',
    category: 'Máy lạnh',
    views: 12450
  }
];

export const blogCategories = [
  "Lò vi sóng",
  "Máy lạnh",
  "Tủ lạnh",
  "Máy giặt",
  "Linh kiện",
  "Năng lượng mặt trời",
  "Mẹo vặt",
  "Kinh nghiệm sử dụng"
];
