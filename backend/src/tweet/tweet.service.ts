import { Injectable } from '@nestjs/common';
import { Tweet } from '../types';

@Injectable()
export class TweetService {
  private tweets: Tweet[] = [];

  getAllTweets(): Tweet[] {
    return this.tweets;
  }

  createTweet(text: string, name: string): Tweet {
    const generateRandomId = (): number => {
      let id: number;
      do {
        id = Math.floor(Math.random() * 1000000);
      } while (this.tweets.some(tweet => tweet.id === id));
      return id;
    };

    const newTweet: Tweet = {
      id: generateRandomId(),
      text,
      name,
    };

    this.tweets.unshift(newTweet); 
    return newTweet;
  }

  deleteTweet(id: number): boolean {
    const tweetIndex = this.tweets.findIndex(tweet => tweet.id === id);
    if (tweetIndex === -1) return false;
    this.tweets.splice(tweetIndex, 1);
    return true;
  }
}