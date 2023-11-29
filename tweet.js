export default class Tweet {
    id;
    edit_history_tweet_ids;
    text;

    constructor(id, text, edit_history_tweet_ids) {
      this.id = id;
      this.text = text;
      this.edit_history_tweet_ids = edit_history_tweet_ids;
    }

    displayTweet() { 
        console.log("Tweet:\nid: " + id + "\ntext: " + this.text);
    }
}