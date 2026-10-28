import React from 'react';
import { ShoppingBag, Flower2, Truck, Phone, Store } from 'lucide-react';

interface HeaderProps {
  currentView: 'shop' | 'tracking';
  setCurrentView: (view: 'shop' | 'tracking') => void;
  cartCount: number;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  cartCount,
  onOpenCart,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Brand Zone */}
          <div
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#e8929e] to-[#ffb6c1] flex items-center justify-center text-white shadow-md shadow-pink-200 transition-transform group-hover:scale-105">
              <Flower2 className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-gray-900 block leading-tight">
                Blossom Garden
              </span>
              <span className="text-[10px] text-[#57886c] font-semibold tracking-wider uppercase block">
                Chi nhánh Bình Thạnh, TP.HCM
              </span>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 transition-colors ${
                currentView === 'shop'
                  ? 'text-[#e8929e] font-bold'
                  : 'text-gray-600 hover:text-[#e8929e]'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Cửa Hàng</span>
            </button>

            <a
              href="#shop-info-section"
              onClick={(e) => {
                if (currentView !== 'shop') {
                  setCurrentView('shop');
                  setTimeout(() => {
                    const el = document.getElementById('shop-info-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-gray-600 hover:text-[#e8929e] transition-colors"
            >
              Thông Tin Shop
            </a>

            <button
              onClick={() => {
                setCurrentView('tracking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex items-center gap-1.5 transition-colors ${
                currentView === 'tracking'
                  ? 'text-[#e8929e] font-bold'
                  : 'text-gray-600 hover:text-[#e8929e]'
              }`}
            >
              <Truck className="w-4 h-4" />
              <span>Tra Cứu Đơn Hàng</span>
            </button>
          </nav>

          {/* Quick Contact & Cart Actions */}
          <div className="flex items-center gap-3">
            <a
              href="tel:0908888247"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 hover:bg-pink-100 text-xs text-[#e8929e] font-semibold transition-colors"
              title="Gọi Hotline tư vấn"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>0908.888.247</span>
            </a>

            <button
              onClick={onOpenCart}
              aria-label="Xem giỏ hàng"
              className="relative p-2.5 rounded-full bg-pink-50 text-[#e8929e] hover:bg-[#ffb6c1] hover:text-white transition-all shadow-xs"
            >
              <ShoppingBag className="w-5 h-5" />
              <span
                id="cart-badge-count"
                className={`absolute -top-1 -right-1 bg-[#e8929e] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs transition-transform ${
                  cartCount > 0 ? 'scale-100' : 'scale-90'
                }`}
              >
                {cartCount}
              </span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
