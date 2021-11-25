import { MessageEmbed } from 'discord.js';
import { MongoClient } from 'mongodb';
import config from './config';

export default class Actions {
  // @TODO Check if the subscription exists and return that.
  static add(repo, channelId) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.db, (err, db) => {
        if (err) reject(err);
        db.collection('subscriptions').deleteMany({
          'repo': repo.toLowerCase(),
          'channelId': channelId
        }, (err, result) => {
          if (err) reject(err);
          db.collection('subscriptions').insertOne({
            repo: repo.toLowerCase(),
            channelId: channelId
          }, (err, result) => {
            if (err) reject(err);
            db.close();
            resolve(`🎉 Added a new subscription. ${repo} <---> ${channelId}`);
          });
        });
      });
    });
  }

  static remove(repo, channelId) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.db, (err, db) => {
        if (err) reject(err);
        db.collection('subscriptions').deleteOne({
          'repo': repo.toLowerCase(),
          'channelId': channelId
        }, (err, result) => {
          if (err) reject(err);
          db.close();
          resolve(`🚫 Removed a subscription. ${repo} <-/-> ${channelId}`);
        });
      });
    });
  }

  static help(channel) {

    let embed = new MessageEmbed()
      .setTitle('GitHub Updates | Help')
      .setColor('#CCFE00')
      .setDescription('Usage: `ghu! <command> [value]`')
      .addField('Help', `add <repo> - Adds a subscription for the current channel`, true)
      .addField('Add', `remove <repo> - Removes a subscription for the current channel`, true)
      .addField('Remove', `help - Displays this help message`, true)
      .setTimestamp()
      .setFooter('© 2021 - 2022 GitHub Updates | Made By: Toxic Dev', 'https://cdn.discordapp.com/attachments/653733403841134600/913163329118281768/IMG_1409.png')

    channel.send(embed);
  }
  
  static invite(channel) {

    let embed = new MessageEmbed()
      .setTitle('Woah, You think im cool?')
      .setColor('#CCFE00')
      .setDescription('Invite me Here: https://discord.com/api/oauth2/authorize?client_id=896602816838250549&permissions=543850626288&scope=bot')
      .setTimestamp()
      .setFooter('© 2021 - 2022 GitHub Updates | Made By: Toxic Dev', 'https://cdn.discordapp.com/attachments/653733403841134600/913163329118281768/IMG_1409.png')

    channel.send(embed);
  }
}
