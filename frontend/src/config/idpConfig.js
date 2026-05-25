// Identity Provider Routing Configuration
// Maps corporate email domains to their respective SSO Authorize endpoints
// All URLs are driven by environment variables so they work on both
// localhost (dev) and production (changebag.org / tollywoodreels.com).

const TOAST_SSO_ENDPOINT = import.meta.env.VITE_TOAST_SSO_ENDPOINT || 'http://localhost:5001/authorize';
const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5175';

export const idpConfig = {
  // Toast Identity Provider (Our primary IDP)
  'toast.com': {
    name: 'Toast Identity',
    authorizeEndpoint: TOAST_SSO_ENDPOINT,
    clientId: 'shelfmerch123',
    redirectUri: `${APP_URL}/sso-callback`,
  },

  // Mock Salesforce IDP
  'salesforce.com': {
    name: 'Salesforce',
    authorizeEndpoint: '/mock-idp/salesforce',
    clientId: 'shelfmerch_sf',
    redirectUri: `${APP_URL}/sso-callback`,
  },

  // Mock IBM IDP
  'ibm.com': {
    name: 'IBM Security Verify',
    authorizeEndpoint: '/mock-idp/ibm',
    clientId: 'shelfmerch_ibm',
    redirectUri: `${APP_URL}/sso-callback`,
  },
};

export const resolveIdpForEmail = (email) => {
  if (!email || !email.includes('@')) return null;
  const domain = email.split('@')[1].toLowerCase();
  return idpConfig[domain] || null;
};
