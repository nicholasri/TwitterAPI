const BEARER_TOKEN = "{TOKEN}";

class Tweet {
    id;
    edit_history_tweet_ids;
    text;

    constructor(id, text, edit_history_tweet_ids) {
      this.id = id;
      this.text = text;
      this.edit_history_tweet_ids = edit_history_tweet_ids;
    }

    displayTweet() { 
        console.log("Tweet:\nid: " + this.id + "\ntext: " + this.text);
    }
}

async function postTweet() { 
    let tweet;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + BEARER_TOKEN);
    myHeaders.append("Cookie", "guest_id=v1%3A169946917550509707; guest_id_ads=v1%3A169946917550509707; guest_id_marketing=v1%3A169946917550509707; personalization_id=\"v1_NKKcnpr8rc88KeSIaEMzPw==\"");
    
    var raw = JSON.stringify({
      "text": "Twitter API Test #9"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    await fetch("https://api.twitter.com/2/tweets", requestOptions)
      .then(response => { 
        if (response.ok) { 
            return response.json();
        } else if(response.status === 404) {
            return Promise.reject('Not Found 404');
        } else if(response.status === 403) {
            return Promise.reject('Forbidden 403: Cannot post tweet with duplicate conent');
        } else {
            throw new Error(response.status + ": " + response.statusText);
        }
      })
      .then(responseJson => {
        // DEBUG: JSON.Stringify(object)
        // console.log("RESPONSE JSON: " + JSON.stringify(responseJson));
        let data = responseJson["data"];
        let id = data["id"] ?? "no id found";
        let text = data["text"] ?? "no text found";
        let edit_history_tweet_ids = data["edit_history_tweet_ids"] ?? "no edit history";

        tweet = new Tweet(id, text, edit_history_tweet_ids);

        return tweet;
      })
      .catch(error => console.error('app | postTweet |', error));
      return tweet;
}

async function main() { 
    console.log("Starting app...");
    let tweet = await postTweet();
    if (tweet != null) { 
        tweet.displayTweet();
    }
    console.log("Terminating app...");
}

main();