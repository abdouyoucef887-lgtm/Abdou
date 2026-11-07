/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuItem } from './data/menuData';
import { CartItem, CustomerOrder } from './types/cart';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MegaPromo } from './components/MegaPromo';
import { MenuSection } from './components/MenuSection';
import { AboutAndQuality } from './components/AboutAndQuality';
import { LocationAndDelivery } from './components/LocationAndDelivery';
import { Footer } from './components/Footer';
import { ItemCustomizeModal } from './components/ItemCustomizeModal';
import { CartDrawer } from './components/CartDrawer';
import { OwnerPitchModal } from './components/OwnerPitchModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { ShoppingBag, MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vinaqui_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPitchOpen, setIsPitchOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('vinaqui_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Adjust document direction for Arabic support
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  // Total quantity in cart
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalItemPrice, 0);

  // Quick add (default sauce, no extra supplement)
  const handleQuickAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.menuItem.id === item.id &&
          ci.selectedSauce === 'Sauce Fromagère Maison' &&
          ci.supplements.length === 0 &&
          !ci.notes
      );

      if (existingIndex >= 0) {
        const next = [...prev];
        const existing = next[existingIndex];
        const newQty = existing.quantity + 1;
        next[existingIndex] = {
          ...existing,
          quantity: newQty,
          totalItemPrice: (existing.menuItem.price + existing.supplementPrice) * newQty,
        };
        return next;
      }

      const newItem: CartItem = {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity: 1,
        selectedSauce: 'Sauce Fromagère Maison',
        supplements: [],
        supplementPrice: 0,
        totalItemPrice: item.price,
      };
      return [...prev, newItem];
    });
  };

  // Add customized item or promo pack
  const handleAddCustomItemToCart = (customItem: CartItem) => {
    setCart((prev) => [...prev, customItem]);
  };

  // Quantity updates in cart
  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            const singleUnitPrice = item.menuItem.price + item.supplementPrice;
            return {
              ...item,
              quantity: newQty,
              totalItemPrice: singleUnitPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToPromo = () => {
    const el = document.getElementById('mega-promo');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen bg-neutral-950 text-neutral-100 flex flex-col pb-20 sm:pb-0 ${
        lang === 'ar' ? 'arabic-font' : 'font-sans'
      }`}
    >
      {/* Top Slim Announcement Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 text-white text-[11px] sm:text-xs font-bold py-1.5 px-3 text-center tracking-wide flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <span>🛵 {lang === 'fr' ? 'Livraison rapide à Oran' : 'توصيل سريع بجميع أحياء وهران'}</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span>☎️ 0652 74 77 19</span>
        <span className="hidden sm:inline" aria-hidden="true">·</span>
        <span className="bg-black/30 px-2 py-0.5 rounded text-[10px] uppercase font-black">
          {lang === 'fr' ? 'Offre 3 Pizzas disponible' : 'عرض خاص متوفر'}
        </span>
      </div>

      {/* Primary Top Bar */}
      <Navbar
        cartCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenPitch={() => setIsPitchOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          lang={lang}
          onExploreMenu={scrollToMenu}
          onOpenPromo={scrollToPromo}
        />

        <MegaPromo
          lang={lang}
          onAddCustomItemToCart={handleAddCustomItemToCart}
        />

        {/* The 2-Rectangle Menu Section (All dishes organized into 2 distinct rectangles with compact mobile cards) */}
        <MenuSection
          lang={lang}
          onQuickAddToCart={handleQuickAddToCart}
          onOpenCustomize={(item) => setCustomizingItem(item)}
        />

        <AboutAndQuality lang={lang} />

        <LocationAndDelivery lang={lang} />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onOpenPitch={() => setIsPitchOpen(true)}
      />

      {/* ======================================================== */}
      {/* MOBILE-FIRST STICKY BOTTOM BAR (Natural Thumb Zone)      */}
      {/* ======================================================== */}
      <nav
        aria-label="Navigation rapide mobile"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2 px-3 flex items-center justify-between gap-2 shadow-2xl safe-area-pb"
      >
        {/* Fast Call Button */}
        <a
          href="tel:0652747719"
          className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-200 flex items-center justify-center active:scale-95 transition-transform"
          aria-label="Appeler le snack"
          title="Appeler 0652747719"
        >
          <Phone className="w-4 h-4 text-orange-500" />
        </a>

        {/* WhatsApp Fast Trigger */}
        <a
          href="https://wa.me/213652747719"
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-md shadow-emerald-600/30"
        >
          <MessageCircle className="w-4 h-4 fill-white shrink-0" />
          <span>{lang === 'fr' ? 'WhatsApp' : 'واتساب'}</span>
        </a>

        {/* Cart Trigger with Counter & Total */}
        <button
          onClick={() => setIsCartOpen(true)}
          className={`min-h-[44px] py-2 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md cursor-pointer ${
            cartItemCount > 0
              ? 'bg-orange-600 text-white shadow-orange-600/40'
              : 'bg-neutral-900 text-neutral-300 border border-neutral-800'
          }`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartItemCount}
              </span>
            )}
          </div>
          <span>
            {cartItemCount > 0 ? (
              <span className="font-mono tabular-nums">{cartSubtotal} DA</span>
            ) : (
              <span>{lang === 'fr' ? 'Panier' : 'السلة'}</span>
            )}
          </span>
        </button>
      </nav>

      {/* Desktop Floating Cart Button */}
      {cartItemCount > 0 && !isCartOpen && (
        <aside
          aria-label="Panier flottant bureau"
          className="hidden sm:block fixed bottom-6 right-6 z-40 max-w-sm"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 py-3 px-5 rounded-2xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-2xl shadow-orange-600/50 hover:scale-105 active:scale-95 transition-all cursor-pointer border border-orange-400/30"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {cartItemCount}
              </span>
            </div>
            <div className="text-left">
              <span className="block text-xs uppercase tracking-wider text-orange-200">
                {lang === 'fr' ? 'Votre Commande' : 'طلبك الحالي'}
              </span>
              <span className="font-mono text-sm font-black tabular-nums">
                {cartSubtotal} DA
              </span>
            </div>
          </button>
        </aside>
      )}

      {/* Desktop Floating WhatsApp Button */}
      <aside
        aria-label="Contact WhatsApp bureau"
        className="hidden sm:block fixed bottom-6 left-6 z-40"
      >
        <a
          href="https://wa.me/213652747719"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 py-2.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xl shadow-emerald-600/40 hover:scale-105 transition-all group"
          title="Contacter Vinàqui Snack sur WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp Vinàqui</span>
        </a>
      </aside>

      {/* Modals & Drawers */}
      <ItemCustomizeModal
        item={customizingItem}
        onClose={() => setCustomizingItem(null)}
        onAddToCart={handleAddCustomItemToCart}
        lang={lang}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOrderSuccess={(order) => setConfirmedOrder(order)}
        lang={lang}
      />

      <OwnerPitchModal
        isOpen={isPitchOpen}
        onClose={() => setIsPitchOpen(false)}
        lang={lang}
      />

      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
        lang={lang}
      />
    </div>
  );
}
