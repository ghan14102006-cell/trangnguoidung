import { Product } from '../types';

export const PRODUCTS_DB: Product[] = [
  {
    id: 'p1',
    title: 'Bó Hoa Hồng Eos Hàn Quốc',
    category: 'fresh',
    occasion: 'love',
    price: 480000,
    tag: 'Chỉ giao TP.HCM',
    img: 'https://media.istockphoto.com/id/1242962658/vi/anh/hoa-h%E1%BB%93ng-hoa-m%E1%BA%ABu-%C4%91%C6%A1n-m%C3%A0u-h%E1%BB%93ng-hoa-%C4%91%E1%BA%B9p.jpg?s=1024x1024&w=is&k=20&c=PHrJ_c0n43uiKeQ-f3tPAxoeMBGYK-QyYklpqDPkaJM=',
    desc: 'Bó hoa hồng kem kết hợp giấy gói phong cách Hàn Quốc dịu dàng và thanh lịch.',
    rating: 4.9,
    reviewsCount: 38,
    flowers: ['Hồng Eos kem', 'Hoa baby trắng', 'Lá bạc khuynh diệp'],
    isBestSeller: true
  },
  {
    id: 'p2',
    title: 'Bó Tulip Lụa Pink Charm',
    category: 'artificial',
    occasion: 'birthday',
    price: 350000,
    tag: 'Giao Toàn Quốc',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2FZRJXfS51gx7HvYcDxn7PTuyC_8uh0J5crKxyZGiCg&s',
    desc: 'Hoa tulip lụa cao cấp siêu thực, giữ màu vĩnh cửu, tặng kèm túi xách trong suốt.',
    rating: 4.8,
    reviewsCount: 26,
    flowers: ['Tulip lụa 10 bông', 'Giấy gói mờ', 'Nơ ruy băng lụa'],
    isBestSeller: false
  },
  {
    id: 'p3',
    title: 'Lẵng Hoa Khai Trương Rực Rỡ',
    category: 'event',
    occasion: 'opening',
    price: 1250000,
    tag: 'Chỉ giao TP.HCM',
    img: 'https://hoahanoi.com.vn/wp-content/uploads/2022/05/gio-hoa-mung-khai-truong-1.jpg',
    desc: 'Lẵng hoa hồng môn, hướng dương và hoa đồng tiền mang ý nghĩa phát tài phát lộc.',
    rating: 5.0,
    reviewsCount: 19,
    flowers: ['Hồng môn đỏ', 'Hướng dương', 'Đồng tiền vàng', 'Lan mokara'],
    isBestSeller: true
  },
  {
    id: 'p4',
    title: 'Bó Hướng Dương Nắng Ấm',
    category: 'fresh',
    occasion: 'anniversary',
    price: 520000,
    tag: 'Chỉ giao TP.HCM',
    img: 'https://hoatuoi360.vn/upload/hinhanh/thumb/bo-hoa-huong-duong-dep-nhat714.jpg',
    desc: 'Hướng dương Đà Lạt bông to rực rỡ tượng trưng cho năng lượng tích cực và sự trung thành.',
    rating: 4.9,
    reviewsCount: 42,
    flowers: ['Hướng dương Đà Lạt', 'Hoa sao tím', 'Lá trắc bách diệp'],
    isBestSeller: true
  },
  {
    id: 'p5',
    title: 'Hộp Hoa Lụa Vintage Pastel',
    category: 'artificial',
    occasion: 'love',
    price: 680000,
    tag: 'Giao Toàn Quốc',
    img: 'https://www.hoathangba.com/wp-content/uploads/2026/08/1785489919074_4249342021217922167_4249342021217922167_5be61551f76a89b74962f032fead3deb-600x800.jpg',
    desc: 'Hộp mica trong suốt cắm hoa hồng lụa tone màu pastel sang trọng, lưu giữ kỷ niệm vĩnh viễn.',
    rating: 4.7,
    reviewsCount: 15,
    flowers: ['Hồng lụa pastel', 'Cẩm tú cầu lụa', 'Hộp mica cao cấp'],
    isBestSeller: false
  },
  {
    id: 'p6',
    title: 'Bó Cẩm Tú Cầu Xanh Mộng Mơ',
    category: 'fresh',
    occasion: 'birthday',
    price: 420000,
    tag: 'Chỉ giao TP.HCM',
    img: 'https://hoatuoihoamy.com/wp-content/uploads/2022/10/Hinh-3-600x600.jpg.webp',
    desc: 'Hoa cẩm tú cầu xanh bách hợp tượng trưng sự chân thành, biết ơn và tình bạn son sắt.',
    rating: 4.8,
    reviewsCount: 31,
    flowers: ['Cẩm tú cầu Đà Lạt', 'Baby trắng', 'Lá nguyệt quế'],
    isBestSeller: false
  },
  {
    id: 'p7',
    title: 'Bó Hoa Baby Tròn Cầu Vồng',
    category: 'fresh',
    occasion: 'birthday',
    price: 390000,
    tag: 'Chỉ giao TP.HCM',
    img: 'https://hoasapbinhduong.vn/wp-content/uploads/2021/07/z2560758668858_dbaded8c533bfdad69d3b40635a728fc.jpg',
    desc: 'Hoa baby phun màu cầu vồng ngọt ngào, biểu tượng của tình yêu trong sáng, đáng yêu.',
    rating: 4.9,
    reviewsCount: 54,
    flowers: ['Hoa baby nhập khẩu', 'Giấy xốp Hàn Quốc', 'Đèn đom đóm'],
    isBestSeller: true
  },
  {
    id: 'p8',
    title: 'Giỏ Hoa Hồng Đỏ Ecuador Tình Yêu',
    category: 'fresh',
    occasion: 'love',
    price: 1450000,
    tag: 'Chỉ giao TP.HCM',
    img: 'https://hoatuoi360.vn/upload/hinhanh/thumb/bo-hoa-hong-ecuador-noi-nay-co-anh134.jpg',
    desc: 'Hồng đỏ Ecuador nhập khẩu kích thước bông lớn cắm giỏ mây cao cấp dành riêng dịp đặc biệt.',
    rating: 5.0,
    reviewsCount: 22,
    flowers: ['Hồng Ecuador đỏ 15 bông', 'Lan chuông', 'Lá trắc'],
    isBestSeller: false
  },
  {
    id: 'p9',
    title: 'Bó Hoa Hồng Đỏ Lụa',
    category: 'artificial',
    occasion: 'anniversary',
    price: 450000,
    tag: 'Giao Toàn Quốc',
    img: 'https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mfz9vqs66y2y79',
    desc: 'Hoa hồng đỏ lụa nhung mịn màng, cánh hoa dập gân tự nhiên, bền màu không phai.',
    rating: 4.7,
    reviewsCount: 18,
    flowers: ['Hồng đỏ lụa nhung', 'Baby khô', 'Giấy gói đen mờ'],
    isBestSeller: false
  },
  {
    id: 'p10',
    title: 'Kệ Hoa Chúc Mừng Thành Công Bình Thạnh',
    category: 'event',
    occasion: 'opening',
    price: 1600000,
    tag: 'Chỉ giao TP.HCM',
    img: 'https://hoatuoidatviet.vn/thumb/600x667/1/upload/sanpham/ke-hoa-khai-truong-dai-phu-quy-8156.jpg',
    desc: 'Kệ hoa khai trương 2 tầng hoành tráng kết hợp hoa hồng, lan hồ điệp và đồng tiền đại cát.',
    rating: 5.0,
    reviewsCount: 14,
    flowers: ['Lan hồ điệp', 'Hồng cam sa mạc', 'Đồng tiền đỏ', 'Kệ gỗ mộc'],
    isBestSeller: false
  },
  {
    id: 'p11',
    title: 'Phụ Kiện Quà Tặng Kèm Hoa',
    category: 'accessory',
    occasion: 'love',
    price: 280000,
    tag: 'Giao Toàn Quốc',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY0CS3KLJHY9zzqeM3gvp6f4pDjxS-qU1Gbhg6SUFZtKCmmKncJiJoe8A&s=10',
    desc: 'Bộ phụ kiện quà tặng gồm gấu bông mini xinh xắn và thiệp viết tay vintage sang trọng.',
    rating: 4.9,
    reviewsCount: 30,
    flowers: ['Gấu bông nơ len', 'Thiệp hoa sáp ép nổi', 'Túi quà giấy kraft'],
    isBestSeller: false
  }
];

export const INITIAL_TRACKING_ORDER: any = {
  orderId: 'BG-8842',
  createdAt: '2026-10-27 08:30',
  customerName: 'Nguyễn Văn Minh',
  customerPhone: '0903123456',
  recipientName: 'Trần Thị Thu Hà',
  recipientPhone: '0978987654',
  recipientCity: 'hcm',
  recipientDistrict: 'Bình Thạnh',
  recipientAddress: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Phường 22, Bình Thạnh, TP.HCM',
  deliveryTimeWindow: 'Sáng (8h - 12h)',
  note: 'Giao trước 11h giúp mình, gọi người nhận báo quà tặng bất ngờ.',
  paymentMode: 'deposit',
  items: [
    {
      cartItemId: 'sample_1',
      product: PRODUCTS_DB[0],
      sizeName: 'Vừa',
      sizeAddon: 150000,
      wrapColor: 'Hồng Hàn Quốc',
      cardMessage: 'Chúc em một ngày sinh nhật thật ngọt ngào và hạnh phúc bên anh!',
      deliveryTime: 'Sáng (8h - 12h)',
      unitPrice: 630000,
      quantity: 1
    }
  ],
  subtotal: 630000,
  discount: 0,
  shippingFee: 0,
  total: 630000,
  payAmount: 315000,
  remainingAmount: 315000,
  status: 'shipping',
  timeline: [
    {
      status: 'received',
      title: 'Đã Tiếp Nhận Đơn Hàng',
      description: 'Hệ thống đã nhận thông tin đặt hoa và xác nhận khoản đặt cọc 50%.',
      timestamp: '08:30 - 27/10/2026',
      completed: true
    },
    {
      status: 'making',
      title: 'Nghệ Nhân Đang Thiết Kế',
      description: 'Florist xưởng Bình Thạnh đang tuyển chọn bông tươi và bó hoa theo yêu cầu giấy hồng Hàn Quốc.',
      timestamp: '09:15 - 27/10/2026',
      completed: true
    },
    {
      status: 'shipping',
      title: 'Đang Giao Hỏa Tốc',
      description: 'Shipper chuyên biệt vận chuyển bằng thùng chống sốc đang trên đường tới Landmark 81, Bình Thạnh.',
      timestamp: '10:05 - 27/10/2026',
      completed: true,
      current: true
    },
    {
      status: 'delivered',
      title: 'Giao Hoa Thành Công',
      description: 'Giao tận tay người nhận, chụp ảnh nghiệm thu và ký xác nhận.',
      timestamp: 'Dự kiến 10:45',
      completed: false
    }
  ]
};

export function formatVND(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}
