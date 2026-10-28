import React from 'react';
import { Flower2, MapPin, Phone, Clock, Mail, ShieldCheck } from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (cat: ProductCategory) => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenTracking }) => {
  return (
    <footer className="bg-white border-t border-pink-100 mt-20 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Intro */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#e8929e] to-[#ffb6c1] flex items-center justify-center text-white shadow-xs">
                <Flower2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-gray-900 block leading-tight">
                  Blossom Garden
                </span>
                <span className="text-[10px] text-[#57886c] font-semibold tracking-wider uppercase block">
                  Bình Thạnh, TP.HCM
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              Xưởng hoa tươi phong cách Hàn Quốc và hoa lụa cao cấp. Nhận thiết kế hoa theo yêu cầu, giao hỏa tốc 60-90 phút khắp Bình Thạnh và nội thành Sài Gòn.
            </p>

            <div className="text-[11px] text-gray-500 flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Chụp ảnh thành phẩm gửi Zalo trước khi giao</span>
            </div>
          </div>

          {/* Quick Category Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Danh Mục Sản Phẩm
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <button
                  onClick={() => onSelectCategory('fresh')}
                  className="hover:text-[#e8929e] transition-colors cursor-pointer"
                >
                  Hoa Tươi Thiết Kế (Chỉ TP.HCM)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('artificial')}
                  className="hover:text-[#e8929e] transition-colors cursor-pointer"
                >
                  Hoa Lụa & Giả Cao Cấp (Toàn quốc)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('event')}
                  className="hover:text-[#e8929e] transition-colors cursor-pointer"
                >
                  Hoa Khai Trương & Sự Kiện
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessory')}
                  className="hover:text-[#e8929e] transition-colors cursor-pointer"
                >
                  Phụ Kiện & Quà Tặng Kèm
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Hỗ Trợ Khách Hàng
            </h4>
            <ul className="space-y-2 text-xs text-gray-600">
              <li>
                <button
                  onClick={onOpenTracking}
                  className="hover:text-[#e8929e] transition-colors cursor-pointer"
                >
                  Tra cứu tiến độ đơn hàng
                </button>
              </li>
              <li>
                <a href="#shop-info-section" className="hover:text-[#e8929e] transition-colors">
                  Chính sách đổi trả & hoàn tiền 100%
                </a>
              </li>
              <li>
                <a href="#shop-info-section" className="hover:text-[#e8929e] transition-colors">
                  Hình thức đặt cọc 50% qua VietQR
                </a>
              </li>
              <li>
                <a href="tel:0908888247" className="hover:text-[#e8929e] transition-colors">
                  Yêu cầu hoa gấp trong 60 phút
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-800">
              Chi Nhánh Bình Thạnh
            </h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#e8929e] shrink-0 mt-0.5" />
                <span>142/5 Điện Biên Phủ, P. 25, Q. Bình Thạnh, TP.HCM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#57886c] shrink-0" />
                <span>Hotline: 0908.888.247 / Zalo: 0901.234.567</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>08:00 - 21:00 (Cả ngày lễ & Chủ Nhật)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                <span>blossomgarden.binhthanh@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <p>© 2026 Blossom Garden Bình Thạnh. Bản quyền thuộc về tiệm hoa Blossom Garden.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Thanh toán tiện lợi qua VietQR</span>
            <span aria-hidden="true">·</span>
            <span>Giao hỏa tốc TP.HCM</span>
            <span aria-hidden="true">·</span>
            <span>Hoa lụa toàn quốc</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
