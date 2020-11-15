import { getDefaultClient, getClient } from './twitterApi';
import fs from 'fs';

const CREDENTIALS = `${__dirname}/../credentials.json`;

/**
 *
 * @param {Express} app
 */
export default function init(app) {
    app.get('/login', async (req, res) => {
        try {
            const twitterClient = getDefaultClient();
            const { oauth_token, oauth_token_secret } = await twitterClient.basics.oauthRequestToken({
                oauth_callback: process.env.TWITTER_CALLBACK,
            });

            req.session.oauth_token = oauth_token;
            req.session.oauth_token_secret = oauth_token_secret;

            const url = `https://api.twitter.com/oauth/authorize?oauth_token=${oauth_token}`;

            res.redirect(url);
        } catch (e) {
            console.log('error')
            console.error(e);
            res.send(`Error: ${e.message}`);
        }
    });

    app.get('/callback', async (req, res) => {
        try {
            const oauth_verifier = req.query.oauth_verifier;

            // this is probably only needed for webhooks
            if (!oauth_verifier) {
                res.status(403);
                res.send({
                    error: 'Lol failed',
                });
                return;
            }

            const { oauth_token, oauth_token_secret } = req.session;
            const client = getClient(oauth_token, oauth_token_secret);

            const data = await client.basics.oauthAccessToken({ oauth_verifier });

            console.log(data);

            // Store the credentials in a file
            fs.writeFileSync(CREDENTIALS, JSON.stringify(data));

            res.send({
                success: true,
            });
        } catch (e) {
            console.error(e);
            res.send(`Error: ${e.message}`);
        }
    });

    app.get('/tweet', async (req, res) => {
        if (!fs.existsSync(CREDENTIALS)) {
            res.send({
                error: 'THE FILE IS GONE REEE',
            });
            return;
        }

        const { oauth_token, oauth_token_secret } = fs.readFileSync(CREDENTIALS);
        const client = getClient(oauth_token, oauth_token_secret);
    });
}
