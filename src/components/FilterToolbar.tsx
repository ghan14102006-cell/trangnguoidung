import React from 'react';
import {
  Grid,
  Leaf,
  Sparkles,
  PartyPopper,
  Gift,
  Filter,
  Tag,
  ArrowUpDown,
  RotateCcw
} from 'lucide-react';
import { ProductCategory, ProductOccasion, PriceFilter, SortOption } from '../types';

interface FilterToolbarProps {
  category: ProductCategory;
  setCategory: (cat: ProductCategory) => void;
  occasion: ProductOccasion;
  setOccasion: (occ: ProductOccasion) => void;
  price: PriceFilter;
  setPrice: (pr: PriceFilter) => void;
  sort: SortOption;
  setSort: (s: SortOption) => void;
  productCount: number;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
  category,
  setCategory,
  occasion,
  setOccasion,
  price,
  setPrice,
  sort,
  setSort,
  productCount,
  onReset,
  hasActiveFilters,
}) => {
  const categoryTabs = [
    { id: 'all' as ProductCategory, label: 'Tất Cả Sản Phẩm', icon: Grid },
    { id: 'fresh' as ProductCategory, label: 'Hoa Tươi (Chỉ TP.HCM)', icon: Leaf, highlight: 'text-[#81b29a]' },
    { id: 'artificial' as ProductCategory, label: 'Hoa Giả / Lụa (Toàn quốc)', icon: Sparkles, highlight: 'text-purple-400' },
    { id: 'event' as ProductCategory, label: 'Hoa Khai Trương & Sự Kiện', icon: PartyPopper, highlight: 'text-amber-500' },
    { id: 'accessory' as ProductCategory, label: 'Phụ Kiện & Quà Tặng', icon: Gift, highlight: 'text-pink-400' },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-pink-100 flex flex-col gap-4">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-gray-100">
        {categoryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = category === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCategory(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-[#e8929e] text-white shadow-xs'
                  : 'text-gray-600 bg-gray-50 hover:bg-pink-50 hover:text-[#e8929e]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : tab.highlight || 'text-gray-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filters Row */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Occasion Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500 text-xs hidden sm:inline">Dịp:</span>
            <select
              value={occasion}
              onChange={(e) => setOccasion(e.target.value as ProductOccasion)}
              className="bg-transparent text-gray-700 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả dịp tặng</option>
              <option value="birthday">Sinh Nhật</option>
              <option value="love">Tình Yêu / Valentine</option>
              <option value="opening">Khai Trương / Thăng Tiến</option>
              <option value="anniversary">Kỷ Niệm / Cảm Ơn</option>
            </select>
          </div>

          {/* Price Range Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-500 text-xs hidden sm:inline">Khoảng giá:</span>
            <select
              value={price}
              onChange={(e) => setPrice(e.target.value as PriceFilter)}
              className="bg-transparent text-gray-700 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="all">Tất cả mức giá</option>
              <option value="under500">Dưới 500.000đ</option>
              <option value="500to1000">500.000đ - 1.000.000đ</option>
              <option value="over1000">Trên 1.000.000đ</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-transparent text-gray-700 text-xs focus:outline-hidden cursor-pointer"
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="popular">Được yêu thích nhất</option>
            </select>
          </div>

          {/* Reset Filters button if any active */}
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-[#e8929e] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>

        {/* Count indicator */}
        <div className="text-xs text-gray-500 ml-auto">
          Hiển thị <span className="font-bold text-[#e8929e] tabular-nums">{productCount}</span> mẫu hoa phù hợp
        </div>
      </div>
    </div>
  );
};
