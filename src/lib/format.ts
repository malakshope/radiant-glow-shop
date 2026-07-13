export const formatDZD = (amount: number) =>
  new Intl.NumberFormat("fr-DZ", { style: "currency", currency: "DZD", maximumFractionDigits: 0 })
    .format(amount);
