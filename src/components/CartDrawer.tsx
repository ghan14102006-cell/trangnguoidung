import React, { useState } from 'react';
import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  Tag,
  ArrowRight,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { CartItem } from '../types';
import { formatVND } from '../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  appliedDiscount: number;
  onApplyVoucher: (code: string) => boolean;
  voucherCode: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedDiscount,
  onApplyVoucher,
  voucherCode,
}) => {
  const [inputVoucher, setInputVoucher] = useState('');
  const [voucherError, setVoucherError] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountAmount = appliedDiscount > 0 ? (subtotal * appliedDiscount) : 0;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const hasFreshFlowers = cart.some((item) => item.product.category === 'fresh');

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    setVoucherError('');
    if (!inputVoucher.trim()) return;
    const success = onApplyVoucher(inputVoucher.trim());
    if (!success) {
      setVoucherError('Mã không hợp lệ. Thử: BINHTHANH10 (giảm 10%)');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-fadeIn">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer Body */}
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-slideLeft">
        
        {/* Drawer Header */}
        <div className="p-5 bg-gradient-to-r from-[#fff0f3] to-white border-b border-pink-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-pink-100 text-[#e8929e] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-gray-900 leading-tight">
                Giỏ Hàng Của Bạn
              </h3>
              <span className="text-[11px] text-gray-500">
                {cart.length > 0 ? `${cart.reduce((acc, i) => acc + i.quantity, 0)} sản phẩm đã chọn` : 'Chưa có sản phẩm'}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fresh Flower Warning Note */}
        {hasFreshFlowers && (
          <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-100 flex items-center gap-2 text-[11px] text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Đơn hàng có hoa tươi tự nhiên: Chỉ giao hỏa tốc tại khu vực TP.HCM.</span>
          </div>
        )}

        {/* Item List Container */}
        <div className="p-5 flex-grow overflow-y-auto space-y-3 custom-scroll">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 rounded-full bg-pink-50 text-[#ffb6c1] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-base font-bold text-gray-700">Giỏ hàng của bạn đang trống</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Hãy khám phá các mẫu hoa tươi và hoa lụa thiết kế tinh xảo của Blossom Garden.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-[#e8929e] text-white text-xs font-semibold rounded-xl hover:bg-pink-600 transition-colors cursor-pointer"
              >
                Tiếp tục xem mẫu hoa
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartItemId}
                className="bg-[#fff0f3]/40 p-3.5 rounded-2xl border border-pink-100 flex gap-3 text-xs group hover:bg-[#fff0f3]/70 transition-colors"
              >
                <img
                  src={item.product.img}
                  alt={item.product.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=200&q=80';
                  }}
                  className="w-16 h-16 object-cover rounded-xl bg-pink-100 shrink-0"
                />

                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start gap-1">
                    <h5 className="font-bold text-gray-800 line-clamp-1">{item.product.title}</h5>
                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Xóa khỏi giỏ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Customization Details */}
                  <div className="text-[10px] text-gray-500 space-y-0.5">
                    <div>Size: <span className="text-gray-700 font-medium">{item.sizeName}</span></div>
                    <div>Giấy & nơ: <span className="text-gray-700 font-medium">{item.wrapColor}</span></div>
                    {item.cardMessage && item.cardMessage !== 'Không in lời chúc' && (
                      <div className="truncate max-w-[230px] italic text-[#e8929e]">
                        "{item.cardMessage}"
                      </div>
                    )}
                    <div>Khung giờ: <span className="text-gray-700 font-medium">{item.deliveryTime}</span></div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex justify-between items-center pt-1.5 border-t border-pink-100/60 mt-1">
                    <span className="font-bold text-[#e8929e] font-serif tabular-nums text-sm">
                      {formatVND(item.unitPrice * item.quantity)}
                    </span>

                    <div className="flex items-center gap-2 bg-white rounded-lg border border-pink-200 px-1.5 py-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, -1)}
                        className="text-gray-500 hover:text-[#e8929e] p-0.5 cursor-pointer"
                        title="Giảm số lượng"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-semibold text-gray-800 text-xs w-4 text-center tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, 1)}
                        className="text-gray-500 hover:text-[#e8929e] p-0.5 cursor-pointer"
                        title="Tăng số lượng"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Voucher and Checkout Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50/90 space-y-3.5">
            {/* Voucher Form */}
            <form onSubmit={handleApplyVoucher} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={inputVoucher}
                    onChange={(e) => setInputVoucher(e.target.value.toUpperCase())}
                    placeholder="Mã giảm giá (ví dụ: BINHTHANH10)"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-xs uppercase focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-gray-800 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Áp dụng
                </button>
              </div>

              {appliedDiscount > 0 ? (
                <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <Sparkles className="w-3 h-3" />
                  <span>Đã áp dụng mã {voucherCode} (Giảm {(appliedDiscount * 100).toFixed(0)}%)</span>
                </div>
              ) : voucherError ? (
                <span className="text-[11px] text-red-500 block">{voucherError}</span>
              ) : (
                <span className="text-[10px] text-gray-400 block">
                  Gợi ý mã ưu đãi xưởng Bình Thạnh: <strong className="text-gray-600">BINHTHANH10</strong>
                </span>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600 pt-1 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span>Tạm tính ({cart.reduce((s, i) => s + i.quantity, 0)} bó):</span>
                <span className="font-semibold text-gray-800 tabular-nums">{formatVND(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between items-center text-emerald-600">
                  <span>Giảm giá voucher:</span>
                  <span className="font-semibold tabular-nums">-{formatVND(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between items-center">
                <span>Phí giao hoa Bình Thạnh:</span>
                <span className="text-emerald-600 font-semibold">Miễn phí giao hàng</span>
              </div>

              <div className="flex justify-between items-center text-base font-bold text-gray-900 border-t border-gray-200 pt-2">
                <span>Tổng thanh toán:</span>
                <span className="text-[#e8929e] font-serif text-xl tabular-nums">
                  {formatVND(grandTotal)}
                </span>
              </div>
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 bg-[#e8929e] hover:bg-pink-600 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
