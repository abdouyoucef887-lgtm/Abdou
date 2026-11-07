import React from 'react';
import { Phone, ArrowRight, MapPin, Clock, Flame, ShieldCheck, ShoppingBag } from 'lucide-react';

interface HeroProps {
  lang: 'fr' | 'ar';
  onExploreMenu: () => void;
  onOpenPromo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onExploreMenu, onOpenPromo }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-neutral-800 bg-radial-[at_top_center] from-orange-950/25 via-neutral-950 to-neutral-950">
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-64 bg-orange-600/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top trust kicker */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 text-xs font-medium text-orange-400 mb-4 sm:mb-6">
          <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-orange-500">
            <Flame className="w-3.5 h-3.5 fill-orange-500 shrink-0" />
            Vinàqui Snack
          </span>
          <span className="text-neutral-600" aria-hidden="true">·</span>
          <span className="text-neutral-300">Mirocho · Oran</span>
          <span className="text-neutral-600" aria-hidden="true">·</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 shrink-0" />
            {lang === 'fr' ? 'Ouvert 11h30 – 01h' : 'مفتوح حتى 01:00 ليلاً'}
          </span>
        </div>

        {/* Hero Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Headlines & Action CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              {lang === 'fr' ? (
                <>
                  VIENS GOÛTER <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
                    L'ESSENTIEL DU SNACK.
                  </span>
                </>
              ) : (
                <>
                  أشهى سندويتشات النان <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400">
                    والبيتزا الساخنة في وهران
                  </span>
                </>
              )}
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-xl">
              {lang === 'fr'
                ? "Pizzas au four croustillantes, Cheese Naans coulants, Burgers pur bœuf, Tacos gratinés et Boxes généreuses. Cuisinés chaque jour avec amour à Mirocho, Oran."
                : "نان بالجبن الذائب، بيتزا بالفرن الساخن، برغر لحم بقري طازج، تاكوس فرنسي وبوكسات عائلية. خدمة سريعة وتوصيل حار لجميع أحياء وهران."}
            </p>

            {/* Mobile-friendly action button group */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <button
                onClick={onExploreMenu}
                className="min-h-[48px] px-5 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold text-sm transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Voir la Carte & Commander' : 'قائمة المأكولات والطلب'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenPromo}
                className="min-h-[48px] px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-orange-400 border border-orange-500/40 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span className="text-amber-400 font-bold">★</span>
                <span>{lang === 'fr' ? 'Offre Méga Pizza x3' : 'عرض ميغا 3 بيتزا'}</span>
              </button>

              <a
                href="tel:0652747719"
                className="min-h-[48px] px-4 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="font-mono">0652 74 77 19</span>
              </a>
            </div>

            {/* Quick badges for mobile */}
            <div className="mt-6 grid grid-cols-3 gap-2 pt-4 border-t border-neutral-800/80 text-[11px] sm:text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{lang === 'fr' ? '100% Frais' : 'طازج 100%'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>{lang === 'fr' ? 'Fromage fondant' : 'جبن ذائب'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{lang === 'fr' ? 'Livraison Oran' : 'توصيل وهران'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Food Showcase Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl">
              <div className="relative aspect-16/10 sm:aspect-4/3 w-full overflow-hidden bg-neutral-950">
                <img
                  src="/public/assets/aistudio/2a005070ee2f6eedfe1b67194fdc6e88_d21b8e22.webp"
                  alt="Vinàqui Snack - Pizza Spéciale Oran"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                
                <div className="absolute top-3 right-3 bg-orange-600 text-white font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" />
                  <span>MEGA PRIX PIZZA x 3</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white bg-neutral-950/80 backdrop-blur-sm p-2.5 rounded-xl border border-neutral-800">
                  <span className="font-semibold">{lang === 'fr' ? 'Spécialité Naan & Pizza' : 'نان بالجبن وبيتزا بالفرن'}</span>
                  <span className="font-mono text-orange-400 font-bold">Mirocho · Oran</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
