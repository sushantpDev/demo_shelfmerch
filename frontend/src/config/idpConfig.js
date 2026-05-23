// Identity Provider Routing Configuration
// Maps corporate email domains to their respective SSO Authorize endpoints

export const idpConfig = {
  // Toast Identity Provider (Our primary IDP)
  'toast.com': {
    name: 'Toast Identity',
    authorizeEndpoint: 'http://localhost:5001/authorize',
    clientId: 'shelfmerch123',
    redirectUri: 'http://localhost:5175/sso-callback',
  },
  
  // Mock Salesforce IDP
  'salesforce.com': {
    name: 'Salesforce',
    authorizeEndpoint: '/mock-idp/salesforce', // Will map to a simulated error or mock in the app
    clientId: 'shelfmerch_sf',
    redirectUri: 'http://localhost:5175/sso-callback',
  },
  
  // Mock IBM IDP
  'ibm.com': {
    name: 'IBM Security Verify',
    authorizeEndpoint: '/mock-idp/ibm',
    clientId: 'shelfmerch_ibm',
    redirectUri: 'http://localhost:5175/sso-callback',
  }
};

export const resolveIdpForEmail = (email) => {
  if (!email || !email.includes('@')) return null;
  const domain = email.split('@')[1].toLowerCase();
  return idpConfig[domain] || null;
};
