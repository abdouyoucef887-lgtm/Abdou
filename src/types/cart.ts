import { MenuItem } from '../data/menuData';

export interface CartItem {
  id: string; // unique cart entry id
  menuItem: MenuItem;
  quantity: number;
  selectedSauce: string;
  supplements: string[]; // supplement ids
  supplementPrice: number;
  totalItemPrice: number;
  notes?: string;
}

export interface CustomerOrder {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  address: string;
  zoneId: string;
  orderType: 'delivery' | 'takeaway';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  createdAt: string;
  notes?: string;
}
