import React from 'react';
import { ShoppingBag, Phone, Sparkles, Globe, Menu as MenuIcon, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenPitch: () => void;
  lang: 'fr' | 'ar';
  setLang: (lang: 'fr' | 'ar') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenPitch,
  lang,
  setLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 md:gap-8">
          {/* Zone 1: Brand Wordmark (Single text element in Outfit display font) */}
          <a
            href="#"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0 text-decoration-none"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-orange-600/30 group-hover:scale-105 transition-transform">
              V
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-black tracking-tight text-white group-hover:text-orange-500 transition-colors uppercase">
                VINÀQUI <span className="text-orange-500">SNACK</span>
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Single-line, clean typography) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            <a
              href="#menu"
              className="hover:text-orange-500 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'La Carte (2 Menus)' : 'القائمة (المستطيلين)'}
            </a>
            <a
              href="#mega-promo"
              className="hover:text-orange-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span className="text-orange-400 font-bold">★</span>
              {lang === 'fr' ? 'Offre Méga x3' : 'عرض ميغا 3 بيتزا'}
            </a>
            <a
              href="#livraison"
              className="hover:text-orange-500 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'Livraison Oran' : 'التوصيل في وهران'}
            </a>
            <a
              href="#contact"
              className="hover:text-orange-500 transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'fr' ? 'Contact & Horaires' : 'الموقع والمواعيد'}
            </a>
          </nav>

          {/* Zone 3: Actions (Pitch Button, Language toggle, Cart, Call CTA) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Owner Pitch Showcase Button (For convincing the restaurant owner) */}
            <button
              onClick={onOpenPitch}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-orange-950/60 text-orange-400 border border-orange-500/30 hover:bg-orange-900/50 hover:border-orange-500 transition-all whitespace-nowrap"
              title="Démonstration pour le propriétaire de Vinàqui"
            >
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>{lang === 'fr' ? 'Espace Gérant' : 'ميزة لصاحب المحل'}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors whitespace-nowrap shrink-0"
              title="Changer la langue / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-bold">{lang === 'fr' ? 'عربي' : 'FR'}</span>
            </button>

            {/* Direct Phone Call Button */}
            <a
              href="tel:0652747719"
              className="hidden md:flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" />
              <span className="font-mono">0652 74 77 19</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center justify-center p-2.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-semibold transition-all shadow-md shadow-orange-600/20 active:scale-95 whitespace-nowrap shrink-0"
              aria-label="Voir le panier"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-orange-600 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-800 flex flex-col gap-3 text-sm font-medium">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-neutral-300 hover:text-orange-500 hover:bg-neutral-900 rounded-lg"
            >
              {lang === 'fr' ? 'La Carte Complète' : 'قائمة المأكولات'}
            </a>
            <a
              href="#mega-promo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-orange-400 hover:bg-neutral-900 rounded-lg font-semibold flex items-center gap-2"
            >
              <span>★</span> {lang === 'fr' ? 'Offre Méga x3 Pizzas' : 'عرض ميغا 3 بيتزا'}
            </a>
            <a
              href="#livraison"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-neutral-300 hover:text-orange-500 hover:bg-neutral-900 rounded-lg"
            >
              {lang === 'fr' ? 'Zones de Livraison' : 'التوصيل في وهران'}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 text-neutral-300 hover:text-orange-500 hover:bg-neutral-900 rounded-lg"
            >
              {lang === 'fr' ? 'Contact & Horaires' : 'الموقع والمواعيد'}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPitch();
              }}
              className="py-2 px-3 text-orange-400 bg-orange-950/40 border border-orange-500/30 rounded-lg font-semibold text-left flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>{lang === 'fr' ? '💡 Espace Gérant (Pourquoi ce site ?)' : '💡 عرض خاص لصاحب المحل'}</span>
            </button>
            <a
              href="tel:0652747719"
              className="py-2.5 px-3 bg-neutral-900 text-center font-bold text-neutral-100 rounded-lg border border-neutral-800 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>0652 74 77 19</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
};
