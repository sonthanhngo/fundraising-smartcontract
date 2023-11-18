// export const CONTRACT_ADDRESS = '0x08D94d4949Dd9a45Cc3d74691812d6f53713845b';
export const CONTRACT_ADDRESS = '0x08D94d4949Dd9a45Cc3d74691812d6f53713845b';
export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);
  return remainingDays.toFixed(0);
};
export const amountPerTarget = (amountCollected, target) => {
  const percentage = Math.round((amountCollected * 100) / target);

  return percentage;
};
export const convertVND = (value) => {
  const etherPrice = 44519009;
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
  return addCommas(removeNonNumeric(Math.ceil(etherPrice * parseFloat(value))));
};
export const formatVND = (value) => {
  const addCommas = (num) =>
    num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');
  return addCommas(removeNonNumeric(value));
};

export const convertEthers = (value) => {
  const etherPrice = 44519009;
  return parseFloat(value / etherPrice, 5).toFixed(4);
};
export const convertUnixTimestamptoDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp);
  const formatter = new Intl.DateTimeFormat('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(date);
};
