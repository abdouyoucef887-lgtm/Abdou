import React, { useState } from 'react';
import { MENU_ITEMS, MenuItem } from '../data/menuData';
import { Sparkles, Plus, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types/cart';

interface MegaPromoProps {
  lang: 'fr' | 'ar';
  onAddCustomItemToCart: (item: CartItem) => void;
}

export const MegaPromo: React.FC<MegaPromoProps> = ({ lang, onAddCustomItemToCart }) => {
  const pizzaList = MENU_ITEMS.filter((item) => item.category === 'pizza');

  // Selected 3 pizzas
  const [selectedPizzas, setSelectedPizzas] = useState<[MenuItem, MenuItem, MenuItem]>([
    pizzaList[0] || MENU_ITEMS[0],
    pizzaList[5] || MENU_ITEMS[1], // Pepperoni
    pizzaList[7] || MENU_ITEMS[2], // Poulet
  ]);

  const [addedSuccess, setAddedSuccess] = useState(false);

  // Original total
  const regularTotal = selectedPizzas.reduce((acc, p) => acc + p.price, 0);
  // Mega Promo Deal discount (e.g. 200 DA discount on 3-pizza pack)
  const promoDiscount = 250;
  const dealPrice = Math.max(1200, regularTotal - promoDiscount);

  const handleSelectPizzaSlot = (slotIndex: 0 | 1 | 2, pizzaId: string) => {
    const found = pizzaList.find((p) => p.id === pizzaId);
    if (!found) return;
    const next: [MenuItem, MenuItem, MenuItem] = [...selectedPizzas];
    next[slotIndex] = found;
    setSelectedPizzas(next);
  };

  const handleAddPackToCart = () => {
    const packName = `Pack Mega x3 : ${selectedPizzas.map((p) => p.name).join(' + ')}`;
    const packNameAr = `عرض ميغا 3 بيتزا : ${selectedPizzas.map((p) => p.nameAr).join(' + ')}`;

    const customPackItem: CartItem = {
      id: `mega-pack-${Date.now()}`,
      menuItem: {
        id: `mega-pack-promo`,
        name: packName,
        nameAr: packNameAr,
        category: 'pizza',
        price: dealPrice,
        ingredients: `Offre Spéciale 3 Pizzas : 1. ${selectedPizzas[0].name}, 2. ${selectedPizzas[1].name}, 3. ${selectedPizzas[2].name}`,
        ingredientsAr: `عرض 3 بيتزا مخفض : 1. ${selectedPizzas[0].nameAr}، 2. ${selectedPizzas[1].nameAr}، 3. ${selectedPizzas[2].nameAr}`,
        isSignature: true,
      },
      quantity: 1,
      selectedSauce: 'Sauces au choix',
      supplements: [],
      supplementPrice: 0,
      totalItemPrice: dealPrice,
      notes: `Pack Mega Promo x3`,
    };

    onAddCustomItemToCart(customPackItem);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  return (
    <section id="mega-promo" className="py-10 sm:py-16 md:py-20 bg-neutral-900/60 border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header kicker */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'fr' ? 'Offre Spéciale Vinàqui' : 'العرض الأقوى في وهران'}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            {lang === 'fr' ? (
              <>
                MEGA PRIX <span className="text-orange-500">PIZZA × 3</span>
              </>
            ) : (
              <>
                عرض ميغا <span className="text-orange-500">3 بيتزا معا</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-neutral-300 text-sm sm:text-base">
            {lang === 'fr'
              ? "L'offre emblématique de notre restaurant à Mirocho ! Choisissez 3 pizzas au choix pour votre famille ou vos amis et profitez d'un tarif méga avantageux avec livraison express."
              : "العرض المشهور بمحل فيناكي بميروشو! اختر 3 أنواع بيتزا على ذوقك مع العائلة أو الأصدقاء واستفد من تخفيض فوري وتوصيل سريع ساخن."}
          </p>
        </div>

        {/* Interactive Promo Configurator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: 3 Selectable Pizza Cards */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {([0, 1, 2] as const).map((slotIndex) => {
                const current = selectedPizzas[slotIndex];
                return (
                  <div
                    key={slotIndex}
                    className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-orange-500/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-extrabold uppercase text-orange-400">
                          {lang === 'fr' ? `Pizza n°${slotIndex + 1}` : `البيتزا رقم ${slotIndex + 1}`}
                        </span>
                        <span className="text-xs font-mono font-semibold text-neutral-400">
                          {current.price} DA
                        </span>
                      </div>

                      <h4 className="font-display font-bold text-white text-base mb-1">
                        {lang === 'fr' ? current.name : current.nameAr}
                      </h4>

                      <p className="text-xs text-neutral-400 line-clamp-2 mb-3">
                        {lang === 'fr' ? current.ingredients : current.ingredientsAr}
                      </p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                        {lang === 'fr' ? 'Changer cette pizza :' : 'تغيير النوع :'}
                      </label>
                      <select
                        value={current.id}
                        onChange={(e) => handleSelectPizzaSlot(slotIndex, e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-700 text-neutral-100 text-xs rounded-lg p-2 focus:border-orange-500 focus:outline-none cursor-pointer"
                      >
                        {pizzaList.map((p) => (
                          <option key={p.id} value={p.id}>
                            {lang === 'fr' ? `${p.name} (${p.price} DA)` : `${p.nameAr} (${p.price} دج)`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Flyer Extra Deals Banner (from Flyer 1) */}
            <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800 flex flex-wrap items-center justify-between gap-4 mt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                {lang === 'fr' ? 'Suppléments & Accompagnements (Flyer Vinàqui) :' : 'إضافات ومشروبات حسب القائمة :'}
              </span>
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className="text-neutral-300">
                  <span className="font-semibold text-white">Salade César</span> : 600 DA
                </span>
                <span className="text-neutral-500" aria-hidden="true">·</span>
                <span className="text-neutral-300">
                  <span className="font-semibold text-white">Frites</span> : 200 DA
                </span>
                <span className="text-neutral-500" aria-hidden="true">·</span>
                <span className="text-neutral-300">
                  <span className="font-semibold text-white">Canette</span> : 100 DA
                </span>
                <span className="text-neutral-500" aria-hidden="true">·</span>
                <span className="text-neutral-300">
                  <span className="font-semibold text-white">Menu complet</span> : 250 DA
                </span>
              </div>
            </div>
          </div>

          {/* Right: Deal Summary & Add CTA */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-neutral-950 border border-orange-500/40 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase text-orange-500 tracking-wider">
                  {lang === 'fr' ? 'Formule Économique' : 'التوفير الفوري'}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  -{promoDiscount} DA {lang === 'fr' ? 'Économisés' : 'تخفيض'}
                </span>
              </div>

              <h3 className="font-display font-black text-white text-2xl mb-2">
                {lang === 'fr' ? 'Pack Trio Vinàqui' : 'باقة التريو الثلاثية'}
              </h3>

              <div className="space-y-1.5 py-3 border-y border-neutral-800 text-xs text-neutral-300">
                <div className="flex justify-between">
                  <span>1. {lang === 'fr' ? selectedPizzas[0].name : selectedPizzas[0].nameAr}</span>
                  <span className="font-mono">{selectedPizzas[0].price} DA</span>
                </div>
                <div className="flex justify-between">
                  <span>2. {lang === 'fr' ? selectedPizzas[1].name : selectedPizzas[1].nameAr}</span>
                  <span className="font-mono">{selectedPizzas[1].price} DA</span>
                </div>
                <div className="flex justify-between">
                  <span>3. {lang === 'fr' ? selectedPizzas[2].name : selectedPizzas[2].nameAr}</span>
                  <span className="font-mono">{selectedPizzas[2].price} DA</span>
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block line-through">
                    {regularTotal} DA
                  </span>
                  <span className="text-3xl font-black text-orange-500 font-mono tabular-nums">
                    {dealPrice} DA
                  </span>
                </div>
                <span className="text-xs text-neutral-400 font-medium">
                  {lang === 'fr' ? 'Pour 3 à 5 personnes' : 'تكفي لـ 3 إلى 5 أفراد'}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleAddPackToCart}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-orange-600 hover:bg-orange-500 text-white shadow-orange-600/30'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Pack Ajouté au Panier !' : 'تمت إضافة الباقة للسلة!'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{lang === 'fr' ? 'Ajouter le Pack au Panier' : 'إضافة الباقة إلى طلبي'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
