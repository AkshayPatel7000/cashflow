export default URLS = {
  VERIFY_ON_BOARDING_OTP:
    'https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp',
  SEARCH: q =>
    `https://search5-noneu.truecaller.com/v2/search?q=${q}&countryCode=IN&type=4&locAddr=&encoding=json`,
  SEND_ON_BOARDING_OTP:
    'https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp',
};
export const HEADERS = {
  URLENCODED: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
};
