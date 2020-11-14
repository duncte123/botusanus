import { TwitterClient } from 'twitter-api-client';
import Twitter from 'twitter';

/**
 * @var {TwitterClient}
 */
export let twitterClient;

export default function init() {
    twitterClient = new TwitterClient({
        apiKey: process.env.TWITTER_CONSUMER_KEY,
        apiSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN_KEY,
        accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });

    /*twitterClient = new Twitter({
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });*/
}
