import React, { useState } from 'react';
import { MenuItem, SAUCE_OPTIONS, CHEESE_SUPPLEMENTS } from '../data/menuData';
import { CartItem } from '../types/cart';
import { X, Plus, Minus, Check, Flame } from 'lucide-react';

interface ItemCustomizeModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (customItem: CartItem) => void;
  lang: 'fr' | 'ar';
}

export const ItemCustomizeModal: React.FC<ItemCustomizeModalProps> = ({
  item,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSauce, setSelectedSauce] = useState(SAUCE_OPTIONS[0].name);
  const [selectedSupplements, setSelectedSupplements] = useState<string[]>([]);
  const [addMenuFormule, setAddMenuFormule] = useState(false);
  const [notes, setNotes] = useState('');

  const supplementTotalPerUnit =
    selectedSupplements.length * 200 + (addMenuFormule ? 250 : 0);
  const totalItemPrice = (item.price + supplementTotalPerUnit) * quantity;

  const toggleSupplement = (suppId: string) => {
    setSelectedSupplements((prev) =>
      prev.includes(suppId) ? prev.filter((id) => id !== suppId) : [...prev, suppId]
    );
  };

  const handleConfirm = () => {
    const customItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      selectedSauce,
      supplements: selectedSupplements,
      supplementPrice: supplementTotalPerUnit,
      totalItemPrice,
      notes: [
        notes,
        addMenuFormule ? 'Formule Menu (Frites + Canette +250 DA)' : '',
      ]
        .filter(Boolean)
        .join(' · '),
    };

    onAddToCart(customItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-start justify-between bg-neutral-950/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-500">
                {lang === 'fr' ? 'Personnaliser votre commande' : 'تخصيص الوجبة'}
              </span>
              <span className="text-neutral-600">·</span>
              <span className="text-xs font-mono text-neutral-400">{item.price} DA</span>
            </div>
            <h3 className="font-display font-bold text-white text-xl">
              {lang === 'fr' ? item.name : item.nameAr}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
              {lang === 'fr' ? item.ingredients : item.ingredientsAr}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-6 text-sm">
          {/* Sauce Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
              {lang === 'fr' ? '1. Choisissez votre sauce principale :' : '1. اختر صلصتك المفضلة :'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SAUCE_OPTIONS.map((sauce) => {
                const isSelected = selectedSauce === sauce.name;
                return (
                  <button
                    key={sauce.id}
                    type="button"
                    onClick={() => setSelectedSauce(sauce.name)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-orange-500 bg-orange-950/40 text-orange-300'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    <span>{lang === 'fr' ? sauce.name : sauce.nameAr}</span>
                    {isSelected && <Check className="w-4 h-4 text-orange-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cheese Supplements (from flyer 1: Gruyère, Gouda, Camembert +200 DA) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                {lang === 'fr'
                  ? '2. Suppléments Fromage Gourmands (+200 DA) :'
                  : '2. إضافات أجبان فرنسية (+200 دج) :'}
              </label>
              <span className="text-[11px] text-orange-400 font-semibold">
                {lang === 'fr' ? 'Selon le flyer Vinàqui' : 'عرض فيناكي الرسمي'}
              </span>
            </div>

            <div className="space-y-2">
              {CHEESE_SUPPLEMENTS.map((supp) => {
                const isChecked = selectedSupplements.includes(supp.id);
                return (
                  <button
                    key={supp.id}
                    type="button"
                    onClick={() => toggleSupplement(supp.id)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? 'border-orange-500 bg-orange-950/30 text-orange-300'
                        : 'border-neutral-800 bg-neutral-950 hover:border-neutral-700 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked
                            ? 'bg-orange-600 border-orange-500 text-white'
                            : 'border-neutral-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span>{lang === 'fr' ? supp.name : supp.nameAr}</span>
                    </div>
                    <span className="font-mono text-neutral-400">+{supp.price} DA</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Formule Menu option (+250 DA) */}
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800">
            <button
              type="button"
              onClick={() => setAddMenuFormule(!addMenuFormule)}
              className="w-full flex items-center justify-between text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border ${
                    addMenuFormule
                      ? 'bg-orange-600 border-orange-500 text-white'
                      : 'border-neutral-700'
                  }`}
                >
                  {addMenuFormule && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">
                    {lang === 'fr'
                      ? 'Passer en Formule Menu (+ Frites + Canette)'
                      : 'تحويل إلى وجبة كاملة (+ بطاطا + مشروب)'}
                  </div>
                  <div className="text-[11px] text-neutral-400">
                    {lang === 'fr'
                      ? 'Portion de frites dorées + boisson 33cl au choix'
                      : 'بطاطا مقلية مقرمشة وعلبة مشروب غازي بارد'}
                  </div>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-orange-400 shrink-0">
                +250 DA
              </span>
            </button>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
              {lang === 'fr' ? '3. Remarques pour la cuisine :' : '3. ملاحظات خاصة للطباخ :'}
            </label>
            <input
              type="text"
              placeholder={
                lang === 'fr'
                  ? 'Ex: Sans oignons, sauce à part, bien doré...'
                  : 'مثال: بدون بصل، صلصة خارجية، محمر جيداً...'
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2.5 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-200 text-xs placeholder-neutral-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Footer with quantity and Add to cart */}
        <div className="p-5 border-t border-neutral-800 bg-neutral-950 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Diminuer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-white text-sm w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Augmenter"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleConfirm}
            className="flex-1 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm transition-all shadow-lg shadow-orange-600/30 flex items-center justify-between cursor-pointer"
          >
            <span>{lang === 'fr' ? 'Ajouter à la commande' : 'إضافة للطلب'}</span>
            <span className="font-mono tabular-nums text-base">
              {totalItemPrice} DA
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
