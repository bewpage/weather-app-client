const formatNumber = (
  num: number | null,
  digits: number = 2
): string | null => {
  if (num === null) {
    return 'N/A';
  }
  return num.toFixed(digits);
};

export { formatNumber };
