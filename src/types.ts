export type ProductCategory = 'all' | 'fresh' | 'artificial' | 'event' | 'accessory';

export type ProductOccasion = 'all' | 'birthday' | 'love' | 'opening' | 'anniversary';

export type PriceFilter = 'all' | 'under500' | '500to1000' | 'over1000';

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'popular';

export interface Product {
  id: string;
  title: string;
  category: 'fresh' | 'artificial' | 'event' | 'accessory';
  occasion: 'birthday' | 'love' | 'opening' | 'anniversary';
  price: number;
  tag: string; // 'Chỉ giao TP.HCM' | 'Giao Toàn Quốc'
  img: string;
  desc: string;
  rating?: number;
  reviewsCount?: number;
  flowers?: string[];
  isBestSeller?: boolean;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  sizeName: string;
  sizeAddon: number;
  wrapColor: string;
  cardMessage: string;
  deliveryTime: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  orderId: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  recipientName: string;
  recipientPhone: string;
  recipientCity: 'hcm' | 'other';
  recipientDistrict: string;
  recipientAddress: string;
  deliveryTimeWindow: string;
  note?: string;
  paymentMode: 'deposit' | 'full';
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  payAmount: number;
  remainingAmount: number;
  status: 'received' | 'making' | 'shipping' | 'delivered';
  timeline: {
    status: 'received' | 'making' | 'shipping' | 'delivered';
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current?: boolean;
  }[];
}
