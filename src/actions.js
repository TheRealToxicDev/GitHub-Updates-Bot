import { MessageEmbed } from 'discord.js';
import { MongoClient } from 'mongodb';
import config from './config';

export default class Actions {
  // @TODO Check if the subscription exists and return that.
  static add(repo, channelId) {
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.db, (err, db) => {
	console.log(err, db)
        if (err) reject(err);
        db.collection('subscriptions').deleteMany({
          'repo': repo.toLowerCase(),
          'channelId': channelId,
        }, (err, result) => {
          if (err) reject(err);
          db.collection('subscriptions').insertOne({
            repo: repo.toLowerCase(),
            channelId: channelId
          }, (err, result) => {
            if (err) reject(err);
            db.close();
            
            let embed1 = new MessageEmbed()
              .setTitle('✔️ New Subscription')
              .setColor('#CCFE00')
              .setDescription('I have subscribed to a new Repo!')
              .addField('Repo', `${repo}`, true)
              .addField('Channel', `<#${channelId}> (${channelId})`, true)
              .setTimestamp()
            .setFooter('© 2021 - 2022 Mapleshade', 'https://cdn.discordapp.com/attachments/653733403841134600/916607168734691328/Mapleshade.NO-7.png')
            
            //resolve(`🎉 Added a new subscription. ${repo} <---> ${channelId}`);
            resolve({embeds: [embed1]});
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

    let embed3 = new MessageEmbed()
      .setTitle('Mapleshade | Help')
      .setColor('#CCFE00')
      .setDescription('Usage: `cat! <command> [value]`')
      .addField('Help', `help - Shows this help message`, true)
      .addField('Add', `add <repo> - Subscribe to a Repo in the Current Channel`, true)
      .addField('Remove', `remove <repo> - Remove a subscription from the Current Channel`, true)
      .setTimestamp()
      .setFooter('© 2021 - 2022 Mapleshade', 'https://cdn.discordapp.com/attachments/653733403841134600/916607168734691328/Mapleshade.NO-7.png')

    channel.send({embeds: [embed3]});
  }
}
