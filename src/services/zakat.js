// ==============================================================================
// Zakat Calculation Service
// Standard Nisab Benchmarks:
// - Gold Nisab: 87.48 grams (approx 7.5 tola / 2.8125 ounces)
// - Silver Nisab: 612.36 grams (approx 52.5 tola / 19.6875 ounces)
// Rate: 2.5% (1/40th) of net zakatable assets exceeding Nisab held for 1 lunar year (Hawl).
// ==============================================================================

export const DEFAULT_METAL_PRICES = {
  goldPerGram: 85.00,    // USD per gram of 24k gold (estimate)
  silverPerGram: 1.05,   // USD per gram of pure silver (estimate)
};

export const NISAB_WEIGHTS = {
  goldGrams: 87.48,
  silverGrams: 612.36,
};

/**
 * Calculates Zakat breakdown based on assets, liabilities, and metal prices.
 */
export const calculateZakat = ({
  cash = 0,
  bankSavings = 0,
  goldValue = 0,
  silverValue = 0,
  businessInventory = 0,
  investments = 0,
  moneyOwedToYou = 0,
  debtsOwedByYou = 0,
  immediateExpenses = 0,
  nisabStandard = 'silver', // 'silver' (recommended for maximum welfare) or 'gold'
  customGoldPrice = DEFAULT_METAL_PRICES.goldPerGram,
  customSilverPrice = DEFAULT_METAL_PRICES.silverPerGram,
}) => {
  const goldNisabThreshold = NISAB_WEIGHTS.goldGrams * customGoldPrice;
  const silverNisabThreshold = NISAB_WEIGHTS.silverGrams * customSilverPrice;

  const nisabThreshold =
    nisabStandard === 'gold' ? goldNisabThreshold : silverNisabThreshold;

  // Total Zakatable Assets
  const totalAssets =
    Number(cash || 0) +
    Number(bankSavings || 0) +
    Number(goldValue || 0) +
    Number(silverValue || 0) +
    Number(businessInventory || 0) +
    Number(investments || 0) +
    Number(moneyOwedToYou || 0);

  // Total Deductible Liabilities
  const totalLiabilities =
    Number(debtsOwedByYou || 0) + Number(immediateExpenses || 0);

  // Net Zakatable Wealth
  const netZakatableWealth = Math.max(0, totalAssets - totalLiabilities);

  const isEligible = netZakatableWealth >= nisabThreshold;
  const zakatDue = isEligible ? netZakatableWealth * 0.025 : 0;

  return {
    totalAssets,
    totalLiabilities,
    netZakatableWealth,
    nisabThreshold,
    isEligible,
    zakatDue,
    rate: '2.5%',
    goldNisabThreshold,
    silverNisabThreshold,
  };
};
