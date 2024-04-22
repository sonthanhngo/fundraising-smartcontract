export const CONTRACT_ADDRESS = '0x3335FD6a4aaab9160B5CD5f8778F8193f9aBeAB2';

export const ETH_PRICE: number = await (async () => {
  const response = await fetch(
    'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
  );
  const data = await response.json();
  return data.USD;
})();
