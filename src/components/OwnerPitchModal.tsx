import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  DollarSign,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Heart,
  Share2,
} from 'lucide-react';

interface OwnerPitchModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'fr' | 'ar';
}

export const OwnerPitchModal: React.FC<OwnerPitchModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  // Simulator state: daily orders slider
  const [dailyOrders, setDailyOrders] = useState(25);
  const averageTicket = 1200; // in DA
  const commissionRate = 0.20; // 20% typical third party delivery app fee
  const monthlyCommissionSaved = Math.round(dailyOrders * averageTicket * commissionRate * 30);
  const monthlyRevenue = dailyOrders * averageTicket * 30;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-neutral-900 border border-orange-500/40 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Header Bar */}
        <div className="p-6 bg-gradient-to-r from-orange-950/80 via-neutral-950 to-neutral-950 border-b border-neutral-800 flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/20 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Démonstration Commerciale & ROI' : 'عرض إقناع لصاحب محل فيناكي'}</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
              {lang === 'fr' ? (
                <>
                  Pourquoi ce site est une <span className="text-orange-500">machine à ventes</span> pour Vinàqui ?
                </>
              ) : (
                <>
                  كيف يرفع هذا الموقع أرباح <span className="text-orange-500">فيناكي سناك</span> بميروشو؟
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              {lang === 'fr'
                ? '5 arguments décisifs pour moderniser votre restaurant et dominer la livraison à Oran.'
                : '5 أسباب قاطعة تثبت لصاحب المحل أن امتلاك هذا الموقع سيرفع مبيعاته ويوفر عليه ملايين السنتيمات.'}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-xl hover:bg-neutral-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 text-sm text-neutral-300 max-h-[75vh] overflow-y-auto">
          {/* Interactive Profit Simulator */}
          <div className="p-5 rounded-2xl bg-neutral-950 border border-orange-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">
                  {lang === 'fr' ? 'Simulateur d’Économies Réelles' : 'حاسبة الأرباح والتوفير المالي'}
                </span>
                <h4 className="font-display font-bold text-white text-lg">
                  {lang === 'fr' ? '0% Commission aux Applications Tiers' : '0% عمولة للتطبيقات الوسيطة'}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-neutral-400 block">
                  {lang === 'fr' ? 'Économies estimées par mois :' : 'مبلغ التوفير الصافي شهرياً :'}
                </span>
                <span className="font-mono text-2xl font-black text-emerald-400 tabular-nums">
                  +{monthlyCommissionSaved.toLocaleString()} DA
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-neutral-300">
                <span>{lang === 'fr' ? 'Nombre de commandes livraison par jour :' : 'عدد طلبيات التوصيل اليومية :'}</span>
                <span className="font-mono text-orange-400 font-bold">{dailyOrders} commandes/jour</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-neutral-500">
                <span>10 commandes</span>
                <span>50 commandes</span>
                <span>100 commandes</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-800 grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400 block mb-1">
                  {lang === 'fr' ? 'Chiffre d’affaires mensuel généré :' : 'المدخول الإجمالي شهرياً :'}
                </span>
                <span className="font-mono font-bold text-white text-base">
                  {monthlyRevenue.toLocaleString()} DA
                </span>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-neutral-400 block mb-1">
                  {lang === 'fr' ? 'Gain conservé directement :' : 'أموال تذهب مباشرة لجيب صاحب المحل :'}
                </span>
                <span className="font-mono font-bold text-emerald-400 text-base">
                  100% dans votre caisse
                </span>
              </div>
            </div>
          </div>

          {/* 5 Irrefutable Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. Monétiser TikTok */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-950 border border-pink-800 text-pink-400 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 fill-pink-500" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm mb-1">
                  {lang === 'fr' ? '1. Convertir les 154K Likes TikTok en Cash' : '1. تحويل 154 ألف إعجاب تيك توك لزبائن فعليين'}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === 'fr'
                    ? 'Chaque vidéo virale et live TikTok attire des milliers d’Oranais. Mettre le lien du site dans la bio TikTok (@vinaqui.31) transforme ces vues en commandes directes 24h/24.'
                    : 'فيديوهات المحل تحقق آلاف المشاهدات في وهران. وضع رابط الموقع في بايو التيك توك يجعل المشاهد يطلب بنقرة واحدة.'}
                </p>
              </div>
            </div>

            {/* 2. Zéro Erreur WhatsApp */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm mb-1">
                  {lang === 'fr' ? '2. Commandes WhatsApp Claires & Zéro Erreur' : '2. طلبيات واتساب منسقة بدون أخطاء'}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === 'fr'
                    ? 'Fini les appels bruyants où on n’entend pas l’adresse ou les suppléments. Le client clique et le gérant reçoit un bon de commande WhatsApp net avec le total calculé.'
                    : 'وداعاً للمكالمات الطويلة وسوء الفهم في العنوان أو الصلصات. الزبون يرسل طلباً منظماً ومحسوباً بدقة عبر واتساب.'}
                </p>
              </div>
            </div>

            {/* 3. Ticket Moyen en Hausse */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-800 text-amber-400 flex items-center justify-center shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm mb-1">
                  {lang === 'fr' ? '3. Hausse du Panier Moyen (+35%)' : '3. زيادة متوسط الفاتورة بنسبة 35%'}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === 'fr'
                    ? 'Le configurateur suggère automatiquement les suppléments fromage (Gruyère +200 DA), boissons (+100 DA) et l’offre Méga 3 Pizzas. Les clients dépensent plus !'
                    : 'الموقع يقترح تلقائياً إضافات الأجبان (200 دج) والمشروبات وعرض 3 بيتزا، مما يرفع مدخول كل طلب.'}
                </p>
              </div>
            </div>

            {/* 4. Image de Marque & Fierté */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-950 border border-orange-800 text-orange-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-display font-bold text-white text-sm mb-1">
                  {lang === 'fr' ? '4. Image de Marque Professionnelle' : '4. هيبة واحترافية تليق بمحل فيناكي'}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {lang === 'fr'
                    ? 'Aucun snack concurrent à Mirocho ne dispose d’une plateforme aussi élégante, rapide et valorisante. Vous devenez la référence street-food moderne à Oran.'
                    : 'لا يوجد محل سناك منافس في ميروشو يملك موقعاً بهذا المستوى العالي من السرعة والجمال، ما يجعلك تتصدر المشهد في وهران.'}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial / Closing Statement */}
          <div className="p-4 rounded-xl bg-orange-950/30 border border-orange-500/20 text-center">
            <p className="text-xs sm:text-sm font-medium text-orange-300">
              {lang === 'fr'
                ? '« Ce site n’est pas une dépense, c’est le meilleur investissement pour doubler vos livraisons sans dépendre d’aucun intermédiaire. »'
                : '«هذا الموقع ليس مجرد صفحة، بل هو أداة ذكية لمضاعفة مبيعات التوصيل وحفظ كل سنتيم في صندوق محلك.»'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-neutral-400">
            {lang === 'fr' ? 'Contact Snack : 0652 74 77 19' : 'رقم خدمة الزبائن : 0652747719'}
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            {lang === 'fr' ? 'Retourner à la Démonstration du Site' : 'العودة لتجربة الموقع'}
          </button>
        </div>
      </div>
    </div>
  );
};
