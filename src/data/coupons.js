import { FiPercent, FiTag, FiGift, FiTruck, FiCreditCard, FiCalendar, FiStar, FiShoppingBag } from 'react-icons/fi';

export const GST_RATE = 5;

export const COUPONS = [
  {
    id: 'welcome50',
    code: 'WELCOME50',
    title: '50% OFF for New Users',
    description: 'Get 50% off on your first order with Balanced Bites.',
    validity: 'Valid for new users · 7 days remaining',
    terms: 'Minimum order not applicable. One use per user.',
    icon: FiPercent,
    theme: 'purple',
    type: 'percent',
    value: 50,
    minOrder: 0,
    buttonText: 'Apply',
  },
  {
    id: 'save150',
    code: 'SAVE150',
    title: 'Flat ₹150 OFF on orders above ₹699',
    description: 'Save ₹150 instantly on orders above ₹699.',
    validity: 'Valid for 8 days',
    terms: 'Minimum order ₹699. One use per user.',
    icon: FiTag,
    theme: 'amber',
    type: 'flat',
    value: 150,
    minOrder: 699,
    buttonText: 'Apply',
  },
  {
    id: 'bogo',
    code: 'BOGO',
    title: 'Buy 1 Get 1 Pizza',
    description: 'Buy 1 pizza and get a second one of equal or lesser value free.',
    validity: 'Valid today only',
    terms: 'On selected pizzas. One use per day.',
    icon: FiGift,
    theme: 'rose',
    type: 'bogo',
    value: 0,
    minOrder: 0,
    buttonText: 'Apply',
  },
  {
    id: 'weekend30',
    code: 'WEEKEND30',
    title: 'Weekend Special 30% OFF',
    description: 'Get 30% off on orders above ₹199. Weekend only.',
    validity: 'Valid Sat & Sun',
    terms: 'Minimum order ₹199. One use per weekend.',
    icon: FiCalendar,
    theme: 'blue',
    type: 'percent',
    value: 30,
    minOrder: 199,
    buttonText: 'Apply',
  },
  {
    id: 'sbi20',
    code: 'SBI20',
    title: 'SBI Credit Card – 20% Cashback',
    description: '20% instant cashback on SBI Credit Card payments.',
    validity: 'Valid till 31 Mar 2027',
    terms: 'Only on SBI Credit Cards. One use per card.',
    icon: FiCreditCard,
    theme: 'emerald',
    type: 'percent',
    value: 20,
    minOrder: 0,
    buttonText: 'Apply',
  },
  {
    id: 'hdfc100',
    code: 'HDFC100',
    title: 'HDFC Bank – Instant ₹100 OFF',
    description: 'Flat ₹100 discount on HDFC Bank card payments.',
    validity: 'Valid for 7 days',
    terms: 'Only on HDFC cards. One use per card.',
    icon: FiStar,
    theme: 'fuchsia',
    type: 'flat',
    value: 100,
    minOrder: 0,
    buttonText: 'Apply',
  },
  {
    id: 'india200',
    code: 'INDIA200',
    title: 'Independence Day Special – ₹200 OFF',
    description: 'Flat ₹200 discount on orders above ₹499. Happy Independence Day!',
    validity: 'Aug 10 – 15, 2026',
    terms: 'Minimum order ₹499. One use per user.',
    icon: FiShoppingBag,
    theme: 'orange',
    type: 'flat',
    value: 200,
    minOrder: 499,
    buttonText: 'Apply',
  },
  {
    id: 'freedel',
    code: 'FREEDEL',
    title: 'Free Delivery above ₹299',
    description: 'Get delivery fee waived on orders above ₹299.',
    validity: 'Valid for 7 days',
    terms: 'Minimum order ₹299. One use per user.',
    icon: FiTruck,
    theme: 'sky',
    type: 'freedelivery',
    value: 0,
    minOrder: 299,
    buttonText: 'Apply',
  },
];

export const formatCurrency = (n) => `₹${Number(n).toFixed(2)}`;

export const meetsMinimum = (subtotal, coupon) => {
  if (!coupon || !coupon.minOrder) return true;
  return subtotal >= coupon.minOrder;
};

export const applyCoupon = (subtotal, deliveryFee, items, coupon) => {
  if (!coupon || subtotal <= 0) {
    return { discount: 0, label: '' };
  }
  if (!meetsMinimum(subtotal, coupon)) {
    return { discount: 0, label: '' };
  }
  const base = subtotal;
  let discount = 0;
  switch (coupon.type) {
    case 'percent':
      discount = base * (coupon.value / 100);
      break;
    case 'flat':
      discount = coupon.value;
      break;
    case 'freedelivery':
      discount = deliveryFee;
      break;
    case 'bogo':
      discount = items.length ? Math.min(...items.map((item) => item.food.price)) : 0;
      break;
    default:
      discount = 0;
  }
  discount = Math.min(discount, base);
  if (discount <= 0) {
    return { discount: 0, label: '' };
  }
  const rounded = Math.round(discount * 100) / 100;
  let label = '';
  if (coupon.type === 'percent') {
    label = `${coupon.value}% OFF`;
  } else if (coupon.type === 'flat') {
    label = `₹${Math.round(coupon.value)} OFF`;
  } else if (coupon.type === 'freedelivery') {
    label = 'Free Delivery';
  } else if (coupon.type === 'bogo') {
    label = 'Buy 1 Get 1';
  }
  return { discount: rounded, label };
};
