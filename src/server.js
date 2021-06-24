const Koa = require('koa');
const Router = require('@koa/router');

const {
  SERVER_PORT,
  OAUTH_APP_INSTALL_BASE_URL,
  OAUTH_CLIENT_ID,
  OAUTH_CLIENT_SECRET,
  OAUTH_SCOPES,
} = require('dotenv').config().parsed;

const Hubspot = require('./hubspot');

const app = new Koa();
const appRouter = new Router();

const hubspot = new Hubspot();

appRouter.get('/', async ({ response }) => {
  response.redirect(
    OAUTH_APP_INSTALL_BASE_URL +
      `?client_id=${encodeURIComponent(OAUTH_CLIENT_ID)}` + // app's client ID
      `&scope=${encodeURIComponent(
        OAUTH_SCOPES.split(',')
          .map((it) => it.trim())
          .join(' ')
      )}` + // scopes being requested by the app
      `&redirect_uri=${encodeURIComponent(Hubspot.REDIRECT_URI)}` // MUST match what's defined in the app settings
  );
});

appRouter.get(Hubspot.PATH, async ({ request, response }) => {
  const { code } = request.query;
  if (code) {
    console.log(`Code: ${code}`);
    response.body = JSON.stringify({
      code,
      ...(await hubspot.retrieveTokens(code)),
    });
  } else {
    response.body = 'Please check the callback url';
  }
});

app.use(appRouter.routes()).use(appRouter.allowedMethods());

app.listen(parseInt(SERVER_PORT), (e) => {
  console.log(e);
  console.log(`Visit http://localhost:${SERVER_PORT} to install the app`);
});
