import React, { useState } from 'react';
import { RotateCcw, ShoppingBag, Star, Sparkles, Check, Heart, Hand } from 'lucide-react';
import { Product, CartItem } from '../types';
import { formatVND } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: Omit<CartItem, 'cartItemId'>) => void;
  onToast: (message: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToast,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [sizeAddon, setSizeAddon] = useState<number>(0);
  const [wrapColor, setWrapColor] = useState<string>('Hồng Hàn Quốc');
  const [cardMessage, setCardMessage] = useState<string>('');
  const [deliveryTime, setDeliveryTime] = useState<string>('Sáng (8h - 12h)');
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const calculatedPrice = product.price + sizeAddon;

  const getSizeName = (addon: number) => {
    if (addon === 0) return 'Nhỏ (Tiêu chuẩn)';
    if (addon === 150000) return 'Vừa (Thêm 30% hoa)';
    return 'Lớn (Phiên bản đặc biệt)';
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart({
      product,
      sizeName: getSizeName(sizeAddon),
      sizeAddon,
      wrapColor,
      cardMessage: cardMessage.trim() || 'Không in lời chúc',
      deliveryTime,
      unitPrice: calculatedPrice,
      quantity: 1,
    });
    onToast(`Đã thêm "${product.title}" vào giỏ hàng!`);
    setIsFlipped(false);
  };

  const quickMessages = [
    'Chúc mừng sinh nhật vui vẻ & rạng rỡ!',
    'Mãi yêu em hơn mỗi ngày!',
    'Chúc mừng khai trương hồng phát, tài lộc!',
    'Cảm ơn vì đã luôn đồng hành cùng anh/em!'
  ];

  return (
    <div className="perspective-1000 h-[460px] w-full">
      <div
        className={`relative w-full h-full transform-style-3d transition-transform duration-700 shadow-xs hover:shadow-md rounded-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ==================== MẶT TRƯỚC SẢN PHẨM ==================== */}
        <div
          onClick={() => setIsFlipped(true)}
          className="absolute inset-0 w-full h-full bg-white rounded-2xl overflow-hidden border border-pink-100 backface-hidden flex flex-col justify-between group cursor-pointer"
        >
          {/* Product Image Header */}
          <div className="relative h-64 overflow-hidden bg-pink-50/50">
            <img
              src={imgError ? 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80' : product.img}
              alt={product.title}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Delivery Scope Tag */}
            <span
              className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-2xs backdrop-blur-xs ${
                product.category === 'fresh'
                  ? 'bg-white/95 text-[#e8929e] border border-pink-100'
                  : 'bg-white/95 text-[#57886c] border border-emerald-100'
              }`}
            >
              {product.tag}
            </span>

            {/* Favorite button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
                onToast(isLiked ? 'Đã bỏ yêu thích' : 'Đã thêm vào danh sách yêu thích!');
              }}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors shadow-2xs"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            {/* Flip hint banner */}
            <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-lg backdrop-blur-xs flex items-center gap-1.5 transition-opacity group-hover:bg-black/75">
              <Hand className="w-3 h-3 text-[#ffb6c1]" />
              <span>Bấm để tùy chỉnh & xem chi tiết</span>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 space-y-2 flex-grow flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between gap-1 text-[11px] text-gray-500 mb-1">
                <span className="capitalize">{product.category === 'fresh' ? 'Hoa tươi' : product.category === 'artificial' ? 'Hoa lụa' : 'Sự kiện & Quà'}</span>
                {product.rating && (
                  <span className="flex items-center text-amber-500 font-semibold gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400">({product.reviewsCount})</span>
                  </span>
                )}
              </div>

              <h3 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-[#e8929e] transition-colors line-clamp-1">
                {product.title}
              </h3>
              
              <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Price & Action Button */}
            <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
              <span className="text-base sm:text-lg font-bold text-[#e8929e] font-serif tabular-nums">
                {formatVND(product.price)}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(true);
                }}
                className="px-3 py-1.5 bg-pink-50 hover:bg-[#ffb6c1] text-[#e8929e] hover:text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-1 cursor-pointer active:scale-95"
              >
                <span>Xem & Đặt Hoa</span>
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ==================== MẶT SAU (CHI TIẾT & TÙY CHỈNH) ==================== */}
        <div
          className="absolute inset-0 w-full h-full bg-white rounded-2xl border-2 border-[#ffb6c1] p-4 backface-hidden rotate-y-180 flex flex-col justify-between custom-scroll overflow-y-auto"
        >
          <div className="space-y-3">
            {/* Header: Title + Flip Back Button */}
            <div className="flex justify-between items-center border-b border-pink-100 pb-2">
              <h4 className="font-bold text-xs text-gray-900 uppercase tracking-tight line-clamp-1">
                {product.title}
              </h4>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="text-gray-400 hover:text-[#e8929e] text-xs flex items-center gap-1 p-1 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Mặt trước</span>
              </button>
            </div>

            {/* 1. Size Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 flex items-center justify-between">
                <span>1. Chọn kích thước bó:</span>
                <span className="text-[#e8929e] font-mono text-[10px]">
                  {sizeAddon > 0 ? `+${formatVND(sizeAddon)}` : 'Giá gốc'}
                </span>
              </label>
              <select
                value={sizeAddon}
                onChange={(e) => setSizeAddon(Number(e.target.value))}
                className="w-full p-2 border border-pink-200 rounded-lg text-xs bg-pink-50/40 focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
              >
                <option value={0}>Nhỏ (Standard) - Giữ giá gốc</option>
                <option value={150000}>Vừa (Medium) - Thêm 30% hoa (+150.000đ)</option>
                <option value={300000}>Lớn (Premium VIP) - Cỡ đại (+300.000đ)</option>
              </select>
            </div>

            {/* 2. Wrapping Paper Selection */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 block">
                2. Phong cách giấy gói & nơ:
              </label>
              <select
                value={wrapColor}
                onChange={(e) => setWrapColor(e.target.value)}
                className="w-full p-2 border border-pink-200 rounded-lg text-xs bg-pink-50/40 focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
              >
                <option value="Hồng Hàn Quốc">Hồng Hàn Quốc (Dịu dàng, bán chạy)</option>
                <option value="Trắng Kem Sang Trọng">Trắng Kem Sang Trọng (Tinh tế)</option>
                <option value="Đen Vintage Huyền Bí">Đen Vintage Huyền Bí (Cá tính)</option>
                <option value="Xanh Pastel Thanh Lịch">Xanh Pastel Thanh Lịch (Mát dịu)</option>
                <option value="Giấy Kraft Mộc Mạc">Giấy Kraft Mộc Mạc (Cổ điển)</option>
              </select>
            </div>

            {/* 3. Card Message */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 flex items-center justify-between">
                <span>3. Lời chúc in thiệp miễn phí:</span>
                <span className="text-[10px] text-gray-400">Tặng kèm thiệp</span>
              </label>
              <input
                type="text"
                value={cardMessage}
                onChange={(e) => setCardMessage(e.target.value)}
                placeholder="Nhập lời chúc muốn gửi gắm..."
                maxLength={120}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
              />
              {/* Quick message suggestions */}
              <div className="flex flex-wrap gap-1 pt-1">
                {quickMessages.slice(0, 2).map((msg, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCardMessage(msg)}
                    className="text-[9px] px-1.5 py-0.5 bg-gray-100 hover:bg-pink-100 text-gray-600 rounded transition-colors text-left truncate max-w-[170px]"
                  >
                    + {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Delivery Window */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-700 block">
                4. Khung giờ giao hàng:
              </label>
              <select
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg text-xs bg-white focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
              >
                <option value="Sáng (8h - 12h)">Sáng (8h00 - 12h00)</option>
                <option value="Chiều (13h - 17h)">Chiều (13h00 - 17h00)</option>
                <option value="Tối (18h - 21h)">Tối (18h00 - 21h00)</option>
                <option value="Giao gấp 90 phút (Hỏa tốc)">Giao gấp 90 phút (Hỏa tốc Bình Thạnh)</option>
              </select>
            </div>
          </div>

          {/* Bottom Card Summary & Add to Cart */}
          <div className="pt-3 border-t border-gray-100 space-y-2 mt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Giá theo tùy chọn:</span>
              <span className="font-bold text-[#e8929e] font-serif text-base tabular-nums">
                {formatVND(calculatedPrice)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full py-2.5 bg-[#e8929e] hover:bg-pink-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Thêm Vào Giỏ Hàng</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
