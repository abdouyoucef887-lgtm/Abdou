import React from 'react';
import { DELIVERY_ZONES } from '../data/menuData';
import { MapPin, Phone, Clock, Bike, Send, Navigation } from 'lucide-react';

interface LocationAndDeliveryProps {
  lang: 'fr' | 'ar';
}

export const LocationAndDelivery: React.FC<LocationAndDeliveryProps> = ({ lang }) => {
  return (
    <section id="livraison" className="py-10 sm:py-16 md:py-20 bg-neutral-900/60 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Bike className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Livraison Rapide à Oran' : 'خدمة التوصيل السريع بوهران'}</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {lang === 'fr' ? (
              <>
                Où Sommes-Nous & <span className="text-orange-500">Zones Livrées</span>
              </>
            ) : (
              <>
                موقع المحل <span className="text-orange-500">وأحياء التوصيل</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-300">
            {lang === 'fr'
              ? 'Situé à Mirocho, Vinàqui Snack dessert tous les quartiers principaux d’Oran avec des boîtes thermiques pour conserver vos repas chauds et croustillants.'
              : 'يقع محل فيناكي بحي ميروشو، ونقوم بالتوصيل السريع لجميع أحياء وهران بحقائب حرارية خاصة للحفاظ على حرارة الوجبات.'}
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Contact & Info Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-500 block mb-1">
                  {lang === 'fr' ? 'Adresse du Snack' : 'عنوان المحل'}
                </span>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-base">
                      Rue Aspt Maouad Ahmed (Mirocho)
                    </h4>
                    <span className="text-xs text-neutral-400">
                      Oran, 31000, Algérie
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-500 block mb-1">
                  {lang === 'fr' ? 'Horaires d’Ouverture' : 'أوقات العمل اليومية'}
                </span>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-white text-base">
                      {lang === 'fr' ? '7 Jours sur 7 : 11h30 – 01h00' : 'طيلة أيام الأسبوع : 11:30 صباحاً حتى 01:00 ليلاً'}
                    </h4>
                    <span className="text-xs text-emerald-400 font-semibold">
                      {lang === 'fr' ? 'Service continu non-stop' : 'خدمة مستمرة دون انقطاع'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-500 block mb-1">
                  {lang === 'fr' ? 'Commandes & Réservations' : 'أرقام الطلب والخدمة'}
                </span>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <a
                      href="tel:0652747719"
                      className="font-mono font-black text-white text-lg hover:text-orange-400 transition-colors block"
                    >
                      0652 74 77 19
                    </a>
                    <span className="text-xs text-neutral-400">
                      {lang === 'fr' ? 'Appel direct ou commande WhatsApp' : 'اتصال مباشر أو واتساب'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action buttons */}
            <div className="pt-6 mt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/213652747719"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>WhatsApp Vinàqui</span>
              </a>

              <a
                href="tel:0652747719"
                className="flex-1 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-100 border border-neutral-700 font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-orange-500" />
                <span>0652 74 77 19</span>
              </a>
            </div>
          </div>

          {/* Right: Delivery Zones Matrix */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-neutral-950 border border-neutral-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  {lang === 'fr' ? 'Tarifs & Délais par Quartier' : 'أسعار ومدة التوصيل حسب الحي'}
                </h3>
                <span className="text-xs text-neutral-400">
                  {lang === 'fr'
                    ? 'Départ immédiat depuis notre cuisine à Mirocho'
                    : 'انطلاق فوري للطلبية من مطبخنا بميروشو'}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-orange-950 text-orange-400 border border-orange-800">
                Oran 31
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DELIVERY_ZONES.map((zone) => (
                <div
                  key={zone.id}
                  className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-orange-400 shrink-0">
                      <Navigation className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-xs">
                        {lang === 'fr' ? zone.name : zone.nameAr}
                      </h4>
                      <span className="text-[11px] text-neutral-400">
                        {zone.time}
                      </span>
                    </div>
                  </div>

                  <div className="font-mono font-bold text-orange-400 text-xs">
                    {zone.fee} DA
                  </div>
                </div>
              ))}
            </div>

            {/* Note about packaging */}
            <div className="mt-4 p-3 rounded-xl bg-neutral-900/40 border border-neutral-800/60 text-xs text-neutral-400 flex items-center gap-2">
              <span className="text-orange-500 font-bold">★</span>
              <span>
                {lang === 'fr'
                  ? 'Emballages isothermes haute qualité pour préserver le croustillant de vos pizzas et la chaleur de vos naans.'
                  : 'تغليف حراري عالي الجودة يحافظ على قرمشة البيتزا وسخونة النان والبطاطا.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
