import React from 'react';
import { CustomerOrder } from '../types/cart';
import { CheckCircle2, Phone, Bike, Clock, X, Send, ArrowRight } from 'lucide-react';

interface OrderSuccessModalProps {
  order: CustomerOrder | null;
  onClose: () => void;
  lang: 'fr' | 'ar';
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  lang,
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-neutral-900 border border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-b from-emerald-950/60 to-neutral-950 border-b border-neutral-800 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 rounded-full bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400 mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
            {lang === 'fr' ? 'Commande Confirmée !' : 'تم تأكيد طلبك بنجاح !'}
          </span>

          <h3 className="font-display font-black text-white text-2xl">
            {lang === 'fr' ? 'Vinàqui Prépare Votre Festin' : 'وجبتك قيد التحضير في المطبخ'}
          </h3>

          <div className="mt-2 inline-flex items-center gap-2 font-mono text-xs text-neutral-300 bg-neutral-900 px-3 py-1 rounded-full border border-neutral-800">
            <span>Réf : #{order.orderId}</span>
            <span className="text-neutral-600">·</span>
            <span>{order.createdAt}</span>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 space-y-5 text-sm">
          {/* Estimated delivery / takeaway status */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-neutral-400 block">
                  {lang === 'fr' ? 'Temps estimé :' : 'الوقت التقديري للوصول :'}
                </span>
                <span className="font-bold text-white text-base">
                  25 – 35 minutes
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-semibold px-2.5 py-1 rounded bg-orange-950 text-orange-400 border border-orange-800">
                {order.orderType === 'delivery'
                  ? lang === 'fr'
                    ? 'En route moto'
                    : 'توصيل بالدراجة'
                  : lang === 'fr'
                  ? 'À emporter'
                  : 'استلام بالمحل'}
              </span>
            </div>
          </div>

          {/* Delivery destination */}
          <div className="text-xs text-neutral-300 bg-neutral-950/60 p-3 rounded-xl border border-neutral-800 space-y-1">
            <div className="flex justify-between">
              <span className="text-neutral-500">{lang === 'fr' ? 'Destinataire :' : 'المستلم :'}</span>
              <span className="font-semibold text-white">{order.customerName} ({order.phoneNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">{lang === 'fr' ? 'Adresse :' : 'العنوان :'}</span>
              <span className="font-semibold text-white">{order.address}</span>
            </div>
          </div>

          {/* Itemized list */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-2">
              {lang === 'fr' ? 'Récapitulatif de votre commande :' : 'تفاصيل الوجبات :'}
            </span>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between text-xs py-1 border-b border-neutral-800/60"
                >
                  <span className="text-neutral-200">
                    {item.quantity}x {item.menuItem.name}
                    {item.notes ? ` (${item.notes})` : ''}
                  </span>
                  <span className="font-mono font-semibold text-orange-400">
                    {item.totalItemPrice} DA
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="pt-3 border-t border-neutral-800 flex justify-between items-baseline">
            <div>
              <span className="text-xs text-neutral-400 block">
                {lang === 'fr' ? 'Total à régler (Paiement à la livraison) :' : 'المبلغ المستحق نقداً عند الاستلام :'}
              </span>
            </div>
            <span className="font-mono text-2xl font-black text-orange-500 tabular-nums">
              {order.total} DA
            </span>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="p-5 bg-neutral-950 border-t border-neutral-800 flex flex-col sm:flex-row gap-2">
          <a
            href="tel:0652747719"
            className="flex-1 py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            <span>{lang === 'fr' ? 'Appeler le Snack' : 'الاتصال بالمحل'}</span>
          </a>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>{lang === 'fr' ? 'Fermer le Reçu' : 'إغلاق الإشعار'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
