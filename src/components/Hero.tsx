import React from 'react';
import { MapPin, Search, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
  onSelectCategory: (category: 'all' | 'fresh' | 'artificial') => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  onSelectCategory,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff0f3]/80 via-white to-[#fcf8f9] py-10 sm:py-14 border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Column: Headline, Description & Search */}
          <div className="space-y-5 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-100/80 text-[#e8929e] text-xs font-bold tracking-wide shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#e8929e]" />
              <span>Xưởng Hoa Trực Tuyến Quận Bình Thạnh, TP.HCM</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-[1.18] text-balance">
              Blossom Garden - Đặt Hoa Online Giao Nhanh
            </h1>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Bấm trực tiếp vào sản phẩm bên dưới để lật mặt sau tùy chỉnh kích thước, giấy gói, lời chúc và đặt hàng hỏa tốc tại TP.HCM!
            </p>

            {/* Hero Search Box */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2 max-w-md mx-auto lg:mx-0">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') onSearchSubmit();
                  }}
                  placeholder="Tìm hoa hồng, tulip, hướng dương..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-pink-200 focus:ring-2 focus:ring-[#ffb6c1] focus:border-[#e8929e] focus:outline-hidden text-sm bg-white shadow-xs transition-all"
                />
              </div>
              <button
                type="button"
                onClick={onSearchSubmit}
                className="px-5 py-2.5 bg-[#e8929e] hover:bg-pink-600 text-white font-medium text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Khám phá</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-gray-500 pt-1">
              <span>Gợi ý nhanh:</span>
              {['Hoa hồng', 'Tulip lụa', 'Khai trương', 'Hướng dương', 'Baby cầu vồng'].map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => {
                    setSearchQuery(keyword);
                    setTimeout(() => onSearchSubmit(), 50);
                  }}
                  className="text-gray-600 hover:text-[#e8929e] underline decoration-pink-200 underline-offset-2 transition-colors cursor-pointer"
                >
                  {keyword}
                </button>
              ))}
            </div>

            {/* Trust points */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-pink-100 text-left">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#e8929e] shrink-0" />
                <span className="text-xs text-gray-600 font-medium">Giao gấp 60-90p</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e8929e] shrink-0" />
                <span className="text-xs text-gray-600 font-medium">Chụp ảnh duyệt trước</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#e8929e] shrink-0" />
                <span className="text-xs text-gray-600 font-medium">Đổi mới 100% nếu dập</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Featured Showcase Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full md:w-auto max-w-md">
            <div
              onClick={() => onSelectCategory('fresh')}
              className="bg-white/90 backdrop-blur-xs rounded-2xl p-3 shadow-xs border border-pink-200/80 transform rotate-1 hover:rotate-0 transition-all duration-300 cursor-pointer group"
            >
              <div className="relative w-full h-40 overflow-hidden rounded-xl mb-2 bg-pink-50">
                <img
                  src="https://hpconnect.vn/wp-content/uploads/2020/02/hinh-anh-hoa-hong-dep-3-1.jpg"
                  alt="Hoa Tươi Thiết Kế"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                  Hoa tươi
                </span>
              </div>
              <span className="text-xs font-bold text-[#e8929e] block group-hover:text-pink-600 transition-colors">
                Hoa Tươi Thiết Kế
              </span>
              <span className="text-[11px] text-gray-500 block">Giao nhanh nội thành TP.HCM</span>
            </div>

            <div
              onClick={() => onSelectCategory('artificial')}
              className="bg-white/90 backdrop-blur-xs rounded-2xl p-3 shadow-xs border border-emerald-200/80 transform -rotate-1 hover:rotate-0 transition-all duration-300 mt-4 cursor-pointer group"
            >
              <div className="relative w-full h-40 overflow-hidden rounded-xl mb-2 bg-emerald-50">
                <img
                  src="https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=400&q=80"
                  alt="Hoa Lụa & Giả Cao Cấp"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-semibold backdrop-blur-xs">
                  Hoa lụa
                </span>
              </div>
              <span className="text-xs font-bold text-[#57886c] block group-hover:text-emerald-700 transition-colors">
                Hoa Giả & Lụa Cao Cấp
              </span>
              <span className="text-[11px] text-gray-500 block">Giao toàn quốc (63 Tỉnh)</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
