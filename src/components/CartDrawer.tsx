import React, { useState } from 'react';
import { CartItem, CustomerOrder } from '../types/cart';
import { DELIVERY_ZONES } from '../data/menuData';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Phone,
  Send,
  MapPin,
  Clock,
  Bike,
  Store,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: CustomerOrder) => void;
  lang: 'fr' | 'ar';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  lang,
}) => {
  if (!isOpen) return null;

  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('mirocho');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [formError, setFormError] = useState('');

  const selectedZone =
    DELIVERY_ZONES.find((z) => z.id === selectedZoneId) || DELIVERY_ZONES[0];
  const deliveryFee = orderType === 'delivery' ? selectedZone.fee : 0;
  const subtotal = items.reduce((sum, item) => sum + item.totalItemPrice, 0);
  const grandTotal = subtotal + deliveryFee;

  // Build formatted WhatsApp message
  const generateWhatsAppMessage = () => {
    const header =
      lang === 'fr'
        ? `*NOUVELLE COMMANDE - VINÀQUI SNACK ORAN* 🍕`
        : `*طلب جديد من موقع فيناكي سناك وهران* 🍕`;

    const itemsSummary = items
      .map(
        (i, index) =>
          `${index + 1}. *${i.quantity}x ${i.menuItem.name}* (${i.totalItemPrice} DA)\n   - Sauce: ${i.selectedSauce}${i.notes ? `\n   - Remarques: ${i.notes}` : ''}`
      )
      .join('\n');

    const customerDetails =
      orderType === 'delivery'
        ? `📍 *Livraison à domicile* :\n- Zone : ${selectedZone.name}\n- Adresse : ${deliveryAddress || 'Non spécifiée'}\n- Client : ${customerName || 'Client'}\n- Tél : ${customerPhone || 'Non spécifié'}`
        : `🛍️ *À emporter au snack (Mirocho)* :\n- Client : ${customerName || 'Client'}\n- Tél : ${customerPhone || 'Non spécifié'}`;

    const totalSummary = `\n💰 *Sous-total* : ${subtotal} DA\n🛵 *Frais de livraison* : ${deliveryFee} DA\n🔥 *TOTAL À PAYER* : ${grandTotal} DA (Paiement à la livraison)`;

    const footer = customerNotes ? `\n📝 *Notes* : ${customerNotes}` : '';

    return `${header}\n\n${itemsSummary}\n\n${customerDetails}${totalSummary}${footer}\n\nMerci de confirmer la commande ! 🙏`;
  };

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    if (!customerPhone.trim()) {
      setFormError(
        lang === 'fr'
          ? 'Veuillez saisir votre numéro de téléphone pour la livraison.'
          : 'يرجى إدخال رقم هاتفك لتأكيد الطلب.'
      );
      return;
    }
    setFormError('');

    const message = encodeURIComponent(generateWhatsAppMessage());
    const waUrl = `https://wa.me/213652747719?text=${message}`;
    window.open(waUrl, '_blank');

    // Also register order locally
    const order: CustomerOrder = {
      orderId: `VQ-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName || 'Client',
      phoneNumber: customerPhone,
      address: orderType === 'delivery' ? `${deliveryAddress} (${selectedZone.name})` : 'À emporter (Mirocho)',
      zoneId: selectedZoneId,
      orderType,
      items: [...items],
      subtotal,
      deliveryFee,
      total: grandTotal,
      createdAt: new Date().toLocaleTimeString(),
      notes: customerNotes,
    };
    onOrderSuccess(order);
    onClearCart();
    onClose();
  };

  const handleInAppOrder = () => {
    if (items.length === 0) return;
    if (!customerPhone.trim()) {
      setFormError(
        lang === 'fr'
          ? 'Veuillez renseigner votre numéro de téléphone.'
          : 'يرجى كتابة رقم الهاتف.'
      );
      return;
    }
    setFormError('');

    const order: CustomerOrder = {
      orderId: `VQ-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName || (lang === 'fr' ? 'Client Vinàqui' : 'زبون فيناكي'),
      phoneNumber: customerPhone,
      address: orderType === 'delivery' ? `${deliveryAddress} (${selectedZone.name})` : 'À emporter (Snack Mirocho)',
      zoneId: selectedZoneId,
      orderType,
      items: [...items],
      subtotal,
      deliveryFee,
      total: grandTotal,
      createdAt: new Date().toLocaleTimeString(),
      notes: customerNotes,
    };

    onOrderSuccess(order);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center font-bold text-white">
                VQ
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  {lang === 'fr' ? 'Votre Panier Vinàqui' : 'سلة الطلبات'}
                </h3>
                <span className="text-xs text-neutral-400">
                  {items.length} {lang === 'fr' ? 'article(s)' : 'أصناف'}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center mx-auto text-neutral-500 mb-3">
                  <Bike className="w-8 h-8" />
                </div>
                <h4 className="font-display font-bold text-neutral-200 text-base mb-1">
                  {lang === 'fr' ? 'Votre panier est vide' : 'سلتك فارغة حالياً'}
                </h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto mb-6">
                  {lang === 'fr'
                    ? 'Ajoutez de délicieuses pizzas, naans au fromage ou burgers pour passer commande.'
                    : 'تصفح القائمة وأضف أشهى مأكولات فيناكي لتوصيل ساخن وفوري.'}
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {lang === 'fr' ? 'Voir la Carte' : 'تصفح قائمة الطعام'}
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {items.map((cartItem) => (
                    <div
                      key={cartItem.id}
                      className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col gap-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-display font-bold text-white text-sm">
                            {lang === 'fr' ? cartItem.menuItem.name : cartItem.menuItem.nameAr}
                          </h4>
                          <span className="text-[11px] text-neutral-400 block">
                            Sauce : {cartItem.selectedSauce}
                          </span>
                          {cartItem.notes && (
                            <span className="text-[11px] text-orange-400/90 block">
                              {cartItem.notes}
                            </span>
                          )}
                        </div>

                        <div className="font-mono text-sm font-bold text-orange-400">
                          {cartItem.totalItemPrice} DA
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, -1)}
                            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono font-bold text-white text-xs w-5 text-center">
                            {cartItem.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(cartItem.id, 1)}
                            className="p-1 text-neutral-400 hover:text-white rounded hover:bg-neutral-800"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(cartItem.id)}
                          className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Mode Selection */}
                <div className="pt-4 border-t border-neutral-800 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                      {lang === 'fr' ? 'Mode de réception :' : 'طريقة الاستلام :'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderType('delivery')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          orderType === 'delivery'
                            ? 'bg-orange-600 text-white border-orange-500 shadow-md'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                      >
                        <Bike className="w-4 h-4" />
                        <span>{lang === 'fr' ? 'Livraison à domicile' : 'توصيل للمنزل'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderType('takeaway')}
                        className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          orderType === 'takeaway'
                            ? 'bg-orange-600 text-white border-orange-500 shadow-md'
                            : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                      >
                        <Store className="w-4 h-4" />
                        <span>{lang === 'fr' ? 'À emporter (Mirocho)' : 'استلام من المحل'}</span>
                      </button>
                    </div>
                  </div>

                  {/* If delivery, choose zone */}
                  {orderType === 'delivery' && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-neutral-300">
                          {lang === 'fr' ? 'Quartier de livraison à Oran :' : 'حي التوصيل بوهران :'}
                        </label>
                        <span className="text-[11px] text-neutral-400 font-mono">
                          +{selectedZone.fee} DA ({selectedZone.time})
                        </span>
                      </div>
                      <select
                        value={selectedZoneId}
                        onChange={(e) => setSelectedZoneId(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-700 text-neutral-100 text-xs rounded-xl p-2.5 focus:border-orange-500 focus:outline-none cursor-pointer"
                      >
                        {DELIVERY_ZONES.map((zone) => (
                          <option key={zone.id} value={zone.id}>
                            {lang === 'fr' ? zone.name : zone.nameAr} (+{zone.fee} DA · {zone.time})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Customer Information Inputs */}
                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        {lang === 'fr' ? 'Nom ou Prénom :' : 'الاسم الكريم :'}
                      </label>
                      <input
                        type="text"
                        placeholder={lang === 'fr' ? 'Ex: Mohamed, Amine...' : 'مثال: محمد، أمين...'}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 text-xs focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                        {lang === 'fr' ? 'Numéro de Téléphone (Requis) :' : 'رقم الهاتف (ضروري) :'}
                      </label>
                      <input
                        type="tel"
                        placeholder="06.. .. .. .. ou 05.. / 07.."
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 text-xs font-mono focus:border-orange-500 focus:outline-none"
                      />
                    </div>

                    {orderType === 'delivery' && (
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-300 mb-1">
                          {lang === 'fr' ? 'Adresse précise / Repère :' : 'العنوان الدقيق / علامة قريبة :'}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            lang === 'fr'
                              ? 'Ex: Bâtiment B, en face mosquée, à côté pharmacie...'
                              : 'مثال: عمارة رقم 4، بجانب الصيدلية...'
                          }
                          value={deliveryAddress}
                          onChange={(e) => setDeliveryAddress(e.target.value)}
                          className="w-full p-2 bg-neutral-950 border border-neutral-800 rounded-xl text-neutral-100 text-xs focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-lg bg-red-950/60 border border-red-800 text-xs text-red-300 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer with Subtotal, Delivery Fee & Checkout Buttons */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950 space-y-3">
              <div className="space-y-1.5 text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>{lang === 'fr' ? 'Sous-total articles' : 'مجموع الوجبات'}</span>
                  <span className="font-mono text-neutral-200">{subtotal} DA</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>{lang === 'fr' ? `Livraison (${selectedZone.name})` : `التوصيل (${selectedZone.nameAr})`}</span>
                    <span className="font-mono text-neutral-200">+{deliveryFee} DA</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                  <span>{lang === 'fr' ? 'Total à payer' : 'المبلغ الإجمالي'}</span>
                  <span className="font-mono text-orange-500 tabular-nums">
                    {grandTotal} DA
                  </span>
                </div>
                <div className="text-[11px] text-neutral-500 text-center pt-1">
                  {lang === 'fr' ? '💵 Paiement en espèces à la livraison' : '💵 الدفع كاش عند الاستلام'}
                </div>
              </div>

              {/* Order Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Commander par WhatsApp */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {lang === 'fr'
                      ? 'Envoyer la Commande via WhatsApp'
                      : 'إرسال الطلب عبر واتساب مباشرة'}
                  </span>
                </button>

                {/* 2. Valider sur le site */}
                <button
                  onClick={handleInAppOrder}
                  className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>
                    {lang === 'fr'
                      ? 'Confirmer en Ligne avec Suivi'
                      : 'تأكيد الطلب وتتبع التوصيل'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {/* 3. Call Phone */}
                <a
                  href="tel:0652747719"
                  className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-orange-500" />
                  <span>{lang === 'fr' ? 'Ou appeler directement : 0652 74 77 19' : 'أو الاتصال هاتفياً : 0652747719'}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
