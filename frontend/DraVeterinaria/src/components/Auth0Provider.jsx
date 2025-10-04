import React from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from '../App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
<Auth0Provider
    domain="dev-3log5xxbg3n3rw3h.us.auth0.com"
    clientId="TrgumAiEAT5ZnJsnSK8DKA0EkZNj6mJr"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
);