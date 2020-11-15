import { TwitterClient } from 'twitter-api-client';

/**
 * @return {TwitterClient}
 */
export function getDefaultClient() {
    return getClient(
        process.env.TWITTER_ACCESS_TOKEN_KEY,
        process.env.TWITTER_ACCESS_TOKEN_SECRET
    );
}

/**
 * @return {TwitterClient}
 */
export function getClient(accessToken, accessTokenSecret) {
    return new TwitterClient({
        apiKey: process.env.TWITTER_CONSUMER_KEY,
        apiSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken,
        accessTokenSecret,
    });
}
