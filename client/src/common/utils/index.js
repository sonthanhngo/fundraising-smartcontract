// export const CONTRACT_ADDRESS = '0x08D94d4949Dd9a45Cc3d74691812d6f53713845b';
export const CONTRACT_ADDRESS = '0x1FDE1360267EeFceCdd2F53723162d92B27115Fb';
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
export const getTotalDonations = (donations) => {
  let totalDonations = 0;
  let totalDonators = 0;
  donations.forEach((donation) => {
    totalDonators += donation.donations.length;
    donation.donations.forEach(
      (donation) => (totalDonations += donation.toNumber())
    );
  });
  return { totalDonations, totalDonators };
};
export const getProfileDonations = (donations, address) => {
  return donations.filter((donation) => donation.owner === address);
};

export const formatChartData = (donations) => {
  // return donations.map((donation) => ({
  //   donationsTime: donation.donationsTime.map((time) =>
  //     new Date(time.toNumber() * 1000).getDate()
  //   ),
  //   donations: donation.donations.map((donationAmount) =>
  //     donationAmount.toNumber()
  //   ),
  // }));
  const mydonations = donations.map((donation) => ({
    donationsTime: donation.donationsTime.map(
      (time) =>
        `${new Date(time.toNumber() * 1000).toLocaleDateString('en-GB')}`
    ),
    donations: donation.donations.map((donationAmount) =>
      donationAmount.toNumber()
    ),
  }));

  const summedDonations = {};

  mydonations.forEach((item) => {
    item.donations.forEach((donation, i) => {
      if (!summedDonations[item.donationsTime[i]]) {
        summedDonations[item.donationsTime[i]] = 0;
      }

      summedDonations[item.donationsTime[i]] += donation;
    });
  });

  const result = Object.keys(summedDonations).map((date) => ({
    donation: summedDonations[date],
    donationsTime: date,
  }));

  return result;
};
