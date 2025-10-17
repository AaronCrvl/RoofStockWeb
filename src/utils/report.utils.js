// Utility functions for report dashboard

const DEFAULTS = {
  LOW_QUANTITY_THRESHOLD: 10,
  DUE_SOON_DAYS: 30,
};

export const parseDate = (d) => {
  if (!d) return null;
  const parsed = new Date(d);
  return isNaN(parsed) ? null : parsed;
};

export const daysUntil = (dateStr, today = new Date()) => {
  const d = parseDate(dateStr);
  if (!d) return Infinity;
  const msInDay = 24 * 60 * 60 * 1000;
  return Math.ceil((d - today) / msInDay);
};

// Categorize products into the report buckets
export const categorizeProducts = (products = [], options = {}) => {
  const { LOW_QUANTITY_THRESHOLD, DUE_SOON_DAYS } = { ...DEFAULTS, ...options };
  const today = new Date();

  const closeToDue = [];
  const inPromotion = [];
  const lowQuantity = [];
  const quantityGte10 = [];

  products.forEach((p) => {
    const days = daysUntil(p.dataValidade, today);
    if (days >= 0 && days <= DUE_SOON_DAYS) closeToDue.push(p);
    if (p.promocao) inPromotion.push(p);
    if (Number(p.quantidade) <= LOW_QUANTITY_THRESHOLD) lowQuantity.push(p);
    if (Number(p.quantidade) >= 10) quantityGte10.push(p);
  });

  return { closeToDue, inPromotion, lowQuantity, quantityGte10 };
};

// Produce the cards array used by the dashboard UI
export const getDashboardCards = (products = [], options = {}) => {
  const { LOW_QUANTITY_THRESHOLD, DUE_SOON_DAYS } = { ...DEFAULTS, ...options };
  const groups = categorizeProducts(products, options);

  return [
    { title: `Vencendo em ${DUE_SOON_DAYS} dias`, items: groups.closeToDue },
    { title: "Em promoção", items: groups.inPromotion },
    { title: `Baixo estoque (≤ ${LOW_QUANTITY_THRESHOLD})`, items: groups.lowQuantity },
    { title: "Quantidade ≥ 10", items: groups.quantityGte10 },
  ];
};
