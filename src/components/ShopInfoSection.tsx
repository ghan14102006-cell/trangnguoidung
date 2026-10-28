import React, { useState } from 'react';
import {
  MapPin,
  PhoneCall,
  Clock,
  Copy,
  Check,
  Camera,
  HeartHandshake,
  ShieldAlert,
  Send,
  Navigation
} from 'lucide-react';

interface ShopInfoSectionProps {
  onToast: (msg: string) => void;
}

export const ShopInfoSection: React.FC<ShopInfoSectionProps> = ({ onToast }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    onToast(`Đã sao chép: ${text}`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section
      id="shop-info-section"
      className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-xs space-y-8"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-[#e8929e] uppercase tracking-widest bg-pink-100/70 px-3 py-1 rounded-full">
          Thông Tin Cửa Hàng & Xưởng Vận Hành
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
          Blossom Garden - Chi Nhánh Bình Thạnh
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Địa điểm trung tâm tiếp nhận đơn hàng, thiết kế hoa tươi và giao hàng hỏa tốc trong nội thành TP.HCM và gửi hoa lụa toàn quốc.
        </p>
      </div>

      {/* 3 Core Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        
        {/* Address Card */}
        <div className="bg-[#fff0f3]/50 p-6 rounded-2xl border border-pink-100 space-y-3 text-center flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#e8929e] text-white flex items-center justify-center mx-auto text-lg shadow-sm shadow-pink-200">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Địa Chỉ Xưởng & Cửa Hàng</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Số 142/5 Đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, TP. Hồ Chí Minh.
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-2">
            <button
              onClick={() => copyToClipboard('142/5 Điện Biên Phủ, Phường 25, Bình Thạnh, TP.HCM', 'address')}
              className="px-3 py-1.5 bg-white border border-pink-200 rounded-lg text-[11px] font-semibold text-gray-700 hover:text-[#e8929e] hover:border-pink-300 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              {copiedField === 'address' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'address' ? 'Đã sao chép' : 'Sao chép địa chỉ'}</span>
            </button>
            <a
              href="https://maps.google.com/?q=142/5+Dien+Bien+Phu+Phuong+25+Binh+Thanh+Ho+Chi+Minh"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#e8929e] text-white rounded-lg text-[11px] font-semibold hover:bg-pink-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Navigation className="w-3 h-3" />
              <span>Chỉ đường</span>
            </a>
          </div>
        </div>

        {/* Hotline Card */}
        <div className="bg-[#fff0f3]/50 p-6 rounded-2xl border border-pink-100 space-y-3 text-center flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#57886c] text-white flex items-center justify-center mx-auto text-lg shadow-sm shadow-emerald-200">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Hotline & Zalo Hỗ Trợ 24/7</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Hotline tư vấn: <strong className="text-gray-900">0908.888.247</strong><br />
              Zalo Đặt Nhanh: <strong className="text-gray-900">0901.234.567</strong>
            </p>
          </div>
          <div className="pt-2 flex justify-center gap-2">
            <a
              href="tel:0908888247"
              className="px-3 py-1.5 bg-[#57886c] text-white rounded-lg text-[11px] font-semibold hover:bg-emerald-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Gọi 0908.888.247</span>
            </a>
            <button
              onClick={() => copyToClipboard('0901234567', 'zalo')}
              className="px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-[11px] font-semibold text-gray-700 hover:text-[#57886c] hover:border-emerald-300 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
            >
              {copiedField === 'zalo' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedField === 'zalo' ? 'Đã sao chép' : 'Copy SĐT Zalo'}</span>
            </button>
          </div>
        </div>

        {/* Working Hours Card */}
        <div className="bg-[#fff0f3]/50 p-6 rounded-2xl border border-pink-100 space-y-3 text-center flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto text-lg shadow-sm shadow-amber-200">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-800 text-sm">Giờ Mở Cửa Hoạt Động</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Thứ Hai - Chủ Nhật: <strong className="text-gray-900">08:00 - 21:00</strong><br />
              Nhận đơn hỏa tốc nội thành xuyên suốt các ngày lễ Tết.
            </p>
          </div>
          <div className="pt-2 flex justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Đang mở cửa nhận đơn
            </span>
          </div>
        </div>

      </div>

      {/* 4 Guarantees Bar */}
      <div className="pt-6 border-t border-pink-100">
        <h4 className="text-center font-bold text-xs text-gray-500 uppercase tracking-wider mb-4">
          4 Cam Kết Vàng Từ Blossom Garden Bình Thạnh
        </h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-pink-50/40 border border-pink-100">
            <Camera className="w-4 h-4 text-[#e8929e] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-800">Chụp Ảnh Thực Tế</strong>
              <span className="text-gray-500 text-[11px]">Gửi ảnh thành phẩm qua Zalo trước khi giao</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-pink-50/40 border border-pink-100">
            <HeartHandshake className="w-4 h-4 text-[#e8929e] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-800">Hoa Tươi Tuyển Chọn</strong>
              <span className="text-gray-500 text-[11px]">Bảo hành hoa tươi từ 3 - 5 ngày</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-pink-50/40 border border-pink-100">
            <Send className="w-4 h-4 text-[#e8929e] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-800">Giao Hỏa Tốc Bình Thạnh</strong>
              <span className="text-gray-500 text-[11px]">Đúng giờ, thùng xốp chống va đập</span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-pink-50/40 border border-pink-100">
            <ShieldAlert className="w-4 h-4 text-[#e8929e] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-gray-800">Đổi Trả 100%</strong>
              <span className="text-gray-500 text-[11px]">Hoàn tiền nếu hoa dập nát hoặc sai mẫu</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
