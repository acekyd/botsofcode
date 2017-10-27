/* ******************

 Fixes for Heroku
 See http://stackoverflow.com/a/31094668

 ******************* */

const express = require('express');
const app = express();
const path = require('path');
app.set('port', (process.env.PORT || 5000));
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/views/index.html'));
}).listen(app.get('port'), function () {
    console.log('App is running, server is listening on port ', app.get('port'));
});


/* ******************

 The Setup

 ******************* */
const T = require('./modules/T');
const Twitter = require('./modules/twitter');

/* ******************

 Key Variables

 ******************* */
const me = {
    id: 396451105,
    screen_name: 'ace_kyd'
};

const devlogicbot = {
    id: 882765573045747712,
    screen_name: 'devlogicbot'
};

const emojis = ['👊', '👊', '🙌', '👍', '💁', '👌', '🙅', '👯'];


/* ******************

 General Functions

 ******************* */
function shouldSendReply() {
    const randomNumber = Math.random();
    if (randomNumber > 0.3) return true;
    return false;
}

function getEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

function getTweet(tweet) {

    //const text = `Thanks for sharing! ${ getEmoji() }`;
    const text = 'AceKYD says thank you! 🙌 #Year23 ♠️';
    return text;

}


/* ******************

 Stream

 ******************* */

//const stream = T.stream('statuses/filter', { track: ['devlogic.co', 'devlogic'] });

const stream = T.stream('statuses/filter', { track: ['Happy Birthday'] });


stream.on('tweet', (tweet) => {
    
    if ( tweet.user.id === devlogicbot.id ) {
        return;
    }

    if ( tweet.text.toLowerCase().includes('@ace_kyd') ) {
        if ( tweet.user.id !== me.id ) {
            Twitter.reply(tweet, getTweet(tweet));
        }
        return;
    }

});

// stream.on('tweet', (tweet) => {

// 	if ( tweet.user.id === devlogicbot.id ) {
// 		return;
// 	}

//     Twitter.like(tweet);

// 	if ( tweet.user.id === me.id ) {
//         Twitter.retweet(tweet);
// 		return;
// 	}

//     if ( tweet.retweeted_status ) return;

// 	if ( tweet.text.toLowerCase().includes('@ace_kyd') ) {
// 		if ( shouldSendReply() ) {
//             Twitter.reply(tweet, getTweet(tweet));
// 		}
// 		return;
// 	}

//     Twitter.reply(tweet, getTweet(tweet));

// });



