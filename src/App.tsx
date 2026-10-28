/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterToolbar } from './components/FilterToolbar';
import { ProductCard } from './components/ProductCard';
import { ShopInfoSection } from './components/ShopInfoSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { VietQRModal } from './components/VietQRModal';
import { OrderTrackingView } from './components/OrderTrackingView';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PRODUCTS_DB, INITIAL_TRACKING_ORDER } from './data/products';
import {
  Product,
  CartItem,
  Order,
  ProductCategory,
  ProductOccasion,
  PriceFilter,
  SortOption,
} from './types';
import { Frown, RotateCcw } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'shop' | 'tracking'>('shop');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory>('all');
  const [occasionFilter, setOccasionFilter] = useState<ProductOccasion>('all');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Cart & Orders State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('blossom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Record<string, Order>>(() => {
    try {
      const saved = localStorage.getItem('blossom_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { [INITIAL_TRACKING_ORDER.orderId]: INITIAL_TRACKING_ORDER, ...parsed };
      }
    } catch {}
    return { [INITIAL_TRACKING_ORDER.orderId]: INITIAL_TRACKING_ORDER };
  });

  // Modal visibility states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVietQROpen, setIsVietQROpen] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);

  // Voucher
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [voucherCode, setVoucherCode] = useState<string>('');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('blossom_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Sync orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('blossom_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS_DB];

    // Category
    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Occasion
    if (occasionFilter !== 'all') {
      result = result.filter((p) => p.occasion === occasionFilter);
    }

    // Price
    if (priceFilter === 'under500') {
      result = result.filter((p) => p.price < 500000);
    } else if (priceFilter === '500to1000') {
      result = result.filter((p) => p.price >= 500000 && p.price <= 1000000);
    } else if (priceFilter === 'over1000') {
      result = result.filter((p) => p.price > 1000000);
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.flowers?.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'popular') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [categoryFilter, occasionFilter, priceFilter, searchQuery, sortOption]);

  const hasActiveFilters =
    categoryFilter !== 'all' ||
    occasionFilter !== 'all' ||
    priceFilter !== 'all' ||
    searchQuery.trim().length > 0 ||
    sortOption !== 'default';

  const handleResetFilters = () => {
    setCategoryFilter('all');
    setOccasionFilter('all');
    setPriceFilter('all');
    setSearchQuery('');
    setSortOption('default');
    showToast('Đã xóa tất cả bộ lọc');
  };

  // Cart Handlers
  const handleAddToCart = (item: Omit<CartItem, 'cartItemId'>) => {
    const existingIndex = cart.findIndex(
      (c) =>
        c.product.id === item.product.id &&
        c.sizeName === item.sizeName &&
        c.wrapColor === item.wrapColor &&
        c.deliveryTime === item.deliveryTime &&
        c.cardMessage === item.cardMessage
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      const newItem: CartItem = {
        ...item,
        cartItemId: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      };
      setCart([...cart, newItem]);
    }
  };

  const handleUpdateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    showToast('Đã xóa mẫu hoa khỏi giỏ');
  };

  const handleApplyVoucher = (code: string): boolean => {
    const upper = code.toUpperCase();
    if (upper === 'BINHTHANH10') {
      setAppliedDiscount(0.1);
      setVoucherCode('BINHTHANH10');
      showToast('Áp dụng mã BINHTHANH10 thành công! Giảm 10%');
      return true;
    }
    if (upper === 'FREESHIP') {
      setAppliedDiscount(0.05);
      setVoucherCode('FREESHIP');
      showToast('Áp dụng mã FREESHIP thành công!');
      return true;
    }
    return false;
  };

  // Checkout & Order creation
  const handleProceedToCheckout = () => {
    if (cart.length === 0) {
      showToast('Giỏ hàng của bạn đang trống!');
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCreateOrder = (order: Order) => {
    setPendingOrder(order);
    setIsCheckoutOpen(false);
    setIsVietQROpen(true);
  };

  const handlePaymentConfirmed = (order: Order) => {
    const updatedOrders = {
      ...orders,
      [order.orderId]: {
        ...order,
        timeline: order.timeline.map((t, idx) =>
          idx === 0 ? { ...t, completed: true, current: false } : idx === 1 ? { ...t, completed: true, current: true } : t
        ),
      },
    };
    setOrders(updatedOrders);
    setCart([]);
    setIsVietQROpen(false);
    setCurrentView('tracking');
    showToast(`Đặt hoa thành công! Mã đơn của bạn là #${order.orderId}`);
  };

  // Status progression simulation for testing
  const handleAdvanceOrderStatus = (orderId: string) => {
    const target = orders[orderId];
    if (!target) return;

    const timeline = [...target.timeline];
    const currentIndex = timeline.findIndex((t) => t.current);

    if (currentIndex >= 0 && currentIndex < timeline.length - 1) {
      timeline[currentIndex] = { ...timeline[currentIndex], current: false, completed: true };
      timeline[currentIndex + 1] = { ...timeline[currentIndex + 1], current: true, completed: true };
      const nextStatus = timeline[currentIndex + 1].status;
      setOrders({
        ...orders,
        [orderId]: {
          ...target,
          status: nextStatus,
          timeline,
        },
      });
      showToast(`Đã cập nhật tiến độ đơn ${orderId} sang: ${timeline[currentIndex + 1].title}`);
    } else {
      // Loop back for test convenience
      timeline.forEach((t, i) => {
        t.completed = i === 0;
        t.current = i === 0;
      });
      setOrders({
        ...orders,
        [orderId]: {
          ...target,
          status: 'received',
          timeline,
        },
      });
      showToast(`Đã reset lại tiến độ đơn ${orderId}`);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const cartDiscount = appliedDiscount > 0 ? cartSubtotal * appliedDiscount : 0;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  return (
    <div className="bg-[#fcf8f9] text-gray-800 min-h-screen flex flex-col custom-scroll">
      {/* Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Body Switcher */}
      {currentView === 'shop' ? (
        <>
          {/* Hero Banner */}
          <Hero
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchSubmit={() => {
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onSelectCategory={(cat) => {
              setCategoryFilter(cat);
              const el = document.getElementById('catalog-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Main Catalog Area */}
          <main id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full space-y-8">
            
            {/* Filter Toolbar */}
            <FilterToolbar
              category={categoryFilter}
              setCategory={setCategoryFilter}
              occasion={occasionFilter}
              setOccasion={setOccasionFilter}
              price={priceFilter}
              setPrice={setPriceFilter}
              sort={sortOption}
              setSort={setSortOption}
              productCount={filteredProducts.length}
              onReset={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            {/* Product Flip Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToast={showToast}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-16 bg-white rounded-3xl border border-pink-100 p-8 space-y-3 shadow-xs">
                <div className="w-16 h-16 rounded-full bg-pink-50 text-[#ffb6c1] flex items-center justify-center mx-auto">
                  <Frown className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-800">
                  Không tìm thấy mẫu hoa phù hợp
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 max-w-sm mx-auto">
                  Không có mẫu hoa nào khớp với bộ lọc hiện tại. Bạn vui lòng thử chọn lại tiêu chí hoặc tìm kiếm từ khóa khác.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-[#e8929e] hover:bg-pink-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xóa tất cả bộ lọc</span>
                </button>
              </div>
            )}

            {/* Shop Information Section */}
            <ShopInfoSection onToast={showToast} />
          </main>
        </>
      ) : (
        /* Order Tracking View */
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
          <OrderTrackingView
            orders={orders}
            onBackToShop={() => setCurrentView('shop')}
            onAdvanceStatus={handleAdvanceOrderStatus}
            onToast={showToast}
          />
        </main>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedDiscount={appliedDiscount}
        onApplyVoucher={handleApplyVoucher}
        voucherCode={voucherCode}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={cartSubtotal}
        discount={cartDiscount}
        total={cartTotal}
        onCreateOrder={handleCreateOrder}
      />

      {/* VietQR Payment Modal */}
      <VietQRModal
        order={pendingOrder}
        isOpen={isVietQROpen}
        onClose={() => setIsVietQROpen(false)}
        onPaymentConfirmed={handlePaymentConfirmed}
        onToast={showToast}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setCurrentView('shop');
          setCategoryFilter(cat);
          const el = document.getElementById('catalog-section');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTracking={() => {
          setCurrentView('tracking');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
