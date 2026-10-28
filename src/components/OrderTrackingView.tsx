import React, { useState } from 'react';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Package,
  Phone,
  ArrowLeft,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { Order } from '../types';
import { formatVND } from '../data/products';

interface OrderTrackingViewProps {
  orders: Record<string, Order>;
  onBackToShop: () => void;
  onAdvanceStatus?: (orderId: string) => void;
  onToast: (msg: string) => void;
}

export const OrderTrackingView: React.FC<OrderTrackingViewProps> = ({
  orders,
  onBackToShop,
  onAdvanceStatus,
  onToast,
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('BG-8842');
  const [searched, setSearched] = useState(false);

  const availableOrderIds = Object.keys(orders);
  const activeOrder = orders[selectedOrderId] || (availableOrderIds.length > 0 ? orders[availableOrderIds[availableOrderIds.length - 1]] : null);

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (!query) {
      onToast('Vui lòng nhập mã đơn hàng (ví dụ: BG-8842)');
      return;
    }
    setSearched(true);
    if (orders[query]) {
      setSelectedOrderId(query);
      onToast(`Tìm thấy đơn hàng ${query}`);
    } else {
      onToast(`Không tìm thấy đơn hàng mã "${query}". Thử: BG-8842`);
    }
  };

  const getTimelineStepIcon = (status: string, completed: boolean, current?: boolean) => {
    if (completed && !current) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
    if (current) {
      return (
        <div className="w-5 h-5 rounded-full bg-[#e8929e] text-white flex items-center justify-center animate-pulse">
          <Sparkles className="w-3 h-3" />
        </div>
      );
    }
    return <Clock className="w-5 h-5 text-gray-300" />;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-12">
      {/* Top back button */}
      <button
        onClick={onBackToShop}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#e8929e] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại cửa hàng</span>
      </button>

      {/* Search Header Container */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs space-y-5 text-center">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/70 text-[#e8929e] text-xs font-bold">
            <Truck className="w-3.5 h-3.5" />
            <span>Hệ Thống Theo Dõi Trực Tuyến</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
            Tra Cứu Tiến Độ Đơn Hàng
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Nhập mã đơn hàng (ví dụ: <strong className="font-mono text-[#e8929e]">BG-8842</strong>) để theo dõi hành trình cắm hoa và giao hỏa tốc.
          </p>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md mx-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              placeholder="Nhập mã đơn (BG-...)"
              className="w-full px-4 py-2.5 rounded-xl border border-pink-200 text-sm font-mono uppercase focus:ring-2 focus:ring-[#ffb6c1] focus:outline-hidden bg-gray-50/50"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#e8929e] hover:bg-pink-600 text-white font-semibold text-sm rounded-xl transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Tra Cứu</span>
          </button>
        </form>

        {/* Quick Recent Order Chips */}
        {availableOrderIds.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-gray-400">Đơn hàng sẵn có:</span>
            {availableOrderIds.map((id) => (
              <button
                key={id}
                onClick={() => {
                  setSelectedOrderId(id);
                  setSearchInput(id);
                }}
                className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer ${
                  selectedOrderId === id
                    ? 'bg-[#e8929e] text-white shadow-2xs'
                    : 'bg-pink-50 text-gray-600 hover:bg-pink-100'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Display Card */}
      {activeOrder ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-xs space-y-8">
          
          {/* Order Meta Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xl sm:text-2xl font-bold text-gray-900">
                  #{activeOrder.orderId}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-pink-100 text-[#e8929e]">
                  {activeOrder.paymentMode === 'deposit' ? 'Đã cọc 50%' : 'Đã thanh toán 100%'}
                </span>
              </div>
              <span className="text-xs text-gray-400 mt-0.5 block">
                Thời gian đặt: {activeOrder.createdAt}
              </span>
            </div>

            {/* Advance Status simulator for user testing */}
            {onAdvanceStatus && (
              <button
                onClick={() => {
                  onAdvanceStatus(activeOrder.orderId);
                  onToast('Đã mô phỏng bước kế tiếp của đơn hàng!');
                }}
                className="px-3.5 py-1.5 bg-gray-100 hover:bg-pink-50 text-gray-700 hover:text-[#e8929e] text-xs font-semibold rounded-xl border border-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Mô phỏng shipper di chuyển hoặc hoàn thành đơn"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Mô phỏng tiến độ đơn hàng</span>
              </button>
            )}
          </div>

          {/* Timeline Visual Stepper */}
          <div className="space-y-4">
            <h4 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#e8929e]" />
              <span>Tiến Độ Thực Hiện & Giao Hàng</span>
            </h4>

            <div className="relative border-l-2 border-pink-100 ml-3 sm:ml-4 pl-6 sm:pl-8 space-y-6">
              {activeOrder.timeline.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Step Pin on the vertical line */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-0.5 bg-white p-0.5 rounded-full">
                    {getTimelineStepIcon(step.status, step.completed, step.current)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h5
                        className={`text-sm font-bold ${
                          step.current ? 'text-[#e8929e]' : step.completed ? 'text-gray-900' : 'text-gray-400'
                        }`}
                      >
                        {step.title}
                      </h5>
                      <span className="text-[11px] text-gray-400 font-mono">
                        {step.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Recipient Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="bg-[#fff0f3]/40 p-4 rounded-2xl border border-pink-100 space-y-2">
              <h5 className="font-bold text-xs text-gray-800 uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e8929e]" />
                <span>Địa Chỉ Nhận Hoa</span>
              </h5>
              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  <strong className="text-gray-800">Người nhận:</strong> {activeOrder.recipientName} ({activeOrder.recipientPhone})
                </p>
                <p>
                  <strong className="text-gray-800">Địa chỉ:</strong> {activeOrder.recipientAddress}, {activeOrder.recipientDistrict}
                </p>
                <p>
                  <strong className="text-gray-800">Khung giờ:</strong> {activeOrder.deliveryTimeWindow}
                </p>
                {activeOrder.note && (
                  <p className="text-amber-800 bg-amber-50 p-2 rounded-lg mt-1 italic">
                    Ghi chú: {activeOrder.note}
                  </p>
                )}
              </div>
            </div>

            <div className="bg-[#fff0f3]/40 p-4 rounded-2xl border border-pink-100 space-y-2">
              <h5 className="font-bold text-xs text-gray-800 uppercase flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#57886c]" />
                <span>Hỗ Trợ Xưởng Bình Thạnh</span>
              </h5>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Hotline phụ trách đơn: <strong className="text-gray-900">0908.888.247</strong></p>
                <p>Zalo Florist kiểm tra mẫu: <strong className="text-gray-900">0901.234.567</strong></p>
                <p className="text-gray-500 text-[11px] pt-1">
                  Nếu bạn cần đổi khung giờ giao hoặc cập nhật lại lời chúc thiệp, vui lòng liên hệ ngay trước khi đơn xuất xưởng.
                </p>
              </div>
            </div>
          </div>

          {/* Ordered Products Itemization */}
          <div className="space-y-3 pt-2 border-t border-gray-100">
            <h5 className="font-bold text-xs text-gray-800 uppercase flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-[#e8929e]" />
              <span>Sản Phẩm Trong Đơn Hàng</span>
            </h5>

            <div className="space-y-2">
              {activeOrder.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50/70 rounded-xl border border-gray-100 text-xs"
                >
                  <img
                    src={item.product.img}
                    alt={item.product.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=150&q=80';
                    }}
                    className="w-12 h-12 rounded-lg object-cover bg-pink-100 shrink-0"
                  />
                  <div className="flex-1 space-y-0.5">
                    <span className="font-bold text-gray-800">{item.product.title}</span>
                    <div className="text-[10px] text-gray-500">
                      Size: {item.sizeName} · Giấy: {item.wrapColor} · Số lượng: {item.quantity}
                    </div>
                    {item.cardMessage && (
                      <div className="text-[10px] italic text-[#e8929e] truncate max-w-md">
                        Thiệp: "{item.cardMessage}"
                      </div>
                    )}
                  </div>
                  <span className="font-bold text-gray-900 font-serif tabular-nums">
                    {formatVND(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Payment Balance Calculation */}
            <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Tổng giá trị đơn:</span>
                <span className="font-bold text-gray-900 tabular-nums">{formatVND(activeOrder.total)}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Đã chuyển khoản VietQR ({activeOrder.paymentMode === 'deposit' ? 'Cọc 50%' : '100%'}):</span>
                <span className="font-bold tabular-nums">-{formatVND(activeOrder.payAmount)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t border-pink-200/60 pt-2 text-sm">
                <span>Số tiền còn lại thu khi giao hàng:</span>
                <span className="text-[#e8929e] font-serif tabular-nums text-base">
                  {formatVND(activeOrder.remainingAmount)}
                </span>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-pink-100 space-y-3">
          <AlertCircle className="w-10 h-10 text-pink-300 mx-auto" />
          <h4 className="font-serif text-lg font-bold text-gray-800">
            Chưa tìm thấy thông tin đơn hàng
          </h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Vui lòng nhập chính xác mã đơn hàng (ví dụ: BG-8842) hoặc quay lại cửa hàng để đặt mẫu hoa bạn thích.
          </p>
          <button
            onClick={onBackToShop}
            className="px-5 py-2.5 bg-[#e8929e] text-white text-xs font-semibold rounded-xl hover:bg-pink-600 transition-colors cursor-pointer"
          >
            Về Cửa Hàng Xem Mẫu Hoa
          </button>
        </div>
      )}
    </div>
  );
};
