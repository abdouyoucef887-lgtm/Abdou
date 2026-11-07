import React from 'react';
import { Phone, MapPin, Heart, Flame } from 'lucide-react';

interface FooterProps {
  lang: 'fr' | 'ar';
  onOpenPitch: () => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onOpenPitch }) => {
  return (
    <footer id="contact" className="bg-neutral-950 border-t border-neutral-900 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-extrabold text-base">
                V
              </div>
              <span className="font-display text-xl font-black text-white uppercase tracking-tight">
                VINÀQUI <span className="text-orange-500">SNACK</span>
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              {lang === 'fr'
                ? "Le fast-food de référence à Mirocho, Oran. Naan Cheese, Pizzas au four, Burgers gourmets, Tacos gratinés et Boxes savoureuses."
                : "مطعم وسناك مميز بميروشو، وهران. نان بالجبن، بيتزا بالفرن، برغر، تاكوس وبوكس مع خدمة التوصيل السريع."}
            </p>
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>{lang === 'fr' ? 'Ouvert 7j/7 de 11h30 à 01h00' : 'مفتوح يومياً 11:30 حتى 01:00 ليلاً'}</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs">
              {lang === 'fr' ? 'La Carte' : 'القائمة'}
            </h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">
                  {lang === 'fr' ? 'Pizzas Four (15 recettes)' : 'بيتزا بالفرن (15 نوع)'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">
                  {lang === 'fr' ? 'Naan Cheese (9 spécialités)' : 'نان بالجبن (9 خيارات)'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">
                  {lang === 'fr' ? 'Burgers Pur Bœuf & Tenders' : 'برغر لحم بقري وتندرز'}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">
                  {lang === 'fr' ? 'Tacos Français & Boxes' : 'تاكوس فرنسي وبوكس'}
                </a>
              </li>
              <li>
                <a href="#mega-promo" className="text-orange-400 hover:text-orange-300 transition-colors font-semibold">
                  ★ {lang === 'fr' ? 'Offre Méga 3 Pizzas' : 'عرض ميغا 3 بيتزا'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-2">
            <h4 className="font-display font-bold text-white uppercase tracking-wider text-xs">
              {lang === 'fr' ? 'Coordonnées & Adresse' : 'الموقع والاتصال'}
            </h4>
            <div className="space-y-2 text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Rue Aspt Maouad Ahmed (Mirocho), Oran</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <a href="tel:0652747719" className="text-white font-mono hover:text-orange-400">
                  0652 74 77 19
                </a>
              </div>
              <div>
                <a
                  href="https://www.tiktok.com/@vinaqui.31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 flex items-center gap-1 font-semibold"
                >
                  <Heart className="w-3.5 h-3.5 fill-pink-500" />
                  <span>TikTok : @vinaqui.31 (154K Likes)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Owner Pitch Showcase Callout */}
          <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase">
              <Flame className="w-3.5 h-3.5 fill-orange-500" />
              <span>{lang === 'fr' ? 'Espace Gérant du Snack' : 'ميزة خاصة بصاحب المحل'}</span>
            </div>
            <p className="text-neutral-400 text-[11px] leading-relaxed">
              {lang === 'fr'
                ? 'Vous êtes le propriétaire de Vinàqui Snack ? Découvrez pourquoi ce site vous fait économiser 300 000+ DA chaque mois.'
                : 'هل أنت صاحب محل فيناكي سناك؟ اكتشف كيف يوفر لك هذا الموقع أكثر من 30 مليون سنتيم شهرياً.'}
            </p>
            <button
              onClick={onOpenPitch}
              className="w-full py-2 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Voir la Démo Rentabilité' : 'عرض حاسبة الأرباح'}
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} Vinàqui Snack Oran. {lang === 'fr' ? 'Tous droits réservés.' : 'جميع الحقوق محفوظة.'}
          </p>
          <p>
            {lang === 'fr' ? '« Viens goûter l’essentiel »' : '« المذاق الحقيقي لأشهى الوجبات بوهران »'}
          </p>
        </div>
      </div>
    </footer>
  );
};
