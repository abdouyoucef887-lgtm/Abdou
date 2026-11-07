import React from 'react';
import { Sparkles, Flame, ShieldCheck, Heart, Award } from 'lucide-react';

interface AboutAndQualityProps {
  lang: 'fr' | 'ar';
}

export const AboutAndQuality: React.FC<AboutAndQualityProps> = ({ lang }) => {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'La Charte Qualité Vinàqui' : 'معايير الجودة والنظافة فيناكي'}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {lang === 'fr' ? (
              <>
                Le Secret de Nos <span className="text-orange-500">Saveurs</span>
              </>
            ) : (
              <>
                سر المذاق الذي أحبه <span className="text-orange-500">أهل وهران</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-300">
            {lang === 'fr'
              ? 'Chez Vinàqui, nous ne faisons aucun compromis sur la fraîcheur. De la pâte pétrie au petit matin jusqu’aux fromages fondants, chaque ingrédient est sélectionné avec soin.'
              : 'في فيناكي سناك، لا نرضى بغير الأفضل. من العجين الطازج المخمر يومياً إلى أطيب الأجبان الفرنسية واللحوم الطازجة 100% حلال.'}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-orange-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-600/10 border border-orange-500/30 text-orange-500 flex items-center justify-center font-bold mb-4">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {lang === 'fr' ? 'Pâte Pétrie à la Main' : 'عجينة طازجة يومياً'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Une fermentation lente et naturelle qui confère à nos pizzas et naans une texture croustillante et légère.'
                  : 'تخمير بطيء ومثالي يمنح البيتزا وخبز النان قواماً مقرمشاً من الخارج وهشاً من الداخل.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-orange-400/90 mt-4 block">
              100% Fait Maison
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-orange-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-600/10 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {lang === 'fr' ? 'Fromages Fondants de Qualité' : 'أجبان فرنسية أصلية'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Mozzarella filante, cheddar crémeux, gruyère affiné, gouda et camembert pour une cascade de saveurs.'
                  : 'موزاريلا مطاطية غنية، شيدر كريمي، غرويير، غودا وكامومبير لإرضاء عشاق الأجبان الذائبة.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-amber-400/90 mt-4 block">
              Cascade Fromagère
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-orange-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {lang === 'fr' ? 'Viandes 100% Halal Fraîches' : 'لحوم حلال طازجة'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Steaks hachés pur bœuf assaisonnés, escalopes tendres marinées aux épices douces et tenders croustillants.'
                  : 'لحم بقري مفروم متبل، شرائح إسكالوب دجاج طرية وتندرز مقرمشة محضرة بوصفات خاصة.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-400/90 mt-4 block">
              Approvisionnement Quotidien
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800 hover:border-orange-500/40 transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pink-600/10 border border-pink-500/30 text-pink-500 flex items-center justify-center font-bold mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                {lang === 'fr' ? 'Hospitalité & Convivialité' : 'أطيب خلق الله'}
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {lang === 'fr'
                  ? 'Une équipe passionnée qui met tout son cœur pour régaler les habitants de Mirocho et d’Oran entière.'
                  : 'فريق عمل متفانٍ ومحبوب يحرص على إكرام كل زبون وتقديم الوجبة بأفضل حلة وبابتسامة دائمة.'}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-pink-400/90 mt-4 block">
              Esprit Vinàqui
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
