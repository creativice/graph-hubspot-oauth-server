const fetch = require('node-fetch');
const qs = require('qs');

const {
  SERVER_PORT,
  OAUTH_APP_INSTALL_BASE_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_SCOPES,
  HUBSPOT_API_URL,
} = require('dotenv').config().parsed;

const PATH = '/oauth-callback';
const REDIRECT_URI = `http://localhost:${SERVER_PORT}${PATH}`;

class Hubspot {
  static PATH = PATH;
  static REDIRECT_URI = REDIRECT_URI;

  constructor() {}

  async retrieveTokens(code) {
    const payload = {
      grant_type: 'authorization_code',
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      code,
    };
    const res = await fetch(
      `${HUBSPOT_API_URL}/oauth/v1/token?` + qs.stringify(payload),
      {
        method: 'POST',
        headers: new fetch.Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
    const data = await res.json();
    return data;
  }
}

module.exports = Hubspot;
