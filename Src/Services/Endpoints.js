export default URLS = {
  VERIFY_ON_BOARDING_OTP:
    'https://account-asia-south1.truecaller.com/v1/verifyOnboardingOtp',
  SEARCH: q =>
    `https://search5-noneu.truecaller.com/v2/search?q=${q}&countryCode=IN&type=4&locAddr=&encoding=json`,
  SEND_ON_BOARDING_OTP:
    'https://account-asia-south1.truecaller.com/v2/sendOnboardingOtp',
  GET_GEMINI_RESPONSE:
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDlC-gg_MmJNqJQemzcjwkZUwG2qIVv-N4',
};
export const HEADERS = {
  URLENCODED: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
};
