import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { Search, Plus, Check, SlidersHorizontal, Flame, Pizza, Layers } from 'lucide-react';

interface MenuSectionProps {
  lang: 'fr' | 'ar';
  onQuickAddToCart: (item: MenuItem) => void;
  onOpenCustomize: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  lang,
  onQuickAddToCart,
  onOpenCustomize,
}) => {
  // Mobile rectangle view mode: 'both' | 'rect1' | 'rect2'
  const [activeRect, setActiveRect] = useState<'both' | 'rect1' | 'rect2'>('both');
  const [searchQuery, setSearchQuery] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Sub-filter inside Rectangle 1
  const [rect1SubCategory, setRect1SubCategory] = useState<'all' | 'pizza' | 'naan'>('all');
  // Sub-filter inside Rectangle 2
  const [rect2SubCategory, setRect2SubCategory] = useState<'all' | 'burger' | 'tacos' | 'box' | 'sides'>('all');

  // Rectangle 1 Items: Pizzas & Naan Cheese
  const rect1Items = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (item.category !== 'pizza' && item.category !== 'naan') return false;
      if (rect1SubCategory !== 'all' && item.category !== rect1SubCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.nameAr.toLowerCase().includes(q) ||
          item.ingredients.toLowerCase().includes(q) ||
          item.ingredientsAr.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rect1SubCategory, searchQuery]);

  // Rectangle 2 Items: Burgers, Tacos, Boxes, Salades & Boissons
  const rect2Items = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (item.category === 'pizza' || item.category === 'naan') return false;
      if (rect2SubCategory !== 'all' && item.category !== rect2SubCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.nameAr.toLowerCase().includes(q) ||
          item.ingredients.toLowerCase().includes(q) ||
          item.ingredientsAr.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [rect2SubCategory, searchQuery]);

  const handleQuickAdd = (item: MenuItem) => {
    onQuickAddToCart(item);
    setRecentlyAddedId(item.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
  };

  // Reusable small rectangular food card (مستطيل صغير للمأكولات - مخصص للهاتف)
  const renderSmallFoodRectangle = (item: MenuItem) => {
    const isAdded = recentlyAddedId === item.id;
    return (
      <div
        key={item.id}
        className="p-3 sm:p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-orange-500/40 transition-all flex flex-col justify-between group active:scale-[0.98]"
      >
        <div>
          {/* Header Row: Category/Badge & Price */}
          <div className="flex items-center justify-between gap-1 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 truncate">
              {item.isSignature ? (
                <span className="text-amber-400">✦ Signature</span>
              ) : item.isPopular ? (
                <span className="text-orange-400">★ Top</span>
              ) : item.isSpicy ? (
                <span className="text-red-400">🌶️ Piquant</span>
              ) : (
                item.category.toUpperCase()
              )}
            </span>

            <span className="font-mono tabular-nums text-xs sm:text-sm font-black text-orange-400 shrink-0">
              {item.price} <span className="text-[10px] text-neutral-400">DA</span>
            </span>
          </div>

          {/* Dish Name */}
          <h4 className="font-display font-bold text-white text-xs sm:text-sm group-hover:text-orange-400 transition-colors line-clamp-1 mb-1">
            {lang === 'fr' ? item.name : item.nameAr}
          </h4>

          {/* Compact Ingredients */}
          <p className="text-[10px] sm:text-[11px] text-neutral-400 leading-tight line-clamp-2 mb-2 sm:mb-3">
            {lang === 'fr' ? item.ingredients : item.ingredientsAr}
          </p>
        </div>

        {/* Small Touch-Friendly Actions */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickAdd(item)}
            className={`min-h-[40px] flex-1 py-1.5 px-2 rounded-lg font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-orange-600 hover:bg-orange-500 text-white shadow-sm'
            }`}
            title="Ajouter au panier"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">{lang === 'fr' ? 'Ajouté' : 'تم'}</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{lang === 'fr' ? 'Ajouter' : 'إضافة'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onOpenCustomize(item)}
            className="min-h-[40px] min-w-[40px] p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer active:scale-95 transition-colors"
            title={lang === 'fr' ? 'Options & Sauces' : 'خيارات الصلصة والجبن'}
            aria-label="Options"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="menu" className="py-12 sm:py-16 md:py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-orange-500 mb-1.5">
              {lang === 'fr' ? 'Menu Complet Vinàqui Snack' : 'قائمة المأكولات الرسمية في مستطيلين'}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              {lang === 'fr' ? (
                <>
                  Toute la Carte en <span className="text-orange-500">2 Rectangles</span>
                </>
              ) : (
                <>
                  جميع المأكولات في <span className="text-orange-500">مستطيلين منظمين</span>
                </>
              )}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-400 max-w-xl">
              {lang === 'fr'
                ? 'Consultez facilement toutes les spécialités de Vinàqui dans deux espaces dédiés, pensés pour une navigation rapide sur mobile.'
                : 'تصفح كل أطباق وسندويتشات فيناكي المنظمة في مستطيلين خفيفين ومصممين خصيصاً للتصفح المريح على الهاتف.'}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder={
                lang === 'fr'
                  ? 'Rechercher pizza, naan, burger...'
                  : 'بحث سريع عن أي وجبة...'
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-800 rounded-xl text-neutral-100 text-xs sm:text-sm placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Mobile View Switcher (المستطيل 1 / المستطيل 2 / كلاهما) */}
        <div className="flex items-center gap-1.5 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl mb-6 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveRect('both')}
            className={`min-h-[44px] flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRect === 'both'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Les 2 Rectangles' : 'المستطيلين معاً'}</span>
          </button>

          <button
            onClick={() => setActiveRect('rect1')}
            className={`min-h-[44px] flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRect === 'rect1'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Pizza className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? '1. Pizzas & Naans' : '1. البيتزا والنان'}</span>
            <span className="font-mono text-[10px] opacity-75">({rect1Items.length})</span>
          </button>

          <button
            onClick={() => setActiveRect('rect2')}
            className={`min-h-[44px] flex-1 py-2 px-3 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
              activeRect === 'rect2'
                ? 'bg-orange-600 text-white shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? '2. Burgers, Tacos & Box' : '2. برغر، تاكوس وبوكس'}</span>
            <span className="font-mono text-[10px] opacity-75">({rect2Items.length})</span>
          </button>
        </div>

        {/* The Two Main Rectangles Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* ======================================================= */}
          {/* RECTANGLE 1: Pizzas Italiennes & Naan Cheese            */}
          {/* ======================================================= */}
          {(activeRect === 'both' || activeRect === 'rect1') && (
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border-2 border-orange-500/30 shadow-xl flex flex-col">
              {/* Rectangle 1 Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-600/20 text-orange-400 flex items-center justify-center font-bold text-xs shrink-0 border border-orange-500/30">
                    1
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base sm:text-lg flex items-center gap-1.5">
                      <span>{lang === 'fr' ? 'Pizzas au Four & Naan Cheese' : 'ركن البيتزا الإيطالية والنان شيز'}</span>
                    </h3>
                    <span className="text-[11px] text-neutral-400">
                      {lang === 'fr' ? 'Pâte fraîche étalée à la main & fromage fondant' : 'عجينة طازجة بالفرن وجبن مذاب'}
                    </span>
                  </div>
                </div>

                {/* Sub-tabs inside Rectangle 1 */}
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg self-start sm:self-auto">
                  <button
                    onClick={() => setRect1SubCategory('all')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer ${
                      rect1SubCategory === 'all'
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Tous' : 'الكل'}
                  </button>
                  <button
                    onClick={() => setRect1SubCategory('pizza')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer ${
                      rect1SubCategory === 'pizza'
                        ? 'bg-orange-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Pizzas (15)' : 'بيتزا (15)'}
                  </button>
                  <button
                    onClick={() => setRect1SubCategory('naan')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer ${
                      rect1SubCategory === 'naan'
                        ? 'bg-orange-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Naans (9)' : 'نان (9)'}
                  </button>
                </div>
              </div>

              {/* 2-Column Mobile-Friendly Grid of Small Rectangular Cards */}
              {rect1Items.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 max-h-[650px] overflow-y-auto pr-1">
                  {rect1Items.map((item) => renderSmallFoodRectangle(item))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  {lang === 'fr' ? 'Aucun article trouvé dans ce rectangle.' : 'لا توجد نتائج مطابقة.'}
                </div>
              )}
            </div>
          )}

          {/* ======================================================= */}
          {/* RECTANGLE 2: Burgers, Tacos, Boxes, Salades & Boissons   */}
          {/* ======================================================= */}
          {(activeRect === 'both' || activeRect === 'rect2') && (
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-950 border-2 border-amber-500/30 shadow-xl flex flex-col">
              {/* Rectangle 2 Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xs shrink-0 border border-amber-500/30">
                    2
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-base sm:text-lg flex items-center gap-1.5">
                      <span>{lang === 'fr' ? 'Burgers, Tacos, Boxes & Sides' : 'ركن البرغر، التاكوس والبوكسات'}</span>
                    </h3>
                    <span className="text-[11px] text-neutral-400">
                      {lang === 'fr' ? 'Steak pur bœuf, tenders croustillants & frites' : 'لحم بقري مفروم، تندرز كريسبي وبطاطا'}
                    </span>
                  </div>
                </div>

                {/* Sub-tabs inside Rectangle 2 */}
                <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-lg self-start sm:self-auto overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setRect2SubCategory('all')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer whitespace-nowrap ${
                      rect2SubCategory === 'all'
                        ? 'bg-neutral-800 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Tous' : 'الكل'}
                  </button>
                  <button
                    onClick={() => setRect2SubCategory('burger')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer whitespace-nowrap ${
                      rect2SubCategory === 'burger'
                        ? 'bg-amber-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Burgers' : 'برغر'}
                  </button>
                  <button
                    onClick={() => setRect2SubCategory('tacos')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer whitespace-nowrap ${
                      rect2SubCategory === 'tacos'
                        ? 'bg-amber-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Tacos' : 'تاكوس'}
                  </button>
                  <button
                    onClick={() => setRect2SubCategory('box')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer whitespace-nowrap ${
                      rect2SubCategory === 'box'
                        ? 'bg-amber-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Box' : 'بوكس'}
                  </button>
                  <button
                    onClick={() => setRect2SubCategory('sides')}
                    className={`px-2 py-1 text-[11px] font-semibold rounded cursor-pointer whitespace-nowrap ${
                      rect2SubCategory === 'sides'
                        ? 'bg-amber-600 text-white'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {lang === 'fr' ? 'Boissons' : 'مشروبات'}
                  </button>
                </div>
              </div>

              {/* 2-Column Mobile-Friendly Grid of Small Rectangular Cards */}
              {rect2Items.length > 0 ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 max-h-[650px] overflow-y-auto pr-1">
                  {rect2Items.map((item) => renderSmallFoodRectangle(item))}
                </div>
              ) : (
                <div className="text-center py-8 text-neutral-500 text-xs">
                  {lang === 'fr' ? 'Aucun article trouvé dans ce rectangle.' : 'لا توجد نتائج مطابقة.'}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
