import express from 'express';
import bodyParser from 'body-parser';
import { MessageEmbed } from 'discord.js';
const { Client, Intents, Permissions } = require('discord.js');
import { Message } from 'discord.js';
import { MongoClient } from 'mongodb';
import Commands from './commands';
import Events from './events';
import config from './config';

const app = express();
const bot = new Client(
  { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }
);

app.use(bodyParser.json());

// webhook POST -> construct message -> send message
app.post('/', handleRequest);
app.post('/:guildId', handleRequest);

function handleRequest(req, res) {
  // @TODO Verify that this request came from GitHub
  const event = req.get("X-GitHub-Event");
  if (event) {
    setTimeout(() => {
      let eventF = Events[event]
      if (!eventF) {
	      return
      }
      const message = eventF(req.body);
      const repo = req.body.repository.full_name.toLowerCase();
      sendMessages(repo, message, req.params.guildId);
    }, 0); // Do all this asynchronously without blocking res.sendStatus
    res.sendStatus(200);
  } else {
    res.sendStaus(400);
  }
}

app.get('/', (req, res) => {
  res.send('Woah, This is just a useless API! Go Away!');
});

function sendMessages(repo, message, guildId) {
  MongoClient.connect(config.db, (err, db) => {
    if (err) reject(err);
    db.collection('subscriptions').find({
      'repo': repo
    })
    .toArray((err, subscriptions) => {
      db.close();
      subscriptions.forEach(subscription => {
        const channel = bot.channels.cache.find(c => c.id === subscription.channelId);
        if (channel) {
          if (guildId != null && channel.guild_id !== guildId) {
            // If guild ID doesn't match, silently drop the request as it can
            // notify 'something is happening' to malicious users
            return;
          }
          
          let embed = new MessageEmbed()
            .setTitle('New GitHub Update!!')
            .setColor('#CCFE00')
            .setDescription(`${message}`)
            .setTimestamp()
            .setFooter('© 2021 - 2022 Mapleshade', 'https://cdn.discordapp.com/attachments/653733403841134600/916607168734691328/Mapleshade.NO-7.png')
          
          
          channel.send({embeds: [embed]});
          
        } else {
          
          console.log('Error: Bot not allowed in channel');
        }
      });
    });
  });
}

// discord message event -> parseMessage -> Command -> Action
/**
 * Check to see if any message read by this bot is relevant.
 * - Do nothing if the message is from the bot itself.
 * - Check if the message is prefaced with '!dbg'.
 * - If the command is prefaced, check if the command exists.
 * - Then perform the action sepcified.
 */
bot.on('ready', () => {
  
    const activities = [
      { name: 'GitHub Repo Updates', type: 'STREAMING' }, 
      { name: 'cat! help', type: 'WATCHING' }
    ];
  
    let activity = 1;
  
    setInterval(() => {
      activities[2] = { name: 'Add a New Repo', type: 'STREAMING', url: 'https://twitch.tv/monstercat' };
      activities[3] = { name: 'Woah, Im Cool!', type: 'WATCHING' }; 
      if (activity > 3) activity = 0;
      bot.user.setActivity(activities[activity]);
      activity++;
    }, 35000);
});

bot.on('messageCreate', (message) => {
  if (message.author.id === bot.user.id) return;
  if (!message.member) return;
  if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
  if (message.content.substring(0, 4) !== 'cat!') return;

  const commandObject = parseMessage(message);
  if (commandObject) {
    Commands[commandObject.command](message.channel, ...commandObject.args);
  } else {
    message.reply('Command invalid.');
    Commands['help'];
  }
});

/**
 * Take in the content of a message and return a command
 * @param  {Message} message The Discord.Message object
 * @return {Object}          An object continaing a command name and arguments
 */
function parseMessage(message) {
  const parts = message.content.split(' ');
  const command = parts[1];
  const args = parts.slice(2);

  if (typeof Commands[command] === 'function') {
    // @TODO We could check the command validity here
    return { command, args };
  } else {
    return null;
  }
}

app.listen(process.env.PORT, () => {
  bot.login(config.token)
  .then(console.log(`Logged in and listening to PORT: ${process.env.PORT}.`))
  .catch(error => console.log(error));
});
