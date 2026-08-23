// Approximate USD → NGN conversion used to make demo product prices from the
// fakestoreapi (which returns USD) feel like realistic Naira prices.
// Swap this for a live rate or your own pricing once a real backend is in place.
export const USD_TO_NGN_RATE = 1600

export const convertUsdToNgn = (usdAmount) => Math.round(usdAmount * USD_TO_NGN_RATE)

// Formats an amount that is ALREADY in Naira, e.g. formatNaira(164900) -> "₦164,900"
export const formatNaira = (amount) => `₦${Math.round(amount).toLocaleString('en-NG')}`
