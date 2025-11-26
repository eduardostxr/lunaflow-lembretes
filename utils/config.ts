export const API_CONFIG = {
  BASE_URL: __DEV__ 
    ? 'http://192.168.8.13:3000'
    : 'https://api.seudominio.com',
  ENDPOINTS: {
    REMINDERS: '/api/reminders',
  },
};
