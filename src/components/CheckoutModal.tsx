import React, { useState } from 'react';
import { X, User, MapPin, CreditCard, ShieldCheck, AlertCircle } from 'lucide-react';
import { CartItem, Order } from '../types';
import { formatVND } from '../data/products';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  onCreateOrder: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discount,
  total,
  onCreateOrder,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientCity, setRecipientCity] = useState<'hcm' | 'other'>('hcm');
  const [recipientDistrict, setRecipientDistrict] = useState('Bình Thạnh');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [deliveryTimeWindow, setDeliveryTimeWindow] = useState('Sáng (8h - 12h)');
  const [note, setNote] = useState('');
  const [paymentMode, setPaymentMode] = useState<'deposit' | 'full'>('deposit');
  const [sameAsCustomer, setSameAsCustomer] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const hasFreshFlowers = cart.some((item) => item.product.category === 'fresh');

  const handleSameAsCustomerToggle = (checked: boolean) => {
    setSameAsCustomer(checked);
    if (checked) {
      setRecipientName(customerName);
      setRecipientPhone(customerPhone);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (hasFreshFlowers && recipientCity === 'other') {
      setFormError('Giỏ hàng của bạn có hoa tươi cắt cành. Xưởng Bình Thạnh chỉ phục vụ giao hoa tươi tại TP.HCM để đảm bảo độ tươi 100%. Quý khách ở tỉnh vui lòng chọn hoa lụa.');
      return;
    }

    const orderId = 'BG-' + Math.floor(1000 + Math.random() * 9000);
    const payAmount = paymentMode === 'deposit' ? Math.round(total * 0.5) : total;
    const remainingAmount = total - payAmount;

    const newOrder: Order = {
      orderId,
      createdAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + new Date().toLocaleDateString('vi-VN'),
      customerName,
      customerPhone,
      recipientName: recipientName || customerName,
      recipientPhone: recipientPhone || customerPhone,
      recipientCity,
      recipientDistrict,
      recipientAddress,
      deliveryTimeWindow,
      note,
      paymentMode,
      items: [...cart],
      subtotal,
      discount,
      shippingFee: 0,
      total,
      payAmount,
      remainingAmount,
      status: 'received',
      timeline: [
        {
          status: 'received',
          title: 'Đã Tiếp Nhận Đơn Hàng',
          description: `Đơn hàng ${orderId} đã ghi nhận, đang chờ xác nhận thanh toán chuyển khoản VietQR.`,
          timestamp: 'Vừa xong',
          completed: true,
          current: true,
        },
        {
          status: 'making',
          title: 'Chuẩn Bị & Cắm Hoa',
          description: 'Nghệ nhân xưởng Bình Thạnh chọn lọc hoa tươi và gói theo yêu cầu của bạn.',
          timestamp: 'Dự kiến sau 15 phút',
          completed: false,
        },
        {
          status: 'shipping',
          title: 'Shipper Giao Hỏa Tốc',
          description: 'Shipper chuyên dụng giao hàng tại khu vực Bình Thạnh / TP.HCM.',
          timestamp: `Dự kiến: ${deliveryTimeWindow}`,
          completed: false,
        },
        {
          status: 'delivered',
          title: 'Giao Hoa Thành Công',
          description: 'Người nhận ký nhận hoa hoặc chụp ảnh giao hàng nghiệm thu.',
          timestamp: 'Hoàn tất',
          completed: false,
        },
      ],
    };

    onCreateOrder(newOrder);
  };

  const payAmount = paymentMode === 'deposit' ? Math.round(total * 0.5) : total;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-scaleUp">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#fff0f3] via-pink-100/60 to-emerald-50/50 p-5 border-b border-pink-200 flex justify-between items-center">
          <div>
            <h3 className="font-serif text-xl font-bold text-gray-900">
              Thông Tin Đặt Hàng & Thanh Toán
            </h3>
            <p className="text-xs text-gray-500">
              Tiếp nhận bởi xưởng Blossom Garden Chi nhánh Bình Thạnh, TP.HCM
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto custom-scroll flex-grow space-y-6">
          {formError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{formError}</span>
            </div>
          )}

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Customer Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <User className="w-4 h-4 text-[#e8929e]" />
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  1. Thông Tin Người Đặt Hoa
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn Minh"
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Số điện thoại nhận tin & ảnh hoa *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Ví dụ: 0908123456"
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-gray-600 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={sameAsCustomer}
                  onChange={(e) => handleSameAsCustomerToggle(e.target.checked)}
                  className="rounded text-[#e8929e] focus:ring-0"
                />
                <span>Tôi là người trực tiếp nhận hoa (Thông tin nhận hoa giống người đặt)</span>
              </label>
            </div>

            {/* 2. Recipient Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <MapPin className="w-4 h-4 text-[#e8929e]" />
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  2. Thông Tin Người Nhận Hoa
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Họ tên người nhận hoa *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Ví dụ: Trần Thị Thu Hà"
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    SĐT người nhận hoa *
                  </label>
                  <input
                    type="tel"
                    required
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="Ví dụ: 0978987654"
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Khu vực giao hàng *
                  </label>
                  <select
                    value={recipientCity}
                    onChange={(e) => setRecipientCity(e.target.value as 'hcm' | 'other')}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs bg-white focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  >
                    <option value="hcm">TP. Hồ Chí Minh (Giao hoa tươi & hoa lụa hỏa tốc)</option>
                    <option value="other">Tỉnh thành khác (Chỉ nhận giao hoa lụa/giả cao cấp)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Quận/Huyện *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientDistrict}
                    onChange={(e) => setRecipientDistrict(e.target.value)}
                    placeholder="Ví dụ: Quận Bình Thạnh"
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                  Địa chỉ chi tiết (Số nhà, tên tòa nhà, tên đường, phường) *
                </label>
                <input
                  type="text"
                  required
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  placeholder="Ví dụ: Tòa Landmark 81, 720A Điện Biên Phủ, Phường 22"
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Khung giờ mong muốn nhận hoa
                  </label>
                  <select
                    value={deliveryTimeWindow}
                    onChange={(e) => setDeliveryTimeWindow(e.target.value)}
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs bg-white focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  >
                    <option value="Sáng (8h - 12h)">Sáng (8h00 - 12h00)</option>
                    <option value="Chiều (13h - 17h)">Chiều (13h00 - 17h00)</option>
                    <option value="Tối (18h - 21h)">Tối (18h00 - 21h00)</option>
                    <option value="Giao gấp 90 phút">Giao gấp 90 phút (Hỏa tốc)</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">
                    Ghi chú giao hàng đặc biệt
                  </label>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ví dụ: Tặng bí mật, gọi trước khi giao 10p"
                    className="w-full p-2.5 border border-gray-200 rounded-xl text-xs focus:ring-1 focus:ring-[#ffb6c1] focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* 3. Deposit & Payment Mode */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
                <CreditCard className="w-4 h-4 text-[#e8929e]" />
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                  3. Chọn Hình Thức Đặt Cọc & Thanh Toán
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  className={`p-3.5 border-2 rounded-2xl flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMode === 'deposit'
                      ? 'border-[#e8929e] bg-pink-50/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="pay-mode"
                    value="deposit"
                    checked={paymentMode === 'deposit'}
                    onChange={() => setPaymentMode('deposit')}
                    className="mt-1 text-[#e8929e] focus:ring-0"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-gray-900 block">Đặt cọc 50% trước</span>
                    <span className="text-gray-500 block leading-relaxed">
                      Thanh toán {formatVND(Math.round(total * 0.5))} ngay bây giờ qua VietQR. 50% còn lại thanh toán khi nhận hoa.
                    </span>
                  </div>
                </label>

                <label
                  className={`p-3.5 border-2 rounded-2xl flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMode === 'full'
                      ? 'border-[#e8929e] bg-pink-50/50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="pay-mode"
                    value="full"
                    checked={paymentMode === 'full'}
                    onChange={() => setPaymentMode('full')}
                    className="mt-1 text-[#e8929e] focus:ring-0"
                  />
                  <div className="text-xs space-y-0.5">
                    <span className="font-bold text-gray-900 block">Thanh toán 100% trọn gói</span>
                    <span className="text-gray-500 block leading-relaxed">
                      Lý tưởng khi muốn tặng hoa giấu tên bất ngờ mà người nhận không phải trả tiền mặt.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Order summary box */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Tổng giá trị đơn hàng ({cart.length} mẫu hoa):</span>
                <span className="font-bold text-gray-900 tabular-nums">{formatVND(total)}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900">
                  Số tiền cần chuyển khoản VietQR ngay:
                </span>
                <span className="font-bold text-[#e8929e] font-serif text-lg tabular-nums">
                  {formatVND(payAmount)}
                </span>
              </div>
              {paymentMode === 'deposit' && (
                <div className="text-[11px] text-gray-500 flex items-center justify-between">
                  <span>Còn lại thu khi giao hoa:</span>
                  <span className="font-medium tabular-nums">{formatVND(total - payAmount)}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-[#e8929e] hover:bg-pink-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Tạo Mã VietQR Thanh Toán ({formatVND(payAmount)})</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
