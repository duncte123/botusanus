import { twitterClient } from './twitterApi';

/**
 *
 * @param {Express} app
 */
export default function init(app) {
    app.get('/login', async (req, res) => {
        try {
            const { oauth_token, oauth_token_secret } = await twitterClient.basics.oauthRequestToken({
                oauth_callback: process.env.TWITTER_CALLBACK,
            });

            req.session.oauth_token = oauth_token;
            req.session.oauth_token_secret = oauth_token_secret;

            const url = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`;

            res.redirect(url);
        } catch (e) {
            console.log('error')
            console.error(e);
            res.send(`Error: ${e.message}`);
        }
    });

    app.get('/callback', (req, res) => {
        // this is probably only needed for webhooks
        if (!req.query.oauth_verifier) {
            res.status(403);
            res.send({
                error: 'Lol failed',
            });
            return;
        }


        res.send('oops');
    });
}

/**
 *
 * @param {String} crcToken
 */
function handleCrC(crcToken) {
    //
}
